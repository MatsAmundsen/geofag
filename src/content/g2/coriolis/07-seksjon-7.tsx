import { Callout } from "@/components/callout";

export function Seksjon() {
  return (
    <div className="space-y-4">
      <Callout title="De 4 vanligste eksamensfellene om Corioliseffekten">
        <ul className="space-y-2 text-sm leading-relaxed">
          <li>
            <strong>1. Coriolis starter aldri vinden:</strong> Corioliskraften kan aldri sette en
            luftpakke i bevegelse eller øke farten dens! Den virker alltid 90° vinkelrett på
            bevegelsesretningen, og gjør dermed <em>null mekanisk arbeid</em> (W = F · s · cos 90° = 0).
            Det er utelukkende trykkgradientkraften som setter luften i bevegelse og tilfører kinetisk
            energi. Coriolis bare svinger kursen.
          </li>
          <li>
            <strong>2. Coriolis virker like sterkt øst–vest som nord–sør:</strong> En klassisk feil til
            eksamen er å tro at bare luft som reiser mot polene bøyes av. Bevegelse mot øst eller vest
            bøyes like kraftig til høyre på nordlig halvkule på grunn av endringen i sentrifugalkraft
            rundt jordaksen (Eötvös-effekten).
          </li>
          <li>
            <strong>3. Vasken og badekaret styres IKKE av Coriolis:</strong> Hvis sensor spør om vannet
            i vasken spinner mot klokken i Norge, må du svare kontant nei. Henvis til Rossby-tallet
            (Ro ≈ 13 000 &gt;&gt; 1): Kummens geometri, asymmetri i røret og restvirvler er titusenvis av
            ganger sterkere enn jordens rotasjonsavbøyning på en så mikroskopisk skala.
          </li>
          <li>
            <strong>4. Geostrofisk vind blåser ikke ved bakken:</strong> Geostrofisk likevekt (vinden
            parallelt med isobarene) forutsetter null friksjon og oppstår bare i fri atmosfære over ca.
            1000 moh. Ved bakken bremser friksjonen farten, svekker Corioliskraften, og gjør at
            trykkgradientkraften trekker vinden på skrå (15°–30°) inn mot lavtrykk og ut av høytrykk.
          </li>
        </ul>
      </Callout>
    </div>
  );
}
