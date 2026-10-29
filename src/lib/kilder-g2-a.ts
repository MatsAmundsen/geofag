import type { Kilde } from "@/lib/kilder";

/**
 * Kilder til Geofag 2 pakke A (nye kapitler). Egen fil for å unngå konflikt med
 * kilder.ts og kilder-g2.ts. Bare offentlige kilder, med lenke der det finnes.
 */
const UDIR_A: Kilde = {
  prefix: "Utdanningsdirektoratet [Udir]. (u.å.-a). ",
  italic: "Kjerneelementer — Geofag (GFG01-03)",
  suffix: ".",
  href: "https://www.udir.no/lk20/gfg01-03/om-faget/kjerneelementer",
};

const UDIR_B: Kilde = {
  prefix: "Utdanningsdirektoratet [Udir]. (u.å.-b). ",
  italic: "Kompetansemål etter geofag 2",
  suffix: ".",
  href: "https://www.udir.no/lk20/gfg01-03/kompetansemaal-og-vurdering/kv973",
};

export const KILDER_G2_A = {
  energiRegning: [
    {
      prefix: "Energifakta Norge. (u.å.-a). ",
      italic: "Kraftproduksjon",
      suffix: ". Energidepartementet.",
      href: "https://energifaktanorge.no/norsk-energiforsyning/kraftforsyningen/",
    },
    {
      prefix: "Energifakta Norge. (u.å.-b). ",
      italic: "Kraftmarkedet",
      suffix: ". Energidepartementet.",
      href: "https://energifaktanorge.no/norsk-energiforsyning/kraftmarkedet/",
    },
    {
      prefix: "Equinor. (u.å.). ",
      italic: "Hywind Tampen",
      suffix: ".",
      href: "https://www.equinor.com/no/energi/hywind-tampen",
    },
    {
      prefix: "Sokkeldirektoratet. (2023, 18. desember). ",
      italic: "Omrekningsfaktorar",
      suffix: ".",
      href: "https://www.sodir.no/om-oss/bruk-av-innhold/omrekningsfaktorar/",
    },
    {
      prefix: "Solgrid. (u.å.). ",
      italic: "Furuseth solkraftverk",
      suffix: ".",
      href: "https://solgrid.no/prosjekt/furuseth-solkraftverk/",
    },
    {
      prefix: "Statnett. (u.å.). ",
      italic: "Derfor har vi budområder",
      suffix: ".",
      href: "https://www.statnett.no/forsta-strom-og-kraftsituasjonen/Derfor-har-vi-budomroder/",
    },
    {
      prefix: "Store norske leksikon. (u.å.-a). ",
      italic: "Brukstid",
      suffix: ".",
      href: "https://snl.no/brukstid",
    },
    {
      prefix: "Store norske leksikon. (u.å.-b). ",
      italic: "Kilowattime",
      suffix: ".",
      href: "https://snl.no/kilowattime",
    },
    {
      prefix: "Store norske leksikon. (u.å.-c). ",
      italic: "Vindkraft",
      suffix: ".",
      href: "https://snl.no/vindkraft",
    },
    UDIR_A,
    UDIR_B,
  ],
} satisfies Record<string, Kilde[]>;
