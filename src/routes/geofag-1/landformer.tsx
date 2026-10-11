import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("landformer")!;

export const Route = createFileRoute("/geofag-1/landformer")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/landformer",
    }),
  component: LandformerPage,
});

function LandformerPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Landskapet rundt oss er formet av krefter som løfter berggrunnen, og krefter som bryter den ned og flytter materialet. Forvitring, rennende vann og is har skåret ut alt fra viddene til fjordene og strandflaten, og i dag er også mennesket med på å endre landformene. I dette kapitlet lærer du hvordan forvitring, erosjon og avsetning virker, hvilke landformer elvene lager, og hvordan vi påvirker landskapet."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/norges-geologi",
        label: "Forrige: Norges geologiske historie",
      }}
      next={{
        to: "/geofag-1/isbreer-og-landformer",
        label: "Neste: Isbreer og landformer",
      }}
      kilder={KILDER.landformer}
      posterSlug="landformer"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
