import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  NaoInteractiveSimulator,
  NaoPhasesComparisonDiagram,
  NaoDomainDiagram,
  NaoPositivePhaseDiagram,
  NaoNegativePhaseDiagram,
  NaoSswBreakdownDiagram,
  NaoBlockeringDiagram,
  NaoRossbyDiagram,
  NaoEnsoTeleconnectionDiagram,
  NaoIndexStationsDiagram,
} from "@/components/diagrams";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/nao")({
  head: () =>
    topicHead({
      title: "NAO: Den nordatlantiske oscillasjon · Geofag 2",
      description:
        "Den nordatlantiske oscillasjon (NAO): trykkgradient Azorene–Island, geostrofisk vestavind, polarjet, Rossby-bølger, blokkerende høytrykk, SSW, telekoblinger og konsekvenser for norsk og europeisk vinterklima.",
      path: "/tema/klima/nao",
    }),
  component: NaoPage,
});

/* ── Komponent: Ekstreme NAO-vintre i nyere tid ────────────────────────── */
function EkstremeNaoVintre() {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-6 rounded-xl border border-sky-500/30 bg-sky-500/5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span className="inline-flex size-2.5 animate-pulse rounded-full bg-sky-400" />
          <span className="font-display text-lg font-medium tracking-tight text-sky-400">
            Ekstreme NAO-vintre — Kuldesjokk, stormer og vannkrise
          </span>
        </span>
        {open ? (
          <ChevronUp className="size-5 shrink-0 text-sky-400" />
        ) : (
          <ChevronDown className="size-5 shrink-0 text-sky-400" />
        )}
      </button>

      {open && (
        <div className="space-y-5 border-t border-sky-500/20 px-5 py-5 text-sm leading-relaxed text-foreground/90">
          <p>
            NAO er en av de viktigste faktorene for om en norsk vinter blir mild og våt eller kald og
            tørr (NOAA, u.å.). Her er noen eksempler på vintre der indeksen lå langt fra null:
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Vinteren 2009/2010 */}
            <div className="rounded-lg border border-border/80 bg-background/60 p-4">
              <p className="font-semibold text-sky-400">
                ❄️ Vinteren 2009/2010 — rekordlav NAO og kald vinter
              </p>
              <p className="mt-1 text-xs text-foreground/80 sm:text-sm">
                Vinteren hadde den mest negative NAO-indeksen siden målingene startet i 1820-årene
                (Osborn, 2011). I Norge var vinteren 2,5 °C kaldere enn normalen og den 11. kaldeste
                siden 1900 (Meteorologisk institutt, 2011). Store deler av Nord-Europa fikk kulde og
                snø.
              </p>
            </div>

            {/* 1989–1995 */}
            <div className="rounded-lg border border-border/80 bg-background/60 p-4">
              <p className="font-semibold text-amber-400">
                🌊 1989–1995 — lang periode med positiv NAO og brefremstøt
              </p>
              <p className="mt-1 text-xs text-foreground/80 sm:text-sm">
                Vintrene fra 1986/87 til 1994/95 hadde positiv NAO-indeks ni år på rad, og
                1988/89 og 1994/95 er blant de høyeste i hele serien (CRU). Vestavindene var sterke,
                og i denne perioden kom også{" "}
                <strong>Nyttårsorkanen 1. januar 1992</strong>, med vindkast anslått til 62 m/s
                (Meteorologisk institutt, 2016). Snørike vintre ga
                mye snø på breene. Briksdalsbreen rykket fram om lag 300 meter fra 1987 til 1996, og
                Nigardsbreen om lag 280 meter fra 1988 til 2003 (NVE, 2023). Massebalansen på de
                maritime breene henger sammen med NAO (Nesje et al., 2000).
              </p>
            </div>

            {/* Middelhavstørke */}
            <div className="rounded-lg border border-border/80 bg-background/60 p-4">
              <p className="font-semibold text-amber-400">
                ☀️ Tørrere vintre i Sør-Europa under NAO+
              </p>
              <p className="mt-1 text-xs text-foreground/80 sm:text-sm">
                Når NAO+ gir mildt og vått vær i Norge, ligger stormbanen lenger nord, og Sør-Europa
                og Middelhavsområdet får ofte tørrere vintre enn normalt (NOAA, u.å.). Langvarig tørke
                der har likevel flere årsaker enn NAO.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NaoPage() {
  return (
    <TopicLayout
      kicker="Klimasystemet · Nord-Atlanteren"
      title="NAO: Den nordatlantiske oscillasjon"
      lead="Den nordatlantiske oscillasjon (NAO) er atmosfærens store trykkvippe over Nord-Atlanteren. Svingningen i trykkgradienten mellom Azorhøytrykket og Islandslavtrykket styrer polarjetens posisjon, stormbanenes retning og om den norske vinteren blir mild og fuktig — eller kaldere enn normalt og preget av blokkerende høytrykk."
      banner="/images/fig-nao.jpg"
      bannerAlt="Atmosfærisk sirkulasjon og stormbaner over Nord-Atlanteren inn mot Norskehavet og Norge"
      prev={{ to: "/tema/klima/iod", label: "Forrige: IOD" }}
      next={{ to: "/tema/klima/amoc", label: "Neste: AMOC" }}
      kilder={KILDER.nao}
    >
      {/* ── 1. Introduksjon: Hva NAO er ─────────────────────────────── */}
      <h2 className="font-display text-2xl font-medium tracking-tight">Hva NAO er</h2>
      <p>
        <strong>Den nordatlantiske oscillasjon (NAO)</strong> er det dominerende moduset for
        naturlig klimavariasjon i Nord-Atlanteren og Europa (Hurrell, 1995; Walker & Bliss, 1932).
        Den beskriver storskala svingninger i lufttrykket ved havnivå mellom to semi-permanente
        atmosfæriske trykksystemer:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Azorhøytrykket:</strong> Et subtropisk høytrykkssenter rundt 30°–40°N dannet av
          nedsynkende luft i Hadley-cellen.
        </li>
        <li>
          <strong>Islandslavtrykket:</strong> Et subpolart lavtrykkssenter rundt 60°–65°N dannet av
          kontinuerlig syklonaktivitet langs polarfronten.
        </li>
      </ul>
      <p>
        Akkurat som ENSO i Stillehavet har NAO to motsatte faser — <strong>positiv (NAO+)</strong>{" "}
        og <strong>negativ (NAO−)</strong> — definert av hvor stor trykkforskjellen mellom disse to
        sentrene er. Denne trykkgradienten fungerer som en kraftig motor for vestavindsbeltet.
      </p>

      <NaoPhasesComparisonDiagram />

      <OrdBoks
        ord="NAO (North Atlantic Oscillation)"
        barn="Svingning i lufttrykksforskjellen mellom Azorhøytrykket og Islandslavtrykket. Stor trykkforskjell (NAO+) gir sterk, sonal polarjet og milde, våte vintre i Norge. Liten trykkforskjell (NAO−) gir meandrerende jet, atmosfærisk blokkering og kalde, tørre vintre i Norge."
      />

      {/* ── 2. Interaktive temaknapper ──────────────────────────────── */}
      <div className="pt-2">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Utforsk fasene, drivkreftene og dynamikken
        </h2>
        <p className="text-sm text-muted-foreground">
          Trykk på knappene under for å folde ut detaljert fagstoff, observasjoner, modeller,
          animasjoner og telekoblinger for hver del av NAO-systemet.
        </p>
      </div>

      {/* ── Seksjon 1: Normaltilstand og den geostrofiske motoren ─────── */}
      <CollapsibleSection
        title="1. Normaltilstanden og den geostrofiske motoren"
        subtitle="Hadley-cellen, polarfronten og den geostrofiske balansen som driver vestavindsbeltet"
        badge="Fysisk grunnlag"
        badgeVariant="teal"
        defaultOpen={true}
      >
        <p>
          For å forstå hvorfor NAO svinger og hvilke krefter som settes i sving, må vi se på
          fysikken bak atmosfæresirkulasjonen over Atlanteren. NAO er ikke en frittstående hendelse,
          men den variable manifestasjonen av{" "}
          <Link to="/tema/vindsystemet" className="text-primary underline-offset-2 hover:underline">
            det globale vindsystemet
          </Link>
          .
        </p>

        <NaoDomainDiagram />

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              De to trykksentrene: Hvorfor oppstår de?
            </h4>
            <ul className="mt-1 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li>
                <strong>Azorhøytrykket:</strong> Er en direkte konsekvens av den termiske{" "}
                <strong>Hadley-cellen</strong>. Luft som stiger opp i tropene ved ekvator (ITCZ),
                avkjøles i høyden og synker ned igjen rundt 30°N. Den nedsynkende luften komprimeres,
                varmes adiabatisk og danner et stabilt, varmt høytrykksbelte med lite skyer og tørt
                klima.
              </li>
              <li>
                <strong>Islandslavtrykket:</strong> Er et <em>dynamisk</em> lavtrykkssenter. Det
                dannes ikke av lokal oppvarming, men av kontinuerlig dannelse og oppsamling av
                ekstratropiske sykloner langs <strong>polarfronten</strong>, der kald, tung arktisk
                luft møter mild, fuktig subtropisk luftmasse.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Den geostrofiske vindbalansen
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Hvorfor blåser vinden fra vest mot øst, og ikke rett fra høytrykket ved Azorene nordover
              til lavtrykket ved Island? Svaret ligger i{" "}
              <Link to="/tema/coriolis" className="text-primary underline-offset-2 hover:underline">
                Coriolis-kraften
              </Link>
              . Luft som settes i bevegelse av den nordgående trykkgradientkraften (
              <em>pressure gradient force</em>), avbøyes mot høyre på den nordlige halvkule.
            </p>
            <p className="mt-2 text-sm sm:text-base">
              I den frie troposfæren (over friksjonssjiktet) oppstår det en tilnærmet likevekt mellom
              trykkgradientkraften og Coriolis-kraften — den <strong>geostrofiske balansen</strong>:
            </p>
            <div className="my-3 rounded-lg border border-border/80 bg-card/80 p-3 text-center font-mono text-sm text-foreground">
              u_g = - (1 / (ρ · f)) · (∂P / ∂y)
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">
              der <em>u_g</em> er den sonale vestavinden, <em>ρ</em> er luftens tetthet, <em>f</em> er
              Coriolis-parameteren (<em>f = 2Ω sin φ</em>), og <em>∂P/∂y</em> er trykkgradienten i
              nord–sør-retning. Formelen viser direkte at jo brattere trykkforskjell (større{" "}
              <em>∂P/∂y</em>) det er mellom Azorene og Island, desto kraftigere <strong>må</strong>{" "}
              den sonale vestavinden <em>u_g</em> bli!
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── Seksjon 2: Positiv NAO (NAO+) ───────────────────────────── */}
      <CollapsibleSection
        title="2. Positiv NAO (NAO+ — Den sonale storm-motorveien)"
        subtitle="Dypt Island-L + forsterket Azor-H · Rett, sonal polarjet · Milde, våte og stormfulle vintre i Norge"
        badge="Positiv fase"
        badgeVariant="amber"
      >
        <p>
          Under en positiv NAO-fase forsterkes begge de semi-permanente trykksystemene samtidig:
          Både Islandslavtrykket og Azorhøytrykket blir sterkere enn normalt, så trykkforskjellen
          mellom dem blir større (NOAA, u.å.).
        </p>

        <NaoPositivePhaseDiagram />

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Hvorfor blir polarjeten så sterk og rett?
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Når trykksystemene forsterkes, skjerpes også temperaturgradienten over polarfronten.
              I henhold til{" "}
              <Link to="/tema/jetstrommer" className="text-primary underline-offset-2 hover:underline">
                termalvindligningen
              </Link>{" "}
              betyr en sterk horisontal temperaturgradient at den vertikale vindskjæren øker, noe som
              akselererer polarjeten i 9–11 km høyde. Jetstrømmen blir stabil, sonal (vest–øst) og
              hindres fra å danne store bølger.
            </p>
          </div>

          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Konsekvenser for Norge og Skandinavia under NAO+
            </h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
              <li>
                <strong>Milde temperaturer:</strong> Kontinuerlig tilførsel av maritim luftmasse fra
                Atlanterhavet fortrenger den kalde arktiske luften. Vintertemperaturene blir ofte høyere
                enn normalt.
              </li>
              <li>
                <strong>Voldsom nedbør og orografisk heving:</strong> Når den fuktige vestavinden
                treffer Langfjella, Jotunheimen og kystfjellene på Vestlandet, tvinges den til værs.
                Dette gir kraftig <strong>orografisk nedbør</strong> (ofte flere hundre millimeter i
                løpet av få dager).
              </li>
              <li>
                <strong>Snø i høyfjellet vs. regn ved kysten:</strong> Mens kysten opplever regn,
                sludd og høye flommer, faller nedbøren som snø i høyfjellet fordi temperaturen der
                fortsatt er under frysepunktet.
              </li>
              <li>
                <strong>Isbreene vokser (positiv massebalanse):</strong> Maritime isbreer som
                Nigardsbreen, Briksdalsbreen og Folgefonna mates med enorme snømengder om vinteren.
                Under den sterke NAO+-perioden 1989–1995 rykket breene dramatisk frem (Nesje et al.,
                2000).
              </li>
              <li>
                <strong>Høyt skadepotensial:</strong> Økt risiko for ekstreme vindstormer (f.eks.
                Nyttårsorkanen 1992, Dagmar 2011, Ingunn 2024), jordskred og stormflo.
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Konsekvenser for Sør-Europa og Middelhavet under NAO+
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Mens Nord-Europa opplever uvær og nedbørsrekorder, skjer det stikk motsatte i sør.
              Azorhøytrykket ekspanderer østover og legger et beskyttende lokk over Spania, Portugal,
              Italia og Hellas:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li>Nedsynkende luftmasse kveler sky- og nedbørsdannelse.</li>
              <li>Vintertørke: Vannmagasinene fylles ikke opp, noe som truer landbruk og vannforsyning.</li>
              <li>Ofte kjølige netter med frost i innlandet pga. klarvær og nattlig utstråling.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── Seksjon 3: Negativ NAO (NAO−) ───────────────────────────── */}
      <CollapsibleSection
        title="3. Negativ NAO (NAO− — Den meandrerende blokkeringen)"
        subtitle="Svekket trykkgradient · Bølgete jetstrøm og atmosfærisk blokkering · Arktisk kulde i Norge, regn i Sør-Europa"
        badge="Negativ fase"
        badgeVariant="sky"
      >
        <p>
          I den negative NAO-fasen kollapser den nordatlantiske motoren: både Islandslavtrykket og
          Azorhøytrykket svekkes drastisk. Trykkdifferansen mellom dem kan falle mot null, og i
          enkelte tilfeller kan trykket over Island til og med bli høyere enn over Azorene.
        </p>

        <NaoNegativePhaseDiagram />

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Mekanismen: Hvorfor meandrerer jetstrømmen under NAO−?
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Når trykkgradienten svekkes, mister den sonale vestavinden fart. Når en strøm i
              atmosfæren sakker farten, blir den ustabil og begynner å svinge nord og sør i store{" "}
              <strong>Rossby-bølger</strong> (planetære bølger).
            </p>
          </div>

          <NaoRossbyDiagram />

          <div>
            <p className="text-sm sm:text-base">
              Dersom en rygg i Rossby-bølgen forsterkes over Skandinavia, kan den avsnøres fra det
              generelle vestavindsbeltet og danne et massivt høytrykk som ligger nesten i ro i uke- eller
              månedsvis. Dette fenomenet kalles en{" "}
              <strong>atmosfærisk blokkering</strong> (<em>blocking</em>).
            </p>
          </div>

          <NaoBlockeringDiagram />

          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Konsekvenser for Norge og Skandinavia under NAO−
            </h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
              <li>
                <strong>Kulde fra øst:</strong> Høytrykket roterer med klokken og trekker kald, tørr
                kontinentalluft fra Russland og Nordishavet inn over Norge fra øst og nordøst.
              </li>
              <li>
                <strong>Tørt og lite nedbør:</strong> Nedsynkende luftmasse i høytrykket gir klarvær
                og minimalt med nedbør. Vestlandet opplever en bratt nedgang i vannføringen i elvene.
              </li>
              <li>
                <strong>Bakkeinversjon og helsefarlig byluft:</strong> Under vinterhøytrykk avkjøles
                bakken kraftig ved varmeutstråling i den mørke årstiden. Luften like over bakken blir
                kaldere enn luften lenger opp — det oppstår en <strong>inversjon</strong>. Forurensning
                fra vedfyring og eksos fanges i bygryter (f.eks. Bergen, Oslo, Trondheim).
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Den atlantiske vippen: Hvorfor er Grønland varm når Norge fryser?
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Et kjent trekk ved NAO er at Vest-Grønland og Nord-Europa ofte har motsatt
              temperaturavvik. Under NAO+ er det ofte kaldt på Vest-Grønland og mildt i Norge. Under
              NAO− er det ofte omvendt (NOAA, u.å.). Vinteren 2009/2010 var et eksempel: Norge hadde
              sin 11. kaldeste vinter siden 1900 (Meteorologisk institutt, 2011).
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── Seksjon 4: Interaktiv NAO-simulator ──────────────────────── */}
      <CollapsibleSection
        title="4. Sammenlign fasene (Interaktiv simulator)"
        subtitle="Utforsk og animer trykksystemer, polarjet, stormbaner og vær i sanntid"
        badge="Interaktiv modell"
        badgeVariant="primary"
      >
        <p className="text-sm sm:text-base text-foreground/90">
          Bruk knappene øverst i simuleringen for å veksle direkte mellom <strong>NAO+</strong>,{" "}
          <strong>Nøytral</strong> og <strong>NAO−</strong>. Legg merke til hvordan:
        </p>
        <ul className="mt-2 mb-4 list-disc space-y-1 pl-5 text-xs text-muted-foreground sm:text-sm">
          <li>Trykksentrene roterer (mot klokken rundt L ved Island, med klokken rundt H ved Azorene).</li>
          <li>Partiklene i polarjeten suser raskt og sonalt mot Norge i NAO+, men meandrerer sørover mot Middelhavet i NAO−.</li>
          <li>Stormbanen og lavtrykkene forskyver seg tusenvis av kilometer mellom fasene.</li>
        </ul>
        <NaoInteractiveSimulator />
      </CollapsibleSection>

      {/* ── Seksjon 5: Måling, indekser og stasjoner ─────────────────── */}
      <CollapsibleSection
        title="5. NAO-indeksen: Måling, stasjoner og koblingen til AO"
        subtitle="Stasjonsbasert trykkdifferanse (Reykjavík vs. Azorene/Lisboa) og Arctic Oscillation"
        badge="Måling & Indeks"
        badgeVariant="neutral"
      >
        <p>
          For å kvantifisere NAO-tilstanden og spore hvordan Atlanteren svinger over tiår, har
          meteorologer etablert standardiserte matematiske indekser. Det finnes to hovedmåter å
          beregne NAO-indeksen på:
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              1. Den stasjonsbaserte NAO-indeksen
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Historisk beregnes indeksen som differansen i normalisert lufttrykk ved havnivå mellom
              en sørlig og en nordlig stasjon:
            </p>
            <div className="my-3 rounded-lg border border-border/80 bg-card/80 p-3 text-center font-mono text-sm text-foreground">
              NAO-indeks = P_norm(Sør) − P_norm(Nord)
            </div>
            <p className="text-sm sm:text-base">
              Som nordlig stasjon brukes vanligvis <strong>Reykjavík</strong> eller Stykkishólmur på
              Island. Som sørlig stasjon brukes oftest <strong>Ponta Delgada</strong> på Azorene
              (for å fange det marine høytrykket) eller <strong>Lisboa</strong> i Portugal. Den lengste
              serien, tilbake til 1821, bruker <strong>Gibraltar</strong> (Jones mfl., 1997).
            </p>
          </div>

          <NaoIndexStationsDiagram />

          <div className="pt-2">
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              2. PC-basert indeks (Empirical Orthogonal Function — EOF)
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              I moderne klimaforskning bruker man ofte en <strong>PC-basert indeks</strong> (
              <em>Principal Component analysis</em>). I stedet for bare to stasjoner, analyserer man
              trykkfeltet over hele Nord-Atlanteren (20°–80°N, 90°V–40°Ø) ved hjelp av matematisk
              mønstergjenkjenning (EOF1). Denne metoden fanger opp at trykksentrene kan flytte litt på
              seg fra år til år.
            </p>
          </div>

          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Koblingen til AO (Arctic Oscillation / Den arktiske oscillasjon)
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Du vil ofte se at meteorologer snakker om <strong>AO</strong> i samme åndedrag som NAO.
              Hva er forskjellen?
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
              <li>
                <strong>AO (Den arktiske oscillasjon):</strong> Er en <em>halvkuledekkende</em>{" "}
                ringformet modus (<em>Annular Mode</em>) som måler trykkforskjellen mellom hele
                polkalotten over Arktis (ca. 70°–90°N) og midlere breddegrader (ca. 45°N) rundt hele
                den nordlige halvkule.
              </li>
              <li>
                <strong>NAO:</strong> Er det <em>atlantiske uttrykket</em> for den samme dynamikken.
                Fordi Atlanterhavet er den mest dynamiske delen av denne sirkulasjonen, har NAO og AO
                en korrelasjon på over <strong>0,9 om vinteren</strong>. Når AO er positiv, er nesten
                alltid NAO også positiv.
              </li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── Seksjon 6: Stratosfæren, polarvirvelen og telekoblinger ─── */}
      <CollapsibleSection
        title="6. Stratosfæren, polarvirvelen og telekoblinger"
        subtitle="Sudden Stratospheric Warming (SSW), Rossby-bølgetog og samspill med ENSO i Stillehavet"
        badge="Atmosfærisk dynamikk"
        badgeVariant="primary"
      >
        <p>
          Hva er det egentlig som vipper NAO mellom positiv og negativ fase? Selv om mye av variasjonen
          skyldes kaotisk intern dynamikk i troposfæren, er det to overordnede mekanismer som utøver
          en mektig kontroll: <strong>polarvirvelen i stratosfæren</strong> og{" "}
          <strong>telekoblinger fra det tropiske Stillehavet (ENSO)</strong>.
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Polarvirvelen og Plutselig stratosfærisk oppvarming (SSW)
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Høyt oppe i stratosfæren (10–50 km over bakken) dannes det hver høst et gigantisk,
              iskaldt lavtrykk over Arktis — <strong>den stratosfæriske polarvirvelen</strong>.
              Virvelen omkranses av lynraske sirkumpolare vestavinder (<em>polar night jet</em>).
            </p>
            <p className="mt-2 text-sm sm:text-base">
              Når sterke planetære bølger (Rossby-bølger) forplanter seg oppover fra fjellkjeder og
              hav–land-kontraster, kan de bryte inn i stratosfæren som bølger mot en strand. Dette
              kan utløse en <strong>Plutselig stratosfærisk oppvarming</strong> (<em>Sudden
              Stratospheric Warming — SSW</em>) (Baldwin & Dunkerton, 2001). I løpet av få dager kan
              temperaturen i stratosfæren over Nordpolen stige med <strong>30–50 °C</strong>!
            </p>
          </div>

          <NaoSswBreakdownDiagram />

          <p className="text-sm sm:text-base">
            Under en SSW kollapser virvelen: den enten forskyves bort fra polen (<em>displacement</em>)
            eller splittes i to dattersentre (<em>vortex split</em>). De sirkumpolare vestavindene
            bremses opp og reverseres til østavinder. Dette signalet forplanter seg gradvis nedover
            gjennom atmosfæren i løpet av <strong>2–4 uker</strong>. Når signalet når overflaten,
            øker sjansen for en negativ NAO-fase i flere uker. Derfor kan en SSW gi et forvarsel om
            økt sjanse for kalde perioder i Nord-Europa, men ikke alle SSW-er gir negativ NAO (Baldwin
            &amp; Dunkerton, 2001).
          </p>

          <div className="pt-2">
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Telekoblinger: Hvordan ENSO snakker med NAO
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Selv om Stillehavet ligger på den andre siden av kloden, er atmosfæren et sammenhengende
              fluid. Ekstreme omveltninger i tropisk konveksjon under{" "}
              <Link to="/tema/klima/enso" className="text-primary underline-offset-2 hover:underline">
                ENSO (El Niño og La Niña)
              </Link>{" "}
              forplanter seg via atmosfæriske Rossby-bølgetog:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li>
                <strong>El Niño:</strong> Den voldsomme konveksjonen i det sentrale og østlige
                Stillehavet sender kraftige Rossby-bølger nordøstover over Nord-Amerika
                (PNA-mønsteret). El Niño-vintre gir noe oftere en{" "}
                <strong>negativ NAO (NAO−)</strong> i senvinteren og kaldere vær i Nord-Europa, men
                sammenhengen er svak og gjelder ikke hvert år (Brönnimann, 2007).
              </li>
              <li>
                <strong>La Niña:</strong> Kjølig hav i øst gir færre oppadgående forstyrrelser.
                Polarvirvelen forblir oftere sterk og uforstyrret, noe som statistisk favoriserer en
                stabil, rett polarjet og <strong>positiv NAO (NAO+)</strong> over Norge.
              </li>
            </ul>
          </div>

          <NaoEnsoTeleconnectionDiagram />
        </div>
      </CollapsibleSection>

      {/* ── Seksjon 7: NAO i en varmere verden og koblingen til AMOC ──── */}
      <CollapsibleSection
        title="7. NAO i en varmere verden og koblingen til AMOC"
        subtitle="Arktisk forsterkning, dypvannsdannelse i Labradorsjøen og havets minne"
        badge="Klimaendringer"
        badgeVariant="teal"
      >
        <p>
          Hvordan påvirkes NAO av global oppvarming, og hvordan påvirker NAO havet tilbake? Forholdet
          mellom atmosfærens trykkvippe og verdenshavet er en toveiskobling som opererer på vidt
          forskjellige tidsskalaer.
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              NAOs påvirkning på havet og AMOC (Golfstrømsystemet)
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Atmosfæren endrer seg fra dag til dag, men havet har en enorm termisk treghet. Når NAO
              låser seg i en fase over flere år (som på 1990-tallet), setter den dype spor i{" "}
              <Link to="/tema/klima/amoc" className="text-primary underline-offset-2 hover:underline">
                AMOC (den atlantiske veltestrømmen)
              </Link>
              :
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
              <li>
                <strong>Under langvarig NAO+:</strong> Kraftige, iskalde vinder over Labradorhavet
                trekker varme ut av overflatevannet. Vannet blir tettere, synker til
                bunns og stimulerer dypvannsdannelsen. Dette kan <strong>styrke AMOC</strong> med en
                tidsforsinkelse på 2–5 år.
              </li>
              <li>
                <strong>Under langvarig NAO−:</strong> Svakere vinder gir mindre avkjøling og
                redusert dypvannsdannelse i Labradorsjøen, noe som kan bidra til å bremse
                veltestrømmen.
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
            <h4 className="font-display text-base font-semibold tracking-tight text-primary">
              Arktisk forsterkning og debatten om en «mer bølgete» jetstrøm
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Arktis varmes nå opp tre til fire ganger raskere enn det globale gjennomsnittet — et
              fenomen kjent som <strong>arktisk forsterkning</strong> (<em>Arctic Amplification</em>),
              drevet av smelting av havis og snø (is-albedo-tilbakekobling).
            </p>
            <p className="mt-2 text-sm sm:text-base">
              Dette har utløst en stor vitenskapelig debatt innen klimaforskningen:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li>
                <strong>Francis & Vavrus-hypotesen:</strong> Når Arktis blir varmere, reduseres
                temperaturforskjellen mellom polen og ekvator. I henhold til termalvindligningen må
                da den overordnede vestavinden svekkes. En svakere jetstrøm meandrerer lettere i dype
                Rossby-bølger, noe som teoretisk kan gi flere langvarige blokkeringer (NAO−-lignende
                situasjoner med ekstremkulde om vinteren eller hetebølger om sommeren).
              </li>
              <li>
                <strong>Modellusikkerhet:</strong> Samtidig viser mange avanserte klimamodeller at
                oppvarming i den øvre troposfæren over subtropene kan motvirke denne effekten. Det er
                derfor fortsatt et åpent og aktivt forskningsspørsmål om fremtidens vintre vil bli
                dominert av sonale stormer (NAO+) eller fastlåste blokkeringer (NAO−).
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Paleoklima: NAO gjennom tusener av år
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Akkurat som koraller brukes for ENSO, bruker geoforskere <strong>dryppsteiner (speleothemer)</strong>{" "}
              i huler i Skottland og Spania, samt sedimentkjerner og grønlandske iskjerner, til å
              rekonstruere NAO tusenvis av år tilbake i tid. Analyser av vekstringer og oksygenisotoper
              viser at den nordatlantiske vippen har svingt naturlig i tusener av år, men at 1900-tallets
              vedvarende positive fase var blant de sterkeste i løpet av det siste årtusenet.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── Ekstreme NAO-vintre i nyere tid ───────────────────────────── */}
      <EkstremeNaoVintre />

      {/* ── 3. Eksamensbokser ────────────────────────────────────────── */}
      <Callout title="Til eksamen">
        <p>
          På eksamen i Geofag 2 må du kunne gjøre rede for den fullstendige årsakskjeden for begge
          faser av NAO:
        </p>
        <p className="mt-2">
          <strong>Årsakskjede for Positiv NAO (NAO+):</strong>
          <br />
          <strong>
            1. Dypt Islandslavtrykk + kraftig Azorhøytrykk → 2. Bratt trykkgradient (stor ΔP) →
            3. Sterk geostrofisk balanse gir rask, rett og sonal polarjet (~60°N) → 4. Stormbanen
            peker direkte mot Norskehavet og Vestlandet → 5. Milde, fuktige atlantiske luftmasser gir
            orografisk forsterket regn ved kysten, store snømengder i fjellet og vekst på maritime
            breer → 6. Sør-Europa og Middelhavet blokkeres og opplever vintertørke.
          </strong>
        </p>
        <p className="mt-2">
          <strong>Årsakskjede for Negativ NAO (NAO−):</strong>
          <br />
          <strong>
            1. Svakt Islandslavtrykk + svakt Azorhøytrykk → 2. Slak trykkgradient (liten ΔP) →
            3. Svekket vestavind gjør polarjeten ustabil, den meandrerer i store Rossby-bølger →
            4. Et blokkerende høytrykk (Omega-blokkering) legger seg over Skandinavia og ligger nesten i ro →
            5. Kald, tørr kontinentalluft fra Russland og Nordishavet trekkes inn over Norge (kulde,
            klarvær og inversjon) → 6. Stormbanen presses sørover og gir mer regn og storm i Sør-Europa.
          </strong>
        </p>
        <p className="mt-2">
          <strong>Sensorfavoritter:</strong>
          <br />
          • Forklar <em>«seesaw»-effekten</em>: Hvorfor opplever Vest-Grønland unormal varme når
          Norge er kaldere enn normalt under NAO−? (Fordi trykkmønsteret under NAO− gir oftere nordlig og
          østlig luft over Nord-Europa og mildere luft mot Vest-Grønland (NOAA, u.å.).)
          <br />
          • Forklar rollen til <em>SSW (Sudden Stratospheric Warming)</em>: Hvorfor kan en
          oppvarming i stratosfæren 30 km over Nordpolen øke sjansen for at det blir kaldere enn normalt
          i Norge noen uker senere?
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          <em>NAO er ikke en havstrøm!</em> En svært vanlig elevfeil er å forveksle NAO med
          Golfstrømmen eller AMOC. NAO er et <strong>atmosfærisk trykkmønster</strong> (vind og lufttrykk).
          Atmosfæren og havstrømmene påvirker hverandre gjensidig, men NAO er ikke vann i bevegelse.
        </p>
        <p>
          <em>Positiv NAO betyr ikke varmere vær over hele Europa.</em> NAO+ gir mildt vær i
          Nordvest-Europa, men kjøligere og tørrere forhold i Middelhavsområdet.
        </p>
        <p>
          <em>NAO-indeksen måler trykkforskjell, ikke temperatur.</em> Selv om den styrer temperatur
          og nedbør i Norge, er selve indeksen definert av <strong>lufttrykket ved havnivå</strong>{" "}
          (hPa) mellom to geografiske punkter.
        </p>
        <p>
          <em>Telekoblinger er statistiske tendenser, ikke bastante garantier.</em> Selv om El Niño
          øker sannsynligheten for NAO−, kan kaotiske lokale værforstyrrelser i Atlanteren overstyre
          signalet i enkeltmåneder.
        </p>
      </Callout>

      {/* ── 4. Begrepskort ───────────────────────────────────────────── */}
      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="NAO (Nordatlantisk oscillasjon)"
          def="Svingning i lufttrykksforskjellen mellom Azorhøytrykket og Islandslavtrykket som styrer vestavindsbeltet over Nord-Atlanteren."
        />
        <Term
          name="NAO+"
          def="Positiv fase: Bratt trykkgradient, sterk sonal polarjet, milde, våte og stormfulle vintre i Norge, tørke i Sør-Europa."
        />
        <Term
          name="NAO−"
          def="Negativ fase: Slak trykkgradient, meandrerende jetstrøm, blokkerende høytrykk, streng arktisk kulde i Norge og regn i Middelhavet."
        />
        <Term
          name="Geostrofisk vind"
          def="Teoretisk vind som oppstår ved eksakt balanse mellom trykkgradientkraften og Coriolis-kraften. u_g = -(1/ρf)(∂P/∂y)."
        />
        <Term
          name="Polarjet"
          def="Hurtig vestlig luftstrøm i 9–11 km høyde langs polarfronten drevet av temperaturkontrasten mellom Arktis og subtropene."
        />
        <Term
          name="Stormbane (Storm track)"
          def="Hovedkorridoren som lavtrykk og sykloner følger over Nord-Atlanteren mot Europa."
        />
        <Term
          name="Rossby-bølger"
          def="Store planetære meandrer i jetstrømmen forårsaket av jordrotasjon og temperaturkontraster. Danner trau (L) og rygger (H)."
        />
        <Term
          name="Blokkerende høytrykk"
          def="Mektig høytrykk som ligger nesten i ro (f.eks. Omega-blokkering), og som tvinger jetstrøm og lavtrykk til å ta store omveier i ukevis."
        />
        <Term
          name="Polarvirvel (Polar vortex)"
          def="Sirkumpolart stratosfærisk lavtrykk over Arktis om vinteren som sperrer inne den kaldeste arktiske luften."
        />
        <Term
          name="SSW (Plutselig stratosfærisk oppvarming)"
          def="Brått temperaturhopp (+30–50 °C) i stratosfæren som forstyrrer eller splitter polarvirvelen. Etterpå øker sjansen for negativ NAO i flere uker."
        />
        <Term
          name="AO (Arctic Oscillation)"
          def="Halvkuledekkende trykkmodus mellom Arktis og midlere breddegrader, sterkt korrelert med NAO om vinteren."
        />
        <Term
          name="Orografisk nedbør"
          def="Nedbør som oppstår når fuktig maritim vind tvinges opp over fjell (f.eks. Vestlandsfjellene), avkjøles og kondenserer."
        />
        <Term
          name="Telekobling"
          def="Klimatiske sammenhenger over enorme avstander, f.eks. hvordan ENSO i Stillehavet påvirker NAO via atmosfæriske bølgetog."
        />
        <Term
          name="Seesaw-effekten"
          def="Det motsatte temperaturforholdet mellom Skandinavia og Vest-Grønland/Canada under ekstreme NAO-faser."
        />
      </TermGrid>

      {/* ── 5. Quiz ─────────────────────────────────────────────────── */}
      <Quiz
        questions={[
          {
            prompt:
              "Hva kjennetegner trykkforholdene og polarjeten under en sterkt positiv NAO-fase (NAO+)?",
            options: [
              "Både Islandslavtrykket og Azorhøytrykket er svekket, og polarjeten meandrerer langt sør mot Sahara.",
              "Islandslavtrykket er uvanlig dypt og Azorhøytrykket er sterkt; den bratte trykkgradienten gir en rask, rett og sonal polarjet mot Nord-Europa.",
              "Azorhøytrykket forsvinner helt, og all vind snur til østlig retning over Atlanteren.",
              "Trykket over Island stiger til 1040 hPa og danner en Omega-blokkering som ligger nesten i ro.",
            ],
            answer: 1,
            explain:
              "Under NAO+ er begge de semi-permanente trykksentrene forsterket. Den bratte trykkgradienten gir en sterk geostrofisk balanse, som driver en rett, sonal polarjet og lavtrykksmotorvei rett inn mot Vestlandet og Norskehavet.",
          },
          {
            prompt:
              "Hvilket vintervær er typisk for Norge når NAO-indeksen er sterkt negativ (NAO−)?",
            options: [
              "Milde temperaturer, kraftig vestavind, regnskyll ved kysten og rekordstor snøakkumulasjon på vestlandsbreene.",
              "Knusktørt, vindstille og kaldere enn normalt, med kald, tørr kontinentalluft fra Russland og Nordishavet under et blokkerende høytrykk og fare for bakkeinversjon i byene.",
              "Tropiske hetebølger med temperaturer over 25 °C over hele Skandinavia.",
              "Konstant vestavindsstorm og ekstrem stormflo langs hele kysten.",
            ],
            answer: 1,
            explain:
              "Under NAO− svekkes vestavinden og polarjeten meandrerer. Et mektig blokkerende høytrykk etablerer seg over Skandinavia og trekker tørr, iskald kontinentalluft fra øst/nordøst over Norge.",
          },
          {
            prompt:
              "Hva skjer med været i Sør-Europa og Middelhavet når Norge opplever en mild og stormfull NAO+-vinter?",
            options: [
              "Sør-Europa opplever nøyaktig det samme været som Norge: voldsom nedbør og flom.",
              "Middelhavsområdet opplever tørt, solrikt vær og fare for vintertørke fordi det forsterkede Azorhøytrykket blokkerer lavtrykkene.",
              "Middelhavet fryser til is pga. arktisk luftmasse.",
              "Polarjeten flytter seg helt ned til ekvator og danner tropiske orkaner i Hellas.",
            ],
            answer: 1,
            explain:
              "NAO fungerer som en vippe: Når stormbanen flyttes nordover mot Norge under NAO+, brer Azorhøytrykket seg ut over Den iberiske halvøy og Middelhavet. Synkende luft gir stabilt, tørt vær og fare for tørke i sør.",
          },
          {
            prompt:
              "Hva menes med den meteorologiske «seesaw»-effekten mellom Norge og Vest-Grønland under NAO−?",
            options: [
              "At havoverflaten stiger med 1 meter på Grønland og synker med 1 meter i Norge.",
              "At Norge og Vest-Grønland ofte har motsatt temperaturavvik: når Norge har kulde, er det ofte mildt på Vest-Grønland, og omvendt.",
              "At vindretningen veksler mellom øst og vest hvert 10. minutt.",
              "At jordskjelv på Island tipper jordskorpen mellom Grønland og Norge.",
            ],
            answer: 1,
            explain:
              "NAO endrer hvor vestavinden og stormene går. Under NAO+ er det ofte mildt i Norge og kaldt på Vest-Grønland. Under NAO− er det ofte omvendt.",
          },
          {
            prompt:
              "Hva er en Sudden Stratospheric Warming (SSW), og hvordan henger den sammen med vinterværet i Norge?",
            options: [
              "En oppvarming av havet ved Azorene som smelter korallrev på under 24 timer.",
              "Et brått temperaturhopp (+30–50 °C) i stratosfæren over Arktis som forstyrrer eller splitter polarvirvelen, og 2–4 uker senere ofte utløser en dyp NAO− med kulde i Norge.",
              "Et lokalt fenomen i troposfæren over Oslofjorden forårsaket av bilkjøring.",
              "En permanent global oppvarming som gjør at det aldri mer kan bli kuldegrader i Skandinavia.",
            ],
            answer: 1,
            explain:
              "Når planetære bølger bryter opp i stratosfæren, kan polarvirvelen kollapse i en SSW. Signalet forplanter seg ned i troposfæren over 2–4 uker, svekker Islandslavtrykket og etablerer et blokkerende høytrykk som fører kald, tørr kontinentalluft fra Russland og Nordishavet inn over Norden (dyp NAO−).",
          },
          {
            prompt:
              "Hvorfor rykket maritime vestlandsbreer som Briksdalsbreen og Nigardsbreen frem på 1990-tallet?",
            options: [
              "Fordi sommertemperaturene sank til under -10 °C på Vestlandet.",
              "Fordi en vedvarende serie med sterkt positive NAO-vintre (NAO+) pumpet enorme snømengder inn over fjellet, som ga kraftig positiv vinterbalanse.",
              "Fordi Golfstrømmen stoppet helt opp og gjorde Norskehavet bunnfrossent.",
              "Fordi permafrosten ekspanderte ned til havnivå i Sogn og Fjordane.",
            ],
            answer: 1,
            explain:
              "I perioden 1989–1995 var NAO uvanlig sterkt positiv. De fuktige vestavindene ga rekordstor orografisk vintersnø på breene i høyfjellet, som oversteg sommerens bresmelting og førte til rask fremrykking (Nesje et al., 2000).",
          },
          {
            prompt:
              "Hvordan beregnes den tradisjonelle stasjonsbaserte NAO-indeksen?",
            options: [
              "Ved å ta gjennomsnittstemperaturen i Madrid minus temperaturen i Tromsø.",
              "Som den normaliserte lufttrykksforskjellen ved havnivå mellom en sørlig stasjon (Ponta Delgada/Lisboa) og en nordlig stasjon (Reykjavík).",
              "Ved å telle antall lavtrykk som passerer Nordsjøen i løpet av ett kalenderår.",
              "Ved å måle havtemperaturen i Niño 3.4-regionen i Stillehavet.",
            ],
            answer: 1,
            explain:
              "NAO-indeksen er en barometrisk indeks: P_norm(Sør) − P_norm(Nord). Den måler styrken på den horisontale trykkgradienten som driver vestavindene over Atlanteren.",
          },
          {
            prompt:
              "Hvordan kan en kraftig El Niño i Stillehavet påvirke NAO-systemet over Atlanteren?",
            options: [
              "Vannet fra Stillehavet renner direkte gjennom Panamakanalen og varmer opp Nordsjøen.",
              "El Niño sender ut planetære Rossby-bølgetog over Nord-Amerika som kan forstyrre polarvirvelen og statistisk øke sjansen for NAO− i Europa.",
              "El Niño slår av jordrotasjonen slik at Coriolis-effekten opphører i Nord-Atlanteren.",
              "El Niño har absolutt ingen fysisk mulighet til å påvirke været utenfor Sør-Amerika.",
            ],
            answer: 1,
            explain:
              "Via atmosfæriske telekoblinger (PNA-mønsteret) genererer El Niños tropiske konveksjon bølgetog som forplanter seg inn i stratosfæren, forstyrrer polarvirvelen og øker sannsynligheten for en meandrerende jet og negativ NAO i Europa.",
          },
        ]}
      />
    </TopicLayout>
  );
}
