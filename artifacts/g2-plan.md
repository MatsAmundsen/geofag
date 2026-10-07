# Geofag 2: kartlegging før omskriving

Dato: 7. oktober 2026. Ingen kapitler er endret. Dette er bare oversikten.

Malen er den samme som i G1-omskrivingen: kort ingress, boks med kompetansemål og kjerneelementer, forklaringsbokser, minst én tabell, misforståelser, overskriften «Viktige begreper», quiz med 5 spørsmål, kilde i teksten og i `KILDER`, verifiserbar lenke, ingen «!», norsk term først, lite formelmatte.

«Følger malen» er **Ja** bare når alle punktene er på plass i teksten eleven faktisk ser. **Nær** betyr at ett punkt mangler. Alt annet er **Nei**.

Høytrykk og lavtrykk og Coriolis er nylig skrevet. Bare høytrykk ligger nær malen. Coriolis er en lang coded-side og følger den ikke.

## Hva som er telt

- **Ordtelling** er ingressen pluss brødteksten eleven ser. For poster er det markdownen. For coded er det tekstnoder og tekststrenger i TSX. Klassenavn er tatt ut. Der en setning er delt av `<em>` eller `<strong>`, kan tallet ligge litt under den faktiske teksten.
- **bodyMode** er det ruta setter. Uten prop er standarden `coded`.
- **Quiz** er antall `prompt` i quizen som rendres. For høytrykk er det `QUIZ_HOYTRYKK`.
- **Kilder** er lista ruta sender til `TopicLayout` (`KILDER` eller `KILDER_G2`).
- **Lenker** er sjekket med `curl -L` 7. oktober 2026, 110 unike adresser. `www.bom.gov.au` svarte 403 på første forsøk og 200 med nettleser-header, og er telt som 200. DOI-er som ender på Wiley eller Science.org med 403, er løst opp av doi.org, men forlagssiden stenger den automatiske klienten. De er ikke telt som 200.

`/tema/kryosfare` er en omdirigering til `/tema/kryosfaeren`, ikke et kapittel.

Alle sider unntatt høytrykk rendres fra TSX. Det ligger likevel en markdown-seed i `src/lib/posts/` som ruta ikke laster. Seed og det som vises, er to tekster.

## Kapitlene

Leserekkefølgen i menyen.

