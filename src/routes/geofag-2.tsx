import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { GF2_GAP_THEMES } from "@/lib/nav-g2-gaps";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/geofag-2")({
  head: () =>
    topicHead({
      title: "Geofag 2",
      description:
        "Geofag 2: vind, hav og klima som ett system. Trykk, værkart, kryosfære, modeller, energi og felt.",
      path: "/geofag-2",
    }),
  component: Geofag2,
});

function Geofag2() {
  const themes = [...GF2_THEMES, ...GF2_GAP_THEMES];
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
        <section className="relative isolate min-h-[72vh] overflow-hidden">
          <img
            src="/images/hero-earth.jpg"
            alt="Jorda sett fra lav bane over Nord-Atlanteren, med tynn lysende atmosfære langs horisonten"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Geofag 2 · VG3 til førsteårs universitet
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-6xl">
              Vind, hav og klima er ett system.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-foreground/90 sm:text-lg">
              Sola varmer ekvator mer enn polene. Luften og havet flytter overskuddsenergien nord-
              og sørover. Corioliseffekten bøyer banene. Resten av været — og mye av Norges milde
              kystklima — følger av det.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">REA3043</p>
              <h2 className="mt-1 font-display text-2xl font-medium tracking-tight sm:text-3xl">Eksamen</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Skriftlig Geofag 2 per 2026: gjennomføring, regler, hjelpemidler, kildeføring og løsningsforslag.
              </p>
            </div>
            <Button asChild>
              <Link to="/eksamen">
                Eksamen
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="temaer" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium tracking-tight">Temaer</h2>
            <p className="mt-3 text-muted-foreground">
              Start med trykk, så mekanismene. Klima, is, energi og felt bygger på det samme.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {themes.map((tema) => (
              <li key={tema.title}>
                <Link
                  to={tema.to}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
                >
                  <div className="relative aspect-photo overflow-hidden">
                    <img src={tema.image} alt={tema.alt} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                    <span className={cn("absolute left-3 top-3 rounded-md px-2 py-1 text-xs font-medium", tema.status === "klar" ? "bg-background/80 text-primary" : "bg-background/80 text-muted-foreground")}>
                      {tema.status === "klar" ? "Klar" : "Kommer"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{tema.kicker}</p>
                    <h3 className="font-display text-2xl font-medium tracking-tight">{tema.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{tema.blurb}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm text-primary">
                      Åpne tema
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
