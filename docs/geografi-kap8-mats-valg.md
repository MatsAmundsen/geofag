# Kapittel 8: oppfølging av Mats sine valg

Kontrollert 6. november 2026 (Europe/Oslo). Ny lokal commit på egen kapittelbranch. Ingen push, PR eller deploy.

## Leveranse og redaksjonelle valg

- Beholder den godkjente kritiske overforbruksdag-casen med 2025-dato, ikke konstruert 2026-dato.
- 8.2 bygges med siste tilgjengelige HDI-utgave: HDR 2025, dataår 2023. HDR 2026 er varslet til 1. desember 2026 og er ikke utgitt på kontrolldatoen. UNDPs CC BY 3.0 IGO-vilkår tillater egen figur. BNP er WDI NY.GDP.PCAP.PP.KD, samme år, konstante internasjonale 2021-dollar, CC BY 4.0. Åtte navngitte land viser bredde i utviklingsnivå og kobler til Norge og kapitlenes landcaser; ikke et representativt utvalg eller en årsaksanalyse. HDI inneholder BNI, ikke BNP. Datatabell og CSV følger.
- Nyeste GFN-pakke 2026 har regnskap for 2023 og estimater for 2025. Selve pakkesiden sier CC BY-SA 4.0. SA er forbudt i oppdraget. Derfor er ingen GFN-regnskap importert, ingen norsk/global jordklodefigur laget og 8.6-diagrammet beholdes som skjult markør. Ingen registrering eller skjema er sendt. Kilde: GFN (u.å.-e).
- Mats ønsket lokal kalkulator. 8.6a er derfor en åpent forklart og avgrenset transport-CO₂-kalkulator, ikke en udokumentert helhetsmodell for økologisk fotavtrykk. Faktorer er reelle norske 2020-gjennomsnitt fra Engedal et al. (2021), tabell 1: bensinbil 76,9, dieselbil 70,4 og dieselbuss 92,4 g CO₂/personkm. Ingen turbuss. 2020 er siste år i den kontrollerte tabellen, ikke dagens kjøretøypark. Pandemi og bussbelegg er forklart tydelig.
- Bare direkte CO₂, ikke CO₂-ekvivalenter, livsløp, globale hektar eller jordkloder. Ingen summering av oppdiktede poeng. Minnebasert tilstand, nullstillknapp, ingen lagring eller nettverkskall. Norsk desimalkomma støttes. Familienes opplysninger er ikke nødvendige.

## Sporbarhet og gjenstående arbeid

JSON-notatet dokumenterer URL-er, utgave, dataår, lisens og hash for HDI/BNP. UNDP-vilkår: https://hdr.undp.org/copyright-and-terms-use . Varslet utgivelse: https://hdr.undp.org/content/2026-human-development-report-release-announcement . SSBs åpne data er CC BY 4.0. Figur 8.1, 8.4, 8.5 og 8.7 er fortsatt skjult; denne runden leverer HDI/BNP og lokal regneøvelse, ikke alle tidligere foreslåtte figurer. GFN-figuren er sperret av lisensen, ikke av manglende fantasi.

## Kontroller

Nye beregningstester kontrollerer kildefaktorer, enheter og ugyldige inndata. Typecheck, ESLint, relevante tester og databasefritt bygg kjøres på denne branchen. Ingen Geofag-standardvariant er endret.
