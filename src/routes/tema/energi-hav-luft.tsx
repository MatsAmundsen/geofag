import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { topicHead } from "@/lib/seo";

const LEAD =
  "Vindkraft gjør vind om til elektrisk energi. Havvind kan stå på sokkelen eller flyte. Tidevann kommer av månen og sola, ikke av vinden.";

export const Route = createFileRoute("/tema/energi-hav-luft")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("energi-hav-luft") };
  },
  head: () =>
    topicHead({
      title: "Energi fra hav og atmosfære · Geofag 2",
      description: LEAD,
      path: "/tema/energi-hav-luft",
    }),
  component: EnergiPage,
});

function EnergiPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Ressurser"
      title="Energi fra hav og atmosfære"
      lead={LEAD}
      banner="/images/fig-passat.jpg"
      bannerAlt="Passatskyer over hav"
      prev={{ to: "/tema/tilpasning", label: "Forrige: Konsekvenser og tilpasning" }}
      next={{ to: "/tema/felt-hav-luft-is", label: "Neste: Feltarbeid i hav, luft og is" }}
      kilder={KILDER_G2.energi}
      posterSlug="energi-hav-luft"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
