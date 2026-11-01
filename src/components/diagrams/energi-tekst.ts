/**
 * Tekst til energi-figurer (Geofag 2, energi-hav-luft).
 * Deles med plassholdere i prosess-figurer-lat.tsx.
 * Tall bare fra energi-hav-luft.md / widget-caption (uten Carnot).
 */
export const OTEC_TEKST = {
  heading: "OTEC: lukket Rankine-syklus og temperaturforskjell i tropisk hav",
  title:
    "Snitt av tropisk hav med OTEC-plattform. Varmt overflatevann rundt 25 °C og kaldt dypvann rundt 5 °C (ca. 1000 m) gir ΔT på minst 20 °C. I en lukket Rankine-syklus på dekk fordamper overflatevarmen ammoniakk (NH₃), dampen driver turbin og generator, og kaldt dypvann pumpes opp til kondensatoren. Pumpen sender flytende NH₃ tilbake til fordamperen. Bare sjøvannsrør går mellom hav og anlegg.",
  caption:
    "OTEC utnytter temperaturforskjellen (ΔT ≥ 20 °C) mellom varmt overflatevann (rundt 25 °C) og kaldt dypvann (rundt 5 °C) pumpet opp fra ca. 1000 m i tropene. I en lukket Rankine-syklus på dekk fordamper overflatevarmen ammoniakk (NH₃). Gassen driver turbin og generator; kaldt dypvann kondenserer den til væske igjen. Skjematisk snitt.",
};

/**
 * OffshoreWindShelf. Bildeteksten er den gamle fra energy.tsx (OffshoreWindShelfDiagram), med
 * «strekkstag» rettet til «fortøyningsliner» etter Geo-fagsjekk 26.10.2026 (Hywind Tampen har
 * fortøyningsliner og sugeankere, ikke strekkstag).
 */
export const OFFSHORE_TEKST = {
  heading: "Havdybden bestemmer teknologien: fra Nordsjøplatået til Norskerenna",
  title:
    "Snitt fra den grunne sokkelen i sørlige Nordsjø, over sokkelskråningen og den dype Norskerenna, til norskekysten. På den grunne sokkelen, under 50 m dyp, står en bunnfast vindturbin på en monopel pælet ned i sedimentene. I Norskerenna, 200–350 m dyp, er det for dypt for bunnfaste fundament. Der flyter en Spar-bøye med ballast, som Hywind Tampen, forankret med fortøyningsliner til sugeankere på bunnen. Flytende turbiner kan stå på dyp opp til 800 m. En høyspent sjøkabel går langs bunnen til transformator og sentralnettet på land.",
  caption:
    "Geologien og havdybden avgjør fundamentvalget for havvind. I den sørlige Nordsjøen (Danmark, Doggerbank) er sokkelen grunn (< 50 m), noe som tillater bunnfaste monopeler banket ned i sedimentene. Utenfor Norskekysten stuper sokkelen bratt ned i den glasiale Norskerenna (200–350 m dyp). Her må turbinene flyte på dype Spar-bøyer (som Hywind) eller halvt nedsenkbare plattformer forankret med fortøyningsliner og sugeankere til havbunnen. Høyspent sjøkabel fører strømmen inn til landnettet.",
};
