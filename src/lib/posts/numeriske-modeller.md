> **Kompetansemål i Geofag 2 (LK20)**
>
> Elevene skal kunne
>
> - gjøre rede for hvordan numeriske modeller i geofag bygges opp og videreutvikles, og beskrive hvordan modellene brukes innenfor værvarsling, havmodellering og klimaforskning
>
> (Udir, u.å.-b)
>
> **Kjerneelementer som dekkes i dette kapitlet:**
>
> • *Modeller og modellering:* «Kjerneelementet modeller og modellering handler om å bruke modeller og modellering i geofag.»
>
> • *Jordsystemer i tid og rom:* «Kjerneelementet jordsystemer handler om delsystemer som geosfæren, atmosfæren, hydrosfæren, kryosfæren og biosfæren.»
>
> (Udir, u.å.-a)
>
> **I dette kapitlet lærer du om**
>
> grunnlikningene, rutenett, oppløsning og tidssteg, parameterisering, dataassimilering, kaos og ensembler, og hvordan de norske modellene MEPS, AROME-Arctic, Norkyst og NorESM brukes i værvarsling, havmodellering og klimaforskning.

> **Hva tror du?**
>
> Ingen kan si sikkert om det regner i Bergen om tre uker. Likevel regner forskerne ut hvordan klimaet kan bli i 2100. Hvordan kan det henge sammen? Tenk over det før du leser videre. Vi kommer tilbake til det i delen om klimaforskning.

## Hvordan bygges en numerisk modell opp?

En [numerisk modell](/tema/numeriske-modeller) er et dataprogram som regner ut hvordan lufta, havet eller hele jordsystemet endrer seg. Modellen løser fysiske likninger med tall, i mange små regnestykker, i stedet for med én eksakt formel. Det er det *numerisk* betyr. I *numerisk værvarsling* løser datamaskinen de hydrodynamiske og termodynamiske likningene for atmosfæren og regner ut været framover i tid (Sivle, 2025). Klimamodeller bygger på de samme likningene, men brukes til å regne ut værstatistikken over mange år (Benestad & Gjengedal, 2024).

```widget
ModellForklaring
```

### Grunnlikningene

Modellen starter med naturlover vi kjenner fra fysikken. Newtons andre lov sier hvordan lufta akselererer når trykkforskjeller, jordrotasjonen og friksjon virker på den. Bevaring av masse, energi og vann sier at luft, varme og vanndamp ikke forsvinner, men flyttes og skifter form. I tillegg kommer *tilstandslikningen* (gassloven), som binder sammen trykk, tetthet og temperatur. Gassloven er ingen bevaringslov, men en sammenheng mellom tilstandsvariablene. Samlet kaller vi dette *grunnlikningene* eller *primitivlikningene*. Nesten alle værmodeller i dag bygger på en versjon av dem (Warner, 2011). Allerede i 1904 beskrev Vilhelm Bjerknes værvarsling som et slikt fysisk problem: Kjenner vi tilstanden i atmosfæren nå og lovene den følger, kan vi i prinsippet regne ut tilstanden senere (Bjerknes, 1904).

```widget
PrimitiveEquations
```

### Rutenett og oppløsning

Likningene kan ikke løses i hvert eneste punkt i lufta. Modellen deler derfor atmosfæren eller havet inn i et tredimensjonalt *rutenett*, og regner ut verdier som temperatur, trykk, vind og fuktighet i hver rute (Sivle, 2025). Avstanden mellom punktene i rutenettet kaller vi modellens *oppløsning* (romlig oppløsning). Hver rute har bare én verdi for hver størrelse. Det modellen regner ut, er altså et gjennomsnitt for hele ruten, ikke verdien i ett punkt.

Rutene kan være små eller store. Den globale modellen til ECMWF (Det europeiske senteret for mellomlange værvarsler) har ruter på ca. 9 km og 137 lag i høyden. Det øverste laget ligger ca. 80 km over bakken, i mesosfæren (ECMWF, 2023; u.å.-b). MET (Meteorologisk institutt) bruker værmodellen MEPS med ruter på 2,5 km. Den har 65 lag fra 12 meter over bakken til 10 hPa, langt oppe i stratosfæren (Eresmaa, 2024). Jo mindre rutene er, desto bedre beskriver modellen fjell, daler og fjorder (Sivle, 2025). Det betyr mye i et land som Norge, der vind, nedbør og temperatur kan endre seg mye over korte avstander.

