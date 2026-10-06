import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/hoytrykk-lavtrykk")!;

const LEAD =
  "Luft har vekt. Der luften stiger, faller trykket ved bakken, og vanndampen kan kondensere til skyer og nedbør. Der luften synker, stiger trykket, og skyene løses opp. Trykkforskjellene setter luften i bevegelse, og det er vind. Jordrotasjonen bøyer av vinden. Sammen er dette grunnlaget for vær og klima.";

export const Route = createFileRoute("/tema/hoytrykk-lavtrykk")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("hoytrykk-lavtrykk") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/hoytrykk-lavtrykk",
    }),
  component: TrykkPage,
});

function TrykkPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Atmosfæren"
      title="Høytrykk og lavtrykk"
      lead={LEAD}
      banner="/images/banner-trykk.jpg"
      bannerAlt="Kyst i to slags vær: storm og lavtrykk til venstre, klar himmel og høytrykk til høyre"
      next={{ to: "/tema/vindsystemet", label: "Neste: Vindsystemet" }}
      kilder={KILDER.trykk}
      posterSlug="hoytrykk-lavtrykk"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
