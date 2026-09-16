export function Seksjon() {
  return (
    <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-5">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-sky-300">
        <span>🌦️</span> 1. Værvarsling: Et startverdiproblem
      </h3>
      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <strong>Tidsskala:</strong> Fra noen timer (nowcasting) ut til 10–15 døgn.
        </li>
        <li>
          <strong>Fysisk karakter:</strong> <em>Startverdiproblem</em>. Hva som skjer de neste
          dagene er nesten utelukkende bestemt av den nøyaktige starttilstanden i øyeblikket
          varselet skytes ut.
        </li>
        <li>
          <strong>Fokus:</strong> Høyest mulig oppløsning (2,5 km i MEPS) for å løse norske
          fjorder, lokale vindkast og konvektive byger. Kontinuerlig dataassimilering hvert sjette
          time er helt avgjørende.
        </li>
      </ul>
    </div>
  );
}
