import { RadarSatelliteNowcastingDiagram } from "@/components/diagrams";

export function NowcastingVaerradarSatellittOgFare() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        6. Nowcasting, værradar, satellitt og farevarsler
      </h2>
      <p>
        De synoptiske kartene fanger det store bildet hver 6. time. Men hva når en intens bygelinje
        eller en plutselig atmosfærisk elv truer et lokalsamfunn akkurat nå? Her trer{" "}
        <strong>nowcasting (korttidsvarsling 0–2 timer)</strong> inn, basert på sanntids fjernerkjenning
        fra værradarer og satellitter.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Værradar – Reflektivitet i dBZ
      </h3>
      <p>
        Meteorologisk institutt drifter et nasjonalt nettverk av bakkebaserte værradarer (for eksempel
        på Bømlo, Hurum, Rissa og Hasvik). Radaren sender ut mikrobølgepulser som reflekteres tilbake
        av vanndråper, hagl og snøkrystaller i skyene.
      </p>
      <p>
        Styrken på det returnerte signalet måles i <strong>desibel reflektivitet (dBZ)</strong>, som er
        proporsjonal med dråpediameteren i sjette potens (Z proporsjonal med D^6). En dobling i
        dråpestørrelse gir 64 ganger kraftigere ekko!
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li><strong>10–20 dBZ (blått/lysegrønt):</strong> Lett yr eller lett snøfall.</li>
        <li><strong>30–40 dBZ (gult/oransje):</strong> Moderat til kraftig regn (5–15 mm/t).</li>
        <li><strong>50–65 dBZ (mørkerødt/fiolett):</strong> Ekstrem nedbørsintensitet, tordenvær og hagl.</li>
      </ul>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Meteosat satellittbilder (VIS og IR)
      </h3>
      <p>
        Geostasjonære satellitter (Meteosat) 36 000 km over ekvator tar bilder hvert 10.–15. minutt:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>Synlige bilder (VIS):</strong> Viser sollys reflektert fra skytoppene (albedo). Tykke
          skyer med høyt vanninnhold fremstår blendende hvite, mens bakke og åpent hav er mørkt.
          Fungerer kun i dagslys.
        </li>
        <li>
          <strong>Infrarøde bilder (IR):</strong> Måler den termiske strålingen fra skytoppene. Fordi
          temperaturen faller med høyden i troposfæren, har skytopper i 10–12 km høyde ekstremt lave
          temperaturer (-50 til -70 °C). På fargelagte IR-bilder vises disse sylkalde
          cumulonimbus-skyene i grelle røde og fiolette fargetoner, noe som umiddelbart avslører aktive
          tordensentre og intense frontbånd natt og dag.
        </li>
      </ul>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        MET Norways farevarsler (Gult, oransje og rødt nivå)
      </h3>
      <p>
        Når radar, satellitt og numeriske modeller indikerer at været vil medføre samfunnsrisiko,
        utsteder Meteorologisk institutt offisielle farevarsler på Yr og Varsom.no i henhold til
        europeisk standard (Meteoalarm):
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3">
          <p className="font-semibold text-amber-600 dark:text-amber-400">Gult nivå – Moderat fare</p>
          <p className="mt-1 text-xs text-foreground/80">
            Uvanlige værforhold. Kan føre til lokale forstyrrelser i trafikk og transport. Vær
            oppmerksom.
          </p>
        </div>
        <div className="rounded-lg border border-orange-500/40 bg-orange-500/10 p-3">
          <p className="font-semibold text-orange-600 dark:text-orange-400">Oransje nivå – Stor fare</p>
          <p className="mt-1 text-xs text-foreground/80">
            Sjeldne og alvorlige værforhold. Fare for skader på infrastruktur og eiendom. Vær forberedt.
          </p>
        </div>
        <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3">
          <p className="font-semibold text-rose-600 dark:text-rose-400">Rødt nivå – Ekstrem fare</p>
          <p className="mt-1 text-xs text-foreground/80">
            Ekstremvær (f.eks. stormen «Ingunn» eller «Hans»). Omfattende ødeleggelser og fare for liv og
            helse. Følg myndighetenes råd.
          </p>
        </div>
      </div>

      {/* DIAGRAM 5: RADAR & SATELLITE NOWCASTING */}
      <div className="my-6">
        <RadarSatelliteNowcastingDiagram />
      </div>
    </section>
  );
}
