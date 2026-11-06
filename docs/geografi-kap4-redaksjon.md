# Kapittel 4 – redaksjonell overlevering

## Omfang og arbeidsgren

- Kapittel: Ytre krefter og landskapet i Norge.
- Rute: `/geografi/landskap`. Post: `src/lib/posts/geo-landskap.md`.
- Arbeidsgren: `geografi-kap4`, opprettet fra `origin/geografi-kap3`.
- Base ved oppstart: `dc9ae5999e459283358236e2b0b751b57a4aabe2`, kapittel 3 i utkast-PR #301.
- Bare kapittel 4 er skrevet i denne leveransen. Kapittel 5 er fortsatt skjelett.
- Leveransen skal committes lokalt. Push og PR-oppretting gjøres av oppdragsgiver, ikke her.
- Ingen merge, main-push, force-push, CloudAgent, deploy eller endring av DNS/Cloudflare.

## Tekst og pedagogikk

Fagteksten har 4668 ord etter at skjulte figurmarkører, widgetkoder og lenkemål er fjernet. Tellingen inkluderer overskrifter, spørsmål, oppgaver, begrepsliste og henvisninger, men ikke kilderegisterets eller modellenes tekst. Åpningen har 190 ord og er uttrykkelig en tenkt scene, ikke en påstått gjennomført befaring.

Sju avtalte underkapitler er skrevet:

1. Ytre krefter.
2. Istider og isbreer.
3. Landformer fra is.
4. Landhevning og marin grense.
5. Elver og landformer.
6. Kystlandskapet.
7. Landskap og mennesker.

Kapitlet har kompetansemål, læringsmål, innledende tenkespørsmål, oppsummering, alle 18 avtalte begreper, tolv spørsmål, fem refleksjonsspørsmål, sju oppgaver med a/b/c og tre quizformater med begrunnede svar. Hovedmålet er KM480. KM483 omtales som et støttemål, ikke som fullstendig dekket av dette kapitlet.

Brødtekstens 50 avsnitt har 4–5 setninger. Gjennomsnittet etter fjerning av parenteshenvisninger er 13,6 ord per setning, med median 14. Oppgaver, lister og figurtekster inngår ikke i denne rytmemålingen. Den nye markdown-teksten inneholder verken utropstegn eller mindre-enn-tegn.

Geografi har en selvstendig Vg1-forklaring av forvitring og landheving i tråd med sin kapittelplan. Ingen tekst flyttes mellom Geofag-kapitler, og de etablerte Geofag-sidene endres ikke.

## Faglige avgrensninger

- Forvitring skilles fra flytting av materialet, og erosjon skilles fra avsetning.
- Siste istids omtrentlige tidsramme brukes ikke som alder på hver dal eller morene.
- Breens massebalanse, frontposisjon og kartlagt areal er ulike observasjoner. Ingen konstruerte temperaturkoeffisienter eller øyeblikkelig frontprognose brukes i Vg1-visningen.
- Fjord krever forbindelse til havet. U-form alene gjør ikke en dal til en fjord.
- Marin grense er lokal. Landheving, havnivåendring og tidspunkt for isavsmelting må skilles.
- Mulig marin leire betyr ikke påvist kvikkleire. Kart og farge brukes ikke som ferdig grunnundersøkelse eller sikkerhetsvurdering.
- Jordtap fra dyrket mark er ikke samme kartspørsmål som kvikkleireskredfare. NIBIOs erosjonskart omtales med hovedkartets forutsetning om høstpløying uten erosjonstiltak.
- Strandflaten forklares med flere prosesser, uten en sikker alder eller én eneste årsak.
- Åknes plasseres ved Sunnylvsfjorden, ikke inne i Geirangerfjorden. NVEs omtale er datert 19. juni 2026. Skredvolumer, sannsynligheter, bølgehøyder og ankomsttider er bevisst utelatt.
- Ingen feltoppgave ber elever grave, teste leire eller oppsøke utsatte skråninger. Geofaglige kilder er ikke reiseråd eller sanntidsvarsler.

## Figurer som er levert

Alle er egne geografi-widget-ID-er. Standardvisningene og de gamle widget-ID-ene beholdes.

