# Kapittel 2: oppfølging av Mats sine valg

Kontrollert 6. november 2026 (Europe/Oslo). Ny lokal commit på egen kapittelbranch. Ingen push, PR eller deploy.

## Utført og valg

Figur 2.4 er en egen Vg1-feltlogg: stedkode, måletid og lufttemperatur med norsk desimalkomma, tilgjengelig datatabell og tømmeknapp. Vi unngår geologiske stasjoner, UTM og den eksisterende modellens automatiske risikomatrise. Eleven skriver selv hva som kan skje, tiltak og avbruddskriterier; modellen gir aldri grønt lys.

For å følge regelen om ikke å finne på tall er ingen målinger forhåndsutfylt. Enkle realistiske feltverdier kommer fra elevens egne observasjoner. Kapitlets tidligere, tydelig merkede konstruerte øvingstabell er ikke gjort om til ekte data eller utvidet med nye fiktive målinger. Temperaturvisningen bruker én desimal. Dette er en enklere Vg1-tilpasning uten påstått gjennomført feltarbeid.

Modellen bruker bare sidens minne. Ingen nettverkskall, GPS, lagring eller persondata er nødvendig. Den opprinnelige Geofag-modellen og standardvisningen er uendret. RGS-kilden og risikoforbeholdene fra kapitlet beholdes. Nytt reseed er lagt til.

## Kontroller

Typecheck, ESLint, relevante geografi-/seed-/reseed-/valgtester og build kjøres per branch. Logger: /workspace/mats-valg-arbeid/kap2-*.log. Ingen deploy eller ekstern databasemigrering.
