export type Kilde = {
  /** APA 7: author and year, ending with a period and space before the title. */
  prefix: string;
  /** Italicized title (webpage/report) or journal + volume (article). */
  italic: string;
  /** Remainder after the italic segment (issue, pages, URL). */
  suffix?: string;
  href?: string;
};

export const KILDER = {
  jordsystemene: [
    {
      prefix: "National Aeronautics and Space Administration. (u.å.). ",
      italic: "Earth’s spheres",
      suffix: ".",
      href: "https://science.nasa.gov/earth/earth-observatory/",
    },
    {
      prefix: "U.S. Geological Survey. (u.å.). ",
      italic: "What is the difference between weathering and erosion?",
      suffix: ".",
      href: "https://www.usgs.gov/faqs/what-difference-between-weathering-and-erosion",
    },
    {
      prefix: "International Commission on Stratigraphy. (2024). ",
      italic: "International chronostratigraphic chart",
      suffix: ".",
      href: "https://stratigraphy.org/",
    },
    {
      prefix: "U.S. Geological Survey. (u.å.). ",
      italic: "Volcanoes can affect climate",
      suffix: ".",
      href: "https://www.usgs.gov/programs/VHP/volcanoes-can-affect-climate",
    },
    {
      prefix: "Gerlach, T. (2011). Volcanic versus anthropogenic carbon dioxide. ",
      italic: "Eos, 92",
      suffix: "(24), 201–202.",
      href: "https://doi.org/10.1029/2011EO240001",
    },
    {
      prefix:
        "Walker, J. C. G., Hays, P. B., & Kasting, J. F. (1981). A negative feedback mechanism for the long-term stabilization of Earth’s surface temperature. ",
      italic: "Journal of Geophysical Research, 86",
      suffix: "(C10), 9776–9782.",
      href: "https://doi.org/10.1029/JC086iC10p09776",
    },
  ],
  platetektonikk: [
    {
      prefix: "U.S. Geological Survey. (u.å.). ",
      italic: "About plate tectonics and volcanoes",
      suffix: ".",
      href: "https://www.usgs.gov/programs/vhp/about-plate-tectonics-and-volcanoes",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "How fast do tectonic plates move?",
      suffix: ".",
      href: "https://oceanexplorer.noaa.gov/facts/plate-tectonics.html",
    },
    {
      prefix: "NORSAR. (u.å.). ",
      italic: "Jordskjelv i Norge",
      suffix: ".",
      href: "https://www.jordskjelv.no/om-jordskjelv/jordskjelv-i-norge/",
    },
    {
      prefix: "Norges geologiske undersøkelse. (u.å.). ",
      italic: "Geologi på land",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/geologi-pa-land",
    },
    {
      prefix: "Norges geologiske undersøkelse. (u.å.). ",
      italic: "Marin grense",
      suffix: ".",
      href: "https://www.ngu.no/emne/marin-grense",
    },
    {
      prefix: "Norsk Polarinstitutt. (u.å.). ",
      italic: "Jan Mayen",
      suffix: ".",
      href: "https://www.npolar.no/tema/jan-mayen/",
    },
  ],
  vulkaner: [
    {
      prefix:
        "Bungum, H., Pettenati, F., Schweitzer, J., & Sirovich, L. (2009). The 23 October 1904 MS 5.4 Oslofjord earthquake: Reanalysis based on macroseismic and instrumental data. ",
      italic: "Bulletin of the Seismological Society of America, 99",
      suffix: "(5), 2836–2854.",
      href: "https://doi.org/10.1785/0120080357",
    },
    {
      prefix: "NORSAR. (u.å.). ",
      italic: "Jordskjelvet i Oslo i 1904",
      suffix: ".",
      href: "https://www.jordskjelv.no/om-jordskjelv/jordskjelv-i-norge/jordskjelvet-i-oslo-i-1904/",
    },
    {
      prefix: "NORSAR. (u.å.). ",
      italic: "Jordskjelv i Norge",
      suffix: ".",
      href: "https://www.jordskjelv.no/om-jordskjelv/jordskjelv-i-norge/",
    },
    {
      prefix: "U.S. Geological Survey. (u.å.). ",
      italic: "Hawaiian Volcano Observatory",
      suffix: ".",
      href: "https://www.usgs.gov/observatories/hvo",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat. (u.å.). ",
      italic: "Åknes",
      suffix: ".",
      href: "https://www.nve.no/naturfare/overvaking-og-varsling/fjellskredovervaaking/kontinuerlig-overvaakede-fjellpartier/aaknes/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat. (2026). ",
      italic: "Fjellskred fra Åknes. Reviderte scenarioer, sannsynligheter og konsekvenser",
      suffix: " (Rapport 16/2026).",
      href: "https://publikasjoner.nve.no/rapport/2026/rapport2026_16.pdf",
    },
    {
      prefix:
        "Haflidason, H., Sejrup, H. P., Nygård, A., Mienert, J., Bryn, P., Lien, R., Forsberg, C. F., Berg, K., & Masson, D. (2004). The Storegga Slide: Architecture, geometry and slide development. ",
      italic: "Marine Geology, 213",
      suffix: "(1–4), 201–234.",
      href: "https://doi.org/10.1016/j.margeo.2004.10.007",
    },
    {
      prefix: "Norsk Polarinstitutt. (u.å.). ",
      italic: "Jan Mayen",
      suffix: ".",
      href: "https://www.npolar.no/tema/jan-mayen/",
    },
  ],
  bergarter: [
    {
      prefix: "Norges geologiske undersøkelse. (u.å.). ",
      italic: "Geologi på land",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/geologi-pa-land",
    },
    {
      prefix: "Norges geologiske undersøkelse. (u.å.). ",
      italic: "Larvikitt",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/larvikitt",
    },
    {
      prefix: "U.S. Geological Survey. (u.å.). ",
      italic: "The rock cycle",
      suffix: ".",
      href: "https://www.usgs.gov/media/images/usgs-simplified-rock-classification",
    },
    {
      prefix: "Godwin, H. (1962). Half-life of radiocarbon. ",
      italic: "Nature, 195",
      suffix: "(4845), 984.",
      href: "https://doi.org/10.1038/195984a0",
    },
    {
      prefix:
        "Reimer, P. J., Austin, W. E. N., Bard, E., Bayliss, A., Blackwell, P. G., Bronk Ramsey, C., Butzin, M., Cheng, H., Edwards, R. L., Friedrich, M., Grootes, P. M., Guilderson, T. P., Hajdas, I., Heaton, T. J., Hogg, A. G., Hughen, K. A., Kromer, B., Manning, S. W., Muscheler, R., … Talamo, S. (2020). The IntCal20 Northern Hemisphere radiocarbon age calibration curve (0–55 cal kBP). ",
      italic: "Radiocarbon, 62",
      suffix: "(4), 725–757.",
      href: "https://doi.org/10.1017/RDC.2020.41",
    },
  ],
  vannFlom: [
    {
      prefix: "Norges vassdrags- og energidirektorat. (u.å.). ",
      italic: "Flom",
      suffix: ".",
      href: "https://www.nve.no/naturfare/laer-om-naturfare/flom/",
    },
    {
      prefix: "Meteorologisk institutt. (2023). ",
      italic: "Over 100 år siden det har regnet så mye på Østlandet",
      suffix: ".",
      href: "https://www.met.no/nyhetsarkiv/over-100-ar-siden-det-har-regnet-sa-mye-pa-ostlandet",
    },
    {
      prefix: "Direktoratet for samfunnssikkerhet og beredskap. (2024). ",
      italic: "Evalueringsrapport etter uværet Hans",
      suffix: ".",
      href: "https://www.dsb.no/siteassets/rapporter-og-publikasjoner/rapporter/evalueringsrapport_hans.pdf",
    },
  ],
  skred: [
    {
      prefix: "Norges vassdrags- og energidirektorat. (u.å.). ",
      italic: "Åknes",
      suffix: ".",
      href: "https://www.nve.no/naturfare/overvaking-og-varsling/fjellskredovervaaking/kontinuerlig-overvaakede-fjellpartier/aaknes/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat. (2026). ",
      italic: "Fjellskred fra Åknes. Reviderte scenarioer, sannsynligheter og konsekvenser",
      suffix: " (Rapport 16/2026).",
      href: "https://publikasjoner.nve.no/rapport/2026/rapport2026_16.pdf",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat. (u.å.). ",
      italic: "Mannen",
      suffix: ".",
      href: "https://www.nve.no/naturfare/overvaking-og-varsling/fjellskredovervaaking/kontinuerlig-overvaakede-fjellpartier/mannen/",
    },
    {
      prefix: "Norges geologiske undersøkelse. (u.å.). ",
      italic: "Marin grense",
      suffix: ".",
      href: "https://www.ngu.no/emne/marin-grense",
    },
    {
      prefix: "Norges geologiske undersøkelse. (u.å.). ",
      italic: "Kvikkleire",
      suffix: ".",
      href: "https://www.ngu.no/geologi-og-risiko/kvikkleire",
    },
    {
      prefix: "Gjerdrumutvalget. (2022). ",
      italic: "På trygg grunn: Bedre håndtering av kvikkleirerisiko (NOU 2022: 3)",
      suffix: ".",
      href: "https://www.regjeringen.no/no/dokumenter/nou-2022-3/id2905694/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat. (u.å.). ",
      italic: "Bakgrunn og historie",
      suffix: " [Gjerdrum].",
      href: "https://www.nve.no/naturfare/sikringstiltak/sikringsprosjekter/gjerdrum/bakgrunn-og-historie/",
    },
    {
      prefix: "Gregersen, O. (1981). The quick clay landslide in Rissa, Norway. In ",
      italic:
        "Proceedings of the 10th International Conference on Soil Mechanics and Foundation Engineering",
      suffix: " (Vol. 3, pp. 421–426).",
    },
    {
      prefix:
        "Haflidason, H., Sejrup, H. P., Nygård, A., Mienert, J., Bryn, P., Lien, R., Forsberg, C. F., Berg, K., & Masson, D. (2004). The Storegga Slide: Architecture, geometry and slide development. ",
      italic: "Marine Geology, 213",
      suffix: "(1–4), 201–234.",
      href: "https://doi.org/10.1016/j.margeo.2004.10.007",
    },
    {
      prefix: "Direktoratet for samfunnssikkerhet og beredskap. (2024). ",
      italic: "Evalueringsrapport etter uværet Hans",
      suffix: ".",
      href: "https://www.dsb.no/siteassets/rapporter-og-publikasjoner/rapporter/evalueringsrapport_hans.pdf",
    },
  ],
  ressurser: [
    {
      prefix: "Norges geologiske undersøkelse. (u.å.). ",
      italic: "Mineralressurser",
      suffix: ".",
      href: "https://www.ngu.no/emne/mineralressurser",
    },
    {
      prefix: "Norges geologiske undersøkelse. (u.å.). ",
      italic: "Larvikitt",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/larvikitt",
    },
    {
      prefix: "Direktoratet for mineralforvaltning. (u.å.). ",
      italic: "Mineralsstatistikk",
      suffix: ".",
      href: "https://dirmin.no/",
    },
    {
      prefix: "Sokkeldirektoratet. (u.å.). ",
      italic: "Felt: Ekofisk",
      suffix: ".",
      href: "https://factpages.sodir.no/nb-no/field/PageView/Producing/43506",
    },
    {
      prefix: "Norges Høyesterett. (2026). ",
      italic: "Tillatelser til gruvedrift i Engebøfjellet er ugyldige (HR-2026-1360-A)",
      suffix: ".",
      href: "https://www.domstol.no/no/hoyesterett/avgjorelser/avgjorelser-2026/hoyesterett---sivil/HR-2026-1360-A/",
    },
  ],
  feltarbeid: [
    {
      prefix: "Vestland fylkeskommune. (u.å.). ",
      italic: "Munnleg og munnleg-praktisk privatisteksamen",
      suffix: ".",
      href: "https://www.vestlandfylke.no/utdanning-og-karriere/privatist/munnleg-og-munnleg-praktisk-privatisteksamen/",
    },
    {
      prefix: "Rogaland fylkeskommune. (u.å.). ",
      italic: "Retningslinjer for muntlig og muntlig-praktisk privatisteksamen",
      suffix: ".",
      href: "https://www.rogfk.no/vare-tjenester/skole-og-utdanning/eksamen-for-elever-og-privatister/eksamen-for-privatister/retningslinjer-for-privatisteksamen/retningslinjer-for-muntlig-og-muntlig-praktisk-privatisteksamen/",
    },
  ],
  trykk: [
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "Air pressure",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/atmosphere/air-pressure",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "Layers of the atmosphere",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/atmosphere/layers-of-atmosphere",
    },
    {
      prefix: "Meteorologisk institutt. (u.å.). ",
      italic: "Høytrykk og lavtrykk",
      suffix: ".",
      href: "https://www.met.no/",
    },
  ],
  vindsystemet: [
    {
      prefix: "National Aeronautics and Space Administration. (u.å.). ",
      italic: "Earth’s energy budget",
      suffix: ".",
      href: "https://earthobservatory.nasa.gov/features/EnergyBalance",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "The three-cell model",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/global/three-cell-model",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "Intertropical convergence zone",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/global/inter-tropical-convergence-zone",
    },
  ],
  jetstrommer: [
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "The jet stream",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/global/jet-stream",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change. (2021). ",
      italic:
        "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "North Atlantic Oscillation",
      suffix: ".",
      href: "https://www.climate.gov/news-features/understanding-climate/climate-variability-north-atlantic-oscillation",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "El Niño and La Niña",
      suffix: ".",
      href: "https://www.climate.gov/enso",
    },
  ],
  coriolis: [
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "The Coriolis effect",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/synoptic/coriolis-force",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "Geostrophic wind",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/synoptic/weather",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "El Niño and La Niña",
      suffix: ".",
      href: "https://www.climate.gov/enso",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "North Atlantic Oscillation",
      suffix: ".",
      href: "https://www.climate.gov/news-features/understanding-climate/climate-variability-north-atlantic-oscillation",
    },
  ],
  havstrommer: [
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "Ocean currents",
      suffix: ".",
      href: "https://oceanservice.noaa.gov/education/tutorial_currents/",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "The Ekman spiral",
      suffix: ".",
      href: "https://oceanservice.noaa.gov/education/tutorial_currents/04currents4.html",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "Atlantic meridional overturning circulation",
      suffix: ".",
      href: "https://www.climate.gov/news-features/understanding-climate/climate-change-atlantic-meridional-overturning-circulation",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change. (2021). ",
      italic:
        "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/",
    },
    {
      prefix: "Norsk klimaservicesenter. (u.å.). ",
      italic: "Klimaet i Norge",
      suffix: ".",
      href: "https://klimaservicesenter.no/",
    },
  ],
  klima: [
    {
      prefix: "World Meteorological Organization. (u.å.). ",
      italic: "Climate",
      suffix: ".",
      href: "https://wmo.int/topics/climate",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change. (2021). ",
      italic:
        "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/",
    },
    {
      prefix: "National Aeronautics and Space Administration. (u.å.). ",
      italic: "The greenhouse effect",
      suffix: ".",
      href: "https://science.nasa.gov/climate-change/faq/what-is-the-greenhouse-effect/",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "El Niño and La Niña",
      suffix: ".",
      href: "https://www.climate.gov/enso",
    },
    {
      prefix: "National Aeronautics and Space Administration. (u.å.). ",
      italic: "Ocean heat content",
      suffix: ".",
      href: "https://climate.nasa.gov/vital-signs/ocean-warming/",
    },
  ],
  modeller: [
    {
      prefix: "European Centre for Medium-Range Weather Forecasts. (u.å.). ",
      italic: "IFS documentation",
      suffix: ".",
      href: "https://www.ecmwf.int/en/forecasts",
    },
    {
      prefix: "Meteorologisk institutt. (u.å.). ",
      italic: "Forklaring av varsler",
      suffix: ".",
      href: "https://www.met.no/vaer-og-klima/forklaring-av-varsler",
    },
    {
      prefix: "Meteorologisk institutt. (u.å.). ",
      italic: "Subseasonal data model",
      suffix: " [MEPS og ECMWF].",
      href: "https://docs.api.met.no/doc/subseasonal/datamodel.html",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change. (2021). ",
      italic:
        "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/",
    },
    {
      prefix: "Lorenz, E. N. (1963). Deterministic nonperiodic flow. ",
      italic: "Journal of the Atmospheric Sciences, 20",
      suffix: "(2), 130–141.",
      href: "https://doi.org/10.1175/1520-0469(1963)020<0130:DNF>2.0.CO;2",
    },
  ],
  paleoklima: [
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "Trends in atmospheric carbon dioxide",
      suffix: ".",
      href: "https://gml.noaa.gov/ccgg/trends/",
    },
    {
      prefix: "National Snow and Ice Data Center. (u.å.). ",
      italic: "Sea Ice Index",
      suffix: ".",
      href: "https://nsidc.org/data/seaice_index",
    },
    {
      prefix:
        "Lüthi, D., Le Floch, M., Bereiter, B., Blunier, T., Barnola, J.-M., Siegenthaler, U., Raynaud, D., Jouzel, J., Fischer, H., Kawamura, K., & Stocker, T. F. (2008). High-resolution carbon dioxide concentration record 650,000–800,000 years before present. ",
      italic: "Nature, 453",
      suffix: "(7193), 379–382.",
      href: "https://doi.org/10.1038/nature06949",
    },
    {
      prefix:
        "Petit, J. R., Jouzel, J., Raynaud, D., Barkov, N. I., Barnola, J.-M., Basile, I., Bender, M., Chappellaz, J., Davis, M., Delaygue, G., Delmotte, M., Kotlyakov, V. M., Legrand, M., Lipenkov, V. Y., Lorius, C., Pépin, L., Ritz, C., Saltzman, E., & Stievenard, M. (1999). Climate and atmospheric history of the past 420,000 years from the Vostok ice core, Antarctica. ",
      italic: "Nature, 399",
      suffix: "(6735), 429–436.",
      href: "https://doi.org/10.1038/20859",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change. (2021). ",
      italic:
        "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/",
    },
    {
      prefix:
        "Walker, M., Johnsen, S., Rasmussen, S. O., Popp, T., Steffensen, J.-P., Gibbard, P., Hoek, W., Lowe, J., Andrews, J., Björck, S., Cwynar, L. C., Hughen, K., Kershaw, P., Kromer, B., Litt, T., Lowe, D. J., Nakagawa, T., Newnham, R., & Schwander, J. (2009). Formal definition and dating of the GSSP (Global Stratotype Section and Point) for the base of the Holocene using the Greenland NGRIP ice core, and selected auxiliary records. ",
      italic: "Journal of Quaternary Science, 24",
      suffix: "(1), 3–17.",
      href: "https://doi.org/10.1002/jqs.1227",
    },
  ],
  vaerkatastrofer: [
    {
      prefix: "National Hurricane Center. (u.å.). ",
      italic: "Tropical cyclone climatology",
      suffix: ".",
      href: "https://www.nhc.noaa.gov/climo/",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration. (u.å.). ",
      italic: "The Coriolis effect",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/synoptic/coriolis-force",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change. (2021). ",
      italic:
        "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/",
    },
    {
      prefix: "Norsk klimaservicesenter. (u.å.). ",
      italic: "Ekstremnedbør og stormflo",
      suffix: ".",
      href: "https://klimaservicesenter.no/",
    },
    {
      prefix: "Kartverket. (u.å.). ",
      italic: "Stormflo og havnivå",
      suffix: ".",
      href: "https://www.kartverket.no/til-sjos/se-havniva",
    },
  ],
} as const satisfies Record<string, readonly Kilde[]>;
