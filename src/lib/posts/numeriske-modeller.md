> Interaktive modeller, quizer og 3D-diagrammer ligger i kapittelet [/tema/numeriske-modeller](/tema/numeriske-modeller). Her kan du redigere **hele fagteksten**.

## Hva er en numerisk modell? Fra visjon til superdatamaskiner

I naturvitenskapen skiller vi fundamentalt mellom to ulike modellbegreper. En **konseptuell modell** er en forenklet mental skisse eller figur som forklarer sammenhenger i ord og piler – slik som Hadleycellen eller vannets kretsløp. En **numerisk modell** er derimot en ren matematisk-fysisk simulering utført på en datamaskin. Atmosfæren, verdenshavene og biosfæren deles inn i milliarder av små beregningsvolumer, og superdatamaskinen regner ut hvordan luft- og vannmassene beveger seg, sekund for sekund, basert på klassisk mekanikk og termodynamikk (ECMWF, u.å.).

Idéen om å beregne været ved hjelp av matematikk ble unnfanget av den norske fysikeren og meteorologen **Vilhelm Bjerknes i 1904** (Bjerknes, 1904). Bjerknes formulerte det som senere er blitt stående som meteorologiens hellige gral:

> «Hvis vi kjenner atmosfærens nøyaktige starttilstand på et gitt tidspunkt, og vi kjenner de fysiske lovene som styrer luftmassene, er fremtidig vær et deterministisk matematisk problem som kan løses entydig.»

Bjerknes innså imidlertid at ligningene var altfor kompliserte til å kunne løses med penn og papir i sanntid. Under første verdenskrig tok den britiske matematikeren **Lewis Fry Richardson (1922)** utfordringen videre mens han kjørte ambulanse ved vestfronten. Richardson delte Sentral-Europa inn i et rutenett og regnet for hånd ut et sekstimers værvarsel. Beregningen tok ham hele to år å gjennomføre, og varselet spådde et katastrofalt feilaktig trykkfall på 145 hPa – et trykkfall som aldri fant sted! Feilen skyldtes manglende filtrering av støy i startobservasjonene (Richardson, 1922).

Richardson drømte om en «værfabrikk»: et gigantisk sirkelrundt teater fylt med **64 000 menneskelige regnere**, dirigert av en leder i midten med fargede lyssignaler for å holde tritt med det faktiske været. Først med oppfinnelsen av den elektroniske datamaskinen *ENIAC* i 1950, ledet av Jule Charney, Ragnar Fjørtoft og John von Neumann, ble Richardsons visjon realisert. I dag kjører Meteorologisk institutt og det europeiske værsenteret ECMWF enorme superdatamaskiner med hundretusenvis av prosessorkjerner som utfører titalls billiarder regneoperasjoner per sekund (petaflops).

**Numerisk modell:** En datamodell som simulerer atmosfæren, havet eller klimasystemet ved å løse de fysiske bevaringsligningene trinnvis i tid over et tredimensjonalt rutenett.

## Byggeklossene: De fysiske primitivligningene og tidssteg

En utbredt misforståelse blant elever er troen på at værvarsler lages ved at en datamaskin leter etter «lignende historiske værkart» i et arkiv. Slik fungerer ikke fysikkbaserte modeller. En numerisk modell løser et sett med eksakte, universelle fysiske bevaringslover, kjent som **primitivligningene** (ECMWF, u.å.; MET, u.å.-a):

1. **Bevegelsesligningen (Navier-Stokes / Newtons 2. lov):** Beskriver akselerasjonen til luft- og vannpakker ($F = m \cdot a$). Summen av kreftene per masseenhet – trykkgradientkraften, Corioliskraften, gravitasjonen og molekylær/turbulent bakkefriksjon – bestemmer hvordan vindens fart og retning ($u, v, w$) endrer seg.

2. **Kontinuitetsligningen (Massebevaring):** Masse kan verken oppstå fra ingenting eller forsvinne i luften. Hvis luft strømmer sammen horisontalt i et lavtrykk (konvergens), *må* luften presses vertikalt oppover for at den totale massen skal bevares.

