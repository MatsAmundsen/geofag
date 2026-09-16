import { JetFormsDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function ZonalOgMeridionalFormRossbybolge() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Zonal og meridional form: Rossbybølger og virvling
      </h2>
      <p>
        Jetstrømmen flyter aldri i en snorrett linje rundt jorden. Den bukter og slynger seg i enorme,
        kontinentstore bølger kalt <strong>Rossby-bølger</strong> (oppkalt etter den svensk-amerikanske
        meteorologen Carl-Gustaf Rossby). Det er formen på disse bølgene som avgjør om du må pakke
        paraply, solkrem eller dunjakke den neste uken.
      </p>

      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-sky-400">
            <span>➡️</span> Zonal strøm: Raskt vestavær
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Jetstrømmen blåser nesten snorrett fra vest mot øst, parallelt med breddegradene.
            Temperaturkontrasten er jevnt fordelt, og vestavindsbeltet er sterkt. Lavtrykkene langs
            polarfronten feier raskt over Atlanteren og inn mot Norge. Været er preget av hyppige
            skifter: regnvær etterfølges raskt av opphold, temperaturene er milde, og ingen værtype
            rekker å «låse seg fast».
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-amber-400">
            <span>〰️</span> Meridional strøm: Store bølger og værlås
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Jetstrømmen meandrerer i dype svinger nord–sør. Vinden frakter enorme luftmasser på
            tvers av breddegradene:
            <br />
            • <strong>Rygg (bølgetopp mot nord):</strong> Pumper varm subtropisk luft mot Arktis. Luften
            synker (subsidens), skyer fordamper og gir hetebølge og tørke.
            <br />
            • <strong>Tråg (bølgedal mot sør):</strong> Dumper iskald polarluft langt sørover. Luften
            stiger, skaper bygeskyer og gir ukelange kuldebølger.
          </p>
        </div>
      </div>

      <p>
        <strong>Hvorfor begynner jetstrømmen å svinge?</strong>
        Rossby-bølger drives av jordens krumning og rotasjon gjennom en fysisk lov som kalles{" "}
        <strong>bevaring av potensiell virvling (vorticity)</strong>:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Jordrotasjonens breddegradseffekt (Beta-effekten):</strong> Corioliskraften øker fra
          null ved ekvator til maksimum ved polene. Når en luftpakke beveger seg nordover, får den
          mer «spinn» fra jordkloden under seg. For å bevare sitt totale spinn må luften begynne å
          rotere motsatt vei (med klokken, antisyklonalt). Den tvinges derfor til å svinge mot høyre
          og sørover igjen – en rygg er født. Når den beveger seg sørover, skjer det motsatte: Den
          avbøyes mot venstre og nordover – et tråg dannes. Dette skaper en permanent bølgedynamikk!
        </li>
        <li>
          <strong>Fjellkjeder som bølgeutløsere:</strong> Når jetstrømmen treffer mektige fjellkjeder
          som Rocky Mountains i Nord-Amerika eller Andesfjellene i Sør-Amerika, presses luften opp og
          klemmes sammen. Dette tvinger frem et stående tråg på lesiden av fjellet, som forplanter
          seg som en bølgebevegelse hele veien over Atlanteren mot Norge.
        </li>
      </ul>

      <OrdBoks
        ord="Rossby-bølger"
        barn="Gigantiske planetære meandrerende bølger på jetstrømmen med bølgelengder på 4000–8000 km. Skapes av variasjon i Corioliskraft med breddegrad og store fjellbarrierer."
      />

      <JetFormsDiagram />
    </>
  );
}
