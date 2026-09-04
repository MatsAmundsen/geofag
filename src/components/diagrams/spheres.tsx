import { Arrow, C, Diagram, L } from "./svg-kit";

function Sphere({
  cx,
  cy,
  r,
  stroke,
  fill,
  name,
  role,
}: {
  cx: number;
  cy: number;
  r: number;
  stroke: string;
  fill: string;
  name: string;
  role: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth="2.2" />
      <L x={cx} y={cy - 4} fill={C.fg} size={14} anchor="middle" weight={600}>
        {name}
      </L>
      <L x={cx} y={cy + 14} fill={C.muted} size={12} anchor="middle">
        {role}
      </L>
    </g>
  );
}

export function SpheresDiagram() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Diagram
        title="Fem sfærer med piler inn mot berg, jord, elv og grunnvann. Atmosfære, kryosfære og biosfære er drivere. Geosfære og hydrosfære er mottakere."
        heading="Drivere og mottakere"
        caption="Atmosfære, kryosfære og biosfære graver, løser og avsetter. Geosfære og hydrosfære er mottakerne i geofag 1."
        viewBox="0 0 440 530"
      >
        {(m) => (
          <>
            <L x="220" y="28" fill={C.muted} size={13} anchor="middle">
              drivere
            </L>
            <Sphere
              cx={70}
              cy={92}
              r={48}
              stroke={C.cold}
              fill="#16303a"
              name="atmosfære"
              role="driver"
            />
            <Sphere
              cx={220}
              cy={92}
              r={48}
              stroke={C.white}
              fill="#1a2832"
              name="kryosfære"
              role="driver"
            />
            <Sphere
              cx={370}
              cy={92}
              r={48}
              stroke={C.teal}
              fill="#1a3038"
              name="biosfære"
              role="driver"
            />

            <Arrow d="M 70 142 L 150 208" marker={m.cold} color={C.cold} width={2.2} />
            <Arrow d="M 220 142 L 220 208" marker={m.fg} color={C.white} width={2.2} />
            <Arrow d="M 370 142 L 290 208" marker={m.teal} color={C.teal} width={2.2} />

            <rect
              x="88"
              y="210"
              width="264"
              height="118"
              rx="12"
              fill="#152028"
              stroke={C.sand}
              strokeWidth="1.8"
            />
            <L x="154" y="256" fill={C.sand} size={16} anchor="middle" weight={600}>
              berg
            </L>
            <L x="286" y="256" fill={C.sand} size={16} anchor="middle" weight={600}>
              jord
            </L>
            <L x="154" y="300" fill={C.rain} size={16} anchor="middle" weight={600}>
              elv
            </L>
            <L x="286" y="300" fill={C.rain} size={16} anchor="middle" weight={600}>
              grunnvann
            </L>

            <Arrow d="M 125 378 L 160 334" marker={m.warm} color={C.sand} width={2.2} />
            <Arrow d="M 315 378 L 280 334" marker={m.cold} color={C.rain} width={2.2} />

            <Sphere
              cx={125}
              cy={428}
              r={50}
              stroke={C.sand}
              fill="#2a241c"
              name="geosfære"
              role="mottaker"
            />
            <Sphere
              cx={315}
              cy={428}
              r={50}
              stroke={C.rain}
              fill="#163038"
              name="hydrosfære"
              role="mottaker"
            />
            <L x="220" y="508" fill={C.muted} size={13} anchor="middle">
              mottakere
            </L>
          </>
        )}
      </Diagram>
    </div>
  );
}

