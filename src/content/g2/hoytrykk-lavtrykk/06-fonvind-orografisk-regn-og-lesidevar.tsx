import { FoehnAdiabaticDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function FonvindOrografiskRegnOgLesidevar() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Fønvind: Orografisk regn og lesidevarme
      </h2>
      <p>
        Fønvind er en varm, tørr og ofte turbulent fallvind på lesiden av en fjellkjede. Det
        meteorologiske paradokset med fønvind er at{" "}
        <strong>
          luften som lander i dalen på lesiden er vesentlig varmere og tørrere enn den var da den
          startet på nøyaktig samme høyde på losiden
        </strong>
        . Fjellet har tilsynelatende varmet opp luften (Store norske leksikon, u.å.-c).
      </p>
      <p>
        Forklaringen skyldes regnet som falt på veien over kammen, og forskjellen på tørradiabatisk
        og fuktadiabatisk temperaturendring:
      </p>
      <ol className="list-decimal space-y-3 pl-6 text-foreground/90">
        <li>
          <strong>Trinn 1 (Loside 0 m til 1000 m):</strong> Fuktig atlanterhavsluft med en
          temperatur på +12 °C og 75 % relativ fuktighet treffer kysten av Vestlandet og tvinges
          oppover fjellene (orografisk heving). Luften er umettet og avkjøles tørradiabatisk med{" "}
          <strong>1,0 °C per 100 m (DALR)</strong>. Ved 1000 meters høyde er luften avkjølt med 10
          °C til <strong>+2 °C</strong>.
        </li>
        <li>
          <strong>Trinn 2 (Loside 1000 m til 2500 m):</strong> Ved 1000 m når luften sitt
          kondensasjonsnivå (LCL, 100 % RF). Vanndampen kondenserer og danner orografiske skyer. Det
          bøtter ned med kraftig regn. Kondensasjonen frigjør enorme mengder latent varme, som
          motvirker ekspansjonsavkjølingen. Fra 1000 m til fjelltoppen på 2500 m avkjøles luften
          derfor kun fuktadiabatisk med <strong>ca. 0,6 °C per 100 m (SALR)</strong>.
          Temperaturfallet på denne etappen blir bare 15 × 0,6 = 9 °C, slik at luften passerer
          toppen med en temperatur på <strong>-7 °C</strong>.
        </li>
        <li>
          <strong>Byttehandelen på toppen:</strong> Vanndråpene har falt ut av skyen som regn på
          Vestlandet. Men
          <strong> kondensasjonsvarmen som ble frigjort, forblir værende i luften!</strong>{" "}
          Luftpakken har fått en ren termodynamisk varmegevinst.
        </li>
        <li>
          <strong>Trinn 3 (Leside 2500 m til 0 m):</strong> På lesiden (mot Østlandet) synker luften
          ned i dalbunnen. Når luften synker, varmes den opp. Fordi regnet falt ut på losiden,
          finnes det ingen vanndråper igjen som kan fordampe og stjele varme. Luften varmes derfor
          tørradiabatisk med <strong>1,0 °C per 100 m (DALR) hele veien ned</strong>.
          Temperaturstigningen fra toppen til dalbunnen blir 25 × 1,0 = +25 °C.
        </li>
      </ol>
      <p>
        <strong>Sluttregnskapet:</strong> Luften treffer dalbunnen på lesiden med en temperatur på
        -7 + 25 = +18 °C! Luften er altså <strong>6 °C varmere</strong> enn da den startet ved
        havnivå på losiden (+12 °C). I tillegg har den relative fuktigheten stupt til under 30 %,
        noe som gjør luften knusktørr.
      </p>

      <OrdBoks
        ord="Fønvind"
        barn="Varm og knusktørr fallvind på lesiden av fjell. Skyldes at luften mistet fuktighet som regn på losiden (der latent varme ble frigjort), og varmes tørradiabatisk hele veien ned på lesiden."
      />

      <p>
        <strong>Geofaglige konsekvenser i Norge:</strong>
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Vestavind mot Langfjella:</strong> Vestlandet er losiden og mottar Norges største
          nedbørmengder (Brekke i Gulen har over 3 500 mm i året). Østlandsdalene (Gudbrandsdalen,
          Østerdalen og Ottadalen) ligger i regnskyggen og opplever fønvind og tørke. Skjåk i
          Ottadalen har en årsnedbør på under 300 mm (Store norske leksikon, u.å.-d).
        </li>
        <li>
          <strong>Østavind (omvendt situasjon):</strong> Når et lavtrykk over Nordsjøen sender
          kraftig vind fra øst, blir Østlandet loside med gråvær og snø, mens Vestlandsfjorder (som
          Sunndalsøra og Tafjord) får kraftig fønvind. I januar har Sunndalsøra målt utrolige 19,0
          °C midt på vinteren på grunn av føneffekten!
        </li>
        <li>
          <strong>Farer:</strong> Fønvind smelter snø i ekspresstempo om våren (flomfare), tørker ut
          vegetasjon og skaper akutt skogbrannfare. I tillegg opptrer fønvinden ofte i kraftige,
          uforutsigbare fallvindkast.
        </li>
      </ul>

      <FoehnAdiabaticDiagram />
    </section>
  );
}
