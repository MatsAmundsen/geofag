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
    src: "/images/geo-jordens-indre-lagdeling-3d-ren.jpg",
    alt: "3D-tverrsnitt av jordens lagdeling. Havbunnsskorpe 5–8 km, kontinentalskorpe 30–50 km (opptil 70–80 km under høye fjell), astenosfære ca. 100–350 km dyp og ca. 1300–1400 °C.",
    heading: "Jordens skall: Fra fast indre kjerne til bevegelige litosfæreplater",
    caption:
      "Jorda er lagdelt etter kjemisk sammensetning og etter hvordan lagene oppfører seg. Litosfæren (jordskorpen og det øverste stive mantellaget) utgjør de tektoniske platene som glir over den seige astenosfæren. Under overgangssonen ligger den nedre mantelen (ned til 2900 km). Den flytende ytre kjernen av jern og nikkel (2900–5150 km) lager jordas magnetfelt. Trykket i sentrum (5150–6371 km) holder den indre kjernen fast, selv om temperaturen er ca. 5000 °C.",
    marks: [
      { x: 2, y: 14, text: "Havbunnsskorpe 5–8 km", tone: "cold" },
      { x: 2, y: 34, text: "Kontinentalskorpe 30–50 km", tone: "warm" },
      { x: 2, y: 54, text: "opptil 70–80 km under høye fjell", tone: "warm" },
      { x: 2, y: 74, n: "2", text: "Astenosfære ca. 100–350 km dyp", tone: "warm" },
      { x: 2, y: 90, text: "ca. 1300–1400 °C", tone: "warm" },
      { x: 98, y: 18, n: "1", text: "Litosfære og Moho", tone: "cold", align: "right" },
      { x: 98, y: 42, n: "3", text: "Nedre mantel", tone: "cold", align: "right" },
      { x: 98, y: 64, n: "4", text: "Ytre kjerne (flytende)", tone: "warm", align: "right" },
      { x: 98, y: 84, n: "5", text: "Indre kjerne (fast)", tone: "warm", align: "right" },
    ],
    points: [
      {
        n: "1",
        label:
          "Litosfære og Moho (i snitt ca. 100 km, opptil ca. 200 km under gamle kontinenter): Jordas stive ytterste skall, delt i litosfæreplater. Består av skorpen (kontinental 30–50 km, havbunn 5–8 km) og øverste stive mantel, adskilt av Moho-grensen der seismiske bølger øker brått i fart.",
      },
      {
        n: "2",
        label:
          "Astenosfæren (ca. 100–350 km, ca. 1300–1400 °C): Fast peridotitt nær smeltepunktet som deformeres seigt over geologisk tid, slik at litosfæreplatene kan gli oppå.",
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
    src: "/images/geo-midthavsrygg-hydrotermal-ren.jpg",
    alt: "3D-snitt av en midthavsrygg (mid-ocean ridge) med dekompresjonssmelting, magmakammer, putelava og svarte skorsteiner (black smokers)",
    heading: "Midthavsryggens anatomi: Dekompresjonssmelting og hydrotermale skorsteiner",
    caption:
      "Når to litosfæreplater trekkes fra hverandre i spredningsaksen, stiger astenosfærisk peridotitt opp uten å tape nevneverdig varme (adiabatisk). Trykkfallet utløser dekompresjonssmelting (10–20 % delvis smelte) som produserer basaltisk magma. På havbunnen størkner lavaen som putelava (pillow basalt), mens nedsivende sjøvann varmes opp til over 350 °C av underliggende gabbro-kamre og spyles ut som metallrike svarte skorsteiner (black smokers).",
    marks: [
      { x: 2, y: 14, text: "Midthavsrygg (mid-ocean ridge)", tone: "cold" },
      { x: 98, y: 16, n: "1", text: "Svart skorstein (black smoker)", tone: "warm", align: "right" },
      { x: 2, y: 38, n: "2", text: "Putelava (pillow basalt)", tone: "cold" },
      { x: 2, y: 56, text: "Ganger (sheeted dikes)", tone: "cold" },
      { x: 2, y: 74, n: "3", text: "Magmakammer", tone: "warm" },
      { x: 2, y: 90, n: "4", text: "Dekompresjonssmelting", tone: "warm" },
      { x: 98, y: 86, text: "Astenosfære", tone: "cold", align: "right" },
    ],
    points: [
      {
        n: "1",
        label:
          "Svarte skorsteiner (black smokers) spyr ut overopphetet, mineralrikt fluid som utfeller kobber-, jern- og sinksulfider.",
      },
      {
        n: "2",
        label:
          "Basaltisk putelava (pillow basalt) i aksedalen (axial valley) dannes når flytende basalt bråkjøles mot bunnvannet (2 °C) og danner glassaktige, avrundede puter.",
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
    src: "/images/geo-subduksjon-3d-ren.jpg",
    alt: "3D-snitt av en subduksjonssone med dyphavsgrop (trench), akkresjonskile, dehydrering, flukssmelting og vulkanbue (volcanic arc). Havbunnsskorpe 5–8 km.",
    heading: "Anatomi av en subduksjonssone: Dehydrering, flukssmelting og akkresjonskile",
    caption:
      "Når en oseanisk litosfæreplate presses ned i mantelen, varmes den opp og presses sammen. Mineraler som har tatt opp sjøvann på havbunnen (særlig serpentinitt og leirmineraler) dehydreres ved 80–150 km dyp og slipper overopphetet vann inn i overliggende mantelkile. Dette senker peridotittens smeltepunkt dramatisk (flukssmelting). Den oppstigende magmaen mater en eksplosiv vulkanbue, mens avskrapede sedimenter danner en mektig akkresjonskile foran dyphavsgropen.",
    marks: [
      { x: 2, y: 14, n: "1", text: "Dyphavsgrop (trench)", tone: "cold" },
      { x: 2, y: 32, n: "2", text: "Akkresjonskile", tone: "warm" },
      { x: 2, y: 50, text: "Havbunnsskorpe 5–8 km", tone: "cold" },
      { x: 2, y: 68, text: "Havbunnslitosfære", tone: "cold" },
      { x: 2, y: 86, text: "Astenosfære", tone: "cold" },
      { x: 98, y: 18, n: "5", text: "Vulkanbue (volcanic arc)", tone: "warm", align: "right" },
      { x: 98, y: 42, text: "Kontinentalskorpe 30–50 km", tone: "warm", align: "right" },
      { x: 98, y: 66, n: "4", text: "Flukssmelting", tone: "warm", align: "right" },
      { x: 98, y: 84, n: "3", text: "Dehydrering", tone: "cold", align: "right" },
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
    src: "/images/geo-ofiolitt-leka-ren.jpg",
    alt: "Ofiolittkompleks fra Leka: dyphavssediment, putelava (pillow lava), plateformede ganger (sheeted dikes), gabbro, Moho og mantelperidotitt",
    heading: "Norges geologiske nasjonalmonument: Leka ofiolittkompleks",
    caption:
      "På øya Leka i Trøndelag ligger et av verdens best bevarte ofiolittkomplekser (Furnes et al., 1988; NGU). Da Iapetushavet lukket seg for 420 millioner år siden under Den kaledonske fjellkjedefoldingen, ble et helt stykke havbunn vippet 90 grader på høykant og skjøvet opp på land. Her på Leka kan man gå tørrskodd fra jordens mantel (karakteristisk gulbrun dunitt og harzburgitt), krysse Moho-grensen til fots, og fortsette opp gjennom lagdelt gabbro, basaltganger og putelava!",
    marks: [
      { x: 2, y: 12, text: "Sediment og chert", tone: "warm" },
      { x: 2, y: 28, n: "4", text: "Putelava (pillow lava)", tone: "cold" },
      { x: 2, y: 44, text: "Ganger (sheeted dikes)", tone: "cold" },
      { x: 2, y: 60, n: "3", text: "Lagdelt gabbro", tone: "warm" },
      { x: 2, y: 74, n: "2", text: "Moho", tone: "cold" },
      { x: 2, y: 88, n: "1", text: "Mantel (peridotitt)", tone: "warm" },
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
    src: "/images/geo-wilsonsyklus-3d-ren.jpg",
    alt: "Wilsonsyklusens seks stadier, fra kontinental rifting til havspredning, subduksjon og kontinentkollisjon",
    heading: "Wilsonsyklusens 6 stadier: Superkontinentenes kretsløp i 3D",
    caption:
      "J. Tuzo Wilsons modell beskriver hvordan havbassenger fødes, utvides, lukkes og forsvinner i en syklus på 400–600 millioner år (Wilson, 1966). 1: Embryonisk stadium (kontinental riftdal, f.eks. Øst-Afrika). 2: Ungt stadium (smalt havbasseng med begynnende midthavsrygg, Rødehavet). 3: Modent stadium (vidt hav med passive marginer, Atlanterhavet). 4: Avtagende stadium (subduksjonssoner spiser opp havbunnen, Stillehavet). 5: Sluttstadium/terminalt (smalt, lukket hav med kollisjonsfronter, Middelhavet). 6: Suturstadium (kontinentkollisjon og høyfjellskjede, f.eks. Himalaya og oldtidens Kaledonider).",
    marks: [
      { x: 2, y: 14, text: "Midthavsrygg (mid-ocean ridge)", tone: "cold" },
      { x: 2, y: 70, n: "1", text: "Rifting", tone: "warm" },
      { x: 28, y: 70, text: "Ungt hav", tone: "cold" },
      { x: 54, y: 70, n: "2", text: "Modent hav", tone: "cold" },
      { x: 2, y: 88, n: "3", text: "Subduksjon", tone: "warm" },
      { x: 34, y: 88, text: "Lukking", tone: "warm" },
      { x: 62, y: 88, n: "4", text: "Kollisjon", tone: "warm" },
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
          "Avtagende stadium: Kald og tung litosfære begynner å subduere (subduction) langs havets render (Ildringen i Stillehavet).",
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
