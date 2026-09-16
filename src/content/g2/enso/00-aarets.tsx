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
        {open ? <ChevronUp className="size-5 shrink-0 text-primary" /> : <ChevronDown className="size-5 shrink-0 text-primary" />}
      </button>

      {open && (
        <div className="space-y-5 border-t border-primary/20 px-5 py-5 text-sm leading-relaxed text-foreground/90">
          <p>
            El Niño-episoden som startet sommeren 2023 og nådde toppen vinteren 2023/24 regnes som en av de fem kraftigste siden 1950. Det som gjør den spesielt alvorlig, er tidspunktet og bakgrunnen den treffer.
          </p>

          <div>
            <h3 className="mb-2 font-display text-base font-semibold tracking-tight text-primary">Hvorfor er denne El Niño spesiell?</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong>Kraftmultiplikator på toppen av klimaendringer:</strong> Inntraff mot rekordhøye SST i alle verdenshav, ikke bare tropisk Stillehav.</li>
              <li><strong>Brøt 1,5 °C-terskelen:</strong> Copernicus C3S: 2024 ble det varmeste året målt — første enkeltår over 1,5 °C over førindustriell tid.</li>
              <li><strong>Etter triple-dip La Niña 2020–23:</strong> Sterke passater pumpet varme ned i havet. Da vindene sviktet, veltet energien opp via Kelvin-bølger.</li>
              <li><strong>Fjerde globale korallbleking:</strong> April 2024 (NOAA/ICRI). Over 80 % av verdens korallrevområder opplevde dødelig varmestress.</li>
              <li><strong>Rekordintensifisering av orkaner:</strong> Otis (oktober 2023) gikk fra tropisk storm til kategori 5 på under 24 timer og rammet Acapulco med ~270 km/t.</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-display text-base font-semibold tracking-tight text-primary">Globale klimakonsekvenser</h3>
            <p>
              Stillehavet frigjorde ekstremt mye lagret varme. Selv etter at El Niño svekket seg, forble atmosfæren overopphetet i 6–12 måneder på grunn av havets termiske treghet. FN, WMO og Copernicus dokumenterer et nytt temperaturnivå.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-display text-base font-semibold tracking-tight text-primary">Steder som ble hardest rammet</h3>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <p className="font-semibold">Amazonas — historisk tørke</p>
                <p className="mt-1 text-xs text-foreground/75">
                  Rio Negro ved Manaus sank til <strong>12,70 m</strong> i oktober 2023 — laveste siden 1902. Lake Tefé nådde <strong>39,1 °C</strong> og over 150 Amazonas-elvedelfiner døde. Hundrevis av elvesamfunn ble isolert.
                </p>
              </div>
              <PhotoFigure
                src="/images/fig-enso-amazonas-torke.jpg"
                alt="Ekstremtørke i Amazonas og Rio Negro 2023/24"
                heading="Ekstremtørken i Amazonas under El Niño 2023/24"
                caption="El Niño forskyver konveksjon ut i Stillehavet og kveler nedbøren over Amazonas. Rio Negro falt til laveste nivå på 122 år."
                fit="contain"
                points={[
                  { n: "1", label: "Rio Negro 12,70 m ved Manaus, oktober 2023 (laveste siden 1902)." },
                  { n: "2", label: "Tørrlagte elveløp kuttet båttransport og isolerte elveboere." },
                  { n: "3", label: "Lake Tefé 39,1 °C — massedød av ferskvannsdelfiner." },
                ]}
              />
              <div className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <p className="font-semibold">Sørlige Afrika — verste tørke på 100 år</p>
                <p className="mt-1 text-xs text-foreground/75">
                  Regnsesongen 2023/24 var den tørreste på over et århundre i Zambia, Zimbabwe, Malawi, Botswana, Angola og Namibia. Over <strong>61 millioner</strong> i akutt matmangel; 6 nasjoner erklærte katastrofe. Kariba-demningen ga over 21 timers daglige strømutkoblinger.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <p className="font-semibold">Øst-Afrika — katastrofale flommer</p>
                <p className="mt-1 text-xs text-foreground/75">
                  El Niño + positiv IOD 2023/24: Kenya, Somalia og Etiopia rammet av jordskred og demningsbrudd. Hundrevis omkom; over en halv million fordrevet.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <p className="font-semibold">Rio Grande do Sul — Brasils verste naturkatastrofe</p>
                <p className="mt-1 text-xs text-foreground/75">
                  April–mai 2024: El Niño blokkerte en fuktig celle over sørlige Brasil. Porto Alegres flyplass sto under vann. Over 180 døde; mer enn <strong>500 000</strong> evakuert.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <p className="font-semibold">Panamakanalen — krise i verdenshandelen</p>
                <p className="mt-1 text-xs text-foreground/75">
                  Tørken tappet Gatún og Alhajuela. Daglige skipspasseringer kuttet med nesten <strong>40 %</strong>. Kø eller omvei rundt Kapp Horn.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background/60 px-4 py-3">
                <p className="font-semibold">Sørøst-Asia og India — hetebølger og risikrise</p>
                <p className="mt-1 text-xs text-foreground/75">
                  Over <strong>45 °C</strong> stengte skoler i ukevis. India innførte riseksportforbud og drev globale matpriser opp.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-display text-base font-semibold tracking-tight text-primary">Hva skjer i 2026?</h3>
            <p>
              Etter nøytral fase og svak La Niña 2024–25 viser modellene et nytt sterkt El Niño-signal (WMO/NOAA 2026), ventet å nå toppen mot slutten av 2026. Havets varmeinnhold er ekstremt høyt, og en ny Kelvin-bølge er detektert av Copernicus Marine Service.
            </p>
            <p className="mt-2">
              Hver nye El Niño opererer nå i et strukturelt varmere klimasystem — selv en «gjennomsnittlig» episode gir mer ekstreme følger enn for 30 år siden.
            </p>
          </div>

          <Callout title="Kobling til fagstoffet">
            <p>
              2023/24 illustrerer kjerneprinsippene: <strong>Bjerknes-tilbakekoblingen</strong> forsterket svingningen da passatene sviktet. <strong>Kelvin-bølger</strong> varslet måneder i forveien. <strong>Telekoblinger via Rossby-bølger</strong> forplantet effektene fra Amazonas til Kenya og fra Panama til sørlige Brasil.
            </p>
            <p>
              Positiv <strong>IOD</strong> samtidig med El Niño i 2023 forsterket tørken i Indonesia og flommene i Øst-Afrika — simultant samspill mellom klimamoduser.
            </p>
          </Callout>
        </div>
      )}
    </div>
  );
}
