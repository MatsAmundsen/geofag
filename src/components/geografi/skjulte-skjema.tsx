import { useId } from "react";
export function Skjema({
  heading,
  caption,
  ledd,
}: {
  heading: string;
  caption: string;
  ledd: readonly (readonly [string, string])[];
}) {
  const id = useId();
  return (
    <figure aria-labelledby={id} className="my-8 rounded-xl border bg-card p-5">
      <h3 id={id} className="mb-4 text-xl font-semibold">
        {heading}
      </h3>
      <ol className="grid gap-3 sm:grid-cols-2">
        {ledd.map(([navn, tekst]) => (
          <li key={navn} className="rounded-lg border-l-4 border-teal-600 bg-muted p-4">
            <strong>{navn}</strong>
            <p>{tekst}</p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
