import { Callout } from "@/components/callout";

export function Kompetansemal() {
  return (
    <>
      <Callout title="Kompetansemål i LK20 (Geofag 1)">
        <p>
          Målet for kapittelet er at eleven skal kunne <em>gjøre rede for indre krefter og prosesser, platetektonikk og
          hvilke konsekvenser dette har for jordskorpen og jordoverflaten</em>, samt forstå hvordan norsk natur og
          geologi er et resultat av denne globale dynamikken.
        </p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Kjerneelementer som dekkes i dette kapittelet:</strong></p>
          <p>• <em>Jordens indre krefter og prosesser:</em> Litosfære, astenosfære, konveksjon og slab pull som hoveddrivkraft.</p>
          <p>• <em>Plategrenser og landskapsutvikling:</em> Divergente, konvergente og transforme grenser samt Wilsonsyklusen.</p>
          <p>• <em>Norge i platetektonisk lys:</em> Kaledonidene, Leka-ofiolitten, Oslofeltets riftdal og postglasial landheving.</p>
        </div>
      </Callout>
    </>
  );
}
