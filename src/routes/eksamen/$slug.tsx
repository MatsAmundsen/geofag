import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { Callout } from "@/components/callout";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { examSet, solutionFor, taskHeading } from "@/lib/eksamen";
import { topicHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/eksamen/$slug")({
  head: ({ params }) => {
    const set = examSet(params.slug);
    return topicHead({
      title: set ? `${set.label} · Eksamen` : "Eksamen",
      description: set
        ? `Geofag 2 ${set.label}: oppgaver og egne løsningsforslag. Figurer hos Udir.`
        : "Eksamenssett for Geofag 2.",
      path: `/eksamen/${params.slug}`,
    });
  },
  component: ExamSetPage,
});

function ExamSetPage() {
  const { slug } = Route.useParams();
  const set = examSet(slug);
  if (!set) throw notFound();

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              <Link to="/eksamen" className="hover:underline">
                Eksamensoppgaver
              </Link>
              {" · "}
              REA3043
            </p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              {set.label}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              {set.themes.join(" · ")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href={set.officialUrl} target="_blank" rel="noreferrer">
                  Åpne hos Udir
                  <ExternalLink className="size-4" />
                </a>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/eksamen">Alle sett</Link>
              </Button>
            </div>
          </div>
        </header>

        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <Callout title="Figurer">
            <p>
              Hver figur i settet er hos Udir, bak passord fra skolen. Vi kopierer dem ikke. Åpne
              oppgaven i det offisielle settet når løsningsforslaget viser til kart, graf eller
              satellittbilde.
            </p>
          </Callout>

          {!set.complete ? (
            <Callout title="Ufullstendig sett">
              <p>
                Dette uttrekket dekker ikke alle sidene i Udirs spiller. Resten åpner du i lenken
                over.
              </p>
            </Callout>
          ) : null}

          <ol className="mt-10 space-y-8">
            {set.tasks.map((task) => (
              <TaskCard key={task.number} slug={set.slug} officialUrl={set.officialUrl} task={task} />
            ))}
          </ol>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function TaskCard({
  slug,
  officialUrl,
  task,
}: {
  slug: string;
  officialUrl: string;
  task: { number: number; title: string; kind: string; needsFigure: boolean; prompt: string };
}) {
  const [open, setOpen] = useState(false);
  const heading = taskHeading(task.prompt, task.title);
  const solution = solutionFor(slug, task.number);

  return (
    <li className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        Oppgave {task.number}
        {task.kind === "skrive" ? " · skrive" : " · interaktiv"}
        {task.needsFigure ? " · figur hos Udir" : ""}
      </p>
      <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">{heading}</h2>
      <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/95">
        {task.prompt}
      </pre>
      {task.needsFigure ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Figuren er ikke lagret her.{" "}
          <a
            href={officialUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            Åpne settet hos Udir
          </a>
          .
        </p>
      ) : null}
      <div className="mt-5">
        <Button type="button" variant="secondary" onClick={() => setOpen((v) => !v)}>
          {open ? "Skjul løsningsforslag" : "Vis løsningsforslag"}
        </Button>
        <div
          className={cn(
            "mt-4 rounded-xl border border-border bg-muted/60 px-4 py-3 text-sm leading-relaxed",
            !open && "hidden",
          )}
        >
          {solution ??
            "Løsningsforslag er ikke skrevet ennå. Bruk temasidene og det offisielle settet."}
        </div>
      </div>
    </li>
  );
}
