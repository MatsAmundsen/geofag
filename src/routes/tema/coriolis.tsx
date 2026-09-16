import { createFileRoute } from "@tanstack/react-router";
import { CORIOLIS_SEKSJONER } from "@/content/g2/coriolis";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/coriolis")({
  head: () =>
    topicHead({
      title: "Corioliseffekten · Geofag 2",
      description: "Coriolis som geometrisk avbøyning, f = 2Ω sin φ, geostrofi, Rossby og Ekman.",
      path: "/tema/coriolis",
    }),
  component: CoriolisPage,
});

function CoriolisPage() {
  return (
    <TopicLayout
      kicker="Atmosfæren og havets dynamikk"
      title="Corioliseffekten"
      lead="Corioliseffekten er et geometrisk resultat av at vi observerer vær og havstrømmer fra en jordklode som snurrer."
      banner="/images/banner-coriolis.jpg"
      bannerAlt="Jorda med spiralformede syklonskyer"
      prev={{ to: "/tema/jetstrommer", label: "Forrige: Jetstrømmer" }}
      next={{ to: "/tema/havstrommer", label: "Neste: Havstrømmer" }}
      kilder={KILDER.coriolis}
    >
      {CORIOLIS_SEKSJONER.map((Seksjon, i) => (
        <Seksjon key={i} />
      ))}
    </TopicLayout>
  );
}
