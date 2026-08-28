export function OrdBoks({ ord, barn }: { ord: string; barn: string }) {
  return (
    <aside className="my-4 rounded-lg border border-border bg-muted px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wider text-primary">{ord}</p>
      <p className="mt-1 text-sm leading-relaxed text-foreground/90">{barn}</p>
    </aside>
  );
}

export function Term({ name, def }: { name: string; def: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <dt className="font-medium">{name}</dt>
      <dd className="mt-1 text-sm text-muted-foreground">{def}</dd>
    </div>
  );
}

export function TermGrid({ children }: { children: React.ReactNode }) {
  return <dl className="grid gap-3 sm:grid-cols-2">{children}</dl>;
}
