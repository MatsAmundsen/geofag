/**
 * ALL fagtekst i modellen «Jetstrømmer og atmosfæriske elver» (/tema/jetstrommer — tidligere /tema/klima/jetstrommer-atmosfaeriske-elver).
 * Grunnlag: GeoBOT2, /workspace/jet-ar-modell/grunnlag.md. GeoBOT2 kontrollerer denne fila før merge.
 *
 * Regler: relative formuleringer («oftere», «ofte», «enn normalt»), ingen tall uten kilde,
 * ingen [USIKKER]-punkter, ingen forfatternavn eller uverifiserte kilder i teksten.
 * Genererte setninger i diagnose.ts (sted, temperatur, nedbør, bølgefart) er modellberegninger,
 * ikke fagpåstander; klimadelen av dem hentes herfra (CLIMATE_NOTE).
 */

/** Ingress på siden (route-fila). */
export const PAGE_LEAD =
  "En interaktiv undervisningsmodell av polarjeten og den subtropiske jeten på begge halvkuler, Rossby-bølger og atmosfæriske elver. Still ENSO og IOD og se hvordan jetstrømmen, nedbøren og fukttransporten ofte endres. Modellen er forenklet og viser sjanser, ikke en prognose.";

export const MODEL_DISCLAIMER =
  "Dette er en undervisningsmodell, ikke en prognose. Den viser hvordan sjansen for et vær endres, ikke hva som skjer i en bestemt vinter. Koordinater og styrker er skjematiske.";

/* ---------- Glidere ---------- */

export const SLIDER_TEXT = {
  ensoLabel: "ENSO (ONI)",
  ensoAria: "ENSO-fase, ONI",
  ensoTicks: ["La Niña", "nøytral", "El Niño"],
  iodLabel: "IOD (DMI)",
  iodAria: "IOD-fase, DMI",
  iodTicks: ["negativ IOD", "nøytral", "positiv IOD"],
  ensoScale:
    "ONI er havtemperaturavviket i det sentrale og østlige ekvatoriale Stillehavet (Niño 3.4-området). El Niño fra +0,5, La Niña fra −0,5, nøytral mellom. Effekten øker gradvis jo lenger fra null.",
  iodScale:
    "DMI er forskjellen i havtemperatur mellom vestlige og østlige tropiske Indiahav. Positiv fra +0,4, negativ fra −0,4, nøytral mellom. Effekten øker gradvis.",
  iodDjfNote:
    "Desember–februar: IOD-hendelser er vanligvis over i november–desember, så IOD har lite eller ingen effekt i modellen nå.",
} as const;

/* ---------- Kjente mønstre ---------- */

export type PatternId = "neutral" | "nino" | "nina" | "iodPos" | "iodNeg";

export type Pattern = {
  id: PatternId;
  label: string;
  oni: number;
  dmi: number;
  /** Måned som settes (0 = januar). null = behold. DJF → januar, SON → oktober. */
  month: number | null;
  tone: "warm" | "cool" | "neutral";
};

export const PATTERNS: Pattern[] = [
  { id: "neutral", label: "Nøytral", oni: 0, dmi: 0, month: null, tone: "neutral" },
  { id: "nino", label: "El Niño", oni: 1.5, dmi: 0, month: 0, tone: "warm" },
  { id: "nina", label: "La Niña", oni: -1.5, dmi: 0, month: 0, tone: "cool" },
  { id: "iodPos", label: "Positiv IOD", oni: 0, dmi: 1, month: 9, tone: "warm" },
  { id: "iodNeg", label: "Negativ IOD", oni: 0, dmi: -1, month: 9, tone: "cool" },
];

