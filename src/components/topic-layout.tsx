import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Kildeliste } from "@/components/kildeliste";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Kilde } from "@/lib/kilder";

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
}: {
  kicker: string;
  title: string;
  lead: string;
  banner: string;
  bannerAlt: string;
  videoTopic?: string;
  children: ReactNode;
  kilder?: readonly Kilde[];
  prev?: { to: string; label: string; params?: Record<string, string> };
  next?: { to: string; label: string; params?: Record<string, string> };
}) {
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
            src={banner}
            alt={bannerAlt}
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
          </div>
        </header>

        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div className="space-y-5 text-base leading-relaxed text-foreground/95">{children}</div>

          {kilder ? <Kildeliste kilder={kilder} /> : null}

          <nav className="mt-14 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:justify-between">
            {prev ? (
              <Link
                to={prev.to}
                params={prev.params}
                className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
                {prev.label}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={next.to}
                params={next.params}
                className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground sm:ml-auto"
              >
                {next.label}
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
