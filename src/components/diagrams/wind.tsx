import { Arrow, C, Diagram, L } from "./svg-kit";

export function InsolationDiagram() {
  return (
    <Diagram
      title="Ujevn solinnstråling"
      heading="Sola treffer jorda skjevt"
      caption="Samme solstråle-pakke treffer et lite areal ved ekvator og et stort, skrått areal mot polene. Tropene får energioverskudd, polene underskudd. Det er motoren i det globale vindsystemet."
      viewBox="0 0 820 360"
    >
      {(m) => (
        <>
          {Array.from({ length: 7 }).map((_, i) => {
            const y = 48 + i * 38;
            return (
              <Arrow
                key={i}
                d={`M 40 ${y} L 250 ${y}`}
                marker={m.warm}
                color={C.warm}
                width={i === 3 ? 3.2 : 2}
              />
            );
          })}
          <L x="40" y="32" fill={C.warm} size={14}>
            parallell solstråling
          </L>
          <circle cx="430" cy="180" r="118" fill="#152028" stroke={C.teal} strokeWidth="2" />
          <ellipse cx="430" cy="180" rx="42" ry="118" fill="none" stroke={C.dim} />
          <line x1="312" y1="180" x2="548" y2="180" stroke={C.dim} />
          <L x="430" y="176" fill={C.warm} size={14} anchor="middle">
            ekvator
          </L>
          <L x="430" y="78" fill={C.cold} size={14} anchor="middle">
            pol
          </L>
          <L x="430" y="300" fill={C.cold} size={14} anchor="middle">
            pol
          </L>
          <path d="M 318 180 L 318 148 L 360 180 Z" fill={C.warm} opacity="0.85" />
          <path d="M 352 78 L 390 52 L 404 92 Z" fill={C.cold} opacity="0.7" />
          <L x="590" y="150" fill={C.warm} size={15}>
            liten flate · høy innstråling
          </L>
          <L x="590" y="172" fill={C.muted} size={13}>
            energioverskudd
          </L>
          <L x="590" y="84" fill={C.cold} size={15}>
            stor, skrå flate
          </L>
          <L x="590" y="106" fill={C.muted} size={13}>
            energiunderskudd
          </L>
        </>
      )}
    </Diagram>
  );
}

export function OneVsThreeCellsDiagram() {
  return (
    <Diagram
      title="Én celle uten rotasjon, tre celler med rotasjon"
      heading="Jordrotasjon splitter den store cellen"
      caption="Uten rotasjon ville varm luft steget ved ekvator og sunket ved polen — én celle. Coriolis bøyer de meridiant strømmene av, og troposfæren deler seg i tre celler på hver halvkule."
      viewBox="0 0 820 340"
    >
      {(m) => (
        <>
          <L x="205" y="36" size={16} anchor="middle" weight={600}>
            Uten rotasjon
          </L>
          <L x="615" y="36" size={16} anchor="middle" weight={600}>
            Med rotasjon
          </L>
          <line x1="410" y1="50" x2="410" y2="310" stroke={C.dim} />
          <path d="M 80 280 Q 80 70 205 70 Q 330 70 330 280" fill="none" stroke={C.dim} strokeWidth="2" />
          <Arrow d="M 100 250 L 100 110" marker={m.warm} color={C.warm} width={2.6} />
          <Arrow d="M 120 90 L 300 90" marker={m.cold} color={C.cold} width={2.6} />
          <Arrow d="M 310 110 L 310 250" marker={m.muted} color={C.muted} width={2.6} />
          <Arrow d="M 290 270 L 120 270" marker={m.teal} color={C.teal} width={2.6} />
          <L x="205" y="318" fill={C.muted} size={13} anchor="middle">
            ekvator → pol
          </L>
          {[0, 1, 2].map((i) => {
            const x = 470 + i * 105;
            return (
              <g key={i}>
                <ellipse
                  cx={x}
                  cy="180"
                  rx="46"
                  ry="88"
                  fill="none"
                  stroke={i === 1 ? C.muted : C.teal}
                  strokeWidth="2"
                />
              </g>
            );
          })}
          <Arrow d="M 430 240 L 430 130" marker={m.warm} color={C.warm} />
          <Arrow d="M 568 130 L 568 240" marker={m.muted} color={C.muted} />
          <Arrow d="M 640 240 L 640 130" marker={m.warm} color={C.warm} />
          <Arrow d="M 772 130 L 772 240" marker={m.cold} color={C.cold} />
          <L x="470" y="186" fill={C.teal} size={13} anchor="middle">
            Hadley
          </L>
          <L x="575" y="186" fill={C.muted} size={13} anchor="middle">
            Ferrel
          </L>
          <L x="680" y="186" fill={C.cold} size={13} anchor="middle">
            Polar
          </L>
          <L x="615" y="318" fill={C.muted} size={13} anchor="middle">
            0° · 30° · 60° · 90°
          </L>
        </>
      )}
    </Diagram>
  );
}

