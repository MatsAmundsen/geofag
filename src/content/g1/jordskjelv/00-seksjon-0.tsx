import { Callout } from "@/components/callout";
import { gf1Theme } from "@/lib/nav";

const tema = gf1Theme("jordskjelv")!;

export function Seksjon() {
  return (
    <Callout title="Kompetansemål i Geofag 1 (LK20)">
      <p>{tema.maal}</p>
      <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
        <p><strong>Kjerneelementer som dekkes i dette kapittelet:</strong></p>
        <p>• <em>Jordens oppbygning og indre prosesser:</em> Elastisk tilbakefjæring og seismisk bølgeforplantning.</p>
        <p>• <em>Geofarer og samfunnssikkerhet:</em> Jordskjelvrisiko, tsunamier, Eurokode 8, baseisolering og norsk seismisitet.</p>
        <p>• <em>Naturvitenskapelige metoder:</em> Seismogramanalyse, triangulering av episenter og bruk av seismiske skyggesoner til å avbilde jordens indre lag.</p>
      </div>
    </Callout>
  );
}
