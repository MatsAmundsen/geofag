#!/usr/bin/env python3
"""Bygg Kartverket-kart med løype og isobarpunkter rundt Sognsvann."""

from __future__ import annotations

import io
import json
import math
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT_DIR = Path("/workspace/opplegg")
TILE_DIR = Path("/tmp/kv-tiles")
UA = "geofag-felt/1.0 (skoleopplegg, Kartverket-attribusjon)"
TILE = "https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

LOOP_WAYS = [
    "170609996",
    "170609997",
    "798537409",
    "511751071",
    "4977703",
    "148279758",
    "326257106",
    "830254715",
    "830138815",
    "85028329",
    "830911550",
    "798537406",
    "122258573",
    "85028330",
]

TEAL = (31, 111, 106, 255)
NAVY = (27, 58, 75, 255)
WHITE = (255, 255, 255, 255)
INK = (26, 26, 26, 255)
ROUTE = (196, 48, 38, 255)
ROUTE_EDGE = (255, 255, 255, 230)
METRO = (40, 70, 150, 230)

POSTS_LOOP = {
    "A": (59.97015, 10.72855, "Badeplassen"),
    "B": (59.97540, 10.72370, "Vestsida"),
    "C": (59.98015, 10.72540, "Pinabekken"),
    "D": (59.97555, 10.73300, "Mot Svartkulp"),
}
T_BANE = (59.96714, 10.73397, "Sognsvann T")

ISOBAR = [
    ("1", 59.97248, 10.70028, "Vetakolltoppen"),
    ("2", 59.96714, 10.73397, "Sognsvann T"),
    ("3", 59.97566, 10.74029, "Svartkulp"),
    ("4", 59.95386, 10.75227, "Tåsen"),
    ("5", 59.94675, 10.73205, "Ullevål stadion"),
    ("6", 59.94013, 10.71607, "Blindern"),
]

METRO_LINE = [
    (59.96714, 10.73397),
    (59.96470, 10.73520),  # Kringsjå, omtrent
    (59.96080, 10.74080),  # Holstein, omtrent
    (59.95720, 10.74650),  # Østhorn, omtrent
    (59.95386, 10.75227),  # Tåsen
    (59.95040, 10.74280),  # Berg, omtrent
    (59.94675, 10.73205),  # Ullevål
    (59.94380, 10.72350),  # Forskningsparken, omtrent
    (59.94013, 10.71607),  # Blindern
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_B if bold else FONT, size)


def lonlat_to_global(lat: float, lon: float, z: int) -> tuple[float, float]:
    n = 2**z
    x = (lon + 180.0) / 360.0 * n * 256.0
    lat_r = math.radians(lat)
    y = (1.0 - math.log(math.tan(lat_r) + 1.0 / math.cos(lat_r)) / math.pi) / 2.0 * n * 256.0
    return x, y


def fetch(url: str, retries: int = 4) -> bytes:
    last = None
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=20) as r:
                return r.read()
        except Exception as e:
            last = e
            time.sleep(0.4 * (i + 1))
    raise RuntimeError(f"Kunne ikke hente {url}: {last}")


def lake_ring() -> list[tuple[float, float]]:
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode(
        {
            "q": "Sognsvann, Oslo",
            "format": "json",
            "limit": 1,
            "polygon_geojson": 1,
            "countrycodes": "no",
        }
    )
    data = json.loads(fetch(url).decode())
    gj = data[0]["geojson"]
    coords = gj["coordinates"][0] if gj["type"] == "Polygon" else gj["coordinates"][0][0]
    # lon,lat -> lat,lon and drop closing duplicate
    ring = [(lat, lon) for lon, lat in coords]
    if ring and ring[0] == ring[-1]:
        ring = ring[:-1]
    return ring


