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
      lead="Regn, elver, isbreer og vulkaner endrer berg og vann hele tiden. I dette kapitlet ser vi på jorda som fem delsystemer, sfærer, som utveksler masse og energi. Vi følger særlig hvordan atmosfæren, kryosfæren og biosfæren påvirker geosfæren og hydrosfæren: elva som graver, isbreen som sliper, vulkanen som sender gass og aske til atmosfæren, og den langsomme karbonat–silikat-syklusen."
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
