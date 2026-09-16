import { PhotoFigure } from "@/components/photo-figure";
import {
  VolcanoEruptionAnatomyDiagram,
} from "@/components/diagrams";

export function AnatomiAvEtPlinianskUtbruddFra() {
  return (
    <>
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Anatomi av et pliniansk utbrudd: Fra fragmentering til paraplysky
        </h2>
        <p>
          Begrepet <em>pliniansk utbrudd</em> er oppkalt etter den romerske forfatteren Plinius den yngre, som i to berømte
          brev til historikeren Tacitus beskrev Vesuvs ødeleggelse av Pompeii og Herculaneum i år 79 e.Kr. Plinius sammenlignet
          askesøylen med en pinje (italiensk furu): en loddrett, tynn stamme som forgrener seg høyt oppe på himmelen.
        </p>

        <VolcanoEruptionAnatomyDiagram />

        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          De fire fasene i en pliniansk utbruddssøyle
        </h3>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Fragmenteringsnivået (z_f):</strong> Dypt i tilførselsrøret (ofte 1–4 km under overflaten)
            overskrider gassblærenes ekspansjonstrykk smeltenes elastiske strekkfasthet. Den sammenhengende væsken rives
            i stykker og forvandles i en brøkdel av et sekund til en turbulent gass-partikkel-suspensjon bestående av gass,
            pimpstein og glassaktig mikroaske (Sparks, 1978).
          </li>
          <li>
            <strong className="text-foreground">Gass-skyvesonen (gas-thrust region):</strong> I de laveste hundre meterne over
            krateret drives blandingen utelukkende av det enorme overtrykket i tilførselsrøret. Aske og blokker slynges ut
            i overlydshastighet (opptil 200–600 m/s).
          </li>
          <li>
            <strong className="text-foreground">Konvektiv oppdriftssone (convective thrust):</strong> Når utbruddsstrålen suger
            inn kald omgivelsesluft, varmes luften brått opp til flere hundre grader. Luften ekspanderer, tettheten til blandingen
            blir lavere enn den omkringliggende atmosfæren, og søylen stiger oppover som en gigantisk termisk varmluftsballong.
            Konveksjonen kan løfte asken opp i en høyde på 20 til 45 kilometer — tvers gjennom troposfæren og dypt inn i stratosfæren!
          </li>
          <li>
            <strong className="text-foreground">Paraplyskyen (umbrella cloud):</strong> Når søylen når en høyde der dens tetthet
            tilsvarer atmosfærens egen tetthet (nøytralt oppdriftsnivå), stanser den vertikale stigningen. Askeskyen brer seg
            ut horisontalt i form av en gigantisk paraply og transporteres over kontinentale avstander av stratosfæriske vinder.
          </li>
        </ol>

        <PhotoFigure
          src="/images/geo-pliniansk-anatomi.jpg"
          alt="3D-tverrsnitt av pliniansk erupsjon med fragmenteringsnivå, konvektiv søyle, paraplysky, PDC og lahar"
          heading="Pliniansk utbruddsdynamikk: Den eksplosive gass- og askemotoren"
          caption="Når seig, gassmettet magma stiger mot overflaten, når den fragmenteringsnivået (zf) der overtrykket i vesiklene river smelten i stykker. Blandingen skytes ut som en overlydsstråle, suger inn luft og stiger konvektivt som en 15–35 km høy søyle som brer seg ut som en paraplysky i stratosfæren. Dersom tettheten blir for høy, kollapser søylen og sender dødelige pyroklastiske tetthetsstrømmer (PDC) nedover sidene, mens smeltevann utløser laharer."
          marks={[
            { x: 50, y: 15, n: "1", text: "Paraplysky (stratosfæren)", tone: "cold" },
            { x: 50, y: 42, n: "2", text: "Konvektiv askesøyle", tone: "warm" },
            { x: 28, y: 72, n: "3", text: "Pyroklastisk strøm (PDC)", tone: "warm" },
            { x: 74, y: 76, n: "4", text: "Lahar (slamstrøm)", tone: "cold" },
            { x: 50, y: 92, n: "5", text: "Magmakammer & zf", tone: "warm" },
          ]}
          points={[
            { n: "1", label: "Paraplysky: Asken sprer seg sideveis ved det nøytrale oppdriftsnivået i stratosfæren og føres jorden rundt med jetstrømmene." },
            { n: "2", label: "Konvektiv søyle: Oppvarmet luft gjør gass-aske-blandingen lettere enn atmosfæren, og løfter den titalls kilometer opp." },
            { n: "3", label: "PDC (Pyroklastisk tetthetsstrøm): Delvis kollaps av søylen genererer en glohet askelavine i 200–700 km/t." },
            { n: "4", label: "Lahar: Vulkansk slamstrøm utløst ved smelting av snø og is eller regnvær; flyter som våt betong i dalbunnene." },
            { n: "5", label: "Fragmenteringsnivå: Overgang fra sammenhengende magma til opprevet gass-partikkel-suspensjon." },
          ]}
        />
      </section>
    </>
  );
}
