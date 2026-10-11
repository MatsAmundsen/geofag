import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { CHAPTER_INGRESS } from "@/lib/chapter-ingress";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("klima") };
  },
  head: () =>
    topicHead({
      title: "Klima og klimasystemer · Geofag 2",
      description:
        "Inngangen til klima: klimasystemet, indre svingninger og ytre pådriv, med videre lesing om oversikten, ENSO, IOD, NAO og AMOC.",
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
      lead={CHAPTER_INGRESS["klima"]}
      banner="/images/banner-klima.jpg"
      bannerAlt="Grønlands innlandsis mot mørkt polarhav"
      prev={{ to: "/tema/havstrommer", label: "Forrige: Havstrømmer" }}
      next={{ to: "/tema/klima/oversikt", label: "Neste: Klimasystemet (oversikt)" }}
      kilder={KILDER.klimaHub}
      posterSlug="klima"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
