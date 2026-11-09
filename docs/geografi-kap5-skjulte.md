# Kapittel 5: kontroll av skjulte figurer

Kontroll 6.–7. november 2026, Europe/Oslo.

5.0 er bygget som et linjediagram, ikke som en KartSerie, fordi dataene er én global tidsserie. Grunnlaget er årsmiddelet januar–desember fra NASA GISS GISTEMP v4, fila GLB.Ts+dSST.csv, hentet 6. november 2026. Avvikene er målt mot 1951–1980. Diagrammet viser 1880–2025 og utelater 2026 fordi året ikke er avsluttet. NASA GISS skriver at grafikk laget med deres data kan brukes uten tillatelse når kilden oppgis, og dataene er et verk fra den amerikanske staten (Public Domain). Kilden oppgis slik GISTEMP ber om, med nettside, dato og Lenssen et al. (2024). Serien er lagret i src/lib/geografi-gistemp-1880-2025.json med 146 år. CSV-fila har SHA-256 4c64eda288bce32b8d76926278f346ecea1e53506df8ee72a3d5accb0657c416.

5.10 er bygget som et lokatorkart med ett stedsnavnpunkt for tettstedet Nesbyen (60,56809 N, 9,10276 Ø). Punktet kommer fra Kartverkets stedsnavnregister med CC BY 4.0, og bakgrunnskartet er fra Kartverket. Kartet har ingen flomgrenser, nedbørmengder eller faresoner, og bildeteksten sier det. Et NVE-datasett for flomutbredelsen under Hans er ikke kontrollert, og derfor er ingen flate tegnet.

5.11 er bygget som et lokatorkart for Bangladesh med Natural Earth 1:110m (Public Domain) og Dhaka fra Natural Earth populated places 5.1.2 (23,725006 N, 90,406634 Ø). Kartet viser ingen risikopolygoner. Bildeteksten skiller lokalisering fra fare, eksponering og sårbarhet og viser til Verdensbanken (2022).
