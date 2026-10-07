import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

const LEAD =
  "Orkan som vindstyrke er sterkere enn 32,6 m/s. En tropisk orkan er et lavtrykk med middelvind på minst 119 km/t. Stormflo er særlig høy vannstand langs kysten i forbindelse med storm.";

export const Route = createFileRoute("/tema/vaerkatastrofer")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("vaerkatastrofer") };
  },
  head: () =>
    topicHead({
      title: "Værkatastrofer · Geofag 2",
      description: LEAD,
      path: "/tema/vaerkatastrofer",
    }),
  component: VaerkatastroferPage,
});

function VaerkatastroferPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Naturfarer"
      title="Værkatastrofer"
      lead={LEAD}
      banner="/images/banner-katastrofer.jpg"
      bannerAlt="Atlantisk orkan sett fra verdensrommet, med tydelig øye og spiralformede regnbånd"
      prev={{ to: "/tema/milankovitch", label: "Forrige: Istider" }}
      next={{ to: "/tema/tilpasning", label: "Neste: Konsekvenser og tilpasning" }}
      kilder={KILDER.vaerkatastrofer}
      posterSlug="vaerkatastrofer"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