def expand_ring(ring: list[tuple[float, float]], meters: float = 35.0) -> list[tuple[float, float]]:
    clat = sum(p[0] for p in ring) / len(ring)
    clon = sum(p[1] for p in ring) / len(ring)
    m_lat = 111_320.0
    m_lon = 111_320.0 * math.cos(math.radians(clat))
    out = []
    for lat, lon in ring:
        dy = (lat - clat) * m_lat
        dx = (lon - clon) * m_lon
        dist = math.hypot(dx, dy) or 1.0
        out.append((clat + (dy / dist) * (dist + meters) / m_lat, clon + (dx / dist) * (dist + meters) / m_lon))
    return out


def osm_loop() -> list[tuple[float, float]]:
    cache = Path("/tmp/sognsvann.osm")
    if not cache.exists():
        bbox = "10.7225,59.9688,10.7342,59.9812"
        cache.write_bytes(fetch(f"https://api.openstreetmap.org/api/0.6/map?bbox={bbox}"))
    root = ET.parse(cache).getroot()
    nodes = {n.get("id"): (float(n.get("lat")), float(n.get("lon"))) for n in root.findall("node")}
    ways = {}
    for way in root.findall("way"):
        pts = [nodes[nd.get("ref")] for nd in way.findall("nd") if nd.get("ref") in nodes]
        if pts:
            ways[way.get("id")] = pts
    path: list[tuple[float, float]] = []
    for wid in LOOP_WAYS:
        pts = ways.get(wid)
        if not pts:
            continue
        if path:
            d_same = math.hypot(path[-1][0] - pts[0][0], path[-1][1] - pts[0][1])
            d_rev = math.hypot(path[-1][0] - pts[-1][0], path[-1][1] - pts[-1][1])
            if d_rev < d_same:
                pts = list(reversed(pts))
        elif pts[0][1] > pts[-1][1]:
            # start westbound from the beach
            pts = list(reversed(pts))
        if path and pts and path[-1] == pts[0]:
            pts = pts[1:]
        path.extend(pts)
    if path and path[0] != path[-1]:
        path.append(path[0])
    if len(path) < 20:
        return expand_ring(lake_ring(), 15)
    return path


def nearest(path: list[tuple[float, float]], lat: float, lon: float) -> tuple[float, float]:
    return min(path, key=lambda p: (p[0] - lat) ** 2 + (p[1] - lon) ** 2)


def stitch(z: int, lat_min: float, lat_max: float, lon_min: float, lon_max: float, pad: int = 80) -> tuple[Image.Image, tuple[float, float]]:
    x0, y1 = lonlat_to_global(lat_min, lon_min, z)
    x1, y0 = lonlat_to_global(lat_max, lon_max, z)
    left = int(min(x0, x1) - pad)
    top = int(min(y0, y1) - pad)
    right = int(max(x0, x1) + pad)
    bottom = int(max(y0, y1) + pad)
    tx0, ty0 = left // 256, top // 256
    tx1, ty1 = right // 256, bottom // 256
    canvas = Image.new("RGBA", ((tx1 - tx0 + 1) * 256, (ty1 - ty0 + 1) * 256), (245, 245, 240, 255))
    TILE_DIR.mkdir(parents=True, exist_ok=True)
    for ty in range(ty0, ty1 + 1):
        for tx in range(tx0, tx1 + 1):
            cache = TILE_DIR / f"{z}-{tx}-{ty}.png"
            if cache.exists():
                raw = cache.read_bytes()
            else:
                raw = fetch(TILE.format(z=z, x=tx, y=ty))
                cache.write_bytes(raw)
            tile = Image.open(io.BytesIO(raw)).convert("RGBA")
            canvas.paste(tile, ((tx - tx0) * 256, (ty - ty0) * 256))
    origin = (tx0 * 256.0, ty0 * 256.0)
    cropped = canvas.crop((left - tx0 * 256, top - ty0 * 256, right - tx0 * 256, bottom - ty0 * 256))
    return cropped.convert("RGBA"), (left, top)


def to_xy(lat: float, lon: float, z: int, origin: tuple[float, float]) -> tuple[int, int]:
    gx, gy = lonlat_to_global(lat, lon, z)
    return int(round(gx - origin[0])), int(round(gy - origin[1]))


