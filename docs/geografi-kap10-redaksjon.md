# Redaksjonell overlevering: kapittel 10

Oppdatert figurstatus står i `geografi-kap10-mats-valg.md` (Mats sine valg). Resten av dette notatet dokumenterer første leveranse, og figurtabellene under kan derfor være utdatert.

## Leveranse og arbeidsgren

Kapittel: **Befolkning og levekår**. Rute: `/geografi/befolkning`. CMS-slug: `geo-befolkning`.

Arbeidsgren: `geografi-kap10`, opprettet fra `origin/geografi-kap9`, commit `901e7a88f6b173de2599c54f52791841db261c13`. Dette er én kapittelleveranse over utkast-PR #306. Bare kapittel 10 er skrevet; kapittel 11 er fortsatt skjelett. Arbeidet er utført på boksen etter Mats' uttrykkelige unntak fra CloudAgent-regelen. Ingen push, PR-oppretting, merge, CloudAgent, deploy eller infrastrukturendring er utført.

Fagteksten har **5781 ord**, inkludert overskrifter, henvisninger, begreper og oppgaver, men uten widgetkoder, skjulte figurmarkører, lenkemål og markdownsymboler. Historieåpningen har **201 ord**.

Kompetansemålet KM484 står først, med KM485 som avgrenset støtte. Historieåpningen sammenlikner daterte estimater for Japan og Niger; den inneholder ingen oppdiktede personer eller øyenvitneskildringer. Brødavsnittene har normalt fem setninger. Avslutningen har åtte oppsummeringspunkter, planens tretten begreper og fem støttebegreper, 15 spørsmål, seks refleksjonsspørsmål, seks a–b–c-oppgaver og tre quizformater med begrunnet fasit. Nærmiljøoppgaven samler ikke personopplysninger eller antatte aldre på forbipasserende.

Åtte underkapitler:

1. Befolkningsvekst.
2. Demografiske mål.
3. Fruktbarhet og dødelighet.
4. Befolkningspyramider.
5. Demografisk overgang.
6. Befolkningsteorier.
7. Levekår i verden.
8. Befolkning i Norge.

## Kontrollerte data, ikke konstruerte øvingsserier

Alle nedlastinger er kontrollert **6. november 2026**. Historiske estimater, registrerte tall og framskrivinger er tydelig skilt. Figurene er egne SVG-framstillinger med det eksisterende `Diagram`/`FigureFrame`/`ScrollFrame`-oppsettet. Ingen eksterne bilder, kartfiler eller nytt visualiseringsbibliotek er kopiert inn. Ingen figur trenger et levende API-kall i elevens nettleser.

### Registrert Norge, SSB 07459

- Kilde: https://www.ssb.no/statbank/table/07459
- Verifisert metadata og data: https://data.ssb.no/api/v0/no/table/07459
- Versjonsdato: **25. februar 2026**.
- Hele landet, region `0`; menn `1`, kvinner `2`; ettårig alder `000` til `105+`.
- Referansetid: **1. januar** 1986, 2006 og 2026. Det er ikke årsgjennomsnitt eller folketall ved utgangen av det samme året.
- Alle **636 originale tall** er beholdt i datamodulen og CSV-filen. Ingen dobbelttelling av regionale eller kjønnsmessige totaler.

### Norge 2050, SSB 14740

- Kilde: https://www.ssb.no/statbank/table/14740
- Verifisert metadata og data: https://data.ssb.no/api/v0/no/table/14740
- Versjonsdato: **12. juni 2026**. Dette er den nasjonale framskrivingen fra 2026, ikke regionaltabell 14288 fra 2024.
- Hele befolkningen: `InnvandrLandbakgr = 00`. Begge kjønn hver for seg, ettårig alder, år 2050 og hovedalternativ **MMM**.
- MMM betyr middels fruktbarhet, middels levealder og middels innvandring, i denne rekkefølgen. Det brukes tre bokstaver i dette nasjonale uttaket, ikke eldre regionalbetegnelser med fire bokstaver.
- Alle **212 originale tall** er beholdt. Summen er **6 214 071**, som også stemmer med SSBs publiserte hovedalternativ.
- Alderspyramiden er et **scenario**, ikke observert framtid og ikke et sannsynlighetsintervall.

