import type { FigureId } from "@/lib/eksamen/solution-types";
import {
  AmocDiagram,
  CoriolisDiagram,
  CoriolisLatitudeDiagram,
  DensityDiagram,
  EkmanDiagram,
  GulfVsNacDiagram,
  HadleyCloseupDiagram,
  NaoDiagram,
  PaleoDiagram,
  SeaBreezeDiagram,
  ZonalMeridionalDiagram,
} from "@/components/diagrams";
import { Arrow, C, Diagram, L } from "./svg-kit";

export function ExamFigure({ id }: { id: FigureId }) {
  switch (id) {
    case "wind-low-nh":
      return <WindLowNh />;
    case "pressure-gradient":
      return <PressureGradient />;
    case "ekman-surface":
      return <EkmanDiagram />;
    case "jet-blocking":
      return <ZonalMeridionalDiagram />;
    case "amoc-nadw":
      return <AmocDiagram />;
    case "ts-density":
      return <TsDensity />;
    case "water-masses":
      return <WaterMasses />;
    case "ctd-seasons":
      return <CtdSeasons />;
    case "ice-albedo":
      return <IceAlbedo />;
    case "monster-wave":
      return <MonsterWave />;
    case "perihelion":
      return <Perihelion />;
    case "positive-feedback":
      return <PositiveFeedback />;
    case "coriolis-lat":
      return <CoriolisLatitudeDiagram />;
    case "gulf-nac":
      return <GulfVsNacDiagram />;
    case "atmo-river":
      return <AtmoRiver />;
    case "foehn":
      return <Foehn />;
    case "katabatic":
      return <Katabatic />;
    case "radiation-balance":
      return <RadiationBalance />;
    case "el-nino":
      return <ElNino />;
    case "hurricane-sst":
      return <HurricaneSst />;
    case "nao":
      return <NaoDiagram />;
    case "chlorophyll":
      return <Chlorophyll />;
    case "hurricane-eye":
      return <HurricaneEye />;
    case "spectrum":
      return <Spectrum />;
    case "inland-climate":
      return <InlandClimate />;
    case "land-sea-breeze":
      return <SeaBreezeDiagram />;
    case "convection":
      return <Convection />;
    case "coriolis-deflect":
      return <CoriolisDiagram />;
    case "wave-anatomy":
      return <WaveAnatomy />;
    case "earth-tilt":
      return <EarthTilt />;
    case "thermohaline":
      return <DensityDiagram />;
    case "carbon-cycle":
      return <CarbonCycle />;
    case "westerlies":
      return <Westerlies />;
    case "hadley":
      return <HadleyCloseupDiagram />;
    case "paleo-proxy":
      return <PaleoDiagram />;
    case "density-mix":
      return <DensityMix />;
    case "marine-heatwave":
      return <MarineHeatwave />;
    case "orographic-rain":
      return <OrographicRain />;
    case "wind-low-sh":
      return <WindLowSh />;
    case "wind-low-center":
      return <WindLowCenter />;
    case "eccentricity":
      return <Eccentricity />;
    case "tree-ring":
      return <TreeRing />;
    case "front-rain":
      return <FrontRain />;
    case "snow-crystal":
      return <SnowCrystal />;
    case "ozone-profile":
      return <OzoneProfile />;
    case "jet-flight":
      return <JetFlight />;
    default:
      return null;
  }
}

function WindLowNh() {
  return (
    <Diagram
      title="Vind rundt et lavtrykk på nordlig halvkule"
      heading="Mot klokken inn mot L — X sør for senteret gir sørvest"
      caption="Luft strømmer inn mot lavtrykket og bøyes til høyre. Resultatet er rotasjon mot klokken. Når senteret treffer Nordland, ligger X sør for L. Der peker innsuget inn mot nord og blir sørvestlig. Nordøst, nordvest og øst hører til andre sider av senteret."
      viewBox="0 0 820 400"
    >
      {(m) => (
        <>
          <path
            d="M 520 70 C 560 90, 590 140, 600 200 C 610 270, 580 320, 530 350 L 780 350 L 780 50 Z"
            fill="#1a2620"
          />
          <L x="640" y="90" fill={C.muted} size={13}>
            fastlandet
          </L>
          <circle cx="300" cy="190" r="118" fill="none" stroke={C.dim} strokeWidth="1.2" />
          <circle cx="300" cy="190" r="78" fill="none" stroke={C.dim} strokeWidth="1.2" />
          <g className="exam-spin">
            <path
              d="M 300 72 A 118 118 0 1 0 418 190"
              fill="none"
              stroke={C.low}
              strokeWidth="2.6"
              className="exam-dash"
            />
          </g>
          <circle cx="300" cy="190" r="26" fill="#2a1818" stroke={C.low} strokeWidth="2.4" />
          <L x="300" y="196" fill={C.low} size={20} anchor="middle" weight={700}>
            L
          </L>
          <Arrow d="M 300 72 C 250 90, 220 130, 210 170" marker={m.low} color={C.low} width={2.4} />
          <Arrow d="M 182 190 C 200 250, 250 300, 300 308" marker={m.low} color={C.low} width={2.4} />
          <Arrow d="M 300 308 C 370 300, 418 250, 418 190" marker={m.low} color={C.low} width={2.4} />
          <Arrow d="M 418 190 C 400 130, 350 80, 300 72" marker={m.low} color={C.low} width={2.4} />
          <circle cx="300" cy="318" r="9" fill={C.warm} className="exam-pulse" />
          <L x="318" y="324" fill={C.warm} size={15} weight={600}>
            X · Nordland
          </L>
          <Arrow d="M 210 348 L 286 324" marker={m.warm} color={C.warm} width={3.2} />
          <L x="168" y="372" fill={C.warm} size={14}>
            sørvest → inn mot L
          </L>
          <L x="300" y="48" fill={C.muted} size={13} anchor="middle">
            mot klokken på nordlig halvkule
          </L>
        </>
      )}
    </Diagram>
  );
}

function PressureGradient() {
  return (
    <Diagram
      title="Tette isobarer gir sterk vind"
      heading="Trykkgradient = avstand mellom isobarene"
      caption="Vindstyrken leses av hvor tett trykklinjene ligger, ikke av hvor lavt tallet i senteret er. Der avstanden er liten, er trykkforskjellen per kilometer stor, og vinden sterk."
      viewBox="0 0 820 280"
    >
      {(m) => (
        <>
          {[40, 70, 100, 130].map((y) => (
            <line key={y} x1="60" y1={y} x2="360" y2={y} stroke={C.teal} strokeWidth="1.8" />
          ))}
          <L x="210" y="168" fill={C.teal} size={14} anchor="middle">
            tette isobarer · sterk vind
          </L>
          <polygon points="210,88 218,104 202,104" fill={C.warm} />
          <L x="226" y="102" fill={C.warm} size={13}>
            X
          </L>
          {[40, 88, 136, 184].map((y) => (
            <line key={y} x1="460" y1={y} x2="760" y2={y} stroke={C.muted} strokeWidth="1.6" />
          ))}
          <L x="610" y="228" fill={C.muted} size={14} anchor="middle">
            slake isobarer · svak vind
          </L>
          <Arrow d="M 80 220 L 80 48" marker={m.teal} color={C.teal} width={2} />
          <L x="96" y="140" fill={C.muted} size={12}>
            stor gradient
          </L>
        </>
      )}
    </Diagram>
  );
}

