import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { CHAPTER_INGRESS } from "@/lib/chapter-ingress";
import { KILDER_B } from "@/lib/kilder-b";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/naturlige-klimapadriv")!;

export const Route = createFileRoute("/tema/naturlige-klimapadriv")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("naturlige-klimapadriv") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/naturlige-klimapadriv",
    }),
  component: NaturligePage,
});

function NaturligePage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Klima over tid"
      title={tema.title}
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{ to: "/tema/milankovitch", label: "Forrige: Istider" }}
      next={{ to: "/tema/vaerkatastrofer", label: "Neste: Værkatastrofer" }}
      kilder={KILDER_B.naturlige}
      lead={CHAPTER_INGRESS["naturlige-klimapadriv"]}
      posterSlug="naturlige-klimapadriv"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
