import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

const LEAD =
  "IOD er den vedvarende forskjellen i havtemperatur mellom vest og øst i det tropiske Indiahavet. I positiv fase er vest varmere og øst kjøligere.";

export const Route = createFileRoute("/tema/klima/iod")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("iod") };
  },
  head: () =>
    topicHead({
      title: "IOD: Den indiske hav-dipolen · Geofag 2",
      description:
        "Den indiske hav-dipolen: positiv, nøytral og negativ fase, og hvordan DMI måler vest mot øst.",
      path: "/tema/klima/iod",
    }),
  component: IodPage,
});

function IodPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Klimasystemet"
      title="IOD: Den indiske hav-dipolen"
      lead={LEAD}
      banner="/images/banner-hav.jpg"
      bannerAlt="Havoverflate sett ovenfra"
      prev={{ to: "/tema/klima/enso", label: "Forrige: ENSO" }}
      next={{ to: "/tema/klima/nao", label: "Neste: NAO" }}
      kilder={KILDER.iod}
      posterSlug="iod"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
