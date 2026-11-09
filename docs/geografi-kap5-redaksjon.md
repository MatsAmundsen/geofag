# Kapittel 5 – redaksjonell overlevering

Oppdatert figurstatus står i `geografi-kap5-skjulte.md` (de skjulte figurene). Resten av dette notatet dokumenterer første leveranse, og figurtabellene under kan derfor være utdatert.

## Omfang og arbeidsgren

- Kapittel: Vær, klima og klimaendringer.
- Rute: `/geografi/klima`. Post: `src/lib/posts/geo-klima.md`.
- Gren: `geografi-kap5`, opprettet fra `origin/geografi-kap4`.
- Base ved oppstart: `3b42bb616128d68cbad8691798e87ea578ae51d3`, kapittel 4 i utkast-PR #303.
- Bare kapittel 5 er skrevet. Kapittel 7, 9, 10 og 11 er fortsatt skjeletter.
- Kapittelcommitten er publisert som utkast-PR #304, med base `geografi-kap4`. Den nye normaldataoppdateringen er bare lokal. Oppdragsgiver håndterer push.
- Ingen merge, main-push, force-push, CloudAgent, deploy eller endring av DNS/Cloudflare.

## Tekst og pedagogikk

Fagteksten har 6528 ord. Tellingen inkluderer overskrifter, spørsmål, oppgaver, begrepsliste og henvisninger, men utelater skjulte figurmarkører, widgetkoder og lenkemål. Figurenes egne tekster og kilderegisteret inngår ikke. Åpningen har 191 ord og følger et faktisk bilde og en datert omtale av Hans, ikke en oppdiktet øyenvitneskildring.

Ni underkapitler er skrevet:

1. Vær og klima.
2. Globale sirkulasjoner.
3. Klimasoner.
4. Norges klima.
5. Drivhuseffekten.
6. Klimaendringer nå.
7. Klimaendringer i Norge.
8. Klimaendringer globalt.
9. Kutt og tilpasning.

Kompetansemål står først. KM482 er hovedmål, mens KM483 og KM485 er støttemål. Avslutningen har oppsummering, alle 18 planlagte begreper, 15 spørsmål, seks refleksjonsspørsmål, sju oppgaver med a/b/c og tre quizformater med begrunnede svar. Brødavsnittene har 3–5 setninger, med gjennomsnitt rundt 14 ord per setning etter at parenteshenvisninger og figurkoder er fjernet. Åpningen avsluttes med den avtalte vi-formuleringen.

## Faglige og kildekritiske avgrensninger

- Vær, klimanormal, observasjon og framskrivning er forskjellige størrelser. Normalperioden 1991–2020 er ikke referansen for IPCCs førindustrielle oppvarmingstall.
- IPCCs 1,1 grader gjelder 2011–2020 sammenliknet med 1850–1900. Tallet presenteres uttrykkelig ikke som temperaturstatus for 2026.
- Vindcellene er en gjennomsnittsmodell. Ferrelcellen beskrives ikke som et lukket, termisk drevet rør. Avbøyning forklares i bevegelsesretningen, ikke som alltid øst eller vest.
- Golfstrømmen, norske atlantiske strømmer og AMOC skilles. Vg1-figuren inneholder ingen påstand om garantert fravær av AMOC-kollaps før 2100.
- Köppens fem hovedgrupper skilles fra enkle breddegradsbelter. Klimakart, vegetasjon og menneskelig arealbruk er ikke utskiftbare forklaringer.
- Føn krever ikke forutgående regn på losiden. Oppvarming under nedsynking og fallende relativ luftfuktighet forklares uten faste temperaturgradienter.
- Naturlig og forsterket drivhuseffekt skilles. Stråling sendes i flere retninger, og atmosfæren framstilles ikke som et tett lokk.
- Utslippsscenarioer er betingede. Ingen konstruerte temperaturkurver eller sannsynligheter for politiske valg presenteres som IPCC-resultater.
- NVE-siden er oppdatert 22. januar 2025, men bygger på eldre norske framskrivninger. Bare kvalitative prosessforklaringer brukes, ikke sidens gamle temperatur-, nedbør- eller havnivåtall. Havnivåavsnittet bygger på Kartverkets vurdering fra 2024.
- Hans-casen gjelder august 2023 og omtaler publisert 1. september 2023. Selve hendelsen, senere regn og hele måneden holdes atskilt. Ingen tallfestet klimafordeling av hver skade er funnet eller påstått.
- Bangladesh-casen gjelder Verdensbankens rapportomtale fra 31. oktober 2022, ikke en ny katastrofe i 2026. Sykloner, oversvømmelser, regionale forskjeller og lokal tilpasningskompetanse omtales uten udokumenterte taps-, migrasjons- eller risikopolygontall. Hele bakgrunnsrapporten er ikke brukt som om den var lest.
- Kvotetak, kvotehandel og faktiske utslipp skilles. Ingen kvotepris eller dato for nye EU-regler brukes som et varig lærebokfaktum. Kommisjonens side inneholder et reformforslag fra 2026, som ikke framstilles som vedtatt rett.
- Fangst av nye punktutslipp skilles fra karbonfjerning. Ingen påstand om at all fangst automatisk gir negative utslipp.
- Ingen oppgave krever ferdsel ved flomvann, stengte veier eller utsatte skråninger. Et kommunalt notat er uttrykkelig en tenkt elevoppgave som ikke skal sendes.

