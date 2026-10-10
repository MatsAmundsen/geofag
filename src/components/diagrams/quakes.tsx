import { Arrow, C, Diagram, L } from "./svg-kit";

function Star({ x, y, r = 7 }: { x: number; y: number; r?: number }) {
  const inner = r * 0.38;
  const d = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4 - Math.PI / 2;
    const rad = i % 2 === 0 ? r : inner;
    const cmd = i === 0 ? "M" : "L";
    return `${cmd} ${x + Math.cos(a) * rad} ${y + Math.sin(a) * rad}`;
  }).join(" ");
  return <path d={`${d} Z`} fill={C.low} />;
}

export function BoundaryQuakesDiagram() {
  return (
    <Diagram
      title="Skjelv ved rygg, transform og der en plate synker."
      heading="Skjelv ved plategrenser"
      caption="Jordskjelv ved de tre typene plategrenser. Ved midthavsryggen og transformforkastningen er skjelvene grunne. Der en plate synker, kan skjelvene ligge helt ned mot ca. 700 km dybde og bli svært store."
      viewBox="0 0 820 400"
    >
      {(m) => (
        <>
          <rect x="40" y="248" width="740" height="112" fill="#152028" />
          <L x="56" y="312" fill={C.muted} size={14}>
            astenosfære (duktil mantel)
          </L>

          <path
            d="M 40 168 H 130 L 155 128 L 180 168 H 430 L 500 168 L 700 348 H 40 Z"
            fill="#3a3428"
          />
          <path
            d="M 40 148 H 130 L 155 112 L 180 148 H 430 L 500 148 L 518 168 H 180 L 155 136 L 130 168 H 40 Z"
            fill={C.sand}
          />
          <path d="M 500 148 L 700 348 L 780 348 L 780 148 Z" fill="#3a3428" />
          <path
            d="M 500 70 L 540 118 L 590 92 L 650 128 L 710 88 L 760 122 L 780 70 V 148 H 500 Z"
            fill="#4d5c55"
          />
          <path
            d="M 40 70 H 500 V 148 H 180 L 155 112 L 130 148 H 40 Z"
            fill="#16303a"
            opacity="0.85"
          />

          <path d="M 140 248 L 155 118 L 170 248 Z" fill={C.warm} opacity="0.92" />
          <Arrow d="M 155 236 L 155 122" marker={m.warm} color={C.warm} width={2.6} />

          <line
            x1="340"
            y1="70"
            x2="340"
            y2="248"
            stroke={C.teal}
            strokeWidth="2.4"
            strokeDasharray="7 5"
          />
          <circle cx="318" cy="128" r="7" fill="none" stroke={C.teal} strokeWidth="2" />
          <circle cx="318" cy="128" r="2.2" fill={C.teal} />
          <circle cx="362" cy="128" r="7" fill="none" stroke={C.teal} strokeWidth="2" />
          <path d="M 357 123 L 367 133 M 367 123 L 357 133" stroke={C.teal} strokeWidth="1.8" />

          <Arrow d="M 220 140 L 430 140 L 620 320" marker={m.low} color={C.low} width={2.8} />

          <ellipse cx="600" cy="210" rx="24" ry="16" fill={C.warm} opacity="0.85" />
          <Arrow d="M 600 200 L 638 118" marker={m.warm} color={C.warm} width={2.4} />
          <path d="M 618 70 L 642 118 L 666 70 Z" fill={C.low} />

          <Star x={155} y={132} />
          <Star x={340} y={132} />
          <Star x={530} y={188} r={6.5} />
          <Star x={590} y={248} r={6.5} />
          <Star x={650} y={308} r={6.5} />

          <Arrow d="M 188 102 L 162 126" marker={m.low} color={C.low} width={2} />
          <Arrow d="M 372 102 L 348 126" marker={m.low} color={C.low} width={2} />
          <Arrow d="M 560 168 L 538 184" marker={m.low} color={C.low} width={2} />

          <L x="96" y={96} fill={C.cold} size={14}>
            midthavsrygg
          </L>
          <L x="188" y={92} fill={C.low} size={13}>
            grunne skjelv
          </L>
          <L x="348" y={92} fill={C.low} size={13} anchor="middle">
            transform
          </L>
          <L x="56" y="198" fill={C.muted} size={14}>
            litosfære
          </L>
          <L x="430" y="218" fill={C.low} size={14}>
            synkende plate
          </L>
          <L x="560" y="168" fill={C.low} size={13} anchor="end">
            skjelv i platen
          </L>
          <L x="680" y="58" fill={C.low} size={15}>
            vulkanbue
          </L>
        </>
      )}
    </Diagram>
  );
}

