import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useMatches, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { AdminEditLink } from "@/components/admin-edit-link";
import { Callout } from "@/components/callout";
import { ChapterScanBody } from "@/components/chapter-scan-body";
import { GeminiFigure } from "@/components/gemini-figure";
import { Kildeliste } from "@/components/kildeliste";
import { PosterBody } from "@/components/poster-body";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SokHopp } from "@/components/sok/sok-hopp";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { posterSlugForPath } from "@/lib/chapter-posts";
import {
  bannerForPath,
  eierskapForPath,
  figuresForPath,
  navForTopicPath,
} from "@/lib/gemini-by-path";
import type { Kilde } from "@/lib/kilder";
import { posterHeadingAnchorsEnabled } from "@/lib/poster-heading";
import { posterPlaceholderText } from "@/lib/poster-placeholder";
import { posterNeedsRefresh } from "@/lib/poster-fresh";
import { getPost, type Post } from "@/lib/posts";

type TopicLink = { to: string; label: string; params?: Record<string, string> };

/**
 * G2-kapitler som fortsatt viser kodet TSX-tekst (klimakapitlene). De andre
 * G2-kapitlene viser md-teksten (Geo F2, 11.10.2026). Plakaten på
 * /poster/<slug> viser fortsatt den nye md-teksten, så Poster-knappen og
 * admin-lenken skjules her for å unngå to ulike versjoner av samme kapittel.
 * Kodede G1-sider og hoytrykk-lavtrykk beholder knappen.
 */
const CODED_G2_PATHS = new Set([
  "/tema/klima/nao",
]);

