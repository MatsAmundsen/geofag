"""Gjør DATED-1-kartet (src/lib/geografi-dated1-21ka.json) lett nok for nettleseren.

Kartet vises med Leaflet fra zoom 3 og kan zoomes til maks 11. Originalen hadde
punkter med 6 desimaler og flere punkter enn en skjerm kan vise selv ved zoom 11.

Forenkling (bare utseendenøytral):
- Isflatene (TS21_min/mc/max) forenkles med Douglas-Peucker i Web Mercator-meter
  med toleranse 0,5 skjermpiksel ved zoom 11 (ca. 38 m). Ingen kant flytter seg
  mer enn en halv piksel ved største zoom; ved standardvisning (zoom 3) er det
  1/512 piksel. Topologien bevares (shapely preserve_topology).
- Alle koordinater rundes til 5 desimaler (ca. 1 m).
- Egenskaper (navn, rolle, tidssnitt_ka) og antall objekter er uendret.

Kjør fra repo-roten med den uforenklede filen som input, f.eks.:
  git show 6585f0e:src/lib/geografi-dated1-21ka.json > /tmp/dated1-original.json
  python3 scripts/forenkle-dated1-21ka.py /tmp/dated1-original.json src/lib/geografi-dated1-21ka.json
Krever: pip install shapely numpy
"""
import json
import math
import sys

import numpy as np
import shapely
from shapely.geometry import mapping, shape

R = 6378137.0
MAKS_ZOOM = 11
PIKSEL = 0.5
DESIMALER = 5
TOLERANSE_M = PIKSEL * 2 * math.pi * R / (256 * 2**MAKS_ZOOM)


def til_mercator(xy):
    lon, lat = xy[:, 0], xy[:, 1]
    return np.column_stack((np.radians(lon) * R, np.log(np.tan(np.pi / 4 + np.radians(lat) / 2)) * R))


def fra_mercator(xy):
    x, y = xy[:, 0], xy[:, 1]
    return np.column_stack((np.degrees(x / R), np.degrees(2 * np.arctan(np.exp(y / R)) - np.pi / 2)))


def rund(o):
    if isinstance(o, float):
        return round(o, DESIMALER)
    if isinstance(o, (list, tuple)):
        return [rund(v) for v in o]
    if isinstance(o, dict):
        return {k: rund(v) for k, v in o.items()}
    return o


def forenkle(feature):
    geom = shapely.transform(shape(feature["geometry"]), til_mercator)
    enkel = shapely.transform(geom.simplify(TOLERANSE_M, preserve_topology=True), fra_mercator)
    if not enkel.is_valid:
        raise SystemExit(f"Ugyldig geometri etter forenkling: {feature['properties']}")
    if feature["geometry"]["type"] == "MultiPolygon" and enkel.geom_type == "Polygon":
        enkel = shapely.MultiPolygon([enkel])  # behold originalens geometritype
    return {**feature, "geometry": rund(mapping(enkel))}


def main(inn, ut):
    with open(inn, encoding="utf-8") as f:
        data = json.load(f)
    for snitt in data["snitt"].values():
        snitt["features"] = [forenkle(f) for f in snitt["features"]]
    data["land"] = [{**f, "geometry": rund(f["geometry"])} for f in data["land"]]
    with open(ut, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
        f.write("\n")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
