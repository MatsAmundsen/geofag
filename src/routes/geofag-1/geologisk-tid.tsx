import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("geologisk-tid")!;

export const Route = createFileRoute("/geofag-1/geologisk-tid")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/geologisk-tid",
    }),
  component: GeologiskTidPage,
});

function GeologiskTidPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Jorda er ca. 4,5 milliarder år gammel, og bergartene rundt oss er fra mange ulike deler av denne historien. I dette kapitlet lærer du hvordan geologer deler inn den geologiske tiden, hvordan vi finner ut hva som er eldst i en blotning, og hvordan radioaktive grunnstoffer og andre metoder gir alderen i år."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/bergarter",
        label: "Forrige: Bergarter og mineraler",
      }}
      next={{
        to: "/geofag-1/norges-geologi",
        label: "Neste: Norges geologiske historie",
      }}
      kilder={KILDER["geologisk-tid"]}
      posterSlug="geologisk-tid"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
