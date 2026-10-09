#!/usr/bin/env python3
"""Textbook SVG for the v2026 figures we draw ourselves.

Coastline: Natural Earth 1:10m land, public domain.
Bathymetry: ETOPO 2022, NOAA public domain.
Gyda: NCEP/NCAR daily fields stored in gyda.ts.
T–S curves: UNESCO EOS-80 and the UNESCO freezing-point polynomial.
The analysis isobars are an idealised textbook field for the situation in
the task, not a copy of an undated MET chart.
"""

from __future__ import annotations

import json
import math
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.path import Path as MPath
from scipy.interpolate import RegularGridInterpolator
from scipy.ndimage import gaussian_filter
from shapely.geometry import LineString, Point, Polygon, box
from shapely.validation import make_valid

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/components/exam/v2026/generated"
NE = Path("/tmp/geo-data/ne/ne_10m_land.geojson")
ETOPO = Path("/tmp/geo-data/etopo-nordic-5.npz")
GYDA = ROOT / "src/lib/eksamen/figures/v2026/gyda.ts"
PREVIEW = Path("/tmp/geo-data/preview")

FONT = "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
PAPER = "#f6f4f0"
INK = "#1a242b"
MUTED = "#4e5d66"
GRID = "#c5d0d6"
LAND = "#efe8da"
COAST = "#6f675d"
SEA = "#d5e4ea"
WARM = "#b42318"
COLD = "#1d4e89"
OCCL = "#6d28d9"
MARK = "#9f1239"


def lambert(lon0: float, lat0: float, lat1: float, lat2: float):
    p1, p2, p0 = map(math.radians, (lat1, lat2, lat0))
    l0 = math.radians(lon0)
    n = math.log(math.cos(p1) / math.cos(p2)) / math.log(
        math.tan(math.pi / 4 + p2 / 2) / math.tan(math.pi / 4 + p1 / 2)
    )
    f = math.cos(p1) * (math.tan(math.pi / 4 + p1 / 2) ** n) / n
    rho0 = f / (math.tan(math.pi / 4 + p0 / 2) ** n)

    def project(lon: float, lat: float) -> tuple[float, float]:
        lat = min(89.0, max(-89.0, lat))
        rho = f / (math.tan(math.pi / 4 + math.radians(lat) / 2) ** n)
        theta = n * (math.radians(lon) - l0)
        return rho * math.sin(theta), rho0 - rho * math.cos(theta)

    return project


def fit_projector(project, west, south, east, north, inner: tuple[float, float, float, float]):
    xs, ys = [], []
    for lon in np.linspace(west, east, 28):
        for lat in (south, north):
            x, y = project(float(lon), float(lat))
            xs.append(x)
            ys.append(y)
    for lat in np.linspace(south, north, 28):
        for lon in (west, east):
            x, y = project(float(lon), float(lat))
            xs.append(x)
            ys.append(y)
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
    x0, y0, x1, y1 = inner

    def px(lon: float, lat: float) -> tuple[float, float]:
        x, y = project(lon, lat)
        sx = x0 + (x - minx) / (maxx - minx) * (x1 - x0)
        sy = y1 - (y - miny) / (maxy - miny) * (y1 - y0)
        return sx, sy

    return px, box(x0, y0, x1, y1)


def load_land():
    data = json.loads(NE.read_text())
    polys = []
    for feature in data["features"]:
        geom = feature["geometry"]
        parts = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
        for part in parts:
            if not part or not part[0] or len(part[0]) < 4:
                continue
            poly = Polygon(part[0])
            if not poly.is_valid:
                poly = make_valid(poly)
            if isinstance(poly, Polygon) and not poly.is_empty:
                polys.append(poly)
    return polys


def land_paths(polys, px, west, south, east, north) -> list[str]:
    region = box(west - 0.4, south - 0.4, east + 0.4, north + 0.4)
    paths = []
    for poly in polys:
        minx, miny, maxx, maxy = poly.bounds
        if maxx < west - 0.4 or minx > east + 0.4 or maxy < south - 0.4 or miny > north + 0.4:
            continue
        if poly.area < 0.0008:
            continue
        clipped = poly.intersection(region)
        if clipped.is_empty:
            continue
        geoms = [clipped] if isinstance(clipped, Polygon) else list(getattr(clipped, "geoms", []))
        for geom in geoms:
            if not isinstance(geom, Polygon) or geom.is_empty or geom.area < 0.0008:
                continue
            ring = [(float(lon), float(lat)) for lon, lat in geom.exterior.coords]
            projected = [px(lon, lat) for lon, lat in ring]
            if len(projected) < 4:
                continue
            simple = LineString(projected).simplify(0.45, preserve_topology=False)
            coords = list(simple.coords)
            if len(coords) < 4:
                continue
            if Polygon(coords).area < 6:
                continue
            paths.append("M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in coords) + " Z")
    return paths


def first_landfall(polys, lon0: float, lon1: float, lat: float, step: float = 0.015):
    nearby = []
    for poly in polys:
        minx, miny, maxx, maxy = poly.bounds
        if maxx < lon0 - 0.2 or minx > lon1 + 0.2 or maxy < lat - 0.4 or miny > lat + 0.4:
            continue
        nearby.append(poly)
    lon = lon0
    while lon <= lon1:
        pt = Point(lon, lat)
        for poly in nearby:
            if poly.covers(pt):
                boundary = poly.exterior.interpolate(poly.exterior.project(pt))
                return float(boundary.x), float(boundary.y)
        lon += step
    return None


def esc(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def halo(x, y, text, size=14, fill=INK, anchor="middle", weight=600, stroke=PAPER) -> str:
    return (
        f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}" font-family="{FONT}" '
        f'font-size="{size}" font-weight="{weight}" fill="{fill}" stroke="{stroke}" '
        f'stroke-width="4" paint-order="stroke" stroke-linejoin="round">{esc(text)}</text>'
    )


def plain(x, y, text, size=14, fill=INK, anchor="start", weight=600) -> str:
    return (
        f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}" font-family="{FONT}" '
        f'font-size="{size}" font-weight="{weight}" fill="{fill}">{esc(text)}</text>'
    )


def polyline(coords) -> str:
    return "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in coords)


def clip_line(pts, frame) -> list[str]:
    if len(pts) < 2:
        return []
    line = LineString(pts)
    if not line.is_valid:
        line = make_valid(line)
    cut = line.intersection(frame)
    if cut.is_empty:
        return []
    geoms = [cut] if isinstance(cut, LineString) else list(getattr(cut, "geoms", []))
    out = []
    for geom in geoms:
        if not isinstance(geom, LineString) or geom.length < 8:
            continue
        out.append(polyline(geom.coords))
    return out


def graticule(px, west, south, east, north, lons, lats) -> list[str]:
    lines = []
    for lon in lons:
        pts = [px(float(lon), float(lat)) for lat in np.linspace(south, north, 48)]
        lines.append(polyline(pts))
    for lat in lats:
        pts = [px(float(lon), float(lat)) for lon in np.linspace(west, east, 64)]
        lines.append(polyline(pts))
    return lines


def axis_labels(px, frame, lons, lats) -> list[str]:
    x0, y0, x1, y1 = frame.bounds
    labels = []
    for lon in lons:
        sx, _ = px(float(lon), 60)
        if sx < x0 + 18 or sx > x1 - 18:
            continue
        if lon == 0:
            text = "0°"
        elif lon < 0:
            text = f"{abs(lon):.0f}°V"
        else:
            text = f"{lon:.0f}°Ø"
        labels.append(plain(sx, y1 + 18, text, size=12, fill=MUTED, anchor="middle", weight=500))
    for lat in lats:
        _, sy = px(0, float(lat))
        if sy < y0 + 12 or sy > y1 - 12:
            continue
        labels.append(plain(x0 - 8, sy + 4, f"{lat:.0f}°N", size=12, fill=MUTED, anchor="end", weight=500))
    return labels


class Placer:
    def __init__(self):
        self.boxes: list[tuple[float, float, float, float]] = []

    def blocks(self, x, y, w, h, gap=4) -> bool:
        box_ = (x - w / 2 - gap, y - h - gap, x + w / 2 + gap, y + gap)
        for other in self.boxes:
            if not (box_[2] < other[0] or box_[0] > other[2] or box_[3] < other[1] or box_[1] > other[3]):
                return True
        return False

    def reserve(self, x, y, w, h):
        self.boxes.append((x - w / 2, y - h, x + w / 2, y + 2))

    def text_width(self, text, size):
        return max(12, len(text) * size * 0.56)


def contour_paths(lon, lat, field, levels):
    fig, ax = plt.subplots()
    cs = ax.contour(lon, lat, field, levels=levels)
    out = []
    # get_paths() drops segments on matplotlib 3.11. allsegs is the full set.
    for level, segs in zip(cs.levels, cs.allsegs):
        for seg in segs:
            if len(seg) < 2:
                continue
            out.append((float(level), MPath(seg)))
    plt.close(fig)
    return out


def path_coords(path) -> list[tuple[float, float]]:
    verts = path.vertices
    codes = path.codes
    if codes is None:
        return [(float(x), float(y)) for x, y in verts]
    out = []
    for (x, y), code in zip(verts, codes):
        if code == MPath.CLOSEPOLY:
            continue
        if code == MPath.MOVETO and out:
            break
        out.append((float(x), float(y)))
    return out


