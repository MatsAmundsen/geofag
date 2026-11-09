import { useId, useState, type ReactNode } from "react";
import { C, L } from "@/components/diagrams/svg-kit";
import land from "@/lib/geografi-verdensland.json";
import data from "@/lib/geografi-skjelv-2023.json";

const PLATER = [
  { key: "Divergent Boundary", navn: "Spredningsgrense", farge: "#0f766e", strek: undefined },
  {
    key: "Convergent Boundary",
    navn: "Kollisjons- eller subduksjonsgrense",
    farge: "#b91c1c",
    strek: "10 4",
  },
  { key: "Transform Boundary", navn: "Transformgrense", farge: "#7c3aed", strek: "2 4" },
  { key: "Other", navn: "Annen eller usikker grense", farge: "#525252", strek: "1 6" },
] as const;

type Props = {
  heading: string;
  caption: ReactNode;
  visSkjelv?: boolean;
  ekstra?: ReactNode;
  ekstraForklaring?: ReactNode;
};

export function SkjelvVerdenskart({
  heading,
  caption,
  visSkjelv = true,
  ekstra,
  ekstraForklaring,
}: Props) {
  const id = useId();
  const [skjelv, setSkjelv] = useState(visSkjelv);
  const sterke = data.skjelv.filter((s) => s.mag >= 7);
  return (
    <figure aria-labelledby={id} className="my-8 space-y-3 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        {heading}
      </h3>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 900 560"
          role="img"
          aria-label={`${heading}. Kartet har tekstalternativ i tabellen under.`}
          className="min-w-[640px] w-full"
        >
          <rect width="900" height="560" fill="#eef6fb" />
          {land.map((l) => (
            <path key={l.iso3} d={l.path} fill="#e7e5e4" stroke="#a8a29e" strokeWidth="0.4" />
          ))}
          {PLATER.map((p) => (
            <path
              key={p.key}
              d={data.plater[p.key]}
              fill="none"
              stroke={p.farge}
              strokeWidth="1.6"
              strokeDasharray={p.strek}
            />
          ))}
          {skjelv &&
            data.skjelv.map((s) => (
              <circle
                key={s.id}
                cx={s.x}
                cy={s.y}
                r={s.mag >= 7 ? 6 : 3}
                fill={s.mag >= 7 ? "#f59e0b" : "#fbbf24"}
                fillOpacity="0.85"
                stroke={C.fg}
                strokeWidth="0.6"
              >
                <title>{`M ${s.mag}, ${s.dato}, ${s.sted}`}</title>
              </circle>
            ))}
          {ekstra}
          <L x="450" y="552" anchor="middle" size={12}>
            Egen Gall–Peters-projeksjon, flateriktig. Nord er opp.
          </L>
        </svg>
      </div>
      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {PLATER.map((p) => (
          <li key={p.key} className="flex items-center gap-2">
            <svg width="34" height="10" aria-hidden="true">
              <line
                x1="0"
                x2="34"
                y1="5"
                y2="5"
                stroke={p.farge}
                strokeWidth="2.5"
                strokeDasharray={p.strek}
              />
            </svg>
            {p.navn}
          </li>
        ))}
        {skjelv && (
          <li className="flex items-center gap-2">
            <svg width="30" height="14" aria-hidden="true">
              <circle cx="6" cy="7" r="3" fill="#fbbf24" stroke="#000" strokeWidth="0.6" />
              <circle cx="20" cy="7" r="6" fill="#f59e0b" stroke="#000" strokeWidth="0.6" />
            </svg>
            Jordskjelv 2023: liten sirkel M 6–6,9, stor sirkel M 7 eller mer
          </li>
        )}
        {ekstraForklaring}
      </ul>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={skjelv} onChange={(e) => setSkjelv(e.target.checked)} /> Vis
        jordskjelvene fra 2023
      </label>
      <details>
        <summary>
          Tekstalternativ: {data.skjelv.length} jordskjelv, hvorav {sterke.length} på M 7 eller mer
        </summary>
        <table className="w-full text-left text-sm">
          <caption>
            Jordskjelv med M 7 eller mer i 2023, ifølge USGS-katalogen. Datoene er UTC.
          </caption>
          <thead>
            <tr>
              <th scope="col">Dato</th>
              <th scope="col">Magnitude</th>
              <th scope="col">Sted (USGS)</th>
              <th scope="col">Dybde, km</th>
            </tr>
          </thead>
          <tbody>
            {sterke.map((s) => (
              <tr key={s.id}>
                <td>{s.dato}</td>
                <td>{s.mag.toLocaleString("nb-NO")}</td>
                <td>{s.sted}</td>
                <td>{s.dybdeKm}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm">
          De fleste skjelvene ligger langs plategrensene, særlig rundt Stillehavet. Noen ligger inne
          på platene. Kartet viser ett år og bare sterke skjelv, ikke alle skjelv eller hvor skadene
          ble størst.
        </p>
      </details>
      <figcaption className="text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
