import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import {
  HotspotPlumeDiagram,
  WilsonCycleDiagram,
} from "@/components/diagrams";

export function Wilson() {
  return (
    <>
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Hotspots og Wilsonsyklusen: Superkontinentenes evige kretsløp
        </h2>
      <p>
        Ikke all vulkansk aktivitet kan forklares av plategrenser. Noen av planetens mest imponerende vulkaner –
        som Hawaii og Yellowstone – oppstår midt inne på litosfæreplater.
      </p>
      <p>
        I 1963 foreslo den kanadiske geofysikeren J. Tuzo Wilson at disse vulkanene skyldes stasjonære{" "}
        <strong>«hotspots»</strong> (varmeflekker) dypt i mantelen. Senere viste Jason Morgan at hotspots er
        overflateuttrykket for <strong>mantelplymer</strong>: smale søyler av overopphetet bergart som stiger helt fra{" "}
        <strong>D&apos;&apos;-laget (kjerne-mantel-grensen på 2900 km dyp)</strong>.
      </p>
      <p>
        Fordi mantelplymen er forankret så dypt, står den praktisk talt stille over geologisk tid. Mens litosfæreplaten
        glir sakte forbi over plymen, brenner den en perlerad av vulkanske øyer inn i havbunnen:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Hawaii-Emperor-ryggen:</strong> Den aktive vulkanen (Kilauea og Mauna Loa) ligger rett over
          hotspoten i dag (0 Ma). Jo lenger nordvestover langs øykjeden du reiser, desto eldre og mer eroderte er øyene:
          Maui (1 Ma), Oahu (3 Ma), Kauai (5 Ma) og Midway (28 Ma).
        </li>
        <li>
          <strong>Den berømte 47 Ma-bøyen:</strong> For ca. 47 millioner år siden gjør vulkankjeden en skarp 60-graders
          knekk fra nord-nordvest til vest-nordvest. Dette er et direkte geologisk bevis på at Stillehavsplaten brått
          endret bevegelsesretning!
        </li>
        <li>
          <strong>Island – en unik kombinasjon:</strong> Island er spesiell fordi en kraftig mantelplym ligger nøyaktig
          under Den midtatlantiske ryggen. Kombinasjonen av dekompresjonssmelting fra ryggspredningen og ekstraordinær
          termisk oppvarming fra plymen har produsert så enorme mengder basalt at skorpen her er over 35–40 km tykk,
          og rager høyt over havoverflaten.
        </li>
      </ul>

      <HotspotPlumeDiagram />

      <h3 className="pt-6 font-display text-xl font-medium tracking-tight">
        Wilsonsyklusen: Havbassengenes liv og død
      </h3>
      <p>
        I 1966 stilte Tuzo Wilson et fundamentalt spørsmål i en berømt Nature-artikkel:{" "}
        <em>«Did the Atlantic close and then re-open?»</em> (Wilson, 1966). Svaret var et rungende ja.
      </p>
      <p>
        Jordens overflate gjennomgår en syklisk prosess over 400 til 600 millioner år, kalt{" "}
        <strong>Wilsonsyklusen</strong>. Et superkontinent samler all kontinental skorpe på én flate. Fordi kontinental
        skorpe fungerer som et varmeisolerende teppe over mantelen, samles det opp overskuddsvarme under superkontinentet.
        Mantelen begynner å bule opp, kontinentet sprekker i en riftdal, og et nytt havbasseng åpner seg. Etter hvert
        avkjøles havbunnen, blir tung, begynner å subduere, og havet lukkes igjen inntil kontinentene kolliderer i et
        nytt superkontinent.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 pt-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="font-semibold text-emerald-500 text-sm">Atlanterhavet: Modent vekststadium</h4>
          <p className="mt-2 text-xs text-muted-foreground">
            Atlanterhavet utvider seg kontinuerlig med 2–2,5 cm i året fra Den midtatlantiske ryggen.
            Havbassenget er omkranset av <strong>passive kontinentalmarginer</strong> (uten subduksjon eller dype groper).
            Havet vokser fremdeles.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="font-semibold text-rose-400 text-sm">Stillehavet: Avtagende stadium</h4>
          <p className="mt-2 text-xs text-muted-foreground">
            Stillehavet er omkranset av subduksjonssoner («Ildringen»). Her slukes gammel, tung havbunn ned i
            mantelen raskere enn spredningsryggene klarer å produsere ny havbunnsskorpe. Stillehavsbassenget krymper.
          </p>
        </div>
      </div>

      <WilsonCycleDiagram />

      <PhotoFigure
        src="/images/geo-wilsonsyklus-3d.jpg"
        alt="Wilsonsyklusens 6 stadier fra kontinental oppsprekking til havlukking og fjellkjededannelse"
        heading="Wilsonsyklusens 6 stadier: Superkontinentenes kretsløp i 3D"
        caption="J. Tuzo Wilsons modell beskriver hvordan havbassenger fødes, utvides, lukkes og forsvinner i en syklus på 400–600 millioner år (Wilson, 1966). 1: Embryonisk stadium (kontinental riftdal, f.eks. Øst-Afrika). 2: Ungt stadium (smalt havbasseng med begynnende midthavsrygg, Rødehavet). 3: Modent stadium (vidt hav med passive marginer, Atlanterhavet). 4: Avtagende stadium (subduksjonssoner spiser opp havbunnen, Stillehavet). 5: Sluttstadium/terminalt (smalt, lukket hav med kollisjonsfronter, Middelhavet). 6: Suturstadium (kontinentkollisjon og høyfjellskjede, f.eks. Himalaya og oldtidens Kaledonider)."
        marks={[
          { x: 18, y: 22, n: "1", text: "1: Rifting", tone: "warm" },
          { x: 48, y: 22, n: "2", text: "2–3: Havspredning", tone: "cold" },
          { x: 80, y: 22, n: "3", text: "4: Subduksjon", tone: "cold" },
          { x: 50, y: 75, n: "4", text: "5–6: Kollisjon & Sutur", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Embryonisk & ungt stadium: Kontinental skorpe tynnes og sprekker opp (riftdal -> Rødehavet)." },
          { n: "2", label: "Modent stadium: Havbunnsspredning over titalls millioner år skaper brede verdenshav (Atlanterhavet)." },
          { n: "3", label: "Avtagende stadium: Kald og tung litosfære begynner å subduere langs havets render (Ildringen i Stillehavet)." },
          { n: "4", label: "Suturstadium: Havbunnen forsvinner fullstendig; kontinentene støter sammen i orogenese (fjellkjededannelse)." },
        ]}
      />

      <Quiz
        questions={[
          {
            prompt:
              "Hva er en ofiolitt (som på Leka), og hvorfor er den av så enorm vitenskapelig verdi?",
            options: [
              "En ofiolitt er et komplett fossil av et forhistorisk havdyr fra silurtiden.",
              "En ofiolitt er et komplett stykke havbunnsskorpe og øvre mantel som er skjøvet opp på land (obdusert), slik at hele lagdelingen ned til Moho kan studeres til fots.",
              "En ofiolitt er et meteorittkrater fylt med basaltisk lava.",
              "En ofiolitt er et magmakammer under en aktiv vulkan.",
            ],
            answer: 1,
            explain:
              "Riktig! Ofiolitter (som Leka i Trøndelag) oppstår når havbunnsskorpe under spesielle tektoniske kollisjoner unntaksvis skyves opp på land i stedet for å subduere. Det gir geologer et unikt vindu til havbunnens og mantelens dype lagdeling.",
          },
          {
            prompt:
              "Hva er den fundamentale forskjellen mellom et modent havstadium (Atlanterhavet) og et avtagende havstadium (Stillehavet) i Wilsonsyklusen?",
            options: [
              "Atlanterhavet har ferskvann, mens Stillehavet er salt.",
              "Atlanterhavet utvider seg og har passive kontinentalmarginer uten subduksjonssoner, mens Stillehavet krymper fordi subduksjonssoner langs randen (Ildringen) sluker havbunn raskere enn den produseres.",
              "Stillehavet har ingen midthavsrygger, mens Atlanterhavet har mange.",
              "Wilsonsyklusen gjelder kun for Middelhavet, ikke for store verdenshav.",
            ],
            answer: 1,
            explain:
              "Riktig! I Wilsonsyklusen er Atlanterhavet et voksende hav med passive kontinentalmarginer, mens Stillehavet er et krympende hav dominert av subduksjonssoner som trekker havbunnsskorpen ned i mantelen.",
          },
        ]}
      />
      </section>

    </>
  );
}
