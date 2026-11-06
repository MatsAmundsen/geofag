# Kapittel 1: oppfølging av Mats sine valg

Kontrollert 6. november 2026 (Europe/Oslo). Ny lokal commit på egen kapittelbranch. Ingen push, PR eller deploy.

## Utført og valg

Figur 1.2 er en egen matematisk Gall–Peters/Tissot-modell, ikke en avledning av et CC BY-SA-verk. Sfærisk x = λ cos 45°, y = sin φ / cos 45°. Produktet av lokal skala langs parallell og meridian er 1; dette testes ved ni breddegrader. Modellen viser gradnett og lokale ellipser med samme areal, ikke kystlinjer. PROJs dokumentasjon bekrefter standardparallell 45°.

Figur 1.4 bruker et ekte topografisk utsnitt ved Gjende/Besshøe. Området er valgt fordi innsjøer, tydelige høydekurver og infrastruktur kan leses sammen i Vg1. Fire originale Kartverket-fliser fra Topografisk rasterkart på zoom 11 er satt sammen. Vilkårssiden er lest og gir CC BY 4.0 for åpne produkter; detaljlag på zoom 12–20 er ikke kopiert. Kreditering, nedlastingsadresser, koordinatramme, bearbeiding og SHA-256 er lagret i geografi-kap1-topokart.json. Omtrentlig skala er beregnet ved utsnittets midtbreddegrad. Bildet er kontrollert visuelt. WMS toporaster svarte 500 og WMS topo fikk tidsavbrudd; den dokumenterte åpne WMTS-tjenesten leverte flisene.

## Avgrensning

Andre skjulte figurmarkører er beholdt. Ingen Geofag-modell eller standardvisning er endret. Nye APA-kilder og reseed er lagt til. Innlasting kan overskrive CMS-tekst ved senere godkjent utrulling.

## Kontroller

Typecheck, ESLint, relevante geografi-/seed-/reseed-/valgtester og build kjøres på denne branchens endelige tre. Logger ligger utenfor repoet under /workspace/mats-valg-arbeid/kap1-*.log. Build kjøres uten DATABASE_URL og uten deploy.
