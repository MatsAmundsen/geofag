# Redaksjonell overlevering: kapittel 9

Oppdatert figurstatus står i `geografi-kap9-mats-valg.md` (Mats sine valg) og `geografi-kap9-skjulte.md` (de skjulte figurene). Resten av dette notatet dokumenterer første leveranse, og figurtabellene under kan derfor være utdatert.

## Leveranse og arbeidsgren

Kapittel: **Næringsliv og globalisering**. Rute: `/geografi/naering`. CMS-slug: `geo-naering`.

Arbeidsgren: `geografi-kap9`, opprettet fra `origin/geografi-kap7`, commit `2506f8bd964ad999e21c568292392dbb57681d1d`. Dette er én kapittelleveranse over utkast-PR #305. Ingen andre kapitler er skrevet eller omskrevet her. Kapittel 10 og 11 er fortsatt skjeletter. Ingen push, PR-oppretting, merge, CloudAgent, utrulling eller infrastrukturendring er utført.

Fagteksten har **5665 ord**, inkludert overskrifter, oppgaver, begreper og quiz, men uten widgetkoder, skjulte figurmarkører, lenkemål og markdownsymboler. Ordtelling bruker ord- og tallsekvenser med eventuelle interne bindestreker. Historieåpningen har **202 ord**. Brødavsnittene har normalt fem setninger; korte læringsmålhenvisninger og refleksjonsspørsmål regnes ikke som brødavsnitt. Gjennomsnittlig setningslengde ligger rundt 14 ord etter at parenteshenvisninger er fjernet.

Sju underkapitler er skrevet:

1. Næringsstruktur.
2. Lokalisering.
3. Ringvirkninger.
4. Globalisering.
5. Internasjonal arbeidsdeling.
6. Verdikjeder.
7. Forbruk og ansvar.

Kompetansemål står først. KM485 er hovedmål; KM481 og KM484 er avgrensede støttemål. Avslutningen har åtte oppsummeringspunkter, planens tolv begreper og tre støttebegreper, 15 spørsmål, seks refleksjonsspørsmål, seks a–b–c-oppgaver og tre quizformater med begrunnelser. Utkontraktering står før engelsk outsourcing. Åpningen følger dokumentert Rjukan-historie, ikke en oppdiktet øyenvitneskildring.

## Ekte data i figur 9.2

Mats sitt valg av kontrollerte data er fulgt. Ingen syntetisk næringsserie, oppdiktet multiplikator eller antatt fordeling av en telefons fortjeneste er laget.

Datakilde: **SSB Statistikkbanken 09174**, variabel **Sysselsatte**, med betegnelsen «Sysselsatte personer. Lønnstakere og selvstendige (1000 personer)». Dette er nasjonalregnskapets serie for Norge, totalt for næringer, ikke bare Fastlands-Norge og ikke AKU. API-uttaket ble kontrollert 6. november 2026. Versjonsdatoen er **28. mai 2026**. Kilden sier at år etter basisåret 2023 er foreløpige; derfor brukes utvalgte år **1970, 1980, 1990, 2000, 2010, 2020 og 2023**. Serien er ikke en påstand om situasjonen i 2026, og nasjonalregnskap kan revideres senere.

- Kildens tabellside: https://www.ssb.no/statbank/table/09174
- Verifisert offentlig metadata- og dataendepunkt: https://data.ssb.no/api/v0/no/table/09174
- Den ordinære tabellsiden er klientrendret. Faktiske variabler, verdier, enheter og foreløpighetsnote er kontrollert i API-svaret, ikke bare på en tom HTML-side.
- Den eksakte lesespørringen ligger i `docs/geografi-kap9-ssb09174-query.json`. POST brukes kun til offentlig statistikklesing.
- De **49 originale tallene** ligger i `src/lib/geografi-naeringsdata.ts` og i `public/downloads/geografi-naering-ssb09174.csv`, uten SSB-kontaktpersonmetadata.
- SHA-256 for nedlastet originalrespons: `13f3d229210e021b4f818ff25955dcad654192c5a758d2580c80ce7335eaa3ad`.
- SHA-256 for versjonert CSV: `0533aaeee4ba374a5c620c01e5341ceb77c2dd5e906d3ac3a0f32e0ae5a8d35b`.

