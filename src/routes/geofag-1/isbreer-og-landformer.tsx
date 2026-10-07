import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("isbreer-og-landformer")!;

export const Route = createFileRoute("/geofag-1/isbreer-og-landformer")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/isbreer-og-landformer",
    }),
  component: IsbreerOgLandformerPage,
});

function IsbreerOgLandformerPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Det er isen som har formet mest av landskapet vi ser i Norge i dag. Gjennom istidene grov isbreene ut fjorder, daler og botner, og da isen smeltet, la den igjen morener, grusrygger og deltaer. I dette kapittelet lærer du hvordan en isbre beveger seg, hvordan den eroderer og avsetter, og hvordan du kjenner igjen sporene etter isen i landskapet."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/landformer",
        label: "Forrige: Landformer og geomorfologiske prosesser",
      }}
      next={{
        to: "/geofag-1/vann-og-flom",
        label: "Neste: Vann og flom",
      }}
      kilder={KILDER.isbre}
      posterSlug="isbreer-og-landformer"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
