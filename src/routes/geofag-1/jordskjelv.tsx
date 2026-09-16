import { createFileRoute } from "@tanstack/react-router";
import { JORDSKJELV_SEKSJONER } from "@/content/g1/jordskjelv";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("jordskjelv")!;

export const Route = createFileRoute("/geofag-1/jordskjelv")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/jordskjelv",
    }),
  component: JordskjelvPage,
});

function JordskjelvPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Jordskjelv er elastisk spenning som bygges opp langs låste forkastninger og frigjøres i ett brøkdels sekund."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{ to: "/geofag-1/vulkaner", label: "Forrige: Vulkaner" }}
      next={{ to: "/geofag-1/bergarter", label: "Neste: Bergarter og mineraler" }}
      kilder={KILDER.jordskjelv}
    >
      {JORDSKJELV_SEKSJONER.map((Seksjon, i) => (
        <Seksjon key={i} />
      ))}
    </TopicLayout>
  );
}
