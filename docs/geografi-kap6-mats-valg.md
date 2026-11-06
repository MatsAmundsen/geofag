# Kapittel 6: oppfølging av Mats sine valg

Kontrollert 6. november 2026 (Europe/Oslo). Ny lokal commit på egen kapittelbranch. Ingen push, PR eller deploy.

## Utført og valg

Den opprinnelige HydrographCatchmentModel er koblet til figur 6.6 med et uttrykkelig geografi-valg. Beregning og kontroller er beholdt. NVE (2021), Forklaring til sanntidsgrafene, er lest: 10-årsflom har 10 prosent og 100-årsflom 1 prosent årlig overskridelsessannsynlighet. Dette dokumenterer ikke at modellens vilkårlige avrenningsgrenser svarer til bestemte returperioder. Derfor er returperiodeetikettene fjernet i Vg1-visningen, som Mats tillot, og erstattet av Returperiode ikke beregnet. Ingen generell NVE-definisjon framstilles som kalibrering. Modellinput er valgte undervisningsverdier, ikke observasjoner. De to avanserte tekstfanene med udokumenterte generelle prosentpåstander vises ikke i Vg1. Standardvisningen beholder sin tidligere oppførsel og er ikke faglig revidert utenfor oppdraget.

6.4 er en egen, manuell firetrinnsmodell med neste/forrige/start-kontroll og lokatorkart. Ask-punktet er kontrollert i Kartverkets stedsnavnregister. Det lokaliserer tettstedet, ikke skredets start eller grense. Skissen beregner ikke stabilitet, tid eller rekkevidde.

Gjerdrum er valgt for 6.9 fordi kapitlets dokumenterte 2020-case gjør det mulig å koble naturgrunnlag, bebyggelse og arealplanlegging. Et faktisk NVE-uttrekk av alle 147 soneobjekter (løsne-/utløpsområder) merket Gjerdrum vises med forklarte faregradskategorier og teksttabell. NLOD er kontrollert i gjeldende Geonorge-metadata. Utvalget er ikke en tegnet kommunegrense, og soner kan strekke seg utenfor kommunen. Uttrekk 6. november 2026 er ikke en rekonstruksjon av 2020 eller en tomtevurdering. Fargefritt areal betyr ikke trygg grunn. Bare nødvendige sonenavn, ID, type, faregrad og kommune er importert, ikke kontakt-/signaturfelter.

Nepal-casen har fått tydelig årlig revisjonsmerknad, sist kontrollert 6. november 2026 og ny gjennomgang senest november 2027. Ingen automatisk rutine er opprettet.

## Avgrensning og kontroller

Geofag-standardvisningen endres ikke. Bakgrunnskart begrenses til zoom 11, uten kopiering av detaljerte Geovekst-lag. Nytt reseed følger endret markdown. Testene dekker det komplette kommuneuttrekket, neste-steg-kontrollene og fravær av returperiodepåstand i Vg1. Typecheck, ESLint, relevante tester og build kjøres per branch; logger i /workspace/mats-valg-arbeid/kap6-*.log. Ingen deploy eller ekstern databasemigrering.

## Ekstra lisenssikring

Lokatorkartet bruker samme Kartverket-bakgrunn som temakartet, begrenset til zoom 11. Den generiske GeoMap-komponenten med OSM-bakgrunn gjenbrukes ikke, slik at det ikke følger med en uklar eller del-likt-lisensiert kartbakgrunn. Felles datakart støtter nå punktdata som sirkelsymboler uten eksterne ikonfiler. Standardkart på Geofag-sidene er urørt.
