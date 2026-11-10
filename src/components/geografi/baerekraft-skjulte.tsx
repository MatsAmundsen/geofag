import { useId } from "react";
import { C, Diagram, L } from "@/components/diagrams/svg-kit";
import { GeografiVerdenskart } from "./verdenskart";
import data from "@/lib/geografi-kap8-skjulte-data.json";

const BLAA = ["#eff6ff", "#bfdbfe", "#60a5fa", "#2563eb", "#1e3a8a"];

export function GeografiFattigdomKart() {
  const id = useId();
  const rows = data.fattigdom.map((r) => ({
    iso3: r.iso3,
    navn: `${r.navn} (${r.ar})`,
    verdi: r.verdi,
  }));
  return (
    <figure aria-labelledby={id} className="my-8 space-y-3 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        Figur 8.1 – Andel som lever for under 3,00 dollar per dag
      </h3>
      <GeografiVerdenskart
        rows={rows}
        enhet="prosent av befolkningen"
        desimaler={1}
        ukjent="Ingen måling 2015–2025 i datakilden"
        klasser={[
          { grense: 1, navn: "Under 1 %", farge: BLAA[0] },
          { grense: 5, navn: "1 til under 5 %", farge: BLAA[1] },
          { grense: 20, navn: "5 til under 20 %", farge: BLAA[2] },
          { grense: 40, navn: "20 til under 40 %", farge: BLAA[3] },
          { grense: Infinity, navn: "40 % eller mer", farge: BLAA[4] },
        ]}
      />
      <figcaption className="text-sm text-muted-foreground">
        Verdensbanken, World Development Indicators, SI.POV.DDAY: andel av befolkningen under 3,00
        internasjonale dollar per dag i 2021-kjøpekraft (Poverty and Inequality Platform). Uttrekk
        7. november 2026, CC BY 4.0. Hvert land vises med siste måleår mellom 2015 og 2025, og året
        står i parentes. Landene er derfor ikke målt samme år. Tallene bygger på
        husholdningsundersøkelser og kan ikke sammenliknes med eldre utgaver med annen
        fattigdomsgrense (World Bank, 2026).
      </figcaption>
    </figure>
  );
}

export function GeografiCo2Kart() {
  const id = useId();
  return (
    <figure aria-labelledby={id} className="my-8 space-y-3 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        Figur 8.6 – CO₂ per person fra fossil energi og industri, 2024
      </h3>
      <GeografiVerdenskart
        rows={data.co2_2024}
        enhet="tonn CO₂ per person"
        desimaler={2}
        klasser={[
          { grense: 1, navn: "Under 1 tonn", farge: "#fff7ed" },
          { grense: 3, navn: "1 til under 3 tonn", farge: "#fed7aa" },
          { grense: 6, navn: "3 til under 6 tonn", farge: "#fb923c" },
          { grense: 10, navn: "6 til under 10 tonn", farge: "#c2410c" },
          { grense: Infinity, navn: "10 tonn eller mer", farge: "#7c2d12" },
        ]}
      />
      <figcaption className="text-sm text-muted-foreground">
        Global Carbon Budget (2025), behandlet av Our World in Data, CC BY 4.0. Samme
        observasjonsår, 2024, for alle land. Territorielle utslipp av CO₂ fra fossil energi og
        industri, delt på folketallet. Ikke andre klimagasser, ikke arealbruk og ikke
        forbruksbaserte utslipp. Internasjonal luft- og skipsfart er ikke fordelt på land (Global
        Carbon Budget, 2025; Ritchie et al., 2023).
      </figcaption>
    </figure>
  );
}

const SERIE = [
  { key: "World", navn: "Verden", farge: "#525252", strek: "6 4" },
  { key: "Norway", navn: "Norge", farge: "#1d4ed8", strek: undefined },
  { key: "China", navn: "Kina", farge: "#b91c1c", strek: "2 3" },
] as const;

