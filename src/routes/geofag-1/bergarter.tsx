import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("bergarter")!;

export const Route = createFileRoute("/geofag-1/bergarter")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/bergarter",
    }),
  component: BergarterPage,
});

function BergarterPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Et mineral har krystallstruktur og en bestemt kjemi. En bergart er fast fjell av ett eller flere mineraler, og sediment er løst materiale som ennå ikke er blitt bergart. Du skal utforske mineralgrupper, bergartsgrupper og sedimenter, og tolke hvor de passer i bergartssyklusen. Forvitring bryter ned berget på stedet, før erosjon flytter det."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/jordskjelv",
        label: "Forrige: Jordskjelv og tsunamier",
      }}
      next={{
        to: "/geofag-1/norges-geologi",
        label: "Neste: Norges geologiske historie",
      }}
      kilder={KILDER.bergarter}
      posterSlug="bergarter"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