## Figurer og uendret Geofag-visning

Sju etablerte komponenter gjenbrukes med en valgfri `geografi`-prop. Standard er fortsatt av. De eksisterende Geofag-postene og kallene deres er ikke endret. Et ubenyttet callback-argument i polarfrontfiguren er fjernet uten å endre figurens HTML.

| Figur | Leveranse |
| --- | --- |
| 5.1 | Eget SVG-klimadiagram med temperaturlinje, nedbørssøyler, enheter og tilgjengelig tabell for tolv måneder. Publiserte klimanormaler 1991–2020 for Oslo – Blindern, stasjon 18700. Temperatur og nedbør fra MET, med metodekilde og CC BY 4.0. |
| 5.2 | Vg1-visning av `WindCellsDiagram`: tre celler, navn og dominerende vindbelter, uten jetstrømmer og tropopausehøyder. |
| 5.3 | `CoriolisDiagram`: høyre og venstre i bevegelsesretningen, uten geostrofisk fordypning. |
| 5.4 | `AmocDiagram`: overflate og dyp retur, uten gamle kollapsutsagn eller forkortelsen NADW. |
| 5.5 | `GlobalClimateZonesDiagram`: fem Köppen-grupper, ikke faste vegetasjons- eller nedbørsgrenser ved bestemte breddegrader. |
| 5.6 | `FoehnAdiabaticDiagram`: kvalitativ fjellprofil, uten temperatur-, høyde- eller vindberegning og uten animasjon. |
| 5.7 | `EarthRadiationBudgetDiagram`: strålingsprosesser uten energitall eller prosentandeler. |
| 5.8 | `CarbonCycleDiagram`: lagre og utvalgte overføringer uten GtC- eller årlige flukstall. Pilbredder er ikke mengder. |
| 5.9 | Egen SVG med to kvalitative utslippspaneler og en tilbakekoplingskjede. Ingen numerisk temperaturprognose. |

Figurene bruker eksisterende `Diagram`, `FigureFrame` og rulleflate for små skjermer. De har SVG-navn og forklarende tekst. Klimadiagrammet har native tabelloverskrifter og tabelltekst. Det er ikke innført nye store komponentrammeverk, eksterne bildefiler, nettverkskall eller kartdata.

Tre skjulte markører gjenstår. De rendres ikke som elevrettede redaktørnotater:

- **5.0:** Globalt temperaturanomali-kart. Konkret NASA-fil, lisens, tidsrom, referanseperiode, tegnforklaring og tekstalternativ må sjekkes før import. Planens lisensnotat er ikke behandlet som egen kontroll av en importert fil.
- **5.10:** Kartutsnitt for Hans. Hendelsesavgrensning, Kartverket-bakgrunn, NVE-data og tilhørende lisenser må kontrolleres. Ikke bruk hele august som hendelsesperiode eller tegn antatte flomgrenser.
- **5.11:** Bangladesh-kart. Natural Earth-bakgrunn og eventuelle konkrete fagdata må kontrolleres. Ingen selvtegnede risikoflater uten dokumentert geografisk grunnlag.

Etter Mats sitt valg er figur 5.1 oppdatert med kontrollerte normaler for Oslo – Blindern, ikke omdøpte øvingstall. Originalfilene, stasjonsidentiteten, perioden og lisensen er verifisert. Se `docs/geografi-klimanormaler-blindern.md` for tolv månedstall og revisjonsspor.

## Kilder kontrollert 6. november 2026

