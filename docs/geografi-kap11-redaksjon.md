# Redaksjonell overlevering: kapittel 11

Oppdatert figurstatus står i `geografi-kap11-mats-valg.md` (Mats sine valg) og `geografi-kap11-skjulte.md` (de skjulte figurene). Resten av dette notatet dokumenterer første leveranse, og figurtabellene under kan derfor være utdatert.

## Leveranse og arbeidsgren

Kapittel: **Migrasjon**. Rute: `/geografi/migrasjon`. CMS-slug: `geo-migrasjon`.

Arbeidsgren: `geografi-kap11`, opprettet fra `origin/geografi-kap10`, commit `eea5533fec4ab3df7784fafba1bc9763f0eae8bd`. Dette er én kapittelleveranse over utkast-PR #307. Bare kapittel 11 er skrevet; alle elleve Geografi-kapitler har nå tekststatus. Arbeidet er utført på boksen etter Mats' uttrykkelige unntak fra CloudAgent-regelen. Ingen push, PR-oppretting, merge, CloudAgent, deploy eller infrastrukturendring er utført.

Fagteksten har **5805 ord**, inkludert overskrifter, henvisninger, begreper og oppgaver, men uten widgetkoder, skjulte figurmarkører, lenkemål og markdownsymboler. Historieåpningen har **204 ord**. Ord-/tallsekvenser med interne bindestreker teller som ett ord.

KM484 står først, med KM481 som avgrenset støtte. Historieåpningen bruker faktiske flyttinger mellom Nord-Norge og andre landsdeler, uten oppdiktede personer eller motiver. Brødavsnittene har normalt fem setninger. Avslutningen har åtte oppsummeringspunkter, planens femten begreper og tre støttebegreper, 15 spørsmål, seks refleksjonsspørsmål, seks a–b–c-oppgaver og tre quizformater med begrunnet fasit. Ingen elevoppgave ber om private migrasjonshistorier, oppholdsstatus eller identifisering av ofre.

Sju underkapitler:

1. Hva er migrasjon?
2. Hvorfor folk flytter.
3. Flytting i Norge.
4. Utvandring og innvandring.
5. Global migrasjon.
6. Flyktninger.
7. Menneskehandel.

## Kontrollerte data, ikke konstruerte øvingsserier

Tall, kategorier og fagkilder er kontrollert **6. november 2026**. Alle diagrammer er egne SVG-framstillinger med eksisterende `Diagram`/`FigureFrame`/`ScrollFrame`. Ingen eksterne bilder, kartfiler eller visualiseringsbibliotek er kopiert inn. Ingen figur krever et levende API-kall i elevens nettleser.

### Kommune og fylke, SSB 09588

- Kilde: https://www.ssb.no/statbank/table/09588
- Metadata/data: https://data.ssb.no/api/v0/no/table/09588
- Versjon: **13. mars 2026**. Referanseår **2025**.
- Ni regioner: Akershus (`32`), Ullensaker (`3209`), Oslo kommune (`0301`), Nordland (`18`), Bodø (`1804`), Troms (`55`), Finnmark (`56`), Tromsø (`5501`) og Alta (`5601`).
- Sju originalvariabler per region: innenlands inn, ut og netto; innvandring, utvandring og nettoinnvandring; publisert innenlandsk nettorate.
- **63 originale verdier**. Kommunesøylene bruker SSBs publiserte rate per 1000 middelfolkemengde, ikke en ny nevnerberegning.

| Region | Innenlands netto | Nettoinnvandring | Innenlands nettorate, promille |
| --- | --- | --- | --- |
| Akershus | 5122 | 1121 | 6,9 |
| Ullensaker | 581 | 192 | 12,8 |
| Oslo | −3444 | 2565 | −4,7 |
| Nordland | −1463 | 1480 | −6,0 |
| Bodø | −320 | 97 | −6,0 |
| Troms | −1012 | 1627 | −5,9 |
| Finnmark | −412 | 650 | −5,5 |
| Tromsø | −232 | 388 | −2,9 |
| Alta | −104 | 164 | −4,7 |

