# Geografi kapittel 1 – redaksjonelt vedlegg til PR B

Oppdatert figurstatus står i `geografi-kap1-mats-valg.md` (Mats sine valg) og `geografi-kap1-skjulte.md` (de skjulte figurene). Resten av dette notatet dokumenterer første leveranse, og figurtabellene under kan derfor være utdatert.

Dette er ikke elevtekst og lastes ikke av nettstedet. Fagtekst: `src/lib/posts/geo-verktoy.md`.

## Leveransen

Åtte underkapitler, egen fortellingskrok, fem læringsmål, to Innblikk-caser, oppsummering, begreper og oppgaver på tre nivåer. Quiz inneholder sant/usant, en skal ut og flervalg. Regneoppgaver har kontrollsvar. Teksten kan leses uten figurer og viser ikke til figurer som ennå mangler.

Kompetansemålene er kontrollert i Udirs GEO01-02/KV49 6. november 2026 (Europe/Oslo). KM487 er hovedmål. KM486 forberedes gjennom kartarbeid; gjennomført feltarbeid er ikke påstått.

## Figurplasser for DesignBOT

Markørene er ubrukte Markdown-lenkedefinisjoner av formen `[figur-1-0]: # (FIGURPLASSHOLDER …)`. De er skjult ved vanlig Markdown-rendering, uten HTML-kommentarer eller nye widgets. En renderingstest verifiserer dette. Ingen figur er fremstilt som ferdig, og ingen ubekreftet bildelisens er tatt i bruk. Ved innsetting: erstatt markøren med eksisterende figur/widget-format, sett inn figurhenvisning og dokumenter faktisk lisens og attribusjon.

| Nummer | Plassering | Innhold som gjenstår |
|---|---|---|
| 1.0 | Etter læringsmål, før Tenk over | Mønsterkart uten landegrenser; Natural Earth etter vilkårskontroll. |
| 1.1 | Mercator og Gall–Peters | Mercator-verdenskart med tilgjengelig tekstalternativ. |
| 1.2 | Etter forklaring av flateriktig projeksjon | Gall–Peters med Tissot; avklar bruk av BY-SA før konkret fil tas inn. |
| 1.3 | Etter koordinateksemplet | Gradnett med øvingspunktet 60,0° nord, 10,0° øst. Ingen navngitt by påstås. |
| 1.4 | Etter ekvidistanse-eksemplet | Topografisk utsnitt og høydekurver; åpne N50-data eller egen skisse. Ikke kopier Geovekst uten klarerte vilkår. |
| 1.5 | Før Kart som viser statistikk | Samme sted som topografisk kart og temakart. |
| 1.6 | Etter definisjon av mentalt kart | Egen skisse som tydelig er personlig og uten presis målestokk. |
| 1.7 | Etter innledning til fjernmåling | Blue Marble; verifiser konkret fil, sammensetning og NASA-kreditering. Ikke presenter som ett ubehandlet øyeblikksfoto. |
| 1.8 | Etter vektor/raster | GIS-lag over samme sted, med statisk tekstalternativ. |
| 1.9 | I Snow-casen | Dokumenter konkret historisk kartversjon; skillet mellom utbrudd 1854 og utgivelse 1855 må beholdes. |
| 1.10 | I andre Innblikk-case | To egne temakart over et eksplisitt oppdiktet skoleområde. Ikke framstill illustrasjonene som reelle farekart. |

Alle elleve er plassholdere, ikke ferdige figurer. StedKart/KartSerie er ikke bygget som del av denne tekstleveransen; kartøvelsene bruker verifiserte eksterne tjenester. Ingen lenke til det uferdige felles begrepsregisteret er lagt inn.

## Kildekontroll

Alle 16 kilder i `kilder-geografi.ts` er åpnet med WebFetch 6. november 2026 (Europe/Oslo). SNLs metadata for geografi, region og kildekritikk er i tillegg lest i offentlig HTML. Når publiseringsdato ikke framgikk, brukes u.å. og hentedato; fagansvarlig er ikke gjort til forfatter uten forfatteroppføring. Alle kildene brukes i løpende APA-henvisninger. KILDER-listen leveres av eksisterende Kildeliste-komponent, ikke som en duplikat i Markdown.

