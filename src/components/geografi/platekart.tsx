import kart from "@/lib/geografi-platekart.json";
import { font } from "@/components/diagrams/svg-kit";

/**
 * Felles vektorkart for figur 3.0 (plater) og 3.9 (varmeflekker): Millers sylindriske projeksjon,
 * sentrert på Stillehavet, tegnet for den mørke figurflaten. Data og kilder: scripts/geografi-platekart.mjs.
 */
export const PLATEGRENSER = [
  { key: "Divergent Boundary", navn: "Spredningsgrense (divergent)", farge: "#5eead4", strek: undefined },
  { key: "Convergent Boundary", navn: "Kollisjons- eller subduksjonsgrense (konvergent)", farge: "#fb7185", strek: "10 4" },
  { key: "Transform Boundary", navn: "Transformgrense", farge: "#c4b5fd", strek: "2 4" },
  { key: "Other", navn: "Annen eller usikker grense", farge: "#cbd5e1", strek: "1 6" },
] as const;

export const VARMEFLEKK = { fyll: "#fb923c", kant: "#0b1014" } as const;

const HAV = "#12324a";
const LAND = "#3d4b43";
const KANT = "#0b1014";

export function PlateKartSvg({
  ariaLabel,
  visPlatenavn = false,
  visVarmeflekker = false,
}: {
  ariaLabel: string;
  visPlatenavn?: boolean;
  visVarmeflekker?: boolean;
}) {
  const { bredde: B, hoyde: H } = kart;
  const grenser = kart.grenser as Record<string, string>;
  return (
    <svg viewBox={`0 0 ${B} ${H}`} role="img" aria-label={ariaLabel} className="block w-full min-w-[52rem]" fontFamily={font}>
      <rect width={B} height={H} fill={HAV} />
      <path d={`M0 ${kart.ekvator}H${B}`} stroke="#9fb7c9" strokeOpacity=".35" strokeWidth="1" strokeDasharray="3 5" />
      <path d={kart.land} fill={LAND} stroke={LAND} strokeWidth="0.8" strokeLinejoin="round" />
      {PLATEGRENSER.map((g) => (
        <path
          key={g.key}
          d={grenser[g.key]}
          fill="none"
          stroke={g.farge}
          strokeWidth="2"
          strokeDasharray={g.strek}
          strokeLinejoin="round"
          strokeLinecap={g.strek ? "butt" : "round"}
        />
      ))}
      {visPlatenavn &&
        kart.plater.map((p, i) => (
          <text
            key={`${p.navn}-${i}`}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            fontSize={p.liten ? 15 : 17}
            fontWeight={p.liten ? 600 : 700}
            fill="#f8fafc"
            stroke={KANT}
            strokeWidth="3.5"
            strokeLinejoin="round"
            paintOrder="stroke"
          >
            {p.navn}
          </text>
        ))}
      {visVarmeflekker &&
        kart.varmeflekker.map((v, i) => (
          <g key={i}>
            <circle cx={v.x} cy={v.y} r="6" fill={VARMEFLEKK.fyll} stroke={VARMEFLEKK.kant} strokeWidth="1.6" />
            {v.navn && (
              <text
                x={v.x + 9}
                y={v.y - 8}
                fontSize="16"
                fontWeight="700"
                fill="#fed7aa"
                stroke={KANT}
                strokeWidth="3.5"
                strokeLinejoin="round"
                paintOrder="stroke"
              >
                {v.navn}
              </text>
            )}
          </g>
        ))}
    </svg>
  );
}

/** Forklaring under kartet: samme linjer og farger som i kartet. */
export function PlateKartForklaring({ visVarmeflekker = false }: { visVarmeflekker?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
      {PLATEGRENSER.map((g) => (
        <li key={g.key} className="flex items-center gap-2">
          <svg width="34" height="10" aria-hidden="true">
            <rect width="34" height="10" fill={HAV} />
            <line x1="0" x2="34" y1="5" y2="5" stroke={g.farge} strokeWidth="2.5" strokeDasharray={g.strek} />
          </svg>
          {g.navn}
        </li>
      ))}
      {visVarmeflekker && (
        <li className="flex items-center gap-2">
          <svg width="14" height="14" aria-hidden="true">
            <circle cx="7" cy="7" r="5.5" fill={VARMEFLEKK.fyll} stroke={VARMEFLEKK.kant} strokeWidth="1.4" />
          </svg>
          Utvalgt varmeflekk, omtrentlig plassering (ikke en fullstendig liste)
        </li>
      )}
    </ul>
  );
}
