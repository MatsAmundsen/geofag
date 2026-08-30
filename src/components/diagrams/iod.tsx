import { useEffect, useState } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { Button } from "@/components/ui/button";
import { DMI_SON, DMI_SON_START } from "@/lib/iod-dmi";
import { Arrow, C, Diagram, L } from "./svg-kit";

function Basin() {
  return (
    <g>
      <rect x="36" y="36" width="828" height="248" rx="8" fill="#122026" />
      <path
        d="M 70 70 C 95 78, 118 95, 128 130 C 138 170, 132 210, 118 248 L 78 248 C 68 210, 62 150, 70 70 Z"
        fill="#1c2830"
        stroke={C.dim}
      />
      <L x="78" y="128" fill={C.muted} size={12}>
        Øst-Afrika
      </L>
      <path
        d="M 148 210 C 162 214, 168 232, 158 248 L 140 248 C 136 230, 138 214, 148 210 Z"
        fill="#1c2830"
        stroke={C.dim}
      />
      <path
        d="M 390 58 C 430 62, 448 88, 438 128 C 428 148, 400 158, 378 140 C 368 118, 370 78, 390 58 Z"
        fill="#1c2830"
        stroke={C.dim}
      />
      <L x="402" y="98" fill={C.muted} size={12}>
        India
      </L>
      <path
        d="M 620 128 C 680 138, 740 148, 768 168 C 750 188, 690 186, 630 168 C 610 156, 604 138, 620 128 Z"
        fill="#1c2830"
        stroke={C.dim}
      />
      <L x="678" y="126" fill={C.muted} size={12}>
        Indonesia
      </L>
      <path
        d="M 700 198 C 780 204, 830 220, 838 268 L 708 274 C 680 246, 678 214, 700 198 Z"
        fill="#1c2830"
        stroke={C.dim}
      />
      <L x="748" y="248" fill={C.muted} size={12}>
        Australia
      </L>
      <line x1="50" y1="168" x2="850" y2="168" stroke={C.dim} strokeDasharray="5 6" />
      <L x="58" y="160" fill={C.muted} size={11}>
        ekvator
      </L>
    </g>
  );
}

function PoleBoxes() {
  return (
    <g>
      <rect
        x="148"
        y="118"
        width="118"
        height="96"
        fill="none"
        stroke={C.fg}
        strokeDasharray="4 3"
        opacity="0.55"
      />
      <L x="207" y="236" fill={C.muted} size={11} anchor="middle">
        vest 50–70°Ø
      </L>
      <rect
        x="598"
        y="148"
        width="118"
        height="58"
        fill="none"
        stroke={C.fg}
        strokeDasharray="4 3"
        opacity="0.55"
      />
      <L x="657" y="224" fill={C.muted} size={11} anchor="middle">
        øst 90–110°Ø
      </L>
    </g>
  );
}

export function NeutralIodDiagram() {
  return (
    <Diagram
      title="Nøytral IOD: varmere i øst, vestavind langs ekvator, konveksjon over Indonesia"
      heading="Figur 1. Nøytral IOD"
      caption="I normalen er øst gjerne varmest. Vann fra Stillehavet kommer inn gjennom Indonesia (Indonesian Throughflow), og vestavind blåser langs ekvator. Konveksjonen sitter over det maritime kontinentet — ikke over Øst-Afrika."
      viewBox="0 0 900 430"
    >
      {(m) => (
        <>
          <Basin />
          <ellipse cx="670" cy="158" rx="92" ry="42" fill={C.warm} opacity="0.28" />
          <ellipse cx="210" cy="168" rx="70" ry="38" fill={C.cold} opacity="0.16" />
          <PoleBoxes />
          <Arrow d="M 230 168 L 560 168" marker={m.warm} color={C.warm} width={3} />
          <L x="360" y="156" fill={C.warm} size={13}>
            vestavind
          </L>
          <Arrow d="M 790 150 L 730 158" marker={m.teal} color={C.teal} width={2.2} />
          <L x="798" y="146" fill={C.teal} size={12}>
            ITF
          </L>
          <path
            d="M 640 78 Q 670 48, 700 78 Q 672 70, 640 78"
            fill={C.rain}
            opacity="0.7"
          />
          <L x="670" y="44" fill={C.rain} size={13} anchor="middle">
            konveksjon
          </L>
          <rect x="36" y="300" width="828" height="110" rx="8" fill="#152028" />
          <L x="56" y="324" fill={C.muted} size={13}>
            termoklin (skisse)
          </L>
          <path
            d="M 70 372 C 280 364, 620 356, 830 350"
            fill="none"
            stroke={C.cold}
            strokeWidth="3"
          />
          <L x="70" y="396" fill={C.muted} size={12}>
            vest
          </L>
          <L x="830" y="396" fill={C.muted} size={12} anchor="end">
            øst · dypere varmt lag
          </L>
        </>
      )}
    </Diagram>
  );
}

