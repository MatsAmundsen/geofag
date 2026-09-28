import { Arrow, C, Diagram, L } from "./svg-kit";

export function EnergySourcesDiagram() {
  return (
    <Diagram
      title="Energi fra atmosfære og hav: vind på land, havvind, bølger og tidevann"
      heading="Fire fornybare energikilder fra hav og luft"
      caption="Vind på land og havvind drives av solens ujevne oppvarming og trykkgradienter. Bølgekraft er konsentrert vindenergi overført til havoverflaten. Tidevann er gravitasjonsdrevet av månen og solen, og er derfor 100 % uavhengig av været."
      viewBox="0 0 900 300"
      wide
    >
      {(m) => (
        <>
          {[
            {
              x: 25,
              t: "Vind på land",
              s: "Trykkgradienter & sol",
              desc: "Lavest kostnad per kWh · Arealkonflikter",
              color: C.teal,
            },
            {
              x: 245,
              t: "Havvind",
              s: "Jevnere & sterkere vind",
              desc: "Bunnfast (<50m) eller flytende (>60m)",
              color: "#38bdf8",
            },
            {
              x: 465,
              t: "Bølgekraft",
              s: "Vindenergi i overflaten",
              desc: "Enorm energitetthet · 100-årshavet",
              color: C.warm,
            },
            {
              x: 685,
              t: "Tidevann",
              s: "Måne & solens gravitasjon",
              desc: "100 % forutsigbar · Sund & estuarer",
              color: "#a78bfa",
            },
          ].map((b) => (
            <g key={b.t}>
              <rect
                x={b.x}
                y="50"
                width="190"
                height="200"
                rx="12"
                fill="#131c24"
                stroke={b.color}
                strokeWidth="1.8"
              />
              <circle cx={b.x + 95} cy="95" r="24" fill="#0b131a" stroke={b.color} strokeWidth="1.5" />
              <L x={b.x + 95} y="101" size={18} weight={700} fill={b.color} anchor="middle">
                {b.t[0]}
              </L>
              <L x={b.x + 95} y="145" size={15} weight={700} anchor="middle">
                {b.t}
              </L>
              <L x={b.x + 95} y="170" fill={C.muted} size={12} weight={600} anchor="middle">
                {b.s}
              </L>
              <line
                x1={b.x + 20}
                y1="185"
                x2={b.x + 170}
                y2="185"
                stroke={C.dim}
                strokeWidth="1"
              />
              <L x={b.x + 95} y="210" fill={C.fg} size={11} anchor="middle">
                {b.desc.split(" · ")[0]}
              </L>
              <L x={b.x + 95} y="228" fill={C.muted} size={10} anchor="middle">
                {b.desc.split(" · ")[1]}
              </L>
            </g>
          ))}
        </>
      )}
    </Diagram>
  );
}

