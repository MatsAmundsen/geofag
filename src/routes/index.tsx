import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { topicHead } from "@/lib/seo";

// Kolonnen er stående og fyller minst hele skjermhøyden, så object-cover styres av høyden:
// nødvendig bildebredde er max(kolonnebredde, ca. 1008/1792 av høyden). 55,5vh (ikke 56,25) lar
// 1008w holde opp til ca. 908 px høyde med skala ≤1,02.
const HERO_SIZES = "(min-width: 768px) max(33.34vw, 55.5vh), max(100vw, 55.5vh)";

// Felles minstehøyde gir like høye kort i alle tre heltene (QC PR #312).
const HERO_KORT_HOYDE = "min-h-[11.5rem] md:min-h-[15rem] lg:min-h-[12rem]";

// Kortet ligger i flyt nederst i kolonnen. Toppfeltet holder av plass til H1 (topp + inntil fire
// linjer, i rem), så kortene ikke legger seg over H1 ved 200 % tekst; kolonnen vokser i stedet.
const HERO_KORT_PLASS =
  "relative px-4 pb-20 pt-[19rem] sm:px-6 sm:pb-[5.5rem] sm:pt-[23rem] lg:pt-[26rem] [overflow-wrap:anywhere]";

/** Velg AVIF-poster i samme størrelse som <picture> (HERO_SIZES, 768/1008/1512). */
function velgJordposter(): string {
  const css =
    window.innerWidth >= 768
      ? Math.max(0.3334 * window.innerWidth, 0.555 * window.innerHeight)
      : Math.max(window.innerWidth, 0.555 * window.innerHeight);
  const px = css * (window.devicePixelRatio || 1);
  const n = px <= 768 ? 768 : px <= 1008 ? 1008 : 1512;
  return `/images/hero-earth-staaende-${n}.avif`;
}

/**
 * Geografi-heltens video lastes først når kolonnen nærmer seg skjermen, og aldri ved redusert
 * bevegelse. Ellers er oppsettet som G1/G2 (autoplay, muted, loop, playsInline, poster).
 * Til den er lastet viser stillbildet under seg.
 */
function LatHeltevideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string | (() => string);
  className: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [aktiv, setAktiv] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v || aktiv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) {
      setAktiv(true);
      return;
    }
    const io = new IntersectionObserver(
      (e) => {
        if (e.some((x) => x.isIntersecting)) {
          setAktiv(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [aktiv]);
  useEffect(() => {
    const v = ref.current;
    if (!v || !aktiv) return;
    v.muted = true;
    v.load();
    void v.play().catch(() => {});
  }, [aktiv]);
  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload={aktiv ? "metadata" : "none"}
      poster={aktiv ? (typeof poster === "function" ? poster() : poster) : undefined}
      aria-hidden="true"
    >
      {aktiv ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}

export const Route = createFileRoute("/")({
  head: () =>
    topicHead({
      title: "Geofag",
      description:
        "Geofag er et læringsnettsted for videregående: Geofag 1, Geofag 2 og Geografi (GEO01-02).",
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
          <h1 className="pointer-events-none absolute left-4 right-4 top-24 z-20 max-w-4xl text-center font-display text-4xl font-medium tracking-tight text-white [text-shadow:0_2px_28px_rgba(11,16,20,0.85)] sm:left-8 sm:top-28 sm:text-6xl lg:left-1/2 lg:right-auto lg:w-full lg:max-w-5xl lg:-translate-x-1/2 lg:text-7xl">
            Fra jordens indre
            <span className="block">til atmosfæren</span>
          </h1>

          <div id="fag" className="grid md:grid-cols-3">
            <article className="relative flex min-h-[100dvh] flex-col justify-end">
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
                aria-hidden="true"
              >
                <source src="/videos/hero-volcano.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/55 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#4a1608]/80 via-lava/25 to-transparent" />
              {/* Headeren tar 4rem over 100dvh-feltet, så kortet må løftes for å bli helt synlig. */}
              <div className={HERO_KORT_PLASS}>
                <Link
                  to="/geofag-1"
                  className={`flex ${HERO_KORT_HOYDE} flex-col rounded-2xl border border-lava bg-[#3a140c]/80 p-5 shadow-[0_16px_50px_-10px_color-mix(in_oklab,var(--color-lava)_70%,transparent)] backdrop-blur-md transition-colors hover:bg-[#3a140c]/90 sm:p-6`}
                >
                  <p className="text-xs uppercase tracking-wider text-[#f3d2b0]">
                    Geosfære og hydrosfære
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">Geofag 1</h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/95">
                    Platetektonikk, vulkanisme, skred og flom.
                  </p>
                </Link>
              </div>
            </article>

            <article className="relative flex min-h-[100dvh] flex-col justify-end">
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
              <div className={HERO_KORT_PLASS}>
                <Link
                  to="/geofag-2"
                  className={`flex ${HERO_KORT_HOYDE} flex-col rounded-2xl border border-border/80 bg-background/80 p-5 backdrop-blur-md transition-colors hover:border-primary/40 sm:p-6`}
                >
                  <p className="text-xs uppercase tracking-wider text-[#c5d0d8]">
                    Atmosfære, hav og kryosfære
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">Geofag 2</h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    Atmosfærisk sirkulasjon, Coriolis-effekten, havstrømmer, klima og ekstremvær.
                  </p>
                </Link>
              </div>
            </article>

            <article className="relative flex min-h-[100dvh] flex-col justify-end">
              {/* NASA, ikke opphavsrettsbeskyttet. Stillbilde/poster: stående utsnitt av ISS066-E-9147. Video: tidsforløp av ISS066-E-9137–9246 (22.10.2021, natt over Stillehavet). Image courtesy of the Earth Science and Remote Sensing Unit, NASA Johnson Space Center, eol.jsc.nasa.gov. Kilde og bearbeiding: docs/forside-helter-kilder.json. */}
              <picture>
                <source
                  type="image/avif"
                  srcSet="/images/hero-earth-staaende-768.avif 768w, /images/hero-earth-staaende-1008.avif 1008w, /images/hero-earth-staaende-1512.avif 1512w"
                  sizes={HERO_SIZES}
                />
                <source
                  type="image/webp"
                  srcSet="/images/hero-earth-staaende-768.webp 768w, /images/hero-earth-staaende-1008.webp 1008w, /images/hero-earth-staaende-1512.webp 1512w"
                  sizes={HERO_SIZES}
                />
                <img
                  src="/images/hero-earth-staaende-1008.jpg"
                  srcSet="/images/hero-earth-staaende-768.jpg 768w, /images/hero-earth-staaende-1008.jpg 1008w"
                  sizes={HERO_SIZES}
                  alt="Jorda om natten sett fra romstasjonen ISS: stjerner, et tynt oransje lysbånd langs horisonten og skyer over havet"
                  width={1008}
                  height={1792}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </picture>
              <LatHeltevideo
                src="/videos/hero-earth-iss.mp4"
                poster={velgJordposter}
                className="absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/55 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background/75 to-transparent" />
              <div className={HERO_KORT_PLASS}>
                {/* Kreditering rett over kortet, så den er synlig sammen med kortet også på mobil (sticky header dekker kolonnetoppen). */}
                <p data-kreditering className="mb-2 ml-auto w-fit rounded-md bg-background/95 px-2 py-1 text-xs text-[#d5dde3]">
                  Foto/video: NASA (ISS)
                </p>
                <Link
                  to="/geografi"
                  className={`flex ${HERO_KORT_HOYDE} flex-col rounded-2xl border border-border/80 bg-background/80 p-5 backdrop-blur-md transition-colors hover:border-primary/40 sm:p-6`}
                >
                  <p className="text-xs uppercase tracking-wider text-[#c5d0d8]">GEO01-02 · Vg1</p>
                  <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">Geografi</h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    Geografiske verktøy, feltarbeid, landskap, klima, naturfare, ressurser, bærekraft,
                    næring, befolkning og migrasjon.
                  </p>
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <Link
              to="/geografi"
              className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-wider text-primary">GEO01-02 · Vg1</p>
                <h2 className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                  Geografi
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Sted, landskap og samfunn. Elleve kapitler under arbeid: verktøy, feltarbeid,
                  naturfare, bærekraft og mer.
                </p>
              </div>
              <span className="text-sm font-medium text-primary">Åpne Geografi</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