export function GeografiCo2Serie() {
  const x = (ar: number) => 80 + ((ar - 1990) / 34) * 760;
  const y = (v: number) => 330 - (v / 12) * 290;
  const serie = data.co2_serie as unknown as Record<string, [number, number][]>;
  return (
    <div className="space-y-2">
      <Diagram
        heading="Figur 8.7 – CO₂ per person 1990–2024: Verden, Norge og Kina"
        title="Linjediagram over CO₂ per person fra fossil energi og industri"
        caption="Global Carbon Budget (2025) via Our World in Data, CC BY 4.0. Samme definisjon og metode for alle år: territorielle utslipp fra fossil energi og industri per person. Ikke andre klimagasser, arealbruk eller forbruksbaserte utslipp. Siste år kan bli revidert i senere utgaver. Verdiene står i tabellen under (Andrew & Peters, 2025)."
        viewBox="0 0 900 400"
        wide
        scroll
      >
        {() => (
          <>
            {[0, 3, 6, 9, 12].map((v) => (
              <g key={v}>
                <line x1="80" x2="840" y1={y(v)} y2={y(v)} stroke={C.dim} strokeWidth="0.6" />
                <L x="70" y={y(v) + 5} anchor="end" size={13}>
                  {v}
                </L>
              </g>
            ))}
            {[1990, 2000, 2010, 2020, 2024].map((a) => (
              <L key={a} x={x(a)} y="355" anchor="middle" size={13}>
                {a}
              </L>
            ))}
            <L x="20" y="25" size={13}>
              Tonn CO₂ per person
            </L>
            {SERIE.map((s) => (
              <g key={s.key}>
                <path
                  d={serie[s.key]
                    .map(([a, v], i) => `${i ? "L" : "M"}${x(a).toFixed(1)},${y(v).toFixed(1)}`)
                    .join("")}
                  fill="none"
                  stroke={s.farge}
                  strokeWidth="3"
                  strokeDasharray={s.strek}
                />
                <L
                  x={x(2024) + 6}
                  y={y(serie[s.key][serie[s.key].length - 1][1]) + 5}
                  size={14}
                  fill={s.farge}
                >
                  {s.navn}
                </L>
              </g>
            ))}
          </>
        )}
      </Diagram>
      <details>
        <summary>Tekstalternativ: verdier for utvalgte år</summary>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th scope="col">År</th>
              {SERIE.map((s) => (
                <th key={s.key} scope="col">
                  {s.navn}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {serie.World.filter(([a]) => a % 5 === 0 || a === 2024).map(([a]) => (
              <tr key={a}>
                <th scope="row">{a}</th>
                {SERIE.map((s) => (
                  <td key={s.key}>
                    {serie[s.key].find(([b]) => b === a)?.[1].toLocaleString("nb-NO")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}

const GRENSER = [
  { navn: "Klimaendringer", over: true },
  { navn: "Naturens mangfold", over: true },
  { navn: "Arealbruk", over: true },
  { navn: "Ferskvann", over: true },
  { navn: "Nitrogen og fosfor", over: true },
  { navn: "Nye stoffer og materialer", over: true },
  { navn: "Havforsuring", over: true },
  { navn: "Partikler i lufta", over: false },
  { navn: "Ozonlaget", over: false },
] as const;

export function GeografiPlanetaereGrenser() {
  return (
    <Diagram
      heading="Figur 8.4 – Ni planetære grenser, vurdering fra 2026"
      title="Ni sektorer i en sirkel. Sju er merket som overskredet, to som innenfor grensen"
      caption="Egen forenklet tegning, ikke en kopi av PIKs grafikk. Inndelingen følger Planetary Health Check fra PIK 21. september 2026, der sju av ni grenser var overskredet. Sektorene er like store og viser ikke hvor langt hver grense er overskredet. Grensene påvirker hverandre (PIK, 2026)."
      viewBox="0 0 900 520"
      wide
      scroll
    >
      {() => (
        <>
          <circle
            cx="450"
            cy="260"
            r="110"
            fill="#15803d"
            fillOpacity="0.18"
            stroke="#15803d"
            strokeWidth="2"
          />
          <L x="450" y="255" anchor="middle" size={14}>
            Tryggere
          </L>
          <L x="450" y="275" anchor="middle" size={14}>
            handlingsrom
          </L>
          {GRENSER.map((g, i) => {
            const a0 = (i / 9) * 2 * Math.PI - Math.PI / 2,
              a1 = ((i + 1) / 9) * 2 * Math.PI - Math.PI / 2,
              am = (a0 + a1) / 2;
            const r0 = 112,
              r1 = g.over ? 200 : 104;
            const p = (r: number, a: number) =>
              `${(450 + r * Math.cos(a)).toFixed(1)},${(260 + r * Math.sin(a)).toFixed(1)}`;
            return (
              <g key={g.navn}>
                {g.over && (
                  <path
                    d={`M${p(r0, a0)} L${p(r1, a0)} A${r1},${r1} 0 0 1 ${p(r1, a1)} L${p(r0, a1)} A${r0},${r0} 0 0 0 ${p(r0, a0)}Z`}
                    fill="#fca5a5"
                    stroke="#b91c1c"
                    strokeWidth="1.5"
                  />
                )}
                {!g.over && (
                  <path
                    d={`M${p(40, a0)} L${p(r1, a0)} A${r1},${r1} 0 0 1 ${p(r1, a1)} L${p(40, a1)}Z`}
                    fill="#86efac"
                    fillOpacity="0.6"
                    stroke="#15803d"
                    strokeDasharray="4 3"
                  />
                )}
                <L
                  x={450 + 225 * Math.cos(am)}
                  y={260 + 225 * Math.sin(am)}
                  anchor={Math.cos(am) > 0.2 ? "start" : Math.cos(am) < -0.2 ? "end" : "middle"}
                  size={14}
                  weight={700}
                >
                  {g.navn}
                </L>
                <L
                  x={450 + 225 * Math.cos(am)}
                  y={260 + 225 * Math.sin(am) + 18}
                  anchor={Math.cos(am) > 0.2 ? "start" : Math.cos(am) < -0.2 ? "end" : "middle"}
                  size={13}
                >
                  {g.over ? "Overskredet" : "Innenfor"}
                </L>
              </g>
            );
          })}
        </>
      )}
    </Diagram>
  );
}
