import {
  EarthLayersDiagram,
} from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function Indre() {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Jordens dynamiske indre: Litosfære, astenosfære og reologi
      </h2>
      <p>
        For å forstå platetektonikk må vi først avlive en av de mest seiglivede misforståelsene i geofaget:
        Troen på at jordas plater er «et stykke jordskorpe som flyter på et hav av flytende magma». Slik
        er ikke planeten vår bygd opp.
      </p>
      <p>
        Jordkloden er lagdelt etter kjemisk sammensetning (tetthet) og mekaniske egenskaper (reologi):
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Jordskorpen (0–70 km):</strong> Klodens ytterste, tynne «skall». Vi skiller skarpt mellom
          to typer skorpe:
          <ul className="list-disc space-y-1 pl-6 pt-1 text-sm text-foreground/80">
            <li>
              <em>Kontinentalskorpe:</em> Tykk (vanligvis 30–50 km, men opptil 70–80 km under Himalaya),
              hovedsakelig granittisk med høyt innhold av silisium og aluminium (felsisk), og med relativt lav
              tetthet (om lag <strong>2,7 g/cm³</strong>). Den er for lett til noensinne å synke dypt ned i
              mantelen, og kan derfor bli milliarder av år gammel.
            </li>
            <li>
              <em>Havbunnsskorpe (oseanisk skorpe):</em> Tynn (bare 5–8 km), basaltisk og gabbroid med høyt innhold
              av jern og magnesium (mafisk), og med vesentlig høyere tetthet (om lag <strong>3,0 g/cm³</strong>).
              Den nydannes i midthavsryggene og resirkuleres kontinuerlig. Ingen steder i dagens verdenshav finnes
              det havbunn som er eldre enn ca. 180–200 millioner år.
            </li>
          </ul>
        </li>
        <li>
          <strong>Moho-diskontinuiteten:</strong> Den seismiske grenseflaten mellom skorpen og den underliggende
          mantelen, oppdaget av den kroatiske seismologen Andrija Mohorovičić i 1909. Her gjør seismiske bølger et
          karakteristisk hopp i hastighet (P-bølger øker fra ca. 6 til over 8 km/s) fordi bergartene under Moho er
          vesentlig tettere og rikere på olivin.
        </li>
        <li>
          <strong>Litosfæren (0–100/250 km):</strong> Selve fundamentet for platetektonikken. En tektonisk plate
          er <em>ikke</em> bare skorpe, men <strong>litosfære</strong>: jordskorpen pluss den aller øverste, kalde
          og fullstendig stive delen av mantelen (litosfærisk mantel). Litosfæren oppfører seg som et sprøtt og
          elastisk fast stoff som brekker opp i plater.
        </li>
        <li>
          <strong>Astenosfæren (ca. 100–350 km dyp):</strong> Det seige underlaget som litosfæreplatene glir oppå.
          Astenosfæren består av <strong>fast silikatbergart (peridotitt)</strong> – den er IKKE flytende! Men
          fordi temperaturen her er nær bergartens smeltepunkt (om lag 1300–1400 °C), mister krystallgitteret sin
          stivhet. Over geologiske tidsskalaer på millioner av år deformeres astenosfæren plastisk og duktilt med
          en enorm viskositet på om lag 10¹⁹–10²¹ Pa·s. Platene kan derfor gli over den nesten som en kjelke på
          hardpakket snø.
        </li>
      </ul>
      <OrdBoks
        ord="Litosfære"
        barn="Jordens stive ytterste skall (0–100 km under havbunn, opptil 250 km under kontinenter). Består av jordskorpen pluss den øverste, kalde og mekanisk stive delen av mantelen. Det er litosfæren som er oppdelt i plater."
      />
      <OrdBoks
        ord="Astenosfære"
        barn="Sone i øvre mantel (100–350 km) direkte under litosfæren. Består av fast bergart (peridotitt), men er så varm at den deformeres seigtflytende (plastisk) over geologisk tid. Tillater litosfæreplatene å bevege seg."
      />
      <EarthLayersDiagram />
    </section>
  );
}
