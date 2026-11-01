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
 * OffshoreWindShelf. Bildeteksten er Geos tekst fra fagsjekken av PR #287 (1.11.2026): fortøyningsliner
 * og sugeankere (ikke strekkstag), halvt nedsenkbar plattform ikke tegnet, og Hywind Tampen forsyner
 * Snorre og Gullfaks (energi-hav-luft.md), ikke land.
 */
export const OFFSHORE_TEKST = {
  heading: "Havdybden bestemmer teknologien: fra Nordsjøplatået til Norskerenna",
  title:
    "Snitt fra den grunne sokkelen i sørlige Nordsjø, ned skråningen og over den dype Norskerenna, til norskekysten. På den grunne sokkelen, under 50 m dyp, står en bunnfast vindturbin på en monopel pælet ned i sedimentene. I Norskerenna, 200–350 m dyp, er det for dypt for bunnfaste fundament. Der flyter en Spar-bøye med ballast, som Hywind Tampen, forankret med fortøyningsliner til sugeankere på bunnen. Flytende turbiner kan stå på dyp opp til 800 m. En høyspent sjøkabel går langs bunnen til transformator og sentralnettet på land.",
  caption:
    "Geologien og havdybden avgjør fundamentvalget for havvind. I den sørlige Nordsjøen (Danmark og Doggerbank) er havet stort sett grunnere enn 50 m, og turbinene kan stå på monopeler som er pælet ned i sedimentene. Utenfor norskekysten skjærer den glasiale Norskerenna seg ned i sokkelen, 200–350 m dyp. Her må turbinene flyte. Figuren viser en dypgående Spar-bøye, samme type som Hywind Tampen, forankret med fortøyningsliner til sugeankere på havbunnen. Halvt nedsenkbare plattformer er en annen flytende løsning, men de er ikke tegnet her. Hywind Tampen sender strømmen til olje- og gassplattformene på Snorre og Gullfaks. Andre parker sender strømmen i høyspent sjøkabel inn til nettet på land.",
};