3. **Termodynamikkens 1. lov (Energibevaring):** Endring i en luftpakkes temperatur styres av to prosesser: *adiabatiske prosesser* (oppvarming ved nedsynking og kompresjon, avkjøling ved heving og ekspansjon) og *diabatiske prosesser* (opptak eller tap av varmeenergi fra solstråling, langbølget stråling eller latent varme frigjort når vanndamp kondenserer til skydråper).

4. **Tilstandsligningen (Ideell gasslov):** Knytter lufttrykk ($p$), tetthet ($\rho$) og absolutt temperatur ($T$) sammen gjennom formelen $p = \rho R T$, der $R$ er den spesifikke gasskonstanten for luft.

5. **Den hydrostatiske ligningen:** I storskala vær er det tilnærmet balanse mellom den oppoverrettede vertikale trykkgradientkraften og den nedoverrettede tyngdekraften ($\partial p / \partial z = -\rho g$). Dette betyr at lufttrykket i enhver høyde nøyaktig tilsvarer vekten av den overliggende luftsøylen.

6. **Fuktighetsligningen (Massebevaring for vann):** Sporer mengden vanndamp ($q$), flytende skydråper ($q_c$), iskrystaller ($q_i$) og nedbørspartikler (regn, snø, hagl), samt faseskiftene mellom dem.

### Tidsstegintegrasjon og CFL-stabilitetskriteriet

Fordi disse ligningene er *ikke-lineære* (vinden frakter luftmasser som selv har en hastighet som påvirker vinden videre), finnes det ingen matematisk formel som gir en eksakt, analytisk løsning for fremtiden. Løsningen må **integreres numerisk fremover i tid** ved hjelp av små tidssteg ($\Delta t$):

- Ved starttidspunktet $t_0$ kjenner modellen tilstanden i alle rutenettpunkter ($u, v, w, T, p, q$).

- Superdatamaskinen setter disse verdiene inn i primitivligningene og regner ut den momentane endringsraten – tendensen – for hver variabel ($\partial u / \partial t$, $\partial T / \partial t$, osv.).

- Ny tilstand etter ett tidssteg regnes ut ved enkel fremskrivning: *ny tilstand = gammel tilstand + (tendens · $\Delta t$)*.

- Prosessen gjentas hundretusenvis av ganger: fra 1 minutt til 2 minutter, videre til 3 minutter, helt til et fullt 10-dagers varsel er fullført.

Hvorfor kan vi ikke bare ta kjempeskritt i tid, for eksempel 12 timer per tidssteg, for å spare regnekraft? Svaret ligger i **Courant-Friedrichs-Lewy (CFL)-kriteriet**: For at beregningene skal være numerisk stabile, kan ikke informasjonen (vindhastigheten $u$ eller akustiske/gravitasjonsbølger) forflytte seg lenger enn én enkelt rutenettcelle ($\Delta x$) i løpet av ett tidssteg ($C = u \cdot \Delta t / \Delta x \le 1$). Hvis tidssteget er for langt, rekker informasjonen å «hoppe over» en hel celle uten å bli beregnet. Da oppstår vill numerisk resonans, feilene eksploderer mot uendelig på sekunder, og superdatamaskinens modell krasjer!

**CFL-kriteriet (Courant-Friedrichs-Lewy):** Et matematisk krav til numerisk stabilitet: Tidssteget Δt må være kortere enn tiden det tar for en luftpakke eller bølge å krysse én rutenettcelle Δx (u·Δt/Δx ≤ 1).

## Rutenett (Grid) og oppløsning i 3D

For å regne på en kontinuerlig atmosfære, må rommet diskretiseres. Superdatamaskinen spenner et tredimensjonalt rutenett over jorden. **Oppløsningen** er definert som den horisontale avstanden mellom to beregningspunkter ($\Delta x$ og $\Delta y$):

### Global modell (ECMWF)

Oppløsning: ~9 km grid

Dekker hele kloden fra ekvator til polene. Fanger opp de store stormbanene, jetstrømmene og Rossby-bølgene, men er for grov til å skille norske fjorder og individuelle bygeskyer.

### Regional modell (MEPS)

Oppløsning: 2,5 km grid

Dekker Norden og Østersjøen. Kalles *konveksjonsløsende*: 2,5 km er fint nok til at modellen løser store tordenskyer og dalvinder direkte via bevegelsesligningene.

