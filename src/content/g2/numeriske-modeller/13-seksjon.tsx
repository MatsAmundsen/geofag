import { Callout } from "@/components/callout";

export function Seksjon4() {
  return (
    <Callout title="De 4 vanligste eksamensfellene i Geofag 2">
      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
        <li>
          <strong>Klimamodeller skal ikke spå været på en gitt dag.</strong> De beregner statistikk
          drevet av ytre pådriv.
        </li>
        <li>
          <strong>Ensemble-spredning er ikke maskinfeil.</strong> Den kartlegger reell usikkerhet.
        </li>
        <li>
          <strong>Oppløsning er ikke det samme som parametrisering.</strong> Sub-grid-prosesser må
          fortsatt parametriseres.
        </li>
        <li>
          <strong>Modeller er fysikk, ikke bare statistikk.</strong> De løser Newtons lover,
          massebevaring og termodynamikk.
        </li>
      </ul>
    </Callout>
  );
}