export function SeismogramDiagram() {
  const epicenter = { x: 206, y: 328 };
  const stations = [
    { name: "A", x: 158, y: 300, color: C.teal },
    { name: "B", x: 270, y: 306, color: C.warm },
    { name: "C", x: 198, y: 386, color: C.cold },
  ];
  return (
    <Diagram
      title="Seismogram med P-, S- og overflatebølger, og tre stasjoner som krysser i episenteret"
      heading="P-bølger, S-bølger og lokalisering av episenter"
      caption="Seismogrammet viser at P-bølgen kommer først, så S-bølgen og til slutt overflatebølgene med størst utslag. Tiden mellom P og S forteller hvor langt unna skjelvet var. Med avstanden fra tre stasjoner, A, B og C, kan vi tegne tre sirkler. Der de krysser, ligger episenteret."
      viewBox="0 0 840 460"
    >
      {() => (
        <>
          <rect x="24" y="18" width="792" height="176" rx="8" fill="#111c24" stroke={C.dim} strokeWidth="1.6" />
          <L x="40" y="40" fill={C.muted} size={13} weight={600}>
            tid etter bruddet
          </L>
          <line x1="48" y1="102" x2="790" y2="102" stroke="#1f2f3a" strokeWidth="1.2" strokeDasharray="4 4" />
          <path d="M 48 102 L 100 101 L 140 103 L 168 102" fill="none" stroke={C.dim} strokeWidth="1.8" />
          <path
            d="M 168 102 L 178 90 L 188 114 L 198 92 L 208 112 L 222 98 L 236 108 L 258 100 L 286 104 L 318 102"
            fill="none"
            stroke={C.teal}
            strokeWidth="2.2"
          />
          <path
            d="M 318 102 L 332 74 L 346 132 L 360 78 L 374 126 L 388 88 L 404 118 L 424 102"
            fill="none"
            stroke={C.warm}
            strokeWidth="2.4"
          />
          <path
            d="M 500 102 L 518 52 L 538 156 L 558 58 L 578 148 L 598 72 L 618 134 L 638 90 L 656 118 L 674 102"
            fill="none"
            stroke={C.low}
            strokeWidth="2.6"
          />
          <line x1="168" y1="56" x2="168" y2="148" stroke={C.teal} strokeDasharray="3 3" strokeWidth="1.3" />
          <line x1="318" y1="56" x2="318" y2="148" stroke={C.warm} strokeDasharray="3 3" strokeWidth="1.3" />
          <line x1="500" y1="56" x2="500" y2="148" stroke={C.low} strokeDasharray="3 3" strokeWidth="1.3" />
          <line x1="168" y1="148" x2="318" y2="148" stroke={C.sand} strokeWidth="2" />
          <L x="243" y="142" fill={C.sand} size={12} weight={700} anchor="middle">
            tidsforskjell gir avstand
          </L>
          <L x="168" y="176" fill={C.teal} size={13} weight={700} anchor="middle">
            P kommer først
          </L>
          <L x="360" y="176" fill={C.warm} size={13} weight={700} anchor="middle">
            S kommer etter
          </L>
          <L x="590" y="176" fill={C.low} size={13} weight={700} anchor="middle">
            overflatebølger sist
          </L>

          <rect x="24" y="206" width="392" height="236" rx="8" fill="#152028" stroke={C.dim} strokeWidth="1.4" />
          <L x="220" y="230" fill={C.fg} size={14} weight={700} anchor="middle">
            Tre stasjoner, ett episenter
          </L>
          {stations.map((station) => {
            const radius = Math.hypot(station.x - epicenter.x, station.y - epicenter.y);
            return (
              <g key={station.name}>
                <circle
                  cx={station.x}
                  cy={station.y}
                  r={radius}
                  fill="none"
                  stroke={station.color}
                  strokeWidth="1.7"
                  strokeDasharray="4 3"
                />
                <circle cx={station.x} cy={station.y} r="3.4" fill={station.color} />
                <L
                  x={station.x + (station.name === "B" ? 8 : station.name === "C" ? 0 : -14)}
                  y={station.y + (station.name === "C" ? 16 : -8)}
                  fill={station.color}
                  size={12}
                  weight={700}
                  anchor={station.name === "C" ? "middle" : "start"}
                >
                  {station.name}
                </L>
              </g>
            );
          })}
          <Star x={epicenter.x} y={epicenter.y} r={7} />
          <L x={epicenter.x + 14} y={epicenter.y - 10} fill={C.low} size={12} weight={700}>
            episenter
          </L>

          <rect x="432" y="206" width="384" height="236" rx="8" fill="#16222b" stroke={C.dim} strokeWidth="1.4" />
          <L x="456" y="234" fill={C.teal} size={13} weight={700}>
            P-bølge
          </L>
          <L x="580" y="234" fill={C.warm} size={13} weight={700}>
            S-bølge
          </L>
          <L x="692" y="234" fill={C.low} size={13} weight={700}>
            Overflate
          </L>
          <line x1="448" y1="246" x2="800" y2="246" stroke={C.dim} />
          <L x="456" y="272" fill={C.fg} size={12}>
            kompresjon
          </L>
          <L x="580" y="272" fill={C.fg} size={12}>
            skjær
          </L>
          <L x="692" y="272" fill={C.fg} size={12}>
            langs bakken
          </L>
          <L x="456" y="298" fill={C.muted} size={12}>
            langs bølgen
          </L>
          <L x="580" y="298" fill={C.muted} size={12}>
            på tvers
          </L>
          <L x="692" y="298" fill={C.muted} size={12}>
            Rayleigh og Love
          </L>
          <L x="456" y="332" fill={C.fg} size={12}>
            fast og væske
          </L>
          <L x="580" y="332" fill={C.fg} size={12}>
            bare fast stoff
          </L>
          <L x="692" y="332" fill={C.fg} size={12}>
            størst utslag
          </L>
          <L x="456" y="366" fill={C.teal} size={12}>
            kommer først
          </L>
          <L x="580" y="366" fill={C.warm} size={12}>
            kommer etter
          </L>
          <L x="692" y="366" fill={C.low} size={12}>
            rister husene
          </L>
          <L x="456" y="408" fill={C.muted} size={12}>
            Større tidsforskjell, større avstand.
          </L>
        </>
      )}
    </Diagram>
  );
}

