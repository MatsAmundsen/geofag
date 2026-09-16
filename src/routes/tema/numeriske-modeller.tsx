import { createFileRoute } from "@tanstack/react-router";
import { MODELLER_SEKSJONER } from "@/content/g2/numeriske-modeller";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/numeriske-modeller")({
  head: () =>
    topicHead({
      title: "Numeriske modeller · Geofag 2",
      description:
        "Primitivligninger, rutenett, parametrisering, dataassimilering, Lorenz og ensemblevarsling.",
      path: "/tema/numeriske-modeller",
    }),
  component: Page,
});

function Page() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Numeriske beregninger"
      title="Numeriske modeller: Fra fysiske lover til superdatamaskiner"
      lead="En numerisk modell er naturens egne bevaringslover skrevet om til differensialligninger og løst på et tredimensjonalt rutenett."
      banner="/images/fig-klimasystem.jpg"
      bannerAlt="Jorda fra verdensrommet med tynn atmosfære, hav og is — det modellene beskriver"
      prev={{ to: "/tema/kryosfaeren", label: "Forrige: Kryosfæren" }}
      next={{ to: "/tema/paleoklima", label: "Neste: Paleoklima" }}
      kilder={KILDER.modeller}
    >
      {MODELLER_SEKSJONER.map((Seksjon, i) => (
        <Seksjon key={i} />
      ))}
    </TopicLayout>
  );
}