export const PATTERN_TEXT: Record<PatternId | "custom", { title: string; body: string }> = {
  neutral: {
    title: "Nøytral",
    body: "Verken ENSO eller IOD er utenfor tersklene. Jetstrømmene og fuktpilene følger årstiden uten ekstra forskyvning fra Stillehavet eller Indiahavet.",
  },
  nino: {
    title: "El Niño (desember–februar)",
    body: "Havet i det østlige og sentrale ekvatoriale Stillehavet er varmere enn normalt, og passatvinden er svakere. Stillehavsjeten strekker seg lenger øst og ligger lenger sør, slik at lavtrykk oftere når den sørlige delen av USA. Indonesia og Nord-Australia blir ofte tørrere enn normalt.",
  },
  nina: {
    title: "La Niña (desember–februar)",
    body: "Havet i det østlige og sentrale ekvatoriale Stillehavet er kaldere enn normalt, og passatvinden er sterkere. Stillehavsjeten trekker seg vestover og bukter seg mot nord, og sørvest i USA blir det ofte tørrere enn normalt. Indonesia og store deler av Australia, særlig i nord og øst, får ofte mer regn enn normalt.",
  },
  iodPos: {
    title: "Positiv IOD (september–november)",
    body: "Vestavinden langs ekvator i Indiahavet svekkes, og kaldt vann stiger opp utenfor Sumatra og Java. Øst-Afrika får ofte mer regn enn normalt i den korte regntiden. Indonesia og Sør-Australia får ofte mindre regn enn normalt.",
  },
  iodNeg: {
    title: "Negativ IOD (september–november)",
    body: "Varmt vann samler seg nær Indonesia og Nordvest-Australia. Det gir mer fukt til værsystemene, og Sør-Australia får ofte mer regn enn normalt om vinteren og våren på sørlig halvkule. Øst-Afrika får ofte mindre regn enn normalt.",
  },
  custom: {
    title: "Egen kombinasjon",
    body: "Positiv IOD opptrer ofte sammen med El Niño, men ikke alltid. Når begge står ute, kan virkningene over Australia og Indonesia forsterke hverandre. Ingen hendelse er lik en annen, så kartet viser sjanser, ikke fasit.",
  },
};

/* ---------- Sammendrag og stedstekst (diagnose.ts) ---------- */

export const CLIMATE_SUMMARY = {
  nino: "El Niño: varmere enn normalt i det østlige og sentrale ekvatoriale Stillehavet. Stillehavsjeten strekker seg lenger øst og ligger lenger sør, og lavtrykk når oftere den sørlige delen av USA. Indonesia og Nord-Australia blir ofte tørrere enn normalt. Virkningen er størst om vinteren på nordlig halvkule.",
  nina: "La Niña: kaldere enn normalt i det østlige og sentrale ekvatoriale Stillehavet. Stillehavsjeten trekker seg vestover og bukter seg mot nord, og sørvest i USA blir det ofte tørrere enn normalt. Indonesia og store deler av Australia, særlig i nord og øst, får ofte mer regn enn normalt.",
  iodPositive:
    "Positiv IOD: varmere enn normalt i det vestlige Indiahavet og kaldere i det østlige. Øst-Afrika får ofte mer regn i den korte regntiden, Indonesia og Sør-Australia ofte mindre. Lavtrykksbanen over Sør-Australia forskyves litt.",
  iodNegative:
    "Negativ IOD: varmt vann samler seg nær Indonesia og Nordvest-Australia. Sør-Australia får ofte mer regn enn normalt om vinteren og våren på sørlig halvkule, Øst-Afrika ofte mindre. Lavtrykksbanen over Sør-Australia forskyves litt.",
  neutral: "ENSO og IOD er nøytrale. Havet følger årstiden, uten ekstra El Niño, La Niña eller dipol i Indiahavet.",
  iodOffSeason: "IOD har lite å si nå, fordi hendelsene vanligvis er over i november–desember.",
} as const;

export const CLIMATE_NOTE = {
  warmer: (name: string) => `${name} gjør stedet ofte varmere enn normalt.`,
  colder: (name: string) => `${name} gjør stedet ofte kjøligere enn normalt.`,
  wetter: "Det samme mønsteret gir ofte mer nedbør enn normalt her.",
  drier: "Det samme mønsteret gir ofte mindre nedbør enn normalt her.",
} as const;

