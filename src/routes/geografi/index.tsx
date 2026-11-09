import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GEOGRAFI_KAPITLER } from "@/lib/geografi-kapitler";
import { topicHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/geografi/")({
  head: () =>
    topicHead({
      title: "Geografi",
      description:
        "Geografi for Vg1 (GEO01-02): geografiske verktøy, feltarbeid, landskap, klima, naturfare, ressurser, bærekraft, næring, befolkning og migrasjon.",
      path: "/geografi",
    }),
  component: GeografiOversikt,
});

function GeografiOversikt() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#kapitler"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Hopp til kapitler
      </a>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative isolate min-h-[64vh] overflow-hidden">
          <img
            src="/images/hero-earth.jpg"
            alt="Jorda sett fra lav bane over hav og skyer"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="relative mx-auto flex min-h-[64vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Geografi · GEO01-02
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-6xl">
              Sted, landskap og samfunn.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-foreground/90 sm:text-lg">
              Elleve kapitler for Vg1 Geografi. Start med verktøy og feltarbeid, gå videre til
              naturfare og bærekraft, og bygg ut resten etter planen.
            </p>
          </div>
        </section>

        <section id="kapitler" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium tracking-tight">Kapitler</h2>
            <p className="mt-3 text-muted-foreground">
              Hvert kapittel er under arbeid. Kortene viser tittel, kompetansemål og en kort
              beskrivelse.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {GEOGRAFI_KAPITLER.map((kap) => (
              <li key={kap.path}>
                <Link
                  to="/geografi/$kapittel"
                  params={{ kapittel: kap.path }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
                >
                  <div className="relative aspect-photo overflow-hidden">
                    <img
                      src={kap.image}
                      alt={kap.alt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span
                      className={cn(
                        "absolute left-3 top-3 rounded-md px-2 py-1 text-xs font-medium",
                        "bg-background/80 text-muted-foreground",
                      )}
                    >
                      Under arbeid
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {kap.kicker} · {kap.maal.join(", ")}
                    </p>
                    <h3 className="font-display text-2xl font-medium tracking-tight">{kap.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{kap.blurb}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm text-primary">
                      Åpne kapittel
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
