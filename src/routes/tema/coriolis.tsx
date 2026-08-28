import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  CoriolisDiagram,
  CycloneSpinDiagram,
  ZonalMeridionalDiagram,
} from "@/components/diagrams/coriolis";
import { EkmanDiagram } from "@/components/diagrams/ocean";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";

export const Route = createFileRoute("/tema/coriolis")({
  component: CoriolisPage,
});

function CoriolisPage() {
  return (
    <TopicLayout
      kicker="Jordrotasjon"
      title="Corioliseffekten"
      lead="Corioliseffekten er ikke en kraft som starter vinden. Den er det som skjer når luft eller vann allerede er i bevegelse på en roterende jord. Trykkforskjeller setter luften i gang. Jordrotasjonen dreier den."
      banner="/images/banner-coriolis.jpg"
      bannerAlt="Jorda med spiralformede syklonskyer"
      videoTopic="Corioliseffekten"
      prev={{ to: "/tema/vindsystemet", label: "Forrige: Vindsystemet" }}
      next={{ to: "/tema/havstrommer", label: "Neste: Havstrømmer" }}
    >
      <p>
        Jorda roterer mot øst. Vi står på den roterende flaten og måler alt derfra. En luftpakke
        som går rett fram i verdensrommet, ser derfor ut til å bøye av sett fra bakken. På nordlig
        halvkule bøyer den mot høyre. På sørlig halvkule mot venstre. Ved ekvator er avbøyningen
        null. Derfor kan tropiske sykloner ikke dannes på selve ekvator. De trenger coriolis for å
        få rotasjon.
      </p>
      <p>
        Coriolis øker mot polene. Den øker også når farten øker. Den virker bare når noe beveger
        seg. Stille luft dreies ikke.
      </p>
      <OrdBoks
        ord="Corioliseffekten"
        barn="Det som skjer når luft eller vann allerede er i bevegelse på en roterende jord. Mot høyre på nordlig halvkule, mot venstre på sørlig. Ved ekvator er avbøyningen null."
      />

      <p>
        Tre ledd må sitte samtidig for at værsystemene skal få den formen vi ser på kartet.
      </p>
      <p>
        Først trykkgradienten. Luft går fra høyt mot lavt trykk. Jo tettere isobarene ligger, desto
        sterkere er denne driften.
      </p>
      <p>
        Så coriolis. Så fort luften får fart, dreies den. På nordlig halvkule: mot høyre.
      </p>
      <p>
        Når trykkgradient og coriolis veier hverandre opp, går vinden ikke lenger inn mot
        lavtrykket. Den går langs isobarene, med lavtrykk til venstre. Det kalles geostrofisk vind.
        Det er den vanlige balansen høyt oppe og til havs, borte fra bakken.
      </p>
      <OrdBoks
        ord="Geostrofisk vind"
        barn="Når trykkgradient og coriolis veier hverandre opp. Vinden går langs isobarene, med lavtrykk til venstre. Vanlig balanse høyt oppe og til havs, borte fra bakken."
      />

      <CoriolisDiagram />

      <p>
        Nær bakken kommer det tredje leddet: friksjon. Overflaten bremser luften. Lavere fart gir
        svakere coriolis. Da vinner trykkgradienten litt, og vinden krysser isobarene inn mot
        lavtrykk og ut fra høytrykk. Innstrømming i lavtrykk tvinger luft opp. Da får vi skyer og
        nedbør. Utstrømming i høytrykk tvinger luft ned. Da løses skyene opp.
      </p>
      <p>
        Formen på systemet på værkartet er altså coriolis pluss trykkgradient pluss friksjon. Mot
        klokka rundt lavtrykk i Norge. Med klokka rundt høytrykk. Det er ikke en tilfeldig
        huskeregel.
      </p>

      <CycloneSpinDiagram />

      <PhotoFigure
        src="/images/fig-syklon.jpg"
        alt="Orkan over havet med tydelig øye og spiralbånd mot klokken"
        heading="Tropisk syklon sett ovenfra"
        caption="Tropiske sykloner trenger coriolis for å få rotasjon. Ved ekvator er avbøyningen null, så de kan ikke dannes på selve ekvator. Mot klokka rundt lavtrykk på nordlig halvkule."
        arrows={[
          { d: "M 38 16 Q 22 28 30 46", tone: "low", width: 1.25 },
          { d: "M 30 46 Q 48 58 70 46", tone: "low", width: 1.25 },
          { d: "M 70 46 Q 78 28 58 16", tone: "low", width: 1.25 },
        ]}
        marks={[
          { x: 46, y: 36, n: "L", text: "Øye", tone: "low" },
          { x: 6, y: 12, n: "1", text: "Mot klokka i nord", tone: "low" },
        ]}
        points={[
          { n: "1", label: "Innstrømming bøyes til høyre: mot klokka rundt lavtrykk i nord." },
          { n: "L", label: "Ved ekvator er avbøyningen null. Tropiske sykloner dannes ikke der." },
        ]}
      />

      <p>
        Samme logikk styrer havet. Vindstresset på overflaten gir et Ekman-lag. Nettotransporten går
        90 grader til høyre for vinden på nordlig halvkule. Det er derfor kystvind kan gi
        oppwelling. Det er også derfor El Niño henger sammen med svekket passat og svekket
        oppwelling utenfor Peru.
      </p>
      <OrdBoks
        ord="Ekman-lag"
        barn="Vindstresset på overflaten. Nettotransporten går 90 grader til høyre for vinden på nordlig halvkule. Derfor kan kystvind gi oppwelling."
      />

      <EkmanDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Form, og hva som skjer når formen endres
      </h2>
      <p>
        Coriolis er ikke like sterk overalt. Ved ekvator er den null. Ved polene er den sterkest. En
        luftpakke som flytter seg mot polene, merker derfor en sterkere dreining. En som flytter
        seg mot ekvator, merker en svakere. Det er nøkkelen til jetstrømmens form.
      </p>
      <p>
        Jetstrømmen er et smalt belte med sterk vestavind i øvre troposfære, særlig langs
        polarfronten. Den oppstår fordi tropene er varme og polene kalde. Varm luft gir tykkere
        luftlag mellom to trykkflater. I høyden blir trykket derfor høyere over tropene enn over
        polene. Trykkgradienten peker polover. Coriolis dreier den vestavinds. Polarfrontjeten
        ligger der den horisontale temperaturkontrasten er sterkest.
      </p>
      <OrdBoks
        ord="Jetstrøm"
        barn="Et smalt belte med sterk vestavind i øvre troposfære, særlig langs polarfronten. Polarfrontjeten ligger der den horisontale temperaturkontrasten er sterkest."
      />

      <p>Jetstrømmen har to grunnformer.</p>
      <p>
        Zonal form: den går nesten rett vest–øst, parallelt med breddegradene. Lavtrykkene på
        polarfronten vandrer raskt østover. Været skifter ofte. Vestavindsbeltet er sterkt.
      </p>
      <p>
        Meridional form, eller bølgeform: jetstrømmen svinger i store bølger mot nord og sør. Det
        er Rossby-bølger. De oppstår fordi coriolis endrer seg med breddegraden. Når en luftkolonne
        trekkes ut (strekkes) eller presses sammen, endres også rotasjonen i kolonnen. Luften husker
        hvor den kom fra. Resultatet er at jetstrømmen meandrerer.
      </p>
      <OrdBoks
        ord="Rossby-bølger"
        barn="Meridional form, eller bølgeform. De oppstår fordi coriolis endrer seg med breddegraden. Resultatet er at jetstrømmen meandrerer."
      />

      <ZonalMeridionalDiagram />

      <p>
        Når formen går fra zonal til meridional, skjer tre ting som betyr noe for vær og klima.
      </p>
      <p>
        For det første flyttes varm og kald luft langt i nord–sør-retning. En bølgetopp (rygg) peker
        mot polene og fører mild luft nordover. En bølgedal (tråg) peker mot ekvator og fører kald
        luft sørover. Kuldebølger i Europa og hetebølger lenger sør kan altså sitte i samme bølge.
      </p>
      <p>
        For det andre kan en rygg bli stående. Det kalles blocking. Vestavindsbeltet stanser.
        Høytrykket over Skandinavia kan ligge i dagevis. Om vinteren: kald inversjon i dalene. Om
        sommeren: tørt og varmt. Lavtrykkene styres da sør eller nord for oss, ikke tvers over.
      </p>
      <OrdBoks
        ord="Blocking"
        barn="En rygg som blir stående. Vestavindsbeltet stanser. Høytrykket over Skandinavia kan ligge i dagevis. Lavtrykkene styres da sør eller nord for oss, ikke tvers over."
      />
      <p>
        For det tredje flyttes stormbanen. Der jetstrømmen ligger, styrkes de ekstratropiske
        lavtrykkene. Når jetstrømmen ligger nord for Norge, treffer de fleste lavtrykkene Nord-Norge
        og Barentshavet. Når den ligger sør, treffer de De britiske øyer, Nordsjøen og Sør-Norge
        hardere, eller de går inn i Middelhavet.
      </p>
      <p>
        Hvorfor endres formen? Temperaturkontrasten mellom tropene og polene setter styrken.
        Polarfrontens beliggenhet setter den gjennomsnittlige breddegraden. Fjell, land–hav-kontrast
        og tropisk konveksjon setter bølgene. De store svingningene ENSO, NAO og IOD endrer nettopp
        konveksjon, trykkfelt og temperaturkontrast. Da flyttes jetstrømmen.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        ENSO, NAO og IOD: hvordan de flytter jetstrømmene
      </h2>
      <p>
        Polarfrontjeten og den subtropiske jetstrømmen er to ulike belter. Polarfrontjeten ligger på
        midlere til høye breddegrader og styrer lavtrykkene mot Norge. Den subtropiske jetstrømmen
        ligger nærmere 30 grader og henger sammen med Hadleycellens nedsynking. Begge kan flyttes.
        Effekten merkes der stormbanen, tørke og hete faktisk treffer bakken.
      </p>
      <p>
        ENSO er en kobling mellom hav og atmosfære i det tropiske Stillehavet. Den svinger på to til
        sju år.
      </p>
      <OrdBoks
        ord="ENSO"
        barn="En kobling mellom hav og atmosfære i det tropiske Stillehavet. Den svinger på to til sju år."
      />

      <PhotoFigure
        src="/images/fig-enso.jpg"
        alt="Ekvatorialt Stillehav fra bane med varmt vann og konvektive skyer"
        heading="Scenen for ENSO"
        caption="ENSO er en kobling mellom hav og atmosfære i det tropiske Stillehavet. Passatene stabler varmt vann i vest. Svekkes de, sprer det varme vannet seg østover, og oppwelling utenfor Peru avtar."
        arrows={[{ d: "M 78 32 L 28 28", tone: "teal", width: 1.3 }]}
        marks={[
          { x: 58, y: 12, n: "1", text: "Passater mot vest", tone: "teal" },
          { x: 8, y: 48, n: "2", text: "Varmt vann og konveksjon", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "I La Niña er passatene sterke. Varmt overflatevann stables i vest." },
          { n: "2", label: "Der luften stiger, mates jetstrømmene. Flyttes oppstigningen, flyttes jetstrømmen." },
        ]}
      />

      <p>
        I en La Niña-fase er passatene sterke. Varmt overflatevann stables i vest. Kaldt vann veller
        opp utenfor Peru. Walkersirkulasjonen er tydelig: oppstigning og byger over Indonesia og
        vestlige Stillehav, nedsynking over det østlige. Den subtropiske jetstrømmen over Stillehavet
        ligger da gjerne lenger vest og mer samlet. Polarfrontjeten over Nord-Amerika trekkes ofte
        nordover.
      </p>
      <p>
        Effekten: våtere i Indonesia og Australia. Tørrere langs kysten av Ecuador og Peru. I
        Nord-Amerika oftere et nordligere stormspor. I Atlanteren kan La Niña lette tropiske
        sykloner. Telekoblingen til norsk vinter er svakere og mer usikker enn NAO.
      </p>
      <p>
        I en El Niño-fase svekkes passatene. Det varme vannet sprer seg østover. Oppwelling utenfor
        Peru avtar. Konveksjonen flytter mot sentrale og østlige Stillehav. Walkersirkulasjonen
        forskyves. Den subtropiske jetstrømmen over det nordlige Stillehavet forsterkes og strekker
        seg østover mot sørvestlige USA. Polarfrontjeten over Nord-Amerika deles eller trekkes
        sørover i vest.
      </p>
      <p>
        Effekten: tørke og brannvær i Indonesia og østlige Australia. Mer nedbør langs kysten av
        Ecuador, Peru og deler av sørvestlige USA. Et sørligere stormspor over USA. Europa merker El
        Niño mer indirekte, via endret bølgeaktivitet over Atlanteren. Det er ikke en fast El
        Niño-vinter i Norge.
      </p>
      <p>
        Havtemperaturen endrer hvor tropisk luft stiger. Der luften stiger, mates jetstrømmene. Der
        den synker, svekkes de. Flyttes oppstigningen, flyttes jetstrømmen.
      </p>

      <p>
        NAO er trykkforskjellen mellom Azorhøytrykket og Islandslavtrykket. Den er den viktigste
        svingningen for jetstrømmen inn mot Norge.
      </p>
      <OrdBoks
        ord="NAO"
        barn="Trykkforskjellen mellom Azorhøytrykket og Islandslavtrykket. Den viktigste svingningen for jetstrømmen inn mot Norge."
      />
      <p>
        Ved positiv NAO er gradienten stor. Vestavindsbeltet og polarfrontjeten ligger lenger nord
        og er sterkere. Stormbanen går mot Island, Norskehavet og Nord-Norge. Sør- og Midt-Norge får
        milde, våte vintrer med mye vestavind. Middelhavet blir tørrere. Grønland og Labrador blir
        kaldere. Jetstrømmen har mer zonal form.
      </p>
      <p>
        Ved negativ NAO er gradienten liten. Jetstrømmen svekkes, ligger lenger sør, eller brytes i
        blocking. Lavtrykkene tar sørligere baner mot De britiske øyer, Biscaya og Middelhavet.
        Skandinavia får oftere kald, tørr eller mer kontinental vinter, med inversjon i dalene.
        Sør-Europa får mer nedbør og storm. Formen er mer meridional.
      </p>
      <p>
        NAO svinger fra uke til uke og vinter til vinter. Den er ikke et enkelt lavtrykk, men en
        modus i hele Nord-Atlanteren. For norsk kystvær, breenes vinterbalanse og hvor ekstremværet
        treffer, er NAO den svingningen du skal starte med.
      </p>

      <p>
        IOD, den indiske dipolen, er en øst–vest-svingning i havtemperaturen i det tropiske
        Indiahavet.
      </p>
      <OrdBoks
        ord="IOD"
        barn="Den indiske dipolen: en øst–vest-svingning i havtemperaturen i det tropiske Indiahavet. Koblingen til polarfrontjeten over Atlanteren og Norge er indirekte."
      />
      <p>
        Ved positiv IOD er vestlige Indiahavet unormalt varmt og østlige unormalt kaldt.
        Konveksjonen ligger over Øst-Afrika og det vestlige bassenget. Østlige Indiahavet og
        Indonesia synker. Den subtropiske jetstrømmen over Indiahavet og Australia forskyves.
        Effekten er tydeligst der: mer regn og flom i Øst-Afrika, tørke og brannvær i Indonesia og
        sørvestlige Australia. Monsunen over India kan forsterkes.
      </p>
      <p>
        Ved negativ IOD snur mønsteret. Øst blir varmere. Mer regn mot Indonesia og Australia.
        Tørrere Øst-Afrika.
      </p>
      <p>
        IOD flytter altså først jet og konveksjon over Indiahavet, Afrika og Australia. Koblingen til
        polarfrontjeten over Atlanteren og Norge er indirekte. Den går ofte via ENSO, fordi IOD og
        ENSO kan opptre sammen, og via den subtropiske jetstrømmen som binder Hadleycellene sammen.
        IOD er viktig for Indiahavet og Australia. Effekten på norsk jetstrøm er ikke like direkte
        som NAO.
      </p>
      <p>
        Det som er felles for alle tre: de endrer hvor luft stiger og synker i tropene eller på
        midlere breddegrader. Coriolis gjør den bevegelsen om til vestavind og jet. Når
        oppstigningen flyttes, flyttes jetstrømmen. Når jetstrømmen flyttes, flyttes stormbanen,
        tørken og kulden. Hvor det skjer, følger bølgen. Nord for jetstrømmen oftere kaldt og tørt
        eller blocking. Sør for den oftere mild luft. Rett under den de sterkeste lavtrykkene.
      </p>

      <Callout title="Vanlige misforståelser">
        <p>
          Corioliseffekten er ikke en kraft som starter vinden. Den virker bare når noe beveger
          seg. Stille luft dreies ikke. Nær bakken vinner trykkgradienten litt, og vinden krysser
          isobarene inn mot lavtrykk — derfor strømmer det inn mot L, ikke bare rundt.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="Coriolis"
          def="Avbøyning når luft eller vann allerede beveger seg på en roterende jord. Høyre i nord, venstre i sør. Null ved ekvator."
        />
        <Term
          name="Geostrofisk vind"
          def="Når trykkgradient og coriolis veier hverandre opp. Vind langs isobarene, lavtrykk til venstre."
        />
        <Term
          name="Rossby-bølger"
          def="Meridional form, eller bølgeform. De oppstår fordi coriolis endrer seg med breddegraden."
        />
        <Term
          name="Blocking"
          def="En rygg som blir stående. Vestavindsbeltet stanser. Lavtrykkene går sør eller nord for oss."
        />
        <Term
          name="ENSO"
          def="Kobling mellom hav og atmosfære i det tropiske Stillehavet. Svinger på to til sju år."
        />
        <Term
          name="NAO"
          def="Trykkforskjellen mellom Azorhøytrykket og Islandslavtrykket. Start her for norsk jet og kystvær."
        />
        <Term
          name="IOD"
          def="Øst–vest-svingning i tropisk Indiahav. Koblingen til polarfrontjeten over Norge er indirekte."
        />
        <Term
          name="Ekman-lag"
          def="Nettotransport 90 grader til høyre for vinden på nordlig halvkule. Kystvind kan gi oppwelling."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Til hvilken side bøyes luft på nordlig halvkule, og hva skjer ved ekvator?",
            options: [
              "Til venstre; sterkest ved ekvator.",
              "Til høyre; ingen avbøyning ved ekvator.",
              "Alltid mot vest.",
              "Til høyre bare om natten.",
            ],
            answer: 1,
            explain:
              "På nordlig halvkule bøyer den mot høyre. På sørlig mot venstre. Ved ekvator er avbøyningen null. Derfor kan tropiske sykloner ikke dannes på selve ekvator.",
          },
          {
            prompt: "Hvorfor spinner et lavtrykk mot klokka i Norge?",
            options: [
              "Fordi jordas kjerne spinner den veien.",
              "Luft strømmer inn mot L og bøyes til høyre.",
              "Fordi jetstrømmen alltid går øst–vest.",
              "Det gjør det ikke.",
            ],
            answer: 1,
            explain:
              "Formen er coriolis pluss trykkgradient pluss friksjon. Mot klokka rundt lavtrykk i Norge. Med klokka rundt høytrykk.",
          },
          {
            prompt:
              "Når trykkgradient og coriolis veier hverandre opp, hvor går vinden — og hva kalles det?",
            options: [
              "Rett inn mot lavtrykket. Det kalles passat.",
              "Langs isobarene, med lavtrykk til venstre. Det kalles geostrofisk vind.",
              "Rett mot ekvator. Det kalles blocking.",
              "90 grader til venstre for isobarene. Det kalles Ekman-lag.",
            ],
            answer: 1,
            explain:
              "Det kalles geostrofisk vind. Det er den vanlige balansen høyt oppe og til havs, borte fra bakken.",
          },
        ]}
      />
    </TopicLayout>
  );
}
