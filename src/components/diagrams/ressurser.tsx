import { useId } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { Arrow, C, Diagram, L, font } from "./svg-kit";

function Box({
  x,
  y,
  w,
  h = 72,
  stroke,
  fill,
  title,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  stroke: string;
  fill: string;
  title: string;
  sub?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.8"
      />
      <L
        x={x + w / 2}
        y={sub ? y + 30 : y + 44}
        fill={C.fg}
        size={15}
        anchor="middle"
        weight={600}
      >
        {title}
      </L>
      {sub ? (
        <L x={x + w / 2} y={y + 52} fill={stroke} size={13} anchor="middle">
          {sub}
        </L>
      ) : null}
    </g>
  );
}

export function FraBergartTilBruddDiagram() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Diagram
        title="Tre spor: magma til magmatisk malm og naturstein, sprekk til hydrotermal malm, løsmasse til sedimentær malm, pukk og grus."
        heading="Fra bergart til brudd"
        caption="Magma, sprekk og løsmasse til malm, naturstein og pukk."
        viewBox="0 0 440 560"
      >
        {(m) => (
          <>
            <rect x="12" y="16" width="416" height="176" rx="12" fill="#1a1814" />
            <rect x="12" y="204" width="416" height="152" rx="12" fill="#152028" />
            <rect x="12" y="368" width="416" height="176" rx="12" fill="#181c16" />

            <L x="28" y="38" fill={C.warm} size={13} weight={600}>
              magma
            </L>
            <Box
              x={28}
              y={50}
              w={168}
              stroke={C.warm}
              fill="#3a3428"
              title="magma"
              sub="avkjøling"
            />
            <Box
              x={244}
              y={50}
              w={168}
              stroke={C.warm}
              fill="#3a3428"
              title="magmatisk malm"
              sub="tunge krystaller"
            />
            <Arrow d="M 204 86 L 236 86" marker={m.warm} color={C.warm} width={2.2} />
            <Arrow d="M 112 122 L 112 132" marker={m.muted} color={C.sand} width={2} />
            <Box
              x={28}
              y={136}
              w={168}
              stroke={C.sand}
              fill="#2a3428"
              title="dypbergart"
              sub="larvikitt"
            />
            <Box
              x={244}
              y={136}
              w={168}
              stroke={C.sand}
              fill="#2a3428"
              title="naturstein"
              sub="sages · spaltes"
            />
            <Arrow d="M 204 172 L 236 172" marker={m.muted} color={C.sand} width={2.2} />

            <L x="28" y="226" fill={C.teal} size={13} weight={600}>
              sprekk
            </L>
            <Box
              x={28}
              y={238}
              w={168}
              h={88}
              stroke={C.teal}
              fill="#1a3038"
              title="hydrotermal"
              sub="væske i sprekk"
            />
            <Box
              x={244}
              y={238}
              w={168}
              h={88}
              stroke={C.teal}
              fill="#1a3038"
              title="hydrotermal malm"
              sub="kobber · sink"
            />
            <Arrow d="M 204 282 L 236 282" marker={m.teal} color={C.teal} width={2.2} />

            <L x="28" y="390" fill={C.sand} size={13} weight={600}>
              løsmasse
            </L>
            <Box
              x={28}
              y={402}
              w={168}
              h={88}
              stroke={C.sand}
              fill="#2a3428"
              title="løsmasse"
              sub="forvitring"
            />
            <Box
              x={244}
              y={402}
              w={168}
              stroke={C.sand}
              fill="#2a3428"
              title="sedimentær malm"
            />
            <Box
              x={244}
              y={486}
              w={168}
              stroke={C.muted}
              fill="#1a2832"
              title="pukk og grus"
            />
            <Arrow d="M 204 430 L 236 430" marker={m.muted} color={C.sand} width={2.2} />
            <Arrow d="M 204 458 L 236 510" marker={m.muted} color={C.muted} width={2.2} />
          </>
        )}
      </Diagram>
    </div>
  );
}

