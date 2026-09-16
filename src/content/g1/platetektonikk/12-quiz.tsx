import { Callout } from "@/components/callout";
import { Quiz } from "@/components/quiz";

export function QuizDel() {
  return (
    <>
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Test deg selv</h2>
      <Quiz
        questions={[
          {
            prompt: "Hva er den mekaniske forskjellen på litosfæren og astenosfæren?",
            options: [
              "Litosfæren er flytende magma, mens astenosfæren er fast granitt.",
              "Litosfæren er det kalde, sprø ytterste skallet (skorpe + stiv mantel), mens astenosfæren er varm, fast peridotitt som oppfører seg duktilt og seigtflytende over millioner av år.",
              "Litosfæren finnes bare under kontinentene, mens astenosfæren er havbunn.",
              "Litosfæren og astenosfæren er identiske, men har ulik kjemisk sammensetning av silisium.",
            ],
            answer: 1,
            explain:
              "Riktig! Begge består av fast bergart, men litosfæren er kald og sprø (brekker i plater), mens astenosfæren er så varm (~1350 °C) at den deformeres plastisk og lar platene gli over seg.",
          },
          {
            prompt: "Hva er den viktigste drivkraften bak litosfæreplates bevegelse?",
            options: [
              "Tidevannskrefter fra månen som trekker kontinentene vestover.",
              "Slab pull: Kald og gammel havbunnsskorpe omdannes til tung eklogitt og synker under egen vekt i subduksjonssonen.",
              "Friksjonsdrag fra vinder i troposfæren som dytter på fjellkjedene.",
              "Sentrifugalkraft fra jordas rotasjon som kaster platene mot ekvator.",
            ],
            answer: 1,
            explain:
              "Riktig! Geodynamiske målinger viser at slab pull står for om lag 90 % av bevegelseskraften. Tetthetsøkningen ved faseovergang til eklogitt trekker hele platen etter seg.",
          },
          {
            prompt: "Hvorfor er Leka i Trøndelag kåret til Norges geologiske nasjonalmonument?",
            options: [
              "Fordi det er landets eneste aktive vulkan.",
              "Fordi en komplett bit av Iapetushavets bunn og øvre mantel ble skjøvet på land under Kaledonidene (ofiolitt), slik at man kan gå tørrskodd over Moho-grensen.",
              "Fordi Norges eldste meteorittkrater ligger der.",
              "Fordi det er det eneste stedet i Europa med permafrost.",
            ],
            answer: 1,
            explain:
              "Riktig! Leka ofiolittkompleks er et geologisk verdensfenomen der obduksjon bevarte hele lagrekken fra mantelperidotitt, over Moho, og opp til lagdelt gabbro og putelava.",
          },
          {
            prompt: "Hvorfor er en transformforkastning seismisk aktiv bare mellom spredningsryggene, og ikke i bruddsonen utenfor?",
            options: [
              "Fordi havvannet kjøler ned bergartene utenfor ryggen.",
              "Fordi platene på hver side av sprekken utenfor ryggaksen beveger seg i samme retning med samme fart (ingen relativ bevegelse).",
              "Fordi jordskjelvbølger bare kan bevege seg mot øst.",
              "Fordi bruddsonene er fylt med flytende magma som demper rystelser.",
            ],
            answer: 1,
            explain:
              "Riktig! Som J. Tuzo Wilson viste i 1965: Kun mellom ryggsegmentene glir platene i motsatt retning. Utenfor ryggene beveger skorpen seg unisont i samme retning; bruddsonene er derfor aseismiske arr.",
          },
          {
            prompt: "Hvordan beviste Vine og Matthews havbunnsspredning i 1963?",
            options: [
              "Ved å finne fossiler av dinosaurer på havbunnen.",
              "Ved å oppdage symmetriske striper med normal og reversert magnetisering i havbunnsskorpen på hver side av midthavsryggen.",
              "Ved å måle tidevannsbølger over Den midtatlantiske rygg.",
              "Ved å bore helt ned til jordens flytende ytre kjerne.",
            ],
            answer: 1,
            explain:
              "Riktig! Da havbunnen spredte seg og størknet, frøs magnetittmineralene inn jordas vekslende magnetfelt som et gigantisk symmetrisk båndopptak.",
          },
          {
            prompt: "Hvorfor finnes det aldri jordskjelv dypere enn 700 kilometer i Wadati-Benioff-sonen?",
            options: [
              "Fordi platen fordamper fullstendig når den når 700 km dyp.",
              "Fordi trykk og temperatur i mantelen under 700 km gjør bergartene fullstendig plastiske; de kan ikke lenger lagre elastisk spenning eller sprekke sprøtt.",
              "Fordi seismometrene på overflaten ikke klarer å registrere bølger fra større dyp.",
              "Fordi den flytende ytre kjernen starter ved 700 km dyp.",
            ],
            answer: 1,
            explain:
              "Riktig! Under 700 km dybde fører høyt trykk og høy temperatur til at bergartene deformeres kontinuerlig ved plastisk flyt (dislokasjonskryp). Uten sprøtt brudd oppstår ingen jordskjelv.",
          },
          {
            prompt: "Hva var den kaledonske fjellkjedefoldingen i Norges geologiske historie?",
            options: [
              "En oppsprekking av Norge i perm da Oslofeltet sank inn.",
              "En kontinent-kontinent-kollisjon i silur der Baltika og Laurentia kolliderte, lukket Iapetushavet og skjøv store skyvedekker over landet.",
              "En istidsepoke for 10 000 år siden som gravde ut de norske fjordene.",
              "Dannelsen av Jan Mayen og Beerenberg-vulkanen.",
            ],
            answer: 1,
            explain:
              "Riktig! Kaledonidene oppsto for 430–400 mill. år siden da Iapetushavet lukket seg og Baltika kolliderte med Grønland/Amerika. Skyvedekkene i Jotunheimen er rester av denne fjellkjeden.",
          },
          {
            prompt: "Hvorfor kan marin leire finnes opptil 220 meter over dagens havnivå på Østlandet (marin grense)?",
            options: [
              "Fordi havet under istiden sto 220 meter høyere globalt på grunn av voldsom nedbør.",
              "Fordi den 3 km tykke innlandsisen presset litosfæren ned; da isen smeltet, hevet landet seg raskere enn havet (glasial isostasi).",
              "Fordi tsunamibølger kastet leiren opp i fjellsidene.",
              "Fordi Oslofeltets vulkaner slynget leire opp i høyden under perm.",
            ],
            answer: 1,
            explain:
              "Riktig! Glasial isostasi: Isens enorme vekt trykket litosfæren ned i astenosfæren. Da isen forsvant, hevet landet seg med opptil flere hundre meter, slik at gammel havbunn i dag ligger som fruktbart jordbruksland langt over havnivå.",
          },
        ]}
      />

      <Callout title="Oppsummering: De viktigste læringspunktene om platetektonikk">
        <ul className="space-y-1.5 text-sm list-disc pl-4">
          <li><strong>Mantelen er fast bergart:</strong> Litosfæreplatene flyter ikke på flytende magma, men på duktil astenosfære (varm peridotitt) som flyter seigt over millioner av år.</li>
          <li><strong>Slab pull er hovedmotoren:</strong> Oseanisk litosfære omdannes til tung eklogitt under subduksjon, og tyngdekraften trekker hele platen med seg (~90 % av kraften).</li>
          <li><strong>Smelting krever en utløsende mekanisme:</strong> Trykkfall (dekompresjon) ved midthavsrygger, tilførsel av vann (flukssmelting) ved subduksjonssoner, eller temperaturøkning ved dype mantelplymer (hotspots).</li>
          <li><strong>Ofiolitter er havbunn på land:</strong> Leka i Trøndelag gir en enestående mulighet til å studere hele havbunnsskorpen og Moho-grenseflaten til fots.</li>
          <li><strong>Norges geologi er skapt av platetektonikk:</strong> Fra den kaledonske kollisjonen og Leka-ofiolitten, via permisk riftdannelse i Oslofeltet, til åpningen av Nord-Atlanteren og dagens postglasiale landheving.</li>
        </ul>
      </Callout>
    </>
  );
}
