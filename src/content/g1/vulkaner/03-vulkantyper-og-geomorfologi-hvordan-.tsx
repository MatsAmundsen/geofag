import { CalderaFormationDiagram, VolcanoTypesDiagram } from "@/components/diagrams";
import { PhotoFigure } from "@/components/photo-figure";
import { OrdBoks } from "@/components/term";

export function VulkantyperOgGeomorfologiHvordan() {
  return (
    <>
      {/* SEKSJON 3: VULKANTYPER OG GEOMORFOLOGI */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Vulkantyper og geomorfologi: Hvordan magmakjemien bygger landformer
        </h2>
        <p>
          Magmaens egenskaper bestemmer ikke bare utbruddenes voldsomhet, men setter et uutslettelig preg på selve
          vulkanbygningens form og geometri. Vi skiller mellom tre hovedkategorier av vulkaner, i tillegg til de enorme
          innsynkningsstrukturene kalt kalderaer.
        </p>

        <VolcanoTypesDiagram />

        <PhotoFigure
          src="/images/geo-vulkantyper-3d.jpg"
          alt="3D-sammenligning av de fire vulkantypene: skjoldvulkan, stratovulkan, sinderkjegle og kaldera"
          heading="3D-geometri og dimensjoner: De fire vulkantypene"
          caption="Vulkanbygningens form gjenspeiler direkte magmaens kjemiske viskositet og gassinnhold. Skjoldvulkaner (slak helling 2–10°, basalt) dekker enorme arealer. Stratovulkaner (bratt helling 25–35°, andesitt/dasitt) er høyreiste og lagdelte. Sinderkjegler (scoria cones) er små kjegler av slagg og pimpstein. Kalderaer er gigantiske innsynkningskratere etter magmakammertak som kollapser."
          marks={[
            { x: 18, y: 55, n: "1", text: "Skjoldvulkan", tone: "cold" },
            { x: 44, y: 38, n: "2", text: "Stratovulkan", tone: "warm" },
            { x: 70, y: 55, n: "3", text: "Sinderkjegle", tone: "cold" },
            { x: 88, y: 48, n: "4", text: "Kaldera", tone: "warm" },
          ]}
          points={[
            { n: "1", label: "Skjoldvulkan (f.eks. Mauna Loa): Ekstremt bred fot og slak profil bygd opp av titusenvis av tynne basaltiske lavastrømmer." },
            { n: "2", label: "Stratovulkan (f.eks. Fuji, St. Helens og Beerenberg): Bratt, symmetrisk kjegle oppbygd av vekslende lag av seig lava og tefra." },
            { n: "3", label: "Sinderkjegle (scoria cone): Sjelden over 300 m høy; dannet ved eksplosiv utblåsing av basaltiske gassfontener." },
            { n: "4", label: "Kaldera (f.eks. Yellowstone og Toba): Enorm innsynkning der jordskorpetaket har rast sammen ned i magmakammeret." },
          ]}
        />

        <div className="grid gap-4 md:grid-cols-3 pt-2">
          <div className="rounded-xl border border-border bg-card/70 p-4">
            <h4 className="font-semibold text-warm text-sm">1. Skjoldvulkaner</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              <strong>Form:</strong> Enorme, flate og hvelvede fjellmasser som minner om et liggende krigerskjold.
              Skråningsvinkelen er meget slak, typisk bare 2° til 10°.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Mekanisme:</strong> Mates av basaltisk lava med lav viskositet som strømmer titalls kilometer
              før den størkner. Bygges opp lag for lag av tusenvis av tynne lavadekker.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Eksempler:</strong> Mauna Loa og Kilauea på Hawaii. Mauna Loa rager over 9000 meter fra
              havbunnen og er jordens mest voluminøse aktive fjell!
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/70 p-4">
            <h4 className="font-semibold text-rose-400 text-sm">2. Stratovulkaner (sammensatte)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              <strong>Form:</strong> Klassiske, symmetriske og bratte kjegler med skråningsvinkel på 25° til 35°.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Mekanisme:</strong> Bygges opp av vekslende lag (strata) av herdet seig lava, vulkansk aske,
              pimpstein og tefra fra eksplosive utbrudd. Den seige andesittiske magmaen flyter sjelden langt, men danner
              propper og kupler nær toppen.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Eksempler:</strong> Mount Fuji i Japan, Vesuv i Italia, Mount St. Helens i USA,
              Pinatubo på Filippinene, og Norges Beerenberg på Jan Mayen.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/70 p-4">
            <h4 className="font-semibold text-sand text-sm">3. Sinderkjegler (scoria cones)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              <strong>Form:</strong> Mindre, bratte kjegleformede hauger (sjelden over 300–400 meter høye) med en markert
              kraterfordypning i toppen.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Mekanisme:</strong> Dannet ved korte, gassdrevne utbrudd der basaltiske lavafontener slynger
              glødende slagg og sinder opp i luften. Fragmentene størkner i flukten og danner en rasvinkel-stabil haug
              rundt krateråpningen.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Eksempel:</strong> Parícutin i Mexico, som vokste opp midt på en kornåker i 1943.
            </p>
          </div>
        </div>

        <h3 className="pt-4 font-display text-xl font-medium tracking-tight text-primary">
          Kalderaer og supervulkaner: Takkollaps i gigantskala
        </h3>
        <p>
          Mange forveksler et vulkankrater med en <em>kaldera</em>. Et krater er en utblåsningsåpning dannet ved erosjon
          og eksplosiv utslynging fra tilførselsrøret. En kaldera, derimot, er en kolossal innsynkningsgryte som oppstår
          når et gigantisk magmakammer tømmes så raskt under et katastrofalt utbrudd at taket i jordskorpen mister all
          mekanisk understøttelse og raser loddrett ned.
        </p>

        <CalderaFormationDiagram />

        <p>
          Kalderaer spenner fra få kilometer i diameter (som Crater Lake i Oregon etter Mazamas utbrudd for 7700 år siden,
          eller Santorini i Hellas ca. 1600 f.Kr.) til titalls kilometer brede strukturer (som Toba på Sumatra og
          Yellowstone i USA). Slike gigantiske utbrudd klassifiseres ofte som supervulkaner (VEI 8) og har potensial til
          å endre jordens biosfære og klima fundamentalt.
        </p>

        <OrdBoks
          ord="Kaldera"
          barn="En stor, sirkulær innsynkningsfordypning i jordskorpen (ofte 5–50 km bred) som oppstår når taket over et delvis tømt magmakammer kollapser."
        />
      </section>

    </>
  );
}
