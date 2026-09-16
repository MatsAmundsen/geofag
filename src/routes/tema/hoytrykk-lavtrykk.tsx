import { createFileRoute } from "@tanstack/react-router";
import { TRYKK_SEKSJONER } from "@/content/g2/hoytrykk-lavtrykk";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/hoytrykk-lavtrykk")({
  head: () =>
    topicHead({
      title: "Høytrykk og lavtrykk · Geofag 2",
      description: "Lufttrykk, konvergens, subsidens, geostrofi, fønvind og sjøbris.",
      path: "/tema/hoytrykk-lavtrykk",
    }),
  component: TrykkPage,
});

function TrykkPage() {
  return (
    <TopicLayout
      kicker="Atmosfæren"
      title="Høytrykk og lavtrykk"
      lead="Der luften stiger, faller trykket og det blir skyer. Der luften synker, stiger trykket og himmelen blir klar."
      banner="/images/banner-trykk.jpg"
      bannerAlt="Kyst i to slags vær: storm og lavtrykk til venstre, klar himmel og høytrykk til høyre"
      next={{ to: "/tema/vindsystemet", label: "Neste: Vindsystemet" }}
      kilder={KILDER.trykk}
    >
      {TRYKK_SEKSJONER.map((Seksjon, i) => (
        <Seksjon key={i} />
      ))}
    </TopicLayout>
  );
}
