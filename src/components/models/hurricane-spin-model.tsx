import { useState } from "react";
import { OrkanBane, RotasjonOgBreddegrad, StormfloOversikt } from "./hurricane-deler";
import { useRedusertBevegelse } from "./hurricane-klokke";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

export function HurricaneSvg({ hemisphere }: { hemisphere: "north" | "south" }) {
  const ccw = hemisphere === "north";
  const stille = useRedusertBevegelse();
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
            {!stille && <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 180 180"
              to="-360 180 180"
              dur="8s"
              repeatCount="indefinite"
            />}
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
            {!stille && <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 180 180"
              to="360 180 180"
              dur="8s"
              repeatCount="indefinite"
            />}
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
    damage:
      "Svært farlig vind gir noen skader: tak, kledning og takrenner på godt bygde trehus kan skades. Store greiner knekker, og trær med grunne røtter kan velte. Strømbrudd kan vare fra noen få til flere dager.",
    color: "text-sky-400 border-sky-500/30 bg-sky-950/20",
  },
  {
    cat: 2,
    name: "Kategori 2",
    windKm: "154–177 km/t",
    windMs: "43–49 m/s",
    damage:
      "Ekstremt farlig vind gir omfattende skader: godt bygde trehus kan få store skader på tak og kledning. Mange trær knekker eller rykkes opp og sperrer veier. Nesten fullstendig strømbrudd kan vare fra flere dager til uker.",
    color: "text-amber-400 border-amber-500/30 bg-amber-950/20",
  },
  {
    cat: 3,
    name: "Kategori 3 (stor orkan)",
    windKm: "178–208 km/t",
    windMs: "50–58 m/s",
    damage:
      "Ødeleggende skader: godt bygde trehus kan miste deler av taket. Mange trær knekker eller rykkes opp og sperrer veier. Strøm og vann kan mangle i flere dager til uker etter at stormen har passert.",
    color: "text-orange-400 border-orange-500/30 bg-orange-950/20",
  },
  {
    cat: 4,
    name: "Kategori 4 (stor orkan)",
    windKm: "209–251 km/t",
    windMs: "59–69 m/s",
    damage:
      "Katastrofale skader: godt bygde trehus kan miste det meste av taket og noen yttervegger. De fleste trær knekker eller rykkes opp, og strømstolper faller. Strømbrudd kan vare i uker, kanskje måneder, og det meste av området kan bli ubeboelig i uker eller måneder.",
    color: "text-rose-400 border-rose-500/30 bg-rose-950/20",
  },
  {
    cat: 5,
    name: "Kategori 5 (stor orkan)",
    windKm: "≥ 252 km/t",
    windMs: "≥ 70 m/s",
    damage:
      "Katastrofale skader: en stor andel av trehusene blir ødelagt, med tak og vegger som faller sammen. Boligområder kan bli isolert. Strømbrudd kan vare i uker, kanskje måneder, og det meste av området kan bli ubeboelig i uker eller måneder.",
    color: "text-red-500 border-red-500/40 bg-red-950/30",
  },
];

const FUJITA_DATA = [
  {
    ef: "EF0",
    name: "Svak tornado",
    windKm: "105–137 km/t",
    color: "text-sky-400 border-sky-500/30",
  },
  {
    ef: "EF1",
    name: "Moderat tornado",
    windKm: "138–177 km/t",
    color: "text-teal-400 border-teal-500/30",
  },
  {
    ef: "EF2",
    name: "Betydelig tornado",
    windKm: "178–217 km/t",
    color: "text-amber-400 border-amber-500/30",
  },
  {
    ef: "EF3",
    name: "Alvorlig tornado",
    windKm: "218–266 km/t",
    color: "text-orange-400 border-orange-500/30",
  },
  {
    ef: "EF4",
    name: "Ødeleggende tornado",
    windKm: "267–322 km/t",
    color: "text-rose-500 border-rose-500/40",
  },
  {
    ef: "EF5",
    name: "Utrolig voldsom",
    windKm: "> 322 km/t",
    color: "text-red-500 border-red-500/50",
  },
];

