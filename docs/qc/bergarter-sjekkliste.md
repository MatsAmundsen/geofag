# QC-sjekkliste for bergarter-modellene

Gjelder siden `/geofag-1/bergarter` i TanStack Start-appen. Grunnlaget er main-commit `f38ac70` (merge av PR 169). Skriptene endrer ikke app-kode, md-tekst eller CMS/seed. De skal kjøres på senere PR-er fra DesignBOT (nye animerte modeller og felles prosess-kit) før figurene godkjennes.

Forutsetning: lokal server på `http://127.0.0.1:8080` (`npm run dev`). Nettleseren er `CHROME_PATH` hvis den er satt, ellers system-Chrome (`/usr/bin/google-chrome-stable`), ellers Playwrights Chromium. `Source Sans 3` må laste. Uten den avbryter skriptet, så et grunnlag ikke blir tatt med reservefont.

```bash
node scripts/qc-bergarter.mjs compare
node scripts/qc-bergarter.mjs labels
node scripts/qc-bergarter.mjs axe
node scripts/qc-bergarter.mjs perf
```

Hele løpet, med avslutningskode 0 bare når alle fire er grønne mot grunnlaget:

```bash
node scripts/qc-bergarter.mjs all
```

Felles flagg: `--url`, `--widths 390,768,1024,1280`, `--only Diagenese`.

## 1. Grunnlagsbilder

Hver `<figure>` på siden, pluss bildet `fig-tre-bergarter.jpg`, tas ved **390, 768, 1024 og 1280 px**, både med `prefers-reduced-motion: reduce` og med `no-preference`.

Stegmodeller får i tillegg ett bilde per stegknapp. Steinlab får også ripe-verktøyene, som dukker opp når «Ripetest» er valgt. Fotografiet «Forvitring på stedet» har ingen steg.

Bildene er **stillbilder av sluttfasen i steget**. Før eksponering trykkes stegknappen, som setter klokken til fase 1 og pauser avspilling (`pickStep`). CSS-animasjoner fryses i selve eksponeringen (`animations: "disabled"`). Figuren rulles slik at hjørnet lander på hele piksler, og fokusring tegnes ikke. Det gjør pikseldiffen stabil. At klokken faktisk går, og at den stopper, sjekkes i punkt 5, ikke i bildene.

Filnavn: `docs/qc/bergarter-baseline/{bredde}/{reduce|no-preference}/{indeks}-{slug}/default.png` og `steg-01-….png`. Manifestet ligger ved siden av bildene.

Ta nytt grunnlag bare når en visuell endring er godkjent:

```bash
node scripts/qc-bergarter.mjs capture --out docs/qc/bergarter-baseline
```

Store PNG-er kan ligge utenfor git. Stien skal stå i avsnittet «Hvor filene ligger» under. Sammenligningen leser `--baseline` (standard `docs/qc/bergarter-baseline`).

## 2. Piksel-sammenligning (én kommando)

```bash
node scripts/qc-bergarter.mjs compare
```

Kommandoen tar de samme bildene på gjeldende branch, sammenligner **piksel for piksel** med grunnlaget, skriver diff-bilder (avvik i rødt, resten nedtonet) til `docs/qc/bergarter-diff/` og en kort oppsummering til stdout og `summary.txt`.

**Godkjent** når oppsummeringen viser `avvik: 0`, `mangler i kjøring: 0` og `nye mot grunnlag: 0`. Like byte-filer telles som like uten diff-bilde. Ulik PNG-innpakning med samme piksler telles også som like. En piksel under 13 i kanalavvik telles ikke. Inntil 24 piksler der største kanalavvik er høyst 64, regnes som kantskvulp og er fortsatt `lik`. En hel kantlinje eller en flyttet etikett er mange flere piksler og blir `avvik`.

Katalogene `docs/qc/bergarter-current/` og `docs/qc/bergarter-diff/` er gitignorert.

## 3. Etiketter

```bash
node scripts/qc-bergarter.mjs labels
```

Bruker `scanFigureInPage` fra `scripts/diagram-label-hit.mjs` på hver figur og hver bredde. Den melder:

- **covered** — tekst dekket av et annet element
- **overlap** — to etiketter skjærer hverandre
- **clip** — tekst utenfor svg-boksen
- **stroke** — strek gjennom glyffene
- **unhittable** — prøvepunktene treffer ikke teksten

