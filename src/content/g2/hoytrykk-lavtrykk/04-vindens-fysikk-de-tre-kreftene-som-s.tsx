import { WindForcesBalanceDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function VindensFysikkDeTreKrefteneSomS() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Vindens fysikk: De tre kreftene som styrer retningen
      </h2>
      <p>
        Vind er i bunn og grunn luft i bevegelse for å utjevne trykkforskjeller i atmosfæren. Men
        hvorfor blåser ikke vinden bare i rett linje fra det høyeste trykket til det laveste trykket
        på et værkart?
      </p>
      <p>
        Svaret ligger i samspillet mellom <strong>tre fundamentale krefter</strong>:
      </p>
      <ol className="list-decimal space-y-3 pl-6 text-foreground/90">
        <li>
          <strong>Trykkgradientkraften (F_pg):</strong> Dette er motoren som setter luften i
          bevegelse. Den peker alltid vinkelrett på isobarene fra høyt mot lavt trykk. Jo brattere
          gradienten er (tettere isobarer), desto kraftigere akselererer luften.
        </li>
        <li>
          <strong>Corioliskraften (F_c):</strong> Idet luften begynner å bevege seg, virker jordens
          rotasjon inn på den. Sett fra vår roterende jordklode avbøyes all horisontal bevegelse mot{" "}
          <strong>høyre på nordlig halvkule</strong>
          (og mot venstre på sørlig halvkule). Corioliskraften virker alltid 90° til høyre for
          vindretningen, og styrken øker med økende vindhastighet og økende breddegrad.
        </li>
        <li>
          <strong>Friksjonskraften (F_f):</strong> Nær bakken gnisser luften mot trær, bygninger,
          fjell og havbølger. Friksjonen virker i det atmosfæriske grenselaget (opp til ca. 1000
          moh.) og peker alltid motsatt vei av bevegelsesretningen for å bremse farten.
        </li>
      </ol>

      <p>
        I den frie atmosfæren – over 1000 meters høyde der friksjonen er tilnærmet lik null –
        oppstår det en ren balanse mellom trykkgradientkraften og Corioliskraften (F_pg = F_c). Når
        luften avbøyes 90° til høyre, ender vinden med å blåse{" "}
        <strong>nøyaktig parallelt med isobarene</strong>! Dette kalles{" "}
        <strong>geostrofisk vind</strong>.
      </p>

      <OrdBoks
        ord="Geostrofisk vind"
        barn="Teoretisk vind i fri atmosfære der trykkgradientkraften og Corioliskraften er i perfekt likevekt. Vinden blåser parallelt med isobarene."
      />

      <p>
        Hva skjer når vi beveger oss ned mot bakken? Her bremser friksjonen vindhastigheten. Fordi
        vindhastigheten reduseres, blir også <strong>Corioliskraften svakere</strong> (Coriolis er
        avhengig av fart). Trykkgradientkraften påvirkes derimot ikke av friksjon, og dermed
        «vinner» trykkgradientkraften drakampen: Vinden trekkes innover på skrå over isobarene
        (typisk 20–30° vinkel over land, 10–15° over hav).
      </p>
      <p>Dette gir de velkjente sirkulasjonsmønstrene på nordlig halvkule:</p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>Rundt et lavtrykk (L):</strong> Vinden blåser i en spiral{" "}
          <strong>mot klokken</strong> (syklonalt) og inn mot sentrum. Denne innstrømmingen tvinger
          luften oppover og skaper skyer og regn.
        </li>
        <li>
          <strong>Rundt et høytrykk (H):</strong> Vinden blåser i en spiral{" "}
          <strong>med klokken</strong> (antisyklonalt) og ut fra sentrum. Denne utstrømmingen
          trekker luft nedover fra høyden og opprettholder klarværet.
        </li>
      </ul>

      <WindForcesBalanceDiagram />
    </section>
  );
}
