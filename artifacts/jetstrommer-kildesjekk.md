# Kildesjekk: Jetstrømmer og stormbaner

Sjekket 7. oktober 2026 med curl, uten nettleser-User-Agent.

| Kode | Side | HTTP |
| --- | --- | --- |
| NOAA, u.å.-a | https://www.noaa.gov/jetstream/global/jet-stream | 200 |
| NOAA, u.å.-b | https://www.climate.gov/news-features/understanding-climate/climate-variability-north-atlantic-oscillation | 200 |
| SNL, u.å. | https://snl.no/polarfront | 200 |
| Udir, u.å.-a | https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer | 200 |
| Udir, u.å.-b | https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973 | 200 |

## Tatt ut av kildelisten

| Gammel lenke | Status | Hvorfor den ikke er med |
| --- | --- | --- |
| https://www.climate.gov/enso | 200 | Siden om El Niño og La Niña nevner ikke jetstrøm. Ingen påstand i kapittelet er hentet derfra. |
| https://www.ipcc.ch/report/ar6/wg1/ | 200 | Forsiden til rapporten. Ingen jet-påstand er hentet fra den åpnede siden. |

`https://snl.no/jetstrøm`, `https://snl.no/jetstraum` og `https://snl.no/polarjetstrøm` svarte 404. Polarfrontjetstrømmen er beskrevet i SNL-artikkelen om polarfronten.

## Tall som står igjen, fordi de står på den åpnede siden

- Typisk høyde rundt 9100 meter, vind fra vest mot øst, og fart som kan passere 442 km/t (275 mph) (NOAA jetstrøm).
- Polarjet mellom 50° og 60°, subtropisk jet rundt 30°. Sterkest om vinteren.
- Bakken ved ekvator beveger seg østover med over 1600 km/t. Ved polene er farten null.
- Om sommeren på den nordlige halvkule ligger polarjeten typisk nær grensen mellom USA og Canada.
- Polarfronten ligger vanligvis mellom 40° og 70°, og polarfrontjetstrømmen er det sterke, oftest vestlige vindfeltet i høyden (SNL).
- Positiv og negativ NAO, Island og Asorene, og virkningen på Nord-Europa og Sør-Europa (NOAA NAO). Siden sier Nord-Europa, ikke Norge spesielt.

## Tatt ut av den gamle sideteksten

- Bredde 200–500 km, tykkelse 2–4 km, vanlig fart 150–250 km/t og ekstreme kjerner 400–450 km/t.
- Wasaburo Oishi, B-29 og Shinkansen.
- Flytid New York–Oslo, klarværsturbulens og cirrusstriper som fingeravtrykk.
- Egne høyder 9–11 km og 13–16 km, tropopause 16–17 km mot 8–9 km, og polar natt-jet i 25–40 km.
- Termisk vind med 1013 hPa, 5700 mot 5200 meter, og ozonlagets −75 °C mot −50 °C.
- Rossby-bølger, omegablokkering og 2018, jetkjernens fire kvadranter, og vinterfart over 350 km/t mot 100–150 km/t om sommeren.
- Diagrammene med disse tallene er ikke tatt med i posteren. De inneholder også utropstegn.

NOAA-siden om jetstrømmen returnerte 200 med curl uten nettleser-User-Agent.
