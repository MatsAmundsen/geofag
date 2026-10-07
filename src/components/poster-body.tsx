import type { JSX } from "react";
import {
  BoundaryOverviewDiagram,
  BoundaryQuakesDiagram,
  CalderaFormationDiagram,
  IcelandContrastDiagram,
  JanMayenDiagram,
  MagmaViscosityDiagram,
  VeiScaleDiagram,
  VolcanicWinterDiagram,
  VolcanoMonitoringDiagram,
  CollisionDiagram,
  ContinentalRiftDiagram,
  ConvectionDiagram,
  DecompressionMeltingDiagram,
  EarthLayersDiagram,
  EarthquakeWavePhysicsDiagram,
  ElasticReboundDiagram,
  JordasBolgerDiagram,
  PartikkelbolgerDiagram,
  HotspotPlumeDiagram,
  NorwayEarthquakesDiagram,
  NorwayTectonicsHistoryDiagram,
  OceanOceanSubductionDiagram,
  PlatesMapDiagram,
  SeismogramDiagram,
  SolidusDiagram,
  SpreadingDiagram,
  SubductionDiagram,
  TransformDiagram,
  VolcanicHazardsDiagram,
  VolcanoEruptionAnatomyDiagram,
  VolcanoTypesDiagram,
  WilsonCycleDiagram,
  AtmosphericColumnDiagram,
  FrontVerticalProfileDiagram,
  GlobalClimateZonesDiagram,
  HadleyCloseupDiagram,
  HighPressureCrossSectionDiagram,
  InsolationDiagram,
  LowPressureCrossSectionDiagram,
  OneVsThreeCellsDiagram,
  RadarSatelliteNowcastingDiagram,
  RealisticSynopticChartDiagram,
  PolarFrontNorwayDiagram,
  RelativePressureDiagram,
  StationModelExplainedDiagram,
  SurfaceWindsDiagram,
  UpperAir500hPaMapDiagram,
  WeatherProgression24hDiagram,
  WindCellsDiagram,
  PolarFrontCycloneSteps,
  SeaBreezeLandBreezeDiagram,
  ValleyWindDiagram,
  CarouselFrameDiagram,
  CoriolisDiagram,
  CoriolisScaleDiagram,
  CycloneSpinDiagram,
  GlobalDeflectionDiagram,
  EarthRadiationBudgetDiagram,
  BjerknesLoopDiagram,
  EnsoComparisonDiagram,
} from "@/components/diagrams";
import {
  MetamorphicFaciesDiagram,
  RockCycleDiagram,
  SilicateStructureDiagram,
} from "@/components/diagrams/bergarter";
import {
  BowenReactionSeriesDiagram,
  RelativeDatingDiagram,
} from "@/components/diagrams/geology-extra";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  AvsetningsformerDiagram,
  BotnEggTindDiagram,
  BreLengdesnittDiagram,
  FrostsprengningDiagram,
  IsostasiSnittDiagram,
  VdalTilUdalDiagram,
} from "@/components/diagrams/isbreer";
import { HydrographDiagram, KretslopDiagram } from "@/components/diagrams/hydrology";
import { Callout } from "@/components/callout";
import { KvikkleireDiagram } from "@/components/diagrams/skred";
import { GeoMap } from "@/components/geo-map";
import { Markdown } from "@/components/markdown";
import { CarbonCycleDiagram, SpheresDiagram } from "@/components/diagrams/spheres";
import { EarthSystemsModel } from "@/components/models/earth-systems-model";
import { PlateTectonicsModel } from "@/components/models/plate-tectonics-model";
import { RockPetrologyModel } from "@/components/models/rock-petrology-model";
import { VolcanoModel } from "@/components/models/volcano-model";
import { WindSystemModel } from "@/components/models/wind-system-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { KLIMA_SUBTHEMES } from "@/lib/nav";
import { cn } from "@/lib/utils";
import {
  EARTH_LAYERS_PHOTO_SRC,
  injectPosterWidgets,
  parsePosterMarkdown,
  stripChapterEditorNotice,
  type PosterPart,
} from "@/lib/poster-markdown";
import {
  QUIZ_BERGARTER,
  QUIZ_BOUNDARIES,
  QUIZ_FELTARBEID,
  QUIZ_GEOLOGISKE_RESSURSER,
  QUIZ_SKRED,
  QUIZ_HOYTRYKK,
  QUIZ_VAERKART,
  QUIZ_VINDSYSTEMET,
  QUIZ_JORDSKJELV,
  QUIZ_JORDSYSTEMENE,
  QUIZ_MELTING,
  QUIZ_OFIOLITT_WILSON,
  QUIZ_TEST_DEG_SELV,
  QUIZ_ISBRE,
  QUIZ_KLIMA,
  QUIZ_VANN_OG_FLOM,
  QUIZ_VULKANER,
  QUIZ_LOKALE,
  QUIZ_JET,
  QUIZ_CORIOLIS,
  QUIZ_HAVSTROMMER,
  QUIZ_OVERSIKT,
  QUIZ_ENSO,
} from "@/lib/poster-quizzes";

