import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { FigurePlaceholder, PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";

export const Route = createFileRoute("/tema/jetstrommer")({
  component: JetstrommerPage,
});

function JetstrommerPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Atmosfæren"
      title="Jetstrømmer"
      lead="Jetstrømmen er et smalt belte med sterk vestavind i øvre troposfære. Det er to slike belter, ikke ett. Polarfrontjeten ligger over polarfronten, der kald polarluft møter mildere luft fra sør. Den ligger på midlere til høye breddegrader, typisk 50–70°, men den meandrerer. Høyden er typisk 8–12 km. Den styrer de ekstratropiske lavtrykkene inn mot Norge. Den subtropiske jetstrømmen ligger nær 30° bredde, ved Hadleycellens polvegg. Den henger sammen med nedsynkingen i subtropene. Begge er vestlige fordi coriolis dreier den polgående øvre strømmen."
      banner="/images/fig-jet.jpg"
      bannerAlt="Tynn, rask skyelv høyt over havet mot jordas krumning"
      videoTopic="jetstrømmer"
      prev={{ to: "/tema/vindsystemet", label: "Forrige: Vindsystemet" }}
      next={{ to: "/tema/coriolis", label: "Neste: Corioliseffekten" }}
      kilder={KILDER.jetstrommer}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva det er, typer og hvor
      </h2>
      <p>
        Jetstrømmen er et smalt belte med sterk vestavind i øvre troposfære. Det er to slike belter,
        ikke ett.
      </p>
      <p>
        Polarfrontjeten ligger over polarfronten, der kald polarluft møter mildere luft fra sør. Den
        ligger på midlere til høye breddegrader, typisk 50–70°, men den meandrerer. Høyden er typisk
        8–12 km. Den styrer de ekstratropiske lavtrykkene inn mot Norge.
      </p>
      <OrdBoks
        ord="Polarjet"
        barn="Smalt belte med sterk vestavind over polarfronten, typisk 8–12 km, midlere til høye breddegrader."
      />
      <p>
        Den subtropiske jetstrømmen ligger nær 30° bredde, ved Hadleycellens polvegg. Den henger
        sammen med nedsynkingen i subtropene. Begge er vestlige fordi coriolis dreier den polgående
        øvre strømmen.
      </p>
      <OrdBoks ord="Subtropisk jet" barn="Vestavind nær 30°, ved Hadleycellens polvegg." />

      <PhotoFigure
        src="/images/fig-jet.jpg"
        alt="Tynn, rask skyelv høyt over havet mot jordas krumning"
        heading="To belter, ikke ett"
        caption="Polarfrontjeten ligger over polarfronten, på midlere til høye breddegrader, typisk 8–12 km. Den subtropiske jetstrømmen ligger nær 30° bredde, ved Hadleycellens polvegg."
        points={[
          {
            n: "1",
            label:
              "Polarfrontjeten over polarfronten, midlere til høye breddegrader, typisk 8–12 km.",
          },
          {
            n: "2",
            label: "Subtropisk jet nær 30° bredde, ved Hadleycellens polvegg.",
          },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Hvordan den oppstår</h2>
      <p>
        Sola varmer tropene mer enn polene. Det gir ulike luftsøyler, og trykket ved bakken og i
        høyden blir ikke det samme.
      </p>
      <p>
        Ved bakken: varm luft stiger nær ekvator. Der blir det lavtrykk og byger i ITCZ. Luften
        synker i subtropene. Der blir det høytrykk, ørken og passater. Ved polarfronten møtes kald
        polarluft og mildere luft fra sør. Der dannes vandrende lavtrykk. Over polen synker kald,
        tett luft. Der blir det polarhøytrykk.
      </p>
      <p>
        I høyden er mønsteret et annet. Varm luftsøyle utvider seg. Tykkelsen av luftlaget mellom to
        trykkflater øker. Derfor blir trykket i høyden høyere over tropene enn over den kalde
        polarluften. Relativt høytrykk over den varme søylen. Relativt lavtrykk over den kalde.
        Trykkgradienten i øvre troposfære peker polover.
      </p>
      <p>
        Så fort luften får fart, dreier coriolis den. På nordlig halvkule mot høyre. Den polgående
        øvre strømmen blir vestavind. Nær bakken bremser friksjon, og vinden krysser isobarene inn
        mot lavtrykk. Høyt oppe er friksjonen liten. Der går vinden langs isobarene. Det er der
        jetstrømmen kan ligge.
      </p>
      <p>
        Polarfrontjeten ligger der den horisontale temperaturkontrasten er sterkest, altså over
        polarfronten. Sterk temperaturgradient gir sterk trykkgradient i høyden, og dermed sterk
        geostrofisk vestavind. Det kalles termisk vind. Høyden er typisk 8–12 km.
      </p>
      <p>
        Den subtropiske jetstrømmen lages der Hadleycellen treffer polveggen: luften har strømmet
        polover i høyden og er dreid vestavinds, over nedsynkingen som ved bakken er det subtropiske
        høytrykket.
      </p>
      <p>
        Uten jordrotasjon ville vi hatt én stor Hadleycelle. Coriolis bryter den opp i tre celler og
        to jetbelter.
      </p>

      <FigurePlaceholder
        heading="Bakke og høyde, samme lengdegrad"
        caption="Ved bakken: L i ITCZ, H i subtropene, L ved polarfronten, H over polen. I høyden: tykkere varm søyle, relativt H over tropene, relativt L over polarluften, vestavind imellom. Polarfrontjeten over polarfronten. Subtropisk jet over Hadleycellens polvegg."
        label="Plassholder for profil med bakke og høyde på samme lengdegrad: trykkbelter nede, vestavind og to jetbelter oppe"
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Oppbygning og former
      </h2>
      <p>Jetstrømmen er smal. Kjernen er der vinden er sterkest. Den har to grunnformer.</p>
      <p>
        Zonal form: den går nesten rett vest–øst, parallelt med breddegradene. Lavtrykkene på
        polarfronten vandrer raskt østover. Været skifter ofte. Vestavindsbeltet er sterkt.
      </p>
      <p>
        Meridional form, eller bølgeform: jetstrømmen svinger i store bølger mot nord og sør. Det er
        Rossby-bølger. En bølgetopp, en rygg, peker mot polene og fører mild luft nordover. En
        bølgedal, et tråg, peker mot ekvator og fører kald luft sørover. Kuldebølger i Europa og
        hetebølger lenger sør kan sitte i samme bølge.
      </p>
      <OrdBoks
        ord="Rossby-bølger"
        barn="Bølger på jetstrømmen, rygg mot pol og tråg mot ekvator."
      />
      <OrdBoks ord="Meandering" barn="At jetstrømmen svinger nord–sør i stedet for å gå zonal." />
      <p>Når en rygg blir stående, kalles det blocking. Vestavindsbeltet stanser. Været står.</p>

      <FigurePlaceholder
        heading="Zonal og meridional form"
        caption="Zonal form: nesten rett vest–øst, parallelt med breddegradene. Meridional form: Rossby-bølger. En rygg peker mot polene. En tråg peker mot ekvator."
        label="Plassholder for figur av zonal vest–øst-jet og meridional form med rygg og tråg"
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hva som bøyer formen
      </h2>
      <p>
        Coriolis er null ved ekvator og sterkest ved polene. En luftpakke som flytter seg mot
        polene, merker sterkere dreining. En som flytter seg mot ekvator, merker svakere. Når en
        luftkolonne trekkes ut eller presses sammen, endres rotasjonen i kolonnen. Luften husker
        hvor den kom fra. Resultatet er at jetstrømmen meandrerer.
      </p>
      <p>
        Fjell, land–hav-kontrast og tropisk konveksjon setter bølgene. Polarfrontens beliggenhet
        setter den gjennomsnittlige breddegraden.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hva som må til for at den endres
      </h2>
      <p>
        Temperaturkontrasten mellom tropene og polene setter styrken. Polarfrontens beliggenhet
        setter den gjennomsnittlige breddegraden. Der luften stiger, mates jetstrømmene. Der den
        synker, svekkes de. Flyttes oppstigningen, flyttes jetstrømmen.
      </p>
      <p>
        Arktisk forsterkning reduserer temperaturkontrasten ekvator–pol i nedre troposfære. Da kan
        jetstrømmen svekkes og meandrere mer, med mer blocking og mer langvarige kuldeutbrudd selv
        om kloden varmes. Det er en hypotese. IPCC AR6 har lav konfidens for regionale endringer i
        nordlige jetstrømmer og stormbaner, særlig Nord-Atlanteren om vinteren. Intern variabilitet
        er stor. Gradientene konkurrerer: nede varmes Arktis og kontrasten svekkes, oppe varmes
        tropene og kontrasten styrkes. Blocking over Grønland og Nord-Stillehavet ventes sjeldnere i
        høye utslippsscenarioer, med middels konfidens. Det er motsatt av «mer blocking».
      </p>
      <p>
        Jetstrømmen kan gi kuldeperioder når den slår store bølger. Global oppvarming hever hele
        temperaturfordelingen. Kuldebølger blir sjeldnere og kortere, og de kaldeste dagene mindre
        kalde. Det har AR6 høy konfidens for. En kald veke i Europa i 2040 kan fortsatt skje. Den
        vil sannsynligvis være mildere enn en tilsvarende veke i 1960.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Værsystemer som påvirker
      </h2>
      <p>
        NAO er trykkforskjellen mellom Azorhøytrykket og Islandslavtrykket. Den er den viktigste
        svingningen for polarfrontjeten inn mot Norge.
      </p>
      <p>
        ENSO er koblingen mellom hav og atmosfære i det tropiske Stillehavet. Den svinger på to til
        sju år. Den flytter hvor tropisk luft stiger. Da flyttes den subtropiske jetstrømmen over
        Stillehavet, og polarfrontjeten over Nord-Amerika.
      </p>
      <p>
        IOD, den indiske dipolen, er en øst–vest-svingning i det tropiske Indiahavet. Den flytter
        den subtropiske jetstrømmen over Indiahavet og Australia. Koblingen til polarfrontjeten over
        Atlanteren og Norge er indirekte.
      </p>
      <p>
        Blocking er en vedvarende høytrykksrygg som stanser vestavindsbeltet. Polarfrontlavtrykk
        styrkes der jetstrømmen ligger. En bølge på jetstrømmen kan utløse baroklin ustabilitet og
        et nytt lavtrykk.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Effekter og land</h2>
      <p>Når jetstrømmen flyttes, flyttes stormbanen, tørken og kulden.</p>
      <p>
        Det blir ikke våtere fordi jetstrømmen selv er en regnsky. Den ligger i øvre troposfære.
        Nedbøren kommer ved bakken, i lavtrykkene den styrer.
      </p>
      <p>
        Der jetstrømmen ligger, styrkes de ekstratropiske lavtrykkene. Nær bakken strømmer luft inn
        mot lavtrykket. Luften må stige. Den avkjøles, vanndamp kondenserer, og vi får skyer og
        nedbør. Stormbanen er sporet der disse lavtrykkene går. Når jetstrømmen forskyves, flyttes
        sporet. Stedene under det nye sporet får flere og sterkere lavtrykk, oftere frontnedbør, og
        på losiden av fjell mer orografisk nedbør. Derfor blir Sør- og Midt-Norge våtere når
        polarfrontjeten og vestavinden ligger over oss, og Middelhavet våtere når den ligger sør.
      </p>
      <p>
        Der luften synker, under høytrykk og blocking, løses skyene opp. Der blir det tørrere, også
        om jetstrømmen bare har flyttet seg noen hundre kilometer unna.
      </p>
      <p>
        Nord for jetstrømmen oftere kaldt og tørt, eller blocking. Sør for den oftere mild luft.
        Rett under den de sterkeste lavtrykkene.
      </p>

      <PhotoFigure
        src="/images/fig-nao.jpg"
        alt="Nord-Atlanteren fra bane: klar luft i sørvest, syklon spiralskyer lenger nord, skystrøk mot Norge"
        heading="Lavtrykk under jet, høytrykk ved siden"
        caption="Lavtrykk under jet: stigende luft og nedbør. Høytrykk ved siden: nedsynking og oppløste skyer."
        marks={[
          { x: 48, y: 12, n: "L", text: "Lavtrykk under jet", tone: "low" },
          { x: 6, y: 58, n: "H", text: "Høytrykk ved siden", tone: "warm" },
        ]}
        points={[
          { n: "L", label: "Lavtrykk under jet: stigende luft og nedbør." },
          { n: "H", label: "Høytrykk ved siden: nedsynking og oppløste skyer." },
        ]}
      />

      <p>
        Ved positiv NAO ligger polarfrontjeten lenger nord og er sterkere. Stormbanen går mot
        Island, Norskehavet og Nord-Norge. Sør- og Midt-Norge får milde, våte vintrer. Middelhavet
        blir tørrere. Grønland og Labrador blir kaldere. Formen er mer zonal.
      </p>
      <p>
        Ved negativ NAO svekkes jetstrømmen, ligger lenger sør, eller brytes i blocking. Lavtrykkene
        tar sørligere baner mot De britiske øyer, Biscaya og Middelhavet. Skandinavia får oftere
        kald, tørr eller mer kontinental vinter, med inversjon i dalene. Sør-Europa får mer nedbør
        og storm. Formen er mer meridional.
      </p>
      <p>
        Posisjonen over Nord-Atlanteren avgjør om lavtrykkene treffer Vestlandet, går inn i
        Norskehavet, eller styres sør for oss. Når jetstrømmen ligger nord for Norge, treffer de
        fleste lavtrykkene Nord-Norge og Barentshavet. Når den ligger sør, treffer de De britiske
        øyer, Nordsjøen og Sør-Norge hardere, eller de går inn i Middelhavet.
      </p>
      <p>
        Blocking over Skandinavia: om vinteren kald inversjon i dalene. Om sommeren tørt og varmt.
        Mekanismen er beslektet med Sahara: nedsynking, få skyer, mer innstråling ved bakken.
      </p>
      <p>
        I en La Niña-fase ligger den subtropiske jetstrømmen over Stillehavet gjerne lenger vest og
        mer samlet. Polarfrontjeten over Nord-Amerika trekkes ofte nordover. Våtere i Indonesia og
        Australia. Tørrere langs kysten av Ecuador og Peru. I Nord-Amerika oftere et nordligere
        stormspor. Telekoblingen til norsk vinter er svakere og mer usikker enn NAO.
      </p>
      <p>
        I en El Niño-fase forsterkes den subtropiske jetstrømmen over det nordlige Stillehavet og
        strekker seg østover mot sørvestlige USA. Polarfrontjeten over Nord-Amerika deles eller
        trekkes sørover i vest. Tørke og brannvær i Indonesia og østlige Australia. Mer nedbør langs
        kysten av Ecuador, Peru og deler av sørvestlige USA. Et sørligere stormspor over USA. Europa
        merker El Niño mer indirekte. Det er ikke en fast El Niño-vinter i Norge.
      </p>
      <p>
        Ved positiv IOD forskyves den subtropiske jetstrømmen over Indiahavet og Australia. Mer regn
        og flom i Øst-Afrika. Tørke og brannvær i Indonesia og sørvestlige Australia. Monsunen over
        India kan forsterkes. Ved negativ IOD snur mønsteret: mer regn mot Indonesia og Australia,
        tørrere Øst-Afrika. Effekten på norsk jetstrøm er ikke like direkte som NAO.
      </p>

      <Callout title="Vanlige misforståelser">
        <p>
          Det blir ikke våtere fordi jetstrømmen selv er en regnsky. Den ligger i øvre troposfære.
          Nedbøren kommer ved bakken, i lavtrykkene den styrer.
        </p>
        <p>
          At arktisk forsterkning svekker jetstrømmen og gir mer meandering og blocking, er en
          hypotese. IPCC AR6 har lav konfidens for regionale endringer i nordlige jetstrømmer og
          stormbaner. Blocking over Grønland og Nord-Stillehavet ventes sjeldnere i høye
          utslippsscenarioer — motsatt av «mer blocking».
        </p>
        <p>
          Det er to slike belter, ikke ett. Polarfrontjet og subtropisk jet. Ikke polar natt-jet.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="Polarjet"
          def="Smalt belte med sterk vestavind over polarfronten, typisk 8–12 km, midlere til høye breddegrader."
        />
        <Term name="Subtropisk jet" def="Vestavind nær 30°, ved Hadleycellens polvegg." />
        <Term name="Rossby-bølger" def="Bølger på jetstrømmen, rygg mot pol og tråg mot ekvator." />
        <Term name="Meandering" def="At jetstrømmen svinger nord–sør i stedet for å gå zonal." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hvorfor blir Sør- og Midt-Norge våtere når polarfrontjeten ligger over oss?",
            options: [
              "Fordi jetstrømmen selv er en regnsky i øvre troposfære.",
              "Fordi polar natt-jeten ligger over Skandinavia.",
              "Stormbanen flyttes med jetstrømmen. Lavtrykkene under den gir stigende luft, skyer og nedbør.",
              "Fordi den subtropiske jetstrømmen ligger i 8–12 km og regner rett ned.",
            ],
            answer: 2,
            explain:
              "Det blir ikke våtere fordi jetstrømmen selv er en regnsky. Den ligger i øvre troposfære. Nedbøren kommer ved bakken, i lavtrykkene den styrer.",
          },
          {
            prompt: "Hvor mange slike jetbelter er det, og hvilke?",
            options: [
              "Ett: polarfrontjeten.",
              "Tre: polarfrontjet, subtropisk jet og polar natt-jet.",
              "To: polarfrontjeten over polarfronten, og den subtropiske nær 30° ved Hadleycellens polvegg.",
              "To: polarfrontjeten og polar natt-jeten.",
            ],
            answer: 2,
            explain: "Det er to slike belter, ikke ett. Polarfrontjet og subtropisk jet.",
          },
        ]}
      />
    </TopicLayout>
  );
}
