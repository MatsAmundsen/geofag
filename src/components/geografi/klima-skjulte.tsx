import { useId } from "react";
import type { GeoJsonObject } from "geojson";
import { GeografiDatakart } from "./datakart";
import { gallPeters } from "@/lib/geografi-verdenskart";
import land from "@/lib/geografi-verdensland.json";
import temp from "@/lib/geografi-gistemp-1880-2025.json";
import nesbyen from "@/lib/geografi-nesbyen-lokator.json";

const serie = temp.serie as [number, number][];
const W = 720,
  H = 360,
  V = 56,
  T = 20,
  B = 40,
  R = 16;
const x = (ar: number) => V + ((ar - 1880) / (2025 - 1880)) * (W - V - R);
const y = (t: number) => T + ((1.4 - t) / 2) * (H - T - B);
const komma = (t: number) =>
  t.toLocaleString("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function GeografiTemperaturserie() {
  const id = useId();
  const linje = serie
    .map(([a, t], i) => `${i ? "L" : "M"}${x(a).toFixed(1)} ${y(t).toFixed(1)}`)
    .join("");
  return (
    <figure aria-labelledby={id} className="my-8 space-y-3 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        Figur 5.0 – Global temperatur 1880–2025
      </h3>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="min-w-[560px] w-full"
          role="img"
          aria-label="Linjediagram over global årsmiddeltemperatur 1880 til 2025 som avvik fra 1951–1980. Kurven ligger rundt minus 0,2 til minus 0,4 grader fram til rundt 1920, nær null midt i århundret og stiger tydelig etter rundt 1980 til 1,28 grader i 2024 og 1,18 grader i 2025."
        >
          {[-0.5, 0, 0.5, 1].map((t) => (
            <g key={t}>
              <line
                x1={V}
                x2={W - R}
                y1={y(t)}
                y2={y(t)}
                stroke={t === 0 ? "#334155" : "#cbd5e1"}
                strokeWidth={t === 0 ? 1.2 : 0.8}
              />
              <text x={V - 6} y={y(t) + 4} textAnchor="end" fontSize="12" fill="#334155">
                {t.toLocaleString("nb-NO", { minimumFractionDigits: 1 })}
              </text>
            </g>
          ))}
          {[1880, 1900, 1920, 1940, 1960, 1980, 2000, 2025].map((a) => (
            <text key={a} x={x(a)} y={H - B + 18} textAnchor="middle" fontSize="12" fill="#334155">
              {a}
            </text>
          ))}
          <rect
            x={x(1951)}
            y={T}
            width={x(1980) - x(1951)}
            height={H - T - B}
            fill="#64748b"
            opacity="0.1"
          />
          <text
            x={(x(1951) + x(1980)) / 2}
            y={T + 14}
            textAnchor="middle"
            fontSize="11"
            fill="#334155"
          >
            referanse 1951–1980
          </text>
          <path d={linje} fill="none" stroke="#b91c1c" strokeWidth="1.8" />
          <text
            x={14}
            y={(H - B + T) / 2}
            transform={`rotate(-90 14 ${(H - B + T) / 2})`}
            textAnchor="middle"
            fontSize="12"
            fill="#334155"
          >
            avvik i °C
          </text>
        </svg>
      </div>
      <details className="text-sm">
        <summary>Tekstalternativ: utvalgte år</summary>
        <table className="mt-2 text-left">
          <thead>
            <tr>
              <th scope="col" className="pr-4">
                År
              </th>
              <th scope="col">Avvik fra 1951–1980 (°C)</th>
            </tr>
          </thead>
          <tbody>
            {serie
              .filter(([a]) => a % 20 === 0 || a >= 2023)
              .map(([a, t]) => (
                <tr key={a}>
                  <th scope="row" className="pr-4 font-normal">
                    {a}
                  </th>
                  <td>{komma(t)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </details>
      <figcaption className="text-sm text-muted-foreground">
        Årsmiddel (januar–desember) av global temperatur ved overflaten over land og hav, oppgitt
        som avvik fra gjennomsnittet for 1951–1980. Hvert punkt er ett år. Variasjonen fra år til år
        kommer blant annet av El Niño og La Niña, mens stigningen over flere tiår er klimasignalet.
        2026 er utelatt fordi året ikke er avsluttet. Avvikene er målt mot 1951–1980, ikke mot
        førindustriell tid. Data: NASA GISS, GISTEMP v4, fil GLB.Ts+dSST.csv, hentet 6. november
        2026. Egen tegning (GISTEMP Team, 2026; Lenssen mfl., 2024).
      </figcaption>
    </figure>
  );
}

export function GeografiNesbyenLokator() {
  return (
    <figure className="my-6 space-y-3">
      <h3 className="font-semibold">Figur 5.10 – Hvor ligger Nesbyen?</h3>
      <GeografiDatakart
        data={nesbyen as GeoJsonObject}
        center={[60.57, 9.1]}
        zoom={8}
        basemap
        property="rolle"
        colors={{ Lokatorpunkt: "#9f1239" }}
        label="Lokatorkart med ett stedsnavnpunkt for tettstedet Nesbyen i Hallingdal. Kartet viser ingen flomgrenser, nedbørmengder eller faresoner."
      />
      <table className="w-full text-left text-sm">
        <caption>
          Stedsnavnpunkt fra Kartverket. Punktet viser tettstedet, ikke hvor skadene skjedde.
        </caption>
        <thead>
          <tr>
            <th scope="col">Sted</th>
            <th scope="col">Kommune</th>
            <th scope="col">Breddegrad N</th>
            <th scope="col">Lengdegrad Ø</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Nesbyen, tettsted</th>
            <td>Nesbyen, Buskerud</td>
            <td>{(60.56809).toLocaleString("nb-NO")}</td>
            <td>{(9.10276).toLocaleString("nb-NO")}</td>
          </tr>
        </tbody>
      </table>
      <figcaption className="text-sm text-muted-foreground">
        Kartet viser bare hvor Nesbyen ligger. Det viser ikke hvor mye regn som falt, hvor det
        flommet eller hvilke områder som er faresoner. Slike data krever egne, daterte kilder fra
        NVE og Meteorologisk institutt. Stedsnavnpunkt: Kartverket (u.å.), Sentralt
        stedsnavnregister, CC BY 4.0. Bakgrunn © Kartverket, CC BY 4.0.
      </figcaption>
    </figure>
  );
}

const NABO = new Set(["BGD", "IND", "MMR", "NPL", "BTN", "CHN", "LKA"]);
export function GeografiBangladeshLokator() {
  const id = useId();
  const [dx, dy] = gallPeters(90.406634, 23.725006);
  const verden = land as { name: string; iso3: string; path: string }[];
  return (
    <figure aria-labelledby={id} className="my-8 space-y-3 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        Figur 5.11 – Hvor ligger Bangladesh?
      </h3>
      <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
        <svg
          viewBox="615 130 90 75"
          className="w-full rounded bg-sky-50"
          role="img"
          aria-label="Utsnitt av Sør-Asia der Bangladesh er markert i oransje. India omgir landet i vest, nord og øst, Myanmar grenser i sørøst, og Bengalbukta ligger i sør. Hovedstaden Dhaka er markert med et punkt."
        >
          {verden
            .filter((c) => NABO.has(c.iso3))
            .map((c) => (
              <path
                key={c.iso3}
                d={c.path}
                fill={c.iso3 === "BGD" ? "#ea580c" : "#e5e7eb"}
                stroke="#64748b"
                strokeWidth="0.25"
              />
            ))}
          <circle cx={dx} cy={dy} r="0.9" fill="#111827" />
          <text x={dx + 1.6} y={dy + 0.8} fontSize="2.6" fill="#111827">
            Dhaka
          </text>
          <text x="640" y="170" fontSize="3.2" fill="#334155">
            India
          </text>
          <text x="674" y="179" fontSize="3" fill="#334155">
            Myanmar
          </text>
          <text x="652" y="196" fontSize="3" fontStyle="italic" fill="#0369a1">
            Bengalbukta
          </text>
        </svg>
        <svg
          viewBox="0 0 900 560"
          className="w-full rounded bg-sky-50"
          role="img"
          aria-label="Lite verdenskart der området i utsnittet er markert med en rute i Sør-Asia."
        >
          {verden.map((c) => (
            <path
              key={c.iso3 + c.name}
              d={c.path}
              fill={c.iso3 === "BGD" ? "#ea580c" : "#d1d5db"}
            />
          ))}
          <rect
            x="615"
            y="130"
            width="90"
            height="75"
            fill="none"
            stroke="#111827"
            strokeWidth="3"
          />
        </svg>
      </div>
      <figcaption className="text-sm text-muted-foreground">
        Kartet viser bare hvor landet ligger. Det viser ikke hvor faren for flom eller sykloner er
        størst, hvem som er utsatt eller hvor sårbare de er. Verdensbanken (2022) peker selv på
        store forskjeller mellom kystområder og andre deler av landet. Landgrenser fra Natural Earth
        1:110 millioner (Public Domain), grovt forenklet og uten øyene i elvedeltaet. Dhaka-punktet
        er fra Natural Earth (befolkede steder). Gall–Peters-projeksjon, egen tegning (Natural
        Earth, u.å.).
      </figcaption>
    </figure>
  );
}
