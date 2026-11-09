# Geografi kapittel 2 – redaksjonelt vedlegg til PR C

Oppdatert figurstatus står i `geografi-kap2-mats-valg.md` (Mats sine valg) og `geografi-kap2-skjulte.md` (de skjulte figurene). Resten av dette notatet dokumenterer første leveranse, og figurtabellene under kan derfor være utdatert.

Dette er ikke elevtekst og lastes ikke av nettstedet. Fagtekst: `src/lib/posts/geo-feltarbeid.md`.

## Leveransen

Seks underkapitler: Hva er feltarbeid, Problemstilling og plan, Metoder i felt, Sikkerhet og etikk, Bearbeide data og Presentere feltarbeid. Kompetansemål først, tenkt skolegårdshistorie, fem læringsmål, mikroklima-case, oppsummering, begreper, spørsmål på tre nivåer og quiz. To tomme CSV-maler gir nedlastbar plan og feltlogg. Veiledende egenvurderingskriterier finnes i elevteksten, tydelig skilt fra offisielle karakterkriterier.

Hovedmål KM486 og støttemål KM487 er kontrollert mot GEO01-02/KV49 hos Udir 6. november 2026 (Europe/Oslo). Ingen særkrav til Geofag 1, privatist eller nasjonal feltrapportordning er overført til Geografi Vg1. Lokale krav og ansvar avklares av læreren.

Alle steder og tall i temperaturtabellen er eksplisitt konstruerte øvingseksempler. Ingen faktisk måling, GPS-rute, elev, skole, intervju eller gjennomført feltarbeid er påstått. Det er ikke satt inn funn eller koordinater som kan forveksles med reelle data.

## Figurplasser for DesignBOT

Markørene er ubrukte Markdown-lenkedefinisjoner av formen `[figur-2-0]: # (FIGURPLASSHOLDER …)`. De er usynlige ved vanlig Markdown-rendering, uten HTML-kommentarer eller nye widgets. Renderingstesten kontrollerer dette. Teksten står på egne ben uten figurer og viser ikke til uferdige figurprodukter.

| Nummer | Plassering | Gjenstående leveranse |
|---|---|---|
| 2.0 | Etter læringsmål | Mønsterkart med illustrerende utvalgspunkter. Avklar kartgrunnlag og attribusjon før innsetting. |
| 2.1 | Fire steg som henger sammen | Egen statisk stegfigur med plan, innsamling, bearbeiding og presentasjon med vurdering. |
| 2.2 | En plan som kan brukes ute | Visuell eller interaktiv planleggingsmal. Teksttabell og nedlastbar CSV er levert; PDF kan komme senere. |
| 2.3 | Etter intervju og foto | Egen oversikt over observasjon, telling, måling, intervju, foto og posisjonsregistrering. |
| 2.4 | Feltlogg: sted, tid og metode | Vg1-tilpasset georeferert feltlogg. Tabell og tom CSV er levert. Eksisterende modell er ikke bygd inn uten tilpasning. |
| 2.5 | Etter feltloggmalen | Punktkart og eventuelt GPS-spor med kun nødvendige, ikke-private øvingsposisjoner. |
| 2.6 | Fra tabell til diagram og kart | Enkel framstilling fra de konstruerte øvingstallene. Originaltabellen er tekstalternativ. |
| 2.7 | Feilkilder, pålitelighet og gyldighet | Feilkilde, mulig virkning, konkret forbedring og begrensning for konklusjonen. |
| 2.8 | Sikkerhet og etikk | Egen oppsummeringsboks. Tekst og tabell er levert, og ingen ekstern illustrasjon er nødvendig. |
| 2.9 | Mikroklima-casen | Egen skisse med A og B samt graf. Alle tall må fortsatt merkes som konstruerte. |

Alle ti nummererte figurleveranser er beholdt som plassholdere. Ingen eksterne bilder eller kartfliser er hentet inn i denne PR-en, og det er ikke påstått at rettighetene til en framtidig konkret figurfil er klarert.

### Avklaring for Mats og DesignBOT: figur 2.4

Planen foreslår gjenbruk av `FieldworkObservationModel`. Modellen har geologiske feltstasjoner, ferdige eksempeltall og UTM-koordinater, og en numerisk risikomatrise som blant annet kan gi teksten «Lav risiko (Grønn) - Kan gjennomføres med standard rutiner». Den er derfor ikke bygd inn uendret i denne Vg1-teksten.

RGS' nåværende veiledning fraråder å la en numerisk risikoakseptskår erstatte faglig vurdering av nødvendige tiltak. Kapitlet gir ikke elevene en automatisk grønn sikkerhetsgodkjenning. Avklar om figur 2.4 skal bli en egen enkel Vg1-modell eller en forsvarlig tilpasning av den eksisterende, uten å endre Geofag 1-visningen utilsiktet. Dette er et avgrenset senere designarbeid, ikke en blokkering for lesing av fagteksten.

## Kildekontroll

Alle 17 elevkilder er åpnet med WebFetch 6. november 2026 (Europe/Oslo). Publiseringsdato er brukt der den framgår; u.å. og hentedato brukes ellers. RGS har fire oppføringer merket a–d i alfabetisk tittelrekkefølge. Alle brukes i løpende henvisninger. KILDER-listen leveres av eksisterende `Kildeliste` fra `kilder-geografi.ts`, ikke som en duplikat i Markdown. Biblioteket og Terra Nova står ikke i elevkildelisten.

