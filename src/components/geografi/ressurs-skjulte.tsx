import { useId, useState } from "react";
import kobber from "@/lib/geografi-kobber-2025.json";
import hav from "@/lib/geografi-kap7-havkart.json";

const tall = (n: number) => n.toLocaleString("nb-NO");

export function GeografiKobberProduksjon() {
  const id = useId();
  const rader = kobber.land as [string, number, number][];
  const maks = 14000;
  const bar = (v: number) => `${(v / maks) * 100}%`;
  return (
    <figure aria-labelledby={id} className="my-8 space-y-3 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        Figur 7.2 – Hvor kobber blir utvunnet, og hvor det blir raffinert
      </h3>
      <p className="flex flex-wrap gap-4 text-sm">
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-6 rounded-sm bg-amber-600" aria-hidden="true" />
          Gruveproduksjon
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-6 rounded-sm bg-slate-500" aria-hidden="true" />
          Raffinering
        </span>
      </p>
      <table className="w-full text-left text-sm">
        <caption className="sr-only">
          Gruveproduksjon og raffinering av kobber i 2025, anslag i tusen tonn kobberinnhold
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-40">
              Land
            </th>
            <th scope="col">Gruve og raffinering (tusen tonn)</th>
          </tr>
        </thead>
        <tbody>
          {rader.map(([land, gruve, raff]) => (
            <tr key={land} className="align-top">
              <th scope="row" className="py-1 pr-2 font-normal">
                {land}
              </th>
              <td className="py-1">
                <div className="flex items-center gap-2">
                  <div className="h-3 rounded-sm bg-amber-600" style={{ width: bar(gruve) }} />
                  <span>Gruve {gruve ? tall(gruve) : "ingen"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 rounded-sm bg-slate-500" style={{ width: bar(raff) }} />
                  <span>Raffinering {tall(raff)}</span>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <th scope="row" className="py-1 pr-2 font-normal">
              Andre land
            </th>
            <td>
              Gruve {tall(kobber.andre[0])}, raffinering {tall(kobber.andre[1])}
            </td>
          </tr>
          <tr>
            <th scope="row" className="py-1 pr-2 font-semibold">
              Verden (avrundet)
            </th>
            <td className="font-semibold">
              Gruve {tall(kobber.verden[0])}, raffinering {tall(kobber.verden[1])}
            </td>
          </tr>
        </tbody>
      </table>
      <figcaption className="text-sm text-muted-foreground">
        Tall i tusen tonn kobberinnhold, anslag for 2025. Gruveproduksjon er kobber som tas ut av
        gruver. Raffinering er rent kobber som produseres i smelteverk og raffinerier, også av
        importert malm og skrap. Derfor kan et land raffinere langt mer enn det utvinner, som Kina
        og Japan, eller omvendt, som Chile og Peru. Verdenssummen for raffinering er større enn for
        gruvene fordi skrap også blir raffinert. Figuren sier ikke hvem som eier gruvene eller får
        inntektene. «Ingen» betyr at USGS oppgir ingen gruveproduksjon (tankestrek i tabellen).
        Data: U.S. Geological Survey, Mineral Commodity Summaries 2026, kobber (Public Domain). Egen
        tegning (USGS, 2026).
      </figcaption>
    </figure>
  );
}

const STATUS: Record<string, { navn: string; farge: string }> = {
  Producing: { navn: "I produksjon", farge: "#b91c1c" },
  "Approved for production": { navn: "Godkjent for produksjon", farge: "#f59e0b" },
  "Shut down": { navn: "Nedstengt", farge: "#6b7280" },
};
const HAV: Record<string, string> = {
  "North sea": "Nordsjøen",
  "Norwegian sea": "Norskehavet",
  "Barents sea": "Barentshavet",
};

export function GeografiHavsonerFelt() {
  const id = useId();
  const [visFelt, setVisFelt] = useState(true);
  const telling = Object.keys(STATUS).map(
    (s) => [s, hav.felt.filter((f) => f.status === s).length] as const,
  );
  return (
    <figure aria-labelledby={id} className="my-8 space-y-3 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        Figur 7.8 – Norske havområder og petroleumsfelt
      </h3>
      <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <svg
          viewBox={`0 0 ${hav.bredde} ${hav.hoyde}`}
          className="max-h-[80vh] w-full rounded bg-sky-50"
          role="img"
          aria-label="Kart over havområdene fra Nordsjøen til Polhavet. Norges økonomiske sone ligger langs fastlandet. Fiskevernsonen ved Svalbard ligger rundt Svalbard og Bjørnøya, og fiskerisonen ved Jan Mayen ligger rundt Jan Mayen. Kontinentalsokkelen er tegnet med stiplet grense og strekker seg lenger ut. Petroleumsfeltene ligger i Nordsjøen, Norskehavet og sørvest i Barentshavet."
        >
          <path
            d={hav.soner.sokkel}
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="2"
            strokeDasharray="7 4"
          />
          <path
            d={hav.soner.okonomisk}
            fill="#93c5fd"
            fillOpacity="0.6"
            stroke="#1d4ed8"
            strokeWidth="1"
          />
          <path
            d={hav.soner.fiskevern}
            fill="#5eead4"
            fillOpacity="0.5"
            stroke="#0f766e"
            strokeWidth="1"
          />
          <path
            d={hav.soner.fiskeri}
            fill="#c4b5fd"
            fillOpacity="0.6"
            stroke="#6d28d9"
            strokeWidth="1"
          />
          <path d={hav.soner.territorial} fill="#1e40af" fillOpacity="0.55" />
          <path d={hav.land} fill="#e5e7eb" stroke="#6b7280" strokeWidth="0.6" />
          {visFelt &&
            hav.felt.map((f) => (
              <path
                key={f.navn}
                d={f.d}
                fill={STATUS[f.status]?.farge ?? "#000"}
                stroke={STATUS[f.status]?.farge ?? "#000"}
                strokeWidth="2.5"
                strokeLinejoin="round"
              >
                <title>{`${f.navn}: ${STATUS[f.status]?.navn ?? f.status}, ${HAV[f.hav] ?? f.hav}`}</title>
              </path>
            ))}
          {Object.entries(hav.etiketter).map(([navn, [x, y]]) => (
            <text
              key={navn}
              x={x}
              y={y}
              fontSize="16"
              textAnchor="middle"
              fill="#111827"
              stroke="#fff"
              strokeWidth="3"
              paintOrder="stroke"
            >
              {navn}
            </text>
          ))}
        </svg>
        <div className="space-y-3 text-sm">
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-5 border border-blue-700 bg-blue-300"
                aria-hidden="true"
              />
              Norges økonomiske sone
            </li>
            <li className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-5 border border-teal-700 bg-teal-300"
                aria-hidden="true"
              />
              Fiskevernsonen ved Svalbard
            </li>
            <li className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-5 border border-violet-700 bg-violet-300"
                aria-hidden="true"
              />
              Fiskerisonen ved Jan Mayen
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-3 w-5 bg-blue-800/60" aria-hidden="true" />
              Sjøterritorium (12 nautiske mil)
            </li>
            <li className="flex items-center gap-2">
              <span
                className="inline-block w-5 border-t-2 border-dashed border-blue-900"
                aria-hidden="true"
              />
              Ytre grense for kontinentalsokkelen
            </li>
            {telling.map(([s, n]) => (
              <li key={s} className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ background: STATUS[s].farge }}
                  aria-hidden="true"
                />
                Felt: {STATUS[s].navn} ({n})
              </li>
            ))}
          </ul>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={visFelt}
              onChange={(e) => setVisFelt(e.target.checked)}
            />
            Vis petroleumsfeltene
          </label>
          <p>
            Sonene gir Norge ulike rettigheter, og de er ikke det samme som territorium. Teksten
            rundt kartet forklarer forskjellen. Kartet viser hvor grensene går, ikke hvem som har
            rett i omstridte spørsmål.
          </p>
        </div>
      </div>
      <details className="text-sm">
        <summary>Tekstalternativ: feltene etter havområde og status</summary>
        <table className="mt-2 text-left">
          <thead>
            <tr>
              <th scope="col" className="pr-4">
                Havområde
              </th>
              {Object.values(STATUS).map((s) => (
                <th key={s.navn} scope="col" className="pr-4">
                  {s.navn}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(HAV).map(([k, navn]) => (
              <tr key={k}>
                <th scope="row" className="pr-4 font-normal">
                  {navn}
                </th>
                {Object.keys(STATUS).map((s) => (
                  <td key={s} className="pr-4">
                    {hav.felt.filter((f) => f.hav === k && f.status === s).length}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <figcaption className="text-sm text-muted-foreground">
        Feltomriss og feltstatus: Sokkeldirektoratet, faktakart, laget «Field by status», hentet 9.
        november 2026. {hav.felt.length} felt med omriss. Ett felt uten omriss i tjenesten (
        {hav.utenGeometri.join(", ")}) er ikke tegnet. Feltene er tegnet med kantlinje så de synes i
        denne målestokken. Inneholder data under Norsk lisens for offentlige data (NLOD)
        tilgjengeliggjort av Sokkeldirektoratet. Sonene: Kartverket, Norges maritime grenser,
        datauttak 11. april 2025, CC BY 3.0 NO. Land: Natural Earth 1:50m (Public Domain).
        Lambert-projeksjon med like arealer, forenklet. Kartet er ikke egnet for navigasjon eller
        grensespørsmål (Sokkeldirektoratet, 2026; Kartverket, 2025; Natural Earth, u.å.).
      </figcaption>
    </figure>
  );
}
