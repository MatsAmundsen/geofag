import { CollapsibleSection } from "@/components/collapsible-section";
import {
  NaoBlockeringDiagram,
  NaoNegativePhaseDiagram,
  NaoRossbyDiagram,
} from "@/components/diagrams";

export function Negativ() {
  return (
    <>
      <CollapsibleSection
        title="3. Negativ NAO (NAO− — Den meandrerende blokkeringen)"
        subtitle="Svekket trykkgradient · Bølgete jetstrøm og atmosfærisk blokkering · Arktisk kulde i Norge, regn i Sør-Europa"
        badge="Negativ fase"
        badgeVariant="sky"
      >
        <p>
          I den negative NAO-fasen kollapser den nordatlantiske motoren: både Islandslavtrykket og
          Azorhøytrykket svekkes drastisk. Trykkdifferansen mellom dem kan falle mot null, og i
          enkelte tilfeller kan trykket over Island til og med bli høyere enn over Azorene.
        </p>

        <NaoNegativePhaseDiagram />

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Mekanismen: Hvorfor meandrerer jetstrømmen under NAO−?
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Når trykkgradienten svekkes, mister den sonale vestavinden fart. Når en strøm i
              atmosfæren sakker farten, blir den ustabil og begynner å svinge nord og sør i store{" "}
              <strong>Rossby-bølger</strong> (planetære bølger).
            </p>
          </div>

          <NaoRossbyDiagram />

          <div>
            <p className="text-sm sm:text-base">
              Dersom en rygg i Rossby-bølgen forsterkes over Skandinavia, kan den avsnøres fra det
              generelle vestavindsbeltet og danne et massivt, kvasistasjonært høytrykk som blir
              liggende fast i uke- eller månedsvis. Dette fenomenet kalles en{" "}
              <strong>atmosfærisk blokkering</strong> (<em>blocking</em>).
            </p>
          </div>

          <NaoBlockeringDiagram />

          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Konsekvenser for Norge og Skandinavia under NAO−
            </h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
              <li>
                <strong>Streng sprengkulde (sibirkulde):</strong> Høytrykket roterer med klokken og
                trekker knusktørr, iskald kontinentalluft fra Sibir, Russland og Nordishavet rett inn
                over Norge fra øst og nordøst.
              </li>
              <li>
                <strong>Tørt og lite nedbør:</strong> Nedsynkende luftmasse i høytrykket gir klarvær
                og minimalt med nedbør. Vestlandet opplever en bratt nedgang i vannføringen i elvene.
              </li>
              <li>
                <strong>Bakkeinversjon og helsefarlig byluft:</strong> Under vinterhøytrykk avkjøles
                bakken kraftig ved varmeutstråling i den mørke årstiden. Luften like over bakken blir
                kaldere enn luften lenger opp — det oppstår en <strong>inversjon</strong>. Forurensning
                fra vedfyring og eksos fanges i bygryter (f.eks. Bergen, Oslo, Trondheim).
              </li>
              <li>
                <strong>Strømkrise og samfunnspåvirkning:</strong> Sprengkulden øker energibehovet
                til oppvarming enormt, samtidig som vannmagasinene ikke får tilsig pga. tørke og frost.
                Dette gir prissjokk på strømmarkedet og frosne vannrør over hele landet.
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Den atlantiske vippen: Hvorfor er Grønland varm når Norge fryser?
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Et av de mest fascinerende trekkene ved NAO− er den såkalte <em>«seesaw»-effekten</em>.
              Når et massivt blokkerende høytrykk ligger over Skandinavia, trekker østsiden kald
              luft sørover over Norge, mens vestsiden pumper varm atlantisk luft nordover langs
              Grønlands vestkyst og inn i Davisstredet. Under den beryktede vinteren 2009/2010 opplevde
              Vest-Grønland temperaturer opp mot 10 °C over normalen, mens Norge opplevde sin
              kaldeste vinter på over 30 år!
            </p>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
}
