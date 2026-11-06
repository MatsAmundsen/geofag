import { Arrow, C, Diagram, L } from "@/components/diagrams/svg-kit";

// Authored exercise values: never station observations, forecasts or climate normals.
const OVING = [
  ["Jan", -4, 60], ["Feb", -3, 45], ["Mar", 1, 45], ["Apr", 6, 40],
  ["Mai", 11, 50], ["Jun", 15, 65], ["Jul", 17, 80], ["Aug", 16, 85],
  ["Sep", 12, 80], ["Okt", 7, 90], ["Nov", 2, 85], ["Des", -2, 70],
] as const;

export function GeografiKlimadiagram() {
  const temperatureY = (value: number) => 330 - (value + 10) * 8;
  const rainY = (value: number) => 330 - value * 2;
  return <div className="space-y-3">
    <Diagram title="Konstruert klimadiagram: temperatur som linje og nedbør som søyler" heading="Figur 5.1 – Slik leser vi et klimadiagram"
      caption="Tallene er konstruert for øving. De gjelder ingen værstasjon, måleperiode eller klimanormal. Temperatur leses på venstre akse, nedbør på høyre. Linje og punkter viser temperatur, søyler viser nedbør. Framstillingsmåten brukes også av Meteorologisk institutt (2021)." viewBox="0 0 900 420" wide scroll>
      {() => <>
        <L x="85" y="40" fill={C.warm} size={17}>Temperatur (°C), linje</L>
        <L x="790" y="40" fill={C.rain} size={17} anchor="end">Nedbør (mm), søyler</L>
        {[-10, 0, 10, 20].map((value) => <g key={value}>
          <line x1="90" x2="760" y1={temperatureY(value)} y2={temperatureY(value)} stroke={C.dim} />
          <L x="75" y={temperatureY(value) + 5} anchor="end" size={15} fill={C.warm}>{value}</L>
        </g>)}
        {[0, 40, 80, 120].map((value) => <L key={value} x="775" y={rainY(value) + 5} size={15} fill={C.rain}>{value}</L>)}
        {OVING.map(([month, , rain], i) => <g key={month}>
          <rect x={96 + i * 55} y={rainY(rain)} width="28" height={330 - rainY(rain)} fill={C.rain} opacity="0.65" />
          <L x={110 + i * 55} y="365" size={15} anchor="middle">{month}</L>
        </g>)}
        <polyline points={OVING.map(([, temperature], i) => `${110 + i * 55},${temperatureY(temperature)}`).join(" ")} stroke={C.warm} strokeWidth="4" fill="none" />
        {OVING.map(([month, temperature], i) => <circle key={month} cx={110 + i * 55} cy={temperatureY(temperature)} r="4" fill={C.warm} />)}
        <L x="450" y="405" anchor="middle" size={16}>Øvingsdata, ikke målte forhold på et virkelig sted</L>
      </>}
    </Diagram>
    <details className="rounded-lg border border-border p-4">
      <summary className="cursor-pointer font-semibold">Vis øvingstallene som tabell</summary>
      <div className="overflow-x-auto"><table className="mt-3 w-full text-left text-sm">
        <caption className="pb-2 text-left">Konstruert øvingsdatasett uten stasjon eller normalperiode</caption>
        <thead><tr><th scope="col">Måned</th><th scope="col">Temperatur (°C)</th><th scope="col">Nedbør (mm)</th></tr></thead>
        <tbody>{OVING.map(([month, temperature, rain]) => <tr key={month}><th scope="row">{month}</th><td>{temperature.toLocaleString("nb-NO")}</td><td>{rain}</td></tr>)}</tbody>
      </table></div>
    </details>
  </div>;
}

export function GeografiKlimaScenario() {
  return <Diagram title="To kvalitative utslippsscenarioer og en forsterkende tilbakekopling" heading="Figur 5.9 – Valg endrer utviklingen"
    caption="Dette er kvalitative årsakskjeder, ikke temperaturkurver eller beregnede IPCC-baner. Lavere framtidige utslipp gir mindre oppvarming enn høyere utslipp. Tilbakekoplingen nederst viser hvordan tap av reflekterende snø og is kan forsterke oppvarming. Hvert scenario har usikkerhet, og ingen sannsynlighet for politiske valg er angitt (IPCC, 2023; Lindsey, 2009)." viewBox="0 0 900 440" wide scroll>
    {(m) => <>
      {[{ x: 35, name: "Lavere utslipp", next: "Mindre tilleggsoppvarming", color: C.teal }, { x: 465, name: "Høyere utslipp", next: "Større tilleggsoppvarming", color: C.warm }].map(({ x, name, next, color }) => <g key={name}>
        <rect x={x} y="35" width="400" height="180" rx="12" fill="#152430" stroke={color} />
        <L x={x + 200} y="80" anchor="middle" size={22} fill={color} weight={700}>{name}</L>
        <Arrow d={`M ${x + 200} 100 L ${x + 200} 135`} marker={m.teal} color={C.teal} width={3} />
        <L x={x + 200} y="175" anchor="middle" size={19}>{next}</L>
      </g>)}
      <L x="450" y="265" anchor="middle" size={19} weight={700}>Et eksempel på forsterkende tilbakekopling</L>
      {["Oppvarming", "Mindre snø og is", "Mer solenergi tas opp", "Mer oppvarming"].map((label, i) => <g key={label}>
        <rect x={20 + i * 225} y="295" width="200" height="65" rx="8" fill="#152430" stroke={C.sand} />
        <L x={120 + i * 225} y="333" anchor="middle" size={15}>{label}</L>
        {i !== 3 && <Arrow d={`M ${222 + i * 225} 327 L ${241 + i * 225} 327`} marker={m.sand} color={C.sand} width={2} />}
      </g>)}
      <L x="450" y="405" anchor="middle" size={16}>En forsterkning er ikke det samme som ubegrenset oppvarming.</L>
    </>}
  </Diagram>;
}