Fylkesrader utelater flyttinger mellom kommuner innen samme fylke. Kommune- og fylkesrader er ikke uavhengige grupper som skal summeres. Utvalget er ikke en nasjonal rangering. Nettoflytting er ikke total befolkningsvekst; fødsler og dødsfall mangler her. Lokale nettotall dokumenterer ikke hvor alle flytterne kom fra eller dro til.

### Faktisk fra–til-matrise, SSB 14753

- Kilde: https://www.ssb.no/statbank/table/14753
- Versjon: **13. mars 2026**. Referanseår **2025**.
- Seks ikke-overlappende landsdeler `La1`–`La6`: Oslo og Akershus; Østlandet ellers; Agder og Rogaland; Vestlandet; Trøndelag; Nord-Norge.
- **36 originale celler**, vist i tilgjengelig tabell. Rader viser fra, kolonner til. Diagonalen er flytting over kommunegrenser innen samme landsdel, ikke null/stillstand.
- Fra Nord-Norge til fem andre landsdeler: **11 751**. Motsatt vei: **8 864**. Forskjell: **2 887**.
- Nord-Norge til Oslo og Akershus: **3 441**. Motsatt vei: **2 545**. Forskjell: **896**.

Dette er observerte retninger, ikke piler gjettet fra nettoendring. Summene utelater flytting innen Nord-Norge og over landegrensen. De gjelder flyttinger, ikke nødvendigvis unike personer. De tre nordnorske fylkenes innenlandske netto summerer til −2887, som kontrollerer landsdelens netto mot en annen tabell. Ingen motivforklaring utledes fra dette alene.

### Registrert grunn, SSB 07113

- Kilde: https://www.ssb.no/statbank/table/07113
- Korrigert versjon: **28. august 2026**.
- Førstegangsinnvandringer blant innvandrere med **ikke-nordisk statsborgerskap**, 2015 og 2025.
- Sju grunnkoder (`00` total, `01` arbeid, `02` familie, `03` flukt, `04` utdanning, `05` ukjent, `06` andre), åtte ikke-overlappende landbakgrunnsgrupper og to år gir **112 originale verdier**.
- Total `00` summeres separat fra grunnkategoriene; den telles ikke dobbelt i kategorisummen.

| År | Arbeid | Familie | Flukt | Utdanning | Andre | Ukjent | Separat total |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2015 | 18111 | 16728 | 9282 | 4963 | 251 | 6 | 49341 |
| 2025 | 10545 | 12995 | 13870 | 2882 | 504 | 186 | 40982 |

Registrert grunn er ikke dagens yrke, et komplett individuelt motiv eller antall asylsøknader. **40 982** er ikke alle innvandringer i 2025. Differansen mot **55 243** i totalstatistikken kan ikke uten videre kalles nordiske statsborgere; blant annet tilbakeflytting og andre avgrensninger påvirker sammenlikningen.

### Historiske strømmer, SSB 05803

- Kilde: https://www.ssb.no/statbank/table/05803
- Versjon: **15. april 2026**.
- Årene 1960, 1970, 1980, 1990, 2000, 2010, 2020 og 2025; alle registrerte inn- og utvandringer, **16 originale verdier**.
- Inn: **13536; 17383; 18776; 25494; 36542; 73852; 38071; 55243**.
- Ut: **18681; 18352; 14705; 23784; 26854; 31506; 26744; 32919**.
- Beregnet netto 1960: **−5145**; 2025: **22324**.

Årsavstandene er proporsjonale. Linjene mellom utvalgte år er ikke observasjoner av alle mellomår. Innvandring for 1950 manglet i uttaket og er **ikke gjort om til null**; året er utelatt. Historien før 1960 er forklart med kontrollerte historiske fagkilder, ikke en konstruert kurve. Opplysningen om nær 29 000 oversjøiske utvandrere i 1882 kommer fra Bore (2005), ikke fra den moderne strømserien. Innvandringsstoppen i 1975 forklares som begrensning av deler av arbeidsinnvandringen, ikke stopp for all innvandring.

### Publiserte UNHCR-fakta, ikke et importert databasedatasett