function FeltCell({
  x,
  y,
  w,
  h,
  label,
  value,
  header,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  value?: string;
  header?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={header ? "#1a2832" : "#152028"}
        stroke={C.dim}
        strokeWidth="1.2"
      />
      {header && label ? (
        <L x={x + 12} y={y + 26} fill={C.muted} size={14} weight={600}>
          {label}
        </L>
      ) : null}
      {value ? (
        <L x={x + 12} y={y + 28} fill={C.fg} size={15} weight={500}>
          {value}
        </L>
      ) : null}
    </g>
  );
}

export function FeltbokDiagram() {
  const uid = useId().replace(/:/g, "");
  const cols = [
    { label: "ID", value: "R-01", w: 88 },
    { label: "tid", value: "12. mai 10:14", w: 168 },
    { label: "koordinater", value: "59,248° N  10,412° Ø", w: 236 },
    { label: "måling", value: "korn 2–4 mm", w: 150 },
    { label: "usikkerhet", value: "± 3 m", w: 118 },
  ];
  let x = 20;
  const headers = cols.map((c) => {
    const cell = { ...c, x };
    x += c.w;
    return cell;
  });

  return (
    <FigureFrame
      heading="Feltbok · eksempel"
      caption="Feltbok med GPS-punkt. Én rad: ID, tid, koordinater, måling, usikkerhet."
    >
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 220"
          className="mx-auto h-auto w-full min-w-[36rem] max-w-3xl"
          role="img"
          aria-labelledby={`${uid}-title`}
        >
          <title id={`${uid}-title`}>
            Eksempel på feltbokrad: R-01, 12. mai 10:14, 59,248° N 10,412° Ø, korn 2–4
            mm, usikkerhet ± 3 m.
          </title>
          <rect width="100%" height="100%" fill={C.bg} rx="10" />
          <L x="32" y="36" fill={C.teal} size={14} weight={600}>
            eksempel · skolefelt
          </L>
          <L x="32" y="58" fill={C.muted} size={13}>
            GPS-punkt. Mobil-GPS holder til noen meter.
          </L>
          {headers.map((c) => (
            <FeltCell key={`h-${c.label}`} x={c.x} y={78} w={c.w} h={44} label={c.label} header />
          ))}
          {headers.map((c) => (
            <FeltCell key={`v-${c.label}`} x={c.x} y={122} w={c.w} h={52} value={c.value} />
          ))}
          <text
            x="32"
            y="200"
            fill={C.muted}
            fontSize={13}
            fontFamily={font}
            fontWeight={500}
          >
            Primærkilde: feltboka. Foto og GPS supplerer.
          </text>
        </svg>
      </div>
    </FigureFrame>
  );
}