export {
  CalderaFormationDiagram,
  IcelandContrastDiagram,
  JanMayenDiagram,
  MagmaViscosityDiagram,
  VeiScaleDiagram,
  VolcanicHazardsDiagram,
  VolcanicWinterDiagram,
  VolcanoEruptionAnatomyDiagram,
  VolcanoMonitoringDiagram,
  VolcanoTypesDiagram,
} from "./volcanoes";

export function EarthquakeWavePhysicsDiagram() {
  const globe = { cx: 0, cy: 0, r: 108 };
  const rc = globe.r * 0.55;
  const ri = globe.r * 0.2;
  const rim = (deg: number, r: number) => {
    const a = -Math.PI / 2 + (deg * Math.PI) / 180;
    return { x: r * Math.cos(a), y: r * Math.sin(a) };
  };
  const s103 = rim(103, globe.r);
  const s103b = rim(-103, globe.r);
  const p140 = rim(140, globe.r);
  const p140b = rim(-140, globe.r);
  return (
    <Diagram
      title="P-bølger går gjennom væske, S-bølger stopper, og skyggesonene"
      heading="Hvorfor den ytre kjernen må være flytende"
      caption="P-bølger er kompresjon og går gjennom både fast berg og væske. S-bølger er skjær og stopper i væske. Derfor kommer ikke S-bølgene fram lenger ut enn om lag 103 grader. Direkte P-bølger mangler mellom om lag 103 og 140 grader, fordi de bøyes av ved grensen mot kjernen. R.D. Oldham så dette i jordskjelvregistreringer i 1906."
      viewBox="0 0 880 460"
    >
      {() => (
        <>
          <rect x="20" y="16" width="400" height="428" rx="8" fill="#131c24" stroke={C.dim} strokeWidth="1.4" />
          <L x="40" y="44" fill={C.fg} size={15} weight={700}>
            Hvordan stoffet beveger seg
          </L>

          <rect x="36" y="60" width="368" height="160" rx="6" fill="#1a252f" />
          <L x="52" y="84" fill={C.teal} size={14} weight={700}>
            P-bølge: kompresjon langs bølgen
          </L>
          <g transform="translate(52, 100)">
            {[0, 16, 48, 78, 110, 126, 158, 188, 220, 236].map((x, index) => (
              <rect
                key={x}
                x={x}
                y="0"
                width="14"
                height="40"
                fill={C.teal}
                opacity={index % 4 < 2 ? 0.85 : 0.28}
              />
            ))}
          </g>
          <L x="52" y="164" fill={C.fg} size={12}>
            Stoffet skyves og trekkes langs bølgen.
          </L>
          <L x="52" y="184" fill={C.muted} size={12}>
            Går gjennom fast berg og væske.
          </L>
          <L x="52" y="204" fill={C.teal} size={12}>
            Tett er skyv. Glissent er trekk.
          </L>

          <rect x="36" y="236" width="368" height="188" rx="6" fill="#221b1e" />
          <L x="52" y="260" fill={C.warm} size={14} weight={700}>
            S-bølge: skjær, på tvers
          </L>
          <path
            d="M 52 320 Q 92 286 132 320 T 212 320 T 292 320 T 372 320"
            fill="none"
            stroke={C.warm}
            strokeWidth="3.2"
          />
          <path d="M 92 300 V 284 M 92 284 L 87 292 M 92 284 L 97 292" stroke={C.sand} strokeWidth="1.8" />
          <path d="M 172 340 V 356 M 172 356 L 167 348 M 172 356 L 177 348" stroke={C.sand} strokeWidth="1.8" />
          <L x="52" y="378" fill={C.fg} size={12}>
            Stoffet beveger seg på tvers av bølgen.
          </L>
          <L x="52" y="398" fill={C.low} size={12} weight={700}>
            I væske stopper S-bølgen.
          </L>

          <rect x="440" y="16" width="420" height="428" rx="8" fill="#121820" stroke={C.dim} strokeWidth="1.4" />
          <L x="460" y="44" fill={C.fg} size={15} weight={700}>
            Skyggesonen rundt kjernen
          </L>
          <g transform="translate(650, 188)">
            <circle r={globe.r} fill="#2d251d" stroke="#524335" strokeWidth="2" />
            <circle r={rc} fill="#4d1b1f" stroke={C.low} strokeWidth="2" />
            <circle r={ri} fill={C.warm} />
            <path
              d={`M ${rim(103, globe.r + 6).x.toFixed(1)} ${rim(103, globe.r + 6).y.toFixed(1)} A ${globe.r + 6} ${globe.r + 6} 0 0 1 ${rim(257, globe.r + 6).x.toFixed(1)} ${rim(257, globe.r + 6).y.toFixed(1)}`}
              fill="none"
              stroke={C.warm}
              strokeWidth="7"
              opacity="0.9"
            />
            <path
              d={`M ${rim(103, globe.r + 16).x.toFixed(1)} ${rim(103, globe.r + 16).y.toFixed(1)} A ${globe.r + 16} ${globe.r + 16} 0 0 1 ${rim(140, globe.r + 16).x.toFixed(1)} ${rim(140, globe.r + 16).y.toFixed(1)}`}
              fill="none"
              stroke={C.teal}
              strokeWidth="5"
            />
            <path
              d={`M ${rim(-140, globe.r + 16).x.toFixed(1)} ${rim(-140, globe.r + 16).y.toFixed(1)} A ${globe.r + 16} ${globe.r + 16} 0 0 1 ${rim(-103, globe.r + 16).x.toFixed(1)} ${rim(-103, globe.r + 16).y.toFixed(1)}`}
              fill="none"
              stroke={C.teal}
              strokeWidth="5"
            />
            <line x1="0" y1={-globe.r + 6} x2="0" y2={-rc - 3} stroke={C.warm} strokeWidth="2" />
            <line x1="0" y1={-globe.r + 6} x2={-46} y2={-rc + 8} stroke={C.warm} strokeWidth="1.6" />
            <line x1="0" y1={-globe.r + 6} x2={46} y2={-rc + 8} stroke={C.warm} strokeWidth="1.6" />
            <Star x={0} y={-globe.r + 2} r={7} />
            <L x="0" y={-globe.r - 10} fill={C.low} size={12} weight={700} anchor="middle">
              hyposenter
            </L>
            <L x={s103.x + 8} y={s103.y + 4} fill={C.warm} size={11} weight={700}>
              103°
            </L>
            <L x={s103b.x - 8} y={s103b.y + 4} fill={C.warm} size={11} weight={700} anchor="end">
              103°
            </L>
            <L x={p140.x + 6} y={p140.y + 12} fill={C.teal} size={11} weight={700}>
              140°
            </L>
            <L x={p140b.x - 6} y={p140b.y + 12} fill={C.teal} size={11} weight={700} anchor="end">
              140°
            </L>
          </g>
          <L x="460" y="328" fill={C.low} size={12} weight={700}>
            hyposenter øverst på globusen
          </L>
          <L x="460" y="350" fill={C.warm} size={12}>
            S stopper i den flytende ytre kjernen.
          </L>
          <L x="460" y="370" fill={C.warm} size={12}>
            S kommer ikke ut forbi om lag 103°.
          </L>
          <L x="460" y="390" fill={C.teal} size={12}>
            Direkte P mangler mellom 103° og 140°.
          </L>
          <L x="460" y="414" fill={C.muted} size={12}>
            Indre kjerne er fast. Oldham, 1906.
          </L>
        </>
      )}
    </Diagram>
  );
}

