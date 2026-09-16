import { OrdBoks } from "@/components/term";

export function HvaEr() {
  return (
    <>
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er ENSO?
      </h2>
      <p>
        <strong>ENSO</strong> står for <em>El Niño–Southern Oscillation</em>{" "}
        (El Niño–Sørlige oscillasjon). Det er et koblet samspill mellom
        havoverflatetemperaturen i det tropiske Stillehavet og atmosfærens
        trykk- og vindmønstre (Philander, 1983). Svingningen er naturlig og
        syklisk, med en periodicitet på typisk 2–7 år.
      </p>
      <p>
        ENSO har tre tilstander — nøytral, El Niño og La Niña — som kan skilles
        fra hverandre ved å se på havtemperaturene i det sentrale og østlige
        tropiske Stillehavet. Passaten og termoklinen jager hverandre. Ingen av
        dem er startknappen alene.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Nøytral tilstand (normalen):</strong> Sterke passatvinder
          fra øst mot vest dytter varmt overflatevann vestover mot Indonesia og
          Australia.
        </li>
        <li>
          <strong>El Niño (varm fase):</strong> Passatvindene svekkes eller
          snur. Varmt overflatevann flyter østover mot Sør-Amerika. Termoklinen
          synker i øst, så oppvellingen henter lunkent vann.
        </li>
        <li>
          <strong>La Niña (kald fase):</strong> Passatvindene er unormalt
          sterke. Varmt vann presses ekstra langt vest, og kald oppvelling i øst
          dominerer enda mer enn normalt.
        </li>
      </ul>
      <OrdBoks
        ord="ENSO"
        barn="En naturlig og syklisk variasjon i havtemperatur og lufttrykk i det ekvatoriale Stillehavet, bestående av El Niño (varm fase), La Niña (kald fase) og nøytrale faser. Perioden er typisk 2–7 år."
      />
    </>
  );
}
