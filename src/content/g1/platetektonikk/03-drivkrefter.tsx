import {
  ConvectionDiagram,
  PlatesMapDiagram,
} from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function Drivkrefter() {
  return (
    <section className="pt-6 space-y-4">
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva driver platene? Slab pull, ridge push og gravitasjonell fysikk
      </h2>
      <p>
        I mange eldre lærebøker forklares platebevegelsene som om mantelen fungerer som et transportbånd som drar
        platene med seg via friksjon (basal drag). Moderne geodynamiske beregninger og <em>seismisk tomografi</em>{" "}
        (3D-avbildning av mantelen ved hjelp av seismiske bølger) har snudd dette bildet på hodet
        (Forsyth & Uyeda, 1975): <strong>Platene driver i stor grad seg selv!</strong>
      </p>
      <p>Platebevegelsene styres av et samspill mellom fire gravitasjonelle og termiske mekanismer:</p>
      <ol className="list-decimal space-y-3 pl-6 text-foreground/90">
        <li>
          <strong>Slab pull (platetrekk) – Drivkraft nr. 1 (~90 % av kraften):</strong> Når oseanisk litosfære
          beveger seg bort fra midthavsryggen, avkjøles den gjennom millioner av år. Den underliggende astenosfæren
          fryser fast til bunnen av platen, slik at litosfæren vokser i tykkelse og tetthet. Til slutt blir platen{" "}
          <strong>tettere enn den underliggende astenosfæren</strong>. Når platen tvinges ned i en subduksjonssone,
          øker trykket dramatisk. Ved 40–60 km dyp gjennomgår basalten og gabbroen i skorpen en metamorf
          faseovergang og omdannes til <strong>eklogitt</strong> (en ultrahøytett bergart bestående av granat og
          omfasitt, tetthet ~3,5 g/cm³). Denne blytunge platen synker vertikalt ned i mantelen under sin egen vekt
          og fungerer som et gigantisk anker som trekker hele resten av platen bak seg (Forsyth & Uyeda, 1975).
        </li>
        <li>
          <strong>Ridge push (ryggstøt / gravitasjonsglidning):</strong> Midthavsryggen er varm og termisk utvidet,
          og rager derfor <strong>2000 til 3000 meter høyere</strong> enn den omkringliggende dyphavssletten.
          Litosfæren danner en kontinuerlig skråning bort fra ryggaksen. Gravitasjonskraften virker loddrett nedover,
          noe som skaper en horisontal kraftkomponent som skyver den nydannede litosfæren vekk fra ryggen.
        </li>
        <li>
          <strong>Basal drag (manteldrag):</strong> Den seige astenosfæren under platen er i termisk konveksjon.
          Friksjonen mellom astenosfæren og undersiden av litosfæreplaten kan enten hjelpe på bevegelsen eller
          bremse den, avhengig av om mantelen strømmer raskere eller saktere enn platen.
        </li>
        <li>
          <strong>Trench suction (gropsug):</strong> Når en tung slab synker bratt ned i mantelen, trekker den med
          seg omkringliggende astenosfære, noe som skaper et lokalt undertrykk som suger den overliggende platen mot
          dyphavsgropen.
        </li>
      </ol>
      <OrdBoks
        ord="Slab pull"
        barn="Den suverent viktigste drivkraften i platetektonikken. Kald, gammel havbunnsskorpe omdannes til ultrahøytett eklogitt i subduksjonssonen og synker som et lodd, og trekker resten av platen etter seg."
      />
      <OrdBoks
        ord="Ridge push"
        barn="Gravitasjonsglidning: Midthavsryggen rager 2–3 km over dyphavsbunnen på grunn av termisk oppdrift. Tyngdekraften får den faste litosfæren til å skli langsomt ned skråningen bort fra aksen."
      />
      <ConvectionDiagram />
      <p>
        I dag kan vi måle disse bevegelsene direkte ved hjelp av globale satellittnettverk (GPS og VLBI). Målingene
        viser at platene beveger seg kontinuerlig med en fart på mellom <strong>1 og 16 centimeter per år</strong>{" "}
        (NOAA, u.å.) – omtrent like fort som menneskets negler vokser. Plater som har store subduksjonssoner festet
        til seg (som Stillehavsplaten og Nazcaplaten) beveger seg desidert raskest (7–15 cm/år), noe som bekrefter
        at <em>slab pull</em> er den dominerende drivkraften!
      </p>
      <PlatesMapDiagram />
    </section>
  );
}
