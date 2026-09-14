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

              <g>
                <circle r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5">
                  <animateMotion dur="4.2s" repeatCount="indefinite">
                    <mpath href={`#${uid}-storm-neg`} />
                  </animateMotion>
                </circle>
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
          <L x={45} y={68} fill={C.teal} size={13} weight={800}>
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
 * NaoBlockeringDiagram:
 * Viser atmosfærisk blokkering (Omega- og Rex-blokkering) over Skandinavia.
 */
export function NaoBlockeringDiagram() {
  return (
    <Diagram
      title="Atmosfærisk blokkering over Nord-Europa under NAO−"
      heading="Blokkerende høytrykk: Omega- og Rex-blokkering som låser vinterværet"
      caption="Under en sterkt negativ NAO meandrerer polarjeten i enorme Rossby-bølger. Når en varm rygg forsterkes over Skandinavia, kan den avsnøres fra vestavindsbeltet og danne et massivt, kvasistasjonært blokkerende høytrykk. Den klassiske Omega-blokkeringen (formen som den greske bokstaven Ω) tvinger jetstrømmen og atlantiske stormer i en bue rundt Norden. Skandinavia opplever ukevis med klarvær, inversjon og ekstrem sibirkulde, mens lavtrykkene presses inn over Sør-Europa med voldsom nedbør."
      viewBox="0 0 880 390"
    >
      {(m) => (
        <>
          <rect x="30" y="45" width="820" height="325" rx="8" fill="#111c24" stroke={C.dim} />

          <path
            d="M 440 90 C 470 80, 510 100, 520 150 C 500 200, 470 210, 450 190 Z"
            fill="#172e3d"
            stroke="#2f516b"
            strokeWidth="1.5"
          />
          <text x="480" y="145" fill="#7dd3fc" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily={font}>Norge</text>

          {/* Venstre trau */}
          <g transform="translate(240, 240)">
            <ellipse cx="0" cy="0" rx="55" ry="40" fill="#29181d" stroke="#ef4444" strokeWidth="1.6" strokeDasharray="5 4" />
            <circle cx="0" cy="0" r="18" fill="#1a1114" stroke="#ef4444" strokeWidth="2" />
            <text x="0" y="6" fill="#ef4444" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily={font}>L</text>
            <text x="0" y="28" fill="#fca5a5" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily={font}>Vestlig trau</text>
          </g>

          {/* Høyre trau */}
          <g transform="translate(700, 240)">
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
            <text x="0" y="44" fill="#bae6fd" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily={font}>BLOKKERING (Ω)</text>
            <text x="0" y="58" fill="#7dd3fc" fontSize="10" textAnchor="middle" fontFamily={font}>1040 hPa · Kvasistasjonært</text>
          </g>

          {/* Omega-jet */}
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

          <Arrow d="M 120 285 L 160 282" marker={m.warm} color="#fbbf24" width={3} />
          <Arrow d="M 310 140 L 335 105" marker={m.warm} color="#fbbf24" width={3} />
          <Arrow d="M 450 50 L 490 50" marker={m.warm} color="#fbbf24" width={3} />
          <Arrow d="M 605 105 L 630 140" marker={m.warm} color="#fbbf24" width={3} />
          <Arrow d="M 790 280 L 830 275" marker={m.warm} color="#fbbf24" width={3} />

          <rect x="60" y="325" width="760" height="35" rx="5" fill="#14232c" stroke={C.dim} />
          <text x="440" y="347" fill="#e2e8f0" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily={font}>
            Blokkeringen fungerer som en stein i elva: Jetstrømmen splittes og tvinges rundt Norden.
          </text>
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
