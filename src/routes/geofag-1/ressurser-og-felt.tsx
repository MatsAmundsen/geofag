import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { FeltbokDiagram, FraBergartTilBruddDiagram } from "@/components/diagrams/ressurser";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { gf1Theme } from "@/lib/nav";

const tema = gf1Theme("ressurser-og-felt")!;

export const Route = createFileRoute("/geofag-1/ressurser-og-felt")({
  component: RessurserOgFeltPage,
});

function RessurserOgFeltPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="En forekomst er geologien. Den blir en ressurs først når innhold, mengde, teknologi, pris, miljøkrav og samfunnsgodkjenning gjør utvinning mulig. Bergarten flytter seg ikke. Ressursbildet gjør det."
      banner={tema.image}
      bannerAlt={tema.alt}
      videoTopic="ressurser-og-felt"
      prev={{
        to: "/geofag-1/vann-flom-og-skred",
        label: "Forrige: Vann, flom og skred",
      }}
      next={{
        to: "/geofag-1",
        label: "Tilbake til Geofag 1",
      }}
    >
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Danning</h2>
      <p>
        Malm er en bergart med metallinnhold høyt nok til at utvinning kan lønne seg. Resten av
        fjellet blir avgang. Metallet ligger ikke rent i fjellet.
      </p>
      <p>
        Magmatisk malm dannes når magma avkjøles. Tunge, tidlige krystaller kan synke og danne lag.
        Hydrotermal malm felles fra varme, mineralrike væsker langs sprekker. Mange av Norges
        historiske kobber- og sinkgruver, Røros, Løkken og Sulitjelma, hører hit. Sedimentær malm
        anrikes ved forvitring, transport og avsetning. Når du gjør rede for danning, skal du peke
        på prosessen og hvor i bergartssyklusen den sitter, ikke bare på metallet.
      </p>
      <OrdBoks
        ord="malm"
        barn="Bergart med metallinnhold høyt nok til at utvinning kan lønne seg. Resten blir avgang. Metallet ligger ikke rent i fjellet."
      />
      <p>
        Naturstein sages, spaltes eller hugges. Larvikitt er Norges nasjonalbergart og landets
        viktigste naturstein. Den er en dypbergart med to feltspattyper som gir fargespill, dannet
        for cirka 290 millioner år siden i Oslofeltet, og brytes i Vestfold og Telemark. Marmor og
        skifer er andre natursteiner.
      </p>
      <p>
        Pukk er knust fjell: gneis, granitt, kvartsitt, gabbro eller syenitt. Sand og grus kommer
        fra løsmasser, særlig glasifluviale avsetninger. Det er ikke fornybart på menneskelig
        tidsskala. Pukk og grus er samfunnets største mineraluttak i volum. De kan ikke importeres
        billig over lange avstander. Derfor ligger uttak i de fleste kommuner.
      </p>
      <OrdBoks
        ord="pukk"
        barn="Knust fjell: gneis, granitt, kvartsitt, gabbro eller syenitt. Samfunnets største mineraluttak i volum. Ikke fornybart på menneskelig tidsskala."
      />

      <PhotoFigure
        src="/images/fig-dagbrudd.jpg"
        alt="Åpent steinbrudd i gneis med knust stein og fjord i bakgrunnen"
        heading="Pukk er volum"
        caption="Pukk og grus er samfunnets største mineraluttak i volum. De kan ikke importeres billig over lange avstander. Derfor ligger uttak i de fleste kommuner."
        marks={[
          { x: 8, y: 16, n: "1", text: "Knust fjell", tone: "warm" },
          { x: 62, y: 52, n: "2", text: "Lokalt uttak", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Pukk er knust fjell. Samfunnets største mineraluttak i volum." },
          {
            n: "2",
            label:
              "De kan ikke importeres billig over lange avstander. Derfor ligger uttak i de fleste kommuner.",
          },
        ]}
      />

      <p>
        Olje og gass er et petroleumssystem. Fem brikker må ligge: kildebergart, migrasjon,
        reservoar, felle og takbergart, pluss tid og temperatur. Kilden er organisk rik skifer. På
        norsk sokkel er Draupneformasjonen hovedkilde for de fleste feltene, også Ekofisk. Ved
        80–120 °C omdannes kerogen til olje, ved høyere temperatur til gass. Petroleumen vandrer
        inn i porøs bergart. En antiklinal, saltkuppel, forkastning eller stratigrafisk avsnøring,
        dekket av tett skifer, holder den. Uten felle lekker alt til overflaten.
      </p>
      <p>
        Ekofisk ble påvist i 1969. Reservoaret er oppsprukket kritt på om lag 3000 m. Olje kommer
        ikke av dinosaurer. Hovedkilden er marint plankton.
      </p>
      <FraBergartTilBruddDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Kartlegging og utvinning
      </h2>
      <p>
        Kartlegging er en kjede. NGU gir berggrunn og løsmasse. Geofysikk fanger anomalier. På
        sokkelen er refleksjonsseismikk hovedverktøyet. Boring er den eneste metoden som bekrefter
        innhold. En indikasjon i kart eller seismikk er ikke en reserve.
      </p>
      <p>
        Dagbrudd brukes til pukk, mange industrimineraler, noe malm og naturstein. Overdekning
        fjernes, stuff sprenges, massene knuses og sorteres. Arealinngrepet er synlig. Støy, støv
        og avrenning er lokale konflikter. Underjordsgruve har mindre overflate, annen HMS. På
        sokkelen går brønner inn i reservoaret. Ekofisk startet med forventet utvinningsgrad 17
        prosent. Vanninjeksjon fra 1987 har løftet den til over 50 prosent.
      </p>
      <p>
        Oppredning skiller verdifulle mineraler fra gangbergart. Resten er avgang. Den deponeres på
        land, i dam eller i sjø.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Bærekraft og inngrep
      </h2>
      <p>
        Utvinning er arealinngrep. Avgang kan gi sur avrenning. Sjødeponi endrer bunnfauna lokalt.
        Petroleum gir inntekter og CO₂. Grønn omstilling reduserer oljebehov, men øker behovet for
        kobber, nikkel, kvarts og pukk. Resirkulering dekker bare en del. Du kan ikke resirkulere
        deg ut av alle gruver i dette tiåret. Du kan heller ikke bruke det som blankofullmakt.
      </p>
      <p>
        Å verne alt uten å peke på hvor pukken skal komme fra, er ikke en komplett drøfting. Hvert
        uttak er likevel et inngrep: støy, støv, landskap, lokal vei.
      </p>
      <p>
        Fakta og verdier er ikke det samme. Fakta har kilde. Verdier har ikke geologisk fasit: hvor
        stor naturkostnad som er akseptabel, om Norge skal ta mer av Europas gruvedrift, om
        oljeleting etter 2030 er forenlig med klimamål.
      </p>
      <Callout title="Engebø er en drøfting">
        <p>
          Engebø i Førdefjorden er en drøfting, ikke et fasitsvar. Fakta: prosjektet tar ut rutil,
          et titanråstoff, og granat, med sjødeponi i nasjonal laksefjord. Høyesterett kjente
          tillatelsene ugyldige 17. juni 2026 fordi begrunnelsen ikke oppfylte vanndirektivet.
          Endelig vedtak om midlertidig tillatelse var ikke ferdig 28. august 2026. Verdier:
          arbeidsplasser og europeisk råvare mot fjord, villaks og føre-var. Urfolk er ikke kjernen
          i denne saken. Jussen kan stoppe et prosjekt selv når geologien og investeringene er på
          plass.
        </p>
      </Callout>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Feltarbeid</h2>
      <p>
        Felt er ikke en tur der klassen ser på fjellet. Du skal planlegge, samle georefererte data,
        ivareta HMS, bearbeide, tolke og presentere. Uten sted og tid er dataene ikke geofaglige.
      </p>
      <p>
        Start med en problemstilling. «Hvordan varierer kornstørrelse fra raet til ravinen?» er en.
        «Geologi» er det ikke. Velg geosfære eller hydrosfære. Tyngdepunktet skal ikke gli over i
        vær, sjø eller brefront.
      </p>
      <p>
        Georeferering knytter observasjonen til sted og tid. Feltboka er primærkilden: punkt-ID,
        tid, vær, måling, usikkerhet, skisse. Foto og GPS supplerer. De erstatter ikke boka.
        Mobil-GPS holder til skolefelt, typisk noen meter, ikke til centimeter på en skredkant.
      </p>
      <OrdBoks
        ord="georeferert"
        barn="Observasjon knyttet til sted og tid. Uten det er dataene ikke geofaglige. Feltboka er primærkilden. Foto og GPS supplerer."
      />
      <p>
        HMS er fag, ikke vedlegg. Én side: fare, sannsynlighet, konsekvens, tiltak. Steinsprang,
        kvikkleire under marin grense, trafikk i grustak, elv og flom. Sikkerhet går foran data.
        Risiko er vurdering før utfallet, ikke at det gikk galt.
      </p>
      <OrdBoks
        ord="risiko"
        barn="Vurdering før utfallet: fare, sannsynlighet, konsekvens, tiltak. Ikke at det gikk galt. Sikkerhet går foran data."
      />
      <p>
        Rapporten skal vise kjeden: problemstilling, plan og HMS, georefererte data, bearbeiding,
        tolkning og det du ikke kan konkludere. I Vestland skal privatister ha feltrapport på papir
        ved oppmøte. Uten rapport: ingen eksamen. PDF på PC holder ikke der. Rogaland har skrevet
        det motsatte: kandidater trenger ikke ta med felt. Kravet om papir er fylkespraksis, ikke
        nasjonalt. Ha rapporten likevel. I Vestland er den obligatorisk.
      </p>
      <FeltbokDiagram />

      <Callout title="Kompetansemål">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="malm"
          def="Bergart med metallinnhold høyt nok til at utvinning kan lønne seg. Resten blir avgang. Metallet ligger ikke rent i fjellet."
        />
        <Term
          name="pukk"
          def="Knust fjell: gneis, granitt, kvartsitt, gabbro eller syenitt. Samfunnets største mineraluttak i volum. Ikke fornybart på menneskelig tidsskala."
        />
        <Term
          name="georeferert"
          def="Observasjon knyttet til sted og tid. Uten det er dataene ikke geofaglige. Feltboka er primærkilden. Foto og GPS supplerer."
        />
        <Term
          name="risiko"
          def="Vurdering før utfallet: fare, sannsynlighet, konsekvens, tiltak. Ikke at det gikk galt. Sikkerhet går foran data."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva er malm?",
            options: [
              "Metall som ligger rent i fjellet.",
              "Bergart med metallinnhold høyt nok til at utvinning kan lønne seg. Resten blir avgang.",
              "Knust fjell til vei og betong.",
              "Organisk rik skifer som gir olje.",
            ],
            answer: 1,
            explain:
              "Metallet ligger ikke rent i fjellet. Resten av fjellet blir avgang.",
          },
          {
            prompt: "Hva er hovedkilden for Ekofisk?",
            options: [
              "Dinosaurer i krittreservoaret.",
              "Draupneformasjonen: marint plankton i organisk rik skifer.",
              "Selve krittreservoaret på om lag 3000 m.",
              "Larvikitt i Oslofeltet.",
            ],
            answer: 1,
            explain:
              "Olje kommer ikke av dinosaurer. Reservoaret er oppsprukket kritt. Kilden er organisk rik skifer.",
          },
          {
            prompt: "Hva er rett geofaglig lesning av Engebø?",
            options: [
              "Prosjektet er godkjent og kan starte.",
              "En drøfting, ikke et fasitsvar. Høyesterett kjente tillatelsene ugyldige 17. juni 2026 fordi begrunnelsen ikke oppfylte vanndirektivet.",
              "Prosjektet er stoppet for alltid.",
              "Geologien avgjør saken alene.",
            ],
            answer: 1,
            explain:
              "Endelig vedtak om midlertidig tillatelse var ikke ferdig 28. august 2026. Jussen kan stoppe et prosjekt selv når geologien er på plass.",
          },
          {
            prompt: "Hva gjelder for feltrapport i Vestland?",
            options: [
              "PDF på PC holder ved oppmøte.",
              "Privatister skal ha feltrapport på papir ved oppmøte. PDF holder ikke. Kravet er fylkespraksis, ikke nasjonalt.",
              "Felt er nasjonalt krav i alle fylker.",
              "I Vestland trenger kandidater ikke ta med felt.",
            ],
            answer: 1,
            explain:
              "Rogaland har skrevet det motsatte. Ha rapporten likevel. I Vestland er den obligatorisk.",
          },
        ]}
      />
    </TopicLayout>
  );
}