- https://www.unhcr.org/global-trends, **Global Trends 2025**, publisert **11. juni 2026**.
- https://www.unhcr.org/refugee-statistics/insights/explainers/refugee-hosting-metrics.html
- Referansetid: **utgangen av 2025**, ikke sanntid eller nye ankomster gjennom året.
- Tvunget fordrevne, deduplisert samlet anslag: **117,8 millioner**.
- Bred flyktninggruppe, inkludert UNRWA og andre med beskyttelsesbehov: **41,6 millioner**.
- Ventende asylsøkere: **9,0 millioner**.
- Internt fordrevne på grunn av konflikt/vold: **68,7 millioner**. Dette er ikke alle katastrofefordrevne.
- Nabolandsandel: **65 prosent** i UNHCRs avgrensede flyktning-/beskyttelsesgruppe. Den inkluderer flyktningliknende situasjoner og andre med beskyttelsesbehov, men **utelater UNRWA**.

De fem publiserte faktatallene er bevart i JSON og datamodul. **35 prosent** er egen beregnet rest av 100, ikke et sjette publisert kildefaktum. 65 prosent gjelder ikke alle 117,8 millioner eller uten videre den brede gruppen på 41,6 millioner. Noen UNRWA-flyktninger er også internt fordrevne, og avrundede delgrupper skal ikke summeres til den dedupliserte totalen.

UNHCRs offentlige faktasider er innholdslest. Datasettvilkårssiden lot seg ikke hente (tidsavbrudd/403), så **UNHCRs databaselisens er ikke verifisert**. Ingen databasefil, regionsuttrekk, ekstern illustrasjon eller kartdata er importert, og ingen CC BY-lisens påstås for UNHCR-tallene. Figuren er egen framstilling av fem offentlig publiserte fakta. Før et regionalt databaseuttrekk/kart gjenbrukes, må vilkårene kontrolleres.

## Filer, reproduksjon og lisenser

- `src/lib/geografi-migrasjonsdata.ts`: alle **227 originale SSB-verdier**, kildeversjoner og SHA-256 for rå datanedlastinger, samt summer og fem UNHCR-fakta.
- `docs/geografi-kap11-ssb09588-query.json`, `-ssb14753-query.json`, `-ssb07113-query.json`, `-ssb05803-query.json`: eksakte offentlige lesespørringer. POST JSON til `https://data.ssb.no/api/v0/no/table/TABELL_ID` leser statistikk og skriver ikke til SSB.
- `docs/geografi-kap11-unhcr-faktatall.json`: de fem publiserte faktatallene med referanse-/publiseringsdato og kildelenker.
- `public/downloads/geografi-migrasjon-ssb09588.csv`: 63 verdier.
- `public/downloads/geografi-migrasjon-ssb14753.csv`: 36 verdier.
- `public/downloads/geografi-migrasjon-ssb07113.csv`: 112 verdier.
- `public/downloads/geografi-migrasjon-ssb05803.csv`: 16 verdier.

SSB-statistikk er kreditert med navn, tabell, egen bearbeiding og [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), kontrollert på https://www.ssb.no/diverse/lisens i samme arbeidsserie 6. november 2026. Bare avgrensede verdier og offentlige lesespørringer er versjonert. Råresponser, offentlig HTML og metadata ligger utenfor repoet under `/workspace/geografi-kap11-kilder/`; kontaktpersonmetadata er ikke importert. Senere API-revisjoner kan gi andre tall. SHA-256 identifiserer det daterte råuttrekket, ikke en garanti om uendret framtidig respons.

CSV-uttrekkenes SHA-256:

- `geografi-migrasjon-ssb05803.csv`: `113ad1403cf35c7894d6de71808c3fe9b669fc264b29cfa7ea927257619ff88c`.
- `geografi-migrasjon-ssb07113.csv`: `45fec90d4d33353e688a253c25d3a7853b1dc56699fc1c1ac9fdb7acef51bbf7`.
- `geografi-migrasjon-ssb09588.csv`: `f54877d52ff2cb25cb7fe888ed41556f67aba2670c7543a62e1c51d60dd94f8c`.
- `geografi-migrasjon-ssb14753.csv`: `7643e58a0c84e30d0e7a5b00f3449ea53bdd6a969e29dbf5e20b1a78e3aa587c`.

## Figurer og gjenstående arbeid

Fem figurposisjoner er helt eller delvis levert, fordelt på fem komponenter og seks SVG-er:

