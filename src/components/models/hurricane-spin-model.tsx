import { useState } from "react";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

export function HurricaneSvg({ hemisphere }: { hemisphere: "north" | "south" }) {
  const ccw = hemisphere === "north";
  return (
    <svg viewBox="0 0 360 360" className="mx-auto my-2 h-auto w-full max-w-[320px] select-none">
      <circle cx="180" cy="180" r="160" fill="#0f172a" stroke="#334155" strokeWidth="1" />
      <circle
        cx="180"
        cy="180"
        r="140"
        fill="none"
        stroke="#64748b"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.5"
      />
      <circle
        cx="180"
        cy="180"
        r="100"
        fill="none"
        stroke="#64748b"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.5"
      />
      <circle
        cx="180"
        cy="180"
        r="60"
        fill="none"
        stroke="#64748b"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.5"
      />

      <text x="180" y="32" fill="#94a3b8" fontSize="9" textAnchor="middle">
        1008 hPa rundt
      </text>
      <text x="180" y="72" fill="#94a3b8" fontSize="9" textAnchor="middle">
        980 hPa
      </text>
      <text x="180" y="112" fill="#94a3b8" fontSize="9" textAnchor="middle">
        940 hPa
      </text>

      {ccw ? (
        <>
          <path
            d="M 180 40 Q 170 110 110 145"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            markerEnd="url(#mdl-yellow)"
          />
          <path
            d="M 320 180 Q 250 170 215 110"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            markerEnd="url(#mdl-yellow)"
          />
          <path
            d="M 180 320 Q 190 250 250 215"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            markerEnd="url(#mdl-yellow)"
          />
          <path
            d="M 40 180 Q 110 190 145 250"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            markerEnd="url(#mdl-yellow)"
          />
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 180 180"
              to="-360 180 180"
              dur="8s"
              repeatCount="indefinite"
            />
            <path
              d="M 180 180 C 220 120, 280 110, 310 140 C 270 140, 230 160, 180 180"
              fill="#ef4444"
              opacity="0.8"
            />
            <path
              d="M 180 180 C 140 220, 110 280, 140 310 C 140 270, 160 230, 180 180"
              fill="#ef4444"
              opacity="0.8"
            />
            <path
              d="M 180 180 C 120 140, 80 150, 50 120 C 90 120, 130 140, 180 180"
              fill="#f97316"
              opacity="0.8"
            />
            <path
              d="M 180 180 C 220 240, 250 220, 280 250 C 240 250, 200 230, 180 180"
              fill="#f97316"
              opacity="0.8"
            />
            <path
              d="M 300 180 A 120 120 0 0 0 180 60"
              fill="none"
              stroke="#facc15"
              strokeWidth="3.5"
              markerEnd="url(#mdl-yellow)"
            />
            <path
              d="M 60 180 A 120 120 0 0 0 180 300"
              fill="none"
              stroke="#facc15"
              strokeWidth="3.5"
              markerEnd="url(#mdl-yellow)"
            />
          </g>
        </>
      ) : (
        <>
          <path
            d="M 180 40 Q 190 110 250 145"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            markerEnd="url(#mdl-yellow)"
          />
          <path
            d="M 320 180 Q 250 190 215 250"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            markerEnd="url(#mdl-yellow)"
          />
          <path
            d="M 180 320 Q 170 250 110 215"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            markerEnd="url(#mdl-yellow)"
          />
          <path
            d="M 40 180 Q 110 170 145 110"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            markerEnd="url(#mdl-yellow)"
          />
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 180 180"
              to="360 180 180"
              dur="8s"
              repeatCount="indefinite"
            />
            <path
              d="M 180 180 C 140 120, 80 110, 50 140 C 90 140, 130 160, 180 180"
              fill="#ef4444"
              opacity="0.8"
            />
            <path
              d="M 180 180 C 220 220, 250 280, 220 310 C 220 270, 200 230, 180 180"
              fill="#ef4444"
              opacity="0.8"
            />
            <path
              d="M 180 180 C 240 140, 280 150, 310 120 C 270 120, 230 140, 180 180"
              fill="#f97316"
              opacity="0.8"
            />
            <path
              d="M 180 180 C 140 240, 110 220, 80 250 C 120 250, 160 230, 180 180"
              fill="#f97316"
              opacity="0.8"
            />
            <path
              d="M 60 180 A 120 120 0 0 0 180 60"
              fill="none"
              stroke="#facc15"
              strokeWidth="3.5"
              markerEnd="url(#mdl-yellow)"
            />
            <path
              d="M 300 180 A 120 120 0 0 0 180 300"
              fill="none"
              stroke="#facc15"
              strokeWidth="3.5"
              markerEnd="url(#mdl-yellow)"
            />
          </g>
        </>
      )}

      <circle cx="180" cy="180" r="18" fill="#020617" stroke="#ef4444" strokeWidth="2.5" />
      <text x="180" y="185" fill="#f8fafc" fontSize="14" fontWeight="700" textAnchor="middle">
        L
      </text>
      <text x="180" y="210" fill="#f87171" fontSize="9" fontWeight="700" textAnchor="middle">
        Øyet
      </text>
    </svg>
  );
}

