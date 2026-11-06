# Klimanormaler for Oslo – Blindern, figur 5.1

## Oppdrag og avgrensning

Mats valgte kontrollerte normaltall fra en ekte målestasjon. Oppdateringen er en ny lokal commit på `geografi-kap5`, etter den allerede publiserte kapittelcommitten. Den amender ikke eller rebaser den publiserte historikken. Kapittel 7 rebaseres bare lokalt etterpå, før oppdragsgiver eventuelt pusher.

Figur 5.1 bruker nå **Oslo – Blindern**, stasjon **18700 / SN18700**, **94 meter over havet**, med normalperiode **1991–2020**. Stasjonsnavn, nummer og høyde står i METs temperaturfil. Stasjonen er ikke merket med stjernen som angir individuelle begrensninger for enkelte andre stasjoner.

Temperatur er månedsmiddeltemperatur, elementkode **TAM**, i grader celsius. Nedbør er normal månedsnedbør, elementkode **RR**, i millimeter. Dette er beregnede stasjonsnormaler basert på observasjoner, ikke direkte råmålinger, ett bestemt års vær, prognoser eller en normal for hele Oslo. Metoderapporten beskriver blant annet homogenisering og utfylling av manglende data. Ingen bestemt korreksjon ved Blindern påstås uten dokumentasjon.

## Verdier kontrollert 6. november 2026

| Måned | Temperatur, °C | Nedbør, mm |
| --- | --- | --- |
| Jan | −2,3 | 58 |
| Feb | −2,0 | 46 |
| Mar | 1,3 | 41 |
| Apr | 6,2 | 48 |
| Mai | 11,4 | 60 |
| Jun | 15,3 | 80 |
| Jul | 17,7 | 87 |
| Aug | 16,5 | 103 |
| Sep | 12,2 | 82 |
| Okt | 6,6 | 93 |
| Nov | 2,2 | 85 |
| Des | −1,4 | 54 |

METs publiserte årsnormaler er **7,0 °C** og **837 mm**. De tolv avrundede månedsnormalene for nedbør summerer også til 837 mm. Temperaturenes årsmiddel beregnes ikke som et uvektet gjennomsnitt i komponenten.

## Originalfiler og sporbarhet

