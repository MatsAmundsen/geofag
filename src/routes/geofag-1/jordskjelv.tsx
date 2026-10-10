import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("jordskjelv")!;

export const Route = createFileRoute("/geofag-1/jordskjelv")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/jordskjelv",
    }),
  component: JordskjelvPage,
});

function JordskjelvPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Et jordskjelv er et plutselig brudd der spenning som har bygd seg opp i fjellet, blir utløst. Energien sprer seg som seismiske bølger, og de samme bølgene som rister husene, forteller oss hvordan jorda ser ut innvendig. Her lærer du hvordan jordskjelv oppstår og måles, hvor de skjer, hva bølgene avslører om jordas indre, og hvorfor Norge skjelver."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/vulkaner",
        label: "Forrige: Vulkaner",
      }}
      next={{
        to: "/geofag-1/jordskjelv-naturfare",
        label: "Neste: Jordskjelv og tsunamier som naturfare",
      }}
      kilder={KILDER.jordskjelv}
      posterSlug="jordskjelv"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
