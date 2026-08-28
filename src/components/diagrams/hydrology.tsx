import { Arrow, C, Diagram, L } from "./svg-kit";

function HydrographPanel({
  x,
  y,
  w,
  h,
  path,
  color,
  fill,
  title,
  xlabel,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  path: string;
  color: string;
  fill: string;
  title: string;
  xlabel: string;
}) {
  const base = y + h;
  return (
    <g>
      <L x={x} y={y - 8} fill={C.fg} size={15} weight={600}>
        {title}
      </L>
      <L x={x} y={y + 14} fill={C.muted} size={13}>
        vannføring
      </L>
      <line x1={x} y1={y + 22} x2={x} y2={base} stroke={C.dim} strokeWidth="1.8" />
      <line x1={x} y1={base} x2={x + w} y2={base} stroke={C.dim} strokeWidth="1.8" />
      <path d={`${path} L ${x + w} ${base} L ${x} ${base} Z`} fill={fill} opacity="0.28" />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <L x={x + w} y={base + 22} fill={C.muted} size={13} anchor="end">
        tid · {xlabel}
      </L>
    </g>
  );
}

export function HydrographDiagram() {
  return (
    <Diagram
      title="Regnflom på timer. Snøsmelteflom over dager–uker."
      heading="To hydrogram"
      caption="Regnflom på timer. Snøsmelteflom over dager–uker."
      viewBox="0 0 820 500"
    >
      {() => (
        <>
          <HydrographPanel
            x={70}
            y={48}
            w={700}
            h={160}
            title="Regnflom"
            xlabel="timer"
            color={C.rain}
            fill={C.rain}
            path="M 70 208 C 160 206 210 198 250 150 S 300 48 338 42 S 385 78 420 128 S 500 200 770 208"
          />
          <HydrographPanel
            x={70}
            y={286}
            w={700}
            h={160}
            title="Snøsmelteflom"
            xlabel="dager–uker"
            color={C.cold}
            fill={C.cold}
            path="M 70 446 C 160 438 250 400 340 360 S 470 300 560 308 S 680 360 770 446"
          />
        </>
      )}
    </Diagram>
  );
}

export function MarineLimitDiagram() {
  return (
    <Diagram
      title="Kvikkleire bare under marin grense, og bare der saltet er vasket ut."
      heading="Marin grense"
      caption="Kvikkleire bare under marin grense, og bare der saltet er vasket ut."
      viewBox="0 0 820 400"
    >
      {(m) => (
        <>
          <path d="M 40 268 H 780 V 380 H 40 Z" fill="#152028" />
          <path d="M 640 268 H 780 V 380 H 640 Z" fill="#16303a" />
          <path d="M 640 70 H 780 V 268 H 640 Z" fill="#16303a" opacity="0.72" />

          <path d="M 40 268 L 300 268 L 300 168 L 220 128 L 130 92 L 40 70 Z" fill="#3a3428" />
          <path d="M 300 268 L 640 268 L 540 248 L 420 210 L 300 168 Z" fill="#3a3428" />

          <path d="M 40 70 L 130 92 L 220 128 L 300 168 H 40 Z" fill={C.sand} />
          <path d="M 300 168 L 420 210 L 540 248 L 640 268 H 300 Z" fill="#7a8a86" />
          <path
            d="M 320 176 L 430 214 L 520 242 L 490 228 L 390 192 Z"
            fill={C.low}
            opacity="0.92"
          />

          <path
            d="M 40 70 L 130 92 L 220 128 L 300 168 L 420 210 L 540 248 L 640 268"
            fill="none"
            stroke={C.fg}
            strokeWidth="1.6"
            opacity="0.35"
          />

          <line
            x1="40"
            y1="168"
            x2="720"
            y2="168"
            stroke={C.teal}
            strokeWidth="2.4"
            strokeDasharray="8 6"
          />
          <L x="56" y="156" fill={C.teal} size={14} weight={600}>
            marin grense
          </L>
          <L x="168" y="156" fill={C.muted} size={13}>
            0–220 m
          </L>

          <L x="88" y="118" fill={C.bg} size={13} weight={600}>
            ikke marin leire
          </L>
          <L x="454" y="262" fill={C.fg} size={13}>
            marin leire
          </L>
          <L x="352" y="206" fill={C.fg} size={13} weight={600}>
            kvikkleire
          </L>
          <L x="708" y="252" fill={C.cold} size={14} anchor="end">
            hav
          </L>

          <Arrow d="M 168 250 L 168 100" marker={m.warm} color={C.warm} width={2.6} />
          <L x="180" y="178" fill={C.warm} size={13}>
            landheving
          </L>

          <Arrow d="M 400 148 L 438 198" marker={m.cold} color={C.cold} width={2.2} />
          <Arrow d="M 488 148 L 526 214" marker={m.cold} color={C.cold} width={2.2} />
          <L x="500" y="138" fill={C.cold} size={13}>
            saltet vaskes ut
          </L>
        </>
      )}
    </Diagram>
  );
}
