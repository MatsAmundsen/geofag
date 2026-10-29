import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { CHAPTER_INGRESS } from "@/lib/chapter-ingress";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/vaerkatastrofer")!;

export const Route = createFileRoute("/tema/vaerkatastrofer")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("vaerkatastrofer") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/vaerkatastrofer",
    }),
  component: KatastroferPage,
});

function KatastroferPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Naturfarer og ekstreme værsystemer"
      title="Værkatastrofer"
      banner="/images/banner-katastrofer.jpg"
      bannerAlt="Atlantisk orkan sett fra verdensrommet, med tydelig øye og spiralformede regnbånd"
      prev={{ to: "/tema/naturlige-klimapadriv", label: "Forrige: Naturlige klimapådriv" }}
      next={{ to: "/tema/tilpasning", label: "Neste: Konsekvenser og tilpasning" }}
      kilder={KILDER.vaerkatastrofer}
      lead={CHAPTER_INGRESS["vaerkatastrofer"]}
      posterSlug="vaerkatastrofer"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