export function HurricaneBody() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <ModelPanel className="flex flex-col items-center">
        <div className="mb-3 flex w-full items-center justify-between gap-2">
          <span className="text-sm font-medium text-[#e08a8a]">Nordlig halvkule</span>
          <span className="rounded-md bg-[#e08a8a]/15 px-2 py-0.5 text-xs text-[#e08a8a]">
            Mot klokken (Syklonal)
          </span>
        </div>
        <HurricaneSvg hemisphere="north" />
        <div className="mt-4 w-full space-y-1 rounded-xl border border-border bg-card p-3 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Hvorfor den spinner slik</p>
          <p>1. Luft suges inn mot det dype lavtrykket (L).</p>
          <p>
            2. Coriolis bøyer innstrømningen mot <strong className="text-foreground">høyre</strong>.
          </p>
          <p>
            3. Hele virvelen settes i rotasjon{" "}
            <strong className="text-foreground">mot klokken</strong>.
          </p>
        </div>
      </ModelPanel>

      <ModelPanel className="flex flex-col items-center">
        <div className="mb-3 flex w-full items-center justify-between gap-2">
          <span className="text-sm font-medium text-[#e08a8a]">Sørlig halvkule</span>
          <span className="rounded-md bg-[#e08a8a]/15 px-2 py-0.5 text-xs text-[#e08a8a]">
            Med klokken (Syklonal)
          </span>
        </div>
        <HurricaneSvg hemisphere="south" />
        <div className="mt-4 w-full space-y-1 rounded-xl border border-border bg-card p-3 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Hvorfor den spinner slik</p>
          <p>1. Luft suges inn mot det dype lavtrykket (L).</p>
          <p>
            2. Coriolis bøyer innstrømningen mot{" "}
            <strong className="text-foreground">venstre</strong>.
          </p>
          <p>
            3. Hele virvelen settes i rotasjon{" "}
            <strong className="text-foreground">med klokken</strong>.
          </p>
        </div>
      </ModelPanel>
    </div>
  );
}

