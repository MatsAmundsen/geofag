import { Quiz } from "@/components/quiz";

export function TestDegSelvNumeriskeModeller() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Test deg selv: Numeriske modeller
      </h2>
      <Quiz
        questions={[
          {
            prompt:
              "Hva er den fundamentale forskjellen mellom et værvarsel og en klimafremskrivning i Geofag 2?",
            options: [
              "Klimafremskrivninger bruker aldri fysiske bevaringslover, men bare historisk statistikk.",
              "Værvarsling er et startverdiproblem der de neste dagene styres av nøyaktig starttilstand. Klimafremskrivning er et randverdiproblem der statistikken over tiår styres av ytre pådriv (klimagasser og sol).",
              "Værvarsler bruker rutenett, mens klimamodeller regner uten rutenett.",
              "Klimamodeller har som mål å varsle det nøyaktige været på en bestemt dato, som 17. mai 2085.",
            ],
            answer: 1,
            explain:
              "Været neste uke er ekstremt følsomt for dagens starttilstand (startverdiproblem). På tiårsskala har starttilstanden 'glemt seg selv' på grunn av kaos; her er det ytre pådriv som endrer jordens energibalanse (randverdiproblem) som bestemmer den statistiske fordelingen.",
          },
          {
            prompt:
              "Hvorfor må en numerisk modell parametrisere prosesser som skydannelse og turbulens?",
            options: [
              "Fordi skyer og turbulens ikke har noen innvirkning på atmosfærens temperatur eller trykk.",
              "Fordi disse prosessene foregår på en romlig skala som er mindre enn rutenettets cellestørrelse (sub-grid), og derfor ikke kan løses direkte av primærligningene.",
              "Fordi superdatamaskinene ikke har lov til å bruke Newtons lover i troposfæren.",
              "Fordi parametrisering bare gjøres over land, aldri over hav.",
            ],
            answer: 1,
            explain:
              "En modell kan kun beregne ett gjennomsnittlig tall per celle. En cumulus-bygesky kan være 2 km bred. I en modell med 9 km rutenett er hele skyen mindre enn cellen (sub-grid). Dens oppdrift, fukttilførsel og nedbør må derfor representeres gjennom statistisk-fysiske parametriseringer.",
          },
          {
            prompt:
              "Hva krever Courant-Friedrichs-Lewy (CFL)-kriteriet av en modell som halverer rutenettavstanden sin (f.eks. fra 10 km til 5 km)?",
            options: [
              "At modellen må doble vindhastigheten for å holde luften i bevegelse.",
              "At tidssteget Δt også må halveres for at luften eller bølgene ikke skal blåse gjennom mer enn én celle per tidssteg, noe som gjør beregningen 16 ganger mer krevende i 3D.",
              "At Corioliskraften må settes til null i stratosfæren.",
              "At dataassimileringen må avsluttes.",
            ],
            answer: 1,
            explain:
              "CFL-kriteriet krever at u·Δt / Δx ≤ 1. Halveres cellebredden Δx, må tidssteget Δt også halveres for å hindre numerisk instabilitet og modellkrasj. Sammen med dobling i tre romlige dimensjoner (2³ = 8) gir dette 8 × 2 = 16 ganger mer regnekraft.",
          },
          {
            prompt:
              "Hva er hensikten med dataassimilering (f.eks. 4D-Var) i forkant av en ny modellkjøring?",
            options: [
              "Å slette alle observasjoner som ikke stemmer med gårsdagens værmelding.",
              "Å kombinere nye observasjoner fra satellitter, radiosonder og stasjoner med modellens forrige prognose på en fysisk balansert måte, slik at det dannes en optimal starttilstand uten trykksjokk.",
              "Å erstatte superdatamaskinen med et nevralt nettverk.",
              "Å regne ut hvor mye drivhusgasser som slippes ut neste år.",
            ],
            answer: 1,
            explain:
              "Uten dataassimilering ville modellen raskt drive bort fra virkeligheten. 4D-Var veier målingenes usikkerhet mot modellens forrige gjetning (First Guess) og skaper en optimal, balansert analyse som fungerer som starttilstand for neste prognose.",
          },
          {
            prompt:
              "Hva forteller det deg når de 50 medlemmene i et ensemblevarsel (EPS) på Yr spriker voldsomt fra dag 7 og utover?",
            options: [
              "At superdatamaskinen har tekniske problemer og må restartes.",
              "At atmosfæren har lav forutsigbarhet på grunn av kaotisk vekst av småfeil, og at varselet må tolkes som sannsynligheter (f.eks. boksplot eller prosent sjanse) fremfor et bestemt tall.",
              "At det garantert blir sol i hele landet.",
              "At klimaet har endret seg over natten.",
            ],
            answer: 1,
            explain:
              "Ensemblets spredning måler atmosfærens forutsigbarhet. Når banene spriker, betyr det at små forstyrrelser i starttilstanden gir helt ulike utfall (kaos). Da er det vitenskapelig korrekt å bruke sannsynlighetsvarsling, ikke et enkelt tall.",
          },
          {
            prompt:
              "Hva kjennetegner det operative modellhierarkiet og nesting i Norge (MEPS og ECMWF)?",
            options: [
              "Norge bruker kun én global modell som løser alle daler og fjorder med 10 meters oppløsning.",
              "Den regionale modellen MEPS (2,5 km over Norden) henter storskala randbetingelser fra den globale modellen ECMWF (9 km), og kan med sitt fine rutenett løse bygeskyer og fjordtopografi direkte.",
              "Havmodellen Norkyst styrer været i atmosfæren over hele Europa.",
              "AROME-Arctic brukes bare over Sahara.",
            ],
            answer: 1,
            explain:
              "Nesting er stafetten der den globale modellen ECMWF beregner de store stormbanene og leverer randbetingelser til den finoppløste regionale modellen MEPS over Norden. Med 2,5 km oppløsning er MEPS konveksjonsløsende og fanger opp norsk terreng på en overlegen måte.",
          },
        ]}
      />
    </>
  );
}
