import { createFileRoute } from "@tanstack/react-router";
import { VULKANER_SEKSJONER } from "@/content/g1/vulkaner";
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
      lead="Vulkanutbrudd er jordens mest spektakulære og energirike overflateprosess. Svaret på om lavaen flyter rolig eller eksploderer ligger i magmaens silikatinnhold, viskositet og innestengt gass."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{ to: "/geofag-1/platetektonikk", label: "Forrige: Platetektonikk" }}
      next={{ to: "/geofag-1/jordskjelv", label: "Neste: Jordskjelv og tsunamier" }}
      kilder={KILDER.vulkaner}
    >
      {VULKANER_SEKSJONER.map((Seksjon, i) => (
        <Seksjon key={i} />
      ))}
    </TopicLayout>
  );
}