Finere oppløsning koster regnekraft. Halverer vi rutestørrelsen, blir det fire ganger så mange ruter langs bakken. Med flere lag i høyden og kortere tidssteg (se nedenfor) øker regnejobben enda mer. Derfor må modellmakerne alltid velge mellom høy oppløsning, stort område og lang varslingstid.

### Tidssteg

Modellen regner ikke fram tiden i én jafs, men i korte hopp, det vi kaller *tidssteg*. For hvert tidssteg regner den ut hvordan alle størrelsene endrer seg, og bruker svaret som start for neste steg. Tidssteget må passe til rutestørrelsen. Er det for langt, kan en bølge eller en strøm flytte seg over mer enn én rute på ett steg, og regnestykket blir ustabilt. Dette stabilitetskravet kalles *CFL-kriteriet*, etter matematikerne Courant, Friedrichs og Lewy (Warner, 2011). Havmodellen Norkyst, som har ruter på ca. 800 meter, bruker et tidssteg på 40 sekunder. Raske bølger på havoverflaten regnes med et eget tidssteg på 2 sekunder (Christensen mfl., 2026).

```widget
ModelGrid3D
```

```widget
SjekkModeller1
```

## Hva er parameterisering?

Mange viktige prosesser i lufta er mindre enn rutene. Skydråper og regndråper dannes på mikrometer- og millimeterskala. Turbulensen i luftlaget nærmest bakken, *grenselaget*, består av virvler som er langt mindre enn en rute. Sollys og varmestråling går gjennom gasser og skyer på måter som varierer fra punkt til punkt. Modellen kan ikke regne ut hver dråpe eller hver virvel. I stedet beskriver vi den samlede virkningen av prosessene på hele ruten med forenklede formler. Det kaller vi *parameterisering* (parameter = størrelse som inngår i en formel).

ECMWF parameteriserer blant annet stråling, konveksjon (luft som stiger fordi den er varmere enn omgivelsene), skyer, utvekslingen mellom bakken og lufta, turbulens og bremsingen fra fjell som er mindre enn rutene (ECMWF, u.å.-c). Strålingen er så tung å regne ut at ECMWF regner den fullstendig bare én gang i timen, og på et grovere rutenett enn resten av modellen (ECMWF, u.å.-c). Et parameteriseringsskjema er altså en liten modell inne i den store modellen. Det kan for eksempel anslå hvordan skyene påvirker resten av atmosfæren (Benestad & Gjengedal, 2024).

Hvor mye som må parameteriseres, avhenger av oppløsningen. Med ruter på 2,5 km er MEPS og AROME-Arctic det vi kaller *konveksjonstillatende* modeller. Det betyr at nettet er fint nok til at store byger og tordenskyer i grove trekk kan regnes ut direkte, i stedet for å parameteriseres (Müller mfl., 2017; Frogner mfl., 2022). Skydråper, turbulens og stråling må likevel parameteriseres. Parameteriseringene er forenklinger, og derfor en viktig kilde til feil i modellene (Meteorologisk institutt, 2020). Skyer er fortsatt noe av det modellene sliter mest med (Benestad & Gjengedal, 2024).

```widget
SubgridParametrization
```

```widget
SjekkModeller2
```

## Hvordan får modellen riktig start?

### Dataassimilering

En værmodell må starte fra været slik det er akkurat nå. Til det bruker den observasjoner fra værstasjoner, skip, bøyer, værballonger (radiosonder), fly, GPS-mottakere på bakken, værradarer og satellitter (Eresmaa, 2024). ECMWF har rundt 60 millioner kvalitetskontrollerte observasjoner til rådighet hvert døgn (ECMWF, u.å.-e). Likevel er det mange ruter uten målinger, særlig over havet og høyt oppe i lufta. Målingene har også feil, og et punkt måler ikke det samme som gjennomsnittet i en hel rute (Meteorologisk institutt, 2020).

