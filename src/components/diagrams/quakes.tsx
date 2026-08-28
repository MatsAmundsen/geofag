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
      title="Grunne skjelv ved rygg og transform. Dype skjelv i den synkende platen ved subduksjon."
      heading="Skjelv ved plategrenser"
      caption="Grunne skjelv ved rygg og transform. Dype skjelv i den synkende platen ved subduksjon."
      viewBox="0 0 820 400"
    >
      {(m) => (
        <>
          <rect x="40" y="248" width="740" height="112" fill="#152028" />
          <L x="56" y="312" fill={C.muted} size={14}>
            astenosfære
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
          <L x="56" y={198} fill={C.muted} size={14}>
            litosfære
          </L>
          <L x="430" y={218} fill={C.low} size={14}>
            synkende plate
          </L>
          <L x="560" y={168} fill={C.low} size={13} anchor="end">
            dype skjelv
          </L>
          <L x="680" y={58} fill={C.low} size={15}>
            vulkanbue
          </L>
        </>
      )}
    </Diagram>
  );
}
