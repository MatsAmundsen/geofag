import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeToggle } from "@/components/theme-toggle";
import type { GeografiKapittel } from "@/lib/geografi-kapitler";
import { GEOGRAFI_KAPITLER } from "@/lib/geografi-kapitler";
import { KILDER_GEOGRAFI } from "@/lib/kilder-geografi";
import { Kildeliste } from "@/components/kildeliste";
import { PosterBody } from "@/components/poster-body";
import { useEffect, useState } from "react";
import { getPost, type Post } from "@/lib/posts";

export function GeografiKapittelSide({ kapittel }: { kapittel: GeografiKapittel }) {
  const index = GEOGRAFI_KAPITLER.findIndex((k) => k.path === kapittel.path);
  const prev = index > 0 ? GEOGRAFI_KAPITLER[index - 1] : undefined;
  const next =
    index >= 0 && index < GEOGRAFI_KAPITLER.length - 1 ? GEOGRAFI_KAPITLER[index + 1] : undefined;
  const kilder = KILDER_GEOGRAFI[kapittel.slug] ?? [];

  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    let cancelled = false;
    void getPost({ data: kapittel.slug }).then((fresh) => {
      if (!cancelled) setPost(fresh);
    });
    return () => {
      cancelled = true;
    };
  }, [kapittel.slug]);

  return (
    <div className="kapittel-lys flex min-h-dvh flex-col">
      <a
        href="#innhold"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Hopp til innhold
      </a>
      <SiteHeader />
      <main id="innhold" className="flex-1">
        <header className="relative isolate min-h-[19.5rem] overflow-hidden">
          <img
            src={kapittel.image}
            alt={kapittel.alt}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/25 lys:via-background/94 lys:to-background/80" />
          <div className="relative mx-auto flex min-h-[19.5rem] max-w-4xl flex-col px-4 pb-12 pt-3 sm:px-6 sm:pt-4">
            <div className="flex shrink-0 justify-end">
              <ThemeToggle />
            </div>
            <div className="mt-auto pt-6">
              <p className="self-start rounded-md bg-background/85 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-primary lys:bg-background/95">
                Geografi · {kapittel.kicker}
              </p>
              <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
                {kapittel.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base text-foreground/90 sm:text-lg">
                {kapittel.blurb}
              </p>
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                {kapittel.maal.join(" · ")}
                {!kapittel.tekstKlar ? " · status: under arbeid" : ""}
              </p>
            </div>
          </div>
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

          {post?.bodyMarkdown ? (
            <section className="prose-geofag mt-10">
              <PosterBody>{post.bodyMarkdown}</PosterBody>
            </section>
          ) : null}

          {kilder.length > 0 ? (
            <section className="mt-10">
              <Kildeliste kilder={kilder} />
            </section>
          ) : null}

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
              <Link to="/geografi" className="inline-flex items-center gap-2 text-sm text-primary">
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
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