| Slug | Tittel | Ord | Mal | bodyMode | Quiz | Kilder | Lenker | Åpenbare problemer |
|---|---|---:|---|---|---:|---:|---|---|
| hoytrykk-lavtrykk | Høytrykk og lavtrykk | 1734 | Nær | poster | 5 | 4 | 4×200 | Mangler kompetansemål- og kjerneelementboks. Ellers malen: forklaringsboks «Hva betyr mettet», tabell, misforståelser, Viktige begreper, norsk term først, ingen «!». |
| vindsystemet | Det globale vindsystemet | 1486 | Nei | coded | 6 | 12 | 12×200 | Ingen kompetansemålboks, ingen tabell, begrepsliste heter «Nøkkelbegreper». Ingen «!». Seed brukes ikke. |
| vaerkart | Værkart og værutvikling | 3152 | Nei | coded | 6 | 8 | 7×200, 1×403 | 10 «!», formler, begrepsliste heter «Nøkkelbegreper», misforståelser ligger i «eksamensfeller». DOI til Bjerknes og Solberg 1922 gir 403 hos forlaget. Seed brukes ikke. |
| lokale-vaersystemer | Lokale og regionale værsystemer | 2162 | Nei | coded | 6 | 8 | 7×200, 1×403 | 7 «!», ingen tabell, begrepsliste uten overskriften «Viktige begreper», tynt med sitater i teksten. Samme Bjerknes-DOI som værkart, 403. Seed brukes ikke. |
| jetstrommer | Jetstrømmer og stormbaner | 2719 | Nei | coded | 6 | 4 | 4×200 | 15 «!», ingen kompetansemålboks, ingen tabell, ingen misforståelsesboks. Seed brukes ikke. |
| coriolis | Corioliseffekten | 2745 | Nei | coded | 6 | 5 | 3×200, 1×403, 1×DNS | Nylig skrevet, men ikke etter malen. 23 «!», formler (`f = 2Ω sin φ`, Rossby-tall), quiz med 6 spørsmål, ingen kompetansemålboks. `www.metoffice.gov` finnes ikke. AMS-ordlisten svarer 403. Seed brukes ikke. |
| havstrommer | Havstrømmer: Drivkrefter, Ekman og gyrer | 1896 | Nei | coded | 6 | 10 | 5×200, 1×403, 1×404, 3 uten lenke | 9 «!», formler, ingen tabell, begreper ligger i «begrepsapparat». NOAA-siden om AMOC er 404. Stommel 1948 er 403 hos forlaget. Ekman 1905, Talley 2011 og Marshall & Plumb 2008 har ingen URL. Seed brukes ikke. |
| klima | Klima og klimasystemer | 268 | Nei | coded | 3 | 6 | 6×200 | Kartside, ikke et fagkapittel. Quiz med 3 spørsmål, ingen tabell, ingen forklaringsboks, ingen sitater i teksten. Deler `KILDER.klima` med oversikten. |
| klima/oversikt | Klimasystemet (oversikt) | 962 | Nei | coded | 3 | 6 | 6×200 | Kort. Ingen «!», har kompetansemål, misforståelser og «Viktige begreper». Quiz har 3 spørsmål, og siden har ingen tabell. Samme kildeliste som kartsiden. Seed `oversikt.md` brukes ikke. |
| klima/enso | ENSO: El Niño og La Niña | 2812 | Nei | coded | 6 | 5 | 3×200, 2×404 | Ingen kompetansemålboks, ingen tabell. To AMS-DOI-er fra 1969 og 1997 svarer 404. Seed `enso.md` brukes ikke. |
| klima/iod | IOD: Den indiske hav-dipolen | 1402 | Nei | coded | 6 | 11 | 9×200, 1×403, 1×404 | 4 «!», ingen tabell, begreper uten overskriften «Viktige begreper». Nature Climate Change-DOI 2019 er 404. Wiley-DOI 2007 er 403. Seed `iod.md` brukes ikke. |
| klima/nao | NAO: Den nordatlantiske oscillasjon | 2522 | Nei | coded | 8 | 7 | 1×200, 3×403, 2×404, 1 uten lenke | 5 «!», quiz med 8 spørsmål, ingen kompetansemålboks, ingen tabell. met.no-siden om NAO er 404. JQS-DOI 2000 er 404. Tre Science/Wiley-DOI-er er 403. Walker og Bliss 1932 har ingen URL. Seed `nao.md` brukes ikke. |
| klima/amoc | AMOC: Den atlantiske omveltningssirkulasjonen | 1517 | Nei | coded | 6 | 8 | 6×200, 2×403 | 10 «!», ingen tabell, begreper uten overskriften «Viktige begreper». To DOI-er (Wiley 2018 og Science Advances) er 403. Seed `amoc.md` brukes ikke. |
| kryosfaeren | Kryosfæren: Massebalanse, permafrost og havis | 1744 | Nei | coded | 6 | 9 | 6×200, 2×403, 1 uten lenke | 10 «!», formler, ingen tabell, begreper i «begrepsapparat». To DOI-er er 403. Benn og Evans 2010 har ingen URL. Seed brukes ikke. |
| numeriske-modeller | Numeriske modeller: Fra fysiske lover til superdatamaskiner | 3454 | Nei | coded | 6 | 7 | 6×200, 1×DNS | 9 «!», ingen kompetansemålboks, ingen tabell. Scopus-verten `explore.scopus.com` finnes ikke. Seed brukes ikke. |
| paleoklima | Paleoklima | 2348 | Nei | coded | 8 | 6 | 5×200, 1×403 | 2 «!», mye formelmatte (δ¹⁸O), quiz med 8 spørsmål, ingen tabell, ingen misforståelsesboks, begreper uten overskriften «Viktige begreper». Deler JQS-DOI med istider, 403. Seed brukes ikke. |
| milankovitch | Istider | 2196 | Nei | coded | 4 | 10 | 6×200, 4×403 | Quiz med 4 spørsmål, ingen tabell, ingen misforståelsesboks. Fire DOI-er (Science, AGU, JQS) er 403. Seed brukes ikke. |
| vaerkatastrofer | Værkatastrofer | 3530 | Nei | coded | 7 | 12 | 9×200, 3×404 | 10 «!», formler, quiz med 7 spørsmål, ingen kompetansemålboks, ingen tabell. To met.no-sider og én NVE-side er 404. Seed brukes ikke. |
| tilpasning | Konsekvenser og tilpasning | 2124 | Nei | coded | 8 | 4 | 4×200 | 3 «!», quiz med 8 spørsmål, formler, ingen misforståelsesboks, begreper uten overskriften «Viktige begreper», tynt med sitater i teksten. Seed brukes ikke. |
| energi-hav-luft | Energi fra hav og atmosfære | 2235 | Nei | coded | 6 | 4 | 4×200 | 13 «!», formler, ingen tabell, begreper uten overskriften «Viktige begreper». Seed brukes ikke. |
| felt-hav-luft-is | Feltarbeid i hav, luft og is | 2200 | Nei | coded | 6 | 3 | 3×200 | 15 «!», ingen tabell, begreper uten overskriften «Viktige begreper». Sitatet i teksten sitter i kompetansemålboksen. Seed brukes ikke. |

## Lenker som ikke svarte 200

83 av 110 svarte 200 på første forsøk. BOM ble 200 ved nytt forsøk, så 84 er 200. 15 DOI- eller ordlistesider svarte 403 etter at doi.org hadde sendt videre til forlaget. 9 svarte 404. 2 verter lot seg ikke slå opp.

### 404

