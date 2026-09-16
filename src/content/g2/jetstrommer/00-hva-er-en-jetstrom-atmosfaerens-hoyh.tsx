import { OrdBoks } from "@/components/term";

export function HvaErEnJetstromAtmosfaerensHoyh() {
  return (
    <>
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er en jetstrøm? Atmosfærens høyhastighetselver
      </h2>
      <p>
        Mens de store vindbeltene ved bakken (som passatene og vestavindsbeltet) strekker seg over
        flere tusen kilometer i bredden, er en <strong>jetstrøm</strong> et konsentrert, relativt
        smalt og flattrykt bånd av ekstrem vestavind like under tropopausen (NOAA, u.å.-a).
      </p>
      <p>
        Tenk deg en brusende elv i luften: Tverrsnittet er typisk 200 til 500 kilometer bredt og bare
        2 til 4 kilometer tykt, men elven kan strekke seg sammenhengende over mange tusen kilometer
        rundt hele kloden. Vindhastigheten er aller størst i en trang kjerne i midten, og avtar
        raskt ut mot sidene og i vertikal retning:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Typisk marsjhastighet:</strong> Vinden i kjernen ligger vanligvis mellom{" "}
          <strong>150 og 250 km/t</strong> (40–70 m/s).
        </li>
        <li>
          <strong>Ekstreme vinterkjerner:</strong> Når temperaturkontrasten mellom polisen og
          tropene er på sitt skarpeste midtvinters, kan vindfarten over Japan og Nord-Atlanteren
          passere <strong>400–450 km/t</strong> (&gt;120 m/s) – raskere enn et japansk Shinkansen-lyntog!
        </li>
        <li>
          <strong>Vestavindsretning:</strong> På begge halvkuler blåser jetstrømmene nesten alltid{" "}
          <strong>fra vest mot øst</strong>. Dette skyldes at trykkgradienten i høyden peker mot
          polene, mens Corioliskraften avbøyer luftstrømmen mot øst.
        </li>
      </ul>

      <OrdBoks
        ord="Jetstrøm"
        barn="Et smalt, rørformet belte med ekstrem vestavind i øvre troposfære (typisk 8–16 km høyde). Dannes over kollisjonssoner mellom luftmasser med ulik temperatur."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Oppdagelsen og moderne luftfart
      </h3>
      <p>
        Jetstrømmene ble først systematisk kartlagt på 1920-tallet av den japanske meteorologen
        Wasaburo Oishi, som slapp opp pilotballonger nær Fuji-fjellet. Men fenomenet ble verdenskjent
        under andre verdenskrig: Da amerikanske B-29 bombefly skulle fly vestover mot Japan i 10
        kilometers høyde, opplevde pilotene at flyene nærmest sto stille i forhold til bakken. De
        hadde fløyet rett inn i en motvind på over 250 km/t som ingen inntil da visste eksisterte.
      </p>
      <p>
        I dag er internasjonal luftfart helt avhengig av å navigere etter jetstrømmen:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Flytid og drivstoff:</strong> Et rutefly fra New York til Oslo flyr med
          polarfrontjeten i ryggen. Medvinden kan kutte flytiden med over én time sammenlignet med
          turen vestover mot New York, og flyselskapene sparer tusenvis av liter flybensin. Ruteplanleggere
          oppdaterer flyrutene daglig for å legge kursen midt i jetkjernen østover, og svinge utenom
          den vestover.
        </li>
        <li>
          <strong>Klarværsturbulens (CAT):</strong> I randsonene til jetstrømmen endrer vindhastigheten
          seg voldsomt over bare noen få meters avstand (kraftig <em>vindskjæring</em>). Dette skaper
          kaotiske, usynlige virvler i luften. Siden luften her oppe er knusktørr, finnes det ingen
          skyer som advarer pilotene. Dette kalles <strong>klarværsturbulens</strong> (Clear Air
          Turbulence) og er den vanligste årsaken til uventede risting og skader på passasjerer i
          marsjhøyde.
        </li>
        <li>
          <strong>Cirrusstriper – jetens fingeravtrykk på himmelen:</strong> Selv om luften i
          jetstrømmen er usynlig, kan du ofte observere den fra bakken. Når fuktighet kastes opp i
          jeten, trekkes iskrystallene i fjærsyene (<em>Cirrus</em>) ut i lange, snorrette parallelle
          striper over himmelen. Ser du slike striper fare over himmelen mens det er vindstille nede
          på bakken, ser du jetstrømmen i aksjon 10 kilometer over deg.
        </li>
      </ul>

      <OrdBoks
        ord="Klarværsturbulens (CAT)"
        barn="Plutselig, kraftig turbulens i skyfri luft forårsaket av ekstrem horisontal eller vertikal vindskjæring i randsonen til en jetstrøm."
      />
    </>
  );
}
