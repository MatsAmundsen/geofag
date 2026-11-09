# Geografi kapittel 6 – redaksjonell overlevering, PR D

Oppdatert figurstatus står i `geografi-kap6-mats-valg.md` (Mats sine valg) og `geografi-kap6-skjulte.md` (de skjulte figurene). Resten av dette notatet dokumenterer første leveranse, og figurtabellene under kan derfor være utdatert.

Skrevet 6. november 2026. Branch `geografi-kap6`, stablet på `origin/geografi-kap2` (8fa1599). Kun lokal commit; forelder håndterer push og utkast-PR med base `geografi-kap2`. Ingen deploy eller produksjonsendring er utført.

## Leveransen

5 685 ord i elevteksten, inkludert mål, oppgaver og quiz, men uten skjulte markører, widget-bildetekster og kildeliste. Fagtekst i `geo-naturfare.md`, alle åtte planlagte underkapitler, kompetansemål KM483/KM482/KM487, historieåpning, fem læringsmål, Gjerdrum-case og datert internasjonal case, oppsummering, begrepstabell, tre oppgavenivåer og quiz. Kapitlets eksisterende sidekomponent viser KILDER fra `kilder-geografi.ts`. `tekstKlar` skjuler stubbelementene. Engangsflagg `geo-naturfare-kap6-2026-11-06` er registrert i COPY_RESEEDS_B, som inngår i COPY_RESEEDS.

## Faglige presiseringer til planen

- Risiko er ikke framstilt som en universell tallformel «fare ganger sårbarhet». UNDRR inkluderer eksponering og håndteringsevne; teksten gir en kvalitativ årsakskjede uten oppdiktede risikotall.
- Katastrofe betyr alvorlig samfunnsforstyrrelse, ikke enhver naturhendelse som treffer en verdi. Økonomisk ulikhet omtales nyansert, uten å gjøre lav inntekt til en universell forklaring.
- Naturfare og teknologiske miljøfarer kan virke sammen. Dambrudd gis ingen udokumentert felles årsaksforklaring eller skyldplassering.
- Gjerdrum bygger på utvalgets rapport, sammendrag side 8–12. Vær, erosjon, grunnforhold og menneskelig påvirkning skilles. Rapporten brukes ikke til å avgjøre juridisk skyld eller bevise hendelsesbestemt klimaattribusjon.
- Aktuell internasjonal case: Budhi Gandaki i Nepal, 11. oktober 2026, basert på WMOs melding 12. oktober. Brudd på midlertidig skredoppdemming er uttrykkelig foreløpig forklaring. Andre hendelser i samme WMO-artikkel blandes ikke inn i oktoberhendelsens årsaker. Mats/lærer bør kontrollere oppfølging ved årlig revisjon.
- Ingen skoleoppgave ber elevene besøke et fareområde eller foreta sikkerhetsvurdering av en tomt.

## Figurer: gjenbruk, tilpasning og gjenstående arbeid

| Nummer | Status og komponent | Avgrensning eller videre arbeid |
|---|---|---|
| 6.1 | Skjult plassholder; lenke til USGS-kilde i brødtekst | Globalt jordskjelv-/plategrensekart må produseres med tegnforklaring, periode og kreditering. USGS-bildet er ikke importert. |
| 6.2 | Skjult plassholder; teksten fungerer selvstendig | To samfunn med lik fare og ulik eksponering/sårbarhet. Ingen oppdiktet risikokalkulator. |
| 6.3 | `VolcanicHazardsDiagram geografi`, fem enklere kort | Lava, pyroklastisk strøm, aske, lahar, gass. Gamle G1-kort med historiske tall brukes ikke i Vg1; G1-standardvisningen beholdes. |
| 6.4 | `SkredSonerDiagram` med egen Vg1-bildetekst | Gjenbrukt SVG; ikke et lokalt faresonekart. |
| 6.5 | `FjellskredBolgeDiagram`, Vg1-bildetekst | Eksisterende avrundede 60 m forklares mot NVEs maksimum 61 m rundt fjorden i 1934, ikke lik høyde i bygdene. Ingen prognose eller lokatorkart. |
| 6.6 | `KvikkleireDiagram` med fire statiske trinn og Vg1-bildetekst | Neste-steg-kontroll og Gjerdrum-lokatorkart gjenstår, med egen skjult tilleggsmarkør. Skissen er ikke et terrengkart over Gjerdrum. |
| 6.7 | `HydrogramFigur`, eget tittel-/kildesett | Bevisst erstatning for planens `HydrographCatchmentModel`: den sistnevnte viser returperiodeklasser uten nødvendig dokumentert hydrologisk kalibrering. Gjenbrukt enklere modell viser kvalitative kurver uten måledata, flomberegning eller returperioder. |
| 6.8 | `GeografiOrkanSnittFigur`, klonet Vg1-definisjon | Samme tegning og kontroller, enklere ord, ingen hard temperatur-/dybdeterskel; original G2-definisjon beholdes. |
| 6.9 | `GeografiStormfloFigur`, klonet Vg1-definisjon | Skiller værbidrag fra tidevann og bølger. G2s Ekman-kartbryter vises ikke i Vg1; original beholdes. |
| 6.10 | Skjult plassholder; NVE-kartoppgave kan brukes nå | Kommune, offisielle farelag, dato, tegnforklaring og lisens/kreditering må velges. Farelag med ulike definisjoner skal ikke gis en uriktig felles sannsynlighetsskala. |

