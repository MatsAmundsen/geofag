import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BannerBilde } from "@/components/geografi/banner-bilde";
import { bannerKreditt } from "@/lib/geografi-banner";
import { aksentStil } from "@/lib/geografi-aksent";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GEOGRAFI_KAPITLER } from "@/lib/geografi-kapitler";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/geografi/")({
  head: () =>
    topicHead({
      title: "Geografi",
      description:
        "Geografi for Vg1 (GEO01-02): elleve kapitler om kart og feltarbeid, landskap, klima, naturfare, ressurser, bærekraft, næringsliv, befolkning og migrasjon.",
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
              Geografi handler om hvorfor steder er som de er, og hvordan de henger sammen med resten
              av verden. Her finner du elleve kapitler for Vg1 Geografi, med fagtekst, kart, figurer og
              oppgaver. Vi begynner med kart, kilder og feltarbeid. Så går vi videre til landskap, klima
              og naturfare, og til slutt til ressurser, bærekraft, næringsliv, befolkning og migrasjon.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="slik-arbeider-vi"
          className="mx-auto max-w-6xl px-4 pt-16 sm:px-6"
        >
          <div className="max-w-2xl">
            <h2
              id="slik-arbeider-vi"
              className="font-display text-3xl font-medium tracking-tight"
            >
              Slik arbeider vi i geografi
            </h2>
            <p className="mt-3 text-muted-foreground">
              I geografi stiller vi tre spørsmål om nesten alt vi undersøker: Hvor er det? Hvorfor
              akkurat der? Hva betyr det for mennesker og natur? Vi bruker ekte og daterte tall fra
              kilder som SSB, NVE, FN og Verdensbanken, og vi sier fra hva tallene ikke viser. Hver
              påstand har en kilde, og kildelista står nederst i hvert kapittel.
            </p>
          </div>
        </section>

        <section id="kapitler" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium tracking-tight">Kapitler</h2>
            <p className="mt-3 text-muted-foreground">
              Hvert kapittel starter med kompetansemålene og en konkret fortelling som åpner temaet.
              Underveis får du forklaringer, kart og figurer, og Innblikk-bokser der vi går dypere inn i
              én sak. Kapitlet avsluttes med oppsummering, begreper, spørsmål og oppgaver. Du kan lese
              kapitlene i rekkefølge eller begynne med det temaet du arbeider med nå.
            </p>
            <p className="mt-3 text-muted-foreground">
              Trenger du å slå opp et ord? Alle de sentrale begrepene står samlet i{" "}
              <Link to="/geografi/begreper" className="text-primary underline underline-offset-4">
                begrepsregisteret
              </Link>
              .
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {GEOGRAFI_KAPITLER.map((kap, i) => (
              <li key={kap.path} className="geo-aksent relative" style={aksentStil(kap.path)}>
                <Link
                  to="/geografi/$kapittel"
                  params={{ kapittel: kap.path }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
                >
                  <div className="relative aspect-photo overflow-hidden">
                    <BannerBilde
                      banner={kap.banner}
                      sizes="(min-width: 1152px) 552px, (min-width: 640px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div aria-hidden="true" className="h-1 bg-[var(--kap-aksent)]" />
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      <span className="font-medium text-[var(--kap-aksent)]">Kapittel {i + 1}</span>
                      {" · "}
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
                {/* Kreditten står utenfor lenken (ingen nestede lenker) og slipper klikk gjennom til kortet. */}
                <p className="pointer-events-none absolute right-2 top-2 max-w-[calc(100%-1rem)] rounded bg-background/90 px-1.5 py-0.5 text-right text-xs leading-snug text-foreground/90 lys:bg-background/95">
                  {bannerKreditt(kap.banner)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