/** Stedsforklaring i «Dette stedet» (diagnose.ts). Relativ, uten tall. */
export const STORY = {
  where: (cardinal: string, side: string) => `Polarjeten går ${cardinal} for stedet, så du er ${side}.`,
  colder: "Det er kaldere enn med en rett jetstrøm denne måneden. Kaldluften er skjøvet mot ekvator.",
  milder: "Det er mildere enn med en rett jetstrøm denne måneden. Varmluften når lenger mot polen.",
  near: "Temperaturen ligger nær det en rett, klimatologisk jetstrøm ville gitt denne måneden.",
  block: " Bølgen er lang og nesten stående, så ryggen kan bli en blokkering: det samme været blir ofte liggende.",
  hill: (range: string) => ` Vinden står på mot ${range}, og fjellene presser fuktig luft opp. Det gir oftere mer nedbør.`,
  meet: " Polarjeten og den subtropiske jetstrømmen ligger nær hverandre her. Jeten styrer lavtrykkene; selve regnet kommer av løft i lavtrykk og fronter.",
  plume: " En atmosfærisk elv treffer stedet: en smal korridor med fuktig luft foran en kaldfront. Der den møter kystfjell, blir nedbøren ofte kraftig.",
} as const;

/* ---------- Relative skalaer (ingen absolutte tall med enheter i modellen) ---------- */

export type RelLevel = { label: string; step: number; steps: number; tone: "cold" | "warm" | "neutral" | "wet" | "dry" | "wind" };

/** Temperatur mot en rett, klimatologisk jetstrøm samme måned (modellens «normal»). */
export function tempLevel(anomaly: number): RelLevel {
  const steps = 5;
  if (anomaly <= -6) return { label: "mye kaldere enn normalt", step: 0, steps, tone: "cold" };
  if (anomaly <= -2) return { label: "kaldere enn normalt", step: 1, steps, tone: "cold" };
  if (anomaly < 2) return { label: "nær normalt", step: 2, steps, tone: "neutral" };
  if (anomaly < 6) return { label: "mildere enn normalt", step: 3, steps, tone: "warm" };
  return { label: "mye mildere enn normalt", step: 4, steps, tone: "warm" };
}

/** Nedbør mot samme sted med rett jetstrøm og nøytral ENSO/IOD. */
export function rainLevel(precip: number, normal: number): RelLevel {
  const steps = 3;
  const diff = precip - normal;
  const rel = diff / Math.max(1.5, normal);
  if (rel > 0.3 && diff > 0.8) return { label: "mer nedbør enn normalt", step: 2, steps, tone: "wet" };
  if (rel < -0.3 && diff < -0.8) return { label: "mindre nedbør enn normalt", step: 0, steps, tone: "dry" };
  return { label: "nedbør som normalt", step: 1, steps, tone: "neutral" };
}

/** Vind nær bakken eller i jetkjernen, relativt. */
export function windLevel(speed: number, where: "bakke" | "jet"): RelLevel {
  const steps = 3;
  const [weak, strong] = where === "bakke" ? [4, 9] : [30, 50];
  if (speed < weak) return { label: "svak", step: 0, steps, tone: "wind" };
  if (speed < strong) return { label: "middels", step: 1, steps, tone: "wind" };
  return { label: "sterk", step: 2, steps, tone: "wind" };
}

export const WIND_TEXT = {
  surface: (from: string, level: string) => `${from.charAt(0).toUpperCase()}${from.slice(1)}lig vind, ${level} nær bakken.`,
  jet: (name: string, level: string) => ` ${name.charAt(0).toUpperCase()}${name.slice(1)} over deg er ${level}.`,
  jetCore: (level: string) => `Jetkjernen: ${level} vind`,
} as const;

export const PHASE_TEXT = {
  still: "Bølgemønsteret står nesten stille, og været låser seg lett.",
  moving: (way: string, level: string) =>
    `Bølgemønsteret driver ${way}, ${level === "sterk" ? "raskt" : level === "middels" ? "moderat" : "sakte"}. Lange bølger driver saktere enn korte.`,
  nearest: (level: string) => `Nærmeste jetstrøm ligger ${level} unna`,
  near: "nær",
  far: "langt",
  rainMeet: "mer nedbør enn når den våteste av dem ligger alene over stedet",
  rainSame: "nedbøren omtrent som når den våteste av dem ligger alene over stedet",
} as const;

/* ---------- Fuktpiler og legende ---------- */

