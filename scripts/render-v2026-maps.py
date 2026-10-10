#!/usr/bin/env python3
"""Render own v2026 maps from already fetched open data.

Reads nordic-grid.ts (ETOPO 2022) and gyda.ts (NCEP/NCAR daily, 12 Jan 2022).
Writes PNGs under public/eksamen/v2026/. Does not download anything.
"""

from __future__ import annotations

import json
import math
import re
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
FIG = ROOT / "src/lib/eksamen/figures/v2026"
OUT = ROOT / "public/eksamen/v2026"

# Same reference latitude as the React overlays.
COS = math.cos(math.radians(66))


def load_ts_object(path: Path, name: str) -> dict:
    text = path.read_text()
    match = re.search(rf"export const {name} = (\{{.*\}}) as const;", text, re.S)
    if not match:
        raise SystemExit(f"could not parse {name} in {path}")
    return json.loads(match.group(1))


def bathy_color(z: int) -> tuple[int, int, int]:
    if z >= 800:
        return (196, 184, 164)
    if z >= 0:
        return (214, 206, 190)
    if z >= -200:
        return (186, 214, 214)
    if z >= -500:
        return (142, 190, 198)
    if z >= -1000:
        return (96, 158, 176)
    if z >= -2000:
        return (52, 116, 146)
    if z >= -3000:
        return (28, 78, 112)
    return (14, 44, 72)


def project(lon: float, lat: float, box: dict) -> tuple[float, float]:
    x_span = (box["lon1"] - box["lon0"]) * COS
    y_span = box["lat0"] - box["lat1"]
    x = (lon - box["lon0"]) * COS / x_span
    y = (box["lat0"] - lat) / y_span
    return x, y


def render_nordic(grid: dict) -> None:
    lat0 = grid["lat0"]
    lat1 = grid["lat1"]
    lon0 = grid["lon0"]
    lon1 = grid["lon1"]
    ny = grid["ny"]
    nx = grid["nx"]
    z = grid["z"]
    dlat = (lat0 - lat1) / (ny - 1)
    dlon = (lon1 - lon0) / (nx - 1)
    box = {"lat0": lat0, "lat1": lat1, "lon0": lon0, "lon1": lon1}
    height = 774
    width = round(height * ((lon1 - lon0) * COS) / (lat0 - lat1))
    img = Image.new("RGB", (width, height), (14, 44, 72))
    pix = img.load()
    for iy in range(ny - 1):
        lat_n = lat0 - iy * dlat
        lat_s = lat_n - dlat
        _, y_n = project(lon0, lat_n, box)
        _, y_s = project(lon0, lat_s, box)
        y0 = max(0, int(y_n * height))
        y1 = min(height, int(math.ceil(y_s * height)))
        for ix in range(nx - 1):
            lon_w = lon0 + ix * dlon
            lon_e = lon_w + dlon
            x_w, _ = project(lon_w, lat_n, box)
            x_e, _ = project(lon_e, lat_n, box)
            x0 = max(0, int(x_w * width))
            x1 = min(width, int(math.ceil(x_e * width)))
            color = bathy_color(z[iy * nx + ix])
            for y in range(y0, y1):
                for x in range(x0, x1):
                    pix[x, y] = color
    path = OUT / "nordic-bathy.png"
    img.save(path, optimize=True)
    print(f"nordic {width}x{height} -> {path}")

    # Synoptic window: Norwegian Sea and Nordland.
    analyse = {"lat0": 76.0, "lat1": 58.0, "lon0": -10.0, "lon1": 26.0}
    a_h = 760
    a_w = round(a_h * ((analyse["lon1"] - analyse["lon0"]) * COS) / (analyse["lat0"] - analyse["lat1"]))
    aim = Image.new("RGB", (a_w, a_h), (244, 247, 248))
    ap = aim.load()
    for iy in range(ny - 1):
        lat_n = lat0 - iy * dlat
        lat_s = lat_n - dlat
        if lat_s > analyse["lat0"] or lat_n < analyse["lat1"]:
            continue
        _, y_n = project(lon0, lat_n, analyse)
        _, y_s = project(lon0, lat_s, analyse)
        y0 = int(max(0, y_n * a_h))
        y1 = int(min(a_h, math.ceil(y_s * a_h)))
        for ix in range(nx - 1):
            lon_w = lon0 + ix * dlon
            lon_e = lon_w + dlon
            if lon_e < analyse["lon0"] or lon_w > analyse["lon1"]:
                continue
            elev = z[iy * nx + ix]
            color = (214, 206, 190) if elev >= 0 else (244, 247, 248)
            if elev < 0 and elev >= -300:
                color = (226, 234, 236)
            x_w, _ = project(lon_w, lat_n, analyse)
            x_e, _ = project(lon_e, lat_n, analyse)
            x0 = int(max(0, x_w * a_w))
            x1 = int(min(a_w, math.ceil(x_e * a_w)))
            for y in range(y0, max(y0, y1)):
                for x in range(x0, max(x0, x1)):
                    ap[x, y] = color
    apath = OUT / "analyse-kyst.png"
    aim.save(apath, optimize=True)
    print(f"analyse {a_w}x{a_h} -> {apath}")


