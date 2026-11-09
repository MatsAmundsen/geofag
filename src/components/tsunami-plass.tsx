/** Reserverer høyden til en tsunami-modell før JS-en er inne. */
export function TsunamiPlass({ modell }: { modell: string }) {
  return (
    <div
      className="tsunami-plass w-full overflow-hidden rounded-2xl border border-border bg-card"
      data-modell={modell}
      aria-busy="true"
    >
      <p className="sr-only">Laster modellen…</p>
      <div className="tsunami-plass-hode" aria-hidden="true" />
      {modell === "m6" ? <div className="tsunami-plass-liste" /> : <div className="tsunami-plass-scene" />}
      {modell === "m2" ? <div className="tsunami-plass-graf" /> : null}
      <div className="tsunami-plass-bunn" aria-hidden="true" />
    </div>
  );
}
