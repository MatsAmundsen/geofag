import { Callout } from "@/components/callout";

export function Seksjon4() {
  return (
    <Callout title="De 4 vanligste eksamensfellene i Geofag 2">
      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
        <li>
          <strong>Felle 1: Å tro at klimamodeller skal spå været på en gitt dag i fremtiden.</strong>{" "}
          En klassisk eksamensfeil er å si at «klimamodeller er upålitelige fordi de ikke kan vite om
          det regner 17. mai 2080». Klimamodeller er randverdiproblemer som beregner{" "}
          <em>værets statistikk</em> (gjennomsnitt, varians og ekstremfrekvens) drevet av ytre
          klimagasspådriv, ikke det spesifikke været på en bestemt enkeltdag.
        </li>
        <li>
          <strong>Felle 2: Å tro at et ensemble betyr at superdatamaskinen «gjør feil».</strong> Noen
          elever tror at stor spredning i et ensemble betyr at datamaskinen er ødelagt. Sannheten er
          den motsatte: Spredningen kartlegger atmosfærens reelle fysiske uforutsigbarhet. Når
          ensemblet spriker på dag 8, er det vitenskapelig ærlig å si at været er usikkert, snarere
          enn å gi et villedende, skråsikkert deterministisk tall.
        </li>
        <li>
          <strong>Felle 3: Å forveksle rutenettoppløsning med parametrisering.</strong> En modell
          med 2,5 km oppløsning ser ikke hvert tre, hvert hus eller hver bekk. Prosesser som er mindre
          enn cellestørrelsen må fortsatt parametriseres. Forskjellen er at med 2,5 km grid kan dype
          bygeskyer og store fjelltopper løses direkte, mens sky-mikrofysikk og turbulens fortsatt må
          parametriseres.
        </li>
        <li>
          <strong>Felle 4: Å tro at modeller bare er statistisk kurvetilpasning.</strong> Numeriske
          modeller er ikke statistiske kurver tegnet etter gårsdagens temperatur. De bygger på eksakt,
          deterministisk fysikk (Newtons lover, massebevaring og termodynamikk) som har vært kjent og
          testet i laboratorier i over tre hundre år.
        </li>
      </ul>
    </Callout>
  );
}
