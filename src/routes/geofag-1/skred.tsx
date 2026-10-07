import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("skred")!;

export const Route = createFileRoute("/geofag-1/skred")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/skred",
    }),
  component: SkredPage,
});

function SkredPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Skred er masse av fjell, stein, jord, leire eller snø som beveger seg ned en skråning. I dette kapittelet er det fjell og løsmasse. Kvikkleire er marin leire der saltet er vasket ut, og den kan bli flytende når den overbelastes. Du skal gjøre rede for skredfare, og vurdere hvordan vi kan forebygge og tilpasse oss."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/vann-og-flom",
        label: "Forrige: Vann og flom",
      }}
      next={{
        to: "/geofag-1/geologiske-ressurser",
        label: "Neste: Geologiske ressurser",
      }}
      kilder={KILDER.skred}
      posterSlug="skred"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
