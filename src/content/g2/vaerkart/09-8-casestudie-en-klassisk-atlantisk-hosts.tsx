import { WeatherProgression24hDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function CasestudieEnKlassiskAtlantiskHosts() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        8. Casestudie – En klassisk atlantisk høststorm mot Norge
      </h2>
      <p>
        La oss anvende teorien på en realistisk værsituasjon: Et modent, intenst atlanterhavslavtrykk
        (968 hPa i sentrum) beveger seg inn fra Norskehavet mot kysten av Vestlandet og Trøndelag.
      </p>
      <p>
        Hva opplever en observatør som står stasjonert på kysten ved Stad gjennom et helt døgn?
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        T = 0 timer: Varmfrontens forfeste (Klarvær til melkehvitt slør)
      </h3>
      <p>
        Lavtrykket ligger 800 km vest i havet. Barometeret på Stad viser 1012 hPa, men stasjonsplottet
        avslører en fallende trykktendens (<code>-25 /</code>). Vinden er svak til frisk bris fra
        sør-sørøst. På himmelen seiler tynne cirrusfjær som gradvis tetner til et melkehvitt
        cirrostratusslør med tydelig halo rundt solen.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        T = +12 timer: Varmfrontpassasje og varmsektor (Silregn og vinddreining)
      </h3>
      <p>
        Ved middagstider når selve varmfronten kysten. Skylaget har senket seg til blygrå nimbostratus,
        og et vedvarende, tungt landregn har pågått i fire timer. Barometeret har stupt til 992 hPa.
      </p>
      <p>
        Når varmfronten passerer, skjer et markant fenomen: <strong>Vinden dreier med klokka (veering)</strong>{" "}
        fra sørøst mot sørvest, og øker til stiv kuling. Samtidig stiger temperaturen brått fra 6 °C
        til 13 °C. Nedbøren går over fra silregn til lett yr og tåkedis. Vi befinner oss midt i den
        lunkne, fuktige varmsektoren.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        T = +24 timer: Kaldfrontpassasje og arktisk luftutbrudd (Squalls og klarning)
      </h3>
      <p>
        På ettermiddagen treffer den hissigste delen av systemet: Kaldfronten og okklusjonsbåndet.
        Himmelen formørkes av massive cumulonimbus-tårn. Vinden gjør nok et brutalt hopp med klokka:
        den raser fra sørvest til <strong>nordvest, og øker til full storm</strong> med vindkast over
        35 m/s. Regnet høljer ned i form av intense byger blandet med hagl og torden.
      </p>
      <p>
        Få timer senere skyter barometeret oppover igjen (<code>+45 /</code>). Kald, krystallklar
        polarluft skyller inn over det lunkne kystvannet. Luften er ustabil, noe som skaper klassiske
        «vestlandsbyger» med solgløtt innimellom kraftige hagl- og regnbyger.
      </p>

      <OrdBoks
        ord="Vinddreining (Veering)"
        barn="At vinden skifter retning med urviseren (f.eks. fra sørøst via sør til sørvest og nordvest). På den nordlige halvkule skjer dette når et lavtrykk passerer nord for observatøren."
      />

      {/* DIAGRAM 6: WEATHER PROGRESSION 24H */}
      <div className="my-6">
        <WeatherProgression24hDiagram />
      </div>
    </section>
  );
}
