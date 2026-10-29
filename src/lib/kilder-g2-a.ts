import type { Kilde } from "@/lib/kilder";

/**
 * Kilder til Geofag 2 pakke A (nye kapitler). Egen fil for å unngå konflikt med
 * kilder.ts og kilder-g2.ts. Bare offentlige kilder, med lenke der det finnes.
 */
const UDIR_A: Kilde = {
  prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
  italic: "Kjerneelementer — Geofag (GFG01-03)",
  suffix: ".",
  href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
};

const UDIR_B: Kilde = {
  prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
  italic: "Kompetansemål etter geofag 2",
  suffix: ".",
  href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973",
};

export const KILDER_G2_A = {
  energiRegning: [
    {
      prefix: "Energifakta Norge. (u.å.-a). ",
      italic: "Kraftproduksjon",
      suffix: ". Energidepartementet.",
      href: "https://energifaktanorge.no/norsk-energiforsyning/kraftforsyningen/",
    },
    {
      prefix: "Energifakta Norge. (u.å.-b). ",
      italic: "Kraftmarkedet",
      suffix: ". Energidepartementet.",
      href: "https://energifaktanorge.no/norsk-energiforsyning/kraftmarkedet/",
    },
    {
      prefix: "Equinor. (u.å.). ",
      italic: "Hywind Tampen",
      suffix: ".",
      href: "https://www.equinor.com/no/energi/hywind-tampen",
    },
    {
      prefix: "Sokkeldirektoratet. (2023, 18. desember). ",
      italic: "Omrekningsfaktorar",
      suffix: ".",
      href: "https://www.sodir.no/om-oss/bruk-av-innhold/omrekningsfaktorar/",
    },
    {
      prefix: "Solgrid. (u.å.). ",
      italic: "Furuseth solkraftverk",
      suffix: ".",
      href: "https://solgrid.no/prosjekt/furuseth-solkraftverk/",
    },
    {
      prefix: "Statnett. (u.å.). ",
      italic: "Derfor har vi budområder",
      suffix: ".",
      href: "https://www.statnett.no/forsta-strom-og-kraftsituasjonen/Derfor-har-vi-budomroder/",
    },
    {
      prefix: "Store norske leksikon. (u.å.-a). ",
      italic: "Brukstid",
      suffix: ".",
      href: "https://snl.no/brukstid",
    },
    {
      prefix: "Store norske leksikon. (u.å.-b). ",
      italic: "Kilowattime",
      suffix: ".",
      href: "https://snl.no/kilowattime",
    },
    {
      prefix: "Store norske leksikon. (u.å.-c). ",
      italic: "Vindkraft",
      suffix: ".",
      href: "https://snl.no/vindkraft",
    },
    UDIR_A,
    UDIR_B,
  ],
  klimaendringMenneskeskapt: [
    {
      prefix: "Bjerknessenteret. (u.å.). ",
      italic: "Det korte og det lange karbonkretsløpet",
      suffix: ".",
      href: "https://bjerknes.uib.no/aktuelt/det-korte-og-det-lange-karbonkretslopet",
    },
    {
      prefix: "Forster, P., Storelvmo, T., Armour, K., mfl. (2021). The Earth’s energy budget, climate feedbacks, and climate sensitivity. I ",
      italic: "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: " (kap. 7, s. 923–1054). Cambridge University Press.",
      href: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-7/",
    },
    {
      prefix: "Friedlingstein, P., O'Sullivan, M., Jones, M. W., mfl. (2026). Global Carbon Budget 2025. ",
      italic: "Earth System Science Data, 18",
      suffix: ", 3211–3288.",
      href: "https://doi.org/10.5194/essd-18-3211-2026",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021). ",
      italic: "Climate change 2021: The physical science basis. Summary for policymakers",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/chapter/summary-for-policymakers/",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2022). ",
      italic: "Climate change 2022: Mitigation of climate change. Summary for policymakers",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg3/chapter/summary-for-policymakers/",
    },
    {
      prefix: "Miljødirektoratet. (u.å.). ",
      italic: "Klimagassutslipp fra innsatsfordeling og EU ETS",
      suffix: ".",
      href: "https://www.miljodirektoratet.no/ansvarsomrader/klima/klimagasser-utslippstall-regnskap/norske-utslipp-og-opptak-av-klimagasser/Klimagassutslipp-fra-innsatsfordeling-og-eu-ets/",
    },
    {
      prefix: "Klimaloven. (2017). ",
      italic: "Lov om klimamål (LOV-2017-06-16-60)",
      suffix: ". Lovdata.",
      href: "https://lovdata.no/lov/2017-06-16-60",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration, Global Monitoring Laboratory [NOAA GML]. (2026). ",
      italic: "Trends in atmospheric carbon dioxide (CO₂)",
      suffix: ".",
      href: "https://gml.noaa.gov/ccgg/trends/",
    },
    {
      prefix: "Statistisk sentralbyrå [SSB]. (2026). ",
      italic: "Utslipp til luft",
      suffix: ".",
      href: "https://www.ssb.no/natur-og-miljo/forurensning-og-klima/statistikk/utslipp-til-luft",
    },
    {
      prefix: "Store norske leksikon [SNL]. (u.å.). ",
      italic: "Karbonkretsløpet",
      suffix: ".",
      href: "https://snl.no/karbonkretsl%C3%B8pet",
    },
    {
      prefix: "United Nations Framework Convention on Climate Change [UNFCCC]. (u.å.). ",
      italic: "The Paris Agreement",
      suffix: ".",
      href: "https://unfccc.int/process-and-meetings/the-paris-agreement",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 2",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973",
    },
  ],
  klimatiltak: [
    {
      prefix: "Equinor. (2025, 25. august). ",
      italic: "First CO₂ volumes stored at Northern Lights",
      suffix: ".",
      href: "https://www.equinor.com/news/20250825-first-co2-volumes-stored-at-northern-lights",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2022). ",
      italic: "Climate change 2022: Mitigation of climate change. Summary for policymakers",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg3/chapter/summary-for-policymakers/",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2023). ",
      italic: "Climate change 2023: Synthesis report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/syr/",
    },
    {
      prefix: "Miljødirektoratet. (u.å.). ",
      italic: "Klimagassutslipp fra innsatsfordeling og EU ETS",
      suffix: ".",
      href: "https://www.miljodirektoratet.no/ansvarsomrader/klima/klimagasser-utslippstall-regnskap/norske-utslipp-og-opptak-av-klimagasser/Klimagassutslipp-fra-innsatsfordeling-og-eu-ets/",
    },
    {
      prefix: "Statistisk sentralbyrå [SSB]. (2026). ",
      italic: "Utslipp til luft",
      suffix: ".",
      href: "https://www.ssb.no/natur-og-miljo/forurensning-og-klima/statistikk/utslipp-til-luft",
    },
    {
      prefix: "United Nations High Commissioner for Refugees [UNHCR]. (2023). ",
      italic: "Climate change and displacement: The myths and the facts",
      suffix: ".",
      href: "https://www.unhcr.org/news/stories/climate-change-and-displacement-myths-and-facts",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 2",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973",
    },
  ],
  klimaforskning: [
    {
      prefix: "Argo. (u.å.). ",
      italic: "About Argo",
      suffix: ".",
      href: "https://argo.ucsd.edu/about/",
    },
    {
      prefix: "European Space Agency [ESA]. (u.å.). ",
      italic: "The Sentinel missions",
      suffix: ".",
      href: "https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Overview4",
    },
    {
      prefix: "Hann, R. (2020, 19. oktober). ",
      italic: "Mapping glaciers with drones in Svalbard: This is how we actually do it",
      suffix: ". Universitetssenteret på Svalbard.",
      href: "https://www.unis.no/news/mapping-glaciers-with-drones-in-svalbard-this-is-how-we-actually-do-it/",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (u.å.-a). ",
      italic: "About the IPCC",
      suffix: ".",
      href: "https://www.ipcc.ch/about/",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (u.å.-b). ",
      italic: "Preparing reports",
      suffix: ".",
      href: "https://www.ipcc.ch/about/preparingreports/",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021). ",
      italic: "Climate change 2021: The physical science basis. Summary for policymakers",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/chapter/summary-for-policymakers/",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration, Global Monitoring Laboratory [NOAA GML]. (u.å.). ",
      italic: "Education: Stable isotopes",
      suffix: ".",
      href: "https://gml.noaa.gov/education/isotopes/c13tellsus.html",
    },
    {
      prefix: "Scripps Institution of Oceanography [Scripps]. (u.å.). ",
      italic: "The Keeling Curve",
      suffix: ".",
      href: "https://keelingcurve.ucsd.edu/",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 2",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973",
    },
  ],
  paleoklimaT2: [
    {
      prefix: "Cao, W., Williams, S., Flament, N., Zahirovic, S., Scotese, C., & Müller, R. D. (2019). Palaeolatitudinal distribution of lithologic indicators of climate in a palaeogeographic framework. ",
      italic: "Geological Magazine, 156",
      suffix: "(2), 331–354.",
      href: "https://doi.org/10.1017/s0016756818000110",
    },
    {
      prefix: "Judd, E. J., Tierney, J. E., Lunt, D. J., mfl. (2024). A 485-million-year history of Earth’s surface temperature. ",
      italic: "Science, 385",
      suffix: "(6715), eadk3705.",
      href: "https://doi.org/10.1126/science.adk3705",
    },
    {
      prefix: "Manum, S. B., Eide, C. H., Rosvold, K., & Hofstad, K. (2026, 3. juni). Kull. I ",
      italic: "Store norske leksikon",
      suffix: ".",
      href: "https://snl.no/kull",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration, National Centers for Environmental Information [NOAA NCEI]. (u.å.). ",
      italic: "Speleothem",
      suffix: ".",
      href: "https://www.ncei.noaa.gov/products/paleoclimatology/speleothem",
    },
    {
      prefix: "Nehme, C., & Deininger, M. (2017, 5. september). What speleothems can tell about the past climates! I ",
      italic: "Climate: Past, Present & Future (EGU)",
      suffix: ".",
      href: "https://blogs.egu.eu/divisions/cl/2017/09/05/what-speleothems-can-tell-about-the-past-climates/",
    },
    {
      prefix: "Rüther, D. C. (2026, 17. april). Tillitt. I ",
      italic: "Store norske leksikon",
      suffix: ".",
      href: "https://snl.no/tillitt",
    },
    {
      prefix: "Selbekk, R. S. (2025, 24. februar). Evaporitter. I ",
      italic: "Store norske leksikon",
      suffix: ".",
      href: "https://snl.no/evaporitter",
    },
    {
      prefix: "Wendt, K. A., Li, X., & Edwards, R. L. (2021). Uranium–thorium dating of speleothems. ",
      italic: "Elements, 17",
      suffix: "(2), 87–92.",
      href: "https://doi.org/10.2138/gselements.17.2.87",
    },
  ],
} satisfies Record<string, Kilde[]>;

/** Slår sammen kildelister og sorterer alfabetisk (APA), uten duplikater. */
export function slaaSammenKilder(...lister: readonly (readonly Kilde[])[]): Kilde[] {
  const sett = new Map<string, Kilde>();
  for (const liste of lister) {
    for (const k of liste) sett.set(`${k.prefix}${k.italic ?? ""}${k.suffix ?? ""}`, k);
  }
  return [...sett.values()].sort((a, b) => a.prefix.localeCompare(b.prefix, "nb"));
}
