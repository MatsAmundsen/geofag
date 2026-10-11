import { Arrow, C, Diagram, L } from "./svg-kit";

export function AssimilationDiagram() {
  return (
    <Diagram
      title="Dataassimilering: modellgjetning pluss observasjoner gir ny starttilstand"
      heading="Slik bygges starttilstanden"
      caption="Modellen har en gjetning. Observasjoner kommer inn med sine feil. Assimilering veier dem sammen. Resultatet er starttilstanden for neste varsel. Uten dette steget driver modellen vekk fra virkeligheten."
      viewBox="0 0 900 240"
      wide
    >
      {(m) => (
        <>
          <rect x="30" y="70" width="200" height="90" rx="10" fill="#152028" stroke={C.muted} strokeWidth="1.5" />
          <L x="130" y="112" size={15} weight={600} anchor="middle">
            modellgjetning
          </L>
          <L x="130" y="134" fill={C.muted} size={12} anchor="middle">
            forrige syklus
          </L>
          <rect x="30" y="20" width="200" height="40" rx="8" fill="#152028" stroke={C.warm} strokeWidth="1.5" />
          <L x="130" y="46" fill={C.warm} size={14} weight={600} anchor="middle">
            observasjoner
          </L>
          <Arrow d="M 240 40 L 330 100" marker={m.warm} color={C.warm} width={2.2} />
          <Arrow d="M 240 110 L 330 110" marker={m.muted} color={C.muted} width={2.2} />
          <rect x="340" y="70" width="220" height="90" rx="10" fill="#152028" stroke={C.teal} strokeWidth="1.6" />
          <L x="450" y="112" fill={C.teal} size={15} weight={600} anchor="middle">
            assimilering
          </L>
          <L x="450" y="134" fill={C.muted} size={12} anchor="middle">
            veid midling
          </L>
          <Arrow d="M 570 115 L 650 115" marker={m.teal} color={C.teal} width={2.6} />
          <rect x="660" y="70" width="210" height="90" rx="10" fill="#152028" stroke={C.fg} strokeWidth="1.6" />
          <L x="765" y="112" size={15} weight={600} anchor="middle">
            starttilstand
          </L>
          <L x="765" y="134" fill={C.muted} size={12} anchor="middle">
            neste varsel
          </L>
        </>
      )}
    </Diagram>
  );
}

export function EnsembleRibbonDiagram() {
  return (
    <Diagram
      title="Ensemble: mange nesten like baner. Tett bunt er høy tillit, sprik er lav tillit"
      heading="Slik leser du et ensemble"
      caption="Hvert medlem er en lovlig starttilstand gitt observasjonene. Ligger kurvene tett: høy tillit. Spriker de etter dag 5: lavtrykkets bane er usikker. «40 % sjanse for regn» er andelen medlemmer over en terskel."
      viewBox="0 0 900 280"
      wide
    >
      {() => (
        <>
          <L x="60" y="36" size={14} weight={600}>
            temperatur / nedbør
          </L>
          {[
            "M 80 140 C 200 130 320 120 440 128 C 560 136 680 150 820 160",
            "M 80 140 C 200 110 320 90 440 100 C 560 80 680 70 820 60",
            "M 80 140 C 200 160 320 180 440 200 C 560 220 680 230 820 240",
            "M 80 140 C 200 145 320 150 440 148 C 560 160 680 170 820 190",
            "M 80 140 C 200 125 320 140 440 160 C 560 190 680 200 820 210",
          ].map((d) => (
            <path key={d} d={d} fill="none" stroke={C.teal} strokeWidth="1.6" opacity="0.85" />
          ))}
          <path
            d="M 80 140 C 200 135 320 132 440 140 C 560 148 680 158 820 168"
            fill="none"
            stroke={C.fg}
            strokeWidth="2.6"
          />
          <L x="80" y="260" fill={C.muted} size={13}>
            dag 0
          </L>
          <L x="440" y="260" fill={C.muted} size={13} anchor="middle">
            dag 4 · fortsatt samlet
          </L>
          <L x="820" y="260" fill={C.muted} size={13} anchor="end">
            dag 8 · sprik
          </L>
          <L x="700" y="48" fill={C.fg} size={12}>
            tykk linje = median
          </L>
        </>
      )}
    </Diagram>
  );
}