/** Kjører mens HTML-en parses, før første maling, så ankerhoppet ikke blir et layout-skift. */
const ANKER_FOR_MALING = `(function(){
  var map={
    "tsunami-skjelv-eller-skred":"hva-er-en-tsunami",
    "hvilke-skader-gjoer-jordskjelv":"jordskjelv-som-naturfare",
    "hva-avgjoer-hvor-store-skadene-blir":"jordskjelv-som-naturfare",
    "rystelser-og-bygninger":"jordskjelv-som-naturfare",
    "skred-og-likvefaksjon":"jordskjelv-som-naturfare",
    "brann-tsunami-og-etterskjelv":"jordskjelv-som-naturfare",
    "er-det-mulig-a-varsle-jordskjelv":"kan-jordskjelv-varsles",
    "langtidsvarsling":"kan-jordskjelv-varsles",
    "korttidsvarsling":"kan-jordskjelv-varsles",
    "tidlig-varsling-noen-sekunder-kan-redde-liv":"kan-jordskjelv-varsles",
    "tsunamivarsling":"hvordan-varsles-en-tsunami",
    "fare-og-risiko":"fare-risiko-og-forebygging",
    "en-enkel-risikomodell":"fare-risiko-og-forebygging",
    "gjentaksintervall-hvor-ofte-kommer-et-stort-skjelv":"fare-risiko-og-forebygging",
    "hva-om-1904-skjelvet-kom-i-dag":"fare-risiko-og-forebygging",
    "hva-modellen-ikke-viser":"fare-risiko-og-forebygging"
  };
  var raw=location.hash.replace(/^#/,"");
  if(!raw)return;
  try{raw=decodeURIComponent(raw);}catch(e){return;}
  var el=document.getElementById(map[raw]||raw);
  if(el)el.scrollIntoView({block:"start"});
})();`;

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
  bodyMode = "coded",
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
  /** auto = existing CMS override. scan = same text behind horizontal topic chips. */
  bodyMode?: "auto" | "coded" | "poster" | "scan";
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const matches = useMatches();

  const override = bannerForPath(pathname);
  const slots = figuresForPath(pathname);
  const src = override?.src ?? banner;
  const alt = override?.alt ?? bannerAlt;
  const navOver = navForTopicPath(pathname);
  const prevLink: TopicLink | undefined = navOver?.prev ?? prev;
  const nextLink: TopicLink | undefined = navOver?.next ?? next;
  const eierskap = eierskapForPath(pathname);
  const isGeofag1 = pathname.replace(/\/$/, "").startsWith("/geofag-1");
  const showEierskap = Boolean(eierskap) && !isGeofag1;

  const resolvedSlug = posterSlug ?? posterSlugForPath(pathname);
  const isCodedG2 = bodyMode === "coded" && CODED_G2_PATHS.has(pathname.replace(/\/$/, "") || "/");
  const showPosterLink = Boolean(resolvedSlug) && !isCodedG2;

  const matchPost = matches
    .map((m) => (m.loaderData as { post?: Post | null } | undefined)?.post)
    .filter((p): p is Post => Boolean(p))
    .at(-1);

  const initialPost = propPost !== undefined ? propPost : (matchPost ?? null);
  const [currentPost, setCurrentPost] = useState<Post | null>(initialPost);
  const [posterStatus, setPosterStatus] = useState<"ready" | "loading" | "error">(
    initialPost?.bodyMarkdown ? "ready" : "loading",
  );

  useEffect(() => {
    if (propPost !== undefined) {
      setCurrentPost(propPost);
      setPosterStatus(propPost?.bodyMarkdown ? "ready" : "loading");
    }
  }, [propPost]);

  useEffect(() => {
    if (bodyMode === "coded" || !resolvedSlug) return;
    let cancelled = false;
    const displayed = {
      bodyMarkdown: currentPost?.bodyMarkdown ?? "",
      updatedAt: currentPost?.updatedAt ?? "",
    };
    if (!displayed.bodyMarkdown) setPosterStatus("loading");
    void getPost({ data: resolvedSlug })
      .then((fresh) => {
        if (cancelled) return;
        if (!fresh) {
          if (!displayed.bodyMarkdown) setPosterStatus("error");
          return;
        }
        if (!currentPost || posterNeedsRefresh(displayed, fresh)) {
          setCurrentPost(fresh);
        }
        setPosterStatus("ready");
      })
      .catch((err) => {
        console.error("[topic-layout] failed to check fresh post", err);
        if (!cancelled && !displayed.bodyMarkdown) setPosterStatus("error");
      });

    return () => {
      cancelled = true;
    };
    // The fetch runs once per chapter. A later edit shows up on the next visit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedSlug, bodyMode]);

  const markdown = currentPost?.bodyMarkdown ?? "";
  const useScan = bodyMode === "scan" && Boolean(markdown);
  const usePoster = bodyMode === "poster";
  const useCoded = bodyMode === "coded" || (!useScan && !usePoster);

  const brukerStyrer = useRef(false);

  useLayoutEffect(() => {
    if (!usePoster) return;
    let cancelled = false;
    const scroll = () => {
      if (cancelled || brukerStyrer.current) return;
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw) return;
      let id = raw;
      try {
        id = decodeURIComponent(raw);
      } catch {
        return;
      }
      const el = document.getElementById(id);
      if (!el) return;
      const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      if (Math.abs(el.getBoundingClientRect().top - pad) <= 2) return;
      el.scrollIntoView({ block: "start" });
    };
    const arm = () => {
      if (brukerStyrer.current) return;
      scroll();
    };
    const giOpp = () => {
      brukerStyrer.current = true;
    };
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", " ", "Home", "End"].includes(event.key)) giOpp();
    };
    const onHash = () => {
      brukerStyrer.current = false;
      arm();
    };
    arm();
    window.addEventListener("wheel", giOpp, { passive: true });
    window.addEventListener("touchstart", giOpp, { passive: true });
    window.addEventListener("touchmove", giOpp, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", giOpp);
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelled = true;
      window.removeEventListener("wheel", giOpp);
      window.removeEventListener("touchstart", giOpp);
      window.removeEventListener("touchmove", giOpp);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", giOpp);
      window.removeEventListener("hashchange", onHash);
    };
  }, [usePoster, markdown]);

  return (
    <div className="kapittel-lys flex min-h-dvh flex-col">
      <a
        href="#innhold"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Hopp til innhold
      </a>
      <SiteHeader />
      {resolvedSlug && bodyMode !== "coded" ? <SokHopp slug={resolvedSlug} /> : null}
      <main id="innhold" className="flex-1">
        <header className="relative isolate min-h-[19.5rem] overflow-hidden">
          <img
            src={src}
            alt={alt}
            fetchPriority="high"
            className={`absolute inset-0 h-full w-full object-cover ${src.includes("banner-naturlige-padriv") ? "object-[0%_25%] md:object-[0%_30%]" : ""}`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-background ${src.includes("banner-naturlige-padriv") ? "via-background/80 via-60% to-background/20 lys:via-background/94 lys:to-background/70" : "via-background/75 to-background/25 lys:via-background/94 lys:to-background/80"}`} />
          <div className="relative mx-auto flex min-h-[19.5rem] max-w-4xl flex-col px-4 pb-12 pt-3 sm:px-6 sm:pt-4">
            <div className="flex shrink-0 justify-end">
              <ThemeToggle />
            </div>
            <div className="mt-auto pt-6">
            <p className="self-start rounded-md bg-background/85 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-[#9ecccf] lys:bg-background/95 lys:text-[color-mix(in_oklab,var(--color-primary),black_25%)]">{kicker}</p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/90 sm:text-lg">{lead}</p>
                        {showPosterLink && resolvedSlug ? (
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
          </div>
        </header>

        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div className="space-y-5 text-base leading-relaxed text-foreground/95">
            {showPosterLink && resolvedSlug ? <AdminEditLink slug={resolvedSlug} /> : null}
            {showEierskap ? (
              <Callout title="Eierskap">
                <p>{eierskap}</p>
              </Callout>
            ) : null}
            {useScan ? (
              <ChapterScanBody markdown={markdown} />
            ) : usePoster && !markdown ? (
              <div className="min-h-[52rem]" aria-busy="true">
                <p className="text-sm text-muted-foreground" role="status">
                  {posterPlaceholderText(posterStatus)}
                </p>
              </div>
            ) : usePoster ? (
              <>
              <PosterBody
                cleanChapter
                scrollTables={
                  resolvedSlug === "jetstrommer" ||
                  resolvedSlug === "skyer-nedbor-klimasoner" ||
                  resolvedSlug === "naturlige-klimapadriv" ||
                  resolvedSlug === "lokale-vaersystemer" ||
                  resolvedSlug === "vulkaner" ||
                  resolvedSlug === "hoytrykk-lavtrykk" ||
                  resolvedSlug === "jordskjelv" ||
                  resolvedSlug === "jordskjelv-naturfare" ||
                  resolvedSlug === "jordsystemene" ||
                  resolvedSlug === "isbreer-og-landformer" ||
                  resolvedSlug === "vaerkart" ||
                  resolvedSlug === "vindsystemet"
                }
                wrapTables={
                  resolvedSlug === "skred" ||
                  resolvedSlug === "geologiske-ressurser" ||
                  resolvedSlug === "feltarbeid"
                }
                headingAnchors={posterHeadingAnchorsEnabled(resolvedSlug)}
              >
                {markdown}
              </PosterBody>
              <script dangerouslySetInnerHTML={{ __html: ANKER_FOR_MALING }} />
              </>
            ) : useCoded ? (
              children
            ) : (
              children
            )}
          </div>

          {slots.length > 0 ? (
            <section className="mt-12" aria-label="Læringsfigurer">
              <h2 className="font-display text-2xl font-medium tracking-tight">Læringsfigurer</h2>
              {isGeofag1 ? null : (
                <p className="mt-2 text-sm text-muted-foreground">
                  Felt reservert til figur. Les bildeteksten — den er pensum selv før bildet er fylt.
                </p>
              )}
              {slots.map((slot) => (
                <GeminiFigure key={slot.id} {...slot} neutral={isGeofag1} />
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