const PLATE_QUIZ_INTRO = "Velg ett svar per spørsmål.";

const POSTER_WIDGETS: Record<string, () => JSX.Element> = {
  EarthLayers: () => <EarthLayersDiagram />,
  Spreading: () => <SpreadingDiagram />,
  Convection: () => <ConvectionDiagram />,
  PlatesMap: () => <PlatesMapDiagram />,
  Solidus: () => <SolidusDiagram />,
  DecompressionMelting: () => <DecompressionMeltingDiagram />,
  QuizMelting: () => <Quiz questions={QUIZ_MELTING} intro={PLATE_QUIZ_INTRO} />,
  BoundaryOverview: () => <BoundaryOverviewDiagram />,
  ContinentalRift: () => <ContinentalRiftDiagram />,
  Subduction: () => <SubductionDiagram />,
  OceanOceanSubduction: () => <OceanOceanSubductionDiagram />,
  Collision: () => <CollisionDiagram />,
  Transform: () => <TransformDiagram />,
  QuizBoundaries: () => <Quiz questions={QUIZ_BOUNDARIES} intro={PLATE_QUIZ_INTRO} />,
  PlateTectonicsModel: () => <PlateTectonicsModel />,
  HotspotPlume: () => <HotspotPlumeDiagram />,
  WilsonCycle: () => <WilsonCycleDiagram />,
  QuizOfiolittWilson: () => <Quiz questions={QUIZ_OFIOLITT_WILSON} intro={PLATE_QUIZ_INTRO} />,
  NorwayTectonics: () => <NorwayTectonicsHistoryDiagram />,
  GeoMapNorway: () => (
    <GeoMap
      center={[65, -3]}
      zoom={4}
      markers={[
        {
          lat: 64.2558,
          lng: -21.131,
          label: "Þingvellir (Island) – Synlig spredningsrift i Den midtatlantiske ryggen",
        },
        {
          lat: 71.0,
          lng: -8.5,
          label: "Jan Mayen (Beerenberg) – Norges eneste aktive vulkan på ryggsystemet",
        },
        {
          lat: 59.91,
          lng: 10.75,
          label: "Oslofeltet – Permisk innsunket riftdal med rombeporfyr og larvikitt",
        },
        {
          lat: 61.63,
          lng: 8.31,
          label: "Jotunheimen – Kaledonsk skyvedekke (nappe) overskjøvet under Iapetus-lukkingen",
        },
      ]}
      heading="Geodynamiske nøkkelsteder i Norges nærområde"
      caption="Kartet viser sentrale geologiske lokaliteter: Den aktive spredningsaksen på Island og Jan Mayen, den kaledonske fjellkjederoten i Jotunheimen, og den permiske riftdalen i Oslofeltet."
    />
  ),
  QuizTestDegSelv: () => (
    <Quiz questions={QUIZ_TEST_DEG_SELV} heading={null} intro={PLATE_QUIZ_INTRO} />
  ),
  VolcanoTypes: () => <VolcanoTypesDiagram />,
  MagmaViscosity: () => <MagmaViscosityDiagram />,
  CalderaFormation: () => <CalderaFormationDiagram />,
  IcelandContrast: () => <IcelandContrastDiagram />,
  VeiScale: () => <VeiScaleDiagram />,
  VolcanoMonitoring: () => <VolcanoMonitoringDiagram />,
  VolcanicWinter: () => <VolcanicWinterDiagram />,
  JanMayen: () => <JanMayenDiagram />,
  VolcanoEruptionAnatomy: () => <VolcanoEruptionAnatomyDiagram />,
  VolcanicHazards: () => <VolcanicHazardsDiagram />,
  VolcanoModel: () => <VolcanoModel showSeismicModes={false} />,
  QuizVulkaner: () => (
    <Quiz questions={QUIZ_VULKANER} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  QuizHoytrykk: () => (
    <Quiz questions={QUIZ_HOYTRYKK} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  QuizVindsystemet: () => (
    <Quiz questions={QUIZ_VINDSYSTEMET} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  InsolationDiagram: () => <InsolationDiagram />,
  OneVsThreeCellsDiagram: () => <OneVsThreeCellsDiagram />,
  WindCellsDiagram: () => <WindCellsDiagram />,
  HadleyCloseupDiagram: () => <HadleyCloseupDiagram />,
  SurfaceWindsDiagram: () => <SurfaceWindsDiagram />,
  GlobalClimateZonesDiagram: () => <GlobalClimateZonesDiagram />,
  PolarFrontNorwayDiagram: () => <PolarFrontNorwayDiagram />,
  WindSystemModel: () => <WindSystemModel />,
  VindBelterFoto: () => (
    <PhotoFigure
      src="/images/fig-belter-globus.jpg"
      alt="Jorda fra bane med grønt ekvatorbelte, ørkenbelte, stormer mot Skandinavia og polaris"
      heading="Klimabeltene sett fra rommet"
      caption="Satellittbildet viser de samme ringene: grønt ved ekvator, tørt rundt 30°, stormbaner mot Norge, is mot polen."
      marks={[
        { x: 6, y: 48, n: "1", text: "Tropisk regnskog (konvergenssonen)", tone: "teal" },
        { x: 4, y: 32, n: "2", text: "Ørkenbelte (nedsynking nær 30°)", tone: "warm" },
        { x: 52, y: 22, n: "3", text: "Vestavindsbeltet og Norge", tone: "cold" },
        { x: 58, y: 8, n: "4", text: "Polarcellen og isen", tone: "fg" },
      ]}
      points={[
        { n: "1", label: "Ved ekvator stiger lufta. Det gir skyer og tropisk regnskog." },
        { n: "2", label: "Nær 30° synker lufta. Skyene løses opp, og ørkenene ligger her." },
        { n: "3", label: "Mellom om lag 50° og 60° treffer lavtrykkene fra polarfronten Vest-Europa." },
        { n: "4", label: "Over polen synker kald luft, og det er lite fuktighet." },
      ]}
    />
  ),
  StralingsbalanseForklaring: () => (
    <Callout title="Hva betyr «strålingsbalanse»?">
      <p>
        Strålingsbalanse er forskjellen mellom innkommende solstråling og utgående varmestråling.
        Globalt, over et år, er netto om lag null. Regionalt er det overskudd i tropene og underskudd
        mot polene. Den ubalansen setter atmosfæren og havet i bevegelse (NASA, u.å.).
      </p>
    </Callout>
  ),
  TermiskDirekteForklaring: () => (
    <Callout title="Hva betyr «termisk direkte»?">
      <p>
        Termisk direkte vil si at varm luft stiger og kald luft synker. Slik er Hadley-cellen og
        polarcellen. Ferrel-cellen er termisk indirekte: den drives av friksjon mellom de to andre,
        ikke av varmekontrasten mellom ekvator og polene. Kjøligere luft tvinges opp nær 50–60°, og
        varmere luft synker nær 30° (NOAA, u.å.-a).
      </p>
    </Callout>
  ),
  SubsidensForklaring: () => (
    <Callout title="Hva betyr «subsidens»?">
      <p>
        Subsidens er storskala nedsynking av luft. Når lufta synker, presses den sammen og varmes
        opp. Den relative fuktigheten faller, skyene løses opp, og det blir tørre høytrykk. Det ser
        vi nær 30° (NOAA, u.å.-a).
      </p>
    </Callout>
  ),
  QuizVaerkart: () => (
    <Quiz questions={QUIZ_VAERKART} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  SynopticChart: () => <RealisticSynopticChartDiagram />,
  FrontProfile: () => <FrontVerticalProfileDiagram />,
  StationModel: () => <StationModelExplainedDiagram />,
  UpperAir500: () => <UpperAir500hPaMapDiagram />,
  Weather24h: () => <WeatherProgression24hDiagram />,
  RadarNowcast: () => <RadarSatelliteNowcastingDiagram />,
  SynoptiskForklaring: () => (
    <Callout title="Hva betyr «synoptisk»?">
      <p>
        Synoptisk betyr å se været under ett. Et synoptisk kart viser observasjoner fra samme
        tidspunkt over et stort område, med isobarer og fronter. Tidspunktet oppgis i UTC (NOAA,
        u.å.-e).
      </p>
    </Callout>
  ),
  IsobarForklaring: () => (
    <Callout title="Hva betyr «isobar»?">
      <p>
        En isobar er en kurve gjennom steder med likt lufttrykk. På norske kart er det vanligvis 5
        hPa mellom linjene. Trykket er redusert til havnivå, så et fjell og en kyst kan sammenlignes
        (Store norske leksikon, u.å.-c).
      </p>
    </Callout>
  ),
  FrontForklaring: () => (
    <Callout title="Hva betyr «front»?">
      <p>
        En front er skillet mellom to luftmasser med ulik tetthet, som oftest ulik temperatur. Den
        varmere lufta løftes, og det kan bli skyer og nedbør. Neste ord du trenger, er okklusjon:
        kaldfronten har tatt igjen varmfronten (Store norske leksikon, u.å.-a; NOAA, u.å.-b).
      </p>
    </Callout>
  ),

    QuizLokale: () => (
    <Quiz questions={QUIZ_LOKALE} heading={null} intro="Velg ett svar per spørsmål." />
  ),
    SolgangsbrisForklaring: () => (
    <Callout title="Hva betyr «solgangsvind»?">
      <p>
        Solgangsvind er pålandsvind om dagen og fralandsvind om natten langs kysten. Dagvinden
        kalles sjøbris: varm luft stiger over land, og kjøligere luft fra havet strømmer inn.
        Nattvinden kalles landbris, og den er som regel svakere. Neste ord du trenger, er
        termisk lavtrykk: lavtrykket som oppstår fordi lufta over det varme landet blir lettere.
      </p>
    </Callout>
  ),
    SeaBreezeLandBreeze: () => <SeaBreezeLandBreezeDiagram />,
    ValleyWind: () => <ValleyWindDiagram />,
    PolarFrontCyclone: () => <PolarFrontCycloneSteps />,
    FonForklaring: () => (
    <Callout title="Hva betyr «føn»?">
      <p>
        Føn er en forholdsvis varm og tørr vind som slår ned i lavlandet etter å ha passert et
        fjell. Lufta synker på lesiden og varmes fordi trykket øker. Luvsiden, også kalt losiden,
        er siden vinden kommer fra. Der kan det falle orografisk nedbør. Lesiden er siden vinden
        går ned på.
      </p>
    </Callout>
  ),
    InversjonForklaring: () => (
    <Callout title="Hva betyr «inversjon»?">
      <p>
        En inversjon er et lag der temperaturen stiger med høyden. Vanligvis er det kaldere jo
        høyere du kommer. I en inversjon ligger kald, tung luft nede i dalen eller fjorden, og
        varmere luft over den virker som et lokk. Lokale utslipp kan da bli liggende nær bakken.
      </p>
    </Callout>
  ),


    QuizJet: () => (
    <Quiz questions={QUIZ_JET} heading={null} intro="Velg ett svar per spørsmål." />
  ),
    JetForklaring: () => (
    <Callout title="Hva betyr «jetstrøm»?">
      <p>
        En jetstrøm er et smalt belte med sterk vind høyt oppe i atmosfæren. Vinden blåser fra vest
        mot øst og følger skillet mellom varm og kald luft. Neste ord du trenger, er polarjet: den
        jetstrømmen som ligger mellom 50° og 60° bredde.
      </p>
    </Callout>
  ),
    NaoForklaring: () => (
    <Callout title="Hva betyr «NAO»?">
      <p>
        NAO er den nordatlantiske oscillasjonen. Det er svingningen i trykkforskjellen mellom
        lavtrykket ved Island og høytrykket ved Asorene. Når forskjellen er stor, blir jetstrømmen
        over Atlanteren sterkere, og stormbanen ligger lenger nord.
      </p>
    </Callout>
  ),


    CoriolisForklaring: () => (
    <Callout title="Hva betyr «corioliseffekten»?">
      <p>
        Corioliseffekten er avbøyningen av en bevegelse sett fra den roterende jorda. Den er ikke en
        reell kraft som dytter på lufta. På den nordlige halvkule bøyer bevegelsen av mot høyre, på
        den sørlige mot venstre, og ved ekvator er avbøyningen null.
      </p>
    </Callout>
  ),
    KarusellDiagram: () => <CarouselFrameDiagram />,
    AvboyningDiagram: () => <GlobalDeflectionDiagram />,
    SyklonDiagram: () => <CycloneSpinDiagram />,
    GeostrofiskDiagram: () => <CoriolisDiagram />,
    EkmanForklaring: () => (
    <Callout title="Hva betyr «ekmantransport»?">
      <p>
        Ekmantransport er transporten av havets overflatelag på tvers av vinden. På den nordlige
        halvkule går den til høyre for vindretningen. Når den skyver vann vekk fra en kyst, kan
        dypere vann komme opp.
      </p>
    </Callout>
  ),
    SkalaDiagram: () => <CoriolisScaleDiagram />,
    QuizCoriolis: () => (
    <Quiz questions={QUIZ_CORIOLIS} heading={null} intro="Velg ett svar per spørsmål." />
  ),


    HavstromForklaring: () => (
    <Callout title="Hva betyr «havstrøm»?">
      <p>
        En havstrøm er vann i bevegelse. Den kan drives av tidevann nær land, av vind i overflaten,
        eller av tetthetsforskjeller som får kaldt og salt vann til å synke.
      </p>
    </Callout>
  ),
    DrivkrefterDiagram: () => <OceanDriversDiagram />,
    EkmanHavForklaring: () => (
    <Callout title="Hva betyr «ekmantransport»?">
      <p>
        Ekmantransport er transporten av havets overflatelag på tvers av vinden. På den nordlige
        halvkule går den til høyre for vindretningen. Når den skyver vann vekk fra en kyst, kan
        dypere vann komme opp.
      </p>
    </Callout>
  ),
    GyreDiagram: () => <GyreDiagram />,
    OppvellingDiagram: () => <UpwellingDiagram />,
    GolfDiagram: () => <GulfVsNacDiagram />,
    TetthetDiagram: () => <DensityDiagram />,
    QuizHavstrommer: () => (
    <Quiz questions={QUIZ_HAVSTROMMER} heading={null} intro="Velg ett svar per spørsmål." />
  ),


    KlimaDefinisjon: () => (
    <Callout title="Hva betyr «klima»?">
      <p>
        Klimaendring er et skifte i det langvarige gjennomsnittet av været (WMO, u.å.). En enkelt uke
        er vær. Mønsteret over lang tid er klima.
      </p>
    </Callout>
  ),
    StralingDiagram: () => <EarthRadiationBudgetDiagram />,
    DrivhusForklaring: () => (
    <Callout title="Hva betyr «drivhuseffekt»?">
      <p>
        Drivhuseffekten er at gasser holder igjen varme nær jordoverflaten, omtrent som et teppe.
        Vanndamp, karbondioksid og metan er slike gasser. Vanndamp er i hovedsak en tilbakekobling:
        den forsterker en oppvarming som noe annet har startet (NASA, u.å.-a).
      </p>
    </Callout>
  ),
    PaadrivForklaring: () => (
    <Callout title="Hva betyr «pådriv»?">
      <p>
        Et pådriv er en endring som påvirker hvor mye energi som kommer inn eller går ut. Da kan
        temperaturen stige eller falle. En tilbakekobling er systemets svar, som kan forsterke eller
        svekke dytten (NASA, 2009).
      </p>
    </Callout>
  ),
    AlbedoFoto: () => (
    <PhotoFigure
      src="/images/fig-albedo.jpg"
      alt="Arktisk iskant der hvit is møter mørkt åpent hav"
      heading="Isen er et speil"
      caption="Tap av is ved polene gjør flaten mindre reflekterende. Det er en tilbakekobling, ikke det første pådrivet (NASA, 2009)."
      marks={[
        { x: 8, y: 16, n: "1", text: "Is kaster tilbake", tone: "fg" },
        { x: 68, y: 38, n: "2", text: "Hav tar opp", tone: "cold", align: "right" },
      ]}
      points={[
        { n: "1", label: "Høy albedo. Mye sollys kastes tilbake." },
        { n: "2", label: "Mørkere flate tar opp mer av sollyset." },
      ]}
    />
  ),
    NorgeKlimaFoto: () => (
    <PhotoFigure
      src="/images/fig-norge-labrador.jpg"
      alt="Norsk kyst mot et kaldere landskap på samme type bredde"
      heading="Mildere enn beliggenheten"
      caption="Fastlands-Norge er mildere enn den nordlige beliggenheten skulle tilsi, fordi havstrømmer og vind transporterer varme hit (SNL, u.å.)."
      marks={[
        { x: 6, y: 16, n: "1", text: "Norsk kyst", tone: "teal" },
        { x: 58, y: 16, n: "2", text: "Hav og vind", tone: "cold" },
      ]}
      points={[
        { n: "1", label: "Kysten fra Oslofjorden til Troms har milde vintre." },
        { n: "2", label: "Varmen kommer med havstrømmer og vind, ikke bare med solhøyden." },
      ]}
    />
  ),
    QuizOversikt: () => (
    <Quiz questions={QUIZ_OVERSIKT} heading={null} intro="Velg ett svar per spørsmål." />
  ),


    EnsoForklaring: () => (
    <Callout title="Hva betyr «ENSO»?">
      <p>
        ENSO er El Niño–sørlig oscillasjon. El Niño er den varme fasen og La Niña den kalde fasen av
        et naturlig klimamønster i det tropiske Stillehavet. Mønsteret skifter uregelmessig, omtrent
        hvert andre til sjuende år (NOAA, u.å.-a).
      </p>
    </Callout>
  ),
    FaseDiagram: () => <EnsoComparisonDiagram />,
    BjerknesLoop: () => <BjerknesLoopDiagram />,
    QuizEnso: () => (
    <Quiz questions={QUIZ_ENSO} heading={null} intro="Velg ett svar per spørsmål." />
  ),

  AtmosphericColumn: () => <AtmosphericColumnDiagram />,
  RelativePressure: () => <RelativePressureDiagram />,
  LowPressureCrossSection: () => <LowPressureCrossSectionDiagram />,
  HighPressureCrossSection: () => <HighPressureCrossSectionDiagram />,
  MettetForklaring: () => (
    <Callout title="Hva betyr «mettet»?">
      <p>
        Luft kan bare inneholde en viss mengde vanndamp, og hvor mye avhenger av temperaturen. Varm
        luft kan holde mer vanndamp enn kald luft. Når luften inneholder så mye vanndamp som den
        kan ved den temperaturen den har, er den <strong>mettet</strong>. Den relative fuktigheten
        er da 100 %. Temperaturen der luften blir mettet, kalles <strong>duggpunktet</strong>.
        Avkjøles mettet luft enda mer, kondenserer vanndampen til små vanndråper, og det dannes
        skyer, tåke eller dugg.
      </p>
    </Callout>
  ),
  ElasticRebound: () => <ElasticReboundDiagram />,
  Partikkelbolger: () => <PartikkelbolgerDiagram />,
  EarthquakeWavePhysics: () => <EarthquakeWavePhysicsDiagram />,
  JordasBolger: () => <JordasBolgerDiagram />,
  Seismogram: () => <SeismogramDiagram />,
  BoundaryQuakes: () => <BoundaryQuakesDiagram />,
  NorwayEarthquakes: () => <NorwayEarthquakesDiagram />,
  HyposenterForklaring: () => (
    <Callout title="Hva betyr «hyposenter»?">
      <p>
        Hyposenteret (hypocenter), også kalt fokus, er stedet i dypet der bruddet starter. Episenteret
        (epicenter) er punktet på overflaten rett over. Neste ord du trenger, er seismisk bølge: det
        er energien som sprer seg ut fra hyposenteret og rister bakken.
      </p>
    </Callout>
  ),
  IntraplateForklaring: () => (
    <Callout title="Hva betyr «intraplate»?">
      <p>
        Intraplate betyr inne på en plate, ikke ved en aktiv plategrense. Norge ligger inne på Den
        eurasiske platen. Skjelvene her kalles intraplate-jordskjelv. Neste ord du trenger, er
        forkastning: et gammelt brudd som kan gli på nytt når spenningen blir stor nok.
      </p>
    </Callout>
  ),
  QuizJordskjelv: () => (
    <Quiz questions={QUIZ_JORDSKJELV} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  SilicateStructure: () => <SilicateStructureDiagram />,
  RockCycle: () => <RockCycleDiagram />,
  BowenReactionSeries: () => <BowenReactionSeriesDiagram />,
  MetamorphicFacies: () => <MetamorphicFaciesDiagram />,
  RelativeDating: () => <RelativeDatingDiagram />,
  RockPetrologyModel: () => <RockPetrologyModel />,
  ForvitringForklaring: () => (
    <Callout title="Hva betyr «forvitring»?">
      <p>
        Forvitring er nedbrytning av berg på stedet. Berget flyttes ikke. Det kan skje mekanisk,
        uten at mineralenes kjemi endres, eller kjemisk, når mineralene løses. Neste skille er
        erosjon: nedsliting pluss transport.
      </p>
    </Callout>
  ),
  ForvitringFoto: () => (
    <PhotoFigure
      src="/images/fig-forvitring.jpg"
      alt="Oppsprukket bergvegg med is i sprekken og løse fragmenter som fortsatt ligger ved blotningen"
      heading="Forvitring på stedet"
      caption="Vann i sprekken kan fryse og kile fjellet. Fragmentene ligger fortsatt ved blotningen. Først når vann, is eller tyngdekraft flytter dem, er det erosjon."
    />
  ),
  QuizBergarter: () => (
    <Quiz questions={QUIZ_BERGARTER} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  Kretslop: () => <KretslopDiagram />,
  Hydrograph: () => <HydrographDiagram />,
  AkviferForklaring: () => (
    <Callout title="Hva betyr «akvifer»?">
      <p>
        En akvifer er berg eller løsmasse som kan lagre grunnvann og slippe det fra seg, for
        eksempel sand, grus eller oppsprukket fjell. Tenk på en svamp. Den holder på vann, og
        slipper det når du presser. Vannet ligger ikke i underjordiske elver. Det fyller porer i
        sand og grus, eller sprekker i fjell.
      </p>
    </Callout>
  ),
  QuizVannOgFlom: () => (
    <Quiz questions={QUIZ_VANN_OG_FLOM} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  KvikkleireForklaring: () => (
    <Callout title="Hva betyr «kvikkleire»?">
      <p>
        Kvikkleire er marin leire der saltet mellom leirpartiklene er vasket ut. Partiklene ligger i
        en åpen korthusstruktur. Saltvann holder strukturen. Ferskt grunnvann kan vaske saltet ut
        over lang tid. Da svekkes bindingene. Blir leira overbelastet, klapper strukturen sammen, og
        leira blir flytende.
      </p>
    </Callout>
  ),
  KvikkleireSteg: () => <KvikkleireDiagram />,
  QuizSkred: () => (
    <Quiz questions={QUIZ_SKRED} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  SpheresDiagram: () => <SpheresDiagram />,
  CarbonCycleDiagram: () => <CarbonCycleDiagram />,
  EarthSystemsModel: () => <EarthSystemsModel />,
  FjordFoto: () => (
    <PhotoFigure
      src="/images/fig-vestlandet.jpg"
      alt="Vestlandsk fjordlandskap med dype U-daler og bratte fjellsider formet av isbreer"
      heading="Dal og fjord gravd av is"
      caption="Breisen grov ut dype daler og fjorder. Fjorden er dalen som havet fylte etter at isen smeltet."
      marks={[
        { x: 32, y: 45, n: "1", text: "Bratt dalside", tone: "cold" },
        { x: 74, y: 38, n: "2", text: "Hengende sidedal", tone: "warm" },
        { x: 50, y: 72, n: "3", text: "Fjord", tone: "teal" },
      ]}
      points={[
        {
          n: "1",
          label:
            "Innlandsisen fylte dalen og eroderte både i bunnen og langs sidene. Profilet ble en U-dal.",
        },
        {
          n: "2",
          label:
            "En mindre sidebre eroderte svakere enn hovedbreen, så sidedalen kan munne høyt oppe i fjellsiden.",
        },
        {
          n: "3",
          label: "Fjorden er den iseroderte dalen, fylt av hav etter at isen trakk seg tilbake.",
        },
      ]}
    />
  ),
  VekselvirkningForklaring: () => (
    <Callout title="Hva betyr «vekselvirkning»?">
      <p>
        En vekselvirkning er en endring i ett delsystem som utløser respons i ett eller flere
        andre. Elva som graver en dal, er hydrosfære som endrer geosfæren. Breen som sliper berget,
        er kryosfære som svarer. Neste ord du trenger, er tidsskala: hvor lang tid responsen tar.
      </p>
    </Callout>
  ),
  QuizJordsystemene: () => (
    <Quiz questions={QUIZ_JORDSYSTEMENE} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  FirnForklaring: () => (
    <Callout title="Hva betyr «firn»?">
      <p>
        Firn er gammel, grovkornet snø som har overlevd minst én sommer. Den er en mellomting mellom
        snø og is, litt som en snøball som har blitt hard og kornete etter å ha ligget lenge. Når
        firnen blir presset sammen enda mer, blir den til breis (SNL, u.å.-b).
      </p>
    </Callout>
  ),
  BreLengdesnitt: () => <BreLengdesnittDiagram />,
  VdalTilUdal: () => <VdalTilUdalDiagram />,
  BotnEggTind: () => <BotnEggTindDiagram />,
  Avsetningsformer: () => <AvsetningsformerDiagram />,
  Frostsprengning: () => <FrostsprengningDiagram />,
  IsostasiForklaring: () => (
    <Callout title="Hva betyr «isostasi»?">
      <p>
        Isostasi (isostasy) betyr at den stive litosfæren ligger i likevekt på den seigere
        astenosfæren under, omtrent som en båt som flyter. Legger du tung last i båten, synker den
        dypere. Tar du lasten ut, flyter den høyere igjen. Mer om litosfæren og astenosfæren står i
        kapittelet{" "}
        <Link to="/geofag-1/platetektonikk" className="font-medium text-primary underline underline-offset-2">
          Platetektonikk
        </Link>
        .
      </p>
    </Callout>
  ),
  IsostasiSnitt: () => <IsostasiSnittDiagram />,
  QuizIsbre: () => (
    <Quiz questions={QUIZ_ISBRE} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  MalmForklaring: () => (
    <Callout title="Hva betyr «malm»?">
      <p>
        Malm er en bergart som inneholder ett eller flere mineraler eller grunnstoffer i økonomisk
        drivverdige mengder.
      </p>
    </Callout>
  ),
  QuizGeologiskeRessurser: () => (
    <Quiz
      questions={QUIZ_GEOLOGISKE_RESSURSER}
      heading={null}
      intro="Velg ett svar per spørsmål."
    />
  ),
  FeltarbeidForklaring: () => (
    <Callout title="Hva betyr «feltarbeid»?">
      <p>
        Feltarbeid er innsamling av data i en undersøkelse. I geologi kan det være å samle
        steinprøver.
      </p>
    </Callout>
  ),
  QuizFeltarbeid: () => (
    <Quiz questions={QUIZ_FELTARBEID} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  KlimaForklaring: () => (
    <Callout title="Hva betyr «klimasystemet»?">
      <p>
        Klimasystemet er atmosfæren, hydrosfæren, kryosfæren, litosfæren og biosfæren, og samspillet
        mellom dem. Utveksling av energi, vann og karbondioksid bestemmer klimamønstre og variasjon
        (WMO, u.å.).
      </p>
    </Callout>
  ),
  KlimaKart: () => (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {KLIMA_SUBTHEMES.map((sub) => (
        <Link
          key={sub.to}
          to={sub.to}
          className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">{sub.kicker}</p>
            <h3 className="mt-1 font-display text-xl font-medium tracking-tight group-hover:text-primary">
              {sub.title}
            </h3>
            {"subtitle" in sub && sub.subtitle ? (
              <p className="text-xs text-muted-foreground">{sub.subtitle}</p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{sub.blurb}</p>
          </div>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Åpne
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  ),
  QuizKlima: () => (
    <Quiz questions={QUIZ_KLIMA} heading={null} intro="Velg ett svar per spørsmål." />
  ),
};

/** The earth-layer photo and the EarthLayers widget render the same figure. Keep the photo. */
function withoutDuplicateEarthFigure(parts: PosterPart[]): PosterPart[] {
  const hasPhoto = parts.some(
    (part) => part.type === "markdown" && part.value.includes(EARTH_LAYERS_PHOTO_SRC),
  );
  if (!hasPhoto) return parts;
  return parts.filter((part) => !(part.type === "widget" && part.id === "EarthLayers"));
}

function PosterWidget({ id }: { id: string }) {
  const render = POSTER_WIDGETS[id];
  if (!render) {
    return (
      <aside className="my-6 rounded-xl border border-dashed border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
        Ukjent figur «{id}».
      </aside>
    );
  }
  return render();
}

/**
 * Published post + editor preview. Diagrams, quizzes, map and the plate model
 * are injected from chapter headings when the stored markdown has none.
 */
export function PosterBody({
  children,
  className,
  cleanChapter,
  scrollTables = false,
  wrapTables = false,
}: {
  children: string;
  className?: string;
  cleanChapter?: boolean;
  scrollTables?: boolean;
  wrapTables?: boolean;
}) {
  const content = cleanChapter ? stripChapterEditorNotice(children) : children;
  const parts = withoutDuplicateEarthFigure(parsePosterMarkdown(injectPosterWidgets(content)));
  return (
    <div className={cn("space-y-4", className)}>
      {parts.map((part, index) =>
        part.type === "widget" ? (
          <PosterWidget key={`w-${part.id}-${index}`} id={part.id} />
        ) : (
          <Markdown key={`m-${index}`} scrollTables={scrollTables} wrapTables={wrapTables}>
            {part.value}
          </Markdown>
        ),
      )}
    </div>
  );
}