def filled_paths(lon, lat, field, levels):
    fig, ax = plt.subplots()
    cs = ax.contourf(lon, lat, field, levels=levels)
    paths = list(cs.get_paths())
    plt.close(fig)
    return paths


def rings_from_mpl(path, px) -> list[list[tuple[float, float]]]:
    rings = []
    current: list[tuple[float, float]] = []
    if path.codes is None:
        return []
    for (lon, lat), code in zip(path.vertices, path.codes):
        if code == MPath.MOVETO:
            if len(current) >= 4:
                rings.append(current)
            current = [px(float(lon), float(lat))]
        elif code == MPath.LINETO:
            current.append(px(float(lon), float(lat)))
        elif code == MPath.CLOSEPOLY:
            if len(current) >= 4:
                rings.append(current)
            current = []
    if len(current) >= 4:
        rings.append(current)
    return rings


def ring_d(coords, tol=1.15) -> str:
    if len(coords) < 4:
        return ""
    simple = LineString(coords).simplify(tol, preserve_topology=False)
    pts = list(simple.coords)
    if len(pts) < 4 or Polygon(pts).area < 8:
        return ""
    return "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + " Z"


def sample_front(pts, step, start):
    out = []
    remain = start
    for i in range(1, len(pts)):
        x0, y0 = pts[i - 1]
        x1, y1 = pts[i]
        length = math.hypot(x1 - x0, y1 - y0)
        if length == 0:
            continue
        angle = math.atan2(y1 - y0, x1 - x0)
        walked = 0.0
        while walked + remain <= length:
            walked += remain
            t = walked / length
            out.append((x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, angle))
            remain = step
        remain -= length - walked
    return out


def symbol_path(x, y, normal, semicircle, color) -> str:
    if semicircle:
        r = 8.5
        arc = []
        for k in range(11):
            a = normal - math.pi / 2 + k * math.pi / 10
            arc.append((x + r * math.cos(a), y + r * math.sin(a)))
        return f'<path d="{polyline(arc)} Z" fill="{color}"/>'
    tip, base = 14.0, 6.4
    ax_ = x + tip * math.cos(normal)
    ay_ = y + tip * math.sin(normal)
    left = normal + math.pi / 2
    bx, by = x + base * math.cos(left), y + base * math.sin(left)
    cx, cy = x - base * math.cos(left), y - base * math.sin(left)
    return f'<polygon points="{ax_:.1f},{ay_:.1f} {bx:.1f},{by:.1f} {cx:.1f},{cy:.1f}" fill="{color}"/>'


def front_svg(px, lonlat, kind, toward, step=36, start=30) -> str:
    pix = [px(lon, lat) for lon, lat in lonlat]
    tx, ty = px(*toward)
    color = {"warm": WARM, "cold": COLD, "occluded": OCCL}[kind]
    parts = [
        f'<path d="{polyline(pix)}" fill="none" stroke="{color}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>'
    ]
    for index, (x, y, angle) in enumerate(sample_front(pix, step, start)):
        n1 = angle + math.pi / 2
        n2 = angle - math.pi / 2

        def score(n, x=x, y=y):
            return (tx - x) * math.cos(n) + (ty - y) * math.sin(n)

        normal = n1 if score(n1) > score(n2) else n2
        semicircle = kind == "warm" or (kind == "occluded" and index % 2 == 0)
        parts.append(symbol_path(x, y, normal, semicircle, color))
    return "".join(parts)


def legend_symbol(x, y, kind) -> str:
    """A short frontal line with the symbol on the upper side, for the legend."""
    color = {"warm": WARM, "cold": COLD, "occluded": OCCL}[kind]
    parts = [f'<path d="M{x:.1f} {y:.1f} h46" fill="none" stroke="{color}" stroke-width="2.4"/>']
    normal = -math.pi / 2
    if kind == "warm":
        parts.append(symbol_path(x + 23, y, normal, True, color))
    elif kind == "cold":
        parts.append(symbol_path(x + 23, y, normal, False, color))
    else:
        parts.append(symbol_path(x + 14, y, normal, True, color))
        parts.append(symbol_path(x + 34, y, normal, False, color))
    return "".join(parts)


def js_template(svg: str) -> str:
    return svg.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def write_component(filename: str, component: str, width: int, height: int, title: str, inner: str, class_name: str) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    safe = title.replace('"', "&quot;")
    content = f"""/* Generated by scripts/build-v2026-vectors.py. Do not edit by hand. */
export function {component}() {{
  return (
    <svg viewBox="0 0 {width} {height}" className="{class_name}" role="img" aria-label="{safe}" dangerouslySetInnerHTML={{{{ __html: `{js_template(inner)}` }}}} />
  );
}}
"""
    path = OUT / filename
    path.write_text(content, encoding="utf-8")
    preview = PREVIEW / f"{filename.replace('.tsx', '.svg')}"
    PREVIEW.mkdir(parents=True, exist_ok=True)
    preview.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" font-family="sans-serif">{inner}</svg>',
        encoding="utf-8",
    )
    print(f"wrote {path.name} ({path.stat().st_size} bytes)")


def rect(x, y, w, h, fill) -> str:
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" fill="{fill}"/>'


def frame_rect(frame, fill, stroke=None) -> str:
    x0, y0, x1, y1 = frame.bounds
    stroke_attr = f' stroke="{stroke}" stroke-width="1"' if stroke else ""
    return f'<rect x="{x0:.1f}" y="{y0:.1f}" width="{x1 - x0:.1f}" height="{y1 - y0:.1f}" fill="{fill}"{stroke_attr}/>'


# --- analysis -----------------------------------------------------------------

ANAL_W, ANAL_H = 1040, 900
LOW = (1.5, 69.2)
P0 = 968.0
OCCLUDED = [(1.5, 69.2), (4.8, 67.6), (8.0, 66.0)]
WARM_FRONT = [(8.0, 66.0), (13.5, 65.6), (20.0, 65.2)]
COLD_FRONT = [(8.0, 66.0), (6.2, 62.5), (4.0, 58.8)]


def km(lon, lat, lon_c, lat_c):
    x = (lon - lon_c) * 111.32 * math.cos(math.radians((lat + lat_c) / 2))
    y = (lat - lat_c) * 110.57
    return x, y


def dist_to_chain(lon, lat, chain):
    best = 1e9
    for i in range(len(chain) - 1):
        ax, ay = km(chain[i][0], chain[i][1], lon, lat)
        bx, by = km(chain[i + 1][0], chain[i + 1][1], lon, lat)
        abx, aby = bx - ax, by - ay
        denom = abx * abx + aby * aby
        t = 0 if denom == 0 else max(0.0, min(1.0, -(ax * abx + ay * aby) / denom))
        best = min(best, math.hypot(ax + t * abx, ay + t * aby))
    return best


def analysis_pressure(lon, lat) -> float:
    x, y = km(lon, lat, LOW[0], LOW[1])
    radius = math.hypot(x, y)
    pressure = P0 + 0.038 * radius
    d = min(
        dist_to_chain(lon, lat, OCCLUDED),
        dist_to_chain(lon, lat, WARM_FRONT),
        dist_to_chain(lon, lat, COLD_FRONT),
    )
    trough = 7.0 * math.exp(-((d / 110.0) ** 2)) * (1.0 - math.exp(-((radius / 200.0) ** 2)))
    return pressure - trough