### Avgrensning og beregning

Primærnæring er SSBs `A38NP2X01_03`: jordbruk, skogbruk og fiske, med akvakultur inkludert. Sekundærnæring summerer fem ikke-overlappende grupper: `A38NP2X05_09` bergverk og oljeutvinning, `nr23ind` industri, `pub2X35` kraftforsyning, `pub2X36_39` vann/avløp/renovasjon og `pub2X41_43` bygg/anlegg. Totalen er `nr23_6`. Tertiærnæring beregnes som **total minus primær minus sekundær**. Den er tydelig merket som rest, ikke som en egen avlest SSB-rad. Presisjonen i originalverdiene beholdes ved summering i heltallstideler.

Andeler er egen beregning med samme års total som nevner. De vises med én desimal og kan summere til 99,9 eller 100,1. Hele arealet er hundre prosent. Årsavstandene er proporsjonale; rette linjer mellom de sju valgte årene er ikke observerte mellomår. Tilgjengelig tabell viser totalen, tre gruppers antall i tusen og tre prosentandeler.

| År | Totalt, tusen | Primær, tusen | Sekundær, tusen | Tertiær, tusen, rest |
| --- | --- | --- | --- | --- |
| 1970 | 1 622,5 | 212,9 | 498,3 | 911,3 |
| 1980 | 1 934,6 | 164,6 | 516,6 | 1 253,4 |
| 1990 | 2 046,3 | 128,4 | 445,0 | 1 472,9 |
| 2000 | 2 313,7 | 96,3 | 463,2 | 1 754,2 |
| 2010 | 2 555,3 | 65,7 | 502,0 | 1 987,6 |
| 2020 | 2 799,0 | 66,1 | 564,7 | 2 168,2 |
| 2023 | 2 973,3 | 68,3 | 593,5 | 2 311,5 |

Data er kreditert SSB med lenke og [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), kontrollert på https://www.ssb.no/diverse/lisens. Figuren oppgir at gruppering og prosentberegning er egen bearbeiding. Ingen ekstern bilde- eller kartfil er kopiert inn.

## Figurer og gjenstående arbeid

Fire enkle figurer er registrert gjennom eksisterende `Diagram`, `FigureFrame` og `ScrollFrame`. Det er ikke laget et nytt stort figur- eller kartbibliotek.

- **9.2:** Stablet arealdiagram med ekte SSB-data, direkte etiketter, forklarende tekst, nedlastbart kildeuttrekk og tilgjengelig tabell.
- **9.3:** Statisk spørsmålsmodell for lokalisering. Alle seks spørsmål er synlige uten klikk, og ingen poeng eller vekter antyder en beregnet fasit. Eventuell klikkpresentasjon er en senere designforbedring.
- **9.4:** Kvalitativ modell som skiller leverandørforbindelser, lønn/forbruk og eksterne belastninger. Ingen pil viser en beregnet mengde eller sikre netto arbeidsplasser.
- **9.5:** Skjematisk telefonmodell med materialer, komponenter, montering, bruk, mulig ombruk og mulig gjenvinning. Ingen landplassering, leverandørliste eller fortjenestefordeling er funnet på.

Fire skjulte kartmarkører gjenstår, der én gjelder en del av en allerede levert figur:

