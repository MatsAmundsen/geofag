import { Arrow, C, Diagram, L } from "./svg-kit";

/** Simple coast silhouette — schematic, not a cartographic map. */
const NORWAY =
  "M 300 360 C 284 350 270 334 262 314 C 250 288 240 262 226 240 C 214 220 216 200 208 180 C 198 160 186 146 194 128 C 172 120 164 102 180 92 C 196 82 210 72 226 60 C 248 46 274 36 304 38 C 334 40 358 52 370 74 C 380 92 368 106 348 114 C 334 122 326 140 320 160 C 314 184 316 210 318 234 C 320 258 326 284 336 308 C 344 326 334 344 318 354 C 310 358 304 362 300 360 Z";

export function ModelGridDiagram() {
  const x0 = 168;
  const y0 = 32;
  const w = 220;
  const h = 340;
  const cols = 8;
  const rows = 14;

  return (
    <Diagram
      title="Skjematisk rutenett over Norge. Observasjoner inn i starttilstanden. Tre spor ut: vær, hav og klima."
      heading="Ett rutenett, tre tidsskalaer"
      caption="Rutenett, observasjoner inn, tre tidsskalaer ut."
      viewBox="0 0 900 420"
    >
      {(m) => (
        <>
          <defs>
            <clipPath id="nm-norway-clip">
              <path d={NORWAY} />
            </clipPath>
          </defs>

          <rect x="158" y="24" width="240" height="356" rx="10" fill="#122026" />

          <path d={NORWAY} fill="#1a3038" stroke={C.teal} strokeWidth="1.8" />
          <g clipPath="url(#nm-norway-clip)" opacity="0.9">
            {Array.from({ length: cols + 1 }, (_, i) => {
              const x = x0 + (i * w) / cols;
              return (
                <line
                  key={`v${i}`}
                  x1={x}
                  y1={y0}
                  x2={x}
                  y2={y0 + h}
                  stroke={C.teal}
                  strokeWidth="0.9"
                />
              );
            })}
            {Array.from({ length: rows + 1 }, (_, i) => {
              const y = y0 + (i * h) / rows;
              return (
                <line
                  key={`h${i}`}
                  x1={x0}
                  y1={y}
                  x2={x0 + w}
                  y2={y}
                  stroke={C.teal}
                  strokeWidth="0.9"
                />
              );
            })}
          </g>

          <L x="300" y="388" fill={C.muted} size={13} anchor="middle">
            rutenett
          </L>
          <L x="300" y="196" fill={C.fg} size={14} anchor="middle" weight={600}>
            starttilstand
          </L>

          <L x="28" y="78" fill={C.warm} size={14} weight={600}>
            observasjoner
          </L>
          <circle cx="48" cy="118" r="5" fill={C.warm} />
          <circle cx="48" cy="188" r="5" fill={C.warm} />
          <circle cx="48" cy="258" r="5" fill={C.warm} />
          <Arrow d="M 62 118 L 210 168" marker={m.warm} color={C.warm} width={2.4} />
          <Arrow d="M 62 188 L 214 196" marker={m.warm} color={C.warm} width={2.4} />
          <Arrow d="M 62 258 L 210 228" marker={m.warm} color={C.warm} width={2.4} />

          <Arrow d="M 412 120 L 520 88" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 414 196 L 520 196" marker={m.cold} color={C.cold} width={2.6} />
          <Arrow d="M 412 272 L 520 304" marker={m.fg} color={C.fg} width={2.6} />

          <rect x="528" y="48" width="348" height="78" rx="10" fill="#152028" stroke={C.teal} strokeWidth="1.6" />
          <L x="548" y="80" fill={C.teal} size={16} weight={600}>
            vær
          </L>
          <L x="548" y="104" fill={C.muted} size={14}>
            timer–to uker
          </L>

          <rect x="528" y="156" width="348" height="78" rx="10" fill="#152028" stroke={C.cold} strokeWidth="1.6" />
          <L x="548" y="188" fill={C.cold} size={16} weight={600}>
            hav
          </L>
          <L x="548" y="212" fill={C.muted} size={14}>
            rand og tetthet
          </L>

          <rect x="528" y="264" width="348" height="96" rx="10" fill="#152028" stroke={C.fg} strokeWidth="1.6" />
          <L x="548" y="296" fill={C.fg} size={16} weight={600}>
            klima
          </L>
          <L x="548" y="320" fill={C.muted} size={14}>
            pådriv og statistikk
          </L>
          <L x="548" y="342" fill={C.muted} size={14}>
            ikke 12. juni 2087
          </L>
        </>
      )}
    </Diagram>
  );
}
