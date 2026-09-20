import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  FluvialErosionDepositionDiagram,
  GlacialLandformsDiagram,
  NorwegianLandscapeEvolutionDiagram,
  ValleyCrossSectionDiagram,
  WeatheringMechanismsDiagram,
} from "@/components/diagrams/landformer";
import {
  GrainSizeDistributionDiagram,
  HjulstromDiagram,
} from "@/components/diagrams/geology-extra";
import { LandformGeomorphologyModel } from "@/components/models/landform-geomorphology-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("landformer")!;

export const Route = createFileRoute("/geofag-1/landformer")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/landformer",
    }),
  component: LandformerPage,
});

function LandformerPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Landskapet vi ser rundt oss er et dynamisk resultat av en evig kamp mellom jordas indre oppbyggende krefter og overflatens ytre nedbrytende krefter. Gjennom mekanisk forvitring, kjemisk oppløsning, rennende elver og mektige kvartære isbreer har det norske landskapet blitt skåret ut: fra de eldgamle mesozoiske viddene på Hardangervidda til Vestlandets stupbratte fjorder, alpine tinder og kystens lave strandflate."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/norges-geologi",
        label: "Forrige: Norges geologiske historie",
      }}
      next={{
        to: "/geofag-1/vann-og-flom",
        label: "Neste: Vann og flom",
      }}
      kilder={KILDER.landformer}
    >
      {/* ------------------------------------------------------------------ */}
      {/* 1. INDRE VS. YTRE KREFTER                                          */}
      {/* ------------------------------------------------------------------ */}
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hva former jordoverflaten? Indre og ytre krefter
      </h2>
      <p>
        Geomorfologi er læren om landformenes opprinnelse, utvikling og de prosessene som skaper dem.
        Jordas overflate formes av to motstridende krefter:
      </p>
      <div className="grid gap-4 sm:grid-cols-2 my-4">
        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-warm">Endogene krefter</span>
          <h4 className="font-display text-lg font-bold">Indre oppbyggende krefter</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Drives av varmeutvikling og radioaktivt henfall i jordas kappe og kjerne. Platetektonikk,
            fjellkjedefolding (orogenese), magmatiske vulkanutbrudd og forkastningsbevegelser løfter
            bergmasser opp mot tyngdekraften og skaper topografiske høydeforskjeller.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-teal">Eksogene krefter</span>
          <h4 className="font-display text-lg font-bold">Ytre nedbrytende krefter</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Drives av solenergi og tyngdekraft gjennom atmosfæren og hydrosfæren. Forvitring bryter
            fjellet ned på stedet, mens rennende vann, isbreer, bølger og vind eroderer, transporterer
            og avsetter løsmasser for å jevne ut landskapet mot havnivå (erosjonsbasis).
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. FORVITRING                                                      */}
      {/* ------------------------------------------------------------------ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Forvitring — fjellets nedbrytning på stedet
      </h2>
      <p>
        Det er et avgjørende faglig skille mellom forvitring og erosjon: <strong>Forvitring bryter
        ned fast fjell der det ligger</strong> (in situ) uten at partiklene transporteres vekk. Så snart
        materialet settes i bevegelse og fraktes bort av vann, is, vind eller tyngdekraft, kalles prosessen
        <strong>erosjon</strong>.
      </p>

      <OrdBoks
        ord="Forvitring"
        barn="Oppsmuldring og kjemisk omdanning av fast fjell på jordoverflaten under påvirkning av temperatur, vann, gasser og organismer, uten forutgående transport."
      />

      <WeatheringMechanismsDiagram />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Mekanisk forvitring (fysisk oppsprekking)
      </h3>
      <p>
        Mekanisk forvitring sprenger fjellet fysisk i mindre stykker. Kjemien og mineralgitteret forblir
        uendret, men den totale overflaten øker eksponentielt. Dette gjør at kjemisk forvitring kan angripe
        mye mer effektivt i etterkant:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
        <li>
          <strong className="text-foreground">Frostsprengning (Frost wedging):</strong> Vann trenger inn
          i mikroskopiske sprekker og svakhetssoner i fjellet. Når vann fryser til is ved 0 °C, utvider
          det seg med omtrent <strong>9 prosent</strong>. I lukkede sprekker utvikles det et sprengtrykk
          på over 200 MPa (mer enn 2000 atmosfærer!), som langt overskrider bergartens strekkfasthet.
          Dette er den dominerende forvitringsformen i Norges høyfjell og skaper enorme urer, rasmarker
          og blokkmark.
        </li>
        <li>
          <strong className="text-foreground">Trykkavlastning og eksfoliering (Sheet jointing):</strong>
          Plutoniske dypbergarter (som granitt) krystalliserte under kilometerdyp med et voldsomt overliggende
          litostatisk trykk. Når millioner av år med erosjon fjerner de overliggende berglagene, utvider
          granitten seg elastisk mot den frie overflaten. Fjellet sprekker opp i parallelle bueformede
          flak («løkskalling»). Karakteristiske eksempler i Norge er de hvelvede granittkuplene på Helgeland
          (Torghatten) og i Iddefjorden.
        </li>
        <li>
          <strong className="text-foreground">Rotsvingning (Biologisk forvitring):</strong> Planterøtter
          og lav kiler seg inn i mikroskopiske sprekker. Når trærne vokser, utøver rotdiameteren et
          mekanisk sidetrykk (turgortrykk) som tvinger sprekkene fra hverandre.
        </li>
      </ul>

      <PhotoFigure
        src="/images/fig-forvitring.jpg"
        alt="Geologisk blotning i felt som viser oppsprukket, forvitret fjellvegg med frostsprengningsur"
        heading="Mekanisk forvitring og oppsprekking ved blotning"
        caption="En typisk norsk fjellblotning utsatt for frostforvitring langs svakhetssoner og lagdelingsflater. Vann siver inn om høsten og fryser om vinteren, noe som sprenger fjellet i kantete blokker som etter hvert raser ned og danner grovkornede urer (talus) ved skråningsfoten."
        marks={[
          { x: 28, y: 35, n: "1", text: "Primærsprekk", tone: "warm" },
          { x: 65, y: 55, n: "2", text: "Frostforvitret blokk", tone: "teal" },
          { x: 82, y: 80, n: "3", text: "Ur / Talus", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Tektoniske sprekker og lagflater fungerer som inngangsvei for smeltevann." },
          { n: "2", label: "9 % volumøkning ved frysing sprenger gradvis løs kantete steinblokker." },
          { n: "3", label: "Tyngdekraften frakter de løsnede blokkene ned i ura: overgang fra forvitring til erosjon." },
        ]}
      />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Kjemisk forvitring (mineralforvandling)
      </h3>
      <p>
        Kjemisk forvitring oppstår når atmosfærisk vann, karbondioksid og oksygen reagerer med mineralene
        og omdanner dem til nye kjemiske forbindelser:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
        <li>
          <strong className="text-foreground">Karstoppløsning av kalkstein:</strong> Regnvann absorberer
          CO₂ fra atmosfæren og jordsmonnet og danner en svak karbonsyre (H₂CO₃). Når dette sure vannet
          treffer kalkstein eller marmor (CaCO₃), løses kalsiumkarbonatet opp som kalsium- og hydrogenkarbonationer:
          <br />
          <span className="font-mono text-xs text-primary block my-1 text-center">
            CaCO₃ (s) + H₂O (l) + CO₂ (g) ⇌ Ca²⁺ (aq) + 2 HCO₃⁻ (aq)
          </span>
          Vannet huler ut fjellet og skaper <strong>karstlandskap</strong> med synkehull (doliner),
          underjordiske elveløp og dryppsteinshuler med stalaktitter (i taket) og stalagmitter (på gulvet).
          I Norge finner vi spektakulære kalksteinsgrotter i Nordland, særlig Grønligrotta og Setergrotta i Rana (Gjessing, 1978).
        </li>
        <li>
          <strong className="text-foreground">Hydrolyse (Feltspat → Leirmineraler):</strong> Kalifeltspat
          i granitt reagerer med hydrogenioner i vannet og brytes ned til leirmineralet kaolinitt, mens
          kalium og kiselsyre vaskes ut i oppløsning. Fjellet mister sin indre kohesjon og forvandles
          til en smuldrende grusmasse (saprolitt), mens kvartskornene forblir intakte og blir til sand på strender!
        </li>
      </ul>

      {/* ------------------------------------------------------------------ */}
      {/* 3. KORNSTØRRELSER OG HJULSTRØMS DIAGRAM                            */}
      {/* ------------------------------------------------------------------ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Kornfordeling og Hjulstrøms diagram — vannets transportevne
      </h2>
      <p>
        Når forvitring har løsnet partikler, overtar transportmediene: rennende vann, vind eller isbreer.
        Kornstørrelsen på et sediment avslører hvor mye energi transportmediet hadde da partiklene ble
        avsatt (Wentworth-skalaen):
      </p>

      <GrainSizeDistributionDiagram />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Hjulstrøms diagram og «leirparadokset»
      </h3>
      <p>
        I 1935 publiserte den svenske geografen Filip Hjulström et berømt diagram som kvantifiserer
        sammenhengen mellom vannets strømhastighet og dets evne til å <strong>erodere, transportere
        eller avsette</strong> sedimentpartikler (Hjulström, 1935):
      </p>

      <HjulstromDiagram />

      <Callout title="Leirparadokset (Kohesjonseffekten)">
        <p>
          Man skulle intuitivt tro at de minste partiklene (leire &lt;0,002 mm) ville la seg erodere lettest.
          Men Hjulstrøms diagram viser det stikk motsatte: Det krever en strømhastighet på over 100 cm/s
          for å rive løs avsatt leire fra en elvebunn — mer enn det som skal til for å rive løs grov grus!
        </p>
        <p className="mt-2 text-xs">
          Årsaken er <strong>elektrostatisk kohesjon</strong>: Leirmineraler er mikroskopiske, flate sjiktsilikater
          med negative ladninger på overflaten. Sammenpresset leire danner en ekstremt tett, kohesiv masse
          der vanndraget ikke får tak i enkeltpartikler. Sandkorn (0,2–0,5 mm) mangler derimot kohesjon og eroderes
          derfor aller lettest, ved bare ca. 20 cm/s!
        </p>
      </Callout>

      {/* ------------------------------------------------------------------ */}
      {/* 4. FLUVIALE LANDFORMER                                             */}
      {/* ------------------------------------------------------------------ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Fluviale landformer — elvens arbeid fra kilde til munning
      </h2>
      <p>
        Rennende vann er den viktigste overflateformeren på jordkloden over geologisk tid. Elvas formende
        kraft endrer seg dramatisk fra fjellet til havet:
      </p>

      <FluvialErosionDepositionDiagram />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        V-dal, canyon og jettegryter
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
        <li>
          <strong className="text-foreground">V-dal:</strong> I øvre elveløp med bratt terreng og stort fall
          eroderer elva rett nedover (bunn-erosjon). Samtidig fører forvitring, regnskyll og tyngdekraft til
          at løsmasser raser ned fra dalsidene og havner i elva. Dette gir det karakteristiske spisse V-tverrsnittet.
        </li>
        <li>
          <strong className="text-foreground">Canyon / Gjel:</strong> Dersom elva skjærer seg ned i ekstremt
          fast og motstandsdyktig berggrunn (som hard gneis eller basalt), holder dalsidene seg loddrette
          uten å rase sammen. Eksempler er Jutulhogget i Østerdalen og Grand Canyon i USA.
        </li>
        <li>
          <strong className="text-foreground">Jettegryter (evorsjon):</strong> Runde, dype sylindre boret
          ned i fjellet av rennende elver eller glasialt smeltevann. En stein (løper) fanges i en virvel og
          roterer i tusenvis av år som et naturlig bor mot berggrunnen.
        </li>
      </ul>

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Meandere, elvesletter og kroksjøer
      </h3>
      <p>
        Når elva når et flatere landskap nær havnivå, avtar fallet. Elva slutter å grave vertikalt og begynner
        å erodere sideveis:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
        <li>
          <strong className="text-foreground">Yttersving (Cut bank):</strong> Sentrifugalkraft og helikoidal
          strøm gjør at vannet strømmer raskest mot ytterkanten av svingen. Her foregår det kraftig erosjon
          som undergraver elveskrenten.
        </li>
        <li>
          <strong className="text-foreground">Innersving (Point bar):</strong> På innsiden av svingen avtar
          strømhastigheten kraftig. Her avsettes sand og grus som lagdelte sandører.
        </li>
        <li>
          <strong className="text-foreground">Kroksjø (Oxbow lake):</strong> Svingene blir stadig mer buktende.
          Under en storflom kan elva ta den korteste veien og bryte tvers gjennom den smale meanderhalsen.
          Den avsnørte elvesvingen blir liggende igjen som en hesteskoformet innsjø (kroksjø).
        </li>
      </ul>

      <PhotoFigure
        src="/images/fig-ravine.jpg"
        alt="Ravinedal og elveløp erodert ned i finkornede sedimenter og leirmasser"
        heading="Fluvial ravinedannelse i marine leiravsetninger"
        caption="En ravine er en bratt V-formet kløft gravd ut av rennende overflatevann i leire eller silt. Etter istiden hevet store leirflater seg over havnivå på Østlandet og i Trøndelag, og bekker har skåret ut et karakteristisk, forgreinet ravinelandskap (f.eks. Romerike)."
        marks={[
          { x: 30, y: 35, n: "1", text: "Ravinedal", tone: "warm" },
          { x: 75, y: 65, n: "2", text: "Leireskråning", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Elvebekk som skjærer seg dypt ned i ukonsolidert marin leire." },
          { n: "2", label: "Bratte skråninger utsatt for utglidninger og kvikkleireskred ved undergraving." },
        ]}
      />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Gilbert-type elvedelta
      </h3>
      <p>
        Når elva munner ut i en innsjø, fjord eller et hav, stanser strømmen brått opp, og all transportevne
        forsvinner. Sedimentene avsettes i tre distinkte lag i et klassisk <strong>Gilbert-delta</strong>:
      </p>
      <ol className="list-decimal pl-6 space-y-1.5 text-sm text-muted-foreground">
        <li>
          <strong className="text-foreground">Topplag (Topset beds):</strong> Horisontale lag av grov sand
          og grus avsatt i elveleiene på selve deltaflaten over vannspeilet.
        </li>
        <li>
          <strong className="text-foreground">Forlag (Foreset beds):</strong> Skråstilte sandlag som raser
          ned deltafronten og bygger deltaet trinnvis utover i vannbassenget.
        </li>
        <li>
          <strong className="text-foreground">Bunnlag (Bottomset beds):</strong> Horisontale lag av finkornet
          silt og leire som svever lengst ut i bassenget før de legger seg til ro på dypet.
        </li>
      </ol>

      {/* ------------------------------------------------------------------ */}
      {/* 5. GLASIALE LANDFORMER                                             */}
      {/* ------------------------------------------------------------------ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Glasiale landformer — isbreenes mektige arkitektur
      </h2>
      <p>
        Isbreer er historiens mest formidable skulptører av det norske landskapet (Benn &amp; Evans, 2010;
        Nesje &amp; Dahl, 1993). En isbre beveger seg under sin egen vekt gjennom <em>indre plastisk deformasjon</em>
        og <em>basal glidning</em> på en tynn smeltevannsfilm:
      </p>

      <GlacialLandformsDiagram />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Erosjonsformer: Skuring og plukking
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
        <li>
          <strong className="text-foreground">U-daler:</strong> I motsetning til elva som bare graver i bunnen,
          fyller en bre hele dalen fra side til side. Isen eroderer med lik kraft langs både bunn og dalsider,
          noe som skaper en flat bunn med stupbratte vegger (U-tverrsnitt).
        </li>
        <li>
          <strong className="text-foreground">Fjorder:</strong> En fjord er simpelthen en U-dal som er gravd
          ut så dypt at bunnen ligger langt under dagens havnivå (overfordypning). Sognefjorden er hele
          1308 meter dyp på sitt dypeste! Ved munningen mistet breen mottrykk og erosjonsevne, slik at det ble
          stående igjen en grunn <strong>fjordterskel</strong> (ofte bare 100–200 meter dyp).
        </li>
        <li>
          <strong className="text-foreground">Hengedaler:</strong> Dannes der en mindre sidebre munnet ut i en
          mye større hovedbre. Hovedbreen gravde dalbunnen langt dypere ned. Da isen forsvant, ble sidedalen
          hengende høyt oppe i fjellsiden, og sideelva må kaste seg ut i fossestryk (f.eks. Vøringsfossen og De syv søstre).
        </li>
        <li>
          <strong className="text-foreground">Botner, tinder og egger:</strong> En <em>botnbre</em> graver en
          skålformet nisje inn i fjellsiden (botn/cirque), ofte med et botntjern. Når to botnbreer spiser seg inn
          fra hver sin side av fjellet, dannes en knivskarp fjellrygg (<em>egg / arête</em>, f.eks. Besseggen).
          Når tre eller flere botner møtes, står en sylspiss pyramidetind igjen (<em>horn / tind</em>, f.eks. Stetind og Matterhorn).
        </li>
      </ul>

      <ValleyCrossSectionDiagram />

      <h3 className="pt-4 font-display text-xl font-medium tracking-tight">
        Glasiale avsetningsformer: Morener og eskere
      </h3>
      <p>
        Alt materiale en isbre river løs, fraktes usortert med isen og avsettes som <strong>morenemateriale
        (till)</strong>:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
        <li>
          <strong className="text-foreground">Bunnmorene:</strong> Løsmasser presset ut under breens såle over
          hele landet. Kaotisk blanding av leire, sand og kjempeblokker.
        </li>
        <li>
          <strong className="text-foreground">Endemorene og Raet:</strong> Når brefronten ble liggende i ro over
          lengre tid (fordi snøtilvekst og smelting balanserte hverandre), fungerte breen som en gigantisk
          bulldoser som skjøv opp en mektig voll av stein og grus. Det mest berømte eksempelet er <strong>Raet</strong>,
          en enorm endemorenerygg dannet under kuldeperioden <em>Yngre Dryas</em> for ca. 12 800–11 700 år siden,
          som kan følges fra Østfold og Vestfold rundt hele kysten til Trøndelag og Nord-Norge (NGU, u.å.).
        </li>
        <li>
          <strong className="text-foreground">Esker:</strong> En slangeformet, langstrakt grusrygg avsatt av
          en smeltevannselv som rant i en lukket tunnel under innlandsisen mot slutten av istiden.
        </li>
      </ul>

      {/* ------------------------------------------------------------------ */}
      {/* 6. NORGES LANDSKAPSHISTORIE                                        */}
      {/* ------------------------------------------------------------------ */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Norges landskapshistorie — gamle vidder og unge fjorder
      </h2>
      <p>
        Norges storslåtte natur skyldes et fascinerende samspill mellom to vidt forskjellige generasjoner
        av landformer (Gjessing, 1978; Holtedahl, 1960):
      </p>

      <NorwegianLandscapeEvolutionDiagram />

      <div className="space-y-4 my-4">
        <div className="rounded-xl border border-sand/40 bg-card p-4 space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-sand">1. Gamle landformer</span>
          <h4 className="font-display text-lg font-bold">Den paleiske overflaten (Mesozoikum / Paleogen)</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            De store, rolige viddene (Hardangervidda, Finnmarksvidda), avrundede heiene og de vide dalene
            i innlandet er over 50–100 millioner år gamle. De ble formet gjennom et uhyre langt tidsrom med
            subtropisk klima og dyp kjemisk forvitring, som høvlet ned den gamle kaledonske fjellkjeden til et
            nesten flatt slettelandskap (et <em>peneplan</em>).
          </p>
        </div>

        <div className="rounded-xl border border-warm/40 bg-card p-4 space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-warm">2. Tertiær landheving</span>
          <h4 className="font-display text-lg font-bold">Skråstillingen av Skandinavia (Paleogen / Neogen)</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            For ca. 55 millioner år siden åpnet Norskehavet seg ved havbunnsspredning. I tertiærtiden ble
            den skandinaviske landblokken hevet skjevt opp — opptil 1500–2000 meter i vest, mens østsiden
            forble lav og skrånet slakt ned mot Østersjøen. Dette ga elvene voldsom fart mot vest og utløste
            kraftig tilbakeskridende elveerosjon inn i det gamle viddeplatået.
          </p>
        </div>

        <div className="rounded-xl border border-teal/40 bg-card p-4 space-y-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-teal">3. Unge landformer</span>
          <h4 className="font-display text-lg font-bold">Kvartære breer og strandflaten (&lt;2,6 mill. år)</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            I løpet av kvartærtidens mange istider ble de tertiære elvedalene invadert av mektige breer.
            Breene skar seg dypt ned og skapte Vestlandsfjordene, U-dalene og alpine tinder. Samtidig ble
            <strong>strandflaten</strong> erodert ut langs kysten: en lav, flat brem av tusenvis av øyer,
            holmer og skjær (0–50 moh) skapt av et unikt samspill mellom frostforvitring, brenninger og kystbreer
            (spesielt på Helgelandskysten).
          </p>
        </div>
      </div>

      <PhotoFigure
        src="/images/fig-fjellskred-fjord.jpg"
        alt="Dramatisk vestnorsk fjordlandskap med bratte fjellsider, U-dal og strandflate i forgrunnen"
        heading="Geomorfologisk kontrast: Fra fjordbunn til alpine tinder"
        caption="Et klassisk vestnorsk landskap der unge, dramatiske glasiale landformer (den overfordypede fjorden og de steile fjellsidene) skjærer seg dypt ned i den opprinnelige hevede landblokken. Langs slike bratte fjellsider er fjellet kontinuerlig utsatt for frostforvitring og storskala fjellskred."
        marks={[
          { x: 22, y: 30, n: "1", text: "Alpint fjellplatå", tone: "warm" },
          { x: 50, y: 65, n: "2", text: "U-dalsvegg", tone: "teal" },
          { x: 78, y: 82, n: "3", text: "Fjordbasseng", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Rest av den gamle tertiærhevede overflaten, overpreget av botnbreer." },
          { n: "2", label: "Over 1000 meter loddrett fjellvegg skuret og plukket ut av kvartære isbreer." },
          { n: "3", label: "Dyp fjord gravd ut langt under dagens havnivå." },
        ]}
      />

      {/* ------------------------------------------------------------------ */}
      {/* 7. INTERAKTIV GEOMORFOLOGISK MODELL                                */}
      {/* ------------------------------------------------------------------ */}
      <LandformGeomorphologyModel />

      {/* ------------------------------------------------------------------ */}
      {/* 8. KOMPETANSEMÅL, BEGREPER OG QUIZ                                 */}
      {/* ------------------------------------------------------------------ */}
      <Callout title="Kompetansemål (LK20 Geofag 1)">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Forvitring"
          def="Mekanisk oppsmuldring eller kjemisk omdanning av fast fjell på stedet uten transport."
        />
        <Term
          name="Erosjon"
          def="Løsrivelse og transport av forvitret bergartsmateriale med vann, is, vind eller tyngdekraft."
        />
        <Term
          name="Frostsprengning"
          def="Mekanisk forvitring der vann i sprekker utvider seg med 9 % ved frysing og sprenger fjellet."
        />
        <Term
          name="Hjulstrøms diagram"
          def="Graf som viser sammenhengen mellom vannets strømhastighet og erosjon, transport og avsetning."
        />
        <Term
          name="Kohesjonseffekt"
          def="Elektrostatisk binding mellom leirmineraler som gjør at avsatt leire krever høy strømhastighet for å eroderes."
        />
        <Term
          name="Meander"
          def="Buktende elvesving på slake sletter; eroderer i yttersvingen og avsetter sand i innersvingen."
        />
        <Term
          name="U-dal"
          def="Dal med flat bunn og bratte sider, utgravd av en isbre som fyller hele tverrsnittet."
        />
        <Term
          name="Fjord"
          def="En dyp, overfordypet U-dal som er gravd under havnivå og har en grunn terskel ved munningen."
        />
        <Term
          name="Endemorene"
          def="Rygg av usortert morenemateriale skjøvet opp foran brefronten under et langvarig stillstand."
        />
        <Term
          name="Raet"
          def="Norges største endemorene, dannet under kuldeperioden Yngre Dryas for ca. 12 000 år siden."
        />
        <Term
          name="Den paleiske overflaten"
          def="Eldgamle, bølgende vidder (Hardangervidda) formet under varmt mesozoisk klima før tertiærhevingen."
        />
        <Term
          name="Strandflaten"
          def="Lav, flat brem av øyer og skjær langs kysten (0–50 moh) formet av frost, bølger og is."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva er den fundamentale forskjellen på forvitring og erosjon?",
            options: [
              "Forvitring skjer bare i elver, mens erosjon skjer under isbreer.",
              "Forvitring bryter ned fjellet på stedet uten transport, mens erosjon innebærer løsrivelse og transport av materialet.",
              "Erosjon gjelder bare kjemisk forvitring.",
              "Det er ingen forskjell; de er to ord for nøyaktig samme prosess.",
            ],
            answer: 1,
            explain:
              "Forvitring skjer in situ. Så snart tyngdekraften, en elv eller en isbre flytter partiklene vekk, er det erosjon.",
          },
          {
            prompt: "Hva skyldes «leirparadokset» i Hjulstrøms diagram?",
            options: [
              "At leire flyter lettere enn luft.",
              "At leire er tyngre enn grus.",
              "At leirmineraler har elektriske ladninger som binder partiklene tett sammen (kohesjon), slik at det kreves høy strømhastighet for å rive dem løs.",
              "At leire alltid løses opp kjemisk i vann.",
            ],
            answer: 2,
            explain:
              "Elektrostatisk kohesjon mellom leirmineralenes plater gjør avsatt leire svært motstandsdyktig mot rennende vann. Sand eroderes derfor ved mye lavere hastighet enn finkornet leire.",
          },
          {
            prompt: "Hvorfor har de store norske fjordene (som Sognefjorden) en grunn terskel ved munningen mot havet?",
            options: [
              "Fordi mennesker bygde moloer der under vikingtiden.",
              "Fordi isbreen var tykkest og eroderte dypest inne i den trange dalen, mens den fløt ut, mistet tykkelse og la fra seg morenemateriale ved kysten.",
              "Fordi kalkstein har løst seg opp ytterst i fjorden.",
              "Fordi havnivået steg før istiden startet.",
            ],
            answer: 1,
            explain:
              "Breens erosjonskraft avhenger direkte av istykkelse og trykk. Inne i den trange fjorden overfordypet breen fjellet til over 1300 m dyp, mens den flatet ut og deponerte morene og bergterskler ytterst.",
          },
          {
            prompt: "Hvilken geologisk hendelse utløste dannelsen av Norges unge, dype fjorder og U-daler i den opprinnelig flate paleiske overflaten?",
            options: [
              "At Oslofeltet sank ned som en riftdal.",
              "Den asymmetriske landhevingen i tertiærtid da Atlanterhavet åpnet seg, som hevet Vestlandet opptil 2000 moh og ga elver og senere breer enorm fallhøyde og gravkraft.",
              "Meteorittnedslaget ved Gardnos.",
              "Dannelsen av Ra-morenen under Yngre Dryas.",
            ],
            answer: 1,
            explain:
              "Tertiærhevingen hevet den gamle paleiske flaten høyt opp mot vest. Dette senket den relative erosjonsbasis dramatisk og gjorde at elver og kvartære isbreer skar seg dypt ned i platået.",
          },
        ]}
      />
    </TopicLayout>
  );
}
