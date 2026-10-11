import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("feltarbeid")!;

export const Route = createFileRoute("/geofag-1/feltarbeid")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/feltarbeid",
    }),
  component: FeltarbeidPage,
});

function FeltarbeidPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Geofaglig feltarbeid er å planlegge, samle inn georefererte data i felt, bearbeide og tolke dem og presentere resultatene. Her lærer du hvordan du gjør det trygt og faglig forsvarlig, med eksempler fra berggrunn, løsmasser og vann."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/geologiske-ressurser",
        label: "Forrige: Geologiske ressurser",
      }}
      next={{
        to: "/geofag-1",
        label: "Fullført: Geofag 1 oversikt",
      }}
      kilder={KILDER.feltarbeid}
      posterSlug="feltarbeid"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