Ettårstallene summeres til seksten femårsgrupper fra 0–4 til 75–79, og én åpen gruppe **80+**. Den siste gruppen summerer 80 til 105+, og kan ikke tolkes som ett femårskull. Prosentandeler bruker hele befolkningen, begge kjønn samlet, som nevner på begge sider. Alle seks norske og internasjonale pyramider bruker samme skala: 0–10 prosent på hver side. Prosenter viser struktur, ikke landenes totale antall mennesker.

| År | Status | Total | Antall 65+ | Andel 65+, prosent | 65+ per 100 personer 15–64 |
| --- | --- | --- | --- | --- | --- |
| 1986 | Registrert | 4 159 187 | 659 716 | 15,9 | 24,7 |
| 2006 | Registrert | 4 640 219 | 682 469 | 14,7 | 22,4 |
| 2026 | Registrert | 5 627 400 | 1 083 060 | 19,2 | 29,7 |
| 2050 | Framskrevet, MMM 2026 | 6 214 071 | 1 567 190 | 25,2 | 42,1 |

Eldreandelen er ikke monotont stigende mellom de valgte historiske årene. Figuren og teksten sier dette uttrykkelig. Eldrevarianten av «forsørgerbyrde» bruker **65+ / 15–64 × 100**, og er ikke samlet forsørgerbyrde med barn i telleren. Den er heller ikke en telling av skattebetalere eller omsorgsmottakere.

### Norsk SFT, SSB 04232

- Kilde: https://www.ssb.no/statbank/table/04232
- Versjonsdato: **12. mars 2026**.
- Hele landet, variabel `SamlFruktbarhets`, kvinner.
- Utvalgte år: 1970, 1980, 1990, 2000, 2010, 2020, 2023, 2024 og 2025.
- Originale verdier: **2,50; 1,72; 1,93; 1,85; 1,95; 1,48; 1,40; 1,44; 1,48** barn per kvinne.

SFT beskrives som et periodemål for fruktbarhetsmønsteret i alderen 15–49 år, ikke som ferdig barnetall for en virkelig generasjon. Reproduksjonsnivå rundt 2,1 omtales med vilkår, ikke som en universell terskel som umiddelbart stabiliserer folketallet.

### Grunnformel og registeravvik, SSB 05803

- Kilde: https://www.ssb.no/statbank/table/05803
- Versjonsdato: **15. april 2026**.
- Folketall 1. januar 2025: **5 594 340**. Folketall 1. januar 2026: **5 627 400**.
- Registrerte strømmer i **2025**: fødte **55 401**, døde **45 040**, innflyttinger **55 243**, utflyttinger **32 919**.
- Naturlig tilvekst: **10 361**. Nettoinnflytting: **22 324**. Fireleddsformelens sum: **32 685**.
- Registrert folketilvekst: **33 060**. Beregnet differanse: **375**.

Avviket vises separat i tekst, figur, tabell og oppgave. Vi fastslår ikke årsaken til hver enkelt registerretting og endrer ingen kildeverdier for å få falsk likhet. Faktiske registre må skilles fra en ideelt konsistent grunnformel.

Middelfolkemengden tilnærmes med gjennomsnittet av de to 1. januar-tallene: **5 610 870**. Fødselsrate blir omtrent **9,87 promille**, dødsrate **8,03 promille** og netto migrasjonsrate **3,98 promille**. Nevner og tilnærming er oppgitt. Manglende strømverdier for 2026 i API-responsen er ikke gjort om til null eller brukt som et helt års observasjoner.

### Japan og Niger, Verdensbanken WDI