Løsningen er *dataassimilering* (assimilere = ta opp i seg). Modellen starter med et kort varsel fra forrige kjøring, *bakgrunnen*. Så sammenligner den bakgrunnen med de nye observasjonene og justerer den. Resultatet er *analysen*, den beste beskrivelsen vi har av tilstanden nå (ECMWF, u.å.-d). Hvor mye analysen dras mot en observasjon, avhenger av hvor stor feil vi regner med i observasjonen og i bakgrunnen.

Metodene er ulike fra senter til senter. Ifølge MetCoOp lager MEPS en ny analyse hver tredje time med metoden *3D-Var*, og bakgrunnen er et tre timer gammelt varsel. Temperatur og fuktighet ved bakken analyseres for seg med *optimal interpolasjon* (Eresmaa, 2024). AROME-Arctic bruker også 3D-Var hver tredje time (Meteorologisk institutt, 2017). ECMWF bruker *4D-Var*, som også tar hensyn til når i et tidsvindu observasjonene ble gjort (ECMWF, 2023; u.å.-d). Dataassimilering brukes også i havmodeller og for bakken, ikke bare for atmosfæren (ECMWF, u.å.-d).

```widget
ModellAssimilering
```

```widget
DataAssimilationCycle
```

### Kaos og ensembler

Selv den beste analysen har små feil. I atmosfæren vokser små feil over tid, fordi atmosfæren er et *kaotisk system* (Meteorologisk institutt, 2020). Edward Lorenz viste i 1963 at en enkel modell av strømning ga helt ulike resultater når han endret startverdiene litt (Lorenz, 1963). Dette ble kjent som *sommerfugleffekten*, etter et foredrag der Lorenz spurte om et vingeslag fra en sommerfugl i Brasil kan utløse en tornado i Texas (Store norske leksikon, u.å.).

Derfor kjører værtjenestene ikke bare ett varsel, men et *ensemble*: mange varsler som starter fra litt ulike analyser (Meteorologisk institutt, 2020). Hvert varsel kalles et *medlem*. ECMWF kjører 51 medlemmer, ett kontrollvarsel og 50 med små endringer, med ruter på ca. 9 km og opptil 15 døgn fram (ECMWF, u.å.-a). I MEPS starter fem nye medlemmer hver time, og ensemblet består av 30 medlemmer fra de siste seks timene (Meteorologisk institutt, u.å.-a). MEPS forstyrrer ikke bare startverdiene, men også randverdiene, observasjonene og enkelte tall i parameteriseringene. Slik tar ensemblet hensyn til at også modellen har feil (Eresmaa, 2024).

Er medlemmene enige, er varselet sikkert. Sprer de seg mye, er det usikkert. Den enkleste måten å lese et ensemble på er å telle: Gir 12 av 30 medlemmer regn, er sjansen for regn ca. 40 prosent.

```widget
ModellEnsemble
```

```widget
LorenzChaosEnsemble
```

```widget
SjekkModeller3
```

## Hvordan brukes modellene i værvarslingen?

Værvarslingen i Norge bygger på flere modeller som henger sammen. Øverst står de globale modellene til ECMWF, som dekker hele jorda. ECMWF lager ensemblevarsler fra kl. 00 og 12 UTC hver dag, og kortere varsler fra kl. 06 og 18 UTC (ECMWF, u.å.-a). En modell som bare dekker et avgrenset område, trenger verdier langs kanten, det vi kaller *randverdier*. De henter den fra en global modell. MEPS får randverdier fra ECMWF for hver time (Eresmaa, 2024).

### MEPS

*MEPS* (MetCoOp Ensemble Prediction System) er hovedmodellen for værvarslene fra MET de første døgnene. Den lages i MetCoOp, et samarbeid mellom MET, SMHI i Sverige og FMI i Finland, der også Estland og Latvia er med (Meteorologisk institutt, u.å.-b). MEPS har ruter på 2,5 km, dekker Skandinavia, Finland og Baltikum. Varselet går omtrent to og et halvt døgn (opptil ca. 66 timer) fram (Eresmaa mfl., 2026; Meteorologisk institutt, u.å.-a). MEPS har vært i drift siden 2016 (Frogner mfl., 2019). På Yr brukes MEPS til de første døgnene av varselet. Etter det tar ECMWF-ensemblet over, fram til ti døgn (Yr, u.å.). Modellvarselet blir også *etterbehandlet* før det vises på Yr, slik at det passer bedre til stedet du ser på (Yr, u.å.).

