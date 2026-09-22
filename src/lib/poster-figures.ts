import type { FigMark } from "@/components/photo-figure";

export type PosterPhotoFigure = {
  src: string;
  alt: string;
  heading: string;
  caption: string;
  marks: FigMark[];
  points: { n: string; label: string }[];
};

export const POSTER_PHOTO_FIGURES: Record<string, PosterPhotoFigure> = {
  "/images/geo-jordens-indre-lagdeling-3d.jpg": {
    src: "/images/geo-jordens-indre-lagdeling-3d.jpg",
    alt: "Fotorealistisk 3D-tverrsnitt av jordens lagdeling fra jordskorpen og Moho ned til den faste indre kjernen",
    heading: "Jordens skall: Fra fast indre kjerne til bevegelige litosfæreplater",
    caption:
      "Jordkloden er lagdelt etter kjemisk sammensetning og mekaniske egenskaper (reologi). Litosfæren (jordskorpen og det øverste stive mantellaget) utgjør de tektoniske platene som glir over den seige, plastiske astenosfæren. Under overgangssonen ligger den massive nedre mantelen (opptil 2900 km). Den flytende ytre jern-nikkelkjernen (2900–5150 km) genererer jordas magnetfelt via geodynamoen, mens det enorme trykket i sentrum (5150–6371 km) holder den indre kjernen i fast, krystallinsk tilstand til tross for temperaturer på rundt 5000 °C.",
    marks: [
      { x: 28, y: 28, n: "1", text: "Litosfære & Moho", tone: "cold" },
      { x: 38, y: 37, n: "2", text: "Astenosfære", tone: "warm" },
      { x: 41, y: 54, n: "3", text: "Nedre mantel", tone: "cold" },
      { x: 44, y: 70, n: "4", text: "Flytende ytre kjerne", tone: "warm" },
      { x: 48, y: 88, n: "5", text: "Fast indre kjerne", tone: "warm" },
    ],
    points: [
      {
        n: "1",
        label:
          "Litosfære og Moho (0–100/200 km): Jordens stive ytterste skall delt i litosfæreplater. Består av skorpen (kontinental 30–40 km, havbunn 5–7 km) og øverste stive mantel, adskilt av Moho-grensen der seismiske bølger øker brått i fart.",
      },
      {
        n: "2",
        label:
          "Astenosfæren (~100–350 km, ~1450 °C): Fast peridotitt nær smeltepunktet som oppfører seg duktilt og seigtflytende over geologisk tid, slik at litosfæreplatene kan gli oppå.",
      },
      {
        n: "3",
        label:
          "Nedre mantel (660–2900 km, opptil ~3370 °C): Fast silikatbergart under enormt trykk, med konveksjonsstrømmer som langsomt transporterer varme fra jordas dyp.",
      },
      {
        n: "4",
        label:
          "Ytre kjerne (2900–5150 km, ~3370–5000 °C): Flytende jern og nikkel. S-bølger stoppes fullstendig her. Kraftige konveksjonsstrømmer genererer jordens magnetfelt.",
      },
      {
        n: "5",
        label:
          "Indre kjerne (5150–6371 km, ~5000 °C): Fast krystallinsk jern-nikkelkule. Selv om temperaturen er på høyde med solens overflate, tvinger det kolossale trykket (~3,6 millioner atmosfærer) atomene inn i et fast metallgitter.",
      },
    ],
  },
  "/images/fig-spredring.jpg": {
    src: "/images/fig-spredring.jpg",
    alt: "Sprekk i basalt og vulkansk rifting på Island der to plater glir fra hverandre",
    heading: "Divergerende grense eksponert på tørt land: Þingvellir på Island",
    caption:
      "Island er et av de få stedene på jorden der en midthavsrygg rager opp over havoverflaten. Her ved Þingvellir kan du fysisk gå i sprekken mellom Den eurasiske platen (til venstre) og Den nordamerikanske platen (til høyre). Sprekken vider seg ut med om lag 2–2,5 cm hvert eneste år.",
    marks: [
      { x: 30, y: 48, n: "1", text: "Eurasiske plate", tone: "cold" },
      { x: 70, y: 45, n: "2", text: "Nordamerikanske plate", tone: "warm" },
    ],
    points: [
      { n: "1", label: "Fast bergart på eurasisk side som beveger seg østover." },
      { n: "2", label: "Normalforkastningsvegg på nordamerikansk side som glir vestover." },
    ],
  },
  "/images/geo-midthavsrygg-hydrotermal.jpg": {
    src: "/images/geo-midthavsrygg-hydrotermal.jpg",
    alt: "3D-snitt av midthavsrygg med dekompresjonssmelting, aksialt magmakammer, putelava og hydrotermale skorsteiner",
    heading: "Midthavsryggens anatomi: Dekompresjonssmelting og hydrotermale skorsteiner",
    caption:
      "Når to litosfæreplater trekkes fra hverandre i spredningsaksen, stiger astenosfærisk peridotitt opp uten å tape nevneverdig varme (adiabatisk). Trykkfallet utløser dekompresjonssmelting (10–20 % delvis smelte) som produserer basaltisk magma. På havbunnen størkner lavaen som putelava (pillow basalt), mens nedsivende sjøvann varmes opp til over 350 °C av underliggende gabbro-kamre og spyles ut som metallrike hydrotermale skorsteiner («black smokers»).",
    marks: [
      { x: 50, y: 15, n: "1", text: "Black smoker", tone: "warm" },
      { x: 32, y: 48, n: "2", text: "Putelava", tone: "cold" },
      { x: 50, y: 62, n: "3", text: "Magmakammer", tone: "warm" },
      { x: 50, y: 88, n: "4", text: "Dekompresjon", tone: "cold" },
    ],
    points: [
      {
        n: "1",
        label:
          "Hydrotermale skorsteiner («black smokers») spyr ut overopphetet, mineralrikt fluid som utfeller kobber-, jern- og sinksulfider.",
      },
      {
        n: "2",
        label:
          "Basaltisk putelava dannes når flytende basalt bråkjøles mot bunnvannet (2 °C) og danner glassaktige, avrundede puter.",
      },
      {
        n: "3",
        label:
          "Aksialt gabbroid magmakammer på 2–4 km dyp der krystallisasjon og differensiasjon forer gangene ovenfor.",
      },
      {
        n: "4",
        label:
          "Adiabatisk oppstigende astenosfære der det litostatiske trykket faller under solidus og skaper primær basaltmagma.",
      },
    ],
  },
  "/images/geo-subduksjon-3d.jpg": {
    src: "/images/geo-subduksjon-3d.jpg",
    alt: "3D-snitt av subduksjonssone med dyphavsgrop, akkresjonskile, dehydrering, flukssmelting og vulkanbue",
    heading: "Anatomi av en subduksjonssone: Dehydrering, flukssmelting og akkresjonskile",
    caption:
      "Når en oseanisk litosfæreplate presses ned i mantelen, varmes den opp og presses sammen. Mineraler som har tatt opp sjøvann på havbunnen (særlig serpentinitt og leirmineraler) dehydreres ved 80–150 km dyp og slipper overopphetet vann inn i overliggende mantelkile. Dette senker peridotittens smeltepunkt dramatisk (flukssmelting). Den oppstigende magmaen mater en eksplosiv vulkanbue, mens avskrapede sedimenter danner en mektig akkresjonskile foran dyphavsgropen.",
    marks: [
      { x: 18, y: 55, n: "1", text: "Dyphavsgrop", tone: "cold" },
      { x: 26, y: 48, n: "2", text: "Akkresjonskile", tone: "warm" },
      { x: 42, y: 78, n: "3", text: "Dehydrering", tone: "cold" },
      { x: 54, y: 64, n: "4", text: "Flukssmelting", tone: "warm" },
      { x: 68, y: 32, n: "5", text: "Vulkanbue", tone: "warm" },
    ],
    points: [
      {
        n: "1",
        label:
          "Dyphavsgrop (trench) der den bøyelige litosfæreplaten dykker ned i mantelen (opptil 11 km dyp).",
      },
      {
        n: "2",
        label:
          "Akkresjonskile: Havbunnssedimenter skrapes av som foran et snøskjær og stables i imbrikerte skyveforkastninger.",
      },
      {
        n: "3",
        label:
          "Dehydrering: Trykket omdanner serpentinitt og leire til vannfrie mineraler og slipper fri superkritiske vannrike fluider.",
      },
      {
        n: "4",
        label:
          "Flukssmelting: Vannet senker peridotittens smeltepunkt (solidus) med flere hundre grader i mantelkilen.",
      },
      {
        n: "5",
        label:
          "Vulkanbue: Viskøs, andesittisk og gassrik magma stiger opp og bygger opp eksplosive stratovulkaner.",
      },
    ],
  },
  "/images/geo-ofiolitt-leka.jpg": {
    src: "/images/geo-ofiolitt-leka.jpg",
    alt: "Leka ofiolittkompleks med karakteristisk gulbrun dunitt og peridotitt fra jordens mantel",
    heading: "Norges geologiske nasjonalmonument: Leka ofiolittkompleks",
    caption:
      "På øya Leka i Trøndelag ligger et av verdens best bevarte ofiolittkomplekser (Furnes et al., 1988; NGU). Da Iapetushavet lukket seg for 420 millioner år siden under Den kaledonske fjellkjedefoldingen, ble et helt stykke havbunn vippet 90 grader på høykant og skjøvet opp på land. Her på Leka kan man gå tørrskodd fra jordens mantel (karakteristisk gulbrun dunitt og harzburgitt), krysse Moho-grensen til fots, og fortsette opp gjennom lagdelt gabbro, basaltganger og putelava!",
    marks: [
      { x: 22, y: 72, n: "1", text: "Mantelperidotitt", tone: "warm" },
      { x: 42, y: 55, n: "2", text: "Moho-grensen", tone: "cold" },
      { x: 62, y: 42, n: "3", text: "Lagdelt gabbro", tone: "warm" },
      { x: 80, y: 24, n: "4", text: "Putelava", tone: "cold" },
    ],
    points: [
      {
        n: "1",
        label:
          "Gulbrun forvitret dunitt og harzburgitt: Dette er selve jordens øvre mantel eksponert i dagslys!",
      },
      {
        n: "2",
        label: "Petrologisk Moho: Overgangen mellom ultramafisk mantel og mafisk gabbroid jordskorpe.",
      },
      {
        n: "3",
        label:
          "Lagdelt gabbro: Krystallisasjonsprodukter fra havbunnens aksiale magmakammer for 497 millioner år siden.",
      },
      {
        n: "4",
        label: "Plateformede ganger og putelava som en gang utgjorde havbunnen i Iapetushavet.",
      },
    ],
  },
  "/images/geo-wilsonsyklus-3d.jpg": {
    src: "/images/geo-wilsonsyklus-3d.jpg",
    alt: "Wilsonsyklusens 6 stadier fra kontinental oppsprekking til havlukking og fjellkjededannelse",
    heading: "Wilsonsyklusens 6 stadier: Superkontinentenes kretsløp i 3D",
    caption:
      "J. Tuzo Wilsons modell beskriver hvordan havbassenger fødes, utvides, lukkes og forsvinner i en syklus på 400–600 millioner år (Wilson, 1966). 1: Embryonisk stadium (kontinental riftdal, f.eks. Øst-Afrika). 2: Ungt stadium (smalt havbasseng med begynnende midthavsrygg, Rødehavet). 3: Modent stadium (vidt hav med passive marginer, Atlanterhavet). 4: Avtagende stadium (subduksjonssoner spiser opp havbunnen, Stillehavet). 5: Sluttstadium/terminalt (smalt, lukket hav med kollisjonsfronter, Middelhavet). 6: Suturstadium (kontinentkollisjon og høyfjellskjede, f.eks. Himalaya og oldtidens Kaledonider).",
    marks: [
      { x: 18, y: 22, n: "1", text: "1: Rifting", tone: "warm" },
      { x: 48, y: 22, n: "2", text: "2–3: Havspredning", tone: "cold" },
      { x: 80, y: 22, n: "3", text: "4: Subduksjon", tone: "cold" },
      { x: 50, y: 75, n: "4", text: "5–6: Kollisjon & Sutur", tone: "warm" },
    ],
    points: [
      {
        n: "1",
        label:
          "Embryonisk & ungt stadium: Kontinental skorpe tynnes og sprekker opp (riftdal -> Rødehavet).",
      },
      {
        n: "2",
        label:
          "Modent stadium: Havbunnsspredning over titalls millioner år skaper brede verdenshav (Atlanterhavet).",
      },
      {
        n: "3",
        label:
          "Avtagende stadium: Kald og tung litosfære begynner å subduere langs havets render (Ildringen i Stillehavet).",
      },
      {
        n: "4",
        label:
          "Suturstadium: Havbunnen forsvinner fullstendig; kontinentene støter sammen i orogenese (fjellkjededannelse).",
      },
    ],
  },
};

export function getPosterPhotoFigure(src: string | undefined): PosterPhotoFigure | undefined {
  if (!src) return undefined;
  return POSTER_PHOTO_FIGURES[src];
}
