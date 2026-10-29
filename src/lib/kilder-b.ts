import type { Kilde } from "@/lib/kilder";

/**
 * Kilder for Pakke B (nye kapitler og tillegg i eksisterende kapitler).
 * Holdt i egen fil, slik at endringene er små og lette å flette med resten av kildelistene.
 */

const UDIR_A: Kilde = {
  prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
  italic: "Kjerneelementer",
  suffix: ".",
  href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
};

const UDIR_B: Kilde = {
  prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
  italic: "Kompetansemål etter geofag 2",
  suffix: ".",
  href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973",
};

function kildeNokkel(k: Kilde): [string, string, string] {
  const i = k.prefix.search(/\s\((?:u\.å\.|\d{4})/);
  const forfatter = i === -1 ? k.prefix : k.prefix.slice(0, i);
  const rest = i === -1 ? "" : k.prefix.slice(i);
  // APA: verk uten årstall kommer før verk med årstall fra samme forfatter.
  return [forfatter, rest.startsWith(" (u.å.") ? `0${rest}` : `1${rest}`, k.italic];
}

function sammenlign(a: Kilde, b: Kilde): number {
  const x = kildeNokkel(a);
  const y = kildeNokkel(b);
  for (let n = 0; n < 3; n++) {
    const c = x[n]!.localeCompare(y[n]!, "nb");
    if (c !== 0) return c;
  }
  return 0;
}

/**
 * Legger nye kilder inn i en eksisterende liste uten å røre rekkefølgen på de gamle.
 * Hver ny kilde settes foran den første gamle kilden som kommer etter den alfabetisk
 * (forfatter, så u.å. før årstall, så årstall). Udir står sist, som i de andre listene.
 */
export function medKilder(basis: readonly Kilde[], tillegg: readonly Kilde[]): Kilde[] {
  const finnes = new Set(basis.map((k) => `${k.prefix}${k.italic}`));
  const ut = [...basis];
  for (const k of tillegg.filter((t) => !finnes.has(`${t.prefix}${t.italic}`))) {
    const i = ut.findIndex((o) => sammenlign(k, o) < 0);
    ut.splice(i === -1 ? ut.length : i, 0, k);
  }
  return ut;
}

/** Kilder per nytt kapittel. */
export const KILDER_B = {
  skyer: [
    {
      prefix: "Beck, H. E., Zimmermann, N. E., McVicar, T. R., Vergopolan, N., Berg, A., & Wood, E. F. (2018). ",
      italic: "Present and future Köppen-Geiger climate classification maps at 1-km resolution",
      suffix: ". Scientific Data, 5, Artikkel 180214.",
      href: "https://doi.org/10.1038/sdata.2018.214",
    },
    {
      prefix: "Dannevig, P., & Harstveit, K. (2026, 12. juni). ",
      italic: "Klima i Norge",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/Klima_i_Norge",
    },
    {
      prefix: "Dannevig, P., Holm, A. K., & Sivle, A. D. (2026, 30. mai). ",
      italic: "Nedbør",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/nedbør",
    },
    {
      prefix: "Harstveit, K. (2024, 26. november). ",
      italic: "Kystklima",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/kystklima",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021a). ",
      italic: "FAQ 7.2: What is the role of clouds in a warming climate?",
      suffix: " I Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change (kap. 7). Cambridge University Press.",
      href: "https://www.ipcc.ch/report/ar6/wg1/downloads/faqs/IPCC_AR6_WGI_FAQ_Chapter_07.pdf",
    },
    {
      prefix: "Korkou, M., & Gray, A. M. (2026). ",
      italic: "Urbane varmeøyer i Oslo: Kartlegging og prioritering av tiltaksområder",
      suffix: " (NINA Rapport 2763). Norsk institutt for naturforskning.",
      href: "https://www.klimaoslo.no/wp-content/uploads/sites/2/2026/04/NINA-rapport_Urbane-varmeoyer-i-Oslo.pdf",
    },
    {
      prefix: "Mamen, J. (2025, 18. november). ",
      italic: "Klimasoner",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/klimasoner",
    },
    {
      prefix: "Meteorologisk institutt [MET]. (2021, 1. mars). ",
      italic: "Köppen main climate zones Norway 91-2020 -3C isoterm",
      suffix: " [Kart]. Wikimedia Commons. Lisens: CC BY 3.0.",
      href: "https://commons.wikimedia.org/wiki/File:K%C3%B6ppen_main_climate_zones_Norway_91-2020_-3C_isoterm.png",
    },
    {
      prefix: "Meteorologisk institutt [MET]. (2026, 8. oktober). ",
      italic: "Orografisk nedbør",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/orografisk_nedbør",
    },
    {
      prefix: "Pedersen, B. (2025, 22. februar). ",
      italic: "Kondensasjonskjerner",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/kondensasjonskjerner",
    },
    {
      prefix: "Romps, D. M. (2017). ",
      italic: "Exact expression for the lifting condensation level",
      suffix: ". Journal of the Atmospheric Sciences, 74(12), 3891–3900.",
      href: "https://doi.org/10.1175/JAS-D-17-0102.1",
    },
    {
      prefix: "Samuelsen, E. (2025, 22. februar). ",
      italic: "Relativ fuktighet",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/relativ_fuktighet",
    },
    {
      prefix: "Store norske leksikon. (2024, 25. november). ",
      italic: "Duggpunkt",
      suffix: ".",
      href: "https://snl.no/duggpunkt",
    },
    {
      prefix: "Store norske leksikon. (2025, 22. februar). ",
      italic: "Kontinentalt klima",
      suffix: ".",
      href: "https://snl.no/kontinentalt_klima",
    },
    {
      prefix: "Tveito, O. E. (2021). ",
      italic: "Norwegian standard climate normals 1991–2020: The methodological approach",
      suffix: " (METreport nr. 05/2021). Meteorologisk institutt.",
      href: "https://www.met.no/vaer-og-klima/ny-normal-i-klimaforskningen",
    },
    UDIR_A,
    UDIR_B,
    {
      prefix: "Velle, M., & Gjelten, H. M. (2024, 26. november). ",
      italic: "Skyer",
      suffix: ". Store norske leksikon.",
      href: "https://snl.no/skyer",
    },
  ] satisfies Kilde[],
  naturlige: [
    {
      prefix: "Edwards, E. J., Osborne, C. P., Strömberg, C. A. E., Smith, S. A., C4 Grasses Consortium, Bond, W. J., Christin, P.-A., Cousins, A. B., Duvall, M. R., Fox, D. L., Freckleton, R. P., Ghannoum, O., Hartwell, J., Huang, Y., Janis, C. M., Keeley, J. E., Kellogg, E. A., Knapp, A. K., Leakey, A. D. B., … Tipple, B. (2010). The origins of C4 grasslands: Integrating evolutionary and ecosystem science. ",
      italic: "Science, 328",
      suffix: "(5978), 587–591.",
      href: "https://doi.org/10.1126/science.1177216",
    },
    {
      prefix: "Feulner, G. (2017). Formation of most of our coal brought Earth close to global glaciation. ",
      italic: "Proceedings of the National Academy of Sciences, 114",
      suffix: "(43), 11333–11337.",
      href: "https://doi.org/10.1073/pnas.1712062114",
    },
    {
      prefix: "Gulev, S. K., Thorne, P. W., Ahn, J., Dentener, F. J., Domingues, C. M., Gerland, S., Gong, D., Kaufman, D. S., Nnamchi, H. C., Quaas, J., Rivera, J. A., Sathyendranath, S., Smith, S. L., Trewin, B., von Schuckmann, K., & Vose, R. S. (2021). Changing state of the climate system. I V. Masson-Delmotte, P. Zhai, A. Pirani, S. L. Connors, C. Péan, S. Berger, … B. Zhou (Red.), ",
      italic: "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change",
      suffix: " (s. 287–422). Cambridge University Press.",
      href: "https://doi.org/10.1017/9781009157896.004",
    },
    {
      prefix: "Hutchinson, D. K., Coxall, H. K., Lunt, D. J., Steinthorsdottir, M., de Boer, A. M., Baatsen, M., von der Heydt, A., Huber, M., Kennedy-Asser, A. T., Kunzmann, L., Ladant, J.-B., Lear, C. H., Moraweck, K., Pearson, P. N., Piga, E., Pound, M. J., Salzmann, U., Scher, H. D., Sijp, W. P., … Zhang, Z. (2021). The Eocene–Oligocene transition: A review of marine and terrestrial proxy data, models and model–data comparisons. ",
      italic: "Climate of the Past, 17",
      suffix: "(1), 269–315.",
      href: "https://doi.org/10.5194/cp-17-269-2021",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021). Summary for policymakers. I V. Masson-Delmotte, P. Zhai, A. Pirani, S. L. Connors, C. Péan, S. Berger, … B. Zhou (Red.), ",
      italic: "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change",
      suffix: " (s. 3–32). Cambridge University Press.",
      href: "https://doi.org/10.1017/9781009157896.001",
    },
    {
      prefix: "Lindsey, R. (2025, 27. juni). ",
      italic: "Climate change: Incoming sunlight",
      suffix: ". NOAA Climate.gov.",
      href: "https://www.climate.gov/news-features/understanding-climate/climate-change-incoming-sunlight",
    },
    {
      prefix: "Lyons, T. W., Reinhard, C. T., & Planavsky, N. J. (2014). The rise of oxygen in Earth’s early ocean and atmosphere. ",
      italic: "Nature, 506",
      suffix: "(7488), 307–315.",
      href: "https://doi.org/10.1038/nature13068",
    },
    {
      prefix: "Matthews, J. B. R., Möller, V., van Diemen, R., Fuglestvedt, J. S., Masson-Delmotte, V., Méndez, C., Semenov, S., & Reisinger, A. (Red.). (2021). Annex VII: Glossary. I V. Masson-Delmotte, P. Zhai, A. Pirani, S. L. Connors, C. Péan, S. Berger, … B. Zhou (Red.), ",
      italic: "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change",
      suffix: " (s. 2215–2256). Cambridge University Press.",
      href: "https://doi.org/10.1017/9781009157896.022",
    },
    {
      prefix: "O’Dea, A., Lessios, H. A., Coates, A. G., Eytan, R. I., Restrepo-Moreno, S. A., Cione, A. L., Collins, L. S., de Queiroz, A., Farris, D. W., Norris, R. D., Stallard, R. F., Woodburne, M. O., Aguilera, O., Aubry, M.-P., Berggren, W. A., Budd, A. F., Cozzuol, M. A., Coppard, S. E., Duque-Caro, H., … Jackson, J. B. C. (2016). Formation of the Isthmus of Panama. ",
      italic: "Science Advances, 2",
      suffix: "(8), Artikkel e1600883.",
      href: "https://doi.org/10.1126/sciadv.1600883",
    },
    {
      prefix: "Owens, M. J., Lockwood, M., Hawkins, E., Usoskin, I., Jones, G. S., Barnard, L., Schurer, A., & Fasullo, J. (2017). The Maunder minimum and the Little Ice Age: An update from recent reconstructions and climate simulations. ",
      italic: "Journal of Space Weather and Space Climate, 7",
      suffix: ", Artikkel A33.",
      href: "https://doi.org/10.1051/swsc/2017034",
    },
    {
      prefix: "Raymo, M. E., & Ruddiman, W. F. (1992). Tectonic forcing of late Cenozoic climate. ",
      italic: "Nature, 359",
      suffix: "(6391), 117–122.",
      href: "https://doi.org/10.1038/359117a0",
    },
    {
      prefix: "Royal Observatory of Belgium. (u.å.). ",
      italic: "SILSO: Sunspot Index and Long-term Solar Observations. Data files",
      suffix: ".",
      href: "https://www.sidc.be/SILSO/datafiles",
    },
    UDIR_A,
    UDIR_B,
  ] satisfies Kilde[],
};