### AROME-Arctic

Langt nord er værvarsling ekstra vanskelig. Der er det få observasjoner, og havisen og de kraftige *polare lavtrykkene* krever egne løsninger. *AROME-Arctic* er MET sin modell for Svalbard, Nord-Norge og havområdene rundt. Den har ruter på 2,5 km og 65 lag i høyden, og den har vært i drift siden 15. november 2015 (Meteorologisk institutt, 2017). Modellen kjøres fire ganger i døgnet og regner 66 timer fram, og den får randverdier fra ECMWF. Havtemperaturen og havisen hentes også fra ECMWF, og en egen enkel havismodell regner på isen (Meteorologisk institutt, 2017). Det er AROME-Arctic som gir varslene for Svalbard på Yr (Meteorologisk institutt, u.å.-c). Du kan lese mer om havisen i kapitlet [Kryosfæren](/tema/kryosfaeren), og om lavtrykk og fronter i kapitlet [Værkart](/tema/vaerkart).

Meteorologen bruker modellene, men lager ikke varselet bare ved å lese av ett kart. Hun sammenligner modeller, ser på ensemblet og på de nyeste observasjonene, og vurderer om farevarsler må sendes ut.

```widget
ModelHierarchyNorway
```

```widget
SjekkModeller4
```

## Hvordan brukes modellene i havmodelleringen?

Havet følger de samme fysiske lovene som lufta, men sjøvannets tetthet styres av temperatur og saltholdighet. En havmodell regner ut strøm, vannstand, temperatur og saltholdighet i et rutenett som går fra overflaten ned mot bunnen. Den trenger, akkurat som en værmodell, en start, randverdier og påvirkning fra omgivelsene. For havet er det særlig vinden, lufttrykket, varmen fra sola, ferskvann fra elvene og tidevannet som virker inn.

*Norkyst* er MET sin modell for havet langs hele norskekysten. Den første versjonen, Norkyst-800, kom i 2011 (Albretsen mfl., 2011) og ble tatt i bruk i den daglige varslingen i 2012. Den nyeste versjonen, Norkyst versjon 3, er beskrevet av forskere ved MET og Havforskningsinstituttet (Christensen mfl., 2026). Modellen bygger på havmodellen ROMS og har ruter på ca. 800 meter og 40 lag fra overflaten til bunnen. Vind og lufttrykk kommer fra MET sin værmodell med ruter på 2,5 km, hver time. Fordi lufttrykket er med, får modellen fram *stormflo*, når lavt lufttrykk og pålandsvind presser vannet opp mot land. Vannføringen i elvene kommer fra NVE, verdiene langs havranden fra den europeiske havtjenesten Copernicus, og tidevannet fra en global tidevannsmodell (Christensen mfl., 2026).

Norkyst regner fem døgn (120 timer) fram, og det lages et nytt varsel hver natt (Christensen mfl., 2026). Modellen viser hvordan Den norske kyststrømmen og Den norske atlanterhavsstrømmen beveger seg langs kysten. Du kan lese mer om strømmene i kapitlet [Havstrømmer](/tema/havstrommer). Varslene brukes blant annet til å beregne hvor en person i sjøen, et skip eller et oljeutslipp driver, og til å følge spredningen av lakselus fra oppdrettsanlegg (Christensen mfl., 2026). For enkelte fjorder, som Oslofjorden, finnes det egne modeller med ruter på 160 meter. MET kjører også en versjon med dataassimilering, med ruter på 2,4 km og metoden 4D-Var (Christensen mfl., 2026). Norkyst har ikke havis. Barentshavet og Svalbard dekkes av en egen modell for hav og havis (Christensen mfl., 2026).

```widget
SjekkModeller5
```