export function HurricaneSpinModel({ embedded = false }: { embedded?: boolean }) {
  const [activeTab, setActiveTab] = useState<"rotation" | "bane" | "saffir" | "fujita" | "surge">(
    "rotation",
  );
  const [selectedCat, setSelectedCat] = useState<number>(3);
  const [selectedEf, setSelectedEf] = useState<string>("EF2");

  const catData = SAFFIR_DATA.find((d) => d.cat === selectedCat)!;
  const efData = FUJITA_DATA.find((d) => d.ef === selectedEf)!;

  const body = (
    <>
      <ModelMarkers />

      {/* Fanelinje hvis ikke embedded */}
      {!embedded && (
        <div className="mb-6 flex flex-wrap gap-2 border-b border-border pb-4">
          <ModelTab active={activeTab === "rotation"} onClick={() => setActiveTab("rotation")}>
            1. Coriolis og rotasjon
          </ModelTab>
          <ModelTab active={activeTab === "bane"} onClick={() => setActiveTab("bane")}>
            2. Banen
          </ModelTab>
          <ModelTab active={activeTab === "saffir"} onClick={() => setActiveTab("saffir")}>
            3. Saffir-Simpson (orkaner)
          </ModelTab>
          <ModelTab active={activeTab === "fujita"} onClick={() => setActiveTab("fujita")}>
            4. EF-skalaen (tornadoer)
          </ModelTab>
          <ModelTab active={activeTab === "surge"} onClick={() => setActiveTab("surge")}>
            5. Stormflo
          </ModelTab>
        </div>
      )}

      {/* FANE 1: CORIOLIS OG ROTASJON */}
      {(embedded || activeTab === "rotation") && (
        <>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Innstrømmende luft avbøyes av Corioliskraften (f&nbsp;=&nbsp;2Ω&nbsp;sin&nbsp;φ). Mot
              klokken i nord, med klokken i sør.
            </p>
            <span className="shrink-0 rounded-md border border-[#e08a8a]/35 bg-[#e08a8a]/10 px-3 py-1 text-xs text-[#e08a8a]">
              Sentripetal akselerasjon og trykkfall mot L
            </span>
          </div>
          {!embedded && (
            <div className="mb-5">
              <RotasjonOgBreddegrad />
            </div>
          )}
          <HurricaneBody />
          <div className="mt-5">
            <ModelNote title="Hvorfor orkaner aldri dannes på ekvator" tone="low">
              <p>
                Ved ekvator er breddegraden φ&nbsp;=&nbsp;0°. Siden sin(0°)&nbsp;=&nbsp;0, blir
                Coriolisparameteren null (f&nbsp;=&nbsp;0), og dermed også Corioliskraften. Selv om
                havet er varmt nok, blir ikke innstrømmende luft avbøyd og satt i rotasjon. Lufta
                strømmer rett inn i lavtrykket og fyller det opp. Tropiske sykloner dannes nesten
                aldri nærmere ekvator enn om lag 500 km
                (NOAA AOML, {embedded ? "u.å." : "u.å.-b"}).
              </p>
            </ModelNote>
          </div>
        </>
      )}

      {!embedded && activeTab === "bane" && <OrkanBane />}

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
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-foreground">Forventet skadebilde:</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{catData.damage} (NHC, u.å.-b)</p>
            </div>
          </div>

          <ModelNote title="Merk: skalaen gjelder bare vind">
            <p>
              Kategorien bestemmes bare av vinden. Sentraltrykk og stormflo er tall fra en eldre
              utgave av skalaen og er ikke med i dag. En virkelig stormflo kan bli mye høyere eller
              lavere (NHC, 2021).
            </p>
          </ModelNote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div className="rounded-lg border border-border bg-card p-4">
              <strong className="text-foreground block mb-1">Skadene vokser raskt:</strong>
              Skadene øker mye raskere enn vindfarten. Som regel blir skadene om lag fire ganger større for hvert trinn opp
              på skalaen (NHC, 2021).
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <strong className="text-foreground block mb-1">Stormflo er dødsårsak nr. 1:</strong>I
              USA i perioden 1963–2012 var om lag 90 % av dødsfallene fra atlantiske tropiske
              sykloner knyttet til vann, og de fleste druknet. Stormflo alene sto for om lag
              halvparten (Rappaport, 2014). Kategorien alene avgjør ikke hvor høy stormfloen blir.
              Hvor stor orkanen er, hvor grunt havet er nær kysten, og hvor fort og i hvilken vinkel
              den treffer land, betyr også mye. Den store orkanen Ike (kategori 2) ga om lag 6 m
              stormflo i Texas i 2008, mens den lille orkanen Charley (kategori 4) ga om lag 2 m i
              Florida i 2004 (NHC, 2021).
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

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Tallene er omregnet fra mph og er anslag ut fra skadene, ikke målinger (NWS, u.å.-a).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div className="rounded-lg border border-border bg-card p-4">
              <strong className="text-foreground block mb-1">
                Hvorfor måles EF etter skadene?
              </strong>
              Vindtallene i EF-skalaen er anslag, ikke målinger. Etter en tornado sammenligner
              NWS skadene med 28 skadeindikatorer, for eksempel ulike bygningstyper og trær, og
              åtte skadegrader. Ut fra dette anslås vindkastene over tre sekunder (NWS, u.å.-a).
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <strong className="text-foreground block mb-1">
                Hvorfor spinner tornadoen så fort?
              </strong>
              Når roterende luft strekkes og blir smalere, roterer den fortere, slik en kunstløper
              snurrer fortere når armene trekkes inn. En tornado er mye smalere enn mesosyklonen den
              kommer fra.
            </div>
          </div>
        </div>
      )}

      {/* FANE 5: STORMFLO */}
      {!embedded && activeTab === "surge" && <StormfloOversikt />}
    </>
  );

  if (embedded) return body;

  return (
    <ModelFrame
      kicker="Interaktiv geofagmodell"
      title="Værkatastrofer: rotasjon, bane, skalaer og stormflo"
      lead="Se hvordan breddegraden styrer rotasjonen, hvordan en typisk orkan beveger seg, hva skalaene måler, og hva som løfter vannstanden ved stormflo."
    >
      {body}
    </ModelFrame>
  );
}
