import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

const LEAD =
  "Denne siden er kartet. Oversikten eier stråling, pådriv og tilbakekobling. ENSO, IOD, NAO og AMOC eier hver sin svingning. Kryosfæren eier isen som jobber i år.";

export const Route = createFileRoute("/tema/klima/")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("klima") };
  },
  head: () =>
    topicHead({
      title: "Klima og klimasystemer · Geofag 2",
      description:
        "Kart over klimasystemet: oversikt med stråling og tilbakekobling, deretter ENSO, IOD, NAO og AMOC.",
      path: "/tema/klima",
    }),
  component: KlimaHubPage,
});

function KlimaHubPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Jordsystemet"
      title="Klima og klimasystemer"
      lead={LEAD}
      banner="/images/banner-klima.jpg"
      bannerAlt="Grønlands innlandsis mot mørkt polarhav"
      prev={{ to: "/tema/havstrommer", label: "Forrige: Havstrømmer" }}
      next={{ to: "/tema/klima/oversikt", label: "Neste: Klimasystemet (oversikt)" }}
      kilder={KILDER.klima}
      posterSlug="klima"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
