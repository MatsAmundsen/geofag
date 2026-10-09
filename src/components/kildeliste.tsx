import type { Kilde } from "@/lib/kilder";

export function Kildeliste({ kilder }: { kilder: readonly Kilde[] }) {
  if (kilder.length === 0) return null;

  const sorted = [...kilder].sort((a, b) =>
    a.prefix.localeCompare(b.prefix, "nb", { sensitivity: "base" }),
  );

  return (
    <section className="mt-14 border-t border-border pt-8" aria-labelledby="kildeliste-heading">
      <h2 id="kildeliste-heading" className="font-display text-2xl font-medium tracking-tight">
        Kildeliste
      </h2>
      <ol className="mt-5 list-none space-y-3 text-sm leading-relaxed text-foreground/90">
        {sorted.map((kilde) => (
          <li key={`${kilde.prefix}${kilde.italic}`} className="pl-8 -indent-8">
            {kilde.prefix}
            <span className="italic">{kilde.italic}</span>
            {kilde.suffix}
            {kilde.href ? (
              <>
                {" "}
                <a
                  href={kilde.href}
                  className="break-all text-primary underline decoration-1 underline-offset-[0.18em] hover:decoration-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {kilde.href}
                </a>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
