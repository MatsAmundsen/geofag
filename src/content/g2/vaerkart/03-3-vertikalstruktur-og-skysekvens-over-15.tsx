import { FrontVerticalProfileDiagram } from "@/components/diagrams";

export function VertikalstrukturOgSkysekvensOver() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        3. Vertikalstruktur og skysekvens over 1500 km
      </h2>
      <p>
        For å virkelig mestre værkarttolking i Geofag 2 holder det ikke å se frontene i fugleperspektiv.
        Du må visualisere atmosfærens <strong>tredimensjonale tverrsnitt</strong>.
      </p>
      <p>
        Når et lavtrykkssystem nærmer seg kysten fra vest, følger en karakteristisk og universell
        sekvens av skyer og nedbør som strekker seg over mer enn 1 500 kilometer (Sivle, 2009; NOAA,
        u.å.):
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Varmfrontens forvarsel (1000–1500 km foran lavtrykkssenteret)
      </h3>
      <p>
        Fordi varmfrontens glideflate er svært slak (1:150, som betyr at flaten bare stiger 1 km per
        150 km horisontal avstand), klatrer varmluften i høyden lenge før selve frontlinjen når
        bakken:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Cirrus (Ci) i 8–10 km høyde:</strong> Det aller første tegnet på et innkommende
          lavtrykk er tynne, fjæraktige skyer av rene iskrystaller («kattelabber» på folkemunne). De
          dannes der den øverste spissen av varmluften glir over kaldluften. Været på bakken er ennå
          klart og pent, men barometeret begynner å falle svakt.
        </li>
        <li>
          <strong>Cirrostratus (Cs) i 6–8 km høyde:</strong> I løpet av 6–12 timer tetner cirrusskyene
          til et melkehvitt slør over hele himmelen. Iskrystallene i cirrostratus bryter sol- og
          månelyset og skaper en lysende ring med en radius på 22° rundt solen – en såkalt{" "}
          <strong>halo</strong>. I geofaglig værvarsling er en halo et sikkert tegn på at varmfronten
          er i anmarsj.
        </li>
        <li>
          <strong>Altostratus (As) i 3–6 km høyde:</strong> Skylaget synker og blir tykkere. Sola
          viskes ut til en diffus, matt lysflekk («som sett gjennom et matt glassvindu»). Lufttrykket
          faller nå markant.
        </li>
        <li>
          <strong>Nimbostratus (Ns) og jevn nedbør (0–3 km høyde):</strong> 100–300 km foran fronten
          på bakken har skylaget blitt mørkegrått, lavt og formløst. Den jevne, vedvarende nedbøren
          starter (landregn eller snøvær). Dette regnet kan vare sammenhengende i 6–18 timer avhengig
          av systemets hastighet.
        </li>
      </ol>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Den varme sektoren og kaldfrontens brå overgang
      </h3>
      <p>
        Når selve varmfronten passerer bakken, opphører den sammenhengende nedbøren. Temperaturen
        hopper opp, luftfuktigheten er høy, og himmelen er ofte dekket av lave tåkeskyer eller yr{" "}
        <em>(Stratocumulus / Stratus)</em>. Barometeret flater ut. Du befinner deg nå i{" "}
        <strong>varmsektoren</strong>.
      </p>
      <p>
        Varmsektorens oppholdsvær er imidlertid kortvarig. Bak lurer den aggressive kaldfronten:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          Fordi kaldluften er tung og tettere, pløyer den seg under varmluften med stor fart.
          Helningen er bratt (1:50).
        </li>
        <li>
          Den fuktige luften kastes oppover med voldsom kraft, noe som trigger eksplosiv konvektiv
          skydannelse: <strong>Cumulonimbus (Cb)</strong>, tordenskyer med ambolter av is i 10–12 km
          høyde.
        </li>
        <li>
          Under kaldfrontpassasjen oppstår <strong>squalls</strong> (plutselige, harde vindkast),
          styrtregn, hagl og torden. På bare 15–30 minutter kan temperaturen rase med 5–10 °C!
        </li>
        <li>
          Straks fronten har passert, sprekker skydekket opp i krystallklar, dypblå polarluft
          avbrutt av kraftige, spredte ustabilitetsbyger <em>(Cumulus congestus)</em>. Barometeret
          skyter i været igjen.
        </li>
      </ul>

      {/* DIAGRAM 2: FRONT VERTICAL PROFILE */}
      <div className="my-6">
        <FrontVerticalProfileDiagram />
      </div>
    </section>
  );
}
