export function JordskjelvsikringOgKonstruksjonste() {
  return (
    <section className="pt-6 space-y-4">
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Jordskjelvsikring: Eurokode 8 og baseisolering
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="font-semibold text-sky-400 text-sm">Eurokode 8</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Europeisk standard for seismisk prosjektering, lovpålagt i Norge.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="font-semibold text-emerald-400 text-sm">Baseisolering</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Fundament på gummilagre slik at bygget glir mens bakken ryster.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="font-semibold text-amber-400 text-sm">Svingningsdempere</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Tung masse i motfase, som stålkulen i Taipei 101.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="font-semibold text-rose-400 text-sm">Jordlikvifaksjon</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Vannmettet sand mister friksjon og blir flytende under risting.
          </p>
        </div>
      </div>
    </section>
  );
}
