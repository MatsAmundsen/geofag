import { EkmanSpiralDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function CoriolisIVerdenshaveneEkmanSpira() {
  return (
    <>
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Coriolis i verdenshavene: Ekman-spiral, kystoppvelling og havvirvler
      </h2>
      <p>
        Corioliseffekten virker med nøyaktig samme fysiske kraft på flytende vannmasser i havet som på
        gassmolekylene i luften. Faktisk er det i havet at noen av de mest spektakulære og livsviktige
        konsekvensene av Corioliseffekten utspiller seg (NOAA, u.å.-b):
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Ekman-spiralen: Vinden drar i overflaten, Coriolis vrir i dypet
      </h3>
      <p>
        I 1902 publiserte den svenske oseanografen Vagn Walfrid Ekman en matematisk modell som forklarte
        hvorfor isfjell i Polhavet ikke drev i samme retning som vinden blåste, men systematisk drev 20–40°
        til høyre for vindretningen (en observasjon opprinnelig gjort av Fridtjof Nansen under Fram-ferden).
      </p>
      <p>
        Mekanismen kalles <strong>Ekman-spiralen</strong>:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Vindstress på overflaten:</strong> Vinden blåser over havoverflaten og overfører
          bevegelsesenergi ved friksjon. Corioliskraften avbøyer det øverste millimetertynne vannlaget{" "}
          <strong>45° til høyre</strong> for vindretningen (på nordlig halvkule).
        </li>
        <li>
          <strong>Friksjon nedover i vannsøylen:</strong> Det øverste vannlaget drar med seg laget under
          ved molekylær og turbulent friksjon (viskositet). Dette dypere laget beveger seg saktere, og
          avbøyes enda litt lenger mot høyre.
        </li>
        <li>
          <strong>Spiralen i dypet:</strong> For hvert dypere lag vi måler, blir strømningshastigheten
          svakere og vinkelen mer avbøyd. På bunnen av Ekman-laget (typisk 50–100 meters dyp) beveger
          vannet seg faktisk i <em>motsatt retning</em> av overflatevinden!
        </li>
      </ol>

      <OrdBoks
        ord="Ekman-transport"
        barn="Den integrerte nettotransporten av vannmasser i det øvre havlaget forårsaket av vindstress og Corioliseffekten. Retningen er nøyaktig 90° til høyre for vindretningen på nordlig halvkule, og 90° til venstre på sørlig halvkule."
      />

      <EkmanSpiralDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Kystoppvelling (Upwelling): Næringskilden til verdens rikeste fiskerier
      </h3>
      <p>
        Hva skjer når en vind blåser parallelt med kystlinjen? På Vestlandet hender det ofte om våren og
        sommeren at et stabilt høytrykk over Norskehavet sender en vedvarende{" "}
        <strong>nordavind sørover langs norskekysten</strong>:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          Vinden blåser mot sør. Corioliseffekten tvinger netto Ekman-transport 90° til høyre — altså{" "}
          <strong>rett vestover og vekk fra kysten</strong>!
        </li>
        <li>
          Det varme, solfylte overflatevannet skyves bokstavelig talt ut i Nordsjøen.
        </li>
        <li>
          Dette etterlater et masseunderskudd ved svabergene. For å tette tomrommet må vann erstattes
          nedenfra: <strong>Iskaldt, næringsrikt dypvann suges opp mot overflaten langs kysten</strong>.
        </li>
      </ul>
      <p>
        Dette fenomenet kalles <strong>kystoppvelling (upwelling)</strong>. Dypvannet har ligget i mørket
        og samlet opp enorme konsentrasjoner av nitrat, fosfat og silikat fra døde organismer som har
        sunket til bunns. Når dette næringsrike vannet pumpes opp i sollyset i overflaten, eksploderer
        produksjonen av planteplankton. Dette danner festmåltid for raudåte, sild, torsk og sjøfugl!
      </p>
      <p>
        Det samme prinsippet forklarer hvorfor kysten av Peru og Chile (Humboldtstrømmen) og
        Nordvest-Afrika (Kanaristrømmen) har verdens rikeste sardin- og ansjosfiskerier: Passatvindene
        skyver overflatevannet vekk fra kontinentet, og permanent oppvelling forer marine økosystemer
        med næringssalter.
      </p>
    </>
  );
}
