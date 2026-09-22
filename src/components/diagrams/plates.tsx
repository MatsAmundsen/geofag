import { useState } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { Arrow, C, Diagram, L, PlayPauseToggle } from "./svg-kit";

/**
 * 1. EarthLayersDiagram:
 * Realistisk tverrsnitt av jordens lagdeling fra indre kjerne til skorpe,
 * med seismiske diskontinuiteter (Moho, Gutenberg, Lehmann), tettheter og reologi.
 */
export function EarthLayersDiagram() {
  return (
    <Diagram
      title="Jordens oppbygning: Kjerne, mantel, astenosfære og litosfære"
      heading="Jordens skall: Fra fast indre kjerne til bevegelige litosfæreplater"
      caption="Jordkloden er lagdelt etter tetthet og reologi. Innerst ligger den faste jern-nikkelkjernen (5150–6371 km), omgitt av den flytende ytre kjernen (2900–5150 km) som genererer jordas magnetfelt. Mantelen består av fast silikatberg (peridotitt). I den øvre mantelen (100–350 km) ligger astenosfæren – fast bergart som på grunn av høy temperatur oppfører seg plastisk og duktilt over millioner av år. Over astenosfæren hviler litosfæren: den kalde, stive platen som består av litosfærisk mantel pluss jordskorpen. Skorpen deles i tykk, lett kontinentalskorpe (granittisk, 30–70 km) og tynn, tung havbunnsskorpe (basaltisk, 5–8 km)."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="el-inner-core" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="el-outer-core" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="el-lower-mantle" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <linearGradient id="el-astheno" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e3a47" />
              <stop offset="100%" stopColor="#152731" />
            </linearGradient>
            <linearGradient id="el-cont-crust" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#54665a" />
              <stop offset="100%" stopColor="#6b7c70" />
            </linearGradient>
          </defs>

          {/* Sektor-tverrsnitt av kloden (venstre del, x=40 til x=460) */}
          <g transform="translate(60, 40)">
            {/* Bakgrunnsramme for klodesektor */}
            <rect x="0" y="0" width="400" height="420" rx="8" fill="#080f14" stroke="#1e2e38" strokeWidth="1" />
            <L x="200" y="24" fill={C.fg} size={14} weight={700} anchor="middle">
              Jordklodens konsentriske lag (radius 6371 km)
            </L>

            {/* Sektorer tegnet fra sentrum (x=200, y=390) */}
            {/* Hele mantelen og overflaten (ytre bue r=340) */}
            <path d="M 200 390 L 50 110 A 340 340 0 0 1 350 110 Z" fill="#2d2218" stroke="#3d4d57" strokeWidth="1.2" />

            {/* Nedre mantel (r=260 til r=335) */}
            <path d="M 200 390 L 78 175 A 260 260 0 0 1 322 175 Z" fill="url(#el-lower-mantle)" />

            {/* Ytre kjerne (flytende, r=130 til r=260) */}
            <path d="M 200 390 L 115 260 A 155 155 0 0 1 285 260 Z" fill="url(#el-outer-core)" />

            {/* Indre kjerne (fast, r=0 til r=70) */}
            <path d="M 200 390 L 155 330 A 70 70 0 0 1 245 330 Z" fill="url(#el-inner-core)" />

            {/* Lag-etiketter på sektoren */}
            <L x="200" y="365" fill="#000" size={11} weight={800} anchor="middle">
              Indre kjerne (fast Fe-Ni)
            </L>
            <L x="200" y="378" fill="#222" size={9.5} anchor="middle">
              ~6000 °C · 5150–6371 km
            </L>

            <L x="200" y="295" fill="#fff" size={12} weight={700} anchor="middle">
              Ytre kjerne (flytende jern/nikkel)
            </L>
            <L x="200" y="310" fill="#fed7aa" size={10} anchor="middle">
              Geodynamoen: skaper jordas magnetfelt · 2900–5150 km
            </L>

            <L x="200" y="220" fill="#fed7aa" size={12} weight={700} anchor="middle">
              Nedre mantel (mesosfære)
            </L>
            <L x="200" y="235" fill="#d1d5db" size={10} anchor="middle">
              Fast silikatberg (bridgmanitt) · 660–2900 km
            </L>

            <L x="200" y="145" fill={C.teal} size={11.5} weight={700} anchor="middle">
              Øvre mantel & astenosfære (100–660 km)
            </L>
            <L x="200" y="85" fill={C.fg} size={12} weight={800} anchor="middle">
              Litosfære (skorpe + stiv mantel, 0–100 km)
            </L>

            {/* Diskontinuiteter markert med piler */}
            <line x1="290" y1="260" x2="355" y2="260" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
            <L x="360" y="263" fill="#f59e0b" size={10} weight={600}>
              Gutenberg (~2900 km)
            </L>

            <line x1="330" y1="125" x2="365" y2="125" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
            <L x="370" y="128" fill="#38bdf8" size={10} weight={600}>
              Moho (skorpebunn)
            </L>
          </g>

          {/* Forstørret detaljsnitt av litosfæren og astenosfæren (høyre del, x=480 til x=900) */}
          <g transform="translate(490, 40)">
            <rect x="0" y="0" width="410" height="420" rx="8" fill="#0c161d" stroke="#1e2e38" strokeWidth="1" />
            <L x="205" y="24" fill={C.teal} size={14} weight={700} anchor="middle">
              Detaljsnitt: Litosfære og astenosfære side om side
            </L>

            {/* Venstre halvdel: Kontinentallitosfære (tykk) */}
            {/* Kontinentalskorpe */}
            <rect x="20" y="45" width="180" height="65" fill="url(#el-cont-crust)" stroke="#2f4236" />
            <L x="110" y="70" fill={C.fg} size={12.5} weight={700} anchor="middle">
              Kontinentalskorpe
            </L>
            <L x="110" y="86" fill={C.sand} size={10.5} anchor="middle">
              Granittisk · 30–70 km tykk
            </L>
            <L x="110" y="100" fill="#d1d5db" size={9.5} anchor="middle">
              Lav tetthet: ~2,7 g/cm³
            </L>

            {/* Høyre halvdel: Oseanisk litosfære (tynn) */}
            {/* Havvann */}
            <rect x="210" y="45" width="180" height="25" fill="#0f2b3e" stroke="#16374d" />
            <L x="300" y="62" fill="#38bdf8" size={11} weight={600} anchor="middle">
              Hav / vannsøyle (~4 km)
            </L>
            {/* Havbunnsskorpe */}
            <rect x="210" y="70" width="180" height="35" fill="#2d3f35" stroke="#1d2c24" />
            <L x="300" y="88" fill={C.teal} size={12} weight={700} anchor="middle">
              Havbunnsskorpe (5–8 km)
            </L>
            <L x="300" y="101" fill="#cbd5e1" size={9.5} anchor="middle">
              Basalt/gabbro · høyere tetthet (~3,0 g/cm³)
            </L>

            {/* Moho-diskontinuiteten (grensen mellom skorpe og mantel) */}
            <line x1="20" y1="110" x2="200" y2="110" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="210" y1="105" x2="390" y2="105" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
            <L x="205" y="112" fill="#ef4444" size={10.5} weight={700} anchor="middle">
              MOHO
            </L>

            {/* Stiv litosfærisk mantel (under begge skorper) */}
            <rect x="20" y="110" width="180" height="85" fill="#1b2a33" stroke="#131e24" />
            <rect x="210" y="105" width="180" height="70" fill="#1b2a33" stroke="#131e24" />
            <L x="110" y="145" fill={C.cold} size={12} weight={700} anchor="middle">
              Stiv litosfærisk mantel
            </L>
            <L x="110" y="162" fill="#94a3b8" size={10} anchor="middle">
              Fast peridotitt · kald og sprø
            </L>
            <L x="300" y="135" fill={C.cold} size={12} weight={700} anchor="middle">
              Stiv litosfærisk mantel
            </L>
            <L x="300" y="152" fill="#94a3b8" size={10} anchor="middle">
              Oseanisk litosfære (~70–100 km)
            </L>

            {/* Klammer / dybdeindikatorer */}
            <line x1="12" y1="45" x2="12" y2="195" stroke={C.warm} strokeWidth="2.5" />
            <L x="8" y="125" fill={C.warm} size={10} weight={700} anchor="end">
              Kontinentallitosfære (opptil 150–250 km)
            </L>

            {/* Astenosfæren under hele bredden */}
            <rect x="20" y="200" width="370" height="120" fill="url(#el-astheno)" stroke={C.teal} strokeDasharray="4 3" />
            <L x="205" y="235" fill={C.teal} size={14} weight={800} anchor="middle">
              ASTENOSFÆREN (ca. 100–350 km dyp)
            </L>
            <L x="205" y="255" fill="#f8fafc" size={11.5} weight={600} anchor="middle">
              Fast silikatbergart (peridotitt), IKKE et flytende magmaha!
            </L>
            <L x="205" y="272" fill="#cbd5e1" size={10.5} anchor="middle">
              Oppfører seg plastisk og duktilt (seigtflytende) over millioner av år.
            </L>
            <L x="205" y="288" fill="#94a3b8" size={10} anchor="middle">
              Viskositet ~10¹⁹–10²¹ Pa·s · Her glir litosfæreplatene!
            </L>

            {/* Dypere overgangssone i mantelen */}
            <rect x="20" y="325" width="370" height="60" fill="#141c22" />
            <L x="205" y="355" fill="#94a3b8" size={11} weight={600} anchor="middle">
              Mantelens overgangssone (410–660 km)
            </L>
            <L x="205" y="370" fill="#64748b" size={9.5} anchor="middle">
              Mineralomvandling: Olivin → Wadsleyitt → Ringwooditt
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. ConvectionDiagram / PlateForcesRealisticDiagram:
 * Viser drivkreftene i platetektonikken med fysiske vektorpiler:
 * Slab pull (hoveddrivkraft), Ridge push, Basal drag, og mantelkonveksjon.
 */
export function ConvectionDiagram() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Diagram
      title="Platetektonikkens drivkrefter: Slab pull, ridge push og mantelkonveksjon"
      heading="Hva beveger platene? Gravitasjon og tetthetsforskjeller styrer maskineriet"
      caption="Tidligere trodde man platene var passive flåter som ble skjøvet rundt av mantelkonveksjon. I dag vet vi at platene selv er en aktiv del av konveksjonssystemet. Den suverent største drivkraften er slab pull (~90 % av kraften): Kald, eldre havbunn er tettere enn astenosfæren under. Når den dykker i en subduksjonssone, omdannes basalten til den ultrahøytette bergarten eklogitt ved 40–60 km dyp, og fungerer som et gigantisk lodd som trekker hele platen etter seg. Ved midthavsryggen rager litosfæren 2–3 km høyere enn omkringliggende havbunn; tyngdekraften får den til å gli sakte nedover bakken (ridge push). Basal drag er friksjonskoblingen mot den seige astenosfæren."
      viewBox="0 0 940 480"
      wide
      action={
        <PlayPauseToggle
          isPlaying={isPlaying}
          onToggle={() => setIsPlaying((p) => !p)}
        />
      }
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="cf-mantle" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a2b36" />
              <stop offset="60%" stopColor="#251e18" />
              <stop offset="100%" stopColor="#3d1f14" />
            </linearGradient>
            <linearGradient id="cf-core" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b91c1c" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>

          <style>{`
            @keyframes cf-flow-cw {
              to { stroke-dashoffset: -140; }
            }
            @keyframes cf-flow-ccw {
              to { stroke-dashoffset: 140; }
            }
            @keyframes cf-slab-shiver {
              0%, 100% { transform: translateY(0); }
              50% { transform: translate(1.5px, 2px); }
            }
            @keyframes cf-plume-glow {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 0.85; }
            }
            .cf-anim-cw {
              animation: cf-flow-cw 6s linear infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .cf-anim-ccw {
              animation: cf-flow-ccw 6s linear infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .cf-anim-slab {
              animation: cf-slab-shiver 2s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .cf-anim-plume {
              animation: cf-plume-glow 3s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
          `}</style>

          {/* Bakgrunnsmantel */}
          <rect x="40" y="40" width="860" height="400" rx="8" fill="url(#cf-mantle)" />

          {/* Havvannslag øverst */}
          <rect x="40" y="70" width="860" height="40" fill="#0d2535" opacity="0.9" />
          <L x="60" y="92" fill="#38bdf8" size={12} weight={600}>
            Verdenshavet
          </L>

          {/* Midthavsrygg ved x=280 */}
          {/* Litosfæreplate som sprer seg mot venstre og høyre */}
          {/* Venstre flanke */}
          <path d="M 40 110 L 250 110 L 280 85 L 280 115 L 40 145 Z" fill="#2d3d34" stroke="#1d2a23" />
          {/* Høyre flanke som beveger seg mot subduksjonssonen ved x=680 */}
          <path d="M 280 85 L 310 110 L 680 110 L 800 340 L 730 360 L 640 145 L 310 120 L 280 115 Z" fill="#2d3d34" stroke="#1d2a23" />
          {/* Litosfærisk mantel under platen */}
          <path d="M 280 115 L 310 120 L 640 145 L 730 360 L 660 380 L 590 190 L 310 145 Z" fill="#1b2933" />

          {/* Overliggende kontinent ved x=680 til x=900 */}
          <path d="M 680 110 L 720 75 L 760 55 L 810 70 L 900 70 L 900 170 L 730 170 Z" fill="#4d5c55" stroke="#2c3a32" />
          <L x="800" y="105" fill="#f8fafc" size={13} weight={700} anchor="middle">
            Overliggende kontinent
          </L>

          {/* Varm manteloppstrøm under ryggen */}
          <path
            d="M 250 440 C 270 300, 275 180, 280 115 C 285 180, 290 300, 310 440 Z"
            fill="#b45309"
            className="cf-anim-plume"
          />

          {/* Animerte konveksjonssirkler i mantelen med stroke-dashoffset */}
          <g stroke="#f97316" strokeWidth="2.8" fill="none" opacity="0.8" strokeDasharray="10 8">
            {/* Medurs celle til høyre */}
            <path
              className="cf-anim-cw"
              d="M 330 380 C 440 400, 560 380, 600 280 C 620 220, 560 170, 440 170 C 350 170, 320 240, 330 380"
            />
            {/* Moturs celle til venstre */}
            <path
              className="cf-anim-ccw"
              d="M 230 380 C 140 400, 80 360, 70 260 C 60 180, 140 170, 220 170"
            />
          </g>
          <L x="450" y="270" fill="#f97316" size={13} weight={700} anchor="middle">
            Mantelkonveksjon (seig, duktil peridotittflyt)
          </L>

          {/* DRIVKRAFT 1: SLAB PULL (HOVEDKRAFTEN) */}
          <g transform="translate(740, 320)" className="cf-anim-slab">
            <Arrow d="M 0 0 L 65 95" marker={m.teal} color={C.teal} width={4.5} />
            <rect x="75" y="80" width="200" height="60" rx="6" fill="#0b1622" stroke={C.teal} strokeWidth="1.5" opacity="0.95" />
            <L x="85" y="100" fill={C.teal} size={13} weight={800}>
              1. SLAB PULL (~90 % av kraften)
            </L>
            <L x="85" y="118" fill="#d1d5db" size={10.5}>
              Kald litosfære omdannes til
            </L>
            <L x="85" y="132" fill={C.warm} size={10.5} weight={700}>
              høytett eklogitt (synker som et lodd)
            </L>
          </g>

          {/* DRIVKRAFT 2: RIDGE PUSH */}
          <g transform="translate(280, 70)">
            <Arrow d="M 15 15 L 75 35" marker={m.warm} color={C.warm} width={3.6} />
            <Arrow d="M -15 15 L -75 35" marker={m.warm} color={C.warm} width={3.6} />
            <L x="0" y="-12" fill={C.warm} size={13} weight={800} anchor="middle">
              2. RIDGE PUSH (Ryggstøt)
            </L>
            <L x="0" y="2" fill="#d1d5db" size={10.5} anchor="middle">
              Midthavsryggen rager 2–3 km høyt.
            </L>
            <L x="0" y="15" fill="#cbd5e1" size={10} anchor="middle">
              Platen sklir gravitasjonelt ned skråningen.
            </L>
          </g>

          {/* DRIVKRAFT 3: BASAL DRAG */}
          <g transform="translate(430, 135)">
            <Arrow d="M 0 0 L 60 0" marker={m.cold} color={C.cold} width={3} />
            <L x="30" y="-8" fill={C.cold} size={11} weight={700} anchor="middle">
              3. Basal drag (manteldrag)
            </L>
            <L x="30" y="16" fill="#94a3b8" size={9.5} anchor="middle">
              Friksjon mot konveksjonsstrømmen
            </L>
          </g>

          {/* KJERNEN I BUNN */}
          <rect x="40" y="420" width="860" height="20" fill="url(#cf-core)" />
          <L x="470" y="435" fill="#fef08a" size={11} weight={700} anchor="middle">
            Kjerne-mantel-grensen (D''-laget · 2900 km dyp): Leverer varmeenergien til motoren
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. PlatesMapDiagram:
 * Pedagogisk illustrasjon av jordens litosfæreplater, med platenavn,
 * relative bevegelsesretninger (cm/år) og Ring of Fire.
 */
export function PlatesMapDiagram() {
  return (
    <Diagram
      title="Verdenskart over litosfæreplater og relative bevegelsesvektorer"
      heading="Jordas tektoniske puslespill: De 7 store platene og Ring of Fire"
      caption="Litosfæren er delt i et dusin store og en rekke mindre plater. Kartet viser de største litosfæreplater med deres relative bevegelsesretninger og hastigheter (cm/år). Legg merke til Stillehavsplaten, som beveger seg hurtig (7–11 cm/år) nordvestover mot subduksjonssonene i Asia og Nord-Amerika. Dette omkranser Stillehavet med jordens mest seismisk og vulkansk aktive belte: «Ildringen» (Ring of Fire), der over 75 % av verdens aktive vulkaner og 90 % av alle jordskjelv finner sted. Norge ligger trygt plassert inne på Den eurasiske kontinentalplaten, langt fra de aktive grensene."
      viewBox="0 0 940 500"
      wide
    >
      {(m) => (
        <>
          <defs>
            {/* Havbakgrunn */}
            <linearGradient id="pm-ocean" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1824" />
              <stop offset="100%" stopColor="#122738" />
            </linearGradient>
          </defs>

          {/* Kartbakgrunn */}
          <rect x="40" y="30" width="860" height="440" rx="8" fill="url(#pm-ocean)" stroke="#1e3447" strokeWidth="1.2" />

          {/* Bredde- og lengdegradsrutenett */}
          <g stroke="#1d384e" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6">
            <line x1="40" y1="250" x2="900" y2="250" stroke="#38bdf8" strokeWidth="1" /> {/* Ekvator */}
            <line x1="40" y1="140" x2="900" y2="140" /> {/* 45°N */}
            <line x1="40" y1="360" x2="900" y2="360" /> {/* 45°S */}
            <line x1="470" y1="30" x2="470" y2="470" /> {/* Nullmeridianen */}
          </g>
          <L x="48" y="246" fill="#38bdf8" size={9.5}>Ekvator (0°)</L>

          {/* KONTINENTKONTURER (STILISERTE GEO-VEKTORER) */}
          {/* Nord-Amerika */}
          <path
            d="M 140 70 L 240 65 L 290 90 L 270 140 L 250 170 L 210 210 L 190 230 L 170 190 L 120 120 L 100 80 Z"
            fill="#2c3e34"
            stroke="#1d2c25"
            strokeWidth="1.2"
          />
          {/* Grønland */}
          <path d="M 330 60 L 370 55 L 380 90 L 340 100 Z" fill="#2c3e34" stroke="#1d2c25" strokeWidth="1" />
          {/* Sør-Amerika */}
          <path
            d="M 230 250 L 290 260 L 310 300 L 280 380 L 250 430 L 235 370 L 220 300 Z"
            fill="#2c3e34"
            stroke="#1d2c25"
            strokeWidth="1.2"
          />
          {/* Eurasia */}
          <path
            d="M 440 80 L 520 65 L 670 70 L 820 90 L 850 140 L 780 180 L 720 180 L 680 230 L 610 210 L 540 220 L 480 160 L 440 130 Z"
            fill="#2c3e34"
            stroke="#1d2c25"
            strokeWidth="1.2"
          />
          {/* Afrika */}
          <path
            d="M 450 180 L 530 180 L 560 230 L 540 330 L 490 380 L 460 320 L 430 240 Z"
            fill="#2c3e34"
            stroke="#1d2c25"
            strokeWidth="1.2"
          />
          {/* Australia */}
          <path d="M 720 310 L 800 300 L 820 360 L 750 390 L 710 350 Z" fill="#2c3e34" stroke="#1d2c25" strokeWidth="1.2" />
          {/* Antarktis */}
          <path d="M 120 455 L 820 455 L 800 440 L 140 440 Z" fill="#334155" opacity="0.8" />

          {/* PLATEGRENSER (RØD/ORANSJE = DIVERGENT, BLÅ/CYAN = SUBDUKSJON, GUL = TRANSFORM) */}
          {/* Den midtatlantiske rygg (siksak i Atlanteren) */}
          <path
            d="M 380 50 L 390 90 L 375 140 L 395 190 L 380 240 L 395 290 L 375 350 L 390 420"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Øst-Stillehavsryggen */}
          <path
            d="M 170 270 L 190 330 L 220 400 L 240 440"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />

          {/* «RING OF FIRE» (SUBDUKSJONSSONER RUNDT STILLEHAVET) */}
          <path
            d="M 850 140 C 820 180, 810 240, 840 290 L 850 350"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3.2"
            strokeDasharray="6 2"
          />
          <path
            d="M 110 80 C 130 110, 160 160, 180 220 L 220 290 L 235 370 L 250 430"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3.2"
            strokeDasharray="6 2"
          />
          {/* Ring of Fire merking */}
          <g transform="translate(110, 160)">
            <rect x="0" y="0" width="125" height="38" rx="4" fill="#080f14" stroke="#ef4444" strokeWidth="1.2" opacity="0.9" />
            <L x="62" y="16" fill="#ef4444" size={11} weight={800} anchor="middle">RING OF FIRE</L>
            <L x="62" y="30" fill="#fca5a5" size={9} anchor="middle">75 % av verdens vulkaner</L>
          </g>

          {/* San Andreas transformgrense */}
          <line x1="165" y1="145" x2="185" y2="180" stroke="#84cc16" strokeWidth="3" />

          {/* STORE PLATENAVN OG HASTIGHETSVEKTORER */}
          {/* Stillehavsplaten (Pacific Plate) */}
          <g transform="translate(100, 310)">
            <L x="0" y="0" fill={C.fg} size={13} weight={800}>STILLEHAVSPLATEN</L>
            <Arrow d="M 40 10 L -15 -15" marker={m.teal} color={C.teal} width={3.2} />
            <L x="45" y="24" fill={C.teal} size={11} weight={700}>8–11 cm/år</L>
          </g>

          {/* Nordamerikanske plate */}
          <g transform="translate(170, 110)">
            <L x="0" y="0" fill={C.fg} size={12.5} weight={800}>NORDAMERIKANSKE PLATE</L>
            <Arrow d="M 50 15 L 10 20" marker={m.warm} color={C.warm} width={2.6} />
            <L x="55" y="32" fill={C.warm} size={10}>~2,3 cm/år</L>
          </g>

          {/* Eurasiske plate */}
          <g transform="translate(560, 120)">
            <L x="0" y="0" fill={C.fg} size={13} weight={800}>DEN EURASISKE PLATEN</L>
            <Arrow d="M 60 15 L 90 20" marker={m.warm} color={C.warm} width={2.6} />
            <L x="60" y="32" fill={C.warm} size={10}>~2,5 cm/år</L>
          </g>

          {/* Norge markert på Eurasiske plate */}
          <circle cx="475" cy="92" r="6" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
          <L x="488" y="94" fill="#38bdf8" size={12} weight={800}>
            Norge (Intraplate)
          </L>

          {/* Søramerikanske plate */}
          <g transform="translate(300, 330)">
            <L x="0" y="0" fill={C.fg} size={12} weight={800}>SØRAMERIKANSKE</L>
            <L x="0" y="14" fill={C.fg} size={12} weight={800}>PLATE</L>
            <Arrow d="M -10 20 L -35 20" marker={m.warm} color={C.warm} width={2.6} />
          </g>

          {/* Nazcaplaten */}
          <g transform="translate(190, 330)">
            <L x="0" y="0" fill={C.teal} size={11} weight={800}>NAZCA</L>
            <Arrow d="M 15 10 L 45 10" marker={m.teal} color={C.teal} width={3} />
            <L x="25" y="24" fill={C.teal} size={10} weight={700}>~7 cm/år</L>
          </g>

          {/* Afrikanske plate */}
          <g transform="translate(470, 270)">
            <L x="0" y="0" fill={C.fg} size={12.5} weight={800}>AFRIKANSKE PLATE</L>
            <Arrow d="M 40 -10 L 40 -30" marker={m.warm} color={C.warm} width={2.4} />
            <L x="45" y="-15" fill={C.warm} size={10}>~2 cm/år</L>
          </g>

          {/* Indo-Australske plate og kollisjon med Asia */}
          <g transform="translate(680, 260)">
            <L x="0" y="0" fill={C.fg} size={12} weight={800}>INDO-AUSTRALSK</L>
            <Arrow d="M 20 -10 L 10 -45" marker={m.low} color={C.low} width={3.2} />
            <L x="25" y="-25" fill={C.low} size={11} weight={700}>Himalaya-kollisjon (~5 cm/år)</L>
          </g>

          {/* Kartforklaring nederst */}
          <g transform="translate(60, 425)">
            <line x1="0" y1="10" x2="30" y2="10" stroke="#f59e0b" strokeWidth="3" />
            <L x="36" y="14" fill={C.fg} size={10.5}>Divergerende (Midthavsrygg / spredning)</L>

            <line x1="280" y1="10" x2="310" y2="10" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 2" />
            <L x="316" y="14" fill={C.fg} size={10.5}>Konvergerende (Subduksjon / kollisjon)</L>

            <line x1="580" y1="10" x2="610" y2="10" stroke="#84cc16" strokeWidth="3" />
            <L x="616" y="14" fill={C.fg} size={10.5}>Transformgrense (Sidelengs glidning)</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. SolidusDiagram:
 * Viser smeltefysikk, geotermer, tørr peridotittsolidus, flukssmelting (våt solidus)
 * og adiabatisk dekompresjonssmelting.
 */
export function SolidusDiagram() {
  return (
    <Diagram
      title="Trykk-temperatur-diagram: Dekompresjonssmelting, flukssmelting og geoterm"
      heading="Smeltefysikk i mantelen: Hvorfor fast bergart smelter på tre ulike måter"
      caption="Bergarter smelter ikke ved én fast temperatur slik som rent isvann, men over et temperaturintervall. Solidus er kurven der den aller første dråpen smelte dannes; liquidus er kurven der alt er flytende. Fordi trykket øker innover i jorden (ca. 30 bar/km), stiger solidustemperaturen bratt med dypet. Normalt ligger jordens geoterm godt til venstre for solidus (mantelen er fast). Magma kan oppstå på tre måter: 1) Dekompresjonssmelting: mantel stiger adiabatisk (uten varmetap) under tynn skorpe og krysser tørr solidus. 2) Flukssmelting: vann fra en synkende plate forskyver solidus til venstre slik at den krysser den normale geotermen. 3) Mantelplym (hotspot): ekstraordinær varme fra dypet løfter geotermen over solidus."
      viewBox="0 0 880 470"
      wide
    >
      {(m) => (
        <>
          {/* Akser */}
          <line x1="90" y1="400" x2="820" y2="400" stroke="#475569" strokeWidth="2" />
          <line x1="90" y1="400" x2="90" y2="40" stroke="#475569" strokeWidth="2" />

          {/* Aksetitler og enheter */}
          <L x="450" y="435" fill={C.fg} size={14} weight={700} anchor="middle">
            Temperatur (°C) →
          </L>
          <g transform="rotate(-90 30 220)">
            <L x="30" y="220" fill={C.fg} size={13} weight={700} anchor="middle">
              Dybde (km) / Trykk (GPa) ↓
            </L>
          </g>

          {/* Dybdemerker på Y-aksen */}
          <L x="80" y="65" fill={C.muted} size={11} anchor="end">0 km (0 GPa)</L>
          <line x1="86" y1="60" x2="94" y2="60" stroke="#475569" strokeWidth="1.5" />

          <L x="80" y="150" fill={C.muted} size={11} anchor="end">50 km (1,5 GPa)</L>
          <line x1="86" y1="145" x2="94" y2="145" stroke="#475569" strokeWidth="1.5" />

          <L x="80" y="235" fill={C.muted} size={11} anchor="end">100 km (3,0 GPa)</L>
          <line x1="86" y1="230" x2="94" y2="230" stroke="#475569" strokeWidth="1.5" />

          <L x="80" y="320" fill={C.muted} size={11} anchor="end">150 km (4,5 GPa)</L>
          <line x1="86" y1="315" x2="94" y2="315" stroke="#475569" strokeWidth="1.5" />

          <L x="80" y="395" fill={C.muted} size={11} anchor="end">200 km (6,0 GPa)</L>
          <line x1="86" y1="390" x2="94" y2="390" stroke="#475569" strokeWidth="1.5" />

          {/* Temperaturmerker på X-aksen */}
          <L x="220" y="418" fill={C.muted} size={11} anchor="middle">600 °C</L>
          <L x="400" y="418" fill={C.muted} size={11} anchor="middle">1000 °C</L>
          <L x="580" y="418" fill={C.muted} size={11} anchor="middle">1400 °C</L>
          <L x="760" y="418" fill={C.muted} size={11} anchor="middle">1800 °C</L>

          {/* SMELTET FELT (høyre for solidus) */}
          <path
            d="M 450 60 L 720 390 L 820 390 L 820 60 Z"
            fill="#ea580c"
            opacity="0.12"
          />
          <L x="730" y="140" fill="#f97316" size={15} weight={800}>
            DELVIS SMELTE
          </L>
          <L x="730" y="160" fill="#fed7aa" size={11.5}>
            (Magma oppstår her: basaltisk smelte)
          </L>

          {/* FAST FELT (venstre for solidus) */}
          <L x="180" y="240" fill={C.cold} size={16} weight={800}>
            FAST BERGART
          </L>
          <L x="180" y="260" fill="#94a3b8" size={12}>
            Peridotitt i litosfære og astenosfære
          </L>

          {/* 1. TØRR PERIDOTITTSOLIDUS (RØD LINJE) */}
          <path d="M 450 60 L 720 390" stroke="#ef4444" strokeWidth="3.5" fill="none" />
          <L x="430" y="52" fill="#ef4444" size={13} weight={800}>
            Tørr peridotitt-solidus (smeltepunktet stiger med trykket!)
          </L>

          {/* 2. VÅT / HYDRATISERT SOLIDUS (FLUKSSMELTING - CYAN STIPLET) */}
          <path d="M 280 60 L 460 390" stroke="#38bdf8" strokeWidth="2.8" strokeDasharray="6 4" fill="none" />
          <L x="270" y="52" fill="#38bdf8" size={12} weight={700}>
            Våt solidus (med H₂O tilført)
          </L>

          {/* 3. NORMAL KONTINENTAL GEOTERM (GRØNN / GRÅ KURVE) */}
          <path d="M 90 60 C 220 120, 320 200, 420 390" stroke="#94a3b8" strokeWidth="2.2" strokeDasharray="3 3" fill="none" />
          <L x="410" y="375" fill="#94a3b8" size={11} weight={600} anchor="end">
            Normal kontinental geoterm
          </L>

          {/* 4. MEKANISME 1: DEKOMPRESJONSSMELTING (ORANSJE PIL OPP) */}
          <g>
            <Arrow d="M 600 340 L 530 80" marker={m.warm} color={C.warm} width={4} />
            <circle cx="560" cy="192" r="7" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
            <L x="575" y="188" fill="#f59e0b" size={13} weight={800}>
              1. Dekompresjon (Midthavsrygg / Rift)
            </L>
            <L x="575" y="204" fill="#fed7aa" size={11}>
              Mantel stiger nesten adiabatisk (uten varmetap).
            </L>
            <L x="575" y="218" fill="#cbd5e1" size={10}>
              Krysser solidus ved ca. 60 km dyp uten tilført varme!
            </L>
          </g>

          {/* 5. MEKANISME 2: FLUKSSMELTING (BLÅ PIL TIL VENSTRE) */}
          <g>
            <Arrow d="M 520 250 L 420 250" marker={m.teal} color={C.teal} width={3.6} />
            <circle cx="430" cy="250" r="7" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
            <L x="410" y="275" fill="#38bdf8" size={12.5} weight={800} anchor="end">
              2. Flukssmelting (Subduksjonssone)
            </L>
            <L x="410" y="291" fill="#bae6fd" size={11} anchor="end">
              Vann fra slab senker solidus mot venstre.
            </L>
            <L x="410" y="305" fill="#cbd5e1" size={10} anchor="end">
              Mantelen smelter ved uendret temperatur!
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 5. DecompressionMeltingDiagram:
 * Tverrsnitt av litosfære-fortynning, trykkfall og ekstraksjon av basaltisk smelte.
 */
export function DecompressionMeltingDiagram() {
  return (
    <Diagram
      title="Dekompresjonssmelting ved tynning av jordskorpe og litosfære"
      heading="Trykkfall som drivstoff: Hvorfor skorpetynning smelter mantelen"
      caption="Under et stabilt kontinent med 150 km tykk litosfære hviler det et enormt litostatisk trykk på mantelen under. Selv om astenosfæren er 1350 °C varm, hindrer trykket peridotitten i å smelte. Når jordskorpen og litosfæren strekkes og tynnes ved en rift eller midthavsrygg, minker den overliggende vekten brått. Astenosfæren stiger opp i tomrommet. Fordi varmeledningsevnen i stein er svært lav, rekker ikke bergartene å avkjøles nevneverdig mens de stiger; banen er nær adiabatisk. Ved rundt 60 kilometers dyp krysser banen soliduskurven, og 10–20 % av mantelen smelter delvis. Den nydannede basaltiske magmaen har lavere tetthet og stiger til overflaten."
      viewBox="0 0 880 400"
      wide
    >
      {(m) => (
        <>
          {/* Før tynning (venstre panel, x=40 til x=420) */}
          <g transform="translate(40, 30)">
            <rect x="0" y="0" width="370" height="340" rx="8" fill="#0c161d" stroke="#1e2e38" />
            <L x="185" y="25" fill={C.fg} size={13} weight={700} anchor="middle">
              FØR TYNNING (Tykk kontinentallitosfære)
            </L>

            {/* Tykk skorpe (35 km) */}
            <rect x="20" y="45" width="330" height="65" fill="#4b5d52" stroke="#2d3d34" />
            <L x="185" y="75" fill="#fff" size={12.5} weight={700} anchor="middle">
              Tykk kontinentalskorpe (35–45 km)
            </L>
            <L x="185" y="93" fill="#cbd5e1" size={10.5} anchor="middle">
              Massiv overliggende vekt → enormt litostatisk trykk
            </L>

            {/* Tykk litosfærisk stiv mantel (ned til 150 km) */}
            <rect x="20" y="110" width="330" height="95" fill="#1b2933" stroke="#121e25" />
            <L x="185" y="150" fill={C.cold} size={12} weight={700} anchor="middle">
              Kald litosfærisk mantel (120 km)
            </L>
            <L x="185" y="168" fill="#94a3b8" size={10.5} anchor="middle">
              Holder astenosfæren nede på høyt trykk
            </L>

            {/* Astenosfære i bunn (fast peridotitt) */}
            <rect x="20" y="205" width="330" height="110" fill="#221e1a" stroke="#332a22" />
            <L x="185" y="250" fill={C.teal} size={13} weight={700} anchor="middle">
              Astenosfære (~1350 °C)
            </L>
            <L x="185" y="270" fill="#ef4444" size={11} weight={600} anchor="middle">
              FAST STOFF (T &lt; T_solidus)
            </L>
            <L x="185" y="286" fill="#94a3b8" size={10} anchor="middle">
              Trykket er for høyt til at det kan oppstå smelte
            </L>
          </g>

          {/* Etter tynning (høyre panel, x=470 til x=850) */}
          <g transform="translate(470, 30)">
            <rect x="0" y="0" width="370" height="340" rx="8" fill="#0c161d" stroke="#1e2e38" />
            <L x="185" y="25" fill="#f59e0b" size={13} weight={700} anchor="middle">
              ETTER TYNNING (Rift / Midthavsrygg)
            </L>

            {/* Tynn skorpe med sentral rift */}
            <path d="M 20 45 L 120 45 L 160 85 L 210 85 L 250 45 L 350 45 L 350 85 L 20 85 Z" fill="#4b5d52" stroke="#2d3d34" />
            <L x="185" y="70" fill="#f59e0b" size={11.5} weight={700} anchor="middle">
              Uttynnet skorpe / riftdal
            </L>

            {/* Tynnet litosfærisk mantel */}
            <path d="M 20 85 L 120 85 L 160 115 L 210 115 L 250 85 L 350 85 L 350 125 L 20 125 Z" fill="#1b2933" />

            {/* Astenosfære stiger opp i gapet */}
            <path d="M 20 125 L 140 125 L 185 85 L 230 125 L 350 125 L 350 315 L 20 315 Z" fill="#2a1f18" />

            {/* SMELTESONE MED MAGMAPLYM */}
            <ellipse cx="185" cy="140" rx="40" ry="24" fill="#f97316" opacity="0.85" />
            <Arrow d="M 185 240 L 185 165" marker={m.warm} color={C.warm} width={3.6} />
            <L x="185" y="135" fill="#fff" size={11.5} weight={800} anchor="middle">
              DELVIS SMELTE
            </L>
            <L x="185" y="150" fill="#fef08a" size={9.5} weight={700} anchor="middle">
              10–20 % smelte (basalt)
            </L>

            {/* Magmatilførsel opp til vulkan i riftdalen */}
            <path d="M 185 116 L 185 85" stroke="#ef4444" strokeWidth="3" markerEnd={`url(#${m.low})`} />

            <L x="185" y="270" fill="#f59e0b" size={12} weight={700} anchor="middle">
              Trykkfall senker solidus!
            </L>
            <L x="185" y="288" fill="#d1d5db" size={10} anchor="middle">
              Smelte uten at noe tilfører ekstra varme
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 6. BoundaryOverviewDiagram:
 * Visuell og pedagogisk oversikt over de tre hovedklassene plategrenser.
 */
export function BoundaryOverviewDiagram() {
  return (
    <FigureFrame
      heading="Tre relative bevegelser, seks distinkte geologiske miljøer"
      caption="Alt som foregår ved en plategrense er en direkte konsekvens av den relative bevegelsen mellom platene: fra hverandre (divergens), mot hverandre (konvergens), eller sidelengs (transform). Hvilke bergarter som dannes, jordskjelvdybden og om det oppstår vulkaner, avgjøres av om det er havbunn eller kontinent som møtes."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Divergerende */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-left">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-between rounded-full bg-amber-500/20 text-center font-bold text-amber-500 text-xs px-1.5">
              1
            </span>
            <p className="font-display text-base font-semibold text-amber-500">
              Divergerende grenser
            </p>
          </div>
          <p className="mt-1 text-xs font-semibold text-foreground">Platene glir FRA hverandre (strekk)</p>
          <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
            <li>
              <strong>Havbunnsspredning:</strong> Ny oseanisk litosfære dannes. Dekompresjonssmelting av mantel. Putelava og basalt (f.eks. Den midtatlantiske rygg).
            </li>
            <li>
              <strong>Kontinental rift:</strong> Kontinentet tynnes og sprekker opp. Graben-daler og vulkanisme (f.eks. Øst-Afrika, Oslofeltet i perm).
            </li>
            <li>
              <strong>Jordskjelv:</strong> Bare grunne skjelv (&lt; 20 km dyp).
            </li>
          </ul>
        </div>

        {/* Konvergerende */}
        <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-5 text-left">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-between rounded-full bg-sky-500/20 text-center font-bold text-sky-500 text-xs px-1.5">
              2
            </span>
            <p className="font-display text-base font-semibold text-sky-500">
              Konvergerende grenser
            </p>
          </div>
          <p className="mt-1 text-xs font-semibold text-foreground">Platene kolliderer (sammenpressing)</p>
          <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
            <li>
              <strong>Hav mot kontinent:</strong> Subduksjon, dyphavsgrop, flukssmelting og vulkansk fjellkjede (f.eks. Andesfjellene).
            </li>
            <li>
              <strong>Hav mot hav:</strong> Eldste plate subdueres. Vulkanøybuer og dype groper (f.eks. Mariana, Japan).
            </li>
            <li>
              <strong>Kontinent mot kontinent:</strong> Ingen subduksjon pga. lav tetthet. Skorpefortykning og skyvedekker (Himalaya, Kaledonidene).
            </li>
            <li>
              <strong>Jordskjelv:</strong> Langs plategrensen. Dybdefordeling eier kapittelet Jordskjelv.
            </li>
          </ul>
        </div>

        {/* Transform */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 text-left">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-between rounded-full bg-emerald-500/20 text-center font-bold text-emerald-500 text-xs px-1.5">
              3
            </span>
            <p className="font-display text-base font-semibold text-emerald-500">
              Transformgrenser
            </p>
          </div>
          <p className="mt-1 text-xs font-semibold text-foreground">Platene glir SIDELENGS (skjærspenning)</p>
          <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
            <li>
              <strong>Konservative grenser:</strong> Litosfære verken nydannes eller destrueres.
            </li>
            <li>
              <strong>Ingen vulkanisme:</strong> Det skjer ingen mantelheving eller dehydrering, så det dannes ingen smelte.
            </li>
            <li>
              <strong>Jordskjelv:</strong> Svært kraftige, grunne jordskjelv der låste forkastningsblokker plutselig brister (f.eks. San Andreas, Jan Mayen-bruddsonen).
            </li>
          </ul>
        </div>
      </div>
    </FigureFrame>
  );
}

/**
 * 7. SpreadingDiagram & SeafloorSpreadingPaleomagDiagram:
 * Havbunnsspredning med lagdelt havbunnsskorpe, hydrotermale black smokers
 * og paleomagnetiske reverseringsbånd (jordens båndopptaker).
 */
export function SpreadingDiagram() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Diagram
      title="Havbunnsspredning, lagdelt havbunnsskorpe og paleomagnetiske striper"
      heading="Midthavsryggen: Havbunnsskorpens fødested og paleomagnetiske bånd"
      caption="Ved midthavsryggen dannes ny havbunnsskorpe kontinuerlig i et lagdelt system: 1) Dype marine sedimenter, 2) Putelava (pillow basalt) som bråkjøles mot sjøvannet, 3) Basaltganger (sheeted dykes) som tilførte magmaen, 4) Gabbro i det dype magmakammeret, og 5) Peridotitt under Moho. Når den samme lagrekken skyves på land, kalles den ofiolitt — det eier kapittelet Norges geologiske historie. Når basalten avkjøles under Curie-temperaturen (~580 °C), orienterer jernmineralet magnetitt seg etter jordens magnetfelt og «fryses» fast. Fordi jordas magnetfelt jevnlig bytter polaritet (reverserer), fungerer havbunnen som et gigantisk magnetisk båndopptak med symmetriske striper av normal og reversert magnetisering på hver side av ryggen. Dette var Vine-Matthews-Morley-hypotesen (1963) som ga det ugjendrivelige beviset for platetektonikken."
      viewBox="0 0 940 520"
      wide
      action={
        <PlayPauseToggle
          isPlaying={isPlaying}
          onToggle={() => setIsPlaying((p) => !p)}
        />
      }
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="sd-magma-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="40%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
            <clipPath id="sd-tape-clip-left">
              <rect x="40" y="32" width="360" height="30" />
            </clipPath>
            <clipPath id="sd-tape-clip-right">
              <rect x="460" y="32" width="360" height="30" />
            </clipPath>
          </defs>

          <style>{`
            @keyframes smoker-rise-1 {
              0% { transform: translateY(0) scale(0.8); opacity: 0.9; }
              50% { transform: translate(-3px, -18px) scale(1.3); opacity: 0.6; }
              100% { transform: translate(-6px, -36px) scale(1.9); opacity: 0; }
            }
            @keyframes smoker-rise-2 {
              0% { transform: translateY(0) scale(0.8); opacity: 0.9; }
              50% { transform: translate(3px, -18px) scale(1.3); opacity: 0.6; }
              100% { transform: translate(6px, -36px) scale(1.9); opacity: 0; }
            }
            @keyframes magma-pulse-sd {
              0%, 100% { transform: scale(0.97); opacity: 0.88; }
              50% { transform: scale(1.03); opacity: 1; }
            }
            @keyframes tape-move-left {
              0% { transform: translateX(0px); }
              100% { transform: translateX(-50px); }
            }
            @keyframes tape-move-right {
              0% { transform: translateX(0px); }
              100% { transform: translateX(50px); }
            }
            @keyframes axis-glow {
              0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 3px #38bdf8); }
              50% { opacity: 1; filter: drop-shadow(0 0 8px #60a5fa); }
            }
            .smoker-plume-1 {
              animation: smoker-rise-1 2.2s cubic-bezier(0.2, 0.6, 0.4, 1) infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .smoker-plume-2 {
              animation: smoker-rise-2 2.6s cubic-bezier(0.2, 0.6, 0.4, 1) infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .sd-magma {
              transform-origin: 470px 155px;
              animation: magma-pulse-sd 2.5s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .sd-axis-glow {
              animation: axis-glow 2s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .sd-tape-left {
              animation: tape-move-left 4s linear infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .sd-tape-right {
              animation: tape-move-right 4s linear infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
          `}</style>

          {/* Havvann øverst */}
          <rect x="40" y="30" width="860" height="110" fill="#0a1e2c" />
          <L x="60" y="55" fill="#38bdf8" size={13} weight={600}>
            Atlanterhavet (vannsøyle ~2500–4000 meter)
          </L>

          {/* Midthavsrygg tverrsnitt */}
          {/* Riftdal i midten ved x=470 */}
          {/* Lag 1 & 2: Putelava og basalt (toppskorpe) */}
          <path
            d="M 40 140 L 380 100 L 440 85 L 455 100 L 485 100 L 500 85 L 560 100 L 900 140 L 900 165 L 560 125 L 495 110 L 445 110 L 380 125 L 40 165 Z"
            fill="#384941"
            stroke="#202c25"
            strokeWidth="1.2"
          />
          <L x="220" y="125" fill="#a7f3d0" size={11} weight={700}>
            Lag 2A: Putelava (pillow basalt, bråkjølt)
          </L>
          <L x="720" y="125" fill="#a7f3d0" size={11} weight={700}>
            Putelava
          </L>

          {/* Lag 2B: Basaltganger (Sheeted dykes) */}
          <path
            d="M 40 165 L 380 125 L 445 110 L 495 110 L 560 125 L 900 165 L 900 200 L 560 160 L 495 145 L 445 145 L 380 160 L 40 200 Z"
            fill="#2c3a33"
            stroke="#1d2722"
          />
          <L x="220" y="155" fill="#cbd5e1" size={10.5}>
            Lag 2B: Tette basaltganger (sheeted dykes)
          </L>

          {/* Lag 3: Gabbro (dyp magmakammerbergart) */}
          <path
            d="M 40 200 L 380 160 L 445 145 L 495 145 L 560 160 L 900 200 L 900 245 L 560 205 L 495 190 L 445 190 L 380 205 L 40 245 Z"
            fill="#22302a"
            stroke="#16201b"
          />
          <L x="220" y="195" fill={C.sand} size={11} weight={700}>
            Lag 3: Gabbro (størknet i magmakammer)
          </L>

          {/* Moho-diskontinuiteten */}
          <path d="M 40 245 L 380 205 L 445 190 L 495 190 L 560 205 L 900 245" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 2" fill="none" />
          <L x="860" y="240" fill="#ef4444" size={10} weight={700} anchor="end">
            MOHO (~6–7 km dyp)
          </L>

          {/* Lag 4: Mantelperidotitt under skorpen */}
          <path
            d="M 40 245 L 380 205 L 445 190 L 495 190 L 560 205 L 900 245 L 900 370 L 40 370 Z"
            fill="#172730"
          />
          <L x="180" y="280" fill={C.teal} size={12} weight={700}>
            Litosfærisk mantel (harzburgitt / serpentinisert peridotitt)
          </L>

          {/* Magmakammer i aksen (x=445 til x=495) med pulserende glød */}
          <ellipse cx="470" cy="155" rx="35" ry="25" fill="url(#sd-magma-glow)" className="sd-magma" />
          <L x="470" y="152" fill="#fff" size={10.5} weight={800} anchor="middle">
            Aksialt
          </L>
          <L x="470" y="165" fill="#fef08a" size={9.5} weight={700} anchor="middle">
            magmakammer
          </L>

          {/* Hydrotermale skorsteiner (Black smokers) i riftdalen med animert mineralrøyk */}
          <g transform="translate(458, 95)">
            <rect x="0" y="0" width="4" height="7" fill="#334155" />
            <line x1="2" y1="0" x2="2" y2="-18" stroke="#000" strokeWidth="2.5" />
            {/* Animert røyksøyle */}
            <circle cx="2" cy="-22" r="5" fill="#1e293b" className="smoker-plume-1" />
            <circle cx="1" cy="-28" r="6" fill="#334155" className="smoker-plume-2" />
          </g>
          <g transform="translate(478, 95)">
            <rect x="0" y="0" width="4" height="7" fill="#334155" />
            <line x1="2" y1="0" x2="2" y2="-18" stroke="#000" strokeWidth="2.5" />
            {/* Animert røyksøyle */}
            <circle cx="2" cy="-22" r="5" fill="#1e293b" className="smoker-plume-2" />
            <circle cx="3" cy="-28" r="6" fill="#334155" className="smoker-plume-1" />
          </g>
          <L x="470" y="70" fill="#f59e0b" size={10.5} weight={700} anchor="middle">
            Hydrotermale felt (&quot;Black smokers&quot; · 350 °C mineralrøyk)
          </L>

          {/* Spredningspiler */}
          <Arrow d="M 370 95 L 280 95" marker={m.teal} color={C.teal} width={3.2} />
          <L x="325" y="85" fill={C.teal} size={11} weight={700} anchor="middle">
            ← 1,25 cm/år
          </L>
          <Arrow d="M 570 95 L 660 95" marker={m.teal} color={C.teal} width={3.2} />
          <L x="615" y="85" fill={C.teal} size={11} weight={700} anchor="middle">
            1,25 cm/år →
          </L>

          {/* ======================================================= */}
          {/* PALEOMAGNETISKE REVERSERINGSBÅND (BÅNDOPPTAKER)         */}
          {/* ======================================================= */}
          <g transform="translate(40, 385)">
            <rect x="0" y="0" width="860" height="100" rx="6" fill="#0b151f" stroke="#253a4b" strokeWidth="1.2" />
            <L x="430" y="20" fill={C.warm} size={12.5} weight={800} anchor="middle">
              PALEOMAGNETISK «BÅNDOPPTAKER»: Symmetrisk magnetisk havbunnshistorie (Vine-Matthews-Morley 1963)
            </L>

            {/* Venstre bevegelig stripebånd under clipPath */}
            <g clipPath="url(#sd-tape-clip-left)">
              <g className="sd-tape-left">
                <rect x="330" y="32" width="70" height="30" fill="#475569" />
                <rect x="250" y="32" width="80" height="30" fill="#2563eb" />
                <rect x="150" y="32" width="100" height="30" fill="#475569" />
                <rect x="40" y="32" width="110" height="30" fill="#2563eb" />
                <rect x="-60" y="32" width="100" height="30" fill="#475569" />
                <L x="365" y="52" fill="#cbd5e1" size={9.5} weight={700} anchor="middle">Revers</L>
                <L x="290" y="52" fill="#fff" size={9.5} weight={700} anchor="middle">Normal</L>
                <L x="200" y="52" fill="#cbd5e1" size={9.5} weight={700} anchor="middle">Revers</L>
                <L x="95" y="52" fill="#fff" size={9.5} weight={700} anchor="middle">Normal</L>
              </g>
            </g>

            {/* Høyre bevegelig stripebånd under clipPath */}
            <g clipPath="url(#sd-tape-clip-right)">
              <g className="sd-tape-right">
                <rect x="460" y="32" width="70" height="30" fill="#475569" />
                <rect x="530" y="32" width="80" height="30" fill="#2563eb" />
                <rect x="610" y="32" width="100" height="30" fill="#475569" />
                <rect x="710" y="32" width="110" height="30" fill="#2563eb" />
                <rect x="820" y="32" width="100" height="30" fill="#475569" />
                <L x="495" y="52" fill="#cbd5e1" size={9.5} weight={700} anchor="middle">Revers</L>
                <L x="570" y="52" fill="#fff" size={9.5} weight={700} anchor="middle">Normal</L>
                <L x="660" y="52" fill="#cbd5e1" size={9.5} weight={700} anchor="middle">Revers</L>
                <L x="765" y="52" fill="#fff" size={9.5} weight={700} anchor="middle">Normal</L>
              </g>
            </g>

            {/* Senter-aksen (x=400 til 460): Aktiv dannelse med pulserende normal polaritet */}
            <rect x="400" y="30" width="60" height="34" rx="3" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1.5" className="sd-axis-glow" />
            <L x="430" y="47" fill="#fff" size={9.5} weight={800} anchor="middle">
              Normal (N)
            </L>
            <L x="430" y="58" fill="#93c5fd" size={8} weight={700} anchor="middle">
              Nydannes nå
            </L>

            {/* Tidsskala (millioner år før nåtid) */}
            <L x="430" y="82" fill="#38bdf8" size={10} weight={700} anchor="middle">
              Ryggakse: 0 Ma
            </L>
            <L x="365" y="82" fill="#94a3b8" size={9.5} anchor="middle">1 Ma</L>
            <L x="290" y="82" fill="#94a3b8" size={9.5} anchor="middle">3 Ma</L>
            <L x="200" y="82" fill="#94a3b8" size={9.5} anchor="middle">5 Ma</L>
            <L x="95" y="82" fill="#94a3b8" size={9.5} anchor="middle">← 8 Ma (Eldre)</L>

            <L x="495" y="82" fill="#94a3b8" size={9.5} anchor="middle">1 Ma</L>
            <L x="570" y="82" fill="#94a3b8" size={9.5} anchor="middle">3 Ma</L>
            <L x="660" y="82" fill="#94a3b8" size={9.5} anchor="middle">5 Ma</L>
            <L x="765" y="82" fill="#94a3b8" size={9.5} anchor="middle">8 Ma (Eldre) →</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 8. ContinentalRiftDiagram:
 * Viser utviklingen av en kontinental rift (horst og graben, riftinnsjø,
 * dekompresjonssmelting) som i Øst-Afrika og fortidens Oslofelt.
 */
export function ContinentalRiftDiagram() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Diagram
      title="Kontinental rifting: Fra innsynkningsdal til gryende havbasseng"
      heading="Kontinental rift: Når kontinentet rives i to av tektonisk strekk"
      caption="Når litosfæren utsettes for tektonisk strekk, reagerer den øvre, sprø jordskorpen med å sprekke opp langs steile forkastninger (normalforkastninger). Blokkene i midten sklir nedover og danner en langstrakt innsynkningsdal kalt en graben. De hevede blokkene på sidene danner riftskuldre (horster). Mantelen under stiger opp i det avlastede området, trykket faller, og dekompresjonssmelting produserer basaltiske vulkaner. Dette er tilstanden i Den østafrikanske riftdalen i dag. Oslofeltet var en tilsvarende aktiv rift for ca. 300 millioner år siden i perm. Hvis strekket vedvarer, flommer havet inn og danner et smalt havbasseng (som Rødehavet), før en ekte midthavsrygg etableres."
      action={<PlayPauseToggle isPlaying={isPlaying} onToggle={() => setIsPlaying(!isPlaying)} />}
      viewBox="0 0 880 430"
      wide
    >
      {(m) => (
        <>
          <style>{`
            @keyframes rift-mantle-up {
              0% { stroke-dashoffset: 24; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes rift-magma-pulse {
              0%, 100% { transform: scale(1); opacity: 0.9; }
              50% { transform: scale(1.06); opacity: 1; filter: drop-shadow(0 0 8px #f97316); }
            }
            @keyframes rift-smoke {
              0% { transform: translate(0, 0) scale(0.8); opacity: 0.7; }
              100% { transform: translate(-4px, -18px) scale(1.5); opacity: 0; }
            }
            @keyframes rift-stretch-left {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(-4px); }
            }
            @keyframes rift-stretch-right {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(4px); }
            }
            .rift-mantle-flow {
              stroke-dasharray: 6 4;
              animation: rift-mantle-up 1.8s linear infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .rift-magma {
              transform-origin: 440px 220px;
              animation: rift-magma-pulse 2.5s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .rift-smoke-puff {
              animation: rift-smoke 2s ease-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .rift-arrow-l {
              animation: rift-stretch-left 2s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .rift-arrow-r {
              animation: rift-stretch-right 2s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
          `}</style>

          {/* Luft over landskapet */}
          <rect x="40" y="30" width="800" height="70" fill="#0a1520" />

          {/* Landoverflate med sentral riftdal (graben) */}
          <path
            d="M 40 85 L 280 85 L 340 145 L 540 145 L 600 85 L 840 85 L 840 165 L 570 175 L 510 155 L 370 155 L 310 175 L 40 165 Z"
            fill="#524a3c"
            stroke="#2d281f"
            strokeWidth="1.5"
          />

          {/* Steile normalforkastninger (skrenter) */}
          <line x1="280" y1="85" x2="340" y2="145" stroke="#ef4444" strokeWidth="2.8" />
          <line x1="600" y1="85" x2="540" y2="145" stroke="#ef4444" strokeWidth="2.8" />

          {/* Glidningsindikatorer langs forkastningene */}
          <path d="M 298 98 L 312 112" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M 582 98 L 568 112" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="3 2" />

          {/* Riftskuldre og graben-tekst */}
          <L x="160" y="70" fill="#f8fafc" size={13} weight={700} anchor="middle">
            Horst (Riftskulder)
          </L>
          <L x="720" y="70" fill="#f8fafc" size={13} weight={700} anchor="middle">
            Horst (Riftskulder)
          </L>
          <L x="440" y="125" fill="#f59e0b" size={14} weight={800} anchor="middle">
            GRABEN (Innsunket riftdal)
          </L>

          {/* Dyp innsjø i bunnen av riftdalen (f.eks. Tanganyika eller Malawisjøen) */}
          <rect x="380" y="138" width="120" height="7" fill="#0284c7" />
          <L x="440" y="160" fill="#38bdf8" size={10} weight={600} anchor="middle">
            Riftsjø (Tanganyikasjøen 1470 m dyp)
          </L>

          {/* Litosfærisk stiv mantel under kontinentet */}
          <path
            d="M 40 165 L 310 175 L 370 155 L 510 155 L 570 175 L 840 165 L 840 240 L 590 200 L 530 175 L 350 175 L 290 200 L 40 240 Z"
            fill="#1d2c36"
            stroke="#131e25"
          />
          <L x="170" y="210" fill="#94a3b8" size={11.5} weight={600} anchor="middle">
            Stiv kontinentallitosfære
          </L>
          <L x="710" y="210" fill="#94a3b8" size={11.5} weight={600} anchor="middle">
            Stiv kontinentallitosfære
          </L>

          {/* Varm astenosfære som velter opp under den tynnede skorpen */}
          <path
            d="M 40 240 L 290 200 L 350 175 L 530 175 L 590 200 L 840 240 L 840 390 L 40 390 Z"
            fill="#2c1f17"
          />
          <path
            d="M 320 390 C 370 290, 410 200, 440 165 C 470 200, 510 290, 560 390 Z"
            fill="#7c2d12"
            opacity="0.8"
          />

          {/* Animerte oppstrømslinjer for astenosfæren */}
          <path d="M 390 380 C 410 300, 428 240, 436 185" fill="none" stroke="#f97316" strokeWidth="2.2" className="rift-mantle-flow" />
          <path d="M 490 380 C 470 300, 452 240, 444 185" fill="none" stroke="#f97316" strokeWidth="2.2" className="rift-mantle-flow" />

          {/* Dekompresjonssmelting i astenosfæren */}
          <ellipse cx="440" cy="220" rx="42" ry="25" fill="#ea580c" className="rift-magma" />
          <L x="440" y="215" fill="#fff" size={11} weight={800} anchor="middle">
            Dekompresjonssmelting
          </L>
          <L x="440" y="230" fill="#fef08a" size={9.5} weight={700} anchor="middle">
            (P faller under tynn skorpe)
          </L>

          {/* Magmatilførsel og vulkan i riftdalen */}
          <path d="M 440 195 L 420 145" stroke="#ef4444" strokeWidth="3" />
          <polygon points="410,145 420,130 430,145" fill="#dc2626" />
          {/* Røyk fra vulkan */}
          <circle cx="420" cy="122" r="3.5" fill="#94a3b8" className="rift-smoke-puff" />
          <circle cx="417" cy="116" r="4.5" fill="#64748b" className="rift-smoke-puff" style={{ animationDelay: "0.8s" }} />

          <L x="440" y="110" fill="#ef4444" size={9.5} weight={700}>
            Riftvulkan (f.eks. Ol Doinyo Lengai)
          </L>

          {/* Strekkpiler med animert dynamikk */}
          <g className="rift-arrow-l">
            <Arrow d="M 230 110 L 140 110" marker={m.warm} color={C.warm} width={3.6} />
            <L x="185" y="100" fill={C.warm} size={11} weight={800} anchor="middle">
              ← Strekk
            </L>
          </g>
          <g className="rift-arrow-r">
            <Arrow d="M 650 110 L 740 110" marker={m.warm} color={C.warm} width={3.6} />
            <L x="695" y="100" fill={C.warm} size={11} weight={800} anchor="middle">
              Strekk →
            </L>
          </g>

          {/* Referanse til Oslofeltet */}
          <g transform="translate(60, 310)">
            <rect x="0" y="0" width="260" height="60" rx="6" fill="#0c161f" stroke="#3b82f6" strokeWidth="1.2" opacity="0.95" />
            <L x="12" y="20" fill="#38bdf8" size={12} weight={800}>
              NORSK EKSEMPEL: OSLOFELTET
            </L>
            <L x="12" y="36" fill="#d1d5db" size={10}>
              En fossil paleorift fra perm (300 Ma).
            </L>
            <L x="12" y="50" fill="#94a3b8" size={9.5}>
              Graben fra Skagerrak til Mjøsa · Rombeporfyr
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 9. SubductionDiagram:
 * Osean-kontinent subduksjon med dyphavsgrop, akkresjonskile,
 * mineraldehydrering og flukssmelting.
 */
export function SubductionDiagram() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Diagram
      title="Subduksjon hav mot kontinent: Dehydrering og flukssmelting"
      heading="Subduksjon: H₂O-frigjøring, flukssmelting og vulkanbue"
      caption="Når oseanisk litosfære subdueres under et kontinent (som Nazcaplaten under Sør-Amerika), presses den ned i et miljø med økende trykk og temperatur. Ved dyphavsgropen dannes en akkresjonskile av sedimenter som skrapes av havbunnen. I dypet mellom 80 og 150 km gjennomgår havbunnsskorpen metamorfose: hydratiserte mineraler som amfibol og serpentin brytes ned og avgir overkritisk vann (dehydrering). Dette vannet stiger inn i den overliggende mantelkilen av peridotitt. Vannmolekylene bryter silikatbindingene og senker bergartens smeltepunkt dramatisk – dette kalles flukssmelting! Magmaen stiger og bygger opp en eksplosiv vulkansk bue (Andesfjellene). Jordskjelvene som følger den synkende platen, og Wadati-Benioff-sonen, eier kapittelet Jordskjelv."
      viewBox="0 0 940 520"
      wide
      action={
        <PlayPauseToggle
          isPlaying={isPlaying}
          onToggle={() => setIsPlaying((p) => !p)}
        />
      }
    >
      {(m) => (
        <>
          <style>{`
            @keyframes sub-h2o {
              0% { transform: translate(0, 0) scale(0.7); opacity: 0; }
              30% { opacity: 1; }
              100% { transform: translate(18px, -42px) scale(1.1); opacity: 0; }
            }
            @keyframes sub-melt-glow {
              0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 4px #f97316); }
              50% { opacity: 1; filter: drop-shadow(0 0 12px #fb923c); }
            }
            @keyframes sub-magma-stream {
              to { stroke-dashoffset: -40; }
            }
            @keyframes sub-volcano-puff {
              0% { transform: translateY(0) scale(0.6); opacity: 0; }
              40% { opacity: 0.8; }
              100% { transform: translate(6px, -24px) scale(1.6); opacity: 0; }
            }
            @keyframes sub-quake-ring {
              0% { r: 5; opacity: 0.9; stroke-width: 2; }
              70% { r: 16; opacity: 0; stroke-width: 0.5; }
              100% { r: 5; opacity: 0; }
            }
            .sub-h2o-bubble {
              animation: sub-h2o 2.4s ease-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .sub-melt {
              animation: sub-melt-glow 2.5s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .sub-magma-path {
              animation: sub-magma-stream 2s linear infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .sub-puff {
              animation: sub-volcano-puff 3s ease-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .sub-quake {
              animation: sub-quake-ring 2.8s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
          `}</style>

          {/* Havvannslag til venstre */}
          <polygon points="40,80 430,80 380,130 40,110" fill="#0d283c" opacity="0.95" />
          <L x="140" y="98" fill="#38bdf8" size={12} weight={600}>
            Stillehavet (vannsøyle ~4 km)
          </L>

          {/* Dyphavsgrop (Trench) ved x=380 */}
          <path d="M 340 80 L 380 130 L 415 85" fill="#040e16" stroke="#38bdf8" strokeWidth="1.5" />
          <L x="380" y="70" fill="#38bdf8" size={12} weight={800} anchor="middle">
            Peru-Chile-gropen (Dyphavsgrop ~8000 m)
          </L>

          {/* Akkresjonskile (sedimenter skrapt av havbunnen) */}
          <polygon points="380,130 440,90 415,85" fill="#525745" stroke="#34382c" />
          <L x="425" y="112" fill="#d1d5db" size={9.5} weight={700} anchor="middle">
            Kile
          </L>

          {/* Kontinentalskorpe med Andesfjellene (høyre side) */}
          <path
            d="M 440 90 L 480 80 L 530 55 L 570 70 L 610 38 L 650 68 L 710 60 L 800 75 L 900 75 L 900 170 L 460 170 Z"
            fill="#4d5f53"
            stroke="#2b3b31"
            strokeWidth="1.5"
          />
          {/* Snødekte stratovulkaner */}
          <polygon points="600,40 610,25 620,40" fill="#fff" />
          {/* Vulkanutslipp / røyksky */}
          <circle cx="610" cy="20" r="5" fill="#94a3b8" className="sub-puff" />
          <L x="610" y="14" fill="#f8fafc" size={13} weight={800} anchor="middle">
            Andesfjellene (Stratovulkaner)
          </L>
          <L x="750" y="125" fill="#d1d5db" size={12} weight={700}>
            Kontinentalskorpe (granittisk, 40–60 km)
          </L>

          {/* Stiv litosfærisk mantel under kontinentet */}
          <polygon points="460,170 900,170 900,245 520,245" fill="#1b2a33" stroke="#121e25" />
          <L x="750" y="210" fill="#94a3b8" size={11.5} weight={600} anchor="middle">
            Stiv litosfærisk mantel
          </L>

          {/* Subduserende oseanisk litosfære (skorpe + litosfærisk mantel som dykker) */}
          {/* Skorpe (basalt/gabbro som omdannes til eklogitt i dypet) */}
          <path
            d="M 40 110 L 380 130 L 680 470 L 635 485 L 350 150 L 40 130 Z"
            fill="#2f4237"
            stroke="#1d2a23"
            strokeWidth="1.5"
          />
          {/* Litosfærisk mantel under platen */}
          <path
            d="M 40 130 L 350 150 L 635 485 L 565 510 L 300 190 L 40 170 Z"
            fill="#162732"
            stroke="#0e1a22"
          />
          <L x="180" y="155" fill="#94a3b8" size={12} weight={700}>
            Nazcaplaten (Oseanisk litosfære) →
          </L>

          {/* Mantelkilen (wedge) mellom subduksjonsplaten og kontinentet */}
          <polygon points="430,140 520,245 665,430 460,260" fill="#16261d" opacity="0.4" />
          <L x="540" y="295" fill="#4ade80" size={12} weight={700} anchor="middle">
            MANTELKILEN
          </L>
          <L x="540" y="310" fill="#a7f3d0" size={10} anchor="middle">
            (Fast peridotitt)
          </L>

          {/* FLUKSSMELTING: VANNUTSLIPP OG MAGMAOPPSTIGNING */}
          {/* H2O frigjøres fra platen (dehydrering) med animerte partikler */}
          <g fill="#38bdf8" stroke="#38bdf8" opacity="0.95">
            <path d="M 490 260 L 510 220" strokeWidth="2.5" strokeDasharray="3 2" />
            <circle cx="510" cy="215" r="4" className="sub-h2o-bubble" />
            <path d="M 525 300 L 545 255" strokeWidth="2.5" strokeDasharray="3 2" />
            <circle cx="545" cy="250" r="4" className="sub-h2o-bubble" style={{ animationDelay: "0.8s" }} />
            <path d="M 560 340 L 580 295" strokeWidth="2.5" strokeDasharray="3 2" />
            <circle cx="580" cy="290" r="4" className="sub-h2o-bubble" style={{ animationDelay: "1.6s" }} />
            <L x="600" y="340" fill="#38bdf8" size={11} weight={700}>
              H₂O frigjøres (dehydrering)
            </L>
          </g>

          {/* Smeltesone i mantelkilen med pulserende flukssmelte */}
          <ellipse cx="560" cy="245" rx="42" ry="24" fill="#f97316" className="sub-melt" />
          <L x="560" y="242" fill="#fff" size={10.5} weight={800} anchor="middle">
            FLUKSSMELTING
          </L>
          <L x="560" y="255" fill="#fef08a" size={9} weight={700} anchor="middle">
            Solidus senket av vann!
          </L>

          {/* Magmaplier opp til vulkanen */}
          <path
            d="M 560 221 C 570 170, 595 120, 610 50"
            stroke="#ef4444"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            fill="none"
            className="sub-magma-path"
            markerEnd={`url(#${m.low})`}
          />
          <ellipse cx="605" cy="115" rx="20" ry="12" fill="#ef4444" opacity="0.9" />
          <L x="605" y="119" fill="#fff" size={9} weight={700} anchor="middle">
            Magmakammer
          </L>

          {/* Jordskjelv langs plategrensen */}
          <g>
            <circle cx="420" cy="150" r="12" fill="none" stroke="#ef4444" className="sub-quake" />
            <circle cx="390" cy="125" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1.2" />
            <circle cx="420" cy="150" r="5.5" fill="#ef4444" stroke="#fff" strokeWidth="1.2" />
            <circle cx="450" cy="180" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1.2" />
            <circle cx="490" cy="230" r="5.5" fill="#ef4444" stroke="#fff" strokeWidth="1.2" />
            <path d="M 390 125 L 490 230" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5 4" fill="none" opacity="0.5" />

            <g transform="translate(680, 330)">
              <rect x="0" y="0" width="220" height="58" rx="6" fill="#080f16" stroke="#ef4444" strokeWidth="1.2" opacity="0.95" />
              <L x="12" y="22" fill="#ef4444" size={12} weight={800}>
                Jordskjelv langs slabben
              </L>
              <L x="12" y="42" fill="#d1d5db" size={10}>
                Fokus følger plategrensen.
              </L>
              <L x="12" y="54" fill="#94a3b8" size={9.5}>
                Dybdefordeling eier Jordskjelv.
              </L>
            </g>
          </g>

          {/* Slab pull kraftvektor */}
          <g transform="translate(620, 440)">
            <Arrow d="M 0 0 L 45 60" marker={m.teal} color={C.teal} width={4.5} />
            <L x="52" y="70" fill={C.teal} size={13} weight={800}>
              SLAB PULL
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 10. OceanOceanSubductionDiagram:
 * Osean-osean subduksjon med vulkanøybue, Marianegropen og bakbuebasseng.
 */
export function OceanOceanSubductionDiagram() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Diagram
      title="Subduksjon hav mot hav: Vulkanøybue, Marianegropen og bakbuebasseng"
      heading="Hav mot hav: Den eldste, kaldeste platen må vike"
      caption="Når to oseaniske plater kolliderer, er det alltid den eldste, mest avkjølte og tetteste platen som tvinges ned i mantelen. Dette skaper jordens aller dypeste havgroper, som Marianegropen (Challengerdypet på 11 034 m). På samme måte som ved Andesfjellene frigjør den synkende platen vann ved 100 km dyp, og flukssmelting i mantelkilen bygger opp en kjede av vulkanske øyer (en vulkanøybue) som Japan, Marianene eller De små antiller. Bak buen kan det oppstå et eget spredningssenter kalt et bakbuebasseng (back-arc basin)."
      action={<PlayPauseToggle isPlaying={isPlaying} onToggle={() => setIsPlaying(!isPlaying)} />}
      viewBox="0 0 880 430"
      wide
    >
      {(m) => (
        <>
          <style>{`
            @keyframes oos-water {
              0% { transform: translate(0, 0); opacity: 0; }
              40% { opacity: 0.9; }
              100% { transform: translate(12px, -30px); opacity: 0; }
            }
            @keyframes oos-magma-pulse {
              0%, 100% { transform: scale(1); opacity: 0.85; }
              50% { transform: scale(1.08); opacity: 1; filter: drop-shadow(0 0 8px #f97316); }
            }
            @keyframes oos-smoke {
              0% { transform: translate(0, 0) scale(0.8); opacity: 0.7; }
              100% { transform: translate(6px, -18px) scale(1.4); opacity: 0; }
            }
            @keyframes oos-quake-pulse {
              0% { r: 4; opacity: 0.9; }
              70% { r: 12; opacity: 0; }
              100% { r: 4; opacity: 0.9; }
            }
            .oos-h2o {
              animation: oos-water 2.5s ease-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .oos-magma {
              transform-origin: 525px 225px;
              animation: oos-magma-pulse 2.8s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .oos-smoke-puff {
              animation: oos-smoke 2.2s ease-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .oos-quake {
              animation: oos-quake-pulse 2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
          `}</style>

          {/* Hav over hele flaten */}
          <rect x="40" y="30" width="800" height="90" fill="#091b29" />
          <L x="60" y="55" fill="#38bdf8" size={13} weight={600}>
            Stillehavet
          </L>

          {/* Ekstrem dyphavsgrop ved x=370 */}
          <path d="M 320 80 L 370 150 L 410 85" fill="#03080d" stroke="#38bdf8" strokeWidth="1.6" />
          <L x="370" y="68" fill="#38bdf8" size={12} weight={800} anchor="middle">
            Marianegropen (~11 000 m dyp)
          </L>

          {/* Vulkanøy (f.eks. Mariana-øybue) som stikker opp over havflaten */}
          <path d="M 470 85 L 530 45 L 550 45 L 610 85 Z" fill="#38493f" stroke="#222f28" strokeWidth="1.5" />
          <polygon points="535,45 540,35 545,45" fill="#ef4444" />
          {/* Vulkanrøyk */}
          <circle cx="540" cy="30" r="3.5" fill="#94a3b8" className="oos-smoke-puff" />
          <circle cx="544" cy="22" r="5" fill="#64748b" className="oos-smoke-puff" style={{ animationDelay: "0.9s" }} />

          <L x="540" y="25" fill="#f8fafc" size={13} weight={800} anchor="middle">
            Vulkanøybue (Japan / Marianene)
          </L>

          {/* Subduserende eldre havbunn (dykker mot høyre) */}
          <path
            d="M 40 115 L 360 145 L 640 410 L 580 430 L 310 175 L 40 145 Z"
            fill="#1e3328"
            stroke="#122019"
            strokeWidth="1.5"
          />
          <path
            d="M 40 145 L 310 175 L 580 430 L 510 450 L 260 205 L 40 185 Z"
            fill="#13242e"
            stroke="#0d181f"
          />
          <L x="160" y="170" fill={C.cold} size={12} weight={700}>
            Eldste, kaldeste havbunn synker (Stillehavsplaten) →
          </L>

          {/* Overliggende yngre havbunn (Filippinerplaten) og bakbuebasseng */}
          <path
            d="M 410 115 L 470 85 L 610 85 L 670 125 L 840 125 L 840 175 L 470 175 Z"
            fill="#2c3e34"
            stroke="#1b2822"
          />
          <L x="750" y="105" fill="#94a3b8" size={11} weight={600} anchor="middle">
            Bakbuebasseng (Back-arc basin)
          </L>

          {/* Dehydrering (H2O dråper) */}
          <g className="oos-h2o">
            <circle cx="460" cy="250" r="3" fill="#38bdf8" />
            <circle cx="490" cy="285" r="3" fill="#38bdf8" />
            <path d="M 460 250 L 470 230" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>

          {/* Flukssmelting under øybuen */}
          <ellipse cx="525" cy="225" rx="35" ry="20" fill="#f97316" className="oos-magma" />
          <Arrow d="M 530 205 L 540 50" marker={m.low} color={C.low} width={3} />
          <L x="525" y="222" fill="#fff" size={10} weight={800} anchor="middle">
            Flukssmelting
          </L>

          {/* Jordskjelv langs plategrensen */}
          <circle cx="375" cy="155" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
          <circle cx="375" cy="155" r="4" fill="none" stroke="#ef4444" strokeWidth="1.5" className="oos-quake" />
          <circle cx="420" cy="205" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
          <circle cx="480" cy="275" r="5.5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
        </>
      )}
    </Diagram>
  );
}

/**
 * 11. CollisionDiagram:
 * Kontinent-kontinent-kollisjon med 70–80 km dyp skorperot, skyvedekker (Kaledonidene),
 * regional metamorfose og fravær av vulkanisme.
 */
export function CollisionDiagram() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Diagram
      title="Kontinentalkollisjon: Fjellkjededannelse, skyvedekker og dyp skorperot"
      heading="Kontinent mot kontinent: Himalaya i dag og Kaledonidene i Norges fortid"
      caption="Når to kontinentale litosfæreplater møtes (som da India traff Asia for 50 mill. år siden, eller da Baltika og Laurentia kolliderte og dannet Kaledonidene for 400 mill. år siden), kan ingen av platene subdueres i dypet fordi kontinentalskorpen har for lav tetthet (~2,7 g/cm³). Resultatet er kolossal skorpeforkorting. Jordskorpen presses opp i svimlende fjellkjeder og stables i store flak som kalles skyvedekker (nappes), som ble skjøvet hundrevis av kilometer over grunnfjellet. Samtidig dannes en enorm jordskorperot som stikker 70–80 km ned i mantelen for å holde fjellene flytende isostatisk. Fordi det ikke lenger føres vannrik havbunn ned i mantelen, opphører vulkanismen nesten helt – men kollisjonen skaper voldsom regional metamorfose (gneis og glimmerskifer)."
      action={<PlayPauseToggle isPlaying={isPlaying} onToggle={() => setIsPlaying(!isPlaying)} />}
      viewBox="0 0 940 480"
      wide
    >
      {(m) => (
        <>
          <style>{`
            @keyframes collision-arrow-l {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(6px); }
            }
            @keyframes collision-arrow-r {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(-6px); }
            }
            @keyframes nappe-dash {
              0% { stroke-dashoffset: 24; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes moho-root-glow {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; filter: drop-shadow(0 0 5px #ef4444); }
            }
            .collision-l {
              animation: collision-arrow-l 2.2s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .collision-r {
              animation: collision-arrow-r 2.2s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .nappe-thrust {
              stroke-dasharray: 8 4;
              animation: nappe-dash 2s linear infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .moho-root {
              animation: moho-root-glow 2.8s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
          `}</style>

          {/* Himmel */}
          <rect x="40" y="30" width="860" height="110" fill="#09141d" />

          {/* Kolossalt fjellmassiv i kollisjonssonen (Himalaya / Kaledonidene) */}
          <path
            d="M 40 130 L 240 130 L 320 80 L 390 50 L 470 35 L 550 55 L 620 75 L 700 130 L 900 130 L 900 190 L 720 270 L 470 310 L 250 270 L 40 190 Z"
            fill="#4d5e53"
            stroke="#28382e"
            strokeWidth="1.8"
          />

          {/* Snødekte tinder */}
          <polygon points="460,50 470,35 480,50" fill="#fff" />
          <polygon points="380,65 390,50 400,65" fill="#fff" />
          <polygon points="540,68 550,55 560,68" fill="#fff" />
          <L x="470" y="24" fill="#f8fafc" size={14} weight={800} anchor="middle">
            Himalaya (8848 moh.) / Kaledonidene i silur (~9000 moh.!)
          </L>

          {/* Kaledonske skyvedekker (stables langs basale skyveforkastninger) */}
          <path d="M 260 170 C 340 135, 430 90, 520 80" stroke="#f59e0b" strokeWidth="3" fill="none" className="nappe-thrust" />
          <path d="M 300 205 C 390 170, 490 125, 580 110" stroke="#f59e0b" strokeWidth="3" fill="none" className="nappe-thrust" />
          <L x="320" y="130" fill="#f59e0b" size={12} weight={800}>
            Skyvedekker (Nappes, f.eks. Jotundekket i Norge)
          </L>
          <L x="320" y="146" fill="#fef08a" size={10}>
            Overskjøvet 100–400 km inn over Baltika
          </L>

          {/* KJEMPEROT (MOHO NEDTRYKT TIL 75 KM DYP) */}
          <path
            d="M 40 190 L 250 270 L 470 310 L 720 270 L 900 190 L 900 240 L 750 320 L 470 365 L 220 320 L 40 240 Z"
            fill="#23343e"
            stroke="#16232b"
            strokeWidth="1.5"
          />
          <path d="M 40 190 L 250 270 L 470 310 L 720 270 L 900 190" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 2" fill="none" className="moho-root" />
          <L x="470" y="340" fill="#38bdf8" size={13} weight={800} anchor="middle">
            SKORPEROT: Moho nedtrykt til ~75 km dyp!
          </L>
          <L x="470" y="358" fill="#d1d5db" size={10.5} anchor="middle">
            Isostasi (Airys modell): For hver 1000 meter fjell over havet, trengs ca. 8000 meter rot under!
          </L>

          {/* Regional metamorfose i dypet */}
          <g transform="translate(380, 230)">
            <rect x="0" y="0" width="180" height="35" rx="4" fill="#1b261e" stroke="#10b981" strokeWidth="1" />
            <L x="90" y="16" fill="#6ee7b7" size={10.5} weight={700} anchor="middle">
              Intens regional metamorfose
            </L>
            <L x="90" y="28" fill="#a7f3d0" size={9.5} anchor="middle">
              Gneis · Glimmerskifer · Amfibolitt
            </L>
          </g>

          {/* Kollisjonspiler med animasjon */}
          <g className="collision-l">
            <Arrow d="M 120 110 L 200 110" marker={m.low} color={C.low} width={4} />
            <L x="160" y="100" fill={C.low} size={12} weight={800} anchor="middle">
              India / Baltika (~5 cm/år) →
            </L>
          </g>
          <g className="collision-r">
            <Arrow d="M 820 110 L 740 110" marker={m.low} color={C.low} width={4} />
            <L x="780" y="100" fill={C.low} size={12} weight={800} anchor="middle">
              ← Asia / Laurentia
            </L>
          </g>

          {/* Fakta-advarsel om fravær av vulkanisme */}
          <g transform="translate(60, 395)">
            <rect x="0" y="0" width="820" height="42" rx="6" fill="#080f14" stroke="#ef4444" strokeWidth="1.2" />
            <L x="410" y="18" fill="#ef4444" size={11.5} weight={800} anchor="middle">
              VIKTIG SKILLE: Hvorfor har ikke Himalaya og Kaledonidene subduksjonsvulkaner?
            </L>
            <L x="410" y="32" fill="#d1d5db" size={10} anchor="middle">
              Ingen vannrik havbunnsslab føres ned i mantelen lenger → Ingen flukssmelting! Fjellene eroderer i stedet ned til grunnfjellet.
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 12. TransformDiagram:
 * Viser transformforkastninger på land (San Andreas) og i havet (Jan Mayen-bruddsonen).
 */
export function TransformDiagram() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Diagram
      title="Transformforkastninger: Sidelengs bevegelse og elastisk spenningsutløsning"
      heading="Transformgrenser: Når litosfæreplater gnir sidelengs forbi hverandre"
      caption="Langs en transformforkastning glir to plater horisontalt forbi hverandre. Skorpe verken nydannes eller ødelegges, og fraværet av vertikal mantelbevegelse eller dehydrering gjør at det praktisk talt ikke oppstår vulkanisme. I stedet oppstår voldsom mekanisk friksjon: Bergartene henger seg opp i en «friksjonslås». Mens platene fortsetter å bevege seg med noen centimeter i året noen titalls kilometer unna, bøyes og deformeres bergartene elastisk over årtier. Når spenningen overstiger bergartens bruddstyrke, brister forkastningen plutselig i løpet av sekunder – et ødeleggende jordskjelv. På land forskyver dette elveløp og gjerder (San Andreas); på havbunn segmenterer transformforkastninger midthavsryggene (f.eks. Jan Mayen-bruddsonen)."
      viewBox="0 0 880 430"
      wide
      action={
        <PlayPauseToggle
          isPlaying={isPlaying}
          onToggle={() => setIsPlaying((p) => !p)}
        />
      }
    >
      {(m) => (
        <>
          <style>{`
            @keyframes td-plate-a {
              0% { transform: translateY(0px); }
              45% { transform: translateY(-8px); }
              50% { transform: translateY(-16px); }
              90% { transform: translateY(-16px); }
              100% { transform: translateY(0px); }
            }
            @keyframes td-plate-b {
              0% { transform: translateY(0px); }
              45% { transform: translateY(8px); }
              50% { transform: translateY(16px); }
              90% { transform: translateY(16px); }
              100% { transform: translateY(0px); }
            }
            @keyframes td-quake-burst {
              0%, 40% { r: 6; opacity: 0; }
              45% { r: 12; opacity: 0.5; }
              50% { r: 32; opacity: 0.95; stroke: #fff; }
              65% { r: 50; opacity: 0; }
              100% { r: 6; opacity: 0; }
            }
            @keyframes td-elastic-strain {
              0% { opacity: 0.4; }
              45% { opacity: 0.95; filter: drop-shadow(0 0 6px #ef4444); }
              50% { opacity: 0.2; }
              100% { opacity: 0.4; }
            }
            .td-anim-plate-a {
              animation: td-plate-a 6s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .td-anim-plate-b {
              animation: td-plate-b 6s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .td-anim-burst {
              animation: td-quake-burst 6s ease-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .td-anim-strain {
              animation: td-elastic-strain 6s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
          `}</style>

          {/* To motstående forkastningsblokker i 3D-perspektiv med dynamisk glidebevegelse */}
          {/* Venstre blokk (beveger seg nordover / oppover) */}
          <g className="td-anim-plate-a">
            <path d="M 80 120 L 430 120 L 430 320 L 80 320 Z" fill="#2d4237" stroke="#1d2d25" strokeWidth="2" />
            <L x="255" y="155" fill="#38bdf8" size={14} weight={800} anchor="middle">
              PLATE A (f.eks. Stillehavsplaten)
            </L>
            <Arrow d="M 255 270 L 255 180" marker={m.teal} color={C.teal} width={4.5} />
            <L x="240" y="225" fill="#38bdf8" size={12} weight={700} anchor="end">
              Nordover ~5 cm/år ↑
            </L>
          </g>

          {/* Høyre blokk (beveger seg sørover / nedover) */}
          <g className="td-anim-plate-b">
            <path d="M 450 80 L 800 80 L 800 280 L 450 280 Z" fill="#3d372e" stroke="#28241e" strokeWidth="2" />
            <L x="625" y="115" fill={C.warm} size={14} weight={800} anchor="middle">
              PLATE B (f.eks. Nordamerikanske plate)
            </L>
            <Arrow d="M 625 140 L 625 230" marker={m.warm} color={C.warm} width={4.5} />
            <L x="640" y="185" fill={C.warm} size={12} weight={700}>
              ↓ Sørover (relativt)
            </L>
          </g>

          {/* Selve forkastningssprekken i midten (San Andreas-sporet) */}
          <line x1="440" y1="35" x2="440" y2="355" stroke="#ef4444" strokeWidth="4" strokeDasharray="8 4" />
          <L x="440" y="24" fill="#ef4444" size={13} weight={800} anchor="middle">
            TRANSFORMFORKASTNING (San Andreas / Jan Mayen bruddsone)
          </L>

          {/* Forskjøvet elveleie (viser historisk forskyvning) */}
          <path d="M 180 140 L 440 140 L 440 100 L 700 100" stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.85" />
          <L x="455" y="125" fill="#38bdf8" size={10.5} weight={700}>
            Forskjøvet elveløp (130 meter sideforskyvning)
          </L>

          {/* Låst sone / jordskjelvfokus med pulserende spenningsglød og seismisk burst */}
          <circle cx="440" cy="220" r="18" fill="#ef4444" className="td-anim-strain" />
          <circle cx="440" cy="220" r="10" fill="none" stroke="#ef4444" strokeWidth="2" className="td-anim-burst" />
          <circle cx="440" cy="220" r="6" fill="#ef4444" stroke="#fff" strokeWidth="2" />
          <L x="465" y="215" fill="#ef4444" size={12} weight={800}>
            Friksjonslås: Spenning bygges over 100–250 år!
          </L>
          <L x="465" y="230" fill="#fca5a5" size={10} weight={600}>
            Plutselig bruddutløsning (jordskjelv)
          </L>

          {/* Wilson-finesse forklaring nederst */}
          <g transform="translate(60, 365)">
            <rect x="0" y="0" width="760" height="45" rx="6" fill="#080e14" stroke="#334155" />
            <L x="380" y="18" fill="#38bdf8" size={11} weight={700} anchor="middle">
              J. Tuzo Wilsons geometriske finesse (1965):
            </L>
            <L x="380" y="32" fill="#cbd5e1" size={10} anchor="middle">
              KUN mellom de to forskjøvede spredningsryggene glir platene i motsatt retning (aktiv seismisitet). Utenfor ryggene beveger skorpen seg i samme retning (aseismiske arr).
            </L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 13. HotspotPlumeDiagram:
 * Viser mantelplym fra D''-grensen, intraplate-vulkanisme og Hawaii-Emperor-øykjeden
 * med det berømte 47-millioner-år-knekkpunktet.
 */
export function HotspotPlumeDiagram() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Diagram
      title="Hotspots og mantelplymer: Dype termiske oppstrømmer og vulkankjeder"
      heading="Hotspots: Jordens dypeste brennere og Hawaii-Emperor-bøyen"
      caption="De fleste vulkaner ligger på plategrenser, men noen av jordens mektigste oppstår midt inne på platene (intraplate-vulkanisme). Dette skyldes mantelplymer (hotspots): tynne, termiske oppstrømmer av overopphetet bergart som har sine røtter helt nede ved kjerne-mantel-grensen (D''-laget på 2900 km dyp). Fordi plymen er forankret så dypt, står den praktisk talt i ro over titalls millioner år, mens litosfæreplaten glir sakte forbi over den. Plymen smelter seg gjennom platen og skaper en lineær kjede av vulkanske øyer der alderen øker jevnt i platens bevegelsesretning. Den berømte 60 graders knekken i Hawaii-Emperor-ryggen viser at Stillehavsplaten endret bevegelsesretning for 47 millioner år siden!"
      viewBox="0 0 940 480"
      wide
      action={
        <PlayPauseToggle
          isPlaying={isPlaying}
          onToggle={() => setIsPlaying((p) => !p)}
        />
      }
    >
      {(m) => (
        <>
          <style>{`
            @keyframes hp-plume-flow {
              to { stroke-dashoffset: -60; }
            }
            @keyframes hp-plume-pulse {
              0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 4px #f97316); }
              50% { opacity: 1; filter: drop-shadow(0 0 12px #fb923c); }
            }
            @keyframes hp-vent-smoke {
              0% { transform: translateY(0) scale(0.6); opacity: 0; }
              40% { opacity: 0.85; }
              100% { transform: translate(-8px, -20px) scale(1.6); opacity: 0; }
            }
            .hp-flow-line {
              animation: hp-plume-flow 2.5s linear infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .hp-head-glow {
              animation: hp-plume-pulse 2.8s ease-in-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
            .hp-smoke {
              animation: hp-vent-smoke 2.4s ease-out infinite;
              animation-play-state: ${isPlaying ? "running" : "paused"};
            }
          `}</style>

          {/* Havbasseng øverst */}
          <rect x="40" y="30" width="860" height="90" fill="#0b1d2c" />
          <L x="60" y="55" fill="#38bdf8" size={13} weight={600}>
            Stillehavet (vannsøyle ~5000 m)
          </L>

          {/* Oseanisk litosfære som glir mot venstre */}
          <rect x="40" y="120" width="860" height="55" fill="#273830" stroke="#18241f" strokeWidth="1.2" />
          <L x="160" y="152" fill="#d1d5db" size={12} weight={700}>
            Stillehavsplaten glir mot nordvest (9 cm/år) ←
          </L>
          <Arrow d="M 450 148 L 360 148" marker={m.teal} color={C.teal} width={3.6} />

          {/* Hawaii-øykjeden (alder øker mot venstre) */}
          {/* Aktiv vulkan (Kilauea / Mauna Loa) rett over plymen ved x=700 */}
          <path d="M 640 120 L 700 45 L 760 120 Z" fill="#423b32" stroke="#25211b" strokeWidth="1.5" />
          <polygon points="695,45 700,32 705,45" fill="#ef4444" />
          {/* Vulkanutbrudd røyk/ild */}
          <circle cx="700" cy="30" r="4.5" fill="#f97316" className="hp-smoke" />
          <L x="700" y="24" fill="#f8fafc" size={12} weight={800} anchor="middle">
            Hawaii (Aktiv nå · 0 Ma)
          </L>

          {/* Maui (1 mill. år) */}
          <path d="M 520 120 L 560 65 L 600 120 Z" fill="#35352c" stroke="#1f1f1a" />
          <L x="560" y="55" fill="#cbd5e1" size={11} weight={600} anchor="middle">
            Maui (1 Ma)
          </L>

          {/* Oahu (3 mill. år) */}
          <path d="M 400 120 L 435 80 L 470 120 Z" fill="#2d3028" stroke="#1a1c17" />
          <L x="435" y="72" fill="#cbd5e1" size={10.5} anchor="middle">
            Oahu (3 Ma)
          </L>

          {/* Kauai (5 mill. år) */}
          <path d="M 280 120 L 310 95 L 340 120 Z" fill="#252822" />
          <L x="310" y="88" fill="#94a3b8" size={10} anchor="middle">
            Kauai (5 Ma)
          </L>

          {/* Undersjøisk guyot / erodert vulkan */}
          <path d="M 140 120 L 165 112 L 190 120 Z" fill="#1b1f1a" />
          <L x="165" y="104" fill="#64748b" size={9.5} anchor="middle">
            Midway (28 Ma)
          </L>

          {/* Astenosfære og mantel under litosfæren */}
          <rect x="40" y="175" width="860" height="255" fill="#1b2832" />

          {/* MANTELPLYM (SØYLE FRA DYPET VED x=700) */}
          <path
            d="M 685 430 L 685 240 C 670 200, 640 160, 680 135 L 720 135 C 760 160, 730 200, 715 240 L 715 430 Z"
            fill="#ea580c"
            opacity="0.92"
          />
          {/* Animerte oppstigende termiske strømmer inne i plymmen */}
          <line
            x1="700"
            y1="420"
            x2="700"
            y2="155"
            stroke="#fed7aa"
            strokeWidth="3.5"
            strokeDasharray="8 6"
            className="hp-flow-line"
          />
          <line
            x1="693"
            y1="400"
            x2="693"
            y2="180"
            stroke="#fef08a"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="hp-flow-line"
            style={{ animationDelay: "0.5s" }}
          />
          <line
            x1="707"
            y1="400"
            x2="707"
            y2="180"
            stroke="#fef08a"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="hp-flow-line"
            style={{ animationDelay: "1s" }}
          />

          <ellipse cx="700" cy="145" rx="35" ry="18" fill="#f97316" className="hp-head-glow" />
          <L x="700" y="270" fill="#fff" size={13} weight={800} anchor="middle">
            MANTELPLYM (HOTSPOT)
          </L>
          <L x="700" y="288" fill="#fed7aa" size={11} weight={600} anchor="middle">
            Stasjonær termisk oppstrøm
          </L>
          <L x="700" y="304" fill="#cbd5e1" size={10} anchor="middle">
            Forankret ved kjerne-mantel-grensen (2900 km dyp)
          </L>

          {/* Kjerne-mantel-grensen nederst */}
          <rect x="40" y="430" width="860" height="25" fill="#991b1b" />
          <L x="470" y="447" fill="#fef08a" size={11.5} weight={800} anchor="middle">
            D''-LAGET / KJERNE-MANTEL-GRENSEN (2900 km dyp · Varmekilde for mantelplymen)
          </L>

          {/* Grafisk miniatyr over Hawaii-Emperor-bøyen */}
          <g transform="translate(60, 200)">
            <rect x="0" y="0" width="260" height="110" rx="6" fill="#080f14" stroke="#f59e0b" strokeWidth="1.2" opacity="0.95" />
            <L x="12" y="22" fill="#f59e0b" size={12} weight={800}>
              HAWAII-EMPEROR-BØYEN:
            </L>
            {/* Liten illustrasjon av knekklinjen */}
            <path d="M 40 95 L 110 65 L 110 32" stroke="#38bdf8" strokeWidth="2.8" fill="none" markerEnd={`url(#${m.teal})`} />
            <circle cx="110" cy="65" r="4" fill="#ef4444" />
            <L x="125" y="68" fill="#ef4444" size={10.5} weight={700}>
              Knekkpunkt: 47 mill. år siden
            </L>
            <L x="125" y="82" fill="#d1d5db" size={9.5}>
              Stillehavsplatens kurs endret seg!
            </L>
            <L x="40" y="105" fill="#94a3b8" size={9}>Hawaii nå</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

/**
 * 14. WilsonCycleDiagram:
 * Viser superkontinent-syklusen (Wilsonsyklusen) i 6 pedagogiske trinn.
 */
export function WilsonCycleDiagram() {
  const [stage, setStage] = useState<number>(1);

  const stages = [
    {
      n: 1,
      title: "1. Kontinental rifting (Embryonisk stadium)",
      example: "Den østafrikanske riftdalen i dag; Oslofeltet i perm",
      desc: "Tektonisk strekk tynner kontinentet. Mantelen stiger, det oppstår grabener og vulkanisme. Kontinentet begynner å sprekke opp.",
    },
    {
      n: 2,
      title: "2. Ungt havbasseng (Juvenilt stadium)",
      example: "Rødehavet og Adenbukta",
      desc: "Kontinentene har glidd helt fra hverandre. Havet flommer inn i sprekken, og en begynnende midthavsrygg med basaltskorpe etableres.",
    },
    {
      n: 3,
      title: "3. Modent verdenshav (Modent stadium)",
      example: "Atlanterhavet i dag (med Norskehavet)",
      desc: "Havet har vokst til et bredt verdenshav med en fullt utviklet midthavsrygg og passive kontinentalmarginer uten subduksjon.",
    },
    {
      n: 4,
      title: "4. Subduksjonsstadium (Avtagende stadium)",
      example: "Stillehavet i dag (Ring of Fire)",
      desc: "Havbunnsskorpen blir så gammel, kald og tung at den begynner å synke under egen vekt. Subduksjonssoner og vulkanbuer spiser opp havbunnen raskere enn ny dannes.",
    },
    {
      n: 5,
      title: "5. Havlukking og kollisjon (Terminalt stadium)",
      example: "Middelhavet og India som treffer Eurasia (Himalaya)",
      desc: "Havbassenget lukkes nesten helt. Kontinentalmassene på hver side kolliderer; skorpen forkortes og foldes opp i en kjempefjellkjede.",
    },
    {
      n: 6,
      title: "6. Sutursone og peneplan (Gjenoppretting)",
      example: "Kaledonidene i Norge (erodert rot); Uralfjellene",
      desc: "De to kontinentene er sveiset sammen i en 'sutur'. Gjennom hundrevis av millioner år eroderes fjellene ned til en flat overflate (peneplan). Syklusen er klar til å gjentas!",
    },
  ];

  const current = stages[stage - 1];

  return (
    <FigureFrame
      heading="Wilsonsyklusen: Havbassengenes fødsel, vekst, lukking og død"
      caption="Superkontinenter som Pangea, Rodinia og Columbia er ikke evige. Gjennom en syklus på 400–600 millioner år – kalt Wilsonsyklusen etter den kanadiske geofysikeren J. Tuzo Wilson (1966) – sprekker kontinenter opp, nye verdenshav åpner seg, for deretter å subdueres og lukkes igjen i voldsomme kollisjoner. Klikk på de seks fasene nedenfor for å se livsløpet."
    >
      <div className="space-y-4">
        {/* Fanevelger for faser */}
        <div className="flex flex-wrap gap-2">
          {stages.map((s) => (
            <button
              key={s.n}
              type="button"
              onClick={() => setStage(s.n)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                stage === s.n
                  ? "bg-primary text-primary-foreground shadow"
                  : "border border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              Fase {s.n}
            </button>
          ))}
        </div>

        {/* Informasjonskort for aktiv fase */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/60 pb-3">
            <p className="font-display text-lg font-bold text-primary">{current.title}</p>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              Eksempel: {current.example}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground/90">{current.desc}</p>
        </div>
      </div>
    </FigureFrame>
  );
}

/**
 * 15. NorwayTectonicsHistoryDiagram:
 * Norges geologiske reise i et platetektonisk lys:
 * Fra Baltika og Kaledonidene til Oslo-rifting, Norskehavets åpning og isostasi.
 */
export function NorwayTectonicsHistoryDiagram() {
  return (
    <Diagram
      title="Norges platetektoniske reise gjennom geologisk tid"
      heading="Norges geologiske reise: Grunnfjell, Kaledonidene, Oslofeltet og Norskehavet"
      caption="Norge er et levende museum over platetektonikkens historie. Det prekambriske grunnfjellet (Baltika) ble dannet for opptil 2,8 milliarder år siden. For ca. 430–400 millioner år siden lukket det gamle Iapetushavet seg, og Baltika kolliderte med Grønland/Nord-Amerika (Laurentia) i den kaledonske orogenesen – fjell som rager over 9000 meter stablet enorme skyvedekker over landet vårt. I perm (for 300 mill. år siden) holdt superkontinentet Pangea på å sprekke opp, og skapte Oslofeltets dramatiske riftdal med vulkaner og dypbergarter. For 55 millioner år siden åpnet Norskehavet seg da Atlanteren spredte seg nordover, og skapte Jan Mayen og Norges sokkelbassenger. Etter forrige istid har Norge hevet seg opptil 220 meter (isostasi), noe som hevet gammel havbunn (marin leire) opp på tørt land."
      viewBox="0 0 940 450"
      wide
    >
      {(m) => (
        <>
          {/* Tidslinje-kort fra venstre til høyre (4 tidsepoker) */}
          {/* 1. Kaledonidene (Silur/Devon, 430–400 Ma) */}
          <g transform="translate(50, 40)">
            <rect x="0" y="0" width="195" height="360" rx="8" fill="#0d1822" stroke="#f59e0b" strokeWidth="1.5" />
            <L x="97" y="28" fill="#f59e0b" size={13} weight={800} anchor="middle">
              1. KALEDONIDENE
            </L>
            <L x="97" y="44" fill="#fed7aa" size={10.5} anchor="middle">
              430–400 mill. år siden (Silur)
            </L>

            {/* Illustrasjon av kollisjon og skyvedekker */}
            <path d="M 20 120 L 70 80 L 100 60 L 140 85 L 175 120 Z" fill="#4d5e53" />
            <path d="M 40 120 C 80 100, 120 75, 160 70" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
            <L x="97" y="145" fill="#f8fafc" size={11} weight={700} anchor="middle">
              Iapetushavet lukkes
            </L>
            <L x="97" y="160" fill="#d1d5db" size={10} anchor="middle">
              Baltika krasjer med Grønland
            </L>

            <L x="15" y="195" fill="#cbd5e1" size={10}>● Fjellkjede på over 9000 moh.</L>
            <L x="15" y="215" fill="#cbd5e1" size={10}>● Gigantiske skyvedekker</L>
            <L x="25" y="230" fill="#94a3b8" size={9.5}>(Jotunheimen, Rondane)</L>
            <L x="15" y="250" fill="#cbd5e1" size={10}>● Gneis og glimmerskifer</L>

            <rect x="15" y="285" width="165" height="55" rx="4" fill="#1b2832" />
            <L x="97" y="304" fill="#38bdf8" size={10.5} weight={700} anchor="middle">
              I dag i Norge:
            </L>
            <L x="97" y="320" fill="#cbd5e1" size={9.5} anchor="middle">
              De norske fjellene er den
            </L>
            <L x="97" y="333" fill="#cbd5e1" size={9.5} anchor="middle">
              eroderte roten av Kaledonidene!
            </L>
          </g>

          {/* 2. Oslofeltet (Karbon/Perm, 310–250 Ma) */}
          <g transform="translate(265, 40)">
            <rect x="0" y="0" width="195" height="360" rx="8" fill="#0d1822" stroke="#ef4444" strokeWidth="1.5" />
            <L x="97" y="28" fill="#ef4444" size={13} weight={800} anchor="middle">
              2. OSLOFELTET
            </L>
            <L x="97" y="44" fill="#fca5a5" size={10.5} anchor="middle">
              300–250 mill. år siden (Perm)
            </L>

            {/* Illustrasjon av graben og riftvulkan */}
            <path d="M 20 80 L 60 80 L 80 115 L 120 115 L 140 80 L 175 80 Z" fill="#544c3d" />
            <polygon points="95,115 100,102 105,115" fill="#ef4444" />
            <L x="97" y="145" fill="#f8fafc" size={11} weight={700} anchor="middle">
              Pangea revner
            </L>
            <L x="97" y="160" fill="#d1d5db" size={10} anchor="middle">
              Skorpen sprekker i en riftdal
            </L>

            <L x="15" y="195" fill="#cbd5e1" size={10}>● Graben fra Langesund til Mjøsa</L>
            <L x="15" y="215" fill="#cbd5e1" size={10}>● Voldsomme vulkaner</L>
            <L x="25" y="230" fill="#94a3b8" size={9.5}>(Kolsås, Krokskogen)</L>
            <L x="15" y="250" fill="#cbd5e1" size={10}>● Rombeporfyr og larvikitt</L>

            <rect x="15" y="285" width="165" height="55" rx="4" fill="#1b2832" />
            <L x="97" y="304" fill="#38bdf8" size={10.5} weight={700} anchor="middle">
              I dag i Norge:
            </L>
            <L x="97" y="320" fill="#cbd5e1" size={9.5} anchor="middle">
              En død riftdal rik på
            </L>
            <L x="97" y="333" fill="#cbd5e1" size={9.5} anchor="middle">
              byggeråstoff og naturstein!
            </L>
          </g>

          {/* 3. Norskehavets åpning (Tertiær, 55 Ma) */}
          <g transform="translate(480, 40)">
            <rect x="0" y="0" width="195" height="360" rx="8" fill="#0d1822" stroke="#38bdf8" strokeWidth="1.5" />
            <L x="97" y="28" fill="#38bdf8" size={13} weight={800} anchor="middle">
              3. NORSKEHAVET
            </L>
            <L x="97" y="44" fill="#bae6fd" size={10.5} anchor="middle">
              55 mill. år siden (Eocen)
            </L>

            {/* Illustrasjon av midthavsrygg og sokkel */}
            <path d="M 20 80 L 70 80 L 100 110 L 120 110 L 175 80 Z" fill="#2d3d34" />
            <rect x="20" y="70" width="155" height="25" fill="#0284c7" opacity="0.6" />
            <L x="97" y="145" fill="#f8fafc" size={11} weight={700} anchor="middle">
              Nord-Atlanteren åpnes
            </L>
            <L x="97" y="160" fill="#d1d5db" size={10} anchor="middle">
              Norge skilles fra Grønland
            </L>

            <L x="15" y="195" fill="#cbd5e1" size={10}>● Passiv kontinentalmargin</L>
            <L x="15" y="215" fill="#cbd5e1" size={10}>● Olje- og gassbassenger</L>
            <L x="25" y="230" fill="#94a3b8" size={9.5}>(Sedimenter i Nordsjøen)</L>
            <L x="15" y="250" fill="#cbd5e1" size={10}>● Jan Mayen & Beerenberg</L>

            <rect x="15" y="285" width="165" height="55" rx="4" fill="#1b2832" />
            <L x="97" y="304" fill="#38bdf8" size={10.5} weight={700} anchor="middle">
              I dag i Norge:
            </L>
            <L x="97" y="320" fill="#cbd5e1" size={9.5} anchor="middle">
              Beerenberg på Jan Mayen er
            </L>
            <L x="97" y="333" fill="#cbd5e1" size={9.5} anchor="middle">
              Norges eneste aktive vulkan!
            </L>
          </g>

          {/* 4. Isostasi & Landheving (Kvartær til Nåtid) */}
          <g transform="translate(695, 40)">
            <rect x="0" y="0" width="195" height="360" rx="8" fill="#0d1822" stroke="#10b981" strokeWidth="1.5" />
            <L x="97" y="28" fill="#10b981" size={13} weight={800} anchor="middle">
              4. GLASIAL ISOSTASI
            </L>
            <L x="97" y="44" fill="#a7f3d0" size={10.5} anchor="middle">
              Siste 10 000 år til i dag
            </L>

            {/* Illustrasjon av heving etter isen */}
            <path d="M 20 100 C 60 75, 130 75, 175 100 Z" fill="#4d5c55" />
            <Arrow d="M 97 125 L 97 75" marker={m.teal} color={C.teal} width={3.2} />
            <L x="97" y="145" fill="#f8fafc" size={11} weight={700} anchor="middle">
              Landet reiser seg!
            </L>
            <L x="97" y="160" fill="#d1d5db" size={10} anchor="middle">
              3 km innlandsis smeltet bort
            </L>

            <L x="15" y="195" fill="#cbd5e1" size={10}>● Litosfæren spratt opp</L>
            <L x="15" y="215" fill="#cbd5e1" size={10}>● Marin grense opptil 220 m</L>
            <L x="25" y="230" fill="#94a3b8" size={9.5}>(Marin leire på tørt land)</L>
            <L x="15" y="250" fill="#cbd5e1" size={10}>● Intraplate-jordskjelv</L>

            <rect x="15" y="285" width="165" height="55" rx="4" fill="#1b2832" />
            <L x="97" y="304" fill="#38bdf8" size={10.5} weight={700} anchor="middle">
              I dag i Norge:
            </L>
            <L x="97" y="320" fill="#cbd5e1" size={9.5} anchor="middle">
              Oslo hever seg 4 mm/år.
            </L>
            <L x="97" y="333" fill="#cbd5e1" size={9.5} anchor="middle">
              Skaper kvikkleire og skjelv!
            </L>
          </g>

          {/* Bunntekst */}
          <L x="470" y="425" fill="#94a3b8" size={11.5} weight={600} anchor="middle">
            Fra kontinentalkollisjon og riftdannelse til havbunnssubduksjon og landheving: Norge har opplevd alle faser i platetektonikken.
          </L>
        </>
      )}
    </Diagram>
  );
}