### Kysthavmodell (Norkyst)

Oppløsning: 800 m grid

Fokusert langs norskekysten. Løser havstrømmer, tidevann og stormflo i trange sund og fjorder, drevet av vindstress fra MEPS-atmosfæren.

Vertikalt kan ikke modellen bare bruke faste geometriske høyder ($z$), for da ville de nederste lagene kollidere rett inn i fjellveggene i Jotunheimen! I stedet bruker moderne modeller **terrengfølgende hybridkoordinater ($\sigma$-flater)**:

- **Nær bakken:** De vertikale flatene tilpasser seg terrenget fullstendig og buer seg smidig over fjellrygger og ned i dype fjorder. Dette gjør det mulig å simulere orografisk heving, katabatiske fallvinder og lokale dalinversjoner med stor nøyaktighet.

- **Høyt i troposfæren og stratosfæren:** Terrengbøyningen flates gradvis ut, og koordinatene går over til å bli rene, glatte isobarflater (konstant trykk) helt opp til modellranden (typisk 0,01 hPa / ca. 65 km høyde).

### Hvorfor er en dobling av oppløsningen 16 ganger så dyr?

Mange spør hvorfor meteorologene ikke bare kjører 100 meters oppløsning over hele kloden med én gang. Årsaken er den brutale **skaleringsloven for 3D-modeller**. Tenk deg at du halverer rutenettavstanden fra 10 km til 5 km:

- Du må ha 2 ganger så mange celler i nord-sør-retning (y).

- Du må ha 2 ganger så mange celler i øst-vest-retning (x).

- Du må ha 2 ganger så mange celler i vertikal retning for å beholde sideforholdet (z).

- Dette gir $2 \times 2 \times 2 = 8$ ganger flere 3D-celler i beregningen.

- **I tillegg krever CFL-kriteriet** at tidssteget $\Delta t$ må halveres fordi cellene er blitt smalere! Dermed må superdatamaskinen ta dobbelt så mange tidssteg for å nå samme prognoselengde.

Resultat: $8 \times 2 = 16$ ganger mer datakraft per døgn! En økning i oppløsning krever dermed eksponentielt mer kostbar superdatamaskininfrastruktur.

## Parametrisering: Fysikken som gjemmer seg under rutenettet

Uansett hvor kraftig superdatamaskin vi bygger, vil rutenettet alltid ha en nedre grense. Prosesser som foregår på en romlig skala som er mindre enn noen få rutenettceller, kalles **sub-grid prosesser** (inquiry-prosesser). Disse prosessene er fullstendig usynlige for de primære bevegelsesligningene.

Ta en typisk tordensky (*Cumulonimbus*). Den kan være bare 2–4 km i tverrsnitt. I en global modell med 9 km oppløsning finnes det ikke et eneste punkt som kan «se» skyen. For modellen er rutenettcellen bare én enkelt homogen luftkube med ett gjennomsnittlig tall for temperatur og trykk. Likevel kan denne lille skyen transportere millioner av tonn med vanndamp fra bakken til 11 kilometers høyde, frigjøre gigantiske mengder latent varme og utløse lokalt styrtregn og lynnedslag!

Løsningen er **parametrisering**: I stedet for å beregne skyen direkte, programmeres statistiske og fysiske hjelpeligninger som estimerer skyens samlede nettoeffekt på cellens gjennomsnittstilstand basert på storskala fuktighet og stabilitet.

I moderne værmodeller finnes det fire sentrale parametriseringsskjemaer:

### 1. Konveksjonsskjema

Beregner oppdrift i ustabil luft, vertikal omrøring av varme og fuktighet, og frigjøring av latent varme (~2,5 MJ per kg kondensert vann). Hindrer at modellen bygger opp kunstig ekstrem ustabilitet. I konveksjonsløsende modeller (som MEPS 2,5 km) skrus dyp konveksjon av fordi gridet er fint nok til å løse skyene eksplisitt.

### 2. Strålingsskjema

Beregner hvordan innkommende kortbølget solstråling reflekteres fra skytopper (albedo) eller absorberes i bakken, samt hvordan langbølget infrarød stråling sendes ut og fanges opp av drivhusgasser (CO₂, H₂O, metan) og skybunn. Kjøres ofte hvert 15.–60. minutt for å spare regnekraft.

