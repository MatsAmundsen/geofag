import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  explain: string;
};

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [revealed, setRevealed] = useState(false);

  const score = questions.reduce((n, q, i) => n + (picked[i] === q.answer ? 1 : 0), 0);

  return (
    <section className="my-10 rounded-xl border border-border bg-card p-5 sm:p-6">
      <h2 className="font-display text-2xl font-medium tracking-tight">Sjekk deg selv</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Velg ett svar per spørsmål. Dette er VG3-nivå med et par steg mot universitet.
      </p>

      <ol className="mt-6 space-y-8">
        {questions.map((q, qi) => (
          <li key={q.prompt}>
            <p className="font-medium leading-snug">
              {qi + 1}. {q.prompt}
            </p>
            <ul className="mt-3 space-y-2">
              {q.options.map((opt, oi) => {
                const selected = picked[qi] === oi;
                const correct = revealed && oi === q.answer;
                const wrong = revealed && selected && oi !== q.answer;
                return (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => {
                        setRevealed(false);
                        setPicked((prev) => {
                          const next = [...prev];
                          next[qi] = oi;
                          return next;
                        });
                      }}
                      className={cn(
                        "flex w-full min-h-11 items-start rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                        selected && !revealed && "border-primary bg-muted",
                        !selected && !revealed && "border-border hover:bg-muted/70",
                        correct && "border-primary bg-muted",
                        wrong && "border-destructive bg-destructive/10",
                        revealed && !correct && !wrong && "border-border opacity-70",
                      )}
                    >
                      {opt}
                    </button>
                  </li>
                );
              })}
            </ul>
            {revealed ? (
              <p className="mt-3 text-sm text-muted-foreground">{q.explain}</p>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="button" onClick={() => setRevealed(true)}>
          Vis fasit
        </Button>
        {revealed ? (
          <p className="text-sm text-muted-foreground tabular-nums">
            {score} av {questions.length} riktige
          </p>
        ) : null}
      </div>
    </section>
  );
}
