import { useState } from "react";
import { Arrow, C, Diagram, L } from "./svg-kit";

export function EnsoComparisonDiagram() {
  const [phase, setPhase] = useState<"neutral" | "elnino" | "lanina">("neutral");

  return (
    <div className="space-y-4">
      {/* Fasevelger knapper */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setPhase("neutral")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            phase === "neutral"
              ? "bg-teal-600 text-white shadow"
              : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          1. Normaltilstand (Nøytral)
        </button>
        <button
          type="button"
          onClick={() => setPhase("elnino")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            phase === "elnino"
              ? "bg-amber-600 text-white shadow"
              : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          2. El Niño (Varm fase)
        </button>
        <button
          type="button"
          onClick={() => setPhase("lanina")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            phase === "lanina"
              ? "bg-sky-600 text-white shadow"
              : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          3. La Niña (Kald fase)
        </button>
      </div>

      <Diagram
        title={`ENSO: ${
          phase === "neutral"
            ? "Normaltilstand og Walker-sirkulasjon"
            : phase === "elnino"
            ? "El Niño — svekkede passater og kollaps i oppvellingen"
            : "La Niña — forsterkede passater og intens oppvelling"
        }`}
        heading={
          phase === "neutral"
            ? "Normaltilstand: Passatvinder og Walker-sirkulasjon"
            : phase === "elnino"
            ? "El Niño: Varmtvannet flyter østover — tørke i vest, regn i øst"
            : "La Niña: Ekstra sterke passatvinder og ekstrem oppvelling"
        }
        caption={
          phase === "neutral"
            ? "Stabile passatvinder blåser mot vest og stabler opp varmt overflatevann ved Indonesia (Warm Pool). Her stiger fuktig luft og danner kraftig nedbør. Utenfor Peru trekkes kaldt, næringsrikt dypvann opp (oppvelling). Termoklinen heller bratt opp mot øst."
            : phase === "elnino"
            ? "Passatvindene svekkes kraftig eller snur til vestlige vinder. Det varme overflatevannet skvulper østover mot Sør-Amerika. Termoklinen flater ut og trykkes ned i øst, noe som stanser tilførselen av kaldt næringsvann ved Peru. Konveksjon og regn forflytter seg til det sentrale og østlige Stillehavet, mens Indonesia og Australia rammes av alvorlig tørke."
            : "Passatvindene blåser uvanlig sterkt mot vest. Varmtvannsbassenget presses ekstra langt vest mot Asia/Australia med flom og sykloner som følge. I øst blir oppvellingen usedvanlig kraftig, og havoverflaten blir 1–3 °C kaldere enn normalt."
        }
        viewBox="0 0 900 480"
        wide
      >
        {(m) => (
          <>
            {/* Himmel og atmosfærebakgrunn */}
            <rect x="40" y="30" width="820" height="230" fill="#101820" rx="8" />

            {/* Havbakgrunn */}
            <rect x="40" y="260" width="820" height="180" fill="#0c1722" rx="8" />

            {/* Landmasser venstre (Indonesia / Australia) og høyre (Sør-Amerika / Peru) */}
            {/* Vest: Indonesia */}
            <rect x="40" y="220" width="90" height="220" fill="#1b281f" />
            <line x1="130" y1="220" x2="130" y2="440" stroke={C.dim} strokeWidth="1.5" />
            <L x="85" y="245" fill={C.teal} size={15} weight={800} anchor="middle">
              Indonesia
            </L>
            <L x="85" y="265" fill={C.muted} size={11} anchor="middle">
              (Vest)
            </L>

            {/* Øst: Sør-Amerika (Peru) */}
            <rect x="770" y="220" width="90" height="220" fill="#25221b" />
            <line x1="770" y1="220" x2="770" y2="440" stroke={C.dim} strokeWidth="1.5" />
            <L x="815" y="245" fill={C.warm} size={15} weight={800} anchor="middle">
              Sør-Amerika
            </L>
            <L x="815" y="265" fill={C.muted} size={11} anchor="middle">
              Peru (Øst)
            </L>

            {/* Havoverflate linje */}
            <line x1="130" y1="260" x2="770" y2="260" stroke="#38bdf8" strokeWidth="1.8" />
            <L x="450" y="252" fill="#38bdf8" size={12} weight={600} anchor="middle">
              Havoverflate · Det tropiske Stillehavet (~12 000 km)
            </L>

            {/* FASE-SPESIFIKKE STRUKTURER */}
            {phase === "neutral" && (
              <>
                {/* 1. NØYTRAL: Termoklin heller bratt ned mot vest (dyp i vest 180m, grunn i øst 30m) */}
                <path
                  d="M 130 380 L 770 285 L 770 260 L 130 260 Z"
                  fill="#ea580c"
                  opacity="0.55"
                />
                <path
                  d="M 130 380 L 770 285"
                  stroke="#fb923c"
                  strokeWidth="3.5"
                  fill="none"
                />
                <L x="500" y="325" fill="#fb923c" size={13} weight={700}>
                  Termoklin (bratt helning) ↘
                </L>

                {/* Kaldt bunnvann under termoklinen */}
                <L x="600" y="380" fill={C.cold} size={14} weight={600}>
                  Kaldt dypvann
                </L>

                {/* Varmt overflatebasseng i vest */}
                <L x="230" y="295" fill="#fff" size={15} weight={800}>
                  Varmtvannsbasseng (&gt;29 °C)
                </L>
                <L x="230" y="315" fill={C.fg} size={12}>
                  Høyere havnivå (~0,5 m)
                </L>

                {/* Oppvelling ved Peru */}
                <Arrow d="M 740 370 L 740 280" marker={m.cold} color={C.cold} width={3.2} />
                <L x="730" y="340" fill={C.cold} size={12} weight={700} anchor="end">
                  Oppvelling
                </L>
                <L x="730" y="356" fill={C.muted} size={10} anchor="end">
                  (næringsrikt vann)
                </L>

                {/* ATMOSFÆRE: WALKER-SIRKULASJON */}
                {/* Konveksjonsskyer over vest */}
                <ellipse cx="230" cy="115" rx="55" ry="32" fill="#e2e8f0" opacity="0.85" />
                <ellipse cx="200" cy="95" rx="40" ry="25" fill="#cbd5e1" opacity="0.9" />
                <ellipse cx="260" cy="95" rx="45" ry="28" fill="#cbd5e1" opacity="0.9" />
                <ellipse cx="230" cy="70" rx="45" ry="25" fill="#94a3b8" opacity="0.95" />
                <L x="230" y="118" fill="#0f172a" size={13} weight={800} anchor="middle">
                  Dyp konveksjon & regn
                </L>

                {/* Nedbørspiler */}
                <Arrow d="M 210 150 L 210 215" marker={m.rain} color={C.rain} width={2.4} />
                <Arrow d="M 250 150 L 250 215" marker={m.rain} color={C.rain} width={2.4} />

                {/* Walker-celle sirkulasjonspiler */}
                {/* Opp i vest */}
                <Arrow d="M 170 190 L 170 70" marker={m.warm} color={C.warm} width={2.8} />
                {/* Østover i høyden */}
                <Arrow d="M 280 60 L 680 60" marker={m.muted} color={C.muted} width={2.6} />
                <L x="480" y="50" fill={C.muted} size={13} anchor="middle">
                  Øvre returstrøm mot øst →
                </L>
                {/* Ned i øst (høytrykk over kaldt hav) */}
                <Arrow d="M 710 70 L 710 190" marker={m.cold} color={C.cold} width={2.8} />
                <L x="725" y="140" fill={C.cold} size={12} weight={600}>
                  Synkende luft (tørt)
                </L>
                {/* Passatvinder ved overflaten (mot vest) */}
                <Arrow d="M 680 200 L 280 200" marker={m.teal} color={C.teal} width={3.6} />
                <L x="480" y="190" fill={C.teal} size={15} weight={800} anchor="middle">
                  ← Stabile passatvinder (fra øst mot vest)
                </L>
              </>
            )}

            {phase === "elnino" && (
              <>
                {/* 2. EL NIÑO: Termoklinen flater ut, varmtvann over hele bassenget */}
                <path
                  d="M 130 320 L 770 320 L 770 260 L 130 260 Z"
                  fill="#ea580c"
                  opacity="0.65"
                />
                <line x1="130" y1="320" x2="770" y2="320" stroke="#fb923c" strokeWidth="3.5" />
                <L x="450" y="340" fill="#fb923c" size={14} weight={800} anchor="middle">
                  Termoklinen flater ut (synker i øst) — ingen oppvelling!
                </L>

                {/* Varmt vann dekker hele overflaten */}
                <L x="450" y="285" fill="#fff" size={16} weight={800} anchor="middle">
                  Varmt overflatevann brer seg over hele Stillehavet (&gt;28 °C)
                </L>
                <L x="700" y="305" fill={C.warm} size={13} weight={700}>
                  Kollaps i fisket ved Peru!
                </L>

                {/* ATMOSFÆRE: KONVEKSJON FLYTTET TIL MIDTEN/ØST */}
                {/* Skyer i midt- og øst-Stillehavet */}
                <ellipse cx="520" cy="115" rx="65" ry="32" fill="#e2e8f0" opacity="0.85" />
                <ellipse cx="490" cy="95" rx="50" ry="25" fill="#cbd5e1" opacity="0.9" />
                <ellipse cx="550" cy="95" rx="50" ry="28" fill="#cbd5e1" opacity="0.9" />
                <ellipse cx="520" cy="70" rx="50" ry="25" fill="#94a3b8" opacity="0.95" />
                <L x="520" y="118" fill="#0f172a" size={13} weight={800} anchor="middle">
                  Konveksjon & regn flyttet mot øst
                </L>

                {/* Nedbørspiler */}
                <Arrow d="M 500 150 L 500 215" marker={m.rain} color={C.rain} width={2.4} />
                <Arrow d="M 540 150 L 540 215" marker={m.rain} color={C.rain} width={2.4} />

                {/* Svekket eller reversert passat */}
                <Arrow d="M 320 200 L 460 200" marker={m.warm} color={C.warm} width={3.2} />
                <L x="390" y="190" fill={C.warm} size={13} weight={700} anchor="middle">
                  Vestavindsutbrudd (Westerly Bursts) →
                </L>

                {/* Synkende luft og tørke over Indonesia */}
                <Arrow d="M 180 70 L 180 190" marker={m.cold} color={C.cold} width={2.6} />
                <L x="180" y="210" fill={C.sand} size={13} weight={700} anchor="middle">
                  Tørke & skogbranner!
                </L>

                {/* Nedbør og flom over Peru */}
                <L x="750" y="180" fill={C.rain} size={13} weight={700} anchor="middle">
                  Flom & leirskred!
                </L>
              </>
            )}

            {phase === "lanina" && (
              <>
                {/* 3. LA NIÑA: Ekstremt bratt termoklin, dyp i vest, helt i overflaten i øst */}
                <path
                  d="M 130 410 L 770 270 L 770 260 L 130 260 Z"
                  fill="#0284c7"
                  opacity="0.6"
                />
                <path
                  d="M 130 410 L 770 270"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  fill="none"
                />
                <L x="500" y="335" fill="#38bdf8" size={13} weight={700}>
                  Termoklin (ekstremt bratt helning) ↘
                </L>

                {/* Intens oppvelling ved Peru */}
                <Arrow d="M 740 400 L 740 272" marker={m.cold} color="#38bdf8" width={4} />
                <L x="730" y="340" fill="#38bdf8" size={13} weight={800} anchor="end">
                  Ekstrem oppvelling!
                </L>
                <L x="730" y="358" fill={C.cold} size={11} weight={600} anchor="end">
                  Havtemperatur 1–3 °C under normalen
                </L>

                {/* Varmt basseng presset hardt mot vest */}
                <L x="210" y="290" fill="#fff" size={15} weight={800}>
                  Ekstremt varmt basseng i vest
                </L>

                {/* ATMOSFÆRE: FORSTERKET WALKER-SIRKULASJON */}
                {/* Gigantiske tordenskyer over vest */}
                <ellipse cx="200" cy="110" rx="65" ry="38" fill="#e2e8f0" opacity="0.9" />
                <ellipse cx="170" cy="85" rx="50" ry="30" fill="#cbd5e1" opacity="0.95" />
                <ellipse cx="230" cy="85" rx="55" ry="32" fill="#cbd5e1" opacity="0.95" />
                <ellipse cx="200" cy="55" rx="55" ry="30" fill="#64748b" opacity="0.98" />
                <L x="200" y="112" fill="#0f172a" size={14} weight={800} anchor="middle">
                  Ekstrem monsun & flom
                </L>

                {/* Ekstra sterke passater */}
                <Arrow d="M 710 200 L 260 200" marker={m.teal} color={C.teal} width={4.2} />
                <L x="485" y="190" fill={C.teal} size={16} weight={900} anchor="middle">
                  ⇇ Ekstra sterke passatvinder (super-passater)
                </L>
              </>
            )}
          </>
        )}
      </Diagram>
    </div>
  );
}
