import { AtmosphericRiverDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function EkstremnedborAtmosfaeriskeElverOgO() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        7. Ekstremnedbør, atmosfæriske elver og orografisk forsterkning
      </h2>
      <p>
        Norge er en av Europas våteste nasjoner, og Vestlandet er bygget for nedbør. Likevel ser vi
        en økende forekomst av ekstremnedbørhendelser som utløser omfattende flommer og jordskred
        (som ekstremværet Hans i august 2023 og Gjerdrum-skredet i 2020) (NVE, 2024).
      </p>
      <p>
        De mest voldsomme nedbørsepisodene drives av et fenomen kjent som{" "}
        <strong>atmosfæriske elver (Atmospheric Rivers, AR)</strong>. Dette er smale, flere tusen
        kilometer lange korridorer med konsentrert vanndamptransport i nedre troposfære som pumper
        fuktighet fra subtropene tvers over Atlanteren mot Vest-Europa. En moden atmosfærisk elv kan
        frakte mer enn 10–20 ganger så mye vann som Amazonas-elven!
      </p>

      <AtmosphericRiverDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Orografisk løft og Clausius-Clapeyron-sammenhengen
      </h3>
      <p>
        Når dette subtropiske fukttoget treffer den skandinaviske fjellkjeden (Langfjella), tvinges
        luften brått oppover i en prosess som kalles <strong>orografisk løft</strong>:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          På vei opp fjellet utvider luften seg og avkjøles adiabatisk (1,0 °C/100 m før metning,
          deretter 0,6 °C/100 m).
        </li>
        <li>
          Siden kald luft har mye lavere metningstrykk for vanndamp, presses vannet ut som
          vedvarende, voldsom nedbør på losiden (vest for vannskillet).
        </li>
        <li>
          Når luften har passert toppen og synker ned over Østlandet, er den tømt for fukt. Den
          varmes tørradiabatisk hele veien ned og danner en markant <strong>regnskygge</strong> og
          fønvind i øst.
        </li>
      </ul>
      <p>
        <strong>Klimakoblingen:</strong> Den fysiske termodynamiske formelen for metningstrykk,{" "}
        <em>Clausius-Clapeyron-relasjonen</em>, slår fast at for hver grad temperaturen i atmosfæren
        stiger, øker luftens maksimale kapasitet til å holde på vanndamp med om lag{" "}
        <strong>7 %</strong> (IPCC, 2021). Varmere luft suger til seg mer fuktighet over Atlanteren,
        noe som betyr at når luften presses opp over norske fjell, faller det tilsvarende mer vann
        på kortere tid.
      </p>

      <OrdBoks
        ord="Atmosfærisk elv (AR)"
        barn="Smale, langstrakte bånd av konsentrert vanndamptransport i atmosfæren fra subtropiske havområder. Når de treffer kystfjell, utløser de langvarig ekstremnedbør og stor flomfare."
      />
    </>
  );
}