const SAFFIR_DATA = [
  {
    cat: 1,
    name: "Kategori 1",
    windKm: "119–153 km/t",
    windMs: "33–42 m/s",
    pressure: "≥ 980 hPa",
    surge: "1,2–1,5 m",
    damage:
      "Farlige vinder gir skader på takstein, kledning og trær. Strømbrudd i noen dager. Båter rives fra fortøyning.",
    color: "text-sky-400 border-sky-500/30 bg-sky-950/20",
  },
  {
    cat: 2,
    name: "Kategori 2",
    windKm: "154–177 km/t",
    windMs: "43–49 m/s",
    pressure: "965–979 hPa",
    surge: "1,8–2,4 m",
    damage:
      "Ekstremt farlige vinder. Betydelige tak- og fasadeskader. Mange trær knekker og blokkerer veier. Omfattende strømbrudd i opptil uker.",
    color: "text-amber-400 border-amber-500/30 bg-amber-950/20",
  },
  {
    cat: 3,
    name: "Kategori 3 (Major)",
    windKm: "178–208 km/t",
    windMs: "50–58 m/s",
    pressure: "945–964 hPa",
    surge: "2,7–3,6 m",
    damage:
      "Ødeleggende krefter. Tak rives av solide tre- og murhus. Strøm og vannforsyning slås ut i uker. Kystflommer trenger langt inn over land.",
    color: "text-orange-400 border-orange-500/30 bg-orange-950/20",
  },
  {
    cat: 4,
    name: "Kategori 4 (Major)",
    windKm: "209–251 km/t",
    windMs: "59–69 m/s",
    pressure: "920–944 hPa",
    surge: "4,0–5,5 m",
    damage:
      "Katastrofale skader. Yttervegger og tak kollapser. Flesteparten av trær knekkes eller rykkes opp med roten. Store boligområder blir ubeboelige i måneder.",
    color: "text-rose-400 border-rose-500/30 bg-rose-950/20",
  },
  {
    cat: 5,
    name: "Kategori 5 (Major)",
    windKm: "≥ 252 km/t",
    windMs: "≥ 70 m/s",
    pressure: "< 920 hPa",
    surge: "> 5,5 m",
    damage:
      "Total utslettelse. Bygninger pulveriseres, biler og industribrakker slynges gjennom luften. Kysten oversvømmes av en massiv mur av vann. Eksempler: Katrina (2005), Dorian (2019).",
    color: "text-red-500 border-red-500/40 bg-red-950/30",
  },
];

const FUJITA_DATA = [
  {
    ef: "EF0",
    name: "Svak tornado",
    windKm: "105–137 km/t",
    damage:
      "Lette skader. Takstein blåser av, skorsteiner skades, greiner knekker. Vanligste type i Europa og Norge (skypumper).",
    color: "text-sky-400 border-sky-500/30",
  },
  {
    ef: "EF1",
    name: "Moderat tornado",
    windKm: "138–177 km/t",
    damage:
      "Moderate skader. Takplater rives av, campingvogner veltes, biler skyves av veien. Trær knekker.",
    color: "text-teal-400 border-teal-500/30",
  },
  {
    ef: "EF2",
    name: "Betydelig tornado",
    windKm: "178–217 km/t",
    damage:
      "Betydelige ødeleggelser. Tak rives fullstendig av hus, store trær rykkes opp med rot, biler løftes fra bakken.",
    color: "text-amber-400 border-amber-500/30",
  },
  {
    ef: "EF3",
    name: "Alvorlig tornado",
    windKm: "218–266 km/t",
    damage:
      "Alvorlige skader. Solide trehus mister yttervegger og tak. Togspor kan vris. Tunge kjøretøy slynges 100 meter.",
    color: "text-orange-400 border-orange-500/30",
  },
  {
    ef: "EF4",
    name: "Ødeleggende tornado",
    windKm: "267–322 km/t",
    damage:
      "Ekstreme skader. Godt konstruerte hus jevnes med jorden. Biler kastes som prosjektiler. Store gjenstander flyr som missiler.",
    color: "text-rose-500 border-rose-500/40",
  },
  {
    ef: "EF5",
    name: "Utrolig voldsom",
    windKm: "> 322 km/t",
    damage:
      "Total utslettelse. Betong- og murhus feies fullstendig av grunnmuren. Asfalt rives opp fra veiene. Bark skrelles av trærne. F.eks. Moore, Oklahoma (2013).",
    color: "text-red-500 border-red-500/50",
  },
];

