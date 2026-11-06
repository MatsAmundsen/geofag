import { C, Diagram, L } from "@/components/diagrams/svg-kit";

export function GeografiRessursFornyelse() {
  const groups = [
    { x: 20, title: "Ikke-fornybar", example: "Petroleum og malm", note: "Erstattes ikke i takt med uttaket" },
    { x: 320, title: "Betinget fornybar", example: "Skog og fisk", note: "Produksjonsgrunnlaget må bevares" },
    { x: 620, title: "Fornybare energistrømmer", example: "Sol og vind", note: "Bruken tømmer ikke energikilden" },
  ];
  return <Diagram title="Tre ressurstyper ordnet etter fornyelse og vilkår for bruk" heading="Figur 7.2 – Hva er det som fornyes?"
    caption="Egen kvalitativ modell etter Olerud (2025) og Hofstad og Seip (2025). Plasseringen har ingen tallakse og er ingen miljø- eller bærekraftrangering. Metaller kan gjenvinnes uten at malmforekomsten blir fornybar. Avlinger kan fornyes, men selve jordsmonnet behandles som ikke-fornybart på menneskelige tidsskalaer (NIBIO, u.å.)." viewBox="0 0 920 235" wide scroll>
    {() => <>
      <line x1="35" y1="30" x2="885" y2="30" stroke={C.teal} strokeWidth="8" />
      {groups.map(({ x, title, example, note }) => <g key={title}>
        <rect x={x} y="60" width="280" height="145" rx="10" fill="#182732" stroke={C.teal} />
        <L x={x + 140} y="98" anchor="middle" size={17} weight={700}>{title}</L>
        <L x={x + 140} y="140" anchor="middle" size={19}>{example}</L>
        <L x={x + 140} y="178" anchor="middle" size={13}>{note}</L>
      </g>)}
    </>}
  </Diagram>;
}