function TsDensity() {
  return (
    <Diagram
      title="Temperatur–salinitet og isopyknaler"
      heading="Les tettheten, ikke bare T og S hver for seg"
      caption="Isopyknalene (linjer med lik tetthet) skråner: kaldt ferskt vann kan veie det samme som varmt salt. En vannmasse som ligger på en høyere tetthetslinje, er tyngre og legger seg under. I T–S-diagrammet vinner den kombinasjonen som treffer den tetteste linjen."
      viewBox="0 0 820 340"
    >
      {() => (
        <>
          <line x1="90" y1="40" x2="90" y2="280" stroke={C.dim} />
          <line x1="90" y1="280" x2="620" y2="280" stroke={C.dim} />
          <L x="50" y="50" fill={C.muted} size={13}>
            T
          </L>
          <L x="620" y="300" fill={C.muted} size={13} anchor="end">
            S
          </L>
          <path d="M 120 80 Q 280 160, 560 250" fill="none" stroke={C.dim} />
          <path d="M 150 120 Q 310 190, 580 270" fill="none" stroke={C.dim} />
          <path d="M 190 170 Q 340 220, 590 286" fill="none" stroke={C.teal} strokeWidth="2" />
          <L x="640" y="120" fill={C.muted} size={13}>
            lavere tetthet
          </L>
          <L x="640" y="250" fill={C.teal} size={13}>
            høyere tetthet
          </L>
          <circle cx="280" cy="150" r="8" fill={C.warm} />
          <L x="294" y="144" fill={C.warm} size={14}>
            B · letter
          </L>
          <circle cx="360" cy="210" r="8" fill={C.cold} />
          <L x="374" y="216" fill={C.cold} size={14}>
            A · tyngre
          </L>
        </>
      )}
    </Diagram>
  );
}

function WaterMasses() {
  return (
    <Diagram
      title="To vannmasser stables etter tetthet"
      heading="A er tyngre enn B og legger seg under"
      caption="Vannmasse A (1 °C, 29,7 PSU) ligger på en høyere isopyknal enn B (−0,8 °C, 29,4 PSU). Den lille salinitetsforskjellen slår den lille temperaturforskjellen. Derfor synker A under B."
      viewBox="0 0 820 260"
    >
      {() => (
        <>
          <rect x="160" y="50" width="220" height="70" rx="8" fill={C.cold} opacity="0.35" />
          <L x="270" y="92" fill={C.fg} size={16} anchor="middle" weight={600}>
            B · letter · oppå
          </L>
          <rect x="160" y="128" width="220" height="80" rx="8" fill={C.teal} opacity="0.45" />
          <L x="270" y="176" fill={C.fg} size={16} anchor="middle" weight={600}>
            A · tyngre · under
          </L>
          <L x="460" y="90" fill={C.muted} size={14}>
            −0,8 °C · 29,4 PSU
          </L>
          <L x="460" y="174" fill={C.muted} size={14}>
            1,0 °C · 29,7 PSU
          </L>
        </>
      )}
    </Diagram>
  );
}

function CtdSeasons() {
  return (
    <Diagram
      title="CTD-profiler i april og august"
      heading="April er gjennomblandet, august er sjiktet"
      caption="April: kaldt, ofte saltere i toppen, liten gradient med dypet — vinterblanding. August: varmt og ferskere i de øverste meterne (sol og smeltevann), kaldere og saltere under. Temperaturprofil B + salinitet C hører april. A + D hører august."
      viewBox="0 0 820 320"
    >
      {() => (
        <>
          <L x="210" y="36" size={16} anchor="middle" weight={600}>
            April
          </L>
          <L x="610" y="36" size={16} anchor="middle" weight={600}>
            August
          </L>
          <rect x="80" y="56" width="260" height="220" rx="8" fill="#152028" />
          <rect x="80" y="56" width="260" height="220" fill={C.cold} opacity="0.18" />
          <L x="210" y="110" fill={C.cold} size={14} anchor="middle">
            kald · lik T og S
          </L>
          <L x="210" y="140" fill={C.muted} size={13} anchor="middle">
            gjennomblandet
          </L>
          <L x="210" y="180" fill={C.teal} size={14} anchor="middle">
            B + C
          </L>
          <rect x="480" y="56" width="260" height="220" rx="8" fill="#152028" />
          <rect x="480" y="56" width="260" height="70" fill={C.warm} opacity="0.35" />
          <L x="610" y="96" fill={C.warm} size={14} anchor="middle">
            varm og fersk
          </L>
          <rect x="480" y="160" width="260" height="116" fill={C.cold} opacity="0.22" />
          <L x="610" y="220" fill={C.cold} size={14} anchor="middle">
            kaldere under
          </L>
          <L x="610" y="250" fill={C.teal} size={14} anchor="middle">
            A + D
          </L>
        </>
      )}
    </Diagram>
  );
}

function IceAlbedo() {
  return (
    <Diagram
      title="Is-albedo-tilbakekoblingen"
      heading="Mindre is → mørkere overflate → mer opptak → enda mindre is"
      caption="Is og snø kaster mesteparten av sola tilbake. Åpent hav og bart land absorberer. Når isen viker, synker albedo, mer energi blir værende, og smeltingen akselererer. Det er en positiv tilbakekobling — den forsterker endringen, den bremser den ikke."
      viewBox="0 0 820 280"
    >
      {(m) => (
        <>
          <rect x="50" y="50" width="220" height="150" rx="8" fill="#d8e6ee" />
          <L x="160" y="120" fill="#1a2a32" size={15} anchor="middle" weight={600}>
            hvit is
          </L>
          <L x="160" y="146" fill="#1a2a32" size={13} anchor="middle">
            høy albedo
          </L>
          <Arrow d="M 290 120 L 370 120" marker={m.warm} color={C.warm} width={2.6} />
          <rect x="390" y="50" width="220" height="150" rx="8" fill="#16303a" />
          <L x="500" y="120" fill={C.warm} size={15} anchor="middle" weight={600}>
            mørkt hav
          </L>
          <L x="500" y="146" fill={C.muted} size={13} anchor="middle">
            lav albedo
          </L>
          <Arrow d="M 630 120 L 710 80" marker={m.low} color={C.low} width={2.6} />
          <L x="740" y="70" fill={C.low} size={13}>
            mer varme
          </L>
          <path
            d="M 500 210 C 500 250, 160 250, 160 210"
            fill="none"
            stroke={C.low}
            strokeWidth="2"
            className="exam-dash-slow"
          />
          <L x="330" y="262" fill={C.low} size={13} anchor="middle">
            enda mindre is
          </L>
        </>
      )}
    </Diagram>
  );
}

function MonsterWave() {
  return (
    <Diagram
      title="Bølger som steiler over brå dybdeendring"
      heading="Motstrøm + grunt + vind = høy, bratt bølge"
      caption="Tre ting samtidig: vind som bygger bølger, en motgående strøm som bremser og steiler dem, og et brått sprang fra dypt til grunt som konsentrerer energien. Marker overgangen mørkt → lyst på batymetrikartet, ikke midt i det dype bassenget."
      viewBox="0 0 820 300"
    >
      {(m) => (
        <>
          <path d="M 40 220 L 360 220 L 500 150 L 780 150 L 780 280 L 40 280 Z" fill="#16303a" />
          <L x="180" y="256" fill={C.muted} size={13}>
            dypt
          </L>
          <L x="640" y="200" fill={C.muted} size={13}>
            grunt
          </L>
          <path
            d="M 60 140 C 120 110, 180 170, 240 140 C 300 110, 360 160, 420 110 C 460 80, 500 70, 560 50"
            fill="none"
            stroke={C.teal}
            strokeWidth="2.8"
            className="exam-dash"
          />
          <Arrow d="M 80 80 L 240 80" marker={m.warm} color={C.warm} width={2.4} />
          <L x="80" y="68" fill={C.warm} size={13}>
            vind
          </L>
          <Arrow d="M 700 230 L 480 230" marker={m.cold} color={C.cold} width={2.4} />
          <L x="700" y="250" fill={C.cold} size={13} anchor="end">
            motstrøm
          </L>
          <circle cx="500" cy="70" r="7" fill={C.low} className="exam-pulse" />
          <L x="514" y="64" fill={C.low} size={14}>
            steiling
          </L>
        </>
      )}
    </Diagram>
  );
}

