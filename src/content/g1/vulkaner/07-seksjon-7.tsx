export function Seksjon4() {
  return (
    <section className="space-y-4">
        <div className="pt-4 space-y-3">
          <h3 className="font-display text-xl font-medium tracking-tight text-primary">
            VEI: Vulkansk eksplosivitetsindeks (0 til 8)
          </h3>
          <p className="text-sm text-muted-foreground">
            For å kvantifisere styrken på vulkanutbrudd innførte Chris Newhall og Steve Self i 1982 den logaritmiske
            <strong> Volcanic Explosivity Index (VEI)</strong>. Hvert trinn over VEI 1 representerer en tidobling i volumet av
            utkastet tefra (Newhall &amp; Self, 1982):
          </p>

          <div className="overflow-x-auto rounded-xl border border-border bg-card/60 p-4">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-2 font-semibold">VEI</th>
                  <th className="pb-2 font-semibold">Tefravolum</th>
                  <th className="pb-2 font-semibold">Søylehøyde</th>
                  <th className="pb-2 font-semibold">Klassifisering</th>
                  <th className="pb-2 font-semibold">Frekvens globalt</th>
                  <th className="pb-2 font-semibold">Kjente eksempler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-muted-foreground">
                <tr>
                  <td className="py-2 font-bold text-emerald-400">0</td>
                  <td>&lt; 10 000 m³</td>
                  <td>&lt; 100 m</td>
                  <td>Hawaiisk (effusiv)</td>
                  <td>Konstant</td>
                  <td>Kilauea, Fagradalsfjall (Island)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-emerald-400">1</td>
                  <td>&gt; 10 000 m³</td>
                  <td>0,1–1 km</td>
                  <td>Hawaiisk / Strombolsk</td>
                  <td>Daglig</td>
                  <td>Stromboli (Italia)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-teal-400">2</td>
                  <td>&gt; 1 mill. m³</td>
                  <td>1–5 km</td>
                  <td>Strombolsk / Vulkansk</td>
                  <td>Ukentlig</td>
                  <td>Galeras (Colombia)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-teal-400">3</td>
                  <td>&gt; 10 mill. m³</td>
                  <td>3–15 km</td>
                  <td>Vulkansk / Sub-pliniansk</td>
                  <td>Månedlig</td>
                  <td>Nevado del Ruiz (1985)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-amber-400">4</td>
                  <td>&gt; 0,1 km³</td>
                  <td>10–25 km</td>
                  <td>Sub-pliniansk / Pliniansk</td>
                  <td>~1 per år</td>
                  <td>Eyjafjallajökull (2010)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-orange-400">5</td>
                  <td>&gt; 1 km³</td>
                  <td>20–35 km</td>
                  <td>Pliniansk</td>
                  <td>~1 per 12 år</td>
                  <td>Mount St. Helens (1980), Vesuv (79)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-rose-400">6</td>
                  <td>&gt; 10 km³</td>
                  <td>&gt; 30 km</td>
                  <td>Ultra-pliniansk / Kaldera</td>
                  <td>~1 per 100 år</td>
                  <td>Pinatubo (1991), Krakatau (1883)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-rose-500">7</td>
                  <td>&gt; 100 km³</td>
                  <td>&gt; 35 km</td>
                  <td>Super-kolossal / Kaldera</td>
                  <td>~1 per 1000 år</td>
                  <td>Tambora (1815), Santorini (~1600 f.Kr.)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-purple-400">8</td>
                  <td>&gt; 1000 km³</td>
                  <td>&gt; 45 km</td>
                  <td>Mega-kolossal (Supervulkan)</td>
                  <td>~1 per 50 000 år</td>
                  <td>Toba (74 000 år siden), Yellowstone</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

    </section>
  );
}