- **9.1:** Geografisk mønster i tjenesteyting. Konkret World Bank/ILO-indikator, år, definisjoner, manglende data og datasettlisens må kontrolleres før import.
- **9.5, stedsdelen:** Eventuelle punkter krever dokumentert produkt, leverandørledd og tidsrom. Generiske landnavn skal ikke presenteres som en bestemt telefons faktiske reiserute. Naturkartgrunnlag må kontrolleres separat.
- **9.6:** En varegruppes handelsstrømmer. Krever konkret UN Comtrade/WITS-nedlastingslisens, varekode, rapportør/partner, år, verdi/mengde, reeksport og skala.
- **9.7:** Rjukan-kart med dokumentert historisk sammenheng mellom kraft, industri og transport. Konkrete Kartverket-filer, koordinater, tidslag, lisens og tekstalternativ må kontrolleres.

Markørene er skjulte referansedefinisjoner. Ingen elevoppgave krever en uferdig figur. Ingen Geofag-rute, Geofag-post eller etablert Geofag-modell er endret; den delte widgetregistreringen har bare nye navn og én ny import.

## Faglige forbehold

- Næringsstrukturens tre grupper er eksplisitt avgrenset. Oljeutvinning inngår i sekundærnæringen her. Industri er ikke synonymt med alle sekundærnæringer, og offentlig tjenesteyting er med.
- Tjenesteyting var størst allerede i 1970 i den valgte serien. Figuren starter ikke i et jordbrukssamfunn. Sekundærnæringenes andel falt mens antallet økte mellom 1970 og 2023.
- SSBs anslag på **161 900 tilknyttede sysselsatte gjelder 2023**, omtalt i rapportnettsiden fra juni 2026. Det er et modellresultat, ikke en telling av sikre netto nye arbeidsplasser. Alternative markeder og utelatte inntektsvirkninger framgår uttrykkelig.
- Rjukan-casen bruker dokumentert historie, inkludert stans i kunstgjødselproduksjonen i 1991 og verdensarvstatus i 2015. Ingen dagsaktuelle sysselsettings- eller turismeeffekter tallfestes.
- Globalisering og tradisjonell/ny arbeidsdeling er ikke en rangering av land. Utkontraktering skilles fra flytting til utlandet og flernasjonalt eierskap.
- Telefonens råvarer omtales generelt etter UNEP, uten antatte opprinnelsesland eller påstand om identisk innhold i alle modeller. Tekstilbelastning er sted- og prosessavhengig. Ingen fast vannmengde brukes som fasit for alle T-skjorter.
- ILO-grunnlaget er en datert undersøkelse fra 2017. Leverandørenes vilkår og kjøpernes innkjøpspraksis undersøkes uten å anklage en bestemt nåværende fabrikk.
- Åpenhetsloven er avgrenset til omfattede virksomheter og menneskerettigheter/arbeidsforhold. Den gir ikke automatisk komplett leverandørliste, fabrikkadresse eller en full miljøvurdering. Elevoppgaven lager et utkast som ikke skal sendes.

Mats trenger ikke avgjøre en blokkerende faglig uklarhet. Før kartarbeidet må produktavgrensningen i 9.5 og varegruppen i 9.6 velges med DesignBOT. Kontroller nye hendelser og tall på nytt dersom de skal inn senere.

## Kilder kontrollert 6. november 2026

22 kilder er registrert i `kilder-geografi.ts`, med APA-henvisninger i tekst og figurer. Innhold, ikke bare HTTP-status, er kontrollert med WebFetch, offentlig HTTP-henting eller PDF-tekst. For SNL er navngitte forfattere og artikkeldatoer kontrollert i tekst eller offentlig HTML/metadata; fagansvarlig er ikke feilaktig brukt som artikkelforfatter.

