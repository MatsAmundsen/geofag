import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { KILDER_B_TILLEGG, medKilder } from "@/lib/kilder-b";
import { topicHead } from "@/lib/seo";

const OVERSIKT_KILDER = medKilder(KILDER.oversikt, KILDER_B_TILLEGG.oversikt ?? []);

const LEAD =
  "Vær er det som skjer i dag. Klima er det som gjentar seg over tiår. Når du kjenner trykk, vind, corioliseffekten og havet, kan du se hvorfor klimaet henger sammen, og hvorfor det kan forskyves.";

export const Route = createFileRoute("/tema/klima/oversikt")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("oversikt") };
  },
  head: () =>
    topicHead({
      title: "Klimasystemet (oversikt) · Geofag 2",
      description:
        "Luft, hav og is henger sammen over år og årtusener. Strålingsbalanse, drivhuseffekt, pådriv, tilbakekobling og menneskeskapt oppvarming.",
      path: "/tema/klima/oversikt",
    }),
  component: KlimaOversiktPage,
});

function KlimaOversiktPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Jordsystemet"
      title="Klimasystemet (oversikt)"
      lead={LEAD}
      banner="/images/banner-klima.jpg"
      bannerAlt="Grønlands innlandsis mot mørkt polarhav"
      prev={{ to: "/tema/klima", label: "Tilbake: Klima og klimasystemer" }}
      next={{ to: "/tema/klima/enso", label: "Neste: ENSO" }}
      kilder={OVERSIKT_KILDER}
      posterSlug="oversikt"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
