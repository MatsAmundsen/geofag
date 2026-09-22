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
import { GeoMap } from "@/components/geo-map";
import { Markdown } from "@/components/markdown";
import { PlateTectonicsModel } from "@/components/models/plate-tectonics-model";
import { RockPetrologyModel } from "@/components/models/rock-petrology-model";
import { VolcanoModel } from "@/components/models/volcano-model";
import { Quiz } from "@/components/quiz";
import { cn } from "@/lib/utils";
import { injectPosterWidgets, parsePosterMarkdown, stripChapterEditorNotice } from "@/lib/poster-markdown";
import {
  QUIZ_BERGARTER,
  QUIZ_BOUNDARIES,
  QUIZ_JORDSKJELV,
  QUIZ_MELTING,
  QUIZ_OFIOLITT_WILSON,
  QUIZ_TEST_DEG_SELV,
  QUIZ_VULKANER,
} from "@/lib/poster-quizzes";

const POSTER_WIDGETS: Record<string, () => JSX.Element> = {
  EarthLayers: () => <EarthLayersDiagram />,
  Spreading: () => <SpreadingDiagram />,
  Convection: () => <ConvectionDiagram />,
  PlatesMap: () => <PlatesMapDiagram />,
  Solidus: () => <SolidusDiagram />,
  DecompressionMelting: () => <DecompressionMeltingDiagram />,
  QuizMelting: () => <Quiz questions={QUIZ_MELTING} />,
  BoundaryOverview: () => <BoundaryOverviewDiagram />,
  ContinentalRift: () => <ContinentalRiftDiagram />,
  Subduction: () => <SubductionDiagram />,
  OceanOceanSubduction: () => <OceanOceanSubductionDiagram />,
  Collision: () => <CollisionDiagram />,
  Transform: () => <TransformDiagram />,
  QuizBoundaries: () => <Quiz questions={QUIZ_BOUNDARIES} />,
  PlateTectonicsModel: () => <PlateTectonicsModel />,
  HotspotPlume: () => <HotspotPlumeDiagram />,
  WilsonCycle: () => <WilsonCycleDiagram />,
  QuizOfiolittWilson: () => <Quiz questions={QUIZ_OFIOLITT_WILSON} />,
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
  QuizTestDegSelv: () => <Quiz questions={QUIZ_TEST_DEG_SELV} />,
  VolcanoTypes: () => <VolcanoTypesDiagram />,
  CalderaFormation: () => <CalderaFormationDiagram />,
  VolcanoEruptionAnatomy: () => <VolcanoEruptionAnatomyDiagram />,
  VolcanicHazards: () => <VolcanicHazardsDiagram />,
  VolcanoModel: () => <VolcanoModel />,
  QuizVulkaner: () => <Quiz questions={QUIZ_VULKANER} />,
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
};

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
}: {
  children: string;
  className?: string;
  cleanChapter?: boolean;
}) {
  const content = cleanChapter ? stripChapterEditorNotice(children) : children;
  const parts = parsePosterMarkdown(injectPosterWidgets(content));
  return (
    <div className={cn("space-y-4", className)}>
      {parts.map((part, index) =>
        part.type === "widget" ? (
          <PosterWidget key={`w-${part.id}-${index}`} id={part.id} />
        ) : (
          <Markdown key={`m-${index}`}>{part.value}</Markdown>
        ),
      )}
    </div>
  );
}