export function DmiTimeseriesDiagram() {
  const n = DMI_SON.length;
  const x0 = 64;
  const x1 = 860;
  const y0 = 36;
  const y1 = 268;
  const zero = (y0 + y1) / 2;
  const px = (y1 - y0) / 2 / 1.15;
  const gap = (x1 - x0) / n;
  const w = Math.max(2.2, gap * 0.72);
  const xAt = (i: number) => x0 + i * gap + gap / 2;
  const yAt = (v: number) => zero - v * px;
  const idx = (year: number) => year - DMI_SON_START;
  const marks = [1961, 1980, 1997, 2019, 2024];

  return (
    <Diagram
      title="Dipole Mode Index, september–november, 1961–2024. 1997 og 2019 er blant de sterkeste positive hendelsene."
      heading="Figur 2. DMI: når dipolen slår ut"
      caption="September–november-middel av DMI fra NOAA PSL (HadISST1.1): vestlig pol minus østlig pol. Stiplet linje er ±0,4 °C — terskelen Bureau of Meteorology ofte bruker for en IOD-hendelse. 1997 og 2019 er de to sterkeste positive toppene i serien."
      viewBox="0 0 900 340"
    >
      {() => (
        <>
          <line x1={x0} y1={zero} x2={x1} y2={zero} stroke={C.dim} />
          <line
            x1={x0}
            y1={yAt(0.4)}
            x2={x1}
            y2={yAt(0.4)}
            stroke={C.warm}
            strokeDasharray="4 5"
            opacity="0.55"
          />
          <line
            x1={x0}
            y1={yAt(-0.4)}
            x2={x1}
            y2={yAt(-0.4)}
            stroke={C.cold}
            strokeDasharray="4 5"
            opacity="0.55"
          />
          {DMI_SON.map((v, i) => {
            const x = xAt(i) - w / 2;
            const y = v >= 0 ? yAt(v) : zero;
            const h = Math.abs(v) * px;
            const hot = i === idx(1997) || i === idx(2019);
            return (
              <rect
                key={DMI_SON_START + i}
                x={x}
                y={y}
                width={w}
                height={Math.max(h, 1.2)}
                rx="0.6"
                fill={hot ? C.low : v >= 0 ? C.warm : C.cold}
                opacity={hot ? 1 : 0.82}
              />
            );
          })}
          {marks.map((year) => (
            <L key={year} x={xAt(idx(year))} y="292" fill={C.muted} size={12} anchor="middle">
              {year}
            </L>
          ))}
          <L x="56" y="32" fill={C.muted} size={12}>
            °C
          </L>
          <L x="872" y={yAt(0.4) + 4} fill={C.warm} size={11} anchor="end">
            +0,4
          </L>
          <L x="872" y={yAt(-0.4) + 4} fill={C.cold} size={11} anchor="end">
            −0,4
          </L>
          <L x={xAt(idx(1997))} y="22" fill={C.low} size={13} anchor="middle" weight={600}>
            1997
          </L>
          <L x={xAt(idx(2019))} y="22" fill={C.low} size={13} anchor="middle" weight={600}>
            2019
          </L>
        </>
      )}
    </Diagram>
  );
}

