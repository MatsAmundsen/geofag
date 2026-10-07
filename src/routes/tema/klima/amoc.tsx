import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

const LEAD =
  "Det trege beltet starter i Nord-Atlanteren, der kaldt og salt vann synker og går sørover i dypet. En runde tar omtrent tusen år. Mer regn og smeltevann kan bremse det.";

export const Route = createFileRoute("/tema/klima/amoc")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("amoc") };
  },
  head: () =>
    topicHead({
      title: "AMOC: Den atlantiske omveltningen · Geofag 2",
      description:
        "Den atlantiske omveltningen: kaldt og salt vann synker i Nord-Atlanteren, en runde tar omtrent tusen år, og mer regn og smeltevann kan bremse beltet.",
      path: "/tema/klima/amoc",
    }),
  component: AmocPage,
});

function AmocPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Klimasystemet · Nord-Atlanteren"
      title="AMOC: Den atlantiske omveltningen"
      lead={LEAD}
      banner="/images/fig-amoc.jpg"
      bannerAlt="Nord-Atlanteren med varm overflate og kaldt dyp"
      prev={{ to: "/tema/klima/nao", label: "Forrige: NAO" }}
      next={{ to: "/tema/kryosfaeren", label: "Neste: Kryosfæren" }}
      kilder={KILDER.amoc}
      posterSlug="amoc"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
