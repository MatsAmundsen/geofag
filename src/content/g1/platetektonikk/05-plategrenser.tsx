import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import {
  BoundaryOverviewDiagram,
  CollisionDiagram,
  ContinentalRiftDiagram,
  OceanOceanSubductionDiagram,
  SubductionDiagram,
  TransformDiagram,
} from "@/components/diagrams";

export function Plategrenser() {
  return (
    <>
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Plategrensene: Tre relative bevegelser, seks geologiske miljøer
        </h2>
      <p>
        Jordens mest dramatiske geologiske hendelser er konsentrert langs grensene mellom litosfæreplatene.
        Hva som skjer ved en gitt grense, avhenger av to faktorer: <strong>bevegelsesretningen</strong> (fra
        hverandre, mot hverandre eller sidelengs) og <strong>skorpetypen</strong> som møtes (oseanisk eller
        kontinental).
      </p>

      <BoundaryOverviewDiagram />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight text-amber-500">
        1. Divergerende grenser (Platene glir fra hverandre)
      </h3>
      <p>
        Under divergens utsettes litosfæren for tektonisk strekk (tensjon). Dette manifesterer seg i to distinkte stadier:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Havbunnsspredning:</strong> Grensen ligger midt i havet (Den midtatlantiske ryggen, Gakkelryggen
          i Polhavet, Øst-Stillehavsryggen). Magma fra dekompresjonssmelting fyller sprekken og danner putelava og
          basaltganger. Varmt sjøvann sirkulerer ned, varmes til over 350 °C og spruter ut som{" "}
          <strong>hydrotermale skorsteiner («black smokers»)</strong> med kjemotrofiske økosystemer.
        </li>
        <li>
          <strong>Kontinental rifting:</strong> Skorpen strekkes og tynnes; blokker raser ned langs normalforkastninger
          og danner en <strong>graben</strong> (Den østafrikanske riftdalen). Fortsetter riftingen, blir det et smalt
          hav (Rødehavet) og deretter en midthavsrygg — slik Atlanterhavet ble født da Pangea revnet for ca. 180 Ma.
        </li>
      </ul>

      <ContinentalRiftDiagram />

      <PhotoFigure
        src="/images/geo-midthavsrygg-hydrotermal.jpg"
        alt="3D-snitt av midthavsrygg med dekompresjonssmelting, aksialt magmakammer, putelava og hydrotermale skorsteiner"
        heading="Midthavsryggens anatomi: Dekompresjonssmelting og hydrotermale skorsteiner"
        caption="Når to litosfæreplater trekkes fra hverandre, stiger astenosfærisk peridotitt adiabatisk. Trykkfallet utløser dekompresjonssmelting (10–20 %) som produserer basalt. På havbunnen størkner lavaen som putelava, mens sjøvann varmes til over 350 °C og spyles ut som black smokers."
        marks={[
          { x: 50, y: 15, n: "1", text: "Black smoker", tone: "warm" },
          { x: 32, y: 48, n: "2", text: "Putelava", tone: "cold" },
          { x: 50, y: 62, n: "3", text: "Magmakammer", tone: "warm" },
          { x: 50, y: 88, n: "4", text: "Dekompresjon", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Hydrotermale skorsteiner spyr ut overopphetet, mineralrikt fluid." },
          { n: "2", label: "Basaltisk putelava dannes når lava bråkjøles mot bunnvannet." },
          { n: "3", label: "Aksialt gabbroid magmakammer på 2–4 km dyp." },
          { n: "4", label: "Adiabatisk oppstigende astenosfære krysser solidus." },
        ]}
      />

      <h3 className="pt-6 font-display text-xl font-medium tracking-tight text-sky-500">
        2. Konvergerende grenser (Platene kolliderer)
      </h3>
      <p>
        Ved konvergens presses to litosfæreplater mot hverandre. Tre miljøer:
      </p>
      <ul className="list-disc space-y-3 pl-6 text-foreground/90">
        <li>
          <strong>Hav mot kontinent (Andesfjellene):</strong> Tunge Nazca bøyes under Sør-Amerika. Peru-Chile-gropen
          og akkresjonskile foran. Flukssmelting gir andesitt/dasitt og eksplosive stratovulkaner.
        </li>
        <li>
          <strong>Hav mot hav (Marianene og Japan):</strong> Eldste, kaldeste platen går under. Marianegropen med
          Challengerdypet på <strong>11 034 meter</strong>. Magmaen bygger en <strong>vulkanøybue</strong>.
        </li>
        <li>
          <strong>Kontinent mot kontinent (Himalaya og Kaledonidene):</strong> Ingen plate synker; skorpen foldes i
          <strong>skyvedekker</strong>. Opptil 70–80 km skorperot, nesten ingen vulkanisme, regional metamorfose.
        </li>
      </ul>

      <SubductionDiagram />
      <OceanOceanSubductionDiagram />
      <CollisionDiagram />

      <PhotoFigure
        src="/images/geo-subduksjon-3d.jpg"
        alt="3D-snitt av subduksjonssone med dyphavsgrop, akkresjonskile, dehydrering, flukssmelting og vulkanbue"
        heading="Anatomi av en subduksjonssone: Dehydrering, flukssmelting og akkresjonskile"
        caption="Hydratiserte mineraler dehydreres ved 80–150 km dyp og slipper vann inn i mantelkilen. Vannet senker peridotittens smeltepunkt (flukssmelting). Magmaen mater en eksplosiv vulkanbue; sedimenter danner akkresjonskile foran gropen."
        marks={[
          { x: 18, y: 55, n: "1", text: "Dyphavsgrop", tone: "cold" },
          { x: 26, y: 48, n: "2", text: "Akkresjonskile", tone: "warm" },
          { x: 42, y: 78, n: "3", text: "Dehydrering", tone: "cold" },
          { x: 54, y: 64, n: "4", text: "Flukssmelting", tone: "warm" },
          { x: 68, y: 32, n: "5", text: "Vulkanbue", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Dyphavsgrop der platen dykker (opptil 11 km dyp)." },
          { n: "2", label: "Akkresjonskile av avskrapede havsedimenter." },
          { n: "3", label: "Dehydrering av serpentinitt og leire." },
          { n: "4", label: "Flukssmelting i mantelkilen." },
          { n: "5", label: "Vulkanbue av viskøs, gassrik magma." },
        ]}
      />

      <h4 className="pt-4 font-display text-lg font-medium tracking-tight">
        Subduksjonens sonering: Akkresjonskile, forbue- og bakbuebasseng
      </h4>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li><strong>1. Dyphavsgropen (trench):</strong> Der litosfæren bøyes ned.</li>
        <li><strong>2. Akkresjonskilen:</strong> Løse sedimenter skrapes av og stables i imbrikerte flak.</li>
        <li><strong>3. Forbuebassenget:</strong> Rolig sedimentasjonsbasseng mellom kile og vulkanbue.</li>
        <li><strong>4. Vulkansk bue:</strong> Flukssmelting på 100–120 km dyp.</li>
        <li><strong>5. Bakbuebassenget:</strong> Slab rollback suger platen og kan åpne et lite hav (Japanhavet).</li>
      </ul>

      <h3 className="pt-6 font-display text-xl font-medium tracking-tight text-emerald-500">
        3. Transformgrenser (Platene glir sidelengs)
      </h3>
      <p>
        Langs en transformgrense glir to plater horisontalt forbi hverandre — en <strong>konservativ grense</strong>.
        Ingen dekompresjon eller fluks, derfor <strong>uten vulkanisme</strong>, men med ødeleggende jordskjelv.
      </p>
      <p>
        Friksjon låser forkastningen. Platene beveger seg 3–5 cm/år noen kilometer unna; bergartene deformeres elastisk
        til bruddstyrken overskrides og platene forskyves meter på sekunder. Typeeksempel: <strong>San Andreas</strong>.
        I Norskehavet: <strong>Jan Mayen-bruddsonen</strong>.
      </p>

      <TransformDiagram />

      <h4 className="pt-4 font-display text-lg font-medium tracking-tight">
        Transformforkastning vs. inaktiv bruddsone (fracture zone)
      </h4>
      <p>
        J. Tuzo Wilson løste i 1965 paradokset: Hvorfor er rygger kuttet i forskjøvede segmenter, og hvorfor stopper
        jordskjelvene utenfor ryggaksen?
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Aktiv transformforkastning (mellom ryggsegmentene):</strong> Platene beveger seg i motsatt retning.
          Intens friksjon og grunne jordskjelv. Geometrien kan være sinistral selv om ryggen ser høyreforskjøvet ut.
        </li>
        <li>
          <strong>Inaktiv bruddsone (utenfor ryggaksen):</strong> Havbunnen på begge sider beveger seg i
          <strong>samme retning med samme fart</strong>. Null relativ bevegelse, <strong>ingen jordskjelv</strong>.
        </li>
      </ul>

      <Quiz
        questions={[
          {
            prompt: "Hva er den mekaniske forskjellen mellom aktiv transformforkastning og inaktiv bruddsone?",
            options: [
              "Ingen forskjell; begrepene er synonyme.",
              "Aktiv transform forbinder to ryggsegmenter der platene går motsatt (seismisk); bruddsonen utenfor har skorpe i samme retning (aseismisk arr).",
              "Bruddsoner finnes bare i subduksjon; transform bare på land.",
              "Transformforkastninger har alltid skjelv dypere enn 300 km.",
            ],
            answer: 1,
            explain: "Riktig! Wilson 1965: transform bare mellom de to ryggaksene. Utenfor går begge sider samme vei.",
          },
          {
            prompt: "Hva kjennetegner soneringen foran en subduksjonssone (fra havet inn mot kontinentet)?",
            options: [
              "Dyphavsgrop → Akkresjonskile → Forbuebasseng → Vulkanbue (og eventuelt bakbuebasseng).",
              "Midthavsrygg → Normalforkastning → Graben → Skjoldvulkan.",
              "Kaldera → Sinderkjegle → Stratovulkan → Dyphavsslette.",
              "Aseismisk bruddsone → Transform → Kontinentalrift.",
            ],
            answer: 0,
            explain: "Riktig! Platen bøyes i gropen, sedimenter skrapes i kilen, buen mates av flukssmelting, slab rollback kan åpne bakbue.",
          },
        ]}
      />
      </section>
    </>
  );
}
