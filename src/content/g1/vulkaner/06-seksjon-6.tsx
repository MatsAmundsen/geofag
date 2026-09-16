export function Seksjon3() {
  return (
    <div className="pt-4 space-y-3">
      <h3 className="font-display text-xl font-medium tracking-tight text-primary">
        Kontrast: Fagradalsfjall og Reykjanes — Effusiv sprekkevulkanisme
      </h3>
      <p className="text-sm text-muted-foreground">
        Som en dramatisk kontrast til Eyjafjallajökulls eksplosive askesky står de nyere utbruddene på Reykjanesskhalvøya
        (Fagradalsfjall 2021–2023 og Sundhnúkur 2023–2024). Her stiger primitiv basaltisk mantelmagma (SiO₂ ~48 %)
        opp langs kilometerlange strekkforkastninger uten kontakt med isbreer.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 pt-1">
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="font-semibold text-emerald-400 text-sm">Fagradalsfjall (VEI 0–1)</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Tyntflytende basaltisk magma avgasser rolig i fontener og lavastrømmer. Null aske i stratosfæren,
            ingen fare for sivil luftfart, men lokal trussel mot infrastruktur og bebyggelse (som Grindavík).
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h4 className="font-semibold text-rose-400 text-sm">Hovedforskjellen</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Eyjafjallajökull hadde seig andesitt under en isbre (freatomagmatisme). Fagradalsfjall har
            lavviskøs basalt på tørt land (effusiv lavaflod).
          </p>
        </div>
      </div>
    </div>
  );
}
