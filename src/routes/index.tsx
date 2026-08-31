import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    topicHead({
      title: "Geofag",
      description:
        "Geofag er et læringsnettsted for videregående: platetektonikk, vulkaner, skred og flom i Geofag 1, og vind, hav og klima i Geofag 2.",
      path: "/",
    }),
  component: Hub,
});

function Hub() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#fag"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Hopp til fagene
      </a>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative isolate">
          <h1 className="pointer-events-none absolute left-4 right-4 top-24 z-20 max-w-4xl font-display text-4xl font-medium tracking-tight [text-shadow:0_2px_28px_rgba(11,16,20,0.85)] sm:left-8 sm:top-28 sm:text-6xl lg:left-1/2 lg:right-auto lg:w-full lg:max-w-5xl lg:-translate-x-1/2 lg:text-center lg:text-7xl">
            Fra dypets ild
            <span className="block">til skyenes dans</span>
          </h1>

          <div id="fag" className="grid md:grid-cols-2">
            <article className="relative min-h-[100dvh]">
              <img
                src="/images/hero-volcano.jpg"
                alt="Vulkanutbrudd i mørket med glødende lava"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <video
                className="absolute inset-0 h-full w-full object-cover object-top motion-reduce:hidden"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/hero-volcano.jpg"
              >
                <source src="/videos/hero-volcano.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/55 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#4a1608]/80 via-lava/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <Link
                  to="/geofag-1"
                  className="group flex min-h-11 flex-col rounded-2xl border border-lava bg-lava/35 p-5 shadow-[0_16px_50px_-10px_color-mix(in_oklab,var(--color-lava)_70%,transparent)] backdrop-blur-md transition-colors hover:bg-lava/50 sm:p-6"
                >
                  <p className="text-xs uppercase tracking-wider text-lava">
                    Geosfære og hydrosfære
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">Geofag 1</h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/95">
                    Platene, vulkanene, skredene og flommene.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-lava">
                    Åpne Geofag 1
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </div>
            </article>

            <article className="relative min-h-[100dvh]">
              <img
                src="/images/hero-tornado.jpg"
                alt="Tornado over åpent sletteland"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <video
                className="absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/hero-tornado.jpg"
                aria-hidden="true"
              >
                <source src="/videos/hero-tornado.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/55 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background/75 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <Link
                  to="/geofag-2"
                  className="group flex min-h-11 flex-col rounded-2xl border border-border/80 bg-background/60 p-5 backdrop-blur-md transition-colors hover:border-primary/40 sm:p-6"
                >
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Atmosfære, hav og kryosfære
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">Geofag 2</h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    Trykk, vind, coriolis, hav, klima og værkatastrofer.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-primary">
                    Åpne Geofag 2
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
