import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { topicHead } from "@/lib/seo";

const LEAD =
  "Klimatilpasning er å forstå konsekvensene av at klimaet endrer seg, og å sette inn tiltak som reduserer skade. Å redusere klimaendringene og å tilpasse seg dem er to ulike svar.";

export const Route = createFileRoute("/tema/tilpasning")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("tilpasning") };
  },
  head: () =>
    topicHead({
      title: "Konsekvenser og tilpasning · Geofag 2",
      description: LEAD,
      path: "/tema/tilpasning",
    }),
  component: TilpasningPage,
});

function TilpasningPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Samfunn"
      title="Konsekvenser og tilpasning"
      lead={LEAD}
      banner="/images/fig-stormflo.jpg"
      bannerAlt="Stormflo mot kai og bebyggelse"
      prev={{ to: "/tema/vaerkatastrofer", label: "Forrige: Værkatastrofer" }}
      next={{ to: "/tema/energi-hav-luft", label: "Neste: Energi fra hav og luft" }}
      kilder={KILDER_G2.tilpasning}
      posterSlug="tilpasning"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
