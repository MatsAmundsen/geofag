import { KvikkleireBakoverFigur, SkredKrefterFigur, SkredTyperFigur } from "@/components/diagrams/skred-figurer";
import type { JSX } from "react";
import {
  AdaptationExamFrameworkDiagram,
  ImpactLevelsDiagram,
  EccentricityDetailDiagram,
  FennoscandianIceSheetDiagram,
  GlacialLandformsDiagram,
  IceAgeFactorsDiagram,
  Insolation65NCurveDiagram,
  KvartarTimeSeriesDiagram,
  MilankovitchCyclesDiagram,
  ObliquityDetailDiagram,
  PrecessionDetailDiagram,
  AssimilationDiagram,
  EnsembleRibbonDiagram,
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
  ElasticReboundDiagram,
  JordasBolgerDiagram,
  PartikkelbolgerDiagram,
  HotspotPlumeDiagram,
  NorwayEarthquakesDiagram,
  NorwayTectonicsHistoryDiagram,
  OfiolittSnittDiagram,
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
  AbruptClimateChangeDiagram,
  DeglaciationFeedbackDiagram,
  IceCoreAnatomyDiagram,
  OxygenIsotopeDiagram,
} from "@/components/diagrams";
import { PaleoClimateIsotopeModel } from "@/components/models/paleo-climate-model";
import {
  MetamorphicFaciesDiagram,
  SilicateStructureDiagram,
} from "@/components/diagrams/bergarter";
import {
  AvkjolingKornFigur,
  BergartssyklusSnittFigur,
  FolgBergartFigur,
  MetamorfoseFigur,
  OSLO_STATUS_BERGARTER,
  SilikatgrupperFigur,
  SteinlabFigur,
} from "@/components/diagrams/bergarter-figurer";
import { KontaktRegionalV2Figur } from "@/components/diagrams/kontakt-regional-v2";
import { DifferensieringV2Figur } from "@/components/diagrams/differensiering-figur";
import { IonBytteV2Figur } from "@/components/diagrams/ionbytte-figur";
import { DiageneseFigur } from "@/components/diagrams/diagenese-figur";
import {
  GeotidRelativFigur,
  GeotidTidslinjeFigur,
  HalveringstidFigur,
  LedefossilFigur,
  VinkeldiskordansFigur,
} from "@/components/diagrams/geotid-figurer";
import {
  KaledonideneFigur,
  NorskehavetFigur,
  OslograbenFigur,
} from "@/components/diagrams/norgesgeo-figurer";
import { NorgesGeodynamikkKart } from "@/components/diagrams/norges-geodynamikk-kart";
import {
  BowenReactionSeriesDiagram,
  GrainSizeDistributionDiagram,
} from "@/components/diagrams/geology-extra";
import { FeltmetodeFigur } from "@/components/diagrams/felt-figurer";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  AvsetningsformerDiagram,
  BotnEggTindDiagram,
  BreLengdesnittDiagram,
  FrostsprengningDiagram,
  IsostasiSnitt,
  IsostasiSnittDiagram,
  VdalTilUdalDiagram,
} from "@/components/diagrams/isbreer";
import {
  AkviferFigur,
  HansNedborFigur,
  HydrogramFigur,
  KretslopFigur,
} from "@/components/diagrams/vannflom-figurer";
import { SmeltingUnderTynnPlateDiagram } from "@/components/diagrams/mantle-melting";
import { Callout } from "@/components/callout";
import {
  FjellskredBolgeDiagram,
  SkredSonerDiagram,
} from "@/components/diagrams/skred";
import { FeltbokDiagram, FraBergartTilBruddDiagram } from "@/components/diagrams/ressurser";
import { PetroleumSnittFigur, RessurskartFigur } from "@/components/diagrams/ressurs-figurer";
import {
  DensityDiagram,
  GulfVsNacDiagram,
  GyreDiagram,
  OceanDriversDiagram,
  UpwellingDiagram,
} from "@/components/diagrams/ocean";
import { GeoMap } from "@/components/geo-map";
import { lastMarkdownHeading, Markdown } from "@/components/markdown";
import { SpheresDiagram } from "@/components/diagrams/spheres";
import { KarbonatSilikatFigur } from "@/components/diagrams/jordsys-figurer";
import { EarthSystemsModel } from "@/components/models/earth-systems-model";
import { PlateTectonicsModel } from "@/components/models/plate-tectonics-model";
import { VolcanoModel } from "@/components/models/volcano-model";
import { WindSystemModel } from "@/components/models/wind-system-model";
import { CoriolisLatitudeDiagram, EkmanSpiralDiagram, GeostrophicAdjustmentDiagram, NaoDiagram, PressureSpinDiagram, RossbyScaleDiagram, ZonalCentrifugalDiagram } from "@/components/diagrams/coriolis";
import { GlacierMassBalanceDiagram, PermafrostDiagram, SeaIceAlbedoFeedbackDiagram, SlabAvalancheDiagram } from "@/components/diagrams/cryosphere";
import { AtmosphericRiverDiagram, ClimateRiskShiftDiagram, HurricaneCrossSectionDiagram, MeteorologicalBombDiagram, PolarLowFormationDiagram, StormSurgeDiagram, SupercellAnatomyDiagram, TornadoGenesisDiagram } from "@/components/diagrams/disasters";
import { FieldworkInquiryChainDiagram, MeteorologicalStationDiagram, RadiosondeAscentDiagram } from "@/components/diagrams/inquiry-frameworks";
import { JetBlockingDiagram, JetFormsDiagram, JetProfileDiagram, JetSeasonDiagram, JetStreakDiagram, ThermalWindDiagram } from "@/components/diagrams/jet";
import { DataAssimilationCycleDiagram, LorenzChaosEnsembleDiagram, ModelGrid3DDiagram, ModelHierarchyNorwayDiagram, PrimitiveEquationsDiagram, SubgridParametrizationDiagram } from "@/components/diagrams/models";
import { AmocDiagram, ClimateContrastDiagram, EkmanDiagram } from "@/components/diagrams/ocean";
import { AmocTippingModel } from "@/components/models/amoc-tipping-model";
import { KatabaticWindDiagram } from "@/components/diagrams/pressure";
import { FoehnAdiabaticDiagram, TemperatureInversionDiagram } from "@/components/diagrams/weather";
import { CoriolisModel } from "@/components/models/coriolis-model";
import { CtdProfileModel } from "@/components/models/ctd-profile-model";
import { EkmanUpwellingModel } from "@/components/models/ekman-upwelling-model";
import { FieldworkObservationModel } from "@/components/models/fieldwork-observation-model";
import { FoehnModel } from "@/components/models/foehn-model";
import { GlacierMassBalanceModel } from "@/components/models/glacier-mass-balance-model";
import { HurricaneSpinModel } from "@/components/models/hurricane-spin-model";
import { OceanCurrentModel } from "@/components/models/ocean-current-model";
import { SeaBreezeModel } from "@/components/models/sea-breeze-model";
import { SnowProfileModel } from "@/components/models/snow-profile-model";
import { WindPowerModel } from "@/components/models/wind-power-model";
import { MarineEnergyModel } from "@/components/models/marine-energy-model";
import {
  EnergySourcesDiagram,
  OffshoreWindShelfDiagram,
  OtecRankineCycleDiagram,
  WindPowerTradeoffDiagram,
} from "@/components/diagrams/energy";
import { PhotoFigure, PhotoPair } from "@/components/photo-figure";
import { StormwaterAdaptationModel } from "@/components/models/stormwater-adaptation-model";
import { Sammendrag } from "@/components/sammendrag";
import {
  ElvaFraKildeTilMunning,
  Forvitringsformer,
  GilbertDelta,
  HjulstromInteraktiv,
  LandskapBlokk,
  MeanderOgKroksjo,
} from "@/components/diagrams/landformer-figurer";
import { SAMMENDRAG, SJEKK_DEG_SELV } from "@/lib/kapittel-mal";
import {
  IodFaseFigur,
  IodHavtemperaturFigur,
  IodJetstrommerFigur,
} from "@/components/diagrams/iod-figurer";
import {
  NaoFaserFigur,
  NaoKartFigur,
  NaoOmradeFigur,
  NaoPolarvirvelFigur,
} from "@/components/diagrams/nao-figurer";
import { Quiz } from "@/components/quiz";
import { GF2_THEMES, KLIMA_MODELS, KLIMA_SUBTHEMES } from "@/lib/nav";
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
  QUIZ_SJEKK_JORDSKJELV_1,
  QUIZ_SJEKK_JORDSKJELV_2,
  QUIZ_SJEKK_JORDSKJELV_3,
  QUIZ_SJEKK_JORDSKJELV_4,
  QUIZ_SJEKK_JORDSKJELV_5,
  QUIZ_SJEKK_JORDSKJELV_6,
  QUIZ_SJEKK_SKJELVFARE_1,
  QUIZ_SJEKK_SKJELVFARE_2,
  QUIZ_SJEKK_SKJELVFARE_3,
  QUIZ_SKJELVFARE,
  QUIZ_LANDFORMER,
  QUIZ_GEOLOGISK_TID,
  QUIZ_NORGES_GEOLOGI,
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
  QUIZ_IOD,
  QUIZ_NAO,
  QUIZ_AMOC,
  QUIZ_KRYO,
  QUIZ_MODELLER,
  QUIZ_PALEO,
  QUIZ_ISTIDER,
  QUIZ_FARER,
  QUIZ_TILPASNING,
  QUIZ_ENERGI,
  QUIZ_FELT_HAV,
} from "@/lib/poster-quizzes";

