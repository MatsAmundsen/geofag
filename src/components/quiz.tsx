import { useCallback, useId, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  explain: string;
};

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const baseId = useId();
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [revealed, setRevealed] = useState(false);
  const optionRefs = useRef(new Map<string, HTMLButtonElement>());

  const score = questions.reduce((n, q, i) => n + (picked[i] === q.answer ? 1 : 0), 0);

  const select = useCallback((qi: number, oi: number) => {
    setRevealed(false);
    setPicked((prev) => {
      const next = [...prev];
      next[qi] = oi;
      return next;
    });
  }, []);

  const moveFocus = useCallback(
    (qi: number, oi: number, delta: number, count: number) => {
      const target = (oi + delta + count) % count;
      select(qi, target);
      optionRefs.current.get(`${qi}-${target}`)?.focus();
    },
    [select],
  );

  return (
    <section className="my-10 rounded-xl border border-border bg-card p-5 sm:p-6">
      <h2 className="font-display text-2xl font-medium tracking-tight">Sjekk deg selv</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Velg ett svar per spørsmål. Dette er VG3-nivå med et par steg mot universitet.
      </p>

      <ol className="mt-6 space-y-8">
        {questions.map((q, qi) => {
          const promptId = `${baseId}-q${qi}-prompt`;
          const explainId = `${baseId}-q${qi}-explain`;
          // Roving tabindex: the group is one tab stop, landing on the chosen
          // option (or the first one when nothing is chosen yet).
          const rovingIndex = picked[qi] ?? 0;
          return (
            <li key={q.prompt}>
              <p id={promptId} className="font-medium leading-snug">
                {qi + 1}. {q.prompt}
              </p>
              <ul
                role="radiogroup"
                aria-labelledby={promptId}
                aria-describedby={revealed ? explainId : undefined}
                className="mt-3 space-y-2"
              >
                {q.options.map((opt, oi) => {
                  const selected = picked[qi] === oi;
                  const correct = revealed && oi === q.answer;
                  const wrong = revealed && selected && oi !== q.answer;
                  return (
                    <li key={opt}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        tabIndex={oi === rovingIndex ? 0 : -1}
                        ref={(el) => {
                          const key = `${qi}-${oi}`;
                          if (el) optionRefs.current.set(key, el);
                          else optionRefs.current.delete(key);
                        }}
                        onClick={() => select(qi, oi)}
                        onKeyDown={(event) => {
                          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                            event.preventDefault();
                            moveFocus(qi, oi, 1, q.options.length);
                          } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                            event.preventDefault();
                            moveFocus(qi, oi, -1, q.options.length);
                          }
                        }}
                        className={cn(
                          "flex w-full min-h-11 items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                          selected && !revealed && "border-primary bg-muted",
                          !selected && !revealed && "border-border hover:bg-muted/70",
                          correct && "border-primary bg-muted",
                          wrong && "border-destructive bg-destructive/10",
                          revealed && !correct && !wrong && "border-border opacity-70",
                        )}
                      >
                        <span className="flex-1">{opt}</span>
                        {correct ? (
                          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-primary">
                            <Check aria-hidden="true" className="size-4" />
                            riktig
                          </span>
                        ) : null}
                        {wrong ? (
                          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-destructive">
                            <X aria-hidden="true" className="size-4" />
                            feil
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
              {revealed ? (
                <p id={explainId} className="mt-3 text-sm text-muted-foreground">
                  {q.explain}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="button" onClick={() => setRevealed(true)}>
          Vis fasit
        </Button>
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground tabular-nums">
          {revealed ? `${score} av ${questions.length} riktige` : null}
        </p>
      </div>
    </section>
  );
}