def draw_polyline(draw: ImageDraw.ImageDraw, pts: list[tuple[int, int]], fill, width: int) -> None:
    if len(pts) < 2:
        return
    draw.line(pts, fill=fill, width=width, joint="curve")


def circle(draw: ImageDraw.ImageDraw, xy: tuple[int, int], r: int, fill, outline, ow: int = 3) -> None:
    x, y = xy
    draw.ellipse((x - r, y - r, x + r, y + r), fill=fill, outline=outline, width=ow)


def label_box(img: Image.Image, xy: tuple[int, int], text: str, fnt, fill=NAVY, offset=(14, -22)) -> None:
    draw = ImageDraw.Draw(img)
    tw = draw.textbbox((0, 0), text, font=fnt)
    w, h = tw[2] - tw[0] + 10, tw[3] - tw[1] + 8
    x, y = xy[0] + offset[0], xy[1] + offset[1]
    x = max(12, min(x, img.width - w - 12))
    y = max(12, min(y, img.height - h - 12))
    draw.rounded_rectangle((x, y, x + w, y + h), radius=4, fill=WHITE, outline=fill, width=2)
    draw.text((x + 5, y + 3), text, font=fnt, fill=fill)


def north_arrow(img: Image.Image, xy: tuple[int, int]) -> None:
    draw = ImageDraw.Draw(img)
    x, y = xy
    draw.polygon([(x, y - 28), (x + 9, y + 10), (x, y + 2), (x - 9, y + 10)], fill=NAVY)
    draw.text((x - 6, y + 12), "N", font=font(14, True), fill=NAVY)


def attribution(img: Image.Image) -> None:
    draw = ImageDraw.Draw(img)
    text = "Kartgrunnlag: Kartverket"
    fnt = font(12)
    bbox = draw.textbbox((0, 0), text, font=fnt)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x, y = 10, img.height - h - 14
    draw.rounded_rectangle((x - 4, y - 3, x + w + 8, y + h + 5), radius=3, fill=(255, 255, 255, 210))
    draw.text((x, y), text, font=fnt, fill=INK)


def legend(img: Image.Image, items: list[tuple[tuple[int, int, int, int], str]], xy: tuple[int, int]) -> None:
    draw = ImageDraw.Draw(img)
    fnt = font(14)
    width = 268
    height = 20 + 24 * len(items)
    x, y = xy
    draw.rounded_rectangle((x, y, x + width, y + height), radius=6, fill=(255, 255, 255, 235), outline=NAVY, width=2)
    yy = y + 10
    for color, text in items:
        draw.line((x + 14, yy + 8, x + 46, yy + 8), fill=color, width=5)
        draw.text((x + 54, yy), text, font=fnt, fill=INK)
        yy += 24


def arrows_on_ring(draw: ImageDraw.ImageDraw, pts: list[tuple[int, int]], every: int = 90) -> None:
    n = len(pts)
    if n < 8:
        return
    for i in range(0, n, every):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 6) % n]
        ang = math.atan2(y2 - y1, x2 - x1)
        tip = (x2, y2)
        left = (int(x2 - 16 * math.cos(ang - 0.45)), int(y2 - 16 * math.sin(ang - 0.45)))
        right = (int(x2 - 16 * math.cos(ang + 0.45)), int(y2 - 16 * math.sin(ang + 0.45)))
        draw.polygon([tip, left, right], fill=ROUTE)


