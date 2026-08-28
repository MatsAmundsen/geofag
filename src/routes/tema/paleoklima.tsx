import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { PaleoDiagram } from "@/components/diagrams/paleo";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";

export const Route = createFileRoute("/tema/paleoklima")({
  component: PaleoklimaPage,
});

function PaleoklimaPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Arkiv"
      title="Paleoklima"
      lead="Instrumentelle målinger dekker 150–170 år globalt. Mauna Loa har målt CO₂ siden 1958. Satellitt-havis siden 1979. Klimasystemet har tidsskalaer på tusener til millioner av år. Uten paleodata kan vi ikke teste om klimasensitivitet på 3 °C passer med istider og varmeperioder, se om dagens CO₂ og oppvarmingshastighet er enestående, eller studere terskler som ikke har slått ut i vår korte måleserie."
      banner="/images/fig-paleo.jpg"
      bannerAlt="Lagdelt blå breis med bølgende bånd av gammel is"
      videoTopic="paleoklima"
      prev={{ to: "/tema/numeriske-modeller", label: "Forrige: Numeriske modeller" }}
      next={{ to: "/tema/vaerkatastrofer", label: "Neste: Værkatastrofer" }}
    >
      <p>
        Kompetansemålet er ikke å fortelle istidshistorie. Det er hvordan arkivene blir til kunnskap
        som modeller og risikovurdering bruker. Kjeden: arkiv, datering, kalibrering mot moderne
        observasjon, rekonstruksjon med usikkerhet, sammenligning med modeller, constraint på
        framtiden. IPCC AR6 sier at paleoevidens bidro til å innsnevre ECS til beste anslag 3 °C,
        likely 2,5–4 °C. AR7 er ikke publisert.
      </p>

      <h2 className="font-display text-2xl font-medium tracking-tight">Proxy og iskjerne</h2>
      <p>
        En proxy er aldri temperaturen i ett bestemt forhistorisk år. Den er en fysisk eller
        biologisk størrelse som korrelerer med klima, med støy, sesongskjevhet og dateringsfeil.
        Flere uavhengige proxyer som konvergerer, slår én spektakulær kjerne.
      </p>
      <OrdBoks
        ord="proxy"
        barn="fysisk eller biologisk størrelse som korrelerer med klima, med støy; aldri temperaturen i ett bestemt forhistorisk år"
      />
      <p>
        Iskjernen er sylinder av is med årlige lag og innestengt luft. Luftboblene i antarktisk is
        er ekte fortidsatmosfære. CO₂-kurven over 800 000 år er derfor en måling, ikke en tolkning.
        EPICA Dome C dekker åtte sykluser. Laveste målte CO₂ i is: 172 ppm. Naturlig spenn i
        senkvartær: 172–300 ppm. Dagens 425+ ppm ligger langt utenfor. Vostok dekker 420 000 år og
        fire sykluser.
      </p>
      <OrdBoks
        ord="iskjerne"
        barn="sylinder av is med årlige lag og innestengt luft; boblene i antarktisk is er ekte fortidsatmosfære"
      />
      <p>
        Gassalderen er yngre enn isen rundt, fordi boblene lukkes på dybde. Det er en kjent
        usikkerhet når CO₂ og temperatur sammenlignes på hundreårsskala.
      </p>
      <p>
        δ¹⁸O er avviket i forholdet ¹⁸O/¹⁶O fra en standard. I is: lavere temperatur, lavere δ¹⁸O.
        Den tunge isotopen faller mer ut underveis mot polene. I marine karbonater blander δ¹⁸O
        vanntemperatur og globalt isvolum, fordi ¹⁶O låses i innlandsis under istid. Samme symbol,
        ulik prosess. Si hvilket arkiv.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Milanković</h2>
      <p>
        Tre orbitale perioder endrer innstrålingens fordeling, og bare svakt mengden. Eksentrisitet,
        ca. 100 000 år: banens ellipse. Helning, ca. 41 000 år: sterkere sesonger og mer sommersol
        på høye bredder når helningen er høy. Presesjon, ca. 23 000 og 19 000 år: når på året jorda
        er nærmest sola. Det styrer sommersmelting på 65 °N.
      </p>
      <OrdBoks
        ord="Milanković"
        barn="tre orbitale perioder som endrer innstrålingens fordeling (ikke mengden); styrer sommersmelting på 65 °N"
      />
      <p>
        Milanković starter deglasiasjoner ved å øke sommersol på nordlige høye bredder, slik at
        isdekker smelter. CO₂ og albedo forsterker og gjør endringen global. Det forklarer ikke
        1850–2026. Orbitale endringer er for trege, og går nå svakt mot svakere sommersol på 65 °N,
        altså mot langsom avkjøling over tusener av år. Det er det motsatte av observert oppvarming.
      </p>
      <p>
        Under deglasiasjon starter orbital innstråling, og CO₂ forsterker. I dag starter CO₂. Vi
        måler utslippene. Årsaksretningen er ikke evig én vei.
      </p>

      <PaleoDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Holocen</h2>
      <p>
        Kvartær er en serie glacialer og interglacialer. Holocen er nåværende mellomistid, fra ca.
        11 700 år før nå. Relativt stabil. Jordbruk og sivilisasjon vokste her. Siste
        glacialmaksimum ca. 21 000 år siden: Fennoskandisk isdekke over Norge, havnivå ca. 120 m
        lavere, CO₂ ca. 180–190 ppm.
      </p>
      <OrdBoks ord="holocen" barn="nåværende mellomistid, fra ca. 11 700 år før nå" />
      <p>
        AR6, medium confidence: den varmeste flerårhundresperioden for ca. 6500 år siden lå 0,2–1 °C
        over 1850–1900 globalt. Tiåret 2011–2020 ligger over dette. Oppvarmingen siden 1970 er
        raskere enn i noen annen 50-årsperiode på minst 2000 år, high confidence.
      </p>
      <p>
        En ny istid, orbitalt, ligger titusener av år fram. Høy CO₂ kan utsette den. Det er
        irrelevant for 2100-risiko.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Terskler, kort</h2>
      <p>
        PETM, ca. 56 millioner år siden: raskt karbonpådriv, flere grader global oppvarming og
        havforsuring. Utslippsraten den gang er anslått 5–10 ganger lavere enn dagens. Analog for at
        karbon kan varme flere grader. Dårlig analog for hastighet.
      </p>
      <p>
        8,2 ka: kort avkjøling i tidlig holocen, knyttet til smeltevann i Nord-Atlanteren. Sammen
        med yngre dryas er det eksistensbevis for at AMOC-terskelen finnes. De er ikke 1:1-analoger.
        Den gang fantes enorme issjøer og isdekker i Nord-Amerika. AR6: AMOC er very likely å svekke
        i det 21. århundre. Medium confidence for at et brått sammenbrudd ikke skjer før 2100.
      </p>
      <p>
        Paleodata straffer både ufølsomme og overfølsomme modeller. De minner om at beste anslag
        ikke er den eneste banen. Hale-utfall har skjedd.
      </p>

      <Callout title="Kompetansemål">
        <p>
          Gjøre rede for forskning på forhistorisk klima, og hvordan det bidrar til å lage prognoser
          for framtidens klima.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="proxy"
          def="fysisk eller biologisk størrelse som korrelerer med klima, med støy; aldri temperaturen i ett bestemt forhistorisk år"
        />
        <Term
          name="iskjerne"
          def="sylinder av is med årlige lag og innestengt luft; boblene i antarktisk is er ekte fortidsatmosfære"
        />
        <Term
          name="Milanković"
          def="tre orbitale perioder som endrer innstrålingens fordeling (ikke mengden); styrer sommersmelting på 65 °N"
        />
        <Term name="holocen" def="nåværende mellomistid, fra ca. 11 700 år før nå" />
      </TermGrid>
    </TopicLayout>
  );
}
