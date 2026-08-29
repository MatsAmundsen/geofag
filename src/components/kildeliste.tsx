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
      <p className="mt-2 text-sm text-muted-foreground">
        APA 7th. Kildene underbygger tall og fakta på siden. Offentlige etater og fagfellevurderte
        artikler er brukt foran populariserte sammendrag.
      </p>
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
                  className="break-all text-primary underline-offset-2 hover:underline"
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
