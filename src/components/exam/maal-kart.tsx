import { Link } from "@tanstack/react-router";
import { MAAL_KART } from "@/lib/eksamen";

export function MaalKart() {
  return (
    <section className="mt-14">
      <h2 className="font-display text-3xl font-medium tracking-tight">
        Øv baklengs fra kompetansemålene
      </h2>
      <p className="mt-3 text-foreground/90">
        Vår 2026 og Udirs eksempel dekker ikke alle målene like tett. Modellene, energien, feltet
        og deler av kryosfæren ligger tynt der. Sett «Øv baklengs» er skrevet fra målet mot
        oppgaven — ikke fra et gammelt Udir-sett og inn.
      </p>
      <ul className="mt-6 space-y-4">
        {MAAL_KART.map((rad) => (
          <li key={rad.maal} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm font-medium leading-relaxed text-foreground">{rad.maal}</p>
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Kapittel</p>
            <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm">
              {rad.chapters.map((c) => (
                <Link key={c.to} to={c.to} className="text-primary underline-offset-4 hover:underline">
                  {c.label}
                </Link>
              ))}
            </p>
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Sett</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {rad.exams.map((e, i) => (
                <span key={e.slug}>
                  {i > 0 ? " · " : ""}
                  <Link
                    to="/eksamen/$slug"
                    params={{ slug: e.slug }}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {e.label}
                  </Link>
                  {` (${e.tasks})`}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