Alle de 29 registrerte kildene er åpnet og lest med WebFetch eller offentlig HTTP-henting. Kontrollen gjelder relevante fagavsnitt, ikke bare HTTP-status. Forfattere for nedbør, klimasoner og Golfstrømmen er også kontrollert mot offentlig JSON-LD. Der ingen dato framgår, er u.å. beholdt framfor å gjette. De eldre NASA-artiklene brukes for prosessforklaringer, ikke som kilde til dagens utslippsmengder, temperatur eller framtidsanslag.

| Nr. | Registrert kilde | Adresse |
| --- | --- | --- |
| 1 | Barthel, K. (u.å.). Golfstrømmen | [Åpnet kilde](https://snl.no/Golfstr%C3%B8mmen) |
| 2 | Dannevig, P., & Harstveit, K. (2026, 12. juni). Klima i Norge | [Åpnet kilde](https://snl.no/Klima_i_Norge) |
| 3 | Dannevig, P., Holm, A. K., & Sivle, A. D. (u.å.). Nedbør | [Åpnet kilde](https://snl.no/nedb%C3%B8r) |
| 4 | Europakommisjonen. (u.å.). About the EU ETS | [Åpnet kilde](https://climate.ec.europa.eu/eu-action/eu-emissions-trading-system-eu-ets/what-eu-ets_en) |
| 5 | Harstveit, K. (2024, 26. november). Føn | [Åpnet kilde](https://snl.no/f%C3%B8n) |
| 6 | Intergovernmental Panel on Climate Change [IPCC]. (2023). Summary for Policymakers. Climate Change 2023: Synthesis Report | [Åpnet kilde](https://www.ipcc.ch/report/ar6/syr/summary-for-policymakers/) |
| 7 | Kartverket. (2024, 28. juni). Framtidig havnivå langs Norskekysten | [Åpnet kilde](https://kartverket.no/til-sjos/se-havniva/havniva/framtidig-havniva-langs-norskekysten) |
| 8 | Klima- og miljødepartementet. (2025, 1. september). Internasjonale klimaforhandlinger | [Åpnet kilde](https://www.regjeringen.no/no/tema/klima-og-miljo/klima/innsiktsartikler-klima/de-internasjonale-klimaforhandlingene/id2741333/) |
| 9 | Lindsey, R. (2009, 14. januar). Climate and Earth’s Energy Budget | [Åpnet kilde](https://science.nasa.gov/earth/earth-observatory/climate-and-earths-energy-budget/) |
| 10 | Mamen, J. (u.å.). Klimasoner | [Åpnet kilde](https://snl.no/klimasoner) |
| 11 | Met Office. (u.å.). Global circulation patterns | [Åpnet kilde](https://www.metoffice.gov.uk/weather/learn-about/weather/atmosphere/global-circulation-patterns) |
| 12 | Meteorologisk institutt. (2021a, 17. september). Månedsnormaler 1991–2020 for TAM, middeltemperatur | [Åpnet kilde](https://www.met.no/kss/_/attachment/download/a2d191d6-b9ef-4d78-ac26-9eee4ce28743:969dfb48bad54d95b9dca7685778f05448f42892/StNormaler_mnd_middeltemp_1991-2020.txt) |
| 13 | Meteorologisk institutt. (2021b, 18. januar). Ny normal i klimaforskningen | [Åpnet kilde](https://www.met.no/vaer-og-klima/ny-normal-i-klimaforskningen) |
| 14 | Meteorologisk institutt. (2024, 29. februar). Månedsnormaler 1991–2020 for RR, nedbør | [Åpnet kilde](https://www.met.no/kss/_/attachment/download/bb6a7fc4-429b-48a7-9788-9c5651774ba4:2a626567cdf7a7822a683029f30d0f8bf21efc18/StNormaler_mnd_nedbor_1991-2020_rettet.txt) |
| 15 | Meteorologisk institutt. (2026, 3. juni). Lisensiering og kreditering | [Åpnet kilde](https://www.met.no/frie-meteorologiske-data/lisensiering-og-kreditering) |
| 16 | Miljødirektoratet. (2026). I01 Karbonfangst og lagring | [Åpnet kilde](https://www.miljodirektoratet.no/tjenester/klimatiltak/tiltaksark-2026/industri-og-energiforsyning/i01-karbonfangst-og-lagring) |
| 17 | NASA. (u.å.-a). The Causes of Climate Change | [Åpnet kilde](https://science.nasa.gov/climate-change/causes/) |
| 18 | NASA. (u.å.-b). What Is Climate Change? | [Åpnet kilde](https://science.nasa.gov/climate-change/what-is-climate-change/) |
| 19 | National Oceanic and Atmospheric Administration [NOAA]. (u.å.). Thermohaline Circulation | [Åpnet kilde](https://oceanservice.noaa.gov/education/tutorial_currents/05conveyor1.html) |
| 20 | Norges vassdrags- og energidirektorat [NVE]. (2025, 22. januar). Klima, nå og i framtiden | [Åpnet kilde](https://www.nve.no/vann-og-vassdrag/vannets-kretsloep/klima/klima-naa-og-i-framtiden/) |
| 21 | Norsk klimaservicesenter. (2025, oktober). Klimanormaler | [Åpnet kilde](https://klimaservicesenter.no/kss/vrdata/normaler) |
| 22 | Riebeek, H. (2011, 16. juni). The Carbon Cycle | [Åpnet kilde](https://science.nasa.gov/earth/earth-observatory/the-carbon-cycle/) |
| 23 | Sanna, A. (2023, 1. september). Global oppvarming fører til mer regn i Norge | [Åpnet kilde](https://www.met.no/nyhetsarkiv/global-oppvarming-forer-til-mer-regn-i-norge) |
| 24 | Sanna, A., & Holte, K. R. (2023, 1. september). August 2023 vil bli husket for ekstremværet som rammet Sør-Norge | [Åpnet kilde](https://www.met.no/nyhetsarkiv/august-2023-vil-bli-husket-for-ekstremvaeret-som-rammet-sor-norge) |
| 25 | Tveito, O. E. (2021, 25. august). Norwegian standard climate normals 1991–2020: The methodological approach | [Åpnet kilde](https://www.met.no/publikasjoner/met-report/met-report-2021/_/attachment/inline/31bb0160-d8cf-4a2b-9646-4df6f5904059:3ac4fec6cf3fb7919aefe42db2b63ad8e8b9e6a6/METreport%2005_2021_New_Norwegian_standard_climate_normals_1991_2020-signert.pdf) |
| 26 | University Corporation for Atmospheric Research [UCAR]. (u.å.-a). The Highs and Lows of Air Pressure | [Åpnet kilde](https://scied.ucar.edu/learning-zone/how-weather-works/highs-and-lows-air-pressure) |
| 27 | University Corporation for Atmospheric Research [UCAR]. (u.å.-b). Wind | [Åpnet kilde](https://scied.ucar.edu/learning-zone/how-weather-works/wind) |
| 28 | Utdanningsdirektoratet. (u.å.). Geografi (GEO01-02): Kompetansemål og vurdering | [Åpnet kilde](https://www.udir.no/lk20/geo01-02/kompetansemaal-og-vurdering/kv49) |
| 29 | Verdensbanken. (2022, 31. oktober). Urgent Climate Action Crucial for Bangladesh to Sustain Strong Growth | [Åpnet kilde](https://www.worldbank.org/en/news/press-release/2022/10/31/urgent-climate-action-crucial-for-bangladesh-to-sustain-strong-growth) |

Kildene står i `kilder-geografi.ts` og vises automatisk i kapittelsidens KILDER-liste. Henvisningene står også i teksten og figurtekstene. Interne biblioteker, lærebok og redaksjonelle arbeidsfiler er ikke elevrettede kilder.

UNFCCCs Paris-side ga ikke lesbart faginnhold, og PDF-adressen ga ikke en PDF. De er derfor ikke registrert som verifiserte kilder. Parisavsnittet bygger i stedet på Klima- og miljødepartementets åpne omtale. Oppslag med feil SNL-adresser og en utilgjengelig IPCC-kapittelside er heller ikke brukt som kilder.

## Reseed og gjennomgang før eventuell merge

`geo-klima-kap5-2026-11-06` og det nye `geo-klima-normaler-blindern-1991-2020-2026-11-06` er lagt i `COPY_RESEEDS_B`. Flagget gjelder bare `geo-klima` og kan overskrive CMS-tekst ved første godkjente innlasting. Ingen slik produksjonsinnlasting er utført. `tekstKlar` er satt for kapittel 5, uten å aktivere resterende skjeletter.

Ingen blokkerende fagavklaring er identifisert. Mats må lese tekst og figuravgrensninger før eventuell merge. Valget for 5.1 er avklart av Mats og gjennomført som en egen normaldatacommit. De tre kartleveransene gjenstår hos DesignBOT og krever egne data- og lisenskontroller.

Ny validering av stasjonsnormalene er dokumentert i `docs/geografi-klimanormaler-blindern.md`: 75 relevante tester, typecheck, berørt ESLint, figur-SSR og build er bestått. Kjente fullsuitefeil er uendret.

## Opprinnelig validering før normaldataoppdateringen

- Typecheck: bestått.
- ESLint på samtlige endrede TypeScript- og TSX-filer: bestått uten feil eller advarsler.
- Relevante geografi-, reseed- og seed-tester: 73 av 73 bestått.
- Serverrendering: ni Vg1-figurer bestått, med tabell, SVG-navn, rulleflatemerking og fravær av avanserte tall. Åtte standardfigurers HTML er identisk med `origin/geografi-kap4`, inkludert polarfrontfiguren med det ryddede callback-argumentet.
- Build: bestått med `DATABASE_URL` fjernet. Loggen bekrefter at migrering hoppes over. Ingen deploy. Eksisterende CSS- og chunkstørrelsesadvarsler gjenstår.
- Fullt `npm test`: ikke grønt fra basen. Skriptdelen har 206 tester: 188 bestått, 17 feilet, én hoppet over. Feilene gjelder eksisterende mal-, plattform- og `with-app-env`-forventninger.
- TypeScript-testdelen kjørt separat: 238 tester, 233 bestått og fem eksisterende `poster-markdown`-feil. De gjelder Vulkaner-etiketter, quizplassering, kapittelskannere, isbre-widgetplassering og istidsmalen.
- Feilnavnene i begge fulle testdeler er sammenliknet med kapittel 4-loggene. Ingen nye eller bortfalte grunnfeil. Fullsuitefeil er ikke skjult eller reparert i denne innholdsleveransen.
- `git diff --check`: bestått. Ingen forbudte tegn i nye eller endrede markdown-filer.
- Et forsøk på lokal SVG-rasterkontroll ble avsluttet fordi `cairosvg` ikke er installert. Ingen pakke er installert, og ingen rasterkontroll er påstått gjennomført.
- Ingen nettleser-, canvas-, interaksjons- eller full WCAG-kontroll er utført. Serverrendering dokumenterer ikke visuell kollisjonsfrihet eller faktisk tastaturrulling.

Logger ligger utenfor repoet som `/workspace/geografi-kap5-*.log`. Baselinesammenlikningen ligger i `/workspace/geografi-kap5-validering.json`. Ingen logger, kildenedlastinger eller testcache legges i committen.

## Forslag til PR

**Tittel:** Geografi: kapittel 5 – vær, klima og klimaendringer

**Base:** `geografi-kap4`. Opprett som utkast, én kapittelleveranse over #303.

**PR-tekst:**

### Innhold

- Skriver bare kapittel 5, Vær, klima og klimaendringer, med ni underkapitler og 6528 ord.
- Legger inn kompetansemål, læringsmål, oppsummering, 18 begreper, tre oppgavelag og begrunnet quiz.
- Bruker 29 kontrollerte eksterne kilder med teksthenvisninger og KILDER-liste.
- Behandler Hans i august 2023 og en datert Bangladesh-vurdering fra 2022, uten udokumenterte ferske hendelser eller attribusjonstall.
- Gjenbruker sju figurer med egen Vg1-visning, og legger til klimadiagram med kontrollerte Blindern-normaler 1991–2020, kilde, lisens og tabell samt en kvalitativ scenariofigur.
- Bevarer Geofag-standardvisningene. Tre kartfigurer gjenstår som skjulte markører: 5.0, 5.10 og 5.11.
- Legger til kapittelspesifikt reseed. Ingen main-, deploy- eller Cloudflare-endring.

### Kontroll

Se ny normaldatavalidering i `docs/geografi-klimanormaler-blindern.md`. Opprinnelig var typecheck, berørt ESLint, 73 relevante tester, figur-SSR og build grønne. Åtte standardfigurer har identisk HTML med basen. Fullsuite er ikke grønn fra før: 17 skriptfeil og fem poster-markdown-feil er uendret mot kapittel 4. Ingen nettleser- eller interaksjonstest er gjort. Se `docs/geografi-kap5-redaksjon.md` for avgrensninger, kildeaudit og gjenstående kartarbeid.

### Før merge

Mats må lese teksten og godkjenne reseed. Fullfør eller avklar de tre kartfigurene. Normalene i 5.1 er kontrollert, og stasjon og normalperiode må følge ved videre bruk. Ikke framstill oppvarmingstallet for 2011–2020 som en måling av 2026.
