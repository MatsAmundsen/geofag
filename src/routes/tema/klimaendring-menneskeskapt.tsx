import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2_A } from "@/lib/kilder-g2-a";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/klimaendring-menneskeskapt")!;

export const Route = createFileRoute("/tema/klimaendring-menneskeskapt")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("klimaendring-menneskeskapt") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/klimaendring-menneskeskapt",
    }),
  component: KlimaMenneskePage,
});

function KlimaMenneskePage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Klimaendring"
      title="Klimaendring og mennesket"
      lead="Mennesket har varmet jorda med om lag 1,1 °C. Her ser du hvordan karbon går rundt, hvorfor CO₂ er hovedårsaken, hva karbonbudsjettet sier, og hva scenariene og Parisavtalen betyr."
      banner="/images/fig-drivhus.jpg"
      bannerAlt="Jordas kant sett fra bane, med lys fra byer på nattsiden"
      prev={{ to: "/tema/energi-regning", label: "Forrige: Å regne med energi" }}
      next={{ to: "/tema/klimatiltak", label: "Neste: Klimatiltak" }}
      kilder={KILDER_G2_A.klimaendringMenneskeskapt}
      posterSlug="klimaendring-menneskeskapt"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
