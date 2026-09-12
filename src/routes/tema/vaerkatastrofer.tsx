import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  AtmosphericRiverDiagram,
  ClimateRiskShiftDiagram,
  HurricaneCrossSectionDiagram,
  MeteorologicalBombDiagram,
  PolarLowFormationDiagram,
  StormSurgeDiagram,
  SupercellAnatomyDiagram,
  TornadoGenesisDiagram,
} from "@/components/diagrams";
import { HurricaneSpinModel } from "@/components/models/hurricane-spin-model";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/vaerkatastrofer")!;

export const Route = createFileRoute("/tema/vaerkatastrofer")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/vaerkatastrofer",
    }),
  component: KatastroferPage,
});

function KatastroferPage() {
  return (
    <TopicLayout
      kicker="Naturfarer og ekstreme værsystemer"
      title="Værkatastrofer"
      lead="Når atmosfærens krefter konsentreres i rom og tid, forvandles velkjente fysiske prinsipper til destruktive naturkatastrofer. Tropiske orkaner drives som gigantiske varmekraftmaskiner over lunkne hav, mens eksplosive lavtrykk og arktiske bomber herjer våre egne breddegrader. I fuktige luftstrømmer frakter atmosfæriske elver ufattelige vannmengder inn mot fjellene, mens superceller konsentrerer vindskjæring og rotasjon til dødelige tornadoer. En værkatastrofe oppstår i skjæringspunktet mellom ekstrem fysikk og samfunnets sårbarhet — og i et varmere klima lades terningen med høyere risiko."
      banner="/images/banner-katastrofer.jpg"
      bannerAlt="Atlantisk orkan sett fra verdensrommet, med tydelig øye og spiralformede regnbånd"
      prev={{ to: "/tema/milankovitch", label: "Forrige: Milankovitch og istider" }}
      next={{ to: "/eksamen", label: "Neste: Eksamen i Geofag 2" }}
      kilder={KILDER.vaerkatastrofer}
    >
      {/* 1. SAMME FYSIKK, HØYERE INNSATS */}
      <h2 className="font-display text-2xl font-medium tracking-tight">
        1. Samme fysikk, høyere innsats: Naturfare, sårbarhet og risiko
      </h2>
      <p>
        En værkatastrofe bryter ikke med termodynamikkens eller hydrodynamikkens lover. Den er ikke
        et mystisk unntak fra pensum, men tvert imot den mest konsentrerte manifestasjonen av de
        mekanismene du allerede har tilegnet deg: trykkgradienter, oppdrift, adiabatisk avkjøling,
        kondensasjonsvarme, Corioliskraften og baroklin instabilitet. Forskjellen mellom en frisk
        kystkuling og en ødeleggende værkatastrofe handler om energiens tetthet, systemets
        konsentrasjon — og hvorvidt menneskelig infrastruktur befinner seg i skuddlinjen.
      </p>
      <p>
        I geofag skiller vi strengt mellom et <strong>fysisk naturfenomen</strong>, en{" "}
        <strong>naturfare</strong> og en <strong>naturkatastrofe</strong>:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Naturfare (Hazard):</strong> En naturlig fysisk prosess i atmosfæren, hydrosfæren
          eller litosfæren som har potensial til å forårsake tap av menneskeliv, helseskade eller
          ødeleggelse av infrastruktur (f.eks. en Kategori 5-orkan over åpent hav eller et steinras
          i en ubebodd dal).
        </li>
        <li>
          <strong>Sårbarhet (Vulnerability):</strong> De fysiske, sosiale, økonomiske og
          miljømessige faktorene som avgjør hvor mottakelig et samfunn eller et byggverk er for
          skader dersom faren inntreffer (f.eks. om hus er bygget på kvikkleire, om kystbebyggelse
          har flomvern, eller om varslingssystemer fungerer).
        </li>
        <li>
          <strong>Naturkatastrofe (Disaster):</strong> En alvorlig forstyrrelse av samfunnets
          funksjon som oppstår når naturfaren rammer et sårbart område, slik at tapene overstiger
          det lokalsamfunnet selv makter å håndtere.
        </li>
      </ul>

      <p>Dette formaliseres gjennom den fundamentale risikoligningen:</p>
      <div className="my-4 rounded-xl border border-border bg-card p-4 text-center">
        <span className="font-mono text-lg font-bold text-primary">
          Risiko = Naturfare × Sårbarhet × Eksponering
        </span>
      </div>

      <OrdBoks
        ord="Naturfare og risiko"
        barn="Naturfare er den fysiske hendelsen (storm, orkan, ekstremnedbør, flom). Risiko er det forventede tapet, beregnet som produktet av farens sannsynlighet og intensitet, samfunnets sårbarhet, og verdiene som er eksponert."
      />

      {/* 2. TROPISKE SYKLONER */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        2. Tropiske sykloner: Havets latente varmemaskin
      </h2>
      <p>
        En <strong>tropisk syklon</strong> er et intensivt lavtrykkssystem med varm kjerne (warm
        core) som oppstår over tropiske eller subtropiske havområder, preget av organisert dyp
        konveksjon og en lukket syklonisk sirkulasjon nær overflaten (NHC, u.å.). Avhengig av hvor
        på kloden de oppstår, har fenomenet ulike tradisjonelle navn, men den fysiske mekanismen er
        identisk:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Orkan (Hurricane):</strong> Nord-Atlanteren, Karibia, Mexicogolfen og det østlige
          Stillehavet.
        </li>
        <li>
          <strong>Tyfon (Typhoon):</strong> Det nordvestlige Stillehavet (utenfor Japan, Kina og
          Filippinene).
        </li>
        <li>
          <strong>Syklon (Cyclone):</strong> Det indiske hav og det sørlige Stillehavet.
        </li>
      </ul>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Grays seks dannelseskriterier
      </h3>
      <p>
        En tropisk orkan kan ikke dannes hvor som helst. Den amerikanske meteorologen William M.
        Gray formulerte seks nødvendige termodynamiske og dynamiske miljøbetingelser som må være
        oppfylt samtidig for at en tropisk forstyrrelse skal utvikle seg til en fullverdig orkan:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Havtemperatur &ge; 26,5 °C ned til minst 50 meters dyp:</strong> Varmt vann
          fungerer som orkanens brensel. Dybdekravet er avgjørende: Når orkanens voldsomme vinder
          pisker opp havet, fører turbulensen til kraftig vertikal omrøring. Dersom det varme
          vannlaget bare var en tynn hinne, ville kaldere dypvann velles opp til overflaten og kvele
          fordampingen umiddelbart (NHC, u.å.).
        </li>
        <li>
          <strong>Tilstrekkelig Corioliskraft (minst 5° eller ca. 500 km fra ekvator):</strong> Uten
          Coriolis-avbøyning ($f = 2\Omega\sin\phi$) kan ikke innstrømmende luftmasser settes i
          rotasjon. Ved ekvator ($\phi = 0^\circ$) er $f = 0$. Lufta strømmer da rett inn i
          lavtrykket og fyller det opp før trykkfallet rekker å akselerere (NOAA, u.å.). Derfor
          fødes det aldri orkaner mellom 0° og 5° breddegrad!
        </li>
        <li>
          <strong>Høy luftfuktighet i midtre troposfære (ca. 700–500 hPa):</strong> Tørr luft i
          midtre lag fører til fordamping av skydråper, noe som produserer kalde fallvinder som
          bryter ned oppdriften.
        </li>
        <li>
          <strong>Betinget instabilitet og høy CAPE:</strong> Atmosfæren må være ustabil overfor
          fuktige luftpakker, slik at konveksjonen kan trenge uhemmet opp til tropopausen.
        </li>
        <li>
          <strong>Svak vertikal vindskjæring (&lt; 10 m/s mellom overflaten og 200 hPa):</strong>{" "}
          Dette er et kritisk krav! Dersom vindens fart eller retning endrer seg kraftig med høyden,
          blir orkanens vertikale søyle av latent varme blåst skjev eller revet fra hverandre.
          Varmekjernen ventileres bort, og systemet kollapser.
        </li>
        <li>
          <strong>En forutgående forstyrrelse nær overflaten:</strong> Det må eksistere en
          innledende virvling i atmosfæren, ofte i form av en afrikansk østlig bølge (easterly wave)
          som driver ut over Atlanteren fra Sahel-regionen.
        </li>
      </ol>

      <OrdBoks
        ord="Tropisk syklon"
        barn="Et varmkjerne-lavtrykk som dannes over tropisk hav med overflatetemperatur over 26,5 °C. Drives av frigjøring av latent varme under kondensasjon og roterer syklonalt som følge av Corioliseffekten."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Carnot-varmekraftmaskinen og latent varme
      </h3>
      <p>
        Fysisk sett fungerer en tropisk orkan som en gigantisk termodynamisk varmekraftmaskin (en
        tilnærmet Carnot-prosess):
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Varmereservoaret (Havet ved ~300 K / +27 °C):</strong> Luft suges inn mot sentrum
          langs havflaten i en tilnærmet isoterm ekspansjon, der den tilføres enorme mengder
          vanndamp og varme.
        </li>
        <li>
          <strong>Det adiabatiske løftet (Øyveggen):</strong> Luften stiger bratt i øyveggen.
          Vanndampen kondenserer til dråper og frigjør <strong>latent varme</strong> på hele{" "}
          <strong>2,5 millioner joule per kilo vann</strong> (2,5 &times; 10&#8310; J/kg)! Denne
          latente energien varmer opp luften, holder den lettere enn omgivelsene, og akselererer
          oppdriften til over 30 m/s.
        </li>
        <li>
          <strong>Kuldreservoaret (Tropopausen ved ~200 K / -73 °C):</strong> I 15 kilometers høyde
          sprer luften seg utover i et vidstrakt antisyklonsk cirrusskjold og taper varme ved
          langbølget stråling ut i verdensrommet.
        </li>
      </ul>
      <p>
        Det er temperaturforskjellen mellom det varme havet nede og den bitende kalde tropopausen
        oppe som bestemmer orkanens teoretiske maksimale intensitet (Maximum Potential Intensity,
        MPI).
      </p>

      <HurricaneCrossSectionDiagram />

      {/* 3. ORKANENS ANATOMI OG SAFFIR-SIMPSON */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        3. Orkanens anatomi og destruksjonskrefter
      </h2>
      <p>
        En fullt utviklet orkan er et mesterverk av atmosfærisk organisering. Tverrsnittet ovenfor
        viser de tre hovedsonene som kjennetegner systemet:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>1. Øyet (The Eye):</strong> Orkanens rolige senter, vanligvis 20–50 km i diameter.
          Her er lufttrykket på sitt absolutte minimum (i ekstreme tilfeller under 900 hPa). Likevel
          er det nesten vindstille, og himmelen er ofte delvis skyfri. Årsaken er at luften i øyet
          synker langsomt (subsidens). På vei ned varmes luften adiabatisk, den relative
          luftfuktigheten stuper, og skydråpene fordamper.
        </li>
        <li>
          <strong>2. Øyveggen (The Eyewall):</strong> Den loddrette ringen av ruvende
          cumulonimbus-skyer som omkranser øyet. Her raser orkanens sterkeste vedvarende vinder, de
          kraftigste vindkastene og den mest voldsomme oppdriften. Det er i øyveggen den latente
          energien frigjøres med maksimal styrke. I de kraftigste orkanene oppstår ofte{" "}
          <em>øyveggsutskiftninger</em> (eyewall replacement cycles), der en ytre ring av regnbånd
          snurper seg sammen og kveler den opprinnelige øyveggen, noe som fører til midlertidig
          svekkelse etterfulgt av ny intensivering.
        </li>
        <li>
          <strong>3. Spiralformede regnbånd (Spiral Rainbands):</strong> Buede bånd av tordenskyer
          som kveiler seg inn mot øyveggen. Båndene bringer skiftende perioder med styrtregn og
          kuling, og kan ofte generere lokale, kortvarige tornadoer når orkanen treffer land.
        </li>
      </ul>

      <OrdBoks
        ord="Øyet og øyveggen"
        barn="Øyet er orkanens sentrale kjerne med synkende luft, lavt trykk og vindstille. Øyveggen er den loddrette skyringen rundt øyet der oppdriften, nedbøren og vindhastigheten når sitt absolutte maksimum."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        De tre destruktive kreftene
      </h3>
      <p>
        Når en orkan gjør landkjenning (landfall), rammes kysten av tre parallelle
        ødeleggelsesmekanismer:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Stormflo (Storm Surge):</strong> Havet heves og presses inn over land. Dette er
          den historisk desidert dødeligste faktoren i tropiske orkaner (over 85 % av dødsfallene i
          orkanen Katrina i 2005 skyldtes drukning som følge av stormflo og brudd på dikene).
        </li>
        <li>
          <strong>Ekstrem ferskvannsflom (Inland Flooding):</strong> Tropiske sykloner bærer
          kolossale vannmengder. Når en orkan bremser opp over land, kan regnbåndene dumpe over
          500–1000 mm nedbør på få døgn (som under orkanen Harvey over Texas i 2017).
        </li>
        <li>
          <strong>Ekstremvind og prosjektiler:</strong> Vindens mekaniske trykk mot bygninger øker
          med kvadratet av vindhastigheten ($P \propto v^2$), mens den kinetiske energioverføringen
          øker med kuben ($E \propto v^3$). En orkan med 250 km/t vind utøver derfor opptil fire
          ganger større vindtrykk mot vegger og tak enn en orkan med 125 km/t!
        </li>
      </ol>

      <HurricaneSpinModel />

      {/* 4. TORNADOER OG SUPERCELLER */}
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
        <em>L = m &times; v &times; r = konstant</em>) at når virvelens radius $r$ tvinges til å
        minke fra flere tusen meter til under 100 meter, må rotasjonshastigheten $v$ øke
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

      {/* 5. POLARFRONTEN OG BOMBER */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        5. Norges stormmaskin: Polarfronten og eksplosiv syklonegenese («bomber»)
      </h2>
      <p>
        Selv om tropiske orkaner får mest medieoppmerksomhet, rammes Norge nesten utelukkende av en
        helt annen type lavtrykk: <strong>ekstratropiske sykloner</strong> på polarfronten.
      </p>

      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
          <h4 className="font-display text-base font-bold text-amber-400">
            Tropisk syklon (Varmkjerne)
          </h4>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>• Dannes over homogent varmt hav (&gt;26,5 °C) uten fronter.</li>
            <li>
              • Drives av <em>latent varme</em> fra kondensasjon.
            </li>
            <li>• Varmest i kjernen; trykkgradienten avtar med høyden.</li>
            <li>• Maksimal vind i grenselaget nær bakken (i øyveggen).</li>
            <li>• Symmetrisk sirkulær struktur med skyfritt øye.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-5">
          <h4 className="font-display text-base font-bold text-sky-400">
            Ekstratropisk lavtrykk (Kaldkjerne)
          </h4>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>• Dannes langs kollisjonssoner (polarfronten) med skarpe temperaturkontraster.</li>
            <li>
              • Drives av <em>baroklin instabilitet</em> og potensiell energi.
            </li>
            <li>• Kaldest i kjernen; trykkgradienten øker med høyden opp mot jetstrømmen.</li>
            <li>• Asymmetrisk struktur med distinkte varm-, kald- og okklusjonsfronter.</li>
            <li>• Kan oppnå orkan styrke i vindkastene over Nord-Europa.</li>
          </ul>
        </div>
      </div>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Eksplosiv syklonegenese («Den meteorologiske bomben»)
      </h3>
      <p>
        Når et ekstratropisk lavtrykk intensiveres med ekstrem hastighet, omtales det internasjonalt
        som en <strong>meteorologisk bombe</strong> (Sanders &amp; Gyakum, 1980). Det vitenskapelige
        kriteriet for en bombe er et sentraltrykkfall på minst{" "}
        <strong>24 hPa i løpet av 24 timer</strong> (korrigert for breddegrad ved formelen 24
        &times; (sin &phi; / sin 60&deg;) hPa).
      </p>
      <p>
        Dette skjer når en dyp atlantisk forstyrrelse treffer den{" "}
        <strong>venstre utgangskvadranten</strong> i en intens jetstreak i polarfrontjeten. Her
        suger storskala divergens i 9–10 km høyde luft ut av luftsøylen raskere enn ny luft klarer å
        strømme til ved bakken. Resultatet er et loddrett trykkras, ekstremt tette isobarer, og at
        vinden på kort tid øker fra laber bris til full storm og orkan langs kysten.
      </p>

      <OrdBoks
        ord="Meteorologisk bombe"
        barn="Et ekstratropisk lavtrykk der lufttrykket i sentrum faller med minst 24 hPa på 24 timer. Gir ekstrem trykkgradient og plutselig orkan langs norskekysten."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Sting jets og historiske norske orkaner
      </h3>
      <p>
        I de mest intense bombene kan det dannes en såkalt <strong>sting jet</strong>. Dette er en
        smal luftstrøm (typisk 20–50 km bred) som oppstår i midtre troposfære nær tuppen av det
        okkluderte skybåndet (som brodden på en skorpion). Når regn og snø fordamper i denne tørre
        luften, avkjøles den brått og akselererer ned mot bakken. Idet sting jeten treffer
        havoverflaten på sørsiden av lavtrykket, kan den utløse vindkast på over{" "}
        <strong>50–65 m/s (180–230 km/t)</strong>!
      </p>
      <p>Norge har opplevd flere historiske bombe-lavtrykk med sting jets:</p>
      <ul className="list-disc space-y-1 text-foreground/90 pl-6">
        <li>
          <strong>Nyttårsorkanen 1. januar 1992:</strong> Det mest beryktede uværet i moderne norsk
          historie. Lavtrykket stupte til 940 hPa, og på Svinøy fyr ble det målt middelvind på 46
          m/s og vindkast på hele <strong>62 m/s (223 km/t)</strong>. Skadene på Vestlandet og i
          Trøndelag beløp seg til milliarder av kroner.
        </li>
        <li>
          <strong>Ekstremværet Dagmar (2011):</strong> Feiet inn over Vestlandet 1. juledag og
          kuttet strøm- og telenettet for hundretusener av innbyggere.
        </li>
        <li>
          <strong>Ekstremværet Ingunn (februar 2024):</strong> Et monsterlavtrykk der det på Kvaløya
          i Sømna ble registrert en offisiell norgesrekord i vindkast på utrolige{" "}
          <strong>62,3 m/s</strong> (Meteorologisk institutt, u.å.-b).
        </li>
      </ul>

      <MeteorologicalBombDiagram />

      {/* 6. POLARE LAVTRYKK */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        6. Polare lavtrykk: Arktiske mini-orkaner
      </h2>
      <p>
        I Norskehavet og Barentshavet om vinteren opptrer et annet særegent og fryktet værsystem:{" "}
        <strong>polare lavtrykk</strong> (Polar Lows). De kalles ofte «Arktis' mini-orkaner» fordi
        de på satellittbilder har en slående likhet med tropiske sykloner: en kompakt, roterende
        kommaspiral med et skyfritt øye i sentrum (Meteorologisk institutt, u.å.-a).
      </p>
      <p>
        Polare lavtrykk oppstår under et{" "}
        <strong>marint kaldluftsutbrudd (Marine Cold-Air Outbreak, MCAO)</strong>:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          Iskald, knusktørr arktisk luft (-25 °C til -40 °C) blåser sørover fra pakkisen og
          Svalbard.
        </li>
        <li>
          Luften treffer det åpne, relativt varme Atlanterhavsvannet i Norskehavet (+4 °C til +7
          °C).
        </li>
        <li>
          Temperaturforskjellen mellom havoverflaten og luften like over kan overstige{" "}
          <strong>35–45 °C</strong>!
        </li>
      </ul>
      <p>
        Dette skaper en kolossal vertikal varme- og fuktfluks fra havet opp i atmosfæren (ofte over{" "}
        <strong>600–1000 W/m²</strong>). Atmosfæren blir voldsomt ustabil, og oppdriften danner dype
        konvektive skygater som kveiles sammen av Corioliskraften.
      </p>

      <PolarLowFormationDiagram />

      <p>
        <strong>Hvorfor er polare lavtrykk så farlige?</strong>
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Liten skala (150–300 km):</strong> De er for små til å fanges opp nøyaktig av
          globale varslingsmodeller med grovt rutenett, og kan utvikle seg på under 6–12 timer.
        </li>
        <li>
          <strong>Plutselig orkan og vindkantring:</strong> Vinden kan øke fra stille bris til full
          storm og orkan på under 30 minutter, med brå 180-graders vindkantring når øyet passerer.
        </li>
        <li>
          <strong>Tett snøfokk (Whiteout) og ising:</strong> Kombinasjonen av minusgrader og
          sjøsprøyt gir rask og livsfarlig ising på fiskefartøy, noe som forskyver skipets
          tyngdepunkt og kan føre til kantring.
        </li>
      </ul>

      <OrdBoks
        ord="Polart lavtrykk"
        barn="Et lite, intenst marint lavtrykk (150–300 km) i polarområdene drevet av voldsom varmefluks når iskald arktisk luft strømmer ut over åpent, varmt hav (kaldluftsutbrudd). Kjennetegnes av orkan i kastene, tett snøfokk og et øye."
      />

      {/* 7. EKSTREMNEDBØR OG ATMOSFÆRISKE ELVER */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        7. Ekstremnedbør, atmosfæriske elver og orografisk forsterkning
      </h2>
      <p>
        Norge er en av Europas våteste nasjoner, og Vestlandet er bygget for nedbør. Likevel ser vi
        en økende forekomst av ekstremnedbørhendelser som utløser omfattende flommer og jordskred
        (som ekstremværet Hans i august 2023 og Gjerdrum-skredet i 2020) (NVE, 2024).
      </p>
      <p>
        De mest voldsomme nedbørsepisodene drives av et fenomen kjent som{" "}
        <strong>atmosfæriske elver (Atmospheric Rivers, AR)</strong>. Dette er smale, flere tusen
        kilometer lange korridorer med konsentrert vanndamptransport i nedre troposfære som pumper
        fuktighet fra subtropene tvers over Atlanteren mot Vest-Europa. En moden atmosfærisk elv kan
        frakte mer enn 10–20 ganger så mye vann som Amazonas-elven!
      </p>

      <AtmosphericRiverDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Orografisk løft og Clausius-Clapeyron-sammenhengen
      </h3>
      <p>
        Når dette subtropiske fukttoget treffer den skandinaviske fjellkjeden (Langfjella), tvinges
        luften brått oppover i en prosess som kalles <strong>orografisk løft</strong>:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          På vei opp fjellet utvider luften seg og avkjøles adiabatisk (1,0 °C/100 m før metning,
          deretter 0,6 °C/100 m).
        </li>
        <li>
          Siden kald luft har mye lavere metningstrykk for vanndamp, presses vannet ut som
          vedvarende, voldsom nedbør på losiden (vest for vannskillet).
        </li>
        <li>
          Når luften har passert toppen og synker ned over Østlandet, er den tømt for fukt. Den
          varmes tørradiabatisk hele veien ned og danner en markant <strong>regnskygge</strong> og
          fønvind i øst.
        </li>
      </ul>
      <p>
        <strong>Klimakoblingen:</strong> Den fysiske termodynamiske formelen for metningstrykk,{" "}
        <em>Clausius-Clapeyron-relasjonen</em>, slår fast at for hver grad temperaturen i atmosfæren
        stiger, øker luftens maksimale kapasitet til å holde på vanndamp med om lag{" "}
        <strong>7 %</strong> (IPCC, 2021). Varmere luft suger til seg mer fuktighet over Atlanteren,
        noe som betyr at når luften presses opp over norske fjell, faller det tilsvarende mer vann
        på kortere tid.
      </p>

      <OrdBoks
        ord="Atmosfærisk elv (AR)"
        barn="Smale, langstrakte bånd av konsentrert vanndamptransport i atmosfæren fra subtropiske havområder. Når de treffer kystfjell, utløser de langvarig ekstremnedbør og stor flomfare."
      />

      {/* 8. STORMFLO */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        8. Stormflo: Når havet heves og stables mot land
      </h2>
      <p>
        Mange tror at stormflo bare er store bølger som slår inn over land. Det er en alvorlig
        feiloppfatning. En <strong>stormflo</strong> er en unormal heving av{" "}
        <em>selve havoverflaten</em>, der middelvannspeilet løftes flere meter over sjøkartnull
        (Kartverket, u.å.).
      </p>
      <p>En ekstrem stormflo oppstår når fire uavhengige fysiske mekanismer inntreffer samtidig:</p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>1. Astronomisk tidvann (Springflo):</strong> Når månen og solen står på linje i
          forhold til jorden (ved nymåne og fullmåne), adderes deres gravitasjonskrefter og gir
          maksimal tidevannsforskjell. Dersom en storm treffer nøyaktig på springfloens toppunkt, er
          utgangsnivået allerede hevet med opptil én meter i deler av Nord-Norge og på Vestlandet.
        </li>
        <li>
          <strong>2. Den inverse barometereffekten:</strong> Lufttrykket utøver en mekanisk vekt på
          havoverflaten (1013,25 hPa tilsvarer 10 tonn per m²). I et dypt lavtrykk på f.eks. 950 hPa
          veier luftsøylen over havet vesentlig mindre enn i omkringliggende høytrykk. Vekten
          letter, og havoverflaten suges opp:{" "}
          <strong>For hver 1 hPa lufttrykket faller, heves havoverflaten med nøyaktig 1 cm!</strong>{" "}
          Et trykkfall på 63 hPa (fra 1013 til 950 hPa) gir en ren barometrisk heving på{" "}
          <strong>+63 cm</strong>.
        </li>
        <li>
          <strong>3. Vindstuv (Wind Setup):</strong> Når sterk pålandsvind blåser over grunt
          kystfarvann, utøver friksjonen mellom luft og vann en skjærspenning ($\tau_0 = \rho_a C_D
          U^2$). Vannet drives med vinden og stuves fysisk opp mot kystlinjen og inn i trange
          fjorder og bukter. Vindstuvet øker med kvadratet av vindhastigheten og er størst på
          langgrunne sokkelområder (som i Nordsjøen og Vadehavet).
        </li>
        <li>
          <strong>4. Bølgeoppstuvning (Wave Setup):</strong> Når gigantiske stormbølger bryter mot
          land og grunner, frigjøres bølgeenergi som presser vannmasser opp på stranden og kaiene
          utover selve vannstandsnivået.
        </li>
      </ol>

      <StormSurgeDiagram />

      <OrdBoks
        ord="Invers barometereffekt"
        barn="Hevingen av havoverflaten som skyldes redusert lufttrykk. Havet heves med om lag 1 cm for hvert hektopascal (hPa) trykket faller under standardatmosfæren (1013,25 hPa)."
      />

      {/* 9. KLIMAENDRINGER OG TILSKRIVING */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        9. Klimaendringer, tilskriving og beredskap
      </h2>
      <p>
        Et av de vanligste spørsmålene elever stiller i geofag er:{" "}
        <em>«Skyldes denne orkanen eller denne flommen global oppvarming?»</em>
      </p>
      <p>
        Det vitenskapelige svaret er verken et enkelt ja eller et enkelt nei. Været oppstår i et
        kaotisk system, og vi har alltid hatt stormer, flommer og tørke. Men klimaendringene endrer
        selve de fysiske rammene systemet opererer innenfor. Bildelig talt har vi{" "}
        <strong>ladet terningen</strong>: Terningen har fortsatt seks sider, men sekseren faller
        oftere, og terningen har fått et nytt, uventet tall i den ekstreme enden (IPCC, 2021).
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Forskyvning av sannsynlighetsfordelingen
      </h3>
      <p>
        Diagrammet nedenfor illustrerer den statistiske mekanismen: En beskjeden økning i
        gjennomsnittstemperaturen forskyver hele den statistiske Gauss-fordelingen (bjellekurven)
        svakt mot høyre. Legg merke til hva som skjer i den ytterste høyre <strong>halen</strong>:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          Sannsynligheten for det som tidligere var «en-gang-i-århundret-ekstremvær» øker ikke med
          noen få prosent, men <strong>mangedobles</strong>!
        </li>
        <li>
          Terskelen brytes for helt nye, tidligere umulige ekstremrekorder i temperatur, tørke og
          nedbørsintensitet.
        </li>
      </ul>

      <ClimateRiskShiftDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Tilskrivingsforskning (Event Attribution)
      </h3>
      <p>
        Tidligere kunne klimaforskere bare uttale seg om langsiktige trender. I dag har
        forskningsfeltet <strong>tilskrivingsforskning (Attribution Science)</strong>, ledet an av
        nettverk som <em>World Weather Attribution (WWA)</em>, gjort det mulig å kvantifisere
        klimaendringenes konkrete fingeravtrykk på individuelle ekstremhendelser få dager etter at
        de inntreffer (WWA, u.å.).
      </p>
      <p>Metodikken fungerer slik:</p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>Forskerne definerer hendelsen (f.eks. 3-døgns nedbørsmengde under flommen «Hans»).</li>
        <li>
          De kjører tusenvis av simuleringer i høyoppløselige klimamodeller i to parallelle
          verdener:
          <br />
          A) <em>Dagens faktiske verden:</em> Med observerte nivåer av CO₂ og andre klimagasser
          (~425 ppm).
          <br />
          B) <em>En hypotetisk verden som kunne ha vært:</em> Samme atmosfære, men uten
          menneskeskapte klimagassutslipp (førindustrielt nivå ~280 ppm).
        </li>
        <li>
          Ved å sammenligne sannsynligheten i de to verdenene, beregnes en{" "}
          <strong>Risk Ratio (RR)</strong>:
          <br />
          <span className="font-mono font-bold text-primary">
            {"RR = P(med klimaendring) / P(uten klimaendring)"}
          </span>
          <br />
          Dersom $RR = 4$, betyr det at den konkrete hetebølgen eller ekstremnedbøren ble gjort fire
          ganger mer sannsynlig som følge av menneskeskapt oppvarming.
        </li>
      </ol>

      <OrdBoks
        ord="Tilskrivingsforskning (Event Attribution)"
        barn="Vitenskapelig metode som bruker klimamodeller og observasjoner til å beregne hvor mye mer sannsynlig eller intens en konkret ekstremværhendelse ble som følge av menneskeskapte klimaendringer."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Varsling, beredskap og klimatilpasning i Norge
      </h3>
      <p>
        Siden vi ikke kan stoppe naturkreftene, må samfunnet redusere sin <strong>sårbarhet</strong>{" "}
        og øke sin beredskap:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Fargekodede farevarsler (MET og NVE):</strong> Værvarslene i Norge graderes etter
          konsekvens:
          <ul className="list-disc pl-6 space-y-1 mt-1 text-sm text-muted-foreground">
            <li>
              <strong className="text-amber-400">Gult nivå:</strong> Moderat fare; vær oppmerksom.
            </li>
            <li>
              <strong className="text-orange-400">Oransje nivå:</strong> Stor fare; vær forberedt på
              alvorlige skader og stengte veier.
            </li>
            <li>
              <strong className="text-red-500">Rødt nivå (Ekstremvær):</strong> Ekstrem fare;
              omfattende ødeleggelser, livsfare og nasjonal beredskap. Ekstremværet får eget navn.
            </li>
          </ul>
        </li>
        <li>
          <strong>Arealplanlegging og TEK17:</strong> Plan- og bygningsloven forbyr bygging i 100-
          og 200-års flomsoner og skredutsatt terreng uten sikringstiltak.
        </li>
        <li>
          <strong>Klimatilpasning:</strong> Byer må åpne bekker i rør (gjenåpning), etablere regnbed
          og fordrøyningsbassenger for å ta unna styrtregn, og bygge høyere flomvoller og
          stormflomurer langs utsatte havner.
        </li>
      </ul>

      {/* SYNTEBEBOKSER */}
      <Callout title="Til eksamen: Kjerneforskjeller og formler du må beherske">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Tropisk orkan vs. Norsk storm:</strong> Tropisk orkan er en <em>varmkjerne</em>{" "}
            drevet av hav over 26,5 °C og frigjøring av latent varme. En norsk storm på polarfronten
            er en <em>kaldkjerne</em> drevet av baroklin temperaturforskjell og jetstrømmen.
          </li>
          <li>
            <strong>Hvorfor ikke orkaner på ekvator?</strong> Fordi breddegraden er 0°, slik at
            Corioliskraften er null ($f = 2\Omega\sin(0^\circ) = 0$). Lufta suges rett inn og fyller
            lavtrykket uten rotasjon.
          </li>
          <li>
            <strong>Tornadogensens tre steg:</strong> 1) Vindskjæring gir horisontal virvel &rarr;
            2) Oppdrift tipper den til vertikal mesosyklon &rarr; 3) RFD strekker virvelen ned mot
            bakken, der rotasjonshastigheten eksploderer pga. bevaring av vinkelmoment (
            <em>L = m &times; v &times; r = konstant</em>).
          </li>
          <li>
            <strong>Stormfloens fire komponenter:</strong> 1) Springflo, 2) Invers barometereffekt
            (+1 cm per 1 hPa trykkfall), 3) Vindstuv ($\tau \propto U^2$), og 4) Bølgeoppstuvning.
          </li>
          <li>
            <strong>Clausius-Clapeyron-regelen:</strong> Atmosfæren kan holde på 7 % mer vanndamp
            for hver 1 °C temperaturen stiger, noe som forsterker ekstremnedbør.
          </li>
        </ul>
      </Callout>

      <Callout title="Vanlige misforståelser om værkatastrofer">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>
              Misforståelse 1: «Vannet i badekarsluket roterer på grunn av Corioliseffekten.»
            </strong>{" "}
            Feil! Badekaret er altfor lite (noen desimeter) og tømmes for fort til at jordrotasjonen
            rekker å virke. Utformingen av sluket og restbevegelser i vannet bestemmer retningen.
            Corioliskraften krever store romlige skalaer (titalls til hundrevis av kilometer).
          </li>
          <li>
            <strong>
              Misforståelse 2: «Klimaendringer gjør at det blir orkaner i Oslofjorden.»
            </strong>{" "}
            Feil! Nord-Atlanteren og Skagerrak når aldri 26,5 °C ned til 50 meters dyp. Norge vil
            fortsatt herjes av ekstratropiske lavtrykk og polare lavtrykk, men disse kan bære mer
            vann og gi høyere stormflo på grunn av høyere havnivå.
          </li>
          <li>
            <strong>Misforståelse 3: «Stormflo er bare store bølger.»</strong> Feil! Stormflo er en
            heving av selve det flate vannspeilet forårsaket av trykkfall og vindstress. Bølgene
            kommer på toppen av dette hevede vannivået.
          </li>
        </ul>
      </Callout>

      {/* 10. VIKTIGE BEGREPER */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Tropisk syklon"
          def="Varmkjerne-lavtrykk over tropisk hav (>26,5 °C) drevet av kondensasjonsvarme og formet av Coriolis. Fellesbetegnelse for orkan, tyfon og syklon."
        />
        <Term
          name="Øyveggen (Eyewall)"
          def="Loddrett ring av cumulonimbusskyer rundt orkanens øye, der vindhastighet, oppdrift og nedbør når sitt absolutte maksimum."
        />
        <Term
          name="Saffir-Simpson-skalaen"
          def="Klassifiseringsskala for tropiske orkaner fra Kategori 1 (119 km/t) til Kategori 5 (≥252 km/t) basert på 1-minutts vedvarende vind."
        />
        <Term
          name="Supercelle"
          def="Et spesielt organisert, langlivet tordenvær med en kontinuerlig roterende oppdriftskjerne (mesosyklon), opphavet til de mest voldsomme tornadoene."
        />
        <Term
          name="Mesosyklon"
          def="Roterende oppdriftskjerne i en supercelle (3–10 km bred) dannet ved at vertikal vindskjæring vippes opp i vertikalplanet."
        />
        <Term
          name="Enhanced Fujita-skalaen"
          def="Skala for klassifisering av tornadoer fra EF0 (105 km/t) til EF5 (>322 km/t) basert på detaljert skadeanalyse av 28 indikatorer."
        />
        <Term
          name="Meteorologisk bombe"
          def="Et ekstratropisk lavtrykk med eksplosiv dypning, definert ved et sentraltrykkfall på minst 24 hPa på 24 timer."
        />
        <Term
          name="Sting jet"
          def="En smal stråle av ekstrem luft som akselererer ned fra midtre troposfære på sørsiden av en meteorologisk bombe, og gir vindkast over 60 m/s."
        />
        <Term
          name="Polart lavtrykk"
          def="Kompakt, intenst arktisk lavtrykk (150–300 km) som oppstår når kald polarluft strømmer over åpent, varmt havvann (kaldluftsutbrudd)."
        />
        <Term
          name="Atmosfærisk elv (AR)"
          def="Smalt, langstrakt fukttog i nedre troposfære som frakter enorme mengder subtropisk vanndamp mot våre breddegrader."
        />
        <Term
          name="Orografisk nedbør"
          def="Nedbør som utløses når fuktig luft tvinges oppover av en fjellkjede, med adiabatisk avkjøling og kondensasjon på losiden."
        />
        <Term
          name="Stormflo"
          def="Unormal heving av havoverflaten forårsaket av samspillet mellom astronomisk springflo, invers barometereffekt, vindstuv og bølgeoppstuvning."
        />
        <Term
          name="Invers barometereffekt"
          def="Prinsippet om at havoverflaten heves med ca. 1 cm for hver 1 hPa lufttrykket faller under standardatmosfæren (1013,25 hPa)."
        />
        <Term
          name="Tilskrivingsforskning"
          def="Vitenskapelig metodikk (bl.a. World Weather Attribution) for å beregne hvor mye klimaendringene endret sannsynligheten for en konkret ekstremhendelse."
        />
      </TermGrid>

      {/* 11. QUIZ */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Test deg selv: Værkatastrofer
      </h2>
      <Quiz
        questions={[
          {
            prompt:
              "Hvorfor dannes det aldri tropiske orkaner på ekvator (mellom 0° og 5° breddegrad)?",
            options: [
              "Fordi havet er for grunt og mangler tilstrekkelig termisk treghet.",
              "Fordi Corioliskraften er null ved ekvator (f = 2Ω sin 0° = 0), slik at innstrømmende luft ikke settes i rotasjon.",
              "Fordi det aldri er tordenvær eller fuktighet i den intertropiske konvergenssonen.",
              "Fordi passatvindene blåser orkanene over ende før de rekker å rotere.",
            ],
            answer: 1,
            explain:
              "Corioliskraften avhenger av sinus til breddegraden: f = 2Ω sin φ. Ved ekvator er φ = 0°, noe som gir f = 0. Uten Coriolis-avbøyning strømmer luften rett inn i lavtrykket og fyller det opp umiddelbart. Orkaner trenger minst 5° breddegrad for å få tilstrekkelig rotasjon.",
          },
          {
            prompt:
              "Hva er den fysiske mekanismen bak den voldsomme rotasjonsakselerasjonen når en tornado dannes under en supercelle?",
            options: [
              "Luftmolekylene kolliderer med iskrystaller og lades opp elektrostatisk.",
              "Bevaring av vinkelmoment (L = m · v · r): Når RFD klemmer og strekker virvelens radius ned mot 50–100 m, eksploderer rotasjonshastigheten v.",
              "Corioliskraften er tusen ganger sterkere under tordenskyer enn over åpent landskap.",
              "Varmen fra bakken skaper en eksplosjon som slynger luften utover.",
            ],
            answer: 1,
            explain:
              "Akkurat som en kunstløper som trekker armene inn mot kroppen og roterer raskere, må vinkelmomentet L = m·v·r bevares. Når mesosyklonens virvelradius r minker fra flere tusen meter til under hundre meter i trakten, må vindhastigheten v øke voldsomt, ofte til over 300–400 km/t.",
          },
          {
            prompt:
              "Dersom et intenst lavtrykk på 943 hPa treffer kysten, hvor mye vil havoverflaten heve seg alene som følge av den inverse barometereffekten?",
            options: [
              "Omtrent 7 cm.",
              "Omtrent 35 cm.",
              "Omtrent 70 cm (ca. 1 cm per 1 hPa trykkfall under standardtrykket på 1013 hPa).",
              "Ingenting, fordi lufttrykk bare påvirker gasser og ikke væsker.",
            ],
            answer: 2,
            explain:
              "Standardatmosfæren er 1013 hPa. Trykkfallet i lavtrykket er 1013 - 943 = 70 hPa. Den inverse barometereffekten hever havflaten med ca. 1 cm for hver hPa trykket faller, noe som alene gir en heving på ca. 70 cm over normalen.",
          },
          {
            prompt: "Hva kjennetegner en 'meteorologisk bombe' (eksplosiv syklonegenese)?",
            options: [
              "At et lavtrykk eksploderer og forsvinner i løpet av få timer.",
              "At et lavtrykk på midlere breddegrader opplever et sentraltrykkfall på minst 24 hPa på 24 timer, ofte med sting jets og orkan i vindkastene.",
              "At lynnedslag i havoverflaten antenner metangass fra havbunnen.",
              "At en tropisk orkan kolliderer med en tornado over åpent hav.",
            ],
            answer: 1,
            explain:
              "Sanders & Gyakum (1980) definerte bomben som et ekstratropisk lavtrykk med et trykkfall på minst 24 hPa på 24 timer (breddegradskorrigert). Den drives av kollisjon mellom arktisk og subtropisk luft koblet til en jetstreak, og gir ofte sting jets med orkan i kastene (slik som Nyttårsorkanen 1992 og Ingunn 2024).",
          },
          {
            prompt:
              "Hvorfor er polare lavtrykk i Norskehavet og Barentshavet så notorisk farlige for kystfartøy?",
            options: [
              "Fordi de bare dannes midt på sommeren når fiskerne har ferie.",
              "Fordi de er kompakte (150–300 km), utvikles på få timer, og gir brå vindøkning til orkan, tett snøfokk (whiteout) og alvorlig ising.",
              "Fordi de koker havvannet slik at båtene mister oppdriften og synker.",
              "Fordi de alltid ledsages av undersjøiske tsunamier.",
            ],
            answer: 1,
            explain:
              "Polare lavtrykk er små og raskt utviklende systemer under arktiske kaldluftsutbrudd. Vinden kan gå fra svak bris til orkan på under 30 minutter, og kombinasjonen av minusgrader og sjøsprøyt gir rask og farlig ising som kan kantre skip.",
          },
          {
            prompt: "Hva sier Clausius-Clapeyron-sammenhengen om ekstremnedbør i et varmere klima?",
            options: [
              "At luftens kapasitet til å holde på vanndamp øker med ca. 7 % for hver 1 °C oppvarming, noe som mater mer fuktighet inn i ekstremregn.",
              "At det slutter å regne fordi all vanndamp fordamper til verdensrommet.",
              "At havet kjøles ned med 7 % hver gang det regner på Vestlandet.",
              "At orografisk nedbør bare kan oppstå i minusgrader.",
            ],
            answer: 0,
            explain:
              "Clausius-Clapeyron-relasjonen er en fundamental termodynamisk formel: Metningstrykket for vanndamp øker eksponensielt med temperaturen, omtrent 7 % per grad celsius. Varmere luft kan dermed transportere og dumpe vesentlig større mengder vann.",
          },
          {
            prompt:
              "Hva beregner forskerne i World Weather Attribution (WWA) når de analyserer en ekstrem værhendelse?",
            options: [
              "Det nøyaktige klokkeslettet for når neste storm vil inntreffe om 50 år.",
              "Risk Ratio (RR): Hvor mange ganger mer sannsynlig eller intens hendelsen ble i dagens klima sammenlignet med et hypotetisk klima uten menneskeskapte utslipp.",
              "Hvor mange tonn CO2 som ble sluppet ut under selve stormen.",
              "Navnet på den meteorologen som varslet feil.",
            ],
            answer: 1,
            explain:
              "Attribution science sammenligner sannsynligheten for hendelsen i klimamodeller med og uten menneskeskapte klimagasser. Forholdet mellom disse sannsynlighetene kalles Risk Ratio (RR). Hvis RR = 3, ble hendelsen tre ganger så sannsynlig på grunn av global oppvarming.",
          },
        ]}
      />
    </TopicLayout>
  );
}
