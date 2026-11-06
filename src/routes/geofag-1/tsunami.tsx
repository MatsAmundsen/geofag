import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";
import { getPost } from "@/lib/posts";
import { legacyNaturfareRedirect } from "@/lib/tsunami-redirect";

const tema = gf1Theme("jordskjelv-naturfare")!;

export const Route = createFileRoute("/geofag-1/tsunami")({
  loader: async () => ({ post: await getPost({ data: "jordskjelv-naturfare" }) }),
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/tsunami",
    }),
  component: TsunamiPage,
});

function LegacyNaturfareHash() {
  useEffect(() => {
    const go = () => {
      const next = legacyNaturfareRedirect(window.location.hash, window.location.search);
      if (next) window.location.replace(next);
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, []);
  return null;
}

function TsunamiPage() {
  return (
    <>
      <LegacyNaturfareHash />
      <TopicLayout
        kicker={`Geofag 1 · ${tema.kicker}`}
        title={tema.title}
        lead="En tsunami er en serie bølger som settes i gang når et stort vannvolum flyttes brått. Ute på dypt hav er bølgen lav og rask. Inne ved kysten kan den oversvømme land. Her lærer du hvordan slike bølger blir til, hva som skjedde i Tafjord, Loen og Storegga, hvordan varsling virker, og hvordan risiko kan vurderes før en hendelse."
        banner={tema.image}
        bannerAlt={tema.alt}
        prev={{
          to: "/geofag-1/jordskjelv",
          label: "Forrige: Jordskjelv og jordas indre",
        }}
        next={{
          to: "/geofag-1/bergarter",
          label: "Neste: Bergarter og mineraler",
        }}
        kilder={KILDER["jordskjelv-naturfare"]}
        posterSlug="jordskjelv-naturfare"
        bodyMode="poster"
      >
        {null}
      </TopicLayout>
    </>
  );
}
