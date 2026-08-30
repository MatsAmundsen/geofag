import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/geofag-2")({
  head: () =>
    topicHead({
      title: "Geofag 2",
      description:
        "Geofag 2: vind, hav og klima som ett system. Trykk, vindsystemet, jetstrømmer, corioliseffekten, havstrømmer, klima og værkatastrofer.",
      path: "/geofag-2",
    }),
  component: Geofag2,
});

function Geofag2() {
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

        <section id="temaer" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium tracking-tight">Temaer</h2>
            <p className="mt-3 text-muted-foreground">
              Start med trykk, så mekanismene. Klima og værkatastrofer bygger på det samme — ellers
              blir det symptomer uten årsak.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {GF2_THEMES.map((tema) => (
              <li key={tema.title}>
                <Link
                  to={tema.to}
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
                      {tema.status === "klar" ? "Klar" : "Kommer"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {tema.kicker}
                    </p>
                    <h3 className="font-display text-2xl font-medium tracking-tight">
                      {tema.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{tema.blurb}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm text-primary">
                      {tema.status === "klar" ? "Åpne tema" : "Se forhåndsblikk"}
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Fordypning
              </p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">
                Fra trykk til katastrofe.
              </h2>
            </div>
            <ol className="space-y-6 lg:col-span-2">
              <Fordypning
                n="01"
                to="/tema/hoytrykk-lavtrykk"
                title="Høytrykk og lavtrykk"
                text="Luft har vekt. Der den stiger, blir det lavtrykk og ofte skyer. Der den synker, blir det høytrykk og ofte klarvær. Vind går fra H mot L."
              />
              <Fordypning
                n="02"
                to="/tema/vindsystemet"
                title="Det globale vindsystemet"
                text="Ujevn stråling skaper trykkforskjeller. Tre celler på hver halvkule transporterer varme og vanndamp."
              />
              <Fordypning
                n="03"
                to="/tema/jetstrommer"
                title="Jetstrømmer"
                text="Et smalt belte med sterk vestavind i øvre troposfære. To belter, ikke ett. Utløpet av en jetkjerne dypner lavtrykkene, og stormbanen følger jeten inn mot Norge."
              />
              <Fordypning
                n="04"
                to="/tema/coriolis"
                title="Corioliseffekten"
                text="Jordrotasjonen bøyer bevegelser. Uten den ville passatene og lavtrykkene sett helt annerledes ut."
              />
              <Fordypning
                n="05"
                to="/tema/havstrommer"
                title="Havstrømmer"
                text="Vinden driver overflaten. Tetthet driver dypet. Sammen gir de Norge et kystklima som ikke matcher breddegraden."
              />
              <Fordypning
                n="06"
                to="/tema/klima"
                title="Klima og klimasystemer"
                text="Vær er dager. Klima er tiår. Drivhuseffekt og de store hav-atmosfære-svingningene: ENSO, IOD, NAO og AMOC."
              />
              <Fordypning
                n="07"
                to="/tema/numeriske-modeller"
                title="Numeriske modeller"
                text="En numerisk modell er fysikk regnet på et rutenett, til ulike formål på ulike tidsskalaer."
              />
              <Fordypning
                n="08"
                to="/tema/paleoklima"
                title="Paleoklima"
                text="Termometer dekker et øyeblikk. Iskjerner og havbunn blir til kunnskap som modeller og risiko bruker."
              />
              <Fordypning
                n="09"
                to="/tema/vaerkatastrofer"
                title="Værkatastrofer"
                text="Orkaner, polarfrontstormer, ekstremnedbør og stormflo. Samme fysikk. Høyere innsats når samfunn står i veien."
              />
            </ol>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Fordypning({
  n,
  to,
  title,
  text,
}: {
  n: string;
  to: string;
  title: string;
  text: string;
}) {
  return (
    <li>
      <Link to={to} className="group block rounded-xl border border-border bg-background p-5">
        <p className="text-xs tabular-nums text-primary">{n}</p>
        <h3 className="mt-1 font-display text-xl font-medium tracking-tight group-hover:text-primary">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      </Link>
    </li>
  );
}
