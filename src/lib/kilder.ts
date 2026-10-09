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
      prefix: "Friedlingstein, P., et al. (2025). Global Carbon Budget 2025. ",
      italic: "Earth System Science Data, 18",
      suffix: ", 3211.",
      href: "https://doi.org/10.5194/essd-18-3211-2026",
    },
    {
      prefix: "National Aeronautics and Space Administration [NASA]. (2011). ",
      italic: "The carbon cycle",
      suffix: ".",
      href: "https://science.nasa.gov/earth/earth-observatory/the-carbon-cycle/",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-a). ",
      italic: "Fisk innesperret i nær 300 år etter vulkanutbrudd",
      suffix: ".",
      href: "https://www.ngu.no/nyheter/fisk-innesperret-i-naer-300-ar-etter-vulkanutbrudd",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-b). ",
      italic: "Geologi på land",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/geologi-pa-land",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-c). ",
      italic: "Grunnvann",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/grunnvann",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-d). ",
      italic: "Karbonatmineraler",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/karbonatmineraler",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-e). ",
      italic: "Om berggrunn",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/om-berggrunn",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-g). ",
      italic: "Om løsmasser",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/om-losmasser",
    },
    {
      prefix: "U.S. Geological Survey [USGS]. (u.å.). ",
      italic: "Volcanoes can affect climate",
      suffix: ".",
      href: "https://www.usgs.gov/programs/VHP/volcanoes-can-affect-climate",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer — Geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 1",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv972",
    },
  ],
  platetektonikk: [
    {
      prefix: "Forsyth, D., & Uyeda, S. (1975). On the relative importance of the driving forces of plate motion. ",
      italic: "Geophysical Journal International, 43",
      suffix: "(1), 163–200.",
      href: "https://doi.org/10.1111/j.1365-246X.1975.tb00631.x",
    },
    {
      prefix: "Fowler, C. M. R. (2005). ",
      italic: "The solid Earth: An introduction to global geophysics",
      suffix: " (2. utg.). Cambridge University Press.",
    },
    {
      prefix:
        "Furnes, H., Pedersen, R. B., & Stillman, C. J. (1988). The Leka Ophiolite Complex, central Norwegian Caledonides: field characteristics and geotectonic significance. ",
      italic: "Journal of the Geological Society, 145",
      suffix: "(3), 401–412.",
      href: "https://doi.org/10.1144/gsjgs.145.3.0401",
    },
    {
      prefix: "Hess, H. H. (1962). History of ocean basins. I A. E. J. Engel, H. L. James, & B. F. Leonard (Red.), ",
      italic: "Petrologic Studies: A Volume to Honor A. F. Buddington",
      suffix: " (s. 599–620). Geological Society of America.",
      href: "https://doi.org/10.1130/Petrologic.1962.599",
    },
    {
      prefix: "Lowrie, W., & Fichtner, A. (2020). ",
      italic: "Fundamentals of geophysics",
      suffix: " (3. utg.). Cambridge University Press.",
    },
    {
      prefix: "Marshak, S. (2019). ",
      italic: "Earth: Portrait of a planet",
      suffix: " (6. utg.). W. W. Norton.",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-a). ",
      italic: "What is a mid-ocean ridge?",
      suffix: ".",
      href: "https://oceanexplorer.noaa.gov/ocean-fact/mid-ocean-ridge/",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-b). ",
      italic: "How deep is the ocean?",
      suffix: ".",
      href: "https://oceanexplorer.noaa.gov/ocean-fact/ocean-depth/",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (2016). ",
      italic: "Geofysisk logging av 4 borehull i Ramså-feltet, Andøya, Nordland",
      suffix: " (rapport 2016.023).",
      href: "https://www.ngu.no/publikasjon/geofysisk-logging-av-4-borehull-i-ramsa-feltet-andoya-nordland",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-a). ",
      italic: "Geologi på land",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/geologi-pa-land",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-b). ",
      italic: "Om kart over marin grense",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/om-kart-over-marin-grense",
    },
    {
      prefix: "Norsk Polarinstitutt. (u.å.). ",
      italic: "Jan Mayen",
      suffix: ".",
      href: "https://www.npolar.no/tema/jan-mayen/",
    },
    {
      prefix:
        "Ramberg, I. B., Bryhni, I., Nøttvedt, A., & Rangnes, K. (Red.). (2008). ",
      italic: "Landet blir til: Norges geologi",
      suffix: " (2. utg.). Norsk Geologisk Forening.",
    },
    {
      prefix: "Tarbuck, E. J., Lutgens, F. K., & Tasa, D. G. (2020). ",
      italic: "Earth: An introduction to physical geology",
      suffix: " (13. utg.). Pearson.",
    },
    {
      prefix: "U.S. Geological Survey [USGS]. (u.å.). ",
      italic: "Volcanoes: Plate-Tectonics Theory",
      suffix: ".",
      href: "https://pubs.usgs.gov/gip/volc/tectonics.html",
    },
    {
      prefix: "Vine, F. J., & Matthews, D. H. (1963). Magnetic anomalies over oceanic ridges. ",
      italic: "Nature, 199",
      suffix: "(4900), 947–949.",
      href: "https://doi.org/10.1038/199947a0",
    },
    {
      prefix: "Wegener, A. (1912). Die Entstehung der Kontinente. ",
      italic: "Geologische Rundschau, 3",
      suffix: "(4), 276–292.",
      href: "https://doi.org/10.1007/BF02202896",
    },
    {
      prefix: "Wilson, J. T. (1966). Did the Atlantic close and then re-open? ",
      italic: "Nature, 211",
      suffix: "(5050), 676–681.",
      href: "https://doi.org/10.1038/211676a0",
    },
  ],
  vulkaner: [
    {
      prefix:
        "Newhall, C. G., & Self, S. (1982). The Volcanic Explosivity Index (VEI): An estimate of explosive magnitude for historical volcanism. ",
      italic: "Journal of Geophysical Research, 87",
      suffix: "(C2), 1231–1238.",
      href: "https://doi.org/10.1029/JC087iC02p01231",
    },
    {
      prefix: "Norsk Polarinstitutt. (u.å.). ",
      italic: "Jan Mayen og Beerenberg",
      suffix: ".",
      href: "https://www.npolar.no/tema/jan-mayen/",
    },
    {
      prefix:
        "Oppenheimer, C. (2003). Climatic, environmental and human consequences of the largest known historic eruption: Tambora volcano (Indonesia) 1815. ",
      italic: "Progress in Physical Geography, 27",
      suffix: "(2), 230–259.",
      href: "https://doi.org/10.1191/0309133303pp379ra",
    },
    {
      prefix:
        "Robock, A. (2000). Volcanic eruptions and climate. ",
      italic: "Reviews of Geophysics, 38",
      suffix: "(2), 191–219.",
      href: "https://doi.org/10.1029/1998RG000054",
    },
    {
      prefix:
        "Sparks, R. S. J. (1978). The dynamics of bubble formation and growth in magmas: A review and analysis. ",
      italic: "Journal of Volcanology and Geothermal Research, 3",
      suffix: "(1–2), 1–37.",
      href: "https://doi.org/10.1016/0377-0273(78)90002-1",
    },
    {
      prefix: "U.S. Geological Survey [USGS]. (u.å.-a). ",
      italic: "Hawaiian Volcano Observatory: Hawaiian volcano monitoring and shield volcanoes",
      suffix: ".",
      href: "https://www.usgs.gov/observatories/hvo",
    },
    {
      prefix: "U.S. Geological Survey [USGS]. (u.å.-b). ",
      italic: "Cascades Volcano Observatory: Mount St. Helens and stratovolcano hazards",
      suffix: ".",
      href: "https://www.usgs.gov/observatories/cvo",
    },
    {
      prefix:
        "Gíslason, S. R., Hassenkam, T., Nedel, S., Bovet, N., Eiriksdottir, E. S., Alfredsson, H. A., Hem, C. P., Balogh, Z. I., Dideriksen, K., & Stipp, S. L. S. (2011). Characterization of Eyjafjallajökull volcanic ash particles and a protocol for rapid risk assessment. ",
      italic: "Proceedings of the National Academy of Sciences, 108",
      suffix: "(18), 7307–7312.",
      href: "https://doi.org/10.1073/pnas.1015053108",
    },
    {
      prefix:
        "Sigurdsson, H., Houghton, B., McNutt, S., Rymer, H., & Stix, J. (Red.). (2015). ",
      italic: "The Encyclopedia of Volcanoes",
      suffix: " (2. utg.). Academic Press.",
      href: "https://doi.org/10.1016/C2011-0-06950-8",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-a). ",
      italic: "Geologi på land",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/geologi-pa-land",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-b). ",
      italic: "Om berggrunn",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/om-berggrunn",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-c). ",
      italic: "Skorpe, mantel og kjerne",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/skorpe-mantel-og-kjerne",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (2015). ",
      italic: "Scenarios of microcontinent formation applied to the Jan Mayen microcontinent",
      suffix: " (rapport 2015.019).",
      href: "https://www.ngu.no/publikasjon/scenarios-microcontinent-formation-applied-jan-mayen-microcontinent",
    },
    {
      prefix: "Store norske leksikon [SNL]. (u.å.). ",
      italic: "Beerenberg",
      suffix: ".",
      href: "https://snl.no/Beerenberg",
    },
    {
      prefix: "U.S. Geological Survey [USGS]. (u.å.-c). ",
      italic: "Volcanoes Can Affect Climate",
      suffix: ".",
      href: "https://www.usgs.gov/programs/VHP/volcanoes-can-affect-climate",
    },
    {
      prefix: "U.S. Geological Survey [USGS]. (u.å.-d). ",
      italic: "Hotspots",
      suffix: " (This Dynamic Earth).",
      href: "https://pubs.usgs.gov/gip/dynamic/hotspots.html",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.). ",
      italic: "Kompetansemål etter geofag 1 (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv972",
    },
    {
      prefix: "Veðurstofa Íslands. (u.å.). ",
      italic: "Fréttir og viðvaranir: Eldgos á Reykjanesi",
      suffix: ".",
      href: "https://www.vedur.is/eldfjoll/eldgos-a-reykjanesi/frettir-og-vidvaranir/",
    },
    {
      prefix: "Wilson, J. T. (1963). A possible origin of the Hawaiian Islands. ",
      italic: "Canadian Journal of Physics, 41",
      suffix: "(6), 863–870.",
      href: "https://doi.org/10.1139/p63-094",
    },
  ],
  jordskjelv: [
    {
      prefix: "Dziewonski, A. M., & Anderson, D. L. (1981). Preliminary reference Earth model. ",
      italic: "Physics of the Earth and Planetary Interiors, 25",
      suffix: "(4), 297–356.",
      href: "https://doi.org/10.1016/0031-9201(81)90046-7",
    },
    {
      prefix: "Incorporated Research Institutions for Seismology [IRIS]. (u.å.). ",
      italic: "Seismic shadow zone: Basic introduction",
      suffix: ".",
      href: "https://www.iris.edu/hq/inclass/animation/seismic_shadow_zone_basic_introduction",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-a). ",
      italic: "Jordskjelv",
      suffix: ".",
      href: "https://www.ngu.no/geologi-og-risiko/jordskjelv",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-b). ",
      italic: "Tafjordskredet i 1934 – 40 mennesker døde",
      suffix: ".",
      href: "https://www.ngu.no/geologi-og-risiko/tafjordskredet-i-1934-40-mennesker-dode",
    },
    {
      prefix: "NORSAR. (u.å.-a). ",
      italic: "Jordskjelvet i Oslo i 1904",
      suffix: ".",
      href: "https://www.jordskjelv.no/om-jordskjelv/jordskjelv-i-norge/jordskjelvet-i-oslo-i-1904/",
    },
    {
      prefix: "NORSAR. (u.å.-b). ",
      italic: "Jordskjelv i Norge",
      suffix: ".",
      href: "https://www.jordskjelv.no/om-jordskjelv/jordskjelv-i-norge/",
    },
    {
      prefix: "NORSAR. (u.å.-c). ",
      italic: "Norsk nasjonalt seismisk nettverk",
      suffix: ".",
      href: "https://www.norsar.no/prosjekter/norsk-nasjonalt-seismisk-nettverk/",
    },
    {
      prefix: "Store norske leksikon [SNL]. (u.å.). ",
      italic: "Storeggaskredet",
      suffix: ".",
      href: "https://snl.no/Storeggaskredet",
    },
    {
      prefix: "U.S. Geological Survey [USGS]. (u.å.-a). ",
      italic: "The interior of the Earth",
      suffix: ".",
      href: "https://pubs.usgs.gov/gip/interior/",
    },
    {
      prefix: "U.S. Geological Survey [USGS]. (u.å.-b). ",
      italic: "Understanding plate motions",
      suffix: ".",
      href: "https://pubs.usgs.gov/gip/dynamic/understanding.html",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer — Geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 1",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv972",
    },
  ],
  bergarter: [
    {
      prefix: "National Aeronautics and Space Administration [NASA]. (2011). ",
      italic: "The carbon cycle",
      suffix: ".",
      href: "https://science.nasa.gov/earth/earth-observatory/the-carbon-cycle/",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-a). ",
      italic: "Fyllitt",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/fyllitt",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-b). ",
      italic: "Gabbro",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/gabbro",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-c). ",
      italic: "Geologi på land",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/geologi-pa-land",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-d). ",
      italic: "Gneis",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/gneis",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-e). ",
      italic: "Grønnstein",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/gronnstein",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-f). ",
      italic: "Kalkstein",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/kalkstein",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-g). ",
      italic: "Karbonatmineraler",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/karbonatmineraler",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-h). ",
      italic: "Kvarts",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/kvarts",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-i). ",
      italic: "Larvikitt",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/larvikitt",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-j). ",
      italic: "Leirstein",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/leirstein",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-k). ",
      italic: "Norske bergarter",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/norske-bergarter",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-l). ",
      italic: "Rombeporfyr",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/rombeporfyr",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-m). ",
      italic: "Sandstein",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/sandstein",
    },
    {
      prefix: "Store norske leksikon [SNL]. (u.å.). ",
      italic: "Mohs' hardhetsskala",
      suffix: ".",
      href: "https://snl.no/hardhet_-_mineralogi",
    },
    {
      prefix: "U.S. Geological Survey [USGS]. (u.å.-a). ",
      italic: "Collecting rocks",
      suffix: ".",
      href: "https://pubs.usgs.gov/gip/collect1/collectgip.html",
    },
    {
      prefix: "U.S. Geological Survey [USGS]. (u.å.-b). ",
      italic: "Natural gemstones",
      suffix: ".",
      href: "https://pubs.usgs.gov/gip/gemstones/mineral.html",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer — Geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 1",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv972",
    },
    {
      prefix:
        "White, A. F., Blum, A. E., Schulz, M. S., Bullen, T. D., Harden, J. W., & Peterson, M. L. (1996). Chemical weathering rates of a soil chronosequence on granitic alluvium: I. Quantification of mineralogical and surface area changes and calculation of primary silicate reaction rates. ",
      italic: "Geochimica et Cosmochimica Acta, 60",
      suffix: "(14), 2533–2550.",
      href: "https://doi.org/10.1016/0016-7037(96)00106-8",
    },
  ],
  "norges-geologi": [
    {
      prefix: "forskning.no. (2008, 7. februar). ",
      italic: "Larvikitt er nasjonalbergart",
      suffix: ".",
      href: "https://www.forskning.no/larvikitt-er-nasjonalbergart/980811",
    },
    {
      prefix: "Oftedahl, C. (1948). Petrology and geology of the Rondane area. ",
      italic: "Norsk Geologisk Tidsskrift, 28",
      suffix: ", 199–225.",
      href: "https://njg.geologi.no/images/NJG_articles/NGT_28_2-4_199-225.pdf",
    },
    {
      prefix:
        "Ramberg, I. B., Bryhni, I., Nøttvedt, A., & Rangnes, K. (Red.). (2008). ",
      italic: "Landet blir til: Norges geologi",
      suffix: " (2. utg.). Norsk Geologisk Forening.",
    },
    {
      prefix:
        "Furnes, H., Pedersen, R. B., & Stillman, C. J. (1988). The Leka Ophiolite Complex, central Norwegian Caledonides: field characteristics and geotectonic significance. ",
      italic: "Journal of the Geological Society, 145",
      suffix: "(3), 401–412.",
      href: "https://doi.org/10.1144/gsjgs.145.3.0401",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-a). ",
      italic: "Geologi på land",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/geologi-pa-land",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-b). ",
      italic: "Om kart over marin grense",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/om-kart-over-marin-grense",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-c). ",
      italic: "Rombeporfyr",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/rombeporfyr",
    },
    {
      prefix: "NORSAR. (u.å.). ",
      italic: "Jordskjelv i Norge",
      suffix: ".",
      href: "https://www.jordskjelv.no/om-jordskjelv/jordskjelv-i-norge/",
    },
    {
      prefix: "Norsk Polarinstitutt. (u.å.). ",
      italic: "Jan Mayen",
      suffix: ".",
      href: "https://www.npolar.no/tema/jan-mayen/",
    },
    {
      prefix: "Leka steinsenter. (u.å.). ",
      italic: "Lekas opprinnelse",
      suffix: ".",
      href: "http://www.leka-steinsenter.no/geologi/lekas_opprinnelse_norsk.htm",
    },
    {
      prefix:
        "Dunning, G. R., & Pedersen, R. B. (1988). U/Pb ages of ophiolites and arc-related plutons of the Norwegian Caledonides: Implications for the development of Iapetus. ",
      italic: "Contributions to Mineralogy and Petrology, 98",
      suffix: "(1), 13–23.",
      href: "https://doi.org/10.1007/BF00371904",
    },
    {
      prefix:
        "Titus, S. J., Fossen, H., Pedersen, R. B., Vigneresse, J. L., & Tikoff, B. (2002). Pull-apart formation and strike-slip partitioning in an obliquely divergent setting, Leka Ophiolite, Norway. ",
      italic: "Tectonophysics, 354",
      suffix: "(1–2), 101–119.",
      href: "https://doi.org/10.1016/S0040-1951(02)00293-9",
    },
    {
      prefix: "Trollfjell Geopark. (u.å.). ",
      italic: "Leka",
      suffix: ".",
      href: "https://trollfjellgeopark.no/besok-geoparken/leka/",
    },
    {
      prefix: "Løvø, G. (2014, 28. oktober). ",
      italic: "For 500 millioner år siden så Midt-Norge ut som Indonesia",
      suffix: ". forskning.no (Norges geologiske undersøkelse).",
      href: "https://www.forskning.no/partner-norges-geologiske-undersokelse-geofag/for-500-millioner-ar-siden-sa-midt-norge-ut-som-indonesia/534066",
    },
    {
      prefix: "Amundsen, B. (2021, 22. januar). ",
      italic: "Fjell i Norge har vært over 8000 meter høye",
      suffix: ". forskning.no.",
      href: "https://www.forskning.no/geologi/fjell-i-norge-har-vaert-over-8000-meter-hoye/1799186",
    },
  ],
  isbre: [
    {
      prefix: "NDLA. (u.å.). ",
      italic: "Slik arbeider isbreen",
      suffix: ".",
      href: "https://ndla.no/r/geografi/slik-arbeider-isbreen/6c8858f799",
    },
    {
      prefix:
        "Murton, J. B., Peterson, R., & Ozouf, J.-C. (2006). Bedrock fracture by ice segregation in cold regions. ",
      italic: "Science, 314",
      suffix: "(5802), 1127–1129.",
      href: "https://doi.org/10.1126/science.1132127",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-a). ",
      italic: "Geologi på land",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/geologi-pa-land",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-b). ",
      italic: "Om kart over marin grense",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/om-kart-over-marin-grense",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-c). ",
      italic: "Om løsmasser",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/om-losmasser",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (u.å.). ",
      italic: "Klima nå og i framtiden",
      suffix: ".",
      href: "https://www.nve.no/vann-og-vassdrag/vannets-kretsloep/klima/klima-naa-og-i-framtiden/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (2022, 10. februar). ",
      italic: "Norske breer kartlagt på ny",
      suffix: ".",
      href: "https://www.nve.no/nytt-fra-nve/nyheter-hydrologi/norske-breer-kartlagt-pa-ny/",
    },
    {
      prefix: "Store norske leksikon [SNL]. (u.å.-a). ",
      italic: "Frostsprengning",
      suffix: ".",
      href: "https://snl.no/frostsprengning",
    },
    {
      prefix: "Store norske leksikon [SNL]. (u.å.-b). ",
      italic: "Isbre",
      suffix: ".",
      href: "https://snl.no/isbre",
    },
    {
      prefix: "Store norske leksikon [SNL]. (u.å.-c). ",
      italic: "Raet",
      suffix: ".",
      href: "https://snl.no/Raet",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.). ",
      italic: "Kompetansemål etter geofag 1 (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv972",
    },
  ],
  landformer: [
    {
      prefix: "Gjessing, J. (1978). ",
      italic: "Norges landformer",
      suffix: ". Universitetsforlaget.",
      href: "https://urn.nb.no/URN:NBN:no-nb_digibok_2012050908064",
    },
    {
      prefix: "Holtedahl, O. (1960). Features of the geomorphology. I O. Holtedahl (Red.), ",
      italic: "Geology of Norway (NGU Skrifter 208)",
      suffix: " (s. 508–534). Norges geologiske undersøkelse.",
      href: "https://www.ngu.no/",
    },
    {
      prefix: "Hjulström, F. (1935). Studies of the morphological activity of rivers as illustrated by the River Fyris. ",
      italic: "Bulletin of the Geological Institution of the University of Uppsala, 25",
      suffix: ", 221–527.",
    },
    {
      prefix: "Benn, D. I., & Evans, D. J. A. (2010). ",
      italic: "Glaciers and Glaciation",
      suffix: " (2. utg.). Routledge.",
      href: "https://doi.org/10.4324/9780203785010",
    },
    {
      prefix: "Nesje, A., & Dahl, S. O. (1993). The high mountain style of landforms in southern Norway: A result of multiple quaternary glaciations. ",
      italic: "Norsk Geologisk Tidsskrift, 73",
      suffix: "(2), 125–135.",
      href: "https://geologi.no/tidsskrift",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.). ",
      italic: "Løsmasser og glasiale landformer i Norge",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/losmasser",
    },
    {
      prefix: "Store norske leksikon [SNL]. (u.å.). ",
      italic: "Raet",
      suffix: ".",
      href: "https://snl.no/Raet",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.). ",
      italic: "Kompetansemål etter geofag 1 (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv972",
    },
    {
      prefix:
        "Murton, J. B., Peterson, R., & Ozouf, J.-C. (2006). Bedrock fracture by ice segregation in cold regions. ",
      italic: "Science, 314",
      suffix: "(5802), 1127–1129.",
      href: "https://doi.org/10.1126/science.1132127",
    },
    {
      prefix: "Matsuoka, N., & Murton, J. (2008). Frost weathering: Recent advances and future directions. ",
      italic: "Permafrost and Periglacial Processes, 19",
      suffix: "(2), 195–210.",
      href: "https://doi.org/10.1002/ppp.620",
    },
    {
      prefix: "Egholm, D. L., Nielsen, S. B., Pedersen, V. K., & Lesemann, J.-E. (2009). Glacial effects limiting mountain height. ",
      italic: "Nature, 460",
      suffix: "(7257), 884–887.",
      href: "https://doi.org/10.1038/nature08263",
    },
    {
      prefix:
        "Nielsen, S. B., Gallagher, K., Leighton, C., Balling, N., Svenningsen, L., Jacobsen, B. H., Thomsen, E., Nielsen, O. B., Heilmann-Clausen, C., Egholm, D. L., Summerfield, M. A., Clausen, O. R., Piotrowski, J. A., Thorsen, M. R., Huuse, M., Abrahamsen, N., King, C., & Lykke-Andersen, H. (2009). The evolution of western Scandinavian topography: A review of Neogene uplift versus the ICE (isostasy–climate–erosion) hypothesis. ",
      italic: "Journal of Geodynamics, 47",
      suffix: "(2–3), 72–95.",
      href: "https://doi.org/10.1016/j.jog.2008.09.001",
    },
  ],
  vannFlom: [
    {
      prefix: "Freeze, R. A., & Cherry, J. A. (1979). ",
      italic: "Groundwater",
      suffix: ". Prentice-Hall.",
    },
    {
      prefix: "Meteorologisk institutt [MET]. (2023). ",
      italic: "Over 100 år siden det har regnet så mye på Østlandet",
      suffix: ".",
      href: "https://www.met.no/nyhetsarkiv/over-100-ar-siden-det-har-regnet-sa-mye-pa-ostlandet",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-a). ",
      italic: "Grunnvann",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/grunnvann",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-b). ",
      italic: "Grunnvannets bevegelse",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/grunnvannets-bevegelse",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-c). ",
      italic: "Grunnvannsressurser",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/grunnvannsressurser",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-d). ",
      italic: "Om nasjonal grunnvannsdatabase (GRANADA)",
      suffix: ".",
      href: "https://www.ngu.no/node/274",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-e). ",
      italic: "Vannets kretsløp",
      suffix: ".",
      href: "https://www.ngu.no/grunnvann/generelt-om-grunnvann/vannets-kretsløp",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (u.å.-a). ",
      italic: "Flom",
      suffix: ".",
      href: "https://www.nve.no/naturfare/laer-om-naturfare/flom/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (u.å.-b). ",
      italic: "Markvann og grunnvann",
      suffix: ".",
      href: "https://www.nve.no/vann-og-vassdrag/vannets-kretsloep/markvann-og-grunnvann/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (u.å.-c). ",
      italic: "Regnflom",
      suffix: ".",
      href: "https://www.nve.no/naturfare/laer-om-naturfare/flom/regnflom/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (2024). ",
      italic: "Tørke-, flom- og jordskredåret 2023",
      suffix: ".",
      href: "https://www.nve.no/nytt-fra-nve/nyheter-hydrologi/toerke-flom-og-jordskredaaret-2023/",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 1",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv972",
    },
    {
      prefix: "Varsom. (u.å.-a). ",
      italic: "Ordliste for flom",
      suffix: ".",
      href: "https://varsom.no/flom-og-jordskred/ordliste/ordliste-for-flom/",
    },
    {
      prefix: "Varsom. (u.å.-b). ",
      italic: "Vårflom",
      suffix: ".",
      href: "https://varsom.no/flom-og-jordskred/om-flom-og-jordskred/varflom/",
    },
  ],
  skred: [
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-a). ",
      italic: "Hva er kvikkleire og hvor finnes den i Norge?",
      suffix: ".",
      href: "https://www.ngu.no/geologi-og-risiko/kvikkleire",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-b). ",
      italic: "Hva utløser kvikkleireskred?",
      suffix: ".",
      href: "https://www.ngu.no/geologi-og-risiko/hva-utloser-kvikkleireskred",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-c). ",
      italic: "Hvordan redusere risikoen for kvikkleireskred?",
      suffix: ".",
      href: "https://www.ngu.no/geologi-og-risiko/hvordan-redusere-risikoen-kvikkleireskred",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-d). ",
      italic: "Skred og ras",
      suffix: ".",
      href: "https://www.ngu.no/geologi-og-risiko/skred-og-ras",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (2020a). ",
      italic: "Jordskred",
      suffix: ".",
      href: "https://www.nve.no/naturfare/laer-om-naturfare/om-skred/jordskred/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (2020b). ",
      italic: "Om kartlegging av skredfare i bratt terreng",
      suffix: ".",
      href: "https://www.nve.no/naturfare/utredning-av-naturfare/om-kart-og-kartlegging-av-naturfare/om-kartlegging-av-skredfare-i-bratt-terreng/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (2020c). ",
      italic: "Om skred",
      suffix: ".",
      href: "https://www.nve.no/naturfare/laer-om-naturfare/om-skred/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (2020d). ",
      italic: "Steinsprang og steinskred",
      suffix: ".",
      href: "https://www.nve.no/naturfare/laer-om-naturfare/om-skred/steinsprang-og-steinskred/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (2021a). ",
      italic: "Fjellskredovervåking",
      suffix: ".",
      href: "https://www.nve.no/naturfare/overvaking-og-varsling/fjellskredovervaaking/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (2021b). ",
      italic: "Kva er kvikkleire og kvikkleireskred?",
      suffix: ".",
      href: "https://www.nve.no/naturfare/laer-om-naturfare/om-skred/kva-er-kvikkleire-og-kvikkleireskred/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (2023). ",
      italic: "Bakgrunn og historie",
      suffix: " [Gjerdrum].",
      href: "https://www.nve.no/naturfare/sikringstiltak/sikringsprosjekter/gjerdrum/bakgrunn-og-historie/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (2026a). ",
      italic: "Mannen",
      suffix: ".",
      href: "https://www.nve.no/naturfare/overvaking-og-varsling/fjellskredovervaaking/kontinuerlig-overvaakede-fjellpartier/mannen/",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (2026b). ",
      italic: "Åknes",
      suffix: ".",
      href: "https://www.nve.no/naturfare/overvaking-og-varsling/fjellskredovervaaking/kontinuerlig-overvaakede-fjellpartier/aaknes/",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 1",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv972",
    },
    {
      prefix: "Varsom. (u.å.-a). ",
      italic: "Flom og jordskred",
      suffix: ".",
      href: "https://www.varsom.no/flom-og-jordskredvarsling",
    },
    {
      prefix: "Varsom. (u.å.-b). ",
      italic: "Varslingsnivåer i farger",
      suffix: ".",
      href: "https://www.varsom.no/flom-og-jordskred/varslingsnivaer-i-farger/",
    },
  ],
  ressurser: [
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-a). ",
      italic: "Grunnvann",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/grunnvann",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-b). ",
      italic: "Industrimineraler",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/industrimineraler",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-c). ",
      italic: "Kobber. Hvor finnes det kobber i Norge?",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/kobber",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-d). ",
      italic: "Larvikitt",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/larvikitt",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-e). ",
      italic: "Metaller",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/metaller",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-f). ",
      italic: "Mineraler og metaller",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/mineraler-og-metaller",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-g). ",
      italic: "Naturstein",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/naturstein",
    },
    {
      prefix: "Store norske leksikon [SNL]. (2024a). ",
      italic: "Malm",
      suffix: ".",
      href: "https://snl.no/malm",
    },
    {
      prefix: "Store norske leksikon [SNL]. (2024b). ",
      italic: "Pukk",
      suffix: ".",
      href: "https://snl.no/pukk",
    },
    {
      prefix: "Store norske leksikon [SNL]. (2025). ",
      italic: "Petroleum",
      suffix: ".",
      href: "https://snl.no/petroleum",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 1",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv972",
    },
  ],
  feltarbeid: [
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.). ",
      italic: "Mineraler og metaller",
      suffix: ".",
      href: "https://www.ngu.no/geologiske-ressurser/mineraler-og-metaller",
    },
    {
      prefix: "Store norske leksikon [SNL]. (2026). ",
      italic: "Feltarbeid",
      suffix: ".",
      href: "https://snl.no/feltarbeid",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 1",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv972",
    },
  ],
  trykk: [
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-a). ",
      italic: "Air pressure",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/atmosphere/air-pressure",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-b). ",
      italic: "Layers of the atmosphere",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/atmosphere/layers-of-atmosphere",
    },
    {
      prefix: "Store norske leksikon. (u.å.-a). ",
      italic: "Høytrykk",
      suffix: ".",
      href: "https://snl.no/h%C3%B8ytrykk",
    },
    {
      prefix: "Store norske leksikon. (u.å.-b). ",
      italic: "Lavtrykk",
      suffix: ".",
      href: "https://snl.no/lavtrykk",
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
  vindsystemet: [
    {
      prefix: "National Aeronautics and Space Administration [NASA]. (u.å.). ",
      italic: "Climate and Earth’s energy budget",
      suffix: ".",
      href: "https://earthobservatory.nasa.gov/features/EnergyBalance",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-a). ",
      italic: "Global atmospheric circulations",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/global/global-atmospheric-circulations",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-b). ",
      italic: "Inter-Tropical Convergence Zone",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/tropical/convergence-zone",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-c). ",
      italic: "The jet stream",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/global/jet-stream",
    },
    {
      prefix: "Store norske leksikon. (u.å.-a). ",
      italic: "Hadleycellen",
      suffix: ".",
      href: "https://snl.no/Hadleycellen",
    },
    {
      prefix: "Store norske leksikon. (u.å.-b). ",
      italic: "Intertropiske konvergenssone",
      suffix: ".",
      href: "https://snl.no/intertropiske_konvergenssone",
    },
    {
      prefix: "Store norske leksikon. (u.å.-c). ",
      italic: "Passat",
      suffix: ".",
      href: "https://snl.no/passat",
    },
    {
      prefix: "Store norske leksikon. (u.å.-d). ",
      italic: "Monsun",
      suffix: ".",
      href: "https://snl.no/monsun",
    },
    {
      prefix: "Store norske leksikon. (u.å.-e). ",
      italic: "Klima i Norge",
      suffix: ".",
      href: "https://snl.no/Klima_i_Norge",
    },
    {
      prefix: "Store norske leksikon. (u.å.-f). ",
      italic: "Regnskygge",
      suffix: ".",
      href: "https://snl.no/regnskygge",
    },
    {
      prefix: "Store norske leksikon. (u.å.-g). ",
      italic: "Orografisk nedbør",
      suffix: ".",
      href: "https://snl.no/orografisk_nedb%C3%B8r",
    },
    {
      prefix: "Store norske leksikon. (u.å.-h). ",
      italic: "Polarfront",
      suffix: ".",
      href: "https://snl.no/polarfront",
    },
    {
      prefix: "American Meteorological Society [AMS]. (u.å.). ",
      italic: "Ferrel cell",
      suffix: ". Glossary of Meteorology.",
      href: "https://glossary.ametsoc.org/wiki/ferrel-cell/",
    },
  ],
  jetstrommer: [
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-a). ",
      italic: "The jet stream",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/global/jet-stream",
    },
    {
      prefix: "American Meteorological Society [AMS]. (u.å.). Jet stream. I ",
      italic: "Glossary of Meteorology",
      suffix: ".",
      href: "https://glossary.ametsoc.org/wiki/Jet_stream",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-b). ",
      italic: "North Atlantic Oscillation",
      suffix: ".",
      href: "https://www.climate.gov/news-features/understanding-climate/climate-variability-north-atlantic-oscillation",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-c). ",
      italic: "El Niño and La Niña",
      suffix: ".",
      href: "https://www.climate.gov/enso",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021). ",
      italic:
        "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/",
    },
    {
      prefix: "AMAP. (2021). ",
      italic: "Arctic climate change update 2021: Key trends and impacts",
      suffix: ".",
      href: "https://www.amap.no/documents/doc/arctic-climate-change-update-2021-key-trends-and-impacts/3594",
    },
    {
      prefix:
        "Rantanen, M. mfl. (2022). The Arctic has warmed nearly four times faster than the globe since 1979. ",
      italic: "Communications Earth & Environment, 3",
      suffix: ", 168.",
      href: "https://doi.org/10.1038/s43247-022-00498-3",
    },
  ],
  coriolis: [
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-a). ",
      italic: "The Coriolis effect: What is the Coriolis effect and how does it influence ocean currents?",
      suffix: ".",
      href: "https://oceanservice.noaa.gov/education/tutorial_currents/04currents1.html",
    },
    {
      prefix: "Store norske leksikon. (u.å.). ",
      italic: "Corioliskraften",
      suffix: ".",
      href: "https://snl.no/corioliskraften",
    },
    {
      prefix: "American Meteorological Society [AMS]. (u.å.). ",
      italic: "Glossary of meteorology: Coriolis parameter and geostrophic balance",
      suffix: ".",
      href: "https://glossary.ametsoc.org/wiki/Coriolis_parameter",
    },
    {
      prefix: "Met Office. (u.å.). ",
      italic: "What is the Coriolis effect?",
      suffix: ".",
      href: "https://www.metoffice.gov/weather/learn-about/weather/atmosphere/coriolis-effect",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-b). ",
      italic: "The Ekman spiral and coastal upwelling",
      suffix: ".",
      href: "https://oceanservice.noaa.gov/education/tutorial_currents/04currents4.html",
    },
    {
      prefix:
        "Chang, C.-P., Liu, C.-H., & Kuo, H.-C. (2003). Typhoon Vamei: An equatorial tropical cyclone formation. ",
      italic: "Geophysical Research Letters, 30",
      suffix: "(3).",
      href: "https://doi.org/10.1029/2002GL016365",
    },
    {
      prefix: "Penn State College of Earth and Mineral Sciences. (u.å.). ",
      italic: "Getting a handle on the wind",
      suffix: " (METEO 3: Weather Revealed).",
      href: "https://courses.ems.psu.edu/meteo3/node/2226",
    },
  ],
  havstrommer: [
    {
      prefix: "Ekman, V. W. (1905). On the influence of the Earth's rotation on ocean-currents. ",
      italic: "Arkiv för matematik, astronomi och fysik, 2",
      suffix: "(11), 1–52.",
    },
    {
      prefix: "Stommel, H. (1948). The westward intensification of wind-driven ocean currents. ",
      italic: "Transactions, American Geophysical Union, 29",
      suffix: "(2), 202–206.",
      href: "https://doi.org/10.1029/TR029i002p00202",
    },
    {
      prefix: "Talley, L. D., Pickard, G. L., Emery, W. J., & Swift, J. H. (2011). ",
      italic: "Descriptive physical oceanography: An introduction",
      suffix: " (6. utg.). Academic Press.",
    },
    {
      prefix: "Marshall, J., & Plumb, R. A. (2008). ",
      italic: "Atmosphere, ocean, and climate dynamics: An introductory text",
      suffix: ". Academic Press.",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-a). ",
      italic: "Ocean currents",
      suffix: ".",
      href: "https://oceanservice.noaa.gov/education/tutorial_currents/",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-b). ",
      italic: "The Ekman spiral",
      suffix: ".",
      href: "https://oceanservice.noaa.gov/education/tutorial_currents/04currents4.html",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-c). ",
      italic: "Atlantic meridional overturning circulation",
      suffix: ".",
      href: "https://www.climate.gov/news-features/understanding-climate/climate-change-atlantic-meridional-overturning-circulation",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-d). ",
      italic: "What is upwelling?",
      suffix: ".",
      href: "https://oceanservice.noaa.gov/facts/upwelling.html",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021). ",
      italic:
        "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/",
    },
    {
      prefix: "Store norske leksikon. (u.å.). ",
      italic: "Klima i Norge",
      suffix: ".",
      href: "https://snl.no/Klima_i_Norge",
    },
  ],
  kryosfaeren: [
    {
      prefix: "AMAP. (2021). ",
      italic: "Arctic climate change update 2021: Key trends and impacts",
      suffix: ".",
      href: "https://www.amap.no/documents/doc/arctic-climate-change-update-2021-key-trends-and-impacts/3594",
    },
    {
      prefix:
        "Rantanen, M. mfl. (2022). The Arctic has warmed nearly four times faster than the globe since 1979. ",
      italic: "Communications Earth & Environment, 3",
      suffix: ", 168.",
      href: "https://doi.org/10.1038/s43247-022-00498-3",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (2023). ",
      italic: "Glaciological investigations in Norway 2022",
      suffix: " (NVE Rapport 26/2023). NVE.",
      href: "https://publikasjoner.nve.no/rapport/2023/rapport2023_26.pdf",
    },
    {
      prefix: "National Snow and Ice Data Center [NSIDC]. (u.å.). ",
      italic: "All about sea ice",
      suffix: ".",
      href: "https://nsidc.org/learn/parts-cryosphere/sea-ice",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021). Ocean, cryosphere and sea level change. I ",
      italic: "Climate change 2021: The physical science basis",
      suffix: " (s. 1211–1362). Cambridge University Press.",
      href: "https://doi.org/10.1017/9781009157896.011",
    },
    {
      prefix: "Benn, D. I., & Evans, D. J. A. (2010). ",
      italic: "Glaciers and glaciation",
      suffix: " (2. utg.). Routledge.",
    },
    {
      prefix:
        "Gisnås, K., Etzelmüller, B., Lussana, C., Hjort, J., Sannel, A. B. K., Isaksen, K., Westermann, S., Kuhry, P., Nussbaumer, S. U., Boike, J., Degeller, R., & Joshi, S. (2017). Permafrost map for Norway, Sweden and Finland. ",
      italic: "Permafrost and Periglacial Processes, 28",
      suffix: "(2), 359–378.",
      href: "https://doi.org/10.1002/ppp.1922",
    },
    {
      prefix: "Schweizer, J., Jamieson, J. B., & Schneebeli, M. (2003). Snow avalanche formation. ",
      italic: "Reviews of Geophysics, 41",
      suffix: "(4), 1016.",
      href: "https://doi.org/10.1029/2002RG000123",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (u.å.). ",
      italic: "Snøskredvarsling i Norge",
      suffix: ". Varsom.",
      href: "https://www.varsom.no/snoskred",
    },
    {
      prefix: "Store norske leksikon. (u.å.). ",
      italic: "Permafrost",
      suffix: ".",
      href: "https://snl.no/permafrost",
    },
    {
      prefix: "Utdanningsdirektoratet. (2020). ",
      italic: "Læreplan i geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03",
    },
  ],
  klima: [
    {
      prefix: "World Meteorological Organization [WMO]. (u.å.). ",
      italic: "Climate",
      suffix: ".",
      href: "https://wmo.int/topics/climate",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021). ",
      italic:
        "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/",
    },
    {
      prefix: "National Aeronautics and Space Administration [NASA]. (u.å.-a). ",
      italic: "The greenhouse effect",
      suffix: ".",
      href: "https://science.nasa.gov/climate-change/faq/what-is-the-greenhouse-effect/",
    },
    {
      prefix: "National Aeronautics and Space Administration [NASA]. (u.å.-b). ",
      italic: "Ocean warming",
      suffix: ".",
      href: "https://climate.nasa.gov/vital-signs/ocean-warming/",
    },
    {
      prefix: "National Aeronautics and Space Administration [NASA]. (u.å.-c). ",
      italic: "Climate and Earth’s energy budget",
      suffix: ".",
      href: "https://earthobservatory.nasa.gov/features/EnergyBalance",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.). ",
      italic: "El Niño and La Niña",
      suffix: ".",
      href: "https://www.climate.gov/enso",
    },
  ],
  oversikt: [
    {
      prefix: "World Meteorological Organization [WMO]. (u.å.). ",
      italic: "Climate",
      suffix: ".",
      href: "https://wmo.int/themes/climate",
    },
    {
      prefix: "National Aeronautics and Space Administration [NASA]. (u.å.-a). ",
      italic: "What is the greenhouse effect?",
      suffix: ".",
      href: "https://science.nasa.gov/climate-change/faq/what-is-the-greenhouse-effect/",
    },
    {
      prefix: "National Aeronautics and Space Administration [NASA]. (u.å.-b). ",
      italic: "Ocean warming",
      suffix: ".",
      href: "https://science.nasa.gov/earth/explore/earth-indicators/ocean-warming/",
    },
    {
      prefix: "National Aeronautics and Space Administration [NASA]. (2009). ",
      italic: "Climate and Earth’s energy budget",
      suffix: ".",
      href: "https://science.nasa.gov/earth/earth-observatory/climate-and-earths-energy-budget/",
    },
    {
      prefix: "Store norske leksikon. (u.å.). ",
      italic: "Klima i Norge",
      suffix: ".",
      href: "https://snl.no/Klima_i_Norge",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer – Geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 2 (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973",
    },
  ],
  enso: [
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-a). ",
      italic: "El Niño & La Niña (El Niño-Southern Oscillation)",
      suffix: ".",
      href: "https://www.climate.gov/enso",
    },
    {
      prefix: "L'Heureux, M. (2014). ",
      italic: "What is the El Niño–Southern Oscillation (ENSO) in a nutshell?",
      suffix: " NOAA Climate.gov.",
      href: "https://www.climate.gov/news-features/blogs/enso/what-el-nino-southern-oscillation-enso-nutshell",
    },
    {
      prefix: "Di Liberto, T. (2014). ",
      italic: "The Walker circulation: ENSO's atmospheric buddy",
      suffix: ". NOAA Climate.gov.",
      href: "https://www.climate.gov/news-features/blogs/enso/walker-circulation-ensos-atmospheric-buddy",
    },
    {
      prefix: "Barnston, A. (2014). ",
      italic: "How ENSO leads to a cascade of global impacts",
      suffix: ". NOAA Climate.gov.",
      href: "https://www.climate.gov/news-features/blogs/enso/how-enso-leads-cascade-global-impacts",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-b). ",
      italic: "El Niño and La Niña: Frequently asked questions",
      suffix: ".",
      href: "https://www.climate.gov/news-features/understanding-climate/el-nino-and-la-nina-frequently-asked-questions",
    },
    {
      prefix: "Climate Prediction Center. (u.å.). ",
      italic: "Oceanic Niño Index (ONI)",
      suffix: ". National Oceanic and Atmospheric Administration.",
      href: "https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/oni/v6/",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer – Geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 2 (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973",
    },
  ],
  iod: [
    {
      prefix:
        "Ashok, K., Guan, Z., & Yamagata, T. (2001). Impact of the Indian Ocean dipole on the relationship between the Indian monsoon rainfall and ENSO. ",
      italic: "Geophysical Research Letters, 28",
      suffix: "(23), 4499–4502.",
      href: "https://doi.org/10.1029/2001GL013294",
    },
    {
      prefix: "Australian Bureau of Meteorology [BOM]. (u.å.). ",
      italic: "Indian Ocean Dipole",
      suffix: ". Lest 10. oktober 2026.",
      href: "https://www.bom.gov.au/resources/learn-and-explore/climate-knowledge-centre/climate-factors/indian-ocean-dipole",
    },
    {
      prefix:
        "Cai, W., van Rensch, P., Cowan, T., & Hendon, H. H. (2011). Teleconnection pathways of ENSO and the IOD and the mechanisms for impacts on Australian rainfall. ",
      italic: "Journal of Climate, 24",
      suffix: "(15), 3910–3923.",
      href: "https://doi.org/10.1175/2011JCLI4129.1",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.). ",
      italic: "The jet stream",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/global/jet-stream",
    },
    {
      prefix: "NOAA National Centers for Environmental Information. (2026). ",
      italic: "Daily Optimum Interpolation Sea Surface Temperature (OISST), versjon 2.1",
      suffix: " [Datasett, 24. september 2026]. Brukt i figur 3.",
      href: "https://www.ncei.noaa.gov/products/optimum-interpolation-sst",
    },
    {
      prefix:
        "Saji, N. H., Goswami, B. N., Vinayachandran, P. N., & Yamagata, T. (1999). A dipole mode in the tropical Indian Ocean. ",
      italic: "Nature, 401",
      suffix: "(6751), 360–363.",
      href: "https://doi.org/10.1038/43854",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer – Geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 2 (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973",
    },
    {
      prefix: "World Meteorological Organization [WMO]. (2022). ",
      italic: "East Africa seasonal outlook: short rains season",
      suffix: ".",
      href: "https://wmo.int/media/news/east-africa-seasonal-outlook-short-rains-season",
    },
  ],
  nao: [
    {
      prefix: "Brönnimann, S. (2007). Impact of El Niño–Southern Oscillation on European climate. ",
      italic: "Reviews of Geophysics, 45",
      suffix: "(3), RG3003.",
      href: "https://doi.org/10.1029/2006RG000199",
    },
    {
      prefix:
        "Doblas-Reyes, F. J., Sörensson, A. A., Almazroui, M., m.fl. (2021). Linking global to regional climate change. I ",
      italic:
        "Climate Change 2021: The Physical Science Basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change",
      suffix: " (s. 1363–1512). Cambridge University Press. Siteres som (IPCC, 2021), Cross-Chapter Box 10.1.",
      href: "https://doi.org/10.1017/9781009157896.012",
    },
    {
      prefix: "Lindsey, R. (2021, 5. mars). ",
      italic: "Understanding the Arctic polar vortex",
      suffix: ". NOAA Climate.gov. Siteres som (NOAA Climate.gov, 2021).",
      href: "https://www.climate.gov/news-features/understanding-climate/understanding-arctic-polar-vortex",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-a). ",
      italic: "Climate variability: North Atlantic Oscillation",
      suffix: ". NOAA Climate.gov.",
      href: "https://www.climate.gov/news-features/understanding-climate/climate-variability-north-atlantic-oscillation",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-b). ",
      italic: "Longwaves and shortwaves",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/upper-air-charts/longwaves-and-shortwaves",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-c). ",
      italic: "The jet stream",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/global/jet-stream",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.-d). ",
      italic: "Global atmospheric circulations",
      suffix: ".",
      href: "https://www.noaa.gov/jetstream/global/global-atmospheric-circulations",
    },
    {
      prefix: "NOAA Ocean Service. (u.å.). ",
      italic: "What is a Rossby wave?",
      suffix: ".",
      href: "https://oceanservice.noaa.gov/facts/rossby-wave.html",
    },
    {
      prefix: "Store norske leksikon. (u.å.). ",
      italic: "Den nord-atlantiske oscillasjonen",
      suffix: ".",
      href: "https://snl.no/Den_nord-atlantiske_oscillasjonen",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
      italic: "Kjerneelementer – Geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
    },
    {
      prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
      italic: "Kompetansemål etter geofag 2 (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973",
    },
  ],
  amoc: [
    {
      prefix: "Stommel, H. (1961). Thermohaline convection with two stable regimes of flow. ",
      italic: "Tellus, 13",
      suffix: "(2), 224–230.",
      href: "https://doi.org/10.1111/j.2153-3490.1961.tb00079.x",
    },
    {
      prefix: "Broecker, W. S. (1991). The great ocean conveyor. ",
      italic: "Oceanography, 4",
      suffix: "(2), 79–89.",
      href: "https://doi.org/10.5670/oceanog.1991.07",
    },
    {
      prefix:
        "Rahmstorf, S., Box, J. E., Feulner, G., Mann, M. E., Robinson, A., Rutherford, S., & Schaffernicht, E. J. (2015). Exceptional twentieth-century slowdown in Atlantic Ocean overturning circulation. ",
      italic: "Nature Climate Change, 5",
      suffix: "(5), 475–480.",
      href: "https://doi.org/10.1038/nclimate2554",
    },
    {
      prefix:
        "Caesar, L., Rahmstorf, S., Robinson, A., Feulner, G., & Saba, V. (2018). Observed fingerprint of a weakening Atlantic Ocean overturning circulation. ",
      italic: "Nature, 556",
      suffix: "(7700), 191–196.",
      href: "https://doi.org/10.1038/s41586-018-0006-5",
    },
    {
      prefix:
        "Ditlevsen, P., & Ditlevsen, S. (2023). Warning of a forthcoming collapse of the Atlantic meridional overturning circulation. ",
      italic: "Nature Communications, 14",
      suffix: "(1), 4254.",
      href: "https://doi.org/10.1038/s41467-023-39810-w",
    },
    {
      prefix:
        "van Westen, R. M., Kliphuis, M., & Dijkstra, H. A. (2024). Physics-based early warning signal shows that AMOC is on tipping course. ",
      italic: "Science Advances, 10",
      suffix: "(6), eadk1189.",
      href: "https://doi.org/10.1126/sciadv.adk1189",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021). ",
      italic:
        "Chapter 9: Ocean, cryosphere and sea level change. In Climate Change 2021: The Physical Science Basis",
      suffix: ". Cambridge University Press.",
      href: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-9/",
    },
    {
      prefix:
        "Yin, J., Schlesinger, M. E., & Stouffer, R. J. (2009). Model projections of rapid sea-level rise on the northeast coast of the United States. ",
      italic: "Nature Geoscience, 2",
      suffix: ", 262–266.",
      href: "https://doi.org/10.1038/ngeo462",
    },
  ],
  modeller: [
    {
      prefix: "European Centre for Medium-Range Weather Forecasts [ECMWF]. (u.å.-a). ",
      italic: "IFS documentation",
      suffix: ".",
      href: "https://www.ecmwf.int/en/forecasts",
    },
    {
      prefix: "Meteorologisk institutt [MET]. (u.å.-a). ",
      italic: "Locationforecast data model",
      suffix: ".",
      href: "https://api.met.no/doc/locationforecast/datamodel",
    },
    {
      prefix: "Meteorologisk institutt [MET]. (u.å.-b). ",
      italic: "Subseasonal data model",
      suffix: " [MEPS og ECMWF].",
      href: "https://docs.api.met.no/doc/subseasonal/datamodel.html",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021). ",
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
    {
      prefix:
        "Bjerknes, V. (1904). Das Problem der Wettervorhersage, betrachtet vom Standpunkte der Mechanik und der Physik. ",
      italic: "Meteorologische Zeitschrift, 21",
      suffix: ", 1–7.",
      href: "https://explore.scopus.com/record?eid=2-s2.0-85010645063",
    },
    {
      prefix: "Richardson, L. F. (1922). ",
      italic: "Weather prediction by numerical process",
      suffix: ". Cambridge University Press.",
      href: "https://archive.org/details/weatherpredictio00richrich",
    },
    {
      prefix: "European Centre for Medium-Range Weather Forecasts [ECMWF]. (u.å.-b). ",
      italic: "L137 model level definitions",
      suffix: ".",
      href: "https://confluence.ecmwf.int/display/UDOC/L137+model+level+definitions",
    },
    {
      prefix: "Meteorologisk institutt [MET]. (u.å.-c). ",
      italic: "MetCoOp",
      suffix: ".",
      href: "https://www.met.no/en/projects/metcoop",
    },
  ],
  paleoklima: [
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.). ",
      italic: "Trends in atmospheric carbon dioxide",
      suffix: ".",
      href: "https://gml.noaa.gov/ccgg/trends/",
    },
    {
      prefix: "National Snow and Ice Data Center [NSIDC]. (u.å.). ",
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
    {
      prefix:
        "Dahl, S. O., & Nesje, A. (1994). Holocene glacier fluctuations at Hardangerjøkulen, central-southern Norway. ",
      italic: "The Holocene, 4",
      suffix: "(3), 269–277.",
      href: "https://doi.org/10.1177/095968369400400306",
    },
    {
      prefix:
        "Åkesson, H., Nisancioglu, K. H., Giesen, R. H., & Morlighem, M. (2017). Simulating the evolution of Hardangerjøkulen ice cap in southern Norway since the mid-Holocene and its sensitivity to climate change. ",
      italic: "The Cryosphere, 11",
      suffix: ", 281–302.",
      href: "https://doi.org/10.5194/tc-11-281-2017",
    },
    {
      prefix:
        "Inglis, G. N. mfl. (2020). Global mean surface temperature and climate sensitivity of the EECO, PETM, and latest Paleocene. ",
      italic: "Climate of the Past, 16",
      suffix: ", 1953–1968.",
      href: "https://doi.org/10.5194/cp-16-1953-2020",
    },
  ],
  milankovitch: [
    {
      prefix: "National Aeronautics and Space Administration [NASA]. (u.å.). ",
      italic: "Milankovitch (orbital) cycles and their role in Earth’s climate",
      suffix: ".",
      href: "https://science.nasa.gov/science-research/earth-science/milankovitch-orbital-cycles-and-their-role-in-earths-climate/",
    },
    {
      prefix: "National Aeronautics and Space Administration. (2000). ",
      italic: "Milankovitch cycles and glaciation",
      suffix: ".",
      href: "https://earthobservatory.nasa.gov/features/Milankovitch",
    },
    {
      prefix:
        "Hays, J. D., Imbrie, J., & Shackleton, N. J. (1976). Variations in the Earth’s orbit: Pacemaker of the ice ages. ",
      italic: "Science, 194",
      suffix: "(4270), 1121–1132.",
      href: "https://doi.org/10.1126/science.194.4270.1121",
    },
    {
      prefix:
        "Lisiecki, L. E., & Raymo, M. E. (2005). A Pliocene-Pleistocene stack of 57 globally distributed benthic δ¹⁸O records. ",
      italic: "Paleoceanography, 20",
      suffix: "(1), PA1003.",
      href: "https://doi.org/10.1029/2004PA001071",
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
        "Walker, M., Johnsen, S., Rasmussen, S. O., Popp, T., Steffensen, J.-P., Gibbard, P., Hoek, W., Lowe, J., Andrews, J., Björck, S., Cwynar, L. C., Hughen, K., Kershaw, P., Kromer, B., Litt, T., Lowe, D. J., Nakagawa, T., Newnham, R., & Schwander, J. (2009). Formal definition and dating of the GSSP (Global Stratotype Section and Point) for the base of the Holocene using the Greenland NGRIP ice core, and selected auxiliary records. ",
      italic: "Journal of Quaternary Science, 24",
      suffix: "(1), 3–17.",
      href: "https://doi.org/10.1002/jqs.1227",
    },
    {
      prefix: "Berger, A., & Loutre, M. F. (2002). An exceptionally long interglacial ahead? ",
      italic: "Science, 297",
      suffix: "(5585), 1287–1288.",
      href: "https://doi.org/10.1126/science.1076120",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change. (2021). ",
      italic:
        "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-a). ",
      italic: "Marin grense",
      suffix: ".",
      href: "https://www.ngu.no/emne/marin-grense",
    },
    {
      prefix: "Norges geologiske undersøkelse [NGU]. (u.å.-b). ",
      italic: "Om kart over marin grense",
      suffix: ".",
      href: "https://www.ngu.no/om-geologi/om-kart-over-marin-grense",
    },
    {
      prefix:
        "Parrenin, F. mfl. (2013). Synchronous change of atmospheric CO₂ and Antarctic temperature during the last deglacial warming. ",
      italic: "Science, 339",
      suffix: ", 1060–1063.",
      href: "https://doi.org/10.1126/science.1226368",
    },
  ],
  vaerkatastrofer: [
    {
      prefix: "National Hurricane Center [NHC]. (u.å.). ",
      italic: "Tropical cyclone climatology",
      suffix: ".",
      href: "https://www.nhc.noaa.gov/climo/",
    },
    {
      prefix: "National Hurricane Center [NHC]. (2023). ",
      italic: "The Saffir-Simpson Hurricane Wind Scale",
      suffix: ".",
      href: "https://www.nhc.noaa.gov/aboutsshws.php",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (u.å.). ",
      italic: "The Coriolis effect",
      suffix: ".",
      href: "https://oceanservice.noaa.gov/education/tutorial_currents/04currents1.html",
    },
    {
      prefix: "NOAA Storm Prediction Center [SPC]. (u.å.). ",
      italic: "The Enhanced Fujita Scale (EF-Scale) and Supercell Dynamics",
      suffix: ".",
      href: "https://www.spc.noaa.gov/efscale/",
    },
    {
      prefix: "Meteorologisk institutt. (u.å.-a). ",
      italic: "Polare lavtrykk — arktiske mini-orkaner",
      suffix: ".",
      href: "https://www.met.no/vaer-og-klima/ekstremvaer/polare-lavtrykk",
    },
    {
      prefix: "Meteorologisk institutt. (u.å.-b). ",
      italic: "Værstatistikk og historiske stormer i Norge",
      suffix: ".",
      href: "https://www.met.no/vaer-og-klima/ekstremvaer",
    },
    {
      prefix: "Kartverket. (u.å.). ",
      italic: "Stormflo og havnivå",
      suffix: ".",
      href: "https://www.kartverket.no/til-sjos/se-havniva",
    },
    {
      prefix: "Norges vassdrags- og energidirektorat [NVE]. (2024). ",
      italic: "Flom, overvann og ekstremnedbør: Evaluering etter ekstremværet Hans",
      suffix: ".",
      href: "https://www.nve.no/naturfare/flom-og-overvann/",
    },
    {
      prefix: "Sanders, F., & Gyakum, J. R. (1980). ",
      italic: "Synoptic-dynamic climatology of the 'Bomb'",
      suffix: ". Monthly Weather Review, 108(10), 1589–1606.",
      href: "https://doi.org/10.1175/1520-0493(1980)108<1589:SDCOT>2.0.CO;2",
    },
    {
      prefix: "Intergovernmental Panel on Climate Change [IPCC]. (2021). ",
      italic:
        "Climate change 2021: The physical science basis. Contribution of Working Group I to the Sixth Assessment Report",
      suffix: ".",
      href: "https://www.ipcc.ch/report/ar6/wg1/",
    },
    {
      prefix: "World Weather Attribution [WWA]. (u.å.). ",
      italic: "Pathways to attribution: How climate change influences extreme weather",
      suffix: ".",
      href: "https://www.worldweatherattribution.org/",
    },
    {
      prefix: "Store norske leksikon. (u.å.). ",
      italic: "Tornado og skypumper i Norge",
      suffix: ".",
      href: "https://snl.no/tornado",
    },
    {
      prefix:
        "Brunkard, J., Namulanda, G., & Ratard, R. (2008). Hurricane Katrina deaths, Louisiana, 2005. ",
      italic: "Disaster Medicine and Public Health Preparedness, 2",
      suffix: "(4), 215–223.",
      href: "https://pubmed.ncbi.nlm.nih.gov/18756175/",
    },
    {
      prefix: "Meteorologisk institutt. (2016). ",
      italic: "25 år sidan den historiske nyttårsorkanen",
      suffix: ".",
      href: "https://www.met.no/nyhetsarkiv/25-ar-siden-den-historiske-nyttarsorkanen/",
    },
    {
      prefix: "Meteorologisk institutt. (2024a). ",
      italic: "Ekstremværet Ingunn",
      suffix: " (MET-info 25/2024).",
      href: "https://www.met.no/publikasjoner/met-info/ekstremvaer/_/attachment/download/968d86dd-82b8-4fe5-b0b7-451f9b88f7ce:9d41c437c62b0cd4e8eea389fd82f42ce4b1ccb6/MET-info-25-2024.pdf",
    },
    {
      prefix: "Meteorologisk institutt. (2024b). ",
      italic: "Polare lavtrykk",
      suffix: ".",
      href: "https://www.met.no/vaer-og-klima/ekstremvaervarsler-og-andre-farevarsler/vaerfenomener-som-kan-gi-farevarsel-fra-met/polare-lavtrykk",
    },
    {
      prefix: "Meteorologisk institutt. (2025). ",
      italic: "Ekstremværet Amy",
      suffix: " (MET-info 40/2025).",
      href: "https://www.met.no/publikasjoner/met-info/ekstremvaer/_/attachment/inline/ac6dd15c-5c9f-4863-a6b9-a222be91efd1:4b377a2b7c5f398fe13be725c9dbf94bf965793f/MET-info-40-2025.pdf",
    },
    {
      prefix: "National Oceanic and Atmospheric Administration [NOAA]. (2025). ",
      italic: "What are atmospheric rivers?",
      href: "https://www.noaa.gov/stories/what-are-atmospheric-rivers",
    },
    {
      prefix: "Direktoratet for byggkvalitet. (u.å.). ",
      italic: "Byggteknisk forskrift (TEK17) § 7-2 Sikkerhet mot flom og stormflo",
      suffix: ".",
      href: "https://dibk.no/regelverk/byggteknisk-forskrift-tek17/7/7-2",
    },
  ],
  eksamen: [
    {
      prefix: "Utdanningsdirektoratet. (u.å.-a). ",
      italic: "Geofag 2 (REA3043) — eksamensinformasjon",
      suffix: ".",
      href: "https://kandidat.udir.no/eksamensinfo/REA3043",
    },
    {
      prefix: "Utdanningsdirektoratet. (u.å.-b). ",
      italic: "Eksamensplan — Geofag 2 (REA3043)",
      suffix: ".",
      href: "https://eksamensplan.udir.no/eksamen/REA3043",
    },
    {
      prefix: "Utdanningsdirektoratet. (u.å.-c). ",
      italic: "Eksamen i sikker nettleser",
      suffix: ".",
      href: "https://www.udir.no/eksamen-og-prover/eksamen/slik-endrer-vi-eksamen/eksamensfag-med-sikker-nettleser/",
    },
    {
      prefix: "Utdanningsdirektoratet. (u.å.-d). ",
      italic: "Forberede og ta eksamen",
      suffix: ".",
      href: "https://www.udir.no/eksamen-og-prover/eksamen/forberede-og-ta-eksamen/",
    },
    {
      prefix: "Utdanningsdirektoratet. (u.å.). ",
      italic: "Søk i eksamensoppgaver — sensorveiledninger og forhåndssensur (REA3043)",
      suffix: ".",
      href: "https://sokeresultat.udir.no/eksamensoppgaver.html?query=Geofag%202",
    },
    {
      prefix: "Utdanningsdirektoratet. (2020). ",
      italic: "Læreplan i geofag (GFG01-03)",
      suffix: ".",
      href: "https://www.udir.no/lk20/gfg01-03",
    },
  ],
} as const satisfies Record<string, readonly Kilde[]>;
