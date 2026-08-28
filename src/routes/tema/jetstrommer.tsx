import { createFileRoute } from "@tanstack/react-router";
import { FigurePlaceholder, PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";

export const Route = createFileRoute("/tema/jetstrommer")({
  component: JetstrommerPage,
});

function JetstrommerPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Atmosfæren"
      title="Jetstrømmer"
      lead="Jetstrømmen er et smalt belte med sterk vestavind i øvre troposfære. Det er to slike belter, ikke ett. Polarfrontjeten ligger over polarfronten, der kald polarluft møter mildere luft fra sør. Den ligger på midlere til høye breddegrader, typisk 50–70°, men den meandrerer. Høyden er typisk 8–12 km. Den styrer de ekstratropiske lavtrykkene inn mot Norge."
      banner="/images/fig-jet.jpg"
      bannerAlt="Smalt, langt skybelte høyt over havet, sett mot jordas krumning og verdensrommet"
      videoTopic="jetstrømmer"
      prev={{ to: "/tema/vindsystemet", label: "Forrige: Vindsystemet" }}
      next={{ to: "/tema/coriolis", label: "Neste: Corioliseffekten" }}
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
        ord="Polarfrontjet"
        barn="Over polarfronten, typisk 8–12 km, midlere til høye breddegrader. Styrer lavtrykk mot Norge."
      />
      <p>
        Den subtropiske jetstrømmen ligger nær 30° bredde, ved Hadleycellens polvegg. Den henger
        sammen med nedsynkingen i subtropene. Begge er vestlige fordi coriolis dreier den polgående
        øvre strømmen.
      </p>
      <OrdBoks ord="Subtropisk jet" barn="Nær 30°, ved Hadleycellens polvegg." />

      <PhotoFigure
        src="/images/fig-jet.jpg"
        alt="Smalt, langt skybelte høyt over havet, sett mot jordas krumning og verdensrommet"
        heading="To belter, ikke ett"
        caption="Polarfrontjeten ligger over polarfronten, typisk 8–12 km. Den subtropiske jetstrømmen ligger nær 30° bredde, ved Hadleycellens polvegg. Begge er smale belter med vestavind i øvre troposfære."
        marks={[{ x: 8, y: 42, n: "1", text: "Smalt belte · vestavind", tone: "fg" }]}
        points={[
          {
            n: "1",
            label:
              "Smalt belte med vestavind. Polarfrontjeten over polarfronten, typisk 8–12 km. Subtropisk jet nær 30°, ved Hadleycellens polvegg.",
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
      <OrdBoks
        ord="Termisk vind"
        barn="Sterk temperaturgradient gir sterk trykkgradient i høyden, og dermed sterk geostrofisk vestavind."
      />
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
        heading="To snitt, samme lengdeprofil"
        label="To stakkede tverrsnitt langs samme meridian: bakke og høyde. Polarfrontjet over polarfronten, subtropisk jet over Hadleycellens polvegg. Figuren er ikke ferdig."
        caption="To snitt langs samme meridian. Ved bakken: lavtrykk i ITCZ, høytrykk i subtropene, lavtrykk ved polarfronten, høytrykk over polen. I høyden: tykkere varm søyle, relativt høytrykk over tropene, relativt lavtrykk over polarluften, vestavind imellom. Polarfrontjeten over polarfronten, typisk 8–12 km. Subtropisk jet over Hadleycellens polvegg."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Oppbygning og former
      </h2>
      <p>Jetstrømmen er smal. Kjernen er der vinden er sterkest. Den har to grunnformer.</p>
      <p>
        Zonal form: den går nesten rett vest–øst, parallelt med breddegradene. Lavtrykkene på
        polarfronten vandrer raskt østover. Været skifter ofte. Vestavindsbeltet er sterkt.
      </p>
      <OrdBoks
        ord="Zonal form"
        barn="Jetstrømmen går nesten rett vest–øst, parallelt med breddegradene. Lavtrykkene vandrer raskt østover."
      />
      <p>
        Meridional form, eller bølgeform: jetstrømmen svinger i store bølger mot nord og sør. Det er
        Rossby-bølger. En bølgetopp, en rygg, peker mot polene og fører mild luft nordover. En
        bølgedal, et tråg, peker mot ekvator og fører kald luft sørover. Kuldebølger i Europa og
        hetebølger lenger sør kan sitte i samme bølge.
      </p>
      <OrdBoks
        ord="Rossby-bølger"
        barn="Bølger på jetstrømmen. Rygg mot polene og tråg mot ekvator."
      />
      <p>Når en rygg blir stående, kalles det blocking. Vestavindsbeltet stanser. Været står.</p>
      <OrdBoks
        ord="Blocking"
        barn="Når en rygg blir stående. Vestavindsbeltet stanser. Været står."
      />

      <FigurePlaceholder
        heading="Zonal og meridional form"
        label="Skisse av zonal jet vest–øst mot meridional jet med rygg mot polene og tråg mot ekvator. Figuren er ikke ferdig."
        caption="Zonal form: nesten rett vest–øst, parallelt med breddegradene. Meridional form: Rossby-bølger. En rygg peker mot polene. Et tråg peker mot ekvator."
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
      <OrdBoks ord="Meandering" barn="Jetstrømmen svinger i store bølger nord–sør." />
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
      <OrdBoks
        ord="NAO"
        barn="Trykkforskjellen mellom Azorhøytrykket og Islandslavtrykket. Den viktigste svingningen for polarfrontjeten inn mot Norge."
      />
      <p>
        ENSO er koblingen mellom hav og atmosfære i det tropiske Stillehavet. Den svinger på to til
        sju år. Den flytter hvor tropisk luft stiger. Da flyttes den subtropiske jetstrømmen over
        Stillehavet, og polarfrontjeten over Nord-Amerika.
      </p>
      <OrdBoks
        ord="ENSO"
        barn="Koblingen mellom hav og atmosfære i det tropiske Stillehavet. Den svinger på to til sju år."
      />
      <p>
        IOD, den indiske dipolen, er en øst–vest-svingning i det tropiske Indiahavet. Den flytter
        den subtropiske jetstrømmen over Indiahavet og Australia. Koblingen til polarfrontjeten over
        Atlanteren og Norge er indirekte.
      </p>
      <OrdBoks
        ord="IOD"
        barn="Øst–vest-svingning i det tropiske Indiahavet. Koblingen til polarfrontjeten over Atlanteren og Norge er indirekte."
      />
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

      <PhotoFigure
        src="/images/fig-nao.jpg"
        alt="Nord-Atlanteren fra bane: spiralformet lavtrykk, skybelte som stormbane, klarere luft ved siden"
        heading="Lavtrykk under jet, høytrykk ved siden"
        caption="Lavtrykk under jet, stigende luft og nedbør. Høytrykk ved siden, nedsynking og oppløste skyer."
        arrows={[{ d: "M 28 62 L 72 38", tone: "teal", width: 1.3 }]}
        marks={[
          { x: 48, y: 12, n: "L", text: "Lavtrykk · stiger", tone: "low" },
          { x: 6, y: 58, n: "H", text: "Høytrykk · synker", tone: "warm" },
        ]}
        points={[
          {
            n: "L",
            label:
              "Under jet: luft inn mot lavtrykket, stigende luft, skyer og nedbør. Stormbanen.",
          },
          {
            n: "H",
            label: "Ved siden: nedsynking under høytrykk, oppløste skyer, tørrere.",
          },
        ]}
      />

      <p>
        Nord for jetstrømmen oftere kaldt og tørt, eller blocking. Sør for den oftere mild luft.
        Rett under den de sterkeste lavtrykkene.
      </p>
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

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="Polarfrontjet"
          def="Over polarfronten, typisk 8–12 km, midlere til høye breddegrader. Styrer lavtrykk mot Norge."
        />
        <Term name="Subtropisk jet" def="Nær 30°, ved Hadleycellens polvegg." />
        <Term
          name="Rossby-bølger"
          def="Bølger på jetstrømmen. Rygg mot polene og tråg mot ekvator."
        />
        <Term name="Meandering" def="Jetstrømmen svinger i store bølger nord–sør." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hvor mange jetbelter er det?",
            options: [
              "Ett belte med sterk vestavind rundt hele jorda.",
              "To belter, ikke ett.",
              "Tre belter, ett for hver celle.",
              "Fire, ett i hver himmelretning.",
            ],
            answer: 1,
            explain: "Det er to slike belter, ikke ett: polarfrontjet og subtropisk jet.",
          },
          {
            prompt: "Hvorfor blir det våtere der jetstrømmen ligger?",
            options: [
              "Fordi jetstrømmen selv er en regnsky.",
              "Fordi den ligger i øvre troposfære og slipper nedbør der den går.",
              "Nedbøren kommer ved bakken, i lavtrykkene den styrer. Luft stiger, avkjøles og kondenserer. Stormbanen er sporet der disse lavtrykkene går.",
              "Fordi vestavinden løfter fjellet alene.",
            ],
            answer: 2,
            explain:
              "Det blir ikke våtere fordi jetstrømmen selv er en regnsky. Den ligger i øvre troposfære. Nedbøren kommer ved bakken, i lavtrykkene den styrer.",
          },
          {
            prompt:
              "Arktisk forsterkning kan svekke jetstrømmen og få den til å meandrere mer. Hva er status for denne påstanden?",
            options: [
              "Det er bevist. IPCC AR6 har høy konfidens.",
              "Det er en hypotese. IPCC AR6 har lav konfidens for regionale endringer i nordlige jetstrømmer og stormbaner, særlig Nord-Atlanteren om vinteren.",
              "Blocking over Grønland og Nord-Stillehavet ventes oftere i høye utslippsscenarioer.",
              "Kuldebølger blir vanligere og lengre.",
            ],
            answer: 1,
            explain:
              "Det er en hypotese. IPCC AR6 har lav konfidens for regionale endringer i nordlige jetstrømmer og stormbaner, særlig Nord-Atlanteren om vinteren.",
          },
        ]}
      />
    </TopicLayout>
  );
}
