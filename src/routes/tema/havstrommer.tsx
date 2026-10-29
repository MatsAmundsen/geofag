import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { CHAPTER_INGRESS } from "@/lib/chapter-ingress";
import { KILDER } from "@/lib/kilder";
import { KILDER_B_TILLEGG, medKilder } from "@/lib/kilder-b";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const HAVSTROMMER_KILDER = medKilder(KILDER.havstrommer, KILDER_B_TILLEGG.havstrommer ?? []);

const tema = GF2_THEMES.find((t) => t.to === "/tema/havstrommer")!;

export const Route = createFileRoute("/tema/havstrommer")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("havstrommer") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/havstrommer",
    }),
  component: HavstrommerPage,
});

function HavstrommerPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Havet"
      title="Havstrømmer: Drivkrefter, Ekman og gyrer"
      banner="/images/banner-hav.jpg"
      bannerAlt="Havoverflate i Nord-Atlanteren med bølger og strømninger"
      prev={{ to: "/tema/coriolis", label: "Forrige: Coriolis" }}
      next={{ to: "/tema/klima", label: "Neste: Klima" }}
      kilder={HAVSTROMMER_KILDER}
      lead={CHAPTER_INGRESS["havstrommer"]}
      posterSlug="havstrommer"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