export function HurricaneSpinModel({ embedded = false }: { embedded?: boolean }) {
  const [activeTab, setActiveTab] = useState<"rotation" | "saffir" | "fujita" | "surge">(
    "rotation",
  );
  const [selectedCat, setSelectedCat] = useState<number>(3);
  const [selectedEf, setSelectedEf] = useState<string>("EF2");

  // Stormflo kalkulator-tilstand
  const [pressure, setPressure] = useState<number>(960); // hPa
  const [windSpeed, setWindSpeed] = useState<number>(35); // m/s
  const [isSpringTide, setIsSpringTide] = useState<boolean>(true);

  // Fysisk beregning av stormflo:
  // Invers barometereffekt: ~ 1 cm per 1 hPa trykkfall under 1013 hPa
  const deltaPressure = Math.max(0, 1013 - pressure);
  const surgeBaroCm = deltaPressure * 1.0;

  // Vindstuv (vindstress): proporsjonal med U^2
  // Enkel empirisk formel for kyst/sokkel: ~ 0.08 * (U^2) / 100 meter -> i cm
  const surgeWindCm = Math.round(0.08 * Math.pow(windSpeed, 2));

  // Tidevannsbidrag (springflo gir ekstra +80 cm, middelvann +30 cm)
  const tideCm = isSpringTide ? 80 : 30;

  // Samlet stormflo over sjøkartnull i meter
  const totalSurgeCm = surgeBaroCm + surgeWindCm + tideCm;
  const totalSurgeM = (totalSurgeCm / 100).toFixed(2);
  const isQuayFlooded = totalSurgeCm > 220; // Bryggehøyde er 220 cm

  const catData = SAFFIR_DATA.find((d) => d.cat === selectedCat)!;
  const efData = FUJITA_DATA.find((d) => d.ef === selectedEf)!;

  const body = (
    <>
      <ModelMarkers />

      {/* Fanelinje hvis ikke embedded */}
      {!embedded && (
        <div className="mb-6 flex flex-wrap gap-2 border-b border-border pb-4">
          <ModelTab active={activeTab === "rotation"} onClick={() => setActiveTab("rotation")}>
            1. Coriolis &amp; Rotasjon
          </ModelTab>
          <ModelTab active={activeTab === "saffir"} onClick={() => setActiveTab("saffir")}>
            2. Saffir-Simpson (Orkaner)
          </ModelTab>
          <ModelTab active={activeTab === "fujita"} onClick={() => setActiveTab("fujita")}>
            3. Enhanced Fujita (Tornadoer)
          </ModelTab>
          <ModelTab active={activeTab === "surge"} onClick={() => setActiveTab("surge")}>
            4. Stormflo-kalkulator
          </ModelTab>
        </div>
      )}

      {/* FANE 1: CORIOLIS OG ROTASJON */}
      {(embedded || activeTab === "rotation") && (
        <>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Innstrømmende luft avbøyes av Corioliskraften ($f = 2\Omega\sin\phi$). Mot klokken i
              nord, med klokken i sør.
            </p>
            <span className="shrink-0 rounded-md border border-[#e08a8a]/35 bg-[#e08a8a]/10 px-3 py-1 text-xs text-[#e08a8a]">
              Sentripetal akselerasjon &amp; trykkfall mot L
            </span>
          </div>
          <HurricaneBody />
          <div className="mt-5">
            <ModelNote title="Hvorfor orkaner aldri dannes på ekvator" tone="low">
              <p>
                Ved ekvator er breddegraden $\phi = 0^\circ$. Siden $\sin(0^\circ) = 0$, er
                Corioliskraften lik null ($f = 0$). Selv om havtemperaturen ved ekvator ofte
                overstiger 28–30 °C, kan ikke innstrømmende luft settes i rotasjon. Luften strømmer
                rett inn i lavtrykket og fyller det opp umiddelbart. Tropiske sykloner trenger minst
                5° breddegrad (ca. 500 km fra ekvator) for å fødes.
              </p>
            </ModelNote>
          </div>
        </>
      )}

      {/* FANE 2: SAFFIR-SIMPSON SKALAEN */}
      {!embedded && activeTab === "saffir" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
              Velg orkankategori:
            </span>
            {SAFFIR_DATA.map((d) => (
              <button
                key={d.cat}
                type="button"
                onClick={() => setSelectedCat(d.cat)}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                  selectedCat === d.cat
                    ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary"
                    : "bg-card hover:bg-muted text-muted-foreground border border-border"
                }`}
              >
                Kat. {d.cat}
              </button>
            ))}
          </div>

          <div className={`rounded-xl border p-6 ${catData.color}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-4">
              <div>
                <h3 className="font-display text-2xl font-bold">{catData.name}</h3>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Saffir-Simpson Hurricane Wind Scale
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs">Vindhastighet:</span>
                  <span className="font-mono font-bold text-foreground text-base">
                    {catData.windKm}
                  </span>{" "}
                  ({catData.windMs})
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Sentraltrykk:</span>
                  <span className="font-mono font-bold text-foreground text-base">
                    {catData.pressure}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Typisk stormflo:</span>
                  <span className="font-mono font-bold text-foreground text-base">
                    {catData.surge}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-foreground">Forventet skadebilde:</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{catData.damage}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div className="rounded-lg border border-border bg-card p-4">
              <strong className="text-foreground block mb-1">
                Destruktiv vindenergi $\propto v^3$:
              </strong>
              Vindens trykk mot bygninger øker med kvadratet av farten ($v^2$), mens den kinetiske
              energien som overføres øker med kuben av farten ($v^3$). En Kategori 5-orkan (260
              km/t) gjør derfor ikke dobbelt så mye skade som en Kategori 1 (130 km/t), men opptil{" "}
              <strong>50 ganger så mye skade!</strong>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <strong className="text-foreground block mb-1">Stormflo er dødsårsak nr. 1:</strong>
              Over 85 % av dødsfallene i historiske orkaner skyldes vann (stormflo og
              ferskvannsflom), ikke vind alene. Når Kategori 4/5 treffer langgrunne kyster, kan hele
              øysamfunn og kystbyer utslettes.
            </div>
          </div>
        </div>
      )}

      {/* FANE 3: ENHANCED FUJITA (TORNADOER) */}
      {!embedded && activeTab === "fujita" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
              Velg tornado-intensitet:
            </span>
            {FUJITA_DATA.map((d) => (
              <button
                key={d.ef}
                type="button"
                onClick={() => setSelectedEf(d.ef)}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                  selectedEf === d.ef
                    ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary"
                    : "bg-card hover:bg-muted text-muted-foreground border border-border"
                }`}
              >
                {d.ef}
              </button>
            ))}
          </div>

          <div className={`rounded-xl border bg-card p-6 ${efData.color}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-4">
              <div>
                <h3 className="font-display text-2xl font-bold">
                  {efData.ef}: {efData.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Enhanced Fujita Damage Scale
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">3-sekunders vindkast:</span>
                <span className="font-mono font-bold text-xl text-foreground">{efData.windKm}</span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-foreground">Empirisk skadebeskrivelse:</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{efData.damage}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div className="rounded-lg border border-border bg-card p-4">
              <strong className="text-foreground block mb-1">
                Hvorfor måles EF etter skadene?
              </strong>
              Fordi en tornado er så kompakt og voldelig at vanlige anemometre (vindmålere) blåser
              bort eller knuses. EF-skalaen baserer seg på 28 skademarkører (Degree of Damage, DoD)
              på trær, bygninger og infrastruktur for å beregne vindfarten i etterkant.
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <strong className="text-foreground block mb-1">
                Konservering av spinn (Angulært moment):
              </strong>
              Når supercellens mesosyklon (3–10 km bred) strekkes ned mot bakken av RFD og snurpes
              sammen til en trakt på bare 100 meter, må vinkelmomentet $L = m \cdot v \cdot r$
              bevares. Når $r$ minker med en faktor på 50, akselererer rotasjonshastigheten $v$
              tilsvarende voldsomt!
            </div>
          </div>
        </div>
      )}

      {/* FANE 4: STORMFLO-KALKULATOR */}
      {!embedded && activeTab === "surge" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kontroller */}
            <ModelPanel className="space-y-4">
              <h4 className="font-display text-base font-semibold text-foreground">
                Juster meteorologiske og oseanografiske faktorer
              </h4>

              {/* 1. Barometrisk trykkfall */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Lufttrykk i sentrum:</span>
                  <span className="font-mono font-bold text-foreground">{pressure} hPa</span>
                </div>
                <input
                  type="range"
                  min={910}
                  max={1013}
                  step={1}
                  value={pressure}
                  onChange={(e) => setPressure(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Trykkfall: {deltaPressure} hPa → Invers barometereffekt: +{surgeBaroCm.toFixed(0)}{" "}
                  cm
                </p>
              </div>

              {/* 2. Vindstyrke */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Vindhastighet ved kysten:</span>
                  <span className="font-mono font-bold text-foreground">
                    {windSpeed} m/s ({Math.round(windSpeed * 3.6)} km/t)
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={65}
                  step={1}
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Vindstress ($\tau \propto U^2$) stuver vann inn mot kysten: +{surgeWindCm} cm
                </p>
              </div>

              {/* 3. Tidevann */}
              <div>
                <span className="text-xs text-muted-foreground block mb-2">
                  Astronomisk tidevannsfase:
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSpringTide(true)}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-semibold border ${
                      isSpringTide
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border"
                    }`}
                  >
                    Springflo (+80 cm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSpringTide(false)}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-semibold border ${
                      !isSpringTide
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border"
                    }`}
                  >
                    Middelvann (+30 cm)
                  </button>
                </div>
              </div>
            </ModelPanel>

            {/* Beregningsresultat & Live Visualisering */}
            <ModelPanel className="flex flex-col justify-between">
              <div>
                <h4 className="font-display text-base font-semibold text-foreground mb-3">
                  Beregnet stormflo-resultat
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">
                      Invers barometereffekt (+1 cm/hPa):
                    </span>
                    <span className="font-mono font-semibold text-sky-400">
                      +{surgeBaroCm.toFixed(0)} cm
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">
                      Vindstuv (vindstress på kyst/fjord):
                    </span>
                    <span className="font-mono font-semibold text-amber-400">
                      +{surgeWindCm} cm
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">
                      Astronomisk tidevann ({isSpringTide ? "Springflo" : "Middelvann"}):
                    </span>
                    <span className="font-mono font-semibold text-emerald-400">+{tideCm} cm</span>
                  </div>

                  <div className="flex justify-between py-2 border-t-2 border-border font-bold text-sm">
                    <span className="text-foreground">Samlet vannstand over sjøkartnull:</span>
                    <span
                      className={`font-mono text-base ${isQuayFlooded ? "text-red-500" : "text-primary"}`}
                    >
                      +{totalSurgeM} m ({totalSurgeCm} cm)
                    </span>
                  </div>
                </div>

                <div
                  className={`mt-4 rounded-lg p-3 text-xs border ${
                    isQuayFlooded
                      ? "border-red-500/40 bg-red-950/20 text-red-300"
                      : "border-emerald-500/40 bg-emerald-950/20 text-emerald-300"
                  }`}
                >
                  {isQuayFlooded ? (
                    <p className="font-bold flex items-center gap-1.5">
                      ⚠️ KRITISK OVERSVØMMELSE: Vannstanden ({totalSurgeM} m) overskrider
                      bryggekanten (2,20 m)! Kai, sjøboder og kjellere settes under vann.
                    </p>
                  ) : (
                    <p className="font-bold flex items-center gap-1.5">
                      ✅ Trygg margin: Vannstanden ({totalSurgeM} m) er under bryggekanten (2,20 m).
                      Kaien forblir tørr, men pass på bølgeoppskyll!
                    </p>
                  )}
                </div>
              </div>
            </ModelPanel>
          </div>
        </div>
      )}
    </>
  );

  if (embedded) return body;

  return (
    <ModelFrame
      kicker="Interaktiv geofagmodell"
      title="Værkatastrofer: Rotasjon, klassifisering og stormflo"
      lead="Utforsk mekanismene bak orkanrotasjon, Saffir-Simpson- og Fujita-skalaene, og simuler hvordan trykkfall og vindstuv skaper ekstrem stormflo."
    >
      {body}
    </ModelFrame>
  );
}
