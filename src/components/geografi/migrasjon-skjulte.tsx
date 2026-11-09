import { useId } from "react";
import { GeografiVerdenskart } from "./verdenskart";
import land from "@/lib/geografi-verdensland.json";
import netto from "@/lib/geografi-nettomigrasjon-2023.json";
import korr from "@/lib/geografi-migrantkorridorer-2024.json";

const tall = (n: number) => n.toLocaleString("nb-NO");

export function GeografiNettomigrasjonKart() {
  const id = useId();
  const rows = netto.land.map((r) => ({
    iso3: r.iso3,
    navn: `${r.navn} (${tall(r.antall)} personer)`,
    verdi: r.verdi,
  }));
  return (
    <figure aria-labelledby={id} className="my-8 space-y-3 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        Figur 11.1 – Nettomigrasjon per 1000 innbyggere, 2023
      </h3>
      <GeografiVerdenskart
        rows={rows}
        enhet="per 1000 innbyggere"
        desimaler={1}
        ukjent="Mangler tall i datakilden"
        klasser={[
          { grense: -5, navn: "Flere flytter ut: 5 eller mer", farge: "#8c510a" },
          { grense: -1, navn: "Flere flytter ut: 1 til under 5", farge: "#d8b365" },
          { grense: 1, navn: "Nær null: under 1 i begge retninger", farge: "#f5f5f5" },
          { grense: 5, navn: "Flere flytter inn: 1 til under 5", farge: "#5ab4ac" },
          { grense: Infinity, navn: "Flere flytter inn: 5 eller mer", farge: "#01665e" },
        ]}
      />
      <figcaption className="text-sm text-muted-foreground">
        Nettomigrasjon er antall som flyttet inn til landet minus antall som flyttet ut i løpet av
        2023, både egne borgere og andre. Brune land hadde flere som flyttet ut enn inn. Blågrønne
        land hadde flere som flyttet inn. Vi har delt på folketallet for å kunne sammenlikne store
        og små land, og antall personer står i tabellen. Tallene er anslag fra FNs World Population
        Prospects 2024, og 2023 er siste år med anslag der. Store bevegelser, som flukt fra krig,
        kan endre tallene raskt. Data: Verdensbanken, World Development Indicators, SM.POP.NETM og
        SP.POP.TOTL, uttrekk 7. og 9. november 2026, CC BY 4.0. Egen beregning og tegning
        (Verdensbanken, 2026a, 2026b).
      </figcaption>
    </figure>
  );
}

export function GeografiMigrantkorridorer() {
  const id = useId();
  const verden = land as { name: string; iso3: string; path: string }[];
  return (
    <figure aria-labelledby={id} className="my-8 space-y-3 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        Figur 11.5 – Ti store forbindelser mellom fødeland og bostedsland, 2024
      </h3>
      <div className="overflow-x-auto">
        <svg
          viewBox="150 20 600 280"
          className="min-w-[560px] w-full rounded bg-sky-50"
          role="img"
          aria-label="Skjematisk verdenskart med ti nummererte piler fra fødeland til bostedsland. Alle pilene er like tykke. De lengste går fra India og Kina til USA. De andre går mellom naboland eller land i samme region, som Mexico til USA, Afghanistan til Iran og Venezuela til Colombia."
        >
          <defs>
            <marker
              id={`${id}-pil`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10Z" fill="#7c2d12" />
            </marker>
          </defs>
          {verden.map((c) => (
            <path
              key={c.iso3 + c.name}
              d={c.path}
              fill="#e5e7eb"
              stroke="#9ca3af"
              strokeWidth="0.3"
            />
          ))}
          {korr.korridorer.map((k) => {
            const mx = (k.fx + k.tx) / 2,
              my = (k.fy + k.ty) / 2 - Math.min(40, Math.hypot(k.tx - k.fx, k.ty - k.fy) * 0.25);
            return (
              <g key={k.nr}>
                <path
                  d={`M${k.fx} ${k.fy} Q${mx} ${my} ${k.tx} ${k.ty}`}
                  fill="none"
                  stroke="#7c2d12"
                  strokeWidth="1.6"
                  markerEnd={`url(#${id}-pil)`}
                />
                <circle
                  cx={mx}
                  cy={(my + (k.fy + k.ty) / 2) / 2}
                  r="4.2"
                  fill="#fff"
                  stroke="#7c2d12"
                  strokeWidth="0.8"
                />
                <text
                  x={mx}
                  y={(my + (k.fy + k.ty) / 2) / 2 + 2.3}
                  fontSize="6"
                  textAnchor="middle"
                  fill="#111827"
                >
                  {k.nr}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <table className="w-full text-left text-sm">
        <caption className="text-left">
          Personer født i ett land og bosatt i et annet midt i 2024
        </caption>
        <thead>
          <tr>
            <th scope="col">Nr.</th>
            <th scope="col">Fødeland</th>
            <th scope="col">Bostedsland</th>
            <th scope="col" className="text-right">
              Personer
            </th>
          </tr>
        </thead>
        <tbody>
          {korr.korridorer.map((k) => (
            <tr key={k.nr}>
              <td>{k.nr}</td>
              <th scope="row" className="font-normal">
                {k.fra}
              </th>
              <td>{k.til}</td>
              <td className="text-right">{tall(k.antall)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="text-sm text-muted-foreground">
        Kartet viser de ti største forbindelsene mellom to land i FNs migrantbestand for 2024.
        Hongkong er utelatt fordi det ikke er et eget land i kartgrunnlaget. Tallene viser hvor
        mange som bor i et annet land enn der de ble født, ikke hvor mange som flyttet i 2024.
        Dataene skiller ikke mellom arbeid, familie og flukt, så flyktninger er også med. Alle
        pilene har samme tykkelse, og de viser forbindelser, ikke reiseruter. Kartet er forenklet og
        viser bare et lite utvalg. Data: FN, International Migrant Stock 2024, tabell 1, CC BY 3.0
        IGO. Pilene starter og slutter i Natural Earths etikettpunkt for hvert land. Land: Natural
        Earth 1:110m (Public Domain). Egen tegning (FNs avdeling for økonomiske og sosiale saker [UN DESA], 2024; Natural Earth, u.å.).
      </figcaption>
    </figure>
  );
}