export {
  ElasticReboundDiagram,
  JordasBolgerDiagram,
  PartikkelbolgerDiagram,
} from "./quake-motion";

export function NorwayEarthquakesDiagram() {
  return (
    <Diagram
      title="Norges seismiske risikobilde og historiske jordskjelv"
      heading="Hvorfor skjelver Norge når vi ikke er på en plategrense?"
      caption="Ifølge NORSAR skyldes skjelvene i Norge spenning fra spredningen langs Den midtatlantiske ryggen, gamle rifter i Nordsjøen og landhevingen etter siste istid. Kartet viser også de to mest kjente historiske skjelvene på fastlandet: Helgeland/Lurøy 1819 (magnitude ca. 5,8) og Oslofjordskjelvet 1904 (magnitude 5,4)."
      viewBox="0 0 880 430"
    >
      {() => (
        <>
          {/* Kartbakgrunn Norskehavet og Norge */}
          <rect x="25" y="25" width="480" height="380" rx="8" fill="#111c26" stroke={C.dim} strokeWidth="1.4" />
          
          {/* Norskekysten stilisert kartkontur */}
          <path
            d="M 330 380 Q 280 340 270 290 Q 250 250 290 200 Q 320 170 340 120 Q 370 80 430 45 L 490 45 V 380 Z"
            fill="#2c372e"
            stroke="#47594a"
            strokeWidth="1.8"
          />

          {/* Midthavsryggen og Jan Mayen i vest */}
          <line x1="80" y1="40" x2="140" y2="360" stroke={C.warm} strokeWidth="3" strokeDasharray="6 4" />
          <L x="155" y="58" fill={C.warm} size={12} weight={700}>
            Den midtatlantiske rygg
          </L>
          {/* Jan Mayen vulkan */}
          {/* Ryggskyv-vektorer mot øst */}
          <path d="M 125 100 L 220 120" stroke={C.teal} strokeWidth="2.5" />
          <path d="M 220 120 L 210 112 M 220 120 L 212 126" stroke={C.teal} strokeWidth="2.5" />

          <path d="M 140 220 L 230 235" stroke={C.teal} strokeWidth="2.5" />
          <path d="M 230 235 L 220 227 M 230 235 L 222 241" stroke={C.teal} strokeWidth="2.5" />
          <L x="155" y="252" fill={C.teal} size={12} weight={700}>
            spredning mot land
          </L>

          <Star x={318} y={148} r={10} />
          <L x="336" y="144" fill={C.low} size={12} weight={700}>
            Lurøy 1819
          </L>
          <L x="336" y="160" fill="#fca5a5" size={11}>
            magnitude ca. 5,8
          </L>

          {/* Oslofjordskjelvet 1904: ytre Oslofjord, sør for Hvaler (Bungum mfl., 2009) */}
          <Star x={334} y={384} r={8} />
          <L x="168" y="386" fill={C.low} size={12} weight={700}>
            Oslofjordskjelvet 1904
          </L>
          <L x="168" y="402" fill="#fca5a5" size={11}>
            magnitude 5,4
          </L>

          <L x="168" y="300" fill={C.fg} size={12} weight={600}>
            Nordsjøen: gamle rifter
          </L>

          {/* Høyre panel: Forklaringstabell og risikofakta */}
          <rect x="525" y="25" width="330" height="380" rx="8" fill="#131a22" stroke={C.dim} strokeWidth="1.4" />
          <L x="545" y="52" fill={C.sand} size={15} weight={700}>
            Tre spor, ifølge NORSAR
          </L>

          <rect x="540" y="68" width="300" height="188" rx="6" fill="#1a232c" />
          <L x="552" y="90" fill={C.teal} size={12} weight={700}>
            Svalbard
          </L>
          <L x="552" y="108" fill={C.fg} size={12}>
            Spredning fra ryggen kan
          </L>
          <L x="552" y="126" fill={C.fg} size={12}>
            reaktivere forkastninger.
          </L>
          <L x="552" y="150" fill={C.warm} size={12} weight={700}>
            Nordsjøen
          </L>
          <L x="552" y="168" fill={C.fg} size={12}>
            Gamle rifter. Spenning fra
          </L>
          <L x="552" y="186" fill={C.fg} size={12}>
            ryggen eller fra landheving.
          </L>
          <L x="552" y="210" fill={C.sand} size={12} weight={700}>
            Nordland
          </L>
          <L x="552" y="228" fill={C.fg} size={12}>
            Landheving og sedimenter.
          </L>
          <L x="552" y="246" fill={C.muted} size={12}>
            Lurøy 1819, magnitude ca. 5,8.
          </L>

          <rect x="540" y="320" width="300" height="72" rx="6" fill="#241a1c" />
          <L x="552" y="342" fill={C.low} size={12} weight={700}>
            1904: magnitude 5,4, ytre Oslofjord
          </L>
          <L x="552" y="362" fill={C.muted} size={12}>
            Tettere bygg kan gi mer skade.
          </L>
          <L x="552" y="382" fill={C.muted} size={12}>
            UiB og NORSAR overvåker.
          </L>
        </>
      )}
    </Diagram>
  );
}
