import { Link } from "@tanstack/react-router";
import type { GeografiKapittel } from "@/lib/geografi-kapitler";
import { GEOGRAFI_KAPITLER } from "@/lib/geografi-kapitler";
import { cn } from "@/lib/utils";

/**
 * Innholdsfortegnelse for et Geografi-kapittel. Lenkene går til egne
 * underkapittel-URL-er (`/geografi/<kap>/<under>`). På kapittelsiden har
 * overskriftene samme id, så `/geografi/<kap>#<under>` virker fortsatt.
 */
export function GeografiInnhold({
  kapittel,
  aktiv,
}: {
  kapittel: GeografiKapittel;
  aktiv?: string;
}) {
  const nr = GEOGRAFI_KAPITLER.findIndex((k) => k.path === kapittel.path) + 1;
  const liste = (
    <ol className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
      {kapittel.underkapitler.map((u, i) => {
        const erAktiv = u.id === aktiv;
        return (
          <li key={u.id}>
            <Link
              to="/geografi/$kapittel/$under"
              params={{ kapittel: kapittel.path, under: u.id }}
              aria-current={erAktiv ? "page" : undefined}
              className={cn(
                "flex gap-2 rounded-md px-2 py-1.5 underline-offset-4 hover:bg-muted hover:underline",
                erAktiv ? "bg-muted font-medium text-foreground" : "text-primary",
              )}
            >
              <span className="w-9 shrink-0 font-medium tabular-nums text-[var(--kap-aksent,var(--color-muted-foreground))]">
                {nr}.{i + 1}
              </span>
              <span>{u.title}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
  return (
    <nav
      aria-label="Innhold i kapitlet"
      className="rounded-2xl border border-border border-l-4 border-l-[var(--kap-aksent,var(--color-border))] bg-card p-4 sm:p-5"
    >
      {aktiv ? (
        <details>
          <summary className="cursor-pointer font-display text-lg font-medium tracking-tight">
            Innhold i kapittel {nr}
          </summary>
          {liste}
        </details>
      ) : (
        <>
          <h2 className="font-display text-lg font-medium tracking-tight">Innhold</h2>
          {liste}
        </>
      )}
    </nav>
  );
}
