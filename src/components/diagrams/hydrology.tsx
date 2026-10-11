import { Arrow, C, Diagram, L } from "./svg-kit";

function Lager({
  x,
  y,
  w,
  h = 70,
  title,
  sub,
  stroke,
  fill,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string;
  sub?: string;
  stroke: string;
  fill: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="1.8" />
      <L x={x + w / 2} y={y + (sub ? 30 : 41)} fill={C.fg} size={17} anchor="middle" weight={700}>
        {title}
      </L>
      {sub ? (
        <L x={x + w / 2} y={y + 52} fill={C.muted} size={14} anchor="middle">
          {sub}
        </L>
      ) : null}
    </g>
  );
}

export function KretslopDiagram() {
  return (
    <Diagram
      title="Det hydrologiske kretsløpet: fordampning fra havet og land, nedbør, snø, markvann, grunnvann, innsjø, elv og tilbake til havet"
      heading="Hydrologisk kretsløp"
      caption="Vannets kretsløp. Sola driver fordampningen, og mest vann fordamper fra havet. Vanndampen blir skyer og faller som nedbør. På land lagres vannet en stund som snø, markvann, grunnvann og i innsjøer. Derfra renner det via elver tilbake til havet, eller det fordamper igjen (NGU, u.å.-e)."
      viewBox="0 0 860 500"
      scroll
    >
      {(m) => (
        <>
          {/* Lager */}
          <Lager x={310} y={20} w={260} title="Atmosfæren" sub="vanndamp og skyer" stroke={C.rain} fill="#163038" />
          <Lager x={20} y={170} w={170} title="Snø og is" sub="lagres en stund" stroke={C.cold} fill="#16303a" />
          <Lager x={240} y={170} w={200} title="Mark" sub="markvann og planter" stroke={C.sand} fill="#2a241c" />
          <Lager x={480} y={170} w={140} title="Innsjø" stroke={C.rain} fill="#163038" />
          <Lager x={480} y={300} w={140} title="Elv" stroke={C.rain} fill="#163038" />
          <Lager x={240} y={330} w={200} title="Grunnvann" sub="i porer og sprekker" stroke={C.teal} fill="#152028" />
          <Lager x={700} y={300} w={140} h={140} title="Havet" sub="største lager" stroke={C.cold} fill="#123048" />

          {/* Fordampning fra havet */}
          <Arrow d="M 750 296 L 576 82" marker={m.warm} color={C.warm} width={2.8} />
          <L x="680" y="160" fill={C.warm} size={15} weight={700}>
            Fordampning
          </L>
          <L x="680" y="178" fill={C.muted} size={13}>
            mest fra havet
          </L>

          {/* Evapotranspirasjon fra land og innsjø */}
          <Arrow d="M 420 166 L 470 96" marker={m.warm} color={C.warm} width={2.4} />
          <L x="462" y="134" fill={C.warm} size={14} weight={700}>
            Evapotranspirasjon
          </L>

          {/* Nedbør */}
          <Arrow d="M 318 80 C 220 90, 130 110, 105 166" marker={m.rain} color={C.rain} width={2.6} dash="6 4" />
          <Arrow d="M 360 94 L 330 166" marker={m.rain} color={C.rain} width={2.6} dash="6 4" />
          <L x="30" y="108" fill={C.rain} size={15} weight={700}>
            Nedbør
          </L>
          <L x="30" y="126" fill={C.muted} size={13}>
            regn og snø
          </L>

          {/* Snøsmelting */}
          <Arrow d="M 192 205 L 236 205" marker={m.cold} color={C.cold} width={2.4} />
          <L x="214" y="262" fill={C.cold} size={13} anchor="middle">
            Smelting
          </L>

          {/* Infiltrasjon */}
          <Arrow d="M 340 242 L 340 326" marker={m.teal} color={C.teal} width={2.6} />
          <L x="350" y="290" fill={C.teal} size={14} weight={700}>
            Infiltrasjon
          </L>

          {/* Overflateavrenning til innsjø og elv */}
          <Arrow d="M 442 205 L 476 205" marker={m.sand} color={C.sand} width={2.4} />
          <Arrow d="M 442 232 C 462 260, 468 280, 478 312" marker={m.sand} color={C.sand} width={2.4} />
          <L x="470" y="272" fill={C.sand} size={13} weight={700}>
            Overflateavrenning
          </L>

          {/* Innsjø til elv */}
          <Arrow d="M 600 242 L 600 296" marker={m.rain} color={C.rain} width={2.4} />

          {/* Grunnvannstilsig til elv */}
          <Arrow d="M 442 362 L 476 345" marker={m.teal} color={C.teal} width={2.4} />
          <L x="450" y="392" fill={C.teal} size={13}>
            Grunnvannstilsig
          </L>

          {/* Elv til hav */}
          <Arrow d="M 622 335 L 696 335" marker={m.rain} color={C.rain} width={2.6} />
          <L x="660" y="325" fill={C.muted} size={12} anchor="middle">
            til havet
          </L>

          {/* Grunnvann rett ut i havet */}
          <Arrow d="M 340 402 C 340 470, 600 470, 700 420" marker={m.teal} color={C.teal} width={2} dash="5 4" />
          <L x="520" y="482" fill={C.teal} size={13} anchor="middle">
            Noe grunnvann renner rett ut i havet
          </L>
        </>
      )}
    </Diagram>
  );
}

