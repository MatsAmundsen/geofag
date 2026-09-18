import { useState, useId } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { Arrow, C, Diagram, L, font } from "./svg-kit";

/**
 * NaoInteractiveSimulator:
 * Interaktiv simulator for Den nordatlantiske oscillasjon (NAO).
 * Lar eleven bytte mellom NAO+, Nøytral og NAO−, med animerte SVG-elementer:
 * - Roterende trykksentre (syklonsk rotasjon mot urviseren ved Island, antisyklonsk med urviseren ved Azorene).
 * - Levende partikkelflyt langs polarjeten (kraftig og sonal under NAO+, sterkt meandrerende under NAO−).
 * - Drivende lavtrykk/sykloner langs stormbanen inn mot Norge eller avbøyd mot Middelhavet.
 * - Dynamiske indikatorer for gradient, jetstrøm, vind og nedbørsavvik.
 */
export function NaoInteractiveSimulator() {
  const [phase, setPhase] = useState<"positive" | "neutral" | "negative">("positive");
  const uid = useId().replace(/:/g, "");

  return (
    <div className="space-y-4">
      {/* Fasevelgerknapper */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setPhase("positive")}
          className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition shadow-sm ${
            phase === "positive"
              ? "bg-amber-500 text-slate-950 ring-2 ring-amber-400"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          1. Positiv fase (NAO+) · Stor trykkforskjell
        </button>
        <button
          type="button"
          onClick={() => setPhase("neutral")}
          className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition shadow-sm ${
            phase === "neutral"
              ? "bg-teal-600 text-white ring-2 ring-teal-400"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          2. Nøytral tilstand · Normalgradient
        </button>
        <button
          type="button"
          onClick={() => setPhase("negative")}
          className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition shadow-sm ${
            phase === "negative"
              ? "bg-sky-600 text-white ring-2 ring-sky-400"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          3. Negativ fase (NAO−) · Liten trykkforskjell & Blokkering
        </button>
      </div>

      <FigureFrame
        heading={
          phase === "positive"
            ? "NAO+ (Positiv fase): Dyp Island-L + sterk Azor-H → Sonal motorvei mot Norge"
            : phase === "neutral"
            ? "Normaltilstand: Moderat trykkgradient og vekslende vestavær"
            : "NAO− (Negativ fase): Svak gradient → Meandrerende jet, blokkerende kulde i Norge og regn i Sør-Europa"
        }
        caption={
          phase === "positive"
            ? "Under NAO+ er trykkgradienten mellom Azorhøytrykket og Islandslavtrykket ekstra bratt (ofte >50 hPa). Den geostrofiske kraftbalansen gir en sterk, rett og sonal polarjet som trekkes nordover. Stormbanen peker som en spyletråle mot Vestlandet og Nordvest-Europa, med store mengder mild atlantisk fuktighet, orografisk regn og kraftig vind. Middelhavet domineres av stabilt høytrykk med tørt vær og tørkefare."
            : phase === "neutral"
            ? "I nøytral tilstand er trykkforskjellen gjennomsnittlig (~20–25 hPa). Polarjeten har moderate bølger, og stormene følger den klassiske ruten over Nord-Atlanteren mot De britiske øyer, Nordsjøen og Skandinavia med typisk vekslende kystvær."
            : "Under NAO− svekkes både Islandslavtrykket og Azorhøytrykket kraftig. Den svake trykkgradienten gjør at polarjeten mister moment og meandrerer i dype planetære Rossby-bølger. Et mektig kvasistasjonært høytrykk (blokkering) etablerer seg ofte over Skandinavia eller Grønland, og tvinger lavtrykkene sørover mot Spania og Middelhavet. Norge opplever tørr, iskald kontinentalluft fra Sibir/Arktis."
        }
      >
        <svg
          viewBox="0 0 920 520"
          className="mx-auto h-auto w-full max-w-5xl select-none"
          role="img"
          aria-label="Interaktivt kart over NAO-systemet over Nord-Atlanteren"
        >
          <defs>
            {/* Pilmarkører */}
            <marker id={`${uid}-arrow-gold`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 2 L10 6 L0 10 z" fill="#f59e0b" />
            </marker>
            <marker id={`${uid}-arrow-cold`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 2 L10 6 L0 10 z" fill="#38bdf8" />
            </marker>
            <marker id={`${uid}-arrow-rain`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 2 L10 6 L0 10 z" fill="#7eb8c9" />
            </marker>
            <marker id={`${uid}-arrow-teal`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 2 L10 6 L0 10 z" fill="#2dd4bf" />
            </marker>

            {/* Bevegelsesspor for animerte partikler i jetstrømmen */}
            <path id={`${uid}-jet-pos`} d="M 60 270 C 180 260, 320 230, 470 215 C 600 200, 720 185, 870 175" fill="none" />
            <path id={`${uid}-jet-neu`} d="M 60 290 C 200 280, 340 240, 480 250 C 620 260, 740 210, 870 200" fill="none" />
            <path id={`${uid}-jet-neg`} d="M 60 300 C 180 300, 260 200, 360 210 C 460 220, 520 400, 650 410 C 760 415, 820 340, 870 310" fill="none" />

            {/* Stormbanespor for lavtrykkssykler */}
            <path id={`${uid}-storm-pos`} d="M 120 320 Q 340 240 500 210 T 800 160" fill="none" />
            <path id={`${uid}-storm-neu`} d="M 120 320 Q 380 280 540 250 T 800 200" fill="none" />
            <path id={`${uid}-storm-neg`} d="M 120 320 Q 320 330 460 370 T 780 410" fill="none" />
          </defs>

          {/* Havbunn / atmosfærebakgrunn */}
          <rect width="920" height="520" fill="#0c151c" rx="10" />

          {/* Havrutenett / breddegrader */}
          <line x1="40" y1="120" x2="880" y2="120" stroke="#1e2c38" strokeDasharray="4 4" strokeWidth="1" />
          <text x="50" y="115" fill="#475569" fontSize="10" fontFamily={font}>70°N (Arktis)</text>
          
          <line x1="40" y1="240" x2="880" y2="240" stroke="#1e2c38" strokeDasharray="4 4" strokeWidth="1" />
          <text x="50" y="235" fill="#475569" fontSize="10" fontFamily={font}>55°N (Norge / Nordsjøen)</text>

          <line x1="40" y1="390" x2="880" y2="390" stroke="#1e2c38" strokeDasharray="4 4" strokeWidth="1" />
          <text x="50" y="385" fill="#475569" fontSize="10" fontFamily={font}>35°N (Azorene / Middelhavet)</text>

          {/* ── LANDMASSER (STILISERT GEOGRAFI OVER NORD-ATLANTEREN) ── */}
          {/* Nord-Amerika */}
          <path
            d="M 40 180 C 80 180, 110 210, 130 260 C 145 300, 130 350, 90 410 L 40 430 Z"
            fill="#16222b"
            stroke="#2a3c4a"
            strokeWidth="1.2"
          />
          <text x="75" y="300" fill="#64748b" fontSize="12" fontWeight="700" fontFamily={font}>Nord-Amerika</text>

          {/* Grønland */}
          <path
            d="M 230 70 C 290 60, 360 80, 370 140 C 350 175, 280 180, 240 160 C 220 140, 210 90, 230 70 Z"
            fill="#1a2936"
            stroke="#334b5c"
            strokeWidth="1.2"
          />
          <text x="290" y="125" fill="#94a3b8" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily={font}>Grønland</text>

          {/* Island */}
          <path
            d="M 440 135 C 475 130, 500 142, 495 165 C 470 178, 440 168, 440 135 Z"
            fill="#233544"
            stroke={phase === "positive" ? "#f87171" : "#38bdf8"}
            strokeWidth={phase === "positive" ? "1.8" : "1.2"}
          />
          <text x="470" y="152" fill="#e2e8f0" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily={font}>Island</text>

          {/* De britiske øyer (UK / Irland) */}
          <path
            d="M 610 230 C 635 220, 650 240, 645 270 C 625 280, 605 260, 610 230 Z"
            fill="#182733"
            stroke="#2c4254"
            strokeWidth="1.2"
          />
          <text x="625" y="255" fill="#64748b" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily={font}>UK</text>

          {/* Skandinavia & Norge */}
          <path
            d="M 690 95 C 730 85, 770 110, 785 160 C 765 210, 735 225, 715 200 C 700 175, 685 130, 690 95 Z"
            fill={phase === "positive" ? "#1e3a38" : phase === "negative" ? "#1e2e42" : "#1b2d39"}
            stroke={phase === "positive" ? "#2dd4bf" : phase === "negative" ? "#38bdf8" : "#475569"}
            strokeWidth="1.5"
          />
          <text x="740" y="145" fill={phase === "positive" ? "#2dd4bf" : "#7dd3fc"} fontSize="13" fontWeight="800" textAnchor="middle" fontFamily={font}>
            Norge
          </text>

          {/* Vest- og Sør-Europa */}
          <path
            d="M 625 310 C 680 300, 730 320, 730 360 C 690 395, 630 405, 615 370 Z"
            fill="#192834"
            stroke="#2d4253"
            strokeWidth="1.2"
          />
          <text x="660" y="355" fill="#64748b" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily={font}>Iberia</text>
          <text x="760" y="385" fill="#38bdf8" opacity="0.6" fontSize="11" fontFamily={font}>Middelhavet</text>

          {/* Azorene */}
          <circle cx="380" cy="405" r="4" fill="#f59e0b" />
          <circle cx="390" cy="402" r="3" fill="#f59e0b" />
          <circle cx="370" cy="408" r="2.5" fill="#f59e0b" />
          <text x="380" y="426" fill="#f59e0b" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily={font}>Azorene</text>

          {/* ── FASE 1: POSITIV NAO (NAO+) ── */}
          {phase === "positive" && (
            <g id="nao-positive-layer">
              {/* Dyp Island-lavtrykk (L) med roterende syklon-isobarer */}
              <g transform="translate(470, 155)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="14s" repeatCount="indefinite" />
                  <ellipse cx="0" cy="0" rx="55" ry="42" fill="none" stroke="#ef4444" strokeWidth="1.6" strokeDasharray="8 5" opacity="0.85" />
                  <ellipse cx="0" cy="0" rx="85" ry="60" fill="none" stroke="#ef4444" strokeWidth="1.3" strokeDasharray="12 6" opacity="0.65" />
                  <ellipse cx="0" cy="0" rx="120" ry="80" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="16 8" opacity="0.45" />
                </g>
                <circle cx="0" cy="0" r="24" fill="#1c1917" stroke="#ef4444" strokeWidth="2.5" />
                <text x="0" y="7" fill="#ef4444" fontSize="19" fontWeight="900" textAnchor="middle" fontFamily={font}>L</text>
                <text x="0" y="38" fill="#fca5a5" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily={font}>975 hPa</text>
                <text x="0" y="50" fill="#fca5a5" opacity="0.8" fontSize="10" textAnchor="middle" fontFamily={font}>Ekstremt dypt</text>
              </g>

              {/* Kraftig Azor-høytrykk (H) med roterende antisyklon-isobarer */}
              <g transform="translate(380, 405)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="18s" repeatCount="indefinite" />
                  <ellipse cx="0" cy="0" rx="65" ry="46" fill="none" stroke="#22c55e" strokeWidth="1.6" strokeDasharray="10 5" opacity="0.85" />
                  <ellipse cx="0" cy="0" rx="100" ry="68" fill="none" stroke="#22c55e" strokeWidth="1.3" strokeDasharray="14 7" opacity="0.6" />
                  <ellipse cx="0" cy="0" rx="140" ry="90" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="18 9" opacity="0.4" />
                </g>
                <circle cx="0" cy="0" r="24" fill="#14291e" stroke="#22c55e" strokeWidth="2.5" />
                <text x="0" y="7" fill="#22c55e" fontSize="19" fontWeight="900" textAnchor="middle" fontFamily={font}>H</text>
                <text x="0" y="38" fill="#86efac" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily={font}>1035 hPa</text>
                <text x="0" y="50" fill="#86efac" opacity="0.8" fontSize="10" textAnchor="middle" fontFamily={font}>Svært kraftig</text>
              </g>

              {/* Trykkgradient-pil */}
              <line x1="395" y1="375" x2="455" y2="190" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 4" markerEnd={`url(#${uid}-arrow-gold)`} />
              <rect x="440" y="270" width="135" height="34" rx="4" fill="#1e2417" stroke="#f59e0b" strokeWidth="1" />
              <text x="507" y="285" fill="#f59e0b" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily={font}>Bratt gradient (ΔP)</text>
              <text x="507" y="298" fill="#fef08a" fontSize="10" textAnchor="middle" fontFamily={font}>ΔP ≈ 60 hPa (Kraftig)</text>

              {/* Polarjeten: Sterk, rett og sonal motorvei rett mot Norge */}
              <path
                d="M 60 270 C 180 260, 320 230, 470 215 C 600 200, 720 185, 870 175"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="24"
                opacity="0.25"
                strokeLinecap="round"
              />
              <path
                d="M 60 270 C 180 260, 320 230, 470 215 C 600 200, 720 185, 870 175"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="5"
                strokeDasharray="18 9"
              />

              {/* Animerte partikler i jetstrømmen mot Norge */}
              {Array.from({ length: 6 }).map((_, i) => (
                <circle key={`jet-pos-${i}`} r="4.5" fill="#ffffff">
                  <animateMotion dur="2.4s" repeatCount="indefinite" begin={`-${i * 0.4}s`}>
                    <mpath href={`#${uid}-jet-pos`} />
                  </animateMotion>
                </circle>
              ))}

              <text x="280" y="225" fill="#fef08a" fontSize="13" fontWeight="900" fontFamily={font}>
                Rett, sonal polarjet (~200 km/t) ➔ ➔
              </text>

              {/* Drivende lavtrykkssenter langs stormbanen */}
              <g>
                <circle r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="1.8">
                  <animateMotion dur="3.8s" repeatCount="indefinite">
                    <mpath href={`#${uid}-storm-pos`} />
                  </animateMotion>
                </circle>
              </g>

              {/* Vær over Norge */}
              <g transform="translate(730, 180)">
                <ellipse cx="20" cy="15" rx="35" ry="16" fill="#334155" opacity="0.9" />
                <ellipse cx="40" cy="10" rx="25" ry="14" fill="#475569" opacity="0.9" />
                <text x="30" y="18" fill="#ffffff" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily={font}>Uvær / Regn</text>
                <line x1="15" y1="28" x2="10" y2="46" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="28" y1="28" x2="23" y2="46" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="42" y1="28" x2="37" y2="46" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              </g>
              <rect x="700" y="70" width="190" height="48" rx="6" fill="#132a2e" stroke="#2dd4bf" strokeWidth="1.2" />
              <text x="795" y="88" fill="#2dd4bf" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily={font}>Norge under NAO+:</text>
              <text x="795" y="105" fill="#e6fffa" fontSize="11" textAnchor="middle" fontFamily={font}>Mildt, vindfullt, flom & brevekst</text>

              {/* Sør-Europa */}
              <rect x="620" y="440" width="220" height="48" rx="6" fill="#2a2015" stroke="#f59e0b" strokeWidth="1.2" />
              <text x="730" y="458" fill="#f59e0b" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily={font}>Sør-Europa under NAO+:</text>
              <text x="730" y="475" fill="#fef3c7" fontSize="11" textAnchor="middle" fontFamily={font}>Tørt, solrikt, tørkefare & avlingssvikt</text>
            </g>
          )}

          {/* ── FASE 2: NØYTRAL TILSTAND ── */}
          {phase === "neutral" && (
            <g id="nao-neutral-layer">
              <g transform="translate(470, 155)">
                <ellipse cx="0" cy="0" rx="60" ry="42" fill="none" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.6" />
                <circle cx="0" cy="0" r="22" fill="#1c1917" stroke="#ef4444" strokeWidth="2" />
                <text x="0" y="7" fill="#ef4444" fontSize="18" fontWeight="800" textAnchor="middle" fontFamily={font}>L</text>
                <text x="0" y="34" fill="#fca5a5" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily={font}>1005 hPa</text>
              </g>

              <g transform="translate(380, 405)">
                <ellipse cx="0" cy="0" rx="70" ry="50" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="8 5" opacity="0.6" />
                <circle cx="0" cy="0" r="22" fill="#14291e" stroke="#22c55e" strokeWidth="2" />
                <text x="0" y="7" fill="#22c55e" fontSize="18" fontWeight="800" textAnchor="middle" fontFamily={font}>H</text>
                <text x="0" y="34" fill="#86efac" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily={font}>1022 hPa</text>
              </g>

              <path
                d="M 60 290 C 200 280, 340 240, 480 250 C 620 260, 740 210, 870 200"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="16"
                opacity="0.25"
                strokeLinecap="round"
              />
              <path
                d="M 60 290 C 200 280, 340 240, 480 250 C 620 260, 740 210, 870 200"
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="4"
                strokeDasharray="14 7"
              />

              {Array.from({ length: 5 }).map((_, i) => (
                <circle key={`jet-neu-${i}`} r="4" fill="#ffffff">
                  <animateMotion dur="3.5s" repeatCount="indefinite" begin={`-${i * 0.7}s`}>
                    <mpath href={`#${uid}-jet-neu`} />
                  </animateMotion>
                </circle>
              ))}

              {/* Drivende lavtrykk i nøytral fase */}
              <circle r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5">
                <animateMotion dur="4.5s" repeatCount="indefinite">
                  <mpath href={`#${uid}-storm-neu`} />
                </animateMotion>
              </circle>

              <text x="280" y="275" fill="#5eead4" fontSize="12" fontWeight="700" fontFamily={font}>
                Moderat vestavind (~140 km/t) ➔
              </text>

              <rect x="680" y="70" width="200" height="46" rx="6" fill="#13242e" stroke="#38bdf8" strokeWidth="1" />
              <text x="780" y="88" fill="#38bdf8" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily={font}>Normaltilstand i Norge:</text>
              <text x="780" y="104" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontFamily={font}>Vekslende kystvær og normale snøfall</text>
            </g>
          )}

          {/* ── FASE 3: NEGATIV NAO (NAO−) ── */}
          {phase === "negative" && (
            <g id="nao-negative-layer">
              <g transform="translate(470, 155)">
                <ellipse cx="0" cy="0" rx="45" ry="30" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.45" />
                <circle cx="0" cy="0" r="19" fill="#1c1917" stroke="#ef4444" strokeWidth="1.5" />
                <text x="0" y="6" fill="#ef4444" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily={font}>L</text>
                <text x="0" y="28" fill="#fca5a5" fontSize="10" textAnchor="middle" fontFamily={font}>1014 hPa</text>
                <text x="0" y="40" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily={font}>Svekket</text>
              </g>

              <g transform="translate(380, 405)">
                <ellipse cx="0" cy="0" rx="45" ry="30" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 4" opacity="0.45" />
                <circle cx="0" cy="0" r="19" fill="#14291e" stroke="#22c55e" strokeWidth="1.5" />
                <text x="0" y="6" fill="#22c55e" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily={font}>H</text>
                <text x="0" y="28" fill="#86efac" fontSize="10" textAnchor="middle" fontFamily={font}>1018 hPa</text>
                <text x="0" y="40" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily={font}>Svekket</text>
              </g>

              {/* BLOKKERENDE HØYTRYKK OVER SKANDINAVIA */}
              <g transform="translate(730, 160)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="25s" repeatCount="indefinite" />
                  <ellipse cx="0" cy="0" rx="60" ry="46" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="8 5" opacity="0.9" />
                  <ellipse cx="0" cy="0" rx="90" ry="70" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="12 6" opacity="0.6" />
                </g>
                <circle cx="0" cy="0" r="25" fill="#0c2333" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="0" y="8" fill="#38bdf8" fontSize="20" fontWeight="900" textAnchor="middle" fontFamily={font}>H</text>
                <text x="0" y="38" fill="#bae6fd" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily={font}>BLOKKERING</text>
                <text x="0" y="50" fill="#7dd3fc" fontSize="10" textAnchor="middle" fontFamily={font}>Sibirkulde (-25 °C)</text>
              </g>

              <path d="M 880 120 Q 820 130 780 150" stroke="#38bdf8" strokeWidth="3" markerEnd={`url(#${uid}-arrow-cold)`} />
              <text x="830" y="110" fill="#bae6fd" fontSize="11" fontWeight="800" fontFamily={font}>Arktisk kuldeluft ➔</text>

              {/* Meandrerende jetstrøm sørover mot Middelhavet */}
              <path
                d="M 60 300 C 180 300, 260 200, 360 210 C 460 220, 520 400, 650 410 C 760 415, 820 340, 870 310"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="20"
                opacity="0.25"
                strokeLinecap="round"
              />
              <path
                d="M 60 300 C 180 300, 260 200, 360 210 C 460 220, 520 400, 650 410 C 760 415, 820 340, 870 310"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4.5"
                strokeDasharray="16 8"
              />

              {Array.from({ length: 6 }).map((_, i) => (
                <circle key={`jet-neg-${i}`} r="4.5" fill="#ffffff">
                  <animateMotion dur="4.8s" repeatCount="indefinite" begin={`-${i * 0.8}s`}>
                    <mpath href={`#${uid}-jet-neg`} />
                  </animateMotion>
                </circle>
              ))}

              <text x="310" y="185" fill="#7dd3fc" fontSize="12" fontWeight="800" fontFamily={font}>
                Rossby-rygg ↗
              </text>
              <text x="560" y="445" fill="#38bdf8" fontSize="12" fontWeight="800" fontFamily={font}>
                Sørgående stormbane mot Middelhavet ➔
              </text>

              {/* Drivende lavtrykk mot Middelhavet */}
              <g>
                <circle r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5">
                  <animateMotion dur="4.2s" repeatCount="indefinite">
                    <mpath href={`#${uid}-storm-neg`} />
                  </animateMotion>
                </circle>
              </g>

              {/* Frost / Snøkrystall-ikon over Norge */}
              <g transform="translate(800, 185)">
                <circle cx="0" cy="0" r="16" fill="#082236" stroke="#38bdf8" strokeWidth="1.5" />
                <path d="M 0 -10 L 0 10 M -10 0 L 10 0 M -7 -7 L 7 7 M -7 7 L 7 -7" stroke="#bae6fd" strokeWidth="1.6" />
                <text x="0" y="24" fill="#7dd3fc" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily={font}>Frost / Is</text>
              </g>

              {/* Flom- og uværsikon over Middelhavet */}
              <g transform="translate(710, 395)">
                <ellipse cx="15" cy="10" rx="25" ry="12" fill="#334155" opacity="0.9" />
                <ellipse cx="30" cy="7" rx="18" ry="10" fill="#475569" opacity="0.9" />
                <line x1="12" y1="20" x2="8" y2="34" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
                <line x1="22" y1="20" x2="18" y2="34" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
                <line x1="32" y1="20" x2="28" y2="34" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
                <text x="22" y="44" fill="#bae6fd" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily={font}>Flomfare</text>
              </g>

              <rect x="680" y="55" width="220" height="52" rx="6" fill="#0f2638" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="790" y="75" fill="#7dd3fc" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily={font}>Norge under NAO−:</text>
              <text x="790" y="94" fill="#e0f2fe" fontSize="11" textAnchor="middle" fontFamily={font}>Streng kulde, tørt, inversjon & strømkrise</text>

              <rect x="580" y="460" width="240" height="48" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
              <text x="700" y="478" fill="#38bdf8" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily={font}>Sør-Europa under NAO−:</text>
              <text x="700" y="495" fill="#bae6fd" fontSize="11" textAnchor="middle" fontFamily={font}>Vått, kraftige lavtrykk og flomfare i Spania/Italia</text>
            </g>
          )}
        </svg>

        {/* Sammenligningstabell / Metrikkpanel under simuleringen */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <div className="rounded-lg border border-border bg-background/80 p-3 text-center">
            <span className="text-xs text-muted-foreground">Trykkgradient (ΔP)</span>
            <p className={`mt-1 font-mono text-base font-bold ${
              phase === "positive" ? "text-amber-500" : phase === "neutral" ? "text-teal-400" : "text-sky-400"
            }`}>
              {phase === "positive" ? "ΔP ≈ 60 hPa (Ekstrem)" : phase === "neutral" ? "ΔP ≈ 22 hPa (Normal)" : "ΔP ≈ 4 hPa (Svekket)"}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background/80 p-3 text-center">
            <span className="text-xs text-muted-foreground">Polarjetens mønster</span>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {phase === "positive" ? "Sonal (rett & rask)" : phase === "neutral" ? "Moderat sonal" : "Meandrerende / Splittet"}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background/80 p-3 text-center">
            <span className="text-xs text-muted-foreground">Vintervær i Norge</span>
            <p className={`mt-1 text-sm font-semibold ${phase === "positive" ? "text-teal-400" : phase === "neutral" ? "text-foreground" : "text-sky-300"}`}>
              {phase === "positive" ? "Mildt, vått og stormfullt" : phase === "neutral" ? "Varierende kystklima" : "Streng sibirkulde og tørt"}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background/80 p-3 text-center">
            <span className="text-xs text-muted-foreground">Vær i Middelhavet</span>
            <p className={`mt-1 text-sm font-semibold ${phase === "positive" ? "text-amber-400" : phase === "neutral" ? "text-foreground" : "text-teal-300"}`}>
              {phase === "positive" ? "Tørt og solrikt (tørke)" : phase === "neutral" ? "Normale regnskyll" : "Mye nedbør, lavtrykk & flom"}
            </p>
          </div>
        </div>
      </FigureFrame>
    </div>
  );
}

/**
 * NaoPhasesComparisonDiagram:
 * Erstatning for Figur 1 (fig-nao-faser.svg).
 * Viser en ren, høyoppløselig to-panels vektorsammenligning av NAO+ og NAO−.
 */
export function NaoPhasesComparisonDiagram() {
  return (
    <Diagram
      title="Positiv vs. negativ NAO: Den atmosfæriske trykkvippen"
      heading="Figur 1. Positiv og negativ NAO over Nord-Atlanteren"
      caption="Venstre panel (NAO+): Bratt trykkgradient mellom et forsterket dypt Islandslavtrykk og et mektig Azorhøytrykk. Polarjeten og stormbanen danner en sonal motorvei rett mot Vestlandet med mildt, vindfullt vær og store nedbørmengder, mens Middelhavet opplever tørke. Høyre panel (NAO−): Svak trykkgradient gjør polarjeten ustabil og meandrerende. Et mektig kvasistasjonært høytrykk (blokkering) etablerer seg over Skandinavia og trekker tørr arktisk sprengkulde inn over Norge, mens stormbanen presses sørover mot Middelhavet."
      viewBox="0 0 920 440"
      wide
    >
      {(m) => (
        <>
          {/* PANEL 1: POSITIV FASE (NAO+) */}
          <rect x="20" y="30" width="430" height="395" rx="8" fill="#101920" stroke={C.dim} strokeWidth="1.2" />
          <rect x="20" y="30" width="430" height="36" rx="8" fill="#1c2c27" />
          <L x="35" y="53" fill={C.teal} size={13} weight={800}>
            A. Positiv fase (NAO+) · Stor trykkforskjell
          </L>

          {/* Kartkonturer NAO+ */}
          {/* Grønland */}
          <path d="M 80 80 C 130 75, 170 90, 160 135 C 130 155, 90 145, 80 80 Z" fill="#182733" stroke={C.dim} />
          <L x="120" y="115" fill={C.muted} size={10} weight={700} anchor="middle">Grønland</L>

          {/* Island */}
          <path d="M 195 130 C 225 125, 240 135, 235 150 C 215 160, 195 150, 195 130 Z" fill="#203444" stroke="#ef4444" strokeWidth="1.5" />
          <L x="215" y="145" fill="#fca5a5" size={9} weight={800} anchor="middle">Island</L>

          {/* Norge / Skandinavia */}
          <path d="M 330 90 C 355 85, 375 105, 385 140 C 370 170, 350 180, 340 160 Z" fill="#1b3935" stroke="#2dd4bf" strokeWidth="1.5" />
          <L x="360" y="135" fill="#2dd4bf" size={11} weight={800} anchor="middle">Norge</L>

          {/* UK */}
          <path d="M 290 185 C 305 180, 315 195, 310 215 C 295 220, 285 205, 290 185 Z" fill="#1a2835" stroke={C.dim} />
          
          {/* Iberia / Sør-Europa */}
          <path d="M 295 250 C 330 245, 355 260, 350 290 L 300 290 Z" fill="#1a2835" stroke={C.dim} />
          <L x="325" y="275" fill={C.muted} size={10} weight={600} anchor="middle">Iberia</L>

          {/* Trykksentre NAO+ */}
          {/* Islandslavtrykk L */}
          <circle cx="215" cy="145" r="38" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.8" />
          <circle cx="215" cy="145" r="22" fill="#1f1416" stroke="#ef4444" strokeWidth="2.2" />
          <L x="215" y="152" fill="#ef4444" size={18} weight={900} anchor="middle">L</L>
          <L x="215" y="174" fill="#fca5a5" size={10} weight={800} anchor="middle">975 hPa (Dypt)</L>

          {/* Azorhøytrykk H */}
          <circle cx="170" cy="285" r="42" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.8" />
          <circle cx="170" cy="285" r="22" fill="#13241b" stroke="#22c55e" strokeWidth="2.2" />
          <L x="170" y="292" fill="#22c55e" size={18} weight={900} anchor="middle">H</L>
          <L x="170" y="314" fill="#86efac" size={10} weight={800} anchor="middle">1035 hPa (Sterkt)</L>

          {/* Trykkgradientpil */}
          <Arrow d="M 180 260 L 205 175" marker={m.warm} color="#f59e0b" width={2.5} />
          <L x="212" y="222" fill="#fbbf24" size={10} weight={800}>Bratt gradient (ΔP)</L>

          {/* Polarjet NAO+ */}
          <path d="M 50 220 C 130 215, 230 185, 335 155 L 420 140" fill="none" stroke="#f59e0b" strokeWidth="14" opacity="0.25" strokeLinecap="round" />
          <path d="M 50 220 C 130 215, 230 185, 335 155 L 420 140" fill="none" stroke="#fbbf24" strokeWidth="3.5" strokeDasharray="10 5" />
          <Arrow d="M 260 180 L 305 165" marker={m.warm} color="#fbbf24" width={3} />
          <L x="280" y="160" fill="#fef08a" size={11} weight={800}>Sonal jet (~200 km/t) ➔</L>

          {/* Konsekvenskort venstre */}
          <rect x="35" y="340" width="190" height="70" rx="5" fill="#122525" stroke="#2dd4bf" strokeWidth="1" />
          <L x="45" y="358" fill="#2dd4bf" size={11} weight={800}>Norge (NAO+):</L>
          <L x="45" y="375" fill="#e6fffa" size={10}>• Milde vintertemperaturer</L>
          <L x="45" y="390" fill="#e6fffa" size={10}>• Kraftig orografisk regn</L>
          <L x="45" y="403" fill="#e6fffa" size={10}>• Stor snømengde & brevekst</L>

          <rect x="240" y="340" width="195" height="70" rx="5" fill="#231d16" stroke="#f59e0b" strokeWidth="1" />
          <L x="250" y="358" fill="#f59e0b" size={11} weight={800}>Sør-Europa (NAO+):</L>
          <L x="250" y="375" fill="#fef3c7" size={10}>• Høytrykksblokkering</L>
          <L x="250" y="390" fill="#fef3c7" size={10}>• Tørt, solrikt og frostnetter</L>
          <L x="250" y="403" fill="#fef3c7" size={10}>• Tørkekrise for landbruket</L>


          {/* PANEL 2: NEGATIV FASE (NAO−) */}
          <rect x="470" y="30" width="430" height="395" rx="8" fill="#101920" stroke={C.dim} strokeWidth="1.2" />
          <rect x="470" y="30" width="430" height="36" rx="8" fill="#192634" />
          <L x="485" y="53" fill={C.cold} size={13} weight={800}>
            B. Negativ fase (NAO−) · Liten trykkforskjell & Blokkering
          </L>

          {/* Kartkonturer NAO− */}
          <path d="M 530 80 C 580 75, 620 90, 610 135 C 580 155, 540 145, 530 80 Z" fill="#182733" stroke={C.dim} />
          <L x="570" y="115" fill={C.muted} size={10} weight={700} anchor="middle">Grønland</L>

          <path d="M 645 130 C 675 125, 690 135, 685 150 C 665 160, 645 150, 645 130 Z" fill="#203444" stroke={C.dim} />
          <L x="665" y="145" fill={C.muted} size={9} weight={700} anchor="middle">Island</L>

          {/* Norge / Skandinavia under NAO− */}
          <path d="M 780 90 C 805 85, 825 105, 835 140 C 820 170, 800 180, 790 160 Z" fill="#162739" stroke="#38bdf8" strokeWidth="1.5" />
          <L x="810" y="135" fill="#7dd3fc" size={11} weight={800} anchor="middle">Norge</L>

          <path d="M 740 185 C 755 180, 765 195, 760 215 C 745 220, 735 205, 740 185 Z" fill="#1a2835" stroke={C.dim} />

          <path d="M 745 250 C 780 245, 805 260, 800 290 L 750 290 Z" fill="#1a2835" stroke={C.dim} />
          <L x="775" y="275" fill={C.muted} size={10} weight={600} anchor="middle">Iberia</L>

          {/* Svekket L og H */}
          <circle cx="665" cy="145" r="18" fill="#1c181b" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
          <L x="665" y="151" fill="#fca5a5" size={13} weight={700} anchor="middle">L</L>
          <L x="665" y="170" fill={C.muted} size={9} anchor="middle">1014 hPa</L>

          <circle cx="620" cy="285" r="18" fill="#16241d" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 3" />
          <L x="620" y="291" fill="#86efac" size={13} weight={700} anchor="middle">H</L>
          <L x="620" y="310" fill={C.muted} size={9} anchor="middle">1018 hPa</L>

          {/* Blokkerende høytrykk over Skandinavia */}
          <circle cx="805" cy="140" r="38" fill="#0c2333" stroke="#38bdf8" strokeWidth="2.2" />
          <L x="805" y="147" fill="#38bdf8" size={20} weight={900} anchor="middle">H</L>
          <L x="805" y="170" fill="#bae6fd" size={10} weight={800} anchor="middle">BLOKKERING</L>
          <L x="805" y="183" fill="#7dd3fc" size={9} anchor="middle">1040 hPa</L>

          {/* Sibirkulde-pil */}
          <Arrow d="M 880 110 L 835 125" marker={m.cold} color="#38bdf8" width={2.5} />
          <L x="860" y="105" fill="#bae6fd" size={9} weight={800}>Sibirkulde ➔</L>

          {/* Meandrerende jet NAO− */}
          <path d="M 500 240 C 580 240, 630 160, 700 170 C 760 180, 750 300, 840 310" fill="none" stroke="#38bdf8" strokeWidth="13" opacity="0.22" strokeLinecap="round" />
          <path d="M 500 240 C 580 240, 630 160, 700 170 C 760 180, 750 300, 840 310" fill="none" stroke="#38bdf8" strokeWidth="3.2" strokeDasharray="10 5" />
          <Arrow d="M 750 280 L 785 305" marker={m.cold} color="#38bdf8" width={3} />
          <L x="630" y="240" fill="#7dd3fc" size={10} weight={800}>Meandrerende jet</L>
          <L x="760" y="325" fill="#38bdf8" size={10} weight={800}>Stormbane sørover ➔</L>

          {/* Konsekvenskort høyre */}
          <rect x="485" y="340" width="190" height="70" rx="5" fill="#0f2638" stroke="#38bdf8" strokeWidth="1" />
          <L x="495" y="358" fill="#7dd3fc" size={11} weight={800}>Norge (NAO−):</L>
          <L x="495" y="375" fill="#e0f2fe" size={10}>• Streng sibirkulde (−20 °C)</L>
          <L x="495" y="390" fill="#e0f2fe" size={10}>• Tørt klarvær og inversjon</L>
          <L x="495" y="403" fill="#e0f2fe" size={10}>• Høyt energiforbruk & strømkrise</L>

          <rect x="690" y="340" width="195" height="70" rx="5" fill="#1b2432" stroke="#38bdf8" strokeWidth="1" />
          <L x="700" y="358" fill="#38bdf8" size={11} weight={800}>Sør-Europa (NAO−):</L>
          <L x="700" y="375" fill="#bae6fd" size={10}>• Stormbanen treffer sør</L>
          <L x="700" y="390" fill="#bae6fd" size={10}>• Kraftige lavtrykk og regnskyll</L>
          <L x="700" y="403" fill="#bae6fd" size={10}>• Flomfare i Spania/Italia</L>
        </>
      )}
    </Diagram>
  );
}

/**
 * NaoDomainDiagram:
 * Erstatning for Figur 2 (fig-nao-omrade.svg).
 * Viser det geografiske domenet for NAO, breddegrader, Hadley-cellens nedsynkning,
 * polarfronten og den geostrofiske vindbalansen.
 */
export function NaoDomainDiagram() {
  return (
    <Diagram
      title="Det nordatlantiske domenet for NAO og geostrofisk vind"
      heading="Figur 2. Det nordatlantiske domenet og drivkreftene for NAO"
      caption="NAO styres av samspillet mellom to semi-permanente trykksystemer: det subtropiske Azorhøytrykket ved 30°–40°N (dannet av nedsynkende luft i Hadley-cellen) og det subpolare Islandslavtrykket ved 60°–65°N (dannet av sykloner langs polarfronten). Trykkgradientkraften (PGF) virker nordover fra høyt trykk mot lavt trykk. Jordrotasjonens Coriolis-kraft (CF) avbøyer luften mot høyre på den nordlige halvkule. I den geostrofiske balansen resulterer dette i den kraftige vestavinden u_g som styrer atlantiske stormer rett inn mot Norskehavet og Skandinavia."
      viewBox="0 0 920 430"
      wide
    >
      {(m) => (
        <>
          {/* Kartområde venstre (x: 20-560) */}
          <rect x="25" y="35" width="540" height="375" rx="8" fill="#101920" stroke={C.dim} />

          {/* Breddegradslinjer */}
          <line x1="35" y1="90" x2="555" y2="90" stroke="#1e2c38" strokeDasharray="3 3" />
          <L x="40" y="85" fill={C.muted} size={10}>70°N (Arktis)</L>

          <line x1="35" y1="170" x2="555" y2="170" stroke="#1e2c38" strokeDasharray="3 3" />
          <L x="40" y="165" fill={C.muted} size={10}>60°N (Island / Norge)</L>

          <line x1="35" y1="260" x2="555" y2="260" stroke="#1e2c38" strokeDasharray="3 3" />
          <L x="40" y="255" fill={C.muted} size={10}>45°N (Biscaya / Midlere bredder)</L>

          <line x1="35" y1="345" x2="555" y2="345" stroke="#1e2c38" strokeDasharray="3 3" />
          <L x="40" y="340" fill={C.muted} size={10}>30°N (Azorene / Subtropene)</L>

          {/* Landkonturer */}
          {/* Grønland */}
          <path d="M 80 90 C 130 80, 160 100, 155 145 C 125 165, 95 150, 80 90 Z" fill="#182733" stroke={C.dim} />
          <L x="120" y="125" fill={C.muted} size={10} weight={700} anchor="middle">Grønland</L>

          {/* Island */}
          <path d="M 210 150 C 235 145, 250 155, 245 170 C 230 180, 210 170, 210 150 Z" fill="#203444" stroke="#ef4444" strokeWidth="1.5" />
          <L x="230" y="165" fill="#fca5a5" size={10} weight={800} anchor="middle">Island</L>

          {/* Norge / Skandinavia */}
          <path d="M 370 100 C 400 95, 430 120, 440 170 C 415 200, 390 205, 380 180 Z" fill="#1b3935" stroke="#2dd4bf" strokeWidth="1.6" />
          <L x="410" y="145" fill="#2dd4bf" size={12} weight={800} anchor="middle">Norge</L>
          <L x="410" y="160" fill="#a7f3d0" size={9} anchor="middle">Utløpet av stormbanen</L>

          {/* UK */}
          <path d="M 315 205 C 330 200, 345 215, 340 235 C 325 240, 310 225, 315 205 Z" fill="#1a2835" stroke={C.dim} />
          <L x="330" y="222" fill={C.muted} size={9} anchor="middle">UK</L>

          {/* Iberia */}
          <path d="M 320 285 C 360 280, 385 295, 380 330 L 325 330 Z" fill="#1a2835" stroke={C.dim} />
          <L x="350" y="310" fill={C.muted} size={10} weight={600} anchor="middle">Iberia</L>

          {/* Azorene */}
          <circle cx="180" cy="340" r="5" fill="#f59e0b" />
          <circle cx="192" cy="337" r="3.5" fill="#f59e0b" />
          <circle cx="170" cy="342" r="3" fill="#f59e0b" />
          <L x="180" y="360" fill="#f59e0b" size={11} weight={800} anchor="middle">Azorene (H)</L>

          {/* Islandslavtrykk L */}
          <circle cx="230" cy="165" r="22" fill="#1f1416" stroke="#ef4444" strokeWidth="2" />
          <L x="230" y="172" fill="#ef4444" size={17} weight={900} anchor="middle">L</L>

          {/* Azorhøytrykk H */}
          <circle cx="180" cy="325" r="22" fill="#13241b" stroke="#22c55e" strokeWidth="2" />
          <L x="180" y="332" fill="#22c55e" size={17} weight={900} anchor="middle">H</L>

          {/* KRAFTBALANSE I FLUKT (Geostrofisk balanse) */}
          <g transform="translate(280, 240)">
            <circle cx="0" cy="0" r="6" fill="#f8fafc" />
            <Arrow d="M 0 0 L 0 -50" marker={m.warm} color="#f59e0b" width={2.5} />
            <L x="8" y="-30" fill="#f59e0b" size={10} weight={700}>PGF (Trykkgradient mot nord)</L>

            <Arrow d="M 0 0 L 0 50" marker={m.teal} color="#2dd4bf" width={2.5} />
            <L x="8" y="40" fill="#2dd4bf" size={10} weight={700}>CF (Coriolis mot sør)</L>

            <Arrow d="M 0 0 L 75 0" marker={m.warm} color="#fbbf24" width={4} />
            <L x="35" y="-8" fill="#fef08a" size={11} weight={900}>u_g (Vestavind mot Norge)</L>
          </g>

          {/* Stormbanebånd */}
          <path d="M 80 300 Q 230 220 375 165" fill="none" stroke="#f59e0b" strokeWidth="8" opacity="0.25" />
          <path d="M 80 300 Q 230 220 375 165" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 4" />
          <L x="180" y="245" fill="#fef08a" size={10} weight={700}>Nordatlantisk stormbane ➔</L>


          {/* HØYRE FORKLARINGSPANEL (x: 585-900) */}
          <rect x="585" y="35" width="310" height="375" rx="8" fill="#101920" stroke={C.dim} />
          
          <rect x="595" y="45" width="290" height="78" rx="6" fill="#13241b" stroke="#22c55e" strokeWidth="1" />
          <L x="607" y="65" fill="#22c55e" size={12} weight={800}>1. Azorhøytrykket (30°–40°N)</L>
          <L x="607" y="82" fill="#dcfce7" size={10}>• Subtropisk høytrykksområde</L>
          <L x="607" y="96" fill="#dcfce7" size={10}>• Dannet av nedsynkende luft i Hadley-cellen</L>
          <L x="607" y="110" fill="#86efac" size={10}>• Stabilt, adiabatisk oppvarmet og tørt</L>

          <rect x="595" y="132" width="290" height="78" rx="6" fill="#1f1416" stroke="#ef4444" strokeWidth="1" />
          <L x="607" y="152" fill="#ef4444" size={12} weight={800}>2. Islandslavtrykket (60°–65°N)</L>
          <L x="607" y="169" fill="#fee2e2" size={10}>• Subpolart dynamisk lavtrykksområde</L>
          <L x="607" y="183" fill="#fee2e2" size={10}>• Polarfronten: Kollisjon mellom varm og kald luft</L>
          <L x="607" y="197" fill="#fca5a5" size={10}>• Kontinuerlig syklonutvikling og lavt trykk</L>

          <rect x="595" y="219" width="290" height="85" rx="6" fill="#1a251b" stroke="#f59e0b" strokeWidth="1" />
          <L x="607" y="239" fill="#f59e0b" size={12} weight={800}>3. Geostrofisk balanse</L>
          <L x="607" y="258" fill="#fef08a" size={10} weight={700}>u_g = − (1 / ρf) · (∂P / ∂y)</L>
          <L x="607" y="274" fill="#fef9c3" size={10}>• PGF dytter lufta nordover mot Island</L>
          <L x="607" y="289" fill="#fef9c3" size={10}>• Coriolis avbøyer 90° til høyre → Vestavind!</L>

          <rect x="595" y="313" width="290" height="85" rx="6" fill="#122525" stroke="#2dd4bf" strokeWidth="1" />
          <L x="607" y="333" fill="#2dd4bf" size={12} weight={800}>4. Norge i utløpet av stormbanen</L>
          <L x="607" y="352" fill="#e6fffa" size={10}>• Vestlandet ligger rett i skuddlinjen</L>
          <L x="607" y="367" fill="#e6fffa" size={10}>• Gradientstyrken avgjør om vi får orkan eller</L>
          <L x="607" y="382" fill="#e6fffa" size={10}>  blokkerende sibirkulde</L>
        </>
      )}
    </Diagram>
  );
}

/**
 * NaoPositivePhaseDiagram:
 * Erstatning for Figur 3 (fig-nao-positiv.svg).
 * Detaljert værkart over positiv NAO med dyp gradient, rett polarjet,
 * milde vintre og orografisk regn i Norge, og tørke i Middelhavet.
 */
export function NaoPositivePhaseDiagram() {
  const uid = useId().replace(/:/g, "");
  return (
    <Diagram
      title="Positiv NAO (NAO+): Sonal motorvei mot Norge"
      heading="Figur 3. Positiv NAO (NAO+) — Sonal motorvei og mildt kystvær"
      caption="Under NAO+ forsterkes både Islandslavtrykket (<975 hPa) og Azorhøytrykket (>1035 hPa). Den bratte trykkgradienten (ofte >50–60 hPa) driver en rett, sonal polarjet i over 200 km/t mot Nord-Europa. Lavtrykk etter lavtrykk pumpes rett inn mot Vestlandet og Norskehavet med mild maritim luft, kyststormer og voldsom orografisk nedbør (snø i høyfjellet og brevekst). Samtidig skyter Azorhøytrykket en kile østover som gir vintertørke i Middelhavet."
      viewBox="0 0 900 430"
      wide
    >
      {(m) => (
        <>
          <defs>
            <marker id={`${uid}-arrow-gold`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 2 L10 6 L0 10 z" fill="#f59e0b" />
            </marker>
          </defs>
          <rect x="25" y="35" width="850" height="380" rx="8" fill="#0f1922" stroke={C.dim} />

          {/* Isobar-ringer for Islandslavtrykk L */}
          <ellipse cx="460" cy="140" rx="130" ry="85" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="8 5" opacity="0.4" />
          <ellipse cx="460" cy="140" rx="95" ry="65" fill="none" stroke="#ef4444" strokeWidth="1.4" strokeDasharray="6 4" opacity="0.65" />
          <ellipse cx="460" cy="140" rx="60" ry="42" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.85" />
          <circle cx="460" cy="140" r="24" fill="#201317" stroke="#ef4444" strokeWidth="2.5" />
          <L x="460" y="148" fill="#ef4444" size={20} weight={900} anchor="middle">L</L>
          <L x="460" y="174" fill="#fca5a5" size={11} weight={800} anchor="middle">975 hPa</L>
          <L x="460" y="187" fill="#fca5a5" size={9} anchor="middle">Islandslavtrykket (Ekstremt dypt)</L>

          {/* Isobar-ringer for Azorhøytrykk H */}
          <ellipse cx="370" cy="330" rx="150" ry="90" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="10 5" opacity="0.4" />
          <ellipse cx="370" cy="330" rx="105" ry="65" fill="none" stroke="#22c55e" strokeWidth="1.4" strokeDasharray="8 4" opacity="0.65" />
          <ellipse cx="370" cy="330" rx="65" ry="42" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeDasharray="6 3" opacity="0.85" />
          <circle cx="370" cy="330" r="24" fill="#13241b" stroke="#22c55e" strokeWidth="2.5" />
          <L x="370" y="338" fill="#22c55e" size={20} weight={900} anchor="middle">H</L>
          <L x="370" y="364" fill="#86efac" size={11} weight={800} anchor="middle">1035 hPa</L>
          <L x="370" y="377" fill="#86efac" size={9} anchor="middle">Azorhøytrykket (Ekstra mektig)</L>

          {/* Gradientpil */}
          <line x1="385" y1="295" x2="445" y2="175" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 4" markerEnd={`url(#${uid}-arrow-gold)`} />
          <rect x="425" y="225" width="135" height="34" rx="4" fill="#1d2315" stroke="#f59e0b" strokeWidth="1" />
          <L x="492" y="240" fill="#f59e0b" size={11} weight={800} anchor="middle">Bratt trykkgradient (ΔP)</L>
          <L x="492" y="253" fill="#fef08a" size={10} anchor="middle">ΔP ≈ 60 hPa (Kraftig)</L>

          {/* Polarjet motorvei */}
          <path d="M 60 250 C 180 240, 320 210, 480 195 C 620 180, 720 160, 850 145" fill="none" stroke="#f59e0b" strokeWidth="26" opacity="0.22" strokeLinecap="round" />
          <path d="M 60 250 C 180 240, 320 210, 480 195 C 620 180, 720 160, 850 145" fill="none" stroke="#fbbf24" strokeWidth="5" strokeDasharray="18 9" />
          <Arrow d="M 280 220 L 330 210" marker={m.warm} color="#fbbf24" width={3.5} />
          <Arrow d="M 620 178 L 670 170" marker={m.warm} color="#fbbf24" width={3.5} />
          <L x="280" y="195" fill="#fef08a" size={13} weight={900}>Sonal polarjet (~200 km/t) ➔ ➔</L>

          {/* Drivende lavtrykkssentre langs banen */}
          <circle cx="210" cy="235" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="1.8" />
          <L x="210" y="239" fill="#ffffff" size={9} weight={800} anchor="middle">L1</L>
          <circle cx="560" cy="186" r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="1.8" />
          <L x="560" y="190" fill="#ffffff" size={9} weight={800} anchor="middle">L2</L>
          <circle cx="730" cy="158" r="11" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          <L x="730" y="162" fill="#ffffff" size={10} weight={900} anchor="middle">L3</L>

          {/* Norge infoboks */}
          <rect x="680" y="55" width="180" height="75" rx="6" fill="#132a2e" stroke="#2dd4bf" strokeWidth="1.5" />
          <L x="770" y="74" fill="#2dd4bf" size={12} weight={800} anchor="middle">Norge under NAO+:</L>
          <L x="770" y="90" fill="#e6fffa" size={10} anchor="middle">• Milde vintre (+2 til +5 °C)</L>
          <L x="770" y="104" fill="#e6fffa" size={10} anchor="middle">• Ekstrem orografisk nedbør</L>
          <L x="770" y="118" fill="#e6fffa" size={10} anchor="middle">• Snøakkumulasjon & brevekst</L>

          {/* Sør-Europa infoboks */}
          <rect x="650" y="325" width="210" height="75" rx="6" fill="#2a2015" stroke="#f59e0b" strokeWidth="1.5" />
          <L x="755" y="344" fill="#f59e0b" size={12} weight={800} anchor="middle">Sør-Europa under NAO+:</L>
          <L x="755" y="360" fill="#fef3c7" size={10} anchor="middle">• Mektig høytrykksrygg blokkerer</L>
          <L x="755" y="374" fill="#fef3c7" size={10} anchor="middle">• Alvorlig vintertørke i Spania/Italia</L>
          <L x="755" y="388" fill="#fef3c7" size={10} anchor="middle">• Tørre vannmagasiner & avlingssvikt</L>
        </>
      )}
    </Diagram>
  );
}

/**
 * NaoNegativePhaseDiagram:
 * Erstatning for Figur 4 (fig-nao-negativ.svg).
 * Detaljert værkart over negativ NAO med svekket gradient, meandrerende jet,
 * blokkerende høytrykk over Skandinavia og arktisk kulde i Norge.
 */
export function NaoNegativePhaseDiagram() {
  return (
    <Diagram
      title="Negativ NAO (NAO−): Meandrerende jet og atmosfærisk blokkering"
      heading="Figur 4. Negativ NAO (NAO−) — Blokkering, sprengkulde og sørlig stormbane"
      caption="Under NAO− svekkes både Islandslavtrykket og Azorhøytrykket kraftig, og trykkgradienten faller mot null. Polarjeten mister fart og meandrerer i dype planetære Rossby-bølger. Et massivt blokkerende høytrykk parkerer over Skandinavia og trekker tørr, iskald kontinentalluft fra Sibir inn over Norge (streng sprengkulde, klarvær, inversjon og strømkrise). Samtidig tvinges stormbanen sørover og sender atlanterhavslavtrykk rett inn i Middelhavet med flom i Spania og Italia."
      viewBox="0 0 900 430"
      wide
    >
      {(m) => (
        <>
          <rect x="25" y="35" width="850" height="380" rx="8" fill="#0f1922" stroke={C.dim} />

          {/* Svekket Island-L */}
          <circle cx="450" cy="140" r="22" fill="#1c181b" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
          <L x="450" y="146" fill="#fca5a5" size={15} weight={800} anchor="middle">L</L>
          <L x="450" y="170" fill="#fca5a5" size={10} weight={700} anchor="middle">1014 hPa (Svekket)</L>

          {/* Svekket Azor-H */}
          <circle cx="370" cy="330" r="22" fill="#15241b" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 4" />
          <L x="370" y="336" fill="#86efac" size={15} weight={800} anchor="middle">H</L>
          <L x="370" y="360" fill="#86efac" size={10} weight={700} anchor="middle">1018 hPa (Svekket)</L>

          <L x="390" y="240" fill="#94a3b8" size={11} weight={700}>Slak trykkgradient (ΔP ≈ 4 hPa)</L>

          {/* Mektig blokkerende høytrykk over Skandinavia */}
          <ellipse cx="730" cy="150" rx="90" ry="70" fill="none" stroke="#38bdf8" strokeWidth="1.4" strokeDasharray="10 5" opacity="0.6" />
          <ellipse cx="730" cy="150" rx="60" ry="46" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 4" opacity="0.85" />
          <circle cx="730" cy="150" r="26" fill="#0b2438" stroke="#38bdf8" strokeWidth="2.8" />
          <L x="730" y="158" fill="#38bdf8" size={22} weight={900} anchor="middle">H</L>
          <L x="730" y="186" fill="#bae6fd" size={12} weight={800} anchor="middle">BLOKKERING</L>
          <L x="730" y="200" fill="#7dd3fc" size={10} anchor="middle">1042 hPa · Kvasistasjonært</L>

          {/* Sibirkulde / Arktisk luftstrøm */}
          <Arrow d="M 860 100 L 790 125" marker={m.cold} color="#38bdf8" width={3.5} />
          <Arrow d="M 830 160 L 775 195" marker={m.cold} color="#38bdf8" width={3} />
          <L x="825" y="85" fill="#bae6fd" size={11} weight={800}>Iskald polarluft fra Sibir ➔</L>

          {/* Meandrerende jetstrøm som dykker sørover */}
          <path
            d="M 60 280 C 180 280, 260 170, 370 175 C 480 180, 520 370, 650 375 C 760 380, 810 300, 860 270"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="24"
            opacity="0.2"
            strokeLinecap="round"
          />
          <path
            d="M 60 280 C 180 280, 260 170, 370 175 C 480 180, 520 370, 650 375 C 760 380, 810 300, 860 270"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="4.5"
            strokeDasharray="16 8"
          />
          <Arrow d="M 310 175 L 360 175" marker={m.cold} color="#38bdf8" width={3} />
          <Arrow d="M 570 330 L 615 365" marker={m.cold} color="#38bdf8" width={3} />
          <L x="290" y="150" fill="#7dd3fc" size={12} weight={800}>Rossby-rygg ↗</L>
          <L x="530" y="405" fill="#38bdf8" size={12} weight={800}>Sørgående stormbane mot Middelhavet ➔</L>

          {/* Drivende lavtrykk i sør */}
          <circle cx="670" cy="375" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="1.8" />
          <L x="670" y="379" fill="#ffffff" size={9} weight={800} anchor="middle">L</L>

          {/* Norge infoboks */}
          <rect x="640" y="240" width="220" height="75" rx="6" fill="#0f2638" stroke="#38bdf8" strokeWidth="1.5" />
          <L x="750" y="258" fill="#7dd3fc" size={12} weight={800} anchor="middle">Norge under NAO−:</L>
          <L x="750" y="274" fill="#e0f2fe" size={10} anchor="middle">• Sprengkulde (−20 til −35 °C)</L>
          <L x="750" y="288" fill="#e0f2fe" size={10} anchor="middle">• Tørt, klart og bakkeinversjon</L>
          <L x="750" y="302" fill="#e0f2fe" size={10} anchor="middle">• Frosne vannrør & strømprissjokk</L>

          {/* Sør-Europa infoboks */}
          <rect x="45" y="330" width="220" height="70" rx="6" fill="#1c2535" stroke="#38bdf8" strokeWidth="1.2" />
          <L x="155" y="348" fill="#38bdf8" size={12} weight={800} anchor="middle">Sør-Europa under NAO−:</L>
          <L x="155" y="365" fill="#bae6fd" size={10} anchor="middle">• Lavtrykkene tvinges sørover</L>
          <L x="155" y="379" fill="#bae6fd" size={10} anchor="middle">• Kraftig regn og storm i Spania/Italia</L>
          <L x="155" y="393" fill="#bae6fd" size={10} anchor="middle">• Flomfare og oversvømmelser</L>
        </>
      )}
    </Diagram>
  );
}

/**
 * NaoTimeSeriesDiagram:
 * Viser den historiske vinter-NAO-indeksen (DJFM) fra 1950 til 2024.
 * Illustrerer multidekadiske svingninger, Super-NAO+ på 1990-tallet,
 * bunnrekorden i 2010 og SSW-kulden i 2024.
 */
export function NaoTimeSeriesDiagram() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>("2010");

  // Representativ standardisert vinter-NAO-indeks (Hurrell DJFM stasjonsindeks / PC-indeks)
  const timeData = [
    { year: 1950, val: 0.8 },
    { year: 1952, val: 0.4 },
    { year: 1954, val: -0.6 },
    { year: 1956, val: -1.4 },
    { year: 1958, val: -1.2 },
    { year: 1960, val: -1.5 },
    { year: 1962, val: -1.8 },
    { year: 1963, val: -2.8 },
    { year: 1965, val: -1.9 },
    { year: 1967, val: -0.8 },
    { year: 1969, val: -2.2 },
    { year: 1971, val: -0.5 },
    { year: 1973, val: 1.2 },
    { year: 1975, val: 0.6 },
    { year: 1977, val: -1.1 },
    { year: 1979, val: -1.6 },
    { year: 1981, val: 0.3 },
    { year: 1983, val: 1.8 },
    { year: 1985, val: -1.2 },
    { year: 1987, val: -0.4 },
    { year: 1989, val: 3.1 },
    { year: 1990, val: 2.9 },
    { year: 1992, val: 2.5 },
    { year: 1993, val: 2.8 },
    { year: 1994, val: 2.3 },
    { year: 1995, val: 3.0 },
    { year: 1996, val: -2.6 },
    { year: 1998, val: 0.7 },
    { year: 2000, val: 2.1 },
    { year: 2002, val: 0.9 },
    { year: 2004, val: -0.3 },
    { year: 2006, val: -0.5 },
    { year: 2008, val: 1.4 },
    { year: 2010, val: -3.4 },
    { year: 2011, val: -1.8 },
    { year: 2012, val: 1.9 },
    { year: 2014, val: 1.5 },
    { year: 2015, val: 2.3 },
    { year: 2017, val: 0.8 },
    { year: 2019, val: 1.4 },
    { year: 2020, val: 2.6 },
    { year: 2021, val: -0.7 },
    { year: 2023, val: 0.5 },
    { year: 2024, val: -1.5 },
  ];

  return (
    <div className="space-y-4">
      <FigureFrame
        heading="Historisk tidsserie: Vinter-NAO-indeksen (DJFM) fra 1950 til i dag"
        caption="Diagrammet viser den normaliserte vinter-NAO-indeksen (desember–mars) basert på målinger av trykkdifferansen mellom Azorene/Lisboa og Island. Oransje stolper indikerer positive faser (NAO+) dominert av kraftig vestavind, mildvær og nedbør over Norge. Blå stolper indikerer negative faser (NAO−) dominert av blokkerende høytrykk og streng sibirkulde. Legg merke til de vedvarende kalde 1960-årene, den historiske 'Super-NAO+'-perioden 1989–1995, og den absolutte bunnrekorden under vinteren 2009/2010."
      >
        <div className="space-y-4">
          <svg viewBox="0 0 920 360" className="mx-auto h-auto w-full max-w-5xl select-none" role="img">
            {/* Bakgrunn */}
            <rect width="920" height="360" fill="#0f171c" rx="8" />

            {/* Rutenett og akser */}
            <line x1="60" y1="50" x2="880" y2="50" stroke="#1e2c38" strokeDasharray="3 3" />
            <text x="50" y="54" fill="#64748b" fontSize="10" textAnchor="end" fontFamily={font}>+3 σ</text>

            <line x1="60" y1="100" x2="880" y2="100" stroke="#1e2c38" strokeDasharray="3 3" />
            <text x="50" y="104" fill="#64748b" fontSize="10" textAnchor="end" fontFamily={font}>+2 σ</text>

            <line x1="60" y1="150" x2="880" y2="150" stroke="#1e2c38" strokeDasharray="3 3" />
            <text x="50" y="154" fill="#64748b" fontSize="10" textAnchor="end" fontFamily={font}>+1 σ</text>

            {/* 0-linje */}
            <line x1="60" y1="200" x2="880" y2="200" stroke="#475569" strokeWidth="1.5" />
            <text x="50" y="204" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="end" fontFamily={font}>0</text>

            <line x1="60" y1="250" x2="880" y2="250" stroke="#1e2c38" strokeDasharray="3 3" />
            <text x="50" y="254" fill="#64748b" fontSize="10" textAnchor="end" fontFamily={font}>−1 σ</text>

            <line x1="60" y1="300" x2="880" y2="300" stroke="#1e2c38" strokeDasharray="3 3" />
            <text x="50" y="304" fill="#64748b" fontSize="10" textAnchor="end" fontFamily={font}>−2 σ</text>

            {/* Stolper */}
            {timeData.map((d, i) => {
              const x = 70 + (i / (timeData.length - 1)) * 790;
              const barWidth = 11;
              const isPos = d.val >= 0;
              const barH = Math.abs(d.val) * 50;
              const y = isPos ? 200 - barH : 200;

              const isKey1995 = d.year >= 1989 && d.year <= 1995;
              const isKey2010 = d.year === 2010;
              const isKey2024 = d.year === 2024;

              return (
                <g key={`bar-${d.year}`} className="cursor-pointer" onClick={() => setSelectedEvent(d.year.toString())}>
                  <rect
                    x={x - barWidth / 2}
                    y={y}
                    width={barWidth}
                    height={Math.max(barH, 2)}
                    rx="2"
                    fill={
                      isKey2010
                        ? "#0284c7"
                        : isKey1995
                        ? "#f59e0b"
                        : isPos
                        ? "#d97706"
                        : "#38bdf8"
                    }
                    opacity={isKey2010 || isKey1995 || isKey2024 ? 1 : 0.75}
                  />
                  {d.year % 10 === 0 && (
                    <text x={x} y="335" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily={font}>
                      {d.year}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Fremhevede markører og etiketter */}
            {/* 1960-årene */}
            <rect x="150" y="270" width="80" height="20" rx="3" fill="#082336" stroke="#38bdf8" strokeWidth="1" />
            <text x="190" y="284" fill="#7dd3fc" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily={font}>
              Kalde 1960-år
            </text>

            {/* 1989–1995 Super-NAO+ */}
            <rect x="430" y="20" width="135" height="24" rx="4" fill="#2d1c0b" stroke="#f59e0b" strokeWidth="1.2" />
            <text x="497" y="36" fill="#fef08a" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily={font}>
              1989–1995: Super-NAO+ 🌊
            </text>
            <path d="M 497 45 L 497 58" stroke="#f59e0b" strokeWidth="1.5" />

            {/* 2010 Rekord-NAO- */}
            <rect x="625" y="315" width="145" height="24" rx="4" fill="#082336" stroke="#38bdf8" strokeWidth="1.2" />
            <text x="697" y="331" fill="#bae6fd" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily={font}>
              2010: Bunnrekord (−3,41) ❄️
            </text>
            <path d="M 697 314 L 697 302" stroke="#38bdf8" strokeWidth="1.5" />

            {/* 2024 SSW */}
            <rect x="800" y="240" width="105" height="22" rx="4" fill="#1b2432" stroke="#38bdf8" strokeWidth="1" />
            <text x="852" y="255" fill="#7dd3fc" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily={font}>
              2024: SSW-kulde 🌡️
            </text>
          </svg>

          {/* Forklarende infokort for historiske ekstremer */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">1989–1995 · Super-NAO+</span>
              <p className="mt-1 text-xs text-foreground/80 leading-relaxed">
                Den lengste sammenhengende perioden med ekstrem positiv NAO i moderne tid. Mildt, stormfullt (Nyttårsorkanen 1992), og enorme snømengder i fjellet som fikk maritime vestlandsbreer til å rykke frem flere hundre meter.
              </p>
            </div>

            <div className="rounded-lg border border-sky-500/40 bg-sky-500/5 p-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">2009/2010 · Tidenes bunnrekord</span>
              <p className="mt-1 text-xs text-foreground/80 leading-relaxed">
                Vinter-NAO-indeksen stupte til historiske −3,41. Et massivt kvasistasjonært høytrykk parkerte over Skandinavia i tre måneder. Oslofjorden frøs til, strømprisene eksploderte, og London/Paris opplevde snøkaos.
              </p>
            </div>

            <div className="rounded-lg border border-teal-500/40 bg-teal-500/5 p-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Januar 2024 · SSW-effekten</span>
              <p className="mt-1 text-xs text-foreground/80 leading-relaxed">
                Stratosfærisk oppvarming i romjulen 2023 forstyrret polarvirvelen og tippet NAO inn i en dyp negativ fase to uker senere. 6. januar 2024 falt temperaturen til −31,1 °C i Oslo og −44,0 °C i Kautokeino.
              </p>
            </div>
          </div>
        </div>
      </FigureFrame>
    </div>
  );
}

/**
 * NaoBlockeringDiagram:
 * Viser atmosfærisk blokkering over Skandinavia med fanevelger:
 * 1. Omega-blokkering (Ω)
 * 2. Rex-blokkering (Dipol: Høytrykk i nord & Lavtrykk i sør)
 */
export function NaoBlockeringDiagram() {
  const [blockingType, setBlockingType] = useState<"omega" | "rex">("omega");
  const uid = useId().replace(/:/g, "");

  return (
    <div className="space-y-4">
      {/* Typevelger */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setBlockingType("omega")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition shadow-sm ${
            blockingType === "omega"
              ? "bg-sky-600 text-white ring-2 ring-sky-400"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          1. Omega-blokkering (Ω) · Jetstrøm i bue rundt Skandinavia
        </button>
        <button
          type="button"
          onClick={() => setBlockingType("rex")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition shadow-sm ${
            blockingType === "rex"
              ? "bg-amber-600 text-white ring-2 ring-amber-400"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          2. Rex-blokkering (Dipol) · Høytrykk i nord & lavtrykk i sør
        </button>
      </div>

      <FigureFrame
        heading={
          blockingType === "omega"
            ? "Omega-blokkering (Ω): Høytrykk flankert av to lavtrykkstrau"
            : "Rex-blokkering: Dipol med høytrykk i nord og avsnørt lavtrykk i sør"
        }
        caption={
          blockingType === "omega"
            ? "Under en klassisk Omega-blokkering (formen som den greske bokstaven Ω) presses en mektig høytrykksrygg nordover over Skandinavia, flankert av to dype lavtrykkstrau over Atlanteren og Russland. Polarjeten tvinges i en kolossal bue nord for Norden. Skandinavia opplever ukevis med tørt klarvær, inversjon og sibirkulde, mens stormene presses sørover mot Middelhavet."
            : "Under en Rex-blokkering etablerer det seg en kvasistasjonær trykkdipol: et kraftig blokkerende høytrykk legger seg over Norskehavet og Skandinavia (rundt 65°N), mens et avsnørt lavtrykk (cut-off low) legger seg direkte sør for dette over Sentral- eller Sør-Europa (rundt 45°N). Polarjeten splittes fullstendig i to grener. I sonen mellom høytrykket og lavtrykket reverseres vinden til en kraftig og vedvarende østavind (retrograd strøm) som pumper kontinentalkulde fra Russland tvers over Europa."
        }
      >
        <svg viewBox="0 0 880 400" className="mx-auto h-auto w-full max-w-5xl select-none" role="img">
          <defs>
            <marker id={`${uid}-arrow-warm`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 2 L10 6 L0 10 z" fill="#fbbf24" />
            </marker>
            <marker id={`${uid}-arrow-cold`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 2 L10 6 L0 10 z" fill="#38bdf8" />
            </marker>
          </defs>

          <rect width="880" height="400" fill="#0f171c" rx="8" />

          {/* Norge-kontur */}
          <path d="M 440 100 C 470 90, 510 110, 520 160 C 500 210, 470 220, 450 200 Z" fill="#172e3d" stroke="#2f516b" strokeWidth="1.5" />
          <text x="480" y="155" fill="#7dd3fc" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily={font}>Norge</text>

          {/* ── 1. OMEGA-BLOKKERING ── */}
          {blockingType === "omega" && (
            <g id="omega-block">
              {/* Venstre trau */}
              <g transform="translate(240, 250)">
                <ellipse cx="0" cy="0" rx="55" ry="40" fill="#29181d" stroke="#ef4444" strokeWidth="1.6" strokeDasharray="5 4" />
                <circle cx="0" cy="0" r="18" fill="#1a1114" stroke="#ef4444" strokeWidth="2" />
                <text x="0" y="6" fill="#ef4444" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily={font}>L</text>
                <text x="0" y="28" fill="#fca5a5" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily={font}>Vestlig trau</text>
              </g>

              {/* Høyre trau */}
              <g transform="translate(700, 250)">
                <ellipse cx="0" cy="0" rx="55" ry="40" fill="#29181d" stroke="#ef4444" strokeWidth="1.6" strokeDasharray="5 4" />
                <circle cx="0" cy="0" r="18" fill="#1a1114" stroke="#ef4444" strokeWidth="2" />
                <text x="0" y="6" fill="#ef4444" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily={font}>L</text>
                <text x="0" y="28" fill="#fca5a5" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily={font}>Østlig trau</text>
              </g>

              {/* Høytrykket (Omega) */}
              <g transform="translate(470, 160)">
                <ellipse cx="0" cy="0" rx="80" ry="60" fill="#0e293b" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="28" fill="#081b29" stroke="#38bdf8" strokeWidth="3" />
                <text x="0" y="9" fill="#38bdf8" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily={font}>H</text>
                <text x="0" y="44" fill="#bae6fd" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily={font}>OMEGA (Ω)</text>
                <text x="0" y="58" fill="#7dd3fc" fontSize="10" textAnchor="middle" fontFamily={font}>1040 hPa · Kvasistasjonært</text>
              </g>

              {/* Omega-jet i bue rundt Norden */}
              <path
                d="M 60 290 L 170 280 C 230 280, 280 180, 340 100 C 400 30, 540 30, 600 100 C 660 180, 710 280, 770 280 L 860 270"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="20"
                opacity="0.2"
                strokeLinecap="round"
              />
              <path
                d="M 60 290 L 170 280 C 230 280, 280 180, 340 100 C 400 30, 540 30, 600 100 C 660 180, 710 280, 770 280 L 860 270"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="5"
                strokeDasharray="16 8"
              />

              <path d="M 120 285 L 160 282" stroke="#fbbf24" strokeWidth="3" markerEnd={`url(#${uid}-arrow-warm)`} />
              <path d="M 310 140 L 335 105" stroke="#fbbf24" strokeWidth="3" markerEnd={`url(#${uid}-arrow-warm)`} />
              <path d="M 450 48 L 490 48" stroke="#fbbf24" strokeWidth="3" markerEnd={`url(#${uid}-arrow-warm)`} />
              <path d="M 605 105 L 630 140" stroke="#fbbf24" strokeWidth="3" markerEnd={`url(#${uid}-arrow-warm)`} />
              <path d="M 790 280 L 830 275" stroke="#fbbf24" strokeWidth="3" markerEnd={`url(#${uid}-arrow-warm)`} />

              <rect x="60" y="340" width="760" height="36" rx="5" fill="#14232c" stroke={C.dim} />
              <text x="440" y="362" fill="#e2e8f0" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily={font}>
                Omega-formen (Ω): Jetstrømmen splittes og bøyer nordom Arktis før den graver seg sørover.
              </text>
            </g>
          )}

          {/* ── 2. REX-BLOKKERING (DIPOL) ── */}
          {blockingType === "rex" && (
            <g id="rex-block">
              {/* Høytrykk i nord (Skandinavia / 65°N) */}
              <g transform="translate(470, 120)">
                <ellipse cx="0" cy="0" rx="85" ry="55" fill="#0e293b" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="26" fill="#081b29" stroke="#38bdf8" strokeWidth="3" />
                <text x="0" y="9" fill="#38bdf8" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily={font}>H</text>
                <text x="0" y="42" fill="#bae6fd" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily={font}>REX HØYTRYKK (NORD)</text>
                <text x="0" y="55" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontFamily={font}>1038 hPa · 65°N</text>
              </g>

              {/* Lavtrykk i sør (Sentral-Europa / Middelhavet / 45°N) */}
              <g transform="translate(470, 275)">
                <ellipse cx="0" cy="0" rx="85" ry="55" fill="#29181d" stroke="#ef4444" strokeWidth="2" />
                <circle cx="0" cy="0" r="26" fill="#1a1114" stroke="#ef4444" strokeWidth="2.5" />
                <text x="0" y="9" fill="#ef4444" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily={font}>L</text>
                <text x="0" y="42" fill="#fca5a5" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily={font}>AVSNØRT LAVTRYKK (SØR)</text>
                <text x="0" y="55" fill="#fca5a5" fontSize="9" textAnchor="middle" fontFamily={font}>995 hPa · 45°N</text>
              </g>

              {/* Splittet jetstrøm: Nordlig gren */}
              <path d="M 60 200 C 180 190, 250 50, 470 45 C 680 50, 750 190, 860 190" fill="none" stroke="#fbbf24" strokeWidth="14" opacity="0.2" strokeLinecap="round" />
              <path d="M 60 200 C 180 190, 250 50, 470 45 C 680 50, 750 190, 860 190" fill="none" stroke="#fbbf24" strokeWidth="4" strokeDasharray="12 6" />
              <path d="M 450 45 L 490 45" stroke="#fbbf24" strokeWidth="3" markerEnd={`url(#${uid}-arrow-warm)`} />
              <text x="470" y="30" fill="#fef08a" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily={font}>Nordlig jetgren (Arktis) ➔</text>

              {/* Splittet jetstrøm: Sørlig gren */}
              <path d="M 60 200 C 180 210, 250 350, 470 355 C 680 350, 750 210, 860 200" fill="none" stroke="#fbbf24" strokeWidth="14" opacity="0.2" strokeLinecap="round" />
              <path d="M 60 200 C 180 210, 250 350, 470 355 C 680 350, 750 210, 860 200" fill="none" stroke="#fbbf24" strokeWidth="4" strokeDasharray="12 6" />
              <path d="M 450 355 L 490 355" stroke="#fbbf24" strokeWidth="3" markerEnd={`url(#${uid}-arrow-warm)`} />
              <text x="470" y="375" fill="#fef08a" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily={font}>Sørlig jetgren (Middelhavet) ➔</text>

              {/* Retrograd østavind mellom H og L */}
              <path d="M 620 195 L 320 195" stroke="#38bdf8" strokeWidth="4" strokeDasharray="8 4" markerEnd={`url(#${uid}-arrow-cold)`} />
              <rect x="360" y="180" width="220" height="28" rx="4" fill="#082336" stroke="#38bdf8" strokeWidth="1" />
              <text x="470" y="198" fill="#bae6fd" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily={font}>
                ◀ ◀ Reversert østavind (Sibirkulde)
              </text>
            </g>
          )}
        </svg>
      </FigureFrame>
    </div>
  );
}

/**
 * NaoSswBreakdownDiagram:
 * Viser hvordan en Sudden Stratospheric Warming (SSW) i polarvirvelen over Arktis
 * forplanter seg ned i troposfæren og tipper NAO over i en kraftig negativ fase.
 */
export function NaoSswBreakdownDiagram() {
  return (
    <Diagram
      title="Plutselig stratosfærisk oppvarming (SSW) og polarvirvelen"
      heading="Polarvirvelens kollaps: Fra stratosfærisk oppvarming (SSW) til NAO− i Norge"
      caption="Venstre panel: En sterk, intakt polarvirvel i stratosfæren sperrer arktisk sprengkulde inne ved polen og støtter en sterk, rett polarjet (typisk NAO+). Høyre panel: Planetære Rossby-bølger bryter oppover i stratosfæren og skaper en brå temperaturøkning på 30–50 °C (SSW). Polarvirvelen forskyves eller splittes i to. Sirkulasjonen reverseres, og i løpet av 2–4 uker forplanter signalet seg ned i troposfæren. Islandslavtrykket kollapser, og et mektig blokkerende høytrykk etablerer seg over Skandinavia med streng sibirkulde (dyp NAO−)."
      viewBox="0 0 880 400"
    >
      {(m) => (
        <>
          {/* Panel 1: Intakt polarvirvel (NAO+) */}
          <rect x="25" y="45" width="405" height="335" rx="8" fill="#111c24" stroke={C.dim} />
          <rect x="25" y="45" width="405" height="34" rx="8" fill="#172936" />
          <L x="45" y="68" fill={C.teal} size={13} weight={800}>
            A. Intakt polarvirvel (Støtter NAO+)
          </L>

          <circle cx="225" cy="180" r="85" fill="#0b1319" stroke={C.cold} strokeWidth="1.5" />
          
          <g transform="translate(225, 180)">
            <ellipse cx="0" cy="0" rx="70" ry="70" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray="12 6" />
            <circle cx="0" cy="0" r="45" fill="#072336" />
            <text x="0" y="-8" fill="#38bdf8" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily={font}>
              Kald kjerne
            </text>
            <text x="0" y="10" fill="#7dd3fc" fontSize="11" textAnchor="middle" fontFamily={font}>
              −80 °C (Arktis)
            </text>
            <text x="0" y="24" fill="#64748b" fontSize="9" textAnchor="middle" fontFamily={font}>
              10–50 km høyde
            </text>
          </g>

          <L x={225} y={285} fill={C.teal} size={12} weight={700} anchor="middle">
            Sterk sirkumpolar vestavind i stratosfæren
          </L>
          <L x={225} y={302} fill={C.muted} size={11} anchor="middle">
            Kulda forblir hermetisk innesperret over Arktis
          </L>

          <rect x="45" y="325" width="365" height="42" rx="5" fill="#16292e" stroke={C.teal} strokeWidth="1" />
          <L x={225} y={344} fill={C.teal} size={11} weight={800} anchor="middle">
            ➔ Rett, sonal polarjet mot Norge (NAO+)
          </L>
          <L x={225} y={358} fill={C.fg} size={10} anchor="middle">
            Milde atlantiske lavtrykk, orografisk regn og kyststormer
          </L>

          {/* Panel 2: SSW og vortex split (NAO−) */}
          <rect x="450" y="45" width="405" height="335" rx="8" fill="#111c24" stroke={C.dim} />
          <rect x="450" y="45" width="405" height="34" rx="8" fill="#2d1d24" />
          <L x={470} y={68} fill={C.warm} size={13} weight={800}>
            B. SSW: Polarvirvelen splittes (Utløser NAO−)
          </L>

          <g transform="translate(560, 180)">
            <ellipse cx="0" cy="0" rx="42" ry="42" fill="#082133" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
            <text x="0" y="4" fill="#7dd3fc" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily={font}>
              Kald kjerne 1
            </text>
          </g>

          <g transform="translate(740, 180)">
            <ellipse cx="0" cy="0" rx="42" ry="42" fill="#082133" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
            <text x="0" y="4" fill="#7dd3fc" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily={font}>
              Kald kjerne 2
            </text>
          </g>

          <g transform="translate(650, 150)">
            <ellipse cx="0" cy="0" rx="40" ry="25" fill="#7f1d1d" opacity="0.85" stroke="#ef4444" strokeWidth="1.5" />
            <text x="0" y="-3" fill="#fecaca" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily={font}>
              SSW: +40 °C!
            </text>
            <text x="0" y="11" fill="#fca5a5" fontSize="9" textAnchor="middle" fontFamily={font}>
              Brå stratosfæreoppvarming
            </text>
          </g>

          <Arrow d="M 690 235 L 610 235" marker={m.warm} color="#f59e0b" width={2.5} />
          <L x={650} y={252} fill="#f59e0b" size={11} weight={700} anchor="middle">
            Vinder reverseres til østlig retning
          </L>

          <Arrow d="M 650 265 L 650 315" marker={m.cold} color="#38bdf8" width={3} />
          <L x={650} y={290} fill="#38bdf8" size={10} weight={800} anchor="middle">
            Nedadgående signal (2–4 uker)
          </L>

          <rect x="470" y="325" width="365" height="42" rx="5" fill="#1c2536" stroke="#38bdf8" strokeWidth="1.2" />
          <L x={652} y={344} fill="#7dd3fc" size={11} weight={800} anchor="middle">
            ➔ Blokkerende høytrykk over Skandinavia (NAO−)
          </L>
          <L x={652} y={358} fill="#bae6fd" size={10} anchor="middle">
            Islandslavtrykket kollapser, arktisk kulde invaderer Norge
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * NaoRossbyDiagram:
 * Pedagogisk kart over Nord-Atlanteren som viser Rossby-bølger i polarjeten.
 */
export function NaoRossbyDiagram() {
  return (
    <Diagram
      title="Rossby-bølger over Nord-Atlanteren og Europa"
      heading="Rossby-bølger: rygger, daler og luftmasse-transport"
      caption="Polarjeten danner store planetære bølger (Rossby-bølger). En rygg bøyer nordover og bringer varm subtropisk luft mot Arktis, mens en dal (trau) graver sørover og fører med seg iskald arktisk luft. Sterke bølger bremser forflytningen og gir langvarige blokkerende værsituasjoner (typisk for NAO−). En rett jet uten store bølger gir derimot rask vestavind (NAO+)."
      viewBox="0 0 840 380"
    >
      {(m) => (
        <>
          <path
            d="M 40 120 C 70 110, 110 130, 120 180 C 130 230, 100 280, 50 310 L 30 310 Z"
            fill="#18242e"
            stroke={C.dim}
          />
          <L x={75} y={210} fill={C.muted} size={12} weight={600}>
            Nord-Amerika
          </L>

          <path
            d="M 230 70 C 270 65, 300 80, 310 115 C 290 145, 250 145, 230 130 Z"
            fill="#1e2c38"
            stroke={C.dim}
          />
          <L x={265} y={105} fill={C.muted} size={11} weight={600} anchor="middle">
            Grønland
          </L>

          <path
            d="M 490 190 C 510 185, 520 200, 515 225 C 500 230, 490 215, 490 190 Z"
            fill="#18242e"
            stroke={C.dim}
          />
          <path
            d="M 550 90 C 580 80, 610 100, 630 140 C 600 170, 580 180, 560 160 C 550 140, 545 110, 550 90 Z"
            fill="#18242e"
            stroke={C.dim}
          />
          <L x={590} y={135} fill={C.muted} size={12} weight={600}>
            Norge
          </L>

          <path
            d="M 500 270 C 560 260, 640 270, 690 300 L 480 300 Z"
            fill="#18242e"
            stroke={C.dim}
          />
          <L x={560} y={290} fill={C.muted} size={11} weight={600}>
            Middelhavet
          </L>

          <path
            d="M 90 90 C 140 120, 180 230, 240 250 C 180 250, 120 230, 90 90 Z"
            fill={C.cold}
            opacity={0.12}
          />
          <path
            d="M 240 250 C 310 260, 370 120, 440 100 C 420 180, 360 250, 240 250 Z"
            fill={C.warm}
            opacity={0.15}
          />
          <path
            d="M 440 100 C 510 90, 570 240, 640 250 C 580 260, 520 230, 440 100 Z"
            fill={C.cold}
            opacity={0.12}
          />

          <path
            d="M 50 140 C 120 170, 180 260, 240 260 C 320 260, 380 90, 450 90 C 520 90, 580 260, 650 260 C 720 260, 770 160, 810 140"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="12"
            strokeLinecap="round"
            opacity={0.25}
          />
          <path
            d="M 50 140 C 120 170, 180 260, 240 260 C 320 260, 380 90, 450 90 C 520 90, 580 260, 650 260 C 720 260, 770 160, 810 140"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="4"
            strokeDasharray="10 5"
          />

          <Arrow d="M 170 245 L 215 260" marker={m.warm} color="#fbbf24" width={3} />
          <Arrow d="M 330 180 L 365 140" marker={m.warm} color="#fbbf24" width={3} />
          <Arrow d="M 500 140 L 535 180" marker={m.warm} color="#fbbf24" width={3} />
          <Arrow d="M 680 240 L 725 210" marker={m.warm} color="#fbbf24" width={3} />

          <circle cx="200" cy="210" r="22" fill="#0f171c" stroke={C.low} strokeWidth="2.2" />
          <L x={200} y={217} fill={C.low} size={16} weight={700} anchor="middle">
            L
          </L>
          <L x={200} y={248} fill={C.low} size={11} weight={600} anchor="middle">
            Trau (Dal)
          </L>

          <circle cx="410" cy="130" r="22" fill="#0f171c" stroke={C.teal} strokeWidth="2.2" />
          <L x={410} y={137} fill={C.teal} size={16} weight={700} anchor="middle">
            H
          </L>
          <L x={410} y={168} fill={C.teal} size={11} weight={600} anchor="middle">
            Rygg
          </L>

          <circle cx="610" cy="210" r="22" fill="#0f171c" stroke={C.low} strokeWidth="2.2" />
          <L x={610} y={217} fill={C.low} size={16} weight={700} anchor="middle">
            L
          </L>
          <L x={610} y={248} fill={C.low} size={11} weight={600} anchor="middle">
            Trau (Dal)
          </L>

          <Arrow d="M 360 270 Q 380 200 420 170" marker={m.warm} color={C.warm} width={2.4} />
          <L x={350} y={240} fill={C.warm} size={11} weight={600}>
            Varm subtropisk luft nordover
          </L>

          <Arrow d="M 520 70 Q 560 140 590 190" marker={m.cold} color={C.cold} width={2.4} />
          <L x={555} y={90} fill={C.cold} size={11} weight={600}>
            Kald polarluft sørover
          </L>

          <rect x="50" y="325" width="740" height="42" rx="6" fill="#152028" stroke={C.dim} />
          <L x={70} y={345} fill={C.fg} size={12} weight={600}>
            Sonal jet (NAO+):
          </L>
          <L x={185} y={345} fill={C.muted} size={12}>
            Rette bølger, sterk vestavind rett mot Norge, milde stormer.
          </L>
          <L x={70} y={360} fill={C.fg} size={12} weight={600}>
            Meridional jet (NAO−):
          </L>
          <L x={205} y={360} fill={C.muted} size={12}>
            Dype bølger, blokkerende høytrykk, kuldeutbrudd eller fastlåst tørke.
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * NaoEnsoTeleconnectionDiagram:
 * To-panel sammenligning som forklarer Rossby-broen (telekonneksjon)
 * fra ENSO i Stillehavet til NAO i Nord-Atlanteren.
 */
export function NaoEnsoTeleconnectionDiagram() {
  return (
    <Diagram
      title="Fra ENSO til NAO: Den atmosfæriske broen"
      heading="Telekonneksjoner: Hvordan Stillehavet snakker med Atlanteren"
      caption="Tropisk konveksjon under El Niño og La Niña sender ut planetære bølgetog (PNA-mønster) over Nord-Amerika. El Niño forstyrrer ofte den arktiske polarvirvelen i stratosfæren, noe som forplanter seg ned og øker sannsynligheten for en negativ NAO (kaldere vintre). La Niña gir oftere en sterk, stabil polarvirvel og en rett polarjet mot Nord-Europa (NAO+)."
      viewBox="0 0 860 380"
    >
      {(m) => (
        <>
          <rect x="25" y="45" width="395" height="315" rx="8" fill="#121d24" stroke={C.dim} />
          <rect x="25" y="45" width="395" height="34" rx="8" fill="#1c2c37" />
          <L x={45} y={67} fill={C.warm} size={14} weight={700}>
            El Niño → Tendens mot NAO−
          </L>

          <rect x="45" y="95" width="90" height="45" rx="5" fill="#3a1c1c" stroke={C.warm} />
          <L x={90} y={114} fill={C.warm} size={11} weight={600} anchor="middle">
            Varmt hav
          </L>
          <L x={90} y={128} fill={C.muted} size={10} anchor="middle">
            Tropisk Stillehav
          </L>

          <Arrow d="M 140 115 Q 185 85 220 120" marker={m.warm} color={C.warm} width={2.2} />
          <Arrow d="M 220 120 Q 255 155 295 110" marker={m.warm} color={C.warm} width={2.2} />
          <L x={220} y={80} fill={C.muted} size={11} anchor="middle">
            Rossby-bølgetog (PNA)
          </L>

          <rect x="270" y="90" width="130" height="50" rx="5" fill="#241926" stroke="#c084fc" />
          <L x={335} y={110} fill="#d8b4fe" size={11} weight={700} anchor="middle">
            Svekket polarvirvel
          </L>
          <L x={335} y={126} fill={C.muted} size={10} anchor="middle">
            Stratosfærisk oppvarming (SSW)
          </L>

          <Arrow d="M 335 145 L 335 185" marker={m.cold} color="#d8b4fe" width={2.5} />
          <L x={345} y={170} fill="#d8b4fe" size={10}>
            Nedkobling
          </L>

          <rect x="45" y="195" width="355" height="150" rx="6" fill="#16222b" />
          <L x={60} y={218} fill={C.fg} size={13} weight={600}>
            Utfall i Nord-Atlanteren:
          </L>
          <circle cx="85" cy="245" r="14" fill="#0f171c" stroke={C.low} strokeWidth="1.8" />
          <L x={85} y={250} fill={C.low} size={12} weight={700} anchor="middle">
            L
          </L>
          <L x={110} y={250} fill={C.muted} size={11}>
            Svekket Islandslavtrykk
          </L>

          <circle cx="85" cy="278" r="14" fill="#0f171c" stroke={C.teal} strokeWidth="1.8" />
          <L x={85} y={283} fill={C.teal} size={12} weight={700} anchor="middle">
            H
          </L>
          <L x={110} y={283} fill={C.muted} size={11}>
            Svekket Azorhøytrykk
          </L>

          <path d="M 230 270 Q 280 230 330 280 Q 370 300 385 270" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
          <L x={310} y={245} fill="#fbbf24" size={10} weight={600} anchor="middle">
            Bølget jet
          </L>
          <L x={60} y={325} fill={C.cold} size={12} weight={600}>
            Resultat: Ofte kald, tørr blokkeringsvinter i Norge.
          </L>

          <rect x="440" y="45" width="395" height="315" rx="8" fill="#121d24" stroke={C.dim} />
          <rect x="440" y="45" width="395" height="34" rx="8" fill="#1c2c37" />
          <L x={460} y={67} fill={C.teal} size={14} weight={700}>
            La Niña → Tendens mot NAO+
          </L>

          <rect x="460" y="95" width="90" height="45" rx="5" fill="#152b36" stroke={C.teal} />
          <L x={505} y={114} fill={C.teal} size={11} weight={600} anchor="middle">
            Kjølig hav
          </L>
          <L x={505} y={128} fill={C.muted} size={10} anchor="middle">
            Øst-Stillehavet
          </L>

          <Arrow d="M 555 118 L 675 118" marker={m.teal} color={C.teal} width={2.2} />
          <L x={615} y={105} fill={C.muted} size={11} anchor="middle">
            Svakere forstyrrelser
          </L>

          <rect x="685" y="90" width="130" height="50" rx="5" fill="#162e3b" stroke={C.teal} />
          <L x={750} y={110} fill={C.teal} size={11} weight={700} anchor="middle">
            Sterk polarvirvel
          </L>
          <L x={750} y={126} fill={C.muted} size={10} anchor="middle">
            Kald, stabil kjerne
          </L>

          <Arrow d="M 750 145 L 750 185" marker={m.teal} color={C.teal} width={2.5} />
          <L x={760} y={170} fill={C.teal} size={10}>
            Støtter zonalt drag
          </L>

          <rect x="460" y="195" width="355" height="150" rx="6" fill="#16222b" />
          <L x={475} y={218} fill={C.fg} size={13} weight={600}>
            Utfall i Nord-Atlanteren:
          </L>
          <circle cx="500" cy="245" r="14" fill="#0f171c" stroke={C.low} strokeWidth="1.8" />
          <L x={500} y={250} fill={C.low} size={12} weight={700} anchor="middle">
            L
          </L>
          <L x={525} y={250} fill={C.muted} size={11}>
            Dypt Islandslavtrykk
          </L>

          <circle cx="500" cy="278" r="14" fill="#0f171c" stroke={C.teal} strokeWidth="1.8" />
          <L x={500} y={283} fill={C.teal} size={12} weight={700} anchor="middle">
            H
          </L>
          <L x={525} y={283} fill={C.muted} size={11}>
            Kraftig Azorhøytrykk
          </L>

          <Arrow d="M 645 260 L 785 260" marker={m.warm} color="#fbbf24" width={3.5} />
          <L x={715} y={250} fill="#fbbf24" size={10} weight={600} anchor="middle">
            Rett, sterk jet
          </L>
          <L x={475} y={325} fill={C.warm} size={12} weight={600}>
            Resultat: Milde, fuktige atlanterhavsstormer mot Norge.
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * NaoIndexStationsDiagram:
 * Pedagogisk kart over stasjonene Ponta Delgada (Azorene) / Lisboa
 * og Reykjavík (Island) som brukes til å definere NAO-indeksen.
 */
export function NaoIndexStationsDiagram() {
  return (
    <Diagram
      title="NAO-indeksen: Målestasjonene og trykkdifferansen"
      heading="NAO-indeksen: To målestasjoner som definerer vippa"
      caption="NAO-indeksen beregnes ved å måle normalisert lufttrykk i sør (Ponta Delgada på Azorene eller Lisboa) minus lufttrykk i nord (Reykjavík eller Stykkishólmur på Island). Stor differanse (NAO+) betyr kraftig trykkgradient og sterk vestavind mot Norge. Liten differanse (NAO−) betyr svak vestavind og ofte blokkerende kulde."
      viewBox="0 0 860 380"
    >
      {(m) => (
        <>
          <rect x="25" y="45" width="500" height="315" rx="8" fill="#121d24" stroke={C.dim} />

          <path d="M 60 70 C 110 65, 140 85, 140 120 C 100 135, 70 120, 60 70 Z" fill="#18242e" stroke={C.dim} />
          <L x={95} y={95} fill={C.muted} size={10} weight={600} anchor="middle">
            Grønland
          </L>

          <path d="M 210 100 C 235 95, 255 105, 250 125 C 230 135, 210 125, 210 100 Z" fill="#203240" stroke={C.teal} strokeWidth="1.2" />
          
          <path d="M 370 70 C 400 65, 430 90, 440 140 C 410 160, 390 140, 375 110 Z" fill="#18242e" stroke={C.dim} />
          <L x={405} y={110} fill={C.muted} size={11} weight={600}>
            Norge
          </L>

          <path d="M 320 145 C 340 140, 350 160, 345 180 C 330 185, 320 170, 320 145 Z" fill="#18242e" stroke={C.dim} />

          <path d="M 330 240 C 380 235, 410 250, 400 295 L 340 295 Z" fill="#18242e" stroke={C.dim} />

          <circle cx="230" cy="115" r="7" fill={C.low} stroke="#0f171c" strokeWidth="2" />
          <circle cx="230" cy="115" r="16" fill="none" stroke={C.low} strokeWidth="1.2" strokeDasharray="3 3" />
          <L x={230} y={92} fill={C.low} size={13} weight={700} anchor="middle">
            Reykjavík (Island)
          </L>
          <L x={230} y={145} fill={C.muted} size={10} anchor="middle">
            64,1° N · Islandslavtrykket
          </L>

          <circle cx="170" cy="255" r="7" fill={C.teal} stroke="#0f171c" strokeWidth="2" />
          <circle cx="170" cy="255" r="16" fill="none" stroke={C.teal} strokeWidth="1.2" strokeDasharray="3 3" />
          <L x={170} y={282} fill={C.teal} size={12} weight={700} anchor="middle">
            Ponta Delgada (Azorene)
          </L>
          <L x={170} y={298} fill={C.muted} size={10} anchor="middle">
            37,7° N · Azorhøytrykket
          </L>

          <circle cx="342" cy="265" r="5" fill={C.teal} stroke="#0f171c" strokeWidth="1.5" />
          <L x={354} y={270} fill={C.teal} size={11} weight={600}>
            Lisboa
          </L>

          <line x1="175" y1="240" x2="225" y2="130" stroke={C.white} strokeDasharray="4 4" strokeWidth="1.6" opacity="0.6" />
          <Arrow d="M 185 210 L 215 150" marker={m.warm} color="#fbbf24" width={2} />
          <L x={215} y={185} fill="#fbbf24" size={11} weight={600}>
            Trykkgradient (ΔP)
          </L>

          <rect x="545" y="45" width="290" height="315" rx="8" fill="#121d24" stroke={C.dim} />
          <L x={565} y={75} fill={C.fg} size={14} weight={700}>
            Hvordan indeksen tolkes
          </L>

          <rect x="565" y="90" width="250" height="42" rx="5" fill="#18242e" stroke={C.dim} />
          <L x={690} y={116} fill={C.teal} size={13} weight={600} anchor="middle">
            NAO = P(sør) − P(nord)
          </L>

          <rect x="565" y="150" width="250" height="85" rx="6" fill="#17282b" stroke={C.teal} strokeWidth="1.5" />
          <L x={580} y={172} fill={C.teal} size={13} weight={700}>
            Positiv NAO (NAO+ &gt; 0)
          </L>
          <L x={580} y={192} fill={C.fg} size={11}>
            • Dypere Island-L og sterkere Azor-H
          </L>
          <L x={580} y={208} fill={C.fg} size={11}>
            • Stor trykkgradient → kraftig vestavind
          </L>
          <L x={580} y={224} fill={C.warm} size={11} weight={600}>
            → Mild, våt og vindfull vinter i Norge
          </L>

          <rect x="565" y="250" width="250" height="85" rx="6" fill="#251b22" stroke={C.cold} strokeWidth="1.5" />
          <L x={580} y={272} fill={C.cold} size={13} weight={700}>
            Negativ NAO (NAO− &lt; 0)
          </L>
          <L x={580} y={292} fill={C.fg} size={11}>
            • Både Island-L og Azor-H er svake
          </L>
          <L x={580} y={308} fill={C.fg} size={11}>
            • Liten gradient → svak, bølget jetstrøm
          </L>
          <L x={580} y={324} fill={C.cold} size={11} weight={600}>
            → Kald, tørr vinter i Norge (blokkering)
          </L>
        </>
      )}
    </Diagram>
  );
}
