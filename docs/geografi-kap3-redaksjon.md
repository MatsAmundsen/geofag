# Geografi kapittel 3 – redaksjonell overlevering, PR F

Oppdatert figurstatus står i `geografi-kap3-mats-valg.md` (Mats sine valg) og `geografi-kap3-skjulte.md` (de skjulte figurene). Resten av dette notatet dokumenterer første leveranse, og figurtabellene under kan derfor være utdatert.

## Leveranse og avgrensning

Kapittel: Indre krefter: platetektonikk, jordskjelv og vulkaner.
Rute: `/geografi/indre-krefter`. CMS-slug: `geo-indre-krefter`.
Branch: `geografi-kap3`, opprettet fra `origin/geografi-kap8`, commit `05f63f9d6f7dac893b54cce61d57187cdcaf25a3`.
Kun lokal commit. Ingen push, PR-oppretting, merge, deploy eller infrastrukturendring.
Kapitlene 4 og 5 er ikke endret eller aktivert.

Ni underkapitler: Geologisk tid; Jordas oppbygning; Platetektonikk; Jordskjelv; Vulkaner; Tsunamier; Bergarter; Norges berggrunn; Ressurser i aktive områder.
Hovedmål KM480, med støtte i KM483. Indre krefter er kapittelavgrensningen; ytre krefter leveres separat.

6028 ord i elevrettet markdown, inkludert overskrifter, tabeller, oppgaver, quiz og APA-henvisninger. Skjulte figurmarkører, widgetblokker, lenkemål, tabellskilletegn, Markdown-prefikser, fetmarkering, tabellstreker og kjedepiler er fjernet før telling på mellomrom. Komponentenes egne tekster og den eksterne kildelisten kommer i tillegg. Åpningen er 197 ord. Brødteksten uten APA-parenteser har omtrent 15,5 ord per setning i en enkel språkkontroll.

Teksten er selvstendig skrevet. Pensumbibliotek og Terra Nova er bare internt underlag, ikke elevkilder. Læringsmål, to historiske innblikk, oppsummering, begrepsliste, spørsmål, «Hva tror du?», sju oppgaver med a/b/c og quiz er levert.
`tekstKlar: true` og engangsreseed `geo-indre-krefter-kap3-2026-11-06` er registrert i eksisterende mekanisme. Lokal commit aktiverer ikke produksjonsreseed.

## Kildekontroll, 6. november 2026 (Europe/Oslo)

22 eksterne oppføringer er lagt i `src/lib/kilder-geografi.ts`. Brukte URL-er er åpnet med WebFetch i denne arbeidsrunden, med faglig kontroll av relevant innhold. Henvisningene bruker kapittelets egne årsbokstaver. De fullstendige adressene står nedenfor og i elevens kildeliste.

