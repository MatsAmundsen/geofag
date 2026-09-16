import { OrdBoks } from "@/components/term";

export function Seksjon3() {
  return (
    <>
      <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-amber-300">
          <span>🌍</span> 3. Klimaforskning: Et randverdiproblem
        </h3>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong>Tidsskala:</strong> Tiår til århundrer.
          </li>
          <li>
            <strong>Fysisk karakter:</strong> Randverdiproblem. Modellene spår ikke været 12. juni 2087,
            men værets statistikk over 30 år.
          </li>
          <li>
            <strong>Pådriv:</strong> Drivhusgasser, aerosoler, sol og vulkaner.
          </li>
        </ul>
      </div>
      <OrdBoks
        ord="Startverdi- vs. randverdiproblem"
        barn="Værvarsling styres av starttilstanden nå. Klima styres av ytre pådriv over tiår."
      />
    </>
  );
}
