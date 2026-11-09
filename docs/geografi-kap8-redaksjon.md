# Geografi kapittel 8 – redaksjonell overlevering, PR E

Oppdatert figurstatus står i `geografi-kap8-mats-valg.md` (Mats sine valg) og `geografi-kap8-skjulte.md` (de skjulte figurene). Resten av dette notatet dokumenterer første leveranse, og figurtabellene under kan derfor være utdatert.

## Leveranse og avgrensning

Kapittel: Bærekraftig utvikling, `/geografi/baerekraft`, `geo-baerekraft`.
Branch: `geografi-kap8`, opprettet fra `origin/geografi-kap6`, base `b5b1e4211e8f3fa1b7a0eb51de528dfab098abb2`.
Kun lokal commit. Ingen push, PR-oppretting, merge, deploy eller infrastrukturendringer.

Åtte underkapitler etter planen: Hva er utvikling; Mål på utvikling; Bærekraftbegrepet; Planetære grenser; Ditt fotavtrykk; Norges ressursbruk; Dilemmaer; Veien videre.
Kompetansemål: KM485, med støtte i KM484 og KM481.

5435 ord i elevrettet markdown, inkludert overskrifter, tabeller, oppgaver, quiz og APA-henvisninger. Figurmarkører, widgetnavn, lenkemål, tabellskilletegn, Markdown-formatering og kjedepiler er fjernet før telling på mellomrom. Den registrerte figurens egen tekst og kildelisten er ikke medregnet. Åpningen er omtrent 190 ord. En enkel kontroll av løpende brødtekst uten APA-parenteser gir rundt 15 ord per setning.

Selvstendig skrevet tekst. Bibliotek og Terra Nova brukes bare som internt pensum- og planunderlag, aldri som elevkilder.
`tekstKlar: true`, kilder og `COPY_RESEEDS_B`-flagget `geo-baerekraft-kap8-2026-11-06` er lagt inn. Flagget aktiveres ikke ved lokal commit.

## Kildekontroll, 6. november 2026 (Europe/Oslo)

23 eksterne oppføringer i `src/lib/kilder-geografi.ts`, med APA-henvisninger i teksten. Alle brukte adresser er åpnet og kontrollert denne arbeidsrunden. UNDPs HDI-side ble lest fra offentlig HTML etter timeout i WebFetch. Ingen datasett, instituttgrafikk eller lisensbelagte figurer er lastet inn i elevsiden.

| Kilde og år | Brukt til og viktige avgrensninger |
|---|---|
| Udir, u.å. | Offisiell læreplan GEO01-02 og kompetansemål. |
| SSB, 2014 og 2024 | Nasjonalregnskapsbegreper, BNP, volumendring og forskjellen mellom BNP og BNI. Ingen gamle makrotall brukes som nåtall. |
| UNDP, u.å. | HDI, helse/skolegang/BNI, gjennomsnitt og begrensninger. Ingen landrangering eller uverifisert 2026-rapport. |
| Baah, Foster, Jolliffe, Lakner og Lara Ibarra, 9. juni 2025 | Verdensbankens nye fattigdomsgrense: 3,00 internasjonale dollar, 2021-kjøpekraft. Ikke valutakursomregning til en norsk grense. |
| Hasell mfl., 2022, dataside oppdatert 22. september 2026 | OWID/World Bank PIP: terskel, inntekt kontra forbruk, datadekning, beregninger og metodebrudd. Sidens anbefalte forfatterår beholdes, dataoppdatering oppgis separat. |
| FN-sambandet, 9. mars 2026 | Utviklingssyn, Brundtland, tre dimensjoner, målkonflikter og vekstdebatt. Sidens jordklodetall er ikke brukt som ferske tall. |
| UN DESA, u.å. | 17 bærekraftsmål, vedtak 2015, 2030-agenda og konkrete måltemaer. |
| PIK, 21. september 2026 | Planetary Health Check 2026: sju av ni grenser overskredet, havforsuring sist overskredet i 2025, eldre observasjoner i ny vurdering, sammenhengende risiko og regionalt ulike aerosolforhold. Ikke det gamle tallet seks av ni. |
| Service des données et études statistiques, u.å. | Offentlig gjennomgang av 2023-rammeverket: naturmangfold/funksjon og nitrogen/fosfor. Brukes bare til begrepsforklaringer, ikke som status for 2026. |
| IUGS og ICS, u.å. | Antropocen er ikke formelt vedtatt som geologisk epoke; fortsatt mulig som beskrivende begrep. |
| GFN, fire sider, u.å.-a til -d | Kalkulatormetode/FAQ, Country Overshoot Days 2026, økologisk fotavtrykk og den eksterne kalkulatoren. Landsgjennomsnitt og fellestjenester inngår; ikke alle miljøvirkninger fanges opp. |
| WWF, u.å. | Norsk overforbruksdag 16. april 2025, og manglende norsk dato 2026. Historisk dato merkes historisk. Ingen uverifisert ny dato eller jordklodetall. |
| KLD, 21. mai 2026 | Utslipp fra forbruk, import/eksport og en datert utredning om mål. Utredning er ikke dokumentasjon på at et nytt mål allerede er vedtatt. |
| Miljødirektoratet, u.å.-a og -b | Territorielle utslipp, produksjon og bruk av petroleum, CO₂-ekvivalenter, sirkulær økonomi, ombruk og materialgjenvinning. Ingen skiftende utslippstall fra nettsidene gjengis. |
| Ritchie, Rosado og Roser, 2023, data oppdatert 13. november 2025 | OWID/Global Carbon Budget: fossil energi og industri, territorielle CO₂-utslipp per person, ikke alle klimagasser, arealbruk eller forbruksbaserte utslipp. |
| UNEP International Resource Panel, 2024 | Global Resources Outlook: materialforbruk, infrastruktur, ressursuttak og omstilling. Ingen usikre framskrivningstall brukes. |
| World Bank, u.å., kontrollert 6. november 2026 | Kina: reformperiode fra 1978, utvikling i levekår og økonomiske/miljømessige ubalanser. Løpende oversikt, ikke en serie med felles observasjonsår. |
| IPCC, 2023 | AR6-syntesens hovedbudskap om ulikt ansvar, sårbarhet, rettferdig omstilling og samordnede tiltak. |

