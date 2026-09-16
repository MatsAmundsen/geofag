import { Link } from "@tanstack/react-router";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  NaoPositivePhaseDiagram,
} from "@/components/diagrams";

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
          Under NAO+ forsterkes begge semi-permanente trykksystemer: Islandslavtrykket blir usedvanlig dypt (ofte under 975 hPa), Azorhøytrykket uvanlig mektig (ofte over 1035 hPa). Differansen kan nå 50–60 hPa.
        </p>

        <NaoPositivePhaseDiagram />

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">Hvorfor blir polarjeten så sterk og rett?</h4>
            <p className="mt-1 text-sm sm:text-base">
              Forsterkede trykksystemer skjerper temperaturgradienten over polarfronten. Ifølge{" "}
              <Link to="/tema/jetstrommer" className="text-primary underline-offset-2 hover:underline">termalvindligningen</Link>{" "}
              øker vertikal vindskjær, og polarjeten akselererer i 9–11 km høyde. Den blir stabil, sonal og hindres fra store bølger.
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">Konsekvenser for Norge under NAO+</h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
              <li><strong>Milde temperaturer:</strong> Maritim luft fortrenger arktisk luft. Vinteren kan ligge 2–5 °C over normalen.</li>
              <li><strong>Orografisk nedbør:</strong> Fuktig vestavind tvinges til værs over Langfjella og Vestlandet — ofte flere hundre millimeter på få dager.</li>
              <li><strong>Snø i høyfjellet vs. regn ved kysten:</strong> Kysten får regn og flom; fjellet får snø under frysepunktet.</li>
              <li><strong>Positiv massebalanse på maritime breer:</strong> Nigardsbreen, Briksdalsbreen og Folgefonna. Under NAO+ 1989–1995 rykket breene frem (Nesje et al., 2000).</li>
              <li><strong>Høyt skadepotensial:</strong> Nyttårsorkanen 1992, Dagmar 2011, Ingunn 2024 — jordskred og stormflo.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">Konsekvenser for Sør-Europa under NAO+</h4>
            <p className="mt-1 text-sm sm:text-base">
              Azorhøytrykket ekspanderer østover over Spania, Portugal, Italia og Hellas:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li>Nedsynkende luft kveler sky- og nedbørsdannelse.</li>
              <li>Vintertørke: vannmagasinene fylles ikke; landbruk og vannforsyning trues.</li>
              <li>Ofte kjølige netter med frost i innlandet på grunn av klarvær og utstråling.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
}
