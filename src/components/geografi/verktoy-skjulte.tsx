import { useId } from "react";
import { Diagram, C, L } from "@/components/diagrams/svg-kit";
import land from "@/lib/geografi-verdensland.json";
import mercator from "@/lib/geografi-mercator-land.json";
import { Skjema } from "./skjulte-skjema";
export function GeografiMonsterkart() {
  return (
    <Diagram
      heading="Figur 1.0 – Landområder uten landegrenser"
      title="Verdens landområder, uten politiske grensestreker"
      caption="Natural Earth 1:110m, utgave 5.1.1, Public Domain. Egen Gall–Peters-tegning. Lik farge viser land, lys bakgrunn viser hav. Ingen bosettings- eller klimadata er kodet i fargen. Små øyer kan mangle ved denne generaliseringen."
      viewBox="0 0 900 560"
      wide
      scroll
    >
      {() => (
        <>
          <rect width="900" height="500" fill={C.bg} />
          {land.map((l) => (
            <path key={l.iso3} d={l.path} fill={C.teal} stroke="none" />
          ))}
        </>
      )}
    </Diagram>
  );
}
export function GeografiMercator() {
  return (
    <Diagram
      heading="Figur 1.1 – Mercator forstørrer arealene mot polene"
      title="Egen sfærisk Mercator-projeksjon fra 80 grader sør til 80 grader nord"
      caption="Egen matematisk tegning, x = λ, y = ln(tan(π/4 + φ/2)). Natural Earth 5.1.1, Public Domain. Polene kan ikke vises i Mercator. Konturene er avskåret ved 80 grader. Sammenlikn med den flateriktige modellen nedenfor (Rød, 2026)."
      viewBox="0 0 900 700"
      wide
      scroll
    >
      {() => (
        <>
          {mercator.map((d, i) => (
            <path key={i} d={d} fill={C.teal} fillOpacity="0.65" stroke={C.dim} strokeWidth="0.5" />
          ))}
          {[-60, -30, 0, 30, 60].map((lat) => {
            const y = 350 - 126 * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
            return (
              <g key={lat}>
                <line x1="54" x2="846" y1={y} y2={y} stroke={C.fg} strokeDasharray="4 4" />
                <L x="24" y={y} size={13}>
                  {lat}°
                </L>
              </g>
            );
          })}
        </>
      )}
    </Diagram>
  );
}
export function GeografiGradnett() {
  return (
    <Diagram
      heading="Figur 1.3 – Lengdegrad møter breddegrad"
      title="Matematisk gradnett med ekvator og nullmeridian"
      caption="Gradnettet viser vinkelverdier, ikke observerte punkter eller et stedfestet elevspor. Nord er opp, øst er mot høyre. Kartverket (2023)."
      viewBox="0 0 800 440"
      wide
      scroll
    >
      {() => (
        <>
          {[-180, -120, -60, 0, 60, 120, 180].map((lon) => (
            <g key={lon}>
              <line
                x1={400 + lon * 2}
                x2={400 + lon * 2}
                y1="40"
                y2="400"
                stroke={lon === 0 ? C.fg : C.dim}
              />
              <L x={400 + lon * 2} y="425" size={13} anchor="middle">
                {lon}°
              </L>
            </g>
          ))}
          {[-90, -60, -30, 0, 30, 60, 90].map((lat) => (
            <g key={lat}>
              <line
                x1="40"
                x2="760"
                y1={220 - lat * 2}
                y2={220 - lat * 2}
                stroke={lat === 0 ? C.fg : C.dim}
              />
              <L x="10" y={220 - lat * 2} size={13}>
                {lat}°
              </L>
            </g>
          ))}
        </>
      )}
    </Diagram>
  );
}
export function GeografiKartSammenlikning() {
  const id = useId();
  return (
    <figure aria-labelledby={id} className="my-8 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        Figur 1.5 – Samme utsnitt, ulikt innhold
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h4>Topografisk rasterkart</h4>
          <img
            src="/images/geografi/gjende-toporaster.png"
            alt="Gjende og Bessheim med vann, kurver, stier og veier"
            loading="lazy"
            width="512"
            height="512"
          />
        </div>
        <div>
          <h4>Tematisk uttrekk av blå karttegn</h4>
          <img
            src="/images/geografi/gjende-bla-karttegn.png"
            alt="Bare kartets blå karttegn er framhevet i samme utsnitt"
            loading="lazy"
            width="512"
            height="512"
          />
        </div>
      </div>
      <figcaption className="text-sm text-muted-foreground">
        © Kartverket, CC BY 4.0. Samme utsnitt og nordretning som figur 1.4, zoom 11. Eget
        pikseluttrekk beholder blå karttegn og demper resten. Blått omfatter også navn og symboler.
        Det er ikke et eget datasett over vannforekomster, en ny feltmåling eller en faresone.
        Fargeregelen er dokumentert i redaksjonsnotatet.
      </figcaption>
    </figure>
  );
}
export function GeografiMentaltKart() {
  return (
    <Diagram
      heading="Figur 1.6 – En mental skisse av skoleområdet"
      title="Skisse med skolen, ballplassen og brua knyttet sammen"
      caption="Egen kvalitativ prinsippskisse fra tekstens tenkte skoleområde, ikke en virkelig persons kart eller en anbefalt skolevei. Avstand, retning og størrelse er ikke målt (Sahr, u.å.)."
      viewBox="0 0 800 300"
      wide
      scroll
    >
      {() => (
        <>
          <path
            d="M120 180 Q250 290 390 160 T670 130"
            fill="none"
            stroke={C.teal}
            strokeWidth="5"
          />
          {[
            [120, 180, "Skolen"],
            [390, 160, "Ballplassen"],
            [670, 130, "Brua"],
          ].map(([x, y, t]) => (
            <g key={t}>
              <circle cx={x} cy={y} r="28" fill={C.bg} stroke={C.fg} strokeWidth="3" />
              <L x={x} y={Number(y) - 48} anchor="middle">
                {t}
              </L>
            </g>
          ))}
          <L x="400" y="280" anchor="middle" size={14}>
            Det du husker og velger ut, er ikke hele området.
          </L>
        </>
      )}
    </Diagram>
  );
}
export function GeografiGisLag() {
  return (
    <Skjema
      heading="Figur 1.8 – GIS sammenholder kartlag"
      caption="Egen begrepsmodell, ikke avledet av en annen figur. Alle lag må referere til samme sted og tolkes med sine egne datoer og begrensninger (Pearson et al., 2007; USGS, 2025)."
      ledd={[
        ["Raster: bildeceller", "For eksempel et satellittbilde eller høyder i et rutenett."],
        ["Flater: områder", "For eksempel registrert arealbruk."],
        ["Linjer: forbindelser", "For eksempel veier."],
        [
          "Punkter: steder",
          "For eksempel et offentlig målepunkt. Lagene kombineres først etter kildekontroll.",
        ],
      ]}
    />
  );
}
export function GeografiTemaValg() {
  return (
    <Diagram
      heading="Figur 1.10 – To temakart over samme tenkte område"
      title="Samme skoleområde med møteplasser til venstre og foreslåtte forbindelser til høyre"
      caption="Egne kvalitative prinsippskisser. Symbolene er hentet fra tekstens oppdiktede skoleområde, ikke fra elevobservasjoner. Ingen mengder, avstander, private adresser eller faregrenser er konstruert (Kartverket, 2020, 2023)."
      viewBox="0 0 900 340"
      wide
      scroll
    >
      {() => (
        <>
          {[0, 450].map((x) => (
            <g key={x} transform={`translate(${x},0)`}>
              <rect x="20" y="50" width="410" height="240" rx="16" fill={C.bg} stroke={C.dim} />
              <L x="225" y="30" anchor="middle">
                {x === 0 ? "Tema: møteplasser" : "Tema: forbindelser å undersøke"}
              </L>
              <path
                d="M80 200 L225 120 L370 205"
                fill="none"
                stroke={x === 0 ? C.dim : C.teal}
                strokeWidth={x === 0 ? 2 : 6}
                strokeDasharray={x === 0 ? undefined : "8 6"}
              />
              {[
                [80, 200, "Skolen"],
                [225, 120, "Ballplassen"],
                [370, 205, "Brua"],
              ].map(([cx, cy, t]) => (
                <g key={t}>
                  <circle cx={cx} cy={cy} r={x === 0 ? 17 : 7} fill={x === 0 ? C.teal : C.fg} />
                  <L x={cx} y={Number(cy) + 34} anchor="middle" size={14}>
                    {t}
                  </L>
                </g>
              ))}
              <L x="225" y="320" anchor="middle" size={13}>
                {x === 0
                  ? "Fylte sirkler: steder å undersøke"
                  : "Stiplet linje: foreslått forbindelse, ikke trygg rute"}
              </L>
            </g>
          ))}
        </>
      )}
    </Diagram>
  );
}
export function GeografiBlueMarble() {
  return (
    <figure className="my-8 rounded-xl border p-4">
      <h3 className="text-xl font-semibold">Figur 1.7 – Blue Marble er en mosaikk</h3>
      <img
        src="/images/geografi/blue-marble-2002.webp"
        alt="NASA-visualisering av jordkloden med blått hav, land og hvite skyer"
        loading="lazy"
        width="700"
        height="525"
      />
      <figcaption className="text-sm text-muted-foreground">
        NASA Goddard Space Flight Center. Reto Stöckli, Robert Simmon og MODIS-teamene.
        Visualisering 2. august 2002, publisert på denne NASA-siden 13. april 2011. Flere måneders
        observasjoner er satt sammen, ikke ett samtidig opptak. Offentlig NASA-verk, Public Domain i
        USA, brukt redaksjonelt uten logo eller påstand om godkjenning. Bildet er komprimert til
        WebP, ikke innholdsendret (NASA, 2011).
      </figcaption>
    </figure>
  );
}
export function GeografiSnowKart() {
  return (
    <figure className="my-8 rounded-xl border p-4">
      <h3 className="text-xl font-semibold">Figur 1.9 – Snows historiske kolerakart</h3>
      <a href="/images/geografi/snow-kolera-pd.webp" className="underline">
        Åpne den større kartfilen
      </a>
      <img
        src="/images/geografi/snow-kolera-pd.webp"
        alt="Historisk kart over Soho i London med svarte streker for dødsfall og markerte vannpumper. Mange streker er samlet nær pumpen i Broad Street."
        width="1800"
        height="1688"
        loading="lazy"
      />
      <figcaption className="text-sm text-muted-foreground">
        John Snow og litograf C. F. Cheffins: kart over utbruddet i 1854, publisert i andre utgave
        av On the Mode of Communication of Cholera (1855). Commons-filen Snow-cholera-map-1.jpg er
        en digitalt forbedret reproduksjon via UCLA, Public Domain. Filbeskrivelsen daterer motivet
        til 1854; det er hendelsesåret, ikke bokutgavens år. Nedskalert og komprimert, ingen nye
        kasus eller pumper tilføyd. Kartet er ikke bevis alene (Snow, 1855; Field, 2020).
      </figcaption>
    </figure>
  );
}