def pw_color(value: float) -> tuple[int, int, int]:
    # Sequential blue, 0–30 mm. Negative reanalysis values are drawn as 0.
    t = max(0.0, min(1.0, value / 30.0))
    stops = [
        (0.0, (247, 251, 255)),
        (0.25, (198, 219, 239)),
        (0.5, (107, 174, 214)),
        (0.75, (33, 113, 181)),
        (1.0, (8, 48, 107)),
    ]
    for (a, ca), (b, cb) in zip(stops, stops[1:]):
        if t <= b:
            u = 0 if b == a else (t - a) / (b - a)
            return tuple(round(ca[i] + (cb[i] - ca[i]) * u) for i in range(3))  # type: ignore[return-value]
    return stops[-1][1]


def contour_lines(samples: list[tuple[float, float, float]], level: float) -> list[tuple[tuple[float, float], tuple[float, float]]]:
    """Marching squares on a regular lon/lat lattice stored as (lon, lat, value)."""
    pts: dict[tuple[float, float], float] = {(lon, lat): val for lon, lat, val in samples}
    lons = sorted({lon for lon, _, _ in samples})
    lats = sorted({lat for _, lat, _ in samples})
    segs: list[tuple[tuple[float, float], tuple[float, float]]] = []

    def interp(p1, v1, p2, v2):
        if v1 == v2:
            t = 0.5
        else:
            t = (level - v1) / (v2 - v1)
        return (p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1]))

    # edge pairs for each of 16 corner masks. Corners: SW SE NE NW.
    pairs = {
        1: [(3, 0)],
        2: [(0, 1)],
        3: [(3, 1)],
        4: [(1, 2)],
        5: [(3, 0), (1, 2)],
        6: [(0, 2)],
        7: [(3, 2)],
        8: [(2, 3)],
        9: [(0, 2)],
        10: [(0, 3), (1, 2)],
        11: [(1, 2)],
        12: [(1, 3)],
        13: [(0, 1)],
        14: [(0, 3)],
    }
    for i in range(len(lats) - 1):
        for j in range(len(lons) - 1):
            corners = [
                (lons[j], lats[i]),
                (lons[j + 1], lats[i]),
                (lons[j + 1], lats[i + 1]),
                (lons[j], lats[i + 1]),
            ]
            if any(c not in pts for c in corners):
                continue
            vals = [pts[c] for c in corners]
            mask = 0
            for bit, val in enumerate(vals):
                if val >= level:
                    mask |= 1 << bit
            if mask == 0 or mask == 15:
                continue
            edges = {
                0: interp(corners[0], vals[0], corners[1], vals[1]),
                1: interp(corners[1], vals[1], corners[2], vals[2]),
                2: interp(corners[2], vals[2], corners[3], vals[3]),
                3: interp(corners[3], vals[3], corners[0], vals[0]),
            }
            for a, b in pairs[mask]:
                segs.append((edges[a], edges[b]))
    return segs


def render_gyda(gyda: dict) -> None:
    # lat0 sits above the northernmost grid point so the low is not clipped.
    box = {"lat0": 77.0, "lat1": 45.0, "lon0": -30.0, "lon1": 30.0}
    height = 780
    width = round(height * ((box["lon1"] - box["lon0"]) * COS) / (box["lat0"] - box["lat1"]))
    lats = gyda["lat"]
    lons = gyda["lon"]
    pw = gyda["precipitableWaterMm"]
    slp = gyda["slpHpa"]
    img = Image.new("RGB", (width, height), (247, 251, 255))
    draw = ImageDraw.Draw(img)
    half = 1.25
    samples: list[tuple[float, float, float]] = []
    min_slp = None
    max_slp = None
    for i, lat in enumerate(lats):
        if not (box["lat1"] - half <= lat <= box["lat0"] + half):
            continue
        for j, lon in enumerate(lons):
            lonw = lon - 360 if lon >= 180 else lon
            if not (box["lon0"] - half <= lonw <= box["lon1"] + half):
                continue
            value = pw[i][j]
            pressure = slp[i][j]
            samples.append((lonw, lat, pressure))
            if box["lat1"] <= lat <= box["lat0"] and box["lon0"] <= lonw <= box["lon1"]:
                if min_slp is None or pressure < min_slp[0]:
                    min_slp = (pressure, lat, lonw)
                if max_slp is None or pressure > max_slp[0]:
                    max_slp = (pressure, lat, lonw)
            x0, y0 = project(lonw - half, lat + half, box)
            x1, y1 = project(lonw + half, lat - half, box)
            draw.rectangle(
                [x0 * width, y0 * height, x1 * width, y1 * height],
                fill=pw_color(value),
            )
    for level in (980, 990, 1000, 1010, 1020, 1030):
        for a, b in contour_lines(samples, level):
            ax, ay = project(a[0], a[1], box)
            bx, by = project(b[0], b[1], box)
            if not (0 <= ax <= 1 and 0 <= ay <= 1 and 0 <= bx <= 1 and 0 <= by <= 1):
                continue
            draw.line([(ax * width, ay * height), (bx * width, by * height)], fill=(32, 40, 48), width=2)
    path = OUT / "gyda-nedborbart-vann.png"
    img.save(path, optimize=True)
    print(f"gyda {width}x{height} L={min_slp} H={max_slp} -> {path}")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    render_nordic(load_ts_object(FIG / "nordic-grid.ts", "nordicGrid"))
    render_gyda(load_ts_object(FIG / "gyda.ts", "gyda"))


if __name__ == "__main__":
    main()
