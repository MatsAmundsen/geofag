import { LorenzChaosEnsembleDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function KaosLorenzTeoriOgAtmosfaerensPr() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Kaos, Lorenz-teori og atmosfærens prediksjonsgrense
      </h2>
      <p>
        I 1961 gjorde den amerikanske meteorologen og matematikeren <strong>Edward Lorenz</strong> en
        oppdagelse som snudde opp ned på hele naturvitenskapens syn på forutsigbarhet (Lorenz, 1963).
      </p>
      <p>
        Lorenz kjørte en enkel computermodell av atmosfæren med bare 12 ligninger. En dag ville han
        kjøre en simulering på nytt. For å spare tid tastet han ikke inn tallene med alle seks desimaler
        (f.eks. 0,506127), men rundet av til tre desimaler (0,506). Han antok at et avvik på under én
        tusensteldel ville være fullstendig ubetydelig. Da han kom tilbake etter en kaffepause, viste det
        seg at den nye kurven var blitt fullstendig ulik den første: Den simulerte stormen hadde
        erstattet solskinnet!
      </p>
      <p>
        Dette fenomenet kalles <strong>deterministisk kaos</strong>, populært døpt til{" "}
        <em>«sommerfugleffekten»</em>: Vingeslagene til en sommerfugl i Brasil kan i teorien utløse en
        tornado i Texas uker senere. Årsaken er at atmosfærens dynamikk er <em>ikke-lineær</em>: Små
        feil forblir ikke små; de vokser eksponensielt over tid.
      </p>

      <LorenzChaosEnsembleDiagram />

      <p>
        Siden det er fysisk umulig å måle atmosfæren med uendelig mange desimaler i hvert eneste punkt
        over Atlanterhavet, vil starttilstanden alltid inneholde en ørliten usikkerhet. Dette setter en{" "}
        <strong>absolutt, teoretisk prediksjonsgrense</strong> for atmosfæren:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Døgn 0–3:</strong> Høy forutsigbarhet. Småfeil i starttilstanden er fortsatt små. Store
          lavtrykk, vindfelt og fronter varsles med millimeterpresisjon.
        </li>
        <li>
          <strong>Døgn 4–7:</strong> Moderat forutsigbarhet. Feilene har vokst til regional skala.
          Modellen fanger vanligvis opp at et lavtrykk kommer, men banen eller ankomsttidspunktet kan
          forskyves med flere hundre kilometer eller 12 timer.
        </li>
        <li>
          <strong>Døgn 8–14:</strong> Kaotisk metning. Den opprinnelige informasjonen fra starttilstanden
          er nesten fullstendig visket ut. Modellen kan si om storskalastrømmen er mild vestavind eller
          kald blokkering, men det gir ingen mening å spå været på et bestemt punkt i Bergen eller Oslo.
        </li>
      </ul>
      <p className="font-semibold text-amber-300">
        Uansett hvor store superdatamaskiner vi bygger i fremtiden, vil det aldri være mulig å gi et
        deterministisk, nøyaktig værvarsel for en bestemt dag 30 dager fram i tid. Kaoset setter en
        ugjennomtrengelig grense.
      </p>

      <OrdBoks
        ord="Deterministisk kaos"
        barn="Egenskapen ved ikke-lineære dynamiske systemer der utviklingen er fullstendig styrt av fysiske lover, men hvor ørsmå avvik i starttilstanden vokser eksponensielt og gjør langtidsprediksjon umulig (Lorenz, 1963)."
      />
    </>
  );
}
