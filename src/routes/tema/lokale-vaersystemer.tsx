import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/lokale-vaersystemer")!;

const LEAD =
  "Polarfrontsyklonen setter været over store områder. Nærmere kysten og i dalene kommer solgangsvind, berg- og dalvind og føn, fordi land, hav og fjellside ikke varmes likt.";

export const Route = createFileRoute("/tema/lokale-vaersystemer")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("lokale-vaersystemer") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/lokale-vaersystemer",
    }),
  component: LokalePage,
});

function LokalePage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Atmosfæren · lokale og regionale systemer"
      title="Lokale og regionale værsystemer"
      lead={LEAD}
      banner="/images/fig-polarfront.jpg"
      bannerAlt="Polarfronten som bølge mellom kald og varm luft, med lavtrykk i bølgen"
      prev={{ to: "/tema/vaerkart", label: "Forrige: Værkart" }}
      next={{ to: "/tema/jetstrommer", label: "Neste: Jetstrømmer" }}
      kilder={KILDER_G2.lokale}
      posterSlug="lokale-vaersystemer"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
