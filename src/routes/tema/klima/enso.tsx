import { createFileRoute } from "@tanstack/react-router";
import { ENSO_SEKSJONER } from "@/content/g2/enso";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/enso")({
  head: () =>
    topicHead({
      title: "ENSO: El Niño og La Niña · Geofag 2",
      description:
        "El Niño–Sørlige oscillasjon (ENSO): Walker-sirkulasjonen, passatvinder, termoklin, Kelvin-bølger, SOI/ONI-indekser, telekoblinger og ENSO i en varmere verden.",
      path: "/tema/klima/enso",
    }),
  component: EnsoPage,
});

function EnsoPage() {
  return (
    <TopicLayout
      kicker="Klimasystemet · Tropisk Stillehav"
      title="ENSO: El Niño og La Niña"
      lead="Ingen enkelt svingning påvirker jordas vær fra år til år mer enn ENSO. Når passatvindene slakker av over det tropiske Stillehavet, forskyves planetens største varmelager — med flom, tørke og globale temperaturhopp som resultat."
      banner="/images/fig-enso.jpg"
      bannerAlt="Det tropiske Stillehavet sett fra verdensrommet med konveksjonsskyer over varmt hav"
      prev={{ to: "/tema/klima/oversikt", label: "Forrige: Klimasystemet (oversikt)" }}
      next={{ to: "/tema/klima/iod", label: "Neste: IOD" }}
      kilder={KILDER.enso}
    >
      {ENSO_SEKSJONER.map((Seksjon, i) => (
        <Seksjon key={i} />
      ))}
    </TopicLayout>
  );
}
