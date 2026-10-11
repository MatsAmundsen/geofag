import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("norges-geologi")!;

export const Route = createFileRoute("/geofag-1/norges-geologi")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/norges-geologi",
    }),
  component: NorgesGeologiPage,
});

function NorgesGeologiPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Berggrunnen i Norge har en historie på nesten 3 milliarder år. I fjellene, langs kysten og i byene våre finner vi spor etter gamle fjellkjeder, havbunn som ble skjøvet opp på land, en riftdal med vulkaner, et hav som åpnet seg og en innlandsis som presset landet ned. I dette kapitlet følger vi denne historien fra det eldste grunnfjellet til landhevingen som fortsatt pågår."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/geologisk-tid",
        label: "Forrige: Geologisk tid og datering",
      }}
      next={{
        to: "/geofag-1/landformer",
        label: "Neste: Landformer og geomorfologi",
      }}
      kilder={KILDER["norges-geologi"]}
      posterSlug="norges-geologi"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
