import { useId, useState } from "react";
import { Diagram, C, L } from "@/components/diagrams/svg-kit";
import { Skjema } from "./skjulte-skjema";
function Punkter({ gps = false }: { gps?: boolean }) {
  return (
    <Diagram
      heading={
        gps ? "Figur 2.5 – Planlagte punkter, ikke et GPS-spor" : "Figur 2.0 – Planlegg et utvalg"
      }
      title="Skjematisk område med tre planlagte stasjoner A, B og C"
      caption="Egen kvalitativ planleggingsmodell uten et virkelig sted, koordinater eller observasjoner. Punktene er forslag til utvalgsdesign, ikke registrerte besøk. Begrunn hvilke omgivelser som skal representeres. Private posisjoner skal ikke samles inn (RGS, u.å.-a; Kartverket, 2023)."
      viewBox="0 0 800 260"
      wide
      scroll
    >
      {() => (
        <>
          <rect x="40" y="30" width="720" height="190" rx="15" fill={C.bg} stroke={C.dim} />
          {gps && (
            <path
              d="M160 140 L400 100 L640 155"
              stroke={C.teal}
              fill="none"
              strokeWidth="3"
              strokeDasharray="8 6"
            />
          )}
          {[
            [160, 140, "A"],
            [400, 100, "B"],
            [640, 155, "C"],
          ].map(([x, y, t]) => (
            <g key={t}>
              <circle cx={x} cy={y} r="18" fill={C.teal} />
              <L x={x} y={Number(y) - 30} anchor="middle">
                {t}
              </L>
            </g>
          ))}
          <L x="400" y="248" anchor="middle" size={14}>
            {gps
              ? "Stiplet linje: planlagt rekkefølge, ikke målt rute"
              : "Ingen skala eller geografisk retning er angitt."}
          </L>
        </>
      )}
    </Diagram>
  );
}
export function GeografiUtvalg() {
  return <Punkter />;
}
export function GeografiMaalepunkter() {
  return <Punkter gps />;
}
export function GeografiFeltprosess() {
  return (
    <Skjema
      heading="Figur 2.1 – Fra spørsmål til ny vurdering"
      caption="Egen prosessmodell. Vurder metode og sikkerhet underveis, og gå tilbake til planen hvis forholdene endrer seg (RGS, u.å.-a, u.å.-c)."
      ledd={[
        ["Planlegge →", "Spørsmål, utvalg, metode, tillatelser og ansvar."],
        ["Samle →", "Noter observasjoner med tid, enhet og metode."],
        ["Bearbeide →", "Kontroller data og behold dokumenterte mangler."],
        ["Presentere →", "Velg tabell, diagram eller kart etter spørsmålet."],
        ["Vurdere ↩", "Hva støttes, hvilke feilkilder gjenstår, og hva bør endres?"],
      ]}
    />
  );
}
export function GeografiPlanmal() {
  const id = useId();
  return (
    <figure className="my-8 rounded-xl border p-5">
      <h3 className="text-xl font-semibold">Figur 2.2 – Planen før feltarbeidet</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          "Problemstilling",
          "Utvalg og avgrensning",
          "Metode og utstyr",
          "Tid og ansvar",
          "Samtykke og personvern",
          "Risiko og avbruddskriterier",
        ].map((t, i) => (
          <label key={t} htmlFor={`${id}-${i}`}>
            {t}
            <textarea
              id={`${id}-${i}`}
              maxLength={600}
              className="block w-full rounded border bg-background p-2"
            />
          </label>
        ))}
      </div>
      <figcaption className="mt-4 text-sm text-muted-foreground">
        Egen visuell arbeidsmal. Feltene er tomme og lagres ikke av siden. Ikke skriv navn, private
        adresser eller sensitive opplysninger. Bruk CSV-malen i teksten hvis dere trenger en lokal
        kopi. Planen må avklares med læreren (RGS, u.å.-a, u.å.-c; FEK, 2019).
      </figcaption>
    </figure>
  );
}
export function GeografiMetodevalg() {
  return (
    <Skjema
      heading="Figur 2.3 – Hva vil dere registrere?"
      caption="Egen metodeoversikt, ikke feltdata. Velg metode etter problemstillingen og dokumenter usikkerheten (RGS, u.å.-a; Johannessen & Grønmo, 2026)."
      ledd={[
        ["Observasjon", "Beskriv det dere ser, og skill det fra tolkningen."],
        ["Telling", "Avgrens kategori, område og tidsrom."],
        ["Måling", "Oppgi instrument, enhet og framgangsmåte."],
        ["Intervju", "Frivillighet og samtykke før registrering."],
        ["Foto", "Dokumenter motiv og dato, unngå gjenkjennelige personer."],
        ["Posisjon", "Oppgi koordinatsystem. Ikke publiser private posisjoner."],
      ]}
    />
  );
}
export function GeografiFeilkilder() {
  return (
    <Skjema
      heading="Figur 2.8 – Fra feilkilde til forbedring"
      caption="Egen begrepsmodell med tiltak, ikke en beregnet kvalitets- eller sikkerhetsskår (Grønmo, 2024, 2025; Svartdal, 2025)."
      ledd={[
        [
          "Utvalg → flere relevante omgivelser",
          "Er stasjonene relevante for spørsmålet, eller mangler viktige typer steder?",
        ],
        [
          "Instrument → kontroll og lik metode",
          "Gjentatte målinger kan undersøke pålitelighet, men fjerner ikke systematisk feil.",
        ],
        ["Tid og vær → sammenliknbare forhold", "Samtidighet og metode må dokumenteres."],
        [
          "Tolkning → avgrens konklusjonen",
          "Reliabilitet handler om pålitelighet. Validitet handler om dere undersøker det dere vil undersøke.",
        ],
      ]}
    />
  );
}
export function GeografiFeltetikk() {
  return (
    <Skjema
      heading="Figur 2.6 – Stoppunkter før og under feltarbeidet"
      caption="Egen sikkerhets- og etikkmodell uten automatisk godkjenning. Læreren må vurdere planen, og endrede forhold krever ny vurdering (RGS, u.å.-c; FEK, 2019; Datatilsynet, 2020)."
      ledd={[
        ["Før avreise", "Avklar ansvar, fare, tiltak og avbruddskriterier."],
        ["Før registrering", "Avklar tillatelse og frivillig samtykke. Unngå personopplysninger."],
        ["Når forholdene endres", "Stans den berørte delen og kontakt ansvarlig lærer."],
        [
          "Før presentasjon",
          "Kontroller anonymitet, kilder og hva dere faktisk har grunnlag for å hevde.",
        ],
      ]}
    />
  );
}
function EgenSammenlikning({ mikro = false }: { mikro?: boolean }) {
  const id = useId();
  const [verdier, setVerdier] = useState<string[]>(Array(6).fill(""));
  const ok = verdier.every((v) => v.trim() !== "" && Number.isFinite(Number(v.replace(",", "."))));
  const tall = verdier.map((v) => Number(v.replace(",", ".")));
  const mean = (offset: number) => tall.slice(offset, offset + 3).reduce((a, b) => a + b, 0) / 3;
  const a = ok ? mean(0) : null,
    b = ok ? mean(3) : null;
  const delta = a !== null && b !== null ? b - a : null;
  const fmt = (v: number) => v.toLocaleString("nb-NO", { maximumFractionDigits: 2 });
  return (
    <figure aria-labelledby={id} className="my-8 space-y-4 rounded-xl border p-5">
      <h3 id={id} className="text-xl font-semibold">
        {mikro
          ? "Figur 2.9 – Undersøk egne mikroklimadata"
          : "Figur 2.7 – Fra egen feltlogg til sammenlikning"}
      </h3>
      <p>
        Ingen verdier er forhåndsutfylt. Registrer tre egne temperaturmålinger fra hver av to
        stedkoder, med samme instrument og sammenliknbar metode. Noter tid, forhold og feilkilder i
        feltloggen. Ikke skriv private adresser. Alt finnes bare i minnet på denne siden.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {["A", "B"].map((kode, j) => (
          <fieldset key={kode} className="space-y-2 rounded border p-3">
            <legend>Stedkode {kode}</legend>
            {[0, 1, 2].map((i) => (
              <label key={i} className="block" htmlFor={`${id}-${j}-${i}`}>
                Måling {i + 1}, °C
                <input
                  id={`${id}-${j}-${i}`}
                  inputMode="decimal"
                  maxLength={12}
                  className="ml-2 w-24 rounded border bg-background p-2"
                  value={verdier[j * 3 + i]}
                  onChange={(ev) =>
                    setVerdier(verdier.map((v, k) => (k === j * 3 + i ? ev.target.value : v)))
                  }
                />
              </label>
            ))}
          </fieldset>
        ))}
      </div>
      <div role="status" aria-live="polite">
        {ok && a !== null && b !== null && delta !== null ? (
          <>
            <table className="w-full text-left">
              <caption>Gjennomsnitt beregnet av dine registreringer</caption>
              <thead>
                <tr>
                  <th scope="col">Stedkode</th>
                  <th scope="col">Gjennomsnitt, °C</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">A</th>
                  <td>{fmt(a)}</td>
                </tr>
                <tr>
                  <th scope="row">B</th>
                  <td>{fmt(b)}</td>
                </tr>
              </tbody>
            </table>
            <p>
              Forskjell B minus A: {fmt(delta)} °C. Forskjellen dokumenterer ikke alene en årsak.
            </p>
          </>
        ) : (
          <p>Fyll alle feltene med gyldige målinger. Tomme felt regnes ikke som null.</p>
        )}
      </div>
      {ok && a !== null && b !== null && (
        <svg
          viewBox="0 0 600 180"
          role="img"
          aria-label={`Gjennomsnitt A ${fmt(a)} og B ${fmt(b)} grader Celsius. Forskjellen kan også leses i tabellen.`}
          className="w-full"
        >
          <line x1="60" x2="540" y1="140" y2="140" stroke="currentColor" />
          {[a, b].map((v, i) => {
            const min = Math.min(a, b) - 1,
              max = Math.max(a, b) + 1,
              y = 130 - (100 * (v - min)) / (max - min);
            return (
              <g key={i}>
                <circle cx={180 + i * 240} cy={y} r="8" fill="#0f766e" />
                <text x={180 + i * 240} y={y - 16} fill="currentColor" textAnchor="middle">
                  {fmt(v)} °C
                </text>
                <text x={180 + i * 240} y="165" fill="currentColor" textAnchor="middle">
                  Stedkode {i === 0 ? "A" : "B"}
                </text>
              </g>
            );
          })}
        </svg>
      )}
      <button
        type="button"
        className="rounded border px-4 py-2"
        onClick={() => setVerdier(Array(6).fill(""))}
      >
        Tøm egne målinger
      </button>
      <figcaption className="text-sm text-muted-foreground">
        Egen arbeidsmodell, ikke et kontrollert observasjonsdatasett. Gjennomsnitt er summen delt på
        antall målinger. Punktplasseringen er tilpasset registreringene, og verdiene er skrevet ut.
        Ingen GPS, nettverkslagring eller automatisk sikkerhetsskår. Vurder metode og alternative
        forklaringer (RGS, u.å.-a; Grønmo, 2024, 2025).
      </figcaption>
    </figure>
  );
}
export function GeografiFeltBearbeiding() {
  return <EgenSammenlikning />;
}
export function GeografiMikroklimaEget() {
  return <EgenSammenlikning mikro />;
}
