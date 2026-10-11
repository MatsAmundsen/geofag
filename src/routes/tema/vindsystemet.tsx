import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { CHAPTER_INGRESS } from "@/lib/chapter-ingress";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/vindsystemet")!;

export const Route = createFileRoute("/tema/vindsystemet")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("vindsystemet") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/vindsystemet",
    }),
  component: VindsystemetPage,
});

function VindsystemetPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Atmosfæren og storskala sirkulasjon"
      title="Det globale vindsystemet"
      banner="/images/banner-vind.jpg"
      bannerAlt="Jordas atmosfære sett fra bane med skyformasjoner over kontinenter og hav"
      prev={{ to: "/tema/hoytrykk-lavtrykk", label: "Forrige: Høytrykk og lavtrykk" }}
      next={{ to: "/tema/vaerkart", label: "Neste: Værkart" }}
      kilder={KILDER.vindsystemet}
      lead={CHAPTER_INGRESS["vindsystemet"]}
      posterSlug="vindsystemet"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
