# Ytelsesplan for mobil

Målt med Lighthouse mobil: forsiden har ytelse 68, 7,8 MB overført og LCP 8,2 s. `/tema/coriolis` har ytelse 55, LCP 9,5 s og CLS 0,135–0,158. Denne planen endrer ikke fagtekst. Den beskriver hva som bør gjøres, i hvilken rekkefølge, og hva som kan gå galt.

KaTeX er ikke en avhengighet i prosjektet. Formler skrives som vanlig tekst og `font-mono` (for eksempel i `src/routes/tema/coriolis.tsx`). Kostnaden som ligner på «mattebibliotek» er SVG-diagrammer og interaktive modeller, ikke et formelbibliotek.

## Mål

Målene gjelder mobil, simulert 4G, etter at tiltakene under er inne.

| Mål | Nå | Mål |
| --- | --- | --- |
| LCP | 8,2 s (forside), 9,5 s (`/tema/coriolis`) | under 2,5 s |
| CLS | 0,135–0,158 på `/tema/coriolis` | under 0,1 |
| Overført på forsiden | 7,8 MB | under 1,5 MB |
| Rendringsblokkering fra fonter | opptil ca. 1,4 s | ingen blokkerende font-CSS fra tredjepart |
| Tredjepartscookie fra `extensions.js` | settes på offentlige sider | ikke satt for vanlige besøkende |

INP bør holde seg under 200 ms. Det er ikke målt i gjennomgangen, men late modeller og mindre JS er det som påvirker det.

## 1. Slå av bakgrunnsvideo på mobil

**Hvorfor først.** Forsiden laster to videoer som spiller automatisk i loop: `public/videos/hero-volcano.mp4` (3,7 MB) og `public/videos/hero-tornado.mp4` (2,2 MB). Sammen er det omtrent 5,9 MB, mesteparten av de 7,8 MB som ble overført. LCP på 8,2 s henger sammen med at forsiden venter på disse filene. Stillbildene finnes allerede som poster: `public/images/hero-volcano.jpg` (911 KB) og `public/images/hero-tornado.jpg` (541 KB).

**Filer.** `src/routes/index.tsx`. Videoene ligger i de to `<article>`-blokkene i `Hub`, med `autoPlay`, `loop` og `preload="metadata"`.

**Tiltak.** På smal skjerm og ved `prefers-reduced-motion` vises bare stillbildet. Video kan starte etter første interaksjon, eller bare fra `md` og opp. Sett `preload="none"` når videoen ikke er LCP. `motion-reduce:hidden` finnes allerede, men den stopper ikke nedlastingen.

**Effekt.** Forsiden kan miste rundt 6 MB og få LCP ned mot stillbildet i stedet for et 10-sekunders loop. Det er det største enkeltgrepet mot LCP under 2,5 s.

**Risiko.** Forsiden mister bevegelse på mobil. Stillbildene og lenkene til Geofag 1 og 2 blir stående. Test at video fortsatt kan spille på desktop, og at redusert bevegelse ikke laster filene.

`public/videos/jordens_kosmiske_urverk.mp4` er 18 MB og er ikke referert i kildekoden. Den bør ikke følge med i deploy før noen side faktisk bruker den.

## 2. Ikke last `extensions.js` for vanlige besøkende

**Hvorfor.** `https://grok.com/grok-app-builder/extensions.js` settes inn i hvert HTML-dokument. Skriptet kommer fra en annen opprinnelse, kan blokkere hovedtråden, og setter en cookie. Det er ikke nødvendig for å lese fagteksten.

**Filer.** `scripts/grok-pwa-shared.mjs` (`GROK_EXTENSIONS_SCRIPT_SRC`, `grokExtensionsHeadTags`), `scripts/grok-pwa-plugin.mjs` (injeksjon i dev) og `server/middleware/grok-pwa.ts` (injeksjon i deploy via `injectHeadStreaming`). `src/components/preview-host-bridge.tsx` gjør allerede ingenting når siden ikke ligger i forhåndsvisningen.