export function WindCellsDiagram() {
  return (
    <Diagram
      title="De tre sirkulasjonscellene på nordlig halvkule"
      heading="Hadley, Ferrel og polarcellen"
      caption="Luft stiger der den er varmest eller tvinges opp, og synker der den er kald eller har mistet varme. Overflatevinden mellom cellene blir passater, vestavind og polare østavinder. Ferrel-cellen går «motsatt vei» av de to andre."
      viewBox="0 0 840 430"
    >
      {(m) => (
        <>
          <L x="40" y="28" fill={C.muted} size={13}>
            tropopause
          </L>
          <line x1="36" y1="44" x2="804" y2="44" stroke={C.dim} strokeDasharray="5 5" />
          <line x1="36" y1="300" x2="804" y2="300" stroke={C.teal} strokeWidth="2.2" />
          <L x="40" y="322" fill={C.muted} size={13}>
            jordoverflaten
          </L>

          <Arrow d="M 90 270 L 90 80" marker={m.warm} color={C.warm} width={3} />
          <Arrow d="M 100 72 L 268 72" marker={m.warm} color={C.warm} width={2.6} />
          <Arrow d="M 280 80 L 280 270" marker={m.muted} color={C.sand} width={3} />
          <Arrow d="M 268 290 L 108 290" marker={m.teal} color={C.teal} width={2.8} />

          <Arrow d="M 292 290 L 508 290" marker={m.teal} color={C.teal} width={2.8} />
          <Arrow d="M 520 270 L 520 80" marker={m.warm} color={C.warm} width={3} />
          <Arrow d="M 508 100 L 300 100" marker={m.muted} color={C.muted} width={2.4} />

          <Arrow d="M 760 80 L 760 270" marker={m.cold} color={C.cold} width={3} />
          <Arrow d="M 548 72 L 748 72" marker={m.cold} color={C.cold} width={2.4} />
          <Arrow d="M 748 290 L 548 290" marker={m.cold} color={C.cold} width={2.6} />

          <circle cx="90" cy="62" r="10" fill={C.rain} opacity="0.9" />
          <circle cx="78" cy="50" r="6" fill={C.rain} opacity="0.6" />
          <circle cx="104" cy="48" r="7" fill={C.rain} opacity="0.7" />
          <circle cx="520" cy="58" r="10" fill={C.rain} opacity="0.85" />
          <circle cx="508" cy="46" r="6" fill={C.rain} opacity="0.55" />

          <L x="90" y="160" fill={C.warm} size={13} anchor="middle">
            stiger
          </L>
          <L x="90" y="178" fill={C.muted} size={12} anchor="middle">
            lavtrykk · regn
          </L>
          <L x="280" y="160" fill={C.sand} size={13} anchor="middle">
            synker
          </L>
          <L x="280" y="178" fill={C.muted} size={12} anchor="middle">
            høytrykk · tørt
          </L>
          <L x="520" y="160" fill={C.warm} size={13} anchor="middle">
            stiger
          </L>
          <L x="520" y="178" fill={C.muted} size={12} anchor="middle">
            polarfront
          </L>
          <L x="760" y="160" fill={C.cold} size={13} anchor="middle">
            synker
          </L>
          <L x="760" y="178" fill={C.muted} size={12} anchor="middle">
            polarhøytrykk
          </L>

          <L x="185" y="248" fill={C.teal} size={15} anchor="middle" weight={600}>
            Hadley
          </L>
          <L x="400" y="248" fill={C.muted} size={15} anchor="middle" weight={600}>
            Ferrel
          </L>
          <L x="640" y="248" fill={C.cold} size={15} anchor="middle" weight={600}>
            Polar
          </L>

          <L x="185" y="348" fill={C.fg} size={14} anchor="middle">
            passater mot ekvator
          </L>
          <L x="400" y="348" fill={C.fg} size={14} anchor="middle">
            vestavind mot polen
          </L>
          <L x="640" y="348" fill={C.fg} size={14} anchor="middle">
            polare østavinder
          </L>

          <L x="90" y="400" size={14} anchor="middle">
            0°
          </L>
          <L x="280" y="400" size={14} anchor="middle">
            30°
          </L>
          <L x="520" y="400" size={14} anchor="middle">
            60°
          </L>
          <L x="760" y="400" size={14} anchor="middle">
            90°
          </L>
          <L x="90" y="418" fill={C.muted} size={12} anchor="middle">
            ekvator
          </L>
          <L x="760" y="418" fill={C.muted} size={12} anchor="middle">
            nordpolen
          </L>
        </>
      )}
    </Diagram>
  );
}