### 3. Sky-mikrofysikk

Beskriver de mikroskopiske prosessene inni skyen: hvordan vanndamp fester seg på aerosolkjerner (skydråpedannelse), dråpevekst ved koalesens (kollisjon), frysning til iskrystaller og vekst via Bergeron-prosessen i underkjølt luft, samt dannelse og smelting av snø og hagl på vei ned mot bakken.

### 4. Grenselag og overflateprosesser

Det nederste luftlaget (planetært grenselag / PBL, 0–2 km) er fylt med mekanisk og termisk turbulens. Her beregnes friksjonen mot ulikt terreng (skog, byer, åker, havbølger), fordampning fra vegetasjon og fuktig jord, samt varmeutveksling med snødekke og sjøis.

**Parametrisering:** Forenklet matematisk representasjon av fysiske prosesser som foregår på en skala som er mindre enn rutenettets oppløsning (sub-grid prosesser).

## Dataassimilering: Å forankre modellen i observasjoner

Selv den mest perfekte superdatamaskin med feilfrie ligninger vil feile dersom starttilstanden er gal. Men hvordan skaffer vi starttilstanden?

Virkeligheten er kaotisk: Værobservasjoner er ujevnt fordelt over kloden. Vi har titusenvis av målinger fra tett befolkede områder i Europa og USA, men nesten ingen målinger i det sørlige Stillehavet, over Arktis eller i Sahara. Dessuten har alle måleinstrumenter unøyaktigheter og støy.

Hvorfor kan vi ikke bare overskrive rutenettpunktene direkte med de ferske målingene der vi har dem? Fordi atmosfæren er i en finstemt hydrostatisk og geostrofisk balanse. Hvis du brått dytter inn en måling på 1008 hPa i et punkt omgitt av modellpunkter på 1015 hPa, skaper du en enorm, kunstig trykkgradient over null avstand. Modellen reagerer med å sende ut voldsomme, kunstige sjokkbølger (akustiske gravitasjonsbølger) som «blåser opp» hele prognosen.

Løsningen kalles **dataassimilering** (spesifikt *4D-Var* – firedimensjonal variasjonell assimilering):

Analysesyklusen foregår i en kontinuerlig seks-timers sløyfe døgnet rundt:

1. **Bakgrunnstilstanden («First Guess»):** Modellen har en forrige sekstimers prognose ($x_b$) som allerede er i fullstendig fysisk balanse i alle celler.

2. **Observasjonsflommen:** Hvert sjette time strømmer millioner av ferske målinger inn til superdatamaskinen: Over 90 % kommer fra værsatellitter (infrarød og mikrobølgeradianse), supplert av radiosonder (værballonger), automatiske vindmålinger fra sivile rutefly (AMDAR), bakkestasjoner, havbøyer og værradarer.

3. **Optimal vekting (Kostnadsfunksjon):** Datamaskinen veier modellens bakgrunnsgjetning opp mot observasjonene ved hjelp av avansert feilkovarians-matriseregning ($B$- og $R$-matriser). Målinger med lav usikkerhet gis stor vekt; støy filtreres bort.

4. **Analysen (Starttilstanden):** Resultatet er en ny, fullstendig og fysisk konsistent starttilstand ($x_a$). Fra denne analysen starter et nytt 66-timers MEPS-varsel og et 15-dagers globalt ECMWF-ensemble. Uten denne kontinuerlige justeringen ville modellen drevet ut i sin egen fantasiverden på bare 3–4 døgn.

**Dataassimilering (4D-Var):** En avansert statistisk-matematisk metode som kombinerer nye observasjoner fra satellitter og bakkestasjoner med modellens forrige prognose for å skape en optimal, fysisk balansert starttilstand.

## Kaos, Lorenz-teori og atmosfærens prediksjonsgrense

I 1961 gjorde den amerikanske meteorologen og matematikeren **Edward Lorenz** en oppdagelse som snudde opp ned på hele naturvitenskapens syn på forutsigbarhet (Lorenz, 1963).

