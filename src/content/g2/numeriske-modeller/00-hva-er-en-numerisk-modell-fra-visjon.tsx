import { OrdBoks } from "@/components/term";

export function HvaErEnNumeriskModellFraVisjon() {
  return (
    <>
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er en numerisk modell? Fra Bjerknes' visjon til superdatamaskiner
      </h2>
      <p>
        En <strong>numerisk modell</strong> er en matematisk representasjon av et jordsystem kjørt på en
        datamaskin. Atmosfæren, verdenshavene og biosfæren deles inn i milliarder av små
        beregningsvolumer, og superdatamaskinen regner ut hvordan luft- og vannmassene beveger seg,
        sekund for sekund, basert på klassisk mekanikk og termodynamikk (ECMWF, u.å.).
      </p>
      <p>
        Idéen om å beregne været ved hjelp av matematikk ble unnfanget av den norske fysikeren og
        meteorologen <strong>Vilhelm Bjerknes i 1904</strong> (Bjerknes, 1904). Bjerknes formulerte
        det som senere er blitt stående som meteorologiens hellige gral:
      </p>
      <blockquote className="my-3 rounded-lg border-l-4 border-sky-500 bg-sky-950/30 p-4 italic text-foreground/90">
        «Hvis vi kjenner atmosfærens nøyaktige starttilstand på et gitt tidspunkt, og vi kjenner de
        fysiske lovene som styrer luftmassene, er fremtidig vær et deterministisk matematisk problem
        som kan løses entydig.»
      </blockquote>
      <p>
        Bjerknes innså imidlertid at ligningene var altfor kompliserte til å kunne løses med penn og
        papir i sanntid. Under første verdenskrig tok den britiske matematikeren{" "}
        <strong>Lewis Fry Richardson (1922)</strong> utfordringen videre mens han kjørte ambulanse
        ved vestfronten. Richardson delte Sentral-Europa inn i et rutenett og regnet for hånd ut et
        sekstimers værvarsel. Beregningen tok ham hele to år å gjennomføre, og varselet spådde et
        katastrofalt feilaktig trykkfall på 145 hPa – et trykkfall som aldri fant sted! Feilen
        skyldtes manglende filtrering av støy i startobservasjonene (Richardson, 1922).
      </p>
      <p>
        Richardson drømte om en «værfabrikk»: et gigantisk sirkelrundt teater fylt med{" "}
        <strong>64 000 menneskelige regnere</strong>, dirigert av en leder i midten med fargede
        lyssignaler for å holde tritt med det faktiske været. Først med oppfinnelsen av den
        elektroniske datamaskinen <em>ENIAC</em> i 1950, ledet av Jule Charney, Ragnar Fjørtoft og John
        von Neumann, ble Richardsons visjon realisert. I dag kjører Meteorologisk institutt og det
        europeiske værsenteret ECMWF enorme superdatamaskiner med hundretusenvis av prosessorkjerner
        som utfører titalls billiarder regneoperasjoner per sekund (petaflops).
      </p>

      <OrdBoks
        ord="Numerisk modell"
        barn="En datamodell som simulerer atmosfæren, havet eller klimasystemet ved å løse de fysiske bevaringsligningene trinnvis i tid over et tredimensjonalt rutenett."
      />
    </>
  );
}
