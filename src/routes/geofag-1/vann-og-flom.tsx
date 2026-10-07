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
      lead="Hydrologi er vannet på landjorden. Det hydrologiske kretsløpet flytter ferskvann mellom luft, mark, grunnvann og elv. En akvifer er berg eller løsmasse som kan lagre og avgi grunnvann. Du skal gjøre rede for kretsløpet, og se hvordan været og menneskelig aktivitet endrer flom."
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
