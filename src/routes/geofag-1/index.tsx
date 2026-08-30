import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GF1_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/geofag-1/")({
  head: () =>
    topicHead({
      title: "Geofag 1",
      description:
        "Geofag 1: jorda under oss. Platetektonikk, vulkaner og jordskjelv, bergarter, vann og flom, skred, geologiske ressurser og feltarbeid.",
      path: "/geofag-1",
    }),
  component: Geofag1,
});

function Geofag1() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#temaer"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Hopp til temaer
      </a>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative isolate min-h-[64vh] overflow-hidden">
          <img
            src="/images/portal-gf1.jpg"
            alt="Stratovulkan i utbrudd"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="relative mx-auto flex min-h-[64vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Geofag 1
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-6xl">
              Jorda under oss.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-foreground/90 sm:text-lg">
              Geosfæren og hydrosfæren: platene, bergartene, vannet på land — og
              naturfarene som følger. Start med sfærene, gå videre til platene.
            </p>
          </div>
        </section>

        <section id="temaer" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium tracking-tight">Temaer</h2>
            <p className="mt-3 text-muted-foreground">
              Åtte innganger etter kompetansemålene. Naturfarer sitter i tre av dem: vulkaner og
              jordskjelv, vann og flom, og skred.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {GF1_THEMES.map((tema) => (
              <li key={tema.slug}>
                <Link
                  to="/geofag-1/$slug"
                  params={{ slug: tema.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
                >
                  <div className="relative aspect-photo overflow-hidden">
                    <img
                      src={tema.image}
                      alt={tema.alt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span
                      className={cn(
                        "absolute left-3 top-3 rounded-md px-2 py-1 text-xs font-medium",
                        tema.status === "klar"
                          ? "bg-background/80 text-primary"
                          : "bg-background/80 text-muted-foreground",
                      )}
                    >
                      {tema.status === "klar" ? "Klar" : "Utkast"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {tema.kicker}
                    </p>
                    <h3 className="font-display text-2xl font-medium tracking-tight">{tema.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{tema.blurb}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm text-primary">
                      {tema.status === "klar" ? "Åpne tema" : "Åpne utkast"}
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
