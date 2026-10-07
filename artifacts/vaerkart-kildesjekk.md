# Kildesjekk: Værkart og værutvikling

Sjekket 2026-10-07. Hver rad i `KILDER_G2.vaerkart` er åpnet i denne runden og svarte HTTP 200.

| Kilde | URL | Status | Påstand den støtter | Vurdering |
| --- | --- | --- | --- | --- |
| NOAA (u.å.-a) | https://www.noaa.gov/jetstream/synoptic/air-masses | HTTP 200 | En luftmasse har ganske jevn temperatur og fuktighet og preges av kildeområdet. Kontinental luft er tørr, maritim er fuktig. Arktisk luft er svært kald, polarluft kald, tropeluft varm. Der luftmasser møtes, dannes fronter. Kald luft er tettere og skyver seg under varm luft. Luftmassene følger vinden i høyden og jetstrømmen. | OK |
| NOAA (u.å.-b) | https://www.noaa.gov/jetstream/synoptic/norwegian-cyclone-model | HTTP 200 | Norske meteorologer beskrev livsløpet i 1910- og 1920-årene. Fronten ligger først nesten i ro. En bølge vokser når et lavtrykk i jetstrømmen passerer. Kaldfronten tar igjen varmfronten, og det blir en okkludert front. Uten den varme lufta i sentrum svekkes lavtrykket. | OK. Jacob Bjerknes og Halvor Solberg er ikke navngitt på siden. De er ikke brukt. |
| NOAA (u.å.-c) | https://www.noaa.gov/jetstream/wxmaps | HTTP 200 | Kald og varm er relativt. En kaldfront kan ha mild luft bak seg hvis lufta foran er enda mildere. Kaldfront tegnes blå med trekanter, varmfront rød med halvsirkler. | OK |
| NOAA (u.å.-d) | https://www.noaa.gov/jetstream/upper-air-charts/constant-pressure-charts-500-mb | HTTP 200 | 500 hPa-kartet er det viktigste høydekartet. Flaten ligger om lag 16 000 til 20 000 fot, omtrent 5 000 til 6 000 meter. Tallet 564 betyr 5 640 meter. Foran sterk virvling stiger lufta, og det kan bli nedbør. | OK. «Halv fart» som styrestrøm står ikke på siden. Det er ikke brukt. |
| NOAA (u.å.-e) | https://www.noaa.gov/jetstream/time | HTTP 200 | Værkart, radar og satellitt tidsstemples i Z-tid, altså UTC. 00Z er midnatt ved nullmeridianen. | OK. De fire hovedterminene 00, 06, 12 og 18 UTC står ikke på siden. De er ikke brukt. |
| NOAA (u.å.-f) | https://www.noaa.gov/jetstream/wxmaps-max/jetstream-max-surface-weather-plot-symbols | HTTP 200 | Symboler for været nå er standardiserte. | OK. Regelen om at «028» betyr 1002,8 hPa står ikke på siden. Den er ikke brukt. |
| Sivle (2009) | https://www.yr.no/artikkel/vaerkart-og-fronter-1.6750800 | HTTP 200, datert 31.8.2009 | Varmfront: rød med halvsirkler, skyet og jevn nedbør. Kaldfront: blå med trekanter, byger. Okklusjon: lilla med begge, når kaldfronten tar igjen varmfronten. Tråg: blå strek uten trekanter, ustabil luft og kraftige byger. Stasjonær front ligger nesten i ro. Ingen faste temperaturgrenser. | OK |
| SNL (u.å.-a) | https://snl.no/front_-_meteorologi | HTTP 200 | Front er skillet mellom luftmasser med ulik tetthet. Helning oftest 1:200 til 1:100. Symboler for stasjonær, kald, varm og okkludert front. Bølger går oftest østover. Kaldfronten tar igjen varmfronten. Frontnedbør. Vilhelm Bjerknes og Bergensskolen. | OK |
| SNL (u.å.-b) | https://snl.no/polarfront | HTTP 200 | Polarfronten skiller kald luft fra høye breddegrader og varm luft fra subtropene, vanligvis 40–70°. Bergensskolen innførte begrepet fra 1918. Vandrende lavtrykk langs fronten. | OK |
| SNL (u.å.-c) | https://snl.no/isobar | HTTP 200 | Isobar gjennom likt trykk. Trykk fra høytliggende steder reduseres til havnivå. Norske kart: vanligvis 5 hPa. Met Office: 4 hPa, og da ligger linjene tettere. Mønsteret viser horisontal bevegelse og gir et hint om loddrett bevegelse, skyer og nedbør. | OK |
| Udir (u.å.-a) | https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer | HTTP 200 | Jordsystemer og prosesser. Modeller brukes til å undersøke, forklare og presentere geofaglige prosesser og fenomener. | OK |
| Udir (u.å.-b) | https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973 | HTTP 200 | Gjøre rede for hvordan ulike værsystemer oppstår og utvikler seg på global, regional og lokal skala, og tolke ulike værkart og værutvikling. | OK. Sitert som u.å., ikke 2020. |

## Byttet ut

| Gammel lenke | Hvorfor | Hva som brukes i stedet |
| --- | --- | --- |
| https://doi.org/10.1002/qj.49704920608 | HTTP 403. DOI-en peker på Quarterly Journal, ikke Geofysiske Publikasjoner. | NOAA om den norske syklonmodellen, og SNL om Bjerknes og Bergensskolen. |
| https://library.wmo.int/records/item/35767-manual-on-the-global-data-processing-and-forecasting-system | Tomt svar fra serveren i denne runden. | NOAA om Z-tid. Hovedterminene 00, 06, 12 og 18 er ikke tatt med. |
| https://www.met.no | Forsiden svarte 200, men den støtter ikke enkeltpåstandene. | SNL om isobar og Yr om fronter. |
| https://www.udir.no/lk20/gfg01-03 | Planroten, sitert som 2020. | kv973, kompetansemål etter geofag 2. |

## Tatt ut

| Påstand | Hvorfor |
| --- | --- |
| Milliarder av målinger i nøyaktig samme sekund, og 40–80 km/t | Ikke funnet på sidene som ble åpnet. |
| Geilo 920 hPa mot Bergen 1013 hPa, hydrostatisk formel | Regnestykket er tatt ut. Havnivåreduksjon står igjen, med SNL. |
| F_c = 2 · m · v · Ω · sin φ, og vinkler 10–20° og 25–40° | Formelen og vinklene er tatt ut. Friksjon og innkryssing er bare nevnt, med peker til coriolis. |
| Trykkkoden «028» = 1002,8 hPa, og knop-skalaen på vindpilen | Ikke funnet på NOAA-siden om symboler. |
| Styrestrøm i halv fart av 500 hPa-vinden | Ikke funnet på 500 hPa-siden. |
| dBZ-grenser, skytopp −60 °C, MEPS og fargene på farevarsel | Ikke åpnet en side som sier det. Radar og satellitt er bare knyttet til UTC. |