def build_loop() -> Path:
    ring = osm_loop()
    posts = {k: (*nearest(ring, lat, lon), name) for k, (lat, lon, name) in POSTS_LOOP.items()}
    lats = [p[0] for p in ring] + [T_BANE[0]] + [v[0] for v in posts.values()]
    lons = [p[1] for p in ring] + [T_BANE[1]] + [v[1] for v in posts.values()]
    img, origin = stitch(
        16,
        min(lats),
        max(lats),
        min(lons) - 0.0022,
        max(lons) + 0.0022,
        pad=130,
    )
    z = 16
    pts = [to_xy(lat, lon, z, origin) for lat, lon in ring]
    draw = ImageDraw.Draw(img)
    draw_polyline(draw, pts, ROUTE_EDGE, 13)
    draw_polyline(draw, pts, ROUTE, 8)
    arrows_on_ring(draw, pts, every=max(8, len(pts) // 6))

    offsets = {
        "A": (16, 14),
        "B": (-128, -16),
        "C": (16, -34),
        "D": (16, -16),
    }
    for key, (lat, lon, name) in posts.items():
        xy = to_xy(lat, lon, z, origin)
        circle(draw, xy, 16, TEAL, WHITE, 3)
        fnt = font(16, True)
        tb = draw.textbbox((0, 0), key, font=fnt)
        tw, th = tb[2] - tb[0], tb[3] - tb[1]
        draw.text((xy[0] - tw / 2, xy[1] - th / 2 - 1), key, font=fnt, fill=WHITE)
        label_box(img, xy, f"{key}  {name}", font(15, True), offset=offsets[key])

    txy = to_xy(T_BANE[0], T_BANE[1], z, origin)
    circle(draw, txy, 11, NAVY, WHITE, 3)
    label_box(img, txy, "Start: Sognsvann T-bane", font(14, True), offset=(-170, 14))

    north_arrow(img, (img.width - 40, 48))
    legend(
        img,
        [(ROUTE, "Løype med klokka"), (TEAL, "Målepost A–D"), (NAVY, "T-bane")],
        (16, 16),
    )
    attribution(img)
    out = OUT_DIR / "kart-loype.png"
    img.convert("RGB").save(out, "PNG", optimize=True)
    return out


def build_isobar() -> Path:
    lats = [p[1] for p in ISOBAR]
    lons = [p[2] for p in ISOBAR]
    img, origin = stitch(14, min(lats), max(lats), min(lons), max(lons), pad=150)
    z = 14
    draw = ImageDraw.Draw(img)
    metro = [to_xy(lat, lon, z, origin) for lat, lon in METRO_LINE]
    draw_polyline(draw, metro, (255, 255, 255, 230), 8)
    draw_polyline(draw, metro, METRO, 5)

    walk_west = [to_xy(59.96714, 10.73397, z, origin), to_xy(59.97248, 10.70028, z, origin)]
    walk_east = [to_xy(59.96714, 10.73397, z, origin), to_xy(59.97566, 10.74029, z, origin)]
    for pts in (walk_west, walk_east):
        draw_polyline(draw, pts, ROUTE_EDGE, 7)
        draw_polyline(draw, pts, ROUTE, 4)

    offsets = {
        "1": (-20, -36),
        "2": (14, 12),
        "3": (12, -28),
        "4": (12, -8),
        "5": (12, 10),
        "6": (-20, 14),
    }
    for key, lat, lon, name in ISOBAR:
        xy = to_xy(lat, lon, z, origin)
        circle(draw, xy, 15, TEAL, WHITE, 3)
        fnt = font(15, True)
        tb = draw.textbbox((0, 0), key, font=fnt)
        tw, th = tb[2] - tb[0], tb[3] - tb[1]
        draw.text((xy[0] - tw / 2, xy[1] - th / 2 - 1), key, font=fnt, fill=WHITE)
        label_box(img, xy, f"{key}  {name}", font(13, True), offset=offsets[key])

    north_arrow(img, (img.width - 36, 42))
    legend(
        img,
        [(ROUTE, "Til fots"), (METRO, "T-bane linje 5"), (TEAL, "Trykkpunkt 1–6")],
        (14, 14),
    )
    attribution(img)
    out = OUT_DIR / "kart-isobarer.png"
    img.convert("RGB").save(out, "PNG", optimize=True)
    return out


def main() -> tuple[Path, Path]:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    loop = build_loop()
    iso = build_isobar()
    print(loop, iso)
    return loop, iso


if __name__ == "__main__":
    main()