Lorenz kjørte en enkel computermodell av atmosfæren med bare 12 ligninger. En dag ville han kjøre en simulering på nytt. For å spare tid tastet han ikke inn tallene med alle seks desimaler (f.eks. 0,506127), men rundet av til tre desimaler (0,506). Han antok at et avvik på under én tusensteldel ville være fullstendig ubetydelig. Da han kom tilbake etter en kaffepause, viste det seg at den nye kurven var blitt fullstendig ulik den første: Den simulerte stormen hadde erstattet solskinnet!

Dette fenomenet kalles **deterministisk kaos**, populært døpt til *«sommerfugleffekten»*: Vingeslagene til en sommerfugl i Brasil kan i teorien utløse en tornado i Texas uker senere. Årsaken er at atmosfærens dynamikk er *ikke-lineær*: Små feil forblir ikke små; de vokser eksponensielt over tid.

Siden det er fysisk umulig å måle atmosfæren med uendelig mange desimaler i hvert eneste punkt over Atlanterhavet, vil starttilstanden alltid inneholde en ørliten usikkerhet. Dette setter en **absolutt, teoretisk prediksjonsgrense** for atmosfæren:

- **Døgn 0–3:** Høy forutsigbarhet. Småfeil i starttilstanden er fortsatt små. Store lavtrykk, vindfelt og fronter varsles med millimeterpresisjon.

- **Døgn 4–7:** Moderat forutsigbarhet. Feilene har vokst til regional skala. Modellen fanger vanligvis opp at et lavtrykk kommer, men banen eller ankomsttidspunktet kan forskyves med flere hundre kilometer eller 12 timer.

- **Døgn 8–14:** Kaotisk metning. Den opprinnelige informasjonen fra starttilstanden er nesten fullstendig visket ut. Modellen kan si om storskalastrømmen er mild vestavind eller kald blokkering, men det gir ingen mening å spå været på et bestemt punkt i Bergen eller Oslo.

Uansett hvor store superdatamaskiner vi bygger i fremtiden, vil det aldri være mulig å gi et deterministisk, nøyaktig værvarsel for en bestemt dag 30 dager fram i tid. Kaoset setter en ugjennomtrengelig grense.

**Deterministisk kaos:** Egenskapen ved ikke-lineære dynamiske systemer der utviklingen er fullstendig styrt av fysiske lover, men hvor ørsmå avvik i starttilstanden vokser eksponensielt og gjør langtidsprediksjon umulig (Lorenz, 1963).

## Fra determinisme til ensemblevarsling (EPS)

Når atmosfæren er kaotisk, kan vi ikke stole på én enkelt modellkjøring. Løsningen på kaoset er **ensemblevarsling (Ensemble Prediction System / EPS)**.

I stedet for å kjøre modellen én gang, kjører superdatamaskinen en hel sverm av nesten like simuleringer – typisk **30 medlemmer i MEPS** og **51 medlemmer i ECMWF** (MET, u.å.-b):

- **Én kontrollkjøring:** Kjøres med den antatt beste, uforstyrrede starttilstanden fra dataassimileringen.

- **Mange perturberte medlemmer:** Starttilstanden manipuleres med mikroskopiske, fysisk plausible forstyrrelser (perturbasjoner) som gjenspeiler usikkerheten i målingene. I tillegg legges det inn små stokastiske variasjoner i parametriseringsskjemaene.

### Hvordan tolker du et ensemblevarsel på Yr?

Når meteorologene ser på resultatene fra de 51 medlemmene, ser de etter **spredningen (spread)** i ensemblet:

#### 🟢 Lav spredning = Høy varslingstillit

Alle de 51 kurvene ligger tett samlet som en stram trådbunt. Uansett hvilke småfeil som fantes i starttilstanden, lander alle simuleringene på samme resultat (f.eks. et mektig blokkerende høytrykk med tørt klarvær). Varselet har svært høy pålitelighet!

#### 🔴 Stor spredning = Lav varslingstillit

Kurvene spriker som en åpen vifte («spagettikart»). 20 medlemmer sender lavtrykket inn over Trøndelag med storm og regn, mens 30 medlemmer sender det sør for Lindesnes og gir sol i Midt-Norge. Atmosfæren er i en ustabil bifurkasjonstilstand, og et enkelt deterministisk tall er meningsløst.

