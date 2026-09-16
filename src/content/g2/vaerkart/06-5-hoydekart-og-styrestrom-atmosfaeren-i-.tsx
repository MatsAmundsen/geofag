import { UpperAir500hPaMapDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function HoydekartOgStyrestromAtmosfaerenI() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        5. Høydekart og styrestrøm – Atmosfæren i 500 hPa
      </h2>
      <p>
        Meteorologer analyserer aldri et bakkekart isolert. Overflateværet er bare det nederste
        grenselaget i et enormt tre-dimensjonalt maskineri. For å vite hvor lavtrykkene og frontene vil
        bevege seg, må vi opp i den midtre troposfæren: til <strong>500 hPa-nivået</strong>.
      </p>

      <OrdBoks
        ord="Geopotensiell høyde (gpm)"
        barn="Høyden over havnivå der lufttrykket har falt til en bestemt verdi (f.eks. 500 hPa), justert for jordens tyngdefeltvariasjon. Måles i geopotensielle meter (gpm)."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Isohypser, tråg og rygger
      </h3>
      <p>
        Mens bakkekart viser trykkvariasjon ved en konstant geometrisk høyde (havnivå), viser
        høydekart variasjon i <strong>geopotensiell høyde</strong> for en konstant trykkflate. På et
        500 hPa-kart kalles linjene <strong>isohypser</strong> (høydekoter). Typisk høyde for 500
        hPa-flaten er <strong>5 500 gpm</strong>:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          I kald, tung polarluft trekker atmosfæren seg sammen. Her må du bare opp til 5 100–5 300 gpm
          før trykket er nede i 500 hPa. På kartet danner dette U-formede søroverrettede bulker kalt{" "}
          <strong>tråg (troughs)</strong>.
        </li>
        <li>
          I varm, lett subtropisk luft utvider atmosfæren seg. Her må du helt opp til 5 700–5 900 gpm
          før 500 hPa nås. Dette danner nordoverrettede buer kalt <strong>rygger (ridges)</strong>.
        </li>
      </ul>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Styrestrømmens regel (50 % av 500 hPa-vinden)
      </h3>
      <p>
        Vinden i 500 hPa-nivået blåser parallelt med isohypsene. Fordi dette nivået ligger midt i
        troposfærens masse, fungerer denne storskala luftstrømmen som en <strong>styrestrøm</strong>{" "}
        for bakkens lavtrykk og fronter.
      </p>
      <div className="my-3 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
        <p className="font-semibold text-primary">Meteorologisk tommelfingerregel for styrestrøm:</p>
        <p className="mt-1 text-foreground/90">
          Et overflatelavtrykk beveger seg i hovedsak <strong>parallelt med isohypsene</strong> på 500
          hPa-kartet, med en forflytningshastighet som tilsvarer om lag{" "}
          <strong>50 % av vindhastigheten</strong> i 500 hPa.
        </p>
      </div>

      <p>
        I tillegg er sammenhengen mellom 500 hPa og bakken en drivende motor for selve trykkutviklingen:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>På østsiden (forsiden) av et tråg:</strong> Isohypsene sprer seg ut (divergens i
          høyden). Dette suger luft opp fra bakken, noe som gjør at overflatelavtrykket under forsterkes
          kraftig (syklogenese).
        </li>
        <li>
          <strong>På østsiden (forsiden) av en rygg:</strong> Isohypsene smalner inn (konvergens i
          høyden). Luft tvinges nedover mot bakken, noe som bygger opp et stabilt høytrykk med
          tørkende og synkende luft.
        </li>
      </ul>

      {/* DIAGRAM 4: UPPER AIR 500 HPA MAP */}
      <div className="my-6">
        <UpperAir500hPaMapDiagram />
      </div>
    </section>
  );
}