- Kilde: https://data.worldbank.org/indicator/SP.POP.0004.MA.5Y
- Datasettversjon: **8. oktober 2026**.
- Felles referanseår: **2023**, midtårsestimater. Valget sikrer ett felles og fullstendig sammenlikningsår, ikke at hvert tall er det nyeste tilgjengelige.
- Landkodene `JPN` og `NER`.
- 34 aldersindikatorer per land: `SP.POP.0004.MA.5Y` og `.FE.5Y` til `SP.POP.7579.MA.5Y` og `.FE.5Y`, samt `SP.POP.80UP.MA.5Y` og `.FE.5Y`.
- Kjønnsandeler: `SP.POP.TOTL.MA.ZS` og `SP.POP.TOTL.FE.ZS`.
- Fire støtteindikatorer: `SP.DYN.TFRT.IN`, `SP.DYN.LE00.IN`, `SP.POP.0014.TO.ZS` og `SP.POP.65UP.TO.ZS`.
- Totalt **80 originale landverdier**, ingen manglende verdier.

De originale femårsandelene har **hvert kjønn som nevner**, ikke hele befolkningen. De omregnes derfor slik: **aldersandel innen kjønn × kjønnets andel av totalbefolkningen / 100**. Ingen rå prosentverdi presenteres feilaktig som andel av alle innbyggere. Sum over alle grupper og begge kjønn blir 100 prosent. For Japan avviker summert 65+-andel fra den separate WDI-indikatoren med omtrent **0,000000012 prosentpoeng**; testen bruker toleranse 0,0000001 prosentpoeng, ikke avrunding av en reell forskjell.

| Indikator, 2023 | Japan | Niger |
| --- | --- | --- |
| Andel under 15 år, prosent | 11,6 | 47,0 |
| Andel 65+, prosent | 29,6 | 2,6 |
| SFT, barn per kvinne | 1,20 | 6,06 |
| Forventet levealder, år | 84,0 | 61,2 |

Indikatormetadataene er kontrollert separat. Aldersfordelingen har FN World Population Prospects som hovedkilde. Kjønnsandelene oppgir også World Bank-beregninger med henvisning til WPP 2022, mens SFT og levealder har flere originalkilder. Vi omtaler derfor uttaket som **Verdensbanken WDI**, ikke som om samtlige indikatorer er ett rent WPP-2024-uttak med identisk metode. Dataene er estimater, ikke påståtte folketellinger i 2023.

### Verdensbefolkning, Our World in Data

- Kilde: https://ourworldindata.org/grapher/population
- Datakilder: HYDE (2023), Gapminder (2022), FN WPP (2024), med omfattende bearbeiding av Our World in Data.
- Seriens versjonsdato: **15. juli 2024**. Historiske estimater, ikke framskrivinger.
- Verdensradene for 1750, 1800, 1850, 1900, 1950, 2000 og 2023 er valgt ut.
- Originale personverdier: **753 279 296; 983 104 755; 1 275 602 897; 1 627 273 655; 2 493 092 852; 6 171 702 992; 8 091 734 933**.

Årsavstandene er proporsjonale. Rette linjer mellom utvalgte punkt er ikke målinger av hvert mellomår. Eldre estimater og skift mellom kildegrunnlag er omtalt. Sluttåret heter **2023**, ikke «i dag».

## Reproduksjon, filer og lisenser

- `src/lib/geografi-befolkningsdata.ts`: originale utvalgte tall, kildeversjoner, SHA-256 for råresponser og rene beregningsfunksjoner.
- `docs/geografi-kap10-ssb07459-query.json`, `-ssb14740-query.json`, `-ssb04232-query.json` og `-ssb05803-query.json`: eksakte offentlige lesespørringer. Send JSON med POST til `https://data.ssb.no/api/v0/no/table/` fulgt av tabellnummeret; dette leser statistikk og skriver ikke til SSB.
- `docs/geografi-kap10-eksterne-data.json`: eksakt World Bank GET-adresse, OWID CSV- og metadataadresser, utvalg og kildehashverdier.
- `public/downloads/geografi-befolkning-ssb.csv`: **848** originale ettårstall, tabell/år/kjønn/alder/personer.
- `public/downloads/geografi-befolkning-worldbank.csv`: **80** originale indikatorverdier, landkode/år/indikator/verdi.
- `public/downloads/geografi-befolkning-serier.csv`: **23** originalverdier for verden, norsk SFT og norsk befolkningsendring.

