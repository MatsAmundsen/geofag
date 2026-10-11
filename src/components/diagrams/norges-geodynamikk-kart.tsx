import { GeoMap } from "@/components/geo-map";

/** Nøkkelstedene i Norges geologiske historie (flyttet fra ruten til en widget, figurplanen F7). */
export function NorgesGeodynamikkKart() {
  return (
    <GeoMap
      center={[65, -3]}
      zoom={4}
      fitMarkers
      markers={[
        {
          lat: 69.7,
          lng: 30.0,
          label:
            "Sør-Varanger – noen av de eldste bergartene i Norge, opptil ca. 3000 millioner år gamle",
        },
        {
          lat: 65.08,
          lng: 11.62,
          label:
            "Leka – ofiolitt: havbunn og øvre mantel fra Iapetushavet, ca. 497 millioner år gammel",
        },
        {
          lat: 61.63,
          lng: 8.31,
          label:
            "Jotunheimen – Jotundekket, skjøvet flere hundre km mot sørøst for ca. 425 millioner år siden",
        },
        {
          lat: 59.91,
          lng: 10.75,
          label:
            "Oslofeltet – riftdal fra sen karbon og perm (ca. 300–250 millioner år siden) med rombeporfyr og larvikitt",
        },
        {
          lat: 71.0,
          lng: -8.5,
          label:
            "Jan Mayen (Beerenberg) – Norges eneste aktive vulkan, på den midtatlantiske spredningsryggen",
        },
        {
          lat: 66.4,
          lng: 13.0,
          label:
            "Lurøy/Rana (omtrentlig plassering) – jordskjelvet ved Lurøy i 1819 (magnitude ca. 5,8). Landhevingen kan bidra til spenningene i skorpa",
        },
      ]}
      heading="Norges geodynamiske nøkkelsteder"
      caption="Kartet viser stedene i kapitlet: det eldste grunnfjellet i Sør-Varanger, ofiolitten på Leka, skyvedekkene i Jotunheimen, riftdalen i Oslofeltet, vulkanen Beerenberg på Jan Mayen og jordskjelvområdet ved Lurøy og Rana. Punktet for Lurøy er omtrentlig."
    />
  );
}
