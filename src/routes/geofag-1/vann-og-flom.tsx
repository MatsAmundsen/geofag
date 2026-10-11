import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("vann-og-flom")!;

export const Route = createFileRoute("/geofag-1/vann-og-flom")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/vann-og-flom",
    }),
  component: VannOgFlomPage,
});

function VannOgFlomPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Vannet renner i elver og bekker, ligger lagret i snø, innsjøer og grunnvann, og gir oss nesten all strømmen vi bruker. Det samme vannet blir en fare når det kommer for mye av det på en gang, som under ekstremværet Hans i 2023. I dette kapitlet følger vi ferskvannet gjennom det hydrologiske kretsløpet, ser hvordan flom oppstår og hvordan vi mennesker endrer kretsløpet, og vurderer hvordan ferskvannet kan brukes bærekraftig, både i Norge og i verden."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/isbreer-og-landformer",
        label: "Forrige: Isbreer og landformer",
      }}
      next={{
        to: "/geofag-1/skred",
        label: "Neste: Skred",
      }}
      kilder={KILDER.vannFlom}
      posterSlug="vann-og-flom"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
