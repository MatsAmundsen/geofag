# Kildesjekk: Lokale og regionale værsystemer

Sjekket 7. oktober 2026 med curl, uten nettleser-User-Agent. Alle lenkene under svarte HTTP 200, og påstandene i kapittelet er hentet fra teksten på de sidene.

| Kode | Side | HTTP |
| --- | --- | --- |
| NOAA, u.å.-a | https://www.noaa.gov/jetstream/ocean/sea-breeze | 200 |
| NOAA, u.å.-b | https://www.noaa.gov/jetstream/synoptic/norwegian-cyclone-model | 200 |
| Sivle, 2009 | https://www.yr.no/artikkel/vaerkart-og-fronter-1.6750800 | 200 |
| SNL, u.å.-a | https://snl.no/polarfront | 200 |
| SNL, u.å.-b | https://snl.no/sj%C3%B8bris | 200 |
| SNL, u.å.-c | https://snl.no/orografisk_nedb%C3%B8r | 200 |
| SNL, u.å.-d | https://snl.no/regnskygge | 200 |
| SNL, u.å.-e | https://snl.no/solgangsvind | 200 |
| SNL, u.å.-f | https://snl.no/landbris | 200 |
| SNL, u.å.-g | https://snl.no/f%C3%B8n | 200 |
| SNL, u.å.-h | https://snl.no/berg-_og_dalvind | 200 |
| SNL, u.å.-i | https://snl.no/dalvind | 200 |
| SNL, u.å.-j | https://snl.no/bergvind | 200 |
| SNL, u.å.-k | https://snl.no/katabatisk_vind | 200 |
| SNL, u.å.-l | https://snl.no/anabatisk_vind | 200 |
| SNL, u.å.-m | https://snl.no/inversjon_-_meteorologi | 200 |
| Udir, u.å.-a | https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer | 200 |
| Udir, u.å.-b | https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973 | 200 |

## Byttet ut

| Gammel lenke | Status | Erstattet med |
| --- | --- | --- |
| https://doi.org/10.1002/qj.49704920608 (Bjerknes og Solberg, 1922) | 403 | NOAA Norwegian cyclone model og SNL polarfront. Sidene navngir Bergensskolen og Vilhelm Bjerknes, ikke Jacob Bjerknes og Halvor Solberg. |
| https://www.udir.no/lk20/gfg01-03 sitert som 2020 | 200, men planroten, ikke kompetansemålet | kv973 og kjerneelementer |

`https://snl.no/fønvind`, `https://snl.no/temperaturinversjon`, `https://snl.no/fjellvind` og `https://snl.no/solgangsbris` svarte 404. Artiklene heter føn, inversjon (meteorologi), bergvind og solgangsvind.

## Tall som står igjen, fordi de står på den åpnede siden

- Sjøbrisfronten kan senke temperaturen med så mye som 8–11 °C, og returstrømmen ligger ofte i 1000–1500 meters høyde (NOAA).
- Langs norskekysten kan solgangsvinden øke til 15–25 knop når den blåser parallelt med kysten (SNL solgangsvind).
- Føn varmer synkende luft med omtrent én grad per hundre meter. Tafjord målte 21,8 °C i november 2003 (SNL føn).
- Ottadalen ned mot 200 mm i året, Jostedalsbreen omkring 3000 mm (SNL regnskygge).
- Polarfronten skråner cirka 1:100 og ligger vanligvis mellom 40° og 70° (SNL polarfront).
- Blindern −13,1 °C og Tryvann +2,3 °C den 5. januar 2002. Bergen −3,4 °C ved bakken, −1,6 °C i 250 m og −4,8 °C i 650 m den 25. januar 2021 (SNL inversjon).

## Tatt ut av den gamle sideteksten

Tallene og formlene under sto i den kodede siden, men ikke på en side som svarte 200 i denne sjekken.

- Spesifikk varmekapasitet 4184 J/(kg·K) og 800–1000 J/(kg·K).
- Bakketemperatur 25–30 °C, hav 16 °C, natt 8–10 °C, kontraster 8–12 °C og 3–5 °C, og vind 8–12 m/s mot 1–3 m/s. NOAA skriver tvert imot at landbrisen ikke er svakere fordi oppvarming og avkjøling skjer med ulik takt.
- Sjøbrisens bredde 10–50 km, varighet 6–10 timer, og dreining spesielt mot nordvest. SNL beskriver dreining mot høyre, til vind langs kysten, og at vinden i fjorder ikke bøyer av.
- Frostlomme 10–15 °C, katabatisk vind 3–8 m/s og termisk belte 5–10 °C. Norsk katabatisk vind er beholdt som «sjeldan meir enn frisk bris».
- Sunndalsøra og Tafjord +15 til +19 °C. Tafjord 21,8 °C i november 2003 er beholdt.
- Tørradiabat 1,0 °C/100 m, fuktadiabat 0,6 °C/100 m, latent varme 2,5·10⁶ J/kg og fønformelen. SNL føn sier omtrent én grad per hundre meter ved synking, og at regn på losiden betyr mindre enn man før trodde.
- Relativ fuktighet 20–30 % på lesiden.
- Normal temperaturendring −0,65 °C per 100 m, og subsidensinversjon i 500–1500 m.
- Rossby-tallet og formelen Ro = U / (f·L).
- Fronthelning 1:150 og 1:50, syklonens levetid 4–7 dager, fødsel sørvest for Island, 1000 km i døgnet og skyrekkefølge 1000–1500 km foran varmfronten.
- Jacob Bjerknes og Halvor Solberg som navngitte forfattere av modellen.

Fønkalkulatoren og sjøbrissimulatoren er ikke med. De viste temperaturer og vindstyrker som ikke står på de åpnede sidene. Diagrammene for solgangsvind, dalvind og syklonstegene er beholdt, uten de gamle vindtallene 5–10 m/s og 2–5 m/s.
