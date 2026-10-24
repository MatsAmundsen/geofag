# PR: Lokale værsystemer – gruppe 1-oppfølging

**Branch:** `figurloft/lokale-gruppe1-oppfolging`  
**Ikke merge** før Mats har sagt ja i chatten.

## Hva

Oppfølging etter #194 (gruppe 1: sjøbris A, solgangsvind B, polarfrontsyklon L).

### A · Sjøbris
- Minst **5 px luft** rundt skiltene i steg 5 (`skiltLuft={5}`), også mellom skiltene (kant til kant med halo).
- **Solhinder** (punkt 150, 80, r 46), pluss hus og trær som hinder, så skiltene ikke legger seg over sola eller bebyggelsen.
- Den godkjente tilstanden i steg 5 er beholdt: bygeskya og regnet følger terrenget, og «Sjøbrisfront» peker på foten av fronten ved bakken.

### L · Polarfrontsyklon
- **Plassholder** målt i trinn (`skala.smal` + `skala.smalSm` for vindu ≥ 640 px), så hoppene ved bl.a. 407 og 515–520 og rundt 640 er borte eller ikke verre enn main (Designsjekk2: 0 avvik ved 405–409, 512–522 og 759–761).
- **Større frontsymboler** på smal skjerm (`symbolRadius` i `lokale-syklon.tsx`).
- **K/O-hinder** utvidet fra 30 til 44, og **trippelpunktet** er eget hinder, så skiltene holder seg unna okklusjonspunktet.
- Målpunktet for **«Varm luft løftes fra bakken»** er flyttet fra (T+20, T−14) til **(T+16, T−34)** – litt over fronten øst for okklusjonspunktet (den løftede varmluftsektoren).

### B · Solgangsvind
- Ingen logikendring i denne oppfølgingen (kit-endringer er valgfrie; bare A setter `skiltLuft`).

## Kjente restavvik (like i main)
- **−20 px** for L (og tilsvarende for A) ved vindu **850–1023**, på grunn av statusfeltet. Felles sak senere.
- **+10,5 px** for L ved vindu **369–370** med **redusert bevegelse** (Start/Pause-knappen ulik bredde). Ved vanlig bevegelse er avviket 0.

## Filer
- `src/components/diagrams/lokale-kit.tsx`
- `src/components/diagrams/lokale-sjobris.tsx`
- `src/components/diagrams/lokale-syklon.tsx`
- `src/components/diagrams/prosess-figurer-lat.tsx` (bare `SyklonFigurLat` / `smalSm`)

## Sjekker
- Designsjekk2: **GODKJENT** på `c0ac57f` (label-hit 0, skilt2 0 funn, plassholder 0 ved kritiske bredder, Værkart/LandskapBlokk uendret).
- Geo: fagsjekk godkjent med merknad om plassholder; DS2 gjenskapte ikke Geos hopp-tall. Geo måler på nytt med samme metode som DS2.
- tsc ok; lint: bare kjente feil som på main; poster-markdown 41/43 (2 kjente).

## Merge
**Ikke merge** uten Mats sitt ja.