export function NegativeWalkerDiagram() {
  return (
    <Diagram
      title="Negativ IOD: termoklinen kommer opp i vest, varmt vann stables i øst"
      heading="Figur 7. Negativ IOD: Walker-snitt"
      caption="Speilbildet av figur 3. Vestavinden styrkes. Varmt vann stables utenfor Indonesia. Termoklinen kommer opp utenfor Øst-Afrika (oppvelling) og synker i øst (nedvelling). Konveksjonen sitter over det maritime kontinentet."
      viewBox="0 0 900 430"
    >
      {(m) => (
        <>
          <Basin />
          <ellipse cx="210" cy="168" rx="78" ry="44" fill={C.cold} opacity="0.32" />
          <ellipse cx="670" cy="158" rx="96" ry="46" fill={C.warm} opacity="0.34" />
          <PoleBoxes />
          <Arrow d="M 250 168 L 560 168" marker={m.warm} color={C.warm} width={3.2} />
          <L x="360" y="154" fill={C.warm} size={13}>
            styrket vestavind
          </L>
          <circle cx="210" cy="92" r="18" fill="none" stroke={C.teal} strokeWidth="2" />
          <L x="210" y="98" fill={C.teal} size={14} anchor="middle">
            H
          </L>
          <circle cx="670" cy="92" r="18" fill="none" stroke={C.low} strokeWidth="2" />
          <L x="670" y="98" fill={C.low} size={14} anchor="middle">
            L
          </L>
          <path d="M 640 70 Q 670 42, 700 70 Q 672 62, 640 70" fill={C.rain} opacity="0.75" />
          <rect x="36" y="300" width="828" height="110" rx="8" fill="#152028" />
          <path
            d="M 70 338 C 240 348, 520 392, 830 398"
            fill="none"
            stroke={C.cold}
            strokeWidth="3.2"
          />
          <Arrow d="M 160 390 L 160 348" marker={m.cold} color={C.cold} width={2.2} />
          <L x="172" y="372" fill={C.cold} size={13}>
            oppvelling
          </L>
          <Arrow d="M 740 348 L 740 390" marker={m.warm} color={C.warm} width={2.2} />
          <L x="752" y="368" fill={C.warm} size={13}>
            nedvelling
          </L>
          <L x="70" y="412" fill={C.muted} size={12}>
            vest · kaldt
          </L>
          <L x="830" y="412" fill={C.muted} size={12} anchor="end">
            øst · varmt
          </L>
        </>
      )}
    </Diagram>
  );
}

export function IodEkmanDiagram() {
  return (
    <Diagram
      title="På sørlig halvkule går Ekman-transporten 90 grader til venstre for vinden. Østlige vinder skyver derfor vann sørover, bort fra Sumatra."
      heading="Figur 5. Ekman 90° til venstre (sørlig halvkule)"
      caption="Den østlige IOD-polen ligger sør for ekvator. Østlige vinder peker mot vest. 90° til venstre for den retningen er sørover. Overflatevannet spriker fra kysten av Sumatra og Nordvest-Australia, og kaldt dypvann må opp."
      viewBox="0 0 900 340"
    >
      {(m) => (
        <>
          <rect x="48" y="48" width="390" height="250" rx="10" fill="#152028" stroke={C.dim} />
          <L x="243" y="78" size={15} anchor="middle" weight={600}>
            1  Vind
          </L>
          <Arrow d="M 360 150 L 120 150" marker={m.warm} color={C.warm} width={3.4} />
          <L x="243" y="136" fill={C.warm} size={14} anchor="middle">
            østlig vind  →  mot vest
          </L>
          <L x="243" y="272" fill={C.muted} size={13} anchor="middle">
            langs Sumatra / NW-Australia
          </L>

          <rect x="462" y="48" width="390" height="250" rx="10" fill="#152028" stroke={C.dim} />
          <L x="657" y="78" size={15} anchor="middle" weight={600}>
            2  Vannet
          </L>
          <Arrow d="M 657 112 L 657 230" marker={m.cold} color={C.cold} width={3.4} />
          <L x="672" y="176" fill={C.cold} size={14}>
            Ekman 90° til venstre
          </L>
          <L x="672" y="196" fill={C.muted} size={13}>
            = sørover, bort fra kysten
          </L>
          <L x="657" y="272" fill={C.cold} size={13} anchor="middle">
            oppvelling der vannet spriker
          </L>
        </>
      )}
    </Diagram>
  );
}