export function PetroleumSystemDiagram() {
  return (
    <Diagram
      title="Petroleumssystemet: de fem geologiske forutsetningene"
      heading="Kildebergart, modning, migrasjon, reservoar, takbergart og felle"
      caption="For at det skal dannes en olje- eller gassforekomst, må fem geologiske faktorer klaffe i tid og rom: 1) Kildebergart (organisk rik skifer, f.eks. Draupneformasjonen). 2) Modning i 'oljevinduet' (80–120 °C under dypt trykk og temperatur). 3) Migrasjon (oppdrift mot overflaten fordi olje og gass er lettere enn vann). 4) Reservoarbergart (porøs og permeabel bergart, f.eks. sandstein eller oppsprukket kalkstein). 5) Takbergart og felle (ugjennomtrengelig leirskifer som forsegler en geologisk struktur, f.eks. en antiklinal eller forkastningsblokk). I reservoaret sorteres væskene etter tetthet: gass øverst, olje i midten og vann nederst."
      viewBox="0 0 880 480"
      wide
    >
      {(m) => (
        <>
          {/* Havoverflate og plattform */}
          <rect x="40" y="25" width="560" height="40" fill="#122430" />
          <line x1="40" y1="25" x2="600" y2="25" stroke={C.rain} strokeWidth="2" />
          <L x="55" y="48" fill={C.rain} size={13} weight={600}>Havoverflate (Nordsjøen)</L>

          {/* Oljeplattform skisse */}
          <rect x="370" y="10" width="40" height="15" fill="#555" rx="2" />
          <line x1="380" y1="25" x2="375" y2="65" stroke="#777" strokeWidth="2" />
          <line x1="400" y1="25" x2="405" y2="65" stroke="#777" strokeWidth="2" />
          <line x1="390" y1="10" x2="390" y2="280" stroke={C.fg} strokeWidth="1.8" strokeDasharray="4 2" />
          <L x="415" y="18" fill={C.fg} size={11} weight={700}>Produksjonsbrønn</L>

          {/* Havbunn */}
          <line x1="40" y1="65" x2="600" y2="65" stroke={C.sand} strokeWidth="2" />
          <L x="55" y="80" fill={C.sand} size={12}>Havbunn</L>

          {/* Overliggende tette sedimentlag (kappbergart / overdekning) */}
          <path d="M 40 65 H 600 V 170 Q 390 120 40 170 Z" fill="#1d262d" stroke={C.dim} strokeWidth="1" />
          <L x="120" y="120" fill={C.muted} size={13}>Ugjennomtrengelige tertiære leirlag</L>

          {/* TAKBERGART (Cap rock) - forsegler antiklinalen */}
          <path
            d="M 40 170 Q 390 120 600 170 L 600 210 Q 390 160 40 210 Z"
            fill="#2c2c35"
            stroke={C.low}
            strokeWidth="1.8"
          />
          <L x="390" y="150" fill={C.low} size={13} weight={700} anchor="middle">
            5. Takbergart (ugjennomtrengelig skifer/evaporitt)
          </L>

          {/* RESERVOARBERGART (Antiklinal strukturfelle) */}
          {/* Gasslomme (øverst i fellen, lavest tetthet) */}
          <path
            d="M 280 195 Q 390 160 500 195 L 500 220 Q 390 185 280 220 Z"
            fill="#d97706"
            stroke="#f59e0b"
            strokeWidth="1"
          />
          <L x="390" y="202" fill="#fff" size={13} weight={800} anchor="middle">
            Gass (lav tetthet)
          </L>

          {/* Oljelag (i midten) */}
          <path
            d="M 230 220 Q 390 175 550 220 L 550 255 Q 390 210 230 255 Z"
            fill="#854d0e"
            stroke="#a16207"
            strokeWidth="1"
          />
          <L x="390" y="238" fill="#fff" size={14} weight={800} anchor="middle">
            4. Oljereservoar (porøs sandstein)
          </L>

          {/* Formasjonsvann (nederst i fellen, tyngst) */}
          <path
            d="M 160 255 Q 390 200 600 255 L 600 295 Q 390 240 160 295 Z"
            fill="#1e3a4a"
            stroke={C.rain}
            strokeWidth="1"
          />
          <L x="390" y="278" fill={C.rain} size={13} weight={700} anchor="middle">
            Formasjonsvann (høyest tetthet)
          </L>

          {/* Dypere bergartslag / migrasjonsvei */}
          <path d="M 40 295 Q 390 240 600 295 L 600 370 L 40 370 Z" fill="#182026" />

          {/* 1. KILDEBERGART (Draupneformasjonen, øverst jura, dypest nede) */}
          <rect x="40" y="370" width="560" height="85" rx="6" fill="#0f1418" stroke={C.warm} strokeWidth="2" />
          <L x="260" y="398" fill={C.warm} size={15} weight={800}>
            1. Kildebergart: Svart organisk skifer
          </L>
          <L x="260" y="418" fill={C.sand} size={12} weight={600}>
            Draupneformasjonen (opprinnelig alger/plankton på havbunn)
          </L>
          <L x="260" y="438" fill={C.fg} size={12}>
            2. Modning i oljevinduet: 80–120 °C ved 2500–4000 m dyp
          </L>

          {/* Migrasjonspiler fra kildebergart opp mot reservoaret */}
          <Arrow d="M 280 370 Q 260 300 280 255" marker={m.warm} color={C.warm} width={2.6} />
          <Arrow d="M 480 370 Q 520 290 500 255" marker={m.warm} color={C.warm} width={2.6} />
          <L x="205" y="325" fill={C.warm} size={13} weight={700}>
            3. Migrasjon ↑
          </L>
          <L x="205" y="340" fill={C.muted} size={10}>
            (oppdrift i porevann)
          </L>

          {/* HØYRE PANEL: DE 5 ELEMENTENE SAMMENDRAG */}
          <rect x="620" y="25" width="235" height="430" rx="8" fill="#141d24" stroke={C.dim} strokeWidth="1.5" />
          <L x="737" y="52" fill={C.warm} size={16} weight={700} anchor="middle">
            De 5 brikkene
          </L>

          {/* Punkt 1 */}
          <g>
            <rect x="630" y="66" width="215" height="64" rx="5" fill="#1c2630" stroke={C.warm} strokeWidth="1" />
            <L x="640" y="85" fill={C.warm} size={12} weight={700}>1. Kildebergart</L>
            <L x="640" y="103" fill={C.fg} size={11}>Organisk rik leirskifer.</L>
            <L x="640" y="119" fill={C.muted} size={10}>Marint plankton (kerogen).</L>
          </g>

          {/* Punkt 2 */}
          <g>
            <rect x="630" y="136" width="215" height="64" rx="5" fill="#1c2630" stroke={C.sand} strokeWidth="1" />
            <L x="640" y="155" fill={C.sand} size={12} weight={700}>2. Modning (temperatur)</L>
            <L x="640" y="173" fill={C.fg} size={11}>Oljevindu: 80–120 °C.</L>
            <L x="640" y="189" fill={C.muted} size={10}>Over 120 °C dannes gass.</L>
          </g>

          {/* Punkt 3 */}
          <g>
            <rect x="630" y="206" width="215" height="64" rx="5" fill="#1c2630" stroke={C.teal} strokeWidth="1" />
            <L x="640" y="225" fill={C.teal} size={12} weight={700}>3. Migrasjon</L>
            <L x="640" y="243" fill={C.fg} size={11}>Hydrokarboner har lav tetthet</L>
            <L x="640" y="259" fill={C.muted} size={10}>Flyter oppover gjennom porer.</L>
          </g>

          {/* Punkt 4 */}
          <g>
            <rect x="630" y="276" width="215" height="64" rx="5" fill="#1c2630" stroke={C.rain} strokeWidth="1" />
            <L x="640" y="295" fill={C.rain} size={12} weight={700}>4. Reservoarbergart</L>
            <L x="640" y="313" fill={C.fg} size={11}>Høy porøsitet & permeabilitet.</L>
            <L x="640" y="329" fill={C.muted} size={10}>F.eks. sandstein eller kritt.</L>
          </g>

          {/* Punkt 5 */}
          <g>
            <rect x="630" y="346" width="215" height="95" rx="5" fill="#1c2630" stroke={C.low} strokeWidth="1" />
            <L x="640" y="365" fill={C.low} size={12} weight={700}>5. Felle & Takbergart</L>
            <L x="640" y="383" fill={C.fg} size={11}>Felle: Antiklinal, forkastning.</L>
            <L x="640" y="399" fill={C.fg} size={11}>Takbergart: Tett skifer/leire.</L>
            <L x="640" y="420" fill={C.low} size={10} weight={600}>Uten forsegling lekker oljen ut!</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