export function HadleyCloseupDiagram() {
  return (
    <Diagram
      title="Hadley-cellen i nærbilde"
      heading="Den tropiske motoren, steg for steg"
      caption="Varm, fuktig luft stiger ved ekvator, gir byger, strømmer polover i høyden, synker tørr og varm rundt 30° og kommer tilbake som passat. Ørkenene under det subtropiske høytrykket er en direkte følge av synkende luft."
      viewBox="0 0 820 360"
    >
      {(m) => (
        <>
          <rect x="40" y="300" width="740" height="22" fill="#1a2a24" />
          <L x="50" y="316" fill={C.muted} size={12}>
            hav / land
          </L>
          <Arrow d="M 110 280 L 110 70" marker={m.warm} color={C.warm} width={3.2} />
          <path
            d="M 80 92 C 95 40, 130 40, 145 92"
            fill="none"
            stroke={C.rain}
            strokeWidth="8"
            opacity="0.45"
          />
          <path d="M 88 100 C 100 58, 128 58, 138 100" fill={C.rain} opacity="0.7" />
          <L x="112" y="48" fill={C.rain} size={14} anchor="middle">
            kondensasjon · byger
          </L>
          <Arrow d="M 150 78 L 620 78" marker={m.warm} color={C.warm} width={2.8} />
          <L x="380" y="62" fill={C.warm} size={14} anchor="middle">
            øvre utstrømning mot 30°
          </L>
          <Arrow d="M 650 90 L 650 280" marker={m.muted} color={C.sand} width={3.2} />
          <L x="668" y="170" fill={C.sand} size={14}>
            synker · tørker
          </L>
          <L x="668" y="190" fill={C.muted} size={13}>
            adiabatisk oppvarming
          </L>
          <rect x="600" y="268" width="120" height="32" fill={C.sand} opacity="0.35" rx="4" />
          <L x="660" y="290" fill={C.sand} size={13} anchor="middle">
            ørken
          </L>
          <Arrow d="M 620 292 L 160 292" marker={m.teal} color={C.teal} width={3} />
          <L x="380" y="278" fill={C.teal} size={14} anchor="middle">
            passat tilbake mot ekvator
          </L>
          <L x="112" y="348" size={14} anchor="middle">
            ekvator · lavtrykk
          </L>
          <L x="650" y="348" size={14} anchor="middle">
            ~30° · høytrykk
          </L>
        </>
      )}
    </Diagram>
  );
}

