import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { CHAPTER_INGRESS } from "@/lib/chapter-ingress";
import { KILDER_B } from "@/lib/kilder-b";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/skyer-nedbor-klimasoner")!;

export const Route = createFileRoute("/tema/skyer-nedbor-klimasoner")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("skyer-nedbor-klimasoner") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/skyer-nedbor-klimasoner",
    }),
  component: SkyerPage,
});

function SkyerPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Værsystemer"
      title={tema.title}
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{ to: "/tema/lokale-vaersystemer", label: "Forrige: Lokale værsystemer" }}
      next={{ to: "/tema/jetstrommer", label: "Neste: Jetstrømmer" }}
      kilder={KILDER_B.skyer}
      lead={CHAPTER_INGRESS["skyer-nedbor-klimasoner"]}
      posterSlug="skyer-nedbor-klimasoner"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
