import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("jordsystemene")!;

export const Route = createFileRoute("/geofag-1/jordsystemene")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/jordsystemene",
    }),
  component: JordsystemenePage,
});

function JordsystemenePage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Jorda er fem delsystemer som utveksler masse og energi. I geofag 1 er geosfæren og hydrosfæren mottakerne: berg, løsmasser, jord, elver, innsjøer og grunnvann. Atmosfæren, kryosfæren og biosfæren er med som drivere. Her lærer du å følge hvilken sfære som endres først, på hvilken tidsskala, og hvordan berg og ferskvann svarer."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1",
        label: "Oversikt: Geofag 1",
      }}
      next={{
        to: "/geofag-1/platetektonikk",
        label: "Neste: Platetektonikk",
      }}
      kilder={KILDER.jordsystemene}
      posterSlug="jordsystemene"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