export function ClimateBeltsDiagram() {
  return (
    <Diagram
      title="Klima som følge av stigende og synkende luft"
      heading="Regn der luft stiger, ørken der den synker"
      caption="Globale klimabelter følger cellene: tropisk regn ved ekvator, subtropiske ørkener rundt 30°, milde og ofte fuktige midlere bredder, og kaldt, tørt høytrykk over polene."
      viewBox="0 0 820 300"
    >
      {() => (
        <>
          {[
            { y: 54, h: 48, fill: C.rain, label: "Tropisk regnbelte  ·  stigende luft", t: C.bg },
            { y: 102, h: 52, fill: C.sand, label: "Subtropisk ørken  ·  synkende luft (~30°)", t: C.bg },
            { y: 154, h: 52, fill: "#3d5c66", label: "Vestavindsbelte  ·  Norge ligger her", t: C.fg },
            { y: 206, h: 48, fill: "#2a3d4a", label: "Polarfront og polarluft  ·  kaldt", t: C.fg },
          ].map((b) => (
            <g key={b.label}>
              <rect x="40" y={b.y} width="740" height={b.h} fill={b.fill} opacity="0.85" rx="6" />
              <L x="410" y={b.y + b.h / 2 + 6} fill={b.t} size={16} anchor="middle">
                {b.label}
              </L>
            </g>
          ))}
        </>
      )}
    </Diagram>
  );
}

export function SurfaceWindsDiagram() {
  return (
    <Diagram
      title="Overflatevinder på nordlig halvkule"
      heading="Tre vindbelter, tre retninger"
      caption="Passatene blåser mot ekvator, men coriolis dreier dem til nordøstpassat. Mellom 30° og 60° dominerer vestavind. Innenfor polarcellen blåser polare østavinder. Norge ligger i vestavindsbeltet."
      viewBox="0 0 820 360"
    >
      {(m) => (
        <>
          <rect x="90" y="40" width="640" height="260" fill="#122026" rx="8" />
          {[40, 127, 213, 300].map((y, i) => (
            <line key={y} x1="90" y1={y} x2="730" y2={y} stroke={C.dim} />
          ))}
          <L x="78" y="46" fill={C.muted} size={13} anchor="end">
            90°
          </L>
          <L x="78" y="133" fill={C.muted} size={13} anchor="end">
            60°
          </L>
          <L x="78" y="219" fill={C.muted} size={13} anchor="end">
            30°
          </L>
          <L x="78" y="306" fill={C.muted} size={13} anchor="end">
            0°
          </L>
          <Arrow d="M 200 80 L 360 80" marker={m.cold} color={C.cold} width={3} />
          <Arrow d="M 420 80 L 580 80" marker={m.cold} color={C.cold} width={3} />
          <L x="410" y="68" fill={C.cold} size={14} anchor="middle">
            polare østavinder
          </L>
          <Arrow d="M 360 170 L 200 170" marker={m.teal} color={C.teal} width={3.2} />
          <Arrow d="M 580 170 L 420 170" marker={m.teal} color={C.teal} width={3.2} />
          <L x="410" y="158" fill={C.teal} size={14} anchor="middle">
            vestavind (Norge)
          </L>
          <Arrow d="M 240 255 L 160 285" marker={m.warm} color={C.warm} width={3} />
          <Arrow d="M 400 255 L 320 285" marker={m.warm} color={C.warm} width={3} />
          <Arrow d="M 560 255 L 480 285" marker={m.warm} color={C.warm} width={3} />
          <L x="410" y="246" fill={C.warm} size={14} anchor="middle">
            nordøstpassat
          </L>
          <L x="410" y="340" fill={C.muted} size={13} anchor="middle">
            kartskisse, nordlig halvkule  ·  piler viser typisk overflatevind
          </L>
        </>
      )}
    </Diagram>
  );
}

