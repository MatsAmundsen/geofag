/**
 * Deler til orkanmodellen (Værkatastrofer, figurplan B): breddegrad og rotasjon, typisk bane og en stormflo-
 * oversikt med bare kildefestede tall. f = 2Ω sin φ, minst om lag 500 km fra ekvator (NOAA AOML, u.å.-b),
 * banene fra NHC (u.å.-a), 1 cm per hPa og «vinden betyr mer» fra SNL (u.å.-c). Alt annet er relativt.
 */
import { useState } from "react";
import { useOrkanKlokke } from "./hurricane-klokke";

const knapp = (aktiv: boolean) =>
  `rounded-lg border px-3 py-1.5 text-sm font-semibold ${aktiv ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:bg-muted"}`;

function Pause({ paa, sett }: { paa: boolean; sett: () => void }) {
  return (
    <button type="button" className={knapp(false)} onClick={sett} aria-pressed={!paa}>
      {paa ? "❚❚ Pause" : "▶ Spill av"}
    </button>
  );
}

/* ---------- breddegrad og rotasjon ---------- */

export function RotasjonOgBreddegrad() {
  const { ref, t, spiller, toggle, redusert } = useOrkanKlokke<HTMLDivElement>();
  const [phi, setPhi] = useState(20);
  const sin = Math.sin((phi * Math.PI) / 180);
  const vinkel = (-t * 60 * sin) % 360; // negativ = mot klokken i SVG når sin > 0
  const armer = [0, 120, 240];
  const retning = Math.abs(phi) < 1 ? "ingen rotasjon" : phi > 0 ? "mot klokken (nordlig halvkule)" : "med klokken (sørlig halvkule)";
  const krumning = 60 * sin;
  return (
    <div ref={ref} className="rounded-xl border border-border bg-card p-4" data-modell="rotasjon-bredde">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <svg viewBox="0 0 360 360" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Lavtrykk sett ovenfra ved ${phi} graders bredde. Innstrømmende luft avbøyes ${retning}.`}>
          <rect x={0} y={0} width={360} height={360} rx={16} fill="#0f172a" />
          {[0, 90, 180, 270].map((a) => {
            const r = (a * Math.PI) / 180;
            const x0 = 180 + 160 * Math.cos(r);
            const y0 = 180 + 160 * Math.sin(r);
            const x1 = 180 + 40 * Math.cos(r);
            const y1 = 180 + 40 * Math.sin(r);
            const kx = (x0 + x1) / 2 + krumning * Math.sin(r);
            const ky = (y0 + y1) / 2 - krumning * Math.cos(r);
            return <path key={a} d={`M${x0.toFixed(1)} ${y0.toFixed(1)} Q${kx.toFixed(1)} ${ky.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`} fill="none" stroke="#ffffff" strokeWidth={3} markerEnd="url(#mdl-yellow)" />;
          })}
          <g transform={`rotate(${vinkel.toFixed(1)} 180 180)`} opacity={Math.min(1, Math.abs(sin) / Math.sin((40 * Math.PI) / 180))}>
            {armer.map((a) => (
              <path key={a} transform={`rotate(${a} 180 180) scale(${phi < 0 ? -1 : 1} 1) translate(${phi < 0 ? -360 : 0} 0)`} d="M180 180 C 220 120, 280 110, 310 140 C 270 140, 230 160, 180 180" fill="#ef4444" opacity={0.75} />
            ))}
          </g>
          <circle cx={180} cy={180} r={20} fill="#020617" stroke="#ef4444" strokeWidth={2.5} />
          <text x={180} y={186} textAnchor="middle" fontSize={16} fontWeight={700} fill="#f8fafc">L</text>
        </svg>
        <div className="flex-1 space-y-3 text-sm text-muted-foreground">
          <label className="block">
            <span className="flex justify-between text-xs">
              <span>Breddegrad φ</span>
              <span className="font-mono font-bold text-foreground">
                {phi === 0 ? "0° (ekvator)" : `${Math.abs(phi)}° ${phi > 0 ? "N" : "S"}`}
              </span>
            </span>
            <input type="range" min={-40} max={40} step={1} value={phi} onChange={(e) => setPhi(Number(e.target.value))} className="w-full accent-primary" aria-label="Breddegrad" />
          </label>
          <p>
            Coriolisparameteren er f&nbsp;=&nbsp;2Ω&nbsp;sin&nbsp;φ. Her er sin&nbsp;φ&nbsp;=&nbsp;
            <span className="font-mono text-foreground">{sin.toFixed(2).replace(".", ",")}</span>, så avbøyningen er{" "}
            <strong className="text-foreground">{retning}</strong>.
          </p>
          <p>Jo lenger fra ekvator, jo sterkere avbøyning. Ved ekvator er sin&nbsp;0°&nbsp;=&nbsp;0, og lufta fyller lavtrykket uten å begynne å rotere.</p>
          {!redusert && <Pause paa={spiller} sett={toggle} />}
        </div>
      </div>
    </div>
  );
}

/* ---------- typisk bane ---------- */

const BANE: [number, number][] = [
  [600, 250], [520, 245], [440, 236], [370, 214], [330, 180], [322, 140], [345, 104], [400, 76], [470, 56],
];
const BANE_STEG = [
  { navn: "Dannes", til: 0, tekst: "Tropiske sykloner dannes mellom 5 og 30 grader nord." },
  { navn: "Vestover", til: 3, tekst: "De beveger seg typisk vestover." },
  { navn: "Nordover", til: 5, tekst: "Noen ganger styrer vinden høyere oppe dem mot nord og nordvest." },
  { navn: "Nordøst", til: 8, tekst: "Nær 30 grader nord går de ofte mot nordøst." },
];
const breddeY = (b: number) => 300 - (b - 0) * (300 - 80) / 35;

function delBane(n: number) {
  return BANE.slice(0, n + 1).map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
}

export function OrkanBane() {
  const { ref, t, spiller, toggle, redusert } = useOrkanKlokke<HTMLDivElement>();
  const [steg, setSteg] = useState(3);
  const til = BANE_STEG[steg].til;
  const pos = (() => {
    if (redusert || til === 0) return BANE[til];
    const u = (t * 0.6) % til;
    const i = Math.floor(u);
    const f = u - i;
    return [BANE[i][0] + (BANE[i + 1][0] - BANE[i][0]) * f, BANE[i][1] + (BANE[i + 1][1] - BANE[i][1]) * f];
  })();
  return (
    <div ref={ref} className="rounded-xl border border-border bg-card p-4" data-modell="orkanbane">
      <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Steg i banen">
        {BANE_STEG.map((b, i) => (
          <button key={b.navn} type="button" className={knapp(i === steg)} aria-pressed={i === steg} onClick={() => setSteg(i)}>
            {b.navn}
          </button>
        ))}
        {!redusert && <Pause paa={spiller} sett={toggle} />}
      </div>
      <figure>
        <svg viewBox="0 0 700 330" className="h-auto w-full" role="img" aria-label="Skjematisk kart over Atlanterhavet med breddegradene 0, 5 og 30 grader nord. En typisk bane starter mellom 5 og 30 grader nord, går vestover, svinger mot nord og går mot nordøst nær 30 grader nord.">
          <rect x={0} y={0} width={700} height={330} rx={14} fill="#0f2a3d" />
          <path d="M0 0 L250 0 L230 60 L200 120 L150 170 L90 230 L60 330 L0 330 Z" fill="#3f4a3a" />
          <rect x={0} y={breddeY(30)} width={700} height={breddeY(5) - breddeY(30)} fill="#e8a46a" opacity={0.12} />
          {[0, 5, 30].map((b) => (
            <g key={b}>
              <line x1={0} x2={700} y1={breddeY(b)} y2={breddeY(b)} stroke="#9fb0bd" strokeDasharray="6 6" opacity={0.6} />
              <text x={690} y={breddeY(b) - 6} textAnchor="end" fontSize={18} fontWeight={700} fill="#cbd5e1">{b === 0 ? "ekvator" : `${b}° N`}</text>
            </g>
          ))}
          <text x={600} y={breddeY(17)} textAnchor="middle" fontSize={17} fontWeight={700} fill="#e8a46a">dannes her</text>
          {til > 0 && <path d={delBane(til)} fill="none" stroke="#fca5a5" strokeWidth={5} strokeLinejoin="round" markerEnd="url(#mdl-red)" />}
          <circle cx={pos[0]} cy={pos[1]} r={11} fill="#ef4444" stroke="#fff" strokeWidth={2} />
          <text x={260} y={30} fontSize={18} fontWeight={700} fill="#e2e8f0">Atlanterhavet, skjematisk</text>
        </svg>
        <figcaption className="mt-2 text-sm text-muted-foreground">
          <strong className="text-foreground">{BANE_STEG[steg].tekst}</strong> Skjematisk bane, ikke en bestemt orkan (National Hurricane Center [NHC], u.å.-a).
        </figcaption>
      </figure>
    </div>
  );
}

/* ---------- stormflo med bare kildefestede tall ---------- */

const VIND = [
  { navn: "Fralandsvind", h: 0 },
  { navn: "Svak pålandsvind", h: 0.6 },
  { navn: "Sterk pålandsvind", h: 1.6 },
];

export function StormfloOversikt() {
  const [trykkfall, setTrykkfall] = useState(30);
  const [vind, setVind] = useState(2);
  const [spring, setSpring] = useState(true);
  const enhet = 3; // px per cm for lufttrykksleddet (bare tegning)
  const baro = trykkfall * enhet;
  const vindH = VIND[vind].h * 30 * enhet * 0.9;
  const tide = (spring ? 1.3 : 1) * 70;
  const bunn = 300;
  const seg = [
    { navn: "tidevann", h: tide, farge: "#34d399" },
    { navn: "lufttrykk", h: baro, farge: "#38bdf8" },
    { navn: "vind", h: vindH, farge: "#fbbf24" },
  ];
  let y = bunn;
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2" data-modell="stormflo-oversikt">
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <label className="block">
          <span className="flex justify-between text-xs">
            <span>Trykkfall i forhold til normalt</span>
            <span className="font-mono font-bold text-foreground">{trykkfall} hPa</span>
          </span>
          <input type="range" min={0} max={60} step={1} value={trykkfall} onChange={(e) => setTrykkfall(Number(e.target.value))} className="w-full accent-primary" aria-label="Trykkfall i hektopascal" />
          <span className="text-xs">Om lag 1 cm per hPa gir om lag <strong className="text-foreground">{trykkfall} cm</strong> høyere vannstand.</span>
        </label>
        <div>
          <span className="mb-1 block text-xs">Vind mot kysten</span>
          <div className="flex flex-wrap gap-2">
            {VIND.map((v, i) => (
              <button key={v.navn} type="button" className={knapp(i === vind)} aria-pressed={i === vind} onClick={() => setVind(i)}>
                {v.navn}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="mb-1 block text-xs">Tidevann</span>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={knapp(spring)} aria-pressed={spring} onClick={() => setSpring(true)}>Springflo</button>
            <button type="button" className={knapp(!spring)} aria-pressed={!spring} onClick={() => setSpring(false)}>Vanlig høyvann</button>
          </div>
        </div>
      </div>
      <figure className="rounded-xl border border-border bg-card p-4">
        <svg viewBox="0 0 320 320" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Søyle for vannstanden: tidevann, ${trykkfall} cm fra lavt lufttrykk og et vindbidrag for ${VIND[vind].navn.toLowerCase()}.`}>
          <rect x={0} y={0} width={320} height={320} rx={12} fill="#0f172a" />
          <line x1={40} x2={290} y1={bunn} y2={bunn} stroke="#94a3b8" />
          {seg.map((sg) => {
            const topp = y - sg.h;
            const el = sg.h > 0.5 ? (
              <g key={sg.navn}>
                <rect x={80} y={Math.max(10, topp)} width={90} height={Math.max(0, y - Math.max(10, topp))} fill={sg.farge} opacity={0.8} />
                <text x={182} y={Math.max(24, (topp + y) / 2 + 6)} fontSize={16} fontWeight={700} fill={sg.farge}>{sg.navn}</text>
              </g>
            ) : null;
            y = topp;
            return el;
          })}
        </svg>
        <figcaption className="mt-2 text-sm text-muted-foreground">
          Bare lufttrykksleddet er regnet ut: om lag 1 cm per hPa. Pålandsvind stuer vann mot kysten og betyr vanligvis mer enn lufttrykket. Springflo gir høyere høyvann. Bølgene kommer på toppen (Store norske leksikon, u.å.-c). Søylene for vind og tidevann er skjematiske.
        </figcaption>
      </figure>
    </div>
  );
}