| Kilde | Brukt til og avgrensning |
|---|---|
| NOAA, u.å.-a | Registrering, vannstand, havbunnstrykk og varslingsmodeller. Et lokalt varsel kan komme for sent. Ingen faste varslingstider eller antall målebøyer. |
| NOAA, u.å.-b | Vannforskyvning, flere tsunamiutløsere, endringer mot grunt vann og naturlige faretegn. Ingen omstridte dødstall eller universelle bølgehøyder. |
| NGU, u.å.-a | Geologisk tid, kaledonske hendelser omtrent 400–500 millioner år siden, skyvedekker og Osloriftens start omtrent 310 millioner år siden. Ikke brukt til en presis nyere Atlanterhavskronologi eller landhevingsforklaring. |
| NGU, u.å.-b | Jordskjelv, også inne på plater og langs eldre forkastninger i Norge. Ingen nordisk rangering eller Richter som generell energidefinisjon. |
| NGU, u.å.-c | Bergartsgrupper og dannelsesmåter. Ingen usikre prosentandeler av norsk berggrunn. |
| NGU, u.å.-d | Berggrunn, løsmasser, grunnfjell og fennoskandisk skjold. Sidens eldre tall for kambriumgrensen gjengis ikke. |
| NGU, u.å.-e | Skorpe, mantel, kjerne, litosfære, astenosfære og kvalitative tetthetsforskjeller. Ingen usikre dybder, temperaturer eller eldste bergartsrekorder. |
| Norskpetroleum.no, 2024 | Kildebergart, reservoar, tette lag og feller. Ingen ukontrollerte temperaturgrenser, reserver eller produksjonstall. |
| USGS, 2020 | Vannførende materiale i subduksjon og delvis smelting over den synkende platen. Ikke friksjon som forklaring på at hele platen smelter. |
| USGS, 2023 | Jordskjelvene 6. februar 2023, magnitude 7,8 og 7,5, sidelengs forkastningsbevegelse og sårbare bygninger. Ingen dødstall eller gamle etterskjelvprognoser presentert som aktuelle. |
| USGS, u.å.-a | Jordas omtrentlige alder, 4,54 milliarder år, og radiometrisk datering. Gamle rekorder for universets alder og eldste bergart er utelatt. |
| USGS, u.å.-b | Magnitude, momentmagnitude, intensitet og omtrent 32 ganger energi per helt magnitudetrinn. Ikke 32 ganger skade. |
| USGS, u.å.-c | Varmeflekker og Hawaii, med kildens uttrykkelige forbehold om dybde og stabilitet. Ikke alle kilder tolkes som fastlåste dype søyler. |
| USGS, u.å.-d | Lagdeling og egganalogien, med forklaring av modellens begrensninger. |
| USGS, u.å.-e | Jordvarme, varmt vann, jordbruk på vulkansk grunn og rekreasjon. Eldre energiprosenter og utsagn om trygghet er utelatt. |
| USGS, u.å.-f | Skjoldvulkan og stratovulkan, lag og utbruddsmateriale. Ingen faste helninger, høyder eller beregnede VEI-verdier. |
| USGS, u.å.-g | Langsom deformasjon i fast mantel, indre varme, konveksjon og platetrekk. Ikke én enkel transportbåndforklaring. |
| USGS, u.å.-h | Relative platebevegelser, spredning, subduksjon, kontinentkollisjon, transform og geografiske eksempler. Gamle GPS-tall og fjellhøyder er utelatt. |
| USGS, u.å.-i | Mineraler, magma/lava, bergartsgrupper, avkjøling og flere mulige kretsløpsveier. Ikke kilde til en utdatert eller forenklet subduksjonsforklaring. |
| Udir, u.å. | Offisielt sitat fra læreplan GEO01-02 og avgrensning av kompetansemål. |
| Veðurstofa Íslands, 2023 | Historisk desemberoversikt: magmagang i november, utbrudd 18.–21. desember og fortsatt aktivitet etterpå. Ikke informasjon om dagens tilgang eller sikkerhet. |
| Wald, u.å. | Elastisk lagring, forkastningsbrudd, seismiske bølger, hyposenter og episenter. Forfatter oppgis etter sidens kreditering av Lisa Wald. |

De eldre USGS-tekstene brukes til stabile grunnbegreper, ikke skiftende nøkkeltall eller dagens faresituasjon. Det tenkte regneeksemplet med to centimeter per år og tjue kilometer på én million år er uttrykkelig merket som øving, ikke målte platehastigheter.
Smithsonians rapport kunne ikke fulltekstverifiseres og er ikke brukt. En engelskspråklig islandsk side uten rapportinnhold ble heller ikke brukt; det daterte islandske primærdokumentet er grunnlaget.

### Verifiserte adresser

