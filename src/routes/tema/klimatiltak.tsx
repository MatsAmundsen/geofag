import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2_A } from "@/lib/kilder-g2-a";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/klimatiltak")!;

export const Route = createFileRoute("/tema/klimatiltak")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("klimatiltak") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/klimatiltak",
    }),
  component: KlimatiltakPage,
});

function KlimatiltakPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Klimaendring"
      title="Klimatiltak"
      lead="Hvor mye må utslippene ned, hvilke tiltak finnes, og hvilke virkemidler får dem gjennomført? Kapitlet tar også for seg rettferdighet, CO₂-fangst og lagring og fjerning av CO₂ fra lufta."
      banner="/images/banner-vind.jpg"
      bannerAlt="Jordas atmosfære med skyer og den tynne blå kanten mot rommet"
      prev={{ to: "/tema/klimaendring-menneskeskapt", label: "Forrige: Klimaendring og mennesket" }}
      next={{ to: "/tema/klimaforskning", label: "Neste: Hvordan vet vi det? Klimaforskning" }}
      kilder={KILDER_G2_A.klimatiltak}
      posterSlug="klimatiltak"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
