import { Link } from "@tanstack/react-router";
import { CollapsibleSection } from "@/components/collapsible-section";
import { NaoPositivePhaseDiagram } from "@/components/diagrams";

export function Positiv() {
  return (
    <>
      <CollapsibleSection
        title="2. Positiv NAO (NAO+ — Den sonale storm-motorveien)"
        subtitle="Dypt Island-L + forsterket Azor-H · Rett, sonal polarjet · Milde, våte og stormfulle vintre i Norge"
        badge="Positiv fase"
        badgeVariant="amber"
      >
        <p>
          Under en positiv NAO-fase forsterkes begge de semi-permanente trykksystemene samtidig:
          Islandslavtrykket blir usedvanlig dypt (ofte under 975 hPa), mens Azorhøytrykket blir
          uvanlig mektig (ofte over 1035 hPa). Trykkdifferansen mellom dem kan nå over 50–60 hPa.
        </p>

        <NaoPositivePhaseDiagram />

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Hvorfor blir polarjeten så sterk og rett?
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Når trykksystemene forsterkes, skjerpes også temperaturgradienten over polarfronten.
              I henhold til{" "}
              <Link to="/tema/jetstrommer" className="text-primary underline-offset-2 hover:underline">
                termalvindligningen
              </Link>{" "}
              betyr en sterk horisontal temperaturgradient at den vertikale vindskjæren øker, noe som
              akselererer polarjeten i 9–11 km høyde. Jetstrømmen blir stabil, sonal (vest–øst) og
              hindres fra å danne store bølger.
            </p>
          </div>

          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Konsekvenser for Norge og Skandinavia under NAO+
            </h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
              <li>
                <strong>Milde temperaturer:</strong> Kontinuerlig tilførsel av maritim luftmasse fra
                Atlanterhavet fortrenger den kalde arktiske luften. Vintertemperaturene kan ligge
                2–5 °C over klimanormalen.
              </li>
              <li>
                <strong>Voldsom nedbør og orografisk heving:</strong> Når den fuktige vestavinden
                treffer Langfjella, Jotunheimen og kystfjellene på Vestlandet, tvinges den til værs.
                Dette gir kraftig <strong>orografisk nedbør</strong> (ofte flere hundre millimeter i
                løpet av få dager).
              </li>
              <li>
                <strong>Snø i høyfjellet vs. regn ved kysten:</strong> Mens kysten opplever regn,
                sludd og høye flommer, faller nedbøren som snø i høyfjellet fordi temperaturen der
                fortsatt er under frysepunktet.
              </li>
              <li>
                <strong>Isbreene vokser (positiv massebalanse):</strong> Maritime isbreer som
                Nigardsbreen, Briksdalsbreen og Folgefonna mates med enorme snømengder om vinteren.
                Under den sterke NAO+-perioden 1989–1995 rykket breene dramatisk frem (Nesje et al.,
                2000).
              </li>
              <li>
                <strong>Høyt skadepotensial:</strong> Økt risiko for ekstreme vindstormer (f.eks.
                Nyttårsorkanen 1992, Dagmar 2011, Ingunn 2024), jordskred og stormflo.
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Konsekvenser for Sør-Europa og Middelhavet under NAO+
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Mens Nord-Europa opplever uvær og nedbørsrekorder, skjer det stikk motsatte i sør.
              Azorhøytrykket ekspanderer østover og legger et beskyttende lokk over Spania, Portugal,
              Italia og Hellas:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li>Nedsynkende luftmasse kveler sky- og nedbørsdannelse.</li>
              <li>Vintertørke: Vannmagasinene fylles ikke opp, noe som truer landbruk og vannforsyning.</li>
              <li>Ofte kjølige netter med frost i innlandet pga. klarvær og nattlig utstråling.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
}