- National Oceanic and Atmospheric Administration. (u.å.-a). [Detection, Warning, and Forecasting](https://www.noaa.gov/jetstream/tsunamis/detection-warning-and-forecasting)

- National Oceanic and Atmospheric Administration. (u.å.-b). [The science behind tsunamis](https://www.noaa.gov/explainers/science-behind-tsunamis)

- Norges geologiske undersøkelse. (u.å.-a). [Geologi på land](https://www.ngu.no/om-geologi/geologi-pa-land)

- Norges geologiske undersøkelse. (u.å.-b). [Jordskjelv](https://www.ngu.no/geologi-og-risiko/jordskjelv)

- Norges geologiske undersøkelse. (u.å.-c). [Norske bergarter](https://www.ngu.no/om-geologi/norske-bergarter)

- Norges geologiske undersøkelse. (u.å.-d). [Om berggrunn](https://www.ngu.no/om-geologi/om-berggrunn)

- Norges geologiske undersøkelse. (u.å.-e). [Skorpe, mantel og kjerne](https://www.ngu.no/om-geologi/skorpe-mantel-og-kjerne)

- Norskpetroleum.no. (2024, 5. mars). [Hvordan dannes petroleum?](https://www.norskpetroleum.no/petroleumsressursene/hvordan-dannes-petroleum/)

- U.S. Geological Survey. (2020, 7. september). [Introduction to Subduction Zones: Amazing Events in Subduction Zones](https://www.usgs.gov/special-topics/subduction-zone-science/science/introduction-subduction-zones-amazing-events)

- U.S. Geological Survey. (2023, 17. februar). [M7.8 and M7.5 Kahramanmaraş Earthquake Sequence near Nurdağı, Turkey (Türkiye)](https://www.usgs.gov/news/featured-story/magnitude-78-earthquake-nurdagi-turkey)

- U.S. Geological Survey. (u.å.-a). [Age of the Earth](https://pubs.usgs.gov/gip/geotime/age.html)

- U.S. Geological Survey. (u.å.-b). [Earthquake Magnitude, Energy Release, and Shaking Intensity](https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity)

- U.S. Geological Survey. (u.å.-c). [Hotspots](https://pubs.usgs.gov/gip/dynamic/hotspots.html)

- U.S. Geological Survey. (u.å.-d). [Inside the Earth](https://pubs.usgs.gov/gip/dynamic/inside.html)

- U.S. Geological Survey. (u.å.-e). [Plate tectonics and people](https://pubs.usgs.gov/gip/dynamic/tectonics.html)

- U.S. Geological Survey. (u.å.-f). [Principal Types of Volcanoes](https://pubs.usgs.gov/gip/volc/types.html)

- U.S. Geological Survey. (u.å.-g). [Some unanswered questions](https://pubs.usgs.gov/gip/dynamic/unanswered.html)

- U.S. Geological Survey. (u.å.-h). [Understanding plate motions](https://pubs.usgs.gov/gip/dynamic/understanding.html)

- U.S. Geological Survey. (u.å.-i). [What’s New? Weeks 9–12](https://www.usgs.gov/educational-resources/whats-new-weeks-9-12)

- Utdanningsdirektoratet. (u.å.). [Geografi (GEO01-02): Kompetansemål og vurdering](https://www.udir.no/lk20/geo01-02/kompetansemaal-og-vurdering/kv49)

- Veðurstofa Íslands. (2023). [Jarðskjálftayfirlit í viku 50 og 51, 11.–24. desember 2023](https://www.vedur.is/skjalftar-og-eldgos/yfirlit/manudir/jardskjalftayfirlit-vikuna-50-og-51-11-24-desember-2023)

- Wald, L. (u.å.). [The Science of Earthquakes](https://www.usgs.gov/programs/earthquake-hazards/science-earthquakes)

## Figurer, gjenbruk og gjenstående arbeid

Seks figurer har registrerte Vg1-widgets; åtte har skjulte, parser-testede markører. Teksten kan leses uten manglende figurer, og elevene får ingen synlige redaktørnotater.

| Figur | Status og videre arbeid |
|---|---|
| 3.0 Tektoniske plater | Markør. Oppdatert plate-, vulkan- og jordskjelvkart må velges. Kontroller observasjonsperiode og lisens; planens Commons-fil har merknad om korrigert USGS-grunnlag. |
| 3.1 Geologisk tid | Markør. Zoombar tidsskala må lages, med tydelig skille mellom lineær tid og forstørrede utsnitt. Ingen uverifiserte periodegrenser er lagt inn. |
| 3.2 Jordas oppbygning | Levert: `GeoJordasLag` velger Vg1-variant i `EarthLayersDiagram`. Fire lag og forklaring av litosfære/astenosfære, uten G1-fotoets temperaturer, dybder og mineralnavn. Ikke riktige lagtykkelser. |
| 3.3 Rift til hav | Markør. `ContinentalRiftDiagram` og Norges historikk må tilpasses til få Vg1-trinn. Ikke alle rifter utvikles til hav. |
| 3.4 Plategrenser | Levert: `GeoPlateGrenser` bruker en Vg1-variant av `BoundaryOverviewDiagram`, med fire korte forklaringer og skjematiske tegninger. Transform vises ovenfra; de andre som snitt. Ingen felles målestokk. |
| 3.5 Plategrensemodell | Levert i avgrenset form: `GeoPlateModell` velger fire miljøer i `PlateTectonicsModel`, gjenbruker Vg1-oversiktens geometri og `ModelFrame`. Ingen mineral-/dybdepaneler, G1-lenker eller risikotall. Planens utforsking av variabel spredningshastighet er ikke implementert; krever egen oppfølging. |
| 3.6 Jordskjelv | Levert: `GeoJordskjelvBrudd` gjenbruker `ElasticReboundDiagram` med tre faser: låst, spenning, brudd/bølger. Standardvisningen beholder fem trinn. Skjematisk, ikke prediksjon. |
| 3.7 Jordskjelv og sårbarhet | Markør. Datert USGS-basert casekart for Tyrkia/Syria, med skille mellom brudd, episentre, rystelser og sårbarhet. Ingen udokumenterte dødstall. |
| 3.8 Vulkanmodell | Levert: `GeoVulkanModell` har to valg i `VolcanoModel`, med eksisterende skjold-/strato-SVG-er fra `VolcanoTypesDiagram`. Ingen udokumentert VEI-beregning, kjemiterskler, faste helninger eller kalender for utbrudd. |
| 3.9 Varmeflekker | Markør. Kart med plategrenser, navngitte eksempler og tydelige modellforbehold. Kontroller konkret fil og attribusjon før import. |
| 3.10 Reykjanes | Markør. Datert kart eller Sentinel-utsnitt fra den historiske 2023-hendelsen. Kontroller opptaksdato, område, attribusjon og lisens. Ikke bland med nyere utbrudd. |
| 3.11 Tsunami | Markør. Tre–fire trinn må tegnes fra vannforskyvning til kyst og varslingskjede. Ingen NOAA-bakgrunnsfil er valgt eller importert. |
| 3.12 Bergartenes kretsløp | Levert: `GeoBergartssyklus` bruker eksisterende `BergartssyklusFigur` og beholder lat lasting. Vg1 viser den generelle ruten og valgbare prosesser, ikke stedsspesifikke bergartsaldre eller sitater fra G1-kapitlet. Flere mulige veier er forklart. |
| 3.13 Norsk berggrunn | Markør. Forenklet kart over grunnfjell, kaledonske enheter, Oslofeltet og sokkel. NGU-raster er ikke importert; konkret datalisens må kontrolleres. |

Alle Geofag-standardinnstillinger er beholdt. Sju standardvisninger er rendret både fra foreldrebranchens kildekode og arbeidskopien; HTML er identisk. Vg1 bruker egne widget-ID-er, slik at Geofag-postene og rutene ikke endres. De kvalitative modellene er pedagogiske valg- og prosessmodeller, ikke numeriske simulatorer.

## Avklaringer for Mats

1. Godkjenne historiske caser fra 2023 framfor en påstått aktuell faresituasjon. Ingen tekst skal brukes som nåværende reise- eller evakueringsmelding.
2. Avklare om fartskontroll i figur 3.5 skal bestilles i figurleveransen, eller om den nåværende kvalitative sammenlikningen er tilstrekkelig først. Teksten lover ingen fartskontroll.
3. Prioritere de åtte manglende figurene og avklare konkrete kart-/bildelisenser, særlig norsk berggrunn og valgte Sentinel-data. Ingen eksterne kart eller fotografier er importert her.

## Validering

- `npm run typecheck`: bestått.
- ESLint på alle tolv berørte TS/TSX-filer: bestått med null feil. Én eksisterende advarsel om ubrukt `m` i standardfiguren i `plates.tsx`; denne delen er ikke endret.
- Geografipakke, copy-reseed og post-seed: 56 av 56 tester bestått, inkludert seks nye kapitteltester.
- SSR-smoke: seks Vg1-widgets, alle fire plategrensevalg og begge vulkantyper rendrer. Sju standardvisningers HTML er identisk med `origin/geografi-kap8`.
- `env -u DATABASE_URL npm run build`: bestått; ekstern databasemigrering hoppes over. Eksisterende CSS-/chunk-/Nitro-advarsler står igjen.
- `git diff --check` og kontroll av forbudte tegn i begge endrede Markdown-filer: bestått.
- Full `npm test`: 206 skripttester, med 188 bestått, 17 feil og én hoppet over. TypeScript-delen er kjørt separat: 221 tester, 216 bestått og fem feil. Feilnavnene er identiske med kapittel 8-baselinens 17 skriptfeil og fem poster-markdown-feil. Ingen nye feil. Full testsuite er ikke grønn.

Skriptfeilene gjelder eksisterende template-/skill-/branding-/app-env-/migreringsforventninger; de fem TypeScript-feilene gjelder Vulkaner, kapittelskannere, isbre-widgeter og istidsposteren. Disse er ikke rettet i kapittel-PR-en.
Logger: `/workspace/geografi-kap3-typecheck.log`, `-eslint.log`, `-relevante-tester.log`, `-figursmoke.log`, `-build.log`, `-full-tests.log` og `-lib-tests.log`, med samme prefiks. Lokale avhengigheter måtte gjenopprettes fra uendret låsefil etter at arbeidsmiljøet ble nullstilt; de rapporterte sluttkontrollene er kjørt etter gjenoppretting.

## Forslag til utkast-PR

Base: `geografi-kap8`. Head: `geografi-kap3`. Stablet på PR 299.

Tittel: Geografi PR F: kapittel 3 – indre krefter

PR-tekst:

### Innhold

- Selvstendig Vg1-fagtekst på 6028 ord med ni underkapitler, læringsmål, oppsummering, begreper, oppgaver i tre lag og quiz.
- 22 verifiserte kilder med APA, tekstklar-status og engangsreseed.
- Daterte caser fra Reykjanes og Tyrkia/Syria i 2023, uten påstander om dagens faresituasjon.
- Seks Vg1-figurer gjennom eksisterende Geofag-komponenter, med redusert faglig omfang. Geofag-standardvisningene er uendret.
- Åtte skjulte figurmarkører. Figur 3.5 har kvalitativ geometri-/miljøvelger; variabel spredningshastighet gjenstår etter avklaring.
- Kapittel 3 alene. Kapitlene 4 og 5 følger i egne PR-er.

### Kontroller

Typesjekk, berørt ESLint, 56 relevante tester, SSR-smoke og produksjonsbygg bestått. Én eksisterende ESLint-advarsel. Sju Geofag-standardvisninger gir identisk HTML mot basen. Full suite har nøyaktig de samme 17 skriptfeilene og fem poster-markdown-feilene som basen, ingen nye. Ingen ekstern databasemigrering.

### Før godkjenning

Se `docs/geografi-kap3-redaksjon.md` for kildekontroll, figurstatus og avklaringer. Utkast stablet på kapittel 8, PR 299. Ingen merge før Mats har lest og godkjent.
