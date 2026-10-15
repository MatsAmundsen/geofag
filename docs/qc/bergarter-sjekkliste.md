# QC-sjekkliste for bergarter-modellene

Gjelder siden `/geofag-1/bergarter` i TanStack Start-appen. Grunnlaget er main-commit `f38ac70` (merge av PR 169). Skriptene endrer ikke app-kode, md-tekst eller CMS/seed. De skal kjøres på senere PR-er fra DesignBOT (nye animerte modeller og felles prosess-kit) før figurene godkjennes.

Forutsetning: lokal server på `http://127.0.0.1:8080` (`npm run dev`). Nettleseren er `CHROME_PATH` hvis den er satt, ellers Playwrights Chromium. `Source Sans 3` må laste. Uten den avbryter skriptet, så et grunnlag ikke blir tatt med reservefont.

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

Bildene er **stillbilder av sluttfasen i steget**. Før eksponering trykkes stegknappen, som setter klokken til fase 1 og pauser avspilling (`pickStep`). CSS-animasjoner fryses i selve eksponeringen (`animations: "disabled"`). Det gjør pikseldiffen stabil. At klokken faktisk går, og at den stopper, sjekkes i punkt 5, ikke i bildene.

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

**Godkjent** når oppsummeringen viser `avvik: 0`, `mangler i kjøring: 0` og `nye mot grunnlag: 0`. Like byte-filer telles som like uten diff-bilde. Ulik PNG-innpakning med samme piksler telles også som like.

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

Måles ved **390 px** med **CPU-throttling 4×**, én figur om gangen, **8 sekunder** avspilling etter at den er scrollet inn i visningen. De andre figurene er pauset. `prefers-reduced-motion` er på, og figuren startes med knappen, så bare den klokken går.

Per figur:

- **taskMs** — økning i Chrome `TaskDuration` (hovedtråd) i vinduet
- **scriptMs** — økning i `ScriptDuration`
- **longTaskCount / longTaskMaxMs** — `PerformanceObserver` `longtask` (over 50 ms)
- **frameP95Ms** — 95-persentil av tiden mellom `requestAnimationFrame`
- **scriptPerFrameMs** — `scriptMs / antall frames`

Målesløyfens egen `requestAnimationFrame` ligger inni tallene. Grensene i `docs/qc/bergarter-budsjett.json` er målingen på `f38ac70` ganget med **1,5** og rundet opp. En figur uten budsjett feiler. Nye modeller må få en linje i budsjettfilen, ikke arve den tyngste naboen i det stille.

**Bevegelse**, samme kommando, uten throttle:

- Med `prefers-reduced-motion` står figuren i **Start animasjon**. `data-step` og klokken går ikke før brukeren starter.
- Etter Start, mens figuren er i visning, stiger rAF minst 15 kall/s over hvilen.
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
- Grunnlag, etiketter og budsjett: `docs/qc/` (se måleresultatene under etter at grunnlagskjøringen er skrevet inn)
- Ferske bilder og axe/perf-JSON: `docs/qc/bergarter-current/` (ikke i git)
- Diff-bilder: `docs/qc/bergarter-diff/` (ikke i git)

## Målt på f38ac70

Tallene fylles inn fra grunnlagskjøringen og skal stå her før sjekklisten regnes som komplett.
