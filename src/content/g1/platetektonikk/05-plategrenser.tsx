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
    <section className="space-y-4">
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
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
        Under divergens utsettes litosfæren for tektonisk strekk (tensjon). Dette manifesterer seg i to distinkte
        stadier:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Havbunnsspredning:</strong> Grensen ligger midt i havet (Den midtatlantiske ryggen, Gakkelryggen
          i Polhavet, Øst-Stillehavsryggen). Magma fra dekompresjonssmelting fyller sprekken kontinuerlig og danner
          putelava og basaltganger. Varmt sjøvann sirkulerer ned i sprekkesystemene, varmes opp til over 350 °C,
          løser opp metaller fra basalten og spruter ut som svarte undersjøiske geysirer kalt{" "}
          <strong>hydrotermale skorsteiner («black smokers»)</strong>. Rundt disse skorsteinene lever unike økosystemer
          uavhengig av sollys, basert på kjemotrofiske bakterier som utnytter hydrogensulfid.
        </li>
        <li>
          <strong>Kontinental rifting:</strong> Grensen oppstår midt inne på et kontinent. Skorpen strekkes og tynnes,
          og store blokker raser ned langs normalforkastninger og danner en langstrakt innsynkningsdal kalt en{" "}
          <strong>graben</strong> (som Den østafrikanske riftdalen med Tanganyikasjøen og Victoriasjøen). Hvis
          riftingen fortsetter over millioner av år, vil riftdalen utvide seg til et smalt havbasseng (som Rødehavet),
          før det oppstår en fullverdig midthavsrygg. Dette var nøyaktig hvordan Atlanterhavet ble født da superkontinentet
          Pangea revnet for ca. 180 millioner år siden!
        </li>
      </ul>

      <ContinentalRiftDiagram />

      <PhotoFigure
        src="/images/geo-midthavsrygg-hydrotermal.jpg"
        alt="3D-snitt av midthavsrygg med dekompresjonssmelting, aksialt magmakammer, putelava og hydrotermale skorsteiner"
        heading="Midthavsryggens anatomi: Dekompresjonssmelting og hydrotermale skorsteiner"
        caption="Når to litosfæreplater trekkes fra hverandre i spredningsaksen, stiger astenosfærisk peridotitt opp uten å tape nevneverdig varme (adiabatisk). Trykkfallet utløser dekompresjonssmelting (10–20 % delvis smelte) som produserer basaltisk magma. På havbunnen størkner lavaen som putelava (pillow basalt), mens nedsivende sjøvann varmes opp til over 350 °C av underliggende gabbro-kamre og spyles ut som metallrike hydrotermale skorsteiner («black smokers»)."
        marks={[
          { x: 50, y: 15, n: "1", text: "Black smoker", tone: "warm" },
          { x: 32, y: 48, n: "2", text: "Putelava", tone: "cold" },
          { x: 50, y: 62, n: "3", text: "Magmakammer", tone: "warm" },
          { x: 50, y: 88, n: "4", text: "Dekompresjon", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Hydrotermale skorsteiner («black smokers») spyr ut overopphetet, mineralrikt fluid som utfeller kobber-, jern- og sinksulfider." },
          { n: "2", label: "Basaltisk putelava dannes når flytende basalt bråkjøles mot bunnvannet (2 °C) og danner glassaktige, avrundede puter." },
          { n: "3", label: "Aksialt gabbroid magmakammer på 2–4 km dyp der krystallisasjon og differensiasjon forer gangene ovenfor." },
          { n: "4", label: "Adiabatisk oppstigende astenosfære der det litostatiske trykket faller under solidus og skaper primær basaltmagma." },
        ]}
      />

      <h3 className="pt-6 font-display text-xl font-medium tracking-tight text-sky-500">
        2. Konvergerende grenser (Platene kolliderer)
      </h3>
      <p>
        Ved konvergens presses to litosfæreplater mot hverandre under enorm kompresjon. Her oppstår tre helt ulike
        miljøer:
      </p>
      <ul className="list-disc space-y-3 pl-6 text-foreground/90">
        <li>
          <strong>Hav mot kontinent (Subduksjon som i Andesfjellene):</strong> Den tunge, oseaniske platen
          (f.eks. Nazcaplaten) bøyes ned under den lettere kontinentalplaten (Sør-Amerika). Foran kollisjonen dannes
          en dyp havrenne (Peru-Chile-gropen, over 8000 meter dyp) og en akkresjonskile av avskrapede havsedimenter.
          Flukssmelting i mantelkilen skaper seig, gassrik magma (andesitt og dasitt) som stiger og bygger opp
          majestetiske, men eksplosive stratovulkaner langs en kontinental vulkanbue (Andesfjellene, Kaskadefjellene).
        </li>
        <li>
          <strong>Hav mot hav (Vulkanøybuer som Marianene og Japan):</strong> Når to oseaniske plater møtes, er det
          alltid den <em>eldste, kaldeste og dermed tetteste</em> havbunnsplaten som tvinges under den andre. Dette
          skaper jordens aller dypeste groper – som <strong>Marianegropen</strong> med Challengerdypet på{" "}
          <strong>11 034 meter</strong>. Magmaen fra mantelkilen bygger opp en buet kjede av vulkanske øyer ute i
          havet: en <strong>vulkanøybue</strong> (f.eks. De japanske øyer, Marianene, Aleutene).
        </li>
        <li>
          <strong>Kontinent mot kontinent (Kollisjon som i Himalaya og Kaledonidene):</strong> Når to kontinenter
          støter sammen, kan ingen av dem synke ned i mantelen fordi granittisk kontinentalskorpe er for lett.
          I stedet oppstår voldsom skorpeforkorting. Jordskorpen foldes, presses sammen og stables opp i mektige{" "}
          <strong>skyvedekker (nappes)</strong> – store bergflak som skyves hundrevis av kilometer innover land.
          Under fjellkjeden dannes en opptil 70–80 km dyp skorperot som flyter isostatisk i mantelen. Det oppstår
          nesten ingen vulkanisme, men intens regional metamorfose omdanner bergartene til gneis og glimmerskifer.
        </li>
      </ul>

      <SubductionDiagram />
      <OceanOceanSubductionDiagram />
      <CollisionDiagram />

      <PhotoFigure
        src="/images/geo-subduksjon-3d.jpg"
        alt="3D-snitt av subduksjonssone med dyphavsgrop, akkresjonskile, dehydrering, flukssmelting og vulkanbue"
        heading="Anatomi av en subduksjonssone: Dehydrering, flukssmelting og akkresjonskile"
        caption="Når en oseanisk litosfæreplate presses ned i mantelen, varmes den opp og presses sammen. Mineraler som har tatt opp sjøvann på havbunnen (særlig serpentinitt og leirmineraler) dehydreres ved 80–150 km dyp og slipper overopphetet vann inn i overliggende mantelkile. Dette senker peridotittens smeltepunkt dramatisk (flukssmelting). Den oppstigende magmaen mater en eksplosiv vulkanbue, mens avskrapede sedimenter danner en mektig akkresjonskile foran dyphavsgropen."
        marks={[
          { x: 18, y: 55, n: "1", text: "Dyphavsgrop", tone: "cold" },
          { x: 26, y: 48, n: "2", text: "Akkresjonskile", tone: "warm" },
          { x: 42, y: 78, n: "3", text: "Dehydrering", tone: "cold" },
          { x: 54, y: 64, n: "4", text: "Flukssmelting", tone: "warm" },
          { x: 68, y: 32, n: "5", text: "Vulkanbue", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Dyphavsgrop (trench) der den bøyelige litosfæreplaten dykker ned i mantelen (opptil 11 km dyp)." },
          { n: "2", label: "Akkresjonskile: Havbunnssedimenter skrapes av som foran et snøskjær og stables i imbrikerte skyveforkastninger." },
          { n: "3", label: "Dehydrering: Trykket omdanner serpentinitt og leire til vannfrie mineraler og slipper fri superkritiske vannrike fluider." },
          { n: "4", label: "Flukssmelting: Vannet senker peridotittens smeltepunkt (solidus) med flere hundre grader i mantelkilen." },
          { n: "5", label: "Vulkanbue: Viskøs, andesittisk og gassrik magma stiger opp og bygger opp eksplosive stratovulkaner." },
        ]}
      />

      <h4 className="pt-4 font-display text-lg font-medium tracking-tight">
        Subduksjonens sonering: Akkresjonskile, forbue- og bakbuebasseng
      </h4>
      <p>
        Et fullstendig tverrsnitt av en konvergerende plategrense består av fem distinkte morfologiske og geologiske
        elementer ordnet fra havet og innover:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>1. Dyphavsgropen (trench):</strong> Det dypeste punktet der litosfæren bøyes ned i subduksjonen.
        </li>
        <li>
          <strong>2. Akkresjonskilen (accretionary wedge):</strong> Mens den faste basaltiske havbunnsskorpen
          subdueres, blir de løse overliggende marine sedimentene (leire, sand, kiselalger) skrapt av av den overkjørende
          platen. Sedimentene presses sammen og stables opp i lagdelte, imbrikerte forkastningsflak som kan bygge opp
          flere kilometer høye rygger foran kysten.
        </li>
        <li>
          <strong>3. Forbuebassenget (forearc basin):</strong> Det relativt flate og rolige sedimentasjonsbassenget
          som ligger mellom akkresjonskilen og den vulkanske buen.
        </li>
        <li>
          <strong>4. Vulkansk bue (magmatic arc):</strong> Rekken av aktive vulkaner (enten på kontinentet eller som
          en øybue) som mates av flukssmelting i 100–120 km dyp direkte under buen.
        </li>
        <li>
          <strong>5. Bakbuebassenget (backarc basin):</strong> Dersom den synkende litosfæreplaten er gammel og tung,
          vil den synke brattere enn platen beveger seg fremover. Dette fenomenet kalles <em>«slab rollback»</em>
          (platen ruller bakover). Det suger den overliggende platen etter seg og skaper tektonisk strekk (tensjon) bak
          vulkanbuen! Strekket kan sprekke opp jordskorpen og åpne et lite, lokalt havbasseng med egen miniatyr-midthavsrygg –
          slik <strong>Japanhavet</strong> ble åpnet bak Den japanske vulkanbuen for ca. 15–20 millioner år siden.
        </li>
      </ul>

      <h3 className="pt-6 font-display text-xl font-medium tracking-tight text-emerald-500">
        3. Transformgrenser (Platene glir sidelengs)
      </h3>
      <p>
        Langs en transformgrense glir to litosfæreplater horisontalt forbi hverandre. Dette kalles en{" "}
        <strong>konservativ grense</strong> fordi litosfære verken nydannes eller ødelegges.
      </p>
      <p>
        Fordi det verken skjer mantelløft (dekompresjon) eller tilførsel av vann (fluks), er transformgrenser
        praktisk talt <strong>helt uten vulkanisme</strong>. Til gjengjeld er de arnested for noen av klodens
        mest ødeleggende jordskjelv:
      </p>
      <p>
        Bergartene på hver side presses hardt mot hverandre av tektoniske spenninger. Friksjonen låser forkastningen i
        en «mekanisk lås». Mens platene fortsetter å bevege seg med 3–5 cm i året noen kilometer unna, deformeres
        bergartene elastisk over årtier og århundrer – som en stålfjær som spennes strammere og strammere. Til slutt
        overstiger den opphopede spenningen bergartens bruddstyrke: Forkastningen brister plutselig på sekunder, og
        bergartene forskyves flere meter i et massivt jordskjelv.
      </p>
      <p>
        Typeeksempelet på land er <strong>San Andreas-forkastningen</strong> i California, der Stillehavsplaten glir
        nordvestover i forhold til Den nordamerikanske platen. På havbunnen kutter utallige transformforkastninger
        midthavsryggene i et karakteristisk sikksakkmønster. I Norskehavet finner vi den seismisk aktive{" "}
        <strong>Jan Mayen-bruddsonen</strong>.
      </p>

      <TransformDiagram />

      <h4 className="pt-4 font-display text-lg font-medium tracking-tight">
        Geometrisk finesse: Transformforkastning vs. inaktiv bruddsone (fracture zone)
      </h4>
      <p>
        I 1965 løste J. Tuzo Wilson et stort geologisk paradoks: Hvorfor er midthavsryggene kuttet opp i hundrevis av
        forskyvede segmenter, og hvorfor stopper jordskjelvene brått opp utenfor ryggaksen?
      </p>
      <p>
        En midthavsrygg er aldri en rett, uavbrutt linje. Den er delt opp i forskjøvede segmenter bundet sammen av
        horisontale forkastningssoner. Men her gjelder en fundamental regel som skiller platetektonikk fra vanlige
        forkastninger på land:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Aktiv transformforkastning (mellom ryggsegmentene):</strong> Bare i strekningen <em>mellom</em> de to
          spredningsryggene beveger platene seg i motsatt retning. Her oppstår intens friksjon, forkastningslås og hyppige,
          grunne jordskjelv. Legg også merke til at hvis det høyre ryggsegmentet ligger lenger nord enn det venstre,
          er platebevegelsen langs forkastningen <em>venstregående (sinistral)</em> – stikk i strid med hva man ville trodd
          hvis forkastningen hadde kuttet og forskjøvet en opprinnelig sammenhengende rygg!
        </li>
        <li>
          <strong>Inaktiv bruddsone (fracture zone, utenfor ryggaksen):</strong> Utenfor spredningsaksene strekker
          forkastningssprekken seg tusenvis av kilometer videre over havbunnen som et dypt arr i batymetrien. Men her
          beveger havbunnen på <em>begge sider</em> av sprekken seg i <strong>nøyaktig samme retning med nøyaktig samme hastighet</strong>!
          Det er null relativ platebevegelse, ingen friksjon og følgelig <strong>ingen jordskjelv</strong>. Bruddsonene
          er aseismiske «arr» som bevarer historien om tidligere tiders transformbevegelser.
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
  );
}