- FNs miljøprogram [UNEP]. (2019, 29. januar). Is your phone really smart?. Brukt for materialer og livsløp, ikke som kilde til dagens avfallsmengder. https://www.unep.org/en/news-and-stories/story/your-phone-really-smart
- FNs miljøprogram [UNEP]. (2020). Sustainability and Circularity in the Textile Value Chain: Global Stocktaking. Publikasjonsomtale og sammendrag. https://wedocs.unep.org/entities/publication/2769638e-ab44-4d60-8236-b527328ade61
- FNs miljøprogram [UNEP]. (2023, 10. oktober). Sustainable Future of E-waste. Brukt for prosesser og tiltak, ikke dagens avfallsmengder. https://www.unep.org/ietc/news/story/sustainable-future-e-waste
- Forbrukertilsynet. (2026, 24. september). Send informasjonskrav. https://www.forbrukertilsynet.no/vi-jobber-med/apenhetsloven/send-informasjonskrav
- Grindheim, J. E. (2024, 26. november). Frihandel. I Store norske leksikon. https://snl.no/frihandel
- Isaksen, A. (2025, 27. august). Lokaliseringsteori. I Store norske leksikon. https://snl.no/lokaliseringsteori
- Klepp, I. G. (2026, 7. september). Bomull. I Store norske leksikon. https://snl.no/bomull
- Langseth, H., & Munthe, P. (2025, 30. april). Næringsliv. I Store norske leksikon. https://snl.no/n%C3%A6ringsliv
- Moe, K., & Thorsnæs, G. (2026, 2. mars). Rjukan. I Store norske leksikon. https://snl.no/Rjukan
- Munthe, P. (2025, 2. mai). Multinasjonalt selskap. I Store norske leksikon. Brukt for begreper og organisering, ikke eldre selskapsnavn eller statistikk. https://snl.no/multinasjonalt_selskap
- Onshuus, H. (2026, 15. mars). Arbeidsdeling. I Store norske leksikon. https://snl.no/arbeidsdeling
- Onshuus, H., & Idsø, J. (2025, 9. august). Eksterne virkninger (eksternaliteter). I Store norske leksikon. https://snl.no/eksterne_virkninger_-_eksternaliteter
- Rolstadås, A. (2024, 28. juni). Verdikjede. I Store norske leksikon. https://snl.no/verdikjede
- Seland, E. H. (2024, 3. desember). Globalisering. I Store norske leksikon. https://snl.no/globalisering
- Statistisk sentralbyrå [SSB]. (2026a, 28. mai). 09174: Lønn, sysselsetting og produktivitet, etter næring [Datasett]. Sysselsatte personer, lønnstakere og selvstendige; utvalgte år 1970–2023. Uttrekk 6. november 2026. https://www.ssb.no/statbank/table/09174
- Statistisk sentralbyrå [SSB]. (2026b, 5. juni). Ringvirkninger av petroleumsnæringen. Nettside med sammendrag av Rapporter 2026/19. https://www.ssb.no/nasjonalregnskap-og-konjunkturer/konjunkturer/artikler/ringvirkninger-av-petroleumsnaeringen
- Statistisk sentralbyrå [SSB]. (u.å.). Lisens. CC BY 4.0. Hentet 6. november 2026. https://www.ssb.no/diverse/lisens
- UNESCO. (u.å.). Rjukan-Notodden Industrial Heritage Site. Hentet 6. november 2026. https://whc.unesco.org/en/list/1486/
- Utdanningsdirektoratet [Udir]. (u.å.). Kompetansemål og vurdering: Geografi (GEO01-02). Hentet 6. november 2026. https://www.udir.no/lk20/geo01-02/kompetansemaal-og-vurdering/kv49
- Vaughan-Whitehead, D., & Pinedo Caro, L. (2017, juni). Purchasing practices and working conditions in global supply chains: Global Survey results. INWORK Issue Brief 10. International Labour Office. https://www.ilo.org/sites/default/files/wcmsp5/groups/public/@ed_protect/@protrav/@travail/documents/publication/wcms_556336.pdf
- Verdensbanken. (2020). World Development Report 2020: Trading for Development in the Age of Global Value Chains. Nettside med rapportens hovedbudskap. https://www.worldbank.org/en/publication/wdr2020
- Vikøren, B. M., & Pihl, R. (2025, 27. august). Outsourcing. I Store norske leksikon. https://snl.no/outsourcing

