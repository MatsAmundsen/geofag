import { Arrow, C, Diagram, L } from "./svg-kit";

export function EnergySourcesDiagram() {
  return (
    <Diagram
      title="Energi fra atmosfære og hav: vind på land, havvind, bølger og tidevann"
      heading="Fire kilder, samme fysikk"
      caption="Vind er trykkforskjell i bevegelse. Havvind er samme ressurs over hav, jevnere og ofte sterkere. Bølger er vindenergi som har gått over i vannoverflaten. Tidevann er gravitasjon fra måne og sol, ikke vær."
      viewBox="0 0 900 300"
      wide
    >
      {() => (
        <>
          {[
            { x: 30, t: "Vind på land", s: "trykkgradient" },
            { x: 250, t: "Havvind", s: "jevnere ressurs" },
            { x: 470, t: "Bølger", s: "vind overført til hav" },
            { x: 690, t: "Tidevann", s: "måne og sol" },
          ].map((b) => (
            <g key={b.t}>
              <rect x={b.x} y="70" width="180" height="150" rx="10" fill="#152028" stroke={C.teal} strokeWidth="1.4" />
              <L x={b.x + 90} y="130" size={16} weight={600} anchor="middle">
                {b.t}
              </L>
              <L x={b.x + 90} y="158" fill={C.muted} size={13} anchor="middle">
                {b.s}
              </L>
            </g>
          ))}
        </>
      )}
    </Diagram>
  );
}

export function WindPowerTradeoffDiagram() {
  return (
    <Diagram
      title="Avveining: fornybar strøm mot areal, fugl, fiskeri og forsyning"
      heading="Bærekraft er avveining, ikke slagord"
      caption="Kompetansemålet ber om å drøfte. En løsning som kutter utslipp kan likevel slå ut fugletrekk, reindrift, kystfiske eller forsyningssikkerhet. Drøftingen er å holde flere hensyn oppe samtidig."
      viewBox="0 0 820 240"
    >
      {() => (
        <>
          <circle cx="410" cy="120" r="46" fill="#1a3038" stroke={C.fg} strokeWidth="1.6" />
          <L x="410" y="126" size={13} weight={600} anchor="middle">
            anlegg
          </L>
          <L x="160" y="50" fill={C.teal} size={13} anchor="middle">
            kutt i utslipp
          </L>
          <L x="660" y="50" fill={C.warm} size={13} anchor="middle">
            areal og natur
          </L>
          <L x="160" y="210" fill={C.cold} size={13} anchor="middle">
            forsyning
          </L>
          <L x="660" y="210" fill={C.low} size={13} anchor="middle">
            konflikt
          </L>
          <line x1="370" y1="96" x2="220" y2="58" stroke={C.teal} />
          <line x1="450" y1="96" x2="600" y2="58" stroke={C.warm} />
          <line x1="370" y1="150" x2="220" y2="196" stroke={C.cold} />
          <line x1="450" y1="150" x2="600" y2="196" stroke={C.low} />
        </>
      )}
    </Diagram>
  );
}