| Figur | Widget | Tilpasning for Vg1 |
| --- | --- | --- |
| 4.1 | GeoLandskapFrost | Gjenbruk av Frostsprengning. Fire enkle trinn; mer avansert isvekstforklaring og temperaturintervall skjules. Egen status og kildebelagt bildetekst. |
| 4.2 | GeoLandskapBrelandskap | VdalTilUdal er tilpasset tre nummererte trinn, før/under/etter, med samme perspektiv og telefonutsnitt. Ingen fjordfase med kameraskifte i Vg1. |
| 4.3 | GeoLandskapBotn | Eksisterende terrengmodell. Tankeeksperiment med stillestående is og ekstra målere skjules. Egen overskrift, bildetekst og tydelig konstruert terreng. |
| 4.4 | GeoLandskapMassebalanse | Gjenbruk av modellramme og breprofil, med en egen enkel differanse mellom konstruert tilførsel og tap. To merkede skyvere, desimalkomma og ingen ELA/AAR, permafrost eller navngitt breprognose. |
| 4.5 | GeoLandskapMarinGrense | Gjenbruk av IsostasiSnitt. Skjuler istykkelsesskyveren og avanserte lagetiketter. Presiserer lokal marin grense, mulig leire og modellens faste havnivå. |
| 4.6 | GeoLandskapKvikkleire | Vg1-modus i KvikkleireDiagram med eksisterende Diagram-verktøy og skråningsgeometri. Enkel partikkel–landskap-kjede, betingede årsaksledd og rulling på små skjermer. Geofags retrogressive firetrinnsfigur er uendret. |

Figur 4.2 løser før/under/etter-funksjonen ved å tilpasse eksisterende figur, uten å innføre en stor ny StegFigur-komponent. Kobling til et virkelig fotografi gjennom ModellTilFoto er ikke levert.

## Skjulte figurplassholdere som gjenstår

Seks referansedefinisjoner merket FIGURPLASSHOLDER er synlige i kildefilen, men usynlige i elevvisningen. Det finnes ingen synlige oppfordringer om å lese disse manglende figurene.

| Figur | Gjenstående arbeid |
| --- | --- |
| 4.0 | Kontroller konkret Commons-kart over siste istids maksimum, datagrunnlag og lisens; lag norske etiketter og tydelig tidsmerking. |
| 4.7 | Lag egne trinnsekvenser for meander, avsnøring, terrasse og delta, uten oppdiktede endringshastigheter. |
| 4.8 | Velg konkrete kystbilder/kartutsnitt og kontroller sted, dato, målestokk, rettigheter og kreditering. |
| 4.9 | Velg NVE-bredatasett og tjeneste. Oppgi kartleggingsår, dekning og lisens. Ikke kall et gammelt kart «i dag». |
| 4.10 | Velg datert Geiranger-bilde. Eventuelt oversiktskart må plassere Åknes korrekt ved Sunnylvsfjorden. |
| 4.11 | Lag egen snittfigur av leirslette og ravine. Skill jordtap, mulighet for marin leire og skredfare; bruk ikke oppdiktede faregrenser. |

Ingen eksterne bilder, satellittdata eller kartfiler er importert. Planens generelle lisensnotater er derfor ikke behandlet som ferdig rettighetsklarering for et konkret nytt bilde.

## Kilder og verifisering

31 kilder er lagt til bare under `geo-landskap` i `kilder-geografi.ts`: 18 SNL-artikler, fem NGU-sider, tre NVE-sider, tre NIBIO-sider, UNESCO og Udir. Alle 31 adresser ga HTTP 200 ved egen kontroll 6. november 2026. Faginnholdet er lest med WebFetch og offentlig HTML-henting; NVE-sider som tidsavbrøt i WebFetch, ble lest fra offentlig HTML. SNL-forfattere er kontrollert mot byline og tilgjengelige Article-metadata. Artikler uten en sikkert synlig dato er ført med u.å.; artikler uten navngitt forfatter er ført med institusjon.

APA-henvisninger brukes i teksten og de geografi-spesifikke bildetekstene. Elevvisningens KILDER-liste hentes fra det eksisterende registeret. Lærebok og interne fagbiblioteker står ikke i den elevrettede kildelisten.

| Påstander/tema | Sentrale kontrollerte kilder |
| --- | --- |
| Forvitring, frost og erosjon | Spjeldnæs; Sørbel 2024; Bryhni og Røthe 2025. |
| Istider, brebevegelse og breformer | NGU Om løsmasser; Liestøl med flere; Bryhni og Fossen 2024; Lilleøren 2025; Mæhlum 2026a; Røthe og Mangerud. |
| Massebalanse og breobservasjoner | NVE Massebalansemålinger 2024 og Breer og klima 2026a. |
| Landheving, marin grense og kvikkleire | Fossen og Mæhlum 2026; NGU Geologi på land, Om kart over marin grense og Kvikkleire. |
| Elvelandskap | Halleraker 2025 og med flere 2026; SNL Delta og Terrasse; Mæhlum 2026b. |
| Kyst | Mæhlum Strandflate; Bryhni og Fossen 2024; SNL Skjærgård; Bryhni og Røthe 2025. |
| Geiranger/Åknes og arealbruk | UNESCO; NVE Åknes 2026b; NIBIO 2022, 2023 og Kilden; NGU Sand, grus og pukk. |

### Verifiserte adresser

