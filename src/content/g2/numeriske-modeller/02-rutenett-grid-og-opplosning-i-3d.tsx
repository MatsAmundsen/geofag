import { ModelGrid3DDiagram } from "@/components/diagrams";

export function RutenettGridOgOpplosningI3d() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Rutenett (Grid) og oppløsning i 3D
      </h2>
      <p>
        For å regne på en kontinuerlig atmosfære, må rommet diskretiseres. Superdatamaskinen spenner et
        tredimensjonalt rutenett over jorden. <strong>Oppløsningen</strong> er definert som den
        horisontale avstanden mellom to beregningspunkter (Δx og Δy):
      </p>
      <div className="my-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-sky-300">Global modell (ECMWF)</h3>
          <p className="mt-1 text-xs text-muted-foreground">Oppløsning: ~9 km grid</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Dekker hele kloden fra ekvator til polene. Fanger opp de store stormbanene, jetstrømmene og
            Rossby-bølgene, men er for grov til å skille norske fjorder og individuelle bygeskyer.
          </p>
        </div>
        <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-teal-300">Regional modell (MEPS)</h3>
          <p className="mt-1 text-xs text-muted-foreground">Oppløsning: 2,5 km grid</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Dekker Norden og Østersjøen. Kalles <em>konveksjonsløsende</em>: 2,5 km er fint nok til at
            modellen løser store tordenskyer og dalvinder direkte via bevegelsesligningene.
          </p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-amber-300">Kysthavmodell (Norkyst)</h3>
          <p className="mt-1 text-xs text-muted-foreground">Oppløsning: 800 m grid</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Fokusert langs norskekysten. Løser havstrømmer, tidevann og stormflo i trange sund og
            fjorder, drevet av vindstress fra MEPS-atmosfæren.
          </p>
        </div>
      </div>

      <p>
        Vertikalt kan ikke modellen bare bruke faste geometriske høyder (z), for da ville de
        nederste lagene kollidere rett inn i fjellveggene i Jotunheimen! I stedet bruker moderne
        modeller <strong>terrengfølgende hybridkoordinater (σ-flater)</strong>:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Nær bakken:</strong> De vertikale flatene tilpasser seg terrenget fullstendig og buer
          seg smidig over fjellrygger og ned i dype fjorder. Dette gjør det mulig å simulere
          orografisk heving, katabatiske fallvinder og lokale dalinversjoner med stor nøyaktighet.
        </li>
        <li>
          <strong>Høyt i troposfæren og stratosfæren:</strong> Terrengbøyningen flates gradvis ut, og
          koordinatene går over til å bli rene, glatte isobarflater (konstant trykk) helt opp til
          modellranden (typisk 0,01 hPa / ca. 65 km høyde).
        </li>
      </ul>

      <ModelGrid3DDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Hvorfor er en dobling av oppløsningen 16 ganger så dyr?
      </h3>
      <p>
        Mange spør hvorfor meteorologene ikke bare kjører 100 meters oppløsning over hele kloden med én
        gang. Årsaken er den brutale <strong>skaleringsloven for 3D-modeller</strong>. Tenk deg at du
        halverer rutenettavstanden fra 10 km til 5 km:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>Du må ha 2 ganger så mange celler i nord-sør-retning (y).</li>
        <li>Du må ha 2 ganger så mange celler i øst-vest-retning (x).</li>
        <li>Du må ha 2 ganger så mange celler i vertikal retning for å beholde sideforholdet (z).</li>
        <li>Dette gir 2 × 2 × 2 = 8 ganger flere 3D-celler i beregningen.</li>
        <li>
          <strong>I tillegg krever CFL-kriteriet</strong> at tidssteget Δt må halveres fordi
          cellene er blitt smalere! Dermed må superdatamaskinen ta dobbelt så mange tidssteg for å
          nå samme prognoselengde.
        </li>
      </ul>
      <p className="font-semibold text-sky-400">
        Resultat: 8 × 2 = 16 ganger mer datakraft per døgn! En økning i oppløsning krever
        dermed eksponentielt mer kostbar superdatamaskininfrastruktur.
      </p>
    </>
  );
}
