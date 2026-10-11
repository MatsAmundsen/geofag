import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

const LEAD =
  "AMOC frakter varme nordover i Atlanterhavet. Varmt og salt vann går nordover nær overflaten, blir avkjølt, synker og går sørover i dypet. Mer ferskvann fra Grønland kan svekke AMOC, og forskerne diskuterer om den har et vippepunkt.";

export const Route = createFileRoute("/tema/klima/amoc")({
  loader: async () => {
    const { loadChapterPost } = await import("@/lib/chapter-posts");
    return { post: await loadChapterPost("amoc") };
  },
  head: () =>
    topicHead({
      title: "AMOC: Den atlantiske omveltningssirkulasjonen · Geofag 2",
      description:
        "AMOC (Atlantic Meridional Overturning Circulation): Termohalin dypvannsdannelse, Golfstrømmen og AMOC, ferskvannspulser, Stommel-hysterese, vippepunkter og konsekvenser for klimaet i Norge.",
      path: "/tema/klima/amoc",
    }),
  component: AmocPage,
});

function AmocPage() {
  const { post } = Route.useLoaderData();
  return (
    <TopicLayout
      kicker="Geofag 2 · Klimasystemet"
      title="AMOC: Den atlantiske omveltningssirkulasjonen"
      lead={LEAD}
      banner="/images/fig-amoc.jpg"
      bannerAlt="Nord-Atlanteren med fargegradient som illustrerer varme overflatestrømmer og kalde dypstrømmer"
      prev={{ to: "/tema/klima/nao", label: "Forrige: NAO" }}
      next={{ to: "/tema/kryosfaeren", label: "Neste: Kryosfæren" }}
      kilder={KILDER.amoc}
      posterSlug="amoc"
      post={post}
      bodyMode="poster"
    >
      {null}
    </TopicLayout>
  );
}
