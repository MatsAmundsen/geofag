import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("vulkaner")!;

export const Route = createFileRoute("/geofag-1/vulkaner")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/vulkaner",
    }),
  component: VulkanerPage,
});

function VulkanerPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Noen vulkaner har rolige lavastrømmer, andre har eksplosive utbrudd. Forskjellen henger sammen med hvor mye silikat (SiO₂) magmaen inneholder, hvor seig den er (viskositet) og hvor mye gass den holder på. Her lærer du om magmatyper, tre hovedtyper vulkaner og kalderaer, utbruddstyper, overvåking og Beerenberg på Jan Mayen, Norges eneste aktive vulkan over havet."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/platetektonikk",
        label: "Forrige: Platetektonikk",
      }}
      next={{
        to: "/geofag-1/jordskjelv",
        label: "Neste: Jordskjelv og tsunamier",
      }}
      kilder={KILDER.vulkaner}
      posterSlug="vulkaner"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
