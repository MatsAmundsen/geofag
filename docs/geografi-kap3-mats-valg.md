# Kapittel 3: oppfølging av Mats sine valg

Kontrollert 6. november 2026 (Europe/Oslo). Ny lokal commit på egen kapittelbranch. Ingen push, PR eller deploy.

## Valg og gjennomføring

2023-casene beholdes som Mats bestemte. DesignBOTs rekkefølge er fulgt: 3.0, 3.3, 3.11 og 3.7 først, deretter 3.10, 3.13 og 3.1. Sju nye figurer er bygget, i tillegg til fartskontrollen i 3.5. De seks tidligere Vg1-figurene er bevart.

- 3.0 bruker ikke det eldre Commons-kartet med varsel om retting. I stedet brukes USGS sin egen forenklede figur publisert 30. juli 2026, eksplisitt public domain. Norske bokstavetiketter/lesenøkkel er lagt på uten å tegne om plategrensene. Nord-Atlanteren, India/Eurasia og Nazca/Sør-Amerika er sammenholdt med navngitte geometrier fra gjeldende USGS MapServer. Tjenesten bygger på Bird (2003) og DeMets mfl. (2010), ikke sanntidsmålinger. Figur og tjeneste er generaliseringer, ikke en millimeterpresis fasit. Skjelv- og vulkanpunkter er ikke tegnet inn uten observasjonsperiode; dette er tydelig merket som platekart.
- 3.3 er en egen manuell Vg1-tilpasning av riftprinsippet med fire trinn, ingen tids- eller tykkelsestall. Det er uttrykkelig en mulig utvikling, ikke at Oslo-riften ble hav. De mer avanserte Geofag-diagrammene er ikke endret.
- 3.5 har manuell fart 0–20 cm/år som valgt modellinput, omregning til km på én million år og fast avstandsakse 0–200 km. Dette er kontroller, ikke konstruerte måledata. Farten er relativ bevegelse, ikke halv spredningsfart. Ingen kobling til tidspunkt for neste skjelv, risiko eller observerte hastigheter. Standardmodellen for Geofag er uendret.
- 3.11 har fire manuelle prosesstrinn og fast perspektiv fra vannforskyvning til kyst, med full tekstforklaring. Egen skisse etter NOAA, ingen ekstern NOAA-fil, bølgehøyder, ankomsttider eller sikkerhetssoner. Flom og sterk strøm kan følge flere bølger.
- 3.7 bruker to faktiske kataloghendelser 6. februar 2023: us6000jllz (7,8) og us6000jlqa (7,5). Koordinatene kommer direkte fra USGS, ikke fra et skissekart. Landkonturer er Natural Earth 5.1.1, public domain. Punkter er episentre, ikke hele bruddet. Bruddflater, rystelsesfelt og skadegrenser er ikke konstruert. Sårbarhet behandles i eksplisitt refleksjon, ikke med dødstall eller en falsk fargeskala.
- 3.10 er faktisk opptatt 19. desember 2023, publisert 21. desember. Filnavnets 21. desember er altså ikke opptaksdato. Commons-beskrivelsen har en feilaktig novemberformulering; den brukes ikke som hendelsesdato. Bildets egen tekst og opptaksteksten angir 19. desember. Infrarødt/falskfarget Sentinel-3/SLSTR-bilde, ikke naturfarger eller farekart. Ingen behov for ytterligere beskjæring: originalframstillingen viser allerede halvøya. Nedskalering og komprimering er oppgitt. Island-lokatoren viser ikke bildeavtrykk.
- Copernicus-vilkårene er lest i juridisk original-PDF, begge sider. Åpen reproduksjon og bearbeiding tillates med kreditering; ingen CC-lisens påstås. Ordrett kreditering i figur og kilderegister: «Contains modified Copernicus Sentinel data 2023». Ingen implisert EU-godkjenning.
- 3.13 er et eget begrepssnitt, ikke et geografisk profil eller en påstått geologisk kartgrense. Kobler grunnfjell, skyvedekker, Oslofelt og sokkelsedimenter uten NGU-raster.
- 3.1 har to uttrykkelig lineære tidsutsnitt. Bare kapitlets kildebelagte holdepunkter er brukt: ca. 4,54 mrd. år, 400–500 mill. år og ca. 310 mill. år. Målestokksskiftet er tydelig. Utsnittsgrensen 600 mill. år er et visningsvalg, ikke en ny geologisk periodegrense.

## Gjenstår

3.9 varmeflekk-kart er fortsatt skjult. Oppdatert, entydig stedsgrunnlag og modellforbehold er ikke kontrollert tilstrekkelig til å tegne et globalt observasjonslag. Det er ikke hentet inn et eldre Commons-kart bare for å fylle plassen. Samlet jordskjelv-/vulkanobservasjonslag til 3.0 er heller ikke levert, og platekartet påstår ikke noe annet.

## Kontroller og proveniens

Kildekontroll-JSON inneholder primær-URL-er, datasett, vilkår, bearbeiding og bildehash. Bilder er visuelt kontrollert før import. Ingen CC BY-SA, NC eller ND er brukt. Ingen OSM-bakgrunn er lagt til. Nye APA-kilder og reseed-flagg følger. Typecheck, ESLint, relevante tester og databasefritt bygg kjøres på denne branchen.

SSR-regresjonskontroll: HTML for åtte Geofag-standardvisninger er identisk med den urørte basen, inkludert den avanserte platemodellen og den opprinnelige flommodellen. Vg1-modus rendrer separat med fartskontroll.
