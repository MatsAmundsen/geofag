/** Nye G2-temaer mot LK20-hull. Slås sammen med GF2_THEMES på oversiktssiden. */
export const GF2_GAP_THEMES = [
  {
    to: "/tema/vaerkart",
    title: "Værkart og værutvikling",
    kicker: "Atmosfæren",
    image: "/images/fig-jet.jpg",
    alt: "Tynn, rask skyelv høyt over havet mot jordas krumning",
    blurb:
      "Isobarer, fronter og 24 timer fram. Kompetansemålet er å tolke kartet, ikke bare peke på L.",
    status: "klar" as const,
  },
  {
    to: "/tema/lokale-vaersystemer",
    title: "Lokale og regionale værsystemer",
    kicker: "Atmosfæren",
    image: "/images/banner-trykk.jpg",
    alt: "Kyst i to slags vær: storm til venstre, klar himmel til høyre",
    blurb:
      "Polarfrontsyklon steg for steg. Sjøbris, dalvind og føn. Samme fysikk i tre målestokker.",
    status: "klar" as const,
  },
  {
    to: "/tema/kryosfare",
    title: "Kryosfæren",
    kicker: "Is og snø",
    image: "/images/tema-klima.jpg",
    alt: "Grønlands innlandsis mot mørkt polarhav",
    blurb:
      "Massebalanse, permafrost, havis og snøskred. Istidene ligger i paleo. Her er isen som jobber i år.",
    status: "klar" as const,
  },
  {
    to: "/tema/tilpasning",
    title: "Konsekvenser og tilpasning",
    kicker: "Samfunn",
    image: "/images/tema-katastrofer.jpg",
    alt: "En atlantisk orkan sett fra verdensrommet, med tydelig øye",
    blurb:
      "Fysikk blir skade for folk, by og økosystem. Drøft kutt og tilpasning — og hvem som betaler.",
    status: "klar" as const,
  },
  {
    to: "/tema/energi-hav-luft",
    title: "Energi fra hav og atmosfære",
    kicker: "Ressurser",
    image: "/images/tema-strommer.jpg",
    alt: "Nord-Atlanteren med fargekontrast som minner om en vestlig randstrøm",
    blurb:
      "Vind, havvind, bølger og tidevann. Bærekraft er avveining mellom kutt, areal, arter og forsyning.",
    status: "klar" as const,
  },
  {
    to: "/tema/felt-hav-luft-is",
    title: "Feltarbeid i hav, luft og is",
    kicker: "Metode",
    image: "/images/gf1-bergarter.jpg",
    alt: "Lagdelt sedimentær klippe og isskurt fjordlandskap",
    blurb:
      "Planlegg, mål, tolk og presentér i atmosfære, hav eller kryosfære. Været er både objekt og risiko.",
    status: "klar" as const,
  },
] as const;
