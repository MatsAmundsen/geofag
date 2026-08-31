import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { Callout } from "@/components/callout";
import { SolutionView } from "@/components/exam/solution-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { displayPrompt, examSet, solutionFor, taskHeading } from "@/lib/eksamen";
import type { ExamTask, Solution } from "@/lib/eksamen";
import { topicHead } from "@/lib/seo";

type View = "oppgaver" | "losningsforslag";

type ExamSearch = {
  vis?: View;
};

export const Route = createFileRoute("/eksamen/$slug")({
  validateSearch: (search: Record<string, unknown>): ExamSearch => ({
    vis: search.vis === "losningsforslag" ? "losningsforslag" : undefined,
  }),
  head: ({ params }) => {
    const set = examSet(params.slug);
    return topicHead({
      title: set ? `${set.label} · Eksamen` : "Eksamen",
      description: set
        ? `Geofag 2 ${set.label}: oppgaver og løsningsforslag med figurer. Udirs figurer åpnes hos Udir.`
        : "Eksamenssett for Geofag 2.",
      path: `/eksamen/${params.slug}`,
    });
  },
  component: ExamSetPage,
});

function ExamSetPage() {
  const { slug } = Route.useParams();
  const { vis } = Route.useSearch();
  const navigate = Route.useNavigate();
  const set = examSet(slug);
  if (!set) throw notFound();
  const view: View = vis === "losningsforslag" ? "losningsforslag" : "oppgaver";

  function setView(next: View) {
    void navigate({
      search: { vis: next === "losningsforslag" ? "losningsforslag" : undefined },
      replace: true,
    });
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              <Link to="/eksamen" className="hover:underline">
                Eksamen
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
            <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Visning">
              <Button
                type="button"
                variant={view === "oppgaver" ? "default" : "secondary"}
                onClick={() => setView("oppgaver")}
                aria-pressed={view === "oppgaver"}
              >
                Oppgaver
              </Button>
              <Button
                type="button"
                variant={view === "losningsforslag" ? "default" : "secondary"}
                onClick={() => setView("losningsforslag")}
                aria-pressed={view === "losningsforslag"}
              >
                Løsningsforslag
              </Button>
            </div>
          </div>
        </header>

        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <Callout title="Figurer og fasit">
            <p>
              Udirs kart, satellittbilder og grafer åpner du i det offisielle settet — bak passord
              fra skolen. Vi kopierer dem ikke. Figurene under løsningsforslagene er våre egne
              pedagogiske tegninger.
            </p>
            <p>
              {set.fasitSource === "udir"
                ? "Interaktive nøkler og skrivepunkter er sjekket mot Udirs forhåndssensur og sensorveiledning. Teksten er omskrevet — last ned originalen hos Udir hvis du skal sensurere."
                : "Udir har ikke lagt ut sensorveiledning for dette settet. Løsningsforslagene er våre egne."}
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

          {view === "oppgaver" ? (
            <ol className="mt-10 space-y-8">
              {set.tasks.map((task) => (
                <TaskCard
                  key={task.number}
                  slug={set.slug}
                  officialUrl={set.officialUrl}
                  task={task}
                />
              ))}
            </ol>
          ) : (
            <section className="mt-10">
              <h2 className="font-display text-3xl font-medium tracking-tight">Løsningsforslag</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Hver oppgave vises med spørsmålet først, deretter fasit, forklaring og figurer.
              </p>
              <ol className="mt-8 space-y-10">
                {set.tasks.map((task) => (
                  <SolutionCard
                    key={task.number}
                    slug={set.slug}
                    officialUrl={set.officialUrl}
                    task={task}
                  />
                ))}
              </ol>
            </section>
          )}
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
  task: ExamTask;
}) {
  const [open, setOpen] = useState(false);
  const heading = taskHeading(task.prompt, task.title);
  const solution = solutionFor(slug, task.number);

  return (
    <li className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <TaskMeta task={task} heading={heading} />
      <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/95">
        {displayPrompt(task.prompt)}
      </pre>
      <FigureHint needsFigure={task.needsFigure} officialUrl={officialUrl} />
      <div className="mt-5">
        <Button type="button" variant="secondary" onClick={() => setOpen((v) => !v)}>
          {open ? "Skjul løsningsforslag" : "Vis løsningsforslag"}
        </Button>
        {open ? <SolutionBlock solution={solution} /> : null}
      </div>
    </li>
  );
}

function SolutionCard({
  slug,
  officialUrl,
  task,
}: {
  slug: string;
  officialUrl: string;
  task: ExamTask;
}) {
  const heading = taskHeading(task.prompt, task.title);
  const solution = solutionFor(slug, task.number);

  return (
    <li className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <TaskMeta task={task} heading={heading} />
      <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/95">
        {displayPrompt(task.prompt)}
      </pre>
      <FigureHint needsFigure={task.needsFigure} officialUrl={officialUrl} />
      <SolutionBlock solution={solution} />
    </li>
  );
}

function TaskMeta({ task, heading }: { task: ExamTask; heading: string }) {
  return (
    <>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        Oppgave {task.number}
        {task.kind === "skrive" ? " · skrive" : " · interaktiv"}
        {task.needsFigure ? " · figur hos Udir" : ""}
      </p>
      <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">{heading}</h2>
    </>
  );
}

function FigureHint({ needsFigure, officialUrl }: { needsFigure: boolean; officialUrl: string }) {
  if (!needsFigure) return null;
  return (
    <p className="mt-3 text-sm text-muted-foreground">
      Udirs figur er ikke lagret her.{" "}
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
  );
}

function SolutionBlock({ solution }: { solution: Solution | undefined }) {
  return (
    <div className="mt-4">
      {solution ? (
        <SolutionView solution={solution} />
      ) : (
        <p className="rounded-xl border border-border bg-muted/60 px-4 py-3 text-sm">
          Løsningsforslag er ikke skrevet ennå. Bruk temasidene og det offisielle settet.
        </p>
      )}
    </div>
  );
}
