import { CollapsibleSection } from "@/components/collapsible-section";
import { PhotoFigure } from "@/components/photo-figure";
import { BjerknesLoopDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function Elnino() {
  return (
    <>
      <CollapsibleSection
        title="2. El Niño (Varm fase — Når systemet snur)"
        subtitle="Bjerknes-løkka · Kelvin-bølger · Termoklin synker i øst · Flom i Peru, tørke i vest"
        badge="Varm fase"
        badgeVariant="amber"
      >
        <p>
          Termoklinen er bunnen av det varme laget. Passaten holder skråningen mot tyngdekraften: dyp i vest, grunn i øst.
          Når termoklinen synker i øst under El Niño, er det fordi den skråningen ikke lenger holdes — og fordi en Kelvin-bølge har trykket det varme laget ned der.
        </p>
        <p>
          Det står ofte at passatene svekkes, og at termoklinen derfor endres. Da er det naturlig å spørre: må ikke termoklinen endres <em>først</em>, ellers hvorfor skulle passaten slakke?
        </p>
        <p>
          Nei. De to er låst i samme løkke. Ingen av dem er «først» når El Niño først er i gang (Bjerknes, 1969). Utløseren kan sitte i atmosfæren. Havet kan være oppladet på forhånd. Det er to ulike «først».
        </p>

        <BjerknesLoopDiagram />

        <div>
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">Hvorfor termoklinen endres</h4>
          <p className="mt-1 text-sm sm:text-base">
            Vindstresset holder varmt vann stablet i vest. Tyngdekraften vil flate ut bunken. Slipper passaten taket, går likevekten i oppløsning.
            Langs ekvator forplanter det seg som en <strong>Kelvin-bølge</strong>: en indre bølge i sjiktningen, 2–3 m/s østover, to–tre måneder over bassenget.
            Der bølgen kommer, synker termoklinen. Oppvelling fortsetter, men henter nå lunkent vann ovenfor det dypere skillet — ikke kaldt næringsvann.
            SST stiger utenfor Peru uten at «vinden suger vann opp» på en ny måte.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">To ulike «først»</h4>
          <p className="mt-1 text-sm sm:text-base">
            <strong>Atmosfæren kan gå først.</strong> Et vestavindsutbrudd — ofte knyttet til Madden–Julian-oscillasjonen — svekker passaten i uker uten at termoklinen har endret seg ennå. Så sender den Kelvin-bølger som endrer termoklinen i øst.
          </p>
          <p className="mt-2 text-sm sm:text-base">
            <strong>Havet kan være oppladet først.</strong> Etter La Niña bygges varmelageret i ekvatorialt Stillehav opp igjen (Jin, 1997). Termoklinen er da dypere i snitt. Systemet er ustabilt: et lite vindavvik vokser. Her har termoklinen endret seg som <em>forutsetning</em>, ikke som selve utløseren. Mange vestavindsutbrudd dør ut uten å bli El Niño nettopp fordi havet ikke er oppladet.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border/70 bg-card/70 p-4">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">Bjerknes-tilbakekoblingen</h4>
            <p className="mt-1 text-xs text-foreground/85 sm:text-sm">
              Svakere passater → termoklin synker i øst → SST stiger i øst → Walker svekkes → enda svakere passater. Positiv tilbakekobling: den forsterker, den starter ikke.
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-card/70 p-4">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">Ekvatoriale Kelvin-bølger</h4>
            <p className="mt-1 text-xs text-foreground/85 sm:text-sm">
              Det er slik en vindendring i vest blir til en dypere termoklin i øst. Satellitter sporer havnivået 3–6 måneder før varmen når Sør-Amerikas kyst.
            </p>
          </div>
        </div>

        <PhotoFigure
          src="/images/fig-enso-kelvin.jpg"
          alt="Satellittaltimetri av ekvatorial Kelvin-bølge"
          heading="Figur 2. Satellittovervåking av ekvatorial Kelvin-bølge"
          caption="SSHA viser en Kelvin-bølge under oppbygging av El Niño: hevet havnivå (+15 til +25 cm) beveger seg østover langs ekvator med 2–3 m/s. Data: Sentinel-6 / Jason-3."
          fit="contain"
          points={[
            { n: "1", label: "Havoverflatehøyde hevet 15–25 cm langs ekvator." },
            { n: "2", label: "Kelvin-bølgen brer seg østover med ca. 2–3 m/s (2–3 måneder over Stillehavet)." },
            { n: "3", label: "Satellitter gir 3–6 måneders forvarsel før El Niño når kysten." },
          ]}
        />

        <PhotoFigure
          src="/images/fig-enso-elnino.jpg"
          alt="Tverrsnitt av El Niño-tilstanden"
          heading="Figur 3. El Niño-tilstanden"
          caption="Passatene svekkes. Varmt vann skvulper østover. Termoklinen flater ut i øst. Konveksjon og regn forskyves fra Indonesia mot sentrale og østlige Stillehavet."
          fit="contain"
          points={[
            { n: "1", label: "Svekket passatvind. Bjerknes-tilbakekoblingen forsterker." },
            { n: "2", label: "Kelvin-bølge bærer varmt vann østover langs ekvator." },
            { n: "3", label: "Termoklinen trykkes ned i øst. Oppvelling henter lunkent vann." },
            { n: "4", label: "Konveksjon forskyves til sentralt/østlig Stillehav." },
          ]}
        />

        <div>
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">Termoklinen og den lunkne oppvellingen</h4>
          <p className="mt-1 text-sm sm:text-base">
            Oppvellingen «stanser» ikke som en kran. Vannet stiger fortsatt. Men termoklinen ligger dypere, så det som kommer opp er lunkent overflatevann, ikke kaldt næringsvann. Ansjosbestandene kollapser. Peruanske kystfiskere ga fenomenet navnet <em>El Niño</em> («Jesusbarnet») fordi oppvarmingen ofte kulminerte rundt juletider.
          </p>
        </div>

        <OrdBoks
          ord="Termoklin"
          barn="Sjiktet der temperaturen faller raskt med dybden. Under El Niño trykkes termoklinen ned i øst, noe som kveler tilførselen av kaldt, næringsrikt bunnvann."
        />

        <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
          <h4 className="font-display text-base font-semibold tracking-tight text-primary">Regionale konsekvenser av El Niño</h4>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
            <li><strong>Peru og Ecuador:</strong> Voldsom nedbør og leirskred i ørkenområder. Elver flommer; fiskeriet kollapser.</li>
            <li><strong>Indonesia og Øst-Australia:</strong> Alvorlig tørke og skogbranner. Svekket monsun.</li>
            <li><strong>India:</strong> Monsunen kan svekkes og gi avlingssvikt.</li>
            <li><strong>Sørøst-Afrika:</strong> Svekket regnperiode og risiko for matmangel.</li>
            <li><strong>Karibia og Mellom-Amerika:</strong> Tørrere enn normalt (f.eks. Panamakanalen).</li>
          </ul>
        </div>
      </CollapsibleSection>
    </>
  );
}
