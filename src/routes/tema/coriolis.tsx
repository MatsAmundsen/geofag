import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  CoriolisDiagram,
  CoriolisLatitudeDiagram,
  CoriolisScaleDiagram,
  CycloneSpinDiagram,
  NaoDiagram,
  PolewardParcelDiagram,
  RotationSpeedDiagram,
  TradeDeflectionDiagram,
  ZonalMeridionalDiagram,
} from "@/components/diagrams/coriolis";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/coriolis")!;

export const Route = createFileRoute("/tema/coriolis")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/coriolis",
    }),
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
      prev={{ to: "/tema/jetstrommer", label: "Forrige: Jetstrømmer" }}
      next={{ to: "/tema/havstrommer", label: "Neste: Havstrømmer" }}
      kilder={KILDER.coriolis}
    >
      <p>
        Jorda roterer mot øst. Vi står på den roterende flaten og måler alt derfra. En luftpakke som
        går rett fram i verdensrommet, ser derfor ut til å bøye av sett fra bakken. På nordlig
        halvkule bøyer den mot høyre. På sørlig halvkule mot venstre. Ved ekvator er avbøyningen
        null (NOAA, u.å.). Derfor kan tropiske sykloner ikke dannes på selve ekvator. De trenger
        coriolis for å få rotasjon.
      </p>
      <p>
        Coriolis øker mot polene. Den øker også når farten øker. Den virker bare når noe beveger
        seg. Stille luft dreies ikke.
      </p>
      <OrdBoks
        ord="Corioliseffekten"
        barn="Det som skjer når luft eller vann allerede er i bevegelse på en roterende jord. Mot høyre på nordlig halvkule, mot venstre på sørlig. Ved ekvator er avbøyningen null."
      />

      <RotationSpeedDiagram />
      <PolewardParcelDiagram />

      <p>Tre ledd må sitte samtidig for at værsystemene skal få den formen vi ser på kartet.</p>
      <p>
        Først trykkgradienten. Luft går fra høyt mot lavt trykk. Jo tettere isobarene ligger, desto
        sterkere er denne driften.
      </p>
      <OrdBoks
        ord="Isobar og trykkgradient"
        barn="Isobar: linje med samme lufttrykk på værkartet. Trykkgradient: hvor fort trykket faller. Tette isobarer = sterk drift fra H mot L."
      />
      <p>Så coriolis. Så fort luften får fart, dreies den. På nordlig halvkule: mot høyre.</p>
      <p>
        Når trykkgradient og coriolis veier hverandre opp, går vinden ikke lenger inn mot
        lavtrykket. Den går langs isobarene, med lavtrykk til venstre på nordlig halvkule. Det
        kalles geostrofisk vind (NOAA, u.å.). Det er den vanlige balansen høyt oppe og til havs,
        borte fra bakken. På sørlig halvkule er alt speilvendt: lavtrykk til høyre.
      </p>
      <OrdBoks
        ord="Geostrofisk vind"
        barn="Når trykkgradient og coriolis veier hverandre opp. På nordlig halvkule: vinden går langs isobarene, med lavtrykk til venstre. Vanlig balanse høyt oppe og til havs."
      />

      <CoriolisDiagram />
      <TradeDeflectionDiagram />

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
      <CoriolisScaleDiagram />

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
        Samme logikk styrer havet. Vind på overflaten gir et Ekman-lag: nettotransporten går 90
        grader til høyre for vinden på nordlig halvkule. Det er derfor kystvind kan gi oppwelling.
        Mer om det under{" "}
        <Link to="/tema/havstrommer" className="text-primary underline-offset-2 hover:underline">
          havstrømmer
        </Link>
        .
      </p>
      <OrdBoks
        ord="Ekman-lag"
        barn="Vindstresset på overflaten. Nettotransporten går 90 grader til høyre for vinden på nordlig halvkule. Derfor kan kystvind gi oppwelling."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Jetstrømmen svinger</h2>
      <p>
        Coriolis er ikke like sterk overalt. Ved ekvator er den null. Ved polene er den sterkest. En
        luftpakke som flytter seg mot polene, merker derfor en sterkere dreining. En som flytter seg
        mot ekvator, merker en svakere.
      </p>
      <p>
        Polarfrontjeten er et smalt belte med sterk vestavind i øvre troposfære, langs polarfronten.
        Den subtropiske jetstrømmen ligger nærmere 30° og henger sammen med Hadley-cellens
        nedsynking. Polarfrontjeten er den som styrer lavtrykkene mot Norge.
      </p>
      <OrdBoks
        ord="Jetstrøm"
        barn="Et smalt belte med sterk vestavind høyt oppe. Polarfrontjeten ligger der temperaturkontrasten er sterkest. Den subtropiske jetstrømmen ligger nærmere 30°."
      />

      <CoriolisLatitudeDiagram />

      <p>
        Coriolis er sterkere mot polene. Luft som går nordover, dreies mer og mer mot øst. Luft som
        går sørover, dreies mindre. En vestavinds-jet går derfor ikke rett: den svinger i store
        bølger — Rossby-bølger. En bølge som peker mot polen kalles rygg og fører mild luft
        nordover. En bølge som peker mot ekvator kalles tråg og fører kald luft sørover.
      </p>
      <OrdBoks
        ord="Rossby-bølger"
        barn="Store svinger i jetstrømmen nord–sør. De oppstår fordi coriolis endrer seg med breddegraden. Rygg: mild luft nordover. Tråg: kald luft sørover."
      />

      <ZonalMeridionalDiagram />

      <p>
        Når formen går fra zonal (nesten rett vest–øst) til meridional (store bølger), flyttes varm
        og kald luft langt i nord–sør-retning. En rygg kan bli stående. Det kalles blocking.
        Vestavindsbeltet stanser. Høytrykket over Skandinavia kan ligge i dagevis. Om vinteren: kald
        inversjon i dalene. Om sommeren: tørt og varmt. Stormbanen går da sør eller nord for oss,
        ikke tvers over.
      </p>
      <OrdBoks
        ord="Zonal og meridional"
        barn="Zonal: jet og vestavind går nesten rett vest–øst. Meridional: store bølger nord–sør. Meridional flytter varm og kald luft langt."
      />
      <OrdBoks
        ord="Blocking"
        barn="En rygg som blir stående. Vestavindsbeltet stanser. Lavtrykkene styres sør eller nord for oss, ikke tvers over."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        NAO flytter Norges jet
      </h2>
      <p>
        NAO er trykkforskjellen mellom Azorhøytrykket og Islandslavtrykket (NOAA, u.å.). Det er den
        viktigste svingningen for jetstrømmen inn mot Norge.
      </p>
      <OrdBoks
        ord="NAO"
        barn="Trykkforskjellen mellom Azorhøytrykket og Islandslavtrykket. Start her for norsk jet og kystvær."
      />

      <PhotoFigure
        src="/images/fig-nao.jpg"
        alt="Nord-Atlanteren fra bane: klar luft i sørvest, syklon spiralskyer lenger nord, skystrøk mot Norge"
        heading="Scenen for NAO"
        caption="Sørvest: mer høytrykk og klarere luft (Azorene). Nord: mer lavtrykk og spiraler (Island). Skystrøkene imellom er vestavinden inn mot Norge."
        arrows={[{ d: "M 28 62 L 72 38", tone: "teal", width: 1.3 }]}
        marks={[
          { x: 6, y: 58, n: "H", text: "Azorhøytrykk", tone: "warm" },
          { x: 48, y: 12, n: "L", text: "Islandslavtrykk", tone: "low" },
        ]}
        points={[
          { n: "H", label: "Høytrykk i sør: luft synker, ofte klarere." },
          { n: "L", label: "Lavtrykk i nord: luft stiger, stormbane." },
        ]}
      />

      <NaoDiagram />

      <p>
        Ved positiv NAO er gradienten stor. Vestavindsbeltet og polarfrontjeten ligger lenger nord
        og er sterkere. Stormbanen går mot Island, Norskehavet og Nord-Norge. Sør- og Midt-Norge får
        milde, våte vintrer. Formen er mer zonal.
      </p>
      <p>
        Ved negativ NAO er gradienten liten. Jetstrømmen svekkes, ligger lenger sør, eller brytes i
        blocking. Skandinavia får oftere kald, mer kontinental vinter. Formen er mer meridional.
      </p>

      <p>
        ENSO — El Niño og La Niña i tropisk Stillehav — flytter hvor tropisk luft stiger, og dermed
        jetstrømmene over Stillehavet og Amerika (NOAA, u.å.). Koblingen til norsk vinter er svakere
        og mer usikker enn NAO. Mekanismen (passater, varmt vann, konveksjon) står under{" "}
        <Link to="/tema/klima" className="text-primary underline-offset-2 hover:underline">
          klima
        </Link>
        .
      </p>
      <p>
        IOD, den indiske dipolen, er en øst–vest-svingning i tropisk Indiahav. Den betyr mest for
        Øst-Afrika, Indonesia og Australia. Koblingen til polarfrontjeten over Norge er indirekte.
      </p>
      <OrdBoks
        ord="IOD"
        barn="Øst–vest-svingning i tropisk Indiahav. Koblingen til polarfrontjeten over Norge er indirekte."
      />

      <Callout title="Vanlige misforståelser">
        <p>
          Corioliseffekten er ikke en kraft som starter vinden. Den virker bare når noe beveger seg.
          Vasken og toalettet lyver: der avgjør kummens form. Nær bakken vinner trykkgradienten
          litt, og vinden krysser isobarene inn mot lavtrykk — derfor strømmer det inn mot L, ikke
          bare rundt.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Coriolis"
          def="Avbøyning når luft eller vann allerede beveger seg på en roterende jord. Høyre i nord, venstre i sør. Null ved ekvator."
        />
        <Term
          name="Geostrofisk vind"
          def="Når trykkgradient og coriolis veier hverandre opp. På nordlig halvkule: vind langs isobarene, lavtrykk til venstre."
        />
        <Term
          name="Rossby-bølger"
          def="Store svinger i jetstrømmen. Rygg: mild luft nordover. Tråg: kald luft sørover."
        />
        <Term
          name="Blocking"
          def="En rygg som blir stående. Vestavindsbeltet stanser. Lavtrykkene går sør eller nord for oss."
        />
        <Term
          name="NAO"
          def="Trykkforskjellen mellom Azorhøytrykket og Islandslavtrykket. Start her for norsk jet og kystvær."
        />
        <Term
          name="Ekman-lag"
          def="Nettotransport 90 grader til høyre for vinden på nordlig halvkule."
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
              "På nordlig halvkule bøyer den mot høyre. På sørlig mot venstre. Ved ekvator er avbøyningen null.",
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
              "Formen er coriolis pluss trykkgradient pluss friksjon. Mot klokka rundt lavtrykk i Norge.",
          },
          {
            prompt:
              "Når trykkgradient og coriolis veier hverandre opp på nordlig halvkule, hvor går vinden?",
            options: [
              "Rett inn mot lavtrykket. Det kalles passat.",
              "Langs isobarene, med lavtrykk til venstre. Det kalles geostrofisk vind.",
              "Rett mot ekvator. Det kalles blocking.",
              "90 grader til venstre for isobarene. Det kalles Ekman-lag.",
            ],
            answer: 1,
            explain: "Geostrofisk vind. På sørlig halvkule er det speilvendt.",
          },
          {
            prompt: "Hvorfor styrer ikke coriolis vannet i en vask?",
            options: [
              "Fordi vann ikke kan dreies.",
              "Fordi coriolis er for svak på så liten skala og så kort tid. Kummens form avgjør.",
              "Fordi vasken står i tropene.",
              "Fordi coriolis bare virker i luft.",
            ],
            answer: 1,
            explain:
              "Coriolis vinner på hundrevis av kilometer og over timer og døgn. Ikke på en meter i et minutt.",
          },
          {
            prompt: "Hva er NAO, og hvorfor betyr den mer for Norge enn ENSO?",
            options: [
              "En havstrøm utenfor Peru. Den driver Golfstrømmen.",
              "Trykkforskjellen Azorene–Island. Den flytter vestavind og stormbane rett inn mot oss.",
              "En Rossby-bølge som alltid peker mot Finnmark.",
              "At vasken spinner mot klokka.",
            ],
            answer: 1,
            explain:
              "ENSO sitter i tropisk Stillehav. NAO sitter i Nord-Atlanteren, der Norges vær lages.",
          },
        ]}
      />
    </TopicLayout>
  );
}
