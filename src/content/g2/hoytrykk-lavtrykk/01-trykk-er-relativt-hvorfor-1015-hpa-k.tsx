import { OrdBoks } from "@/components/term";
import { RelativePressureDiagram } from "@/components/diagrams";

export function TrykkErRelativtHvorforHpaK() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Trykk er relativt: Hvorfor 1015 hPa kan bety både storm og sol
      </h2>
      <p>
        Høytrykk og lavtrykk er alltid relative. Et lavtrykk er lavere enn naboen; et høytrykk er
        høyere enn naboen. 1015 hPa kan være begge deler, avhengig av omgivelsene.
      </p>
      <OrdBoks
        ord="Relativt lufttrykk"
        barn="Det avgjørende er trykkgradienten mot naboområdene, ikke det absolutte hPa-tallet."
      />
      <p>
        Isobarer binder steder med samme havnivåtrykk. Tette isobarer gir sterk vind; gisne isobarer
        gir svak vind.
      </p>
      <RelativePressureDiagram />
    </>
  );
}
