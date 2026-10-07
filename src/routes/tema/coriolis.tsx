import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/coriolis")!;

const LEAD =
  "Corioliseffekten er avbøyningen vi ser fordi jorda roterer under luft og vann som ellers går rett fram. På nordlig halvkule bøyer bevegelsen av mot høyre, på sørlig mot venstre, og ved ekvator er den null.";

export const Route = createFileRoute("/tema/coriolis")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("coriolis") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/coriolis",
    }),
  component: CoriolisPage,
});

function CoriolisPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Atmosfæren og havets dynamikk"
      title="Corioliseffekten"
      lead={LEAD}
      banner="/images/banner-coriolis.jpg"
      bannerAlt="Jorda med spiralformede syklonskyer"
      prev={{ to: "/tema/jetstrommer", label: "Forrige: Jetstrømmer" }}
      next={{ to: "/tema/havstrommer", label: "Neste: Havstrømmer" }}
      kilder={KILDER.coriolis}
      posterSlug="coriolis"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
