import { RealisticSynopticChartDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function DetSynoptiskeBakkekartetAtmosfaeren() {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-medium tracking-tight">
        1. Det synoptiske bakkekartet – Atmosfærens trykkfelt
      </h2>
      <p>
        Ordet <em>synoptisk</em> stammer fra det greske <em>syn-opsis</em>, som betyr «å se alt under
        ett» eller «felles overblikk». I meteorologien er et synoptisk værkart en geografisk
        fremstilling av atmosfærens tilstand på et nøyaktig synkronisert tidspunkt over et stort
        kontinentalt eller oseanisk område (WMO, 2021).
      </p>
      <p>
        Jordens meteorologiske institutter samler inn milliarder av måledata samtidig ved de fire
        internasjonale hovedterminene: <strong>00:00, 06:00, 12:00 og 18:00 UTC</strong> (Coordinated
        Universal Time). Uansett om målingen gjøres på en værstasjon på Svalbard, en oljeplattform i
        Nordsjøen eller en værballong over Frankrike, fanges dataene i nøyaktig samme sekund. Dette
        synoptiske prinsippet er avgjørende: Hvis målingene ikke var samtidige, ville værsystemenes
        egen bevegelse (ofte 40–80 km/t) forvrenge trykkgradientene og gjøre analysen ubrukelig.
      </p>

      <OrdBoks
        ord="Synoptisk kart"
        barn="Et værkart som viser meteorologiske observasjoner utført samtidig over et stort område (ved standardiserte UTC-tidspunkter), med isobarer, frontlinjer og stasjonsmodeller."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Reduksjon til havnivå (MSLP)
      </h3>
      <p>
        Som vi lærte i kapittelet om trykk, faller lufttrykket med høyden – om lag 1 hPa for hver 8.
        meter nær bakken. Dersom vi tegnet råtrykket direkte på kartet, ville fjellbygda Geilo
        (ca. 800 moh.) alltid framstå som et ekstremt kraftig orkanlavtrykk på rundt 920 hPa, mens
        Bergen ved kysten ville ha 1013 hPa.
      </p>
      <p>
        For å isolere de horisontale trykkforskjellene som driver vinden, må alle bakketrykkmålinger
        korrigeres matematisk til hva trykket ville vært dersom stasjonen lå ved havnivå. Dette kalles{" "}
        <strong>Mean Sea Level Pressure (MSLP)</strong>. Korreksjonen beregnes ved hjelp av den
        hydrostatiske trykkligningen og hypsometriske formelen, der man regner inn vekten av en tenkt
        luftsøyle fra stasjonens faktiske høyde ned til havnivå basert på den lokale temperaturen.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Isobarer og trykkgradientkraften
      </h3>
      <p>
        Når havnivåtrykkene er plottet ut, trekkes linjer gjennom punkter med nøyaktig samme trykk.
        Disse linjene kalles <strong>isobarer</strong> (fra gresk <em>isos</em> = lik, og <em>baros</em> =
        vekt). Meteorologisk institutt og Yr trekker standardmessig isobarer med et intervall på{" "}
        <strong>4 eller 5 hPa</strong> (for eksempel 990, 995, 1000, 1005, 1010 hPa).
      </p>
      <p>
        Isobarene fungerer som koter på et topografisk kart. Jo tettere isobarene ligger sammen, desto
        større er trykkforskjellen over en gitt horisontal distanse. Dette definerer{" "}
        <strong>trykkgradientkraften</strong>:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>Tette isobarer:</strong> Svært bratt trykkgradient. Stor trykkforskjell over kort
          avstand &rarr; sterk akselerasjon og kraftig vind (kuling, storm eller orkan).
        </li>
        <li>
          <strong>Gisne isobarer:</strong> Slak trykkgradient. Liten trykkforskjell over store
          avstander &rarr; svak vind, bris eller vindstille.
        </li>
      </ul>

      <OrdBoks
        ord="Trykkgradientkraft"
        barn="Den drivende kraften bak all vind. Virker vinkelrett på isobarene, rettet fra høyt mot lavt trykk. Styrken er proporsjonal med hvor tett isobarene ligger."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Bakkefriksjon og vindens innkryssing
      </h3>
      <p>
        I den frie troposfæren (over ca. 1 000 meters høyde) oppstår det en tilnærmet perfekt balanse
        mellom trykkgradientkraften og Corioliskraften. Her blåser vinden helt parallelt med isobarene –
        dette kalles <em>geostrofisk vind</em>.
      </p>
      <p>
        Nær bakken endrer imidlertid <strong>friksjonen</strong> mot jordoverflaten, skog, fjell og
        havbølger dette regnestykket. Friksjonen bremser vindhastigheten. Fordi Corioliskraften er
        direkte proporsjonal med vindhastigheten (F_c = 2 · m · v · Ω · sin φ), svekkes Corioliskraften
        når luften bremses ned. Trykkgradientkraften, som bare er avhengig av trykkfeltet, forblir like
        sterk!
      </p>
      <p>
        Resultatet er at trykkgradientkraften «vinner» over Corioliskraften nær bakken: Vinden bøyes av
        og <strong>krysser isobarene på skrå inn mot lavtrykkssenteret</strong> (konvergens) og på skrå
        ut av høytrykket (divergens). Over åpent hav er innkryssingsvinkelen typisk 10–20°, mens den
        over kupert norsk terreng kan være 25–40°. Denne innstrømmingen mot lavtrykket tvinger luften
        til å stige i sentrum, noe som fører til avkjøling, kondensasjon, skydannelse og nedbør!
      </p>

      {/* DIAGRAM 1: REALISTIC SYNOPTIC CHART */}
      <div className="my-6">
        <RealisticSynopticChartDiagram />
      </div>
    </section>
  );
}
