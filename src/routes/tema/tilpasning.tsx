import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { CHAPTER_INGRESS } from "@/lib/chapter-ingress";
import { KILDER_B_TILLEGG, medKilder } from "@/lib/kilder-b";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const TILPASNING_KILDER = medKilder(KILDER_G2.tilpasning, KILDER_B_TILLEGG.tilpasning ?? []);

const tema = GF2_THEMES.find((t) => t.to === "/tema/tilpasning")!;

export const Route = createFileRoute("/tema/tilpasning")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("tilpasning") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/tilpasning",
    }),
  component: TilpasningPage,
});

function TilpasningPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Samfunn"
      title="Konsekvenser og tilpasning"
      lead={CHAPTER_INGRESS["tilpasning"]}
      banner="/images/tema-katastrofer.jpg"
      bannerAlt="En atlantisk orkan sett fra verdensrommet, med tydelig øye"
      prev={{ to: "/tema/vaerkatastrofer", label: "Forrige: Værkatastrofer" }}
      next={{ to: "/tema/energi-hav-luft", label: "Neste: Energi fra hav og luft" }}
      kilder={TILPASNING_KILDER}
      posterSlug="tilpasning"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
