import { StationModelExplainedDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function WmoStasjonsmodellenSlikAvkoderDuO() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        4. WMO-stasjonsmodellen – Slik avkoder du observasjonene
      </h2>
      <p>
        På profesjonelle værkart fra MET Norway og WMO plasseres det en kompakt, standardisert
        figur over hver observasjonsstasjon. Denne kalles en <strong>stasjonsmodell</strong>{" "}
        (station plot). Figuren pakker en enorm mengde meteorologiske målinger inn på bare noen få
        kvadratmillimeter (WMO, 2021; NOAA, u.å.).
      </p>

      <OrdBoks
        ord="WMO-stasjonsmodell"
        barn="Et internasjonalt grafisk mønster av tall og symboler sentrert rundt en stasjonssirkel, som angir skydekke, vind, temperatur, duggpunkt, lufttrykk, trykktendens og nåværende værforhold."
      />

      {/* DIAGRAM 3: STATION MODEL EXPLAINED */}
      <div className="my-6">
        <StationModelExplainedDiagram />
      </div>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Nøkkelen til å avkode stasjonsmodellen trinn for trinn
      </h3>
      <div className="space-y-3 text-foreground/90">
        <div className="rounded-lg border border-border/70 bg-card/40 p-4">
          <h4 className="font-semibold text-foreground">1. Stasjonssirkelen (Skydekke i oktas)</h4>
          <p className="text-sm">
            Sirkelen i midten representerer selve stasjonen. Fyllingsgraden angir hvor stor andel av
            himmelen som er dekket av skyer, målt i <strong>oktas (åttendeler)</strong>:
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            <span className="rounded bg-muted/40 p-1.5 text-center">○ Helt åpen: 0/8 (Klarvær)</span>
            <span className="rounded bg-muted/40 p-1.5 text-center">◔ Kvart fylt: 2/8 (Lettskyet)</span>
            <span className="rounded bg-muted/40 p-1.5 text-center">◑ Halvfylt: 4/8 (Halvskyet)</span>
            <span className="rounded bg-muted/40 p-1.5 text-center">● Helt fylt: 8/8 (Overskyet)</span>
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-card/40 p-4">
          <h4 className="font-semibold text-foreground">2. Vindpil og vindflagg (Retning og styrke)</h4>
          <p className="text-sm">
            Linjen som stikker ut fra stasjonssirkelen er selve vindpilen. Den peker i retningen luften
            kommer <strong>fra</strong> (for eksempel peker en sørvestlig vind mot sørvest). Fjærene
            og vimplene i enden angir vindhastigheten i <strong>knop</strong> (1 knop ≈ 0,514 m/s):
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-foreground/80">
            <li><strong>Halv strek:</strong> 5 knop (ca. 2,5 m/s)</li>
            <li><strong>Hel strek:</strong> 10 knop (ca. 5,1 m/s)</li>
            <li><strong>Trekant / Vimpel:</strong> 50 knop (ca. 25,7 m/s – full storm)</li>
            <li>Eksempel: Én vimpel + to hele streker + én halv strek = 50 + 10 + 10 + 5 = <strong>75 knop (orkan)</strong>.</li>
          </ul>
        </div>

        <div className="rounded-lg border border-border/70 bg-card/40 p-4">
          <h4 className="font-semibold text-foreground">3. Temperatur og Duggpunkt (T og Td)</h4>
          <p className="text-sm">
            <strong>Øverst til venstre:</strong> Lufttemperatur i °C (f.eks. 14).<br />
            <strong>Nederst til venstre:</strong> Duggpunktstemperatur i °C (f.eks. 12).<br />
            Differansen mellom temperatur og duggpunkt kalles <em>duggpunktsdepresjonen</em>. Når
            differansen er 0 til 2 °C, er den relative fuktigheten over 90–95 %. Dette varsler tåke,
            lavt skydekke eller pågående kondensasjon.
          </p>
        </div>

        <div className="rounded-lg border border-border/70 bg-card/40 p-4">
          <h4 className="font-semibold text-rose-500 dark:text-rose-400">
            4. Den 3-sifrede trykkoden (Eksamensklassiker!)
          </h4>
          <p className="text-sm">
            Øverst til høyre på stasjonen står et tresifret tall, for eksempel <strong>138</strong>{" "}
            eller <strong>984</strong>. For å spare plass dropper meteorologer det innledende 9- eller
            10-tallet og desimalkommat.
          </p>
          <div className="mt-2 rounded bg-background/80 p-2.5 text-xs">
            <p className="font-mono font-bold text-primary">DEKODINGSREGELEN:</p>
            <p className="mt-1">
              • Hvis tallet er <strong>under 500</strong>: Sett et <strong>10</strong> foran, og sett
              komma foran siste siffer.
              <br />
              <em>Eksempel:</em> <strong>138</strong> &rarr; 10 + 13,8 = <strong>1013,8 hPa</strong>.{" "}
              <strong>024</strong> &rarr; 10 + 02,4 = <strong>1002,4 hPa</strong>.
            </p>
            <p className="mt-1">
              • Hvis tallet er <strong>500 eller høyere</strong>: Sett et <strong>9</strong> foran, og
              sett komma foran siste siffer.
              <br />
              <em>Eksempel:</em> <strong>984</strong> &rarr; 9 + 98,4 = <strong>998,4 hPa</strong>.{" "}
              <strong>862</strong> &rarr; 9 + 86,2 = <strong>986,2 hPa</strong>.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-card/40 p-4">
          <h4 className="font-semibold text-foreground">5. Trykktendens (pp og symbol)</h4>
          <p className="text-sm">
            Nederst til høyre står trykkendringen de siste <strong>3 timene</strong> i tiendedels hPa,
            etterfulgt av en liten kurve.
            <br />
            <em>Eksempel:</em> <strong>-32 &#92;</strong> betyr at trykket har falt med 3,2 hPa de siste 3
            timene med en jevnt fallende kurve. Et trykkfall på over 3 hPa på 3 timer regnes som et
            sikkert tegn på en nært forestående front eller et hissig lavtrykk.
          </p>
        </div>
      </div>
    </section>
  );
}