export const FLOW_TEXT = {
  california: { name: "Atmosfærisk elv mot California", short: "AR mot California" },
  australia: { name: "Atmosfærisk elv i nordvestlig skybånd over Australia", short: "AR over Australia" },
  sumatra: { name: "Fuktig luft fra havet / monsunstrøm mot Sumatra og Indonesia", short: "Monsunstrøm" },
  ostAfrika: { name: "Fuktig luft fra havet mot Øst-Afrika (oktober–desember)", short: "Fuktig luft fra havet" },
} as const;

export const LEGEND_TEXT = {
  polar: "Polarjet",
  sub: "Subtropisk jet",
  ar: "Atmosfærisk elv",
  tropical: "Fuktig luft fra havet / monsunstrøm",
} as const;

/** Eksempler på jetbaner (presets.ts). */
export const JET_PRESET_BLURB: Record<string, string> = {
  "vinter": "Eksempel: januar med fem bølger. Polarjeten og den subtropiske jetstrømmen ligger nær hverandre i trågene.",
  "rett": "Sonal vinter. Fronten ligger jevnt, og lavtrykkene går raskt østover.",
  "nao-pluss": "Sterk, nordlig atlanterhavsjet. Ofte mildere og våtere enn normalt i Norge og på De britiske øyer.",
  "nao-minus": "Rygg ved Grønland, tråg ned mot Middelhavet. Ofte kaldere enn normalt i Nord-Europa.",
  "usa": "Dypt tråg over det østlige Nord-Amerika. Mild rygg i vest.",
  "juli": "Polarjeten ligger langt nord og er svak. Den subtropiske jetstrømmen i nord er svak og ligger lenger nord enn om vinteren.",
  "sor": "Juli sør for ekvator. Sterk og ganske rett polarjet rundt Sørishavet.",
};

/* ---------- Forklaringer i sidepanelet ---------- */

export const EXPLAIN = {
  whyTitle: "Hvorfor den bølger",
  why: [
    "Solen varmer ekvator mer enn polene. Varm luft er tykkere, så trykkflatene heller. Corioliskraften bøyer høydevinden til den blir vestlig. Skiftet er sterkest der temperaturen faller raskest, langs polarfronten, og det summerer seg opp mot tropopausen. Det er jetstrømmen.",
    "En luftpakke som skyves mot polen møter mer av jordens egen virvling. For å bevare den totale virvlingen må den spinne motsatt vei, og svinger tilbake mot ekvator. Det blir en Rossby-bølge. Temperaturkontrasten gir energi, så bølgene vokser lett, og en rett jet holder sjelden lenge.",
    "Fasefarten er c = U − β/k², der U er vestavinden, β er hvor raskt jordens virvling øker mot nord, og k er bølgetallet. Lange bølger kan stå stille. Korte bølger beveger seg østover med vinden. Derfor gir få, dype svinger oftere blokkering, mens en rett jet sender lavtrykkene raskere videre. Regnet kommer av løft i lavtrykk og fronter, av konveksjon og av fjell. Jeten styrer hvor lavtrykkene går, den lager ikke regnet selv.",
  ],
  arTitle: "Atmosfæriske elver",
  ar: [
    "En atmosfærisk elv er en lang og smal korridor med sterk transport av vanndamp. Den henger typisk sammen med en lavtliggende jet foran kaldfronten i et lavtrykk på midlere bredder. På kartet er den et smalt, fiolett bånd med stiplet kant.",
    "Ikke all fukttransport er en atmosfærisk elv. Fuktig luft fra havet mot Indonesia, Sumatra og Øst-Afrika er tropisk konveksjon og vind nær bakken, uten front. Den vises som brede, korte grønne piler.",
    "Mot California gir El Niño ofte et treffpunkt litt lenger sør, men atmosfæriske elver kommer også i La Niña-år. Våte La Niña-år og tørre El Niño-år forekommer.",
  ],
  sectionTitle: "Høydesnitt",
  jetPresetsTitle: "Eksempler på jetbaner",
  mapAria:
    "Verdenskart med jetstrømmer, fuktpiler og faste steder. Trykk et nummerert sted for zoomet vær, eller dra punktene på jetstrømmen for å endre banen.",
} as const;
