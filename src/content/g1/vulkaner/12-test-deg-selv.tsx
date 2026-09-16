import { Quiz } from "@/components/quiz";

export function TestDegSelv() {
  return (
    <section className="space-y-4">
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Test deg selv</h2>
      <Quiz
        questions={[
          {
            prompt:
              "Hvorfor er et utbrudd fra en ryolittisk stratovulkan dramatisk mye mer eksplosivt enn et utbrudd fra en basaltisk skjoldvulkan på Hawaii?",
            options: [
              "Ryolittisk magma er mye varmere enn basaltisk magma, noe som skaper høyere damptrykk.",
              "Ryolittisk magma har høyt SiO₂-innhold som danner silikatnettverk med ekstrem viskositet; dette fanger oppløste gasser under kolossalt trykk inntil fragmenteringsnivået nås.",
              "Basaltisk magma inneholder mer uran og thorium, som forhindrer gassdannelse.",
              "Hawaii har ingen magmakammer under overflaten, og lavaen presses ut av gravitasjonsbølger.",
            ],
            answer: 1,
            explain:
              "Riktig! Når SiO₂-innholdet overstiger 60 %, danner silikat-tetraedrene sterke kovalente polymerkjeder som øker viskositeten med opptil en million ganger sammenlignet med basalt. Gassboblene kan ikke unnslippe, og resultatet er et eksplosivt pliniansk utbrudd.",
          },
          {
            prompt:
              "Hvorfor forårsaket Eyjafjallajökull-utbruddet i 2010 en så omfattende flystans i hele Europa, til tross for at utbruddet bare var VEI 4?",
            options: [
              "Fordi utbruddet slynget ut radioaktiv lava som ødela satellittnavigasjonen.",
              "Fordi magmaen eksploderte i kontakt med smeltevann fra isbreen (freatomagmatisme) og dannet ekstremt finkornet silikatglassaske som smelter inne i varme jetmotorer.",
              "Fordi røyken fra vulkanen reagerte med ozonlaget og dannet kvelende giftgasser.",
              "Fordi flyselskapenes radarer ble blendet av lyset fra lavafontenene.",
            ],
            answer: 1,
            explain:
              "Riktig! Freatomagmatisme: Magmaens møte med isbreen knuste smelten i ørsmå, mikroskopiske glasskår som smelter ved 1100 °C inne i jetmotorers forbrenningskamre og forårsaker motorstans.",
          },
          {
            prompt:
              "Hva er den viktigste årsaken til at vulkaner på subduksjonssoner er mer eksplosive enn vulkaner på midthavsrygger?",
            options: [
              "Subduksjonssoner er nærmere jordens kjerne og har høyere temperatur.",
              "Vann frigjort fra den synkende oseaniske platen senker magmaens solidustemperatur og øker SiO₂-innholdet, noe som gir høyere viskositet og gasstrykk.",
              "Midthavsrygg-vulkaner har ingen magmakammer og kan ikke eksplodere.",
              "Subduksjonsvulkaner bruker kald havbunnsskorpe som drivstoff, noe som gir mer energi.",
            ],
            answer: 1,
            explain:
              "Riktig! Flukssmelting i mantelkilen over den synkende platen produserer intermediær til felsisk magma med høyere SiO₂ og mer oppløste gasser enn den enkle dekompresjonssmeltingen under midthavsrygger.",
          },
          {
            prompt:
              "Hva er 'vulkansk vinter', og hvilket historisk utbrudd forårsaket det tydeligste eksempelet?",
            options: [
              "En lokalt kald periode rundt en vulkan etter lavastrømmer — Kilauea på Hawaii 2018.",
              "En global nedkjøling forårsaket av svovelsyreaerosoler i stratosfæren etter store eksplosive utbrudd — tydeligst etter Tambora 1815, som skapte 'året uten sommer' i 1816.",
              "En flerårig nedbørsøkning i tropene etter kaldera-utbrudd.",
              "En regional vinter der askefallet blokkerer solstrålingen lokalt i opptil én uke.",
            ],
            answer: 1,
            explain:
              "Riktig! Tamboras stratosfæriske SO₂-injeksjon på 100 millioner tonn i 1815 dannet et globalt aerosolslør av svovelsyre som kuttet solinnstrålingen nok til at avlingene sviktet globalt i 1816.",
          },
          {
            prompt: "Hva er en kaldera, og hva skiller den fra et vanlig vulkankrater?",
            options: [
              "En kaldera er et vanlig eksplosjonskrater i toppen av en vulkan.",
              "En kaldera er en kolossal innsynkningsstruktur (5–50 km bred) som oppstår når taket over et delvis tømt magmakammer raser loddrett ned under et katastrofalt utbrudd.",
              "En kaldera er et underjordisk magmakammer under en skjoldvulkan.",
              "En kaldera er et lahar-fyllt dalstrøk etter et vulkanutbrudd.",
            ],
            answer: 1,
            explain:
              "Riktig! Et vulkankrater er en utblåsningsåpning fra tilførselsrøret. En kaldera oppstår ved kollapsen av hele magmakammertaket — en gigantisk senkningsstruktur som kan være titalls kilometer bred.",
          },
          {
            prompt: "Hvorfor er Beerenberg på Jan Mayen klassifisert som stratovulkan til tross for basaltisk magma?",
            options: [
              "Fordi all vulkan over 2000 moh. kalles stratovulkan.",
              "Fordi Jan Mayen ligger på en rift der magmaen er ryolittisk.",
              "Fordi utbruddsstilen veksler mellom strombolsk og hawaiisk, noe som over tid har bygd opp lagdelte avsettinger av lava og tefra til en klassisk kjegleform.",
              "Fordi Beerenberg aldri har hatt ekte lavastrømmer.",
            ],
            answer: 2,
            explain:
              "Riktig! Selv basaltisk magma kan danne stratovulkaner dersom utbruddene veksler mellom lavastrømmer og tefrafall. Beerenbergs lagdelte oppbygning, bratte flanker og isbrekledde topp er karakteristisk for denne vulkantypen (Norsk Polarinstitutt, u.å.).",
          },
        ]}
      />
    </section>
  );
}
