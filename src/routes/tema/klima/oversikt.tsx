import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

const LEAD =
  "Klima er det langvarige mønsteret i været. Denne siden eier stråling, pådriv og tilbakekobling. Svingningene har egne sider.";

export const Route = createFileRoute("/tema/klima/oversikt")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("oversikt") };
  },
  head: () =>
    topicHead({
      title: "Klimasystemet (oversikt) · Geofag 2",
      description:
        "Stråling, pådriv og tilbakekobling i klimasystemet, og hvordan menneskelig aktivitet forskyver energibalansen.",
      path: "/tema/klima/oversikt",
    }),
  component: KlimaOversiktPage,
});

function KlimaOversiktPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Jordsystemet"
      title="Klimasystemet (oversikt)"
      lead={LEAD}
      banner="/images/banner-klima.jpg"
      bannerAlt="Grønlands innlandsis mot mørkt polarhav"
      prev={{ to: "/tema/klima", label: "Tilbake: Klima og klimasystemer" }}
      next={{ to: "/tema/klima/enso", label: "Neste: ENSO" }}
      kilder={KILDER.oversikt}
      posterSlug="oversikt"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
