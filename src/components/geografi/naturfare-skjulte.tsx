import { C, Diagram, L } from "@/components/diagrams/svg-kit";
import { SkjelvVerdenskart } from "./skjelv-verdenskart";

export function GeografiSkjelvPlater() {
  return (
    <SkjelvVerdenskart
      heading="Figur 6.1 – Jordskjelv i 2023 og plategrensene"
      caption="Jordskjelv: USGS ANSS Comprehensive Catalog (ComCat), alle 147 hendelser med magnitude 6 eller mer fra 1. januar til 31. desember 2023 (UTC), hentet 6. november 2026. Plategrenser: USGS-karttjenesten Tectonic Plate Boundaries, bygd på Bird (2003). Land: Natural Earth 5.1.1. Alle er offentlige data uten bruksbegrensning (Public Domain). Egen tegning og egen symbolisering. Magnitude sier noe om energien i skjelvet, ikke om skadene (USGS, u.å.-d, u.å.-e; Bird, 2003)."
    />
  );
}

export function GeografiFareEksponering() {
  const samfunn = [
    {
      x: 240,
      navn: "Samfunn A",
      eksp: "Få bygninger og mennesker der faren treffer",
      saarb: "Bygg tåler mer, varsling og hjelp når fram",
    },
    {
      x: 660,
      navn: "Samfunn B",
      eksp: "Mange bygninger og mennesker der faren treffer",
      saarb: "Svakere bygg, dårligere varsling og hjelp",
    },
  ];
  return (
    <Diagram
      heading="Figur 6.2 – Samme fare, ulik risiko"
      title="To tenkte samfunn treffes av den samme naturfaren, men har ulik eksponering og sårbarhet"
      caption="Egen prinsippskisse etter UNDRR (2017b, 2017f). Samfunnene er tenkte. Figuren har ingen tall og er ikke en risikokalkulator. Den viser at risiko avhenger av både faren og samfunnet."
      viewBox="0 0 900 380"
      wide
      scroll
    >
      {() => (
        <>
          <rect
            x="40"
            y="20"
            width="820"
            height="56"
            rx="10"
            fill={C.warm}
            fillOpacity="0.25"
            stroke={C.warm}
          />
          <L x="450" y="54" anchor="middle" weight={700}>
            Samme naturfare, for eksempel et like sterkt jordskjelv
          </L>
          {samfunn.map((s, i) => (
            <g key={s.navn}>
              <path d={`M${s.x} 80 V112`} stroke={C.fg} strokeWidth="2" />
              <path
                d={`M${s.x - 6} 104 L${s.x} 114 L${s.x + 6} 104`}
                fill="none"
                stroke={C.fg}
                strokeWidth="2"
              />
              <rect
                x={s.x - 190}
                y="120"
                width="380"
                height="190"
                rx="12"
                fill={C.bg}
                stroke={C.dim}
              />
              <L x={s.x} y="148" anchor="middle" weight={700}>
                {s.navn}
              </L>
              <L x={s.x - 170} y="185" size={14}>
                Eksponering:
              </L>
              <L x={s.x - 170} y="207" size={14}>
                {s.eksp}
              </L>
              <L x={s.x - 170} y="245" size={14}>
                Sårbarhet:
              </L>
              <L x={s.x - 170} y="267" size={14}>
                {s.saarb}
              </L>
              <rect
                x={s.x - 120}
                y="325"
                width="240"
                height="38"
                rx="19"
                fill={i === 0 ? C.teal : C.warm}
                fillOpacity="0.3"
                stroke={i === 0 ? C.teal : C.warm}
              />
              <L x={s.x} y="350" anchor="middle" size={15}>
                {i === 0 ? "Lavere risiko" : "Høyere risiko"}
              </L>
            </g>
          ))}
        </>
      )}
    </Diagram>
  );
}
