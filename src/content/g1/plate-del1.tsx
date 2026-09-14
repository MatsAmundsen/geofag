import { Callout } from "@/components/callout";
import {
  ConvectionDiagram,
  DecompressionMeltingDiagram,
  EarthLayersDiagram,
  PlatesMapDiagram,
  SolidusDiagram,
  SpreadingDiagram,
} from "@/components/diagrams";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks } from "@/components/term";

/** Full tekst i artifacts/g1-struktur/content/plate-del1.tsx — fylles i neste commit. */
export function PlateDel1() {
  return (
    <>
      <nav aria-label="Kapitteloversikt" className="rounded-xl border border-border bg-card/50 p-4 text-sm">
        <p className="font-display text-base font-medium tracking-tight">Slik er kapittelet bygd</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
          <li><a className="text-primary underline-offset-2 hover:underline" href="#lag">Lag og reologi</a></li>
          <li><a className="text-primary underline-offset-2 hover:underline" href="#bevis">Bevisene</a></li>
          <li><a className="text-primary underline-offset-2 hover:underline" href="#krefter">Drivkrefter</a></li>
          <li><a className="text-primary underline-offset-2 hover:underline" href="#smelting">Smelting</a></li>
          <li><a className="text-primary underline-offset-2 hover:underline" href="#grenser">Plategrenser</a></li>
          <li><a className="text-primary underline-offset-2 hover:underline" href="#modell">Modell</a></li>
          <li><a className="text-primary underline-offset-2 hover:underline" href="#ofiolitt">Ofiolitt</a></li>
          <li><a className="text-primary underline-offset-2 hover:underline" href="#hotspot">Hotspot og Wilsonsyklus</a></li>
          <li><a className="text-primary underline-offset-2 hover:underline" href="#norge">Norge</a></li>
        </ol>
      </nav>
      <h2 id="lag" className="font-display text-2xl font-medium tracking-tight">
        Jordens dynamiske indre: Litosfære, astenosfære og reologi
      </h2>
      <p>
        En tektonisk plate er litosfære (skorpe + stiv øvre mantel), ikke et skall som flyter på magma.
        Astenosfæren er fast peridotitt som deformeres seigt over millioner av år.
      </p>
      <EarthLayersDiagram />
      <h2 id="bevis" className="pt-6 font-display text-2xl font-medium tracking-tight">
        Oppdagelsen og bevisene
      </h2>
      <p>
        Wegener (1912) hadde puslespillet, Hess (1962) spredningen, Vine og Matthews (1963) magnetstripene.
      </p>
      <SpreadingDiagram />
      <PhotoFigure
        src="/images/fig-spredring.jpg"
        alt="Sprekk i basalt på Island der to plater glir fra hverandre"
        heading="Þingvellir: divergerende grense på tørt land"
        caption="Island er et av få steder der midthavsryggen rager over havet. Sprekken vider seg ut med om lag 2–2,5 cm i året."
      />
      <h2 id="krefter" className="pt-6 font-display text-2xl font-medium tracking-tight">
        Hva driver platene?
      </h2>
      <p>
        Slab pull (~90 %) og ridge push. Platene driver i stor grad seg selv (Forsyth og Uyeda, 1975).
      </p>
      <ConvectionDiagram />
      <PlatesMapDiagram />
      <h2 id="smelting" className="pt-6 font-display text-2xl font-medium tracking-tight">
        Hvorfor mantelberg smelter
      </h2>
      <p>Tre mekanismer: dekompresjon, fluks og mantelplym. Solidus krysses; mantelen er ikke et magmaha.</p>
      <SolidusDiagram />
      <DecompressionMeltingDiagram />
      <OrdBoks ord="Slab pull" barn="Kald havbunn blir eklogitt og synker; trekker resten av platen etter seg." />
      <Quiz
        questions={[
          {
            prompt: "Hvorfor oppstår dekompresjonssmelting under en midthavsrygg?",
            options: [
              "Havvann koker mantelen.",
              "Skorpetynning senker trykket; mantelen stiger adiabatisk og krysser solidus.",
              "Friksjon smelter platen helt.",
              "Astenosfæren er flytende magma.",
            ],
            answer: 1,
            explain: "Trykkfall uten varmetap får peridotitt til å krysse solidus.",
          },
        ]}
      />
    </>
  );
}
