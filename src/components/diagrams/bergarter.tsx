import { Arrow, C, Diagram, L } from "./svg-kit";

function Station({
  x,
  y,
  w = 230,
  h = 88,
  stroke,
  fill,
  title,
  sub,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  stroke: string;
  fill: string;
  title: string;
  sub: string;
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
      <L x={x + w / 2} y={y + 36} fill={C.fg} size={16} anchor="middle" weight={600}>
        {title}
      </L>
      <L x={x + w / 2} y={y + 58} fill={stroke} size={13} anchor="middle">
        {sub}
      </L>
    </g>
  );
}

export function RockCycleDiagram() {
  return (
    <Diagram
      title="Bergartssyklusen er en modell med piler i flere retninger. Ingen fast rute eller start."
      heading="Bergartssyklusen"
      caption="Syklusen er en modell. Ingen fast rute."
      viewBox="0 0 820 430"
    >
      {(m) => (
        <>
          <Station x={70} y={48} stroke={C.teal} fill="#1a3038" title="gneis" sub="metamorf" />
          <Station
            x={520}
            y={48}
            stroke={C.warm}
            fill="#3a3428"
            title="larvikitt"
            sub="magmatisk dyp"
          />
          <Station
            x={70}
            y={294}
            stroke={C.sand}
            fill="#2a3428"
            title="kambrosilur"
            sub="sedimentær"
          />
          <Station
            x={520}
            y={294}
            stroke={C.warm}
            fill="#3a3428"
            title="rombeporfyr"
            sub="magmatisk dag"
          />

          <Arrow d="M 312 78 L 508 78" marker={m.warm} color={C.warm} width={2.2} />
          <Arrow d="M 508 100 L 312 100" marker={m.teal} color={C.teal} width={2.2} />
          <Arrow d="M 185 146 L 185 284" marker={m.muted} color={C.sand} width={2.2} />
          <Arrow d="M 215 284 L 215 146" marker={m.teal} color={C.teal} width={2.2} />
          <Arrow d="M 635 146 L 635 284" marker={m.warm} color={C.warm} width={2.2} />
          <Arrow d="M 665 284 L 665 146" marker={m.muted} color={C.muted} width={2.2} />
          <Arrow d="M 312 328 L 508 328" marker={m.muted} color={C.sand} width={2.2} />
          <Arrow d="M 508 350 L 312 350" marker={m.warm} color={C.warm} width={2.2} />
          <Arrow d="M 300 146 L 520 284" marker={m.muted} color={C.muted} width={1.8} dash="6 5" />
          <Arrow d="M 520 146 L 300 284" marker={m.muted} color={C.muted} width={1.8} dash="6 5" />

          <L x={410} y={68} fill={C.muted} size={12} anchor="middle">
            metamorfose
          </L>
          <L x={130} y={224} fill={C.muted} size={12} anchor="middle">
            smelting
          </L>
          <L x={410} y={400} fill={C.muted} size={12} anchor="middle">
            forvitring · diagenese
          </L>
        </>
      )}
    </Diagram>
  );
}

export function ValleyCrossSectionDiagram() {
  return (
    <Diagram
      title="U-dal skures av is i hele tverrsnittet. V-dal graves av elva i bunnen. Fjord er U under hav."
      heading="U-dal og V-dal"
      caption="Isen skurer i hele tverrsnittet. Elva graver i bunnen. Fjord er U under hav."
      viewBox="0 0 820 380"
    >
      {(m) => (
        <>
          <rect x="28" y="36" width="372" height="312" rx="10" fill="#152028" />
          <rect x="420" y="36" width="372" height="312" rx="10" fill="#152028" />

          <path
            d="M 48 92 H 108 C 112 160 122 220 148 248 L 280 248 C 306 220 316 160 320 92 H 380 V 328 H 48 Z"
            fill="#3a3428"
          />
          <path
            d="M 108 92 C 112 160 122 220 148 248 L 280 248 C 306 220 316 160 320 92 Q 214 76 108 92 Z"
            fill={C.cold}
            opacity="0.92"
          />
          <line
            x1="56"
            y1="186"
            x2="372"
            y2="186"
            stroke={C.white}
            strokeWidth="1.4"
            strokeDasharray="6 5"
            opacity="0.85"
          />
          <Arrow d="M 148 128 L 132 210" marker={m.cold} color={C.white} width={2} />
          <Arrow d="M 280 128 L 296 210" marker={m.cold} color={C.white} width={2} />
          <Arrow d="M 214 118 L 214 236" marker={m.cold} color={C.white} width={2.2} />

          <L x={214} y={64} fill={C.fg} size={15} anchor="middle" weight={600}>
            U-dal
          </L>
          <L x={214} y={140} fill={C.white} size={14} anchor="middle">
            is
          </L>
          <L x={368} y={178} fill={C.white} size={12} anchor="end">
            havnivå
          </L>
          <L x={214} y={312} fill={C.muted} size={13} anchor="middle">
            fjord · U under hav
          </L>

          <path d="M 440 92 H 528 L 606 268 L 684 92 H 772 V 328 H 440 Z" fill="#3a3428" />
          <path d="M 590 248 L 606 276 L 622 248 Q 606 238 590 248 Z" fill={C.teal} />
          <Arrow d="M 606 150 L 606 236" marker={m.teal} color={C.teal} width={2.4} />

          <L x={606} y={64} fill={C.fg} size={15} anchor="middle" weight={600}>
            V-dal
          </L>
          <L x={640} y={228} fill={C.teal} size={14}>
            elv
          </L>
        </>
      )}
    </Diagram>
  );
}