## Hvordan brukes modellene i klimaforskningen?

Et værvarsel starter fra været i dag og regner ut hvordan det utvikler seg de neste timene og dagene. En klimamodell spør om noe annet. Den regner ut hvordan *værstatistikken*, altså klimaet, endrer seg når pådrivene endres, for eksempel mengden drivhusgasser eller innstrålingen fra sola (Benestad & Gjengedal, 2024). Det er svaret på «Hva tror du?»: Vi kan ikke vite om det regner i Bergen en bestemt dag i 2100, men vi kan regne ut hvordan gjennomsnittet og variasjonen endrer seg.

En global klimamodell løser naturlovene på et tredimensjonalt rutenett for atmosfæren, havet, havisen og landjorda med vegetasjon. Når modellen også har avansert atmosfærekjemi og kretsløp for stoffer som karbon, kaller vi den en *jordsystemmodell* (NORCE, u.å.). Rutene er mye større enn i værmodellene, fordi modellen skal regne over hele jorda og over hundrevis av år.

*NorESM* (Norwegian Earth System Model) er den norske jordsystemmodellen. Den er utviklet siden 2007 og har blitt brukt i rapportene til FNs klimapanel, IPCC (NORCE, u.å.). Den siste versjonen, NorESM2, er utviklet av et konsortium ledet av MET og NORCE, sammen med Universitetet i Oslo, CICERO, Nansensenteret og Universitetet i Bergen (NorESM-konsortiet, u.å.). NorESM2 bygger på den amerikanske modellen CESM2, men har egne norske deler, blant annet havmodellen BLOM, en modell for partikler i lufta (aerosoler) og en modell for karbonet i havet. Den finnes i flere oppløsninger. I NorESM2-LM har atmosfæren og landjorda ruter på ca. 2 grader og havet ca. 1 grad. I NorESM2-MM har alle delene ca. 1 grad (NorESM-konsortiet, u.å.). Én grad er omtrent 110 km langs en lengdegrad.

Klimamodellene kan ikke sjekkes mot framtiden. Forskerne tester dem derfor mot klimaet vi har målt, for eksempel den globale middeltemperaturen, årstidene og naturlige svingninger som El Niño (Benestad & Gjengedal, 2024). Mange forskningsgrupper kjører også de samme forsøkene med hver sin modell. Slik ser vi hvor modellene er enige og hvor de spriker. Dette samarbeidet heter CMIP (Coupled Model Intercomparison Project), og resultatene brukes i IPCC-rapportene (Benestad & Gjengedal, 2024). NorESM2 er en av modellene i CMIP6. Med NorESM2-LM blir jorda 1,3 grader varmere mot slutten av hundreåret med lave utslipp, og 3,9 grader varmere med svært høye utslipp, sammenlignet med 1850–1879 (Seland mfl., 2020). Mer om scenarioene og klimaendringene står i kapitlet [Klima](/tema/klima).

```widget
SjekkModeller6
```

## Hvordan videreutvikles modellene?

Ideen om å regne ut været er over hundre år gammel. I 1904 publiserte Vilhelm Bjerknes artikkelen der han beskrev værvarsling som et matematisk-fysisk problem (Bjerknes, 1904). I 1905 la han fram programmet i et foredrag i Washington (Dannevig & Harstveit, 2025). Den britiske fysikeren Lewis Fry Richardson prøvde å regne ut været for hånd. Han publiserte arbeidet i boka *Weather Prediction by Numerical Process* i 1922, men metoden fikk lite praktisk betydning mens han levde (Mæhlum, 2024). Først med datamaskinene ble ideen mulig. De første brukbare værvarslene regnet ut av en datamaskin ble laget av svenske og norske meteorologer i 1954 (Benestad & Gjengedal, 2024).