SSB-statistikk er kreditert med navn, tabell, egen bearbeiding og [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), kontrollert på https://www.ssb.no/diverse/lisens. WDI-indikatorens metadataglossar oppgir CC BY 4.0; Verdensbankens offentlige lisensside er også kontrollert. OWID-serien er merket med omfattende egen bearbeiding. OWIDs FAQ tillater slik egenprodusert/bearbeidet data under CC BY og krever at både OWID og underliggende dataleverandører krediteres. Alle tre originalkilder er navngitt i figuren og kilderegisteret. Ingen Grapher-kode, logo, bilde eller OWID-figur er kopiert; framstillingen er egen.

Bare avgrensede talluttrekk og lesespørringer er versjonert. SSBs kontaktpersonmetadata, rå HTML, nedlastingscache og råresponser ligger utenfor repoet under `/workspace/geografi-kap10-kilder/`. Nye uttak kan avvike ved senere kilderevisjon; dette er et datert snapshot, ikke en garanti om identisk framtidig API-respons.

## Figurer og gjenstående arbeid

Seks figurposisjoner er levert:

- **10.2:** Verdensbefolkning, ekte historiske estimater, tilgjengelig tabell og CSV.
- **10.3:** Grunnformelen med ekte 2025-tall, rater og eksplisitt registeravvik.
- **10.4:** Fire Norge-pyramider, registrert 1986/2006/2026 og framskrevet 2050 MMM 2026, med felles akser og tabeller.
- **10.5:** Egen kvalitativ faseframstilling etter Tønnessen (2024). Ingen oppdiktede ratekurver. Mulig fase 5 er tydelig usikker. Dette erstatter planens mulige OWID-bildebearbeiding; ingen slik bildefil er brukt.
- **10.6:** Japan og Niger, samme referanseår, grupper, akser og nevner, med tabeller og originalverdier.
- **10.8:** Separate paneler for SFT og eldrevarianten av forsørgerforhold. Ulike perioder og enheter er oppgitt; forbindelsen til 2050 er stiplet og merket scenario.

To hele kartfigurer gjenstår som skjulte referansedefinisjoner:

- **10.1:** Globalt fruktbarhetsmønster. Konkret datasett, felles år, manglende land og konkret kartgrunnlagslisens må kontrolleres.
- **10.7:** Global levekårsindikator. Velg én indikator, og ikke bland spedbarnsdødelighet og dødelighet under fem år.

Landpanelene vises samtidig for direkte sammenlikning. Utfoldbare tabeller er levert, men det er **ikke laget landvelger, tidsanimasjon eller klikkvis fasepresentasjon**. Slike interaksjoner kan tas i designarbeidet. Ingen oppgave krever et uferdig kart eller en slik interaksjon. Ingen Geofag-post, etablert Geofag-modell eller Geofag-rute er endret.

## Avklaringer for Mats

Ingen blokkerende faglig avklaring. DesignBOT må velge global levekårsindikator for 10.7 og konkret kartgrunnlag for 10.1/10.7 før kartene bygges. Den kvalitative femfasemodellen er en bevisst løsning uten syntetiske ratekurver. Landvelger og annen ekstra figurinteraksjon gjenstår som designforbedring, ikke som forutsetning for fagteksten.

`geo-befolkning-kap10-2026-11-06` er lagt i `COPY_RESEEDS_B`. Flagget kan overskrive CMS-redigert tekst ved første godkjente innlasting. Ingen produksjonsinnlasting er utført, og tidligere flagg er beholdt.

## Kilder kontrollert 6. november 2026

16 APA-oppføringer er registrert i `kilder-geografi.ts`. Innhold, forfattere, oppdateringsdatoer, variabler og metode er kontrollert i åpne nettsider, HTML/metadata og offentlig statistikk-API, ikke bare med HTTP-status. SNLs fagansvarlige er ikke forvekslet med artikkelforfattere. WHO og UNDP svarte ikke første WebFetch-forsøk, men de samme offentlige sidene er hentet som HTML og relevant innhold er kontrollert.

