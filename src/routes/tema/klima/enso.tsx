import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import { EnsoComparisonDiagram } from "@/components/diagrams";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/enso")({
  head: () =>
    topicHead({
      title: "ENSO: El Niño og La Niña · Geofag 2",
      description:
        "El Niño–Sørlige oscillasjon (ENSO): Walker-sirkulasjonen, passatvinder, termoklin, Kelvin-bølger, SOI/ONI-indekser, telekoblinger og ENSO i en varmere verden.",
      path: "/tema/klima/enso",
    }),
  component: EnsoPage,
});

/* ── Komponent: Årets El Niño (2023–2026) ────────────────────────────────── */
function AaretElNino() {
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

function EnsoPage() {
  return (
    <TopicLayout
      kicker="Klimasystemet · Tropisk Stillehav"
      title="ENSO: El Niño og La Niña"
      lead="Ingen enkelt svingning påvirker jordas vær fra år til år mer enn ENSO. Når passatvindene slakker av over det tropiske Stillehavet, forskyves planetens største varmelager — med flom, tørke og globale temperaturhopp som resultat."
      banner="/images/fig-enso.jpg"
      bannerAlt="Det tropiske Stillehavet sett fra verdensrommet med konveksjonsskyer over varmt hav"
      prev={{ to: "/tema/klima/oversikt", label: "Forrige: Klimasystemet (oversikt)" }}
      next={{ to: "/tema/klima/iod", label: "Neste: IOD" }}
      kilder={KILDER.enso}
    >
      {/* ── 1. Introduksjon: Hva er ENSO? ───────────────────────────── */}
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
        tropiske Stillehavet.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Nøytral tilstand (normalen):</strong> Sterke passatvinder
          fra øst mot vest dytter varmt overflatevann vestover mot Indonesia og
          Australia.
        </li>
        <li>
          <strong>El Niño (varm fase):</strong> Passatvindene svekkes eller
          snur. Varmt overflatevann flyter østover mot Sør-Amerika. Oppvellingen
          utenfor Peru kollapser.
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

      {/* ── 2. Interaktive temaknapper ──────────────────────────────── */}
      <div className="pt-2">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Utforsk tilstandene, mekanismene og konsekvensene
        </h2>
        <p className="text-sm text-muted-foreground">
          Trykk på knappene under for å folde ut detaljert fagstoff, observasjoner, figurer og
          telekoblinger for hver del av ENSO-systemet.
        </p>
      </div>

      {/* ── Knapp 1: Normaltilstand og Walker-sirkulasjonen ─────────── */}
      <CollapsibleSection
        title="1. Normaltilstand og Walker-sirkulasjonen"
        subtitle="Passatvinder, warm pool ved Indonesia, oppvelling ved Peru og den lukkede Walker-cellen"
        badge="Nøytral tilstand"
        badgeVariant="teal"
        defaultOpen={true}
      >
        <p>
          For å forstå El Niño og La Niña må du kjenne normaltilstanden godt.
          Det er avviket fra normalen som driver konsekvensene.
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Passatvindene
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Under normale forhold blåser de sørøstlige og nordøstlige{" "}
              <strong>passatvindene</strong> jevnt mot vest langs ekvator
              (Bjerknes, 1969). Disse vindene er et direkte resultat av{" "}
              <Link
                to="/tema/vindsystemet"
                className="text-primary underline-offset-2 hover:underline"
              >
                den globale atmosfæresirkulasjonen
              </Link>
              : kald luft synker ved subtropene (ca. 30°N og 30°S) og strømmer
              mot ekvator langs overflaten, avbøyd av{" "}
              <Link
                to="/tema/coriolis"
                className="text-primary underline-offset-2 hover:underline"
              >
                Coriolis-effekten
              </Link>{" "}
              til å bli østlige vinder. Passatvindene skaper en stabil «pumpe» som
              kontinuerlig skyver varmt vann vestover.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Det vestlige varmebassenget (warm pool)
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              I det vestlige Stillehavet — rundt Indonesia, Filippinene og
              Nord-Australia — hoper det oppvarmede overflatevannet seg opp og
              danner et enormt basseng med temperaturer på 28–30 °C. Dette
              kalles <strong>det vestlige varmebassenget</strong> (
              <em>warm pool</em>). Fuktig luft stiger kraftig og gir store
              nedbørsmengder over Indonesia. Havnivået i vest er faktisk ca. 0,5
              meter høyere enn i øst fordi vinden stabler opp vann der.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Oppvelling utenfor Peru
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Når vinden skyver overflatevannet vestover, trekkes kaldt,
              næringsrikt dypvann (18–20 °C) opp til overflaten utenfor Peru og
              Ecuador — en prosess som kalles <strong>oppvelling</strong> (
              <em>upwelling</em>). Det kalde vannet gir stabilt høytrykk og lite
              nedbør langs kysten, men mater verdens rikeste fiskerier av ansjos.
            </p>
          </div>
        </div>

        <PhotoFigure
          src="/images/fig-enso-normal.jpg"
          alt="Tverrsnitt av tropisk Stillehav i normaltilstand: passatvinder mot vest, varmt basseng ved Indonesia, bratt termoklin og oppvelling ved Peru"
          heading="Figur 1. Normaltilstanden og Walker-sirkulasjonen"
          caption="Under normale forhold blåser passatvindene vestover og hoper opp varmt overflatevann ved Indonesia (venstre). Termoklinen heller bratt oppover mot øst. Utenfor Peru (høyre) trekkes kaldt dypvann opp (oppvelling). Walker-sirkulasjonen lukker kretsen: oppstigning i vest, østgående transport i høyden, nedsynking i øst og passatvinder tilbake ved overflaten."
          fit="contain"
          points={[
            {
              n: "1",
              label:
                "Varmt vestlig basseng (>29 °C). Konveksjon og kraftig nedbør over Indonesia.",
            },
            {
              n: "2",
              label:
                "Oppvelling ved Peru. Kaldt, næringsrikt bunnvann erstatter overflatevannet.",
            },
            {
              n: "3",
              label:
                "Walker-sirkulasjonen: den lukkede øst–vest-cellen i atmosfæren langs ekvator.",
            },
          ]}
        />

        <div className="pt-2">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            Walker-sirkulasjonen
          </h4>
          <p className="mt-1 text-sm sm:text-base">
            Det lukkede luftsirkulasjonsmønsteret langs ekvator kalles{" "}
            <strong>Walker-sirkulasjonen</strong>, oppkalt etter Gilbert
            Walker. Kretsen består av:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
            <li>
              <strong>Oppstigning i vest:</strong> Varm luft stiger over det
              vestlige varmebassenget (konveksjon).
            </li>
            <li>
              <strong>Østgående transport i høyden:</strong> Luften flyter
              østover i øvre troposfære.
            </li>
            <li>
              <strong>Nedsynking i øst:</strong> Luften synker over det østlige
              Stillehavet og gir høytrykk.
            </li>
            <li>
              <strong>Passatvinder ved overflaten:</strong> Luften strømmer
              vestover og lukker kretsen.
            </li>
          </ul>
        </div>

        <OrdBoks
          ord="Walker-sirkulasjonen"
          barn="Øst–vest-gående atmosfærisk sirkulasjonscelle over det ekvatoriale Stillehavet. Oppstigning i vest (Indonesia), østgående transport i høyden, nedsynking i øst (Peru), vestgående passatvinder ved overflaten. Beskrevet av Gilbert Walker på 1920-tallet."
        />
      </CollapsibleSection>

      {/* ── Knapp 2: El Niño ────────────────────────────────────────── */}
      <CollapsibleSection
        title="2. El Niño (Varm fase — Når systemet snur)"
        subtitle="Svake passater · Bjerknes-tilbakekobling · Kelvin-bølger · Oppvelling kollapser · Flom i Peru, tørke i vest"
        badge="Varm fase"
        badgeVariant="amber"
      >
        <p>
          Med ujevne mellomrom begynner passatvindene å svekkes (Trenberth,
          1997). Dette utløser en kjede av forandringer over hele Stillehavet.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border/70 bg-card/70 p-4">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Bjerknes-tilbakekoblingen
            </h4>
            <p className="mt-1 text-xs text-foreground/85 sm:text-sm">
              Svakere passater → varmt vann flyter østover → det østlige
              Stillehavet varmes opp → enda svakere passater. Denne positive
              tilbakekoblingen gjør El Niño til en rask og dramatisk omveltning.
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-card/70 p-4">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Ekvatoriale Kelvin-bølger
            </h4>
            <p className="mt-1 text-xs text-foreground/85 sm:text-sm">
              Det oppdemmede varmtvannet frigjøres og brer seg østover som en
              indre oseanisk bølge langs ekvator med 2–3 m/s. Satellitter sporer
              dette 3–6 måneder før hendelsen når Sør-Amerikas kyst.
            </p>
          </div>
        </div>

        <PhotoFigure
          src="/images/fig-enso-kelvin.jpg"
          alt="Satellittaltimetri-kart over tropisk Stillehav som viser en ekvatorial Kelvin-bølge med forhøyet havnivå på vei østover"
          heading="Figur 2. Satellittovervåking av ekvatorial Kelvin-bølge"
          caption="Satellittaltimetri (SSHA) måler havoverflatens høydeanomali med centimeters presisjon. Figuren viser en kraftig ekvatorial Kelvin-bølge under oppbyggingen av en El Niño: en tunge av hevet havnivå (+15 til +25 cm, rød/hvit farge) beveger seg østover langs ekvator med 2–3 m/s mot Sør-Amerika. Data: Sentinel-6 / Jason-3."
          fit="contain"
          points={[
            {
              n: "1",
              label:
                "Havoverflatehøyde (SSHA) hevet 15–25 cm langs ekvator pga. oppdemmet varmtvann.",
            },
            {
              n: "2",
              label:
                "Kelvin-bølgen brer seg østover med ca. 2–3 m/s (tar ca. 2–3 måneder over Stillehavet).",
            },
            {
              n: "3",
              label:
                "Satellitter gir 3–6 måneders forvarsel før El Niño når kysten av Sør-Amerika.",
            },
          ]}
        />

        <PhotoFigure
          src="/images/fig-enso-elnino.jpg"
          alt="Tverrsnitt av El Niño: svekkede passatvinder, varmt vann østover, flat termoklin i øst, kollaps av oppvellingen ved Peru"
          heading="Figur 3. El Niño-tilstanden"
          caption="Passatvindene svekkes. Varmt overflatevann skvulper østover (Kelvin-bølge). Termoklinen flater ut i øst — kaldt næringsrikt dypvann når ikke lenger opp til overflaten. Konveksjon og regn forskyves fra Indonesia mot det sentrale og østlige Stillehavet."
          fit="contain"
          points={[
            {
              n: "1",
              label:
                "Svekket passatvind. Bjerknes-tilbakekoblingen starter forsterkningen.",
            },
            {
              n: "2",
              label:
                "Ekvatorial Kelvin-bølge bærer varmt vann østover langs ekvator.",
            },
            {
              n: "3",
              label:
                "Termoklinen trykkes ned i øst. Oppvelling kollapser — fiskeriet svikter.",
            },
            {
              n: "4",
              label:
                "Konveksjon og nedbørsområde forskyves til sentralt/østlig Stillehav.",
            },
          ]}
        />

        <div>
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            Termoklinen og oppvellingens kollaps
          </h4>
          <p className="mt-1 text-sm sm:text-base">
            Termoklinen flater ut og trykkes ned i det østlige Stillehavet.
            Oppvellingen klarer ikke lenger å hente opp kaldt næringsvann; den
            resirkulerer bare lunkent overflatevann. Ansjosbestandene kollapser.
            Peruanske kystfiskere ga fenomenet navnet <em>El Niño</em> (
            «Jesusbarnet») fordi oppvarmingen ofte kulminerte rundt juletider.
          </p>
        </div>

        <OrdBoks
          ord="Termoklin"
          barn="Det sjiktet i havet der temperaturen faller raskt med dybden. Under El Niño trykkes termoklinen ned i det østlige Stillehavet, noe som kveler tilførselen av kaldt, næringsrikt bunnvann og kollapser oppvellingen."
        />

        <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
          <h4 className="font-display text-base font-semibold tracking-tight text-primary">
            Regionale konsekvenser av El Niño
          </h4>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
            <li>
              <strong>Peru og Ecuador:</strong> Voldsom nedbør og leirskred
              rammer ørkenområder. Elver flommer over, og fiskeriet kollapser.
            </li>
            <li>
              <strong>Indonesia og Øst-Australia:</strong> Alvorlig tørke og
              skogbranner. Svekket monsun.
            </li>
            <li>
              <strong>India:</strong> Monsunen kan svekkes og gi avlingssvikt.
            </li>
            <li>
              <strong>Sørøst-Afrika:</strong> Svekket regnperiode og risiko for
              matmangel.
            </li>
            <li>
              <strong>Karibia og Mellom-Amerika:</strong> Tørrere enn normalt i
              mange år (f.eks. Panamakanalen).
            </li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* ── Knapp 3: La Niña ────────────────────────────────────────── */}
      <CollapsibleSection
        title="3. La Niña (Kald fase — Den forsterkede normalen)"
        subtitle="Super-passater · Ekspandert varmtvannsbasseng · Intens oppvelling ved Peru · Flom i Australia/Asia"
        badge="Kald fase"
        badgeVariant="sky"
      >
        <p>
          La Niña er den motsatte ekstremfasen. Passatvindene blåser sterkere
          enn normalt. Det varme overflatevannet skyves enda hardere mot vest, og
          oppvellingen i øst blir ekstra kraftig. Havoverflaten i det sentrale og
          østlige Stillehavet blir 1–3 °C kaldere enn gjennomsnittet (NOAA,
          u.å.).
        </p>
        <p>
          En El Niño-episode etterfølges ofte av en eller to La Niña-sesonger,
          fordi systemet «overskyves» og svinger tilbake med ekstra styrke — som
          en pendel.
        </p>

        <PhotoFigure
          src="/images/fig-enso-lanina.jpg"
          alt="Tverrsnitt av La Niña: ekstra sterke passatvinder, utvidet varmtvannsbaseng i vest, intens oppvelling ved Peru"
          heading="Figur 4. La Niña-tilstanden"
          caption="Passatvindene forsterkes. Det vestlige varmebassenget ekspanderer og presses lenger vest og nord. Oppvellingen ved Peru er usedvanlig kraftig. Havoverflaten i øst er 1–3 °C kaldere enn normalt. Tørke i Peru og Karibia. Kraftige monsunregn og sykloner i Australia og Sørøst-Asia."
          fit="contain"
          points={[
            {
              n: "1",
              label:
                "Ekstra sterke passatvinder presser varmt vann lenger vest enn normalt.",
            },
            {
              n: "2",
              label:
                "Intens oppvelling i øst. Havoverflaten ved Peru 1–3 °C kaldere enn normalt.",
            },
            {
              n: "3",
              label:
                "Kraftige monsunregn, sykloner og flom i Australia, Sørøst-Asia og Øst-Afrika.",
            },
          ]}
        />

        <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
          <h4 className="font-display text-base font-semibold tracking-tight text-primary">
            Regionale konsekvenser av La Niña
          </h4>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
            <li>
              <strong>Australia og Sørøst-Asia:</strong> Ekstreme monsunregn,
              flom og kraftige tropiske sykloner (f.eks. Queensland 2010/11).
            </li>
            <li>
              <strong>Øst-Afrika (Horn of Africa):</strong> Kraftig regnperiode
              og flomfare.
            </li>
            <li>
              <strong>Peru og Karibia:</strong> Forsterket tørke.
            </li>
            <li>
              <strong>Sørvest-USA:</strong> Tørrere enn normalt, økt
              skogbrannfare.
            </li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* ── Knapp 4: Interaktiv sammenligning ────────────────────────── */}
      <CollapsibleSection
        title="4. Sammenlign fasene (Interaktiv modell)"
        subtitle="Bytt direkte mellom Nøytral, El Niño og La Niña i det interaktive diagrammet"
        badge="Interaktiv modell"
        badgeVariant="primary"
      >
        <p className="text-sm sm:text-base text-foreground/90">
          Bruk knappene inne i diagrammet for å sammenligne hvordan
          passatvindene, det vestlige bassenget og termoklinen endrer seg
          mellom de tre tilstandene.
        </p>
        <EnsoComparisonDiagram />
      </CollapsibleSection>

      {/* ── Knapp 5: ENSO-indekser (SOI og ONI) ──────────────────────── */}
      <CollapsibleSection
        title="5. ENSO-indekser: SOI og ONI"
        subtitle="SOI (atmosfæretrykk Tahiti vs. Darwin) og ONI (SST-anomali i Niño 3.4)"
        badge="Måling & Indekser"
        badgeVariant="neutral"
      >
        <p>
          For å kvantifisere ENSO-styrken og definere om vi er i en El Niño-
          eller La Niña-episode, bruker forskere standardiserte indekser:
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              SOI — Southern Oscillation Index
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              <strong>SOI</strong> måler den normaliserte trykkforskjellen
              mellom Tahiti (øst i Stillehavet) og Darwin (vest i Australia).
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm sm:text-base">
              <li>
                <strong>Negativ SOI:</strong> lavt trykk over Tahiti, høyt over
                Darwin → El Niño (svake passater).
              </li>
              <li>
                <strong>Positiv SOI:</strong> høyt trykk over Tahiti, lavt over
                Darwin → La Niña (sterke passater).
              </li>
            </ul>
          </div>

          <PhotoFigure
            src="/images/fig-enso-soi-seesaw.jpg"
            alt="Infografikk som viser den atmosfæriske trykkvippen (SOI) mellom Darwin og Tahiti under El Niño og La Niña"
            heading="Figur 5. Den atmosfæriske SOI-vippen (Tahiti vs. Darwin)"
            caption="Southern Oscillation Index (SOI) fungerer som en barometrisk vippe over Stillehavet. Under El Niño (øverst) er det unormalt lavt trykk over Tahiti og høyt trykk over Darwin (negativ SOI), noe som svekker passatene. Under La Niña (nederst) er trykkgradienten bratt med høytrykk over Tahiti og lavtrykk over Darwin (positiv SOI), noe som superforsterker passatvindene."
            fit="contain"
            points={[
              {
                n: "1",
                label:
                  "El Niño (negativ SOI): Høytrykk over Darwin, lavtrykk over Tahiti. Svake passater.",
              },
              {
                n: "2",
                label:
                  "La Niña (positiv SOI): Lavtrykk over Darwin, høytrykk over Tahiti. Ekstremt sterke passater.",
              },
              {
                n: "3",
                label:
                  "Trykkvippen måler den atmosfæriske delen av ENSO-sirkulasjonen direkte.",
              },
            ]}
          />

          <div className="pt-2">
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              ONI — Oceanic Niño Index
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              <strong>ONI</strong> er NOAAs offisielle operasjonelle definisjon.
              Den beregnes som det 3-månedlige glidende gjennomsnittet av
              havoverflatetemperaturavviket (SST-anomalien) i Niño 3.4-regionen
              (5°N–5°S, 120°–170°V).
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm sm:text-base">
              <li>
                <strong>ONI ≥ +0,5 °C</strong> i fem påfølgende 3-måneders
                perioder: El Niño.
              </li>
              <li>
                <strong>ONI ≤ −0,5 °C</strong> i fem påfølgende perioder: La
                Niña.
              </li>
            </ul>
          </div>

          <PhotoFigure
            src="/images/fig-enso-oni-tidsserie.jpg"
            alt="Graf som viser ONI-indeksen fra 1950 til i dag med El Niño-episoder i rødt og La Niña i blått"
            heading="Figur 6. ONI-tidsserie 1950 – i dag"
            caption="ONI-indeksen viser hvordan ENSO har svingt siden 1950. Kraftige El Niño-episoder (rødt, ONI over +1,5) inkluderer 1972/73, 1982/83, 1997/98, 2015/16 og 2023/24. Kraftige La Niña (blått) inkluderer 1973/74, 1988/89, 1999/2000 og 2010/11. Kilde: NOAA."
            fit="contain"
            points={[
              {
                n: "1",
                label:
                  "Rekord-El Niño 1997/98: ONI nådde +2,3 °C. Global lufttemperaturrekord.",
              },
              {
                n: "2",
                label:
                  "El Niño 2015/16: blant de sterkeste målt. Bidro til rekordvarm 2016.",
              },
              {
                n: "3",
                label:
                  "La Niña 2010/11: sterk negativ fase etter El Niño 2009/10.",
              },
            ]}
          />
        </div>
      </CollapsibleSection>

      {/* ── Knapp 6: Globale telekoblinger ──────────────────────────── */}
      <CollapsibleSection
        title="6. Globale telekoblinger og samspill"
        subtitle="Rossby-bølger, globale temperaturrekorder, orkaner/vindskjær og samspill med IOD og NAO"
        badge="Global påvirkning"
        badgeVariant="warning"
      >
        <p>
          Når et enormt nedbørs- og konveksjonsbelte forskyves tusenvis av
          kilometer i tropene, sender det bølger av energi ut i hele
          atmosfæren. Disse fjernkoblingene kalles <strong>telekoblinger</strong>{" "}
          (Bjerknes, 1969), formidlet via atmosfæriske{" "}
          <Link
            to="/tema/jetstrommer"
            className="text-primary underline-offset-2 hover:underline"
          >
            Rossby-bølger
          </Link>
          .
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Effekt på global temperatur
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Under kraftige El Niño-år avgir det varme Stillehavet enorme
              mengder overskuddsvarme til luften, noe som setter globale
              temperaturrekorder (1997/98, 2015/16, 2023/24). La Niña absorberer
              mer energi og demper den globale temperaturen midlertidig.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Orkaner og tropiske sykloner
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              El Niño skaper sterkere <strong>vertikal vindskjær</strong> over
              Atlanteren og Karibia, som river orkanstrukturer i stykker (rolige
              orkansesonger). La Niña reduserer vindskjæret og gir svært aktive
              orkansesonger.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Samspill med IOD og NAO
            </h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li>
                <strong>IOD:</strong> Positiv{" "}
                <Link
                  to="/tema/klima/iod"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  IOD
                </Link>{" "}
                og El Niño samtidig (f.eks. 1997 og 2019) tørker begge sider av
                Australia og Indonesia på én gang.
              </li>
              <li>
                <strong>NAO:</strong> El Niño forstyrrer polarvirvelen og kan
                svekke{" "}
                <Link
                  to="/tema/klima/nao"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  NAO
                </Link>
                , mens La Niña oftere gir stabil polarvirvel og positiv NAO i
                Norge.
              </li>
            </ul>
          </div>
        </div>

        <PhotoFigure
          src="/images/fig-enso-telekoblinger.jpg"
          alt="Verdenskart som viser typiske telekobling-effekter av El Niño: tørke i rødt og økt nedbør i blått"
          heading="Figur 7. Globale telekoblinger under El Niño"
          caption="Kart over typiske væravvik under en sterk El Niño. Rød = varmere / tørrere enn normalt. Blå = kaldere / våtere enn normalt. La Niña gir speilbildet for mange regioner. Kilde: NOAA CPC."
          fit="contain"
          points={[
            {
              n: "1",
              label:
                "Voldsom nedbør og flom langs vest-kysten av Sør-Amerika (Peru, Ecuador).",
            },
            {
              n: "2",
              label:
                "Alvorlig tørke og skogbrannfare i Indonesia, Australia og India.",
            },
            {
              n: "3",
              label:
                "Rolig orkansesong i Atlanterhavet pga. sterk vertikal vindskjær.",
            },
          ]}
        />
      </CollapsibleSection>

      {/* ── Knapp 7: ENSO i en varmere verden ───────────────────────── */}
      <CollapsibleSection
        title="7. ENSO i en varmere verden & Paleoklima"
        subtitle="Korallkjerner som klimatermometre og framtidige super-El Niño-episoder"
        badge="Klimaendringer"
        badgeVariant="teal"
      >
        <p>
          ENSO er ikke forårsaket av menneskeskapt global oppvarming. Geologiske
          arkiv — koraller, iskjerner og sedimenter — viser at El Niño har
          eksistert i tusenvis av år (Cobb et al., 2003). Det er et naturlig
          trekk ved Jordens klimasystem.
        </p>

        <PhotoFigure
          src="/images/fig-enso-korall-paleo.jpg"
          alt="Vitenskapelig diagram av korallkjerne og kjemiske proksydata som viser historiske El Niño og La Niña-episoder"
          heading="Figur 8. Paleoklima — Korallkjerner som klimatermometer for ENSO"
          caption="Massive koraller (f.eks. Porites) bygger kalkskjelett med årlige vekstbånd, akkurat som årringer i et tre. Oksygenisotopforholdet (δ18O) og strontium/kalsium-forholdet (Sr/Ca) i kalken avhenger direkte av havtemperaturen. Slike borekjerner gjør det mulig å rekonstruere ENSO-svingninger flere hundre år tilbake i tid — lenge før termometere fantes."
          fit="contain"
          points={[
            {
              n: "1",
              label:
                "Røntgenbilde (X-ray) av korallkjerne viser årlige vekstbånd med vekslende kalktetthet.",
            },
            {
              n: "2",
              label:
                "Kjemiske analyser (δ18O og Sr/Ca) avslører historiske El Niño-topper (f.eks. 1877/78 og 1982/83).",
            },
            {
              n: "3",
              label:
                "Dokumenterer at ENSO er en naturlig klimamodus med tusenårige røtter.",
            },
          ]}
        />

        <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
          <h4 className="font-display text-base font-semibold tracking-tight text-primary">
            Hva betyr global oppvarming for ENSO?
          </h4>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
            <li>
              <strong>Bakgrunnstemperaturen stiger:</strong> Selv moderate El
              Niño-episoder kan nå slå globale temperaturrekorder fordi de
              legger seg oppå en allerede varmere grunnlinje.
            </li>
            <li>
              <strong>Ekstremnedbør intensiveres:</strong> Varmere atmosfære
              holder mer fuktighet (Clausius-Clapeyron: ~7 % mer fukt per grad
              oppvarming).
            </li>
            <li>
              <strong>Mulig økning i «super» El Niño-er:</strong> Noen studier
              antyder at de aller kraftigste El Niño-episodene kan bli
              hyppigere (Cai et al., 2014).
            </li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* ── Årets El Niño ─────────────────────────────────────────────── */}
      <AaretElNino />

      {/* ── Eksamensbokser ────────────────────────────────────────────── */}
      <Callout title="Til eksamen">
        <p>
          Husk den fulle <strong>El Niño-årsakskjeden</strong>:
          <br />
          <strong>
            1. Passatvinden svekkes → 2. Bjerknes-tilbakekobling forsterker
            svingningen → 3. Ekvatorial Kelvin-bølge bærer varmt vann østover
            → 4. Termoklinen synker i øst, oppvelling kollapser → 5.
            Konveksjon og regn forskyves fra Indonesia til sentralt/østlig
            Stillehav → 6. Telekoblinger via Rossby-bølger endrer
            jetstrømmene globalt.
          </strong>
        </p>
        <p>
          Skil mellom <strong>SOI</strong> (lufttrykk-indeks, Tahiti minus
          Darwin) og <strong>ONI</strong> (havtemperaturavvik i Niño
          3.4-regionen). ONI er den offisielle operasjonelle definisjonen NOAA
          bruker i dag.
        </p>
        <p>
          Husk at La Niña ofte følger etter El Niño, og at effektene i mange
          tilfeller er <em>speilbildet</em> av El Niño.
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          ENSO er <em>ikke</em> forårsaket av menneskeskapt global oppvarming.
          Det er en naturlig svingning som har eksistert i tusenvis av år.
          Spørsmålet er om klimaendringer gjør ekstremhendelsene kraftigere.
        </p>
        <p>
          <em>El Niño betyr ikke nødvendigvis varmt vær i Europa.</em>{" "}
          Forbindelsene er indirekte og moduleres av NAO og polarvirvelen.
          Telekoblingene er statistiske tendenser, ikke garantier for
          enkeltvintre.
        </p>
        <p>
          <em>Ikke forveksl El Niño med IOD.</em> El Niño sitter i tropisk
          Stillehav; IOD sitter i tropisk Indiahav. De er ulike fenomener som
          kan sammenfalle og forsterke hverandre.
        </p>
        <p>
          <em>SOI og ONI måler det samme fenomenet, men med ulike metoder.</em>{" "}
          SOI er atmosfærebasert (lufttrykk), ONI er havbasert (temperatur).
          Begge brukes — og kan noen ganger peke litt ulikt i overgangsfaser.
        </p>
      </Callout>

      {/* ── Begrepskort ─────────────────────────────────────────────── */}
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Viktige begreper
      </h2>
      <TermGrid>
        <Term
          name="Walker-sirkulasjon"
          def="Øst–vest-gående atmosfærisk sirkulasjonscelle over det ekvatoriale Stillehavet. Oppstigning i vest (Indonesia), nedsynking i øst (Peru)."
        />
        <Term
          name="El Niño"
          def="Varm fase av ENSO: svekkede passatvinder og oppvarming i det østlige Stillehavet. Perioden er typisk 9–12 måneder."
        />
        <Term
          name="La Niña"
          def="Kald fase av ENSO: forsterkede passatvinder og kraftig oppvelling i øst. Kaldere hav i sentrale og østlige Stillehavet."
        />
        <Term
          name="Oppvelling (Upwelling)"
          def="Heving av kaldt, næringsrikt dypvann til overflaten. Viktig for fiskeriene langs Perus kyst. Stanser under El Niño."
        />
        <Term
          name="Termoklin"
          def="Sjiktet i havet der temperaturen faller raskt med dybden. Flater ut og synker i øst under El Niño."
        />
        <Term
          name="Kelvin-bølge"
          def="Ekvatorial oseanisk bølge som bærer varmt overflatevann østover og varsler kommende El Niño-episode."
        />
        <Term
          name="Bjerknes-tilbakekoblingen"
          def="Selvforsterkende mekanisme: svakere passatvinder → varmere hav i øst → enda svakere vinder."
        />
        <Term
          name="Telekobling"
          def="Klimatiske sammenhenger mellom fjerne deler av kloden, formidlet via atmosfæriske Rossby-bølger."
        />
        <Term
          name="SOI"
          def="Southern Oscillation Index: normalisert trykkforskjell Tahiti minus Darwin. Negativ SOI = El Niño."
        />
        <Term
          name="ONI"
          def="Oceanic Niño Index: 3-månedlig glidende gjennomsnitt av SST-anomali i Niño 3.4-regionen. ONI ≥ +0,5 °C = El Niño."
        />
      </TermGrid>

      {/* ── Quiz ─────────────────────────────────────────────────────── */}
      <Quiz
        questions={[
          {
            prompt:
              "Hva skjer med passatvindene og havtemperaturen utenfor Peru under en El Niño-fase?",
            options: [
              "Passatvindene blir mye sterkere, og havet utenfor Peru blir iskaldt.",
              "Passatvindene svekkes, varmt overflatevann brer seg østover og oppvellingen kollapser.",
              "Passatvindene snur og blåser mot polene.",
              "Havtemperaturen i hele Stillehavet synker drastisk.",
            ],
            answer: 1,
            explain:
              "Under El Niño svekkes passatene (Bjerknes-tilbakekoblingen forsterker dette), og det varme overflatevannet flyter østover som en Kelvin-bølge. Termoklinen trykkes ned i øst og oppvellingen av kaldt næringsvann stopper.",
          },
          {
            prompt: "Hva er forskjellen mellom SOI og ONI?",
            options: [
              "SOI måler lufttrykksforskjell (atmosfære), ONI måler havtemperaturavvik. Begge brukes til å definere ENSO-faser.",
              "SOI måler havtemperatur, ONI måler nedbør. De brukes til ulike ting.",
              "SOI er den nyeste indeksen; ONI er den eldste og gir mest nøyaktig svar.",
              "De er akkurat det samme og kan brukes om hverandre uten forbehold.",
            ],
            answer: 0,
            explain:
              "SOI (Southern Oscillation Index) er atmosfærebasert: normalisert trykkforskjell mellom Tahiti og Darwin. ONI (Oceanic Niño Index) er havbasert: SST-anomali i Niño 3.4-regionen. ONI er den operasjonelle NOAA-definisjonen i dag.",
          },
          {
            prompt: "Hvorfor gir El Niño ofte tørke i Australia og Indonesia?",
            options: [
              "Fordi havet rundt Australia fryser til is.",
              "Det varme basseng og konveksjonsområdet forskyves østover — Australia og Indonesia mister sin motor for regndannelse.",
              "Fordi Coriolis-effekten opphører i det vestlige Stillehavet.",
              "Fordi all fuktighet suges opp i stratosfæren.",
            ],
            answer: 1,
            explain:
              "Warm pool og den kraftige konveksjonen flytter fra Indonesia/Australia til det sentrale og østlige Stillehavet. Regionen mister nedbørsmotoren og opplever tørke, varme og økt skogbrannfare.",
          },
          {
            prompt:
              "Hva er en ekvatorial Kelvin-bølge, og hvilken rolle spiller den under El Niño?",
            options: [
              "En overflatebølge i havet som dreper koraller.",
              "En indre oseanisk bølge som bærer varmt overflatevann østover langs ekvator og utløser El Niño-endringer i øst.",
              "En atmosfærisk bølge som ligner en tornado langs ekvator.",
              "En Rossby-bølge som går fra øst til vest.",
            ],
            answer: 1,
            explain:
              "En ekvatorial Kelvin-bølge er en indre oseanisk bølge som følger ekvator og bærer varmt vann østover med 2–3 m/s. Den er «meldingen» fra vest til øst om at El Niño er i gang, og kan spores med satellitter 3–6 måneder i forveien.",
          },
          {
            prompt:
              "Hvordan påvirker ENSO den globale gjennomsnittstemperaturen i lufta?",
            options: [
              "El Niño gir ofte rekordvarme år globalt — havet frigjør overskuddsvarme til atmosfæren. La Niña demper temperaturen midlertidig.",
              "La Niña gjør hele jorda 5 grader varmere enn El Niño.",
              "ENSO har overhodet ingen effekt utenfor ekvator.",
              "El Niño blokkerer all solstråling og gir global avkjøling.",
            ],
            answer: 0,
            explain:
              "Det enorme varme Stillehavet under El Niño avgir store mengder energi til atmosfæren. El Niño-år slo globale temperaturrekorder i 1997/98, 2015/16 og 2023/24. La Niña demper temperaturen midlertidig, men den underliggende trenden fra klimaendringer er oppover.",
          },
        ]}
      />
    </TopicLayout>
  );
}
