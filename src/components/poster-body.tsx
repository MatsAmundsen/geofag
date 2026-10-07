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
  HighPressureCrossSectionDiagram,
  LowPressureCrossSectionDiagram,
  RelativePressureDiagram,
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
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
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
  QUIZ_JORDSKJELV,
  QUIZ_JORDSYSTEMENE,
  QUIZ_MELTING,
  QUIZ_OFIOLITT_WILSON,
  QUIZ_TEST_DEG_SELV,
  QUIZ_VANN_OG_FLOM,
  QUIZ_VULKANER,
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
  EarthquakeWavePhysics: () => <EarthquakeWavePhysicsDiagram />,
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
