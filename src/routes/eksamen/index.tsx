import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Callout } from "@/components/callout";
import { EXAM_SETS, SOLUTIONS } from "@/lib/eksamen";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/eksamen/")({
  head: () =>
    topicHead({
      title: "Eksamensoppgaver · Geofag 2",
      description:
        "Bibliotek av sentrale Geofag 2-eksamener (REA3043) med løsningsforslag, figurer og animasjoner. Fasit sjekket mot Udir der den er publisert.",
      path: "/eksamen",
    }),
  component: EksamenIndex,
});

function EksamenIndex() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Geofag 2 · REA3043
            </p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Eksamensoppgaver
            </h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/90 sm:text-lg">
              Tidligere sentrale sett fra Udir. Under hvert sett ligger biblioteket{" "}
              <strong className="font-medium text-foreground">Løsningsforslag</strong>: fasit,
              pedagogisk forklaring og originale figurer — ikke kopier av Udirs kart.
            </p>
          </div>
        </header>

        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <section className="rounded-2xl border border-primary/25 bg-primary/8 px-5 py-6 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">Bibliotek</p>
            <h2 className="mt-1 font-display text-3xl font-medium tracking-tight">
              Løsningsforslag
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/90">
              I flervalgsoppgavene får du nøkkelen og en visuell forklaring på hvorfor den er
              riktig — og hvorfor de andre faller. I skriveoppgavene får du detaljert fasit med
              steg. Der det hjelper, er det tegnet figurer og enkle animasjoner. Ingen kopier av
              Udirs kart eller satellittbilder.
            </p>
          </section>

          <Callout title="Passord og figurer">
            <p>
              Udir låser settene fordi mange figurer er tredjepartsverk. Passord får du fra skolen
              eller eksamenskontoret. Åpne settet hos Udir, se figuren, kom tilbake og les
              løsningsforslaget.
            </p>
            <p>
              Løsningsforslagene er skrevet om med egne ord. Der Udir har lagt ut fasit, følger
              vi den. De erstatter ikke den offisielle sensorveiledningen — den laster du ned fra
              Udirs søk i eksamensoppgaver.
            </p>
          </Callout>

          <ul className="mt-8 space-y-4">
            {EXAM_SETS.map((set) => {
              const n = Object.keys(SOLUTIONS[set.slug] ?? {}).length;
              return (
                <li key={set.slug}>
                  <Link
                    to="/eksamen/$slug"
                    params={{ slug: set.slug }}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {set.kind === "eksempel" ? "Eksempel" : "Eksamen"} · {set.tasks.length}{" "}
                        oppgaver · {n} løsningsforslag
                        {set.complete ? "" : " · ufullstendig uttrekk"}
                        {set.fasitSource === "udir" ? " · sjekket mot Udir-fasit" : " · eget forslag"}
                      </p>
                      <h2 className="mt-1 font-display text-2xl font-medium tracking-tight group-hover:text-primary">
                        {set.label}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {set.themes.join(" · ")}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary sm:mt-0">
                      Åpne sett
                      <ArrowRight className="size-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-10 text-sm text-muted-foreground">
            Offisiell oversikt:{" "}
            <a
              className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
              href="https://kandidat.udir.no/eksamensinfo/REA3043"
              target="_blank"
              rel="noreferrer"
            >
              kandidat.udir.no/eksamensinfo/REA3043
              <ExternalLink className="size-3.5" />
            </a>
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
