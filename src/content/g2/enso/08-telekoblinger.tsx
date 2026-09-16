import { Link } from "@tanstack/react-router";
import { CollapsibleSection } from "@/components/collapsible-section";
import { PhotoFigure } from "@/components/photo-figure";

export function Telekoblinger() {
  return (
    <>
      <CollapsibleSection
        title="6. Globale telekoblinger og samspill"
        subtitle="Rossby-bølger, globale temperaturrekorder, orkaner/vindskjær og samspill med IOD og NAO"
        badge="Global påvirkning"
        badgeVariant="warning"
      >
        <p>
          Når et enormt nedbørs- og konveksjonsbelte forskyves tusenvis av kilometer i tropene, sender det bølger av energi
          ut i hele atmosfæren. Disse fjernkoblingene kalles <strong>telekoblinger</strong> (Bjerknes, 1969), formidlet via{" "}
          <Link to="/tema/jetstrommer" className="text-primary underline-offset-2 hover:underline">Rossby-bølger</Link>.
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">Effekt på global temperatur</h4>
            <p className="mt-1 text-sm sm:text-base">
              Under kraftige El Niño-år avgir det varme Stillehavet enorme mengder overskuddsvarme til luften og setter
              globale temperaturrekorder (1997/98, 2015/16, 2023/24). La Niña absorberer mer energi og demper temperaturen midlertidig.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">Orkaner og tropiske sykloner</h4>
            <p className="mt-1 text-sm sm:text-base">
              El Niño skaper sterkere <strong>vertikal vindskjær</strong> over Atlanteren og Karibia og river orkanstrukturer i stykker.
              La Niña reduserer vindskjæret og gir svært aktive orkansesonger.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">Samspill med IOD og NAO</h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li>
                <strong>IOD:</strong> Positiv{" "}
                <Link to="/tema/klima/iod" className="text-primary underline-offset-2 hover:underline">IOD</Link>{" "}
                og El Niño samtidig (1997, 2019) tørker begge sider av Australia og Indonesia.
              </li>
              <li>
                <strong>NAO:</strong> El Niño kan svekke polarvirvelen og{" "}
                <Link to="/tema/klima/nao" className="text-primary underline-offset-2 hover:underline">NAO</Link>.
                La Niña gir oftere stabil polarvirvel og positiv NAO i Norge.
              </li>
            </ul>
          </div>
        </div>

        <PhotoFigure
          src="/images/fig-enso-telekoblinger.jpg"
          alt="Verdenskart med typiske El Niño-telekoblinger"
          heading="Figur 7. Globale telekoblinger under El Niño"
          caption="Rød = varmere/tørrere. Blå = kaldere/våtere. La Niña gir speilbildet for mange regioner. Kilde: NOAA CPC."
          fit="contain"
          points={[
            { n: "1", label: "Voldsom nedbør og flom langs vestkysten av Sør-Amerika." },
            { n: "2", label: "Alvorlig tørke og skogbrannfare i Indonesia, Australia og India." },
            { n: "3", label: "Rolig orkansesong i Atlanterhavet på grunn av sterk vertikal vindskjær." },
          ]}
        />
      </CollapsibleSection>
    </>
  );
}
