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
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Passatvindene
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Under normale forhold blåser de sørøstlige og nordøstlige{" "}
              <strong>passatvindene</strong> jevnt mot vest langs ekvator
              (Bjerknes, 1969). Disse vindene er et direkte resultat av{" "}
              <Link
                to="/tema/vindsystemet"
                className="text-primary underline-offset-2 hover:underline"
              >
                den globale atmosfæresirkulasjonen
              </Link>
              : kald luft synker ved subtropene (ca. 30°N og 30°S) og strømmer
              mot ekvator langs overflaten, avbøyd av{" "}
              <Link
                to="/tema/coriolis"
                className="text-primary underline-offset-2 hover:underline"
              >
                Coriolis-effekten
              </Link>{" "}
              til å bli østlige vinder. Passatvindene skaper en stabil «pumpe» som
              kontinuerlig skyver varmt vann vestover.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Det vestlige varmebassenget (warm pool)
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              I det vestlige Stillehavet — rundt Indonesia, Filippinene og
              Nord-Australia — hoper det oppvarmede overflatevannet seg opp og
              danner et enormt basseng med temperaturer på 28–30 °C. Dette
              kalles <strong>det vestlige varmebassenget</strong> (
              <em>warm pool</em>). Fuktig luft stiger kraftig og gir store
              nedbørsmengder over Indonesia. Havnivået i vest er faktisk ca. 0,5
              meter høyere enn i øst fordi vinden stabler opp vann der.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Oppvelling utenfor Peru
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Når vinden skyver overflatevannet vestover, trekkes kaldt,
              næringsrikt dypvann (18–20 °C) opp til overflaten utenfor Peru og
              Ecuador — en prosess som kalles <strong>oppvelling</strong> (
              <em>upwelling</em>). Det kalde vannet gir stabilt høytrykk og lite
              nedbør langs kysten, men mater verdens rikeste fiskerier av ansjos.
              Det virker fordi termoklinen i øst står grunt: bunnen av det varme
              laget er så nær overflaten at oppvellingen treffer kaldt vann.
            </p>
          </div>
        </div>

        <PhotoFigure
          src="/images/fig-enso-normal.jpg"
          alt="Tverrsnitt av tropisk Stillehav i normaltilstand: passatvinder mot vest, varmt basseng ved Indonesia, bratt termoklin og oppvelling ved Peru"
          heading="Figur 1. Normaltilstanden og Walker-sirkulasjonen"
          caption="Under normale forhold blåser passatvindene vestover og hoper opp varmt overflatevann ved Indonesia (venstre). Termoklinen heller bratt oppover mot øst. Utenfor Peru (høyre) trekkes kaldt dypvann opp (oppvelling). Walker-sirkulasjonen lukker kretsen: oppstigning i vest, østgående transport i høyden, nedsynking i øst og passatvinder tilbake ved overflaten."
          fit="contain"
          points={[
            {
              n: "1",
              label:
                "Varmt vestlig basseng (>29 °C). Konveksjon og kraftig nedbør over Indonesia.",
            },
            {
              n: "2",
              label:
                "Oppvelling ved Peru. Kaldt, næringsrikt bunnvann erstatter overflatevannet.",
            },
            {
              n: "3",
              label:
                "Walker-sirkulasjonen: den lukkede øst–vest-cellen i atmosfæren langs ekvator.",
            },
          ]}
        />

        <div className="pt-2">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            Walker-sirkulasjonen
          </h4>
          <p className="mt-1 text-sm sm:text-base">
            Det lukkede luftsirkulasjonsmønsteret langs ekvator kalles{" "}
            <strong>Walker-sirkulasjonen</strong>, oppkalt etter Gilbert
            Walker. Kretsen består av:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
            <li>
              <strong>Oppstigning i vest:</strong> Varm luft stiger over det
              vestlige varmebassenget (konveksjon).
            </li>
            <li>
              <strong>Østgående transport i høyden:</strong> Luften flyter
              østover i øvre troposfære.
            </li>
            <li>
              <strong>Nedsynking i øst:</strong> Luften synker over det østlige
              Stillehavet og gir høytrykk.
            </li>
            <li>
              <strong>Passatvinder ved overflaten:</strong> Luften strømmer
              vestover og lukker kretsen.
            </li>
          </ul>
        </div>

        <OrdBoks
          ord="Walker-sirkulasjonen"
          barn="Øst–vest-gående atmosfærisk sirkulasjonscelle over det ekvatoriale Stillehavet. Oppstigning i vest (Indonesia), østgående transport i høyden, nedsynking i øst (Peru), vestgående passatvinder ved overflaten. Beskrevet av Gilbert Walker på 1920-tallet."
        />
      </CollapsibleSection>
    </>
  );
}