export function WindPowerTradeoffDiagram() {
  return (
    <Diagram
      title="Bærekraftig avveining i energiutbygging: Klima, natur, samfunn og forsyning"
      heading="Bærekraft er en helhetlig avveining, ikke et slagord"
      caption="LK20 krever at eleven skal drøfte utnyttelse av energiressurser. En løsning som kutter CO₂-utslipp, kan likevel ha alvorlige negative konsekvenser for urfolksrettigheter, fugletrekk, biologisk mangfold eller forsyningssikkerhet. En fullverdig drøfting balanserer alle fire dimensjoner."
      viewBox="0 0 860 320"
      wide
    >
      {(m) => (
        <>
          {/* Sentrumsboks */}
          <circle cx="430" cy="160" r="55" fill="#182732" stroke={C.teal} strokeWidth="2.5" />
          <L x="430" y="155" size={14} weight={800} fill={C.teal} anchor="middle">
            ENERGIPROSJEKT
          </L>
          <L x="430" y="175" size={11} fill={C.muted} anchor="middle">
            (Bærekraftig?)
          </L>

          {/* De fire hensynene */}
          {/* 1. Klima og utslippskutt (Øverst til venstre) */}
          <rect x="50" y="30" width="220" height="85" rx="8" fill="#10251f" stroke="#10b981" strokeWidth="1.5" />
          <L x="160" y="58" size={14} weight={700} fill="#34d399" anchor="middle">
            1. Klima &amp; Utslippskutt
          </L>
          <L x="160" y="80" size={11} fill={C.muted} anchor="middle">
            • Erstatte fossil gass &amp; kull
          </L>
          <L x="160" y="98" size={11} fill={C.muted} anchor="middle">
            • Elektrifisering av industri &amp; sokkel
          </L>
          <line x1="270" y1="95" x2="380" y2="135" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />

          {/* 2. Natur & Økosystemer (Øverst til høyre) */}
          <rect x="590" y="30" width="220" height="85" rx="8" fill="#2a1e16" stroke="#f59e0b" strokeWidth="1.5" />
          <L x="700" y="58" size={14} weight={700} fill="#fbbf24" anchor="middle">
            2. Natur &amp; Arealinngrep
          </L>
          <L x="700" y="80" size={11} fill={C.muted} anchor="middle">
            • Tap av urørt natur &amp; myr
          </L>
          <L x="700" y="98" size={11} fill={C.muted} anchor="middle">
            • Kollisjoner: Havørn, hubro &amp; trekkfugl
          </L>
          <line x1="590" y1="95" x2="480" y2="135" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />

          {/* 3. Forsyningssikkerhet & Samfunn (Nederst til venstre) */}
          <rect x="50" y="200" width="220" height="85" rx="8" fill="#14212e" stroke="#38bdf8" strokeWidth="1.5" />
          <L x="160" y="228" size={14} weight={700} fill="#38bdf8" anchor="middle">
            3. Kraftsystem &amp; Forsyning
          </L>
          <L x="160" y="250" size={11} fill={C.muted} anchor="middle">
            • Samspill med regulerbar vannkraft
          </L>
          <L x="160" y="268" size={11} fill={C.muted} anchor="middle">
            • Netttilknytning, kabler &amp; effektbalanse
          </L>
          <line x1="270" y1="225" x2="380" y2="185" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />

          {/* 4. Mennesker, Urfolk & Konflikt (Nederst til høyre) */}
          <rect x="590" y="200" width="220" height="85" rx="8" fill="#281519" stroke="#f43f5e" strokeWidth="1.5" />
          <L x="700" y="228" size={14} weight={700} fill="#fb7185" anchor="middle">
            4. Rettigheter &amp; Lokalsamfunn
          </L>
          <L x="700" y="250" size={11} fill={C.muted} anchor="middle">
            • Samiske beiterettigheter (Fosen-saken)
          </L>
          <L x="700" y="268" size={11} fill={C.muted} anchor="middle">
            • Fiskeri, trålefelt, støy &amp; skyggekast
          </L>
          <line x1="590" y1="225" x2="480" y2="185" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
        </>
      )}
    </Diagram>
  );
}