def build_analysis(land) -> None:
    project = lambert(5, 63, 50, 70)
    west, south, east, north = -26, 49, 30, 76
    inner = (64, 16, 1016, 792)
    px, frame = fit_projector(project, west, south, east, north, inner)
    coast = first_landfall(land, 12.2, 17.5, 67.28)
    if coast is None:
        raise SystemExit("Fant ikke kysten av Nordland")
    print("Nordland coast", tuple(round(v, 3) for v in coast))

    lands = land_paths(land, px, west, south, east, north)
    lons = [-20, -10, 0, 10, 20]
    lats = [50, 55, 60, 65, 70, 75]
    grid = graticule(px, west, south, east, north, lons, lats)

    glon = np.linspace(west, east, 241)
    glat = np.linspace(south, north, 181)
    lon_g, lat_g = np.meshgrid(glon, glat)
    field = np.vectorize(analysis_pressure)(lon_g, lat_g)
    levels = list(range(968, 1025, 4))
    raw = contour_paths(glon, glat, field, levels)
    closed = 0
    items = []
    for level, path in raw:
        coords = path_coords(path)
        if len(coords) < 12:
            continue
        if math.hypot(coords[0][0] - coords[-1][0], coords[0][1] - coords[-1][1]) < 0.4:
            closed += 1
        projected = [px(lon, lat) for lon, lat in coords]
        bits = clip_line(projected, frame.buffer(1))
        for d in bits:
            items.append({"d": d, "level": level, "pts": projected})
    print("analysis contours", len(items), "closed", closed, "center", round(analysis_pressure(*LOW), 2))

    parts = [rect(0, 0, ANAL_W, ANAL_H, PAPER), frame_rect(frame, SEA)]
    parts.append(f'<g clip-path="url(#analyse-clip)">')
    for d in grid:
        parts.append(f'<path d="{d}" fill="none" stroke="{GRID}" stroke-width="0.8"/>')
    for d in lands:
        parts.append(f'<path d="{d}" fill="{LAND}" stroke="{COAST}" stroke-width="0.7" stroke-linejoin="round"/>')
    for item in items:
        parts.append(f'<path d="{item["d"]}" fill="none" stroke="{INK}" stroke-width="1.15" stroke-linejoin="round"/>')
    parts.append(front_svg(px, OCCLUDED, "occluded", (12.5, 67.4)))
    parts.append(front_svg(px, WARM_FRONT, "warm", (16.0, 67.6)))
    parts.append(front_svg(px, COLD_FRONT, "cold", (10.5, 61.5)))
    parts.append("</g>")

    placer = Placer()
    lx, ly = px(*LOW)
    parts.append(f'<circle cx="{lx:.1f}" cy="{ly:.1f}" r="18" fill="#102433"/>')
    parts.append(halo(lx, ly - 2, "L", size=15, fill="#f7f5f2", weight=700, stroke="#102433"))
    parts.append(halo(lx, ly + 13, "968", size=11, fill="#f7f5f2", weight=650, stroke="#102433"))
    placer.reserve(lx, ly + 4, 48, 40)

    xx, xy = px(*coast)
    parts.append(f'<circle cx="{xx:.1f}" cy="{xy:.1f}" r="4.5" fill="{MARK}" stroke="{PAPER}" stroke-width="1.5"/>')
    parts.append(halo(xx + 11, xy - 1, "X", size=18, fill=MARK, anchor="start", weight=700))
    placer.reserve(xx + 20, xy + 2, 26, 20)

    for lon, lat, text in (
        (-18.2, 64.9, "Island"),
        (-7.1, 61.8, "Færøyene"),
        (-2.0, 72.4, "Norskehavet"),
        (9.2, 61.2, "Norge"),
        (3.2, 56.4, "Nordsjøen"),
        (-3.2, 52.6, "Storbritannia"),
        (-8.6, 53.2, "Irland"),
        (16.4, 63.2, "Sverige"),
    ):
        x, y = px(lon, lat)
        if not frame.contains(Point(x, y)):
            print("name outside", text)
            continue
        text_w = placer.text_width(text, 15)
        if placer.blocks(x, y, text_w, 16, gap=3):
            print("name blocked", text)
            continue
        placer.reserve(x, y, text_w, 16)
        parts.append(halo(x, y, text, size=15, fill=INK))

    labeled = set()
    for level in levels:
        candidates = []
        for item in items:
            if item["level"] != level:
                continue
            pts = [tuple(map(float, pair.split())) for pair in item["d"][1:].split(" L")]
            for x, y in pts[::2]:
                if not frame.contains(Point(x, y)):
                    continue
                if math.hypot(x - lx, y - ly) < 26:
                    continue
                # Keep labels off the frontal zone east and south of the low.
                if x > lx + 30 and y > ly - 20:
                    continue
                candidates.append((x, y))
        if not candidates:
            continue
        text = f"{level:.0f}"
        text_w = placer.text_width(text, 12)
        candidates.sort(key=lambda p: (p[0] - (lx - 90)) ** 2 + (p[1] - ly) ** 2)
        placed_at = None
        for x, y in candidates[:: max(1, len(candidates) // 18)]:
            if placer.blocks(x, y, text_w, 14, gap=5):
                continue
            placed_at = (x, y)
            break
        if placed_at is None:
            continue
        x, y = placed_at
        placer.reserve(x, y, text_w, 14)
        labeled.add(level)
        parts.append(
            f'<rect x="{x - text_w / 2 - 2:.1f}" y="{y - 12:.1f}" width="{text_w + 4:.1f}" height="15" rx="2" fill="{PAPER}"/>'
        )
        parts.append(plain(x, y, text, size=12, fill=INK, anchor="middle", weight=650))

    front_pts = [px(lon, lat) for line in (OCCLUDED, WARM_FRONT, COLD_FRONT) for lon, lat in line]
    for level in levels:
        if level in labeled:
            continue
        text = f"{level:.0f}"
        text_w = placer.text_width(text, 12)
        candidates = []
        for item in items:
            if item["level"] != level:
                continue
            for x, y in item["pts"][::4]:
                if not frame.contains(Point(x, y)):
                    continue
                if math.hypot(x - lx, y - ly) < 36:
                    continue
                if any(math.hypot(x - fx, y - fy) < 22 for fx, fy in front_pts):
                    continue
                candidates.append((x, y))
        if not candidates:
            continue
        # Prefer the south-west margin, away from the frontal symbols.
        candidates.sort(key=lambda p: p[0] + p[1] * 0.15)
        for x, y in candidates[:: max(1, len(candidates) // 12)]:
            if placer.blocks(x, y, text_w, 14, gap=6):
                continue
            placer.reserve(x, y, text_w, 14)
            labeled.add(level)
            parts.append(
                f'<rect x="{x - text_w / 2 - 2:.1f}" y="{y - 12:.1f}" width="{text_w + 4:.1f}" height="15" rx="2" fill="{PAPER}"/>'
            )
            parts.append(plain(x, y, text, size=12, fill=INK, anchor="middle", weight=650))
            break
    print("labeled isobars", sorted(labeled), "missing", [level for level in levels if level not in labeled])

    parts.extend(axis_labels(px, frame, lons, lats))
    x0, y0, x1, y1 = frame.bounds
    parts.insert(2, f'<clipPath id="analyse-clip"><rect x="{x0:.1f}" y="{y0:.1f}" width="{x1-x0:.1f}" height="{y1-y0:.1f}"/></clipPath>')
    parts.append(frame_rect(frame, "none", "#9aa7ae"))

    ly0 = 836
    parts.append(legend_symbol(48, ly0, "warm"))
    parts.append(plain(102, ly0 + 4, "Varmfront", size=15, anchor="start"))
    parts.append(legend_symbol(230, ly0, "cold"))
    parts.append(plain(284, ly0 + 4, "Kaldfront", size=15, anchor="start"))
    parts.append(legend_symbol(420, ly0, "occluded"))
    parts.append(plain(474, ly0 + 4, "Okkludert front", size=15, anchor="start"))
    parts.append(f'<path d="M680 {ly0:.1f} h40" fill="none" stroke="{INK}" stroke-width="1.4"/>')
    parts.append(plain(728, ly0 + 4, "Isobar hver 4 hPa", size=15, anchor="start"))

    title = "Forenklet analysekart med Lambert-projeksjon. Lavtrykk i Norskehavet, X på kysten av Nordland, isobarer hver 4 hPa og fronter. Ingen vindpil."
    write_component(
        "AnalyseChart.tsx",
        "AnalyseChart",
        ANAL_W,
        ANAL_H,
        title,
        "".join(parts),
        "h-auto w-full max-w-none max-sm:min-w-[52rem]",
    )


# --- Gyda ---------------------------------------------------------------------

PW_LEVELS = [0, 8, 12, 16, 20, 28]
PW_COLORS = ["#f4f8fb", "#d0e2f2", "#8ebfe0", "#3d86bc", "#1a5278"]


def load_gyda():
    text = GYDA.read_text()
    payload = json.loads(text.split("=", 1)[1].rsplit("as const", 1)[0].strip().rstrip(";"))
    lat = np.array(payload["lat"], dtype=float)
    lon = np.array(payload["lon"], dtype=float)
    lon = np.where(lon > 180, lon - 360, lon)
    order = np.argsort(lon)
    lon = lon[order]
    lat_order = np.argsort(lat)
    lat = lat[lat_order]
    pw = np.array(payload["precipitableWaterMm"], dtype=float)[lat_order][:, order]
    slp = np.array(payload["slpHpa"], dtype=float)[lat_order][:, order]
    pw = np.clip(pw, 0, None)
    return lat, lon, pw, slp


def window_field(lat, lon, field, south, north, west, east, step):
    lat_m = (lat >= south - 2.5) & (lat <= north + 2.5)
    lon_m = (lon >= west - 2.5) & (lon <= east + 2.5)
    sub_lat = lat[lat_m]
    sub_lon = lon[lon_m]
    sub = field[np.ix_(lat_m, lon_m)]
    grid_lat = np.arange(south, north + step * 0.5, step)
    grid_lon = np.arange(west, east + step * 0.5, step)
    interp = RegularGridInterpolator((sub_lat, sub_lon), sub, bounds_error=False, fill_value=np.nan)
    pts = np.array([[la, lo] for la in grid_lat for lo in grid_lon])
    out = interp(pts).reshape(len(grid_lat), len(grid_lon))
    return grid_lon, grid_lat, out


def build_gyda(land) -> None:
    lat, lon, pw, slp = load_gyda()
    west, south, east, north = -24, 48, 28, 76
    step = 0.35
    lon_i, lat_i, pw_i = window_field(lat, lon, pw, south, north, west, east, step)
    _, _, slp_i = window_field(lat, lon, slp, south, north, west, east, step)
    print(
        "gyda PW",
        round(float(np.nanmin(pw_i)), 1),
        round(float(np.nanmax(pw_i)), 1),
        "SLP",
        round(float(np.nanmin(slp_i)), 1),
        round(float(np.nanmax(slp_i)), 1),
    )
    project = lambert(4, 62, 50, 70)
    width, height = 1040, 900
    inner = (58, 18, 860, 800)
    px, frame = fit_projector(project, west, south, east, north, inner)
    lands = land_paths(land, px, west, south, east, north)
    lons = [-20, -10, 0, 10, 20]
    lats = [50, 55, 60, 65, 70, 75]
    grid = graticule(px, west, south, east, north, lons, lats)

    fills = filled_paths(lon_i, lat_i, np.ma.masked_invalid(pw_i), PW_LEVELS)
    slp_min = math.floor(float(np.nanmin(slp_i)) / 4) * 4
    slp_max = math.ceil(float(np.nanmax(slp_i)) / 4) * 4
    slp_levels = list(range(int(slp_min), int(slp_max) + 1, 4))
    pressure = contour_paths(lon_i, lat_i, np.ma.masked_invalid(slp_i), slp_levels)

    parts = [rect(0, 0, width, height, PAPER), frame_rect(frame, SEA)]
    x0, y0, x1, y1 = frame.bounds
    parts.append(
        f'<clipPath id="gyda-clip"><rect x="{x0:.1f}" y="{y0:.1f}" width="{x1 - x0:.1f}" height="{y1 - y0:.1f}"/></clipPath>'
    )
    parts.append('<g clip-path="url(#gyda-clip)">')
    for path, color in zip(fills, PW_COLORS):
        rings = []
        for ring in rings_from_mpl(path, px):
            d = ring_d(ring, tol=1.3)
            if d:
                rings.append(d)
        if rings:
            parts.append(f'<path d="{"".join(rings)}" fill="{color}" fill-rule="evenodd"/>')
    for d in grid:
        parts.append(f'<path d="{d}" fill="none" stroke="#d5dee4" stroke-width="0.7"/>')
    for d in lands:
        parts.append(f'<path d="{d}" fill="{LAND}" stroke="{COAST}" stroke-width="0.7" stroke-linejoin="round"/>')
    placer = Placer()
    drawn = []
    for level, path in pressure:
        coords = path_coords(path)
        if len(coords) < 8:
            continue
        projected = [px(lo, la) for lo, la in coords]
        for d in clip_line(projected, frame.buffer(1)):
            parts.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="1.05"/>')
            drawn.append((level, d))
    parts.append("</g>")

    # Label every 8 hPa, and the innermost values if they fall on a 4 hPa line that is isolated.
    # Every contour is drawn at 4 hPa. Labels that would collide are skipped; the caption says so.
    seen = set()
    for level, d in sorted(drawn, key=lambda item: -len(item[1])):
        if level in seen:
            continue
        pts = [tuple(map(float, pair.split())) for pair in d[1:].split(" L")]
        if len(pts) < 8:
            continue
        text = f"{level:.0f}"
        text_w = placer.text_width(text, 12)
        placed_at = None
        for x, y in pts[:: max(1, len(pts) // 10)]:
            if not frame.contains(Point(x, y)) or placer.blocks(x, y, text_w, 14, gap=5):
                continue
            placed_at = (x, y)
            break
        if placed_at is None:
            continue
        x, y = placed_at
        placer.reserve(x, y, text_w, 14)
        seen.add(level)
        parts.append(
            f'<rect x="{x - text_w / 2 - 2:.1f}" y="{y - 12:.1f}" width="{text_w + 4:.1f}" height="15" rx="2" fill="{PAPER}"/>'
        )
        parts.append(plain(x, y, text, size=12, fill=INK, anchor="middle", weight=650))
    print("gyda labeled", sorted(seen))

    j = int(np.nanargmin(slp_i))
    iy, ix = divmod(j, slp_i.shape[1])
    low = (float(lon_i[ix]), float(lat_i[iy]), float(slp_i[iy, ix]))
    k = int(np.nanargmax(slp_i))
    iy, ix = divmod(k, slp_i.shape[1])
    high = (float(lon_i[ix]), float(lat_i[iy]), float(slp_i[iy, ix]))
    print("gyda L", tuple(round(v, 2) for v in low), "H", tuple(round(v, 2) for v in high))
    for lon_p, lat_p, letter, fill in (
        (low[0], low[1], "L", "#7f1d1d"),
        (high[0], high[1], "H", "#1e3a5f"),
    ):
        x, y = px(lon_p, lat_p)
        parts.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="13" fill="{fill}"/>')
        parts.append(halo(x, y + 5, letter, size=16, fill="#f7f5f2", weight=700, stroke=fill))

    for lon_p, lat_p, text in (
        (-18, 64.8, "Island"),
        (8.5, 61.5, "Norge"),
        (2.5, 56.6, "Nordsjøen"),
        (-3.5, 53.4, "Storbritannia"),
    ):
        x, y = px(lon_p, lat_p)
        if frame.contains(Point(x, y)):
            parts.append(halo(x, y, text, size=15))
    parts.extend(axis_labels(px, frame, lons, lats))
    parts.append(frame_rect(frame, "none", "#9aa7ae"))

    # Legend in the right margin.
    legend_x, legend_y = 888, 48
    parts.append(f'<rect x="{legend_x}" y="{legend_y}" width="132" height="250" rx="6" fill="{PAPER}" stroke="{GRID}"/>')
    parts.append(plain(legend_x + 12, legend_y + 24, "Nedbørbart vann", size=13, anchor="start"))
    bands = [(PW_COLORS[i], f"{PW_LEVELS[i]:.0f}–{PW_LEVELS[i+1]:.0f} mm") for i in range(len(PW_COLORS))]
    for i, (color, label) in enumerate(bands):
        y = legend_y + 44 + i * 28
        parts.append(f'<rect x="{legend_x + 12}" y="{y - 12}" width="18" height="14" fill="{color}" stroke="{GRID}"/>')
        parts.append(plain(legend_x + 38, y, label, size=13, fill=INK, anchor="start", weight=500))
    parts.append(f'<path d="M{legend_x + 12} {legend_y + 196} h28" stroke="{INK}" stroke-width="1.3"/>')
    parts.append(plain(legend_x + 48, legend_y + 200, "Isobar", size=13, anchor="start"))
    parts.append(plain(legend_x + 12, legend_y + 226, "hver 4 hPa", size=13, anchor="start", weight=500))

    title = "Nedbørbart vann og lufttrykk 12. januar 2022 fra NCEP/NCAR. Mørkere blått er mer vanndamp. L og H er laveste og høyeste trykk i kartutsnittet."
    write_component(
        "GydaChart.tsx",
        "GydaChart",
        width,
        height,
        title,
        "".join(parts),
        "h-auto w-full max-w-none max-sm:min-w-[52rem]",
    )


# --- bathymetry ---------------------------------------------------------------

BATHY_LEVELS = [-5600, -3000, -2000, -1000, -500, -200, 0]
BATHY_COLORS = ["#163e52", "#245e78", "#3d7f98", "#6fa8ba", "#9ec9d4", "#cfe3ea"]
BATHY_LINES = [-3000, -2000, -1000, -500, -200]


def build_bathy(land) -> None:
    blob = np.load(ETOPO)
    z = blob["z"].astype(float)
    ny, nx = z.shape
    lat = np.linspace(float(blob["lat0"]), float(blob["lat1"]), ny)
    lon = np.linspace(float(blob["lon0"]), float(blob["lon1"]), nx)
    if lat[0] > lat[-1]:
        lat = lat[::-1]
        z = z[::-1, :]
    smooth = gaussian_filter(np.where(z < 0, z, 0.0), 0.9)
    sea = np.where(z < 0, smooth, np.nan)
    # Contour a 10-arc-minute view of the smoothed 5-arc-minute field.
    sea = sea[::2, ::2]
    lat = lat[::2]
    lon = lon[::2]

    west, south, east, north = -36, 52, 32, 80
    lat_m = (lat >= south) & (lat <= north)
    lon_m = (lon >= west) & (lon <= east)
    lat_w = lat[lat_m]
    lon_w = lon[lon_m]
    field = sea[np.ix_(lat_m, lon_m)]
    print("bathy window", field.shape, "min", np.nanmin(field), "max", np.nanmax(field))

    project = lambert(5, 66, 54, 76)
    width, height = 1240, 1040
    inner = (64, 24, 1000, 980)
    px, frame = fit_projector(project, west, south, east, north, inner)
    lands = land_paths(land, px, west, south, east, north)
    lons = [-30, -20, -10, 0, 10, 20, 30]
    lats = [55, 60, 65, 70, 75]
    grid = graticule(px, west, south, east, north, lons, lats)
    fills = filled_paths(lon_w, lat_w, np.ma.masked_invalid(field), BATHY_LEVELS)
    lines = contour_paths(lon_w, lat_w, np.ma.masked_invalid(field), BATHY_LINES)
    drawn_lines: list[tuple[float, list[tuple[float, float]]]] = []

    parts = [rect(0, 0, width, height, PAPER), frame_rect(frame, "#102f40")]
    x0, y0, x1, y1 = frame.bounds
    parts.append(
        f'<clipPath id="bathy-clip"><rect x="{x0:.1f}" y="{y0:.1f}" width="{x1 - x0:.1f}" height="{y1 - y0:.1f}"/></clipPath>'
    )
    parts.append('<g clip-path="url(#bathy-clip)">')
    for path, color in zip(fills, BATHY_COLORS):
        rings = [ring_d(ring, tol=1.25) for ring in rings_from_mpl(path, px)]
        rings = [d for d in rings if d]
        if rings:
            parts.append(f'<path d="{"".join(rings)}" fill="{color}" fill-rule="evenodd"/>')
    for d in grid:
        parts.append(f'<path d="{d}" fill="none" stroke="#ffffff" stroke-opacity="0.28" stroke-width="0.7"/>')
    for level, path in lines:
        coords = path_coords(path)
        if len(coords) < 8:
            continue
        projected = [px(lo, la) for lo, la in coords]
        simple = LineString(projected).simplify(1.1, preserve_topology=False)
        coords = [(float(x), float(y)) for x, y in simple.coords]
        if len(coords) >= 4:
            drawn_lines.append((float(level), coords))
        parts.append(
            f'<path d="{polyline(simple.coords)}" fill="none" stroke="#12313f" stroke-opacity="0.55" stroke-width="0.9"/>'
        )
    for d in lands:
        parts.append(f'<path d="{d}" fill="{LAND}" stroke="{COAST}" stroke-width="0.8" stroke-linejoin="round"/>')
    parts.append("</g>")

    labels = [
        (-30.5, 73.5, "Grønland", 16),
        (-8.0, 75.5, "Grønlandshavet", 15),
        (-13.0, 68.2, "Islandshavet", 15),
        (-18.6, 64.7, "Island", 15),
        (-6.2, 70.6, "Jan Mayen", 13),
        (2.0, 68.8, "Norskehavet", 16),
        (16.5, 78.2, "Svalbard", 15),
        (9.5, 61.4, "Norge", 16),
        (-7.0, 61.6, "Færøyene", 13),
        (-1.5, 60.4, "Shetland", 13),
        (3.4, 57.2, "Nordsjøen", 15),
        (2.2, 54.6, "Doggerbank", 13),
        (-4.6, 54.2, "Storbritannia", 14),
        (-11.2, 52.2, "Irland", 14),
        (19.2, 58.4, "Østersjøen", 14),
        (-28.0, 58.5, "Nord-Atlanteren", 15),
    ]
    placer = Placer()
    for lon_p, lat_p, text, size in labels:
        x, y = px(lon_p, lat_p)
        if not frame.contains(Point(x, y)):
            print("label outside", text)
            continue
        text_w = placer.text_width(text, size)
        if placer.blocks(x, y, text_w, size, gap=3):
            print("label collision", text)
            y -= size + 6
        if placer.blocks(x, y, text_w, size, gap=3):
            print("label still colliding", text)
        placer.reserve(x, y, text_w, size)
        parts.append(halo(x, y, text, size=size, fill=INK))
    by_depth: dict[int, list[list[tuple[float, float]]]] = {}
    for level, coords in drawn_lines:
        by_depth.setdefault(int(round(abs(level))), []).append(coords)
    for depth, segments in sorted(by_depth.items()):
        text = f"{depth} m"
        text_w = placer.text_width(text, 12)
        placed = False
        for coords in sorted(segments, key=len, reverse=True):
            if placed:
                break
            step = max(1, len(coords) // 16)
            for index in range(2, max(3, len(coords) - 2), step):
                x, y = coords[index]
                if not frame.contains(Point(x, y)) or placer.blocks(x, y, text_w, 14, gap=8):
                    continue
                placer.reserve(x, y, text_w, 14)
                parts.append(
                    f'<rect x="{x - text_w / 2 - 2:.1f}" y="{y - 11:.1f}" width="{text_w + 4:.1f}" height="14" rx="2" fill="{PAPER}" fill-opacity="0.92"/>'
                )
                parts.append(plain(x, y, text, size=12, fill=INK, anchor="middle", weight=650))
                placed = True
                break
        if not placed:
            print("unlabeled depth", depth, "segments", len(segments))
    parts.extend(axis_labels(px, frame, lons, lats))
    parts.append(frame_rect(frame, "none", "#9aa7ae"))

    legend = [
        (LAND, "Land"),
        (BATHY_COLORS[5], "0–200 m"),
        (BATHY_COLORS[4], "200–500 m"),
        (BATHY_COLORS[3], "500–1000 m"),
        (BATHY_COLORS[2], "1000–2000 m"),
        (BATHY_COLORS[1], "2000–3000 m"),
        (BATHY_COLORS[0], "dypere enn 3000 m"),
    ]
    lx, ly = 1024, 70
    parts.append(f'<rect x="{lx - 8}" y="{ly - 28}" width="208" height="{36 + 32 * len(legend)}" rx="6" fill="{PAPER}" stroke="{GRID}"/>')
    parts.append(plain(lx, ly, "Dybde", size=15, anchor="start"))
    for i, (color, label) in enumerate(legend):
        y = ly + 28 + i * 32
        parts.append(f'<rect x="{lx}" y="{y - 12}" width="22" height="16" fill="{color}" stroke="{COAST}" stroke-width="0.6"/>')
        parts.append(plain(lx + 30, y, label, size=13, anchor="start", weight=500))

    title = "Batymetri for De nordiske hav fra ETOPO 2022. Konturer ved 200, 500, 1000, 2000 og 3000 meters dyp, med kystlinje fra Natural Earth."
    write_component(
        "BathyChart.tsx",
        "BathyChart",
        width,
        height,
        title,
        "".join(parts),
        "h-auto w-full max-w-none max-sm:min-w-[56rem]",
    )


# --- T–S diagram --------------------------------------------------------------

def density_kg_m3(t: float, s: float) -> float:
    a0, a1, a2, a3, a4, a5 = 999.842594, 6.793952e-2, -9.09529e-3, 1.001685e-4, -1.120083e-6, 6.536332e-9
    rho_w = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t + a0
    b0, b1, b2, b3, b4 = 0.824493, -4.0899e-3, 7.6438e-5, -8.2467e-7, 5.3875e-9
    c0, c1, c2 = -5.72466e-3, 1.0227e-4, -1.6546e-6
    d0 = 4.8314e-4
    return rho_w + ((((b4 * t + b3) * t + b2) * t + b1) * t + b0) * s + ((c2 * t + c1) * t + c0) * s**1.5 + d0 * s * s


def freezing_point(s: float) -> float:
    return -0.0575 * s + 1.710523e-3 * s**1.5 - 2.154996e-4 * s * s


def temp_for_density(s: float, rho: float, t_lo=-2.5, t_hi=22.0):
    target = rho * 1000.0
    cold = density_kg_m3(t_lo, s)
    warm = density_kg_m3(t_hi, s)
    if target > cold or target < warm:
        return None
    lo, hi = t_lo, t_hi
    for _ in range(48):
        mid = (lo + hi) / 2
        if density_kg_m3(mid, s) > target:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


def isopycnal_curve(level, s0, s1, t0, t1, step=0.05):
    pts = []
    for s in np.arange(s0, s1 + step * 0.5, step):
        temp = temp_for_density(float(s), level)
        if temp is None or temp < freezing_point(float(s)) or temp < t0 or temp > t1:
            if len(pts) > 4:
                break
            continue
        pts.append((float(s), temp))
    return pts


def draw_ts_panel(s0, s1, t0, t1, levels, plot, s_ticks, t_ticks, points, title_text, freeze=True):
    l, r, t, b = plot

    def sx(s):
        return l + (s - s0) / (s1 - s0) * (r - l)

    def sy(temp):
        return b - (temp - t0) / (t1 - t0) * (b - t)

    parts = []
    if title_text:
        parts.append(plain((l + r) / 2, t - 18, title_text, size=16, anchor="middle"))
    parts.append(rect(l, t, r - l, b - t, "#fbfcfd"))
    for s in s_ticks:
        x = sx(s)
        parts.append(f'<line x1="{x:.1f}" y1="{t:.1f}" x2="{x:.1f}" y2="{b:.1f}" stroke="{GRID}" stroke-width="0.8"/>')
    for temp in t_ticks:
        y = sy(temp)
        parts.append(f'<line x1="{l:.1f}" y1="{y:.1f}" x2="{r:.1f}" y2="{y:.1f}" stroke="{GRID}" stroke-width="0.8"/>')
    parts.append(f'<rect x="{l:.1f}" y="{t:.1f}" width="{r - l:.1f}" height="{b - t:.1f}" fill="none" stroke="{INK}" stroke-width="1.1"/>')

    curves = []
    for level in levels:
        pts = isopycnal_curve(level, s0, s1, t0, t1, step=0.04 if (s1 - s0) > 2 else 0.02)
        if len(pts) < 6:
            continue
        d = "M" + " L".join(f"{sx(s):.1f} {sy(temp):.1f}" for s, temp in pts)
        parts.append(f'<path d="{d}" fill="none" stroke="#1d4e89" stroke-width="1.35"/>')
        curves.append((level, pts))

    if freeze:
        freeze_pts = []
        for s in np.arange(s0, s1 + 0.02, 0.05):
            tf = freezing_point(float(s))
            if t0 <= tf <= t1:
                freeze_pts.append((float(s), tf))
        if len(freeze_pts) > 2:
            d = "M" + " L".join(f"{sx(s):.1f} {sy(temp):.1f}" for s, temp in freeze_pts)
            parts.append(f'<path d="{d}" fill="none" stroke="{MARK}" stroke-width="1.8"/>')
            anchor = freeze_pts[min(len(freeze_pts) - 1, int(len(freeze_pts) * 0.55))]
            parts.append(halo(sx(anchor[0]), sy(anchor[1]) - 10, "Frysepunkt", size=13, fill=MARK, anchor="middle", weight=650))

    placer = Placer()
    for s, temp, letter in points:
        placer.reserve(sx(s) + 18, sy(temp) - 4, 28, 24)
    if freeze and len(freeze_pts) > 2:
        anchor = freeze_pts[min(len(freeze_pts) - 1, int(len(freeze_pts) * 0.55))]
        placer.reserve(sx(anchor[0]), sy(anchor[1]) - 8, 78, 16)
    for index, (level, pts) in enumerate(curves):
        text = f"{level:.4f}".replace(".", ",")
        text_w = placer.text_width(text, 12)
        placed = False
        start = 0.18 + (index % 6) * 0.11
        for frac in (start, start + 0.16, start - 0.12, start + 0.28, 0.5, 0.32, 0.7):
            if not 0.08 <= frac <= 0.92:
                continue
            s, temp = pts[min(int(frac * (len(pts) - 1)), len(pts) - 1)]
            x, y = sx(s), sy(temp)
            if x < l + 52 or x > r - 58 or y < t + 24 or y > b - 24:
                continue
            if placer.blocks(x, y, text_w, 14, gap=8):
                continue
            placer.reserve(x, y, text_w, 14)
            parts.append(
                f'<rect x="{x - text_w / 2 - 2:.1f}" y="{y - 12:.1f}" width="{text_w + 4:.1f}" height="15" rx="2" fill="#fbfcfd"/>'
            )
            parts.append(plain(x, y, text, size=12, fill="#1d4e89", anchor="middle", weight=650))
            placed = True
            break
        if not placed:
            s, temp = pts[len(pts) // 2]
            x = min(max(sx(s), l + 46), r - 46)
            y = min(max(sy(temp), t + 16), b - 16)
            if not placer.blocks(x, y, text_w, 14, gap=4):
                placer.reserve(x, y, text_w, 14)
                parts.append(
                    f'<rect x="{x - text_w / 2 - 2:.1f}" y="{y - 12:.1f}" width="{text_w + 4:.1f}" height="15" rx="2" fill="#fbfcfd"/>'
                )
                parts.append(plain(x, y, text, size=12, fill="#1d4e89", anchor="middle", weight=650))
                placed = True
        if not placed:
            print("unlabeled isopycnal", level)

    for s in s_ticks:
        parts.append(plain(sx(s), b + 20, f"{s:.1f}".replace(".", ",").replace(",0", ""), size=13, anchor="middle", weight=500))
    for temp in t_ticks:
        label = f"{temp:.1f}".replace(".", ",").replace(",0", "") if abs(temp) >= 1 or temp == 0 else f"{temp:.1f}".replace(".", ",")
        if float(temp).is_integer():
            label = f"{int(temp)}"
        parts.append(plain(l - 8, sy(temp) + 4, label, size=13, anchor="end", weight=500))
    parts.append(plain((l + r) / 2, b + 44, "Salinitet (PSU)", size=15, anchor="middle"))
    parts.append(
        f'<text x="{l - 40:.1f}" y="{(t + b) / 2:.1f}" text-anchor="middle" font-family="{FONT}" font-size="15" font-weight="600" fill="{INK}" transform="rotate(-90 {l - 40:.1f} {(t + b) / 2:.1f})">Temperatur (°C)</text>'
    )
    for s, temp, letter in points:
        x, y = sx(s), sy(temp)
        parts.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="5.5" fill="{INK}" stroke="{PAPER}" stroke-width="1.5"/>')
        parts.append(halo(x + 12, y - 10, letter, size=18, anchor="start", weight=700))
    return "".join(parts)


def build_ts() -> None:
    a = density_kg_m3(1.0, 29.7)
    b = density_kg_m3(-0.8, 29.4)
    print("density A", round(a, 3), "B", round(b, 3), "freeze 35", round(freezing_point(35), 3))
    if abs(a - 1023.786) > 0.02 or abs(b - 1023.612) > 0.02:
        raise SystemExit("EOS-80 stemmer ikke med de kontrollerte verdiene")
    width, height = 820, 1180
    main_levels = [round(1.022 + i * 0.0005, 4) for i in range(13)]
    inset_levels = [round(1.0234 + i * 0.0001, 4) for i in range(8)]
    parts = [rect(0, 0, width, height, PAPER)]
    parts.append(
        draw_ts_panel(
            28,
            36,
            -2,
            12,
            main_levels,
            (78, 760, 36, 500),
            [28, 30, 32, 34, 36],
            [-2, 0, 2, 4, 6, 8, 10, 12],
            [(29.7, 1.0, "A"), (29.4, -0.8, "B")],
            "",
        )
    )
    parts.append(
        draw_ts_panel(
            29.2,
            30.05,
            -1.6,
            1.8,
            inset_levels,
            (78, 760, 620, 1060),
            [29.2, 29.4, 29.6, 29.8, 30.0],
            [-1.5, -1.0, -0.5, 0, 0.5, 1.0, 1.5],
            [(29.7, 1.0, "A"), (29.4, -0.8, "B")],
            "Utsnitt rundt A og B",
        )
    )
    title = "T–S-diagram med isopyknaler hver 0,0005 kg per kubikkdesimeter, regnet med UNESCO EOS-80. Utsnittet viser A og B tettere."
    write_component(
        "TsChart.tsx",
        "TsChart",
        width,
        height,
        title,
        "".join(parts),
        "h-auto w-full max-w-none max-sm:min-w-[44rem]",
    )


# --- schematic figures --------------------------------------------------------

def catmull(points: list[tuple[float, float]]) -> str:
    if len(points) < 2:
        return ""
    d = [f"M{points[0][0]:.1f} {points[0][1]:.1f}"]
    for i in range(len(points) - 1):
        p0 = points[i - 1] if i > 0 else points[i]
        p1 = points[i]
        p2 = points[i + 1]
        p3 = points[i + 2] if i + 2 < len(points) else p2
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d.append(f"C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}")
    return " ".join(d)


def build_ctd() -> None:
    width, height = 1040, 860

    def profile(z, surface, deep, scale):
        return deep + (surface - deep) * math.exp(-((z / scale) ** 1.15))

    panels = [
        ("Temperaturprofil A", "Temperatur (°C)", -1, 6, [-1, 0, 1, 2, 3, 4, 5, 6], lambda z: profile(z, 5.2, 0.4, 32), "#9a3412"),
        ("Temperaturprofil B", "Temperatur (°C)", -2, 2, [-2, -1, 0, 1, 2], lambda z: -1.45 + 1.7 * (z / 175) ** 0.85, "#1d4e89"),
        ("Salinitetsprofil C", "Salinitet (PSU)", 33.5, 35.0, [33.5, 34, 34.5, 35], lambda z: 34.62 + 0.12 * (z / 175), "#0f6f78"),
        ("Salinitetsprofil D", "Salinitet (PSU)", 32.5, 35.0, [32.5, 33, 33.5, 34, 34.5, 35], lambda z: 34.85 - 2.15 * math.exp(-((z / 38) ** 1.2)), "#9a3412"),
    ]
    parts = [rect(0, 0, width, height, PAPER)]
    for index, (title, xlabel, xmin, xmax, xticks, fn, color) in enumerate(panels):
        col, row = index % 2, index // 2
        ox, oy = 40 + col * 510, 24 + row * 420
        l, r, t, b = ox + 70, ox + 460, oy + 48, oy + 320
        parts.append(plain((l + r) / 2, oy + 28, title, size=18, anchor="middle"))
        parts.append(rect(l, t, r - l, b - t, "#fbfcfd"))
        depths = [0, 50, 100, 150, 175]

        def sy(depth, t=t, b=b):
            return t + depth / 175 * (b - t)

        for depth in depths:
            y = sy(depth)
            parts.append(f'<line x1="{l:.1f}" y1="{y:.1f}" x2="{r:.1f}" y2="{y:.1f}" stroke="{GRID}"/>')
            parts.append(plain(l - 8, y + 4, str(depth), size=13, anchor="end", weight=500))
        for value in xticks:
            x = l + (value - xmin) / (xmax - xmin) * (r - l)
            parts.append(f'<line x1="{x:.1f}" y1="{t:.1f}" x2="{x:.1f}" y2="{b:.1f}" stroke="{GRID}"/>')
            label = f"{value:.1f}".replace(".", ",")
            if float(value).is_integer():
                label = str(int(round(value)))
            parts.append(plain(x, b + 20, label, size=13, anchor="middle", weight=500))
        parts.append(f'<rect x="{l}" y="{t}" width="{r - l}" height="{b - t}" fill="none" stroke="{INK}"/>')
        curve = []
        for depth in range(0, 176, 2):
            value = fn(depth)
            x = l + (value - xmin) / (xmax - xmin) * (r - l)
            curve.append((x, sy(depth)))
        parts.append(f'<path d="{catmull(curve)}" fill="none" stroke="{color}" stroke-width="2.4"/>')
        parts.append(plain((l + r) / 2, b + 44, xlabel, size=14, anchor="middle"))
        parts.append(
            f'<text x="{l - 46}" y="{(t + b) / 2:.1f}" text-anchor="middle" font-family="{FONT}" font-size="14" fill="{INK}" transform="rotate(-90 {l - 46} {(t + b) / 2:.1f})">Dyp (m)</text>'
        )
    title = "Forenklet skjema av to temperaturprofiler og to salinitetsprofiler ned til 175 meter. April og august er ikke merket."
    write_component(
        "CtdChart.tsx",
        "CtdChart",
        width,
        height,
        title,
        "".join(parts),
        "h-auto w-full max-w-none max-sm:min-w-[48rem]",
    )


def build_dye() -> None:
    width, height = 880, 520
    parts = [rect(0, 0, width, height, PAPER)]

    def glass(cx, mode):
        top, bot = 150, 400
        rim_w, base_w = 118, 92
        out = []
        # water body
        water = f"M{cx - rim_w / 2:.1f} {top} L{cx - base_w / 2:.1f} {bot} L{cx + base_w / 2:.1f} {bot} L{cx + rim_w / 2:.1f} {top} Z"
        out.append(f'<clipPath id="glass-{mode}"><path d="{water}"/></clipPath>')
        out.append(f'<g clip-path="url(#glass-{mode})">')
        out.append(f'<path d="{water}" fill="#e7f2f6"/>')
        if mode == "bottom":
            dye_top = 318
            out.append(
                f'<path d="M{cx - rim_w:.1f} {dye_top} L{cx - rim_w:.1f} {bot + 4} L{cx + rim_w:.1f} {bot + 4} L{cx + rim_w:.1f} {dye_top} Z" fill="#2f6f9a"/>'
            )
        else:
            out.append(
                f'<path d="M{cx - rim_w:.1f} {top} L{cx - rim_w:.1f} {214} L{cx + rim_w:.1f} {214} L{cx + rim_w:.1f} {top} Z" fill="#2f6f9a"/>'
            )
        out.append("</g>")
        out.append(
            f'<path d="M{cx - rim_w / 2:.1f} {top} L{cx - base_w / 2:.1f} {bot} L{cx + base_w / 2:.1f} {bot} L{cx + rim_w / 2:.1f} {top}" fill="none" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>'
        )
        out.append(f'<ellipse cx="{cx}" cy="{top}" rx="{rim_w / 2}" ry="12" fill="none" stroke="{INK}" stroke-width="2.2"/>')
        # strainer
        out.append(
            f'<path d="M{cx - 34} 118 h68 l-8 28 h-52 z" fill="#f3efe6" stroke="{INK}" stroke-width="1.6"/>'
        )
        out.append(f'<path d="M{cx - 22} 128 h44 M{cx - 18} 136 h36 M{cx - 8} 118 v28 M{cx + 10} 118 v26" fill="none" stroke="{MUTED}" stroke-width="0.8"/>')
        out.append(f'<rect x="{cx - 16}" y="92" width="32" height="22" rx="3" fill="#d7e7f2" stroke="{INK}" stroke-width="1.4"/>')
        out.append(f'<line x1="{cx}" y1="78" x2="{cx}" y2="92" stroke="{INK}" stroke-width="1.4"/>')
        return "".join(out)

    parts.append(glass(230, "bottom"))
    parts.append(glass(650, "top"))
    parts.append(plain(230, 448, "Glass til venstre", size=20, anchor="middle"))
    parts.append(plain(230, 474, "Fargestoff langs bunnen", size=16, fill=MUTED, anchor="middle", weight=500))
    parts.append(plain(650, 448, "Glass til høyre", size=20, anchor="middle"))
    parts.append(plain(650, 474, "Fargestoff nær overflaten", size=16, fill=MUTED, anchor="middle", weight=500))
    parts.append(f'<rect x="48" y="36" width="18" height="14" fill="#2f6f9a"/>')
    parts.append(plain(74, 48, "Farget smeltevann", size=15, anchor="start", weight=500))
    parts.append(f'<rect x="250" y="36" width="18" height="14" fill="#d7e7f2" stroke="{INK}" stroke-width="1"/>')
    parts.append(plain(276, 48, "Farget isbit i tesil", size=15, anchor="start", weight=500))
    title = "To glass med tesil og farget isbit. Til venstre samler fargestoffet seg langs bunnen. Til høyre blir det liggende nær overflaten."
    write_component(
        "DyeChart.tsx",
        "DyeChart",
        width,
        height,
        title,
        "".join(parts),
        "h-auto w-full max-w-none max-sm:min-w-[40rem]",
    )


def build_permafrost() -> None:
    width, height = 1040, 560
    # Qualitative control points, ka before present -> relative magnitude.
    # Not model output. Eurasia stays much larger. North American area dips near 20 ka.
    eurasia_area = [(125, 0.46), (100, 0.50), (70, 0.58), (40, 0.70), (21, 0.90), (8, 0.55), (0, 0.50)]
    na_area = [(125, 0.30), (90, 0.32), (50, 0.24), (21, 0.08), (8, 0.20), (0, 0.28)]
    eurasia_vol = [(125, 0.42), (90, 0.48), (50, 0.66), (21, 0.88), (8, 0.52), (0, 0.46)]
    na_vol = [(125, 0.24), (90, 0.25), (50, 0.23), (21, 0.22), (8, 0.23), (0, 0.24)]

    def panel(ox, title, eurasia, north):
        l, r, t, b = ox + 78, ox + 470, 56, 400

        def x_of(ka):
            return l + (125 - ka) / 125 * (r - l)

        def y_of(value):
            return b - value * (b - t)

        out = [plain((l + r) / 2, 32, title, size=20, anchor="middle")]
        out.append(rect(l, t, r - l, b - t, "#fbfcfd"))
        for ka in (125, 100, 75, 50, 25, 0):
            x = x_of(ka)
            out.append(f'<line x1="{x:.1f}" y1="{t}" x2="{x:.1f}" y2="{b}" stroke="{GRID}"/>')
            out.append(plain(x, b + 22, str(ka), size=13, anchor="middle", weight=500))
        out.append(f'<rect x="{l}" y="{t}" width="{r - l}" height="{b - t}" fill="none" stroke="{INK}"/>')
        out.append(f'<path d="{catmull([(x_of(k), y_of(v)) for k, v in eurasia])}" fill="none" stroke="#9a3412" stroke-width="2.6"/>')
        out.append(f'<path d="{catmull([(x_of(k), y_of(v)) for k, v in north])}" fill="none" stroke="#1d4e89" stroke-width="2.6"/>')
        ice = x_of(21)
        out.append(f'<line x1="{ice:.1f}" y1="{t}" x2="{ice:.1f}" y2="{b}" stroke="#9f3a3a" stroke-dasharray="5 4" stroke-width="1.2"/>')
        out.append(plain((l + r) / 2, b + 46, "Tusen år før nåtid", size=14, anchor="middle"))
        out.append(
            f'<text x="{l - 36}" y="{(t + b) / 2:.1f}" text-anchor="middle" font-family="{FONT}" font-size="14" fill="{INK}" transform="rotate(-90 {l - 36} {(t + b) / 2:.1f})">Større oppover</text>'
        )
        return "".join(out)

    parts = [rect(0, 0, width, height, PAPER)]
    parts.append(panel(20, "Areal", eurasia_area, na_area))
    parts.append(panel(530, "Volum", eurasia_vol, na_vol))
    # The ice-sheet tag sits in the gap of the North American area curve.
    parts.append(halo(20 + 78 + (125 - 21) / 125 * (470 - 78) + 8, 250, "Innlandsis", size=13, fill="#9f3a3a", anchor="start"))
    parts.append(f'<line x1="70" y1="500" x2="102" y2="500" stroke="#9a3412" stroke-width="3"/>')
    parts.append(plain(110, 505, "Eurasia", size=16, anchor="start"))
    parts.append(f'<line x1="230" y1="500" x2="262" y2="500" stroke="#1d4e89" stroke-width="3"/>')
    parts.append(plain(270, 505, "Nord-Amerika", size=16, anchor="start"))
    parts.append(f'<line x1="460" y1="492" x2="492" y2="492" stroke="#9f3a3a" stroke-dasharray="5 4" stroke-width="1.4"/>')
    parts.append(plain(500, 505, "Om lag siste istids maksimum", size=16, anchor="start"))
    title = "Forenklet skjema av permafrostareal og volum. Kurvene er ikke modelltall. Eurasia er størst, og arealet i Nord-Amerika er minst rundt siste istids maksimum."
    write_component(
        "PermafrostChart.tsx",
        "PermafrostChart",
        width,
        height,
        title,
        "".join(parts),
        "h-auto w-full max-w-none max-sm:min-w-[48rem]",
    )


def build_foehn() -> None:
    width, height = 960, 580
    left, right, top, bottom = 132, 910, 72, 400
    foot_w, peak_x, foot_e = 210, 500, 810
    cool = COLD
    warm_down = "#c2410c"
    ground_gap = 8.0

    def y_of(metres: float) -> float:
        return bottom - metres / 2400 * (bottom - top)

    def ridge(x: float) -> float:
        if x <= foot_w or x >= foot_e:
            return 0.0
        if x <= peak_x:
            t = (x - foot_w) / (peak_x - foot_w)
            return math.sin(t * math.pi / 2) ** 1.05
        t = (x - peak_x) / (foot_e - peak_x)
        return math.cos(t * math.pi / 2) ** 1.08

    def arrowhead(x, y, angle, color) -> str:
        dx, dy = math.cos(angle), math.sin(angle)
        px, py = -dy, dx
        return (
            f'<polygon points="{x + dx:.1f},{y + dy:.1f} '
            f'{x - 13 * dx + 5.2 * px:.1f},{y - 13 * dy + 5.2 * py:.1f} '
            f'{x - 13 * dx - 5.2 * px:.1f},{y - 13 * dy - 5.2 * py:.1f}" fill="{color}"/>'
        )

    def smooth(pts: list[tuple[float, float]], rounds: int = 2) -> list[tuple[float, float]]:
        for _ in range(rounds):
            nxt = [pts[0]]
            for a, b in zip(pts, pts[1:]):
                nxt.append((0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]))
                nxt.append((0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1]))
            nxt.append(pts[-1])
            pts = nxt
        return pts

    y800 = y_of(800)
    y2000 = y_of(2000)
    windward_800 = next(x for x in range(foot_w, peak_x) if 2000 * ridge(x) >= 800)
    crest = [(x, y_of(2000 * ridge(x))) for x in range(foot_w, foot_e + 1, 4)]
    ground = (
        f"M{foot_w} {bottom:.1f} "
        + " ".join(f"L{x:.1f} {y:.1f}" for x, y in crest)
        + f" L{foot_e} {bottom:.1f} Z"
    )

    parts = [rect(0, 0, width, height, PAPER)]
    parts.append(rect(left, top, right - left, bottom - top, "#f3f7fa"))
    for metres in range(0, 2401, 400):
        y = y_of(metres)
        if metres == 800:
            parts.append(f'<line x1="{left - 7:.1f}" y1="{y:.1f}" x2="{left:.1f}" y2="{y:.1f}" stroke="{INK}" stroke-width="1.3"/>')
        else:
            emphasis = metres in (0, 2000)
            dash = "0" if metres == 0 else "3 5"
            parts.append(
                f'<line x1="{left}" y1="{y:.1f}" x2="{right}" y2="{y:.1f}" stroke="{GRID}" stroke-width="{1.15 if emphasis else 0.8}" stroke-dasharray="{dash}"/>'
            )
        parts.append(plain(left - 10, y + 4, str(metres), size=13, anchor="end", weight=650 if metres in (0, 800, 2000) else 500))
    # The cloud-base line is the 800 m tick, continued to the windward slope.
    parts.append(
        f'<line x1="{left:.1f}" y1="{y800:.1f}" x2="{windward_800:.1f}" y2="{y800:.1f}" stroke="{cool}" stroke-width="1.7" stroke-dasharray="7 5"/>'
    )
    parts.append(
        f'<text x="34" y="{(top + bottom) / 2:.1f}" text-anchor="middle" font-family="{FONT}" font-size="15" fill="{INK}" transform="rotate(-90 34 {(top + bottom) / 2:.1f})">Høyde (m)</text>'
    )
    parts.append(f'<path d="{ground}" fill="{LAND}" stroke="{COAST}" stroke-width="1.6" stroke-linejoin="round"/>')

    # Soft orographic cloud. Flat base at 800 m, then a thick body up the
    # windward slope. The ceiling is a low-frequency curve, smoothed, and it
    # meets the summit instead of crossing above 2000 m.
    cloud_left = windward_800 - 46

    def ceiling(x: float) -> float:
        if x <= windward_800:
            u = (x - cloud_left) / max(1, windward_800 - cloud_left)
            return y800 - 40 * math.sin(max(0.0, u) * math.pi / 2) - 6 * math.sin(u * math.pi)
        u = (x - windward_800) / max(1, peak_x - windward_800)
        terrain_y = y_of(2000 * ridge(x))
        thickness = 44 * ((1 - u) ** 0.65) + 10 * math.sin(u * math.pi)
        bump = 6 * math.sin(u * math.pi * 2) * (1 - u)
        return max(terrain_y - thickness - bump, y2000)

    raw_top = [(float(x), ceiling(x)) for x in range(int(cloud_left), peak_x + 1, 6)]
    raw_top[0] = (float(cloud_left), y800)
    raw_top[-1] = (float(peak_x), y_of(2000 * ridge(peak_x)))
    top_pts = smooth(raw_top, 2)
    top_pts[-1] = (float(peak_x), y_of(2000 * ridge(peak_x)))
    slope_pts = [(x, y) for x, y in crest if windward_800 <= x <= peak_x]
    cloud_d = (
        f"M{cloud_left:.1f} {y800:.1f} L{windward_800:.1f} {y800:.1f} "
        + " ".join(f"L{x:.1f} {y:.1f}" for x, y in slope_pts)
        + " "
        + " ".join(f"L{x:.1f} {y:.1f}" for x, y in reversed(top_pts))
        + " Z"
    )
    parts.append(f'<path d="{cloud_d}" fill="#f4f9fc" stroke="#5d7282" stroke-width="1.6" stroke-linejoin="round"/>')
    parts.append(f'<path d="{ground}" fill="none" stroke="{COAST}" stroke-width="1.6" stroke-linejoin="round"/>')

    # Even rain shafts under the cloud base. Each streak has the same length,
    # and only where the whole streak fits above the slope.
    rain_drop = 52
    for x in range(int(cloud_left) + 16, windward_800 - 8, 22):
        y_ground = y_of(2000 * ridge(x))
        if y_ground - y800 < rain_drop + 14:
            continue
        parts.append(
            f'<line x1="{x}" y1="{y800 + 7:.1f}" x2="{x - 7}" y2="{y800 + 7 + rain_drop:.1f}" stroke="{cool}" stroke-width="1.6" stroke-linecap="round"/>'
        )

    def flow_at(x: float) -> tuple[float, float]:
        """Just above the ground, never higher than the 2000 m summit."""
        if x < foot_w:
            return x, bottom - ground_gap
        if x > foot_e:
            return x, bottom - ground_gap
        terrain = 2000 * ridge(x)
        edge = min(abs(x - foot_w), abs(foot_e - x), 36) / 36
        lifted = min(2000.0, terrain + 70 * edge)
        return x, y_of(lifted)

    ascent = [flow_at(x) for x in range(150, peak_x + 1, 4)]
    descent = [flow_at(x) for x in range(peak_x, 890, 4)]
    parts.append(f'<path d="{polyline(ascent)}" fill="none" stroke="{cool}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>')
    parts.append(f'<path d="{polyline(descent)}" fill="none" stroke="{warm_down}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>')
    for path, color, marks in ((ascent, cool, (175, 360)), (descent, warm_down, (650, 850))):
        for mark in marks:
            i = min(range(1, len(path) - 1), key=lambda k: abs(path[k][0] - mark))
            x0, y0 = path[i - 1]
            x1, y1 = path[i + 1]
            angle = math.atan2(y1 - y0, x1 - x0)
            parts.append(arrowhead(*path[i], angle, color))

    parts.append(f'<line x1="{left}" y1="{top}" x2="{left}" y2="{bottom}" stroke="{INK}"/>')
    parts.append(f'<line x1="{left}" y1="{bottom}" x2="{right}" y2="{bottom}" stroke="{INK}"/>')
    parts.append(halo(left + 8, y800 - 13, "Skybase 800 m", size=13, fill=cool, anchor="start"))
    parts.append(halo(peak_x + 36, y2000 - 8, "Topp 2000 m", size=16, anchor="start"))
    parts.append(plain(168, 442, "Loside, 0 m", size=16, anchor="middle"))
    parts.append(plain(168, 466, "14 °C", size=16, anchor="middle"))
    parts.append(plain(860, 442, "Leside, 0 m", size=16, anchor="middle"))
    parts.append(plain(150, 26, "Tørradiabatisk 1 °C / 100 m", size=15, anchor="start"))
    parts.append(plain(150, 48, "Våtadiabatisk 0,5 °C / 100 m i skyen", size=15, anchor="start", fill=cool))
    parts.append(f'<line x1="150" y1="512" x2="186" y2="512" stroke="{cool}" stroke-width="2.6"/>')
    parts.append(arrowhead(188, 512, 0, cool))
    parts.append(plain(202, 516, "Avkjøling på vei opp", size=14, anchor="start", fill=cool))
    parts.append(f'<line x1="150" y1="538" x2="186" y2="538" stroke="{warm_down}" stroke-width="2.6"/>')
    parts.append(arrowhead(188, 538, 0, warm_down))
    parts.append(plain(202, 542, "Oppvarming på vei ned", size=14, anchor="start", fill=warm_down))

    start_h = (bottom - ascent[0][1]) / (bottom - top) * 2400
    end_h = (bottom - descent[-1][1]) / (bottom - top) * 2400
    crest_h = (bottom - min(p[1] for p in ascent + descent)) / (bottom - top) * 2400
    print(
        "foehn start",
        round(start_h, 1),
        "end",
        round(end_h, 1),
        "crest",
        round(crest_h, 1),
        "x800",
        windward_800,
    )
    title = "Fønvind fra havnivå på losiden, gjennom skyen og ned til havnivå på lesiden. 14 grader er temperaturen ved havnivå på losiden. Topp- og lesidetemperatur er ikke regnet ut."
    write_component(
        "FoehnChart.tsx",
        "FoehnChart",
        width,
        height,
        title,
        "".join(parts),
        "h-auto w-full max-w-none max-sm:min-w-[42rem]",
    )


def main() -> None:
    land = load_land()
    print("land polygons", len(land))
    build_analysis(land)
    build_gyda(land)
    build_bathy(land)
    build_ts()
    build_ctd()
    build_dye()
    build_permafrost()
    build_foehn()


if __name__ == "__main__":
    main()
