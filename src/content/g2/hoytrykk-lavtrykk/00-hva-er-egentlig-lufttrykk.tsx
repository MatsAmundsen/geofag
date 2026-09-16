import { AtmosphericColumnDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function HvaErEgentligLufttrykk() {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er egentlig lufttrykk?
      </h2>
      <p>
        Selv om vi sjelden tenker over det i hverdagen, lever vi på bunnen av et hav av luft. Luft
        er en blanding av gasser – hovedsakelig nitrogen (78 %) og oksygen (21 %) – og hvert eneste
        gassmolekyl har masse. Jordens gravitasjonsfelt trekker disse molekylene mot overflaten, og
        lufttrykket i et hvilket som helst punkt er nøyaktig lik{" "}
        <strong>vekten av den overliggende luftsøylen</strong> som strekker seg helt opp til
        verdensrommet (NOAA, u.å.-a).
      </p>
      <p>
        Ved havnivå utøver atmosfæren et gjennomsnittlig trykk på{" "}
        <strong>1013,25 hektopascal (hPa)</strong>, også kalt standardatmosfæren (NOAA, u.å.-a). Én hektopascal
        tilsvarer 100 pascal (1 hPa = 100 N/m²), som betyr at vekten av luften over én enkelt
        kvadratmeter på bakken er om lag 100 000 newton. Dette tilsvarer en masse på hele{" "}
        <strong>10 000 kilo – altså 10 tonn luft over hodet på deg!</strong>
        Grunnen til at vi ikke knuses under denne kolossale vekten, er at væsketrykket i kroppens
        celler og vev utøver et nøyaktig like stort mottrykk innenfra.
      </p>

      <OrdBoks
        ord="Lufttrykk"
        barn="Vekten av den overliggende luftsøylen per arealenhet. Måles meteorologisk i hektopascal (hPa) eller millibar (mbar)."
      />

      <p>
        Fordi luft er en gass, kan den presses sammen. Tyngden fra de øvre luftlagene komprimerer de
        nederste lagene mot bakken. Derfor er lufttettheten størst ved havnivå (ca. 1,2 kg/m³) og
        avtar raskt oppover. Dette fører til at lufttrykket faller eksponensielt med høyden:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          Nær bakken faller trykket med om lag <strong>1 hPa for hver 8. meter</strong> du beveger
          deg oppover.
        </li>
        <li>
          Ved <strong>5 500 meters høyde</strong> er trykket halvert til ca. 500 hPa. Det betyr at
          50 % av hele atmosfærens masse ligger under denne høyden.
        </li>
        <li>
          På toppen av Mount Everest (8 848 moh.) er trykket falt til rundt 330 hPa – bare en
          tredjedel av trykket ved havnivå.
        </li>
        <li>
          Ved <strong>tropopausen (ca. 11 km)</strong> er trykket nede i om lag 250 hPa, og mer enn
          75 % av atmosfæremassen befinner seg under flyenes marsjhøyde (NOAA, u.å.-b).
        </li>
      </ul>

      <AtmosphericColumnDiagram />
    </section>
  );
}