/** Tillegg til eksisterende kildelister. Slås sammen med `medKilder` i rutene. */
export const KILDER_B_TILLEGG = {
  oversikt: [
    {
      prefix:
        "Matthews, J. B. R., Möller, V., van Diemen, R., Fuglestvedt, J. S., Masson-Delmotte, V., Méndez, C., Semenov, S., & Reisinger, A. (Red.). (2021). Annex VII: Glossary. I V. Masson-Delmotte, P. Zhai, A. Pirani, S. L. Connors, C. Péan, S. Berger, … B. Zhou (Red.), ",
      italic: "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change",
      suffix: " (s. 2215–2256). Cambridge University Press.",
      href: "https://doi.org/10.1017/9781009157896.022",
    },
    {
      prefix: "Norsk klimaservicesenter. (2025). ",
      italic: "Oppsummeringer fra Klima i Norge 2025",
      suffix: ".",
      href: "https://klimaservicesenter.no/kss/rapporter/klima-i-norge-2025/oppsummeringer-fra-klima-i-norge-2025",
    },
  ],
  tilpasning: [
    {
      prefix:
        "Möller, V., van Diemen, R., Matthews, J. B. R., Méndez, C., Semenov, S., Fuglestvedt, J. S., & Reisinger, A. (Red.). (2022). Annex II: Glossary. I H.-O. Pörtner, D. C. Roberts, M. Tignor, E. S. Poloczanska, K. Mintenbeck, A. Alegría, M. Craig, S. Langsdorf, S. Löschke, V. Möller, A. Okem, & B. Rama (Red.), ",
      italic: "Climate change 2022: Impacts, adaptation and vulnerability. Contribution of Working Group II to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change",
      suffix: " (s. 2897–2930). Cambridge University Press.",
      href: "https://doi.org/10.1017/9781009325844.029",
    },
  ],
  vaerkatastrofer: [
    {
      prefix: "Det Norske Akademis ordbok. (u.å.). ",
      italic: "Kuldebølge",
      suffix: ".",
      href: "https://naob.no/ordbok/kuldeb%C3%B8lge",
    },
    {
      prefix: "Gjelten, H. M., Halleraker, J. H., & Mamen, J. (2024, 27. november). Tørke. I ",
      italic: "Store norske leksikon",
      suffix: ".",
      href: "https://snl.no/t%C3%B8rke",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021b). Summary for policymakers. I V. Masson-Delmotte, P. Zhai, A. Pirani, S. L. Connors, C. Péan, S. Berger, … B. Zhou (Red.), ",
      italic: "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change",
      suffix: " (s. 3–32). Cambridge University Press.",
      href: "https://doi.org/10.1017/9781009157896.001",
    },
    {
      prefix:
        "Matthews, J. B. R., Möller, V., van Diemen, R., Fuglestvedt, J. S., Masson-Delmotte, V., Méndez, C., Semenov, S., & Reisinger, A. (Red.). (2021). Annex VII: Glossary. I V. Masson-Delmotte, P. Zhai, A. Pirani, S. L. Connors, C. Péan, S. Berger, … B. Zhou (Red.), ",
      italic: "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change",
      suffix: " (s. 2215–2256). Cambridge University Press.",
      href: "https://doi.org/10.1017/9781009157896.022",
    },
    {
      prefix: "Meteorologisk institutt. (u.å.-a). ",
      italic: "Hva er en hetebølge?",
      suffix: ".",
      href: "https://www.met.no/vaer-og-klima/ekstremvaervarsler-og-andre-farevarsler/vaerfenomener-som-kan-gi-farevarsel-fra-met/hetebolger",
    },
    {
      prefix: "Meteorologisk institutt. (u.å.-c). ",
      italic: "Regn",
      suffix: ".",
      href: "https://www.met.no/vaer-og-klima/ekstremvaervarsler-og-andre-farevarsler/vaerfenomener-som-kan-gi-farevarsel-fra-met/farevarsel-for-nedbor",
    },
    {
      prefix: "Meteorologisk institutt. (u.å.-d). ",
      italic: "Styrtregn",
      suffix: ".",
      href: "https://www.met.no/vaer-og-klima/ekstremvaervarsler-og-andre-farevarsler/vaerfenomener-som-kan-gi-farevarsel-fra-met/styrtregn",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat. (2019, 11. januar). ",
      italic: "Tørke- og flomåret 2018",
      suffix: ".",
      href: "https://www.nve.no/nytt-fra-nve/nyheter-hydrologi/torke-og-flomaret-2018/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat. (u.å.). ",
      italic: "Tørke",
      suffix: ".",
      href: "https://www.nve.no/naturfare/laer-om-naturfare/toerke/",
    },
    {
      prefix: "Norsk klimaservicesenter. (2025). ",
      italic: "Oppsummeringer fra Klima i Norge 2025",
      suffix: ".",
      href: "https://klimaservicesenter.no/kss/rapporter/klima-i-norge-2025/oppsummeringer-fra-klima-i-norge-2025",
    },
    {
      prefix: "Sagen, S., & Sivle, A. D. (2023, 8. juni). Hetebølge. I ",
      italic: "Store norske leksikon",
      suffix: ".",
      href: "https://snl.no/hetebølge",
    },
    {
      prefix: "Store norske leksikon. (u.å.-i). ",
      italic: "Omegablokkering",
      suffix: ".",
      href: "https://snl.no/omegablokkering",
    },
    {
      prefix: "Tsopouridis, L., & Sivle, A. D. (2025, 30. september). Blokkerende høytrykk. I ",
      italic: "Store norske leksikon",
      suffix: ".",
      href: "https://snl.no/blokkerende_h%C3%B8ytrykk",
    },
  ],
  havstrommer: [
    {
      prefix: "Barthel, K. (2024, 26. november). Saltholdighet. I ",
      italic: "Store norske leksikon",
      suffix: ".",
      href: "https://snl.no/saltholdighet",
    },
    {
      prefix:
        "Lebreton, L., Slat, B., Ferrari, F., Sainte-Rose, B., Aitken, J., Marthouse, R., Hajbane, S., Cunsolo, S., Schwarz, A., Levivier, A., Noble, K., Debeljak, P., Maral, H., Schoeneich-Argent, R., Brambini, R., & Reisser, J. (2018). Evidence that the Great Pacific Garbage Patch is rapidly accumulating plastic. ",
      italic: "Scientific Reports, 8",
      suffix: "(1), Artikkel 4666.",
      href: "https://doi.org/10.1038/s41598-018-22939-w",
    },
    {
      prefix:
        "Matthews, J. B. R., Möller, V., van Diemen, R., Fuglestvedt, J. S., Masson-Delmotte, V., Méndez, C., Semenov, S., & Reisinger, A. (Red.). (2021). Annex VII: Glossary. I V. Masson-Delmotte, P. Zhai, A. Pirani, S. L. Connors, C. Péan, S. Berger, … B. Zhou (Red.), ",
      italic: "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change",
      suffix: " (s. 2215–2256). Cambridge University Press.",
      href: "https://doi.org/10.1017/9781009157896.022",
    },
    {
      prefix: "NOAA. (u.å.-d). ",
      italic: "How deep is the ocean?",
      suffix: ". National Ocean Service.",
      href: "https://oceanservice.noaa.gov/facts/oceandepth.html",
    },
    {
      prefix: "NOAA. (u.å.-e). ",
      italic: "How many oceans are there?",
      suffix: ". National Ocean Service.",
      href: "https://oceanservice.noaa.gov/facts/howmanyoceans.html",
    },
    {
      prefix: "NOAA. (u.å.-f). ",
      italic: "How much water is in the ocean?",
      suffix: ". National Ocean Service.",
      href: "https://oceanservice.noaa.gov/facts/oceanwater.html",
    },
    {
      prefix: "NOAA. (u.å.-g). ",
      italic: "What are garbage patches?",
      suffix: ". National Ocean Service.",
      href: "https://oceanservice.noaa.gov/education/tutorial-coastal/marine-debris/md05.html",
    },
    {
      prefix: "NOAA. (u.å.-h). ",
      italic: "What is a thermocline?",
      suffix: ". National Ocean Service.",
      href: "https://oceanservice.noaa.gov/facts/thermocline.html",
    },
    {
      prefix: "NOAA. (u.å.-i). ",
      italic: "What is the Great Pacific Garbage Patch?",
      suffix: ". National Ocean Service.",
      href: "https://oceanservice.noaa.gov/facts/garbagepatch.html",
    },
    {
      prefix: "Sælen, O. H., & Barthel, K. (2026, 11. juni). Hav. I ",
      italic: "Store norske leksikon",
      suffix: ".",
      href: "https://snl.no/hav",
    },
    {
      prefix: "Segar, D. A. (2025). 8.15: Tracing water masses. I ",
      italic: "Introduction to ocean sciences (6. utg.)",
      suffix: ". LibreTexts Geosciences.",
      href: "https://geo.libretexts.org/Courses/American_Meteorological_Society/Introduction_to_Ocean_Sciences_6e_(Segar)/08%3A_Ocean_Circulation/8.15%3A_Tracing_Water_Masses",
    },
    {
      prefix: "Sprintall, J., & Cronin, M. F. (2001). Upper ocean vertical structure. I J. H. Steele, S. A. Thorpe, & K. K. Turekian (Red.), ",
      italic: "Encyclopedia of ocean sciences",
      suffix: ". Academic Press.",
      href: "https://doi.org/10.1006/rwos.2001.0149",
    },
    {
      prefix: "Store norske leksikon. (u.å.-a). ",
      italic: "Atlanterhavet",
      suffix: ".",
      href: "https://snl.no/Atlanterhavet",
    },
    {
      prefix: "Store norske leksikon. (u.å.-b). ",
      italic: "Havbunnen",
      suffix: ".",
      href: "https://snl.no/havbunnen",
    },
    {
      prefix: "Talley, L. D. (2019). ",
      italic: "SIO 210: Atlantic – deep circulation and water masses",
      suffix: ". Scripps Institution of Oceanography, University of California San Diego.",
      href: "https://talleylab.ucsd.edu/ltalley/sio210/Atlantic_deep/index.html",
    },
  ],
  kryosfaeren: [
    {
      prefix: "Store norske leksikon. (u.å.-h). ",
      italic: "Kalving",
      suffix: ".",
      href: "https://snl.no/kalving",
    },
    {
      prefix: "Store norske leksikon. (u.å.-i). ",
      italic: "Jøkullaup",
      suffix: ".",
      href: "https://snl.no/jøkullaup",
    },
    {
      prefix: "Store norske leksikon. (u.å.-j). ",
      italic: "Snø",
      suffix: ".",
      href: "https://snl.no/snø",
    },
    {
      prefix: "Store norske leksikon. (u.å.-k). ",
      italic: "Snøkrystall",
      suffix: ".",
      href: "https://snl.no/snøkrystall",
    },
    {
      prefix: "National Snow and Ice Data Center [NSIDC]. (u.å.-e). ",
      italic: "Science of sea ice",
      suffix: ".",
      href: "https://nsidc.org/learn/parts-cryosphere/sea-ice/science-sea-ice",
    },
    {
      prefix:
        "Lei, R., Heil, P., Wang, J., Zhang, Z., Li, Q., & Li, N. (2016). Characterization of sea-ice kinematic in the Arctic outflow region using buoy data. ",
      italic: "Polar Research, 35",
      suffix: "(1), Artikkel 22658.",
      href: "https://doi.org/10.3402/polar.v35.22658",
    },
    {
      prefix:
        "Lüthi, D., Le Floch, M., Bereiter, B., Blunier, T., Barnola, J.-M., Siegenthaler, U., Raynaud, D., Jouzel, J., Fischer, H., Kawamura, K., & Stocker, T. F. (2008). High-resolution carbon dioxide concentration record 650,000–800,000 years before present. ",
      italic: "Nature, 453",
      suffix: "(7193), 379–382.",
      href: "https://doi.org/10.1038/nature06949",
    },
  ],
  vaerkart: [
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-h). ",
      italic: "JetStream Max: Radar beams",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/radar-beams",
    },
    {
      prefix: "National Weather Service [NWS]. (u.å.-b). ",
      italic: "Three types of satellite imagery",
      suffix: ". National Oceanic and Atmospheric Administration.",
      href: "https://www.weather.gov/mrx/sattype",
    },
    {
      prefix: "Store norske leksikon. (2023). ",
      italic: "Vindens virkninger på sjøen",
      suffix: ".",
      href: "https://snl.no/vindens_virkninger_p%C3%A5_sj%C3%B8en",
    },
    {
      prefix: "Store norske leksikon. (2024a, 26. november). ",
      italic: "Værradar",
      suffix: ".",
      href: "https://snl.no/v%C3%A6rradar",
    },
    {
      prefix: "Store norske leksikon. (2024b, 25. november). ",
      italic: "Manuell nedbørmåler",
      suffix: ".",
      href: "https://snl.no/manuell_nedb%C3%B8rm%C3%A5ler",
    },
    {
      prefix: "Store norske leksikon. (2026, 8. april). ",
      italic: "Beauforts vindskala",
      suffix: ".",
      href: "https://snl.no/Beauforts_vindskala",
    },
  ],
} as Record<string, Kilde[]>;
