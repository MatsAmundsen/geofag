import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { EnergySourcesDiagram, WindPowerTradeoffDiagram } from "@/components/diagrams";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_GAP_THEMES } from "@/lib/nav-g2-gaps";
import { topicHead } from "@/lib/seo";

const tema = GF2_GAP_THEMES.find((t) => t.to === "/tema/energi-hav-luft")!;

export const Route = createFileRoute("/tema/energi-hav-luft")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/energi-hav-luft",
    }),
  component: EnergiPage,
});

function EnergiPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Ressurser"
      title="Energi fra hav og atmosfære"
      lead="Vind, havvind, bølger og tidevann er fornybare fordi sola og månen fortsetter å drive dem. Bærekraft er likevel ikke gitt. Kompetansemålet ber om å drøfte utnyttelse nasjonalt og globalt."
      banner="/images/tema-strommer.jpg"
      bannerAlt="Nord-Atlanteren med fargekontrast som minner om en vestlig randstrøm"
      prev={{ to: "/tema/tilpasning", label: "Forrige: Konsekvenser og tilpasning" }}
      next={{ to: "/tema/felt-hav-luft-is", label: "Neste: Feltarbeid" }}
      kilder={KILDER_G2.energi}
    >
      <Callout title="Kompetansemål">
        <p>
          Drøfte hvordan energiressurser fra hav og atmosfære kan utnyttes på en bærekraftig måte,
          både nasjonalt og globalt.
        </p>
      </Callout>
      <h2 className="font-display text-2xl font-medium tracking-tight">Hvor energien kommer fra</h2>
      <p>
        Nesten all fornybar energi i atmosfæren og i bølgene er omdannet solenergi. Trykkforskjeller
        blir vind. Vind over hav blir bølger. Tidevann er unntaket: gravitasjon fra måne og sol.
      </p>
      <EnergySourcesDiagram />
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Vind på land</h2>
      <p>
        Effekt i en turbin vokser med kubikken av vindhastigheten. Plassering teller mer enn antall master.
      </p>
      <OrdBoks
        ord="Kapasitetsfaktor"
        barn="Faktisk årsproduksjon delt på det anlegget ville levert om det gikk for fullt hele tiden."
      />
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Havvind</h2>
      <p>
        Over hav er vinden jevnere. Norge har dyp sokkel: flytende matcher kysten. Konfliktene er
        fiskeri, skipstrafikk, sjøfugl, radar og kabler til land.
      </p>
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Bølger og tidevann</h2>
      <p>
        Bølgeenergi må tåle 100-årshavet. Tidevann er predikerbart, men få steder har både amplitude
        og akseptabelt inngrep i fjære.
      </p>
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Drøftingen</h2>
      <WindPowerTradeoffDiagram />
      <p>
        Sammenlign med{" "}
        <Link to="/tema/tilpasning" className="text-primary underline-offset-2 hover:underline">tilpasning</Link>
        : det ene kutter pådriv, det andre lever med været som kommer.
      </p>
      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Kapasitetsfaktor" def="Faktisk årsproduksjon delt på teoretisk maks." />
        <Term name="Havvind" def="Samme ressurs som landvind, jevnere over hav. Bunnfast eller flytende." />
        <Term name="Bølgeenergi" def="Vindenergi flyttet over i vannoverflaten. Høyt potensial, hardt miljø." />
        <Term name="Tidevann" def="Gravitasjonsdrevet, predikerbart. Få egnede steder." />
      </TermGrid>
      <Quiz
        questions={[
          {
            prompt: "Hvorfor er flytende havvind mer relevant for Norge enn for Danmark?",
            options: [
              "Fordi Norge ikke har vind.",
              "Fordi norsk sokkel er dypere. Bunnfast krever grunnere hav.",
              "Fordi Danmark har forbudt flytende turbiner.",
              "Fordi tidevannet er sterkere i Skagerrak.",
            ],
            answer: 1,
            explain: "Dyp er geografi. Teknologivalget følger bunnen.",
          },
          {
            prompt: "Hva skiller tidevann fra bølger som energikilde?",
            options: [
              "Ingenting.",
              "Tidevann er gravitasjon og predikerbart. Bølger er vær og variabelt.",
              "Bølger kommer fra månen.",
              "Tidevann krever solstormer.",
            ],
            answer: 1,
            explain: "Tidevann kan planlegges. Bølger må buffers som vind.",
          },
          {
            prompt: "En drøfting av bærekraftig havvind som bare nevner CO₂-kutt er for tynn fordi:",
            options: [
              "CO₂ ikke påvirker klima.",
              "Målet ber om bærekraft — areal, arter, fiske, forsyning og fordeling teller også.",
              "Havvind ikke kutter utslipp.",
              "Udir forbyr å nevne CO₂.",
            ],
            answer: 1,
            explain: "Drøfte = flere hensyn. Ett hensyn er et innlegg.",
          },
        ]}
      />
    </TopicLayout>
  );
}