Skriftstørrelsen er **rendret CSS-piksel**: `getComputedStyle(font-size) × (svg-bredde / viewBox-bredde)`. Det er den størrelsen leseren ser. `getComputedStyle` alene følger viewBox-enhetene og ser større ut enn glyffene. Tallmerker og listen under figuren på smal skjerm er med. Tekst med opacity under 0,05 er ikke med.

**Krav for en figur som endres:** minste etikett ved **390 px er minst 12 px**.

**Grønt mot grunnlaget:** ingen nye treff utover `docs/qc/bergarter-label-baseline.json`, og ingen figur har fått mindre skrift enn der (slakk 0,3 px). Kjente brudd på 12 px på `f38ac70` er listet under og skal ikke bli verre. `--strict` feiler i tillegg så lenge noe på 390 px er under 12 px.

```bash
node scripts/qc-bergarter.mjs labels --write-baseline
node scripts/qc-bergarter.mjs labels --strict
```

Etikettkjøringen bruker `prefers-reduced-motion`, så klokken ikke flytter glyffer mens trefftesten går.

Når en scrubber med fine steg kommer inn i prosess-kitet, vil `diagram-label-hit` kombinere alle range-verdier med alle knapper. Sjekk at produktet ikke eksploderer før en slik PR merges. Kjør da `--only` på den ene figuren.

## 4. axe WCAG 2.2 AA

```bash
node scripts/qc-bergarter.mjs axe
```

Kjører axe med taggene `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` og `wcag22aa` ved 390 og 1280 px. Full JSON skrives til `docs/qc/bergarter-current/axe.json`.

**Kjent grunnlinje, regnes ikke som nye funn:**

- `label-content-name-mismatch` der noden er lenken med `aria-label="Gå til hovedforsiden"` (logoen «Geofag» / «Forside»). Synlig tekst og tilgjengelig navn er ulike.
- `listitem` der noden ligger i en quiz (`role="radio"` / `radiogroup`). Alternativene er `li` inni `ul role="radiogroup"`, og den listen er ikke lenger en liste for axe.

Et funn med samme regel-id et annet sted er nytt og feiler. Andre regel-id feiler.

## 5. CPU, long tasks og at animasjonen stopper

```bash
node scripts/qc-bergarter.mjs perf
node scripts/qc-bergarter.mjs perf --write-budget
```

Måles ved **390 px** med **CPU-throttling 4×**, én figur om gangen, **8 sekunder** avspilling etter at den er scrollet inn i visningen. De andre figurene er pauset. `prefers-reduced-motion` er på, og figuren startes med knappen, så bare den klokken går. Silikatgruppene og fotografiet «Forvitring på stedet» har ingen Start-knapp og er ikke med i budsjettet.

Per figur:

- **taskMs** — økning i Chrome `TaskDuration` (hovedtråd) i vinduet
- **scriptMs** — økning i `ScriptDuration`
- **longTaskCount / longTaskMaxMs** — `PerformanceObserver` `longtask` (over 50 ms)
- **frameP95Ms** — 95-persentil av tiden mellom `requestAnimationFrame`
- **scriptPerFrameMs** — `scriptMs / antall frames`

Målesløyfens egen `requestAnimationFrame` ligger inni tallene. Grensene i `docs/qc/bergarter-budsjett.json` er den høyeste av to målinger på `f38ac70`, ganget med **1,5** og rundet opp. `longTaskCount` har gulv 4 og `longTaskMaxMs` gulv 120 ms, så ett kort GC-stopp ikke feiler en figur som målte null long tasks. En figur uten budsjett feiler. Nye modeller må få en linje i budsjettfilen, ikke arve den tyngste naboen i det stille.

`taskMs` nær 8000 betyr at hovedtråden var opptatt hele vinduet under 4×. Et tak over 8000 kan derfor ikke fange en enda tettere hovedtråd i samme vindu. Det som skiller en tyngre modell, er long tasks, frame-tid og script per frame.

**Bevegelse**, samme kommando, uten throttle:

- Med `prefers-reduced-motion` står figuren i **Start animasjon**. `data-step` og klokken går ikke før brukeren starter.
- Etter Start, mens figuren er i visning, stiger rAF minst 15 kall/s over hvilen. Faller telleren, eller er hovedtråden nesten ledig etter Start, tar skriptet figuren på nytt én gang. Det fanger en omlasting fra dev-serveren.
- Når figuren scrolles mer enn 120 px utenfor viewport (samme margin som `useInView`), faller rAF tilbake til hvilen (slakk +12/s), og `data-step` er uendret etter ytterligere 5,5 s. Det er lengre enn holdetiden på 4 s, så en klokke som fortsatt går rekker å bytte steg.
- «Følg en norsk bergart» og Steinlab animerer uten å bytte `data-step`. For dem er rAF-fallet beviset.

