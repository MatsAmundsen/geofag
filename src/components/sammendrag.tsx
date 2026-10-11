/**
 * «Sammendrag»-boksen i kapittelmalen: 4–6 punkter, hvert punkt én eller to hele setninger.
 * Overskriften «## Sammendrag» står i markdownen, slik at seksjonsnavigasjonen finner den.
 */
export function Sammendrag({ points }: { points: readonly string[] }) {
  return (
    <section className="my-6 rounded-xl border border-border bg-card p-5 sm:p-6">
      <ul className="list-disc space-y-2 pl-5">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}