| Fagstoff | Kontrollert kilde |
|---|---|
| Kompetansemål, refleksjon og varierte arbeidsmåter | Utdanningsdirektoratet: Geografi GEO01-02, KV49. |
| Feltarbeid som datainnsamling | Johannessen og Grønmo: Feltarbeid, SNL, 2026. |
| Kvantitative data, struktur og sammenliknbarhet | Grønmo: Kvantitativ metode, SNL, 2024. |
| Beskrivelser, intervjuer, kategorisering og kombinasjon av metoder | Grønmo: Kvalitativ metode, SNL, 2025. |
| Hypotese og prøving mot observasjoner | Tranøy: Hypotese, SNL, 2025. |
| Pålitelighet, gjentakelse og målefeil | Svartdal: Reliabilitet, SNL, 2025. |
| Relevans og grunnlag for slutninger | Grønmo, Dahlum og Svartdal: Validitet, SNL. |
| Utvalg, systematisk og tilfeldig registrering, inndeling i grupper | RGS: Sampling techniques. Ingen garanti om representativitet eller signifikans er kopiert. |
| Forberedelse, utstyr og arbeidssted | RGS: Preparation checklist. Ingen britiske lovkrav eller administrative ordninger presenteres som norske. |
| Sikkerhet, tiltak, ansvar og endrede forhold | RGS: Risk management for school visits. Ikke numerisk grønn sikkerhetsgodkjenning. |
| Lokale skoleundersøkelser, temperatur og enkel bearbeiding | RGS: Ideas for on-site school fieldwork. De konkrete skoleeksemplene er våre forslag. |
| Foto, gjenkjenning og samtykke i skolen | Datatilsynet: Sett deg inn i reglene, 2020. |
| Respekt, frivillighet, dokumentasjon og redelighet | FEK: Generelle forskningsetiske retningslinjer, publisert 2019. Prinsipper brukes pedagogisk, ikke som påstand om at alt skolearbeid er forskning juridisk. |
| Stedfesting og koordinatsystem | Kartverket: Kva er eit kart?, 2023. |
| Satellittposisjon og forhold som påvirker måleresultatet | Kartverket: Få veiledning om CPOS, oppdatert 24. september 2026. Ingen tallfestet nøyaktighet for mobiltelefon er påstått. |
| Kartlag og praktiske kartfunksjoner | NIBIO: Brukerveiledning Kilden. Ingen opplasting av persondata er nødvendig i opplegget. |
| Lufttemperatur, strålingsskjerming, plassering og variasjon | Pedersen: Slik måles temperaturen, Yr, 2012. Historiske rekorder og eldre stasjonsstatistikk er ikke brukt. |

GPS.gov-siden GPS Accuracy kunne ikke åpnes pålitelig: WebFetch fikk tidsavbrudd og offentlig curl fikk 403. Den er ikke brukt eller ført i elevkildelisten. Ingen tilgangsbegrensning er omgått.

## Avgrensning og integrasjon

- Branch `geografi-kap2` er opprettet fra `origin/geografi-kap1`, commit `d0daff660848a7705a8e3e2f35005209e9b67035`. PR-base skal være `geografi-kap1`, som utkast.
- Ingen main-push, merge, force-push, deploy, CloudAgent, DNS- eller Cloudflare-konfigurasjonsendring.
- `tekstKlar: true` aktiveres bare for kapittel 2 i tillegg til kapittel 1. Det fjerner utdaterte skjelettmeldinger og dobbel målvisning, men påstår ikke at figurarbeidet er ferdig.
- Reseed `geo-feltarbeid-kap2-2026-11-06` er lagt inn i eksisterende `COPY_RESEEDS_B`, som allerede inngår i `COPY_RESEEDS`. Ingen reseed er kjørt i drift.
- Nedlastinger: `public/downloads/geografi-feltarbeid-plan.csv` og `public/downloads/geografi-feltarbeid-feltlogg.csv`. UTF-8 med BOM og semikolon. Begge er blanke arbeidsmaler, uten private opplysninger eller eksempelkoordinater.
- Figur 2.4 krever designavklaringen ovenfor. Kartbakgrunn og attribusjon må avklares for konkrete framtidige kart. Ingen øvrig faglig avklaring blokkerer tekstleveransen.

## Sluttkontroll

- Ordtelling: 4 943 ordsekvenser i elevfilen, inkludert mål, tabeller, oppgaver og kildehenvisninger, men uten skjulte figurmarkører. Bokstav-/tallsekvenser med interne bindestreker eller apostrofer telles som ord.
- Geografi-, reseed- og post-seed-tester: 39 av 39 grønne, inkludert seks nye tester for kapittel 2. Rendering, kilder, tomme nedlastingsmaler og reseed er med.
- `npm run typecheck`: grønn.
- ESLint på fire berørte TypeScript-filer: grønn.
- Produksjonsbuild med `env -u DATABASE_URL npm run build`: grønn. Ekstern databasemigrering er ikke kjørt. Eksisterende CSS-/chunk-/Nitro-varsler gjenstår.
- Full `npm test`: skriptleddet har 188 bestått, 17 feil og 1 hoppet over. Feilnavn er identiske med isolert baseline fra kapittel 1-kontrollen. Ingen skript eller templatefiler er endret her.
- Hele TypeScript-testleddet separat: 199 bestått og 5 feil. De samme fem feilene finnes i kapittel 1-loggen: chapter-scan/Vulkaner, tre poster-markdown-tester og pakke-b/isbre. Seks nye tester består, og ingen nye feil er kommet til.
- `git diff --check` og tegnkontroll av de to Markdown-filene: grønne.
