import { Callout } from "@/components/callout";

export function Seksjon() {
  return (
    <Callout title="De 4 vanligste eksamensfellene i Geofag 2">
      <ul className="space-y-2 text-sm leading-relaxed">
        <li>
          <strong>1. Jetstrømmen regner ikke:</strong> En av de vanligste feilene er å tro at
          jetstrømmen selv er en regnsky fordi det «regner under den». Jetstrømmen befinner seg 9–11
          km oppe i iskald, knusktørr luft. Nedbøren produseres ved bakken, i de dynamiske lavtrykkene
          som suges i gang av jetens øvre divergenssone (venstre utløp).
        </li>
        <li>
          <strong>2. To jetbelter, ikke ett:</strong> Husk at det er to permanente jetbelter på hver
          halvkule. Polarfrontjeten (55°–65°N, 9–11 km) drives av temperaturgradienten over
          polarfronten. Den subtropiske jeten (30°N, 13–16 km) drives av bevaring av vinkelmoment i
          Hadleycellen. Polar natt-jeten er noe helt annet – den ligger i stratosfæren.
        </li>
        <li>
          <strong>3. Termisk vind er ikke vind fra varm bakke:</strong> Ordet «termisk vind» betyr
          ikke at varm luft blåser bortover bakken. Det er et matematisk/fysisk begrep for den{" "}
          <em>vertikale vindskjæringen</em> (vindøkningen med høyden) som tvinges frem fordi en varm
          luftsøyle er tykkere enn en kald luftsøyle.
        </li>
        <li>
          <strong>4. Venstre utløp dypner lavtrykk – ikke innløpet:</strong> Til eksamen må du
          presisere hvilken del av jetkjernen som skaper storm: Det er <strong>venstre utløp (left exit)</strong>{" "}
          og høyre innløp som har divergens i høyden og suger opp luft fra bakken. Høyre utløp gir
          konvergens, nedsynking og høytrykk.
        </li>
      </ul>
    </Callout>
  );
}