### Viktig funn: Norge har ingen publisert overforbruksdag for 2026

GFNs 2026-oversikt utelater Norge fordi datagrunnlaget ikke består kvalitetskontroller. Dette er ikke det samme som land som mangler dato fordi fotavtrykket ligger under verdens biokapasitet per person. Landets egen biokapasitet brukes heller ikke som nevner i Country Overshoot Day.

16. april gjelder 2025, ikke 2026. Planens norske case er derfor skrevet som en datakritisk undersøkelse, ikke et oppdiktet ferskt nøkkeltall. Siden har en eldre 2024-del også; kildekontrollen gjelder uttrykkelig 2026-delen og tilhørende kvalitetsmerknad.

## Figurer og arbeid som gjenstår

Én figur er levert og seks har skjulte, parser-testede markører. Eleven ser ingen redaktørnotater og blir ikke bedt om å tolke en figur som mangler.

| Figur | Status og krav før ferdig figur |
|---|---|
| 8.1 Ekstrem fattigdom | Skjult markør. OWID/World Bank PIP; terskel 3,00 dollar og 2021-kjøpekraft. Oppgi observasjonsår, modellerte/ekstrapolerte tall, manglende data og metodebrudd. Kontroller konkret datalisens og attribusjon før import. |
| 8.2 HDI mot BNP per innbygger | Skjult markør. Felles år, kjøpekraftsjustering, direkte landetiketter og Norge uthevet. HDI bruker BNI, selv om x-aksen etter planen skal være BNP. Avklar UNDP-vilkår og konkret indikatorlisens. Ikke erstatt HDI med en annen indikator uten å endre navn. |
| 8.3 Tre bærekraftdimensjoner | Levert gjennom `GeoBaerekraftTre`. Gjenbruk av egen `BaerekraftTreFigur`, med Vg1-tekst, kortere format og kilde FN-sambandet 2026. Ingen G2-energicaser eller terskeltall i Vg1-varianten. Standardvarianten for G2 er beholdt. Overlapp er begrepsmodell, ikke målte arealer eller tillatelse til å oppveie naturtap med penger. |
| 8.4 Planetære grenser | Skjult markør. Egen forenklet tegning med datert status fra 21. september 2026. Ikke kopier SRC/PIK-grafikk uten tillatelse. Ikke finn på radarlengder eller risikoprosenter. Skill statuskategori fra målt kontrollvariabel. |
| 8.5 Fotavtrykk, Norge/verden | Skjult markør. Norsk 2026-sammenlikning må vente på egnet, kvalitetssikret datasett med brukstillatelse. Ingen egne poengskalaer omregnet til jordkloder. En eventuell lokal kalkulator krever dokumentert metode og lisens. |
| 8.6 CO₂ per person | Skjult markør. Fossil energi og industri, territorielt, samme observasjonsår, enhet tonn CO₂/person. Ikke kall serien alle klimagasser eller samlet forbruksfotavtrykk. Kontroller originaldatavilkår, krediter OWID og GCB/befolkningskilder. |
| 8.7 Endring over tid | Skjult markør. Global serie med Norge og eventuelt Kina, samme definisjon og regnskapsutgave. Unngå å blande absolutte utslipp med utslipp per person. Marker databrudd og foreløpige observasjoner. |