- **11.2:** Kvalitativ skyve-/trekkmodell med reelle handlingsmuligheter som eget perspektiv; ingen konstruerte vekter eller individuelle årsakspåstander.
- **11.3, diagram og matrise:** Fem kommuners publiserte innenlandske nettorater med nullstrek, ni regioners kildeverdier, faktiske nord–sør-summer og komplett 6×6-matrise.
- **11.4:** Inn- og utvandring i åtte kontrollerte år 1960–2025. Historien før 1960 finnes i tekst, ikke i en oppdiktet serie.
- **11.7:** Parede søyler 2015/2025, alle seks grunnkategorier og separat total; bare førstegangsinnvandringer i den avgrensede gruppen.
- **11.6, diagram og faktatabell:** Korrekt avgrenset nabolandsandel og datert global årsstatus med overlapp forklart. **Dette er ikke den planlagte regionfordelingen.**

Tre hele kart og to kartdeler gjenstår som skjulte referansedefinisjoner:

- **11.1:** Globalt netto-migrasjonskart; velg kontrollert periode, rate/antall, manglende verdier og konkret kartgrunnlag.
- **11.3, kartdel:** Kommunekart for samme år og nettorate. Riktig kommunegeometri og lisens gjenstår.
- **11.5:** Noen faktisk dokumenterte globale forbindelser. Kategori, tidsrom og pilbetydning må kontrolleres; ingen udokumentert pilbredde.
- **11.6, kartdel:** Regional flyktningfordeling. Faktisk databaseuttrekk, kategorier, dato, dobbeltelling, verts-/opprinnelsesland og vilkår gjenstår.
- **11.8:** Casekart som lokaliserer de fem kommunene. Ingen kartgrunnlagsfil eller koordinater er importert.

Ingen oppgave krever disse kartene. Diagrammene er statiske og har tilgjengelige kilde-/datatabeller, ikke implementert kartinteraksjon eller tidsanimasjon. Ingen annen kapitteltekst, Geofag-post, etablert Geofag-modell eller rute er endret.

## Avklaringer for Mats

Ingen blokkerende avklaring for fagteksten. Designarbeidet må velge og kontrollere konkrete kartgrunnlag og UNHCR-databasevilkår før de gjenstående kartene produseres. 11.6 må ikke omtales som levert regionkart. Begreper om flyktningstatus, kollektiv beskyttelse, smugling og menneskehandel er faglig undervisning, ikke individuell juridisk rådgivning. Menneskehandel er forklart med barns særstilling og skillet mellom identifiserte ofre og faktisk forekomst, uten stigmatisering eller gamle omfangstall framstilt som nye.

`geo-migrasjon-kap11-2026-11-06` er lagt i `COPY_RESEEDS_B`. Flagget kan overskrive CMS-redigert tekst ved første godkjente innlasting. Ingen produksjonsinnlasting er utført; tidligere flagg er beholdt.

## Kilder kontrollert 6. november 2026

17 APA-oppføringer i `kilder-geografi.ts`. Kildeinnhold, forfattere, oppdateringsdatoer, kategorier og metode er kontrollert, ikke bare HTTP-status. SNLs forfattere er skilt fra fagansvarlige. SSBs historiske artikkel er lest som historisk kilde. Verdensbankens rapportnettside og kapittelsammendrag er brukt, ikke påstått full gjennomlesning av rapporten. UNODCs FAQ brukes for definisjoner og kildebegrensninger, ikke eldre omfangstall som nåtid. UDI brukes for prinsippet om gruppevurdering, ikke gjeldende rettigheter/varighet for en bestemt person.

