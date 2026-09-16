import { createFileRoute } from "@tanstack/react-router";
import { JET_SEKSJONER } from "@/content/g2/jetstrommer";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/jetstrommer")({
  head: () =>
    topicHead({
      title: "Jetstrømmer og stormbaner · Geofag 2",
      description: "Polarfrontjet, subtropisk jet, termisk vind, Rossby-bølger og jetkjernen.",
      path: "/tema/jetstrommer",
    }),
  component: JetstrommerPage,
});

function JetstrommerPage() {
  return (
    <TopicLayout
      kicker="Den globale atmosfæren"
      title="Jetstrømmer og stormbaner"
      lead="Jetstrømmene er atmosfærens motorveier i grenselandet mellom troposfæren og stratosfæren."
      banner="/images/fig-jet.jpg"
      bannerAlt="Tynn, rask skyelv høyt over havet mot jordas krumning"
      prev={{ to: "/tema/vindsystemet", label: "Forrige: Vindsystemet" }}
      next={{ to: "/tema/coriolis", label: "Neste: Corioliseffekten" }}
      kilder={KILDER.jetstrommer}
    >
      {JET_SEKSJONER.map((Seksjon, i) => (
        <Seksjon key={i} />
      ))}
    </TopicLayout>
  );
}
