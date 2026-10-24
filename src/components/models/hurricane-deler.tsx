/**
 * Deler til orkanmodellen (Værkatastrofer, figurplan B): breddegrad og rotasjon, typisk bane og
 * Bergen-stormflokalkulatoren (værbidrag + tidevann). f = 2Ω sin φ, minst om lag 500 km fra
 * ekvator (NOAA AOML, u.å.-b), banene fra NHC (u.å.-a). Stormflo: 1 cm/hPa, vindstuv som
 * illustrasjon, tidevannstall fra Kartverket (Se havnivå, BGO).
 */
import { useCallback, useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { C } from "../diagrams/svg-kit";
import { ModelNote, ModelPanel } from "./model-chrome";
import { useOrkanKlokke } from "./hurricane-klokke";

const knapp = (aktiv: boolean) =>
  `rounded-lg border px-3 py-1.5 text-sm font-semibold ${aktiv ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:bg-muted"}`;

function Pause({ paa, sett, navn }: { paa: boolean; sett: () => void; navn: string }) {
  return (
    <button
      type="button"
      className={knapp(false)}
      onClick={sett}
      aria-label={`${paa ? "Pause" : "Spill av"} animasjonen: ${navn}`}
    >
      <span aria-hidden="true">{paa ? "❚❚ " : "▶ "}</span>
      {paa ? "Pause" : "Spill av"}
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
  const retning =
    Math.abs(phi) < 1
      ? "ingen rotasjon"
      : phi > 0
        ? "mot klokken (nordlig halvkule)"
        : "med klokken (sørlig halvkule)";
  const krumning = 60 * sin;
  return (
    <div
      ref={ref}
      className="rounded-xl border border-border bg-card p-4"
      data-modell="rotasjon-bredde"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <svg
          viewBox="0 0 360 360"
          className="mx-auto h-auto w-full max-w-[300px]"
          role="img"
          aria-label={`Lavtrykk sett ovenfra ved ${phi} graders bredde. Innstrømmende luft avbøyes ${retning}.`}
        >
          <rect x={0} y={0} width={360} height={360} rx={16} fill="#0f172a" />
          {[0, 90, 180, 270].map((a) => {
            const r = (a * Math.PI) / 180;
            const x0 = 180 + 160 * Math.cos(r);
            const y0 = 180 + 160 * Math.sin(r);
            const x1 = 180 + 40 * Math.cos(r);
            const y1 = 180 + 40 * Math.sin(r);
            const kx = (x0 + x1) / 2 + krumning * Math.sin(r);
            const ky = (y0 + y1) / 2 - krumning * Math.cos(r);
            return (
              <path
                key={a}
                d={`M${x0.toFixed(1)} ${y0.toFixed(1)} Q${kx.toFixed(1)} ${ky.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`}
                fill="none"
                stroke="#ffffff"
                strokeWidth={3}
                markerEnd="url(#mdl-yellow)"
              />
            );
          })}
          <g
            transform={`rotate(${vinkel.toFixed(1)} 180 180)`}
            opacity={Math.min(1, Math.abs(sin) / Math.sin((40 * Math.PI) / 180))}
          >
            {armer.map((a) => (
              <path
                key={a}
                transform={`rotate(${a} 180 180) scale(${phi < 0 ? -1 : 1} 1) translate(${phi < 0 ? -360 : 0} 0)`}
                d="M180 180 C 220 120, 280 110, 310 140 C 270 140, 230 160, 180 180"
                fill="#ef4444"
                opacity={0.75}
              />
            ))}
          </g>
          <circle cx={180} cy={180} r={20} fill="#020617" stroke="#ef4444" strokeWidth={2.5} />
          <text x={180} y={186} textAnchor="middle" fontSize={16} fontWeight={700} fill="#f8fafc">
            L
          </text>
        </svg>
        <div className="flex-1 space-y-3 text-sm text-muted-foreground">
          <label className="block">
            <span className="flex justify-between text-xs">
              <span>Breddegrad φ</span>
              <span className="font-mono font-bold text-foreground">
                {phi === 0 ? "0° (ekvator)" : `${Math.abs(phi)}° ${phi > 0 ? "N" : "S"}`}
              </span>
            </span>
            <input
              type="range"
              min={-40}
              max={40}
              step={1}
              value={phi}
              onChange={(e) => setPhi(Number(e.target.value))}
              className="w-full accent-primary"
              aria-label="Breddegrad"
            />
          </label>
          <p>
            Coriolisparameteren er f&nbsp;=&nbsp;2Ω&nbsp;sin&nbsp;φ. Her er sin&nbsp;φ&nbsp;=&nbsp;
            <span className="font-mono text-foreground">{sin.toFixed(2).replace(".", ",")}</span>,
            så avbøyningen er <strong className="text-foreground">{retning}</strong>.
          </p>
          <p>
            Jo lenger fra ekvator, jo sterkere avbøyning. Ved ekvator er sin&nbsp;0°&nbsp;=&nbsp;0,
            og lufta fyller lavtrykket uten å begynne å rotere.
          </p>
          {!redusert && <Pause paa={spiller} sett={toggle} navn="rotasjon og breddegrad" />}
        </div>
      </div>
    </div>
  );
}

/* ---------- typisk bane ---------- */

const BANE: [number, number][] = [
  [600, 250],
  [520, 245],
  [440, 236],
  [370, 214],
  [330, 180],
  [322, 140],
  [345, 104],
  [400, 76],
  [470, 56],
];
const BANE_STEG = [
  { navn: "Dannes", til: 0, tekst: "Tropiske sykloner dannes mellom 5 og 30 grader nord." },
  { navn: "Vestover", til: 3, tekst: "De beveger seg typisk vestover." },
  {
    navn: "Nordover",
    til: 5,
    tekst: "Noen ganger styrer vinden høyere oppe dem mot nord og nordvest.",
  },
  { navn: "Nordøst", til: 8, tekst: "Nær 30 grader nord går de ofte mot nordøst." },
];
const breddeY = (b: number) => 300 - ((b - 0) * (300 - 80)) / 35;

function delBane(n: number) {
  return BANE.slice(0, n + 1)
    .map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`)
    .join(" ");
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
    return [
      BANE[i][0] + (BANE[i + 1][0] - BANE[i][0]) * f,
      BANE[i][1] + (BANE[i + 1][1] - BANE[i][1]) * f,
    ];
  })();
  return (
    <div ref={ref} className="rounded-xl border border-border bg-card p-4" data-modell="orkanbane">
      <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Steg i banen">
        {BANE_STEG.map((b, i) => (
          <button
            key={b.navn}
            type="button"
            className={knapp(i === steg)}
            aria-pressed={i === steg}
            onClick={() => setSteg(i)}
          >
            {b.navn}
          </button>
        ))}
        {!redusert && <Pause paa={spiller} sett={toggle} navn="orkanens bane" />}
      </div>
      <figure>
        <svg
          viewBox="0 0 700 330"
          className="h-auto w-full"
          role="img"
          aria-label="Skjematisk kart over Atlanterhavet med breddegradene 0, 5 og 30 grader nord. En typisk bane starter mellom 5 og 30 grader nord, går vestover, svinger mot nord og går mot nordøst nær 30 grader nord."
        >
          <rect x={0} y={0} width={700} height={330} rx={14} fill="#0f2a3d" />
          <path d="M0 0 L250 0 L230 60 L200 120 L150 170 L90 230 L60 330 L0 330 Z" fill="#3f4a3a" />
          <rect
            x={0}
            y={breddeY(30)}
            width={700}
            height={breddeY(5) - breddeY(30)}
            fill="#e8a46a"
            opacity={0.12}
          />
          {[0, 5, 30].map((b) => (
            <g key={b}>
              <line
                x1={0}
                x2={700}
                y1={breddeY(b)}
                y2={breddeY(b)}
                stroke="#9fb0bd"
                strokeDasharray="6 6"
                opacity={0.6}
              />
              <text
                x={690}
                y={breddeY(b) - 6}
                textAnchor="end"
                fontSize={18}
                fontWeight={700}
                fill="#cbd5e1"
              >
                {b === 0 ? "ekvator" : `${b}° N`}
              </text>
            </g>
          ))}
          <text
            x={600}
            y={breddeY(17)}
            textAnchor="middle"
            fontSize={17}
            fontWeight={700}
            fill="#e8a46a"
          >
            dannes her
          </text>
          {til > 0 && (
            <path
              d={delBane(til)}
              fill="none"
              stroke="#fca5a5"
              strokeWidth={5}
              strokeLinejoin="round"
              markerEnd="url(#mdl-red)"
            />
          )}
          <circle cx={pos[0]} cy={pos[1]} r={11} fill="#ef4444" stroke="#fff" strokeWidth={2} />
          <text x={260} y={30} fontSize={18} fontWeight={700} fill="#e2e8f0">
            Atlanterhavet, skjematisk
          </text>
        </svg>
        <figcaption className="mt-2 text-sm text-muted-foreground">
          <strong className="text-foreground">{BANE_STEG[steg].tekst}</strong> Skjematisk bane, ikke
          en bestemt orkan (National Hurricane Center [NHC], u.å.-a).
        </figcaption>
      </figure>
    </div>
  );
}

/* ---------- stormflo: Bergen-kalkulator (værbidrag + tidevann) ---------- */

// Startverdier for stormflokalkulatoren (brukes også av «Tilbakestill»).
const SURGE_DEFAULTS = { pressure: 960, windSpeed: 20, isSpringTide: true } as const;

export function StormfloOversikt() {
  const [pressure, setPressure] = useState<number>(SURGE_DEFAULTS.pressure); // hPa
  const [windSpeed, setWindSpeed] = useState<number>(SURGE_DEFAULTS.windSpeed); // m/s
  const [isSpringTide, setIsSpringTide] = useState<boolean>(SURGE_DEFAULTS.isSpringTide);
  const pressureId = useId();
  const windId = useId();
  const tideId = useId();
  const resetSurge = useCallback(() => {
    setPressure(SURGE_DEFAULTS.pressure);
    setWindSpeed(SURGE_DEFAULTS.windSpeed);
    setIsSpringTide(SURGE_DEFAULTS.isSpringTide);
  }, []);
  const windKmt = Math.round(windSpeed * 3.6);

  // Fysisk beregning av stormflo:
  // Invers barometereffekt: ~ 1 cm per 1 hPa trykkfall under 1013 hPa
  const deltaPressure = Math.max(0, 1013 - pressure);
  const surgeBaroCm = deltaPressure * 1.0;

  // Vindstuv (vindstress): proporsjonal med U^2
  // Enkel empirisk formel for kyst/sokkel: ~ 0.08 * (U^2) / 100 meter -> i cm
  const surgeWindCm = Math.round(0.08 * Math.pow(windSpeed, 2));

  // Tidevann i Bergen, cm over sjøkartnull (Kartverket, Se havnivå, stasjon BGO):
  // middel spring høyvann 156,9 cm og middel høyvann 140,6 cm, avrundet.
  const tideCm = isSpringTide ? 157 : 141;

  // Værbidrag = trykk + vind. Vannstand = tidevann + værbidrag.
  const weatherCm = surgeBaroCm + surgeWindCm;

  // Samlet vannstand over sjøkartnull
  const totalSurgeCm = weatherCm + tideCm;
  const totalSurgeM = (totalSurgeCm / 100).toLocaleString("nb-NO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const isQuayFlooded = totalSurgeCm > 220; // Bryggehøyde er 220 cm

  // Én rolig live-region: totalen leses opp først når verdien har ligget i ro en stund.
  const totalText = `Samlet vannstand over sjøkartnull: ${totalSurgeM} m.`;
  const [announcedTotal, setAnnouncedTotal] = useState(totalText);
  useEffect(() => {
    const t = window.setTimeout(() => setAnnouncedTotal(totalText), 700);
    return () => window.clearTimeout(t);
  }, [totalText]);

  return (
    <div className="space-y-6" data-modell="stormflo-oversikt">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Kontroller */}
        <ModelPanel className="space-y-4">
          <h3 className="font-display text-base font-semibold text-foreground">
            Juster meteorologiske og oseanografiske faktorer
          </h3>

          {/* 1. Barometrisk trykkfall */}
          <div>
            <div className="mb-1 flex justify-between gap-2 text-xs">
              <label htmlFor={pressureId} className="text-muted-foreground">
                Lufttrykk i sentrum:
              </label>
              <span
                className="shrink-0 whitespace-nowrap font-mono font-bold text-foreground"
                aria-hidden="true"
              >
                {pressure} hPa
              </span>
            </div>
            <input
              id={pressureId}
              type="range"
              min={940}
              max={1013}
              step={1}
              value={pressure}
              aria-valuetext={`${pressure} hPa`}
              onChange={(e) => setPressure(Number(e.target.value))}
              className="h-6 w-full cursor-pointer accent-primary"
            />
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Trykkfall: {deltaPressure} hPa → Invers barometereffekt: +{surgeBaroCm.toFixed(0)} cm
            </p>
          </div>

          {/* 2. Vindstyrke */}
          <div>
            <div className="mb-1 flex justify-between gap-2 text-xs">
              <label htmlFor={windId} className="text-muted-foreground">
                Vindhastighet ved kysten:
              </label>
              <span
                className="shrink-0 whitespace-nowrap font-mono font-bold text-foreground"
                aria-hidden="true"
              >
                {windSpeed} m/s ({windKmt} km/t)
              </span>
            </div>
            <input
              id={windId}
              type="range"
              min={10}
              max={25}
              step={1}
              value={windSpeed}
              aria-valuetext={`${windSpeed} m/s (${windKmt} km/t)`}
              onChange={(e) => setWindSpeed(Number(e.target.value))}
              className="h-6 w-full cursor-pointer accent-primary"
            />
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Vindstress (τ ∝ U²) stuver vann inn mot kysten: +{surgeWindCm} cm
            </p>
          </div>

          {/* 3. Tidevann i Bergen (Kartverket, Se havnivå) */}
          <div role="group" aria-labelledby={tideId}>
            <span id={tideId} className="mb-2 block text-xs text-muted-foreground">
              Tidevann i Bergen (cm over sjøkartnull):
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={isSpringTide}
                onClick={() => setIsSpringTide(true)}
                className={`flex-1 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                  isSpringTide
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground bg-background text-muted-foreground"
                }`}
              >
                Middel spring høyvann (157 cm)
              </button>
              <button
                type="button"
                aria-pressed={!isSpringTide}
                onClick={() => setIsSpringTide(false)}
                className={`flex-1 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                  !isSpringTide
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground bg-background text-muted-foreground"
                }`}
              >
                Middel høyvann (141 cm)
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="border-muted-foreground"
              onClick={resetSurge}
            >
              Tilbakestill
            </Button>
          </div>
        </ModelPanel>

        {/* Beregningsresultat: stormflo (værbidrag) og vannstand */}
        <ModelPanel className="flex flex-col justify-between">
          <div>
            <h3 className="mb-3 font-display text-base font-semibold text-foreground">
              Beregnet værbidrag og vannstand
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between gap-3 border-b border-border/50 py-1">
                <span className="text-muted-foreground">Invers barometereffekt (+1 cm/hPa):</span>
                <span
                  className="shrink-0 whitespace-nowrap font-mono font-semibold"
                  style={{ color: C.rain }}
                >
                  +{surgeBaroCm.toFixed(0)} cm
                </span>
              </div>
              <div className="flex justify-between gap-3 border-b border-border/50 py-1">
                <span className="text-muted-foreground">Vindstuv (illustrasjon):</span>
                <span
                  className="shrink-0 whitespace-nowrap font-mono font-semibold"
                  style={{ color: C.warm }}
                >
                  +{surgeWindCm} cm
                </span>
              </div>
              <div className="flex justify-between gap-3 border-b border-border py-1 font-semibold">
                <span className="text-foreground">Værbidrag (trykk + vind):</span>
                <span className="shrink-0 whitespace-nowrap font-mono text-foreground">
                  +{weatherCm} cm
                </span>
              </div>
              <div className="flex justify-between gap-3 border-b border-border/50 py-1">
                <span className="text-muted-foreground">
                  {`Tidevann i Bergen (${isSpringTide ? "middel spring høyvann" : "middel høyvann"}):`}
                </span>
                <span
                  className="shrink-0 whitespace-nowrap font-mono font-semibold"
                  style={{ color: C.teal }}
                >
                  +{tideCm} cm
                </span>
              </div>

              <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 border-t-2 border-border py-2 text-sm font-bold">
                <span className="min-w-[11rem] flex-1 text-foreground">
                  Samlet vannstand over sjøkartnull:
                  <span className="block text-xs font-normal text-muted-foreground">
                    tidevann + værbidrag
                  </span>
                </span>
                <span
                  className={`ml-auto whitespace-nowrap font-mono text-base ${isQuayFlooded ? "" : "text-primary"}`}
                  style={isQuayFlooded ? { color: C.low } : undefined}
                >
                  +{totalSurgeM} m ({totalSurgeCm} cm)
                </span>
              </div>
              <p className="sr-only" aria-live="polite">
                {announcedTotal}
              </p>
            </div>

            <div
              className="mt-4 rounded-lg border p-3 text-xs"
              style={
                isQuayFlooded
                  ? { color: C.low, borderColor: `${C.low}66`, backgroundColor: `${C.low}1a` }
                  : {
                      color: C.teal,
                      borderColor: `${C.teal}66`,
                      backgroundColor: `${C.teal}1a`,
                    }
              }
            >
              {isQuayFlooded ? (
                <p>
                  <strong>Over bryggekanten.</strong> Vannstanden ({totalSurgeM} m) er høyere enn
                  bryggekanten (2,20 m). Brygga og sjøbodene står under vann.
                </p>
              ) : (
                <p>
                  <strong>Under bryggekanten.</strong> Vannstanden ({totalSurgeM} m) er lavere enn
                  bryggekanten (2,20 m). Bølger kommer i tillegg og kan likevel nå opp.
                </p>
              )}
            </div>
          </div>
        </ModelPanel>
      </div>

      <ModelNote title="Forenklet modell">
        <p>
          Kalkulatoren legger sammen tre ledd: om lag 1 cm per hPa trykkfall, vindstuv som øker med
          kvadratet av vindfarten, og tidevannet i Bergen. I modellen består værbidraget av trykk og
          vind. Er værbidraget ekstra stort, kalles det stormflo (Kartverket, 2021). Tidevann og
          værbidrag til sammen gir vannstanden. Tidevannstallene er middel høyvann og middel spring
          høyvann i Bergen, i cm over sjøkartnull (Kartverket, u.å.). Den høyeste vannstanden som er
          målt i Bergen, er 244,9 cm over sjøkartnull (27. februar 1990). Kartverket regner 246,4 cm
          som 1000-års høyvann (Kartverket, u.å.). Under ekstremværet Elsa i februar 2020 var værets
          virkning i Bergen 79 cm (Selberg mfl., 2020). Tallet for vindstuv er en illustrasjon, ikke
          målt. Kystform, sokkelbredde og bølger er ikke med. Vannstanden der du bor, finner du i
          Kartverkets tjeneste{" "}
          <a
            href="https://www.kartverket.no/til-sjos/se-havniva"
            target="_blank"
            rel="noopener"
            className="text-primary underline decoration-1 underline-offset-[0.18em] hover:decoration-2 focus-visible:decoration-2"
          >
            Se havnivå
          </a>
          .
        </p>
      </ModelNote>
    </div>
  );
}