function Perihelion() {
  return (
    <Diagram
      title="Perihelium og årstider"
      heading="Nærmest sola om NH-vinter gir små årstidsforskjeller i nord"
      caption="Jorda er nærmest sola (perihelium) i januar. Da er den nordlige halvkula vendt bort — vinter. Avstanden demper kulden litt, og somrene blir tilsvarende slakere. Speilvendt geometri (aphelium om NH-sommer) gir store årstidsforskjeller i sør. Aphelium om NH-vinter gir varme nordlige somre og gjør istid mindre sannsynlig."
      viewBox="0 0 820 320"
    >
      {(m) => (
        <>
          <ellipse cx="400" cy="160" rx="260" ry="110" fill="none" stroke={C.dim} strokeWidth="2" />
          <circle cx="400" cy="160" r="18" fill={C.warm} className="exam-pulse" />
          <L x="400" y="206" fill={C.warm} size={13} anchor="middle">
            sola
          </L>
          <circle cx="150" cy="160" r="16" fill={C.cold} />
          <L x="150" y="130" fill={C.cold} size={13} anchor="middle">
            perihelium · januar
          </L>
          <L x="150" y="196" fill={C.muted} size={12} anchor="middle">
            NH-vinter
          </L>
          <circle cx="650" cy="160" r="16" fill={C.teal} />
          <L x="650" y="130" fill={C.teal} size={13} anchor="middle">
            aphelium · juli
          </L>
          <L x="650" y="196" fill={C.muted} size={12} anchor="middle">
            NH-sommer
          </L>
          <Arrow d="M 180 160 L 370 160" marker={m.warm} color={C.warm} width={1.8} />
        </>
      )}
    </Diagram>
  );
}

function PositiveFeedback() {
  return (
    <Diagram
      title="Positiv og negativ tilbakekobling"
      heading="Positiv forsterker. Negativ motvirker."
      caption="I et kaldere klima gir mer is høyere albedo, som gir enda mer kulde. Det er positiv tilbakekobling: den øker utslaget. Negativ tilbakekobling trekker systemet tilbake mot utgangspunktet. «Alltid tilbake til balanse» er feil — positive løkker kan løpe løpsk inntil en annen prosess stanser dem."
      viewBox="0 0 820 280"
    >
      {(m) => (
        <>
          <circle cx="210" cy="140" r="70" fill="none" stroke={C.low} strokeWidth="2.4" />
          <path
            d="M 210 70 A 70 70 0 1 1 140 140"
            fill="none"
            stroke={C.low}
            strokeWidth="2.6"
            className="exam-dash"
          />
          <L x="210" y="136" fill={C.low} size={15} anchor="middle" weight={600}>
            positiv
          </L>
          <L x="210" y="158" fill={C.muted} size={13} anchor="middle">
            mer av det samme
          </L>
          <circle cx="610" cy="140" r="70" fill="none" stroke={C.teal} strokeWidth="2.4" />
          <Arrow d="M 610 70 L 610 100" marker={m.teal} color={C.teal} width={2.2} />
          <Arrow d="M 610 210 L 610 180" marker={m.teal} color={C.teal} width={2.2} />
          <L x="610" y="136" fill={C.teal} size={15} anchor="middle" weight={600}>
            negativ
          </L>
          <L x="610" y="158" fill={C.muted} size={13} anchor="middle">
            motvirker
          </L>
        </>
      )}
    </Diagram>
  );
}

function AtmoRiver() {
  return (
    <Diagram
      title="Atmosfærisk elv mot fjell"
      heading="Smal fuktig strøm + orografisk heving = ekstremnedbør"
      caption="En atmosfærisk elv er en smal korridor med svært fuktig luft fra varmt hav. Når den treffer Vestlandet, tvinges den opp. Lufta avkjøles, vanndampen kondenserer, og nedbøren blir ekstrem i en smal sone. Det er værsituasjonen Met varsler — ikke «farevarsel generelt»."
      viewBox="0 0 820 300"
    >
      {(m) => (
        <>
          <rect x="30" y="160" width="360" height="110" fill="#13202a" />
          <L x="80" y="250" fill={C.muted} size={13}>
            varmt hav
          </L>
          <path d="M 390 200 L 520 80 L 640 200 L 780 140 L 780 270 L 390 270 Z" fill="#1e2c25" />
          <L x="620" y="250" fill={C.muted} size={13}>
            Vestlandet
          </L>
          <path
            d="M 50 150 C 180 130, 280 140, 400 120 C 460 90, 500 70, 530 60"
            fill="none"
            stroke={C.rain}
            strokeWidth="18"
            opacity="0.25"
          />
          <path
            d="M 50 150 C 180 130, 280 140, 400 120 C 460 90, 500 70, 530 60"
            fill="none"
            stroke={C.rain}
            strokeWidth="4"
            className="exam-dash"
          />
          <L x="160" y="110" fill={C.rain} size={14}>
            atmosfærisk elv
          </L>
          <Arrow d="M 530 70 L 530 130" marker={m.cold} color={C.cold} width={2.4} />
          <L x="548" y="110" fill={C.cold} size={13}>
            heving → regn
          </L>
        </>
      )}
    </Diagram>
  );
}

function Foehn() {
  return (
    <Diagram
      title="Føhn: tørradiabat opp, våtadiabat videre, tørradiabat ned"
      heading="Loside 14 °C → topp 0 °C → leside 20 °C"
      caption="Tørradiabat 1 °C/100 m opp til skybase 800 m: 14 − 8 = 6 °C. Våtadiabat 0,5 °C/100 m de neste 1200 m: 6 − 6 = 0 °C på toppen. Ned 2000 m tørt: 0 + 20 = 20 °C. Føhn er varm og tørr på lesiden fordi vanndampen ble liggende igjen som skyer og nedbør på losiden."
      viewBox="0 0 840 340"
    >
      {(m) => (
        <>
          <path d="M 40 280 L 280 280 L 420 80 L 560 280 L 800 280 L 800 320 L 40 320 Z" fill="#1e2c25" />
          <path
            d="M 120 250 L 280 250 L 360 150"
            fill="none"
            stroke={C.warm}
            strokeWidth="3"
            className="exam-dash"
          />
          <path
            d="M 360 150 L 420 90"
            fill="none"
            stroke={C.rain}
            strokeWidth="3"
            className="exam-dash"
          />
          <path
            d="M 420 90 L 620 250"
            fill="none"
            stroke={C.low}
            strokeWidth="3"
            className="exam-dash"
          />
          <L x="150" y="236" fill={C.warm} size={14}>
            14 °C
          </L>
          <L x="300" y="200" fill={C.warm} size={13}>
            tørr −1 °C/100 m
          </L>
          <L x="300" y="168" fill={C.rain} size={13}>
            skybase 800 m · 6 °C
          </L>
          <L x="400" y="70" fill={C.cold} size={14} anchor="middle">
            0 °C
          </L>
          <L x="500" y="150" fill={C.low} size={13}>
            tørr ned
          </L>
          <L x="640" y="236" fill={C.low} size={15} weight={600}>
            20 °C · tørr
          </L>
          <Arrow d="M 200 120 L 200 200" marker={m.cold} color={C.rain} width={2} />
          <L x="168" y="112" fill={C.rain} size={12}>
            nedbør
          </L>
        </>
      )}
    </Diagram>
  );
}