export function PolarFrontNorwayDiagram() {
  return (
    <Diagram
      title="Polarfronten og været i Norge"
      heading="Der kald og varm luft møtes"
      caption="Ved ca. 60° møtes polarluft og mildere luft fra sør. Langs polarfronten dannes vandrende lavtrykk. Vestavinden fører dem inn mot Norge. Vestlandet får orografisk nedbør; Østlandet ligger oftere i regnskygge."
      viewBox="0 0 820 340"
    >
      {(m) => (
        <>
          <path d="M 40 40 H 780 V 160 Q 500 200 40 160 Z" fill="#3a2318" opacity="0.35" />
          <path d="M 40 160 Q 500 200 780 160 V 300 H 40 Z" fill="#1a3038" opacity="0.55" />
          <L x="120" y="90" fill={C.warm} size={15}>
            varm, fuktig luft
          </L>
          <L x="120" y="250" fill={C.cold} size={15}>
            kald polarluft
          </L>
          <path
            d="M 40 168 Q 180 200 320 150 Q 460 100 600 170 Q 700 210 780 150"
            fill="none"
            stroke={C.low}
            strokeWidth="3"
          />
          <L x="430" y="128" fill={C.low} size={15} anchor="middle">
            polarfront
          </L>
          <circle cx="520" cy="155" r="22" fill="none" stroke={C.low} strokeWidth="2.2" />
          <L x="520" y="160" fill={C.low} size={14} anchor="middle">
            L
          </L>
          <Arrow d="M 250 120 L 480 150" marker={m.low} color={C.low} width={2.4} />
          <L x="360" y="118" fill={C.muted} size={13}>
            lavtrykk vandrer østover
          </L>
          <path d="M 640 210 L 670 150 L 700 210 Z" fill="#4d5c55" />
          <L x="670" y="236" size={13} anchor="middle">
            Langfjella
          </L>
          <L x="600" y="270" fill={C.rain} size={13} anchor="end">
            Vestlandet: løside
          </L>
          <L x="740" y="270" fill={C.muted} size={13}>
            Østlandet: leside
          </L>
        </>
      )}
    </Diagram>
  );
}

export function JetStreamDiagram() {
  return (
    <Diagram
      title="Polarfrontjeten"
      heading="En elv av luft i 8–12 km høyde"
      caption="Der temperaturforskjellen mellom tropene og polene er stor i høyden, blir trykkforskjellen stor. Resultatet er en smal, sterk vestlig jetstrøm. Den styrer hvor lavtrykkene går — og om Norge får milde eller kalde perioder."
      viewBox="0 0 820 280"
    >
      {(m) => (
        <>
          <L x="40" y="36" fill={C.muted} size={13}>
            høyde
          </L>
          <L x="40" y="70" fill={C.muted} size={12}>
            10 km
          </L>
          <line x1="80" y1="74" x2="780" y2="74" stroke={C.dim} strokeDasharray="4 4" />
          <path
            d="M 90 88 C 200 40, 340 40, 430 88 C 520 136, 640 136, 740 88"
            fill="none"
            stroke={C.teal}
            strokeWidth="10"
            opacity="0.35"
          />
          <Arrow d="M 120 88 C 220 50, 330 50, 430 88 C 530 126, 640 126, 720 92" marker={m.teal} color={C.teal} width={3.4} />
          <L x="430" y="48" fill={C.teal} size={15} anchor="middle">
            polarfrontjet  ·  vest → øst
          </L>
          <line x1="80" y1="220" x2="780" y2="220" stroke={C.teal} strokeWidth="2" />
          <L x="90" y="244" fill={C.warm} size={14}>
            varm luft sør for fronten
          </L>
          <L x="730" y="244" fill={C.cold} size={14} anchor="end">
            kald luft nord for fronten
          </L>
          <L x="430" y="268" fill={C.muted} size={13} anchor="middle">
            overflaten
          </L>
        </>
      )}
    </Diagram>
  );
}