export function CarbonCycleDiagram() {
  return (
    <Diagram
      title="Det globale karbonkretsløpet"
      heading="Raske biologiske og langsomme geologiske kretsløp"
      caption="Karbon sirkulerer mellom sfærene. Det biologiske kretsløpet (fotosyntese, respirasjon og havutveksling) flytter store mengder karbon på år–tiår. Det geologiske kretsløpet (kjemisk forvitring, kalksteinsdannelse og vulkanutbrudd) styrer jordas langsiktige termostat over millioner av år. Menneskelig forbrenning av fossilt karbon tilfører ca. 10 GtC/år til atmosfæren."
      viewBox="0 0 860 480"
    >
      {(m) => (
        <>
          {/* Atmosfæren øverst */}
          <rect x="250" y="24" width="360" height="72" rx="10" fill="#152430" stroke={C.cold} strokeWidth="2" />
          <L x="430" y="52" fill={C.cold} size={16} weight={700} anchor="middle">
            Atmosfæren
          </L>
          <L x="430" y="74" fill={C.fg} size={14} weight={600} anchor="middle">
            ~850 GtC (+5 GtC/år netto akkumulering)
          </L>

          {/* Soneangivelser / bakgrunner */}
          {/* Venstre: Landbiosfære & jordsmonn */}
          <rect x="40" y="160" width="220" height="90" rx="8" fill="#182c22" stroke={C.teal} strokeWidth="1.8" />
          <L x="150" y="190" fill={C.teal} size={15} weight={700} anchor="middle">
            Vegetasjon & Biosfære
          </L>
          <L x="150" y="210" fill={C.fg} size={13} anchor="middle">
            ~550 GtC
          </L>
          <L x="150" y="232" fill={C.muted} size={12} anchor="middle">
            Fotosyntese & respirasjon
          </L>

          <rect x="40" y="265" width="220" height="70" rx="8" fill="#242218" stroke={C.sand} strokeWidth="1.6" />
          <L x="150" y="292" fill={C.sand} size={14} weight={600} anchor="middle">
            Jordsmonn & humus
          </L>
          <L x="150" y="316" fill={C.fg} size={13} anchor="middle">
            ~1500–2000 GtC
          </L>

          {/* Fossile brensler nederst til venstre */}
          <rect x="40" y="380" width="220" height="68" rx="8" fill="#2c1a14" stroke={C.warm} strokeWidth="1.8" />
          <L x="150" y="406" fill={C.warm} size={14} weight={700} anchor="middle">
            Fossile brensler
          </L>
          <L x="150" y="428" fill={C.fg} size={13} anchor="middle">
            Kull, olje, gass: ~4000 GtC
          </L>

          {/* Høyre: Havet */}
          <rect x="580" y="160" width="240" height="85" rx="8" fill="#122533" stroke={C.rain} strokeWidth="1.8" />
          <L x="700" y="190" fill={C.rain} size={15} weight={700} anchor="middle">
            Overflatehavet
          </L>
          <L x="700" y="210" fill={C.fg} size={13} anchor="middle">
            ~1000 GtC
          </L>
          <L x="700" y="230" fill={C.muted} size={12} anchor="middle">
            Fysisk/biologisk pumpe
          </L>

          <rect x="580" y="260" width="240" height="75" rx="8" fill="#0d1b26" stroke={C.cold} strokeWidth="1.6" />
          <L x="700" y="288" fill={C.cold} size={14} weight={600} anchor="middle">
            Dyphavet
          </L>
          <L x="700" y="312" fill={C.fg} size={13} anchor="middle">
            ~38 000 GtC
          </L>

          {/* Nederst: Litosfæren / Kalkstein */}
          <rect x="300" y="380" width="520" height="68" rx="8" fill="#1e2226" stroke={C.dim} strokeWidth="2" />
          <L x="560" y="406" fill={C.fg} size={15} weight={700} anchor="middle">
            Sedimentære bergarter & kalkstein (CaCO₃)
          </L>
          <L x="560" y="428" fill={C.sand} size={14} weight={600} anchor="middle">
            Jordas største reservoar: 60–100 millioner GtC
          </L>

          {/* PILER: BIOLOGISKE FLUKSER */}
          {/* Fotosyntese ned (120) */}
          <Arrow d="M 310 96 L 210 160" marker={m.teal} color={C.teal} width={2.8} />
          <L x="235" y="116" fill={C.teal} size={12} weight={600}>
            Fotosyntese (120 GtC/år)
          </L>

          {/* Respirasjon opp (120) */}
          <Arrow d="M 170 160 L 270 96" marker={m.warm} color={C.warm} width={2.4} />
          <L x="145" y="140" fill={C.warm} size={12}>
            Respirasjon
          </L>

          {/* Fossilt brensel forbrenning (10 Gt/år) */}
          <Arrow d="M 120 380 Q 110 120 250 85" marker={m.warm} color="#f97316" width={3.2} />
          <L x="90" y="360" fill="#f97316" size={13} weight={700}>
            Fossile utslipp (ca. 10 GtC/år)
          </L>

          {/* Havutveksling toveis */}
          <Arrow d="M 570 96 L 640 160" marker={m.cold} color={C.cold} width={2.6} />
          <L x="625" y="120" fill={C.cold} size={12}>
            Løses i hav (90)
          </L>
          <Arrow d="M 680 160 L 610 96" marker={m.warm} color={C.sand} width={2.6} />
          <L x="670" y="140" fill={C.sand} size={12}>
            Utgassing (90)
          </L>

          {/* Havets overflate til dyp */}
          <Arrow d="M 700 245 L 700 260" marker={m.cold} color={C.cold} width={2.2} />

          {/* PILER: GEOLOGISKE FLUKSER */}
          {/* Forvitring og sedimentasjon */}
          <Arrow d="M 670 335 L 670 380" marker={m.sand} color={C.sand} width={2.4} />
          <L x="680" y="360" fill={C.sand} size={12} weight={600}>
            Sedimentasjon (0,2 GtC/år)
          </L>

          {/* Vulkanutbrudd og metamorfose fra litosfære opp til atmosfære */}
          <Arrow d="M 440 380 L 440 96" marker={m.warm} color={C.warm} width={2.2} />
          <L x="448" y="235" fill={C.warm} size={12} weight={600}>
            Vulkansk utgassing (0,1 GtC/år)
          </L>

          {/* Kjemisk silikatforvitring fra atmosfære til litosfære */}
          <L x="448" y="255" fill={C.muted} size={11}>
            Silikatforvitring balanserer
          </L>
        </>
      )}
    </Diagram>
  );
}

