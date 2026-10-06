import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  FraBergartTilBruddDiagram,
  PetroleumSystemDiagram,
} from "@/components/diagrams/ressurser";
import { OreFormationModel, PetroleumTrapModel } from "@/components/models/resource-ore-petroleum-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("geologiske-ressurser")!;
const lenke = "text-primary underline-offset-2 hover:underline";

export const Route = createFileRoute("/geofag-1/geologiske-ressurser")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/geologiske-ressurser",
    }),
  component: GeologiskeRessurserPage,
});

function GeologiskeRessurserPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="En geologisk forekomst er ren naturhistorie. Den blir en ressurs først når metallinnhold, volum, utvinningsteknologi, markedspris, miljøkrav og samfunnets aksept gjør drift lønnsom. Her undersøker vi malmdannelse fra dype magmakamre og hydrotermale skorsteiner, petroleumssystemets intrikate fysikk, samfunnets kolossale forbruk av pukk og sand, samt den vanskelige avveiningen mellom det grønne skiftets mineralbehov og vern av sårbar natur."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/skred",
        label: "Forrige: Skred",
      }}
      next={{
        to: "/geofag-1/feltarbeid",
        label: "Neste: Feltarbeid",
      }}
      kilder={KILDER.ressurser}
      posterSlug="geologiske-ressurser"
      bodyMode="coded"
    >
      <Callout title="Kompetansemål i LK20 (Geofag 1)">
        <p>
          Målet for kapittelet er at eleven skal kunne{" "}
          <em>
            gjøre rede for danning, kartlegging og utvinning av geologiske ressurser, og drøfte utnyttelse av geologiske ressurser
            i et bærekraftsperspektiv.
          </em>
        </p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Kjerneelementer som dekkes i dette kapittelet:</strong></p>
          <p>• <em>Malmgeologi og anrikingsprosesser:</em> Magmatisk fraksjonering, hydrotermale VMS-malmer, sedimentære BIF og konsentrasjonsfaktor.</p>
          <p>• <em>Petroleumssystemet:</em> Kildebergart, kerogenmodning (olje-/gassvinduet), sekundær migrasjon, reservoarporøsitet, felletyper og takbergart.</p>
          <p>• <em>Byggeråstoffer og industrimineraler:</em> Pukk, grus, larvikitt som nasjonalbergart og mekaniske kvalitetskrav.</p>
          <p>• <em>Bærekraft og miljøkonflikter:</em> Sjødeponi vs. landdeponi, sur gruveavrenning (AMD), Engebø-dommen i Høyesterett og det grønne paradoks.</p>
        </div>
      </Callout>

      {/* 1. HVA ER EN GEOLOGISK RESSURS? */}
      <CollapsibleSection
        title="Hva er en geologisk ressurs? Konsentrasjonsfaktor og forsyningssikkerhet"
        subtitle="Forekomst vs. reserve, cut-off grade og kritiske råstoffer"
        badge="Ressursøkonomi"
        badgeVariant="teal"
        defaultOpen={true}
      >
        <p>
          Det er en vanlig misforståelse at metaller og mineraler ligger som rene klumper i fjellet.
          I gjennomsnittlig jordskorpe finnes det for eksempel bare rundt <strong>0,006 % kobber (60 ppm)</strong> og
          <strong> 0,0000004 % gull (4 ppb)</strong>. Hvis vi skulle knuse vanlig granitt eller gneis for å utvinne kobber,
          ville energikostnadene være astronomiske og avfallsmengden uoverkommelig.
        </p>
        <p>
          For at en geologisk mineralansamling skal kunne kalles en <strong>malm</strong>, må naturens egne geologiske
          prosesser allerede ha anriket metallet mange hundre eller tusen ganger over jordskorpens gjennomsnitt.
        </p>

        <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 text-xs font-mono space-y-2 my-4">
          <p className="font-semibold text-primary font-sans text-sm">Konsentrasjonsfaktor (CF):</p>
          <p className="text-foreground text-sm font-bold">CF = C_malm / C_skorpe</p>
          <p className="text-muted-foreground font-sans text-xs pt-1">
            Hvor <em>C_malm</em> er metallgehalten i malmforekomsten, og <em>C_skorpe</em> er gjennomsnittlig konsentrasjon i jordskorpen.
            For jern er en anriking på 4–5× tilstrekkelig (fra ~5 % til &gt;25 % Fe), mens kobber krever ~100× anriking
            (fra 0,006 % til &gt;0,6 % Cu) og gull krever over 1000–2000× anriking for å være driveverdig.
          </p>
        </div>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          De fire avgjørende faktorene for driveverdighet
        </h3>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>1. Gehalt og brytegrense (Cut-off grade):</strong> Gehalten er prosentandelen verdifullt metall i fjellet.
            Brytegrensen er den laveste gehalten et parti kan ha for at verdien av metallet overstiger kostnaden ved å bryte,
            knuse og opprede det. Alt fjell med gehalt under brytegrensen regnes som <strong>gråberg</strong> og havner på avgangsdeponiet.
          </li>
          <li>
            <strong>2. Totalvolum og geometri:</strong> Selv en ekstremt rik åre med 10 % kobber er ulønnsom dersom den bare
            er 10 cm bred og 5 meter lang. Det kreves store tonnasjer for å forsvare investeringer i knuseverk, gruveganger og transport.
          </li>
          <li>
            <strong>3. Råvarepriser på verdensmarkedet:</strong> Bergarten i fjellet forandrer seg ikke, men en forekomst kan
            forvandles fra verdiløs stein til en milliardressurs over natten dersom metallprisen stiger på London Metal Exchange (LME).
          </li>
          <li>
            <strong>4. Samfunnets godkjenning (Social license to operate) og miljøkrav:</strong> Strengere krav til utslipp,
            avgangsdeponering og bevaring av biologisk mangfold kan gjøre prosjekter juridisk eller økonomisk umulige selv om
            geologien er førsteklasses.
          </li>
        </ul>

        <div className="rounded-xl border border-border bg-card p-4 my-4 space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Kritiske råstoffer (Critical Raw Materials - CRM)</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            EU og Norge oppdaterer jevnlig lister over <em>kritiske og strategiske råstoffer</em>. Dette er mineraler som er
            uunnværlige for moderne høyteknologi, forsvarsmateriell og det grønne skiftet (elbilbatterier, vindturbiner, solceller),
            og der forsyningen er sårbar fordi utvinningen eller foredlingen kontrolleres av få land (f.eks. Kina for sjeldne jordarter/REE
            og grafitt, Kongo for kobolt). Norge har betydelige forekomster av sjeldne jordarter (Fensfeltet i Telemark),
            titan (Tellnes og Engebø), grafitt (Senja) og fosfat (Eigersund).
          </p>
        </div>
      </CollapsibleSection>

      {/* 2. MALMDANNENDE PROSESSER */}
      <CollapsibleSection
        title="Malmdannende prosesser: Fra magmatisk krystallisasjon til havbunnens varme kilder"
        subtitle="Magmatiske kumulater, hydrotermale VMS-malmer og sedimentære avsetninger"
        badge="Malmdannelse"
        badgeVariant="amber"
      >
        <p>
          Når vi gjør rede for dannelsen av en malmforekomst i geofag, må vi forklare hvilke mekanismer i bergartskretsløpet
          som har konsentrert metallene. Vi deler malmdannelsen inn i tre geologiske hovedgrupper:
        </p>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          1. Magmatiske malmer (Fraksjonert krystallisasjon)
        </h3>
        <p>
          Dannes direkte i et magmakammer når smeltet stein fra mantelen eller dyp skorpe avkjøles.
          Ifølge Bowens reaksjonsserie krystalliserer mineraler ved bestemte temperaturer. Tunge oksider og sulfider
          kan skilles ut gjennom to mekanismer:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Gravitasjonsdifferensiering (Kumulater):</strong> Mineraler som <em>kromitt</em> (FeCr₂O₄) og
            <em> titanomagnetitt</em> (Fe-Ti) har langt høyere tetthet enn silikatsmelten (~4,5–5,2 g/cm³ mot ~2,7 g/cm³).
            Når de krystalliserer tidlig ved 1100–1200 °C, synker de ned gjennom smelten og danner tette, metallrike
            kumulatlag på bunnen av magmakammeret. Eksempel: Tellnes i Sokndal (Rogaland), verdens største ilmenittforekomst
            i produksjon (titanråstoff).
          </li>
          <li>
            <strong>Sulfid-ublandbarhet (Liquation):</strong> I mafiske smelter rike på svovel kan det oppstå dråper av
            flytende metallsulfidsmelte (Fe-Ni-Cu) som ikke lar seg blande med silikatsmelten (akkurat som olje i vann).
            Disse tunge sulfiddråpene synker til bunns og danner massive nikkel-kobber-forekomster (f.eks. Sudbury i Canada og
            Flåt gruve i Evje).
          </li>
        </ul>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          2. Hydrotermale malmer (Varme vandige løsninger)
        </h3>
        <p>
          Hydrotermale prosesser er ansvarlige for en stor andel av verdens kobber-, sink-, bly-, sølv- og gullforekomster.
          Mekanismen forutsetter tre ledd: en varmekilde (magma), oppsprukket fjell med høy permeabilitet, og vann som sirkulerer:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Vulkanogene massive sulfider (VMS / Black Smokers):</strong> På havbunnen langs midthavsrygger og
            vulkanske øybuer trenger kaldt sjøvann (2 °C) ned gjennom sprekker i den nydannede havbunnsskorpen.
            Nær det underliggende magmakammeret varmes vannet opp til 350–400 °C. Under dette enorme trykket blir vannet
            ekstremt surt og aggressive hydrotermale fluider vasker ut metallioner (Cu²⁺, Zn²⁺, Fe²⁺, Pb²⁺) og svovel (H₂S)
            fra basaltfjellet.
          </li>
          <li>
            Når den overopphetede metalløsningen strømmer opp og spys ut i det iskalde havvannet på havbunnen, sjokk-kjøles
            væsken. Metallene felles momentant ut som ørsmå sulfidpartikler som danner svarte røyksøyler («black smokers»)
            og bygger opp massive sulfidmalmer av <strong>kalkopyritt (CuFeS₂)</strong>, <strong>sfaleritt (ZnS)</strong> og
            <strong> pyritt (FeS₂)</strong>.
          </li>
        </ul>

        <PhotoFigure
          src="/images/geo-midthavsrygg-hydrotermal.jpg"
          alt="Hydrotermal skorstein og black smoker på midthavsryggen som spyr ut 350 graders metallsulfider i det mørke dyphavet"
          heading="Hydrotermal skorstein (Black Smoker) og VMS-malmdannelse"
          caption="Langs den vulkanske midthavsryggen trenger sjøvann kilometervis ned i havbunnsskorpen, varmes til 350–400 °C og løser opp metaller. Når den skoldende væsken møter det 2 grader kalde havvannet, felles kobber-, sink- og jernsulfider ut på havbunnen. De berømte norske kobbergruvene på Røros, Løkken og Sulitjelma var opprinnelig slike havbunnsforekomster dannet i Iapetushavet for over 450 millioner år siden."
          marks={[
            { x: 50, y: 35, n: "1", text: "Sulfidrøyk", tone: "warm" },
            { x: 50, y: 70, n: "2", text: "Massiv sulfidskorstein", tone: "cold" },
          ]}
          points={[
            { n: "1", label: "Black smoker utblåsning: Overopphetet hydrotermal væske mettet med oppløst kobber, sink og jern ved 350 °C." },
            { n: "2", label: "VMS-malmkropp: Mineralene felles ut som kalkopyritt (CuFeS₂), sfaleritt (ZnS) og svovelkis (FeS₂). Kaledonsk platekollisjon skjøv disse havbunnsmalmene inn over Norges fastland som ofiolittfragmenter." },
          ]}
        />

        <div className="my-6">
          <FraBergartTilBruddDiagram />
        </div>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          3. Sedimentære og residuale malmer
        </h3>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Båndet jernmalm (BIF - Banded Iron Formation):</strong> For 2,5 til 1,8 milliarder år siden var urhavet
            fritt for oksygen og mettet med oppløst toverdig jern (Fe²⁺). Da fotosyntetiserende cyanobakterier begynte å
            produsere O₂, reagerte jernet momentant og falt ned på havbunnen som vekslende striper av magnetitt/hematitt
            og silika. Eksempel: Sydvaranger jernmalmgruve i Kirkenes.
          </li>
          <li>
            <strong>Placer-forekomster (Tungmineraler):</strong> Elver eroderer fjell og sorterer korn etter tetthet
            og størrelse. Kjemisk motstandsdyktige mineraler med svært høy tetthet (gull: 19,3 g/cm³, rutil: 4,2 g/cm³,
            kassiteritt: 7,0 g/cm³) faller til bunns i elveløpet der strømhastigheten avtar (i innersvinger og jettegryter).
            Eksempel: Gull i elvene i Finnmark.
          </li>
        </ul>
      </CollapsibleSection>

      {/* 3. INTERAKTIV MALMDANNELSESMODELL */}
      <CollapsibleSection
        title="Interaktiv simulator: Malmdannende prosesser"
        subtitle="Utforsk hydrotermal sirkulasjon, magmatisk krystallisasjon og sedimentær anriking"
        badge="Interaktiv modell"
        badgeVariant="positive"
      >
        <p className="text-sm text-muted-foreground">
          Eksperimenter med fysiske og kjemiske parametere for å se hvordan magmatemperatur,
          infiltrasjonsdybde og sprekketetthet avgjør hvilke metaller som felles ut og hvor rike malmforekomstene blir.
        </p>

        <OreFormationModel />
      </CollapsibleSection>

      {/* 4. PETROLEUMSSYSTEMET */}
      <CollapsibleSection
        title="Petroleumssystemets anatomi: Kildebergart, modning, migrasjon og reservoarer"
        subtitle="De fem brikkene som må klaffe for at olje og gass skal dannes og bevares"
        badge="Petroleum"
        badgeVariant="sky"
      >
        <p>
          Olje og naturgass er hydrokarboner dannet fra mikroskopisk organisk materiale (hovedsakelig encellet marint
          plante- og dyreplankton) som sank til bunns i oksygenfattige havbassenger for millioner av år siden.
          Det er en myte at olje stammer fra dinosaurer.
        </p>
        <p>
          For at en kommersiell petroleumsforekomst skal eksistere på norsk kontinentalsokkel, må <strong>fem uavhengige
          geologiske brikker</strong> ligge perfekt til rette i tid og rom:
        </p>

        <div className="my-6">
          <PetroleumSystemDiagram />
        </div>

        <ol className="list-decimal pl-6 space-y-3 text-sm text-foreground/90">
          <li>
            <strong>1. Kildebergart (Source rock):</strong> En finkornet, organisk rik leirskifer avsatt under anoksiske
            (oksygenfrie) forhold på havbunnen. På norsk sokkel er <strong>Draupneformasjonen</strong> (avsatt i øvre jura for
            ca. 150 millioner år siden) hovedkildebergarten for nesten all olje og gass i Nordsjøen. Skiferen inneholder opptil
            5–10 % organisk karbon i form av <em>kerogen</em> (type II marint kerogen).
          </li>
          <li>
            <strong>2. Termisk modning (Olje- og gassvinduet):</strong> Etter hvert som nye sedimentlag ble avsatt oppå skiferen,
            sank den dypere ned i jordskorpen der trykket og temperaturen økte langs den geotermiske gradienten (~30 °C per km):
            <ul className="list-disc pl-6 pt-1 space-y-1 text-xs text-muted-foreground">
              <li>Under 80 °C (dybde &lt;2 km): Umoden kerogen, ingen oljedannelse.</li>
              <li><strong>80–120 °C (dybde ca. 2–4 km): Oljevinduet.</strong> Kerogenet krakkes termisk til flytende petroleum (råolje).</li>
              <li><strong>120–150 °C (dybde ca. 4–5 km): Våtgassvinduet.</strong> Oljen brytes videre ned til lettere gasser (kondensat og gass).</li>
              <li><strong>&gt;150 °C (dybde &gt;5 km): Tørrgassvinduet.</strong> Kun metangass (CH₄) overlever; dypere enn dette blir hydrokarbonene destruert til grafitt.</li>
            </ul>
          </li>
          <li>
            <strong>3. Migrasjon (Primær og sekundær):</strong> Når oljen dannes, utvider volumet seg kraftig, noe som sprenger
            mikrosprekker i kildebergarten (primærmigrasjon). Deretter stiger petroleumen oppover gjennom porøse bærehorisonter
            fordi olje (~0,8 g/cm³) og gass (~0,2 g/cm³) har lavere tetthet enn salt formasjonsvann (~1,1 g/cm³) – ren hydrostatisk oppdrift!
          </li>
          <li>
            <strong>4. Reservoarbergart (Reservoir rock):</strong> En geologisk formasjon med høy <em>porøsitet</em> (hulrom mellom
            kornene der væsken kan lagres, typisk 15–30 %) og høy <em>permeabilitet</em> (forbindelse mellom hulrommene slik at
            oljen kan strømme mot produksjonsbrønnen). Typiske norske reservoarer:
            <ul className="list-disc pl-6 pt-1 space-y-1 text-xs text-muted-foreground">
              <li><strong>Brentgruppen (Jura):</strong> Porøs elvedelta- og strandsandstein (Statfjord, Gullfaks, Oseberg).</li>
              <li><strong>Krittreservoaret på Ekofisk:</strong> Oppsprukket kritt (kokkolittkalk avsatt i kritt-tiden på ~3000 m dyp).</li>
            </ul>
          </li>
          <li>
            <strong>5. Felle og takbergart (Trap and seal):</strong> Uten en felle vil petroleumen fortsette å stige helt opp til
            havoverflaten og fordampe eller brytes ned av bakterier. En <strong>felle</strong> er en geometrisk struktur som stopper
            oppdriften, forseglet av en impermeabel <strong>takbergart</strong> (tett leirskifer eller salter med ekstremt høyt kapillært
            inntrengningstrykk).
          </li>
        </ol>
      </CollapsibleSection>

      {/* 5. INTERAKTIV PETROLEUMSFELLEMODELL */}
      <CollapsibleSection
        title="Interaktiv modell: Petroleumsfeller og reservoarmekanikk"
        subtitle="Undersøk antiklinaler, forkastningsfeller, saltdiapirer og takbergartens tetningsevne"
        badge="Interaktiv modell"
        badgeVariant="positive"
      >
        <p className="text-sm text-muted-foreground">
          Utforsk de fire klassiske petroleumsfellene: antiklinal, forkastningsfelle, saltdiapir og stratigrafisk utkniping.
          Test hva som skjer med væskelagdelingen når gassandelen endres, eller hva som inntreffer dersom takbergartens
          forsegling svikter og oljen lekker ut.
        </p>

        <PetroleumTrapModel />
      </CollapsibleSection>

      {/* 6. BYGGERÅSTOFFER OG NATURSTEIN */}
      <CollapsibleSection
        title="Byggeråstoffer og naturstein: Samfunnets gigantforbruk"
        subtitle="Pukk, grus og larvikitt som Norges nasjonalbergart"
        badge="Mineralske råstoffer"
        badgeVariant="neutral"
      >
        <p>
          Når vi diskuterer geologiske ressurser, tenker mange automatisk på gull eller olje. Men målt i samfunnsmessig
          betydning og fysisk volum er <strong>byggeråstoffer (pukk, sand og grus)</strong> Norges suverent største mineraluttak:
        </p>
        <p>
          I Norge forbrukes det årlig over <strong>70–80 millioner tonn pukk og grus</strong> – det tilsvarer rundt
          <strong> 14–15 tonn per innbygger hvert eneste år</strong>! Hver meter vei, hver jernbanetrasé, hver betongbygning
          og hver flyplass hviler på knust stein fra geosfæren.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="text-sm font-semibold text-amber-400">Pukk (Knust fast fjell)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fast fjell (gneis, granitt, kvartsitt, gabbro eller amfibolitt) sprenges ut i dagbrudd og knuses mekanisk i
              siktede fraksjoner. Pukk til asfalt og jernbaneballast må oppfylle strenge mekaniske krav:
              <strong> Los Angeles-testen</strong> (motstand mot knusing og støt) og <strong>micro-Deval-testen</strong> (motstand mot slitasje fra piggdekk).
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="text-sm font-semibold text-teal-400">Sand og grus (Løsmasserester)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Naturlig sorterte avsetninger fra istidens breelver (glasifluviale deltaer og eskere). Sand og grus er en
              <strong> ikke-fornybar ressurs</strong> på menneskelige tidsskalaer. De beste forekomstene er i dag sterkt
              nedbygd eller vernet av hensyn til grunnvannsforsyning og jordvern. Pukk erstatter derfor stadig mer naturlig grus.
            </p>
          </div>
        </div>

        <PhotoFigure
          src="/images/fig-dagbrudd.jpg"
          alt="Åpent steinbrudd i fast gneis med bruddpaller, stuff og knuseverk ved en norsk fjord"
          heading="Åpent dagbrudd for uttak av pukk og byggeråstoffer"
          caption="Et moderne pukkverk drives med terrasserte benker (paller) for å ivareta stabilitet og HMS. Fjellet bores, sprenges med emulsjonssprengstoff og fraktes til mobile knuseverk. Fordi transportkostnadene for stein er svært høye per tonnkilometer, ligger pukkverk enten nær store byer eller ved dypvannskai for sjøverts bulkeksport til Europa (f.eks. Jelsa i Rogaland, Europas største pukkverk)."
          marks={[
            { x: 30, y: 40, n: "1", text: "Bruddpall / Stuff", tone: "warm" },
            { x: 75, y: 65, n: "2", text: "Knuste fraksjoner", tone: "cold" },
          ]}
          points={[
            { n: "1", label: "Pallhøyde og bergsikring: Pallene sprenges vanligvis i 10–15 meters høyder for å forhindre ukontrollerte steinsprang." },
            { n: "2", label: "Logistikk og transport: Stein kan ikke fraktes lønnsomt med lastebil over mer enn 30–50 km. Pukkverk ved sjøen kan derimot eksportere millioner av tonn direkte til Nederland og Tyskland med bulkskip." },
          ]}
        />

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
          Naturstein og Larvikitt – Norges nasjonalbergart
        </h3>
        <p>
          Mens pukk knuses, er <strong>naturstein</strong> stein som sages, spaltes eller hugges til blokker og fliser
          der bergartens naturlige estetiske farge, struktur og slitestyrke utnyttes:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Larvikitt (Norges nasjonalbergart):</strong> En sjelden magmatisk dypbergart (monzonitt) dannet i Oslofeltets
            riftfase for ca. 290 millioner år siden i perm. Den brytes utelukkende i Larvik-området i Vestfold.
            Det unike kjennetegnet er dens spektakulære blå eller sølvaktige fargespill (<em>labradorescens</em>), forårsaket av
            submikroskopiske lamellære sammenvoksninger (avblandingslameller) mellom alkalifeltspat og plagioklas.
            Larvikitt er Norges viktigste natursteineksport og pryder fasader og hotellobbyer over hele verden.
          </li>
          <li>
            <strong>Skifer og marmor:</strong> Metamorfe bergarter som Altaskifer (kvartsittskifer, ekstremt frostbestandig)
            og Ottaskifer (fyllittskifer med vakre krystaller av amfibol og granat), samt marmor fra Fauske.
          </li>
        </ul>
      </CollapsibleSection>

      {/* 7. BÆREKRAFT, MILJØKONFLIKTER OG ENGEBØ */}
      <CollapsibleSection
        title="Bærekraft, sirkulærøkonomi og miljøkonflikter: Engebø-saken og det grønne skiftet"
        subtitle="Sjødeponi, sur gruveavrenning (AMD), urfolk og EUs vanndirektiv"
        badge="Drøfting & Miljø"
        badgeVariant="warning"
      >
        <p>
          All utvinning av geologiske ressurser representerer et fysisk inngrep i naturen. Samtidig krever det grønne
          skiftet enorme mengder mineraler: En elbil krever omtrent seks ganger mer mineraler enn en fossilbil, og en havvindpark
          krever opptil ti ganger mer metaller enn et tradisjonelt gasskraftverk. Dette kalles ofte <strong>det grønne mineralparadokset</strong>:
          Vi må åpne gruver for å redde klimaet, men gruver truer lokalt naturmangfold og urfolksinteresser.
        </p>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Gruvedriftens sentrale miljøutfordringer
        </h3>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Avgangshåndtering (Tailings):</strong> I en kobberforekomst med 1 % Cu utgjør 99 % av den sprengte
            bergmassen verdiløs sand og støv (avgang). Hvor skal dette deponeres? Landdeponier krever store arealer og
            kan lekke ved dambrudd. Sjødeponi (deponering på dypt hav/fjordbunn) kveler bunnfaunaen lokalt, men unngår
            kontakt med oksygen.
          </li>
          <li>
            <strong>Sur gruveavrenning (Acid Mine Drainage - AMD):</strong> Når sulfidmineraler som <em>pyritt (svovelkis, FeS₂)</em>
            blottlegges for atmosfærisk oksygen og vann, oksideres sulfidet kjemisk til svovelsyre:
            <br />
            <code className="text-rose-400 font-mono text-xs">4FeS₂ + 15O₂ + 14H₂O → 4Fe(OH)₃(s) + 8SO₄²⁻ + 16H⁺</code>.
            <br />
            Den kraftige syren senker pH i vassdrag til 2–3 og løser opp giftige tungmetaller (kobber, kadmium, sink)
            som dreper alt fiskeliv (slik det historisk skjedde ved gruvene på Løkken og Folldal).
          </li>
        </ul>

        <div className="my-4 rounded-xl border border-amber-500/40 bg-amber-950/20 p-5 space-y-3">
          <h4 className="text-base font-semibold text-amber-300">
            Casestudie: Engebøfjellet og Førdefjorden – En geofaglig og juridisk drøfting
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            På Engebøfjellet i Vestland finnes en av verdens rikeste forekomster av <strong>rutil (titanråstoff, TiO₂)</strong> og
            <strong> granat (industrimineral)</strong> i bergarten eklogitt. Prosjektet innebærer uttak av fjellet og deponering av
            avgangsmasser med kjemiske flokkuleringsmidler på 300 meters dyp i Førdefjorden, en nasjonal laksefjord.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="rounded-lg bg-card/60 p-3 border border-border">
              <span className="font-semibold text-primary">Argumenter for utvinning:</span>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                Titan er definert som et kritisk råstoff av EU. Rutil gir renere titandioksid til flydeler, proteser og hvitpigmenter
                enn syntetiske alternativer. Prosjektet skaper hundrevis av distriktsarbeidsplasser og reduserer Europas importavhengighet.
                Sjødeponi forhindrer sur avrenning fordi fjellet nesten ikke inneholder svovel.
              </p>
            </div>
            <div className="rounded-lg bg-card/60 p-3 border border-border">
              <span className="font-semibold text-rose-400">Argumenter mot (Miljø og jus):</span>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                Deponering av opptil 170 millioner tonn avgangsmasser begraver bunndyr og ålekvabbesamfunn i et stort fjordområde.
                Føre-var-prinsippet utfordres i en nasjonal laksefjord.
                <strong> 17. juni 2026 kjente Norges Høyesterett driftstillatelsene ugyldige</strong> fordi statens begrunnelse
                ikke oppfylte kravene i EUs vanndirektiv om å utrede miljømessig bedre alternativer før forringelse tillates.
              </p>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground pt-1 italic">
            Geofaglig lærdom: Geologisk forekomst og milliard-investeringer er aldri en garanti for drift.
            Juss, internasjonale miljødirektiver og samfunnsverdier kan stoppe et gruveprosjekt fullstendig.
          </p>
        </div>
      </CollapsibleSection>

      {/* 8. NØKKELBEGREPER OG QUIZ */}
      <CollapsibleSection
        title="Nøkkelbegreper og eksamensrettet quiz"
        subtitle="Kvalitetssikring for privatister og VG3 Geofag 1"
        badge="Begreper & Test"
        badgeVariant="neutral"
      >
        <h3 className="font-display text-xl font-medium tracking-tight">Viktige faglige begreper</h3>
        <TermGrid>
          <Term name="malm" def="bergart med høyt nok metallinnhold til at utvinning gir økonomisk overskudd" />
          <Term name="konsentrasjonsfaktor" def="hvor mange ganger et metall er anriket i en forekomst sammenlignet med jordskorpens gjennomsnitt" />
          <Term name="cut-off grade" def="den laveste gehalten av et metall i bergmassen som er lønnsom å bryte og behandle" />
          <Term name="VMS (Black smoker)" def="vulkanogene massive sulfider dannet av hydrotermale oppløsninger på havbunnen" />
          <Term name="oljevinduet" def="temperaturområdet (80–120 °C på 2–4 km dyp) der organisk kerogen omdannes termisk til olje" />
          <Term name="takbergart (seal)" def="impermeabel bergart (som leirskifer eller salt) som forhindrer hydrokarboner i å migrere til overflaten" />
          <Term name="larvikitt" def="Norges nasjonalbergart; dypbergart (monzonitt) fra Oslofeltet med karakteristisk blå labradorescens" />
          <Term name="sur gruveavrenning" def="dannelse av svovelsyre ved oksidasjon av pyritt (FeS2) ved kontakt med luft og vann" />
        </TermGrid>

        <div className="mt-8 border-t border-border/60 pt-6">
          <h3 className="font-display text-xl font-medium tracking-tight mb-2">
            Eksamensrettet flervalgsquiz (LK20 Geofag 1)
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Test dine kunnskaper om malmdannelse, petroleumsgeologi og ressursforvaltning:
          </p>

          <Quiz
            questions={[
              {
                prompt: "Hva er den geologiske hovedkilden for oljen og gassen på norsk kontinentalsokkel (f.eks. i Nordsjøen)?",
                options: [
                  "Forsteinede dinosaurer begravd under kritt-tiden.",
                  "Draupneformasjonen: En organisk rik marin leirskifer dannet av mikroskopisk plankton i øvre jura for ca. 150 millioner år siden.",
                  "Selve sandsteinen i Brentgruppen som ble dannet av vulkansk aske.",
                  "Larvikitt-intrusjoner fra perm som lekket olje inn i sedimentene.",
                ],
                answer: 1,
                explain:
                  "Olje kommer ikke fra dinosaurer. Den oppsto da encellede marine planktonalger døde og sank ned i oksygenfattige jura-havbassenger. Trykk og temperatur ved 80–120 °C omdannet deretter kerogenet til olje.",
              },
              {
                prompt: "Hvorfor kaller vi dannelsen av kobber- og sinkmalmene på Røros og Løkken for 'VMS-malmer' (Vulkanogene massive sulfider)?",
                options: [
                  "Fordi de ble dannet av flytende lava som rant ut over kontinentet under istiden.",
                  "Fordi de opprinnelig ble felt ut som metallsulfider fra skoldende hydrotermale væsker (black smokers) på havbunnen i Iapetushavet nær midthavsrygger, før de ble skjøvet inn over Norge under den kaledonske kollisjonen.",
                  "Fordi de oppsto ved kjemisk forvitring av kalkstein i Oslofeltet.",
                  "Fordi de ble dannet av meteorittnedslag som smeltet granittisk jordskorpe.",
                ],
                answer: 1,
                explain:
                  "VMS-malmer oppstår på havbunnen ved hydrotermal sirkulasjon. Under den kaledonske fjellkjededannelsen for ca. 420 millioner år siden kolliderte Grønland og Norge, og disse havbunnsavsetningene ble skjøvet hundrevis av kilometer inn over det baltiske grunnfjellet som ofiolittdekker.",
              },
              {
                prompt: "Hva er den avgjørende forskjellen mellom en 'mineralforekomst' og en 'malm' i økonomisk geologi?",
                options: [
                  "En mineralforekomst inneholder bare jern, mens malm alltid inneholder edelmetaller som gull.",
                  "En mineralforekomst er en ren geologisk ansamling av mineraler, mens en malm er en forekomst der konsentrasjonen, volumet og markedsprisen gjør utvinning bedriftsøkonomisk lønnsom.",
                  "Malm finnes bare i dype underjordsgruver, aldri i dagbrudd.",
                  "Det er ingen forskjell; malm er bare det svenske ordet for mineralforekomst.",
                ],
                answer: 1,
                explain:
                  "En forekomst er rent geologisk. Den blir en malm først når innhold, volum, teknologi, metallpriser, miljøkrav og politisk godkjenning gjør brytingen lønnsom. Bergarten endrer seg ikke, men ressursstatusen kan svinge med markedet.",
              },
              {
                prompt: "Hvilken kjemisk reaksjon er ansvarlig for sur gruveavrenning (Acid Mine Drainage - AMD)?",
                options: [
                  "Oppløsning av kalkstein med karbonsyre som senker pH til nøytralt nivå.",
                  "Oksidasjon av pyritt (FeS₂) ved kontakt med atmosfærisk oksygen og vann, som danner svovelsyre (H₂SO₄) og frigjør oppløste giftige tungmetaller.",
                  "Fordampning av formasjonsvann i petroleumsreservoaret.",
                  "Hydrolyse av kvarts til leirmineraler i et ørkenklima.",
                ],
                answer: 1,
                explain:
                  "Når svovelkis (pyritt) i gråberg og avgangsmasser utsettes for luft og vann, dannes svovelsyre (4FeS₂ + 15O₂ + 14H₂O → 4Fe(OH)₃ + 8SO₄²⁻ + 16H⁺). Syren forurenser elver og løser ut giftige metaller.",
              },
              {
                prompt: "Hva er Norges nasjonalbergart, og hva skyldes dens karakteristiske blå fargespill?",
                options: [
                  "Gneis, og fargespillet skyldes høyt innhold av gull og glimmer.",
                  "Larvikitt; en monzonittisk dypbergart der fargespillet (labradorescens) skyldes submikroskopiske avblandingslameller mellom to feltspattyper.",
                  "Eklogitt; dannet under ultrahøyt trykk på Vestlandet.",
                  "Kritt; dannet av mikroskopiske kokkolittoforer i Nordsjøen.",
                ],
                answer: 1,
                explain:
                  "Larvikitt ble kåret til Norges nasjonalbergart i 2008. Den finnes kun i Oslofeltet og har et unikt fargespill som oppstår ved lysbrytning i mikroskopiske lameller mellom alkalifeltspat og plagioklas.",
              },
            ]}
          />
        </div>
      </CollapsibleSection>
    </TopicLayout>
  );
}