export function OffshoreWindShelfDiagram() {
  return (
    <Diagram
      title="Nordsjøens kontinentalsokkel og havvindteknologier: Bunnfast kontra flytende"
      heading="Havdybden bestemmer teknologien: Fra Nordsjøplatået til Norskerenna"
      caption="Geologien og havdybden avgjør fundamentvalget for havvind. I den sørlige Nordsjøen (Danmark, Doggerbank) er sokkelen grunn (< 50 m), noe som tillater bunnfaste monopeler banket ned i sedimentene. Utenfor Norskekysten stuper sokkelen bratt ned i den glasiale Norskerenna (200–350 m dyp). Her må turbinene flyte på dype Spar-bøyer (som Hywind) eller halvt nedsenkbare plattformer forankret med strekkstag og sugeankere til havbunnen. Høyspent sjøkabel fører strømmen inn til landnettet."
      viewBox="0 0 940 440"
      wide
    >
      {(m) => (
        <>
          {/* Himmel og atmosfære */}
          <rect x="30" y="30" width="880" height="150" fill="#0d1b2a" />
          {/* Vindstrøm-piler i høyden */}
          <Arrow d="M 60 70 L 220 70" marker={m.teal} color={C.teal} width={2.5} />
          <Arrow d="M 280 70 L 460 70" marker={m.teal} color={C.teal} width={3} />
          <Arrow d="M 520 70 L 720 70" marker={m.teal} color={C.teal} width={3.2} />
          <L x="400" y="55" fill={C.teal} size={12} weight={700}>
            Sterkt, uforstyrret vindfelt over åpent hav (v = 10–12 m/s)
          </L>

          {/* Havoverflate og vannsøyle */}
          <rect x="30" y="180" width="880" height="230" fill="#092336" />
          {/* Bølgelinje */}
          <path
            d="M 30 180 Q 70 176 110 180 T 190 180 T 270 180 T 350 180 T 430 180 T 510 180 T 590 180 T 670 180 T 750 180 T 830 180 L 910 180"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
          />

          {/* Kontinentalsokkelens batymetri (dybdeprofil):
              Venstre: Grunn Nordsjøslette (30–45 m dyp, y ~ 240)
              Midt: Sokkelskråning ned i Norskerenna (250–350 m dyp, y ~ 380)
              Høyre: Norskekysten og grunnfjell som stiger opp av havet */}
          <path
            d="M 30 240 L 280 240 C 350 240, 400 380, 520 380 L 720 380 C 780 380, 810 240, 840 180 L 910 180 L 910 410 L 30 410 Z"
            fill="#1e2229"
            stroke="#475569"
            strokeWidth="2"
          />
          {/* Sedimentlag på sokkelen */}
          <path
            d="M 30 240 L 280 240 C 350 240, 400 380, 520 380 L 720 380 C 780 380, 810 240, 840 180"
            fill="none"
            stroke="#785934"
            strokeWidth="4"
          />

          {/* Dybdemarkeringer */}
          <L x="50" y="232" fill="#a89078" size={11} weight={600}>
            Grunn sokkel (30–45 m)
          </L>
          <L x="570" y="372" fill="#7dd3fc" size={11} weight={600}>
            Norskerenna / Dyp sokkel (250–350 m dyp)
          </L>
          <L x="860" y="165" fill="#fde68a" size={12} weight={700}>
            Norge (Land)
          </L>

          {/* 1. BUNNFAST MONOPEL-TURBIN (Venstre, x=150) */}
          {/* Fundament ned i havbunn */}
          <rect x="145" y="170" width="10" height="90" fill="#64748b" stroke="#334155" />
          <L x="150" y="270" fill="#94a3b8" size={10} anchor="middle">
            Monopel pælet ned
          </L>
          {/* Tårn */}
          <rect x="147" y="70" width="6" height="100" fill="#e2e8f0" />
          <circle cx="150" cy="70" r="6" fill="#cbd5e1" />
          {/* Blader */}
          <line x1="150" y1="70" x2="150" y2="20" stroke="#f1f5f9" strokeWidth="2.5" />
          <line x1="150" y1="70" x2="185" y2="95" stroke="#f1f5f9" strokeWidth="2.5" />
          <line x1="150" y1="70" x2="115" y2="95" stroke="#f1f5f9" strokeWidth="2.5" />
          {/* Tittel */}
          <rect x="70" y="85" width="70" height="34" rx="4" fill="#0f172a" stroke="#38bdf8" />
          <L x="105" y="99" fill="#38bdf8" size={10} weight={700} anchor="middle">BUNNFAST</L>
          <L x="105" y="112" fill={C.muted} size={8} anchor="middle">Dyp &lt; 50 m</L>

          {/* 2. FLYTENDE SPAR-TURBIN (HYWIND-TYPE) (Midten, x=450) */}
          {/* Dyp ballast-sylinder (Spar) */}
          <rect x="444" y="150" width="12" height="90" rx="5" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="445" y="200" width="10" height="38" fill="#1e293b" />
          {/* Ankerliner og sugeankere */}
          <path d="M 444 200 C 400 250 360 320 330 380" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="3 3" />
          <path d="M 456 200 C 500 250 540 320 570 380" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="3 3" />
          <rect x="325" y="375" width="8" height="12" fill="#f59e0b" />
          <rect x="565" y="375" width="8" height="12" fill="#f59e0b" />
          {/* Tårn og blader */}
          <rect x="447" y="60" width="6" height="90" fill="#e2e8f0" />
          <circle cx="450" cy="60" r="6" fill="#cbd5e1" />
          <line x1="450" y1="60" x2="450" y2="10" stroke="#f1f5f9" strokeWidth="2.5" />
          <line x1="450" y1="60" x2="485" y2="85" stroke="#f1f5f9" strokeWidth="2.5" />
          <line x1="450" y1="60" x2="415" y2="85" stroke="#f1f5f9" strokeWidth="2.5" />
          {/* Tittel */}
          <rect x="490" y="85" width="85" height="34" rx="4" fill="#0f172a" stroke="#0ea5e9" />
          <L x="532" y="99" fill="#38bdf8" size={10} weight={700} anchor="middle">FLYTENDE SPAR</L>
          <L x="532" y="112" fill={C.muted} size={8} anchor="middle">Hywind Tampen</L>

          {/* 3. FLYTENDE SEMI-SUBMERSIBLE (x=670) */}
          <polygon points="650,195 690,195 685,160 655,160" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 650 185 C 610 240 590 320 575 380" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="3 3" />
          <path d="M 690 185 C 720 240 735 320 750 380" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="3 3" />
          <rect x="668" y="70" width="6" height="90" fill="#e2e8f0" />
          <circle cx="671" cy="70" r="6" fill="#cbd5e1" />
          <line x1="671" y1="70" x2="671" y2="20" stroke="#f1f5f9" strokeWidth="2.5" />
          <line x1="671" y1="70" x2="706" y2="95" stroke="#f1f5f9" strokeWidth="2.5" />
          <line x1="671" y1="70" x2="636" y2="95" stroke="#f1f5f9" strokeWidth="2.5" />

          {/* Sjøkabler langs havbunnen mot land */}
          <path
            d="M 150 240 L 280 240 C 350 240, 400 380, 520 380 L 720 380 C 780 380, 810 240, 840 180"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeDasharray="5 3"
          />
          <L x="300" y="340" fill="#fbbf24" size={11} weight={700}>
            Høyspent sjøkabel (HVDC/HVAC) nedgravd i havbunnen
          </L>

          {/* Transformatorstasjon på land */}
          <rect x="850" y="145" width="35" height="35" rx="4" fill="#334155" stroke="#f59e0b" strokeWidth="1.5" />
          <L x="867" y="165" fill="#fde68a" size={9} weight={700} anchor="middle">TRAFO</L>
          <L x="867" y="195" fill={C.fg} size={10} anchor="middle">Sentralnettet</L>
        </>
      )}
    </Diagram>
  );
}

