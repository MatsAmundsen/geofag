import { CarouselFrameDiagram } from "@/components/diagrams";
import { PhotoFigure } from "@/components/photo-figure";
import { OrdBoks } from "@/components/term";

export function HvaErEgentligCorioliseffektenFys() {
  return (
    <>
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er egentlig Corioliseffekten? Fysikken bak jordens avbøyningskraft
      </h2>
      <p>
        Hver eneste dag roterer jorden en hel runde rundt sin egen akse fra vest mot øst. Vi som bor
        på planeten, merker ingenting til denne vanvittige farten; for oss virker bakken bunnsolid og
        urokkelig. Men fysikkens lover bryr seg ikke om våre sanser: Fordi jorden roterer, befinner vi
        oss i et <strong>akselerert, ikke-inertielt referansesystem</strong> (Store norske leksikon,
        u.å.).
      </p>
      <p>
        I klassisk fysikk sier Newtons første lov at et legeme som settes i bevegelse, vil fortsette
        i en <strong>snorrett linje med konstant hastighet</strong> med mindre det påvirkes av en ytre
        kraft. Når en luftpakke eller en havstrøm settes i bevegelse, fortsetter den derfor rett fram
        i forhold til stjernene og verdensrommet. Men mens luftpakken svever over overflaten,{" "}
        <strong>roterer jorden under den</strong> (NOAA, u.å.-a).
      </p>
      <p>
        Når vi tegner luftens bane på et kart eller ser den fra bakken, ser det derfor ut som om
        luften gradvis krummer av og svinger til siden:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          På <strong>nordlig halvkule</strong> avbøyes all horisontal bevegelse mot{" "}
          <strong>høyre</strong> i forhold til bevegelsesretningen.
        </li>
        <li>
          På <strong>sørlig halvkule</strong> avbøyes all horisontal bevegelse mot{" "}
          <strong>venstre</strong> i forhold til bevegelsesretningen.
        </li>
        <li>
          Ved <strong>ekvator (0°)</strong> er den horisontale avbøyningen nøyaktig <strong>null</strong>.
        </li>
      </ul>
      <p>
        Fordi denne avbøyningen utelukkende skyldes vårt eget roterende ståsted, kaller fysikere og
        meteorologer Corioliskraften for en <strong>treghetskraft</strong> eller en{" "}
        <strong>fiktiv kraft</strong> (pseudo-kraft). Det finnes ingen fysisk gjenstand som dytter på
        luften; effekten oppstår utelukkende fordi koordinatsystemet vårt spinner (Met Office, u.å.).
      </p>

      <OrdBoks
        ord="Corioliskraften"
        barn="En fiktiv avbøyningskraft (treghetskraft) som virker på alle legemer i bevegelse sett fra et roterende referansesystem. Avbøyer mot høyre på nordlig halvkule, mot venstre på sørlig, og er null ved ekvator."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Karusell-analogien: Se det for deg i praksis
      </h3>
      <p>
        Den enkleste måten å forstå Corioliseffekten intuitivt på, er å forestille seg en stor
        lekeplasskarusell som roterer <strong>mot klokken</strong> (nøyaktig slik jordens nordlige
        halvkule roterer sett ovenfra fra Nordstjernen):
      </p>

      <PhotoFigure
        src="/images/fig-karusell.jpg"
        alt="En roterende karusell på en lekeplass som demonstrerer treghetskrefter og roterende referanserammer"
        heading="Karusell-eksperimentet: Forskjellen på rommet og den roterende observatøren"
        caption="Står du på en roterende karusell og kaster en ball mot en venn på motsatt side, ser du ballen krumme til høyre og bomme på målet. Sett fra luften ovenfor går ballen i en snorrett linje; det er vennen din som har rotert vekk mens ballen var i luften!"
        marks={[
          { x: 50, y: 50, n: "A", text: "Sentrum (Kaster)", tone: "warm" },
          { x: 80, y: 30, n: "B", text: "Mål på kanten", tone: "cold" },
        ]}
        points={[
          { n: "A", label: "Kaster i sentrum: Kaster ballen i en rett linje i rommet." },
          { n: "B", label: "Mottaker på kanten: Roterer mot venstre mens ballen er underveis." },
        ]}
      />

      <p>
        Tenk deg at du sitter i sentrum av karusellen og kaster en ball rett mot en venn som sitter på
        ytterkanten:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Sett ovenfra fra et tre (treghetssystemet):</strong> Ballen forlater hånden din og
          flyr i en fullstendig <em>snorrett linje</em> mot det punktet der vennen din opprinnelig
          satt. Men mens ballen bruker ett sekund på flyturen, har karusellen rotert videre. Vennen
          din har flyttet seg mot venstre, og ballen lander uskyldig bak ryggen hennes.
        </li>
        <li>
          <strong>Sett fra ditt ståsted på karusellen (det roterende referansesystemet):</strong> Du
          merker ikke at karusellen snurrer, for du følger med rundt. For deg ser det ut som om ballen
          på mystisk vis krummer til høyre underveis og svinger vekk fra målet!
        </li>
      </ol>

      <CarouselFrameDiagram />
    </>
  );
}
