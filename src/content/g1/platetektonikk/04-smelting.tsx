import { Quiz } from "@/components/quiz";
import {
  DecompressionMeltingDiagram,
  SolidusDiagram,
} from "@/components/diagrams";

export function Smelting() {
  return (
    <>
      {/* 4. SMELTEFYSIKK OG MAGMADANNELSE */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Hvorfor mantelberg smelter: Dekompresjon, flukssmelting og mantelplymer
        </h2>
      <p>
        En av de mest fundamentale leksjonene i Geofag 1 er å forstå <strong>hvorfor og hvordan magma dannes</strong>.
        Nesten all magma på jorden oppstår i den faste øvre mantelen ved delvis oppsmelting (partiell smelting) av
        bergarten <strong>peridotitt</strong>.
      </p>
      <p>
        Bergarter smelter ikke ved en enkelt temperatur, men over et temperaturintervall:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>Solidus:</strong> Temperaturen der en bergart begynner å smelte (første dråpe smelte dannes).
        </li>
        <li>
          <strong>Liquidus:</strong> Temperaturen der bergarten er 100 % flytende smelte.
        </li>
      </ul>
      <p>
        Under normale forhold under et stabilt kontinent er mantelen <em>under</em> solidus: Den er glødende varm
        (1300–1400 °C), men det enorme litostatiske overtrykket presser atomene så tett sammen at smelte ikke kan
        oppstå. For å få mantelen til å krysse solidus finnes det bare <strong>tre fysiske mekanismer</strong>:
      </p>

      <div className="my-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="font-display text-sm font-bold text-amber-500">1. Dekompresjonssmelting</p>
          <p className="mt-1 text-xs font-semibold text-foreground">Trykkfall uten varmetilførsel</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Når litosfæren tynnes ved en midthavsrygg eller kontinental rift, stiger astenosfæren opp. Fordi stein
            leder varme ekstremt dårlig, skjer oppstigningen adiabatisk (uendret temperatur). Trykket faller bratt,
            solidustemperaturen synker under mantelens temperatur, og 10–20 % av peridotitten smelter til basalt.
          </p>
        </div>

        <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4">
          <p className="font-display text-sm font-bold text-sky-500">2. Flukssmelting</p>
          <p className="mt-1 text-xs font-semibold text-foreground">Vann senker smeltepunktet</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            I en subduksjonssone presses hydratisert havbunn ned i dypet. Mineraler som serpentin og amfibol brytes
            ned og skiller ut overkritisk vann (H₂O). Vannet stiger inn i den overliggende mantelkilen, bryter
            silikatbindingene og senker solidustemperaturen med flere hundre grader. Mantelen smelter uten at
            temperaturen øker!
          </p>
        </div>

        <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
          <p className="font-display text-sm font-bold text-rose-500">3. Mantelplym (Hotspot)</p>
          <p className="mt-1 text-xs font-semibold text-foreground">Ekstraordinær varmetilførsel</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            En smal søyle av overopphetet bergart stiger fra kjerne-mantel-grensen (2900 km dyp). Her er temperaturen
            flere hundre grader høyere enn normal omgivende mantel, noe som løfter bergartens temperatur direkte
            over soliduskurven uavhengig av plategrenser (f.eks. Hawaii og Yellowstone).
          </p>
        </div>
      </div>

      <SolidusDiagram />
      <DecompressionMeltingDiagram />

      <Quiz
        questions={[
          {
            prompt: "Hvorfor oppstår det dekompresjonssmelting under en midthavsrygg?",
            options: [
              "Fordi havvannet renner ned i sprekken og koker mantelen.",
              "Fordi skorpetynning reduserer overtrykket; mantelen stiger adiabatisk og krysser solidus.",
              "Fordi friksjonen mellom platene genererer voldsom varme som smelter bergartene fullstendig.",
              "Fordi astenosfæren i utgangspunktet er et flytende magmaha som slipper fri.",
            ],
            answer: 1,
            explain:
              "Riktig! Når overliggende litosfære trekkes fra hverandre, synker det litostatiske trykket. Fordi mantelens oppstigning skjer uten vesentlig varmetap (adiabatisk), faller solidus raskere enn mantelens temperatur, og det oppstår delvis smelte.",
          },
          {
            prompt: "Hvilken smeltemekanisme er ansvarlig for vulkanene i Andesfjellene og Japan?",
            options: [
              "Dekompresjonssmelting på grunn av skorpefortykkelse.",
              "Friksjonsvarme langs forkastningsflaten.",
              "Flukssmelting: Vann avgitt fra den synkende havbunnen senker smeltepunktet i mantelkilen over.",
              "Radioaktiv oppvarming fra konsentrert uran i dyphavsgropen.",
            ],
            answer: 2,
            explain:
              "Riktig! Subduksjonsvulkaner drives av flukssmelting: Den synkende havbunnsplaten avgir vann og flyktige stoffer ved 80–150 km dyp, noe som senker peridotittens smeltepunkt i mantelkilen over.",
          },
        ]}
      />
      </section>

    </>
  );
}