export function OtecRankineCycleDiagram() {
  return (
    <Diagram
      title="Havvarmekraft (OTEC): Termodynamisk Rankine-syklus og vertikal temperaturgradient"
      heading="OTEC: Hvordan havets termiske lagdeling gir kontinuerlig grunnlast"
      caption="OTEC utnytter temperaturforskjellen (ΔT ≥ 20 °C) mellom solvarmet overflatevann (25–28 °C) og arktisk bunnvann (4–5 °C) pumpet opp fra 1000 meters dyp i tropene. I en lukket Rankine-syklus fordamper overflatevarmen flytende ammoniakk (NH₃, kokepunkt under 0 °C ved normalt trykk). Gassen driver en turbin og generator for å produsere strøm, før det kalde dyphavsvannet kondenserer gassen tilbake til væske. Fordi Carnot-virkningsgraden er teoretisk begrenset til under 7 %, kreves det enorme vannvolumer for å generere kommersielle effekter."
      viewBox="0 0 920 440"
      wide
    >
      {(m) => (
        <>
          {/* Skillelinje */}
          <line x1="380" y1="35" x2="380" y2="405" stroke={C.dim} strokeDasharray="4 4" />

          {/* --- VENSTRE: HAVETS TEMPERATURSJIKTNING I TROPENE --- */}
          <rect x="30" y="30" width="330" height="380" rx="8" fill="#0d1b2a" stroke={C.dim} strokeWidth="1.2" />
          <L x="195" y="60" fill={C.fg} size={15} weight={700} anchor="middle">
            Havets lagdeling i tropene
          </L>
          <L x="195" y="78" fill={C.muted} size={11} anchor="middle">
            Varmesjiktet som muliggjør OTEC
          </L>

          {/* Dybdeakse */}
          <line x1="70" y1="100" x2="70" y2="380" stroke={C.dim} strokeWidth="1.5" />
          <L x="65" y="110" fill={C.muted} size={10} anchor="end">0 m</L>
          <L x="65" y="180" fill={C.muted} size={10} anchor="end">200 m</L>
          <L x="65" y="270" fill={C.muted} size={10} anchor="end">500 m</L>
          <L x="65" y="375" fill={C.muted} size={10} anchor="end">1000 m</L>

          {/* Sone 1: Varmt blandelag (0–80 m) */}
          <rect x="80" y="100" width="260" height="40" fill="#f59e0b" opacity="0.25" />
          <L x="210" y="125" fill="#fde68a" size={12} weight={700} anchor="middle">
            Overflatevann: +26 °C (Varmekilde)
          </L>

          {/* Sone 2: Skarp permanent termoklin (80–500 m) */}
          <rect x="80" y="140" width="260" height="150" fill="#0284c7" opacity="0.15" />
          <L x="210" y="210" fill="#7dd3fc" size={11} weight={600} anchor="middle">
            Termoklin (Bratt temperaturfall)
          </L>

          {/* Sone 3: Iskaldt dyphavsvann (500–1000 m) */}
          <rect x="80" y="290" width="260" height="90" fill="#0369a1" opacity="0.35" />
          <L x="210" y="340" fill="#38bdf8" size={12} weight={700} anchor="middle">
            Dyphavsvann: +4 °C (Kjølereservoar)
          </L>

          {/* Temperaturkurve T(z) */}
          <path
            d="M 280 100 L 280 135 C 275 160, 160 220, 130 290 L 120 375"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
          />
          <L x="285" y="115" fill="#fca5a5" size={10}>26 °C</L>
          <L x="125" y="370" fill="#93c5fd" size={10}>4 °C</L>

          {/* Temperaturkontrast pil */}
          <L x="195" y="400" fill={C.warm} size={12} weight={700} anchor="middle">
            ΔT = 26 °C - 4 °C = 22 °C
          </L>

          {/* --- HØYRE: TERMODYNAMISK RANKINE-SYKLUS --- */}
          <rect x="400" y="30" width="490" height="380" rx="8" fill="#111c26" stroke="#38bdf8" strokeWidth="1.2" />
          <L x="645" y="60" fill="#38bdf8" size={15} weight={700} anchor="middle">
            Lukket ammoniakk-Rankine syklus
          </L>
          <L x="645" y="78" fill={C.muted} size={11} anchor="middle">
            Kjølemediet NH₃ fordamper ved lav temperatur og driver turbinen
          </L>

          {/* 1. Fordamper (Evaporator) - Venstre oppe */}
          <rect x="430" y="120" width="110" height="70" rx="6" fill="#3b1f1a" stroke="#f59e0b" strokeWidth="1.5" />
          <L x="485" y="145" fill="#fbbf24" size={12} weight={700} anchor="middle">FORDAMPER</L>
          <L x="485" y="162" fill={C.muted} size={9} anchor="middle">Varmtvann (26 °C) inn</L>
          <L x="485" y="175" fill="#fde68a" size={9} anchor="middle">NH₃ væske → gass</L>

          {/* 2. Turbin & Generator - Høyre oppe */}
          <rect x="680" y="120" width="130" height="70" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="715" cy="155" r="16" fill="#047857" />
          <L x="715" y="160" fill="#fff" size={12} weight={700} anchor="middle">T</L>
          <rect x="745" y="140" width="45" height="30" rx="4" fill="#0f172a" stroke="#34d399" />
          <L x="767" y="158" fill="#34d399" size={10} weight={700} anchor="middle">GEN</L>
          <L x="745" y="182" fill="#34d399" size={9} weight={600} anchor="middle">⚡ Strøm ut</L>

          {/* 3. Kondensator - Høyre nede */}
          <rect x="680" y="270" width="130" height="70" rx="6" fill="#0c2538" stroke="#38bdf8" strokeWidth="1.5" />
          <L x="745" y="295" fill="#7dd3fc" size={12} weight={700} anchor="middle">KONDENSATOR</L>
          <L x="745" y="312" fill={C.muted} size={9} anchor="middle">Kaldtvann (4 °C) inn</L>
          <L x="745" y="325" fill="#38bdf8" size={9} anchor="middle">NH₃ gass → væske</L>

          {/* 4. Fødepumpe - Venstre nede */}
          <circle cx="485" cy="305" r="22" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
          <L x="485" y="309" fill="#e2e8f0" size={10} weight={700} anchor="middle">Pumpe</L>
          <L x="485" y="338" fill={C.muted} size={9} anchor="middle">Fødepumpe</L>

          {/* SYKLUS-RØRLEDNINGER (Ammoniakk) */}
          {/* Fordamper -> Turbin (Høytrykksgass) */}
          <path d="M 540 150 L 680 150" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowWarm)" />
          <L x="610" y="142" fill="#f59e0b" size={10} weight={600} anchor="middle">
            Varm NH₃-damp (Høyt trykk)
          </L>

          {/* Turbin -> Kondensator (Lavtrykksgass) */}
          <path d="M 745 190 L 745 270" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#arrowTeal)" />
          <L x="755" y="235" fill={C.muted} size={9}>Ekspandert damp</L>

          {/* Kondensator -> Pumpe (Væske) */}
          <path d="M 680 305 L 507 305" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowCold)" />
          <L x="590" y="318" fill="#38bdf8" size={10} weight={600} anchor="middle">
            Flytende NH₃-væske (Kald)
          </L>

          {/* Pumpe -> Fordamper (Retur under trykk) */}
          <path d="M 485 283 L 485 190" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowTeal)" />

          {/* Carnot-formel boks nederst */}
          <rect x="420" y="360" width="450" height="42" rx="6" fill="#1e2430" stroke="#f59e0b" strokeWidth="1" />
          <L x="645" y="378" fill="#fde68a" size={11} weight={700} anchor="middle">
            Carnot-virkningsgrad: η_Carnot = 1 - (T_kald / T_varm) = 1 - (277 K / 299 K) ≈ 7,36 %
          </L>
          <L x="645" y="393" fill={C.muted} size={9} anchor="middle">
            Lav virkningsgrad oppveies av at havet er en uuttømmelig, gratis solfanger døgnet rundt!
          </L>
        </>
      )}
    </Diagram>
  );
}
