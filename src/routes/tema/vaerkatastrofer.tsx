import { createFileRoute } from "@tanstack/react-router";
import { KATASTROFER_SEKSJONER } from "@/content/g2/vaerkatastrofer";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/vaerkatastrofer")({
  head: () =>
    topicHead({
      title: "Værkatastrofer · Geofag 2",
      description:
        "Tropiske orkaner, tornadoer, eksplosive lavtrykk, polare lavtrykk, atmosfæriske elver og stormflo.",
      path: "/tema/vaerkatastrofer",
    }),
  component: KatastroferPage,
});

function KatastroferPage() {
  return (
    <TopicLayout
      kicker="Naturfarer og ekstreme værsystemer"
      title="Værkatastrofer"
      lead="Når atmosfærens krefter konsentreres i rom og tid, forvandles velkjente fysiske prinsipper til destruktive naturkatastrofer."
      banner="/images/banner-katastrofer.jpg"
      bannerAlt="Atlantisk orkan sett fra verdensrommet, med tydelig øye og spiralformede regnbånd"
      prev={{ to: "/tema/milankovitch", label: "Forrige: Istider" }}
      next={{ to: "/tema/tilpasning", label: "Neste: Konsekvenser og tilpasning" }}
      kilder={KILDER.vaerkatastrofer}
    >
      {KATASTROFER_SEKSJONER.map((Seksjon, i) => (
        <Seksjon key={i} />
      ))}
    </TopicLayout>
  );
}
