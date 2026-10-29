import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { CHAPTER_INGRESS } from "@/lib/chapter-ingress";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/felt-hav-luft-is")!;

export const Route = createFileRoute("/tema/felt-hav-luft-is")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("felt-hav-luft-is") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/felt-hav-luft-is",
    }),
  component: FeltG2Page,
});

function FeltG2Page() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Metode"
      title="Feltarbeid i hav, luft og is"
      banner="/images/gf1-bergarter.jpg"
      bannerAlt="Lagdelt sedimentær klippe og isskurt fjordlandskap"
      prev={{ to: "/tema/energi-regning", label: "Forrige: Å regne med energi" }}
      next={{ to: "/eksamen", label: "Neste: Eksamen" }}
      kilder={KILDER_G2.feltG2}
      lead={CHAPTER_INGRESS["felt-hav-luft-is"]}
      posterSlug="felt-hav-luft-is"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