- Mæhlum, L. (2023, 21. april). Ester Boserup. I Store norske leksikon. https://snl.no/Ester_Boserup
- Nylenna, M., Stoltenberg, C., Solerød, H., & Tønnessen, M. (2025, 11. mars). Dødelighet. I Store norske leksikon. Brukt for definisjoner og mekanismer, ikke eldre landtall. https://snl.no/d%C3%B8delighet
- Our World in Data. (2024, 15. juli). Population [Datasett]. HYDE (2023), Gapminder (2022) og UN World Population Prospects (2024), bearbeidet av Our World in Data. Utvalgte verdensestimater 1750–2023. Uttrekk 6. november 2026. https://ourworldindata.org/grapher/population
- Solerød, H., & Tønnessen, M. (2026, 12. mars). Fruktbarhet – demografi. I Store norske leksikon. https://snl.no/fruktbarhet_-_demografi
- Statistisk sentralbyrå [SSB]. (2026a, 25. februar). 07459: Befolkning, etter region, kjønn og alder [Datasett]. Hele landet, ettårig alder, begge kjønn hver for seg, 1. januar 1986, 2006 og 2026. Uttrekk 6. november 2026. https://www.ssb.no/statbank/table/07459
- Statistisk sentralbyrå [SSB]. (2026b, 12. mars). 04232: Samlet fruktbarhetstall, kvinner [Datasett]. Hele landet, ni utvalgte år 1970–2025. Uttrekk 6. november 2026. https://www.ssb.no/statbank/table/04232
- Statistisk sentralbyrå [SSB]. (2026c, 15. april). 05803: Endringer i befolkningen i løpet av året [Datasett]. Folketall 1. januar 2025 og 2026; registrerte strømmer og folketilvekst 2025. Uttrekk 6. november 2026. https://www.ssb.no/statbank/table/05803
- Statistisk sentralbyrå [SSB]. (2026d, 12. juni). 14740: Framskrevet folkemengde 1. januar [Datasett]. Nasjonal framskriving 2026, hovedalternativ MMM, hele befolkningen, begge kjønn og ettårig alder, 2050. Uttrekk 6. november 2026. https://www.ssb.no/statbank/table/14740
- Tømmerås, A., Løkken, S., & Leknes, S. (2026, 12. juni). Slik lager SSB befolkningsframskrivinger. Statistisk sentralbyrå. Metodeomtale for nasjonale og regionale modeller. https://www.ssb.no/befolkning/befolkningsframskrivinger/artikler/slik-lager-ssb-befolkningsframskrivinger
- Statistisk sentralbyrå [SSB]. (u.å.). Lisens. CC BY 4.0. Hentet 6. november 2026. https://www.ssb.no/diverse/lisens
- Stoltz, G. (2026, 9. juni). Thomas Malthus. I Store norske leksikon. https://snl.no/Thomas_Robert_Malthus
- Tønnessen, M. (2024, 26. november). Demografisk overgang. I Store norske leksikon. https://snl.no/demografisk_overgang
- FNs utviklingsprogram [UNDP]. (u.å.). Human Development Index (HDI). Metodeside. Hentet 6. november 2026. https://hdr.undp.org/data-center/human-development-index
- Utdanningsdirektoratet [Udir]. (u.å.). Kompetansemål og vurdering: Geografi (GEO01-02). Hentet 6. november 2026. https://www.udir.no/lk20/geo01-02/kompetansemaal-og-vurdering/kv49
- Verdensbanken. (2026, 8. oktober). World Development Indicators: Japan og Niger [Datasett]. Midtårsestimater 2023, alder etter kjønn, kjønnsandeler, SFT, forventet levealder, andel under 15 og fra 65 år. FN WPP og øvrige originalkilder er oppgitt i indikatorenes metadata. Uttrekk 6. november 2026. CC BY 4.0. https://data.worldbank.org/indicator/SP.POP.0004.MA.5Y
- Verdens helseorganisasjon [WHO]. (2025, 3. juli). Family planning/contraception methods. Brukt for frivillige valg, helse og rettigheter, ikke globale antallsanslag. https://www.who.int/news-room/fact-sheets/detail/family-planning-contraception

