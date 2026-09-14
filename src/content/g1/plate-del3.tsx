import { Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  HotspotPlumeDiagram,
  NorwayTectonicsHistoryDiagram,
  WilsonCycleDiagram,
} from "@/components/diagrams";
import { GeoMap } from "@/components/geo-map";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { Term, TermGrid } from "@/components/term";

const lenke = "text-primary underline-offset-2 hover:underline";

export function PlateDel3() {
  return (
    <>
      <h2 id="hotspot" className="pt-6 font-display text-2xl font-medium tracking-tight">
        Hotspots og Wilsonsyklusen
      </h2>
      <p>
        Mantelplymer fra kjerne–mantel-grensen brenner øykjeder. Wilsonsyklusen åpner og lukker hav over 400–600 Ma.
      </p>
      <HotspotPlumeDiagram />
      <WilsonCycleDiagram />
      <PhotoFigure
        src="/images/geo-wilsonsyklus-3d.jpg"
        alt="Wilsonsyklusens stadier fra rifting til sutur"
        heading="Wilsonsyklusens seks stadier"
        caption="Rift → ungt hav → modent hav → subduksjon → lukking → kollisjon og sutur."
      />
      <h2 id="norge" className="pt-6 font-display text-2xl font-medium tracking-tight">
        Norge i platetektonisk lys
      </h2>
      <p>
        Kaledonidene, Oslofeltet, åpningen av Norskehavet og glasial isostasi former landet — langt inne på den eurasiske platen.
      </p>
      <NorwayTectonicsHistoryDiagram />
      <GeoMap
        center={[65, -3]}
        zoom={4}
        markers={[
          { lat: 64.2558, lng: -21.131, label: "Þingvellir — synlig spredningsrift" },
          { lat: 71.0, lng: -8.5, label: "Jan Mayen (Beerenberg)" },
          { lat: 59.91, lng: 10.75, label: "Oslofeltet — permisk rift" },
          { lat: 61.63, lng: 8.31, label: "Jotunheimen — kaledonsk skyvedekke" },
        ]}
        heading="Nøkkelsteder i nærområdet"
        caption="Spredningsakse, kaledonsk rot, permisk graben og Norges aktive vulkan på ryggsystemet."
      />
      <Callout title="Kompetansemål i LK20 (Geofag 1)">
        <p>
          Eleven skal kunne gjøre rede for indre krefter og platetektonikk, og hvilke konsekvenser dette har for skorpe og overflate.
        </p>
      </Callout>
      <h2 id="ord" className="font-display text-2xl font-medium tracking-tight">Sentralt fagvokabular</h2>
      <TermGrid>
        <Term name="litosfære" def="skorpe + stiv øvre mantel som utgjør platene" />
        <Term name="astenosfære" def="varm, fast peridotitt som flyter duktilt over millioner av år" />
        <Term name="slab pull" def="kald eklogitt-slab synker og trekker platen" />
        <Term name="ridge push" def="gravitasjonsglidning fra den høye midthavsryggen" />
        <Term name="dekompresjon" def="trykkfall uten ekstra varme; solidus krysses under rygg og rift" />
        <Term name="flukssmelting" def="vann fra slab senker solidus i mantelkilen" />
        <Term name="ofiolitt" def="obdusert tverrsnitt av havbunn og øvre mantel, som på Leka" />
        <Term name="Wilsonsyklus" def="åpning og lukking av verdenshav over 400–600 mill. år" />
        <Term name="isostasi" def="litosfærens flytelikevekt; landheving etter istid" />
      </TermGrid>
      <h2 id="quiz" className="pt-6 font-display text-2xl font-medium tracking-tight">Test deg selv</h2>
      <Quiz
        questions={[
          {
            prompt: "Hva er den mekaniske forskjellen på litosfære og astenosfære?",
            options: [
              "Litosfæren er magma, astenosfæren er granitt.",
              "Litosfæren er kald og sprø; astenosfæren er varm, fast peridotitt som deformeres duktilt.",
              "Litosfæren finnes bare under kontinenter.",
              "De er kjemisk ulike, men mekanisk like.",
            ],
            answer: 1,
            explain: "Begge er fast bergart. Forskjellen er temperatur og reologi.",
          },
          {
            prompt: "Hva er den viktigste drivkraften bak platebevegelse?",
            options: [
              "Tidevann fra månen.",
              "Slab pull: kald havbunn blir eklogitt og synker.",
              "Vind mot fjellkjeder.",
              "Sentrifugalkraft mot ekvator.",
            ],
            answer: 1,
            explain: "Slab pull står for størstedelen av kraften.",
          },
        ]}
      />
      <p className="text-sm text-muted-foreground">
        Kvikkleire etter landheving eier{" "}
        <Link to="/geofag-1/skred" className={lenke}>
          skredkapittelet
        </Link>
        .
      </p>
    </>
  );
}