**Tiltak.** Last skriptet bare når siden faktisk kjører inne i byggeren (samme signal som forhåndsvisningsbroen). På det offentlige nettstedet skal taggen ikke være i `<head>`. Hvis plattformen krever skriptet i byggermiljøet, behold det der, men ikke på geofag.com for elever.

**Effekt.** Én mindre tilkobling, ingen tredjepartscookie for vanlige besøk, og litt mindre arbeid på hovedtråden før LCP.

**Risiko.** Forhåndsvisning og «Created with Grok»-krom i byggeren kan slutte å virke hvis vilkåret er feil. Test både innebygd forhåndsvisning og et vanlig besøk. Ikke fjern PWA-manifestet i samme endring.

## 3. Selvhost fonter, forhåndslast bare det som trengs

**Hvorfor.** `src/routes/__root.tsx` har en render-blokkerende stilark-lenke til Google Fonts (Fraunces 500/600 og Source Sans 3 400/500/600 pluss kursiv 400), pluss `preconnect` til `fonts.googleapis.com` og `fonts.gstatic.com`. URL-en har `display=swap`, men selve CSS-en blokkerer likevel første tegning. Målingen viser opptil ca. 1,4 s. `swap` bytter også skrifttype etterpå og bidrar til CLS.

**Filer.** `src/routes/__root.tsx` (lenkene i `head`) og `src/styles.css` (`--font-sans`, `--font-display`).

**Tiltak.**

- Legg woff2-filene i `public/fonts/` (eller importer dem slik at Vite hasher filnavnet).
- Behold `font-display: swap`, men sett en fallback med `size-adjust`, `ascent-override` og `descent-override` som ligger nær Fraunces og Source Sans 3, så byttet ikke flytter linjer.
- Forhåndslast bare brødtekst-snittet (Source Sans 3, 400) og ett display-snitt til `h1`. Ikke forhåndslast kursiv og alle vekter.
- Fjern Google-lenkene og `preconnect` når filene ligger på eget domene.

**Effekt.** Fjerner den blokkerende tredjepartsforespørselen og kutter en tydelig CLS-kilde. Sammen med punkt 1 er dette det som skal få LCP under 2,5 s på temasider, der bannerbildet er LCP.

**Risiko.** Feil `size-adjust` gir fortsatt hopp. Subsetting som dropper norske tegn (æ, ø, å) synes med en gang i brødtekst. Test en side med overskrift og en side med kursiv i kildelisten.

## 4. Bilder: AVIF/WebP, srcset og riktig prioritet

**Hvorfor.** `public/images/` har 107 JPEG og ingen AVIF eller WebP. Flere filer er rundt 0,9–1,1 MB. Banneret på Coriolis er `public/images/banner-coriolis.jpg` (767 KB) og vises i full bredde selv på 390 px. Lighthouse anslo at banneret kunne vært omtrent 1 MB mindre. Det stemmer med at nettleseren laster hele JPEG-en uten `srcset`.

**Filer.**

- LCP-banner: `src/components/topic-layout.tsx` (`<img fetchPriority="high">` uten `srcset`, `sizes` eller bredde/høyde).
- Forside: `src/routes/index.tsx` (heltebilder, `fetchPriority="high"` bare på vulkanbildet).
- Figurer: `src/components/photo-figure.tsx` og `src/components/markdown.tsx` (`loading="lazy"`, men fast `src` og ingen `srcset`).
- Bildelisten som velger figur: `src/lib/poster-figures.ts`.

**Tiltak.**

- Lag AVIF og WebP i minst to bredder (for eksempel 640 og 1280) for banner, heltebilder og de største figurene.
- `srcset` + `sizes`. Banneret i `topic-layout` er inntil `max-w-4xl`, så `sizes` kan være `(min-width: 896px) 896px, 100vw`.
- Behold `fetchpriority="high"` bare på LCP-bildet (banneret på temasider, ett stillbilde på forsiden). Alle andre bilder skal ha `loading="lazy"` og `decoding="async"`.
- Sett `width` og `height` (eller behold et fast sideforhold, slik `aspect-video` allerede gjør i `PhotoFigure`) så ikke bildet skyver teksten ned.