function Katabatic() {
  return (
    <Diagram
      title="Katabatisk vind mot føhn"
      heading="Katabatisk er kald fallvind. Føhn er varm og tørr leside."
      caption="Katabatisk luft kjøles over isen, blir tett og renner ned av tyngdekraften. Den er tørr og lager sjelden skyer. Føhn er en annen prosess: luft heves, mister fukt på losiden og varmes tørradiabatisk på vei ned. En påstand som beskriver varm, tørr leside etter heving, er føhn — ikke katabatisk."
      viewBox="0 0 840 300"
    >
      {(m) => (
        <>
          <path d="M 40 80 L 280 80 L 360 220 L 40 220 Z" fill="#d8e6ee" opacity="0.35" />
          <L x="150" y="70" fill={C.cold} size={14}>
            innlandsis
          </L>
          <Arrow d="M 220 100 L 340 200" marker={m.cold} color={C.cold} width={3} />
          <L x="250" y="180" fill={C.cold} size={14}>
            kald · tett · faller
          </L>
          <L x="180" y="250" fill={C.cold} size={15} weight={600}>
            katabatisk
          </L>
          <path d="M 480 220 L 620 70 L 760 220" fill="#1e2c25" />
          <Arrow d="M 520 200 L 610 100" marker={m.cold} color={C.rain} width={2.4} />
          <Arrow d="M 630 100 L 720 200" marker={m.warm} color={C.warm} width={2.4} />
          <L x="620" y="250" fill={C.warm} size={15} weight={600}>
            føhn
          </L>
          <L x="700" y="180" fill={C.warm} size={13}>
            varm og tørr
          </L>
        </>
      )}
    </Diagram>
  );
}

function RadiationBalance() {
  return (
    <Diagram
      title="Energibalanse ved bakken"
      heading="Like mye inn mot overflaten som ut fra den"
      caption="Figuren viser balanse ved bakken, ikke «sola versus bakken». Sol (kortbølge) pluss langbølge fra atmosfæren (drivhuseffekten) møter langbølge ut, fordamping og følbar varme. Drivhuseffekten er med. Det er derfor nettene ikke blir iskaldt like fort som på månen."
      viewBox="0 0 820 300"
    >
      {(m) => (
        <>
          <rect x="80" y="200" width="660" height="60" fill="#1e2c25" />
          <L x="410" y="236" fill={C.fg} size={14} anchor="middle">
            bakken
          </L>
          <Arrow d="M 220 50 L 220 190" marker={m.warm} color={C.warm} width={3} />
          <L x="236" y="90" fill={C.warm} size={13}>
            sol (kortbølge)
          </L>
          <Arrow d="M 360 70 L 360 190" marker={m.low} color={C.low} width={2.6} />
          <L x="376" y="110" fill={C.low} size={13}>
            langbølge fra lufta
          </L>
          <Arrow d="M 520 190 L 520 70" marker={m.teal} color={C.teal} width={2.6} />
          <L x="536" y="110" fill={C.teal} size={13}>
            langbølge ut
          </L>
          <Arrow d="M 640 190 L 640 110" marker={m.cold} color={C.cold} width={2.2} />
          <L x="656" y="150" fill={C.cold} size={13}>
            fordamping
          </L>
          <L x="410" y="40" fill={C.muted} size={13} anchor="middle">
            inn = ut ved overflaten
          </L>
        </>
      )}
    </Diagram>
  );
}

function ElNino() {
  return (
    <Diagram
      title="El Niño flytter regnet østover"
      heading="Svekkede passater · varmt vann i øst · tørke i vest"
      caption="Normalt presser passatene varmt vann vestover mot Indonesia. Ved El Niño slakker passatene, det varme vannet renner tilbake mot Sør-Amerika, konveksjonen flytter øst, og Indonesia/Australia tørker. Flom i Øst-Afrika og deler av Sør-Amerika er klassiske følgehendelser. Europa-flom og Peru-tørke er ikke Udirs El Niño-koblinger her."
      viewBox="0 0 840 280"
    >
      {(m) => (
        <>
          <rect x="50" y="80" width="740" height="140" rx="8" fill="#13202a" />
          <rect x="420" y="80" width="370" height="140" fill={C.warm} opacity="0.22" />
          <L x="160" y="70" fill={C.muted} size={13}>
            Indonesia
          </L>
          <L x="680" y="70" fill={C.muted} size={13} anchor="end">
            Sør-Amerika
          </L>
          <Arrow d="M 280 150 L 620 150" marker={m.warm} color={C.warm} width={3} />
          <L x="450" y="136" fill={C.warm} size={14} anchor="middle">
            varmt vann østover
          </L>
          <L x="200" y="160" fill={C.low} size={13} anchor="middle">
            tørke
          </L>
          <L x="680" y="160" fill={C.rain} size={13} anchor="middle">
            regn / konveksjon
          </L>
          <L x="420" y="250" fill={C.muted} size={13} anchor="middle">
            passatene slakker
          </L>
        </>
      )}
    </Diagram>
  );
}

function HurricaneSst() {
  return (
    <Diagram
      title="Tropisk syklon dør over kaldt vann"
      heading="Motoren er varmt hav, ikke coriolis eller vestavind"
      caption="En tropisk syklon lever av latent varme fra hav over ca. 26 °C. Langt nord blir havet for kaldt, energitilførselen stopper, og stormen fylles igjen. Vestavinden kan styre banen, og coriolis trengs for å spinne — men det er tapet av varmekilden som gjør at sterke tropiske sykloner sjelden når Europa."
      viewBox="0 0 840 280"
    >
      {(m) => (
        <>
          <rect x="40" y="150" width="360" height="90" fill={C.warm} opacity="0.35" />
          <rect x="400" y="150" width="400" height="90" fill={C.cold} opacity="0.35" />
          <L x="220" y="200" fill={C.warm} size={14} anchor="middle">
            SST ≥ 26 °C
          </L>
          <L x="600" y="200" fill={C.cold} size={14} anchor="middle">
            kaldt hav
          </L>
          <circle cx="180" cy="110" r="36" fill="none" stroke={C.low} strokeWidth="2.4" />
          <circle cx="180" cy="110" r="8" fill={C.bg} stroke={C.low} />
          <L x="180" y="70" fill={C.low} size={13} anchor="middle">
            orkan
          </L>
          <Arrow d="M 230 110 L 520 110" marker={m.muted} color={C.muted} width={2.4} />
          <circle cx="620" cy="110" r="20" fill="none" stroke={C.muted} strokeWidth="1.6" strokeDasharray="4 5" />
          <L x="620" y="70" fill={C.muted} size={13} anchor="middle">
            dør ut
          </L>
          <L x="420" y="260" fill={C.muted} size={13} anchor="middle">
            tropene → midlere bredder
          </L>
        </>
      )}
    </Diagram>
  );
}

