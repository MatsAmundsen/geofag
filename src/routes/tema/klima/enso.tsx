import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

const LEAD =
  "ENSO er den naturlige svingningen i det tropiske Stillehavet. El Niño er den varme fasen og La Niña den kalde. Den flytter vind og regn, også langt utenfor Stillehavet.";

export const Route = createFileRoute("/tema/klima/enso")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("enso") };
  },
  head: () =>
    topicHead({
      title: "ENSO: El Niño og La Niña · Geofag 2",
      description:
        "El Niño og La Niña som varm og kald fase av ENSO, Walker-sirkulasjonen, og fjernvirkninger.",
      path: "/tema/klima/enso",
    }),
  component: EnsoPage,
});

function EnsoPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Klimasystemet · Tropisk Stillehav"
      title="ENSO: El Niño og La Niña"
      lead={LEAD}
      banner="/images/fig-enso.jpg"
      bannerAlt="Det tropiske Stillehavet sett fra verdensrommet med konveksjonsskyer over varmt hav"
      prev={{ to: "/tema/klima/oversikt", label: "Forrige: Klimasystemet (oversikt)" }}
      next={{ to: "/tema/klima/iod", label: "Neste: IOD" }}
      kilder={KILDER.enso}
      posterSlug="enso"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
