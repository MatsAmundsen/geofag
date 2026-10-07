import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

const LEAD =
  "Den nordatlantiske oscillasjon er trykkforskjellen mellom lavtrykket ved Island og høytrykket ved Asorene. Positiv fase gir sterkere jetstrøm og mer storm og varme i Nord-Europa.";

export const Route = createFileRoute("/tema/klima/nao")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("nao") };
  },
  head: () =>
    topicHead({
      title: "NAO: Den nordatlantiske oscillasjon · Geofag 2",
      description:
        "NAO: trykkforskjellen mellom Island og Asorene, og hvordan positiv og negativ fase flytter stormbanen.",
      path: "/tema/klima/nao",
    }),
  component: NaoPage,
});

function NaoPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Klimasystemet · Nord-Atlanteren"
      title="NAO: Den nordatlantiske oscillasjon"
      lead={LEAD}
      banner="/images/fig-nao.jpg"
      bannerAlt="Trykksystemer og stormbaner over Nord-Atlanteren"
      prev={{ to: "/tema/klima/iod", label: "Forrige: IOD" }}
      next={{ to: "/tema/klima/amoc", label: "Neste: AMOC" }}
      kilder={KILDER.nao}
      posterSlug="nao"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
