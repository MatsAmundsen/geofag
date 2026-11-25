import { createFileRoute, Link } from "@tanstack/react-router";
import { useDeferredValue, useId, useMemo, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { GEOGRAFI_KAPITLER } from "@/lib/geografi-kapitler";
import { GEOGRAFI_BEGREPER } from "@/lib/geografi-generert";
import type { GeografiBegrep } from "@/lib/geografi-generert-bygg";
import { topicHead } from "@/lib/seo";

/** Felles begrepsregister. Pedagogs register (geografi-begreper.ts), lenker fra geografi-generert-bygg.ts. */
export const Route = createFileRoute("/geografi/begreper")({
  head: () =>
    topicHead({
      title: "Begreper · Geografi",
      description:
        "Begrepene fra de elleve Geografi-kapitlene (Vg1, GEO01-02), alfabetisk, med kort forklaring og lenke til kapitlet.",
      path: "/geografi/begreper",
    }),
  component: GeografiBegreper,
});

const fold = (s: string) => s.toLocaleLowerCase("nb").normalize("NFC");

function forbokstav(begrep: string): string {
  const first = begrep.trim().charAt(0).toLocaleUpperCase("nb");
  return /\p{L}/u.test(first) ? first : "#";
}

function grupper(liste: readonly GeografiBegrep[]): [string, GeografiBegrep[]][] {
  const map = new Map<string, GeografiBegrep[]>();
  for (const b of liste) {
    const key = forbokstav(b.begrep);
    const rows = map.get(key) ?? [];
    rows.push(b);
    map.set(key, rows);
  }
  return [...map.entries()];
}

const ALLE_BOKSTAVER = grupper(GEOGRAFI_BEGREPER).map(([b]) => b);

function GeografiBegreper() {
  const [sok, setSok] = useState("");
  const [kapittel, setKapittel] = useState("");
  const utsattSok = useDeferredValue(sok);
  const sokId = useId();
  const kapId = useId();

  const treff = useMemo(() => {
    const q = fold(utsattSok.trim());
    return GEOGRAFI_BEGREPER.filter(
      (b) =>
        (!kapittel || b.steder.some((st) => st.kapittel === kapittel)) &&
        (!q || fold(b.begrep).includes(q) || fold(b.forklaring).includes(q)),
    );
  }, [utsattSok, kapittel]);
  const grupper_ = useMemo(() => grupper(treff), [treff]);
  const synlige = new Set(grupper_.map(([b]) => b));

  return (
    <div className="kapittel-lys flex min-h-dvh flex-col">
      <a
        href="#begreper"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Hopp til begrepene
      </a>
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-border bg-card/40">
          <div className="mx-auto max-w-4xl px-4 pb-10 pt-3 sm:px-6 sm:pt-4">
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
            <p className="mt-6 text-xs font-medium uppercase tracking-wider text-primary">
              <Link to="/geografi" className="underline-offset-4 hover:underline">
                Geografi
              </Link>{" "}
              · Begrepsregister
            </p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Begreper i geografi
            </h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/90 sm:text-lg">
              Her finner du de sentrale begrepene fra alle de elleve kapitlene i Geografi, samlet på
              ett sted. Forklaringene er de samme som i kapitlene, men korte. Vil du forstå et
              begrep bedre, kan du åpne kapitlet det hører til og lese det i sammenheng. Der finner
              du også eksempler, figurer og oppgaver.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <form
            role="search"
            className="grid gap-4 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[1fr_16rem] sm:p-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-1.5">
              <label htmlFor={sokId} className="text-sm font-medium">
                Søk i begreper og forklaringer
              </label>
              <Input
                id={sokId}
                type="search"
                value={sok}
                onChange={(e) => setSok(e.target.value)}
                placeholder="For eksempel morene eller HDI"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor={kapId} className="text-sm font-medium">
                Kapittel
              </label>
              <select
                id={kapId}
                value={kapittel}
                onChange={(e) => setKapittel(e.target.value)}
                className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <option value="">Alle kapitler</option>
                {GEOGRAFI_KAPITLER.map((k, i) => (
                  <option key={k.path} value={k.path}>
                    {i + 1}. {k.title}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <p className="mt-4 text-sm text-muted-foreground" role="status" aria-live="polite">
            Viser {treff.length} av {GEOGRAFI_BEGREPER.length} begreper
          </p>

          <nav aria-label="Bokstaver" className="mt-4">
            <ul className="flex flex-wrap gap-1">
              {ALLE_BOKSTAVER.map((b) => (
                <li key={b}>
                  {synlige.has(b) ? (
                    <a
                      href={`#bokstav-${b}`}
                      className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-sm font-medium text-primary hover:bg-muted"
                    >
                      {b}
                    </a>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="inline-flex size-9 items-center justify-center rounded-md text-sm text-muted-foreground"
                    >
                      {b}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div id="begreper" className="mt-8 space-y-10">
            {grupper_.length === 0 ? (
              <p className="rounded-2xl border border-border bg-card p-5 text-sm">
                Ingen begreper passer. Prøv et kortere ord eller velg «Alle kapitler».
              </p>
            ) : null}
            {grupper_.map(([bokstav, rows]) => (
              <section key={bokstav} aria-labelledby={`bokstav-${bokstav}`}>
                <h2
                  id={`bokstav-${bokstav}`}
                  className="scroll-mt-24 border-b border-border pb-2 font-display text-2xl font-medium tracking-tight"
                >
                  {bokstav}
                </h2>
                <dl className="mt-2 divide-y divide-border">
                  {rows.map((b) => (
                    <div
                      key={b.begrep}
                      className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6"
                    >
                      <dt className="font-display text-lg font-medium leading-snug">{b.begrep}</dt>
                      <dd className="text-sm leading-relaxed">
                        <p>{b.forklaring}</p>
                        {b.steder.map((st) => {
                          const kap = GEOGRAFI_KAPITLER[st.kapittelNr - 1]!;
                          const underNr = kap.underkapitler.findIndex((u) => u.id === st.under) + 1;
                          const under = underNr > 0 ? kap.underkapitler[underNr - 1] : undefined;
                          return (
                            <p key={st.kapittel} className="mt-1.5 text-muted-foreground">
                              {under ? (
                                <Link
                                  to="/geografi/$kapittel/$under"
                                  params={{ kapittel: kap.path, under: under.id }}
                                  className="text-primary underline underline-offset-4"
                                >
                                  {st.kapittelNr}.{underNr} {under.title}
                                </Link>
                              ) : (
                                <Link
                                  to="/geografi/$kapittel"
                                  params={{ kapittel: kap.path }}
                                  hash="begreper"
                                  className="text-primary underline underline-offset-4"
                                >
                                  Kapittel {st.kapittelNr}
                                </Link>
                              )}{" "}
                              · Kapittel {st.kapittelNr}: {kap.title}
                            </p>
                          );
                        })}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
