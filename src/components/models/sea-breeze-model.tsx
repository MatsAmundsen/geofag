import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Wind, CloudRain, AlertTriangle, Compass } from "lucide-react";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

type TimeMode = "day" | "night";

export function SeaBreezeModel() {
  const [timeMode, setTimeMode] = useState<TimeMode>("day");
  const [cloudCover, setCloudCover] = useState<"clear" | "overcast">("clear");
  const [hour, setHour] = useState<number>(14);

  // Switch presets
  function selectMode(mode: TimeMode) {
    setTimeMode(mode);
    setHour(mode === "day" ? 14 : 4);
  }

  const isDay = timeMode === "day";
  const tempLand = isDay
    ? cloudCover === "clear"
      ? 24
      : 18
    : cloudCover === "clear"
      ? 9
      : 13;
  const tempSea = isDay ? 16 : 15;
  const tempDiff = tempLand - tempSea;
  const breezeStrength =
    cloudCover === "overcast"
      ? Math.max(1, Math.round(Math.abs(tempDiff) * 0.4))
      : Math.max(2, Math.round(Math.abs(tempDiff) * 0.9));

  return (
    <ModelFrame
      kicker="Interaktiv simulator"
      title="Solgangsbris: Sjøbris og landbris i døgnsyklus"
      lead="Ulik varmekapasitet mellom land og hav driver et lokalt termisk kretsløp. Utforsk hvordan solinnstråling, nattlig utstråling og skydekke styrer trykkgradienten og vindretningen."
      toolbar={
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant={isDay ? "default" : "secondary"}
            onClick={() => selectMode("day")}
            className="gap-1.5"
          >
            <Sun className="size-4 text-amber-400" />
            Dag (Sjøbris)
          </Button>
          <Button
            type="button"
            size="sm"
            variant={!isDay ? "default" : "secondary"}
            onClick={() => selectMode("night")}
            className="gap-1.5"
          >
            <Moon className="size-4 text-sky-300" />
            Natt (Landbris)
          </Button>
        </div>
      }
    >
      <div>
        <ModelMarkers />

        {/* Fanevelger */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <ModelTab active={timeMode === "day"} onClick={() => selectMode("day")}>
              1. Dag: Pålandsvind (kl. 12–18)
            </ModelTab>
            <ModelTab active={timeMode === "night"} onClick={() => selectMode("night")}>
              2. Natt: Fralandsvind (kl. 00–06)
            </ModelTab>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Skydekke:</span>
            <Button
              type="button"
              size="sm"
              variant={cloudCover === "clear" ? "default" : "secondary"}
              onClick={() => setCloudCover("clear")}
              className="h-7 px-2.5 text-xs"
            >
              Klar himmel
            </Button>
            <Button
              type="button"
              size="sm"
              variant={cloudCover === "overcast" ? "default" : "secondary"}
              onClick={() => setCloudCover("overcast")}
              className="h-7 px-2.5 text-xs"
            >
              Overskyet
            </Button>
          </div>
        </div>

        {/* Hovedvisning */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* SVG-simulering */}
          <ModelPanel className="lg:col-span-8 p-3 sm:p-4">
            <div className="relative overflow-hidden rounded-lg bg-[#0e171f] border border-border">
              {/* Header med status */}
              <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-3 py-2 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block size-2 rounded-full ${
                      isDay ? "bg-amber-400 animate-pulse" : "bg-sky-400"
                    }`}
                  />
                  <span className="font-semibold text-foreground">
                    {isDay ? "DAG: Solgangsbris (Sjøbris)" : "NATT: Fralandsvind (Landbris)"}
                  </span>
                </div>
                <span className="font-mono text-muted-foreground">
                  Kl. {hour.toString().padStart(2, "0")}:00 · ΔT:{" "}
                  <strong className={tempDiff > 0 ? "text-amber-400" : "text-sky-400"}>
                    {tempDiff > 0 ? `+${tempDiff}` : tempDiff} °C
                  </strong>
                </span>
              </div>

              {/* Hoveddiagram */}
              <svg
                viewBox="0 0 760 380"
                className="w-full h-auto select-none"
                aria-label="Solgangsbris sirkulasjonsskjema"
              >
                <defs>
                  <linearGradient id="skyGradDay" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#172b38" />
                    <stop offset="100%" stopColor="#0d1822" />
                  </linearGradient>
                  <linearGradient id="skyGradNight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#081017" />
                    <stop offset="100%" stopColor="#050a0f" />
                  </linearGradient>
                  <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a3f4e" />
                    <stop offset="100%" stopColor="#0d2430" />
                  </linearGradient>
                  <linearGradient id="landGradDay" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3d3725" />
                    <stop offset="100%" stopColor="#1c1912" />
                  </linearGradient>
                  <linearGradient id="landGradNight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1d2222" />
                    <stop offset="100%" stopColor="#101414" />
                  </linearGradient>

                  {/* Pilmarkører */}
                  <marker
                    id="arrowWarm"
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 9 5 L 0 9 z" fill="#f59e0b" />
                  </marker>
                  <marker
                    id="arrowCold"
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 9 5 L 0 9 z" fill="#38bdf8" />
                  </marker>
                  <marker
                    id="arrowTeal"
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 9 5 L 0 9 z" fill="#2dd4bf" />
                  </marker>
                </defs>

                {/* Himmelbakgrunn */}
                <rect
                  x="0"
                  y="0"
                  width="760"
                  height="280"
                  fill={isDay ? "url(#skyGradDay)" : "url(#skyGradNight)"}
                />

                {/* Himmellekemer */}
                {isDay ? (
                  <g transform="translate(560, 45)">
                    {/* Sola */}
                    <circle cx="0" cy="0" r="28" fill="#f59e0b" opacity="0.3" />
                    <circle cx="0" cy="0" r="18" fill="#fbbf24" />
                    {/* Solstråler ned mot land */}
                    {cloudCover === "clear" && (
                      <>
                        <line x1="-15" y1="20" x2="-45" y2="70" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
                        <line x1="0" y1="25" x2="-10" y2="85" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
                        <line x1="15" y1="20" x2="30" y2="75" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
                      </>
                    )}
                  </g>
                ) : (
                  <g transform="translate(180, 45)">
                    {/* Månen */}
                    <circle cx="0" cy="0" r="16" fill="#e2e8f0" />
                    <circle cx="6" cy="-4" r="14" fill="#081017" />
                  </g>
                )}

                {/* Skyer ved overskyet eller sjøbrisfront */}
                {cloudCover === "overcast" ? (
                  <g opacity="0.75" fill="#64748b">
                    <ellipse cx="200" cy="50" rx="90" ry="22" />
                    <ellipse cx="380" cy="45" rx="110" ry="25" />
                    <ellipse cx="580" cy="52" rx="95" ry="20" />
                    <text x="380" y="50" fill="#cbd5e1" fontSize="11" textAnchor="middle">
                      Tett skydekke demper overflateoppvarmingen
                    </text>
                  </g>
                ) : isDay ? (
                  /* Konvektive cumulus-skyer over land */
                  <g opacity="0.85">
                    <g transform="translate(540, 80)">
                      <path
                        d="M 10 30 Q 25 10 50 15 Q 75 5 95 20 Q 115 15 125 30 Z"
                        fill="#cbd5e1"
                      />
                      <rect x="10" y="28" width="115" height="4" fill="#cbd5e1" />
                      <text x="70" y="44" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        Cumulus (sjøbrisfront)
                      </text>
                    </g>
                  </g>
                ) : null}

                {/* Havkropp (venstre side 0–340) */}
                <rect x="0" y="270" width="350" height="110" fill="url(#seaGrad)" />
                {/* Bølger */}
                <path
                  d="M 10 273 Q 30 269 50 273 T 90 273 T 130 273 T 170 273 T 210 273 T 250 273 T 290 273 T 330 273"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  opacity="0.6"
                />

                {/* Landprofil (høyre side 330–760) med slak strand og ås */}
                <path
                  d="M 330 275 C 370 275, 410 270, 480 260 C 550 250, 640 220, 760 200 L 760 380 L 330 380 Z"
                  fill={isDay ? "url(#landGradDay)" : "url(#landGradNight)"}
                  stroke="#475569"
                  strokeWidth="1"
                />

                {/* Kystmerking */}
                <text x="160" y="320" fill="#7dd3fc" fontSize="14" fontWeight="600" textAnchor="middle">
                  HAV
                </text>
                <text x="160" y="340" fill="#94a3b8" fontSize="12" textAnchor="middle">
                  Vanntemperatur: ~{tempSea} °C (Høy varmekapasitet)
                </text>

                <text x="560" y="320" fill="#fde68a" fontSize="14" fontWeight="600" textAnchor="middle">
                  LAND
                </text>
                <text x="560" y="340" fill="#94a3b8" fontSize="12" textAnchor="middle">
                  Bakketemperatur: ~{tempLand} °C (Lav varmekapasitet)
                </text>

                {/* Trykkflater og sirkulasjonssøyler */}
                {isDay ? (
                  <>
                    {/* DAG-KRETSLØP */}
                    {/* Bakke: Høytrykk over hav (H), Lavtrykk over land (L) */}
                    <g transform="translate(170, 240)">
                      <circle cx="0" cy="0" r="16" fill="#0284c7" opacity="0.3" />
                      <circle cx="0" cy="0" r="13" fill="#0369a1" />
                      <text x="0" y="5" fill="#f0f9ff" fontSize="13" fontWeight="bold" textAnchor="middle">
                        H
                      </text>
                      <text x="0" y="24" fill="#7dd3fc" fontSize="10" textAnchor="middle">
                        Kjølig & tung
                      </text>
                    </g>

                    <g transform="translate(560, 230)">
                      <circle cx="0" cy="0" r="16" fill="#ea580c" opacity="0.3" />
                      <circle cx="0" cy="0" r="13" fill="#c2410c" />
                      <text x="0" y="5" fill="#fff7ed" fontSize="13" fontWeight="bold" textAnchor="middle">
                        L
                      </text>
                      <text x="0" y="24" fill="#fed7aa" fontSize="10" textAnchor="middle">
                        Varm luft stiger
                      </text>
                    </g>

                    {/* Høyde (1000m): Høytrykk over land (H), Lavtrykk over hav (L) */}
                    <g transform="translate(560, 110)">
                      <circle cx="0" cy="0" r="13" fill="#0369a1" opacity="0.8" />
                      <text x="0" y="4" fill="#f0f9ff" fontSize="11" fontWeight="bold" textAnchor="middle">
                        H
                      </text>
                      <text x="55" y="4" fill="#94a3b8" fontSize="10">
                        Trykkflate hevet
                      </text>
                    </g>

                    <g transform="translate(170, 110)">
                      <circle cx="0" cy="0" r="13" fill="#c2410c" opacity="0.8" />
                      <text x="0" y="4" fill="#fff7ed" fontSize="11" fontWeight="bold" textAnchor="middle">
                        L
                      </text>
                      <text x="-55" y="4" fill="#94a3b8" fontSize="10" textAnchor="end">
                        Trykkflate senket
                      </text>
                    </g>

                    {/* SIRKULASJONSPILER */}
                    {/* 1. Pålandsvind ved bakken (Hav -> Land) */}
                    <path
                      d="M 210 240 C 290 240, 390 235, 510 230"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth={breezeStrength > 4 ? 3.5 : 2.5}
                      markerEnd="url(#arrowCold)"
                    />
                    <text x="360" y="222" fill="#38bdf8" fontSize="12" fontWeight="600" textAnchor="middle">
                      SJØBRIS (Pålandsvind, {breezeStrength * 1.5} m/s)
                    </text>

                    {/* 2. Vertikal heving over land */}
                    <path
                      d="M 585 205 C 600 180, 600 150, 585 125"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.8"
                      markerEnd="url(#arrowWarm)"
                    />
                    <text x="625" y="165" fill="#f59e0b" fontSize="10" fontWeight="500">
                      Termisk oppdrift
                    </text>

                    {/* 3. Returstrøm i høyden (Land -> Hav, ca 1000m) */}
                    <path
                      d="M 525 105 C 430 95, 310 95, 205 105"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      markerEnd="url(#arrowTeal)"
                    />
                    <text x="365" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
                      Returstrøm i høyden (~1000–1500 m)
                    </text>

                    {/* 4. Nedsynking over kjølig hav */}
                    <path
                      d="M 150 130 C 135 160, 135 190, 150 215"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.2"
                      markerEnd="url(#arrowCold)"
                    />
                    <text x="110" y="175" fill="#38bdf8" fontSize="10" textAnchor="end">
                      Subsidensoppklarning
                    </text>
                  </>
                ) : (
                  <>
                    {/* NATT-KRETSLØP */}
                    {/* Bakke: Høytrykk over kaldt land (H), Lavtrykk over relativt varmt hav (L) */}
                    <g transform="translate(560, 230)">
                      <circle cx="0" cy="0" r="16" fill="#0284c7" opacity="0.3" />
                      <circle cx="0" cy="0" r="13" fill="#0369a1" />
                      <text x="0" y="5" fill="#f0f9ff" fontSize="13" fontWeight="bold" textAnchor="middle">
                        H
                      </text>
                      <text x="0" y="24" fill="#7dd3fc" fontSize="10" textAnchor="middle">
                        Kald & tung
                      </text>
                    </g>

                    <g transform="translate(170, 240)">
                      <circle cx="0" cy="0" r="16" fill="#ea580c" opacity="0.3" />
                      <circle cx="0" cy="0" r="13" fill="#c2410c" />
                      <text x="0" y="5" fill="#fff7ed" fontSize="13" fontWeight="bold" textAnchor="middle">
                        L
                      </text>
                      <text x="0" y="24" fill="#fed7aa" fontSize="10" textAnchor="middle">
                        Havet er mildere
                      </text>
                    </g>

                    {/* Høyde */}
                    <g transform="translate(170, 110)">
                      <circle cx="0" cy="0" r="13" fill="#0369a1" opacity="0.8" />
                      <text x="0" y="4" fill="#f0f9ff" fontSize="11" fontWeight="bold" textAnchor="middle">
                        H
                      </text>
                    </g>
                    <g transform="translate(560, 110)">
                      <circle cx="0" cy="0" r="13" fill="#c2410c" opacity="0.8" />
                      <text x="0" y="4" fill="#fff7ed" fontSize="11" fontWeight="bold" textAnchor="middle">
                        L
                      </text>
                    </g>

                    {/* Fralandsvind ved bakken (Land -> Hav) */}
                    <path
                      d="M 515 230 C 410 235, 300 240, 210 240"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth={breezeStrength > 3 ? 2.8 : 1.8}
                      markerEnd="url(#arrowCold)"
                    />
                    <text x="360" y="222" fill="#7dd3fc" fontSize="12" fontWeight="600" textAnchor="middle">
                      LANDBRIS (Fralandsvind, ~{Math.max(1, breezeStrength - 1)} m/s)
                    </text>

                    {/* Heving over lunkent hav */}
                    <path
                      d="M 145 215 C 135 185, 135 155, 150 130"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      markerEnd="url(#arrowWarm)"
                    />
                    {/* Returstrøm fra hav til land i høyden */}
                    <path
                      d="M 210 105 C 310 95, 430 95, 520 105"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.8"
                      strokeDasharray="4 3"
                      markerEnd="url(#arrowTeal)"
                    />
                    {/* Nedsynking over kaldt land */}
                    <path
                      d="M 585 130 C 600 155, 600 185, 585 205"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      markerEnd="url(#arrowCold)"
                    />
                  </>
                )}
              </svg>
            </div>

            {/* Forklaringsfelt under grafikk */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
              <div className="rounded-md border border-border/80 bg-background/50 p-2 text-center">
                <span className="text-muted-foreground block text-[10px] uppercase">Retning</span>
                <strong className={isDay ? "text-amber-400" : "text-sky-300"}>
                  {isDay ? "Fra hav mot land" : "Fra land mot hav"}
                </strong>
              </div>
              <div className="rounded-md border border-border/80 bg-background/50 p-2 text-center">
                <span className="text-muted-foreground block text-[10px] uppercase">Drivkraft</span>
                <span className="font-semibold text-foreground">Termisk trykkgradient</span>
              </div>
              <div className="rounded-md border border-border/80 bg-background/50 p-2 text-center">
                <span className="text-muted-foreground block text-[10px] uppercase">Coriolis-rolle</span>
                <span className="font-semibold text-foreground">
                  {isDay ? "Avbøyer mot høyre sen ettermiddag" : "Minimal effekt"}
                </span>
              </div>
              <div className="rounded-md border border-border/80 bg-background/50 p-2 text-center">
                <span className="text-muted-foreground block text-[10px] uppercase">Vertikal skala</span>
                <span className="font-semibold text-foreground">0–1500 meter</span>
              </div>
            </div>
          </ModelPanel>

          {/* Høyre panel: Faglig innsikt og analyse */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <ModelNote title="Fysikken: Varmekapasitet" tone="warm">
              <p>
                Vann har spesifikk varmekapasitet på hele{" "}
                <strong>c ≈ 4184 J/(kg·K)</strong>, mens tørt fjell og
                sandjord har under <strong>800–1000 J/(kg·K)</strong>.
              </p>
              <p>
                I tillegg fordeles solenergien nedover i vannsøylen på grunn av omrøring og lysinnslipp,
                mens solen bare varmer det øverste millimetertynne laget på land. Derfor skyter
                bakketemperaturen i været om dagen, mens havoverflaten forblir nesten konstant.
              </p>
            </ModelNote>

            <ModelNote title="Hvorfor er landbrisen svakere?" tone="teal">
              <p>
                Om natten er temperaturforskjellen mellom land og hav sjelden mer enn 3–5 °C, mens den
                på en solrik sommerettermiddag lett når 8–12 °C.
              </p>
              <p>
                Siden vindhastigheten er proporsjonal med trykkgradienten ($\Delta P \propto \Delta T$),
                blir landbrisen en svak nattlig trekk (~1–3 m/s), mens sjøbrisen kan nå frisk bris (8–10
                m/s) med krappe bølger i fjorden.
              </p>
            </ModelNote>

            <div className="rounded-xl border border-border bg-card/60 p-3.5 text-xs text-muted-foreground space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <Compass className="size-4 text-primary" />
                <span>Coriolis og dagens dreining</span>
              </div>
              <p>
                Rundt kl. 11–13 blåser sjøbrisen rett inn vinkelrett på kysten. Men etter 4–6 timer i
                bevegelse rekker Corioliseffekten å virke på luftmassen. På ettermiddagen (kl. 16–18)
                dreier brisen mot <strong>høyre</strong> og blåser mer parallelt langs kystlinjen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModelFrame>
  );
}
