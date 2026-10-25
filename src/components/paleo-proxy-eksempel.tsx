import { CollapsibleSection } from "@/components/collapsible-section";
import { PaleoProxyEksempelFigur } from "@/components/diagrams/paleo-proxy-eksempel";

/**
 * Collapsible «Eksempel» under paleoklima.
 * Stegtekst: Skribent Fjord (proxy-eksempel-tekst-fjord.md), panel-ID låst A–E.
 * Endelig prosa eies fortsatt av Fjord / Geo-fagsjekk — ikke endre paleoklima.md uten Mats-ja.
 */
export function PaleoProxyEksempel() {
  return (
    <CollapsibleSection
      id="paleo-proxy-eksempel"
      title="Eksempel: Les alder, miljø og CO₂ ut av proxyene"
      subtitle="Flere kurver — ikke alle svarer på spørsmålet"
      badge="Eksempel"
      badgeVariant="teal"
      defaultOpen={false}
    >
      <div className="space-y-6 text-sm leading-relaxed text-foreground/90">
        <p>
          Studer figurpakken under. Fem paneler deler samme tidsakse (ca. siste 25 000 år —
          forenklet illustrasjon). Tre spørsmål venter. Ikke alle panelene svarer på dem.
        </p>

        <PaleoProxyEksempelFigur />

        <section className="space-y-2">
          <h4 className="font-display text-base font-medium text-foreground">
            1. Hva spør vi om?
          </h4>
          <p>Før du «løser», les spørsmålene:</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              <strong>Når startet holocen i denne serien?</strong> (alder)
            </li>
            <li>
              <strong>Hvordan var vegetasjonen i yngre dryas?</strong> (miljø)
            </li>
            <li>
              <strong>Omtrent hvor mye CO₂ var det ved LGM?</strong> (klimagass)
            </li>
          </ol>
          <p>
            Tenk et øyeblikk: hvilket panel ville du brukt til hvert spørsmål — og hvilke paneler
            kan du legge bort?
          </p>
        </section>

        <section className="space-y-2">
          <h4 className="font-display text-base font-medium text-foreground">
            2. Støy vs relevant
          </h4>
          <div className="overflow-x-auto rounded-lg border border-border/70">
            <table className="w-full min-w-[40rem] border-collapse text-left text-xs sm:text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="border-b border-border/70 px-3 py-2 font-medium">Spørsmål</th>
                  <th className="border-b border-border/70 px-3 py-2 font-medium">Bruk panel</th>
                  <th className="border-b border-border/70 px-3 py-2 font-medium">
                    Hvorfor resten ikke svarer
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-border/50 px-3 py-2 align-top">
                    Når startet holocen?
                  </td>
                  <td className="border-b border-border/50 px-3 py-2 align-top">
                    <strong>D</strong> (C-14 / tefra / lagtelling). Skift i <strong>A</strong> (δ¹⁸O
                    i is) kan støtte tidspunktet, men daterer ikke alene.
                  </td>
                  <td className="border-b border-border/50 px-3 py-2 align-top">
                    <strong>B</strong> gir gassinnhold, ikke kalenderår. <strong>C</strong> viser
                    vegetasjon, ikke alder. <strong>E</strong> er støy (moderne vær eller
                    irrelevant IRD).
                  </td>
                </tr>
                <tr>
                  <td className="border-b border-border/50 px-3 py-2 align-top">
                    Vegetasjonen i yngre dryas?
                  </td>
                  <td className="border-b border-border/50 px-3 py-2 align-top">
                    <strong>C</strong> (pollen: urt / bjørk / furu)
                  </td>
                  <td className="border-b border-border/50 px-3 py-2 align-top">
                    <strong>A</strong> sier kaldt/varmt, ikke «bjørkeskog vs tundra».{" "}
                    <strong>B</strong> sier CO₂. <strong>D</strong> sier når. <strong>E</strong> er
                    støy.
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 align-top">CO₂ ved LGM?</td>
                  <td className="px-3 py-2 align-top">
                    <strong>B</strong> (CO₂ i luftbobler)
                  </td>
                  <td className="px-3 py-2 align-top">
                    <strong>A</strong> er temperaturproxy, ikke gassmengde. <strong>C</strong> og{" "}
                    <strong>D</strong> svarer ikke på ppm. <strong>E</strong> er støy.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Kort sagt: ofte får du «for mye» data. Si alltid <em>hva hver kurve måler</em> før du
            svarer.
          </p>
        </section>

        <section className="space-y-2">
          <h4 className="font-display text-base font-medium text-foreground">3. Alder</h4>
          <p>
            Holocen begynte for ca. <strong>11 700</strong> år siden. Starten er definert i
            iskjernen NGRIP på Grønland (Walker mfl., 2009; Cohen mfl., 2026). I figurpakken er det{" "}
            <strong>panel D</strong> som gir alder: C-14 (kalibrert til kalenderår), tefra-markør
            eller lagtelling.
          </p>
          <p>
            Vedde-asken er ca. <strong>12 100</strong> år gammel (ca. 10 300 C-14-år) og finnes i
            iskjerner, innsjøer og havbunn over store områder (Birks mfl., 1996; Lane mfl., 2012;
            Mangerud, 2025c). Et slikt askelag er en tidshorisont: lagene ble avsatt samtidig.
          </p>
          <p>
            Et tydelig skift i <strong>panel A</strong> (δ¹⁸O i is) kan støtte <em>når</em> klimaet
            ble varmere, men det er <strong>panel D</strong> som gir alder (C-14, tefra eller
            lagtelling). <strong>Panel C</strong> (pollen) forteller om vegetasjonen, ikke
            kalenderår. Husk også <em>gassalderen</em> (Δage): lufta stenges inne først i bunnen
            av firnen (som regel 50–100 m under overflaten), så boblene er litt yngre enn isen
            rundt (Davies, 2020). Derfor leser vi alder for is og for gass med forsiktighet.
          </p>
        </section>

        <section className="space-y-2">
          <h4 className="font-display text-base font-medium text-foreground">4. Miljø</h4>
          <p>
            Yngre dryas varte ca. <strong>12 800–11 700</strong> år før nå (Mangerud, 2025e; Cohen
            mfl., 2026). De kalde dryas-periodene er oppkalt etter slekta til reinrosa,{" "}
            <em>Dryas</em> (Harstveit og Fuglestvedt, 2025; Vik, 2026).
          </p>
          <p>
            <strong>Panel C</strong> (pollendiagram) svarer på vegetasjonen. I en forenklet
            illustrasjon ser du typisk mer <strong>urt</strong> (tundra-/reinrose-preget
            vegetasjon) og mindre <strong>bjørk</strong> og <strong>furu</strong> i yngre dryas enn
            i mildere perioder rundt. Det er pollenanalysen som knytter laget til plantene — ikke
            δ¹⁸O.
          </p>
          <p>
            δ¹⁸O i is (<strong>A</strong>) forteller at det var kaldt, men ikke om landskapet var
            bjørkeskog eller tundra. CO₂ (<strong>B</strong>) forteller heller ikke
            vegetasjonstype. Match spørsmål ↔ arkiv.
          </p>
        </section>

        <section className="space-y-2">
          <h4 className="font-display text-base font-medium text-foreground">5. Klimagasser</h4>
          <p>
            Ved siste istids maksimum (LGM, ca. <strong>25 000–19 000</strong> år siden; Mangerud,
            2025b) leser vi CO₂ fra <strong>panel B</strong>: luftboblene i isen.
          </p>
          <p>Her gjelder kapitlets eksamensregel:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Isotopene i isen (<strong>A</strong>) er en <em>proxy</em> (proxy = stedfortreder)
              for temperatur.
            </li>
            <li>
              Luftboblene (<strong>B</strong>) er <strong>prøver</strong> av fortidens luft. CO₂ i
              dem måles direkte — det er ikke en proxy for gassammensetning (Davies, 2020).
            </li>
          </ul>
          <p>
            Iskjernene gir CO₂ ca. 800 000 år tilbake. I EPICA Dome C lå CO₂ mellom{" "}
            <strong>172 og 300 ppm</strong> gjennom hele den tiden (Lüthi mfl., 2008). I
            illustrasjonen her ligger LGM rundt <strong>ca. 185 ppm</strong> (forenklet, i tråd med
            kapitlets simulator; spennet er Lüthi mfl., 2008). Til sammenligning: i{" "}
            <strong>2025</strong> var det globale snittet <strong>425,6 ppm</strong> (NOAA GML,
            2026).
          </p>
          <p>
            De eldste og mest pålitelige CO₂-seriene kommer fra Antarktis; Grønland er mindre egnet
            for gammel CO₂ fordi smeltelag kan gi for høye verdier (Davies, 2020).
          </p>
        </section>

        <section className="space-y-2">
          <h4 className="font-display text-base font-medium text-foreground">
            6. Fallgruve: δ¹⁸O i is vs i hav
          </h4>
          <p>Skriv aldri bare «høy δ¹⁸O betyr varmt». Si hvilket arkiv du mener:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>I isen:</strong> lav δ¹⁸O → kaldt klima (Davies, 2020; Mangerud, 2026b).
            </li>
            <li>
              <strong>I havet (foraminiferer):</strong> høy δ¹⁸O → mye is på land, altså
              istidssignal (Mangerud, 2026b).
            </li>
          </ul>
          <p>
            Leseretningen er altså motsatt. Panel A i denne pakken er <strong>is</strong>{" "}
            (Grønland-aktig). Se også OxygenIsotope og «Til eksamen» / «Vanlige misforståelser» i
            kapitlet.
          </p>
        </section>
      </div>
    </CollapsibleSection>
  );
}
