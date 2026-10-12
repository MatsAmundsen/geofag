import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { TopicLayout } from "@/components/topic-layout";
import { PAGE_LEAD } from "@/lib/meteo/fagtekst";
import { topicHead } from "@/lib/seo";

const JetModel = lazy(() =>
  import("@/components/meteo/jet-model").then((m) => ({ default: m.JetModel })),
);

const PATH = "/tema/klima/jetstrommer-atmosfaeriske-elver";

export const Route = createFileRoute("/tema/klima/jetstrommer-atmosfaeriske-elver")({
  head: () =>
    topicHead({
      title: "Jetstrømmer og atmosfæriske elver (modell) · Geofag 2",
      description:
        "Interaktiv undervisningsmodell: polarjet og subtropisk jet, Rossby-bølger, atmosfæriske elver, ENSO og IOD, med El Niño, La Niña, positiv og negativ IOD.",
      path: PATH,
    }),
  component: JetModelPage,
});

function ModelPlaceholder() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card" role="status">
      <div className="h-48 border-b border-border" />
      <div className="jet-map-stage flex items-center justify-center text-sm text-muted-foreground">Laster modellen …</div>
    </div>
  );
}

function JetModelPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Klima · Interaktiv modell"
      title="Jetstrømmer og atmosfæriske elver"
      lead={PAGE_LEAD}
      banner="/images/jetstrommer-modell.jpg"
      bannerAlt="Verdenskart med jetstrømmer og atmosfæriske elver fra modellen"
      prev={{ to: "/tema/klima/amoc", label: "Forrige: AMOC" }}
      next={{ to: "/tema/klima", label: "Tilbake til Klima" }}
      bodyMode="coded"
    >
      <div className="jet-breakout">
        <ClientOnly fallback={<ModelPlaceholder />}>
          <Suspense fallback={<ModelPlaceholder />}>
            <JetModel />
          </Suspense>
        </ClientOnly>
      </div>
    </TopicLayout>
  );
}
