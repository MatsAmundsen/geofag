import { Callout } from "@/components/callout";

export function Seksjon() {
  return (
    <Callout title="De 4 vanligste eksamensfellene i Geofag 2">
      <ul className="space-y-2 text-sm leading-relaxed">
        <li>
          <strong>1. Jetstrømmen regner ikke:</strong> Nedbøren produseres ved bakken i lavtrykkene
          som suges i gang av jetens venstre utløp.
        </li>
        <li>
          <strong>2. To jetbelter, ikke ett:</strong> Polarfrontjeten (55°–65°N) og den subtropiske
          jeten (30°N). Polar natt-jeten ligger i stratosfæren.
        </li>
        <li>
          <strong>3. Termisk vind er ikke vind fra varm bakke:</strong> Det er vertikal vindskjæring
          fordi en varm luftsøyle er tykkere enn en kald.
        </li>
        <li>
          <strong>4. Venstre utløp dypner lavtrykk – ikke innløpet.</strong>
        </li>
      </ul>
    </Callout>
  );
}
