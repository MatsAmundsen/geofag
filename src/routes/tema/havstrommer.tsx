import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  AmocDiagram,
  ClimateContrastDiagram,
  DensityDiagram,
  EkmanDiagram,
  GulfVsNacDiagram,
  GyreDiagram,
  OceanDriversDiagram,
  UpwellingDiagram,
} from "@/components/diagrams/ocean";
import { EkmanUpwellingModel } from "@/components/models/ekman-upwelling-model";
import { OceanCurrentModel } from "@/components/models/ocean-current-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/havstrommer")!;

export const Route = createFileRoute("/tema/havstrommer")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/havstrommer",
    }),
  component: HavstrommerPage,
});

function HavstrommerPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Havet"
      title="Havstrømmer: Drivkrefter, Ekman og gyrer"
      lead="Havet lagrer og flytter enorme mengder varme over kloden. Overflaten skyves av vind, avbøyes av jordrotasjon og samles i subtropiske gyrer. I dypet driver tetthetsforskjeller det globale omveltningsbåndet. Sammen former de Norges milde kyst og klodens klima."
      banner="/images/banner-hav.jpg"
      bannerAlt="Havoverflate i Nord-Atlanteren med bølger og strømninger"
      prev={{ to: "/tema/coriolis", label: "Forrige: Coriolis" }}
      next={{ to: "/tema/klima", label: "Neste: Klima" }}
      kilder={KILDER.havstrommer}
      bodyMode="coded"
    >
      <Callout title="Kompetansemål i Geofag 2 (LK20)">
        <p>
          Målet er at du skal kunne <em>gjøre rede for drivkreftene bak overflatestrømmer og dypstrømmer i havet</em>,
          forklare <em>Ekman-transport, geostrofisk balanse og gyredannelse</em>, analysere <em>oppvelling og biologisk produksjon</em>,
          og vurdere hvordan havstrømmene og samspillet med atmosfæren påvirker det norske og globale klimaet (Utdanningsdirektoratet, 2020).
        </p>
      </Callout>

      {/* ── 1. DRIVKREFTER: VIND MOT TETTHET ────────────────────────── */}
      <CollapsibleSection
        title="1. Drivkrefter i havet: Vind mot tetthet"
        subtitle="De tre kreftene som styrer vannmassene · To etasjer i havet"
        badge="Fundament"
        badgeVariant="primary"
        defaultOpen={true}
      >
        <p>
          En <strong>havstrøm</strong> er en sammenhengende, storskala forflytning av vannmasser i havet —
          til forskjell fra vanlige overflatebølger som bare transporterer energi uten vesentlig nettomasseforflytning.
          Havet dekker over 70 % av jordoverflaten, og på grunn av vannets enorme varmekapasitet
          (ca. <strong>4184 J/(kg·K)</strong> mot luftas <strong>1005 J/(kg·K)</strong>) fungerer havet som
          planetens fremste termiske støtdemper og varmelager (Marshall & Plumb, 2008).
        </p>

        <p>
          De fundamentale drivkreftene bak havstrømmene kan deles inn i tre fysikalske faktorer (NOAA, u.å.-a):
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Vindstress (skjærspenning på overflaten):</strong> Vinden griper tak i havoverflaten
            og overfører bevegelsesmengde via turbulent friksjon. Dette driver overflatestrømmene i de øverste
            100–200 metrene.
          </li>
          <li>
            <strong>Tyngdekraft og trykkgradienter (tetthetsforskjeller):</strong> Variasjoner i
            temperatur og saltholdighet avgjør vannets massetetthet ($\rho$). Kaldt og salt vann er tyngst og
            synker ned mot bunnen, mens varmt og ferskere vann flyter øverst. Dette driver dypvannssirkulasjonen.
          </li>
          <li>
            <strong>Corioliskraften (jordrotasjonen):</strong> Fordi jorden roterer, avbøyes all horisontal
            bevegelse til høyre på nordlig halvkule og til venstre på sørlig halvkule. Styrken bestemmes av
            Coriolisparameteren $f = 2\Omega\sin\phi$.
          </li>
        </ul>

        <OceanDriversDiagram />

        <div className="rounded-xl border border-border/70 bg-card/60 p-4">
          <h4 className="font-display font-semibold text-base text-foreground">
            Havets to etasjer og termoklinen
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Oseanografer deler havet inn i to distinkte etasjer:
          </p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-sky-500/30 bg-sky-950/20 p-3">
              <strong className="text-sky-300 text-sm block">1. Overflatelaget (Blandingslaget)</strong>
              <p className="mt-1 text-muted-foreground">
                De øverste 50–200 metrene. Direkte påvirket av vind og solinnstråling. Her skjer Ekman-transport,
                bølgeomrøring og dannelse av subtropiske gyrer.
              </p>
            </div>
            <div className="rounded-lg border border-indigo-500/30 bg-indigo-950/20 p-3">
              <strong className="text-indigo-300 text-sm block">2. Dyphavet</strong>
              <p className="mt-1 text-muted-foreground">
                Utgjør over 90 % av havets volum. Konstant kaldt (0–4 °C) og mørkt. Fullstendig skjermet fra
                direkte vindpåvirkning; drives utelukkende av tetthetsforskjeller (termohalin sirkulasjon).
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Disse to etasjene er adskilt av <strong>termoklinen</strong> (sjiktet med bratt temperaturfall)
            og <strong>pyknoklinen</strong> (sjiktet med bratt tetthetsøkning). Termoklinen fungerer som en
            fysisk barriere som gjør at lett overflatevann normalt ikke kan blande seg ned i det tunge dyphavet.
          </p>
        </div>

        <DensityDiagram />

        <OrdBoks
          ord="Termoklin og Pyknoklin"
          barn="Termoklinen er overgangslaget der temperaturen stuper mot dypet. Pyknoklinen er laget der tettheten øker raskt. Sammen danner de et stabilt «lokk» mellom det vindrørte overflatevannet og det kalde dyphavet."
        />
      </CollapsibleSection>

      {/* ── 2. EKMAN-SPIRALEN OG NETTOTRANSPORT ─────────────────────── */}
      <CollapsibleSection
        title="2. Ekman-spiralen og nettotransport"
        subtitle="Hvorfor vannet flyttes 90° på vinden · Matematisk utledning og dybdeprofil"
        badge="Fysikk og formler"
        badgeVariant="teal"
      >
        <p>
          I århundrer trodde sjøfolk at overflatestrømmen gikk i nøyaktig samme retning som vinden blåste.
          Under den berømte <em>Fram</em>-ekspedisjonen over Polhavet (1893–1896) oppdaget Fridtjof Nansen
          noe oppsiktsvekkende: Drivisen beveget seg konsekvent <strong>20° til 40° til høyre</strong> for
          vindretningen! Nansen overlot mysteriet til den unge svenske fysikeren og matematikeren{" "}
          <strong>V. Walfrid Ekman</strong>, som i 1905 publiserte den matematiske løsningen for det som
          i dag er en hjørnestein i fysisk oseanografi: <em>Ekman-spiralen</em> (Ekman, 1905).
        </p>

        <EkmanDiagram />

        <div className="my-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs space-y-3">
          <h4 className="font-semibold text-primary text-sm">Fysikken bak Ekman-avbøyningen:</h4>
          <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed text-foreground/90">
            <li>
              <strong>Overflatelaget (z = 0):</strong> Vinden overfører skjærspenning ($\tau$) til selve
              vannfilmen. Så snart vannet begynner å bevege seg, virker Corioliskraften vinkelrett på fartsretningen.
              I likevekt mellom vindstress og Corioliskraft avbøyes selve overflatevannet nøyaktig{" "}
              <strong>45° til høyre</strong> for vinden på nordlig halvkule (og 45° til venstre på sørlig halvkule).
            </li>
            <li>
              <strong>Overføring nedover i dypet:</strong> Det øverste vannlaget drar med seg laget under via
              turbulent virvelviskositet ($A_z$). Dette laget utsettes også for Coriolis, og dreies enda lenger
              mot høyre, men med redusert fart på grunn av energitap.
            </li>
            <li>
              <strong>Spiralen og Ekman-dypet ($D_E$):</strong> Med økende dyp roterer strømvektorene stadig
              mer med klokken mens hastigheten avtar eksponentielt med dypet. Ved Ekman-dypet
              (typisk 40–80 meter) har strømretningen snudd 180° og hastigheten har falt til under 4 % av overflaten.
            </li>
            <li>
              <strong>Integrert nettotransport ($M_E$):</strong> Når vi matematisk summerer (integrerer) alle
              vektorene fra overflaten og ned gjennom hele spiralen, kansellerer de parallelle komponentene
              hverandre. Den resulterende <strong>netto vanntransporten står nøyaktig 90° til høyre</strong> for
              vinden på nordlig halvkule (90° til venstre på sørlig halvkule)!
            </li>
          </ol>
        </div>

        {/* Matematiske formler */}
        <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="rounded-xl border border-border/80 bg-card p-3">
            <span className="text-muted-foreground block text-[10px] font-sans uppercase">1. Vindstress (τ)</span>
            <p className="font-bold text-amber-400 text-sm mt-1">τ = ρ_luft · C_D · (U₁₀)²</p>
            <p className="text-[10px] text-muted-foreground font-sans mt-1">
              C_D ≈ 1,3 × 10⁻³, U₁₀ er vindhastighet i 10 m høyde.
            </p>
          </div>
          <div className="rounded-xl border border-border/80 bg-card p-3">
            <span className="text-muted-foreground block text-[10px] font-sans uppercase">2. Coriolisparameter (f)</span>
            <p className="font-bold text-sky-400 text-sm mt-1">f = 2 · Ω · sin(φ)</p>
            <p className="text-[10px] text-muted-foreground font-sans mt-1">
              Ω = 7,292 × 10⁻⁵ rad/s. Ved 60°N er f = 1,26 × 10⁻⁴ s⁻¹.
            </p>
          </div>
          <div className="rounded-xl border border-border/80 bg-card p-3">
            <span className="text-muted-foreground block text-[10px] font-sans uppercase">3. Ekman-transport (M_E)</span>
            <p className="font-bold text-teal-400 text-sm mt-1">M_E = τ / |f|</p>
            <p className="text-[10px] text-muted-foreground font-sans mt-1">
              Volumtransport Q_E = M_E / ρ_vann [m²/s]. 90° på vind.
            </p>
          </div>
        </div>

        {/* Interaktiv simulator */}
        <EkmanUpwellingModel />

      </CollapsibleSection>

      {/* ── 3. KYSTOPPVELLING, NEDVELLING OG MARIN ØKOLOGI ──────────── */}
      <CollapsibleSection
        title="3. Kystoppvelling, nedvelling og marin økologi"
        subtitle="Når Ekman tømmer kysten · Humboldt, California og marine hetebølger"
        badge="Sirkulasjon"
        badgeVariant="positive"
      >
        <p>
          Det mest slående beviset på at Ekman-transport er en høyst reell fysisk kraft, finner vi langs
          kontinentenes kystlinjer. Havet er en inkompressibel væske: Dersom vinden skyver overflatevannet
          bort fra land, kan det ikke etterlates et tomt hull. Vann må trekkes opp fra dypet for å erstatte
          det bortførte overflatevannet. Dette fenomenet kalles <strong>kystoppvelling (upwelling)</strong> (NOAA, u.å.-d).
        </p>

        <UpwellingDiagram />

        <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-4">
            <h4 className="font-semibold text-emerald-300 text-sm">
              🌊 Kystoppvelling (Upwelling)
            </h4>
            <p className="mt-2 text-muted-foreground">
              Oppstår når vinden blåser langs kysten slik at Ekman-transporten (90° avbøyd) peker{" "}
              <strong>bort fra kysten</strong>:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                <strong>Nordlig halvkule, vestkyst (f.eks. California):</strong> Nordavind blåser sørover
                $\to$ Ekman dytter vann mot vest (ut i Stillehavet) $\to$ Oppvelling!
              </li>
              <li>
                <strong>Sørlig halvkule, vestkyst (f.eks. Peru / Humboldt):</strong> Sønnavind blåser nordover
                $\to$ Ekman dytter vann mot venstre (vest) $\to$ Verdens kraftigste oppvelling!
              </li>
            </ul>
            <p className="mt-2 text-emerald-200">
              <strong>Økologisk betydning:</strong> Dypvannet er iskaldt og stappfullt av oppløste uorganiske
              næringssalter (nitrat, fosfat, silikat) fra nedbrutt organisk materiale på havbunnen. Når dette
              løftes opp i sollyset, oppstår det voldsomme oppblomstringer av fytoplankton og enorme
              fiskebestander.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-950/15 p-4">
            <h4 className="font-semibold text-amber-300 text-sm">
              ⬇️ Kystnedvelling (Downwelling) og hetebølger
            </h4>
            <p className="mt-2 text-muted-foreground">
              Oppstår når vinden snur slik at Ekman-transporten peker <strong>inn mot kysten</strong>:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Overflatevann stuves opp mot land og tvinges nedover langs kontinentalskråningen.</li>
              <li>Termoklinen presses dypt ned, og dypvannet avskjæres fra overflaten.</li>
              <li>Det oppstår en biologisk «ørken» i overflaten fordi næringstilførselen stopper.</li>
            </ul>
            <p className="mt-2 text-amber-200">
              <strong>Marine hetebølger:</strong> Når nedvelling råder eller vinden stilner over lengre tid,
              blir overflaten liggende stille. Uten omrøring overopphetes de øverste meterne av solen. Dette
              har utløst katastrofal taredød og korallbleking i tempererte og tropiske havområder.
            </p>
          </div>
        </div>

        <OrdBoks
          ord="Ekman-pumping og suging"
          barn="I åpent hav bestemmes vertikalbevegelsen av curl-en til vindstresset: Hvis vindfeltet skaper divergens (vann spres utover), oppstår Ekman-suging (oppvelling midt i havet). Hvis vindfeltet skaper konvergens (vann stuves sammen), oppstår Ekman-pumping (nedvelling)."
        />
      </CollapsibleSection>

      {/* ── 4. GEOSTROFISK BALANSE OG SUBTROPISKE GYRER ─────────────── */}
      <CollapsibleSection
        title="4. Geostrofisk balanse og subtropiske gyrer"
        subtitle="Dynamisk havhaug · Stommels vestlige randintensivering (Golfstrømmen)"
        badge="Dynamikk"
        badgeVariant="amber"
      >
        <p>
          Når vi zoomer ut og ser hele havbassenger under ett, ser vi at overflatestrømmene organiserer seg
          i gigantiske, lukkede sirkulasjonsceller: <strong>gyrer</strong> (Talley et al., 2011).
          I Nord-Atlanteren drives den subtropiske gyren av to motgående vindbelter:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Passatvindene (nordøstpassaten)</strong> i sør (15°–30°N) blåser mot vest. Ekman-transporten
            bøyer 90° mot høyre, altså <strong>nordover</strong>.
          </li>
          <li>
            <strong>Vestavindsbeltet</strong> i nord (40°–60°N) blåser mot øst. Ekman-transporten bøyer 90°
            mot høyre, altså <strong>sørover</strong>.
          </li>
        </ul>

        <GyreDiagram />

        <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
          <h4 className="font-display font-semibold text-base text-foreground">
            Den dynamiske havhaugen og geostrofisk likevekt
          </h4>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Fordi Ekman-transporten fra passatene peker nordover og Ekman-transporten fra vestavinden peker
            sørover, stuves enorme vannmasser sammen midt i Atlanterhavet (Ekman-konvergens i Sargassohavet).
            Dette bygger opp en vidstrakt <strong>dynamisk havhaug</strong> som rager opptil <strong>1,5 til 2 meter</strong>{" "}
            høyere enn havoverflaten langs kystene!
          </p>

          <div className="my-2 rounded-lg bg-slate-900/90 p-3 text-center font-mono text-xs sm:text-sm font-semibold text-sky-400">
            Geostrofisk balanse: f · v_g = g · (∂η / ∂x) ⟹ v_g = (g / f) · (∂η / ∂x)
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Vannet forsøker å renne ned fra haugen under påvirkning av tyngdekraften (trykkgradientkraften F_pg).
            Men så snart vannet settes i bevegelse, tvinger Corioliskraften (F_c) det 90° til høyre!
            Når trykkgradientkraften og Corioliskraften oppnår full balanse, renner ikke vannet nedover bakken;
            det strømmer <strong>parallelt med høydekonturene</strong>, med klokken rundt haugen. Dette er
            en <strong>geostrofisk strøm</strong>.
          </p>
        </div>

        <div className="my-4 rounded-xl border border-amber-500/30 bg-amber-950/15 p-4">
          <h4 className="font-display font-semibold text-amber-300 text-base">
            Vestlig randintensivering: Stommel (1948) og β-effekten
          </h4>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Hvorfor er ikke den subtropiske gyren en symmetrisk, perfekt sirkel? Se på et verdenskart:
            På vestkanten har vi <strong>Golfstrømmen</strong> og <strong>Kuroshio</strong> — smale
            (&lt; 100 km), dype (&gt; 1000 m) og lynraske «motorveier» med strømhastigheter på 1,5–2,5 m/s.
            På østkanten har vi <strong>Kanaristrømmen</strong> og <strong>Californiastrømmen</strong> —
            brede (1000 km), grunne og slappe strømmer som snegler seg sørover med 0,1–0,3 m/s.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Dette fenomenet kalles <strong>beta-effekten</strong> (Stommels vestlige randintensivering
            fra 1948): Jordens krumning gjør at Coriolisparameteren øker mot polene (beta = df/dy).
            Vinden tilfører virvling (vorticity) over hele bassenget. Den må fjernes igjen, og det
            skjer ved friksjon i en smal og rask strøm langs vestkanten. Derfor er strømmen smal og
            sterk i vest og bred og svak i øst.
          </p>
        </div>


      </CollapsibleSection>

      {/* ── 5. TERMOHALIN SIRKULASJON OG NORSK KLIMA ────────────────── */}
      <CollapsibleSection
        title="5. Termohalin dypstrøm og Norges milde klima"
        subtitle="Tetthet, saltutstøting (brine rejection) og kontrasten Norge vs. Labrador"
        badge="Dypet og klima"
        badgeVariant="sky"
      >
        <p>
          Mens overflategyrene drives av vind og roterer horisontalt, er <strong>den termohaline sirkulasjonen</strong>{" "}
          en vertikal omveltning som omspenner hele kloden: <em>det globale transportbåndet</em> (Broecker, 1991).
          Ordet kommer av gresk <em>therme</em> (varme) og <em>halos</em> (salt).
        </p>

        <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
          <h4 className="font-display font-semibold text-base text-foreground">
            Sjøvannets tetthet: Hvorfor synker overflatevannet?
          </h4>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Sjøvannets tetthet styres av tilstandsligningen $\rho = \rho(T, S, p)$. Forenklet uttrykkes
            tetthetsendringen ved:
          </p>
          <div className="my-1 rounded-lg bg-slate-900/90 p-2.5 text-center font-mono text-xs font-semibold text-sky-400">
            Δρ = -α · ΔT + β · ΔS
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            der $\alpha$ er den termiske ekspansjonskoeffisienten (vannet blir lettere når det varmes opp) og
            $\beta$ er den haline kontraksjonskoeffisienten (vannet blir tyngre når saltholdigheten øker).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="rounded-lg border border-sky-500/30 bg-sky-950/20 p-3">
              <strong className="text-sky-300 block">1. Atmosfærisk avkjøling i nord</strong>
              <p className="mt-1 text-muted-foreground">
                Når varmt atlanterhavsvann når Norskehavet og Grønlandshavet om vinteren, avgir det opptil
                300 W/m² varmeenergi til den iskalde lufta. Vannet avkjøles ned mot 0 °C, noe som gjør det
                ekstremt tungt.
              </p>
            </div>
            <div className="rounded-lg border border-teal-500/30 bg-teal-950/20 p-3">
              <strong className="text-teal-300 block">2. Saltutstøting (Brine Rejection)</strong>
              <p className="mt-1 text-muted-foreground">
                Når havis fryser, kan ikke saltet bygges inn i iskrystallgitteret. Saltet presses ut som
                en konsentrert, iskald saltlake. Dette salter ned vannet under isen og gjør det tungt nok
                til å synke helt til bunns som <em>Nordatlantisk dypvann (NADW)</em>.
              </p>
            </div>
          </div>
        </div>

        <AmocDiagram />
        <OceanCurrentModel />

        <div className="my-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs space-y-2">
          <h4 className="font-semibold text-primary text-sm">
            Tre navn du må skille presist til eksamen:
          </h4>
          <GulfVsNacDiagram />
          <ul className="list-disc pl-5 space-y-1.5 text-foreground/90 mt-2">
            <li>
              <strong>1. Golfstrømmen:</strong> Den smale, raske overflatestrømmen langs USAs østkyst fra
              Floridastredet til Cape Hatteras. Den er vinddrevet og stopper ikke.
            </li>
            <li>
              <strong>2. Den nordatlantiske strømmen (NAC):</strong> Fortsettelsen som krysser Atlanteren
              og forgrener seg inn i Norskehavet og Barentshavet. Det er denne overflategrenen som varmer Norge.
            </li>
            <li>
              <strong>3. AMOC:</strong> Hele den 3D-vertikale omveltningssløyfen, inkludert dypvannsdannelsen
              i nord og det kalde returløpet mot sør i dyphavet. Les fordypningen under{" "}
              <Link to="/tema/klima/amoc" className="text-primary underline font-medium">
                AMOC-kapittelet
              </Link>
              .
            </li>
          </ul>
        </div>

        <ClimateContrastDiagram />

        <PhotoFigure
          src="/images/fig-norge-labrador.jpg"
          alt="Grønn norsk fjord med åpent vann til venstre, islagt Labrador-kyst til høyre"
          heading="Samme breddegrad (60°N), to vidt forskjellige verdener"
          caption="Illustrasjon. Bergen og kysten av Labrador ligger på omtrent samme breddegrad og mottar samme solhøyde. Likevel er Bergen isfri med gjennomsnittlig vintertemperatur over 0 °C, mens Labrador er fastfrosset i månedsvis. Forskjellen skyldes samspillet mellom havstrømmer, vestavind og havets enorme varmelager."
          marks={[
            { x: 6, y: 12, n: "1", text: "Norge: mildt, fuktig, isfritt", tone: "teal" },
            { x: 54, y: 12, n: "2", text: "Labrador: arktisk kulde & havis", tone: "cold" },
          ]}
          points={[
            { n: "1", label: "Norge: Varmt atlanterhavsvann (NAC) + vestavindsbeltet demper vinterkulden." },
            { n: "2", label: "Labrador: Kald Labradorstrøm fra Arktis + kalde vinder fra det kanadiske kontinentet." },
          ]}
        />
      </CollapsibleSection>

      {/* ── 6. EKSAMEN, BEGREPER OG QUIZ ────────────────────────────── */}
      <CollapsibleSection
        title="6. Eksamensrelevans, feiloppfatninger og begrepsapparat"
        subtitle="Kjernepoenger for Geofag 2 · Termer og interaktiv quiz"
        badge="Eksamen"
        badgeVariant="warning"
      >
        <Callout title="Viktig til eksamen i Geofag 2">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Ekman-transport:</strong> Vannet samlet sett beveger seg 90° til høyre for vinden i nord,
              ikke i samme retning som vinden blåser!
            </li>
            <li>
              <strong>Oppvelling:</strong> Skjer fordi overflatevannet fjernes av Ekman-transport bort fra kysten,
              slik at kaldt næringsrikt bunnvann må fylle tomrommet.
            </li>
            <li>
              <strong>Geostrofisk balanse:</strong> Trykkgradientkraften fra den dynamiske havhaugen balanseres
              av Corioliskraften (F_pg + F_c = 0), slik at strømmen følger kotehøydene.
            </li>
            <li>
              <strong>Norges klima:</strong> Forklares av samspillet mellom Den nordatlantiske strømmen,
              vestavindsbeltet og havets enorme varmekapasitet — ikke «Golfstrømmen alene».
            </li>
          </ul>
        </Callout>

        <Callout title="Vanlige misforståelser">
          <p>
            ❌ <em>«Golfstrømmen kan stoppe over natten på grunn av smelting på Grønland.»</em><br />
            Nei! Golfstrømmen er en vinddrevet overflatestrøm og drives av jordrotasjon og passatvindene. Det
            er den dype termohaline omveltningen (AMOC) som kan svekkes.
          </p>
          <p className="mt-2">
            ❌ <em>«Ferskvannstilførsel fra smeltevann gjør at vannet synker raskere.»</em><br />
            Feil! Ferskvann har lavere saltholdighet og dermed <em>lavere tetthet</em>. Ferskvann legger seg
            som et lett lokk på overflaten og hindrer at vannet blir tungt nok til å synke!
          </p>
        </Callout>

        <h3 className="font-display text-xl font-medium tracking-tight pt-2">Viktige fagbegreper</h3>
        <TermGrid>
          <Term name="Ekman-transport" def="Netto forflytning av vannmasser i de øverste 50–100 m, vinkelrett (90°) på vindretningen på grunn av samspillet mellom vindstress og Corioliskraft." />
          <Term name="Ekman-spiral" def="Den teoretiske vertikale profilen der havstrømmens retning roterer med klokken og avtar eksponentielt med dypet fra 45° ved overflaten." />
          <Term name="Geostrofisk strøm" def="En havstrøm der trykkgradientkraften (fra en dynamisk havhaug) og Corioliskraften er i perfekt likevekt, slik at strømmen følger høydekonturene." />
          <Term name="Subtropisk gyre" def="Stort, lukket sirkulasjonssystem i havoverflaten drevet av passatene og vestavinden, sentrert rundt en dynamisk havhaug." />
          <Term name="Vestlig randintensivering" def="Fenomenet der gyrens vestkant (Golfstrømmen, Kuroshio) er smal, dyp og ekstremt rask, forårsaket av at Coriolisparameteren øker med breddegraden (β-effekten)." />
          <Term name="Kystoppvelling" def="Når Ekman-transport skyver overflatevann bort fra kysten, tvinges kaldt, næringsrikt dypvann opp for å erstatte det." />
          <Term name="Termohalin sirkulasjon" def="Dypvannssirkulasjon drevet av tetthetsforskjeller styrt av temperatur (termo) og saltholdighet (halin)." />
          <Term name="Brine rejection" def="Utstøting av salt under havisdannelse, som gjør det gjenværende overflatevannet ekstra salt, tungt og tilbøyelig til å synke." />
          <Term name="Den nordatlantiske strømmen" def="Den nordøstlige fortsettelsen av Golfstrømsystemet mot Norskehavet som bringer varme til Norges kyst." />
          <Term name="AMOC" def="Atlantic Meridional Overturning Circulation; hele det 3D termohaline transportbåndet i Atlanterhavet." />
        </TermGrid>

        <Quiz
          questions={[
            {
              prompt: "Hva er retningen til den samlede Ekman-transporten på den nordlige halvkule?",
              options: [
                "Nøyaktig i samme retning som vinden blåser.",
                "45° til høyre for vindretningen.",
                "90° til høyre for vindretningen.",
                "90° til venstre for vindretningen.",
              ],
              answer: 2,
              explain:
                "Selve overflatevannet avbøyes 45° til høyre, men når man integrerer hele spiralen over hele Ekman-lagets dybde, står nettotransporten nøyaktig 90° til høyre for vinden.",
            },
            {
              prompt: "Hvorfor oppstår det en dynamisk havhaug (1–2 meter) i midten av den subtropiske gyren i Nord-Atlanteren?",
              options: [
                "Fordi undersjøiske vulkaner hever havbunnen.",
                "Fordi passatene i sør og vestavinden i nord begge har Ekman-transport rettet inn mot midten (konvergens).",
                "Fordi månen trekker mer på midten av Atlanterhavet.",
                "Fordi fordampningen i tropene suger vannet opp.",
              ],
              answer: 1,
              explain:
                "Passatene skyver vann nordover og vestavinden skyver vann sørover. Denne Ekman-konvergensen stuver vann sammen i Sargassohavet og danner en dynamisk haug.",
            },
            {
              prompt: "Hva balanserer trykkgradientkraften i en geostrofisk havstrøm?",
              options: [
                "Friksjonskraften mot havbunnen.",
                "Corioliskraften.",
                "Tyngdekraften alene.",
                "Atmosfærens lufttrykk.",
              ],
              answer: 1,
              explain:
                "I en ren geostrofisk strøm er trykkgradientkraften (som vil dytte vannet nedover bakken) i likevekt med Corioliskraften (som avbøyer vannet). Strømmen flyter dermed parallelt med kotehøydene.",
            },
            {
              prompt: "Hvorfor er Golfstrømmen så mye smalere og raskere enn Kanaristrømmen (vestlig randintensivering)?",
              options: [
                "Fordi Atlanterhavet er dypere i vest enn i øst.",
                "Fordi Corioliskraften øker med breddegraden (β-effekten), noe som forskyver gyren vestover.",
                "Fordi det blåser mer stormer langs USA.",
                "Fordi Karibia tilfører varmt ferskvann.",
              ],
              answer: 1,
              explain:
                "Stommels teori fra 1948 viser at variasjonen i Coriolisparameteren med breddegraden (df/dy = β) tvinger gyren mot vestkanten, slik at vannmassene presses gjennom en smal, intens randstrøm.",
            },
            {
              prompt: "Når oppstår det kraftig kystoppvelling utenfor kysten av California (nordlig halvkule, vestkyst)?",
              options: [
                "Når vinden blåser sørover (mot ekvator), slik at Ekman-transporten skyver overflatevannet vestover ut i havet.",
                "Når vinden blåser nordover (mot polen), slik at vannet presses inn mot land.",
                "Når det er vindstille over lengre tid.",
                "Når tidevannet er på sitt laveste.",
              ],
              answer: 0,
              explain:
                "California ligger på vestkysten. Med vind sørover (nordavind) er 90° til høyre rettet vestover, bort fra kysten. For å erstatte overflatevannet må kaldt bunnvann velle opp.",
            },
            {
              prompt: "Hva er 'brine rejection' (saltutstøting), og hvilken rolle spiller det i havet?",
              options: [
                "At havsalt fordamper opp i atmosfæren under tørke.",
                "At salt skilles ut når sjøvann fryser til havis, noe som gjør det underliggende vannet ekstra salt og tungt slik at det synker.",
                "At elver dumper ferskvann i havet.",
                "At koraller suger salt ut av vannmassene.",
              ],
              answer: 1,
              explain:
                "Iskrystallene kan ikke inneholde salt. Den kalde, utstøtte saltlaken øker tettheten til overflatevannet i polare strøk, slik at det synker og danner dypvann (NADW og AABW).",
            },
          ]}
        />
      </CollapsibleSection>
    </TopicLayout>
  );
}
