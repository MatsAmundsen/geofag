import { Callout } from "@/components/callout";

export function Seksjon() {
  return (
    <Callout title="Kompetansemål i Geofag 2">
      <p>
        Målet i læreplanen (LK20) krever at eleven skal kunne:{" "}
        <strong>
          «gjøre rede for hvordan ulike værsystemer oppstår og utvikler seg på global, regional og
          lokal skala, og tolke ulike værkart og værutvikling»
        </strong>{" "}
        (Utdanningsdirektoratet, 2020).
      </p>
      <p className="mt-2 text-sm text-foreground/80">
        Dette kapittelet gir deg den faglige verktøykassen som kreves for å lese profesjonelle
        analyser fra Meteorologisk institutt (MET Norway) og Yr, tolke WMO-stasjonsmodeller,
        forstå styrestrømmer i høyden og gjennomføre en fullverdig 24-timers prognose på
        eksamensnivå.
      </p>
    </Callout>
  );
}
