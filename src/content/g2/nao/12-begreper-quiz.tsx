import { Quiz } from "@/components/quiz";
import { Term, TermGrid } from "@/components/term";

export function BegreperQuiz() {
  return (
    <>
      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="NAO (Nordatlantisk oscillasjon)" def="Svingning i lufttrykksforskjellen mellom Azorhøytrykket og Islandslavtrykket som styrer vestavindsbeltet over Nord-Atlanteren." />
        <Term name="NAO+" def="Positiv fase: bratt trykkgradient, sterk sonal polarjet, milde, våte og stormfulle vintre i Norge, tørke i Sør-Europa." />
        <Term name="NAO−" def="Negativ fase: slak gradient, meandrerende jet, blokkerende høytrykk, arktisk kulde i Norge og regn i Middelhavet." />
        <Term name="Geostrofisk vind" def="Balanse mellom trykkgradientkraft og Coriolis. u_g = −(1/ρf)(∂P/∂y)." />
        <Term name="Polarjet" def="Hurtig vestlig luftstrøm i 9–11 km høyde langs polarfronten." />
        <Term name="Stormbane" def="Hovedkorridoren lavtrykk følger over Nord-Atlanteren mot Europa." />
        <Term name="Rossby-bølger" def="Planetære meandrer i jetstrømmen. Danner trau (L) og rygger (H)." />
        <Term name="Blokkerende høytrykk" def="Kvasistasjonært høytrykk (f.eks. Omega) som tvinger jet og lavtrykk til omveier i ukevis." />
        <Term name="Polarvirvel" def="Sirkumpolart stratosfærisk lavtrykk over Arktis om vinteren." />
        <Term name="SSW" def="Plutselig stratosfærisk oppvarming (+30–50 °C) som splitter virvelen og tipper NAO− 2–4 uker senere." />
        <Term name="AO" def="Halvkuledekkende trykkmodus mellom Arktis og midlere breddegrader, sterkt korrelert med NAO om vinteren." />
        <Term name="Orografisk nedbør" def="Nedbør når fuktig maritim vind tvinges opp over fjell." />
        <Term name="Telekobling" def="Klimasammenheng over store avstander, f.eks. ENSO → NAO via bølgetog." />
        <Term name="Seesaw-effekten" def="Motsatt temperaturavvik mellom Skandinavia og Vest-Grønland under ekstreme NAO-faser." />
      </TermGrid>
      <Quiz
        questions={[
          {
            prompt: "Hva kjennetegner trykk og polarjet under sterkt positiv NAO?",
            options: [
              "Begge trykksentre svekket; jet meandrerer mot Sahara.",
              "Dypt Island-L og sterkt Azor-H; bratt gradient gir rask, rett, sonal polarjet mot Nord-Europa.",
              "Azorhøytrykket forsvinner; all vind blir østlig.",
              "Trykket over Island stiger til 1040 hPa og danner Omega-blokkering.",
            ],
            answer: 1,
            explain: "NAO+ forsterker begge sentre. Bratt gradient driver rett sonal jet og lavtrykksmotorvei mot Vestlandet.",
          },
          {
            prompt: "Hvilket vintervær er typisk i Norge under sterkt negativ NAO?",
            options: [
              "Mildt, vestavind, regn og rekordsnø på vestlandsbreene.",
              "Knusktørr sprengkulde fra Sibir under blokkerende høytrykk, med bakkeinversjon i byene.",
              "Tropiske hetebølger over 25 °C.",
              "Konstant vestavindsstorm og stormflo.",
            ],
            answer: 1,
            explain: "NAO−: svekket vestavind, meandrerende jet, blokkerende høytrykk trekker iskald kontinentalluft østfra.",
          },
          {
            prompt: "Hva skjer i Sør-Europa når Norge har mild, stormfull NAO+-vinter?",
            options: [
              "Samme vær: voldsom nedbør og flom.",
              "Tørt, solrikt vær og vintertørke fordi Azorhøytrykket blokkerer lavtrykkene.",
              "Middelhavet fryser.",
              "Polarjeten danner tropiske orkaner i Hellas.",
            ],
            answer: 1,
            explain: "Vippe: stormbane nordover, Azor-H over Iberia og Middelhavet, nedsynking og tørke i sør.",
          },
          {
            prompt: "Hva er seesaw-effekten mellom Norge og Vest-Grønland under NAO−?",
            options: [
              "Havnivået stiger 1 m på Grønland og synker 1 m i Norge.",
              "Motsatt fortegn på temperaturavvik: sprengkulde i Norge, unormal varme på Vest-Grønland.",
              "Vindretningen veksler hvert 10. minutt.",
              "Jordskjelv på Island tipper skorpen.",
            ],
            answer: 1,
            explain: "Blokkering over Skandinavia: østsiden trekker kulde over Norge, vestsiden pumper mild luft langs Vest-Grønland.",
          },
          {
            prompt: "Hva er SSW, og hvordan henger den sammen med norsk vintervær?",
            options: [
              "Oppvarming av havet ved Azorene.",
              "Brått +30–50 °C i stratosfæren over Arktis som splitter polarvirvelen og ofte utløser NAO− med kulde 2–4 uker senere.",
              "Lokalt fenomen over Oslofjorden.",
              "Permanent oppvarming som gjør kuldegrader umulig.",
            ],
            answer: 1,
            explain: "Planetære bølger kan kollapse virvelen. Signalet synker på 2–4 uker, Island-L svekkes, sibirkulde over Norden.",
          },
          {
            prompt: "Hvorfor rykket Briksdalsbreen og Nigardsbreen frem på 1990-tallet?",
            options: [
              "Sommertemperatur under −10 °C på Vestlandet.",
              "Serie med sterkt positive NAO-vintre pumpet enorme snømengder inn over fjellet — positiv vinterbalanse.",
              "Golfstrømmen stoppet.",
              "Permafrost ned til havnivå i Sogn.",
            ],
            answer: 1,
            explain: "1989–1995: NAO+ ga rekordstor orografisk vintersnø som oversteg sommersmeltingen (Nesje et al., 2000).",
          },
          {
            prompt: "Hvordan beregnes den tradisjonelle stasjonsbaserte NAO-indeksen?",
            options: [
              "Temperatur Madrid minus Tromsø.",
              "Normalisert lufttrykksforskjell Ponta Delgada/Lisboa minus Reykjavík.",
              "Antall lavtrykk i Nordsjøen per år.",
              "SST i Niño 3.4.",
            ],
            answer: 1,
            explain: "Barometrisk indeks: P_norm(Sør) − P_norm(Nord). Måler gradienten som driver vestavinden.",
          },
          {
            prompt: "Hvordan kan en kraftig El Niño påvirke NAO?",
            options: [
              "Vann renner gjennom Panama og varmer Nordsjøen.",
              "Rossby-bølgetog over Nord-Amerika kan forstyrre polarvirvelen og øke sjansen for NAO− i Europa.",
              "Jordrotasjonen slås av.",
              "El Niño kan ikke påvirke vær utenfor Sør-Amerika.",
            ],
            answer: 1,
            explain: "PNA-telekobling: tropisk konveksjon sender bølger inn i stratosfæren og øker sannsynligheten for meandrerende jet og NAO−.",
          },
        ]}
      />
    </>
  );
}