Verdensbankens kilde er rapportens åpne hovedbudskap, og UNEPs tekstilkilde er publikasjonsomtalen med sammendrag. Ingen av dem framstilles som en gjennomlesing av hele bakgrunnsrapporten. ILOs PDF er hentet og relevante metode-, innkjøps- og konklusjonsavsnitt kontrollert. Eldre UNEP- og SNL-tall eller selskapslister er ikke brukt som nåtidsstatistikk. Mislykkede leksikonadresser og en sperret UNEP-PDF er ikke lagt inn som om de var verifiserte fagkilder.

## Reseed og validering

`geo-naering-kap9-2026-11-06` er lagt i `COPY_RESEEDS_B`. Flagget kan overskrive CMS-redigert kapitteltekst ved første godkjente innlasting. Ingen slik produksjonsinnlasting er utført. Tidligere reseed-flagg er beholdt.

- Typecheck: bestått.
- ESLint på alle berørte TypeScript-/TSX-filer: bestått uten feil eller advarsler.
- Relevante geografi-, seed- og reseed-tester: **94 av 94 bestått**.
- SSR: fire figurer bestått. Alle tabellverdier, sju år, åtte kolonner, tre arealer og gyldige diagramkoordinater er kontrollert. Dette er ikke en nettleser-, interaksjons-, skjermleser- eller full WCAG-kontroll.
- Build: bestått uten `DATABASE_URL`. Loggen bekrefter at ekstern migrering hoppes over. Ingen deploy. Kjente CSS-/chunkstørrelsesadvarsler gjenstår.
- Full JavaScript-del: 206 tester, 188 bestått, 17 kjente feil og én hoppet over. Full TypeScript-del: 259 tester, 254 bestått og fem kjente `poster-markdown`-feil.
- Feilnavnene er maskinelt sammenliknet med kapittel 7-baselinen og er identiske. Ingen nye fullsuitefeil.
- `git diff --check` og kontroll av forbudte markdowntegn: bestått.

Logger og kontrollresultater ligger utenfor repoet under `/workspace/geografi-kap9-*.log`, `/workspace/geografi-kap9-validering.json` og `/workspace/geografi-kap9-ord.json`. Cache og rånedlastinger legges ikke i committen; bare det avgrensede, lisensierte CSV-uttrekket og den reproduserbare spørringen inngår.

## Forslag til PR

Tittel: `Geografi: kapittel 9 – næringsliv og globalisering`

Base: `geografi-kap7`. Hode: `geografi-kap9`. Opprett som utkast etter oppdragsgivers push.

PR-tekst:

Skriver kapittel 9 alene med sju underkapitler, dokumentert Rjukan-case, telefon- og tekstilkjeder, oppsummering, 15 begreper og differensierte oppgaver. Registrerer 22 kontrollerte kilder, tekststatus og eget reseed.

Figur 9.2 bruker ekte SSB-data fra tabell 09174, med 49 kontrollerte kildeverdier, tydelig gruppering, tilgjengelig tabell, CSV-uttrekk, reproduserbar spørring og CC BY 4.0. Tre andre figurer er kvalitative modeller uten oppdiktede tall eller leverandørland. Tre hele kartfigurer og stedsdelen av telefonfiguren gjenstår som skjulte markører.

Typecheck, berørt ESLint, 94 relevante tester, figur-SSR og build er grønne. Fullsuite har bare de samme 17 JavaScript-feilene og fem poster-markdown-feilene som basen. Ingen Geofag-side eller eksisterende Geofag-modell er endret. Reseed overskriver eventuell CMS-tekst først ved godkjent aktivering. Se `docs/geografi-kap9-redaksjon.md` for datagrunnlag og faglige avgrensninger.
