import { createFileRoute } from "@tanstack/react-router";
import { NAO_SEKSJONER } from "@/content/g2/nao";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/nao")({
  head: () =>
    topicHead({
      title: "NAO: Den nordatlantiske oscillasjon · Geofag 2",
      description:
        "Den nordatlantiske oscillasjon (NAO): trykkgradient Azorene–Island, geostrofisk vestavind, polarjet, Rossby-bølger, blokkerende høytrykk, SSW, telekoblinger og konsekvenser for norsk og europeisk vinterklima.",
      path: "/tema/klima/nao",
    }),
  component: NaoPage,
});

function NaoPage() {
  return (
    <TopicLayout
      kicker="Klimasystemet · Nord-Atlanteren"
      title="NAO: Den nordatlantiske oscillasjon"
      lead="Den nordatlantiske oscillasjon (NAO) er atmosfærens store trykkvippe over Nord-Atlanteren. Svingningen i trykkgradienten mellom Azorhøytrykket og Islandslavtrykket styrer polarjetens posisjon, stormbanenes retning og om den norske vinteren blir mild og fuktig — eller preget av arktisk sprengkulde og blokkerende høytrykk."
      banner="/images/fig-nao.jpg"
      bannerAlt="Atmosfærisk sirkulasjon og stormbaner over Nord-Atlanteren inn mot Norskehavet og Norge"
      prev={{ to: "/tema/klima/iod", label: "Forrige: IOD" }}
      next={{ to: "/tema/klima/amoc", label: "Neste: AMOC" }}
      kilder={KILDER.nao}
    >
      {NAO_SEKSJONER.map((Seksjon, i) => (
        <Seksjon key={i} />
      ))}
    </TopicLayout>
  );
}
