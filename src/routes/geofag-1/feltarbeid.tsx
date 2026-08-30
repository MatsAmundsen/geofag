import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { FeltbokDiagram } from "@/components/diagrams/ressurser";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";

const tema = gf1Theme("feltarbeid")!;

export const Route = createFileRoute("/geofag-1/feltarbeid")({
  component: FeltarbeidPage,
});

function FeltarbeidPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Felt er ikke en tur der klassen ser på fjellet. Du skal planlegge, samle georefererte data, ivareta HMS, bearbeide, tolke og presentere. Uten sted og tid er dataene ikke geofaglige."
      banner={tema.image}
      bannerAlt={tema.alt}
      videoTopic="feltarbeid"
      prev={{
        to: "/geofag-1/geologiske-ressurser",
        label: "Forrige: Geologiske ressurser",
      }}
      next={{
        to: "/geofag-1",
        label: "Tilbake til Geofag 1",
      }}
      kilder={KILDER.feltarbeid}
    >
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Problemstilling</h2>
      <p>
        Start med et avgrenset spørsmål knyttet til geosfære eller hydrosfære. «Hvordan varierer
        kornstørrelse fra raet til ravinen?» er en problemstilling. «Geologi» er det ikke.
        Tyngdepunktet skal ikke gli over i vær, sjø eller brefront.
      </p>
      <p>
        Kjeden er fast: planlegg, samle, bearbeid, tolk, presenter. Ta med kart, utstyr, tillatelser
        og HMS før du går ut.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Georefererte data</h2>
      <p>
        Georeferering knytter observasjonen til sted og tid. Feltboka er primærkilden: punkt-ID,
        tid, vær, måling, usikkerhet, skisse. Foto og GPS supplerer. De erstatter ikke boka.
        Mobil-GPS holder til skolefelt, typisk noen meter, ikke til centimeter på en skredkant.
      </p>
      <FeltbokDiagram />
      <OrdBoks
        ord="georeferert"
        barn="Observasjon knyttet til sted og tid. Uten det er dataene ikke geofaglige. Feltboka er primærkilden. Foto og GPS supplerer."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">HMS</h2>
      <p>
        HMS er fag, ikke vedlegg. Én side: fare, sannsynlighet, konsekvens, tiltak. Steinsprang,
        kvikkleire under marin grense, trafikk i grustak, elv og flom. Sikkerhet går foran data.
        Risiko er vurdering før utfallet, ikke at det gikk galt.
      </p>
      <OrdBoks
        ord="risiko"
        barn="Vurdering før utfallet: fare, sannsynlighet, konsekvens, tiltak. Ikke at det gikk galt. Sikkerhet går foran data."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Feltrapport</h2>
      <p>
        Rapporten skal vise kjeden: problemstilling, plan og HMS, georefererte data, bearbeiding,
        tolkning og det du ikke kan konkludere. I Vestland skal privatister ha feltrapport på papir
        ved oppmøte (Vestland fylkeskommune, u.å.). Uten rapport: ingen eksamen. PDF på PC holder
        ikke der. Rogaland har skrevet det motsatte: kandidater trenger ikke ta med felt (Rogaland
        fylkeskommune, u.å.). Kravet om papir er fylkespraksis, ikke nasjonalt. Ha rapporten likevel.
        I Vestland er den obligatorisk.
      </p>

      <Callout title="Kompetansemål">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
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
            prompt: "Hva er en problemstilling i felt?",
            options: [
              "«Geologi».",
              "«Hvordan varierer kornstørrelse fra raet til ravinen?» er en problemstilling. «Geologi» er det ikke.",
              "Et tyngdepunkt i vær, sjø eller brefront.",
              "En tur der klassen ser på fjellet.",
            ],
            answer: 1,
            explain:
              "Start med et avgrenset spørsmål knyttet til geosfære eller hydrosfære.",
          },
          {
            prompt: "Hva er primærkilden i felt?",
            options: [
              "Foto og GPS. De erstatter feltboka.",
              "Feltboka. Foto og GPS supplerer. De erstatter ikke boka.",
              "Mobil-GPS til centimeter på en skredkant.",
              "Et punkt uten sted og tid.",
            ],
            answer: 1,
            explain:
              "Georeferering knytter observasjonen til sted og tid. Uten det er dataene ikke geofaglige.",
          },
          {
            prompt: "Hva er risiko i felt?",
            options: [
              "At det gikk galt.",
              "Vurdering før utfallet: fare, sannsynlighet, konsekvens, tiltak. Ikke at det gikk galt.",
              "Bare steinsprang.",
              "Et vedlegg etter at dataene er samlet.",
            ],
            answer: 1,
            explain: "Sikkerhet går foran data. HMS er fag, ikke vedlegg.",
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
