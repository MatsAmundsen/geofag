import { useId } from "react";
import type { GeoJsonObject } from "geojson";
import { GeografiVerdenskart } from "./verdenskart";
import { GeografiDatakart } from "./datakart";
import tjeneste from "@/lib/geografi-tjeneste-2023.json";
import rjukan from "@/lib/geografi-rjukan-lokator.json";

const GRONN = ["#f0fdf4", "#bbf7d0", "#4ade80", "#16a34a", "#14532d"];

export function GeografiTjenesteKart() {
  const id = useId();
  return (
    <figure aria-labelledby={id} className="my-8 space-y-3 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        Figur 9.1 – Andel sysselsatte i tjenesteyting, 2023
      </h3>
      <GeografiVerdenskart
        rows={tjeneste.land}
        enhet="prosent av alle sysselsatte"
        desimaler={1}
        ukjent="Mangler tall for 2023 i datakilden"
        klasser={[
          { grense: 30, navn: "Under 30 %", farge: GRONN[0] },
          { grense: 45, navn: "30 til under 45 %", farge: GRONN[1] },
          { grense: 60, navn: "45 til under 60 %", farge: GRONN[2] },
          { grense: 75, navn: "60 til under 75 %", farge: GRONN[3] },
          { grense: Infinity, navn: "75 % eller mer", farge: GRONN[4] },
        ]}
      />
      <figcaption className="text-sm text-muted-foreground">
        Verdensbanken, World Development Indicators, SL.SRV.EMPL.ZS: sysselsatte i tjenesteyting som
        andel av alle sysselsatte, 2023. Tallene er modellerte anslag fra ILO, ikke direkte
        tellinger. De gjør land sammenliknbare, men er usikre der det finnes få undersøkelser. Alle
        land er vist med samme år. Land uten tall er grå og er ikke satt til null. Noen små land er
        for små til å synes på kartet, men står i tabellen. Uttrekk 7. november 2026 (indikatoren
        oppdatert {tjeneste.oppdatert}), CC BY 4.0. Landgrenser: Natural Earth (Public Domain)
        (Verdensbanken, 2026; Natural Earth, u.å.).
      </figcaption>
    </figure>
  );
}

export function GeografiRjukanLokator() {
  return (
    <figure className="my-6 space-y-3">
      <h3 className="font-semibold">Figur 9.4 – Rjukan, Vemork og Mæl i Tinn</h3>
      <GeografiDatakart
        data={rjukan as GeoJsonObject}
        center={[59.9, 8.65]}
        zoom={10}
        basemap
        property="rolle"
        colors={{ Lokatorpunkt: "#9f1239" }}
        label="Lokatorkart med stedsnavnpunkter for byen Rjukan, industriområdet Vemork og Mæl stasjon i Tinn kommune. Kartet viser ingen sysselsettingstall og ingen historiske linjer."
      />
      <table className="w-full text-left text-sm">
        <caption>
          Stedsnavnpunkter fra Kartverket, med navnetypen slik registeret oppgir den
        </caption>
        <thead>
          <tr>
            <th scope="col">Sted</th>
            <th scope="col">Breddegrad N</th>
            <th scope="col">Lengdegrad Ø</th>
          </tr>
        </thead>
        <tbody>
          {rjukan.features.map((f) => (
            <tr key={f.properties.navn}>
              <th scope="row" className="font-normal">
                {f.properties.navn}
              </th>
              <td>{f.geometry.coordinates[1].toLocaleString("nb-NO")}</td>
              <td>{f.geometry.coordinates[0].toLocaleString("nb-NO")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="text-sm text-muted-foreground">
        Kartet viser hvor stedene ligger i dag. Det er ikke et historisk kart, og det viser ikke
        kraftledninger, jernbane, ferjeruter eller hvor mange som arbeider hvor. Bruk teksten og
        UNESCO-kilden til å forklare forbindelsene mellom kraft, industri og transport.
        Stedsnavnpunkter: Kartverket (u.å.-b), Sentralt stedsnavnregister, CC BY 4.0. Bakgrunn ©
        Kartverket, CC BY 4.0.
      </figcaption>
    </figure>
  );
}
