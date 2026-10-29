import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2_A } from "@/lib/kilder-g2-a";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/energi-regning")!;

export const Route = createFileRoute("/tema/energi-regning")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("energi-regning") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/energi-regning",
    }),
  component: EnergiRegningPage,
});

function EnergiRegningPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Ressurser"
      title="Å regne med energi"
      lead="Hvor mye strøm gir en vindmølle eller en solpark, og hva betyr tallene? Her lærer du enhetene fra joule til terawattime, skillet mellom effekt og energi, og hvordan du regner brukstid og kapasitetsfaktor. Du regner på Fosen Vind, Furuseth og Hywind Tampen, og ser hvordan vannkraft, kraftmarked og prisområder henger sammen."
      banner="/images/fig-innstraling.jpg"
      bannerAlt="Jorda sett fra verdensrommet med sollys inn fra siden — energien alle ressursene bygger på"
      prev={{ to: "/tema/energi-hav-luft", label: "Forrige: Energi fra hav og atmosfære" }}
      next={{ to: "/tema/felt-hav-luft-is", label: "Neste: Feltarbeid" }}
      kilder={KILDER_G2_A.energiRegning}
      posterSlug="energi-regning"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
