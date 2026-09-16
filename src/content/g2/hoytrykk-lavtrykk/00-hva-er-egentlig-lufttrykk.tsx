import { OrdBoks } from "@/components/term";
import { AtmosphericColumnDiagram } from "@/components/diagrams";

export function HvaErEgentligLufttrykk() {
  return (
    <>
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er egentlig lufttrykk?
      </h2>
      <p>
        Vi lever på bunnen av et hav av luft. Lufttrykket i et punkt er vekten av den overliggende
        luftsøylen (NOAA, u.å.-a). Ved havnivå er standardtrykket <strong>1013,25 hPa</strong> —
        om lag 10 tonn luft over hver kvadratmeter.
      </p>
      <OrdBoks
        ord="Lufttrykk"
        barn="Vekten av den overliggende luftsøylen per arealenhet. Måles i hektopascal (hPa)."
      />
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>Nær bakken faller trykket med om lag <strong>1 hPa per 8 meter</strong>.</li>
        <li>Ved 5 500 m er trykket halvert (ca. 500 hPa).</li>
        <li>På Everest (8 848 moh.) er trykket rundt 330 hPa.</li>
        <li>Ved tropopausen (ca. 11 km) er trykket om lag 250 hPa.</li>
      </ul>
      <AtmosphericColumnDiagram />
    </>
  );
}
