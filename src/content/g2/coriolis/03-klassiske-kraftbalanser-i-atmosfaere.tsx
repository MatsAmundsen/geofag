import { GeostrophicAdjustmentDiagram, PressureSpinDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";
import { Link } from "@tanstack/react-router";

export function KlassiskeKraftbalanserIAtmosfaere() {
  return (
    <>
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Klassiske kraftbalanser i atmosfæren: Fra ro til geostrofisk vind
      </h2>
      <p>
        I kapittelet om{" "}
        <Link to="/tema/hoytrykk-lavtrykk" className="text-primary underline">
          høytrykk og lavtrykk
        </Link>{" "}
        lærte du at lufttrykkforskjeller skaper en <strong>trykkgradientkraft (F_pg)</strong> som peker
        vinkelrett fra høyt mot lavt trykk. Hvorfor blåser da ikke vinden bare rett fra høytrykk til
        lavtrykk på værkartet?
      </p>
      <p>
        Svaret skyldes samspillet mellom tre krefter: trykkgradientkraften, Corioliskraften og
        friksjon. La oss følge en luftpakke fra den starter fra ro i fri atmosfære:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Trinn 1 (Start fra ro):</strong> En luftpakke ligger stille i et område med høyere
          trykk i sør enn i nord. Trykkgradientkraften (F_pg) trekker luften rett mot nord. Siden farten
          er null (v = 0), er Corioliskraften nøyaktig null (F_c = 0).
        </li>
        <li>
          <strong>Trinn 2 (Akselerasjon og avbøyning):</strong> F_pg akselererer luftpakken mot nord.
          Idet luften får fart, våkner Corioliskraften til liv! Den virker alltid 90° til høyre for
          fartsretningen (mot øst). Luftens bane krummer mot høyre.
        </li>
        <li>
          <strong>Trinn 3 (Vekst i Coriolis):</strong> Jo lenger luftpakken akselererer, desto større
          blir farten. Fordi Corioliskraften er proporsjonal med fart (F_c = f·v), blir avbøyningskraften
          stadig sterkere og svinger banen enda mer mot øst.
        </li>
        <li>
          <strong>Trinn 4 (Geostrofisk likevekt):</strong> Til slutt har luftpakken svingt hele 90°! Nå
          blåser vinden rett fra vest mot øst. Corioliskraften peker rett sørover mot høytrykket, og
          balanserer trykkgradientkraften som peker rett nordover:{" "}
          <strong>F_pg + F_c = 0</strong>.
        </li>
      </ol>
      <p>
        Når disse to kreftene er i perfekt balanse, kalles vinden <strong>geostrofisk vind</strong>.
        Den blåser nøyaktig <strong>parallelt med isobarene</strong>!
      </p>

      <OrdBoks
        ord="Geostrofisk vind"
        barn="Teoretisk horisontal vind i fri atmosfære der trykkgradientkraften og Corioliskraften er i perfekt likevekt. Vinden blåser nøyaktig parallelt med isobarene med lavtrykket til venstre på nordlig halvkule."
      />

      <GeostrophicAdjustmentDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Buys Ballots lov: Den gylne regelen for sjøfolk og geofag-elever
      </h3>
      <p>
        I 1857 formulerte den nederlandske meteorologen Christoph Buys Ballot en berømt empirisk regel
        som er et direkte resultat av geostrofisk balanse:
      </p>
      <div className="my-3 rounded-xl border border-border/80 bg-surface/50 p-4 text-center">
        <p className="font-display text-base font-semibold text-primary sm:text-lg">
          «Står du med vinden i ryggen på nordlig halvkule, har du lavtrykket til venstre for deg!»
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          På sørlig halvkule er regelen speilvendt: Står du med vinden i ryggen, har du lavtrykket til høyre.
        </p>
      </div>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Hva gjør bakkefriksjonen? Hvorfor blåser vinden på skrå nær bakken?
      </h3>
      <p>
        Geostrofisk vind gjelder i den frie atmosfæren – fra om lag 1000 meters høyde og oppover, der det
        ikke finnes trær, fjell eller havbølger som bremser farten. Men hva skjer nede ved bakken der vi
        bor?
      </p>
      <p>
        Nær bakken bremser <strong>friksjonskraften (F_f)</strong> vindhastigheten. Men legg merke til
        hva som skjer med balansen:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          Fordi vindhastigheten reduseres av friksjon, blir også <strong>Corioliskraften svakere</strong>{" "}
          (F_c er direkte proporsjonal med fart).
        </li>
        <li>
          <strong>Trykkgradientkraften (F_pg) påvirkes derimot ikke av friksjon</strong> — den styres bare
          av avstanden mellom isobarene på kartet!
        </li>
        <li>
          Dermed «vinner» trykkgradientkraften drakampen: Vinden klarer ikke å svinge hele veien til
          parallell kurs, men trekkes <strong>på skrå over isobarene inn mot det laveste trykket</strong>!
        </li>
      </ul>
      <p>
        Over åpent hav er vinkelen typisk 10°–15°, mens over kupert terreng og skog på land er friksjonen
        større, og vinkelen øker til 25°–35°.
      </p>

      <PressureSpinDiagram />

      <p>
        Dette forklarer de to fundamentale værmønstrene på nordlig halvkule:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Rundt et lavtrykk (L):</strong> Vinden blåser i en spiral{" "}
          <strong>mot klokken (syklonalt)</strong> og <em>inn mot sentrum</em> (bakkekonvergens).
          Fordi bakken sperrer under, må luften presses <strong>oppover</strong>. Luften avkjøles
          adiabatisk, vanndamp kondenserer, og det dannes skyer og nedbør.
        </li>
        <li>
          <strong>Rundt et høytrykk (H):</strong> Vinden blåser i en spiral{" "}
          <strong>med klokken (antisyklonalt)</strong> og <em>utover fra sentrum</em> (bakkedivergens).
          For å erstatte luften som rømmer, suges luft ned fra høyden (subsidens). Luften varmes
          adiabatisk, skydråpene fordamper, og himmelen blir krystallklar!
        </li>
      </ul>
    </>
  );
}
