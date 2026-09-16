import { OrdBoks } from "@/components/term";

export function BergensskolenOgPolarfrontensAnatomi() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        2. Bergensskolen og polarfrontens anatomi
      </h2>
      <p>
        Den moderne forståelsen av værkart og lavtrykk ble unnfanget i Norge. Under første verdenskrig
        ble Norge avskåret fra internasjonale værtelegrammer. Fysikeren <strong>Vilhelm Bjerknes</strong>{" "}
        opprettet et tett nettverk av observasjonsstasjoner på Vestlandet, ledet fra Geofysisk
        institutt i Bergen. Sammen med sønnen <strong>Jacob Bjerknes</strong> og kollegaen{" "}
        <strong>Halvor Solberg</strong> formulerte de i 1918–1922 den banebrytende{" "}
        <em>polarfrontteorien</em> (Bjerknes & Solberg, 1922).
      </p>
      <p>
        De oppdaget at atmosfæren ikke har jevne temperaturoverganger, men består av store, distinkte{" "}
        <strong>luftmasser</strong> med ulik temperatur og fuktighet. Grenseflatene mellom disse
        luftmassene kalte de <em>fronter</em> – et begrep lånt fra krigens skyttergravslinjer, fordi det
        bokstavelig talt raste et voldsomt energislag langs denne grensen.
      </p>

      <OrdBoks
        ord="Luftmasse"
        barn="Et enormt volum av luft (ofte tusenvis av kilometer i utstrekning) som har tilnærmet ensartede egenskaper for temperatur og fuktighet i horisontal retning, formet over et homogent kildeområde."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Frontenes symboler og dynamikk
      </h3>
      <p>
        På internasjonale værkart fra Meteorologisk institutt, Yr og WMO representeres frontene med
        standardiserte farger og geometriske figurer:
      </p>

      <div className="my-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border font-medium text-foreground">
              <th className="py-2 pr-3">Fronttype</th>
              <th className="py-2 pr-3">Kartsymbol</th>
              <th className="py-2 pr-3">Fysisk mekanisme</th>
              <th className="py-2 pr-3">Helning</th>
              <th className="py-2">Typisk vær & nedbør</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-foreground/90">
            <tr>
              <td className="py-2.5 pr-3 font-semibold text-rose-500">Varmfront</td>
              <td className="py-2.5 pr-3">Rød linje med halvsirkler</td>
              <td className="py-2.5 pr-3">
                Lett, varm luft rykker fram og glir slakt oppover den tilbaketrekkende kaldluften.
              </td>
              <td className="py-2.5 pr-3">Slak (1:150 til 1:200)</td>
              <td className="py-2.5">
                Bredt belte (300–600 km) med jevnt, vedvarende silregn eller snø (nimbostratus).
              </td>
            </tr>
            <tr>
              <td className="py-2.5 pr-3 font-semibold text-sky-500">Kaldfront</td>
              <td className="py-2.5 pr-3">Blå linje med spisse tagger</td>
              <td className="py-2.5 pr-3">
                Tung, kald luft brøyter seg fram under varmluften og løfter den brutalt opp.
              </td>
              <td className="py-2.5 pr-3">Bratt (1:50 til 1:80)</td>
              <td className="py-2.5">
                Smal frontsone (50–100 km) med voldsomme byger, torden, hagl og vindkast
                (cumulonimbus).
              </td>
            </tr>
            <tr>
              <td className="py-2.5 pr-3 font-semibold text-purple-500">Okkludert front</td>
              <td className="py-2.5 pr-3">Lilla linje med vekslende tagger og sirkler</td>
              <td className="py-2.5 pr-3">
                Den raske kaldfronten tar igjen varmfronten og klemmer varmsektoren opp i høyden.
              </td>
              <td className="py-2.5 pr-3">Kompleks vertikalt</td>
              <td className="py-2.5">
                Kombinert nedbørsbelte med både sammenhengende regn og innleirede byger.
              </td>
            </tr>
            <tr>
              <td className="py-2.5 pr-3 font-semibold text-amber-500">Stasjonær front</td>
              <td className="py-2.5 pr-3">Vekslende blå tagger og røde sirkler på hver side</td>
              <td className="py-2.5 pr-3">
                Grensen mellom kald og varm luft står tilnærmet stille (under 5 knops drift).
              </td>
              <td className="py-2.5 pr-3">Moderat</td>
              <td className="py-2.5">
                Langvarig skydekke og vedvarende nedbør over samme geografiske område i flere dager.
              </td>
            </tr>
            <tr>
              <td className="py-2.5 pr-3 font-semibold text-orange-500">Tråg / Trough</td>
              <td className="py-2.5 pr-3">Tykke stiplede eller brune linjer</td>
              <td className="py-2.5 pr-3">
                U-formet utbuling i isobarene med markant syklonal krumning og konvergens, uten full
                luftmassekontrast.
              </td>
              <td className="py-2.5 pr-3">Vertikal akse</td>
              <td className="py-2.5">
                Intensive bygelinjer (squall lines), vindøkning og raske væromslag i bakkant av
                lavtrykk.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <OrdBoks
        ord="Varm sektor"
        barn="Området mellom varmfronten foran og kaldfronten bak i en moden polarfrontsyklon. Kjennetegnes av mild, fuktig luft, flatt eller svakt fallende trykk, og ofte yr eller tåkeskyer."
      />
    </section>
  );
}
