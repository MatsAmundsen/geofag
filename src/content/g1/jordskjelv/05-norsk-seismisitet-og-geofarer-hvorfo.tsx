import { Callout } from "@/components/callout";
import { NorwayEarthquakesDiagram } from "@/components/diagrams";

export function NorskSeismisitetOgGeofarerHvorfo() {
  return (
    <>
      {/* SEKSJON 5: NORSK SEISMISITET */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Norsk seismisitet og geofarer: Hvorfor skjelver Norge?
        </h2>
        <p>
          Mange tror at Norge er fullstendig skjermet mot jordskjelv fordi vi ligger langt inne på den eurasiske kontinentalplaten.
          Det stemmer at Norge er et <em>intraplate-område</em> uten aktive subduksjonssoner. Likevel er Norge blant de{" "}
          <strong>mest seismisk aktive områdene i hele Nord-Europa</strong>!
        </p>

        <Callout title="Seismisk fare vs. seismisk risiko">
          <p>
            Det er viktig å skille mellom to begreper i LK20-kompetansemålene om naturfarer:
          </p>
          <ul className="mt-2 space-y-1 text-sm list-disc pl-4">
            <li>
              <strong>Seismisk fare</strong> er den fysiske hendelsen — styrken og hyppigheten av jordskjelv i et område.
              Norge har moderat fare, særlig langs kysten og i Oslofjordområdet.
            </li>
            <li>
              <strong>Seismisk risiko</strong> = fare × sårbarhet × eksponering. Et kraftig skjelv i et øde fjellstrøk
              er høy fare, men lav risiko. Et svakt skjelv under Oslo med gammel bygningsmasse er lav fare, men høy risiko.
            </li>
          </ul>
        </Callout>

        <NorwayEarthquakesDiagram />

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          To dominerende spenningskilder i norsk jordskorpe
        </h3>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Ryggtrykk («Ridge push»):</strong> Den midtatlantiske ryggen i vest utvider seg
            kontinuerlig med 2–2,5 cm per år. Den gravitasjonelle tyngden av ryggen presser det eurasiske kontinentet østover
            og setter den norske kontinentalskorpen under et regionalt, nordvest–sørøst-rettet kompresjonstrykk.
          </li>
          <li>
            <strong className="text-foreground">Postglasial landheving (isostasi):</strong> Under siste istid (Weichsel) var
            Skandinavia tynget ned av en opptil 3 kilometer tykk iskappe. Da isen smeltet for 10 000 år siden, begynte jordskorpen
            å heve seg elastisk og viskøst tilbake mot isostatisk likevekt. Innlandet hever seg fortsatt med opptil 8–9 mm per år
            rundt Bottenviken. Denne skjeve hevingen reaktiverer eldgamle svakhetssoner i fjellet.
          </li>
        </ol>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Historiske kjempeskjelv i Norge
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong className="text-foreground">Lurøyskjelvet 31. august 1819 (M ≈ 5,8):</strong> Det største kjente jordskjelvet
              i Nord-Europa i historisk tid. Episenteret lå på Helgelandskysten i Nordland. Rystelsene forårsaket store fjellskred,
              jordlikvifaksjon og ble merket til Stockholm og Kola.
            </li>
            <li>
              <strong className="text-foreground">Oslofjordskjelvet 23. oktober 1904 (M 5,4):</strong> Det største skjelvet i moderne
              tid på Østlandet. Episenteret lå i Skagerrak/Kattegat, ca. 25 km sør for Hvaler. Ble følt over 800 000 km²
              (Bungum et al., 2009).
            </li>
            <li>
              <strong className="text-foreground">Storfjordskjelvet på Svalbard 21. februar 2008 (M_w 6,0):</strong> Det kraftigste
              instrumentelt registrerte jordskjelvet på norsk territorium i moderne tid.
            </li>
          </ul>
        </div>
      </section>

    </>
  );
}