const HYDRO = { top: 60, base: 270, flow: 236 };

function HydrographPanel({
  x,
  w,
  path,
  color,
  title,
  xlabel,
  showBaseLabel,
}: {
  x: number;
  w: number;
  path: string;
  color: string;
  title: string;
  xlabel: string;
  showBaseLabel?: boolean;
}) {
  const { top, base, flow } = HYDRO;
  return (
    <g>
      <L x={x} y={top - 16} fill={C.fg} size={17} weight={700}>
        {title}
      </L>
      <line x1={x} y1={top} x2={x} y2={base} stroke={C.dim} strokeWidth="1.8" />
      <line x1={x} y1={base} x2={x + w} y2={base} stroke={C.dim} strokeWidth="1.8" />
      <L x={x - 8} y={base + 5} fill={C.muted} size={13} anchor="end">
        0
      </L>
      {/* Grunnvannstilsig: elva har vann også før og etter flommen */}
      <rect x={x} y={flow} width={w} height={base - flow} fill={C.teal} opacity="0.16" />
      <line x1={x} y1={flow} x2={x + w} y2={flow} stroke={C.teal} strokeWidth="1.4" strokeDasharray="6 4" />
      {showBaseLabel ? (
        <L x={x + 10} y={base - 10} fill={C.teal} size={13}>
          grunnvannstilsig
        </L>
      ) : null}
      <path d={`${path} L ${x + w} ${base} L ${x} ${base} Z`} fill={color} opacity="0.22" />
      <path d={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <L x={x + w} y={base + 24} fill={C.muted} size={14} anchor="end">
        tid ({xlabel}) →
      </L>
    </g>
  );
}

export function HydrographDiagram() {
  return (
    <Diagram
      title="To hydrogram side om side med samme vannføringsakse: spiss regnflom mot bred snøsmelteflom. Begge elvene har grunnvannstilsig før og etter flommen."
      heading="To hydrogram"
      caption="To hydrogram side om side, med samme akse for vannføring. Regnflommen stiger og synker raskt (timer). Snøsmelteflommen er bred og varer lenge (dager til uker). Elva tørker ikke ut mellom flommene: Grunnvannstilsiget gir vannføring hele tiden."
      viewBox="0 0 860 310"
      scroll
    >
      {() => (
        <>
          <g transform="rotate(-90 24 165)">
            <L x="24" y="165" fill={C.muted} size={14} anchor="middle">
              vannføring →
            </L>
          </g>
          <HydrographPanel
            x={64}
            w={350}
            title="Spiss regnflom"
            xlabel="timer"
            color={C.rain}
            showBaseLabel
            path="M 64 236 C 120 236 140 234 165 205 S 192 82 214 76 S 244 130 270 178 S 330 228 414 230"
          />
          <HydrographPanel
            x={490}
            w={350}
            title="Bred snøsmelteflom"
            xlabel="dager–uker"
            color={C.cold}
            path="M 490 236 C 540 234 580 206 620 168 S 690 112 722 118 S 794 186 840 220"
          />
        </>
      )}
    </Diagram>
  );
}