- Bore, R. R. (2005, 9. november). «... en ganske kraftig forminskelse av Europas befolkning». Statistisk sentralbyrå. Historisk omtale av oversjøisk utvandring og kildematerialet. https://www.ssb.no/befolkning/artikler-og-publikasjoner/en-ganske-kraftig-forminskelse-av-europas-befolkning
- Butenschøn, P. (2020, 18. juli). Urbanisering. I Store norske leksikon. Brukt for begrepet, ikke eldre prosenttall eller en universell bygrense. https://snl.no/urbanisering
- Den internasjonale organisasjonen for migrasjon [IOM]. (u.å.). Key Migration Terms. Begrepsforklaringer, herunder strøm/beholdning, miljømigrasjon og FNs protokolldefinisjoner. Hentet 6. november 2026. https://www.iom.int/key-migration-terms
- FNs høykommissær for flyktninger [UNHCR]. (2026, 11. juni). Global Trends 2025. Årsstatus ved utgangen av 2025. Publiserte faktatall, kategorier, dobbelttelling og returforhold. https://www.unhcr.org/global-trends
- FNs høykommissær for flyktninger [UNHCR]. (u.å.-a). Refugee hosting metrics. Forklarer nabolandsmålets nevner; utgangen av 2025. Hentet 6. november 2026. https://www.unhcr.org/refugee-statistics/insights/explainers/refugee-hosting-metrics.html
- FNs høykommissær for flyktninger [UNHCR]. (u.å.-b). The 1951 Refugee Convention. Konvensjon, protokoll, definisjon og sentrale beskyttelsesprinsipper. Hentet 6. november 2026. https://www.unhcr.org/about-unhcr/overview/1951-refugee-convention
- FNs kontor for narkotika og kriminalitet [UNODC]. (u.å.). Human Trafficking FAQs. Brukt for definisjoner, barns stilling og skillet mellom identifiserte ofre og faktisk forekomst, ikke eldre omfangstall. Hentet 6. november 2026. https://www.unodc.org/unodc/en/human-trafficking/faqs.html
- Gursli-Berg, G., Myhre, J. E., & Tønnessen, M. (2026, 25. juni). Norsk innvandringshistorie. I Store norske leksikon. https://snl.no/Norsk_innvandringshistorie
- Hansen, T., & Tjernshaugen, A. (2026, 4. mars). Sentralisering. I Store norske leksikon. https://snl.no/sentralisering
- Statistisk sentralbyrå [SSB]. (2026a, 13. mars). 09588: Flytting, etter region [Datasett]. Ni utvalgte kommuner og fylker; innenlandske flyttinger, inn-/utvandring og publisert innenlandsk nettorate i 2025. Uttrekk 6. november 2026. https://www.ssb.no/statbank/table/09588
- Statistisk sentralbyrå [SSB]. (2026b, 13. mars). 14753: Flyttinger, etter tilflyttingsregion og fraflyttingsregion [Datasett]. Seks landsdeler, 2025. Alle flyttinger over kommunegrenser; ikke kommuneinterne flyttinger. Uttrekk 6. november 2026. https://www.ssb.no/statbank/table/14753
- Statistisk sentralbyrå [SSB]. (2026c, 15. april). 05803: Endringer i befolkningen i løpet av året [Datasett]. Alle registrerte inn- og utvandringer, åtte utvalgte år 1960–2025. Uttrekk 6. november 2026. https://www.ssb.no/statbank/table/05803
- Statistisk sentralbyrå [SSB]. (2026d, 28. august). 07113: Innvandringer, etter innvandringsgrunn og landbakgrunn [Datasett]. Korrigert versjon. Førstegangsinnvandringer blant innvandrere med ikke-nordisk statsborgerskap; 2015 og 2025. Uttrekk 6. november 2026. https://www.ssb.no/statbank/table/07113
- Statistisk sentralbyrå [SSB]. (u.å.). Lisens. CC BY 4.0. Hentet 6. november 2026. https://www.ssb.no/diverse/lisens
- Utdanningsdirektoratet [Udir]. (u.å.). Kompetansemål og vurdering: Geografi (GEO01-02). Hentet 6. november 2026. https://www.udir.no/lk20/geo01-02/kompetansemaal-og-vurdering/kv49
- Utlendingsdirektoratet [UDI]. (u.å.). Kollektiv beskyttelse. Brukt for skillet mellom gruppevurdering og individuell vurdering, ikke som personlig oppholdsveiledning. Hentet 6. november 2026. https://www.udi.no/ord-og-begreper/kollektiv-beskyttelse/
- Verdensbanken. (2023). World Development Report 2023: Migrants, Refugees, and Societies. Rapportnettsidens hovedbudskap og kapittelsammendrag. Brukt for virkninger, rettigheter og politikk, ikke gamle globale tall som nåtidsstatistikk. https://www.worldbank.org/en/publication/wdr2023