function Chlorophyll() {
  return (
    <Diagram
      title="Primærproduksjon styres av næring, ikke bare varme"
      heading="Varmest er ikke automatisk grønnest"
      caption="Klorofyllkart viser planteplankton. I tropene er havet varmt, men ofte næringsfattig i toppen (sterk sjiktning). Oppveling og høye bredder kan være kaldere og likevel grønnere. Derfor er «varmest = mest produksjon» usann."
      viewBox="0 0 820 260"
    >
      {() => (
        <>
          <rect x="60" y="50" width="300" height="160" rx="8" fill="#3a2a20" />
          <L x="210" y="110" fill={C.warm} size={15} anchor="middle" weight={600}>
            varm · næringsfattig
          </L>
          <L x="210" y="140" fill={C.muted} size={13} anchor="middle">
            lite klorofyll
          </L>
          <rect x="460" y="50" width="300" height="160" rx="8" fill="#16382c" />
          <L x="610" y="110" fill={C.teal} size={15} anchor="middle" weight={600}>
            kaldere · oppveling
          </L>
          <L x="610" y="140" fill={C.fg} size={13} anchor="middle">
            mer klorofyll
          </L>
        </>
      )}
    </Diagram>
  );
}

function HurricaneEye() {
  return (
    <Diagram
      title="Øye og øyevegg"
      heading="Øyet er stille og tørt. Øyeveggen er det farlige."
      caption="I øyet synker lufta: nesten vindstille, uten nedbør. Rundt øya i øyet kan vannstanden likevel være høy (stormflo stables inn). Sterk vind, skybrudd og den laveste trykket i veggen hører øyeveggen, ikke øyet."
      viewBox="0 0 820 300"
    >
      {(m) => (
        <>
          <circle cx="410" cy="150" r="120" fill="none" stroke={C.low} strokeWidth="18" opacity="0.35" />
          <circle cx="410" cy="150" r="120" fill="none" stroke={C.low} strokeWidth="3" />
          <circle cx="410" cy="150" r="34" fill="#152028" stroke={C.teal} strokeWidth="2" />
          <L x="410" y="146" fill={C.teal} size={14} anchor="middle" weight={600}>
            øye
          </L>
          <L x="410" y="166" fill={C.muted} size={12} anchor="middle">
            stille
          </L>
          <L x="410" y="56" fill={C.low} size={14} anchor="middle">
            øyevegg · vind + regn
          </L>
          <Arrow d="M 410 184 L 410 230" marker={m.teal} color={C.teal} width={2} />
          <L x="424" y="220" fill={C.muted} size={12}>
            synkende luft
          </L>
        </>
      )}
    </Diagram>
  );
}

function Spectrum() {
  return (
    <Diagram
      title="Absorpsjonsspektre for vanndamp, CO₂ og ozon"
      heading="Match dalene i spekteret mot gassen"
      caption="Hver gass har fingeravtrykk: vanndamp absorberer bredt i IR (ofte merket blått), CO₂ har karakteristiske bånd (ofte rødt), ozon har flere bånd inkludert UV (ofte svart). Les absorpsjonsdalene i spekter A mot kurvene i B — ikke gjett på farger uten å matche form."
      viewBox="0 0 820 260"
    >
      {() => (
        <>
          <path d="M 60 80 C 120 80, 140 180, 180 180 C 220 180, 240 80, 300 80 C 360 80, 380 200, 440 200 C 500 200, 520 90, 600 90 C 660 90, 700 150, 760 80" fill="none" stroke={C.fg} strokeWidth="2.2" />
          <L x="160" y="210" fill={C.rain} size={14} anchor="middle">
            H₂O
          </L>
          <L x="420" y="230" fill={C.low} size={14} anchor="middle">
            CO₂
          </L>
          <L x="680" y="210" fill={C.muted} size={14} anchor="middle">
            O₃
          </L>
          <L x="60" y="50" fill={C.muted} size={13}>
            transmisjon
          </L>
        </>
      )}
    </Diagram>
  );
}

function InlandClimate() {
  return (
    <Diagram
      title="Innlandsklima mot kystklima"
      heading="Stor årlig amplitude inne i landet"
      caption="Innlandsklima: kald vinter, varm sommer, ofte et tydelig sommernedbørsmønster. Kystklima: slak temperaturkurve, nedbør mer jevnt eller høst/vintertungt. Diagrammet øverst til venstre i V2024-17 er innland fordi amplituden er stor — ikke det flate maritime."
      viewBox="0 0 820 280"
    >
      {() => (
        <>
          <line x1="70" y1="40" x2="70" y2="230" stroke={C.dim} />
          <line x1="70" y1="230" x2="760" y2="230" stroke={C.dim} />
          <path d="M 90 200 C 180 210, 260 40, 400 50 C 540 60, 620 200, 740 190" fill="none" stroke={C.warm} strokeWidth="2.8" />
          <path d="M 90 150 C 220 160, 360 130, 500 140 C 620 148, 700 155, 740 150" fill="none" stroke={C.teal} strokeWidth="2.4" />
          <L x="400" y="36" fill={C.warm} size={14} anchor="middle">
            innland · stor amplitude
          </L>
          <L x="400" y="168" fill={C.teal} size={13} anchor="middle">
            kyst · slak
          </L>
          <L x="90" y="256" fill={C.muted} size={12}>
            J
          </L>
          <L x="400" y="256" fill={C.muted} size={12} anchor="middle">
            J
          </L>
          <L x="740" y="256" fill={C.muted} size={12} anchor="end">
            D
          </L>
        </>
      )}
    </Diagram>
  );
}

function Convection() {
  return (
    <Diagram
      title="Konveksjon stanses i stratosfæren"
      heading="Temperaturen stiger med høyden — stabil sjiktning"
      caption="I troposfæren faller T med høyden, lufta kan bli ustabil og stige. I stratosfæren varmes ozonlaget, T stiger med høyden, og en luftboble som prøver å stige, er kaldere enn omgivelsene og synker tilbake. Derfor stopper bygeskyene under tropopausen."
      viewBox="0 0 820 320"
    >
      {(m) => (
        <>
          <rect x="80" y="40" width="280" height="100" fill="#152028" />
          <L x="220" y="80" fill={C.teal} size={14} anchor="middle">
            stratosfære · T øker
          </L>
          <line x1="80" y1="140" x2="360" y2="140" stroke={C.dim} />
          <L x="220" y="132" fill={C.muted} size={12} anchor="middle">
            tropopause
          </L>
          <rect x="80" y="140" width="280" height="140" fill="#1e2a22" />
          <L x="220" y="220" fill={C.warm} size={14} anchor="middle">
            troposfære · T faller
          </L>
          <Arrow d="M 500 240 L 500 160" marker={m.warm} color={C.warm} width={2.6} />
          <L x="518" y="200" fill={C.warm} size={13}>
            konveksjon
          </L>
          <Arrow d="M 500 150 L 500 90" marker={m.muted} color={C.muted} width={2} dash="5 5" />
          <L x="518" y="110" fill={C.muted} size={13}>
            stanses
          </L>
        </>
      )}
    </Diagram>
  );
}

