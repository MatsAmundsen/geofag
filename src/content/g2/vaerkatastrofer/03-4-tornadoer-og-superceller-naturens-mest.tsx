import { SupercellAnatomyDiagram, TornadoGenesisDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function TornadoerOgSupercellerNaturensMest() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        4. Tornadoer og superceller: Naturens mest konsentrerte virvler
      </h2>
      <p>
        Mens en tropisk orkan har en diameter på flere hundre kilometer og varer i ukevis over åpent
        hav, er en <strong>tornado</strong> (skypumpe / skytrombe) atmosfærens mest konsentrerte og
        voldelige virvel. En tornado defineres som en voldsomt roterende luftsøyle som strekker seg
        fra basen av en konvektiv sky (vanligvis en cumulonimbus) og er i direkte kontakt med bakken
        (NOAA SPC, u.å.).
      </p>
      <p>
        De mest dødelige og destruktive tornadoene fødes nesten utelukkende i tilknytning til{" "}
        <strong>superceller</strong> — spesielt organiserte tordenvær med en kontinuerlig roterende
        oppdriftskjerne kalt en <strong>mesosyklon</strong> (diameter typisk 3–10 km).
      </p>

      <OrdBoks
        ord="Mesosyklon og supercelle"
        barn="En supercelle er et kraftig tordenvær med en roterende oppdriftskjerne (mesosyklon). Mesosyklonen dannes når vertikal vindskjæring vippes opp i loddrett stilling av kraftig konvektiv oppdrift."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Tornadogenesen: Fra horisontal rull til vertikal trakt
      </h3>
      <p>
        Hvordan kan et tordenvær skape vinder på over 300–450 km/t? Prosessen kalles{" "}
        <strong>tornadogenese</strong> og foregår i tre distinkte fysiske steg:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>1. Vertikal vindskjæring skaper et horisontalt virvelrør:</strong> Forutsetningen
          er kraftig vindskjæring i de nederste 3–6 kilometerne av atmosfæren — at vinden både
          endrer retning (dreier fra sørøst ved bakken til vest-sørvest i høyden) og øker drastisk i
          hastighet med høyden (f.eks. fra 30 km/t ved bakken til 150 km/t i 5 km høyde). Friksjonen
          mot bakken kombinert med den raskere overliggende vinden setter luften i horisontal
          rotasjon, som en roterende kjevle langs bakken (horisontal virvling).
        </li>
        <li>
          <strong>2. Oppdriften tipper virvelen vertikalt:</strong> Når supercellens eksplosive
          oppdrift (drevet av ekstrem termisk ustabilitet og høy CAPE, ofte &gt; 2500 J/kg) treffer
          dette horisontale virvelrøret, suges midtpartiet oppover. Røret bøyes til en hesteskoform.
          Den ene halvdelen av virvelen roterer syklonalt (mot klokken på nordlig halvkule) og
          forsterkes til supercellens <em>mesosyklon</em>.
        </li>
        <li>
          <strong>3. Strekking og bevaring av spinn (Angulært moment):</strong> En roterende
          mesosyklon på 5 kilometers bredde er for vid til å nå bakken med ekstrem hastighet. Det
          avgjørende trinnet inntreffer når den kalde, nedadgående luftstrømmen på baksiden av
          supercellen — <strong>Rear Flank Downdraft (RFD)</strong> — feier rundt mesosyklonen.
          RFD-luften klemmer oppdriftskjernen sammen og strekker den loddrett nedover mot bakken.
        </li>
      </ol>

      <p>
        Akkurat som en kunstløper som trekker armene tett inntil kroppen under en piruett, krever
        fysikkens lov om <strong>bevaring av angulært moment</strong> (
        <em>L = m &times; v &times; r = konstant</em>) at når virvelens radius r tvinges til å
        minke fra flere tusen meter til under 100 meter, må rotasjonshastigheten v øke
        proporsjonalt:
      </p>
      <div className="my-3 rounded-xl border border-border bg-card p-3 text-center">
        <span className="font-mono text-base font-bold text-primary">
          {"r₁ · v₁ = r₂ · v₂  ⟹  v₂ = v₁ · (r₁ / r₂)"}
        </span>
      </div>
      <p>
        Idet virvelen snurpes sammen og treffer bakken, faller det sentrale lufttrykket dramatisk
        (ofte med over 50–100 hPa). Den brå adiabatiske ekspansjonsavkjølingen gjør at vanndampen
        umiddelbart kondenserer til en synlig trakt (kondensasjonstrakt), samtidig som rusk og støv
        suges opp.
      </p>

      <TornadoGenesisDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Supercellens anatomi og krok-ekkoet (Hook Echo)
      </h3>
      <p>
        Diagrammet nedenfor viser det indre tverrsnittet av en klassisk supercelle. Legg merke til
        hvordan oppdriften og nedbøren er fysisk adskilt fra hverandre:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          I vanlige tordenvær faller regnet rett ned gjennom oppdriften og kveler skyen etter 30–60
          minutter.
        </li>
        <li>
          I en supercelle gjør den kraftige vindskjæringen i høyden at nedbøren (hagl og regn)
          blåses bort fra oppdriften og danner <strong>Forward Flank Downdraft (FFD)</strong> foran
          skyen. Oppdriften i mesosyklonen forblir dermed fri for nedbør og kan suge inn varm,
          fuktig luft uforstyrret i flere timer!
        </li>
        <li>
          Under den regnfrie oppdriftsbasen senkes ofte en roterende{" "}
          <strong>veggsky (wall cloud)</strong>. Det er herfra tornadoen strekker seg ned.
        </li>
        <li>
          På doppler-værradar avsløres supercellen ved et umiskjennelig{" "}
          <strong>krok-ekko (hook echo)</strong>: Regn og kjempehagl i FFD reflekteres kraftig, mens
          den roterende mesosyklonen og RFD feier nedbøren rundt baksiden som en krok rundt det
          nedbørsfrie oppdriftsrøret (BWER).
        </li>
      </ul>

      <SupercellAnatomyDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Enhanced Fujita-skalaen (EF0 til EF5) og tornadoer i Norge
      </h3>
      <p>
        Fordi vindmålere sjelden overlever et direkte treff av en tornado, klassifiseres tornadoers
        styrke i etterkant ved å analysere skadene på bygninger og trær. Siden 2007 benyttes den
        oppdaterte <strong>Enhanced Fujita-skalaen (EF-skalaen)</strong> (NOAA SPC, u.å.):
      </p>
      <div className="my-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
          <h4 className="font-display text-sm font-bold text-sky-400">EF0–EF1 (105–177 km/t)</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Lette til moderate skader. Takstein blåser av, trær knekker, uforankrede boder veltes.
            Utgjør over 80 % av alle tornadoer globalt.
          </p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
          <h4 className="font-display text-sm font-bold text-amber-400">EF2–EF3 (178–266 km/t)</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Betydelige til alvorlige ødeleggelser. Tak rives fullstendig av solide mur- og trehus,
            biler kastes gjennom luften, store skoger flates ut.
          </p>
        </div>
        <div className="rounded-xl border border-red-500/40 bg-red-950/30 p-4">
          <h4 className="font-display text-sm font-bold text-red-400">
            EF4–EF5 (&gt; 267–322+ km/t)
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Total utslettelse. Velbygde murhus feies fullstendig av grunnmuren, biler slynges flere
            hundre meter som prosjektiler, bark skrelles av trærne.
          </p>
        </div>
      </div>

      <p>
        <strong>Hvorfor er «Tornado Alley» i USA verdens tornadomagnet?</strong> Ingen andre steder
        i verden kolliderer tre så distinkte luftmasser under en kraftig jetstrøm: Varm, fuktig
        maritim luft fra Mexicogolfen strømmer nordover i lav høyde; tørr, varm luft fra Rocky
        Mountains og Mexico-platået legger seg som et lokk (dryline / EML) over fukten; og iskald
        polarluft fra Canada feier inn i høyden. Når lokket brytes, eksploderer konveksjonen til
        gigantiske superceller.
      </p>
      <p>
        <strong>Har vi tornadoer i Norge?</strong> Ja! I Norge omtales de tradisjonelt som{" "}
        <em>skypumper</em> eller <em>tromber</em> (Store norske leksikon, u.å.). De aller fleste er
        svake (EF0 eller EF1) og oppstår enten som skypumper over oppvarmede innsjøer og fjorder om
        sensommeren, eller i ustabil luft over Østlandet. Likevel har kraftige tromber revet hustak
        og felt store skogsområder i Trøndelag, Telemark og på Østlandet.
      </p>

      <OrdBoks
        ord="Enhanced Fujita-skalaen (EF)"
        barn="Skala for klassifisering av tornadoer fra EF0 (105 km/t) til EF5 (>322 km/t). Baserer seg på analyse av skadeomfang på 28 ulike bygnings- og vegetasjonsindikatorer."
      />
    </>
  );
}
