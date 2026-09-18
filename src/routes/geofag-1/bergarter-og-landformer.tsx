import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mountain, Layers } from "lucide-react";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("bergarter")!;

export const Route = createFileRoute("/geofag-1/bergarter-og-landformer")({
  head: () =>
    topicHead({
      title: "Bergarter og landformer (Oppdelt) · Geofag 1",
      description:
        "Dette kapittelet er nå delt inn i to selvstendige dybdekapitler: Bergarter og det geologiske kretsløpet, og Landformer og geomorfologiske prosesser.",
      path: "/geofag-1/bergarter-og-landformer",
    }),
  component: BergarterOgLandformerBridgePage,
});

function BergarterOgLandformerBridgePage() {
  return (
    <TopicLayout
      kicker="Geofag 1 · Kapittoversikt"
      title="Bergarter og landformer"
      lead="Dette emnet er nå delt inn i to selvstendige, fullverdige dybdekapitler i tråd med LK20-læreplanen for Geofag 1. Velg kapittelet du ønsker å studere nedenfor."
      banner="/images/geo-geologisk-kretslop-3d.jpg"
      bannerAlt="3D-blokkdiagram av det geologiske kretsløpet og landskapsdannelsen"
      prev={{
        to: "/geofag-1/vulkaner-og-jordskjelv",
        label: "Forrige: Vulkaner og jordskjelv",
      }}
      next={{
        to: "/geofag-1/vann-og-flom",
        label: "Neste: Vann og flom",
      }}
      kilder={KILDER.bergarter}
    >
      <div className="my-8 grid gap-6 sm:grid-cols-2">
        <Link
          to="/geofag-1/bergarter"
          className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
        >
          <div>
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
              <Layers className="size-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Kapittel 1
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              Bergarter og mineraler
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Mineralogi, silikatstrukturenes krystallkjemi, det geologiske kretsløpet,
              Bowens reaksjonsserie, tynnsnitt under polarisasjonsmikroskopi (larvikitt,
              rombeporfyr, gneis) og relativ/radiometrisk aldersdatering (U-Pb og ¹⁴C).
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
            <span>Gå til Bergarter</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        <Link
          to="/geofag-1/landformer"
          className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-teal-500/50 hover:shadow-lg"
        >
          <div>
            <div className="flex size-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 mb-4">
              <Mountain className="size-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              Kapittel 2
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold text-foreground group-hover:text-teal-400 transition-colors">
              Landformer og geomorfologi
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Mekanisk og kjemisk forvitring, Hjulstrøms kurve for sedimenttransport,
              fluviale V-daler, meandere, kroksjøer og deltaer, glasiale U-daler, fjorder,
              morener og Norges landskapshistorie (den paleiske flaten og tertiær heving).
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-teal-400">
            <span>Gå til Landformer</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </TopicLayout>
  );
}