## 6. aria-live

Sjekkes sammen med `perf`, på hver figur som har Start/Pause.

| Tilstand | Krav |
| --- | --- |
| Avspilling pågår | `aria-live="off"` på statuslinjen, så stegene ikke leses opp i ett sett |
| Brukeren velger et steg | valget kaller `pickStep`, som pauser avspillingen |
| Etter valget | knappen sier «Start animasjon» og statuslinjen er `aria-live="polite"` |

Silikatgruppene har steg, men ingen avspillingsklokke. Der er statuslinjen `polite` hele tiden. Det er ikke et brudd.

## Godkjenning av en DesignBOT-PR

1. `compare` er grønn, eller hvert avvik er et bilde av figuren PR-en skulle endre, og diffen er sett på.
2. `labels` er grønn mot etikettsgrunnlaget. Figuren som er endret, har minste etikett **≥ 12 px ved 390 px** (`labels --strict` på den figuren via `--only`, eller tallet i oppsummeringen).
3. `axe` har ingen nye funn utover logo og quiz-listitem.
4. `perf` holder budsjettet. En tyngre modell får nytt tak i budsjettfilen, med målte tall i PR-teksten, ikke et stille hopp.
5. Bevegelse og aria-live i `perf` er uten feil: pauset ved redusert bevegelse, stopp utenfor skjermen, `off` under avspilling, `polite` etter valg, og valget pauser.

Oslorift-figuren deles med Norges geologi. En PR som endrer den komponenten, bør også åpne `/geofag-1/norges-geologi` og se at riftdalen der ikke har fått en utilsiktet endring.

## Hvor filene ligger

- Skript: `scripts/qc-bergarter.mjs`, `scripts/qc-bergarter-png.mjs`, enhetstester i `scripts/qc-bergarter.test.mjs`
- Etikettsjekkens trefftest: `scripts/diagram-label-hit.mjs` (`scanFigureInPage`)
- Grunnlag: `docs/qc/bergarter-baseline/` (600 PNG, om lag 70 MB i arbeidskopien, om lag 35 MB unikt innhold fordi mange reduce- og no-preference-bilder er like). Bildene er med i git så `compare` virker på en ny branch. Manifestet har `appCommit` `f38ac70`.
- Etiketter: `docs/qc/bergarter-label-baseline.json`
- Budsjett: `docs/qc/bergarter-budsjett.json`
- Ferske bilder og axe/perf-JSON: `docs/qc/bergarter-current/` (ikke i git)
- Diff-bilder: `docs/qc/bergarter-diff/` (ikke i git)

## Målt på f38ac70

Appkoden er uendret fra `f38ac70`. To pikselkjøringer av de 600 bildene ga `avvik: 0` (3 bilder hadde kantskvulp innenfor grensen på 24 piksler / kanalavvik 64). Etiketter kjørt to ganger: ingen nye funn mot eget grunnlag. axe: 0 nye. Bevegelse og aria-live: uten feil på alle ti figurer med Start/Pause. Perf-budsjettet er den høyeste av to CPU-målinger.

### Minste etikett ved 390 px

Kravet for en figur som endres, er minst 12 px. Fire figurer på grunnlaget er under det:

| Figur | Min px | Minste tekster |
| --- | --- | --- |
| Silikatgruppene | 12 | Isolert, Olivin, Kjeder, Sjikt, Rammeverk |
| Steinlab | 12 | prøvenavn og «Fortynnet saltsyre» |
| Forvitring på stedet | – | fotografi, ingen svg-tekst |
| Avkjøling styrer kornstørrelsen | 14 | tallmerker |
| Osloriften | 14 | tallmerker |
| Magmatisk differensiering | 6,8 | «Sidebergart», «Mørke krystaller (olivin, pyroksen)» |
| Diagenese | 5,8 | «Nye lag presser ned» |
| Kontakt- og regional metamorfose | 3,5 | «Zoom: hornfels», «Zoom: glimmerflak» |
| Ioner byttes i fast berg | 6,3 | «Opprinnelig sammensetning», «Varm porevæske langs korngrensen», «Ny sammensetning» |
| Metamorfose: fra leirskifer til gneis | 14 | tallmerker |
| Bergartssyklusen i et snitt | 14 | tallmerker |
| Følg en norsk bergart | 12,4 | «Magma», «Magmatisk bergart», «Sediment» med flere |

