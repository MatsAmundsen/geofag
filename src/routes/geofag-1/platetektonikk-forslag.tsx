import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { seedBySlug } from "@/lib/post-seed";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("platetektonikk")!;
const lenke = "text-primary underline-offset-2 hover:underline";

export const Route = createFileRoute("/geofag-1/platetektonikk-forslag")({
  staleTime: 0,
  preloadStaleTime: 0,
  gcTime: 0,
  shouldReload: true,
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: (await loadChapterPost("platetektonikk")) ?? seedBySlug("platetektonikk") };
  },
  head: () =>
    topicHead({
      title: `${tema.title} · layoutforslag · Geofag 1`,
      description:
        "Layoutforslag for platetektonikk: samme fagtekst, delt i seksjoner som kan åpnes og lukkes.",
      path: "/geofag-1/platetektonikk-forslag",
      robots: "noindex, nofollow",
    }),
  component: PlatetektonikkForslagPage,
});

function PlatetektonikkForslagPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker} · layoutforslag`}
      title={tema.title}
      lead="Under føttene våre er jordskorpen i konstant, nådeløs bevegelse. Kontinenter kolliderer, havbassenger åpner og lukker seg, og havet fornyes kontinuerlig fra jordas brennende indre. Platetektonikken er geovitenskapens samlende teori: Den forklarer hvorfor fjellkjeder reiser seg mot himmelen, hvorfor jordskjelv ryster kloden, og hvorfor magma veller fram fra dypet i et evig kretsløp."
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
      post={post}
      bodyMode="scan"
      previewBanner={
        <Callout title="Dette er en klon — originalen er uendret">
          <p>
            All fagtekst, figurer og quizer er de samme som på{" "}
            <Link to="/geofag-1/platetektonikk" className={lenke}>
              /geofag-1/platetektonikk
            </Link>
            . Forskjellen er layout: de horisontale knappene åpner og lukker fagteksten under.
            Trykk en gang for å vise, trykk en gang til for å skjule. Ingenting er slettet.
          </p>
          <p>
            Si ifra om dette er bra nok til å erstatte originalen på main. Inntil da ligger
            forslaget bare her, med <code>noindex</code>.
          </p>
        </Callout>
      }
    >
      <p>Kapittelteksten lastes fra platetektonikk-posten.</p>
    </TopicLayout>
  );
}