| Fagstoff | Kildegrunnlag |
|---|---|
| Fagets perspektiv, natur/samfunn, romlige forbindelser | SNL: Geografi og Region. |
| Kartets utvalg, målestokk, koordinater, ekvidistanse | Kartverket: Kva er eit kart? (2023). |
| Karttyper | Kartverket: Karttypar (2020). |
| Projeksjonenes egenskaper | Rød: Kartprojeksjon (2026). |
| Symboler, skala, rammeinformasjon og digital zoom | Hunt et al.: Map (2026), National Geographic Society. |
| Kartogram og proporsjonale sirkler | Mæhlum: Kartogram (2025). |
| Mentale kart | Sahr: Mental map (Spektrum). Forfatter bekreftet gjennom signaturen WDS og sidens forfatteroversikt. |
| Fjernmåling, vektor/raster og kartlag | USGS: GIS educational resources (2025). |
| Romlig oppløsning, 30 meter for multispektrale bånd | USGS: Landsat 8. Ikke forvekslet med termiske bånd eller gjentaksintervall. |
| GIS og romlig analyse | Pearson, Gary og Wilson (2007), USGS Fact Sheet. |
| Praktiske kartøvelser | Kartverket: Norgeskart.no (2026); NIBIO: Brukerveiledning Kilden. |
| Kildekritikk | Orgeret og Hatlen: Kildekritikk; kartets rammeinformasjon hos National Geographic Society. |
| Snow-case og historisk forbehold | Field (2020), Esri; planens «første romlige analyse» er ikke videreført, fordi kildekontrollen motsier det. |

Kilder som ikke kunne åpnes eller ikke ble brukt: foreslåtte National Geographic-adresser for Geography/Five themes (404), NASA Earthdata-adresse (403), eldre CDC-adresse for Snow (404). De står ikke i elevkildelisten. Ingen tilgangsbegrensning er omgått.

## Avgrensning og godkjenning

- Branch fra `origin/geografi-del`, ingen main-, DNS- eller Cloudflare-endring.
- Nye reseed-flagget `geo-verktoy-kap1-2026-11-06` erstatter skjelettteksten ved senere godkjent utrulling. Ingen reseed er kjørt mot drift.
- `tekstKlar` betyr at kapitlet har fagtekst. Det skjuler de utdaterte skjelettmeldingene og dobbel visning av læringsmål; det er ikke en påstand om at figurarbeidet er ferdig.
- Fortsatt beslutning: BY-SA for figur 1.2 og kartgrunnlag/rettigheter for figur 1.4. Behold plassholder til klarering.
- Figurleveranse og eventuell samlet publiseringsklarhet vurderes separat før merge.

## Teknisk merknad fra valideringen

Typecheck avdekket at desktopmenyen sendte konkrete Geografi-stier til TanStack Link som om de var statiske filruter. PR A har én dynamisk rute. En liten typevakt og `to="/geografi/$kapittel"` med `params` retter dette uten å endre URL-er, mobilmeny eller andre fag. Ingen typefeil skjules med `any` eller `ts-ignore`.

## Sluttkontroll

- Ordtelling: 4 328 ord i Markdown-teksten, inkludert mål, tabeller, oppgaver og kildesiteringer, men uten de skjulte figurmarkørene. Ord regnet som bokstav-/tallsekvenser med interne bindestreker eller apostrofer.
- `npm run typecheck`: grønn etter den avgrensede rettingen av rutetypingen.
- ESLint på alle seks berørte TypeScript-/TSX-filer: grønn.
- Geografi-, reseed- og post-seed-testene: 33 av 33 grønne, inkludert fire nye kapitteltester og renderingstest for skjulte figurmarkører.
- Produksjonsbuild: grønn; DATABASE_URL fjernet fra byggeprosessen slik at ingen ekstern databasemigrering kjøres.
- Full `npm test`: ikke grønn på eksisterende base. Skriptleddet gir 188 bestått, 17 feil og 1 hoppet over, identisk med isolert `origin/geografi-del` på d5c9515. Feilene gjelder eksisterende template-/branding-/app-env-/migrasjonstester.
- Hele TypeScript-testleddet kjørt separat: 193 bestått, 5 feil. Baseline gir 189 bestått, de samme 5 feilene. Fire nye tester består. Avvikene gjelder chapter-scan/Vulkaner, tre poster-markdown-tester og pakke-b/isbre. Ingen av dem er endret i denne leveransen.
- `git diff --check`: grønn. Ingen utropstegn eller venstre vinkelparenteser i de to nye/endrede Markdown-filene.
