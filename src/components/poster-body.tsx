import type { JSX } from "react";
import {
  BoundaryOverviewDiagram,
  BoundaryQuakesDiagram,
  CalderaFormationDiagram,
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
import { Callout } from "@/components/callout";
import { KvikkleireDiagram } from "@/components/diagrams/skred";
import { GeoMap } from "@/components/geo-map";
import { Markdown } from "@/components/markdown";
import { PlateTectonicsModel } from "@/components/models/plate-tectonics-model";
import { RockPetrologyModel } from "@/components/models/rock-petrology-model";
import { VolcanoModel } from "@/components/models/volcano-model";
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
  QUIZ_SKRED,
  QUIZ_HOYTRYKK,
  QUIZ_JORDSKJELV,
  QUIZ_MELTING,
  QUIZ_OFIOLITT_WILSON,
  QUIZ_TEST_DEG_SELV,
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
  CalderaFormation: () => <CalderaFormationDiagram />,
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
  QuizJordskjelv: () => <Quiz questions={QUIZ_JORDSKJELV} />,
  SilicateStructure: () => <SilicateStructureDiagram />,
  RockCycle: () => <RockCycleDiagram />,
  BowenReactionSeries: () => <BowenReactionSeriesDiagram />,
  MetamorphicFacies: () => <MetamorphicFaciesDiagram />,
  RelativeDating: () => <RelativeDatingDiagram />,
  RockPetrologyModel: () => <RockPetrologyModel />,
  QuizBergarter: () => <Quiz questions={QUIZ_BERGARTER} />,
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
