import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeToggle } from "@/components/theme-toggle";
import type { GeografiKapittel, GeografiUnderkapittel } from "@/lib/geografi-kapitler";
import { GEOGRAFI_KAPITLER } from "@/lib/geografi-kapitler";
import { KILDER_GEOGRAFI } from "@/lib/kilder-geografi";
import { Kildeliste } from "@/components/kildeliste";
import { PosterBody } from "@/components/poster-body";
import { BannerBilde } from "@/components/geografi/banner-bilde";
import { bannerLisensUrl } from "@/lib/geografi-banner";
import { aksentStil } from "@/lib/geografi-aksent";
import { useEffect, useState } from "react";
import { getPost, type Post } from "@/lib/posts";
import { geografiHeadingAliases, sliceGeografiUnderkapittel } from "@/lib/geografi-seksjon";
import { GeografiInnhold } from "@/components/geografi/innhold-nav";

export function GeografiKapittelSide({
  kapittel,
  underkapittel,
  initialPost = null,
}: {
  kapittel: GeografiKapittel;
  /** Satt på `/geografi/<kap>/<under>`: bare den H2-blokken vises. */
  underkapittel?: GeografiUnderkapittel;
  /** Fra rute-loaderen (SSR), så fagteksten står i HTML-en fra serveren. */
  initialPost?: Post | null;
}) {
  const index = GEOGRAFI_KAPITLER.findIndex((k) => k.path === kapittel.path);
  const kapNr = index + 1;
  const underIndex = underkapittel
    ? kapittel.underkapitler.findIndex((u) => u.id === underkapittel.id)
    : -1;
  const forrigeUnder = underIndex > 0 ? kapittel.underkapitler[underIndex - 1] : undefined;
  const nesteUnder =
    underIndex >= 0 && underIndex < kapittel.underkapitler.length - 1
      ? kapittel.underkapitler[underIndex + 1]
      : undefined;
  const prev = index > 0 ? GEOGRAFI_KAPITLER[index - 1] : undefined;
  const next =
    index >= 0 && index < GEOGRAFI_KAPITLER.length - 1 ? GEOGRAFI_KAPITLER[index + 1] : undefined;
  const kilder = KILDER_GEOGRAFI[kapittel.slug] ?? [];
  // Kap. 1–2 har målte figurreserver og reserverer også teksthøyden (CLS).
  const reserverTekst =
    !underkapittel && (kapittel.path === "verktoy" || kapittel.path === "feltarbeid");

  const [post, setPost] = useState<Post | null>(initialPost);
  useEffect(() => {
    if (initialPost) setPost(initialPost);
  }, [initialPost]);
  useEffect(() => {
    // Loaderen gir teksten ved SSR og klientnavigasjon. Hent likevel på nytt én
    // gang, så en side fra cache får siste CMS-versjon (som før).
    let cancelled = false;
    void getPost({ data: kapittel.slug }).then((fresh) => {
      if (cancelled || !fresh) return;
      setPost((current) =>
        current &&
        current.bodyMarkdown === fresh.bodyMarkdown &&
        current.updatedAt === fresh.updatedAt
          ? current
          : fresh,
      );
    });
    return () => {
      cancelled = true;
    };
  }, [kapittel.slug]);

  const body = post?.bodyMarkdown
    ? underkapittel
      ? // H1 er underkapittelnavnet. H2-linja i blokken ville gitt dobbel tittel, og
        // mellomtitlene flyttes ett nivå opp, så overskriftsrekkefølgen blir H1 → H2 → H3.
        (sliceGeografiUnderkapittel(post.bodyMarkdown, underkapittel.title)
          ?.replace(/^## .*\n+/, "")
          .replace(/^(#{3,6})(?=[ \t])/gm, (hashes) => hashes.slice(1)) ?? null)
      : post.bodyMarkdown
    : null;
  const mangler = Boolean(post?.bodyMarkdown) && body === null;

  // Teksten kommer etter første maling, så nettleseren rekker ikke å hoppe til
  // #anker (gamle lenker som /geografi/verktoy#kildekritikk). Gjør det når den er på plass.
  useEffect(() => {
    if (!body || typeof window === "undefined" || !window.location.hash) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, [body]);

  return (
    <div className="kapittel-lys geo-aksent flex min-h-dvh flex-col" style={aksentStil(kapittel.path)}>
      <a
        href="#innhold"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Hopp til innhold
      </a>
      <SiteHeader />
      <main id="innhold" className="flex-1">
        <header className="relative isolate min-h-[23rem] overflow-hidden sm:min-h-[27rem]">
          <BannerBilde
            banner={kapittel.banner}
            sizes="100vw"
            hero
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Lyst tema: mindre utvasking enn før (94 %/80 %), så banneret gir kapitlet sitt eget preg.
              Teksten står nederst, der gradienten er nesten helt bakgrunn (målt kontrast i kapittelforsider.md). */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/25 lys:from-background lys:from-25% lys:via-background/88 lys:to-background/30" />
          <div className="relative mx-auto flex min-h-[23rem] max-w-4xl flex-col px-4 pb-12 pt-3 sm:min-h-[27rem] sm:px-6 sm:pt-4">
            <div className="flex shrink-0 justify-end">
              <ThemeToggle />
            </div>
            <div className="mt-auto pt-6">
              {underkapittel ? (
                <nav aria-label="Brødsmuler" className="self-start">
                  <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2 rounded-md bg-background px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-[var(--kap-aksent)]">
                    <li>
                      <Link to="/geografi" className="inline-flex min-h-6 items-center underline-offset-4 hover:underline">
                        Geografi
                      </Link>
                    </li>
                    <li aria-hidden="true">·</li>
                    <li>
                      <Link
                        to="/geografi/$kapittel"
                        params={{ kapittel: kapittel.path }}
                        className="inline-flex min-h-6 items-center underline-offset-4 hover:underline"
                      >
                        Kapittel {kapNr}: {kapittel.title}
                      </Link>
                    </li>
                    <li aria-hidden="true">·</li>
                    <li aria-current="page">
                      {kapNr}.{underIndex + 1}
                    </li>
                  </ol>
                </nav>
              ) : (
                <p className="inline-flex items-center gap-1.5 self-start rounded-md bg-background px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-[var(--kap-aksent)]">
                  <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-[var(--kap-aksent)]" />
                  Geografi · Kapittel {kapNr} · {kapittel.kicker}
                </p>
              )}
              <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
                {underkapittel ? underkapittel.title : kapittel.title}
              </h1>
              {underkapittel ? null : (
                <p className="mt-4 max-w-2xl text-base text-foreground/90 sm:text-lg">
                  {kapittel.blurb}
                </p>
              )}
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                {kapittel.maal.join(" · ")}
                {!kapittel.tekstKlar ? " · status: under arbeid" : ""}
              </p>
            </div>
          </div>
          <p className="absolute inset-x-4 bottom-2 flex justify-end sm:inset-x-6">
            <span className="rounded bg-background/90 px-1.5 py-0.5 text-right text-xs leading-snug text-foreground/90 lys:bg-background/95">
              Foto: {kapittel.banner.foto},{" "}
              <a
                href={bannerLisensUrl(kapittel.banner)}
                rel="license noopener"
                className="underline underline-offset-2 hover:text-primary"
              >
                {kapittel.banner.lisens}
              </a>
            </span>
          </p>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-[var(--kap-aksent)]" />
        </header>

        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          {!kapittel.tekstKlar ? (
            <>
              <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                <h2 className="font-display text-xl font-medium tracking-tight">Læringsmål</h2>
                <p className="mt-2 text-sm text-muted-foreground">Etter kapitlet kan du</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
                  {kapittel.laeringsmaal.map((maal) => (
                    <li key={maal}>{maal}</li>
                  ))}
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="font-display text-xl font-medium tracking-tight">
                  Planlagte underkapitler
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Underkapitlene får egne sider senere. Her er oversikten for dette kapitlet.
                </p>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
                  {kapittel.underkapitler.map((u) => (
                    <li key={u.id}>{u.title}</li>
                  ))}
                </ol>
              </section>

              <section className="mt-8 rounded-2xl border border-dashed border-border bg-muted/40 p-5 text-sm text-muted-foreground">
                Innholdet er under arbeid. Full tekst, figurer og oppgaver kommer i senere
                leveranser på branchen geografi-del.
              </section>
            </>
          ) : null}

          {kapittel.tekstKlar ? (
            <GeografiInnhold kapittel={kapittel} aktiv={underkapittel?.id} />
          ) : null}

          {mangler ? (
            <p className="mt-10 rounded-2xl border border-border bg-card p-5 text-sm">
              Fant ikke denne delen i kapittelteksten.{" "}
              <Link
                to="/geografi/$kapittel"
                params={{ kapittel: kapittel.path }}
                className="text-primary underline underline-offset-4"
              >
                Les hele kapitlet
              </Link>
              .
            </p>
          ) : null}

          {(reserverTekst && kapittel.tekstKlar) || body ? (
            // Kap. 1–2: hold kilder og navigasjon under skjermkanten mens CMS-teksten
            // lastes. Figurreservene alene hindrer ikke dette tidligere hoppet (CLS 0,25
            // ved 1280 uten). Andre kapitler er som i main.
            <section
              className={reserverTekst ? "prose-geofag mt-10 min-h-dvh" : "prose-geofag mt-10"}
              aria-busy={reserverTekst ? !post : undefined}
            >
              {body ? (
                <PosterBody
                  headingAnchors
                  innblikk
                  headingIdAlias={geografiHeadingAliases(kapittel)}
                >
                  {body}
                </PosterBody>
              ) : null}
            </section>
          ) : null}

          {kilder.length > 0 ? (
            <section className="mt-10">
              <Kildeliste
                kilder={kilder}
                bilde={{
                  tekst: `Bannerbilde: ${kapittel.banner.foto}, ${kapittel.banner.lisens}, bearbeidet av Geofag.com.`,
                  href: kapittel.banner.href,
                }}
              />
            </section>
          ) : null}

          {underkapittel ? (
            <nav
              className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between"
              aria-label="Underkapittelnavigasjon"
            >
              {forrigeUnder ? (
                <Link
                  to="/geografi/$kapittel/$under"
                  params={{ kapittel: kapittel.path, under: forrigeUnder.id }}
                  className="inline-flex items-center gap-2 text-sm text-primary"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Forrige: {forrigeUnder.title}
                </Link>
              ) : (
                <Link
                  to="/geografi/$kapittel"
                  params={{ kapittel: kapittel.path }}
                  className="inline-flex items-center gap-2 text-sm text-primary"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Til kapitlet: {kapittel.title}
                </Link>
              )}
              {nesteUnder ? (
                <Link
                  to="/geografi/$kapittel/$under"
                  params={{ kapittel: kapittel.path, under: nesteUnder.id }}
                  className="inline-flex items-center gap-2 text-sm text-primary sm:ml-auto"
                >
                  Neste: {nesteUnder.title}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : (
                <Link
                  to="/geografi/$kapittel"
                  params={{ kapittel: kapittel.path }}
                  hash="oppsummering"
                  className="inline-flex items-center gap-2 text-sm text-primary sm:ml-auto"
                >
                  Oppsummering og oppgaver
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </nav>
          ) : (
            <nav
              className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between"
              aria-label="Kapittelnavigasjon"
            >
              {prev ? (
                <Link
                  to="/geografi/$kapittel"
                  params={{ kapittel: prev.path }}
                  className="inline-flex items-center gap-2 text-sm text-primary"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Forrige: {prev.title}
                </Link>
              ) : (
                <Link
                  to="/geografi"
                  className="inline-flex items-center gap-2 text-sm text-primary"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Til oversikten
                </Link>
              )}
              {next ? (
                <Link
                  to="/geografi/$kapittel"
                  params={{ kapittel: next.path }}
                  className="inline-flex items-center gap-2 text-sm text-primary sm:ml-auto"
                >
                  Neste: {next.title}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : (
                <Link
                  to="/geografi"
                  className="inline-flex items-center gap-2 text-sm text-primary sm:ml-auto"
                >
                  Til oversikten
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </nav>
          )}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
