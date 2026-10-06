import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("platetektonikk")!;

export const Route = createFileRoute("/geofag-1/platetektonikk")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description:
        "Platetektonikk: Jordens dynamiske skall, drivkrefter (slab pull og ridge push), dekompresjons- og flukssmelting, de tre plategrensene og Wilsonsyklusen.",
      path: "/geofag-1/platetektonikk",
    }),
  component: PlatetektonikkPage,
});

function PlatetektonikkPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Jordskorpen er i stadig bevegelse. Kontinenter kolliderer, havbassenger åpner og lukker seg, og ny havbunn dannes fra jordas indre. Platetektonikk er geovitenskapens samlende teori. Den forklarer hvordan fjellkjeder bygges, hvorfor jordskjelv oppstår, og hvordan magma dannes."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/jordsystemene",
        label: "Forrige: Jordsystemene",
      }}
      next={{
        to: "/geofag-1/vulkaner",
        label: "Neste: Vulkaner",
      }}
      kilder={KILDER.platetektonikk}
      posterSlug="platetektonikk"
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
