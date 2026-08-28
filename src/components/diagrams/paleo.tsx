import { Arrow, C, Diagram, L } from "./svg-kit";

function wave(x0: number, y0: number, width: number, amp: number, cycles: number, steps = 96) {
  const parts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x0 + t * width;
    const y = y0 - Math.sin(t * cycles * Math.PI * 2) * amp;
    parts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return parts.join(" ");
}

export function PaleoDiagram() {
  const x0 = 168;
  const w = 330;
  const layers = [78, 96, 114, 132, 150, 168, 186, 204, 222, 240, 258, 276, 294, 312, 330];

  return (
    <Diagram
      title="Tre orbitale sykluser — eksentrisitet, helning og presesjon — og en skjematisk iskjerne med årlige lag og luftbobler"
      heading="Orbitale sykluser og iskjerne"
      caption="Fordeling av innstråling, ikke mengden. Luftboblene er ekte fortidsatmosfære."
      viewBox="0 0 920 420"
    >
      {(m) => (
        <>
          <L x="28" y="36" fill={C.fg} size={15} weight={600}>
            Tre orbitale sykluser
          </L>
          <L x="28" y="56" fill={C.muted} size={13}>
            fordeling, ikke mengden
          </L>

          <L x="28" y="102" fill={C.warm} size={14} weight={600}>
            eksentrisitet
          </L>
          <L x="28" y="120" fill={C.muted} size={12}>
            ca. 100 000 år
          </L>
          <L x="28" y="136" fill={C.muted} size={12}>
            banens ellipse
          </L>
          <path
            d={wave(x0, 112, w, 18, 2.2)}
            fill="none"
            stroke={C.warm}
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          <L x="28" y="188" fill={C.teal} size={14} weight={600}>
            helning
          </L>
          <L x="28" y="206" fill={C.muted} size={12}>
            ca. 41 000 år
          </L>
          <L x="28" y="222" fill={C.muted} size={12}>
            sommersol, høye bredder
          </L>
          <path
            d={wave(x0, 204, w, 18, 5.4)}
            fill="none"
            stroke={C.teal}
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          <L x="28" y="274" fill={C.cold} size={14} weight={600}>
            presesjon
          </L>
          <L x="28" y="292" fill={C.muted} size={12}>
            ca. 23 000 og 19 000 år
          </L>
          <L x="28" y="308" fill={C.muted} size={12}>
            nærmest sola på året
          </L>
          <path
            d={wave(x0, 292, w, 16, 10)}
            fill="none"
            stroke={C.cold}
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          <Arrow d="M 168 348 L 498 348" marker={m.muted} color={C.muted} width={1.6} />
          <L x="168" y="370" fill={C.muted} size={13}>
            tid
          </L>
          <L x="28" y="400" fill={C.muted} size={13}>
            styrer sommersmelting på 65 °N
          </L>

          <line x1="528" y1="28" x2="528" y2="392" stroke={C.dim} />

          <L x="724" y="36" fill={C.fg} size={15} weight={600} anchor="middle">
            iskjerne
          </L>

          <defs>
            <clipPath id="paleo-core">
              <rect x="676" y="64" width="96" height="280" />
            </clipPath>
          </defs>

          <ellipse cx="724" cy="344" rx="48" ry="14" fill="#0c1820" />
          <rect x="676" y="64" width="96" height="280" fill="#163038" />
          <g clipPath="url(#paleo-core)">
            {layers.map((y, i) => (
              <rect
                key={y}
                x="676"
                y={y}
                width="96"
                height="18"
                fill={i % 2 === 0 ? "#1a404c" : "#143038"}
              />
            ))}
            {[
              [698, 92],
              [736, 108],
              [712, 128],
              [744, 148],
              [690, 166],
              [724, 184],
              [746, 206],
              [702, 224],
              [730, 246],
              [688, 268],
              [740, 286],
              [710, 308],
            ].map(([cx, cy]) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r="4.2"
                fill={C.cold}
                opacity="0.85"
                stroke={C.white}
                strokeWidth="0.6"
              />
            ))}
          </g>
          <ellipse
            cx="724"
            cy="64"
            rx="48"
            ry="14"
            fill="#2a4a54"
            stroke={C.teal}
            strokeWidth="1.4"
          />
          <ellipse
            cx="724"
            cy="344"
            rx="48"
            ry="14"
            fill="none"
            stroke={C.teal}
            strokeWidth="1.4"
          />
          <line x1="676" y1="64" x2="676" y2="344" stroke={C.teal} strokeWidth="1.6" />
          <line x1="772" y1="64" x2="772" y2="344" stroke={C.teal} strokeWidth="1.6" />

          <L x="724" y="58" fill={C.fg} size={12} anchor="middle">
            yngre
          </L>
          <L x="724" y="372" fill={C.muted} size={12} anchor="middle">
            eldre
          </L>

          <Arrow d="M 790 118 L 776 128" marker={m.teal} color={C.teal} width={1.8} />
          <L x="798" y="116" fill={C.teal} size={13}>
            årlige lag
          </L>
          <Arrow d="M 790 210 L 748 210" marker={m.cold} color={C.cold} width={1.8} />
          <L x="798" y="206" fill={C.cold} size={13}>
            luftbobler
          </L>
          <L x="798" y="224" fill={C.muted} size={12}>
            ekte fortids-
          </L>
          <L x="798" y="240" fill={C.muted} size={12}>
            atmosfære
          </L>
        </>
      )}
    </Diagram>
  );
}
