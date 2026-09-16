import { Quiz } from "@/components/quiz";

export function TestDegSelv() {
  return (
    <>
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Test deg selv</h2>
      <Quiz
        questions={[
          {
            prompt: "Hvorfor er et utbrudd fra en ryolittisk stratovulkan dramatisk mer eksplosivt enn et basaltisk skjoldvulkanutbrudd?",
            options: [
              "Ryolittisk magma er mye varmere og skaper høyere damptrykk.",
              "Høyt SiO₂ danner silikatnettverk med ekstrem viskositet som fanger gasser til fragmenteringsnivået nås.",
              "Basaltisk magma inneholder mer uran og thorium.",
              "Hawaii har ingen magmakammer.",
            ],
            answer: 1,
            explain: "Riktig! Over 60 % SiO₂ danner kovalente polymerkjeder som øker viskositeten enormt. Gassboblene kan ikke unnslippe — pliniansk utbrudd.",
          },
          {
            prompt: "Hvorfor stanset Eyjafjallajökull 2010 (VEI 4) flytrafikken i Europa?",
            options: [
              "Radioaktiv lava ødela satellittnavigasjonen.",
              "Freatomagmatisme mot isbreen dannet finkornet silikatglassaske som smelter i jetmotorer.",
              "Røyken reagerte med ozonlaget.",
              "Radarene ble blendet av lavafontener.",
            ],
            answer: 1,
            explain: "Riktig! Magma mot is knuste smelten i mikroskopiske glasskår som smelter ved 1100 °C i jetmotorer.",
          },
          {
            prompt: "Hvorfor er subduksjonsvulkaner mer eksplosive enn midthavsrygg-vulkaner?",
            options: [
              "Subduksjonssoner er nærmere kjernen.",
              "Vann fra den synkende platen senker solidus og øker SiO₂, viskositet og gasstrykk.",
              "Midthavsrygger har ingen magmakammer.",
              "Subduksjon bruker kald havbunn som drivstoff.",
            ],
            answer: 1,
            explain: "Riktig! Flukssmelting gir intermediær/felsisk magma med mer gass enn dekompresjonssmelting under rygger.",
          },
          {
            prompt: "Hva er vulkansk vinter, og hvilket utbrudd er det tydeligste eksempelet?",
            options: [
              "Lokal kulde etter lavastrømmer — Kilauea 2018.",
              "Global nedkjøling av stratosfæriske SO₂-aerosoler — Tambora 1815 og året uten sommer 1816.",
              "Flerårig nedbørsøkning etter kaldera-utbrudd.",
              "Askefall som blokkerer solen lokalt i én uke.",
            ],
            answer: 1,
            explain: "Riktig! Tamboras 100 Mt SO₂ i 1815 dannet et globalt aerosolslør som knuste avlinger i 1816.",
          },
          {
            prompt: "Hva er en kaldera, og hva skiller den fra et vanlig krater?",
            options: [
              "Et vanlig eksplosjonskrater i toppen.",
              "En kolossal innsynkning (5–50 km) når taket over et tømt magmakammer raser ned.",
              "Et underjordisk magmakammer under en skjoldvulkan.",
              "Et lahar-fylt dalstrøk.",
            ],
            answer: 1,
            explain: "Riktig! Krater = utblåsningsåpning. Kaldera = kollaps av hele magmakammertaket.",
          },
          {
            prompt: "Hvorfor er Beerenberg stratovulkan tross basaltisk magma?",
            options: [
              "Alle vulkaner over 2000 moh. er stratovulkaner.",
              "Jan Mayen ligger på en rift med ryolittisk magma.",
              "Utbruddene veksler mellom strombolsk og hawaiisk og bygger lagdelt lava og tefra til kjegleform.",
              "Beerenberg har aldri hatt lavastrømmer.",
            ],
            answer: 2,
            explain: "Riktig! Basalt kan danne stratovulkan når lava og tefra veksler. Beerenbergs lagdelte, bratte, isdekte kjegle er typisk.",
          },
        ]}
      />
    </>
  );
}
