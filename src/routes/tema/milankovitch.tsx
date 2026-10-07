import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

const LEAD =
  "Jordbanen endrer hvor mye sol som treffer ulike breddegrader. Eksentrisitet, skråstilling og presesjon er de tre svingningene. De forklarer ikke oppvarmingen vi ser nå.";

export const Route = createFileRoute("/tema/milankovitch")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("milankovitch") };
  },
  head: () =>
    topicHead({
      title: "Istider · Geofag 2",
      description: LEAD,
      path: "/tema/milankovitch",
    }),
  component: MilankovitchPage,
});

function MilankovitchPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Istider"
      title="Istider"
      lead={LEAD}
      banner="/images/tema-milankovitch.jpg"
      bannerAlt="Innlandsis som kalver i mørkt polarhav, med isfjell og isdekt kyst i bakgrunnen"
      prev={{ to: "/tema/paleoklima", label: "Forrige: Paleoklima" }}
      next={{ to: "/tema/vaerkatastrofer", label: "Neste: Værkatastrofer" }}
      kilder={KILDER.milankovitch}
      posterSlug="milankovitch"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
