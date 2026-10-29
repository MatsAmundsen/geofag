import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { CHAPTER_INGRESS } from "@/lib/chapter-ingress";
import { KILDER } from "@/lib/kilder";
import { KILDER_B_TILLEGG, medKilder } from "@/lib/kilder-b";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const KRYOSFAEREN_KILDER = medKilder(KILDER.kryosfaeren, KILDER_B_TILLEGG.kryosfaeren ?? []);

const tema = GF2_THEMES.find((t) => t.to === "/tema/kryosfaeren")!;

export const Route = createFileRoute("/tema/kryosfaeren")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("kryosfaeren") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/kryosfaeren",
    }),
  component: KryosfaerenPage,
});

function KryosfaerenPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Kryosfæren"
      title="Kryosfæren: Massebalanse, permafrost og havis"
      banner="/images/fig-albedo.jpg"
      bannerAlt="Is og snø mot mørkt hav — albedoen som styrer jordas strålingsbalanse"
      prev={{ to: "/tema/klima/amoc", label: "Forrige: AMOC" }}
      next={{ to: "/tema/numeriske-modeller", label: "Neste: Numeriske modeller" }}
      kilder={KRYOSFAEREN_KILDER}
      lead={CHAPTER_INGRESS["kryosfaeren"]}
      posterSlug="kryosfaeren"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