1. Bryhni, I., & Fossen, H. (2024, 2. juli).  [Norges geologi](https://snl.no/Norges_geologi). HTTP 200.
2. Bryhni, I., & Røthe, T. O. (2025, 24. februar).  [Erosjon](https://snl.no/erosjon). HTTP 200.
3. Bryhni, I., Lilleøren, K., & Mæhlum, L. (u.å.).  [Delta (geografi)](https://snl.no/delta_-_geografi). HTTP 200.
4. Fossen, H., & Mæhlum, L. (2026, 26. oktober).  [Landheving og landsenking](https://snl.no/landheving_og_landsenking). HTTP 200.
5. Halleraker, J. H. (2025, 14. mai).  [Meander](https://snl.no/meander). HTTP 200.
6. Halleraker, J. H., Lilleøren, K., & Mæhlum, L. (2026, 30. september).  [Elv](https://snl.no/elv). HTTP 200.
7. Liestøl, O., Hagen, J. O., & Nesje, A. (u.å.).  [Isbre](https://snl.no/isbre). HTTP 200.
8. Lilleøren, K. (2025, 12. februar).  [Botn](https://snl.no/botn). HTTP 200.
9. Mæhlum, L. (2026a, 22. mai).  [Egg (landform)](https://snl.no/egg_-_landform). HTTP 200.
10. Mæhlum, L. (2026b, 4. november).  [Elveslette](https://snl.no/elveslette). HTTP 200.
11. Mæhlum, L. (u.å.).  [Strandflate](https://snl.no/strandflate). HTTP 200.
12. Norges geologiske undersøkelse. (u.å.-a).  [Geologi på land](https://www.ngu.no/om-geologi/geologi-pa-land). HTTP 200.
13. Norges geologiske undersøkelse. (u.å.-b).  [Kvikkleire](https://www.ngu.no/geologi-og-risiko/kvikkleire). HTTP 200.
14. Norges geologiske undersøkelse. (u.å.-c).  [Om kart over marin grense](https://www.ngu.no/om-geologi/om-kart-over-marin-grense). HTTP 200.
15. Norges geologiske undersøkelse. (u.å.-d).  [Om løsmasser](https://www.ngu.no/om-geologi/om-losmasser). HTTP 200.
16. Norges geologiske undersøkelse. (u.å.-e).  [Sand, grus og pukk](https://www.ngu.no/geologiske-ressurser/sand-grus-og-pukk). HTTP 200.
17. Norges vassdrags- og energidirektorat. (2024, 2. desember).  [Massebalansemålinger](https://www.nve.no/vann-og-vassdrag/vannets-kretsloep/bre/bremaalinger/massebalansemaalinger/). HTTP 200.
18. Norges vassdrags- og energidirektorat. (2026a, 2. juni).  [Breer og klima](https://www.nve.no/vann-og-vassdrag/vannets-kretsloep/bre/breer-og-klima/). HTTP 200.
19. Norges vassdrags- og energidirektorat. (2026b, 19. juni).  [Åknes](https://www.nve.no/naturfare/overvaking-og-varsling/fjellskredovervaaking/kontinuerlig-overvaakede-fjellpartier/aaknes/). HTTP 200.
20. Norsk institutt for bioøkonomi. (2022, 20. mai).  [Naturlige dreneringsforhold](https://www.nibio.no/tema/jord/jordkartlegging/jordsmonnkart/naturlige-dreneringsforhold). HTTP 200.
21. Norsk institutt for bioøkonomi. (2023, 28. august).  [Erosjonkart](https://www.nibio.no/tema/jord/jordkartlegging/jordsmonnkart/erosjonsrisikokart). HTTP 200.
22. Norsk institutt for bioøkonomi. (u.å.).  [Brukerveiledning Kilden](https://www.nibio.no/tjenester/kilden/brukerveiledning-kilden). HTTP 200.
23. Røthe, T. O., & Mangerud, J. (u.å.).  [Morene](https://snl.no/morene). HTTP 200.
24. Spjeldnæs, N. (u.å.).  [Forvitring](https://snl.no/forvitring). HTTP 200.
25. Store norske leksikon. (u.å.-a).  [Bre-erosjon](https://snl.no/bre-erosjon). HTTP 200.
26. Store norske leksikon. (u.å.-b).  [Esker (geologi)](https://snl.no/esker_-_geologi). HTTP 200.
27. Store norske leksikon. (u.å.-c).  [Skjærgård](https://snl.no/skj%C3%A6rg%C3%A5rd). HTTP 200.
28. Store norske leksikon. (u.å.-d).  [Terrasse (geologi)](https://snl.no/terrasse_-_geologi). HTTP 200.
29. Sørbel, L. (2024, 25. november).  [Frostsprengning](https://snl.no/frostsprengning). HTTP 200.
30. UNESCO World Heritage Centre. (u.å.).  [West Norwegian Fjords – Geirangerfjord and Nærøyfjord](https://whc.unesco.org/en/list/1195/). HTTP 200.
31. Utdanningsdirektoratet. (u.å.).  [Geografi (GEO01-02): Kompetansemål og vurdering](https://www.udir.no/lk20/geo01-02/kompetansemaal-og-vurdering/kv49). HTTP 200.

## Reseed og status

`tekstKlar: true` er satt bare for landskap. `COPY_RESEEDS_B` har flagget `geo-landskap-kap4-2026-11-06` for `geo-landskap`. Dette inngår i eksisterende COPY_RESEEDS-mekanisme. Ingen reseed kjøres eller produksjonstekst overskrives av dette lokale arbeidet.

## Testresultat

- Typecheck: bestått.
- ESLint på alle berørte TS/TSX-filer: bestått uten feil eller advarsler.
- Relevante tester, geografi-pakke, copy-reseed og post-seed: 64 bestått, ingen feil.
- Egne nye tester: åtte, inkludert faktisk aritmetikk med positiv, negativ og null balanse.
- SSR-røykprøve: alle seks Vg1-visninger rendret, inklusive fire frosttrinn, fire landhevingstrinn og tre daltrinn.
- SSR-regresjon: HTML for alle seks berørte Geofag-standardvisninger er identisk med origin/geografi-kap3.
- Produksjonsbygg med DATABASE_URL fjernet: bestått. Migreringsskriptet hoppet eksplisitt over ekstern database. Ingen deploy er kjørt.
- Full npm test: 188 bestått, 17 eksisterende skript-/malmiljøfeil, én hoppet over. Feilnavn er de samme som i kapittel 3.
- Separat TS-trinn: 224 bestått, fem eksisterende poster-markdown-feil. Feilnavn er de samme som i kapittel 3.
- Diff-hygiene og fravær av forbudte markdown-tegn: kontrollert.

Fullsuite er altså ikke grønn fra før, men ingen nye feil er introdusert. De fem eksisterende TS-feilene gjelder Vulkaner, innsetting av kapittelskanningswidgets og malen for istidsposteren. De øvrige kjente feilene gjelder blant annet with-app-env og manglende mal-/plattformfiler, ikke dette kapitlet.

SSR er ikke en nettlesertest. Canvas-tegning, avspilling, skyverbetjening i nettleser, småskjerm og skjermleser er ikke visuelt eller manuelt kontrollert her. Det bør inngå i designgjennomgangen.

Logger finnes på boksen som `/workspace/geografi-kap4-typecheck.log`, `geografi-kap4-eslint.log`, `geografi-kap4-relevante-tester.log`, `geografi-kap4-figursmoke.log`, `geografi-kap4-build.log`, `geografi-kap4-full-tests.log` og `geografi-kap4-lib-tests.log`. Kildekontrollens status og HTML-filer ligger under `/workspace/geografi-kap4-kildesjekk.json` og `/workspace/geografi-kap4-kilder/`.

## Avklaringer for Mats

Ingen faglig avklaring blokkerer teksten. Mats/designgjennomgangen må velge konkrete foto, kystutsnitt og NVE-datasett, og avgjøre når de seks åpne figurposisjonene og fotokoblingen til 4.2 skal ferdigstilles. Geiranger-casen er bevisst koblet til Åknes i samme større fjordsystem, uten å flytte fjellpartiet inn i Geirangerfjorden. Ingen aktuell varselsituasjon er påstått.

## Forslag til PR-tittel

Geografi: kapittel 4 – ytre krefter og landskapet i Norge

## Forslag til PR-tekst

Base: geografi-kap3, stablet på utkast-PR #301. Bare kapittel 4; kapittel 5 tas separat.

- Skriver sju underkapitler, to norske caser, læringsmål, oppsummering, 18 begreper og oppgaver i tre lag.
- Legger til 31 verifiserte kilder med APA-henvisninger og eget reseed-flagg.
- Gjenbruker seks Geofag-figurer i avgrenset Vg1-modus; standardvisningene er uendret.
- Beholder seks skjulte figurplassholdere og dokumenterer at fotokoblingen til 4.2 gjenstår.
- Presiserer lokal marin grense, mulig leire versus kvikkleire og korrekt plassering/datering av Åknes-casen.

Kontroll: typecheck, ESLint, 64 relevante tester, SSR-regresjon og produksjonsbygg bestått. Fullsuite har bare de samme 17 skript-/miljøfeilene og fem poster-markdown-feilene som før. Ingen deploy eller databaseendring.

Åpnes som utkast for faglig og visuell gjennomgang. Detaljer og figurstatus står i docs/geografi-kap4-redaksjon.md.
