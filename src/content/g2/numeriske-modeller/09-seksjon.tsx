export function Seksjon2() {
  return (
    <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-5">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-teal-300">
        <span>🌊</span> 2. Havmodellering: Drevet av atmosfærerand og tetthet
      </h3>
      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <strong>Tidsskala:</strong> Dager til uker (bølger og stormflo), sesonger og århundrer
          (havstrømmer og varmelagring).
        </li>
        <li>
          <strong>Fysisk karakter:</strong> Havet er om lag 800 ganger tettere enn luft og har en
          enorm varmekapasitet. Vann beveger seg saktere enn luft, og et feilaktig blandelag kan
          vedvare i uker.
        </li>
        <li>
          <strong>Styrende mekanismer:</strong> Havmodellene (som ROMS i Norkyst-800) styres
          sterkt av <em>randbetingelsene fra atmosfæren</em>: mekanisk vindstress, varmeveksling
          og ferskvannstilførsel. Indre strømmer styres av tetthetsforskjeller (termohalin sirkulasjon).
        </li>
        <li>
          <strong>Samfunnsnytte:</strong> Stormflo, bølgevarsler, oljesøl, lakselus og søk- og redning.
        </li>
      </ul>
    </div>
  );
}
