import { Quiz } from "@/components/quiz";
import { Term, TermGrid } from "@/components/term";

export function BegreperQuiz() {
  return (
    <>
      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="NAO (Nordatlantisk oscillasjon)"
          def="Svingning i lufttrykksforskjellen mellom Azorhøytrykket og Islandslavtrykket som styrer vestavindsbeltet over Nord-Atlanteren."
        />
        <Term
          name="NAO+"
          def="Positiv fase: Bratt trykkgradient, sterk sonal polarjet, milde, våte og stormfulle vintre i Norge, tørke i Sør-Europa."
        />
        <Term
          name="NAO−"
          def="Negativ fase: Slak trykkgradient, meandrerende jetstrøm, blokkerende høytrykk, streng arktisk kulde i Norge og regn i Middelhavet."
        />
        <Term
          name="Geostrofisk vind"
          def="Teoretisk vind som oppstår ved eksakt balanse mellom trykkgradientkraften og Coriolis-kraften. u_g = -(1/ρf)(∂P/∂y)."
        />
        <Term
          name="Polarjet"
          def="Hurtig vestlig luftstrøm i 9–11 km høyde langs polarfronten drevet av temperaturkontrasten mellom Arktis og subtropene."
        />
        <Term
          name="Stormbane (Storm track)"
          def="Hovedkorridoren som lavtrykk og sykloner følger over Nord-Atlanteren mot Europa."
        />
        <Term
          name="Rossby-bølger"
          def="Store planetære meandrer i jetstrømmen forårsaket av jordrotasjon og temperaturkontraster. Danner trau (L) og rygger (H)."
        />
        <Term
          name="Blokkerende høytrykk"
          def="Mektig, kvasistasjonært høytrykk (f.eks. Omega-blokkering) som tvinger jetstrøm og lavtrykk til å ta store omveier i ukevis."
        />
        <Term
          name="Polarvirvel (Polar vortex)"
          def="Sirkumpolart stratosfærisk lavtrykk over Arktis om vinteren som sperrer inne den kaldeste arktiske luften."
        />
        <Term
          name="SSW (Plutselig stratosfærisk oppvarming)"
          def="Dramatisk temperaturhopp (+30–50 °C) i stratosfæren som splitter polarvirvelen og tipper NAO over i negativ fase 2–4 uker senere."
        />
        <Term
          name="AO (Arctic Oscillation)"
          def="Halvkuledekkende trykkmodus mellom Arktis og midlere breddegrader, sterkt korrelert med NAO om vinteren."
        />
        <Term
          name="Orografisk nedbør"
          def="Nedbør som oppstår når fuktig maritim vind tvinges opp over fjell (f.eks. Vestlandsfjellene), avkjøles og kondenserer."
        />
        <Term
          name="Telekobling"
          def="Klimatiske sammenhenger over enorme avstander, f.eks. hvordan ENSO i Stillehavet påvirker NAO via atmosfæriske bølgetog."
        />
        <Term
          name="Seesaw-effekten"
          def="Det motsatte temperaturforholdet mellom Skandinavia og Vest-Grønland/Canada under ekstreme NAO-faser."
        />
      </TermGrid>

      {/* ── 5. Quiz ─────────────────────────────────────────────────── */}
      <Quiz
        questions={[
          {
            prompt:
              "Hva kjennetegner trykkforholdene og polarjeten under en sterkt positiv NAO-fase (NAO+)?",
            options: [
              "Både Islandslavtrykket og Azorhøytrykket er svekket, og polarjeten meandrerer langt sør mot Sahara.",
              "Islandslavtrykket er uvanlig dypt og Azorhøytrykket er sterkt; den bratte trykkgradienten gir en rask, rett og sonal polarjet mot Nord-Europa.",
              "Azorhøytrykket forsvinner helt, og all vind snur til østlig retning over Atlanteren.",
              "Trykket over Island stiger til 1040 hPa og danner en kvasistasjonær Omega-blokkering.",
            ],
            answer: 1,
            explain:
              "Under NAO+ er begge de semi-permanente trykksentrene forsterket. Den bratte trykkgradienten gir en sterk geostrofisk balanse, som driver en rett, sonal polarjet og lavtrykksmotorvei rett inn mot Vestlandet og Norskehavet.",
          },
          {
            prompt:
              "Hvilket vintervær er typisk for Norge når NAO-indeksen er sterkt negativ (NAO−)?",
            options: [
              "Milde temperaturer, kraftig vestavind, regnskyll ved kysten og rekordstor snøakkumulasjon på vestlandsbreene.",
              "Knusktørr, vindstille og streng sprengkulde fra Sibir/Arktis under et blokkerende høytrykk, med fare for bakkeinversjon i byene.",
              "Tropiske hetebølger med temperaturer over 25 °C over hele Skandinavia.",
              "Konstant vestavindsstorm og ekstrem stormflo langs hele kysten.",
            ],
            answer: 1,
            explain:
              "Under NAO− svekkes vestavinden og polarjeten meandrerer. Et mektig blokkerende høytrykk etablerer seg over Skandinavia og trekker tørr, iskald kontinentalluft fra øst/nordøst over Norge.",
          },
          {
            prompt:
              "Hva skjer med været i Sør-Europa og Middelhavet når Norge opplever en mild og stormfull NAO+-vinter?",
            options: [
              "Sør-Europa opplever nøyaktig det samme været som Norge: voldsom nedbør og flom.",
              "Middelhavsområdet opplever tørt, solrikt vær og fare for vintertørke fordi det forsterkede Azorhøytrykket blokkerer lavtrykkene.",
              "Middelhavet fryser til is pga. arktisk luftmasse.",
              "Polarjeten flytter seg helt ned til ekvator og danner tropiske orkaner i Hellas.",
            ],
            answer: 1,
            explain:
              "NAO fungerer som en vippe: Når stormbanen dyttes nordover mot Norge i NAO+, ekspanderer Azorhøytrykket over Den iberiske halvøy og Middelhavet. Nedsynkende luftmasse gir stabilt, tørt vær og tørkefare i sør.",
          },
          {
            prompt:
              "Hva menes med den meteorologiske «seesaw»-effekten mellom Norge og Vest-Grønland under NAO−?",
            options: [
              "At havoverflaten stiger med 1 meter på Grønland og synker med 1 meter i Norge.",
              "At Norge og Vest-Grønland har motsatt fortegn på temperaturavviket: når Norge har sprengkulde, har Vest-Grønland unormal varme.",
              "At vindretningen veksler mellom øst og vest hvert 10. minutt.",
              "At jordskjelv på Island tipper jordskorpen mellom Grønland og Norge.",
            ],
            answer: 1,
            explain:
              "Når et blokkerende høytrykk parkerer over Skandinavia under NAO−, trekker østsiden kald polarluft sørover over Norge, mens vestsiden pumper mild atlantisk luft nordover langs kysten av Vest-Grønland og Davisstredet.",
          },
          {
            prompt:
              "Hva er en Sudden Stratospheric Warming (SSW), og hvordan henger den sammen med vinterværet i Norge?",
            options: [
              "En oppvarming av havet ved Azorene som smelter korallrev på under 24 timer.",
              "Et brått temperaturhopp (+30–50 °C) i stratosfæren over Arktis som forstyrrer eller splitter polarvirvelen, og 2–4 uker senere ofte utløser en dyp NAO− med kulde i Norge.",
              "Et lokalt fenomen i troposfæren over Oslofjorden forårsaket av bilkjøring.",
              "En permanent global oppvarming som gjør at det aldri mer kan bli kuldegrader i Skandinavia.",
            ],
            answer: 1,
            explain:
              "Når planetære bølger bryter opp i stratosfæren, kan polarvirvelen kollapse i en SSW. Signalet forplanter seg ned i troposfæren over 2–4 uker, svekker Islandslavtrykket og etablerer blokkerende sibirkulde over Norden (dyp NAO−).",
          },
          {
            prompt:
              "Hvorfor rykket maritime vestlandsbreer som Briksdalsbreen og Nigardsbreen frem på 1990-tallet?",
            options: [
              "Fordi sommertemperaturene sank til under -10 °C på Vestlandet.",
              "Fordi en vedvarende serie med sterkt positive NAO-vintre (NAO+) pumpet enorme snømengder inn over fjellet, som ga kraftig positiv vinterbalanse.",
              "Fordi Golfstrømmen stoppet helt opp og gjorde Norskehavet bunnfrossent.",
              "Fordi permafrosten ekspanderte ned til havnivå i Sogn og Fjordane.",
            ],
            answer: 1,
            explain:
              "I perioden 1989–1995 var NAO uvanlig sterkt positiv. De fuktige vestavindene ga rekordstor orografisk vintersnø på breene i høyfjellet, som oversteg sommerens bresmelting og førte til rask fremrykking (Nesje et al., 2000).",
          },
          {
            prompt:
              "Hvordan beregnes den tradisjonelle stasjonsbaserte NAO-indeksen?",
            options: [
              "Ved å ta gjennomsnittstemperaturen i Madrid minus temperaturen i Tromsø.",
              "Som den normaliserte lufttrykksforskjellen ved havnivå mellom en sørlig stasjon (Ponta Delgada/Lisboa) og en nordlig stasjon (Reykjavík).",
              "Ved å telle antall lavtrykk som passerer Nordsjøen i løpet av ett kalenderår.",
              "Ved å måle havtemperaturen i Niño 3.4-regionen i Stillehavet.",
            ],
            answer: 1,
            explain:
              "NAO-indeksen er en barometrisk indeks: P_norm(Sør) − P_norm(Nord). Den måler styrken på den horisontale trykkgradienten som driver vestavindene over Atlanteren.",
          },
          {
            prompt:
              "Hvordan kan en kraftig El Niño i Stillehavet påvirke NAO-systemet over Atlanteren?",
            options: [
              "Vannet fra Stillehavet renner direkte gjennom Panamakanalen og varmer opp Nordsjøen.",
              "El Niño sender ut planetære Rossby-bølgetog over Nord-Amerika som kan forstyrre polarvirvelen og statistisk øke sjansen for NAO− i Europa.",
              "El Niño slår av jordrotasjonen slik at Coriolis-effekten opphører i Nord-Atlanteren.",
              "El Niño har absolutt ingen fysisk mulighet til å påvirke været utenfor Sør-Amerika.",
            ],
            answer: 1,
            explain:
              "Via atmosfæriske telekoblinger (PNA-mønsteret) genererer El Niños tropiske konveksjon bølgetog som forplanter seg inn i stratosfæren, forstyrrer polarvirvelen og øker sannsynligheten for en meandrerende jet og negativ NAO i Europa.",
          },
        ]}
      />
    </>
  );
}
