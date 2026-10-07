import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("geologiske-ressurser")!;

export const Route = createFileRoute("/geofag-1/geologiske-ressurser")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/geologiske-ressurser",
    }),
  component: GeologiskeRessurserPage,
});

function GeologiskeRessurserPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="En forekomst blir en geologisk ressurs når den kan kartlegges og tas i bruk. Kapittelet handler om hvordan malm, naturstein og petroleum dannes og utvinnes, og om hvilke konsekvenser bruken kan ha. Grunnvann er også en geologisk ressurs. Hvordan det lagres og strømmer, tar vi i kapittelet Vann og flom."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/skred",
        label: "Forrige: Skred",
      }}
      next={{
        to: "/geofag-1/feltarbeid",
        label: "Neste: Feltarbeid",
      }}
      kilder={KILDER.ressurser}
      posterSlug="geologiske-ressurser"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