function WaveAnatomy() {
  return (
    <Diagram
      title="Bølgehøyde, lengde og periode"
      heading="Høyde er loddrett. Lengde er mellom to topper."
      caption="Bølgehøyde er fra bunn til topp. Bølgelengde er horisontal avstand mellom to påfølgende topper. Periode er tiden mellom to topper i ett punkt. Stormflo er noe annet: vannstanden som presses på land — det er den som tar flest liv."
      viewBox="0 0 820 240"
    >
      {(m) => (
        <>
          <path d="M 40 140 C 100 60, 180 60, 240 140 C 300 220, 380 220, 440 140 C 500 60, 580 60, 640 140 C 700 220, 780 180, 800 140" fill="none" stroke={C.teal} strokeWidth="2.8" />
          <Arrow d="M 240 60 L 240 210" marker={m.warm} color={C.warm} width={1.8} />
          <L x="254" y="140" fill={C.warm} size={13}>
            høyde
          </L>
          <Arrow d="M 240 70 L 640 70" marker={m.cold} color={C.cold} width={1.8} />
          <L x="440" y="56" fill={C.cold} size={13} anchor="middle">
            bølgelengde
          </L>
        </>
      )}
    </Diagram>
  );
}

function EarthTilt() {
  return (
    <Diagram
      title="Jordaksens helning og innstråling på 65°N"
      heading="Sommersola på 65°N avgjør om snøen overlever"
      caption="Ved ekvator er innstrålingen jevn hele året. Ved 65°N svinger den kraftig: midnattssol mot mørketid. Om sommersola der er for svak, overlever snøen, albedo holder seg høy, og istid kan bygges. Rotasjonshastighet og «større avstandsendring» er ikke mekanismen."
      viewBox="0 0 820 300"
    >
      {() => (
        <>
          <ellipse cx="220" cy="150" rx="90" ry="90" fill="#152028" stroke={C.teal} strokeWidth="2" />
          <line x1="250" y1="40" x2="190" y2="260" stroke={C.warm} strokeWidth="2.4" />
          <L x="270" y="50" fill={C.warm} size={13}>
            akse 23,5°
          </L>
          <line x1="420" y1="230" x2="780" y2="230" stroke={C.dim} />
          <path d="M 440 200 C 520 210, 560 60, 620 50 C 680 40, 720 180, 760 190" fill="none" stroke={C.warm} strokeWidth="2.6" />
          <path d="M 440 150 C 520 148, 600 152, 760 150" fill="none" stroke={C.teal} strokeWidth="2" />
          <L x="620" y="36" fill={C.warm} size={13} anchor="middle">
            65°N
          </L>
          <L x="620" y="170" fill={C.teal} size={13} anchor="middle">
            ekvator
          </L>
        </>
      )}
    </Diagram>
  );
}

function CarbonCycle() {
  return (
    <Diagram
      title="Tre klimagasser med ulik levetid"
      heading="CO₂, CH₄ og H₂O gjør ulike jobber"
      caption="CO₂ fjernes over geologisk tid i hav og forvitring. Metan dannes ved oksygenfattig nedbryting og er sterk, men kortlevd. Vanndamp har kortest levetid og styres av temperatur — den er en tilbakekobling mer enn et primært pådriv. Alle tre absorberer utgående langbølge."
      viewBox="0 0 820 240"
    >
      {() => (
        <>
          {[
            { x: 50, t: "CO₂", d: "lang levetid · havet tar den" },
            { x: 300, t: "CH₄", d: "sterk · kortlevd · anaerob" },
            { x: 550, t: "H₂O", d: "kortest levetid · tilbakekobling" },
          ].map((b) => (
            <g key={b.t}>
              <rect x={b.x} y="50" width="220" height="140" rx="10" fill="#152028" stroke={C.dim} />
              <L x={b.x + 110} y="110" fill={C.teal} size={20} anchor="middle" weight={700}>
                {b.t}
              </L>
              <L x={b.x + 110} y="150" fill={C.muted} size={13} anchor="middle">
                {b.d}
              </L>
            </g>
          ))}
        </>
      )}
    </Diagram>
  );
}

function Westerlies() {
  return (
    <Diagram
      title="Vestavindsbeltet og polar østavind"
      heading="Ferrel driver østover. Polarcelle driver vestover."
      caption="På midlere bredder blåser vestavind (Ferrel). Nærmere polen blåser polar østavind. På sørlige halvkule dreier Ekman til venstre: vestavind gir nordlig transport, polar østavind sørlig. Mellom dem, rundt 60°S, divergerer overflaten — oppveling og høy primærproduksjon."
      viewBox="0 0 820 280"
    >
      {(m) => (
        <>
          <L x="80" y="50" fill={C.muted} size={13}>
            pol
          </L>
          <L x="80" y="240" fill={C.muted} size={13}>
            40°S
          </L>
          <Arrow d="M 220 80 L 520 80" marker={m.cold} color={C.cold} width={2.8} />
          <L x="240" y="66" fill={C.cold} size={14}>
            polar østavind → vestgående kyststrøm
          </L>
          <Arrow d="M 520 200 L 220 200" marker={m.warm} color={C.warm} width={2.8} />
          <L x="240" y="230" fill={C.warm} size={14}>
            vestavind → østgående ACC
          </L>
          <Arrow d="M 400 110 L 400 170" marker={m.teal} color={C.teal} width={2.4} />
          <L x="416" y="148" fill={C.teal} size={13}>
            divergens · oppveling
          </L>
        </>
      )}
    </Diagram>
  );
}

function DensityMix() {
  return (
    <Diagram
      title="Smeltevann i ferskvann og i saltvann"
      heading="Kaldt ferskvann synker i ferskvann, flyter på saltvann"
      caption="Kaldt smeltevann er tyngre enn romtemperert ferskvann og synker — fargen legger seg langs bunnen. I saltvann er det samme smeltevannet lettere enn det salte og blir liggende oppå. Glasset der fargen går til bunns, er derfor ferskvann."
      viewBox="0 0 820 280"
    >
      {() => (
        <>
          <rect x="120" y="40" width="160" height="200" rx="8" fill="#152028" stroke={C.dim} />
          <rect x="120" y="170" width="160" height="70" fill={C.cold} opacity="0.55" className="exam-sink" />
          <L x="200" y="260" fill={C.muted} size={13} anchor="middle">
            ferskvann · synker
          </L>
          <rect x="540" y="40" width="160" height="200" rx="8" fill="#152028" stroke={C.dim} />
          <rect x="540" y="40" width="160" height="70" fill={C.cold} opacity="0.55" className="exam-bob" />
          <L x="620" y="260" fill={C.muted} size={13} anchor="middle">
            saltvann · flyter
          </L>
        </>
      )}
    </Diagram>
  );
}

function MarineHeatwave() {
  return (
    <Diagram
      title="Marin hetebølge: varme stenges i toppen"
      heading="Lite vind og klarvær → varmen blir liggende i overflaten"
      caption="En marin hetebølge er unormalt varmt overflatevann over dager til måneder. Solinnstråling varmer toppen. Svak vind og sterk sjiktning stenger blandingen, så varmen ikke trekkes ned. Vulkaner på bunnen er ikke forklaringen. Les fargeskalaen på Udir-figuren — anomalien er sjelden «nesten 10 °C»."
      viewBox="0 0 840 300"
    >
      {(m) => (
        <>
          <rect x="40" y="40" width="760" height="70" fill="#3a2a18" />
          <L x="420" y="70" fill={C.warm} size={14} anchor="middle">
            klarvær · sterk innstråling
          </L>
          <Arrow d="M 180 40 L 180 108" marker={m.warm} color={C.warm} width={2} />
          <Arrow d="M 420 40 L 420 108" marker={m.warm} color={C.warm} width={2} />
          <Arrow d="M 660 40 L 660 108" marker={m.warm} color={C.warm} width={2} />
          <rect x="40" y="110" width="760" height="70" fill={C.warm} opacity="0.45" />
          <L x="420" y="152" fill={C.fg} size={15} anchor="middle" weight={600}>
            varm hatt · marin hetebølge
          </L>
          <rect x="40" y="180" width="760" height="80" fill={C.cold} opacity="0.28" />
          <L x="420" y="226" fill={C.cold} size={14} anchor="middle">
            kaldere vann under · blandingen er stengt
          </L>
          <L x="80" y="280" fill={C.muted} size={13}>
            lite vind
          </L>
          <L x="760" y="280" fill={C.muted} size={13} anchor="end">
            ikke bunnvulkanisme
          </L>
        </>
      )}
    </Diagram>
  );
}

