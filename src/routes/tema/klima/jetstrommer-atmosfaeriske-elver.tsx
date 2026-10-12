import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { TopicLayout } from "@/components/topic-layout";
import { topicHead } from "@/lib/seo";

const JetModel = lazy(() =>
  import("@/components/meteo/jet-model").then((m) => ({ default: m.JetModel })),
);

const PATH = "/tema/klima/jetstrommer-atmosfaeriske-elver";
const LEAD =
  "En interaktiv undervisningsmodell av polarjeten og den subtropiske jeten på begge halvkuler, Rossby-bølger og atmosfæriske elver. Skru på ENSO og IOD og se hvordan jetstrømmen, nedbøren og fukt-elvene flytter seg. Modellen er forenklet. Den er ikke en prognose.";

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
    <div
      className="flex h-[70vw] min-h-[260px] items-center justify-center rounded-xl border border-border bg-card text-sm text-muted-foreground lg:h-[48rem]"
      role="status"
    >
      Laster modellen …
    </div>
  );
}

function JetModelPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Klima · Interaktiv modell"
      title="Jetstrømmer og atmosfæriske elver"
      lead={LEAD}
      banner="/images/jetstrommer-modell.jpg"
      bannerAlt="Verdenskart med jetstrømmer og atmosfæriske elver fra modellen"
      prev={{ to: "/tema/klima/amoc", label: "Forrige: AMOC" }}
      next={{ to: "/tema/klima", label: "Tilbake til Klima" }}
      bodyMode="coded"
    >
      <ClientOnly fallback={<ModelPlaceholder />}>
        <Suspense fallback={<ModelPlaceholder />}>
          <JetModel />
        </Suspense>
      </ClientOnly>
    </TopicLayout>
  );
}