Når du på Yr ser teksten *«40 % sjanse for mer enn 20 mm regn»*, betyr det at nøyaktig 20 av de 50 ensemblemedlemmene har beregnet at det vil falle mer enn 20 mm i den aktuelle gridcellen. Ensemblet erstatter falsk skråsikkerhet med ekte naturvitenskapelig sannsynlighet.

**Ensemblevarsling (EPS):** En varslingsmetode der en numerisk modell kjøres parallelt mange ganger med mikroskopiske variasjoner i starttilstanden for å tallfeste varslingens usikkerhet og sannsynlighet.

## Tre bruksområder i geofag: Værvarsling, havmodellering og klimaforskning

I læreplanen for Geofag 2 trekkes det fram tre sentrale anvendelser for numeriske modeller. De bygger på de samme grunnleggende bevaringslovene, men har vidt forskjellig tidsskala, oppløsning og matematisk karakter:

### 🌦️ 1. Værvarsling: Et startverdiproblem

- **Tidsskala:** Fra noen timer (nowcasting) ut til 10–15 døgn.

- **Fysisk karakter:** *Startverdiproblem*. Hva som skjer de neste dagene er nesten utelukkende bestemt av den nøyaktige starttilstanden i øyeblikket varselet skytes ut.

- **Fokus:** Høyest mulig oppløsning (2,5 km i MEPS) for å løse norske fjorder, lokale vindkast og konvektive byger. Kontinuerlig dataassimilering hvert sjette time er helt avgjørende.

### 🌊 2. Havmodellering: Drevet av atmosfærerand og tetthet

- **Tidsskala:** Dager til uker (bølger og stormflo), sesonger og århundrer (havstrømmer og varmelagring).

- **Fysisk karakter:** Havet er om lag 800 ganger tettere enn luft og har en enorm varmekapasitet. Vann beveger seg saktere enn luft, og et feilaktig blandelag kan vedvare i uker.

- **Styrende mekanismer:** Havmodellene (som ROMS i Norkyst-800) styres sterkt av *randbetingelsene fra atmosfæren*: mekanisk vindstress som trekker i overflaten, varmeveksling (oppvarming/avkjøling) og ferskvannstilførsel (nedbør og elveavrenning). Indre strømmer styres av tetthetsforskjeller drevet av temperatur og saltholdighet (termohalin sirkulasjon).

- **Samfunnsnytte:** Varsling av stormflo og ekstremt tidevann for kystvern, bølgevarsler for skipstrafikk og oljeplattformer, spredning av oljesøl og lakselus i oppdrettsnæringen, samt søk- og redningsaksjoner ved skipbrudd.

### 🌍 3. Klimaforskning: Et randverdiproblem

- **Tidsskala:** Tiår til århundrer (f.eks. frem mot år 2100 og 2300).

- **Fysisk karakter:** *Randverdiproblem*. Klimaforskning forsøker aldri å varsle det konkrete været på en bestemt dato, som for eksempel 12. juni 2087. Været på en gitt dag om 60 år er teoretisk umulig å spå på grunn av Lorenz' kaosgrense.

- **Styrende mekanismer:** På tiårsskala er det ikke starttilstanden som betyr noe, men **det eksterne pådrivet (forcing)**: konsentrasjonen av drivhusgasser (CO₂, metan), utslipp av aerosoler (svovelpartikler), variasjoner i solens utstråling, samt vulkanutbrudd.

- **Målet for prediksjonen:** Klima er definert som *værets statistikk* over minst 30 år (middeltemperatur, årsnedbør, sannsynlighetsfordeling for ekstremvarme eller hundreårsflommer). Klimamodellene beregner hvordan denne statistiske fordelingen forskyver seg når klodens energibalanse endres (IPCC, 2021).

- **Jordsystemmodeller (ESM):** Moderne klimamodeller kobler atmosfære, dyphav, havis, innlandsisbreer, vegetasjon og det biogeokjemiske karbonkretsløpet i én helhetlig simulering.

**Startverdi- vs. randverdiproblem:** Værvarsling er et startverdiproblem: Hva som skjer neste uke styres av den nøyaktige starttilstanden nå. Klimaforskning er et randverdiproblem: Statistikken over 100 år styres av ytre pådriv (klimagasser og sol), uavhengig av dagens vær.

## Norges operative modellhierarki: Fra global ECMWF til MEPS og Norkyst

