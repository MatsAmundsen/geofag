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
      lead="Vulkanutbrudd er jordens mest spektakulære og energirike overflateprosess. Hvorfor flyter lavaen rolig som rødglødende elver på Hawaii og Island, mens Pinatubo og Vesuv eksploderer med ufattelig kraft og mørklegger himmelen? Svaret ligger i magmaens kjemiske oppbygning: silikatinnhold, viskositet og innestengt gass. Her utforsker vi magmafysikken, de fire vulkantypene, pliniansk erupsjonsdynamikk, overvåkingsteknologi og Norges egen aktive vulkan — Beerenberg på Jan Mayen."
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