export function IodTeleconnectionDiagram() {
  return (
    <Diagram
      title="Positiv IOD: flom i Øst-Afrika, ofte sterkere indisk sommermonsun, tørke og brannfare i Indonesia og Australia"
      heading="Figur 10. Telekobling: tre kyster, samme vippe"
      caption="Havet snakker til tre kontinenter samtidig. Positiv IOD (oransje): mer regn mot Øst-Afrika og ofte India, tørke mot Indonesia og Australia. Negativ IOD snur pilene."
      viewBox="0 0 900 320"
    >
      {(m) => (
        <>
          <Basin />
          <ellipse cx="210" cy="168" rx="70" ry="40" fill={C.warm} opacity="0.3" />
          <ellipse cx="670" cy="160" rx="88" ry="42" fill={C.cold} opacity="0.28" />
          <Arrow d="M 210 120 L 210 78" marker={m.teal} color={C.rain} width={2.6} />
          <L x="222" y="70" fill={C.rain} size={13}>
            Øst-Afrika · flom
          </L>
          <Arrow d="M 402 120 L 402 78" marker={m.warm} color={C.warm} width={2.4} />
          <L x="414" y="70" fill={C.warm} size={13}>
            India · monsun
          </L>
          <Arrow d="M 748 210 L 748 252" marker={m.low} color={C.low} width={2.6} />
          <L x="760" y="272" fill={C.low} size={13}>
            Australia · tørke
          </L>
        </>
      )}
    </Diagram>
  );
}

export function IodVsEnsoDiagram() {
  return (
    <Diagram
      title="IOD sitter i tropisk Indiahav. ENSO sitter i tropisk Stillehav. De kan falle sammen, men de er ikke det samme."
      heading="Figur 11. To basseng, to vipper"
      caption="1997 og 2019: positiv IOD falt sammen med El Niño og forsterket tørken i Australia. Negativ IOD kan forsterke nedbøren under La Niña. De er naboer, ikke synonymer."
      viewBox="0 0 900 280"
    >
      {(m) => (
        <>
          <rect x="48" y="48" width="360" height="188" rx="10" fill="#152028" stroke={C.dim} />
          <L x="228" y="82" size={16} anchor="middle" weight={600}>
            IOD · Indiahavet
          </L>
          <L x="228" y="112" fill={C.warm} size={14} anchor="middle">
            +  varmt vest / kaldt øst
          </L>
          <L x="228" y="136" fill={C.cold} size={14} anchor="middle">
            −  kaldt vest / varmt øst
          </L>
          <L x="228" y="172" fill={C.muted} size={13} anchor="middle">
            DMI = vest minus øst
          </L>
          <L x="228" y="208" fill={C.muted} size={13} anchor="middle">
            4–6 måneder
          </L>

          <rect x="492" y="48" width="360" height="188" rx="10" fill="#152028" stroke={C.dim} />
          <L x="672" y="82" size={16} anchor="middle" weight={600}>
            ENSO · Stillehavet
          </L>
          <L x="672" y="112" fill={C.warm} size={14} anchor="middle">
            El Niño · varmt i øst
          </L>
          <L x="672" y="136" fill={C.cold} size={14} anchor="middle">
            La Niña · kaldt i øst
          </L>
          <L x="672" y="172" fill={C.muted} size={13} anchor="middle">
            Niño-3.4
          </L>
          <L x="672" y="208" fill={C.muted} size={13} anchor="middle">
            2–7 år mellom toppene
          </L>

          <Arrow d="M 418 142 L 480 142" marker={m.teal} color={C.teal} width={2.4} />
        </>
      )}
    </Diagram>
  );
}

