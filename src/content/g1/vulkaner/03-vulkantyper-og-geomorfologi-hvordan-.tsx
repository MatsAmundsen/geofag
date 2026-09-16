import { PhotoFigure } from "@/components/photo-figure";
import { OrdBoks } from "@/components/term";
import {
  CalderaFormationDiagram,
  VolcanoTypesDiagram,
} from "@/components/diagrams";

export function VulkantyperOgGeomorfologiHvordan() {
  return (
    <>
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
          caption="Vulkanbygningens form gjenspeiler direkte magmaens kjemiske viskositet og gassinnhold. Skjoldvulkaner (slak helling 2–10°, basalt) dekker enorme arealer. Stratovulkaner (bratt helling 25–35°, andesitt/dasitt) er høyreiste og lagdelte. Sinderkjegler er små kjegler av slagg og pimpstein. Kalderaer er gigantiske innsynkningskratere etter magmakammertak som kollapser."
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
              <strong>Form:</strong> Enorme, flate og hvelvede fjellmasser. Skråningsvinkelen er meget slak, typisk 2° til 10°.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Mekanisme:</strong> Mates av basaltisk lava med lav viskositet som strømmer titalls kilometer før den størkner.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Eksempler:</strong> Mauna Loa og Kilauea på Hawaii. Mauna Loa rager over 9000 meter fra havbunnen.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/70 p-4">
            <h4 className="font-semibold text-rose-400 text-sm">2. Stratovulkaner (sammensatte)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              <strong>Form:</strong> Klassiske, symmetriske og bratte kjegler med skråningsvinkel på 25° til 35°.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Mekanisme:</strong> Bygges opp av vekslende lag av herdet seig lava, aske, pimpstein og tefra.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Eksempler:</strong> Mount Fuji, Vesuv, Mount St. Helens, Pinatubo og Beerenberg på Jan Mayen.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/70 p-4">
            <h4 className="font-semibold text-sand text-sm">3. Sinderkjegler (scoria cones)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              <strong>Form:</strong> Mindre, bratte kjegler (sjelden over 300–400 meter) med krater i toppen.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <strong>Mekanisme:</strong> Gassdrevne lavafontener slynger slagg og sinder opp; fragmentene danner en rasvinkel-stabil haug.
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
          Et krater er en utblåsningsåpning. En kaldera er en kolossal innsynkningsgryte som oppstår når et gigantisk
          magmakammer tømmes så raskt at taket mister understøttelse og raser loddrett ned.
        </p>

        <CalderaFormationDiagram />

        <p>
          Kalderaer spenner fra få kilometer (Crater Lake, Santorini) til titalls kilometer (Toba, Yellowstone).
          Slike VEI 8-utbrudd har potensial til å endre biosfære og klima fundamentalt.
        </p>

        <OrdBoks
          ord="Kaldera"
          barn="En stor, sirkulær innsynkningsfordypning i jordskorpen (ofte 5–50 km bred) som oppstår når taket over et delvis tømt magmakammer kollapser."
        />
      </section>
    </>
  );
}
