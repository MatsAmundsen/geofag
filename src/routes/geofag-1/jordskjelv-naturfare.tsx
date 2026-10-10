import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("jordskjelv-naturfare")!;

export const Route = createFileRoute("/geofag-1/jordskjelv-naturfare")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/jordskjelv-naturfare",
    }),
  component: JordskjelvNaturfarePage,
});

function JordskjelvNaturfarePage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Jordskjelv og tsunamier er blant de naturfarene som har tatt flest liv. Hvor store skadene blir, avhenger likevel like mye av samfunnet som av naturen: hvor folk bor, hvordan husene er bygd, og om det finnes varsling og beredskap. Her lærer du hvordan tsunamier oppstår, hvilke skader jordskjelv gjør, om det er mulig å varsle dem, og hvordan vi kan vurdere og redusere risikoen."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/jordskjelv",
        label: "Forrige: Jordskjelv og jordas indre",
      }}
      next={{
        to: "/geofag-1/bergarter",
        label: "Neste: Bergarter og mineraler",
      }}
      kilder={KILDER["jordskjelv-naturfare"]}
      posterSlug="jordskjelv-naturfare"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