export function IodPhaseShift() {
  const [phase, setPhase] = useState<"pos" | "neg">("pos");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setPaused(true);
      return;
    }
    if (paused) return;
    const id = window.setInterval(() => {
      setPhase((p) => (p === "pos" ? "neg" : "pos"));
    }, 3800);
    return () => window.clearInterval(id);
  }, [paused]);

  const pos = phase === "pos";

  return (
    <FigureFrame
      heading="Figur 13. Faseskift: samme maskin, motsatt fortegn"
      caption="Skisse, ikke satellittfilm. Termoklinen, vinden og konveksjonen bytter side. Pause hvis du vil lese én fase i ro. Dette er en modell av de to tilstandene, ikke et opptak av en ekte hendelse."
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-3 sm:px-1">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {pos ? "Positiv IOD: varmt i vest, kaldt i øst" : "Negativ IOD: kaldt i vest, varmt i øst"}
        </p>
        <Button type="button" size="sm" variant="secondary" onClick={() => setPaused((v) => !v)}>
          {paused ? "Spill av" : "Pause"}
        </Button>
      </div>
      <svg
        viewBox="0 0 900 360"
        className="mx-auto h-auto w-full max-w-3xl"
        role="img"
        aria-label={pos ? "Positiv IOD-skisse" : "Negativ IOD-skisse"}
      >
        <defs>
          <marker
            id="iod-phase-warm"
            viewBox="0 0 12 12"
            refX="10"
            refY="6"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M0 1.5 L11 6 L0 10.5 z" fill={C.warm} />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill={C.bg} rx="10" />
        <rect x="36" y="28" width="828" height="200" rx="8" fill="#122026" />
        <ellipse
          cx="210"
          cy="128"
          rx="86"
          ry="48"
          fill={pos ? C.warm : C.cold}
          opacity="0.38"
        />
        <ellipse
          cx="670"
          cy="128"
          rx="96"
          ry="50"
          fill={pos ? C.cold : C.warm}
          opacity="0.38"
        />
        <line x1="50" y1="128" x2="850" y2="128" stroke={C.dim} strokeDasharray="5 6" />
        <text x="70" y="58" fill={C.muted} fontSize="13" fontFamily="Source Sans 3, sans-serif">
          Øst-Afrika
        </text>
        <text x="760" y="58" fill={C.muted} fontSize="13" fontFamily="Source Sans 3, sans-serif">
          Indonesia
        </text>
        <path
          d={pos ? "M 560 128 L 250 128" : "M 250 128 L 560 128"}
          fill="none"
          stroke={C.warm}
          strokeWidth="3.2"
          strokeLinecap="round"
          markerEnd="url(#iod-phase-warm)"
        />
        <text x="360" y="116" fill={C.warm} fontSize="14" fontFamily="Source Sans 3, sans-serif">
          {pos ? "vind mot vest" : "vind mot øst"}
        </text>
        <rect x="36" y="244" width="828" height="96" rx="8" fill="#152028" />
        <path
          d={pos ? "M 70 312 C 280 320, 560 268, 830 262" : "M 70 262 C 280 268, 560 318, 830 312"}
          fill="none"
          stroke={C.cold}
          strokeWidth="3.2"
        />
        <text x="70" y="324" fill={C.muted} fontSize="12" fontFamily="Source Sans 3, sans-serif">
          {pos ? "vest: nedvelling" : "vest: oppvelling"}
        </text>
        <text
          x="830"
          y="324"
          fill={C.muted}
          fontSize="12"
          textAnchor="end"
          fontFamily="Source Sans 3, sans-serif"
        >
          {pos ? "øst: oppvelling" : "øst: nedvelling"}
        </text>
      </svg>
    </FigureFrame>
  );
}