| Kapittel | URL |
|---|---|
| havstrommer | https://www.climate.gov/news-features/understanding-climate/climate-change-atlantic-meridional-overturning-circulation |
| klima/enso | https://doi.org/10.1175/1520-0493(1969)097<0163:ATFTEP>2.0.CO;2 |
| klima/enso | https://doi.org/10.1175/1520-0442(1997)010<1823:AEORPF>2.0.CO;2 |
| klima/iod | https://doi.org/10.1038/s41558-019-0566-4 |
| klima/nao | https://doi.org/10.1002/1099-1417(200009)15:6<587::AID-JQS559>3.0.CO;2-3 |
| klima/nao | https://www.met.no/vaer-og-klima/klima-og-klimavariasjoner |
| vaerkatastrofer | https://www.met.no/vaer-og-klima/ekstremvaer |
| vaerkatastrofer | https://www.met.no/vaer-og-klima/ekstremvaer/polare-lavtrykk |
| vaerkatastrofer | https://www.nve.no/naturfare/flom-og-overvann/ |

### DNS

| Kapittel | URL |
|---|---|
| coriolis | https://www.metoffice.gov/weather/learn-about/weather/atmosphere/coriolis-effect |
| numeriske-modeller | https://explore.scopus.com/record?eid=2-s2.0-85010645063 |

### 403 etter oppslag

DOI-en peker til en forlagsside som svarer 403 mot denne klienten. AMS-ordlisten gjør det samme uten DOI. De er ikke bekreftet som 200, og de er ikke bekreftet døde.

| Kapittel | URL |
|---|---|
| coriolis | https://glossary.ametsoc.org/wiki/Coriolis_parameter |
| vaerkart, lokale-vaersystemer | https://doi.org/10.1002/qj.49704920608 |
| havstrommer | https://doi.org/10.1029/TR029i002p00202 |
| klima/amoc | https://doi.org/10.1002/2017GL076350 |
| klima/amoc | https://doi.org/10.1126/sciadv.adk1189 |
| klima/iod | https://doi.org/10.1111/j.1365-2028.2006.00707.x |
| klima/nao | https://doi.org/10.1126/science.269.5224.676 |
| klima/nao | https://doi.org/10.1029/134GM01 |
| klima/nao | https://doi.org/10.1126/science.1063315 |
| kryosfaeren | https://doi.org/10.1002/ppp.1922 |
| kryosfaeren | https://doi.org/10.1029/2002RG000123 |
| paleoklima, milankovitch | https://doi.org/10.1002/jqs.1227 |
| milankovitch | https://doi.org/10.1126/science.194.4270.1121 |
| milankovitch | https://doi.org/10.1029/2004PA001071 |
| milankovitch | https://doi.org/10.1126/science.1076120 |

### Uten URL

Bøker og en artikkel som står i lista uten `href`. De er ikke HTTP-sjekket.

| Kapittel | Oppføring |
|---|---|
| havstrommer | Ekman 1905, *Arkiv för matematik, astronomi och fysik* |
| havstrommer | Talley, Pickard, Emery og Swift 2011, *Descriptive physical oceanography* |
| havstrommer | Marshall og Plumb 2008, *Atmosphere, ocean, and climate dynamics* |
| kryosfaeren | Benn og Evans 2010, *Glaciers and glaciation* |
| klima/nao | Walker og Bliss 1932, *Memoirs of the Royal Meteorological Society* |

## Foreslått rekkefølge

Én PR per kapittel, i leserekkefølgen. Senere kapitler viser til de tidligere, så malen bør være låst før vind, hav og klimasvingningene skrives om. Coriolis tas med i rekkefølgen som en full omskriving.

1. **Høytrykk og lavtrykk** (`hoytrykk-lavtrykk`). Lukk kompetansemålboksen. Siden er allerede poster og er malen de andre skal ligne.
2. **Det globale vindsystemet** (`vindsystemet`).
3. **Værkart og værutvikling** (`vaerkart`).
4. **Lokale og regionale værsystemer** (`lokale-vaersystemer`).
5. **Jetstrømmer** (`jetstrommer`).
6. **Corioliseffekten** (`coriolis`). Full omskriving: ta bort «!», kutt formlene ned, quiz til 5, og bytt de to lenkene som ikke svarer.
7. **Havstrømmer** (`havstrommer`).
8. **Klima og klimasystemer** (`klima`). Kort kartside, egen PR.
9. **Klimasystemet (oversikt)** (`klima/oversikt`).
10. **ENSO** (`klima/enso`).
11. **IOD** (`klima/iod`).
12. **NAO** (`klima/nao`).
13. **AMOC** (`klima/amoc`).
14. **Kryosfæren** (`kryosfaeren`).
15. **Numeriske modeller** (`numeriske-modeller`).
16. **Paleoklima** (`paleoklima`).
17. **Istider** (`milankovitch`).
18. **Værkatastrofer** (`vaerkatastrofer`).
19. **Konsekvenser og tilpasning** (`tilpasning`).
20. **Energi fra hav og atmosfære** (`energi-hav-luft`).
21. **Feltarbeid i hav, luft og is** (`felt-hav-luft-is`).

`/tema/kryosfare` trenger ingen PR.
