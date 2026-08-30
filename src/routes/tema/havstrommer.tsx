import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
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
      kicker="Havet"
      title="Havstrømmer"
      lead="Havet lagrer langt mer varme enn lufta og flytter den langsomt. Overflaten skyves av vind og bøyes av jordrotasjon. Dypet styres av hvor tungt vannet er. Sammen gjør de Norges kyst mildt på en breddegrad som ellers er iskald."
      banner="/images/banner-hav.jpg"
      bannerAlt="Havoverflate i Nord-Atlanteren"
      prev={{ to: "/tema/coriolis", label: "Forrige: Coriolis" }}
      next={{ to: "/tema/klima", label: "Neste: Klima" }}
      kilder={KILDER.havstrommer}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        To etasjer, tre drivkrefter
      </h2>
      <p>
        En havstrøm er vann som flytter seg fra ett sted til et annet. De samme tre tingene som
        styrer lufta, styrer havet: trykk, tyngde og rotasjon (NOAA, u.å.). Men havet er tregere og
        lagrer enormt med varme. Derfor demper det klimaet over måneder og tiår, ikke bare over
        timer.
      </p>
      <p>
        Tenk to etasjer. Overflaten skyves av vinden. Dypet styres av hvor kaldt og salt vannet er.
        I Atlanteren henger etasjene sammen i et belte som kalles AMOC.
      </p>
      <OrdBoks
        ord="Overflatestrøm og dypstrøm"
        barn="Overflaten (noen titalls til noen hundre meter) drives av vind. Dypet drives av at kaldt, salt vann er tyngre og synker. Tidevann rører kysten, men driver ikke de store kretsløpene."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Vinden peker ikke dit vannet går
      </h2>
      <p>
        Vinden tar i de øverste meterne. Coriolis dreier strømmen til høyre i nord. Laget under
        dreies enda mer. Summen — det som faktisk flytter vannmasser — går omtrent rett til høyre
        for vinden på nordlig halvkule (til venstre i sør) (NOAA, u.å.).
      </p>
      <OrdBoks
        ord="Ekman-transport"
        barn="At vannet i det øverste laget samlet sett flyttes 90° på vinden. Vestavind i Nord-Atlanteren skyver derfor vann mot sør. Passatene skyver vann mot nord. Da stables vannet midt i kretsløpet."
      />
      <OrdBoks
        ord="Oppwelling"
        barn="Når overflatevann skyves bort fra kysten, stiger kaldt, næringsrikt dypvann opp. Det er Ekman-transport som avgjør, ikke at «vinden blåser opp vann»."
      />

      <PhotoFigure
        src="/images/fig-ekman.jpg"
        alt="Lange skumstriper på havet, drevet av vind mot høyre"
        heading="Vind på vann"
        caption="Skumstripene viser vinden. Vannmassene under dreies til høyre i nord — derfor peker pil 2 et annet sted enn pil 1."
        arrows={[
          { d: "M 14 32 L 70 28", tone: "fg", width: 1.4 },
          { d: "M 40 30 L 40 50", tone: "teal", width: 1.3 },
        ]}
        marks={[
          { x: 8, y: 16, n: "1", text: "Vind", tone: "fg" },
          { x: 44, y: 52, n: "2", text: "Vann 90° til høyre", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Vinden peker én vei — her mot høyre." },
          { n: "2", label: "Netto vanntransport i nord: 90° til høyre for vinden." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        En gyre: med klokken i nord
      </h2>
      <p>
        I hvert store havbasseng danner vinden et kretsløp — en gyre. I nord går den med klokken.
        Den vestlige kanten er smal og rask (Golfstrømmen). Den østlige er bred og treig
        (Kanaristrømmen). Midten, Sargassohavet, står litt høyere enn kanten. Vestkanten er sterk
        fordi coriolis øker mot polene: vann som beveger seg nordover, dreies mer, og strømmen
        presses mot kontinentet.
      </p>
      <OrdBoks
        ord="Vestlig randstrøm"
        barn="Den smale, raske kanten av en gyre mot vest: Golfstrømmen, Kuroshio. Coriolis øker mot polene, så strømmen presses mot kontinentet."
      />
      <OrdBoks
        ord="Gyre"
        barn="Et stort, lukket kretsløp i havoverflaten, drevet av vind og formet av coriolis og kontinentene. Nord-Atlanteren har én. Stillehavet har sine."
      />

      <PhotoFigure
        src="/images/fig-gyre.jpg"
        alt="Nord-Atlanteren fra verdensrommet med varm strøm langs Amerika og drift mot Europa"
        heading="Nord-Atlanteren sett ovenfra"
        caption="Hele kretsløpet. Den vestlige kanten er den sterke. Mot Europa blir det bredere og slappere. Midten står litt høyere."
        arrows={[
          { d: "M 22 42 L 28 22", tone: "warm", width: 1.3 },
          { d: "M 32 20 L 58 18", tone: "teal", width: 1.25 },
          { d: "M 70 28 L 62 48", tone: "cold", width: 1.15 },
          { d: "M 50 50 L 28 48", tone: "cold", width: 1.1 },
        ]}
        marks={[
          { x: 6, y: 36, n: "1", text: "Golfstrømmen", tone: "warm" },
          { x: 48, y: 10, n: "2", text: "Mot Norge", tone: "teal" },
          { x: 72, y: 40, n: "3", text: "Kanaristrømmen", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Vestlig randstrøm: smal og rask. Golfstrømmen." },
          { n: "2", label: "Fortsettelsen mot de nordiske hav." },
          { n: "3", label: "Østkanten er bred og treig. Kretsen lukkes sørover." },
        ]}
      />

      <PhotoFigure
        src="/images/fig-golfstrom.jpg"
        alt="Varm turkis-gull strøm som et bånd langs amerikansk østkyst mot Atlanteren"
        heading="Den vestlige kanten nærbilde"
        caption="Golfstrømmen er selve båndet langs USA. Etter kysten løsner den. En gren fortsetter nordøstover som Den nordatlantiske strømmen."
        arrows={[{ d: "M 22 36 Q 48 24 72 16", tone: "warm", width: 1.45 }]}
        marks={[
          { x: 6, y: 44, n: "1", text: "Golfstrømmen", tone: "warm" },
          { x: 58, y: 10, n: "2", text: "Videre mot Europa", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Smal, rask, varm. Vestlig randstrøm." },
          { n: "2", label: "Navnet bytter: Den nordatlantiske strømmen mot Norge." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Skill to navn</h2>
      <p>
        I dagligtale sies det at «Golfstrømmen gjør Norge varmt». Faglig er det for slapt.
        Golfstrømmen er den sterke strømmen langs USA. Etter kysten løsner den. En gren fortsetter
        nordøstover som Den nordatlantiske strømmen mot de nordiske hav. Det er denne grenen —
        sammen med hele beltet i dypet og vestavinden — som preger norsk klima (Norsk
        klimaservicesenter, u.å.).
      </p>
      <OrdBoks
        ord="Golfstrømmen og Den nordatlantiske strømmen"
        barn="Golfstrømmen: vestlig, rask strøm langs USA. Den nordatlantiske strømmen: fortsettelsen mot Norge. Ikke samme strekning, selv om folk bruker navnene om hverandre."
      />

      <PhotoFigure
        src="/images/fig-norge-labrador.jpg"
        alt="Grønn norsk fjord med åpent vann til venstre, islagt Labrador-kyst til høyre"
        heading="Samme breddegrad, to verdener"
        caption="Norskekysten og Labrador ligger omtrent like langt nord. Solhøyden er den samme. Utfallet er det ikke."
        marks={[
          { x: 6, y: 12, n: "1", text: "Norge · mildt og åpent", tone: "teal" },
          { x: 54, y: 12, n: "2", text: "Labrador · is og kulde", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Norge: milde vintre, ofte isfrie fjorder." },
          { n: "2", label: "Labrador: lang kulde, havis. Kaldt hav og kaldt kontinent." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Dypet: kaldt og salt synker
      </h2>
      <p>
        Vann blir tyngre når det avkjøles, og når det blir saltere. I tropene er overflaten varm og
        «lett». I de nordiske hav mister den varme til lufta om vinteren. Når det dannes is, blir
        saltet igjen i vannet. Da kan overflaten bli tyngre enn vannet under og synke.
      </p>
      <OrdBoks
        ord="Tetthet"
        barn="Hvor tungt et visst volum vann er. Kaldt vann er tyngre enn varmt. Salt vann er tyngre enn ferskere vann. Det tyngste synker."
      />

      <PhotoFigure
        src="/images/fig-synker.jpg"
        alt="Vinterhav med sjørokk og ny is, mørkt åpent vann som avgir varme"
        heading="Her mister Atlanteren varmen"
        caption="Åpent polarhav om vinteren røyker av varme til lufta. Overflaten blir kald, av og til saltere, og kan synke."
        arrows={[{ d: "M 50 22 L 50 42", tone: "cold", width: 1.35 }]}
        marks={[
          { x: 6, y: 14, n: "1", text: "Varme til lufta", tone: "warm" },
          { x: 54, y: 46, n: "2", text: "Tungt vann synker", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Avkjøling øker tyngden." },
          { n: "2", label: "Is som dannes, etterlater salt i vannet." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">AMOC — havets belte</h2>
      <p>
        I Atlanteren går varmt, saltere vann nordover i toppen. I Norskehavet, Grønlandshavet og
        Labradorhavet synker det og returnerer sørover i dypet. Hele sløyfa kalles AMOC (NOAA, u.å.).
        Den er treg. Den kan svekkes hvis overflaten blir for fersk eller for varm til å synke (IPCC,
        2021). Det skjer ikke over natta — men over tiår kan det merkes i nordvest-Europa.
      </p>
      <OrdBoks
        ord="AMOC"
        barn="Den atlantiske omveltningen: varmt nordover i overflaten, kaldt sørover i dypet. Inkluderer både Den nordatlantiske strømmen og det dype returløpet. Ikke en bryter som slår av Golfstrømmen på en dag."
      />

      <PhotoFigure
        src="/images/fig-amoc.jpg"
        alt="Varm gyllen overflatestrøm mot nord og kald dypblå strøm mot sør under is"
        heading="To veier i samme hav"
        caption="Oppvarmet vann nordover i lyset. Avkjølt vann sørover i mørket. Der de møtes i nord, synker det."
        arrows={[
          { d: "M 22 22 L 58 16", tone: "warm", width: 1.35 },
          { d: "M 70 42 L 28 48", tone: "cold", width: 1.35 },
          { d: "M 64 18 L 64 40", tone: "low", width: 1.2 },
        ]}
        marks={[
          { x: 8, y: 12, n: "1", text: "Varmt nordover", tone: "warm" },
          { x: 8, y: 50, n: "2", text: "Kaldt sørover i dypet", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Varm overflate mot de nordiske hav." },
          { n: "2", label: "Kaldt dyphavsvann tilbake sørover." },
        ]}
      />

      <Callout title="Til eksamen og Norge">
        <p>
          Skill tre ting: Golfstrømmen langs USA, Den nordatlantiske strømmen mot Norge, og AMOC som
          hele beltet. Vestavinden driver både strøm og storm. Varmt hav gir fukt til regnet på
          Vestlandet.
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          Norge er ikke mildt «bare på grunn av Golfstrømmen». Vestavind, havets varmelager og
          fjellene spiller inn. Og vannet går ikke samme vei som vinden — det dreies.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term name="Gyre" def="Stort kretsløp i havoverflaten." />
        <Term name="Ekman-transport" def="Vannet flyttes 90° på vinden (til høyre i nord)." />
        <Term name="AMOC" def="Atlantisk belte: varmt nordover oppe, kaldt sørover nede." />
        <Term name="Tetthet" def="Kaldt og salt er tungt og kan synke." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva driver de store kretsløpene i havoverflaten?",
            options: [
              "Tidevannet.",
              "Vind, formet av coriolis og kontinentene.",
              "Vulkaner på havbunnen.",
              "Elvene.",
            ],
            answer: 1,
            explain: "Passater og vestavind setter opp gyrene. Rotasjon og kyster former dem.",
          },
          {
            prompt: "Hva er Ekman-transport i nord?",
            options: [
              "At vannet går nøyaktig samme vei som vinden.",
              "At vannet samlet sett flyttes 90° til høyre for vinden.",
              "At salt synker.",
              "Tidevannsbølgen.",
            ],
            answer: 1,
            explain:
              "Derfor stables vann midt i gyrene. Vestavind skyver vann mot sør i Nord-Atlanteren.",
          },
          {
            prompt: "Hvilken setning er presis om Norges milde kyst?",
            options: [
              "Golfstrømmen alene gjør Norge tropisk.",
              "Den nordatlantiske strømmen, AMOC og vestavinden flytter varme og fukt. Havet demper også vinteren.",
              "Norge ligger lenger sør enn folk tror.",
              "Fjordene lager sin egen Golfstrøm.",
            ],
            answer: 1,
            explain:
              "Samspillet luft–hav, ikke ett navn på et kart, forklarer forskjellen til Labrador.",
          },
        ]}
      />
    </TopicLayout>
  );
}