UNHCRs manglende vilkårskontroll er forklart separat over og er ikke skjult bak en generell lisenspåstand.

## Validering

- Typecheck: bestått.
- ESLint på berørte TypeScript-/TSX-filer: bestått uten feil eller advarsler.
- Geografi-, seed- og reseed-tester: **117 av 117 bestått**, inkludert tolv nye kapitteltester.
- Alle 227 CSV-verdier er i tillegg kontrollert uavhengig mot rå API-responsenes dimensjonsrekkefølge og verdier; alle fire rå SHA-256 er bekreftet.
- Datatestene kontrollerer alle 227 originale SSB-verdier mot fire CSV-uttrekk, regnskapsidentiteter, fra–til-retning, faktisk nord–sør-netto, alle grunnkategorier, historiske strømmer, UNHCR-datoer/avgrensninger og reseed.
- SSR: fem komponenter og seks SVG-er bestått; ni regionrader, 36 matriseceller, åtte historiske år, tolv grunnsøyler og fem UNHCR-fakta kontrollert. Rektangler og historiske punkt er innenfor gyldig diagramgeometri. Dette er **ikke** en visuell nettleser-, skjermleser- eller full WCAG-kontroll.
- Build uten `DATABASE_URL`: bestått. Loggen bekrefter at ekstern databasemigrering hoppes over. Ingen deploy. Kjente CSS-/chunkstørrelses- og Wrangler-genereringsadvarsler gjenstår.
- Full JavaScript-del: **206 tester, 188 bestått, 17 kjente feil, én hoppet over**.
- Full TypeScript-del: **282 tester, 277 bestått, fem kjente feil**.
- Alle fullsuitefeilnavn er maskinelt sammenliknet med kapittel 10-loggene: identiske, ingen nye fullsuitefeil. Kjente feil ligger i template/OG/app-env/skills og fem eldre poster-markdown-forventninger; de er ikke rettet utenfor oppdraget.
- `git diff --check`: bestått.

Logger og resultatfiler ligger utenfor repoet som `/workspace/geografi-kap11-*.log`, `-validering.json`, `-ord.json` og `-ssr.json`. Eksisterende tester er endret bare der forventet tekststatus/antall kapitler eller tidligere ventestatus må følge at siste kapittel nå har tekst.

## Forslag til PR

Tittel: `Geografi: kapittel 11 – migrasjon`

Base: `geografi-kap10`. Hode: `geografi-kap11`. Opprett som utkast først etter oppdragsgivers push. Ingen PR er opprettet i denne leveransen.

PR-tekst:

Skriver kapittel 11 alene med sju underkapitler, dokumentert nord–sør-case, oppsummering, 18 begreper og differensierte oppgaver. Registrerer 17 kontrollerte kilder, tekststatus og eget reseed. Alle elleve Geografi-kapitler har nå tekst.

Leverer fem figurposisjoner helt eller delvis med ekte SSB-data og fem offentlig publiserte UNHCR-fakta. Bevarer 227 originale SSB-verdier med datatabeller, fire CSV-uttrekk, eksakte lesespørringer og kildehashverdier. Nord–sør-casen bruker faktiske fra–til-celler, ikke antatte ruter fra nettotall. Innvandringsgrunn avgrenses til førstegangsinnvandringer blant ikke-nordiske innvandrere. UNHCRs 65-prosentnevner og overlapp i global årsstatus forklares eksplisitt. Ingen syntetiske data eller individmotiver er lagt inn.

Tre hele kart og to kartdeler gjenstår. 11.6 er en nabolandsandel/faktatabell, ikke et regionkart. UNHCRs databasevilkår lot seg ikke kontrollere; ingen databasefil eller ekstern figur er importert. Ingen elevoppgave krever uferdige kart eller private migrasjonshistorier.

Typecheck, berørt ESLint, 117 relevante tester, fem figur-SSR-er og build er grønne. Fullsuite har bare de samme 17 JavaScript-feilene og fem TypeScript-feilene som kapittel 10. Ingen annen kapitteltekst eller Geofag-side er endret og ingen utrulling er utført. Reseed kan overskrive CMS-tekst først ved godkjent aktivering. Se `docs/geografi-kap11-redaksjon.md` for metode, kilder og forbehold.
