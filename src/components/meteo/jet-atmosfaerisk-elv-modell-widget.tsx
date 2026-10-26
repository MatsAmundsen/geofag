import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const AtmosfaeriskElvDannelseFigur = lazy(() =>
  import("@/components/diagrams/atmosfaerisk-elv-dannelse-figur").then((m) => ({
    default: m.AtmosfaeriskElvDannelseFigur,
  })),
);

const JetModel = lazy(() =>
  import("@/components/meteo/jet-model").then((m) => ({ default: m.JetModel })),
);

function ModelPlaceholder() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card" role="status">
      <div className="h-48 border-b border-border" />
      <div className="jet-map-stage flex items-center justify-center text-sm text-muted-foreground">
        Laster modellen …
      </div>
    </div>
  );
}

function FigurPlaceholder() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card" role="status">
      <div className="h-64 animate-pulse bg-muted/40" />
      <div className="px-4 py-3 text-sm text-muted-foreground">Laster figuren …</div>
    </div>
  );
}

/** Undervisningsmodell for jetstrømmer og atmosfæriske elver (embed i jetstrommer-kapitlet). */
export function JetAtmosfaeriskElvModellWidget() {
  return (
    <div id="atmosfaeriske-elver" className="my-8 space-y-10">
      <ClientOnly fallback={<FigurPlaceholder />}>
        <Suspense fallback={<FigurPlaceholder />}>
          <AtmosfaeriskElvDannelseFigur />
        </Suspense>
      </ClientOnly>
      <div className="jet-breakout">
        <ClientOnly fallback={<ModelPlaceholder />}>
          <Suspense fallback={<ModelPlaceholder />}>
            <JetModel />
          </Suspense>
        </ClientOnly>
      </div>
    </div>
  );
}
