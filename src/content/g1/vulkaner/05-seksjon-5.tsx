import { PhotoFigure } from "@/components/photo-figure";

export function Seksjon2() {
  return (
    <section className="space-y-4">
        <div className="pt-4 space-y-3">
          <h3 className="font-display text-xl font-medium tracking-tight text-primary">
            Kasusstudie: Eyjafjallajökull 2010 og europeisk flystans (freatomagmatisme)
          </h3>
          <p>
            Våren 2010 ble et relativt moderat vulkanutbrudd (VEI 4) på Island til den mest kostbare naturkatastrofen for
            sivil luftfart i historien. Over 100 000 flyvninger ble kansellert, og 10 millioner reisende ble strandet over hele kloden
            (Gíslason et al., 2011). Hvorfor fikk et mellomstort utbrudd så enorme konsekvenser?
          </p>

          <PhotoFigure
            src="/images/geo-eyjafjallajokull-aske.jpg"
            alt="Eyjafjallajökulls subglasiale utbrudd i 2010 med freatomagmatisk askesky og jökulhlaup"
            heading="Eyjafjallajökull 2010: Freatomagmatisme og kontinental flystans"
            caption="Da intermediær trakyandesittisk magma (SiO₂ ~58 %) brøt gjennom den 200 meter tykke isbreen på Eyjafjallajökull, eksploderte blandingen i kontakt med smeltevann (freatomagmatisme, Gíslason et al., 2011). Termisk sjokk knuste smelten til ekstremt finkornet, glassaktig aske (< 10 µm). En stabil høytrykksrygg førte askeskyen rett mot Sør-Norge og Nord-Europa, der partiklene truet med å smelte og stanse flyenes jetmotorer."
            marks={[
              { x: 48, y: 22, n: "1", text: "Freatomagmatisk fane", tone: "cold" },
              { x: 32, y: 72, n: "2", text: "Subglasialt krater", tone: "warm" },
              { x: 68, y: 78, n: "3", text: "Jökulhlaup (flom)", tone: "cold" },
            ]}
            points={[
              { n: "1", label: "Freatomagmatisk askesky: Ekstremt finkornede silikat-glasspartikler med skarpe kanter som holdt seg svevende over tusenvis av kilometer." },
              { n: "2", label: "Subglasialt krater: Smelting av 200 meter isbre forårsaket kontinuerlig dampeksplosjoner og termisk sjokkoppsprekking." },
              { n: "3", label: "Jökulhlaup: Voldsom flom av brevann, slam og isblokker som feide over islandske sandsletter mot Atlanterhavet." },
            ]}
          />

          <p>
            Tre geofysiske faktorer sammenfalt:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">1. Freatomagmatisme (vann-magma-interaksjon):</strong> Magmaen trengte opp
              gjennom en 200 meter tykk kaldeisbre. Det overopphetede smeltevannet fungerte som en termisk sjokk-katalysator:
              Smelten ble bråkjølt og sprengt i ufattelig mange ørsmå, skarpe glasspartikler (&lt; 10 mikrometer).
            </li>
            <li>
              <strong className="text-foreground">2. Høy svevetid og jetmotor-fare:</strong> Partiklene var så lette at de
              ikke falt ut lokalt, men svevde over kontinentale avstander. Silikatglass har et smeltepunkt på ~1100 °C, mens
              forbrenningskamrene i moderne jetmotorer opererer ved over 1400–1700 °C! Når jetmotorer suger inn vulkansk aske,
              smelter glasset momentant i brennkammeret og størkner igjen som en glassglasur på turbinbladene, noe som kveler
              luftstrømmen og fører til full motorstans.
            </li>
            <li>
              <strong className="text-foreground">3. Meteorologiske jetstrømmer:</strong> Et vedvarende blokkerende høytrykk
              over Nord-Atlanteren styrte luftstrømmene i en uavbrutt korridor fra Island, over Nordsjøen, inn over Norge og
              tvers over det sentraleuropeiske luftrommet.
            </li>
          </ul>
        </div>

    </section>
  );
}
