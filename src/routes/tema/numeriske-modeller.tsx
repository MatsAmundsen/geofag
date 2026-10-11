import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { CHAPTER_INGRESS } from "@/lib/chapter-ingress";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/numeriske-modeller")!;

export const Route = createFileRoute("/tema/numeriske-modeller")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("numeriske-modeller") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/numeriske-modeller",
    }),
  component: NumeriskeModellerPage,
});

function NumeriskeModellerPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Numeriske beregninger"
      title="Numeriske modeller: Fra fysiske lover til superdatamaskiner"
      banner="/images/fig-klimasystem.jpg"
      bannerAlt="Jorda fra verdensrommet med tynn atmosfære, hav og is — det modellene beskriver"
      prev={{ to: "/tema/kryosfare", label: "Forrige: Kryosfæren" }}
      next={{ to: "/tema/paleoklima", label: "Neste: Paleoklima" }}
      kilder={KILDER.modeller}
      lead={CHAPTER_INGRESS["numeriske-modeller"]}
      posterSlug="numeriske-modeller"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
