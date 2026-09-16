import { createFileRoute } from "@tanstack/react-router";
import { VAERKART_SEKSJONER } from "@/content/g2/vaerkart";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/vaerkart")({
  head: () =>
    topicHead({
      title: "Værkart og værutvikling · Geofag 2",
      description:
        "Tolke synoptiske værkart, WMO-stasjonsmodeller, fronter, 500 hPa styrestrøm og 24-timers værutvikling.",
      path: "/tema/vaerkart",
    }),
  component: VaerkartPage,
});

function VaerkartPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Værsystemer"
      title="Værkart og værutvikling"
      lead="Et værkart er ikke bare en meteorologisk rapport; det er et øyeblikksbilde av atmosfærens termodynamiske og mekaniske tilstand. Ved å kombinere bakketrykk, frontsystemer, WMO-stasjonsplott og 500 hPa styrestrømmer kan vi avkode luftmassenes dynamikk og forutsi værutviklingen de neste 12 til 24 timene med stor presisjon."
      banner="/images/banner-trykk.jpg"
      bannerAlt="Synoptisk værkart over Nord-Atlanteren og Skandinavia med isobarer, lavtrykkssentre og fronter"
      prev={{ to: "/tema/vindsystemet", label: "Forrige: Vindsystemet" }}
      next={{ to: "/tema/jetstrommer", label: "Neste: Jetstrømmer" }}
      kilder={KILDER_G2.vaerkart}
    >
      {VAERKART_SEKSJONER.map((Seksjon, i) => (
        <Seksjon key={i} />
      ))}
    </TopicLayout>
  );
}