Siden da har modellene blitt bedre på tre måter. For det første har datamaskinene blitt kraftigere, slik at rutene kan bli mindre. Da Yr kom i 2007, hadde værmodellen til MET ruter på 10 km. I dag er de 2,5 km (Meteorologisk institutt, 2020). I 2023 halverte ECMWF rutene i ensemblet sitt fra 18 til 9 km (ECMWF, 2023). For det andre kommer det nye observasjoner, særlig fra satellitter, og bedre metoder for dataassimilering. For det tredje blir parameteriseringene bedre etter hvert som forskerne forstår prosessene bedre. Hver ny modellversjon testes mot observasjoner før den tas i bruk. Resultatet er at et varsel i dag er omtrent like godt som et varsel for én dag kortere tid fram var for ti år siden. Varslene har altså blitt omtrent én dag bedre hvert tiende år (Meteorologisk institutt, 2020).

Et nytt supplement er modeller basert på *maskinlæring*. I 2025 tok ECMWF i bruk AIFS, som har lært av hvordan været har utviklet seg tidligere og kjøres side om side med den fysiske modellen. AIFS bruker omtrent 1000 ganger mindre energi per varsel, men starter fra den samme analysen, så den trenger fortsatt observasjoner og dataassimilering (ECMWF, 2025). Også havmodellene og klimamodellene utvikles videre. Norkyst versjon 3 har erstattet den gamle Norkyst-800 (Christensen mfl., 2026), og den neste norske jordsystemmodellen, NorESM3, utvikles nå til neste runde av CMIP og IPCC (NorESM-konsortiet, 2025).

> **Tre vanlige misforståelser**
>
> 1. **En værmodell er et værkart på en datamaskin.** Modellen er fysikk som regnes ut på et rutenett. Kartene på Yr og i nyhetene er bare resultatet (Sivle, 2025).
> 2. **Med små nok ruter blir varselet perfekt.** Observasjonene har feil og hull, parameteriseringene er forenklinger, og små feil vokser fordi atmosfæren er kaotisk (Meteorologisk institutt, 2020).
> 3. **Klimamodeller kan ikke stemme når værvarselet bommer etter to uker.** Klimamodellen varsler ikke været en bestemt dag. Den regner ut hvordan værstatistikken endrer seg når pådrivene endres (Benestad & Gjengedal, 2024).

## Viktige begreper

**Numerisk modell:** Et dataprogram som løser fysiske likninger med tall, steg for steg, i et rutenett.

**Grunnlikningene (primitivlikningene):** Bevegelseslikningene, bevaring av masse, energi og vann, og tilstandslikningen (gassloven).

**Rutenett:** Tredimensjonal inndeling av atmosfæren eller havet i ruter. Modellen regner ut én verdi per rute for hver størrelse.

**Oppløsning:** Avstanden mellom punktene i rutenettet, for eksempel 2,5 km i MEPS.

**Tidssteg:** Tiden modellen hopper fram for hvert regnestykke. Det må være kort nok til at ingenting flytter seg over mer enn én rute på ett steg (CFL-kriteriet).

**Parameterisering:** Forenklede formler for den samlede virkningen av prosesser som er mindre enn rutene, som skyer, turbulens og stråling.

**Dataassimilering:** Metoden som kombinerer et kort varsel (bakgrunnen) med nye observasjoner til en analyse.

**Analyse:** Den beste beskrivelsen av tilstanden nå. Den er startpunktet for et nytt varsel.

**Randverdier:** Verdier langs kanten av en regional modell, hentet fra en større modell.

**Ensemble:** Mange varsler med litt ulike startverdier. Spredningen viser hvor sikkert varselet er.

**Kaos (sommerfugleffekten):** At små forskjeller i startverdiene kan gi store forskjeller senere.

**MEPS:** Ensemblemodellen for værvarsling fra MetCoOp, med ruter på 2,5 km over Skandinavia, Finland og Baltikum.

**AROME-Arctic:** MET sin værmodell for Svalbard, Nord-Norge og havområdene rundt, med ruter på 2,5 km.

**Norkyst:** MET sin havmodell for norskekysten, med ruter på ca. 800 meter.

**Jordsystemmodell:** En klimamodell som også har atmosfærekjemi og kretsløp for stoffer som karbon.

**NorESM:** Den norske jordsystemmodellen, utviklet av NorESM-konsortiet ledet av MET og NORCE.

## Sammendrag

```widget
SammendragModeller
```

## Test deg selv

```widget
QuizModeller
```