Tre hele figurer og ett tillegg gjenstår. Plassholderne er ubrukte Markdown-lenkedefinisjoner og vises ikke til elever. Elevene henvises bare til figurer som faktisk finnes. Kart og store nye komponenter er ikke bygd som del av tekstleveransen.

## Kilder og kontroll

31 eksterne kildeoppføringer, alle åpnet og kontrollert 6. november 2026 med WebFetch eller offentlig curl/urllib. Seks NVE-sider ble også lagret som tekst i `/workspace/geografi-kap6-kilder/` for kontroll. Gjerdrum-PDF ble hentet og lest via poppler; filen ligger utenfor repoet. Ingen boktekst eller bibliotektekst er kopiert eller lagt i elevkildene.

Kildegrupper: Udir; UNDRR (seks definisjoner, 2017a–f); NVE (2024a–b, 2025a–b, 2026, u.å.); Varsom (u.å.-a–b); Gjerdrumutvalget (2021); USGS (2019, 2026, u.å.-a–c); Newhall med flere (1997); Bjerknessenteret; Met Office (2025); Meteorologisk institutt (2023, 2025); Gjelten med flere (2024); IPCC (2023); UNEP (2021); DSB; WMO (2026).

Alle URL-er og fullstendige oppføringer ligger i kapitlets liste i `src/lib/kilder-geografi.ts`. Udir-koder og mål står i innledningen. År uten dato brukes der kildesiden ikke oppgir en etterprøvbar publiserings-/oppdateringsdato. Hendelsesmeldinger er daterte øyeblikksbilder, ikke operative varsler.

## Til vurdering hos Mats

Ingen faglige spørsmål blokkerer teksten. Mats bør godkjenne at den kvalitative `HydrogramFigur` erstatter den planlagte modellen med udokumenterte returperiodeetiketter, og at 6.6 foreløpig leveres som statisk firetrinnsfigur. DesignBOT må ferdigstille kartene/risikofiguren og velge kommune for 6.10. Nepal-casen bør vedlikeholdes årlig og oppdateres hvis årsaksutredningen endres.

## Validering

Typecheck og eslint på alle berørte TypeScript/TSX-filer er grønne. 44 av 44 relevante tester består. Parserintegrasjon bekrefter sju faktiske widget-gjerder, og serverrendering med repoets Vite bekrefter at alle sju Vg1-figurer rendres og at standardvisningene er beholdt. Server-smokeloggen er `/workspace/geografi-kap6-figursmoke.log`.

Hele npm-teststeget har 188 beståtte, 17 kjente feil og én utelatt test. TypeScript-steget separat har 204 beståtte og fem kjente feil. Feilnavnene er maskinelt sammenliknet med kapittel 2-loggene og er identiske: ingen nye feil. Dette inkluderer kjente template/app-env-/branding-/migrasjonsfeil, Vulkaner/chapter-scan/poster-markdown og isbre/postermal. Disse er ikke endret i leveransen.

Produksjonsbuild er grønn. Ingen ekstern databasemigrering ble utført; DATABASE_URL var fjernet fra build-miljøet. Se sluttrapport for commit. Logger: `/workspace/geografi-kap6-typecheck.log`, `geografi-kap6-eslint.log`, `geografi-kap6-relevante-tester.log`, `geografi-kap6-build.log`, `geografi-kap6-full-tests.log` og `geografi-kap6-lib-tests.log`. Build kjøres uten DATABASE_URL, slik at ingen ekstern databasemigrering utføres. Kjente tidligere feil i den komplette testpakken behandles separat fra de grønne relevante testene.
