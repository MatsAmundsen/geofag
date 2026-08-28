import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VideoPlaceholder } from "@/components/video-placeholder";
import { gf1Theme } from "@/lib/nav";

export const Route = createFileRoute("/geofag-1/$slug")({
  component: Gf1TemaPage,
});

function Gf1TemaPage() {
  const { slug } = Route.useParams();
  const tema = gf1Theme(slug);
  if (!tema) throw notFound();

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <header className="relative isolate min-h-72 overflow-hidden">
          <img src={tema.image} alt={tema.alt} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30" />
          <div className="relative mx-auto flex min-h-72 max-w-4xl flex-col justify-end px-4 py-12 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Geofag 1 · {tema.kicker}
            </p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              {tema.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/90 sm:text-lg">{tema.blurb}</p>
          </div>
        </header>
        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <VideoPlaceholder topic={tema.title} />
          <h2 className="font-display text-2xl font-medium tracking-tight">Kompetansemål dette treffer</h2>
          <p className="mt-3 text-foreground/95">{tema.maal}</p>
          <p className="mt-5 text-muted-foreground">
            Dette er et utkast. Forklaringer, figurer og oppgaver kommer — samme form som i Geofag 2.
            Vi skriver ikke innholdet ferdig før strukturen sitter.
          </p>
          <p className="mt-8">
            <Link
              to="/geofag-1"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Tilbake til Geofag 1
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
