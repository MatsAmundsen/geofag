"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Callout } from "@/components/callout";
import { PhotoFigure } from "@/components/photo-figure";

export function AaretElNino() {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-6 rounded-xl border border-primary/30 bg-primary/5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span className="inline-flex size-2 animate-pulse rounded-full bg-primary" />
          <span className="font-display text-lg font-medium tracking-tight text-primary">
            Årets El Niño — Supersvingningen 2023–2026
          </span>
        </span>
        {open ? (
          <ChevronUp className="size-5 shrink-0 text-primary" />
        ) : (
          <ChevronDown className="size-5 shrink-0 text-primary" />
        )}
      </button>

      {open && (
        <div className="space-y-5 border-t border-primary/20 px-5 py-5 text-sm leading-relaxed text-foreground/90">
          {/* Intro */}
          <p>
            El Niño-episoden som startet sommeren 2023 og nådde sin topp
            vinteren 2023/24 regnes av klimaforskere som en av de fem
            kraftigste i målingshistorien siden 1950. Det som gjør den
            spesielt alvorlig, er ikke bare dens egen styrke — men tidspunktet
            den opptrer på og menneskene den treffer.
          </p>

          {/* Hvorfor spesiell */}
          <div>
            <h3 className="mb-2 font-display text-base font-semibold tracking-tight text-primary">
              Hvorfor er denne El Niño spesiell?
            </h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Kraftmultiplikator på toppen av klimaendringer:</strong>{" "}
                El Niño 2023/24 inntraff mot et bakteppe av rekordhøye
                havoverflatetemperaturer i alle verdenshav — ikke bare i
                tropisk Stillehav. Den fungerte som en «kraftmultiplikator»
                som løftet en allerede varm klode ytterligere.
              </li>
              <li>
                <strong>Brøt 1,5 °C-terskelen:</strong> EUs klimatjeneste
                Copernicus (C3S) bekreftet at 2024 ble det varmeste året
                noensinne målt — og det første enkeltåret der den globale
                gjennomsnittstemperaturen overskred <strong>1,5 °C</strong>{" "}
                over førindustriell tid. Dette er grensen Parisavtalen satte
                som øvre ambisjon.
              </li>
              <li>
                <strong>Kom etter en sjelden tre-årig La Niña:</strong> Mellom
                2020 og tidlig 2023 pågikk en historisk «triple-dip»
                La Niña. De sterke passatvindene pumpet enorme mengder varme
                dypt ned i havet. Da vindene sviktet i 2023, veltet denne
                akkumulerte varmeenergien opp til overflaten via gigantiske
                Kelvin-bølger.
              </li>
              <li>
                <strong>Historiens fjerde globale korallbleking:</strong> De
                ekstremt høye havtemperaturene utløste i april 2024 historiens
                fjerde globale massebleking av koraller (NOAA / ICRI). Over{" "}
                <strong>80 % av verdens korallrevområder</strong> — fra
                Great Barrier Reef og Rødehavet til Karibia — opplevde
                dødelig varmestress.
              </li>
              <li>
                <strong>Rekordintensifisering av orkaner:</strong> Varmt
                overflatevann ga næring til lynrask orkanutvikling.{" "}
                <strong>Orkanen Otis</strong> (oktober 2023) gikk fra tropisk
                storm til kategori 5 på under 24 timer og rammet den meksikanske
                storbyen Acapulco med vind opp mot 270 km/t.
              </li>
            </ul>
          </div>

          {/* Globale temperaturer */}
          <div>
            <h3 className="mb-2 font-display text-base font-semibold tracking-tight text-primary">
              Globale klimakonsekvenser
            </h3>
            <p>
              Det enorme Stillehavet frigjorde ekstreme mengder lagret varme
              til troposfæren. Selv etter at El Niño svekket seg, forble
              atmosfæren overopphetet i seks til tolv måneder — en forsinkelse
              som skyldtes havets termiske treghet. FN, WMO og Copernicus
              dokumenterer at kloden har gått inn i et nytt temperaturnivå.
            </p>
          </div>

          {/* Hardest rammede steder */}
          <div>
            <h3 className="mb-2 font-display text-base font-semibold tracking-tight text-primary">
              Steder som ble hardest rammet
            </h3>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <p className="font-semibold">
                  🌊 Amazonas-bassenget — Historisk tørke
                </p>
                <p className="mt-1 text-xs text-foreground/75">
                  I oktober 2023 sank Rio Negro ved Manaus til{" "}
                  <strong>12,70 meter</strong> — den laveste vannstanden
                  siden målingene startet i 1902. I innsjøen Lake Tefé steg
                  temperaturen til <strong>39,1 °C</strong> og forårsaket
                  massedød av over 150 truede Amazonas-elvedelfiner.
                  Hundrevis av elvesamfunn ble fullstendig isolert.
                </p>
              </div>

              <PhotoFigure
                src="/images/fig-enso-amazonas-torke.jpg"
                alt="Flyfoto av ekstremtørken i Amazonas og Rio Negro 2023/24 med tørrlagte elveleier og strandede båter"
                heading="Ekstremtørken i Amazonas under El Niño 2023/24"
                caption="El Niño forskyver konveksjon og nedbør ut i Stillehavet, noe som kveler nedbøren over Amazonasregnskogen. I 2023/24 falt Rio Negro til sitt laveste nivå på 122 år, og store sandbanker og strandede elvebåter preget elvesystemet ved Manaus."
                fit="contain"
                points={[
                  {
                    n: "1",
                    label:
                      "Rio Negro sank til 12,70 m ved Manaus i oktober 2023 (laveste måling siden 1902).",
                  },
                  {
                    n: "2",
                    label:
                      "Tørrlagte elveløp kuttet all båttransport og isolerte titusenvis av elveboere.",
                  },
                  {
                    n: "3",
                    label:
                      "Vanntemperaturen i Lake Tefé nådde 39,1 °C og utløste massedød av ferskvannsdelfiner.",
                  },
                ]}
              />
              <div className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <p className="font-semibold">
                  🌍 Sørlige Afrika — Den verste tørken på 100 år
                </p>
                <p className="mt-1 text-xs text-foreground/75">
                  Regnsesongen 2023/24 var den tørreste på over et århundre
                  i Zambia, Zimbabwe, Malawi, Botswana, Angola og Namibia.
                  Over <strong>61 millioner mennesker</strong> havnet i akutt
                  matmangel; 6 nasjoner erklærte katastrofetilstand.
                  Kariba-demningen — verdens største menneskeskapte reservoar
                  — falt så lavt at det førte til over 21 timers daglige
                  strømutkoblinger.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <p className="font-semibold">
                  🌧️ Øst-Afrika — Katastrofale flommer
                </p>
                <p className="mt-1 text-xs text-foreground/75">
                  Når El Niño sammenfalt med en positiv{" "}
                  <strong>indisk hav-dipol (IOD)</strong> sent i 2023 og
                  inn i 2024, ble Kenya, Somalia og Etiopia truffet av
                  voldsomt regn, jordskred og demningsbrudd. Hundrevis omkom
                  og over en halv million mennesker ble fordrevet.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <p className="font-semibold">
                  🇧🇷 Sør-Brasil (Rio Grande do Sul) — Brasils verste
                  naturkatastrofe
                </p>
                <p className="mt-1 text-xs text-foreground/75">
                  I april–mai 2024 blokkerte El Niño en fuktig lavtrykkscelle
                  over sørlige Brasil og slapp månedsmengder med regn på få
                  dager. Porto Alegres flyplass sto under vann. Over 180
                  mistet livet og mer enn <strong>500 000 mennesker</strong>{" "}
                  ble evakuert — Brasils verste naturkatastrofe i moderne tid.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <p className="font-semibold">
                  ⚓ Panamakanalen — Krise i verdenshandelen
                </p>
                <p className="mt-1 text-xs text-foreground/75">
                  El Niño-tørken tappet innsjøene Gatún og Alhajuela som
                  forsyner kanalens sluser. Panama Canal Authority reduserte
                  daglige skipspasseringer med nesten{" "}
                  <strong>40 %</strong>. Hundrevis av containerskip ble stående
                  i kø eller måtte ta den lange omveien rundt Kapp Horn,
                  med forsinkelser og prisøkninger i global handel.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <p className="font-semibold">
                  🌡️ Sørøst-Asia og India — Hetebølger og risikrise
                </p>
                <p className="mt-1 text-xs text-foreground/75">
                  Temperaturer over <strong>45 °C</strong> stengte skoler i
                  ukevis i Thailand, Filippinene, Vietnam og India. India
                  innførte riseksportforbud for å sikre egen befolkning,
                  noe som drev de globale matvareprisene opp.
                </p>
              </div>
            </div>
          </div>

          {/* Pågående 2026 */}
          <div>
            <h3 className="mb-2 font-display text-base font-semibold tracking-tight text-primary">
              Hva skjer i 2026?
            </h3>
            <p>
              Etter en kort nøytral fase og svak La Niña i 2024–2025 viser
              klimamodellene at et nytt, usedvanlig sterkt El Niño-signal er
              under oppbygging i Stillehavet (WMO / NOAA, 2026). Det forventes
              å nå toppen mot slutten av 2026 og kan bli blant de kraftigste
              som er målt. Havets akkumulerte varmeinnhold er ekstremt høyt
              etter den forutgående La Niña-perioden, og en ny Kelvin-bølge er
              allerede detektert av Copernicus Marine Service.
            </p>
            <p className="mt-2">
              Klimaforskere peker på at hver nye El Niño-episode nå opererer i
              et klimasystem som er <em>strukturelt varmere</em> enn ved
              forrige episode — slik at selv en «gjennomsnittlig» El Niño gir
              mer ekstreme konsekvenser enn tilsvarende hendelser for 30 år
              siden.
            </p>
          </div>

          {/* Koblingen til fagstoffet */}
          <Callout title="Kobling til fagstoffet">
            <p>
              2023/24-episoden illustrerer alle kjerneprinsippene i dette
              kapittelet:{" "}
              <strong>Bjerknes-tilbakekoblingen</strong> forsterket svingningen
              da passatene sviktet.{" "}
              <strong>Kelvin-bølger</strong> varslet endringen måneder i
              forveien. <strong>Telekoblinger via Rossby-bølger</strong>{" "}
              forplantet effektene fra Amazonas til Kenya, fra Panamakanalen
              til Brasils sørligste delstat.
            </p>
            <p>
              Den positive{" "}
              <strong>
                IOD (indisk hav-dipol)
              </strong>{" "}
              som sammenfalt med El Niño i 2023 forsterket tørken i Indonesia
              og flommene i Øst-Afrika — et lærebokeksempel på simultant
              samspill mellom klimamoduser.
            </p>
          </Callout>
        </div>
      )}
    </div>
  );
}