I et lite land som Norge, preget av stupbratte vestlandsfjorder, ville fjellplatåer og et enormt kystområde mot Norskehavet og Barentshavet, er det umulig å dekke alle behov med én enkelt modell. Meteorologisk institutt og Yr benytter derfor en elegant teknikk kalt **nesting** (arving av randbetingelser):

Hierarkiet fungerer som en stafett fra global til lokal skala:

- **1. ECMWF IFS (Global modell, ~9 km, 51 medlemmer):** Kjøres ved det europeiske værsenteret i Bologna. Modellen dekker hele planeten og regner ut stormbaner, jetstrømmer og storskala høytrykk ut til 15 dager fram i tid.

- **2. MEPS (Regional værmodell for Norden, 2,5 km, 30 medlemmer):** Drives i et nordisk samarbeid (MetCoOp) mellom Norge, Sverige, Finland og Estland. MEPS kutter ut resten av kloden og fokuserer all regnekraft på Norden. Modellen henter storskala værdata langs sine yttergrenser (randbetingelser) fra ECMWF, men beregner det lokale været med 2,5 km oppløsning ut til 66 timer (Yr time-for-time). Med 2,5 km fanger MEPS opp fjordkanalisering av vind og konvektive byger eksplisitt (MET, u.å.-a).

- **3. AROME-Arctic (Arktisk spesialmodell, 2,5 km):** Dekker Svalbard, Barentshavet og havområdene opp mot Nordpolen. Modellen er spesialprogrammert for å håndtere grenselag over sjøis, ekstrem kulde og utviklingen av livsfarlige *polare lavtrykk*.

- **4. Norkyst-800 (Kyst- og fjordhavmodell, 800 m):** Henter time-for-time vind og lufttrykk fra MEPS og elvevannføring fra NVE. Simulerer strøm, overflatetemperatur, bølger og tidevann langs hele norskekysten med 800 meters oppløsning.

**Nesting:** En modellteknikk der en finoppløst regional modell legges inni en grovere global modell og kontinuerlig mates med storskala vær langs yttergrensene (randbetingelser).

## Den nye æraen: Kunstig intelligens og nevrale værmodeller

Mellom 2022 og 2026 har meteorologien opplevd sin største revolusjon på et halvt århundre: **datadrevne AI-værmodeller**. Modeller som *GraphCast* (Google DeepMind), *Pangu-Weather* (Huawei) og ECMWFs egen *AIFS* (Artificial Intelligence Forecasting System) har vist at dype nevrale nettverk kan forutse det globale været med en treffsikkerhet som er fullt på høyde med – og på noen områder overgår – de tradisjonelle fysikkbaserte modellene.

### Klassisk numerisk modell (IFS / MEPS)

- **Metode:** Løser eksakte fysiske differensialligninger (Navier-Stokes) trinn for trinn med tidssteg $\Delta t$.

- **Datakraft:** Krever gigantiske superdatamaskiner med hundretusenvis av CPU-er og timer med regnetid per prognose.

- **Styrke:** Fysisk konsistent, universell og strengt bevarende (masse og energi går aldri tapt).

### AI-værmodell (ECMWF AIFS / GraphCast)

- **Metode:** Løser ingen differensialligninger. Et dypt nevralt nettverk har trent på 40 år med historiske reanalysedata (ERA5) og lært mønstrene direkte.

- **Datakraft:** Ekstremt rask! Kan regne et fullt 10-dagers globalt varsel på under ett minutt på én enkelt kommersiell databrikke (GPU/TPU).

- **Styrke:** Svært nøyaktig sporing av tropiske orkaner og store atlantiske lavtrykk med en brøkdel av strømforbruket.

Betyr dette at de klassiske fysiske modellene er blitt overflødige? Absolutt ikke. AI-modellene er helt avhengige av fysikkmodellene:

- AI-modellene kan bare trenes fordi vi har 40 år med perfekte *reanalyser* produsert av fysikkmodeller og dataassimilering.

- Uten fysikkbasert dataassimilering ville ikke AI-modellen hatt noen fersk starttilstand å starte fra i dag.

- AI-modeller kan slite med å forutsi ekstreme værrekorder som aldri før har funnet sted i historien (f.eks. som følge av akselererende global oppvarming), fordi mønsteret mangler i treningsdataene.

