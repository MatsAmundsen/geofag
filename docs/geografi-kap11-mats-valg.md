# Kapittel 11: oppfølging av Mats sine valg

Kontrollert 6. november 2026 (Europe/Oslo). Ny lokal commit på egen kapittelbranch. Ingen push, PR eller deploy.

## Valg, dokumentasjon og begrunnelse

- UNHCRs vilkår er nå kontrollert på selve Refugee Data Portal-siden. Gjeldende fra 1. juli 2026: datasett er som hovedregel CC BY 4.0, med attribusjon, merking av bearbeiding og uten implisert godkjenning. Ingen særskilt restriksjon er angitt for det kontrollerte PopStatsOfficial-datasettet. Derfor er SSB-fallback for den globale flyktningfiguren ikke nødvendig.
- 11.7 kartdel: faktiske vertsland/områder og egne regionsummer er faglig bedre enn antatte migrasjonspiler. To komplette sider, 100 og 67 rader, gir 167 unike vertsoppføringer og 28 461 306 personer ved utgangen av 2025. Bare REF_UNHCR inngår, ikke UNRWA, OIP, asylsøkere, IDP eller alle tvunget fordrevne. Ikke samme nevner som 65-prosentfiguren. Seks UNHCR-regioner er brukt som de faktisk er kodet, ikke en antatt verdensdelsinndeling.
- 11.3 kartdel og 11.8 samles til ett punktkart over de fem eksisterende kommuneeksemplene: Oslo, Ullensaker, Bodø, Tromsø og Alta. Like store punkter unngår å gjøre kommuneareal eller symbolstørrelse til et påstått flyttevolum. Fortegn har blå/oransje skala og eksplisitt nullreferanse. Publisert innenlandsk nettorate per tusen beholdes fra SSB09588. Ingen fylkesrader blir kommuner, og ingen nettoverdi blir gjort til en fra–til-pil.

## Kartgrunnlag og rettigheter

Natural Earth 110m Admin0 5.1.1 er public domain. Egen Gall–Peters fra kapittel 9. Land uten rad eller bekreftet kodekobling er grå, aldri falsk null. Alle 167 kildeverdier følger i tabell og CSV, også små områder som mangler i geometrien. Dette er ikke et offisielt UNHCR-kart. Ingen logoer eller individdata er brukt. Uttrekket er lokalt og fast, ikke en levende API-backend eller rutine.

Kartverkets API-katalog bekrefter CC BY 4.0 for kommuneinfo. Feltet punktIOmrade er et punkt inne i kommunen, ikke et bysentrum. ETRS89 er omregnet med EPSG-operasjonen ETRS89 to WGS84 (1), oppgitt operasjonsnøyaktighet 1 meter. Det er ikke en påstand om kildepunktets målenøyaktighet. Ingen historiske kommunegrenser er importert eller hevdet. Kartverket WMTS er begrenset til zoom 11. Kilder, fullstendighet og hash er dokumentert i kartdata-og-vilkar-filen.

## Det som forblir skjult

11.1 global netto migrasjon er ikke importert uten avklart års-/periodegrunnlag. 11.6 bilaterale forbindelser er heller ikke konstruert. Det første Ukraina-filteret ga HTTP400 fordi en filterdimensjon manglet i dimensjonslisten. Etter lesing av offisiell dokumentasjon ga den korrekte forespørselen for UKR til DEU/POL/CZE i 2025 HTTP200, men null rader. Derfor ingen antatte forbindelsestall, ruter eller pilbredder. Dette er dokumentert som et uverifisert utvalg, ikke som null mennesker eller bevis for at forbindelser mangler.

Opprinnelige SSB-råverdier, 36-cellers fra–til-matrise, innvandringsgrunn, historiske tall, 65-prosentfigur og beskyttelsesforklaringer er beholdt. APA-årsbokstavene er justert for de nye UNHCR-kildene. Tidligere redaksjonsnotat beskriver førsteleveransen og erstattes her for data-/lisensstatus.