OWIDs lisensvilkår er i tillegg kontrollert på https://ourworldindata.org/faqs og Verdensbankens på https://datacatalog.worldbank.org/public-licenses#cc-by. Dette er lisenskontroll, ikke ekstra faglige kapittelkilder.

## Kildeuttrekkenes SHA-256

- `geografi-befolkning-serier.csv`: `67901cb4280b847c4b5bd1b91e6ead50d495b2a4f115297f40ae12081f2079be`.
- `geografi-befolkning-worldbank.csv`: `d397fa81b923263c420cfb769803d113f376b4590a7790130ffa5e56c0e23c55`.
- `geografi-befolkning-ssb.csv`: `5b8a18651b2592849ea52854f09d32628ca1085ab192f9ea7c0e16234be89cb5`.

Hashverdier for de seks rå datanedlastingene finnes i datamodulen og `geografi-kap10-eksterne-data.json`.

## Validering

- Typecheck: bestått.
- ESLint på alle berørte TypeScript-/TSX-filer: bestått uten feil eller advarsler.
- Geografi-, seed- og reseed-tester: **105 av 105 bestått**, inkludert elleve nye kapitteltester.
- SSR: alle seks figurkomponenter bestått; seks pyramider, 102 aldersrader, 204 aldersandeler, talltabeller og gyldige koordinater kontrollert. Dette er ikke en visuell nettleser-, skjermleser- eller full WCAG-kontroll.
- Build uten `DATABASE_URL`: bestått. Loggen bekrefter at ekstern databasemigrering hoppes over. Ingen deploy. Kjente CSS-/chunkstørrelses- og Wrangler-genereringsadvarsler gjenstår.
- Full JavaScript-del: **206 tester, 188 bestått, 17 kjente feil, én hoppet over**.
- Full TypeScript-del: **270 tester, 265 bestått, fem kjente feil**.
- Samtlige fullsuitefeilnavn er maskinelt sammenliknet med kapittel 9-loggene: identiske, ingen nye fullsuitefeil.
- `git diff --check`: bestått.

Logger og valideringsresultater ligger utenfor repoet som `/workspace/geografi-kap10-*.log`, `/workspace/geografi-kap10-validering.json`, `/workspace/geografi-kap10-ord.json` og `/workspace/geografi-kap10-ssr.json`. Den eksisterende testpakken er oppdatert bare der forventet antall tekstklare kapitler eller neste ventende kapittel endres.

## Forslag til PR

Tittel: `Geografi: kapittel 10 – befolkning og levekår`

Base: `geografi-kap9`. Hode: `geografi-kap10`. Opprett som utkast etter oppdragsgivers push.

PR-tekst:

Skriver kapittel 10 alene med åtte underkapitler, Japan/Niger-case, Norge 2050, oppsummering, 18 begreper og differensierte oppgaver. Registrerer 16 kontrollerte kilder, tekststatus og eget reseed.

Leverer seks figurposisjoner med ekte SSB-, World Bank/FN- og OWID-data. Bevarer 848 originale norske ettårstall, 80 landverdier og 23 øvrige verdier med tilgjengelige tabeller, CSV-uttrekk, eksakte lesespørringer og kildehashverdier. Grunnformelen viser registeravviket på 375 eksplisitt. Framskrivingen bruker nasjonalt MMM fra 2026; den er ikke en registrert framtid. Overgangsmodellen er kvalitativ, uten konstruerte ratekurver. To globale kart og eventuell ekstra figurinteraksjon gjenstår.

Typecheck, berørt ESLint, 105 relevante tester, seks figur-SSR-er og build er grønne. Fullsuite har bare de samme 17 JavaScript-feilene og fem TypeScript-feilene som kapittel 9. Ingen Geofag-side er endret og ingen utrulling er utført. Reseed kan overskrive CMS-tekst først ved godkjent aktivering. Se `docs/geografi-kap10-redaksjon.md` for metode, kilder og forbehold.
