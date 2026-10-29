import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { CHAPTER_INGRESS } from "@/lib/chapter-ingress";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/milankovitch")!;

export const Route = createFileRoute("/tema/milankovitch")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("milankovitch") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/milankovitch",
    }),
  component: MilankovitchPage,
});

function MilankovitchPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Istider"
      title={tema.title}
      lead={CHAPTER_INGRESS["milankovitch"]}
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{ to: "/tema/paleoklima", label: "Forrige: Paleoklima" }}
      next={{ to: "/tema/naturlige-klimapadriv", label: "Neste: Naturlige klimapådriv" }}
      kilder={KILDER.milankovitch}
      posterSlug="milankovitch"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
