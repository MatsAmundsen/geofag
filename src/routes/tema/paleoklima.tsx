import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { KILDER_G2_A, slaaSammenKilder } from "@/lib/kilder-g2-a";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/paleoklima")!;

const LEAD =
  "De direkte målingene dekker et kort øyeblikk: ca. 175 år med global temperatur og CO₂ på Mauna Loa siden 1958. Istider, varme perioder og brå skifter ligger lagret i is, havbunn, innsjøer og myrer. Disse arkivene viser om dagens CO₂-nivå er uvanlig, og de brukes til å teste klimamodellene.";

export const Route = createFileRoute("/tema/paleoklima")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("paleoklima") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/paleoklima",
    }),
  component: PaleoklimaPage,
});

function PaleoklimaPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Arkiv"
      title={tema.title}
      lead={LEAD}
      banner="/images/fig-paleo.jpg"
      bannerAlt="Lagdelt blå breis med bølgende bånd av gammel is"
      prev={{ to: "/tema/numeriske-modeller", label: "Forrige: Numeriske modeller" }}
      next={{ to: "/tema/milankovitch", label: "Neste: Istider" }}
      kilder={slaaSammenKilder(KILDER.paleoklima, KILDER_G2_A.paleoklimaT2)}
      posterSlug="paleoklima"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