**Effekt.** Banneret på mobil kan typisk falle fra flere hundre kilobyte til godt under 150 KB. Det er den direkte oppfølgingen av «banneret kunne vært ~1 MB mindre», og det trekker LCP på `/tema/coriolis`.

**Risiko.** Feil `sizes` laster fortsatt det store bildet. AVIF uten JPEG-reserve feiler i gamle nettlesere; behold JPEG som siste `<source>`-fallback. Ikke sett `lazy` på LCP-bildet.

## 5. CLS under 0,1

**Hvorfor.** 0,135–0,158 på `/tema/coriolis` er over grensen på 0,1. Banneret ligger `absolute` i en header med `min-h-72`, så selve høyden på toppen er reservert. Det som fortsatt flytter innhold, er først og fremst fontbyttet (punkt 3) og bilder uten reservert boks.

**Filer.** `src/routes/__root.tsx`, `src/styles.css`, `src/components/topic-layout.tsx`, `src/components/photo-figure.tsx`, `src/components/markdown.tsx`, `src/components/figure-frame.tsx`.

**Tiltak.**

- Fallback-metrikker som i punkt 3.
- Eksplisitt bredde og høyde, eller et stabilt sideforhold, på hvert innholdsbilde.
- Ikke sett inn innhold over eksisterende tekst etter hydrering. Modeller under folden skal reservere minst like mye høyde som den ferdige rammen (`FigureFrame` / `ModelFrame`).
- Scroll-hintet «Sveip →» som ble lagt inn for tabellene er `position: absolute` og skal ikke bidra til CLS. Ikke flytt det inn i dokumentflyten.

**Effekt.** CLS under 0,1 på `/tema/coriolis` og tilsvarende temasider.

**Risiko.** For stort reservert område gir tomrom. Mål CLS på nytt på forsiden, `/tema/coriolis` og `/geofag-1/vulkaner` etter font- og bildeendringen, ikke bare på én side.

## 6. Mindre JavaScript og seinere hydrering

**Hvorfor.** TanStack Start sender HTML og hydrerer hele ruten. `/tema/coriolis` importerer diagrammene og `CoriolisModel` direkte i `src/routes/tema/coriolis.tsx`. Modellen ligger langt nede på siden, men koden lastes med ruten. `src/components/diagrams/index.ts` er en tønne som reeksporterer alle diagrammer. `"sideEffects": false` i `package.json` lar Vite kutte ubrukte eksporter, men alt ruten faktisk importerer, havner i den klientpakken.

**Filer.** `src/routes/tema/coriolis.tsx` og de andre rute-filene som importerer `@/components/models/*` på samme måte. Modellen selv: `src/components/models/coriolis-model.tsx`. Felles skall: `src/components/models/model-chrome.tsx` (samme mønster i de andre modellene).

**Tiltak.**

- `React.lazy` + `Suspense` for modeller under folden, med en plassholder i samme høyde som rammen.
- Importer diagrammet fra sin egen fil (`@/components/diagrams/coriolis`) der ruten bare trenger noen få, slik at tønna ikke trekker med søskenmoduler hvis tre-risting skulle feile.
- Ikke hydrér quiz og modeller før de er i nærheten av viewport, eller før noen åpner dem.
- Mål rute-pakken etterpå. I dagens produksjonsbygg er `poster-body` ca. 909 KB (247 KB gzip) og coriolis-ruten ca. 60 KB (17 KB gzip), mens Leaflet ligger i en egen chunk på ca. 160 KB. Målet er at første JS på en temaside ikke inkluderer Leaflet, modeller eller eksamensdata.

**Effekt.** Raskere hydrering og lavere INP. LCP blir bare bedre hvis JS i dag konkurrerer med bildet. Det gjør den på Coriolis, ved siden av banner og fonter.

