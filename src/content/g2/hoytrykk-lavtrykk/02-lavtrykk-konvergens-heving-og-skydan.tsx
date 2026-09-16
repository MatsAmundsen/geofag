import { LowPressureCrossSectionDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function LavtrykkKonvergensHevingOgSkydan() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Lavtrykk: Konvergens, heving og skydannelse
      </h2>
      <p>Hva setter i gang et lavtrykk? I atmosfæren skiller vi mellom to hovedtyper lavtrykk:</p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Termiske lavtrykk:</strong> Dannes ved ulik oppvarming av jordoverflaten. Når
          solen steker på tørt land om sommeren, varmes bakken opp og avgir varme til det nederste
          luftlaget. Varm luft utvider seg, blir lettere (får lavere tetthet) enn den kjøligere
          luften omkring, og stiger til værs som følge av oppdrift. Dette kalles <em>konveksjon</em>
          .
        </li>
        <li>
          <strong>Dynamiske lavtrykk:</strong> Dannes langs <em>polarfronten</em> i Nord-Atlanteren,
          der kald polarluft fra nord kolliderer med mild subtropisk luft fra sør. Her er det
          storskala bølger i polarjetstrømmen i øvre troposfære som suger luft oppover og skaper de
          vandrende lavtrykkene som styrer det meste av norsk ruskevær.
        </li>
      </ol>
      <p>
        Uansett hvordan lavtrykket fødes, er den indre fysikken den samme: Når luften i sentrum
        stiger, oppstår det et masseunderskudd nær bakken. Trykket faller, og luft fra omgivelsene
        trekkes inn mot lavtrykkssenteret. Dette kalles <strong>konvergens</strong> ved bakken.
        Fordi den faste jordoverflaten hindrer luften i å bevege seg nedover, er det bare én vei
        luften kan ta: <strong>oppover</strong>.
      </p>

      <OrdBoks
        ord="Konvergens"
        barn="Horisontal sammentrømning av luftmasser. Nær bakken tvinger konvergens luften til å stige vertikalt."
      />

      <p>Når luftpakken tvinges oppover, skjer det en avgjørende termodynamisk prosess:</p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Adiabatisk ekspansjonsavkjøling:</strong> Omgivelsestrykket avtar med høyden. Når
          luftpakken stiger inn i tynnere lag, utvider den seg. For å utvide seg må luftmolekylene
          skyve på luften rundt, noe som krever mekanisk arbeid. Dette arbeidet henter molekylene
          fra sin egen indre varmeenergi. Temperaturen i luftpakken faller dermed uten at det
          utveksles varme med omgivelsene. Før luften når metning, avkjøles den med{" "}
          <strong>tørradiabatisk temperaturendring (DALR) på 1,0 °C per 100 meter</strong>.
        </li>
        <li>
          <strong>Kondensasjonsnivået (LCL):</strong> Kaldere luft har lavere metningstrykk for
          vanndamp. Når luftpakken er avkjølt til sitt duggpunkt, når den 100 % relativ fuktighet.
          Høyden der dette inntreffer, kalles <em>løftet kondensasjonsnivå</em> (LCL). Her begynner
          vanndampen å kondensere til synlige skydråper – skybasen er dannet.
        </li>
        <li>
          <strong>Latent varme frigjøres som atmosfærisk drivstoff:</strong> Når gassformig vann
          kondenserer til flytende dråper, frigjøres den energien som opprinnelig ble brukt til å
          fordampe vannet: om lag
          <strong> 2,5 millioner joule per kilo vann</strong> (latent varme). Denne varmen overføres
          direkte til luften i skyen. Nå avkjøles luften vesentlig saktere – typisk med{" "}
          <strong>fuktadiabatisk temperaturendring (SALR) på ca. 0,6 °C per 100 meter</strong>.
          Siden skyen hele tiden forblir varmere og lettere enn den tørre luften utenfor, virker den
          latente varmen som en etterbrenner som forsterker oppdriften og bygger tårnhøye bygeskyer
          (<em>Cumulonimbus</em>).
        </li>
      </ul>

      <p>
        Hvor stopper stigningen? Nesten alt vær utspiller seg i <strong>troposfæren</strong>. Ved
        overgangen til
        <strong> stratosfæren</strong> (tropopausen, ca. 8–11 km over Norge) snur
        temperaturprofilen: Ozonlaget absorberer ultrafiolett stråling fra solen og varmer opp
        stratosfæren ovenfra. Stratosfæren har en stabil temperaturinversjon. Idet den stigende
        luften når tropopausen, blir den plutselig kaldere og tyngre enn luften over. Oppdriften
        stanser kontant, og luften tvinges til å spre seg horisontalt ut til sidene i den
        karakteristiske amboltformen (<strong>divergens i høyden</strong>).
      </p>

      <OrdBoks
        ord="Latent varme"
        barn="Varmeenergi som bindes ved fordamping og frigjøres ved kondensasjon. Frigjøringen i skyer holder luften varm og driver vertikal oppdrift i lavtrykk og orkaner."
      />

      <LowPressureCrossSectionDiagram />
    </section>
  );
}