function OrographicRain() {
  return (
    <Diagram
      title="Orografisk nedbør og regnskygge"
      heading="Fuktig loside heves. Lesiden er tørr."
      caption="Passaten tvinger fuktig luft opp på losiden. Der kondenserer dampen, og det regner. Over kammen er vannet borte. Ned lesiden varmes luften tørt — regnskygge. På 20–25°S er sørøstpassaten den fuktige vinden, så sørøst er den våte siden."
      viewBox="0 0 840 300"
    >
      {(m) => (
        <>
          <path d="M 80 240 L 360 70 L 640 240 L 800 240 L 800 280 L 80 280 Z" fill="#1a2620" />
          <L x="360" y="58" fill={C.muted} size={13} anchor="middle">
            fjell / øy
          </L>
          <Arrow d="M 60 200 L 250 130" marker={m.cold} color={C.rain} width={3} />
          <L x="70" y="170" fill={C.rain} size={14}>
            sørøstpassat · fukt
          </L>
          <L x="200" y="250" fill={C.rain} size={14}>
            loside · regn
          </L>
          <Arrow d="M 470 120 L 720 200" marker={m.warm} color={C.warm} width={2.6} />
          <L x="620" y="250" fill={C.warm} size={14}>
            leside · regnskygge
          </L>
        </>
      )}
    </Diagram>
  );
}

function WindLowSh() {
  return (
    <Diagram
      title="Lavtrykk på sørlige halvkule"
      heading="Med urviseren inn mot L — det er lavtrykk, ikke høytrykk"
      caption="På sørlige halvkule bøyes innstrømmende luft til venstre. Rundt et lavtrykk blir rotasjonen med urviseren. Høytrykk spinner motsatt. Videoen i oppgaven viser trykksenteret i midten: luft inn + med urviseren = L."
      viewBox="0 0 820 380"
    >
      {(m) => (
        <>
          <circle cx="410" cy="190" r="118" fill="none" stroke={C.dim} strokeWidth="1.2" />
          <circle cx="410" cy="190" r="78" fill="none" stroke={C.dim} strokeWidth="1.2" />
          <circle cx="410" cy="190" r="26" fill="#2a1818" stroke={C.low} strokeWidth="2.4" />
          <L x="410" y="196" fill={C.low} size={20} anchor="middle" weight={700}>
            L
          </L>
          <Arrow d="M 410 72 C 470 90, 510 130, 528 190" marker={m.low} color={C.low} width={2.4} />
          <Arrow d="M 528 190 C 510 250, 470 300, 410 308" marker={m.low} color={C.low} width={2.4} />
          <Arrow d="M 410 308 C 350 300, 292 250, 292 190" marker={m.low} color={C.low} width={2.4} />
          <Arrow d="M 292 190 C 310 130, 350 80, 410 72" marker={m.low} color={C.low} width={2.4} />
          <L x="410" y="44" fill={C.muted} size={13} anchor="middle">
            med urviseren på sørlige halvkule
          </L>
          <L x="410" y="350" fill={C.muted} size={13} anchor="middle">
            coriolis bøyer til venstre
          </L>
        </>
      )}
    </Diagram>
  );
}

function WindLowCenter() {
  return (
    <Diagram
      title="Finn lavtrykkssenteret i spiralen"
      heading="Senteret er det rolige øyet der skyene lukker seg"
      caption="På nordlig halvkule spinner lavtrykk mot urviseren. Marker der rotasjonen lukker seg — det rolige øyet — ikke en front lenger ute. Fronten er skillet mellom luftmasser, ikke trykksenteret."
      viewBox="0 0 820 360"
    >
      {(m) => (
        <>
          <path
            d="M 410 60 C 560 80, 680 180, 640 280 C 600 360, 420 340, 300 280 C 180 220, 200 100, 410 60"
            fill="none"
            stroke={C.low}
            strokeWidth="2.2"
            className="exam-dash"
          />
          <circle cx="410" cy="190" r="22" fill="#2a1818" stroke={C.low} strokeWidth="2.4" />
          <L x="410" y="196" fill={C.low} size={18} anchor="middle" weight={700}>
            L
          </L>
          <Arrow d="M 500 90 C 560 140, 560 200, 500 250" marker={m.low} color={C.low} width={2.2} />
          <L x="410" y="40" fill={C.muted} size={13} anchor="middle">
            mot klokken · nordlig halvkule
          </L>
          <L x="560" y="196" fill={C.warm} size={14}>
            klikk her — øyet
          </L>
        </>
      )}
    </Diagram>
  );
}

function Eccentricity() {
  return (
    <Diagram
      title="Jordbanens eksentrisitet"
      heading="Høy eksentrisitet = mer avlang bane = større årstidsforskjell"
      caption="Eksentrisitet er hvor avlang ellipsen er, ikke perihelium-tidspunkt og ikke aksehelning. Høy eksentrisitet gir større forskjell mellom perihel og aphel. Da kan sommersola på 65°N bli for svak, og istid får bedre vilkår. Velg tidspunktet i figuren der ellipsen er mest avlang."
      viewBox="0 0 840 300"
    >
      {() => (
        <>
          <ellipse cx="220" cy="150" rx="110" ry="108" fill="none" stroke={C.muted} strokeWidth="2" />
          <circle cx="220" cy="150" r="10" fill={C.warm} />
          <L x="220" y="44" fill={C.muted} size={13} anchor="middle">
            lav eksentrisitet · nesten sirkel
          </L>
          <ellipse cx="620" cy="150" rx="160" ry="78" fill="none" stroke={C.teal} strokeWidth="2.4" />
          <circle cx="700" cy="150" r="10" fill={C.warm} />
          <L x="620" y="44" fill={C.teal} size={13} anchor="middle">
            høy eksentrisitet · avlang ellipse
          </L>
          <L x="420" y="270" fill={C.muted} size={13} anchor="middle">
            sola sitter i ett brennpunkt, ikke i sentrum
          </L>
        </>
      )}
    </Diagram>
  );
}

function TreeRing() {
  return (
    <Diagram
      title="Årringer som klimaarchiv"
      heading="Tynn ring = dårlig vekstår. Tykk ring = godt vekstår."
      caption="Les hva oppgaven sier styrer veksten. Styrer temperaturen: tynnest ring er kaldest sommer. Styrer nedbør: tykkest ring er våtest år. Ikke anta at tykk alltid betyr varm. Match linjalen mot merkene A–K."
      viewBox="0 0 840 300"
    >
      {() => (
        <>
          {[40, 52, 70, 78, 98, 108, 128, 148, 156, 180].map((r, i) => (
            <circle
              key={r}
              cx="250"
              cy="150"
              r={r}
              fill="none"
              stroke={i === 2 || i === 7 ? C.teal : C.sand}
              strokeWidth={i === 2 || i === 7 ? 3 : 1.4}
            />
          ))}
          <L x="250" y="28" fill={C.muted} size={13} anchor="middle">
            snitt gjennom stammen
          </L>
          <L x="480" y="90" fill={C.teal} size={14}>
            tykk ring · godt år
          </L>
          <L x="480" y="160" fill={C.sand} size={14}>
            tynn ring · dårlig år
          </L>
          <L x="480" y="230" fill={C.muted} size={13}>
            les oppgaven: temperatur eller nedbør?
          </L>
        </>
      )}
    </Diagram>
  );
}