**Risiko.** Lazy-grenser som mangler en plassholder, gir CLS. Test at modellen fortsatt virker uten JavaScript-feil etter rutebytte, og at SEO-teksten fortsatt er i den første HTML-en (den skal ikke ligge bare i den late modellen).

## 7. Kart, diagrammer og formler

**Kart.** `src/components/geo-map.tsx` laster `src/components/geo-map-leaflet.tsx` med `React.lazy` og `ClientOnly`, fordi Leaflet leser `window` ved import. Det er riktig mønster. Flisene kommer fra OpenStreetMap først når kartet tegnes. Ikke importer `geo-map-leaflet` statisk fra en rute. Sider uten kart skal ikke ha Leaflet i pakken.

**Diagrammer.** De er inline SVG i React (`src/components/diagrams/`). De er billige å overføre, men dyre å hydrere når fila er stor og full av tilstand (`useState` i for eksempel `src/components/diagrams/volcanoes.tsx`). Statiske figurer kan være rene SVG-er uten tilstand. Behold tilstand bare der eleven faktisk drar i en kontroll.

**Formler.** Ikke legg inn KaTeX globalt. Dagens formler er tekst. Hvis ekte matte-setting trengs senere, last KaTeX-CSS og bare de nødvendige fontfilene på de rutene som har formler, ikke i `__root.tsx`.

**Effekt.** Unngår en ny blokkerende CSS- og fontpakke, og holder kartet unna sider som ikke viser kart.

**Risiko.** Å gjøre et interaktivt diagram om til statisk SVG fjerner kontroller. Gjør det bare der kontrollen ikke brukes i undervisningen.

## 8. Cache-headere på Cloudflare

**Hvorfor.** `wrangler.toml` serverer statiske filer via `[assets]` uten egne cache-headere. HTML for `/poster` settes til `no-store` i `server/middleware/grok-pwa.ts`. Vanlig HTML og filer i `public/` (bilder og video uten hash i navnet) har ingen eksplisitt og lang levetid. Hashede Vite-filer tåler lang cache. Uhashede JPEG-er gjør det ikke, hvis de byttes ut med samme URL.

**Filer.** `wrangler.toml` (`[assets]`) og `server/middleware/grok-pwa.ts`.

**Tiltak.**

- JS og CSS med innholdshash: `Cache-Control: public, max-age=31536000, immutable`.
- HTML: kort levetid eller `no-cache` slik at ny deploy synes. Behold `no-store` på `/poster`.
- Bilder og video i `public/`: enten fingeravtrykk i filnavnet når fila byttes, eller `max-age` på noen timer. Ikke `immutable` på URL-er som kommer til å peke på en ny fil.
- Fontfiler med hash: samme ettårs-cache som JS.

**Effekt.** Returbesøk slipper å laste JS, fonter og bilder på nytt. Første besøk blir ikke raskere av cache alene, derfor kommer dette etter video, fonter og bilder.

**Risiko.** `immutable` på en uhashet URL gjør at en rettet figur ikke når elevene før cachen dør. Sjekk responshodene på en hashed chunk, en JPEG og et HTML-dokument etter deploy.

## Rekkefølge

1. Video av på mobil, og ikke deploy den ubrukte 18 MB-filen.
2. `extensions.js` bare i byggeren.
3. Selvhostede fonter med forhåndslast og metrisk fallback.
4. AVIF/WebP, `srcset`/`sizes`, `fetchpriority` kun på LCP, lazy på resten.
5. CLS: reserverte bokser og ny Lighthouse-måling mot CLS under 0,1 og LCP under 2,5 s.
6. Lazy modeller og smalere rute-pakker.
7. La kart og eventuelle formler fortsette å være late. Ikke innfør global KaTeX.
8. Cache-headere når filene har stabile, hashede URL-er.

Punkt 1–4 er de raske gevinstene. De treffer de målte tallene (megabyte, LCP, fontblokkering og cookie) uten å skrive om fagteksten.
