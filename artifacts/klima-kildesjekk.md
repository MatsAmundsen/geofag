# Kildesjekk: Klima og klimasystemer

Side: `/tema/klima`. Gren: `cursor/klima-kartet-etter-malen-ee80`. Sjekket 2026-10-07 med curl/8.0 (HTTP 200, endelig adresse).

## Brukt

| Kilde | Endelig adresse | Status | Det siden bruker |
| --- | --- | --- | --- |
| WMO (u.å.) | https://wmo.int/themes/climate | 200 (fra `https://wmo.int/topics/climate`) | Fem deler: atmosfære, hydrosfære (hav, innsjøer, elver), kryosfære (is og snø), litosfære (landoverflate), biosfære. Utveksling av energi, vann og karbondioksid. Indre dynamikk og ytre pådriv (vulkan, sol, bane, menneskelig endring av atmosfæren og arealbruk). Oppvarming av atmosfære, hav og land, i hovedsak via drivhusgass. |
| Udir (u.å.-a) | https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer | 200 | Jordsystemer: geosfæren, atmosfæren, hydrosfæren, kryosfæren og biosfæren, og vekselvirkning. Modeller brukes til å undersøke, forklare og presentere. |
| Udir (u.å.-b) | https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973 | 200 | «gjøre rede for klimasystemet på ulike skalaer i tid og rom og vurdere antropogen klimapåvirkning». |

## Tatt ut av kildelista

Disse sto på den gamle hubben, men teksten her bruker dem ikke. Oversiktssiden på `main` eier fortsatt stråling og pådriv, og får egen liste i sin PR.

- IPCC AR6 WG1-forsiden `https://www.ipcc.ch/report/ar6/wg1/`
- NASA drivhuseffekt `https://science.nasa.gov/climate-change/faq/what-is-the-greenhouse-effect/`
- NASA havoppvarming `https://climate.nasa.gov/vital-signs/ocean-warming/`
- NASA energibudsjett `https://earthobservatory.nasa.gov/features/EnergyBalance`
- NOAA ENSO `https://www.climate.gov/enso`

`KILDER.klima` deles i dag med `/tema/klima/oversikt`. Denne PR-en bytter lista til kildene hubben faktisk siterer. Oversikt-PR-en, som grener fra `main`, må beholde sine egne kilder under fletting.

## Påstander som er tatt ut

- «Vær er dager. Klima er tiår.» WMO sier long-term average over a long period, uten et årstall eller et tiårstall. Setningen er ute av brødteksten.
- Den parafraserte boksen «Gjøre rede for klimasystemet og hvordan menneskelig aktivitet kan påvirke det» og «Utdanningsdirektoratet, 2020» er byttet til det offisielle målet fra kv973.
- «uten å endre jordas totale energibalanse vesentlig» sto ikke på den åpne WMO-siden. Skillet er nå indre dynamikk mot ytre pådriv, som siden sier.
- «Svingningene rir oppå trenden» og spørsmålet om frekvens, intensitet og konsekvens sto ikke på den åpne WMO-siden. Misforståelsen sier bare at El Niño og positiv NAO hører til den indre dynamikken, mens mer drivhusgass er et ytre pådriv.

Kortene under «KlimaKart» er de eksisterende `KLIMA_SUBTHEMES`-tekstene. Oversikt-kortet sier fortsatt «Vær er dager, klima er tiår». Det er navigasjonstekst, ikke en ny påstand i brødteksten.
