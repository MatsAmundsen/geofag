import { ExamFigure } from "@/components/diagrams/exam-figures";
import type { Solution } from "@/lib/eksamen/solution-types";
import { cn } from "@/lib/utils";

export function SolutionView({
  solution,
  className,
}: {
  solution: Solution;
  className?: string;
}) {
  return (
    <div className={cn("space-y-5 text-sm leading-relaxed", className)}>
      <div className="rounded-xl border border-primary/30 bg-primary/8 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Fasit</p>
        <p className="mt-1 text-base font-medium text-foreground">{solution.fasit}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {solution.official
            ? "Nøkkelen er sjekket mot Udirs forhåndssensur eller sensorveiledning. Teksten er skrevet om."
            : "Udir har ikke lagt ut fasit for dette settet. Dette er vårt eget løsningsforslag."}
        </p>
      </div>

      <section>
        <h3 className="text-xs font-medium uppercase tracking-wider text-primary">
          Hvorfor dette er riktig
        </h3>
        <div className="mt-2 space-y-3 text-foreground/95">
          {solution.why.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
      </section>

      {solution.whyNot && solution.whyNot.length > 0 ? (
        <section>
          <h3 className="text-xs font-medium uppercase tracking-wider text-primary">
            Hvorfor de andre løsningene ikke er korrekt
          </h3>
          <ul className="mt-2 space-y-2">
            {solution.whyNot.map((item) => (
              <li key={item.option} className="rounded-lg border border-border bg-muted/50 px-3 py-2">
                <span className="font-medium text-foreground">{item.option}</span>
                <span className="text-muted-foreground"> — {item.text}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {solution.steps && solution.steps.length > 0 ? (
        <section>
          <h3 className="text-xs font-medium uppercase tracking-wider text-primary">
            Slik bygger du svaret
          </h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5">
            {solution.steps.map((step) => (
              <li key={step.slice(0, 48)}>{step}</li>
            ))}
          </ol>
        </section>
      ) : null}

      {solution.tip ? (
        <p className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-muted-foreground">
          {solution.tip}
        </p>
      ) : null}

      {solution.figures?.map((id) => (
        <ExamFigure key={id} id={id} />
      ))}
    </div>
  );
}