Den eksterne GFN-kalkulatoren er en valgfri, kritisk øvelse med oppdiktet profil og én endring om gangen. Den er ikke en ferdig lokal widget. Oppgaven krever ingen konto og ingen private familieopplysninger. Hvis Norge mangler eller datagrunnlaget er uegnet, brukes metodesiden eller en eksplisitt utenlandsk øvingsprofil, aldri en utenlandsk profil omtalt som norsk. Ingen rangering av elever.

## Avklaringer for Mats

1. Godkjenne norsk overforbruksdag som datakritisk case med historisk 2025-dato og ingen oppfunnet 2026-dato.
2. Velge kvalitetssikret dataår og avklare datalisens for de seks resterende figurene, særlig UNDP/HDI og norsk fotavtrykk. En sammenlikning med eldre tall må dateres eksplisitt.
3. Bekrefte om en dokumentert lokal kalkulator skal bestilles i figurleveransen, eller om ekstern øvelse/metodekritikk er tilstrekkelig inntil videre.

## Validering

- `npm run typecheck`: bestått.
- ESLint på alle seks berørte TS/TSX-filer: bestått uten meldinger.
- Geografipakke, copy-reseed og post-seed: 50 av 50 tester bestått.
- SSR-smoke: Vg1-figurens smale SVG og brede tegnefunksjon rendrer, og G2-standardvarianten beholder energieksemplene. Ingen G2-tall eller energicaser i Vg1.
- `env -u DATABASE_URL npm run build`: bestått. Databasemigrering hoppes over; eksisterende CSS-/chunk-advarsler er ikke endret.
- `git diff --check` og kontroll av forbudte tegn i begge endrede Markdown-filer: bestått.
- Full `npm test`: første skriptdel har 188 bestått, 17 feil og én hoppet over. TypeScript-delen er derfor kjørt separat: 210 bestått og fem feil, av 215. De 17 skriptfeilene og fem TypeScript-feilene er sammenliknet ved testnavn med kapittel 6-loggene og er nøyaktig de samme. Ingen nye feil. Full testsuite er dermed ikke grønn; dette må ikke rapporteres som en full bestått kjøring.

De fem eksisterende TypeScript-feilene ligger i poster-markdown-testene for Vulkaner, kapittelskannere, isbre-widgeter og istidsposteren. Skriptfeilene gjelder eksisterende template/skill-/branding-/app-env-/migreringsforventninger. De er ikke rettet i denne leveransen.

Logger ligger på boksen som `/workspace/geografi-kap8-typecheck.log`, `-eslint.log`, `-relevante-tester.log`, `-figursmoke.log`, `-build.log`, `-full-tests.log` og `-lib-tests.log` med samme prefiks. Ingen eksterne tjenester er endret av bygge- og testkjøringen; bygg kjøres med `DATABASE_URL` fjernet for å unngå ekstern migrering.

## Forslag til utkast-PR

Base: `geografi-kap6`. Head: `geografi-kap8`.

Tittel: Geografi PR E: kapittel 8 – bærekraftig utvikling

PR-tekst:

### Innhold

- Selvstendig Vg1-fagtekst med åtte underkapitler, læringsmål, Norge-/Kina-eksempler, oppsummering, begrepsliste, oppgaver i tre lag og quiz.
- 23 verifiserte kilder med APA-henvisninger, tekstklar-status og engangsreseed.
- Gjenbruk av egen bærekraftfigur med egen Vg1-variant. Seks figurer står igjen som skjulte markører.
- Datert kildekritikk: Norge mangler publisert overforbruksdag i 2026 på grunn av datakvalitet; 16. april gjelder 2025. Planetære grenser er datert til 21. september 2026, og fattigdomsgrensen har 2021-kjøpekraft.

### Kontroller

Typesjekk, berørt ESLint, 50 relevante tester, SSR-smoke og produksjonsbygg bestått. Full suite har de samme 17 skriptfeilene og fem poster-markdown-feilene som basen, ingen nye. Bygg uten ekstern databasemigrering.

### Før godkjenning

Se `docs/geografi-kap8-redaksjon.md` for kilder, figurstatus og avklaringer om norsk fotavtrykksdata og eventuell lokal kalkulator. Stablet på kapittel 6, PR 298. Ingen merge før Mats har lest og godkjent.
