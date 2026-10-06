import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import { CarbonCycleDiagram, SpheresDiagram } from "@/components/diagrams/spheres";
import { EarthSystemsModel } from "@/components/models/earth-systems-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("jordsystemene")!;
const lenke = "text-primary underline-offset-2 hover:underline";

export const Route = createFileRoute("/geofag-1/jordsystemene")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/jordsystemene",
    }),
  component: JordsystemenePage,
});

function JordsystemenePage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Jorden er ikke en samling isolerte deler, men et helhetlig, koblet termodynamisk system. Masse og energi utveksles uavbrutt mellom fem delsystemer: geosfæren, hydrosfæren, atmosfæren, kryosfæren og biosfæren. Her undersøker vi hvordan vekselvirkninger og tilbakekoblingsmekanismer styrer alt fra kjemisk forvitring og istidslandskap til klodens naturlige geologiske termostat."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1",
        label: "Oversikt: Geofag 1",
      }}
      next={{
        to: "/geofag-1/platetektonikk",
        label: "Neste: Platetektonikk",
      }}
      kilder={KILDER.jordsystemene}
      posterSlug="jordsystemene"
      bodyMode="coded"
    >
      <Callout title="Kompetansemål i LK20 (Geofag 1)">
        <p>
          Målet for kapittelet er at eleven skal kunne{" "}
          <em>
            gjøre rede for vekselvirkninger mellom jordsystemene og hvordan de påvirker geosfæren og hydrosfæren
          </em>
          , samt forstå hvordan masse- og energibalanser opprettholder planetens dynamiske likevekt over ulike tidsskalaer.
        </p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Kjerneelementer som dekkes i dette kapittelet:</strong></p>
          <p>• <em>Jordens delsystemer:</em> Geosfære, hydrosfære, atmosfære, kryosfære og biosfære som sammenkoblede åpne systemer.</p>
          <p>• <em>Geomorfologiske vekselvirkninger:</em> Fysisk og kjemisk forvitring, erosjon, sedimentære kretsløp og isostasi.</p>
          <p>• <em>Biogeokjemiske kretsløp og tilbakekoblinger:</em> Det geologiske karbonkretsløpet, Walker-tilbakekoblingen (silikatforvitring som termostat) og vulkansk klimaeffekt.</p>
        </div>
      </Callout>

      {/* 1. JORDENS FEM DELSYSTEMER */}
      <CollapsibleSection
        title="Jordens fem delsystemer: Masse- og energiflukser"
        subtitle="Åpne delsystemer, likevekter og geokjemisk samvirke"
        badge="Systemlære"
        badgeVariant="teal"
        defaultOpen={true}
      >
        <p>
          I geovitenskapen betrakter vi planeten Jorden som et samlet system. Med unntak av meteorittnedslag og
          tap av lette hydrogengasser til verdensrommet, er Jorden som helhet et <strong>lukket system for masse</strong>,
          men et <strong>åpent system for energi</strong> (innkommende kortbølget solstråling og utgående langbølget
          varmestråling).
        </p>
        <p>
          Innvendig er planeten delt inn i fem dynamiske delsystemer (sfærer) som alle er <strong>åpne systemer</strong>:
          De utveksler både masse og termisk, kjemisk og mekanisk energi med hverandre kontinuerlig:
        </p>

        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Geosfæren (den faste jorden):</strong> Jordskorpen, mantelen og jordens kjerne. I Geofag 1
            fokuserer vi primært på overflatens berggrunn, løsmasser og jordsmonn, samt de dype tektoniske drivkreftene.
          </li>
          <li>
            <strong>Hydrosfæren (vannets sfære):</strong> Alt flytende vann på planeten. Mens oseanografi og havstrømmer
            hører hjemme i Geofag 2, er tyngdepunktet i Geofag 1 <em>ferskvannssporet</em>: elver, innsjøer, porevann
            og grunnvann som aktivt former landskapet og forsyner samfunnet.
          </li>
          <li>
            <strong>Atmosfæren (gasskappen):</strong> Luftlaget som omgir jorden, sammensatt av nitrogen (78 %),
            oksygen (21 %), argon (0,9 %) og variable spor- og drivhusgasser (CO₂, H₂O, CH₄). Atmosfæren fungerer som
            en drivende agent for forvitring og erosjon via nedbør, vind og temperaturvekslinger.
          </li>
          <li>
            <strong>Kryosfæren (den frosne sfæren):</strong> Snø, havis, permafrost, tele og isbreer. Is er en
            monumental geomorfologisk gravemaskin som har skåret ut Norges fjorder og dalfører.
          </li>
          <li>
            <strong>Biosfæren (livets sfære):</strong> Alle levende organismer, fra dypbakterier i jordskorpen og
            plankton i havet til barskog og mennesker. Biosfæren produserer oksygen, driver jordsmonndannelse og
            påvirker forvitringshastigheter.
          </li>
        </ul>

        <div className="my-6">
          <SpheresDiagram />
        </div>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Drivere og mottakere i Geofag 1
        </h3>
        <p>
          I læreplanen for Geofag 1 defineres <strong>geosfæren og hydrosfæren</strong> som de sentrale
          <em> mottakerne</em>. Berggrunnen og ferskvannet utgjør lerretet der sporene etter prosessene avsettes.
          <strong> Atmosfæren, kryosfæren og biosfæren</strong> opptrer i denne sammenhengen som <em>drivere</em>:
          De tilfører kinetisk og kjemisk energi, knuser og løser opp mineraler, transporterer partikler og
          endrer vannbalansen i nedbørsfeltene.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <OrdBoks
            ord="Vekselvirkning"
            barn="En endring i ett delsystem som utløser respons eller tilbakekobling i ett eller flere andre delsystemer."
          />
          <OrdBoks
            ord="Dynamisk likevekt"
            barn="En tilstand der flukser av masse og energi inn og ut av et delsystem balanserer hverandre over tid."
          />
        </div>
      </CollapsibleSection>

      {/* 2. FORVITRING OG EROSJON */}
      <CollapsibleSection
        title="Forvitring og erosjon: Grenseflaten mellom sfærene"
        subtitle="Mekaniske og kjemiske nedbrytningsprosesser i felt"
        badge="Geomorfologi"
        badgeVariant="amber"
      >
        <p>
          Den mest direkte og synlige vekselvirkningen mellom geosfæren, atmosfæren og hydrosfæren i norsk natur er
          nedbrytningen av fast fjell. I geofag må vi skille knivskarpt mellom begrepene <strong>forvitring</strong> og
          <strong> erosjon</strong>:
        </p>

        <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-base font-semibold text-amber-400">Forvitring (In situ)</h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Fysisk oppsprekking eller kjemisk oppløsning av mineraler og bergarter <strong>på stedet</strong>,
                uten at materialet transporteres bort. Forvitringen svekker fjellets mekaniske styrke og
                forbereder massene for transport.
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold text-teal-400">Erosjon (Nedsliting + Transport)</h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Løsrivelse, nedsliting og <strong>borttransport</strong> av forvitret materiale ved hjelp av et
                bevegelig medium: rennende vann (fluvial), breis (glasial), vind (eolisk) eller ren gravitasjon (skred).
              </p>
            </div>
          </div>
        </div>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
          Mekanisk forvitring i et arktisk/borealt klima
        </h3>
        <p>
          Mekanisk (fysisk) forvitring bryter bergmassen opp i mindre fragmenter uten å endre mineralenes kjemiske
          sammensetning. I Norge domineres prosessen av to mekanismer:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Frostsprengning (Frost forvitring):</strong> Flytende vann fra hydrosfæren siver inn i sprekker og
            spalter i geosfæren. Når temperaturen i atmosfæren faller under 0 °C, fryser vannet til is. Fordi is har en
            krystallstruktur med lavere tetthet enn flytende vann, <strong>utvider volumet seg med ca. 9 %</strong>.
            I lukkede sprekker kan dette generere et hydrostatisk sprengtrykk på over 200 MPa (2000 atmosfærer),
            langt mer enn bergartens strekkfasthet. Fjellet kiles gradvis fra hverandre til blokkmark og ur.
          </li>
          <li>
            <strong>Trykkavlastning (Eksfoliasjon):</strong> Bergarter som granitt og gabbro krystalliserte under
            enormt litostatisk trykk dypt nede i skorpen. Når overliggende bergmasser eroderes bort, avlastes trykket.
            Fjellmassen ekspanderer elastisk oppover, sprekker opp i horisontale flak parallelle med overflaten
            (avskalling) og danner karakteristiske granittkupler.
          </li>
          <li>
            <strong>Rotsprengning (Biosfære til geosfære):</strong> Planterøtter trenger inn i mikroskopiske sprekker.
            Når treet vokser og rotdiameteren øker, utøves betydelig mekanisk kraft som kiler bergartene fra hverandre.
          </li>
        </ul>

        <PhotoFigure
          src="/images/fig-forvitring.jpg"
          alt="Sprekk i metamorf gneis fylt med is der steinblokker kiles fra hverandre i høyfjellet"
          heading="Mekanisk frostforvitring i oppsprukket fjell"
          caption="Vann fra hydrosfæren fyller sprekker i geosfæren. Når temperaturen i atmosfæren synker under frysepunktet, ekspanderer isen med 9 % og overskrider bergartens strekkfasthet. Resultatet er mekanisk oppsprekking uten kjemisk modifikasjon, som gradvis forvandler fast fjell til ur og blokkmark."
          marks={[
            { x: 38, y: 32, n: "1", text: "Isfylt spalt", tone: "cold" },
            { x: 68, y: 58, n: "2", text: "Forvitret blokk", tone: "warm" },
          ]}
          points={[
            { n: "1", label: "Frostsprengning: Fasovergang fra vann til is gir 9 % volumøkning og opptil 200 MPa sprengtrykk i sprekken." },
            { n: "2", label: "Blokkmark: Fragmentene beholder opprinnelig mineralsammensetning, men overflatearealet mangedobles, noe som akselererer videre kjemisk forvitring." },
          ]}
        />

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
          Kjemisk forvitring: Mineraler i likevekt med overflateforhold
        </h3>
        <p>
          Mineraler dannet ved høye temperaturer og trykk i dypet (som olivin, pyroksen og kalsiumrik plagioklas)
          er termodynamisk ustabile ved jordoverflaten. Kjemisk forvitring endrer mineralenes kjemiske bindinger
          og omdanner dem til nye sekundærmineraler (særlig leirmineraler og jernoksider) samt oppløste ioner:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Oppløsning (Karbonatløsning):</strong> Regnvann absorberer CO₂ fra atmosfæren og jordsmonnet og danner
            svak karbonsyre:
            <br />
            <code className="text-primary font-mono text-xs">H₂O + CO₂ ⇄ H₂CO₃ ⇄ H⁺ + HCO₃⁻</code>.
            <br />
            Karbonsyren reagerer lynraskt med kalsiumkarbonat i kalkstein og marmor:
            <br />
            <code className="text-primary font-mono text-xs">CaCO₃ + H₂CO₃ ⇄ Ca²⁺ + 2HCO₃⁻</code>.
            <br />
            Dette skaper karstlandskap, underjordiske grotter og kalkrikt, hardt grunnvann (typisk i Oslofeltet og Nordland).
          </li>
          <li>
            <strong>Hydrolyse:</strong> H⁺-ioner i surt vann trenger inn i krystallgitteret til feltspat i granitt og gneis.
            Kalium, natrium og kalsium vaskes ut, og silikatstrukturen kollapser til leirmineraler (kaolinitt og illitt).
            Kvarts (SiO₂) er derimot kjemisk resistent og blir liggende igjen som sandkorn.
          </li>
          <li>
            <strong>Oksidasjon:</strong> Mineraler som inneholder toverdig jern (Fe²⁺), som biotitt og pyritt, oksideres
            ved kontakt med atmosfærisk oksygen (O₂) til treverdig jern (Fe³⁺). Dette danner rustrøde mineraler som
            hematitt (Fe₂O₃) og goethitt (FeO(OH)), som gir fjellet en rødbrun forvitringshud.
          </li>
        </ul>
      </CollapsibleSection>

      {/* 3. KRYOSFÆREN OG ISOSTASI */}
      <CollapsibleSection
        title="Kryosfæren: Isbreer som landskapsarkitekter og isostatisk likevekt"
        subtitle="Bremekanikk, skuring, morener og postglasial landheving"
        badge="Kryosfære & Isostasi"
        badgeVariant="sky"
      >
        <p>
          I Geofag 1 behandles kryosfæren ikke primært som en del av det meteorologiske klimasystemet, men som en
          <strong> geomorfologisk gravemaskin</strong> i geosfæren og en gigantisk regulator for hydrosfæren.
          Gjennom kvartærtiden (de siste 2,6 millioner årene) har innlandsiser formet det norske landskapet fullstendig.
        </p>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Bremekaniske erosjonsprosesser
        </h3>
        <p>
          En isbre eroderer underlaget gjennom to sammenkoblede prosesser:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-foreground/90">
          <li>
            <strong>Plukking (Quarrying / Glacial plucking):</strong> Smeltevann under sålen trenger ned i sprekker
            i fjellet på lesiden av knauser. Trykkendringer gjør at vannet fryser og sprenger løs hele steinblokker,
            som deretter fryser fast i sålen og slepes med isstrømmen.
          </li>
          <li>
            <strong>Sliping (Abrasion):</strong> De innfrosne steinblokkene og gruskornene i bresålen fungerer som
            et gigantisk smergelpapir mot berggrunnen under enormt overliggende istrykk. Dette polerer fjellet,
            skaper parallelle <em>skuringsstriper</em> som avslører isens bevegelsesretning, og knuser bergartene
            til ultrafint breslam («steinmel»).
          </li>
        </ol>

        <PhotoFigure
          src="/images/fig-vestlandet.jpg"
          alt="Vestlandsk fjordlandskap med dype U-daler, hengedaler og bratte fjellsider formet av isbreer"
          heading="Glasial U-dal og overfordypet fjordlandskap"
          caption="Kombinasjonen av bresliping og plukking omdannet preglasiale V-daler til dype U-daler med traugformet profil, hengende sidedaler og dype fjordbassenger. Fjordene er simpelthen undersjøiske forlengelser av U-dalene, gravd ut langt under datidens havnivå."
          marks={[
            { x: 32, y: 45, n: "1", text: "U-dalens bratte vegg", tone: "cold" },
            { x: 74, y: 38, n: "2", text: "Hengende sidedal", tone: "warm" },
            { x: 50, y: 72, n: "3", text: "Overfordypet fjordbunn", tone: "teal" },
          ]}
          points={[
            { n: "1", label: "U-dal (Traugprofil): Innlandsisen fylte hele dalprofilet og eroderte like sterkt på dalsidene som i bunnen." },
            { n: "2", label: "Hengende dal: Mindre sidebreer hadde lavere eroderende kraft enn hovedbreen, slik at sidedalen munner ut høyt oppe i fjellsiden som en foss." },
            { n: "3", label: "Fjordterskel og basseng: Der isbreen nådde havet og begynte å flyte (kalve), avtok erosjonstrykket og dannet grunne terskler ved fjordmunningen (f.eks. Sognefjorden, 1308 m dyp innaskjærs mot 100 m på terskelen)." },
          ]}
        />

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
          Isostasi: Litosfærens elastiske flytevekt på astenosfæren
        </h3>
        <p>
          Prinsippet om <strong>isostasi</strong> er et av de mest fundamentale eksemplene på kobling mellom
          kryosfæren og geosfæren. Litosfæren flyter hydrostatisk på den plastiske astenosfæren etter Arkimedes&apos; lov:
        </p>
        <p>
          Under siste istid (Weichsel) lå det en opptil 3000 meter tykk innlandsis over Skandinavia. Vekten av isen
          presset litosfæren ned med flere hundre meter ved at seigt mantelmateriale i astenosfæren ble presset sideveis
          vekk. Da isen smeltet raskt bort for mellom 11 700 og 9 000 år siden, forsvant belastningen. Litosfæren begynte
          å heve seg tilbake mot likevekt:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Marin grense (MG):</strong> Det høyeste nivået havet nådde etter at isen trakk seg tilbake.
            I Oslo-området ligger marin grense på ca. <strong>220 meter over dagens havnivå</strong>, mens den på
            Jæren og Vestlandet ligger på 20–30 meter.
          </li>
          <li>
            <strong>Postglasial landheving i dag:</strong> Hevingen pågår fremdeles! Rundt innerste del av Oslofjorden
            og i Bottenviken hever landet seg med henholdsvis 3–4 mm/år og opptil 9 mm/år, fordi mantelmassen under
            kontinentet strømmer langsomt tilbake med enorm viskositet (~10²¹ Pa·s).
          </li>
          <li>
            <strong>Geofaglige konsekvenser for løsmasser:</strong> Leire avsatt på havbunnen under istiden ligger i
            dag på tørt land under marin grense. Gjennom tusenvis av år vasker ferskt grunnvann ut saltet fra porevannet
            i leiren, noe som danner USTABIL <strong>kvikkleire</strong> som kan kollapse i katastrofale flakskred
            (se kapittelet om <Link to="/geofag-1/skred" className={lenke}>skred</Link>).
          </li>
        </ul>
      </CollapsibleSection>

      {/* 4. DET GLOBALE KARBONKRETSLØPET OG TILBAKEKOBLINGER */}
      <CollapsibleSection
        title="Det globale karbonkretsløpet og geologiske tilbakekoblinger"
        subtitle="Urey-reaksjonen, silikatforvitring og vulkansk gasspådriv"
        badge="Kretsløp & Termostat"
        badgeVariant="primary"
      >
        <p>
          Karbon er selve nøkkelelementet som binder geosfæren, biosfæren, hydrosfæren og atmosfæren sammen.
          Vi skiller fundamentalt mellom to sykluser som opererer på vidt forskjellige tidsskalaer:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="text-sm font-semibold text-emerald-400">Det raske biologiske kretsløpet</h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Utveksling av CO₂ mellom atmosfære, biosfære (fotosyntese og respirasjon) og hydrosfærens overflatevann.
              Tidsskala: <strong>Dager til århundrer</strong>. Regulerer sesongsvingninger i CO₂ og kortsiktig biomassevekst.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="text-sm font-semibold text-amber-400">Det langsomme geologiske kretsløpet</h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Utveksling mellom bergartene i litosfæren, vulkansk avgassing, kjemisk silikatforvitring og subduksjon.
              Tidsskala: <strong>100 000 til 200 millioner år</strong>. Styrer klodens overordnede drivhusklima og istidsregimer.
            </p>
          </div>
        </div>

        <div className="my-6">
          <CarbonCycleDiagram />
        </div>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Silikatforvitring som jordens geologiske termostat (Walker-tilbakekoblingen)
        </h3>
        <p>
          Hvorfor har ikke jorden kokt over som Venus eller frosset til en permanent isklump gjennom 4,5 milliarder år,
          til tross for at solens utstråling har økt med nesten 30 % siden solsystemets opprinnelse?
        </p>
        <p>
          Svaret er en <strong>negativ (stabiliserende) tilbakekoblingsmekanisme</strong> kjent som karbonat-silikat-syklusen
          eller Urey-reaksjonen (Walker et al., 1981):
        </p>

        <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 text-xs font-mono space-y-2">
          <p className="font-semibold text-primary font-sans text-sm">Urey-reaksjonen (Kjemisk likevekt):</p>
          <p className="text-foreground">CaSiO₃ (silikatbergart) + CO₂ (gass) ⇄ CaCO₃ (kalkstein) + SiO₂ (kvarts)</p>
          <p className="text-muted-foreground font-sans text-[11px] pt-1">
            Mot høyre: Kjemisk forvitring på land og kalksedimentasjon i havet trekker CO₂ ut av atmosfæren.
            Mot venstre: Metamorfose og smelting i subduksjonssoner frigjør CO₂ tilbake via vulkanutbrudd.
          </p>
        </div>

        <p className="mt-3">
          <strong>Slik virker termostaten:</strong>
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-foreground/90">
          <li>
            Hvis vulkansk aktivitet slipper ut ekstra CO₂, stiger temperaturen i atmosfæren (økt drivhuseffekt).
          </li>
          <li>
            Varmere luft fordamper mer vann fra havet, noe som gir mer global nedbør og fuktighet.
          </li>
          <li>
            Både den økte temperaturen og den økte nedbøren akselererer den kjemiske forvitringshastigheten av silikater på land.
          </li>
          <li>
            Mer kalsium (Ca²⁺) og bikarbonat (HCO₃⁻) vaskes ut i havet, der marine organismer feller det ut som kalsiumkarbonat (kalkstein, CaCO₃).
          </li>
          <li>
            Dermed fjernes CO₂ fra atmosfæren, drivhuseffekten dempes, og temperaturen faller tilbake mot likevekt.
          </li>
        </ol>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
          Vulkanutbrudd: Akutt atmosfærisk kulde vs. geologisk oppvarming
        </h3>
        <p>
          Mange misforstår vulkaners rolle i klimasystemet. Det er essensielt å skille mellom to ulike mekanismer:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90">
          <li>
            <strong>Kort sikt (1–3 år): Nedkjøling via sulfataerosoler.</strong> Når et eksplosivt pliniansk utbrudd
            (som Pinatubo i 1991 eller Tambora i 1815) slynger gasser over tropopausen og inn i stratosfæren, omdannes
            svoveldioksid (SO₂) til ørsmå dråper av svovelsyre (H₂SO₄-sulfataerosoler). Disse aerosolene sprer seg globalt,
            reflekterer sollys tilbake til verdensrommet og kan senke jordens gjennomsnittstemperatur med 0,5–1,5 °C i et par år.
            Vulkansk aske faller derimot ut på dager og har minimal global klimaeffekt.
          </li>
          <li>
            <strong>Lang sikt (millioner av år): Oppvarming via vulkansk CO₂.</strong> Vulkaner slipper også ut CO₂,
            men de årlige vulkanske utslippene er i dag svært beskjedne (ca. 0,2–0,3 gigatonn CO₂/år, under 1 % av menneskeskapte
            utslipp på over 35 Gt/år). Likevel er det denne vedvarende vulkanske avgassingen som opprettholder jordens atmosfæriske
            karbonlager over geologiske tidsrom.
          </li>
        </ul>
      </CollapsibleSection>

      {/* 5. INTERAKTIV MODELL */}
      <CollapsibleSection
        title="Interaktiv simulator: Jordsystemer og tilbakekoblinger"
        subtitle="Utforsk silikatforvitring, is-albedo og vulkansk klimaeffekt i sanntid"
        badge="Interaktiv modell"
        badgeVariant="positive"
      >
        <p className="text-sm text-muted-foreground">
          Bruk simulatoren under til å eksperimentere med jordens koblede klimaprosesser.
          Se hvordan endringer i solinnstråling, atmosfærisk CO₂, isdekke og vulkansk gasspådriv
          forplanter seg mellom geosfæren, kryosfæren, hydrosfæren og atmosfæren.
        </p>

        <EarthSystemsModel />
      </CollapsibleSection>

      {/* 6. NØKKELBEGREPER OG QUIZ */}
      <CollapsibleSection
        title="Nøkkelbegreper og eksamensrettet quiz"
        subtitle="Kvalitetssikring for privatister og VG3 Geofag 1"
        badge="Begreper & Test"
        badgeVariant="neutral"
      >
        <h3 className="font-display text-xl font-medium tracking-tight">Viktige faglige begreper</h3>
        <TermGrid>
          <Term name="geosfære" def="den faste jorden: berggrunn, sedimenter, løsmasser og jordbunn" />
          <Term name="hydrosfære" def="alt flytende vann; i Geofag 1 konsentrert om ferskvann (elver, innsjøer, porevann og grunnvann)" />
          <Term name="kryosfære" def="jordens frosne vann: isbreer, havis, tele og permafrost" />
          <Term name="vekselvirkning" def="gjensidig påvirkning der en endring i én sfære utløser kaskader av prosesser i andre delsystemer" />
          <Term name="forvitring" def="nedbrytning av bergarter in situ (på stedet) gjennom mekaniske og kjemiske prosesser uten transport" />
          <Term name="erosjon" def="løsrivelse, nedsliting og transport av materiale med vann, is, vind eller tyngdekraft" />
          <Term name="isostasi" def="litosfærens hydrostatiske likevekt på den seige astenosfæren; driver postglasial landheving" />
          <Term name="Walker-tilbakekobling" def="negativ termostat der silikatforvitring fjerner atmosfærisk CO2 raskere ved høyere temperatur" />
        </TermGrid>

        <div className="mt-8 border-t border-border/60 pt-6">
          <h3 className="font-display text-xl font-medium tracking-tight mb-2">
            Eksamensrettet flervalgsquiz (LK20 Geofag 1)
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Test din systemforståelse av vekselvirkningene mellom sfærene med disse universitetstilpassede oppgavene:
          </p>

          <Quiz
            questions={[
              {
                prompt: "Hva er den vitenskapelige forskjellen mellom forvitring og erosjon?",
                options: [
                  "Forvitring skjer bare ved kjemiske reaksjoner, mens erosjon alltid er fysisk.",
                  "Forvitring er nedbrytning og oppsprekking på stedet (in situ) uten transport, mens erosjon omfatter løsrivelse, nedsliting og aktiv borttransport med et bevegelig medium.",
                  "Forvitring foregår bare i varme strøk, mens erosjon er forbeholdt områder med isbreer.",
                  "Det er ingen forskjell; begrepene brukes synonymt i moderne geomorfologi.",
                ],
                answer: 1,
                explain:
                  "Uten forvitring dannes det knapt løsmasser, men det er erosjonen (vann, is, vind eller tyngdekraft) som flytter det forvitrede materialet og former daler og landformer.",
              },
              {
                prompt: "Hvorfor virker kjemisk silikatforvitring (Urey-reaksjonen) som en stabiliserende geologisk termostat, mens kalksteinforvitring ikke gjør det?",
                options: [
                  "Fordi silikatforvitring avgir oksygengass til atmosfæren som nøytraliserer drivhuseffekten.",
                  "Fordi silikatforvitring trekker 2 mol CO₂ ut av atmosfæren for hvert mol silikat, og når kalsium felles ut som CaCO₃ i havet frigjøres bare 1 mol CO₂ tilbake – netto fjernes 1 mol CO₂ per reaksjonssyklus.",
                  "Fordi kalkstein aldri kan løses opp av surt regnvann under naturlige forhold.",
                  "Fordi silikater bare forvitrer når temperaturen synker under 0 °C.",
                ],
                answer: 1,
                explain:
                  "Ved silikatforvitring (CaSiO₃ + 2CO₂ + H₂O → Ca²⁺ + 2HCO₃⁻ + SiO₂) bindes to karbonatomer fra atmosfæren. Når marine organismer i havet feller ut kalk (Ca²⁺ + 2HCO₃⁻ → CaCO₃ + CO₂ + H₂O), returneres kun 1 mol CO₂ til atmosfæren. Nettoresultatet er permanent karbonfjerning lagret i kalkstein på havbunnen.",
              },
              {
                prompt: "Hvorfor fører store, eksplosive vulkanutbrudd som Pinatubo (1991) til global nedkjøling i 1–3 år etter utbruddet?",
                options: [
                  "Fordi den vulkanske asken blir værende i atmosfæren i mange år og stenger ute alt sollys.",
                  "Fordi vulkanen slipper ut enorme mengder vanndamp som forårsaker global overskyethet og snøstormer.",
                  "Fordi svoveldioksid (SO₂) slynges opp i stratosfæren og omdannes til submikroskopiske sulfataerosoler (H₂SO₄) som reflekterer kortbølget solstråling ut i verdensrommet.",
                  "Fordi lavaen absorberer varme fra troposfæren når den avkjøles på overflaten.",
                ],
                answer: 2,
                explain:
                  "Vulkansk aske faller raskt ut av luften (i løpet av dager til uker). Det er SO₂ injisert over tropopausen som reagerer med vanndamp og danner reflekterende sulfataerosoler med lang oppholdstid i stratosfæren.",
              },
              {
                prompt: "Hva er sammenhengen mellom innlandsisens smelting, isostasi og dannelsen av kvikkleire i Norge?",
                options: [
                  "Isbreene knuste granitt til kvikkleire direkte under bresålen uten kontakt med vann.",
                  "Vekten av isen presset litosfæren ned; da isen smeltet, lå landet under havoverflaten og marin leire ble avsatt i saltvann med et åpent korthus-gitter. Etter landhevingen har ferskt grunnvann vasket ut saltionene, slik at leiren blir ustabil.",
                  "Kvikkleire oppstår bare der vulkansk aske har reagert kjemisk med smeltevann fra breer.",
                  "Landhevingen har ingenting med leire å gjøre; marin leire ble dannet i innsjøer før istiden.",
                ],
                answer: 1,
                explain:
                  "Under marin grense (MG) ble leirmineralene avsatt i salt sjøvann, der Na⁺- og Ca²⁺-ioner nøytraliserte leirflakenes ladning og holdt det ustabile korthus-skjelettet oppe. Når postglasial isostatisk landheving løftet leiren opp på land, har grunnvannet gradvis vasket bort saltet, slik at skjelettet kollapser til en flytende suppe ved overbelastning.",
              },
              {
                prompt: "Hvorfor kaller vi is-albedo-tilbakekoblingen for en 'positiv tilbakekobling' i klimasystemet?",
                options: [
                  "Fordi den er gunstig for planetens biosfære og biologiske mangfold.",
                  "Fordi en initial endring forsterkes: Redusert isdekke gir lavere albedo, mer absorbert solvarme, høyere temperatur og dermed enda mer smelting.",
                  "Fordi den alltid fører til oppvarming og aldri kan forårsake nedkjøling.",
                  "Fordi albedoen alltid holder seg konstant uansett hvor mye snø som faller.",
                ],
                answer: 1,
                explain:
                  "I systemteori betyr 'positiv tilbakekobling' at responsen forsterker den opprinnelige forstyrrelsen (selvforsterkende sløyfe), uansett om det går mot oppvarming (mindre is → lavere albedo → varmere) eller nedkjøling (mer is → høyere albedo → kaldere).",
              },
            ]}
          />
        </div>
      </CollapsibleSection>
    </TopicLayout>
  );
}