Fremtiden tilhører hybride systemer: Fysikkbaserte modeller sikrer strenge bevaringslover og assimilering av nye målinger, mens AI-modeller akselererer ensemblekjøringer og gir raskere farevarsler til befolkningen.

> **De 4 vanligste eksamensfellene i Geofag 2**
>
> - **Felle 1: Å tro at klimamodeller skal spå været på en gitt dag i fremtiden.** En klassisk eksamensfeil er å si at «klimamodeller er upålitelige fordi de ikke kan vite om det regner 17. mai 2080». Klimamodeller er randverdiproblemer som beregner *værets statistikk* (gjennomsnitt, varians og ekstremfrekvens) drevet av ytre klimagasspådriv, ikke det spesifikke været på en bestemt enkeltdag.
>
> - **Felle 2: Å tro at et ensemble betyr at superdatamaskinen «gjør feil».** Noen elever tror at stor spredning i et ensemble betyr at datamaskinen er ødelagt. Sannheten er den motsatte: Spredningen kartlegger atmosfærens reelle fysiske uforutsigbarhet. Når ensemblet spriker på dag 8, er det vitenskapelig ærlig å si at været er usikkert, snarere enn å gi et villedende, skråsikkert deterministisk tall.
>
> - **Felle 3: Å forveksle rutenettoppløsning med parametrisering.** En modell med 2,5 km oppløsning ser ikke hvert tre, hvert hus eller hver bekk. Prosesser som er mindre enn cellestørrelsen må fortsatt parametriseres. Forskjellen er at med 2,5 km grid kan dype bygeskyer og store fjelltopper løses direkte, mens sky-mikrofysikk og turbulens fortsatt må parametriseres.
>
> - **Felle 4: Å tro at modeller bare er statistisk kurvetilpasning.** Numeriske modeller er ikke statistiske kurver tegnet etter gårsdagens temperatur. De bygger på eksakt, deterministisk fysikk (Newtons lover, massebevaring og termodynamikk) som har vært kjent og testet i laboratorier i over tre hundre år.

## Viktige begreper i numerisk modellering

**Numerisk modell:** Dataprogram som simulerer naturprosesser ved å løse matematiske bevaringsligninger trinnvis over et 3D-rutenett.

**Rutenett (Grid):** Det tredimensjonale nettverket av beregningspunkter som deler inn atmosfæren og havet horisontalt (Δx) og vertikalt (Δz).

**Primitivligninger:** Settet av fysiske bevaringslover (Navier-Stokes, kontinuitet, termodynamikk, tilstandsligning og fuktighet) som styrer modellene.

**Parametrisering:** Forenklet matematisk representasjon av sub-grid prosesser som er for små til å løses direkte (f.eks. skyer og turbulens).

**CFL-kriteriet:** Krav til numerisk stabilitet (u·Δt/Δx ≤ 1) som bestemmer hvor kort tidssteget må være i forhold til rutenettets oppløsning.

**Dataassimilering:** Matematisk metode (f.eks. 4D-Var) som kontinuerlig kombinerer ferske observasjoner med modellens prognose til en optimal starttilstand.

**Deterministisk kaos:** Egenskap ved ikke-lineære systemer der ørsmå avvik i starttilstanden vokser eksponensielt og setter en grense for langtidsvarsling.

**Ensemble (EPS):** Sverm av 30–50 parallelle modellkjøringer med mikroskopisk ulike startbetingelser for å tallfeste usikkerhet og sannsynligheter.

**Startverdiproblem:** Matematisk formulering der fremtiden primært styres av den nøyaktige starttilstanden, typisk for værvarsling (dager til to uker).

**Randverdiproblem:** Matematisk formulering der den langsiktige statistikken styres av ytre pådriv og grensebetingelser, typisk for klimaforskning.

**Nesting:** Teknikk der en høyoppløst regional modell (som MEPS) legges inni en grovere global modell (som ECMWF) og mates langs grensene.

**Jordsystemmodell (ESM):** Avansert klimamodell som kobler sammen atmosfære, verdenshav, kryosfære, biosfære og det globale karbonkretsløpet.

## Test deg selv: Numeriske modeller