### Kjente etikettfunn (stroke)

Ingen covered, overlap, clip eller unhittable. Strek gjennom tekst:

- 390 px, Avkjøling: «3» (5 tilstander)
- 390 og 768 px, Bergartssyklusen: «3» og «4» (7 tilstander hver)
- 768 px, Metamorfose leirskifer til gneis: «3» (5 tilstander)
- 768, 1024 og 1280 px, Kontakt- og regional metamorfose: «Zoom: hornfels» (7 tilstander)

### axe

Ved 390 og 1280 px, med synlig header: 4 kjente funn, 0 nye.

- `label-content-name-mismatch`, 1 node per bredde: logo-lenken med `aria-label="Gå til hovedforsiden"`
- `listitem`, 48 noder per bredde: quiz-alternativer (`ul` med `role="radiogroup"` / `aria-labelledby` som slutter på `-qN-prompt`, knapper med `role="radio"`)

### CPU, 4× throttle, 390 px, 8 s

Første måling / andre måling. rAF utenfor skjermen var 0/s og aria-live var `off` under avspilling og `polite` etter valg i begge kjøringene. Hvile-rAF var 0/s fordi `prefers-reduced-motion` holder klokkene pauset.

| Figur | task ms | script ms | long tasks (maks ms) | frame p95 ms | script/frame ms |
| --- | --- | --- | --- | --- | --- |
| Steinlab | 7691 / 7745 | 7438 / 7507 | 38 (176) / 44 (227) | 100 / 116,7 | 27 / 31,7 |
| Avkjøling | 6915 / 6311 | 5801 / 5323 | 33 (107) / 14 (68) | 83,4 / 33,4 | 18 / 12,5 |
| Osloriften | 6327 / 6025 | 5761 / 5468 | 2 (62) / 0, og 13 (93) i en tredje kjøring | 33,3 / 16,8 | 13,1 / 12,1 |
| Differensiering | 6168 / 5560 | 4607 / 4144 | 0 / 0 | 33,3 / 16,8 | 10,7 / 8,7 |
| Diagenese | 6691 / 6770 | 4178 / 4366 | 0 / 2 (88) | 66,6 / 50 | 13,5 / 12,5 |
| Kontakt og regional | 6659 / 6949 | 4317 / 4747 | 0 / 0 | 33,4 / 33,4 | 10,6 / 11,4 |
| Ioner byttes | 5342 / 4633 | 5012 / 4322 | 0 / 1 (60) | 16,8 / 16,7 | 10,5 / 9,1 |
| Metamorfose leirskifer–gneis | 7987 / 7992 | 5212 / 7603 | 27 (583) / 46 (419) | 883,3 / 366,7 | 248,2 / 169 |
| Bergartssyklusen | 7455 / 6857 | 5498 / 4769 | 7 (60) / 0 | 66,7 / 50,1 | 20,7 / 15,9 |
| Følg en norsk bergart | 7483 / 7658 | 4223 / 3943 | 0 / 0 | 33,4 / 50,1 | 9,8 / 13,7 |

Metamorfose hadde ett langt stopp på 583 ms i første kjøring. Det trekker frame p95 opp. Budsjettet tåler det, og en ny modell bør ikke legge seg på det taket uten at tallet er sett på.

Foreslåtte tak (høyeste måling × 1,5, med gulvene over) står i `docs/qc/bergarter-budsjett.json`. Kortversjon:

| Figur | task | script | long (maks) | frame p95 | script/frame |
| --- | --- | --- | --- | --- | --- |
| Steinlab | 11650 | 11300 | 67 (350) | 180 | 47,6 |
| Avkjøling | 10400 | 8750 | 51 (175) | 130 | 27 |
| Osloriften | 9500 | 8650 | 21 (120) | 50 | 19,7 |
| Differensiering | 9300 | 6950 | 4 (120) | 50 | 16,1 |
| Diagenese | 10200 | 6550 | 4 (150) | 100 | 20,3 |
| Kontakt og regional | 10450 | 7150 | 4 (120) | 55 | 17,1 |
| Ioner byttes | 8050 | 7550 | 4 (120) | 30 | 15,8 |
| Metamorfose leirskifer–gneis | 12000 | 11450 | 70 (875) | 1325 | 372,3 |
| Bergartssyklusen | 11200 | 8250 | 12 (120) | 105 | 31,1 |
| Følg en norsk bergart | 11500 | 6350 | 4 (120) | 80 | 20,6 |
