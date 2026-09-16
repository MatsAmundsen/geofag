import { Callout } from "@/components/callout";
import { gf1Theme } from "@/lib/nav";

const tema = gf1Theme("vulkaner")!;

export function Seksjon() {
  return (
    <Callout title="Kompetansemål i Geofag 1 (LK20)">
      <p>{tema.maal}</p>
      <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
        <p><strong>Kjerneelementer som dekkes i dette kapittelet:</strong></p>
        <p>• <em>Jordens indre prosesser:</em> Magmadannelse, silikatkjemi, viskositet og gassoppløsning (Henrys lov).</p>
        <p>• <em>Landformer og geomorfologi:</em> Skjoldvulkaner, stratovulkaner, sinderkjegler og kalderakollaps.</p>
        <p>• <em>Geofarer og samfunnssikkerhet:</em> Pyroklastiske strømmer (PDC), laharer, vulkansk aske i luftfart, vulkansk vinter og tidlig varsling.</p>
      </div>
    </Callout>
  );
}
