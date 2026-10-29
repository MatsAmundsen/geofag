import { useState } from "react";
import { C } from "./svg-kit";
import { Box, G, G2Figur, T, nb } from "./g2a-kit";

const FORVALG = [
  { id: "fosen", navn: "Fosen Vind", mw: "1057", t: "3217" },
  { id: "furuseth", navn: "Furuseth solkraftverk", mw: "7", t: "914" },
  { id: "snl", navn: "SNL-eksempelet", mw: "50", t: "5000" },
];

function tall(s: string): number | null {
  const v = parseFloat(s.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(v) && v >= 0 ? v : null;
}

function energi(mwh: number) {
  if (mwh >= 1_000_000) return `${nb(mwh / 1_000_000, 1)} TWh`;
  if (mwh >= 1000) return `${nb(mwh / 1000, 1)} GWh`;
  return `${nb(mwh, 1)} MWh`;
}

function husstander(n: number) {
  const r = n >= 10000 ? Math.round(n / 1000) * 1000 : n >= 1000 ? Math.round(n / 10) * 10 : Math.round(n);
  return nb(r);
}

export function EnergiRegningKalkulator() {
  const [mw, setMw] = useState("1057");
  const [t, setT] = useState("3217");
  const e = tall(mw);
  const tt0 = tall(t);
  const over = tt0 !== null && tt0 > 8760;
  const tt = tt0 === null ? null : Math.min(tt0, 8760);
  const ok = e !== null && tt !== null;
  const mwh = ok ? e * tt : 0;
  const cf = tt !== null ? tt / 8760 : 0;
  const hus = ok ? (mwh * 1000) / 20000 : 0;
  const valgt = FORVALG.find((f) => f.mw === mw && f.t === t)?.id;
  const inp =
    "w-full rounded-md border border-[#3a4c58] bg-[#16222b] px-3 py-2 text-base text-[#e8eef2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6fb3b8]";
  return (
    <G2Figur
      title="Kalkulator for installert effekt, brukstid og årsproduksjon"
      desc="Interaktiv kalkulator. Du skriver inn installert effekt i megawatt og brukstid i timer. Kalkulatoren viser årsproduksjon, kapasitetsfaktor og hvor mange husstander som bruker like mye strøm, regnet med 20 000 kWh per husstand."
      heading="Regn selv: effekt, brukstid og produksjon"
      caption="Årsproduksjon = installert effekt × brukstid. Kapasitetsfaktor = brukstid ÷ 8760. Antall husstander regnes med 20 000 kWh per husstand, som i kapitlet. Avrundet. Fosen og Furuseth er forhåndsvalg fra eksemplene i kapitlet."
      narrow={{ w: 300, h: 362 }}
      wide={{ w: 720, h: 180 }}
      toolbar={
        <div className="w-full">
          <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Forhåndsvalg">
            {FORVALG.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={valgt === f.id}
                onClick={() => {
                  setMw(f.mw);
                  setT(f.t);
                }}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold ${
                  valgt === f.id ? "border-[#6fb3b8] bg-[#6fb3b8] text-[#0f171c]" : "border-[#3a4c58] bg-[#16222b] text-[#e8eef2]"
                }`}
              >
                {f.navn}
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm text-[#e8eef2]">
              Installert effekt (MW)
              <input className={inp} inputMode="decimal" value={mw} onChange={(ev) => setMw(ev.target.value)} />
            </label>
            <label className="block text-sm text-[#e8eef2]">
              Brukstid (timer per år, høyst 8760)
              <input className={inp} inputMode="decimal" value={t} onChange={(ev) => setT(ev.target.value)} />
            </label>
          </div>
          <label className="mt-3 block text-sm text-[#e8eef2]">
            Skyv for å endre brukstid
            <input
              type="range"
              min={0}
              max={8760}
              step={1}
              value={tt ?? 0}
              onChange={(ev) => setT(ev.target.value)}
              className="mt-1 block w-full accent-[#6fb3b8]"
            />
          </label>
          <p className="mt-2 min-h-5 text-sm text-[#e8eef2]" role="status">
            {over ? "Brukstiden kan høyst være 8760 timer. Kalkulatoren bruker 8760." : !ok ? "Skriv inn to tall som er null eller større." : ""}
          </p>
        </div>
      }
    >
      {({ bred }) => {
        const cw = bred ? 226 : 280;
        const cards = [
          { x: 0, y: 0, t: "Årsproduksjon", v: ok ? energi(mwh) : "–", s: ok ? `${nb(e!, 0)} MW × ${nb(tt!, 0)} t = ${nb(mwh, 0)} MWh` : "", f: C.warm },
          { x: 1, y: 1, t: "Kapasitetsfaktor", v: ok ? `${nb(cf * 100, 1)} %` : "–", s: "brukstid ÷ 8760", f: C.teal },
          { x: 2, y: 2, t: "Husstander", v: ok ? husstander(hus) : "–", s: "med 20 000 kWh hver", f: G.green },
        ];
        return (
          <>
            {cards.map((c, i) => {
              const cx = bred ? 10 + i * (cw + 12) : 10;
              const cy = bred ? 10 : 10 + i * 104;
              return (
                <g key={c.t}>
                  <Box x={cx} y={cy} w={cw} h={bred ? 100 : 94} stroke={c.f} fill={G.panel} sw={1.6} />
                  <T x={cx + 14} y={cy + 24} lines={c.t} size={14} weight={700} fill={c.f} />
                  <T x={cx + 14} y={cy + 56} lines={c.v} size={26} weight={700} fill={C.fg} />
                  <T x={cx + 14} y={cy + 80} lines={c.s} size={14} fill={C.muted} />
                </g>
              );
            })}
            <rect x={10} y={bred ? 126 : 318} width={bred ? 700 : 280} height={14} rx={3} fill={G.panel} stroke={G.line} />
            <rect x={10} y={bred ? 126 : 318} width={(bred ? 700 : 280) * cf} height={14} rx={3} fill={C.teal} />
            <T x={10} y={bred ? 164 : 354} lines="0 t" size={14} fill={C.muted} />
            <T x={bred ? 710 : 290} y={bred ? 164 : 354} lines="8760 t" size={14} fill={C.muted} anchor="end" />
          </>
        );
      }}
    </G2Figur>
  );
}
