import { Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  BoundaryOverviewDiagram,
  CollisionDiagram,
  ContinentalRiftDiagram,
  OceanOceanSubductionDiagram,
  SubductionDiagram,
  TransformDiagram,
} from "@/components/diagrams";
import { PlateTectonicsModel } from "@/components/models/plate-tectonics-model";
import { PhotoFigure } from "@/components/photo-figure";

const lenke = "text-primary underline-offset-2 hover:underline";

export function PlateDel2() {
  return (
    <>
      <h2 id="grenser" className="pt-6 font-display text-2xl font-medium tracking-tight">
        Plategrensene: tre bevegelser, seks miljøer
      </h2>
      <p>
        Retning (fra, mot, sidelengs) og skorpetype (oseanisk eller kontinental) styrer hva som skjer.
      </p>
      <BoundaryOverviewDiagram />
      <h3 className="pt-4 font-display text-xl font-medium tracking-tight text-amber-500">
        1. Divergerende grenser
      </h3>
      <p>Havbunnsspredning og kontinental rifting. Black smokers og graben hører hjemme her.</p>
      <ContinentalRiftDiagram />
      <PhotoFigure
        src="/images/geo-midthavsrygg-hydrotermal.jpg"
        alt="Snitt av midthavsrygg med putelava og hydrotermale skorsteiner"
        heading="Midthavsryggens anatomi"
        caption="Dekompresjonssmelting mater putelava og black smokers i spredningsaksen."
      />
      <h3 className="pt-6 font-display text-xl font-medium tracking-tight text-sky-500">
        2. Konvergerende grenser
      </h3>
      <p>Hav–kontinent, hav–hav og kontinent–kontinent. Flukssmelting bygger buen; kollisjon bygger skyvedekker.</p>
      <SubductionDiagram />
      <OceanOceanSubductionDiagram />
      <CollisionDiagram />
      <PhotoFigure
        src="/images/geo-subduksjon-3d.jpg"
        alt="Snitt av subduksjonssone med grop, akkresjonskile og vulkanbue"
        heading="Subduksjon: dehydrering og flukssmelting"
        caption="Vann fra den synkende havbunnen senker solidus i mantelkilen. Magmaen mater buen."
      />
      <h3 className="pt-6 font-display text-xl font-medium tracking-tight text-emerald-500">
        3. Transformgrenser
      </h3>
      <p>
        Konservativ grense uten vulkanisme. Aktiv transform mellom ryggsegmenter; aseismisk bruddsone utenfor.
      </p>
      <TransformDiagram />
      <h2 id="modell" className="pt-6 font-display text-2xl font-medium tracking-tight">
        Interaktiv modell: de tre grensene i snitt
      </h2>
      <p>
        Simulatoren kommer rett etter grensene. Slå på jordskjelvfokus i subduksjon for å se Benioff-planet.
      </p>
      <PlateTectonicsModel />
      <Callout title="Jordskjelv eier neste kapittel">
        <p>
          Her eier vi hvor det skjelver. Bølger, magnitude og elastisk tilbakefjæring ligger i{" "}
          <Link to="/geofag-1/vulkaner-og-jordskjelv" className={lenke}>
            Vulkaner og jordskjelv
          </Link>
          .
        </p>
      </Callout>
      <h2 id="ofiolitt" className="pt-6 font-display text-2xl font-medium tracking-tight">
        Ofiolitt og Leka
      </h2>
      <p>
        Obdusert havbunn: sediment, putelava, ganger, gabbro, Moho, peridotitt. Leka er Norges tverrsnitt.
      </p>
      <PhotoFigure
        src="/images/geo-ofiolitt-leka.jpg"
        alt="Leka ofiolittkompleks med gulbrun dunitt fra mantelen"
        heading="Leka: havbunn på land"
        caption="På Leka kan du gå fra mantelperidotitt over Moho til gabbro og putelava."
      />
    </>
  );
}
