import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { GeminiFigure } from "@/components/gemini-figure";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { GEMINI } from "@/lib/gemini-slots";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/nao")({
  head: () =>
    topicHead({
      title: "NAO: Den nordatlantiske oscillasjon · Geofag 2",
      description:
        "Den nordatlantiske oscillasjon (NAO): trykkforskjell mellom Azorene og Island, polarvirvel, Rossby-bølger, ENSO og konsekvenser for vinterværet i Europa og Norge.",
      path: "/tema/klima/nao",
    }),
  component: NaoPage,
});
