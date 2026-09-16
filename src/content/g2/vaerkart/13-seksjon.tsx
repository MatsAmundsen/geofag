import { Link } from "@tanstack/react-router";

export function Seksjon3() {
  return (
    <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
      <h3 className="font-display text-lg font-medium text-primary">Veien videre i Geofag 2</h3>
      <p className="mt-2 text-sm text-foreground/90">
        Neste steg er{" "}
        <Link to="/tema/jetstrommer" className="font-semibold text-primary underline-offset-4 hover:underline">
          Jetstrømmene
        </Link>
        {" "}og{" "}
        <Link to="/tema/lokale-vaersystemer" className="font-semibold text-primary underline-offset-4 hover:underline">
          Lokale værsystemer
        </Link>
        .
      </p>
    </div>
  );
}
