import { Link } from "@tanstack/react-router";
import { CollapsibleSection } from "@/components/collapsible-section";
import { PhotoFigure } from "@/components/photo-figure";
import { OrdBoks } from "@/components/term";

export function Walker() {
  return (
    <>
      <CollapsibleSection
        title="1. Normaltilstand og Walker-sirkulasjonen"
        subtitle="Passatvinder, warm pool ved Indonesia, oppvelling ved Peru og den lukkede Walker-cellen"
        badge="Nøytral tilstand"
        badgeVariant="teal"
        defaultOpen={true}
      >
        <p>
          For å forstå El Niño og La Niña må du kjenne normaltilstanden godt.
          Det er avviket fra normalen som driver konsekvensene.
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">Passatvindene</h4>
            <p className="mt-1 text-sm sm:text-base">
              Under normale forhold blåser de sørøstlige og nordøstlige <strong>passatvindene</strong> jevnt mot vest langs ekvator
              (Bjerknes, 1969). Disse vindene kommer fra{" "}
              <Link to="/tema/vindsystemet" className="text-primary underline-offset-2 hover:underline">den globale atmosfæresirkulasjonen</Link>:
              kald luft synker ved subtropene og strømmer mot ekvator, avbøyd av{" "}
              <Link to="/tema/coriolis" className="text-primary underline-offset-2 hover:underline">Coriolis-effekten</Link>{" "}
              til østlige vinder. Passatene skyver varmt vann vestover.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">Det vestlige varmebassenget (warm pool)</h4>
            <p className="mt-1 text-sm sm:text-base">
              Rundt Indonesia, Filippinene og Nord-Australia hoper oppvarmet overflatevann seg opp (28–30 °C) —
              <strong> det vestlige varmebassenget</strong>. Fuktig luft stiger og gir store nedbørsmengder. Havnivået i vest
              er ca. 0,5 meter høyere enn i øst.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">Oppvelling utenfor Peru</h4>
            <p className="mt-1 text-sm sm:text-base">
              Når vinden skyver overflatevann vestover, trekkes kaldt, næringsrikt dypvann (18–20 °C) opp utenfor Peru og Ecuador
              — <strong>oppvelling</strong>. Kaldt vann gir høytrykk og lite nedbør, men verdens rikeste ansjosfiskerier.
              Termoklinen i øst står grunt.
            </p>
          </div>
        </div>

        <PhotoFigure
          src="/images/fig-enso-normal.jpg"
          alt="Tverrsnitt av tropisk Stillehav i normaltilstand"
          heading="Figur 1. Normaltilstanden og Walker-sirkulasjonen"
          caption="Passatvindene hoper opp varmt vann ved Indonesia. Termoklinen heller bratt mot øst. Utenfor Peru trekkes kaldt dypvann opp. Walker-cellen lukker kretsen: oppstigning i vest, østgående transport i høyden, nedsynking i øst, passater ved overflaten."
          fit="contain"
          points={[
            { n: "1", label: "Varmt vestlig basseng (>29 °C). Konveksjon og nedbør over Indonesia." },
            { n: "2", label: "Oppvelling ved Peru. Kaldt, næringsrikt bunnvann." },
            { n: "3", label: "Walker-sirkulasjonen: lukket øst–vest-celle langs ekvator." },
          ]}
        />

        <div className="pt-2">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">Walker-sirkulasjonen</h4>
          <p className="mt-1 text-sm sm:text-base">
            Det lukkede luftsirkulasjonsmønsteret langs ekvator kalles <strong>Walker-sirkulasjonen</strong>, etter Gilbert Walker:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
            <li><strong>Oppstigning i vest:</strong> Varm luft stiger over warm pool (konveksjon).</li>
            <li><strong>Østgående transport i høyden:</strong> Luften flyter østover i øvre troposfære.</li>
            <li><strong>Nedsynking i øst:</strong> Luft synker over det østlige Stillehavet og gir høytrykk.</li>
            <li><strong>Passatvinder ved overflaten:</strong> Luft strømmer vestover og lukker kretsen.</li>
          </ul>
        </div>

        <OrdBoks
          ord="Walker-sirkulasjonen"
          barn="Øst–vest-gående atmosfærisk celle over det ekvatoriale Stillehavet. Oppstigning i vest, østgående transport i høyden, nedsynking i øst, vestgående passater. Gilbert Walker, 1920-tallet."
        />
      </CollapsibleSection>
    </>
  );
}
