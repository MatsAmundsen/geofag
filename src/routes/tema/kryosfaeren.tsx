import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

const LEAD =
  "Kryosfæren er jordas frosne vann: breer, havis, snødekke og permafrost. De fleste breene i Norge har smeltet tilbake siden starten av 2000-tallet, mest på grunn av varme somre.";

export const Route = createFileRoute("/tema/kryosfaeren")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("kryosfaeren") };
  },
  head: () =>
    topicHead({
      title: "Kryosfæren · Geofag 2",
      description: LEAD,
      path: "/tema/kryosfaeren",
    }),
  component: KryosfaerenPage,
});

function KryosfaerenPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Is og snø"
      title="Kryosfæren"
      lead={LEAD}
      banner="/images/fig-albedo.jpg"
      bannerAlt="Is og snø mot mørkt hav"
      prev={{ to: "/tema/klima/amoc", label: "Forrige: AMOC" }}
      next={{ to: "/tema/numeriske-modeller", label: "Neste: Numeriske modeller" }}
      kilder={KILDER.kryosfaeren}
      posterSlug="kryosfaeren"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