const PLATE_QUIZ_INTRO = "Velg ett svar per spørsmål.";

const POSTER_WIDGETS: Record<string, () => JSX.Element> = {
  // Kapittelmalen: `Sjekk<Navn>` og `Sammendrag<Navn>` fra src/lib/kapittel-mal.ts.
  ...Object.fromEntries(
    Object.entries(SJEKK_DEG_SELV).map(([key, questions]) => [
      `Sjekk${key}`,
      () => <Quiz questions={questions} intro="Velg ett svar per spørsmål." />,
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(SAMMENDRAG).map(([key, points]) => [
      `Sammendrag${key}`,
      () => <Sammendrag points={points} />,
    ]),
  ),
  EarthLayers: () => <EarthLayersDiagram />,
  Spreading: () => <SpreadingDiagram />,
  Convection: () => <ConvectionDiagram />,
  PlatesMap: () => <PlatesMapDiagram />,
  Solidus: () => <SolidusDiagram />,
  DecompressionMelting: () => <DecompressionMeltingDiagram />,
  SmeltingUnderTynnPlate: () => <SmeltingUnderTynnPlateDiagram />,
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
  ImpactLevels: () => <ImpactLevelsDiagram />,
  AdaptationExamFramework: () => <AdaptationExamFrameworkDiagram />,
  StormwaterAdaptation: () => <StormwaterAdaptationModel />,
  TilpasningOvervannFoto: () => (
    <PhotoFigure
      src="/images/fig-ekstremnedbor.jpg"
      alt="Oversvømt bygate der overvann flommer over fortau og inn mot kjellervinduer"
      heading="Når regnet ikke finner veien ned"
      caption="En bygate under et kraftig regnskyll. Sluk og rør under bakken er bygd for regnet slik det var før. Når regnet blir kraftigere enn rørene tåler, renner vannet på overflaten og inn i kjellere."
      marks={[
        { x: 18, y: 35, n: "1", text: "Tett asfalt og tak", tone: "low" },
        { x: 52, y: 68, n: "2", text: "Fulle sluk og rør", tone: "warm" },
        { x: 82, y: 78, n: "3", text: "Vann i kjelleren", tone: "warm" },
        { x: 35, y: 88, n: "4", text: "Flomvei i gata", tone: "teal" },
      ]}
      points={[
        { n: "1", label: "Tette flater: Det meste av regnet renner av på overflaten." },
        { n: "2", label: "Når rørene er fulle, samler vannet seg på overflaten." },
        { n: "3", label: "Vannet renner mot det laveste punktet og inn i kjellere." },
        { n: "4", label: "En planlagt flomvei leder vannet trygt bort på overflaten." },
      ]}
    />
  ),
  TilpasningElvesikringFoto: () => (
    <PhotoFigure
      src="/images/fig-erosjonssikring.jpg"
      alt="Elveløp der elvebredden er sikret med grov sprengstein (plastring) og bevart vegetasjon"
      heading="Elvesikring med grå og naturbaserte løsninger"
      caption="Et elveavsnitt sikret mot erosjon og flom. Steinsikring beskytter de mest utsatte delene, mens vegetasjon og flomslette gir elva plass og bremser vannet."
      marks={[
        { x: 25, y: 40, n: "1", text: "Steinsikring (grå)", tone: "teal" },
        { x: 70, y: 30, n: "2", text: "Kantvegetasjon og flomslette", tone: "cold" },
        { x: 45, y: 75, n: "3", text: "Flomvoll", tone: "warm" },
      ]}
      points={[
        { n: "1", label: "Grov stein hindrer at elva graver ut bredden i yttersvingene." },
        { n: "2", label: "Røttene binder jorda, og flomsletta tar imot vann under flom." },
        { n: "3", label: "Flomvollen skjermer bebyggelsen, men bare opp til den flommen den er bygd for." },
      ]}
    />
  ),
  EccentricityDetail: () => <EccentricityDetailDiagram />,
  FennoscandianIceSheet: () => <FennoscandianIceSheetDiagram />,
  GlacialLandforms: () => <GlacialLandformsDiagram />,
  IceAgeFactors: () => <IceAgeFactorsDiagram />,
  Insolation65NCurve: () => <Insolation65NCurveDiagram />,
  KvartarTimeSeries: () => (
    <KvartarTimeSeriesDiagram caption="De siste 800 000 årene viser iskjernen åtte store sykluser på omtrent 100 000 år, med langsom nedkjøling og rask avsmelting (Lüthi mfl., 2008). Før ca. én million år siden fulgte istidene mest 41 000-årsrytmen til helningen (Lisiecki og Raymo, 2005). Hvordan kurven er laget fra iskjerner, står på siden om paleoklima." />
  ),
  MilankovitchCycles: () => <MilankovitchCyclesDiagram />,
  ObliquityDetail: () => <ObliquityDetailDiagram />,
  PrecessionDetail: () => <PrecessionDetailDiagram />,
  MilankovitchInnstraling: () => (
    <PhotoFigure
      src="/images/fig-innstraling.jpg"
      alt="Jorda belyst av sola, med tydelig forskjell mellom belyste og skyggesider"
      heading="Innstrålingen treffer skjevt"
      caption="Sola varmer ekvator mer enn polene. Milankovitch-syklusene flytter denne skjevheten gjennom årtusener: mer eller mindre sommersol på 65°N, nesten uten å endre det samlede sollyset."
      marks={[
        { x: 8, y: 18, n: "1", text: "Ekvator får mest", tone: "warm" },
        { x: 70, y: 12, n: "2", text: "65°N om sommeren", tone: "cold" },
      ]}
      points={[
        { n: "1", label: "Den globale innstrålingen over året endres lite av jordbanen." },
        { n: "2", label: "Istidene styres av om sommeren på 65°N kan smelte isen." },
      ]}
    />
  ),
  MilankovitchAlbedo: () => (
    <PhotoFigure
      src="/images/fig-albedo.jpg"
      alt="Is og snø mot mørkt fjell og vann, med tydelig kontrast i lyshet"
      heading="Is kaster lyset tilbake"
      caption="Høy albedo over snø og is, lav over bart fjell og åpent hav. Når innlandsisen vokser, tar jorda opp mindre solenergi. Når den smelter, tar jorda opp mer. Jordbanen setter i gang endringen, og albedoen forsterker den."
      marks={[
        { x: 10, y: 20, n: "1", text: "Høy albedo", tone: "cold" },
        { x: 62, y: 70, n: "2", text: "Lav albedo", tone: "warm" },
      ]}
      points={[
        { n: "1", label: "Snø og is reflekterer. Vokser isen, taper jorda energi." },
        { n: "2", label: "Mørkt land og hav tar opp energi. Smelter isen, går det fortere." },
      ]}
    />
  ),
  MilankovitchFjord: () => (
    <PhotoFigure
      src="/images/gf1-bergarter.jpg"
      alt="Lagdelt berg i forgrunnen og en fjord med bratte dalsider og bre innerst"
      heading="Fjord er U-dal under vann"
      caption="En fjord med bratte sider og en bre innerst. Fjorden er en U-dal som isen gravde ut under istidene, og som nå ligger under havnivå."
      marks={[
        { x: 8, y: 28, n: "1", text: "Bratt dalside", tone: "cold" },
        { x: 55, y: 62, n: "2", text: "Dyp dal og fjord", tone: "teal" },
      ]}
      points={[
        { n: "1", label: "Isen gravde i hele tverrsnittet og ga bratte dalsider." },
        { n: "2", label: "U-form og fjord er isens tverrsnitt, ikke elvas V." },
      ]}
    />
  ),
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
        polarcellen. Ferrel-cellen er termisk indirekte: den drives ikke av oppvarming, men holdes i gang av de
        vandrende lavtrykkene og høytrykkene ved midlere breddegrader. Kjøligere luft tvinges opp nær 50–60°, og
        varmere luft synker nær 30° (NOAA, u.å.-a; AMS, u.å.).
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


    CoriolisForklaring: () => (
    <Callout title="Hva betyr «corioliseffekten»?">
      <p>
        Corioliseffekten er avbøyningen av en bevegelse sett fra den roterende jorda. Den er ikke en
        reell kraft som virker på lufta. På den nordlige halvkule bøyer bevegelsen av mot høyre, på
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
        En havstrøm er vann som flytter seg i en bestemt retning over tid. Den drives av vind,
        trykkforskjeller når havoverflaten heller, tetthetsforskjeller og tidevann.
      </p>
    </Callout>
  ),
    DrivkrefterDiagram: () => <OceanDriversDiagram />,
    EkmanHavForklaring: () => (
    <Callout title="Hva betyr «ekmantransport»?">
      <p>
        Ekmantransport er transporten av havets overflatelag på tvers av vinden. På den nordlige
        halvkulen går den 90 grader til høyre for vindretningen. Når den skyver vann vekk fra en
        kyst, kan dypere vann komme opp.
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
        Klima er gjennomsnittet og variasjonsmønsteret i været over lang tid, vanligvis 30 år eller
        mer. Klimaet beskriver hva som er typisk, og hva som er ekstremt, på et sted (WMO, u.å.).
      </p>
    </Callout>
  ),
    KlimasystemFoto: () => (
    <PhotoFigure
      src="/images/fig-klimasystem.jpg"
      alt="Jorda fra verdensrommet med tynn atmosfære, hav, skyer og innlandsis"
      heading="Ett system, flere etasjer"
      caption="Det du ser her, er klimasystemet: luft, hav, is og land i samme bilde. Ingenting av dette virker alene."
      marks={[
        { x: 4, y: 20, n: "1", text: "Atmosfære", tone: "teal" },
        { x: 8, y: 52, n: "2", text: "Hav", tone: "cold" },
        { x: 58, y: 48, n: "3", text: "Is", tone: "fg" },
      ]}
      points={[
        { n: "1", label: "Tynn og rask. Flytter fukt og varme på dager." },
        { n: "2", label: "Tregt varmelager. Demper og forskyver klimaet." },
        { n: "3", label: "Hvit flate. Smelter den, tar planeten opp mer sol." },
      ]}
    />
  ),
    StralingFotoPar: () => (
    <PhotoPair
      heading="Samme jord, to ledd i energien"
      caption="Venstre: Sola treffer mest ved ekvator, slik du har sett i vindsystemet. Høyre: Den tynne, glødende atmosfæren er teppet som bremser varmen på vei ut."
      left={{
        src: "/images/fig-innstraling.jpg",
        alt: "Jorda belyst sterkest ved ekvator",
        title: "Inn: sola treffer ujevnt",
        marks: [{ x: 6, y: 14, n: "1", text: "Mest inn ved ekvator", tone: "warm" }],
      }}
      right={{
        src: "/images/fig-drivhus.jpg",
        alt: "Jordas atmosfære gløder langs horisonten i skumring",
        title: "Ut: teppet bremser",
        marks: [{ x: 6, y: 18, n: "2", text: "Atmosfæren holder igjen", tone: "teal" }],
      }}
    />
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
        svekke endringen (NASA, 2009).
      </p>
    </Callout>
  ),
    AlbedoFoto: () => (
    <PhotoFigure
      src="/images/fig-albedo.jpg"
      alt="Arktisk iskant der hvit is møter mørkt åpent hav"
      heading="To flater, to utfall"
      caption="Samme sol. Hvit is sender mye tilbake. Mørkt vann tar det opp. Når iskanten trekker seg tilbake, vinner den mørke flaten. Det er en tilbakekobling, ikke det første pådrivet (NASA, 2009)."
      marks={[
        { x: 8, y: 16, n: "1", text: "Is kaster tilbake", tone: "fg" },
        { x: 68, y: 38, n: "2", text: "Hav tar opp", tone: "cold", align: "right" },
      ]}
      points={[
        { n: "1", label: "Høy albedo. Mye sollys reflekteres." },
        { n: "2", label: "Lav albedo. Energien blir i havet og lufta over." },
      ]}
    />
  ),
    HavMinneFoto: () => (
    <PhotoFigure
      src="/images/fig-amoc.jpg"
      alt="Nord-Atlanteren med varm overflate nordover og kaldt dyp"
      heading="Havet som klimaminne"
      caption="Varmt nordover i lyset, kaldt sørover i mørket. Dette er tregere enn været, og derfor en del av klimaet, ikke av ukas prognose."
      arrows={[
        { d: "M 22 22 L 58 16", tone: "warm", width: 1.3 },
        { d: "M 70 42 L 28 48", tone: "cold", width: 1.3 },
      ]}
      marks={[
        { x: 8, y: 12, n: "1", text: "Varmt, tregt lager", tone: "warm" },
        { x: 8, y: 50, n: "2", text: "Kaldt dyp sørover", tone: "cold" },
      ]}
      points={[
        { n: "1", label: "Overflaten flytter og lagrer varme mot nord." },
        { n: "2", label: "Dypet er returen. Ferskvann kan gjøre det vanskeligere for vannet å synke." },
      ]}
    />
  ),
    NorgeKlimaFoto: () => (
    <PhotoFigure
      src="/images/fig-norge-labrador.jpg"
      alt="Norsk kyst mot isete Labrador-landskap som kontrast"
      heading="Samme bredde, ulikt klima"
      caption="Norge er ikke mildt fordi vi ligger lenger sør. Vi er milde fordi luft og hav flytter varme hit (SNL, u.å.). Endres det samspillet, endres det norske klimaet."
      marks={[
        { x: 6, y: 16, n: "1", text: "Norsk kyst", tone: "teal" },
        { x: 58, y: 16, n: "2", text: "Labrador, samme bredde", tone: "cold" },
      ]}
      points={[
        { n: "1", label: "Vestavind og atlantisk varme. Grønt og åpent hav." },
        { n: "2", label: "Samme breddegrad, men kald luft og is. Klima er transport, ikke bare solhøyde." },
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


    IodForklaring: () => (
    <Callout title="Hva betyr «indisk hav-dipol»?">
      <p>
        Den indiske hav-dipolen er vedvarende endring i forskjellen mellom havtemperaturen vest og
        øst i det tropiske Indiahavet. Positiv fase har varmere vann i vest og kjøligere i øst (BOM,
        u.å.).
      </p>
    </Callout>
  ),
    QuizIod: () => <Quiz questions={QUIZ_IOD} heading={null} intro="Velg ett svar per spørsmål." />,
    IodFigurPositiv: () => (
    <IodFaseFigur
      initialFase="positiv"
      heading="Figur 1. Positiv IOD"
      title="Kart over Det indiske hav med varmt vann ved Øst-Afrika, kaldt vann ved Indonesia og en jetstrøm over Sør-Australia"
      caption="I positiv fase er havet varmere enn normalt utenfor Øst-Afrika og kjøligere nær Indonesia. Der stiger kaldt vann opp. Over det kalde havet synker lufta, og det blir mindre regn i deler av Australia. Linjen viser hvor jetstrømmen kan gå over Sør-Australia. Illustrasjon: geofag.com etter skisse av Mats Amundsen. Kilde: BOM (u.å.)."
    />
  ),
    IodFigurNegativ: () => (
    <IodFaseFigur
      initialFase="negativ"
      heading="Figur 2. Negativ IOD"
      title="Kart med kjølig hav ved Øst-Afrika, varmt hav og regnskyer ved Indonesia og Australia"
      caption="I negativ fase er havet kjøligere enn normalt i vest og varmere i øst. Lufta stiger over det varme havet ved Indonesia og gir mer regn der og i Australia. Øst-Afrika får mindre regn. Illustrasjon: geofag.com etter skisse av Mats Amundsen. Kilde: BOM (u.å.)."
    />
  ),
    IodFigurHavtemperatur: () => (
    <IodHavtemperaturFigur
      heading="Figur 3. Havtemperaturen i Det indiske hav"
      caption="Havtemperaturen én dag i Det indiske hav. De svarte linjene viser grensen der det varme vannet møter det kalde havet lenger sør. Data: NOAA NCEI, OISST v2.1. Påtegning: Mats Amundsen."
    />
  ),
    IodFigurJetstrommer: () => (
    <IodJetstrommerFigur
      heading="Figur 4. Jetstrømmer over Det indiske hav"
      caption="Vind høyt oppe i atmosfæren. Ett belte går rundt 30° nord, og ett går sør for Afrika og Australia, over grensen i figur 3. Illustrasjon: geofag.com etter skisse av Mats Amundsen. Kilde: NOAA (u.å.)."
    />
  ),



    NaoForklaring: () => (
    <Callout title="Hva betyr «NAO»?">
      <p>
        NAO er den nordatlantiske oscillasjonen. Den beskriver styrken på lavtrykket nær Island og
        høytrykket nær Asorene. Stor trykkforskjell er positiv fase. Liten forskjell er negativ fase
        (NOAA, u.å.).
      </p>
    </Callout>
  ),
    QuizNao: () => <Quiz questions={QUIZ_NAO} heading={null} intro="Velg ett svar per spørsmål." />,
    NaoFigurFaser: () => (
    <NaoFaserFigur
      heading="Figur 1. Positiv og negativ NAO"
      caption="Ved positiv NAO er både Islandslavtrykket (L) og Asorhøytrykket (H) sterke, og stormbanen går lenger nord mot Nord-Europa. Ved negativ NAO er begge svakere, og stormbanen går lenger sør. Illustrasjon: geofag.com etter figur i Mats Amundsens notat. Kilde: NOAA (u.å.-a)."
    />
  ),
    NaoFigurOmrade: () => (
    <NaoOmradeFigur
      heading="Figur 2. Området der NAO virker"
      caption="Nord-Atlanteren mellom Nord-Amerika, Europa og Nord-Afrika. Islandslavtrykket ligger nær Island, Asorhøytrykket nær Asorene. Kart: geofag.com, kyster fra Natural Earth."
    />
  ),
    NaoFigurPolarvirvel: () => (
    <NaoPolarvirvelFigur
      heading="Figur 3. Stabil og forstyrret polarvirvel"
      caption="Stabil: en sterk polarvirvel holder den kalde lufta i Arktis, og polarjetstrømmen går lenger nord. Forstyrret: virvelen deles, kald luft går sørover, varm luft nordover, og jetstrømmen blir bølgete. Illustrasjon: geofag.com. Etter NOAA Climate.gov (2021)."
    />
  ),
    NaoFigurPositiv: () => (
    <NaoKartFigur
      initialFase="positiv"
      heading="Figur 4. Positiv NAO"
      title="Kart over Nord-Atlanteren med sterkt lavtrykk og høytrykk og en jetstrøm mot Nord-Europa"
      caption="Sterkt lavtrykk ved Island og sterkt høytrykk ved Asorene. Jetstrømmen går mot Nord-Europa, som ofte får mildere og våtere vær enn normalt. Sør-Europa blir ofte tørrere og kjøligere enn normalt. Illustrasjon: geofag.com. Kilde: NOAA (u.å.-a)."
    />
  ),
    NaoFigurNegativ: () => (
    <NaoKartFigur
      initialFase="negativ"
      heading="Figur 5. Negativ NAO"
      title="Kart over Nord-Atlanteren med svake trykksystemer og en bølgete jetstrøm lenger sør"
      caption="Svakt lavtrykk og svakt høytrykk. Jetstrømmen er bølgete og ligger lenger sør. Nord-Europa får ofte kaldere og tørrere vintre enn normalt, og Sør-Europa mildere og våtere. Illustrasjon: geofag.com. Kilde: NOAA (u.å.-a)."
    />
  ),



    AmocTipping: () => <AmocTippingModel />,
    AmocForklaring: () => (
    <Callout title="Hva betyr «den atlantiske omveltningen»?">
      <p>
        Den atlantiske omveltningen, AMOC, er starten på det trege beltet. Kaldt og salt vann synker
        i Nord-Atlanteren og går sørover i dypet. En runde tar omtrent tusen år (NOAA, u.å.-a).
      </p>
    </Callout>
  ),
    QuizAmoc: () => <Quiz questions={QUIZ_AMOC} heading={null} intro="Velg ett svar per spørsmål." />,


    KryoForklaring: () => (
    <Callout title="Hva betyr «kryosfæren»?">
      <p>
        Kryosfæren er den frosne delen av jordoverflaten: breer, havis, snødekke og permafrost.
        Permafrost er bakke som i to sammenhengende år ikke blir varmere enn 0 °C (Store norske
        leksikon, u.å.-b).
      </p>
    </Callout>
  ),
    QuizKryo: () => <Quiz questions={QUIZ_KRYO} heading={null} intro="Velg ett svar per spørsmål." />,


    ModellForklaring: () => (
    <Callout title="Hva betyr «numerisk modell»?">
      <p>
        En numerisk modell regner ut grunnlikningene for lufta eller havet med tall, steg for steg
        i tid, i et rutenett. Værmodellen MEPS har ruter på 2,5 km, havmodellen Norkyst ca. 800
        meter, og klimamodellen NorESM2 ca. 1–2 grader (MET, u.å.-a; Christensen mfl., 2026;
        NorESM-konsortiet, u.å.).
      </p>
    </Callout>
  ),
    ModellAssimilering: () => <AssimilationDiagram />,
    ModellEnsemble: () => <EnsembleRibbonDiagram />,
    QuizModeller: () => (
    <Quiz questions={QUIZ_MODELLER} heading={null} intro="Velg ett svar per spørsmål." />
  ),


    PaleoForklaring: () => (
    <Callout title="Hva betyr «paleoklima»?">
      <p>
        Paleoklima er klimaet før de direkte målingene. På Mauna Loa startet måleserien for CO₂ i
        mars 1958. Globalt årsmiddel i 2025 var 425,6 ppm. Iskjernene viser at CO₂ de siste 800 000
        årene lå mellom 172 og 300 ppm (NOAA GML, 2026; Lüthi mfl., 2008).
      </p>
    </Callout>
  ),
    QuizPaleo: () => (
    <Quiz questions={QUIZ_PALEO} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  KvartarTimeSeriesPaleo: () => (
    <KvartarTimeSeriesDiagram caption="Iskjernen EPICA Dome C i Antarktis viser temperatur og CO₂ for de siste 800 000 årene, med åtte istidssykluser. Syklusene har form som en sag, med langsom nedkjøling og rask avsmelting. CO₂ lå hele tiden mellom 172 og 300 ppm. I 2025 var det globale snittet 425,6 ppm (Lüthi mfl., 2008; Mukhin mfl., 2019; NOAA GML, 2026)." />
  ),
  IskjerneFoto: () => (
    <PhotoFigure
      src="/images/fig-iskjerne.jpg"
      alt="Sylinder av blå is med tynne årlige lag og innestengte luftbobler"
      heading="Iskjernen: luftboblene er prøver av fortidens luft"
      caption="En borekjerne fra en innlandsis. Iskjernen gir to slags data. Isotopene i selve isen er en proxy for temperaturen. Luftboblene er prøver av lufta slik den var da de ble stengt inne (Davies, 2020)."
      marks={[
        { x: 10, y: 18, n: "1", text: "Årlige snølag", tone: "cold" },
        { x: 58, y: 46, n: "2", text: "Innestengte luftbobler", tone: "teal" },
        { x: 82, y: 72, n: "3", text: "Gassalder (Δage)", tone: "warm" },
        { x: 25, y: 82, n: "4", text: "Askelag (tefra)", tone: "low" },
      ]}
      points={[
        { n: "1", label: "Årlige lag: Forskjellene mellom årstidene gir lag i snøen. Lenger ned dateres isen også med kjemi, askelag og elektrisk ledningsevne. På Grønland er lagene talt sammenhengende for de siste 60 000 årene (Davies, 2020; Svensson mfl., 2008)." },
        { n: "2", label: "Luftbobler: prøver av fortidens luft. CO₂, metan og lystgass måles direkte i boblene (Davies, 2020)." },
        { n: "3", label: "Gassalder (Δage): Lufta stenges inne først i bunnen av firnen, som regel 50–100 m ned. Derfor er lufta yngre enn isen rundt. Forskjellen beregnes med modeller (Davies, 2020)." },
        { n: "4", label: "Askelag (tefra): Et askelag er avsatt samtidig over et stort område og er en tidshorisont. Vedde-asken finnes i iskjerner fra Grønland, i innsjøer i Europa og på havbunnen i Nord-Atlanteren (Mangerud, 2025c)." },
      ]}
    />
  ),
  IceCoreAnatomy: () => <IceCoreAnatomyDiagram />,
  OxygenIsotope: () => <OxygenIsotopeDiagram />,
  PaleoClimateIsotope: () => <PaleoClimateIsotopeModel />,
  AbruptClimateChange: () => <AbruptClimateChangeDiagram />,
  DeglaciationFeedback: () => <DeglaciationFeedbackDiagram />,


    IstidForklaring: () => (
    <Callout title="Hva betyr «istid»?">
      <p>
        Istid er klimaperioder der opptil 3000 meter tykke iskapper dekket store deler av
        kontinentene og grunne havområder. Mellom dem ligger mellomistider (Mangerud, 2026).
      </p>
    </Callout>
  ),
    QuizIstider: () => (
    <Quiz questions={QUIZ_ISTIDER} heading={null} intro="Velg ett svar per spørsmål." />
  ),


    OrkanForklaring: () => (
    <Callout title="Hva betyr «orkan»?">
      <p>
        Orkan er den sterkeste av alle vinder: sterkere enn 32,6 m/s, målt ti meter over bakken i ti
        minutter. Ordet brukes også om lavtrykket som gir vinden. En tropisk orkan er en tropisk
        syklon, ikke den samme grensen (Store norske leksikon, u.å.-a; National Hurricane Center,
        u.å.-a).
      </p>
    </Callout>
  ),
    QuizFarer: () => (
    <Quiz questions={QUIZ_FARER} heading={null} intro="Velg ett svar per spørsmål." />
  ),


    TilpasningForklaring: () => (
    <Callout title="Hva betyr «klimatilpasning»?">
      <p>
        Klimatilpasning er å innrette seg etter det klimaet vi har og det klimaet vi venter, slik at
        skadene blir mindre, eller slik at vi kan utnytte nye muligheter (IPCC, 2022). Å redusere
        utslippene er et annet svar på klimaendringene.
      </p>
    </Callout>
  ),
    QuizTilpasning: () => (
    <Quiz questions={QUIZ_TILPASNING} heading={null} intro="Velg ett svar per spørsmål." />
  ),


    VindkraftForklaring: () => (
    <Callout title="Hva betyr «vindkraft»?">
      <p>
        Vindkraft er vindenergi gjort om til nyttig energi, mekanisk eller elektrisk. I dag brukes
        ordet mest om elektrisitet fra et vindkraftverk (Store norske leksikon, u.å.-a).
      </p>
    </Callout>
  ),
    EnergySources: () => <EnergySourcesDiagram />,
  WindPowerModel: () => <WindPowerModel />,
  OffshoreWindShelf: () => <OffshoreWindShelfDiagram />,
  MarineEnergyModel: () => <MarineEnergyModel />,
  OtecRankineCycle: () => <OtecRankineCycleDiagram />,
  WindPowerTradeoff: () => <WindPowerTradeoffDiagram />,
    QuizEnergi: () => (
    <Quiz questions={QUIZ_ENERGI} heading={null} intro="Velg ett svar per spørsmål." />
  ),


    FeltHavForklaring: () => (
    <Callout title="Hva betyr «feltarbeid» her?">
      <p>
        Feltarbeid i geofag 2 er å planlegge, samle inn georefererte data fra hav, luft eller is,
        bearbeide, tolke og presentere dem. Helse, miljø og sikkerhet hører med (Udir, u.å.-a;
        u.å.-b).
      </p>
    </Callout>
  ),
    QuizFeltHav: () => (
    <Quiz questions={QUIZ_FELT_HAV} heading={null} intro="Velg ett svar per spørsmål." />
  ),

  // G2 (F2): figurer flyttet fra de kodede /tema-rutene.
  FoehnAdiabatic: () => <FoehnAdiabaticDiagram />,
  FoehnModel: () => <FoehnModel />,
  SeaBreezeModel: () => <SeaBreezeModel />,
  TemperatureInversion: () => <TemperatureInversionDiagram />,
  KatabaticWind: () => <KatabaticWindDiagram />,
  JetProfile: () => <JetProfileDiagram />,
  ThermalWind: () => <ThermalWindDiagram />,
  JetStreak: () => <JetStreakDiagram />,
  JetForms: () => <JetFormsDiagram />,
  JetSeason: () => <JetSeasonDiagram />,
  JetBlocking: () => <JetBlockingDiagram />,
  Nao: () => <NaoDiagram />,
  CoriolisLatitude: () => <CoriolisLatitudeDiagram />,
  ZonalCentrifugal: () => <ZonalCentrifugalDiagram />,
  PressureSpin: () => <PressureSpinDiagram />,
  GeostrophicAdjustment: () => <GeostrophicAdjustmentDiagram />,
  EkmanSpiral: () => <EkmanSpiralDiagram />,
  RossbyScale: () => <RossbyScaleDiagram />,
  CoriolisModel: () => <CoriolisModel />,
  OceanCurrentModel: () => <OceanCurrentModel />,
  Ekman: () => <EkmanDiagram />,
  EkmanUpwellingModel: () => <EkmanUpwellingModel />,
  ClimateContrast: () => <ClimateContrastDiagram />,
  Amoc: () => <AmocDiagram />,
  GlacierMassBalance: () => <GlacierMassBalanceDiagram />,
  GlacierMassBalanceModel: () => <GlacierMassBalanceModel />,
  Permafrost: () => <PermafrostDiagram />,
  SeaIceAlbedoFeedback: () => <SeaIceAlbedoFeedbackDiagram />,
  SlabAvalanche: () => <SlabAvalancheDiagram />,
  PrimitiveEquations: () => <PrimitiveEquationsDiagram />,
  ModelGrid3D: () => <ModelGrid3DDiagram />,
  SubgridParametrization: () => <SubgridParametrizationDiagram />,
  LorenzChaosEnsemble: () => <LorenzChaosEnsembleDiagram />,
  DataAssimilationCycle: () => <DataAssimilationCycleDiagram />,
  ModelHierarchyNorway: () => <ModelHierarchyNorwayDiagram />,
  HurricaneCrossSection: () => <HurricaneCrossSectionDiagram />,
  HurricaneSpinModel: () => <HurricaneSpinModel />,
  SupercellAnatomy: () => <SupercellAnatomyDiagram />,
  TornadoGenesis: () => <TornadoGenesisDiagram />,
  StormSurge: () => <StormSurgeDiagram />,
  MeteorologicalBomb: () => <MeteorologicalBombDiagram />,
  AtmosphericRiver: () => <AtmosphericRiverDiagram />,
  PolarLowFormation: () => <PolarLowFormationDiagram />,
  ClimateRiskShift: () => <ClimateRiskShiftDiagram />,
  FieldworkInquiryChain: () => <FieldworkInquiryChainDiagram />,
  MeteorologicalStation: () => <MeteorologicalStationDiagram />,
  RadiosondeAscent: () => <RadiosondeAscentDiagram />,
  CtdProfileModel: () => <CtdProfileModel />,
  SnowProfileModel: () => <SnowProfileModel />,
  FieldworkObservationModel: () => <FieldworkObservationModel />,
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
  JordasBolger: () => <JordasBolgerDiagram />,
  Seismogram: () => <SeismogramDiagram />,
  BoundaryQuakes: () => <BoundaryQuakesDiagram />,
  NorwayEarthquakes: () => <NorwayEarthquakesDiagram />,
  HyposenterForklaring: () => (
    <Callout title="Hva betyr «hyposenter»?">
      <p>
        <em>Hyposenteret</em> er stedet i dypet der bruddet starter (hypo betyr «under» på gresk).
        Det kalles også <em>fokus</em>. <em>Episenteret</em> er punktet på overflaten rett over (epi
        betyr «over»). Fra hyposenteret sprer energien seg som <em>seismiske bølger</em> (seismos =
        rystelse på gresk), og det er de som rister bakken.
      </p>
    </Callout>
  ),
  IntraplateForklaring: () => (
    <Callout title="Hva betyr «intraplate»?">
      <p>
        <em>Intraplate</em> betyr inne på en plate (intra = inne i), altså ikke ved en aktiv
        plategrense. Norge ligger inne på Den eurasiske platen, så skjelvene her kaller vi{" "}
        <em>intraplate-jordskjelv</em>. De skjer langs gamle forkastninger som glir på nytt når
        spenningen blir stor nok.
      </p>
    </Callout>
  ),
  QuizJordskjelv: () => (
    <Quiz questions={QUIZ_JORDSKJELV} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  SjekkJordskjelv1: () => <Quiz questions={QUIZ_SJEKK_JORDSKJELV_1} intro="Velg ett svar per spørsmål." />,
  SjekkJordskjelv2: () => <Quiz questions={QUIZ_SJEKK_JORDSKJELV_2} intro="Velg ett svar per spørsmål." />,
  SjekkJordskjelv3: () => <Quiz questions={QUIZ_SJEKK_JORDSKJELV_3} intro="Velg ett svar per spørsmål." />,
  SjekkJordskjelv4: () => <Quiz questions={QUIZ_SJEKK_JORDSKJELV_4} intro="Velg ett svar per spørsmål." />,
  SjekkJordskjelv5: () => <Quiz questions={QUIZ_SJEKK_JORDSKJELV_5} intro="Velg ett svar per spørsmål." />,
  SjekkJordskjelv6: () => <Quiz questions={QUIZ_SJEKK_JORDSKJELV_6} intro="Velg ett svar per spørsmål." />,
  SjekkSkjelvfare1: () => <Quiz questions={QUIZ_SJEKK_SKJELVFARE_1} intro="Velg ett svar per spørsmål." />,
  SjekkSkjelvfare2: () => <Quiz questions={QUIZ_SJEKK_SKJELVFARE_2} intro="Velg ett svar per spørsmål." />,
  SjekkSkjelvfare3: () => <Quiz questions={QUIZ_SJEKK_SKJELVFARE_3} intro="Velg ett svar per spørsmål." />,
  QuizSkjelvfare: () => (
    <Quiz questions={QUIZ_SKJELVFARE} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  SilicateStructure: () => <SilicateStructureDiagram />,
  RockCycle: () => (
    <>
      <BergartssyklusSnittFigur />
      <FolgBergartFigur />
    </>
  ),
  Silikatgrupper: () => <SilikatgrupperFigur />,
  AvkjolingKorn: () => <AvkjolingKornFigur />,
  Metamorfose: () => <MetamorfoseFigur />,
  KontaktRegional: () => <KontaktRegionalV2Figur />,
  Differensiering: () => <DifferensieringV2Figur />,
  DiagenesePore: () => <DiageneseFigur />,
  IonBytte: () => <IonBytteV2Figur />,
  Steinlab: () => <SteinlabFigur />,
  OsloriftBergarter: () => (
    <OslograbenFigur
      heading="Osloriften: rombeporfyr og larvikitt fra samme smeltefamilie"
      caption="Samme smeltefamilie, to steder: dypet og overflaten. Rombeporfyr størknet på overflaten og har store rombeformede feltspatkrystaller i en finkornet grunnmasse. Larvikitt størknet ferdig under overflaten og er grovkornet. Forenklet: snittet er skjematisk uten målestokk, og vulkanismen og magmakamrene vises i ett steg. Samme figur som i Norges geologiske historie."
      statusTexts={OSLO_STATUS_BERGARTER}
    />
  ),
  BowenReactionSeries: () => <BowenReactionSeriesDiagram />,
  MetamorphicFacies: () => <MetamorphicFaciesDiagram />,
  // Geologisk tid: snittet bygges opp steg for steg.
  RelativeDating: () => <GeotidRelativFigur />,
  GeotidTidslinje: () => <GeotidTidslinjeFigur />,
  Halveringstid: () => <HalveringstidFigur />,
  Ledefossiler: () => <LedefossilFigur />,
  Vinkeldiskordans: () => <VinkeldiskordansFigur />,
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
  Kretslop: () => <KretslopFigur />,
  Hydrograph: () => <HydrogramFigur />,
  AkviferSnitt: () => <AkviferFigur />,
  HansNedbor: () => <HansNedborFigur />,
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
  KvikkleireSteg: () => <KvikkleireBakoverFigur />,
  QuizSkred: () => (
    <Quiz questions={QUIZ_SKRED} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  SpheresDiagram: () => <SpheresDiagram />,
  CarbonCycleDiagram: () => <KarbonatSilikatFigur />,
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
  GrainSizeDistribution: () => <GrainSizeDistributionDiagram />,
  Forvitringsformer: () => <Forvitringsformer />,
  HjulstromInteraktiv: () => <HjulstromInteraktiv />,
  ElvaFraKildeTilMunning: () => <ElvaFraKildeTilMunning />,
  MeanderOgKroksjo: () => <MeanderOgKroksjo />,
  GilbertDelta: () => <GilbertDelta />,
  LandskapBlokk: () => <LandskapBlokk />,
  FrostsprekkFoto: () => (
    <PhotoFigure
      src="/images/fig-forvitring.jpg"
      alt="Nærbilde av iskrystaller som har vokst i en sprekk i båndet gneis"
      heading="Mekanisk forvitring: is i en sprekk"
      caption="Is i en sprekk i berget. Isen vokser og presser sprekken videre. Etter mange fryse–tine-sykluser løsner kantete blokker som raser ned og danner ur ved foten av fjellsiden."
      marks={[
        { x: 39, y: 84, n: "1", text: "Sprekk", tone: "warm", align: "right" },
        { x: 56, y: 20, n: "2", text: "Is i sprekken", tone: "cold" },
      ]}
      points={[
        { n: "1", label: "Sprekker og lagflater i berget slipper inn vann." },
        { n: "2", label: "Isen vokser i sprekken og presser den videre." },
      ]}
    />
  ),
  RavineFoto: () => (
    <PhotoFigure
      src="/images/fig-ravine.jpg"
      alt="Ravinedal og elveløp erodert ned i finkornede sedimenter og leirmasser"
      heading="Raviner i marin leire"
      caption="En ravine er en bratt, V-formet kløft som en bekk har gravd ut i leire eller silt. Etter istiden ble store leirflater på Østlandet og i Trøndelag hevet over havet, og bekker har skåret ut forgreinede ravinelandskap, for eksempel på Romerike. Erosjon i bunnen av ravinene kan gjøre skråningene ustabile."
      marks={[
        { x: 30, y: 35, n: "1", text: "Ravinedal", tone: "warm" },
        { x: 75, y: 65, n: "2", text: "Leireskråning", tone: "teal" },
      ]}
      points={[
        { n: "1", label: "Bekken skjærer seg ned i løs marin leire." },
        { n: "2", label: "Bratte skråninger kan gli ut når bekken graver i foten." },
      ]}
    />
  ),
  FjordskredFoto: () => (
    <PhotoFigure
      src="/images/fig-fjellskred-fjord.jpg"
      alt="Vestnorsk fjord med bratt fjellside, skredarr og ur ned mot fjorden"
      heading="Unge landformer: fjord og bratte fjellsider"
      caption="Fjorden og de bratte fjellsidene ble formet av isen. Etter at isen forsvant, har frostforvitring og skred fortsatt å bryte ned fjellsidene."
      marks={[
        { x: 47, y: 23, n: "1", text: "Skredarr", tone: "warm" },
        { x: 8, y: 42, n: "2", text: "Bratt dalside", tone: "teal" },
        { x: 40, y: 62, n: "3", text: "Ur og skredmasser", tone: "warm" },
        { x: 45, y: 90, n: "4", text: "Fjord", tone: "cold" },
      ]}
      points={[
        { n: "1", label: "Lys, bar bergflate der fjell har løsnet." },
        { n: "2", label: "Bratt fjellside skuret ut av isbreer." },
        { n: "3", label: "Stein og blokker har hopet seg opp ved foten." },
        { n: "4", label: "Fjorden er gravd ut under dagens havnivå." },
      ]}
    />
  ),
  SkredTyper: () => <SkredTyperFigur />,
  SkredKrefter: () => <SkredKrefterFigur />,
  SkredSoner: () => <SkredSonerDiagram />,
  FjellskredBolge: () => <FjellskredBolgeDiagram />,
  FieldworkIllustration: () => <FeltmetodeFigur />,
  Feltbok: () => <FeltbokDiagram />,
  FraBergartTilBrudd: () => <FraBergartTilBruddDiagram />,
  PetroleumSystem: () => <PetroleumSnittFigur />,
  Ressurskart: () => <RessurskartFigur />,
  OfiolittSnitt: () => <OfiolittSnittDiagram />,
  Kaledonidene: () => <KaledonideneFigur />,
  Norskehavet: () => <NorskehavetFigur />,
  NorgesGeodynamikkKart: () => <NorgesGeodynamikkKart />,
  IsostasiSnittNorgesGeologi: () => (
    <IsostasiSnitt
      heading="Glasial isostasi og marin grense"
      caption="Under siste istid presset en opptil ca. 3 km tykk innlandsis landet ned. Astenosfæren under er fast, men gir etter plastisk over tusenvis av år. Da isen smeltet, flommet havet inn over det nedtrykte landet og avsatte marin leire. Havet sto opptil ca. 220 m høyere enn i dag i Oslo-området (marin grense). Snittet er skjematisk, og nedpressingen er sterkt overdrevet."
    />
  ),
  QuizGeologiskTid: () => (
    <Quiz questions={QUIZ_GEOLOGISK_TID} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  QuizNorgesGeologi: () => (
    <Quiz questions={QUIZ_NORGES_GEOLOGI} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  QuizLandformer: () => (
    <Quiz questions={QUIZ_LANDFORMER} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  BreLengdesnitt: () => <BreLengdesnittDiagram />,
  VdalTilUdal: () => <VdalTilUdalDiagram />,
  BotnEggTind: () => <BotnEggTindDiagram />,
  Avsetningsformer: () => <AvsetningsformerDiagram />,
  Frostsprengning: () => <FrostsprengningDiagram />,
  IsostasiForklaring: () => (
    <Callout title="Hva betyr «isostasi»?">
      <p>
        Isostasi (isostasy) betyr at den stive litosfæren ligger i likevekt på astenosfæren under.
        Astenosfæren er fast, men svakere og mer plastisk enn litosfæren og kan gi etter og flyte
        svært langsomt, over tusenvis av år. Det er omtrent som en båt som flyter. Legger du tung last i båten, synker den
        dypere. Tar du lasten ut, flyter den høyere igjen. Mer om litosfæren og astenosfæren står i
        kapitlet{" "}
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
        Feltarbeid er innsamling av data ute, der fenomenene finnes. Arbeidet har fire steg:
        planlegging, innsamling i felt, bearbeiding og tolkning, og presentasjon.
      </p>
    </Callout>
  ),
  QuizFeltarbeid: () => (
    <Quiz questions={QUIZ_FELTARBEID} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  KlimaForklaring: () => (
    <Callout title="Hva betyr «klimasystemet»?">
      <p>
        Klimasystemet er atmosfæren, hydrosfæren, kryosfæren, geosfæren og biosfæren, og samspillet
        mellom dem. Utveksling av energi, vann og karbondioksid bestemmer klimamønstre og variasjon
        (WMO, u.å.).
      </p>
    </Callout>
  ),
  KlimaKart: () => (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {[
        ...KLIMA_SUBTHEMES,
        ...KLIMA_MODELS,
        ...GF2_THEMES.filter((t) =>
          ["/tema/paleoklima", "/tema/milankovitch", "/tema/tilpasning"].includes(t.to),
        ).map((t) => ({ ...t, kicker: "Klima over tid og samfunn" })),
      ].map((sub) => (
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
  let runningHeading = "";
  return (
    <div className={cn("space-y-4", className)}>
      {parts.map((part, index) => {
        if (part.type === "widget") {
          return <PosterWidget key={`w-${part.id}-${index}`} id={part.id} />;
        }
        const captionFallback = runningHeading;
        const heading = lastMarkdownHeading(part.value);
        if (heading) runningHeading = heading;
        return (
          <Markdown
            key={`m-${index}`}
            scrollTables={scrollTables}
            wrapTables={wrapTables}
            captionFallback={captionFallback}
          >
            {part.value}
          </Markdown>
        );
      })}
    </div>
  );
}
