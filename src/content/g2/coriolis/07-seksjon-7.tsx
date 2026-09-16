import { Callout } from "@/components/callout";

export function Seksjon() {
  return (
    <Callout title="De 4 vanligste eksamensfellene om Corioliseffekten">
      <ul className="space-y-2 text-sm leading-relaxed">
        <li>
          <strong>1. Coriolis starter aldri vinden:</strong> Kraften virker 90° på bevegelsen og gjør null arbeid.
          Trykkgradientkraften setter luften i gang.
        </li>
        <li>
          <strong>2. Coriolis virker like sterkt øst–vest som nord–sør</strong> (Eötvös-effekten).
        </li>
        <li>
          <strong>3. Vasken styres ikke av Coriolis:</strong> Rossby-tallet i en kum er Ro ≫ 1.
        </li>
        <li>
          <strong>4. Geostrofisk vind blåser ikke ved bakken:</strong> Friksjon vrir vinden på skrå inn mot lavtrykk.
        </li>
      </ul>
    </Callout>
  );
}