- [Temperaturfil, publisert 17. september 2021](https://www.met.no/kss/_/attachment/download/a2d191d6-b9ef-4d78-ac26-9eee4ce28743:969dfb48bad54d95b9dca7685778f05448f42892/StNormaler_mnd_middeltemp_1991-2020.txt). Filen er lest som Latin-1. Raden for stasjon 18700 i tabellen «Månedsnormaler 1991 - 2020 for TAM, Middeltemperatur» inneholder de tolv verdiene og årsnormalen. SHA-256: `97a951db97cd6762b28b8fec842a60830182da76a21952b47c82015b022904d0`.
- [Rettet nedbørfil, publisert 29. februar 2024](https://www.met.no/kss/_/attachment/download/bb6a7fc4-429b-48a7-9788-9c5651774ba4:2a626567cdf7a7822a683029f30d0f8bf21efc18/StNormaler_mnd_nedbor_1991-2020_rettet.txt). Filen er lest som UTF-8. Rader med `STNR=18700`, `ELEM_CODE=RR`, `FYEAR=1991` og `TYEAR=2020` er valgt. `MONTH=1–12` er måneder, `MONTH=13` er år. Sesong- og halvårskoder 21–26 er ikke brukt som måneder. SHA-256: `d41446f775429ccb6c12eb962a6bf0367beb32f2305adb19beada4bb23260e78`.
- [Norsk klimaservicesenters normaloversikt](https://klimaservicesenter.no/kss/vrdata/normaler), oppdatert oktober 2025, oppgir filenes publiseringsdatoer og at små senere justeringer kan forekomme.
- [Tveito, 2021, MET report 05/2021](https://www.met.no/publikasjoner/met-report/met-report-2021/_/attachment/inline/31bb0160-d8cf-4a2b-9646-4df6f5904059:3ac4fec6cf3fb7919aefe42db2b63ad8e8b9e6a6/METreport%2005_2021_New_Norwegian_standard_climate_normals_1991_2020-signert.pdf), datert 25. august 2021, er brukt for beregningsmetoden.
- [METs lisensiering og kreditering](https://www.met.no/frie-meteorologiske-data/lisensiering-og-kreditering), datert 3. juni 2026, tillater fri bruk under NLOD og CC BY 4.0. Figuren viser kreditering, direkte datalenker, egen framstilling og [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Normalverdiene er uendret.

Månedsrekkene ble hentet programmatisk fra de nedlastede originalfilene og skrevet til `src/lib/geografi-klimanormaler.ts`. Metadata og originale filkontrollsummer følger samme modul. Diagrammet gjør ingen nettverkskall, og tester avhenger ikke av en levende API-tjeneste. Sekundære, ulikt avrundede eller eldre nettverdier er ikke blandet inn.

## APA, tekst og reseed

De fem nye kildeoppføringene er registrert i `kilder-geografi.ts`. Temperaturfilen er **Meteorologisk institutt, 2021a**, og den eldre artikkelen «Ny normal i klimaforskningen» er konsekvent **2021b**, etter alfabetisk tittelrekkefølge. Den rettede nedbørfilen er **Meteorologisk institutt, 2024**. Lisensen, normaloversikten og metoderapporten har egne henvisninger. Kapittel 5 har nå 29 kilder.

Tekst, figurtekst, tabell, oppgaver og kapitteloverlevering er oppdatert. Merkingen av akkurat dette diagrammet som konstruert er fjernet. Den separate scenariofiguren er fortsatt en kvalitativ modell, ikke en beregnet klimaframskrivning. Det nye flagget `geo-klima-normaler-blindern-1991-2020-2026-11-06` er lagt til i `COPY_RESEEDS_B`, mens tidligere flagg er beholdt. Ingen produksjonsreseed eller deploy er utført.

Oppdatert maskinell ordtelling av elevposten: 6528 ord, inkludert overskrifter og oppgaver, uten widgetkoder, skjulte markører og lenkemål.

## Validering av normaloppdateringen

- Typecheck og ESLint på alle berørte TypeScript- og TSX-filer: bestått uten feil eller advarsler.
- Relevante geografi-, seed- og reseed-tester: 75 av 75 bestått, inkludert eksakt kontroll av alle 24 månedsverdier, periode, stasjon, kilde og nytt reseed.
- Serverrendering: ni Vg1-figurer bestått. Klimadiagrammet har tolv tabellrader, én temperaturlinje, stasjonsnavn, periode, datakreditering og lisens, uten den gamle øvingsmerkingen. Åtte eksisterende Geofag-standardfigurer gir byte-identisk HTML mot `origin/geografi-kap4`.
- Build: bestått med `DATABASE_URL` fjernet. Loggen bekrefter at ekstern migrering hoppes over. Ingen deploy er utført.
- Full skripttestdel: 206 tester, 188 bestått, 17 kjente feil og én hoppet over. Separat TypeScript-testdel: 240 tester, 235 bestått og fem kjente `poster-markdown`-feil. Feilnavnene er identiske med kapittel 5-baselinen, uten nye regresjoner.
- `git diff --check` og kontroll av forbudte markdowntegn: bestått.
- Ingen nettleser-, interaksjons- eller full WCAG-kontroll er påstått. De tre tidligere kartplassholderne i kapittel 5 gjenstår uendret.

Logger: `/workspace/geografi-kap5-normaler-*.log`. Baselinesammenlikning: `/workspace/geografi-kap5-normaler-validering.json`. Kildenedlastinger, cache og logger ligger utenfor versjonert innhold.
