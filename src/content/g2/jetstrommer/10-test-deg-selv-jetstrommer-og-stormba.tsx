import { Quiz } from "@/components/quiz";

export function TestDegSelvJetstrommerOgStormba() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Test deg selv: Jetstrømmer og stormbaner
      </h2>
      <Quiz
        questions={[
          {
            prompt:
              "Hvorfor blåser jetstrømmene nesten utelukkende fra vest mot øst på begge halvkuler?",
            options: [
              "Fordi solen står opp i øst og trekker luften med seg.",
              "Fordi varm luft over tropene utvider seg og skaper en trykkgradient i høyden mot polene, som Corioliskraften avbøyer 90° mot øst.",
              "Fordi friksjonen mot jordoverflaten dytter luften østover i stratosfæren.",
              "Fordi passatvindene ved bakken snur brått retning ved 1000 meters høyde.",
            ],
            answer: 1,
            explain:
              "Tropene er varme, så luftsøylen er tykk. Det skaper et overtrykk i høyden over tropene, og trykkgradientkraften peker mot polen på begge halvkuler. I fri atmosfære avbøyer Corioliskraften luften til høyre på nordlig halvkule og til venstre på sørlig halvkule – i begge tilfeller blir resultatet en ren vestavind!",
          },
          {
            prompt:
              "Hva er den fysiske forklaringen på begrepet «termisk vind» i Geofag 2?",
            options: [
              "At varm luft stiger opp fra asfalten i byene om sommeren.",
              "At vindhastigheten i fri atmosfære øker med høyden fordi isobarflatene heller brattere og brattere over en horisontal temperaturkontrast.",
              "At solgangsbrisen snur med solens gang på himmelen.",
              "At friksjonen mot bakken forsvinner når luften varmes opp over 20 °C.",
            ],
            answer: 1,
            explain:
              "Termisk vind er den teoretiske vinddifferansen mellom to høydenivåer. Fordi en varm luftsøyle er tykkere enn en kald, ligger trykkflatene høyere i sør enn i nord. Høydeforskjellen øker med høyden, trykkflatene blir brattere, gradienten øker, og den geostrofiske vinden akselererer oppover.",
          },
          {
            prompt:
              "I hvilken del av en jetkjerne (jet streak) er sjansen aller størst for at et nytt lavtrykk dannes og dypner eksplosivt?",
            options: [
              "I høyre utløp, der luften synker ned mot bakken.",
              "I venstre innløp, der vinden bremser opp.",
              "I venstre utløp (left exit), der divergens i høyden suger opp luftmasse fra bakkenivå.",
              "Nøyaktig i midten av kjernen, der trykket er høyest.",
            ],
            answer: 2,
            explain:
              "I venstre utløp bremser luften opp, og Corioliskraften kaster luften mot høyre. Dette skaper kraftig divergens i høyden på nordsiden (venstre side). Luft fjernes fra toppen av søylen, trykket ved bakken faller, og luft tvinges oppover i en kraftig syklon.",
          },
          {
            prompt:
              "Hvorfor er polarfrontjeten vesentlig sterkere om vinteren enn om sommeren?",
            options: [
              "Fordi jorden roterer med høyere hastighet i januar.",
              "Fordi polarnatten gjør Arktis iskald (-40 °C) mens tropene forblir varme, slik at temperaturkontrasten (ΔT) er på sitt maksimale.",
              "Fordi ozonlaget forsvinner helt over Norge hver vinter.",
              "Fordi snødekket på bakken fjerner all friksjon mot luften i 10 km høyde.",
            ],
            answer: 1,
            explain:
              "Ifølge termisk vind-ligningen styres jetens styrke av temperaturgradienten under den. Om vinteren er polen bekmørk og iskald mens tropene bader i sol (ΔT ≈ 70 °C). Om sommeren varmer midnattssolen Arktis, og kontrasten krymper til under 30 °C.",
          },
          {
            prompt:
              "Hva kjennetegner en situasjon med atmosfærisk «Omega-blokkering» over Skandinavia om sommeren?",
            options: [
              "Ekstremt mange lavtrykk som passerer over Østlandet hver eneste dag.",
              "Et stabilt høytrykk som deler jetstrømmen i to, gir uker med subsidens, sol og hetebølge i Norge, mens lavtrykk tvinges utenom.",
              "At jetstrømmen forsvinner fullstendig fra den nordlige halvkule.",
              "At havstrømmene snur og renner sørover langs kysten.",
            ],
            answer: 1,
            explain:
              "En Omega-blokk er en kvasistasjonær høytrykksrygg formet som den greske bokstaven Ω. Den tvinger jetstrømmen i to grener rundt Skandinavia. Under høytrykket synker luften (subsidens), skyer oppløses, og sommerværet låser seg i ukesvis med tørke, hete og skogbrannfare (som i 2018).",
          },
          {
            prompt:
              "Hva er den vitenskapelig korrekte vurderingen av hypotesen om at arktisk forsterkning gir mer meandrerende jetstrøm og flere blokkeringer?",
            options: [
              "Det er et uomtvistelig faktum som alle klimaforskere og IPCC er 100 % enige om.",
              "Det er en hypotese med lav konfidens i IPCC AR6, fordi oppvarming i den tropiske øvre troposfæren motvirker effekten av arktisk bakkeoppvarming.",
              "Hypotesen gjelder bare for den sørlige halvkule over Antarktis.",
              "Hypotesen er motbevist fordi jetstrømmen har sluttet å eksistere.",
            ],
            answer: 1,
            explain:
              "Selv om hypotesen til Francis & Vavrus er intuitiv (redusert bakkekontrast svekker jeten), viser klimamodeller og observasjoner at tropisk øvre troposfære også varmes kraftig, noe som styrker gradienten i høyden. IPCC AR6 konkluderer derfor med lav konfidens for robuste endringer i meandring over Nord-Atlanteren.",
          },
        ]}
      />
    </>
  );
}