function FrontRain() {
  return (
    <Diagram
      title="Kraftig nedbør ligger i fronten, ikke i høytrykket"
      heading="Stigende luft ved fronten. Synkende luft i H."
      caption="På et analysekart: høytrykk har synkende luft og lite nedbør. Kraftig nedbør hører frontsonen der fuktig luft heves. Åpne MET-kartet og sjekk hvilket tall som ligger i fronten — ikke det som ligger inne i H."
      viewBox="0 0 840 280"
    >
      {(m) => (
        <>
          <circle cx="160" cy="140" r="50" fill="#1a2420" stroke={C.teal} strokeWidth="2" />
          <L x="160" y="146" fill={C.teal} size={22} anchor="middle" weight={700}>
            H
          </L>
          <L x="160" y="210" fill={C.muted} size={13} anchor="middle">
            1 · tørt
          </L>
          <path d="M 320 40 L 380 140 L 320 240" fill="none" stroke={C.low} strokeWidth="3" />
          <L x="430" y="146" fill={C.low} size={16} weight={600}>
            2 · front · heving · regn
          </L>
          <circle cx="700" cy="140" r="44" fill="#2a1818" stroke={C.dim} strokeWidth="1.6" />
          <L x="700" y="146" fill={C.muted} size={18} anchor="middle">
            L
          </L>
          <L x="700" y="210" fill={C.muted} size={13} anchor="middle">
            3 · ikke automatisk våtest
          </L>
          <Arrow d="M 300 140 L 360 140" marker={m.low} color={C.low} width={2} />
        </>
      )}
    </Diagram>
  );
}

function SnowCrystal() {
  return (
    <Diagram
      title="Rim på snøoverflaten mot begerkorn nede i dekket"
      heading="Kalde, klare netter: rimkrystaller på toppen. Begerkorn nede i snøen."
      caption="Når bakken stråler mot klar himmel, blir snøoverflaten kaldere enn lufta. Vanndamp avsettes som rim / overflaterim. Begerkorn (begerkrystaller) vokser nede i snødekket ved sterk temperaturgradient — ikke som pene enkeltkrystaller på et foto. Fokksnø er vindtransportert snø, ikke en krystalltype."
      viewBox="0 0 840 300"
    >
      {() => (
        <>
          <rect x="40" y="40" width="360" height="200" rx="10" fill="#152028" stroke={C.dim} />
          <L x="220" y="70" fill={C.cold} size={14} anchor="middle">
            klare netter
          </L>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${120 + i * 70} 130)`}>
              <line x1="0" y1="-28" x2="0" y2="28" stroke={C.white} strokeWidth="1.6" />
              <line x1="-24" y1="0" x2="24" y2="0" stroke={C.white} strokeWidth="1.6" />
              <line x1="-18" y1="-18" x2="18" y2="18" stroke={C.white} strokeWidth="1.4" />
              <line x1="-18" y1="18" x2="18" y2="-18" stroke={C.white} strokeWidth="1.4" />
            </g>
          ))}
          <L x="220" y="220" fill={C.muted} size={13} anchor="middle">
            rimkrystaller på overflaten
          </L>
          <rect x="440" y="40" width="360" height="200" rx="10" fill="#152028" stroke={C.dim} />
          <rect x="460" y="70" width="320" height="40" fill={C.white} opacity="0.15" />
          <L x="620" y="96" fill={C.muted} size={13} anchor="middle">
            snøoverflate
          </L>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={500 + i * 70}
              y="130"
              width="28"
              height="70"
              rx="4"
              fill="none"
              stroke={C.sand}
              strokeWidth="1.8"
            />
          ))}
          <L x="620" y="220" fill={C.muted} size={13} anchor="middle">
            begerkorn nede i dekket
          </L>
        </>
      )}
    </Diagram>
  );
}

function OzoneProfile() {
  return (
    <Diagram
      title="Ozonlaget restitueres i stratosfæren"
      heading="Mer ozon 30–45 km etter Montreal — det er positiv utvikling"
      caption="Bakkenært ozon er forurensning. Ozonlaget ligger i stratosfæren. Etter Montreal-protokollen øker ozon rundt 30–45 km: restitusjon, ikke «mer ozon ved bakken». Les høydeaksen, ikke fargen du husker fra troposfæren."
      viewBox="0 0 840 320"
    >
      {(m) => (
        <>
          <line x1="120" y1="40" x2="120" y2="280" stroke={C.dim} />
          <line x1="120" y1="280" x2="720" y2="280" stroke={C.dim} />
          <L x="70" y="50" fill={C.muted} size={13}>
            45 km
          </L>
          <L x="70" y="120" fill={C.teal} size={13}>
            30 km
          </L>
          <L x="70" y="270" fill={C.muted} size={13}>
            bakken
          </L>
          <rect x="200" y="70" width="400" height="80" fill={C.teal} opacity="0.25" />
          <L x="400" y="116" fill={C.teal} size={15} anchor="middle" weight={600}>
            ozonlaget · restitusjon
          </L>
          <Arrow d="M 640 110 L 700 110" marker={m.teal} color={C.teal} width={2.4} />
          <L x="710" y="116" fill={C.teal} size={13}>
            mer O₃
          </L>
          <rect x="200" y="250" width="400" height="22" fill={C.low} opacity="0.25" />
          <L x="400" y="242" fill={C.low} size={13} anchor="middle">
            bakkenært ozon er noe annet
          </L>
        </>
      )}
    </Diagram>
  );
}

function JetFlight() {
  return (
    <Diagram
      title="Polarjeten som medvind for transatlantiske fly"
      heading="Østover med jetten. Vestover mot jetten."
      caption="Polarjeten over Nord-Atlanteren blåser vest → øst i 10–12 km høyde, der flyene går. Ruter med jetten (Nord-Amerika mot Europa) får medvind. Ruter mot jetten (Europa mot Nord-Amerika) får motvind og tar lenger tid. Les hvilken vei A og B peker mot den røde jetkjernen."
      viewBox="0 0 840 280"
    >
      {(m) => (
        <>
          <L x="80" y="50" fill={C.muted} size={13}>
            Nord-Amerika
          </L>
          <L x="760" y="50" fill={C.muted} size={13} anchor="end">
            Europa
          </L>
          <path d="M 80 130 C 240 90, 480 90, 760 130" fill="none" stroke={C.low} strokeWidth="10" opacity="0.35" />
          <Arrow d="M 120 128 L 700 128" marker={m.low} color={C.low} width={3.2} />
          <L x="420" y="108" fill={C.low} size={14} anchor="middle">
            polarjet vest → øst
          </L>
          <Arrow d="M 160 190 L 680 190" marker={m.teal} color={C.teal} width={2.4} />
          <L x="420" y="214" fill={C.teal} size={13} anchor="middle">
            østgående · medvind
          </L>
          <Arrow d="M 680 240 L 160 240" marker={m.muted} color={C.muted} width={2} dash="6 5" />
          <L x="420" y="268" fill={C.muted} size={13} anchor="middle">
            vestgående · motvind
          </L>
        </>
      )}
    </Diagram>
  );
}
