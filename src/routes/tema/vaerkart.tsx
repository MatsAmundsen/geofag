import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/vaerkart")!;

const LEAD =
  "Et værkart viser trykk, isobarer, fronter og vind på samme tid over et stort område. Du skal kunne lese kartet og gjøre rede for hvordan et lavtrykk utvikler seg.";

export const Route = createFileRoute("/tema/vaerkart")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("vaerkart") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/vaerkart",
    }),
  component: VaerkartPage,
});

function VaerkartPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Atmosfæren · væranalyse"
      title="Værkart og værutvikling"
      lead={LEAD}
      banner="/images/banner-trykk.jpg"
      bannerAlt="Synoptisk værkart over Nord-Atlanteren og Skandinavia med isobarer, lavtrykkssentre og fronter"
      prev={{ to: "/tema/vindsystemet", label: "Forrige: Vindsystemet" }}
      next={{ to: "/tema/jetstrommer", label: "Neste: Jetstrømmer" }}
      kilder={KILDER_G2.vaerkart}
      posterSlug="vaerkart"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
