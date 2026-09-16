import { Callout } from "@/components/callout";

export function Seksjon() {
  return (
    <Callout title="De 4 vanligste eksamensfellene i Geofag 2">
      <ul className="space-y-2 text-sm leading-relaxed">
        <li>
          <strong>1. Tall på værkartet er relative:</strong> 1013,25 hPa er det globale
          gjennomsnittstrykket, ikke en fast grense for høytrykk eller lavtrykk.
        </li>
        <li>
          <strong>2. Skyene i et høytrykk blåser ikke bort:</strong> De forsvinner fordi synkende
          luft varmes adiabatisk, relativ fuktighet faller og skydråpene fordamper.
        </li>
        <li>
          <strong>3. Fønvind er ikke luft fra et varmt sted:</strong> Varmen stammer fra latent varme
          frigjort ved kondensasjon på losiden.
        </li>
        <li>
          <strong>4. Føn bryter inversjoner – katabatisk vind bygger dem.</strong>
        </li>
      </ul>
    </Callout>
  );
}
