import { type ReactNode, useEffect, useState } from "react";
import { Link, useMatches, useRouter, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { AdminEditLink } from "@/components/admin-edit-link";
import { Callout } from "@/components/callout";
import { ChapterScanBody } from "@/components/chapter-scan-body";
import { GeminiFigure } from "@/components/gemini-figure";
import { Kildeliste } from "@/components/kildeliste";
import { PosterBody } from "@/components/poster-body";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { posterSlugForPath } from "@/lib/chapter-posts";
import {
  bannerForPath,
  eierskapForPath,
  figuresForPath,
  navForTopicPath,
} from "@/lib/gemini-by-path";
import type { Kilde } from "@/lib/kilder";
import { posterNeedsRefresh } from "@/lib/poster-fresh";
import { getPost, type Post } from "@/lib/posts";

type TopicLink = { to: string; label: string; params?: Record<string, string> };

export function TopicLayout({
  kicker,
  title,
  lead,
  banner,
  bannerAlt,
  videoTopic: _videoTopic,
  children,
  kilder,
  prev,
  next,
  posterSlug,
  post: propPost,
  bodyMode = "auto",
  previewBanner,
}: {
  kicker: string;
  title: string;
  lead: string;
  banner: string;
  bannerAlt: string;
  videoTopic?: string;
  children: ReactNode;
  kilder?: readonly Kilde[];
  prev?: TopicLink;
  next?: TopicLink;
  /** When set, shows a Poster button that opens the editable CMS post. */
  posterSlug?: string;
  /** Preloaded post from route loader (if available) */
  post?: Post | null;
  /** auto = existing CMS override. scan = same text in collapsible sections. */
  bodyMode?: "auto" | "coded" | "poster" | "scan";
  previewBanner?: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const router = useRouter();
  const matches = useMatches();

  const override = bannerForPath(pathname);
  const slots = figuresForPath(pathname);
  const src = override?.src ?? banner;
  const alt = override?.alt ?? bannerAlt;
  const navOver = navForTopicPath(pathname);
  const prevLink: TopicLink | undefined = navOver?.prev ?? prev;
  const nextLink: TopicLink | undefined = navOver?.next ?? next;
  const eierskap = eierskapForPath(pathname);

  const resolvedSlug = posterSlug ?? posterSlugForPath(pathname);

  const matchPost = matches
    .map((m) => (m.loaderData as { post?: Post | null } | undefined)?.post)
    .filter((p): p is Post => Boolean(p))
    .at(-1);

  const initialPost = propPost !== undefined ? propPost : (matchPost ?? null);
  const [currentPost, setCurrentPost] = useState<Post | null>(initialPost);

  useEffect(() => {
    if (propPost !== undefined) {
      setCurrentPost(propPost);
    }
  }, [propPost]);

  useEffect(() => {
    if (!resolvedSlug) return;
    let cancelled = false;
    const displayed = {
      bodyMarkdown: currentPost?.bodyMarkdown ?? "",
      updatedAt: currentPost?.updatedAt ?? "",
    };
    void getPost({ data: resolvedSlug })
      .then((fresh) => {
        if (cancelled || !fresh) return;
        if (posterNeedsRefresh(displayed, fresh)) {
          setCurrentPost(fresh);
          void router.invalidate();
        } else if (!currentPost && fresh) {
          setCurrentPost(fresh);
        }
      })
      .catch((err) => {
        console.error("[topic-layout] failed to check fresh post", err);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedSlug, currentPost?.bodyMarkdown, currentPost?.updatedAt, router]);

  const hasEdits = Boolean(
    currentPost?.bodyMarkdown &&
      (Boolean(currentPost.updatedAt) || resolvedSlug === "platetektonikk"),
  );
  const markdown = currentPost?.bodyMarkdown ?? "";
  const useScan = bodyMode === "scan" && Boolean(markdown);
  const usePoster =
    bodyMode === "poster" || (bodyMode === "auto" && hasEdits && Boolean(markdown));
  const useCoded = bodyMode === "coded" || (!useScan && !usePoster);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#innhold"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Hopp til innhold
      </a>
      <SiteHeader />
      <main id="innhold" className="flex-1">
        <header className="relative isolate min-h-72 overflow-hidden">
          <img
            src={src}
            alt={alt}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/25" />
          <div className="relative mx-auto flex min-h-72 max-w-4xl flex-col justify-end px-4 py-12 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">{kicker}</p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/90 sm:text-lg">{lead}</p>
            {resolvedSlug ? (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="shadow-lg">
                  <Link to="/poster/$slug" params={{ slug: resolvedSlug }}>
                    <FileText className="size-4" aria-hidden="true" />
                    Poster
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
        </header>

        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div className="space-y-5 text-base leading-relaxed text-foreground/95">
            {resolvedSlug ? <AdminEditLink slug={resolvedSlug} /> : null}
            {eierskap ? (
              <Callout title="Eierskap">
                <p>{eierskap}</p>
              </Callout>
            ) : null}
            {previewBanner}
            {useScan ? (
              <ChapterScanBody markdown={markdown} />
            ) : usePoster ? (
              <PosterBody cleanChapter>{markdown}</PosterBody>
            ) : useCoded ? (
              children
            ) : (
              children
            )}
          </div>

          {slots.length > 0 ? (
            <section className="mt-12" aria-label="Læringsfigurer">
              <h2 className="font-display text-2xl font-medium tracking-tight">Læringsfigurer</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Felt reservert til figur. Les bildeteksten — den er pensum selv før bildet er fylt.
              </p>
              {slots.map((slot) => (
                <GeminiFigure key={slot.id} {...slot} />
              ))}
            </section>
          ) : null}

          {kilder ? <Kildeliste kilder={kilder} /> : null}

          <nav className="mt-14 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:justify-between">
            {prevLink ? (
              <Link
                to={prevLink.to}
                params={prevLink.params}
                className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
                {prevLink.label}
              </Link>
            ) : (
              <span />
            )}
            {nextLink ? (
              <Link
                to={nextLink.to}
                params={nextLink.params}
                className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground sm:ml-auto"
              >
                {nextLink.label}
                <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </nav>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
