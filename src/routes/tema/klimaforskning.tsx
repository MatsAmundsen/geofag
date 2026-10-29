import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2_A } from "@/lib/kilder-g2-a";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/klimaforskning")!;

export const Route = createFileRoute("/tema/klimaforskning")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("klimaforskning") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/klimaforskning",
    }),
  component: KlimaforskningPage,
});

function KlimaforskningPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Klimaendring"
      title="Hvordan vet vi det? Klimaforskning"
      lead="Hvordan kan forskerne vite at jorda blir varmere, og at mennesket er årsaken? Kapitlet viser flere uavhengige bevislinjer, hvordan IPCC arbeider og hvordan usikkerhet blir uttrykt."
      banner="/images/banner-klima.jpg"
      bannerAlt="Iskant ved en stor isbre mot åpent polarhav"
      prev={{ to: "/tema/klimatiltak", label: "Forrige: Klimatiltak" }}
      next={{ to: "/tema/felt-hav-luft-is", label: "Neste: Feltarbeid" }}
      kilder={KILDER_G2_A.klimaforskning}
      posterSlug="klimaforskning"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
