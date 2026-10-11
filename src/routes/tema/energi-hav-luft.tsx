import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/energi-hav-luft")!;

export const Route = createFileRoute("/tema/energi-hav-luft")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("energi-hav-luft") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
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
      lead="Vind på land, bunnfast og flytende havvind, bølgekraft, tidevann og havets termiske energi (OTEC) rommer enorme fornybare naturkrefter. Men fornybart er ikke automatisk det samme som bærekraftig. LK20 krever at vi drøfter energiressursene helhetlig — i skjæringspunktet mellom fysikk, kontinentalsokkelens geologi, naturinngrep, urfolksrettigheter og Norges rolle i det europeiske kraftsystemet."
      banner="/images/tema-strommer.jpg"
      bannerAlt="Nord-Atlanteren med fargekontrast som minner om en vestlig randstrøm"
      prev={{ to: "/tema/tilpasning", label: "Forrige: Konsekvenser og tilpasning" }}
      next={{ to: "/tema/felt-hav-luft-is", label: "Neste: Feltarbeid" }}
      kilder={KILDER.energiHavLuft}
      posterSlug="energi-hav-luft"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
