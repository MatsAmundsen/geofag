import { Callout } from "@/components/callout";
import { PhotoFigure } from "@/components/photo-figure";
import { SpreadingDiagram } from "@/components/diagrams";

export function Bevis() {
  return (
    <section className="pt-6 space-y-4">
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Oppdagelsen og bevisene: Fra Wegeners puslespill til den magnetiske «båndopptakeren»
      </h2>
      <p>
        I dag tar vi platetektonikken som en selvfølge, men fram til midten av 1960-tallet var ideen om bevegelige
        kontinenter regnet som ren villfarelse blant de fleste etablerte geologer (Hess, 1962; Wegener, 1912).
      </p>
      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Alfred Wegener og kontinentaldrift (1912)
      </h3>
      <p>
        Den tyske meteorologen og geofysikeren Alfred Wegener la i 1912 fram teorien om <em>kontinentaldrift</em>{" "}
        (Wegener, 1912). Han observerte at kontinentene på hver side av Atlanterhavet passet sammen som brikker i et
        puslespill – særlig kystlinjene til Sør-Amerika og Afrika. Wegener samlet overbevisende tverrfaglige bevis:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Fossilfunn over verdenshav:</strong> Fossiler av ferskvannsreptilet <em>Mesosaurus</em> og den
          bregnelignende planten <em>Glossopteris</em> ble funnet i identiske berglag i både Brasil og Sør-Afrika.
          Disse organismene kunne umulig ha krysset et tusenvis av kilometer bredt, salt verdenshav.
        </li>
        <li>
          <strong>Matchende fjellkjeder og bergarter:</strong> Fjellkjedene i Nord-Amerika (Appalakkene) stemte
          nøyaktig overens i alder, bergartstype og foldestruktur med Kaledonidene i Norge, Skottland og Grønland.
        </li>
        <li>
          <strong>Paleoklimatiske spor:</strong> Spor etter istidsbreer (skuringsstriper og moreneavsetninger) fra
          samme tidsperiode (perm-karbon) ble funnet i tropiske strøk i India, Australia, Sør-Amerika og Afrika.
        </li>
      </ul>
      <p>
        Wegener konkluderte med at alle landmassene en gang hadde vært samlet i ett gigantisk superkontinent:{" "}
        <strong>Pangea</strong> (gresk for «alt land»). Likevel ble teorien hans brutalt avvist av fagmiljøet.
        Hvorfor? Fordi Wegener manglet en troverdig <strong>fysisk drivmekanisme</strong>. Han foreslo at kontinentene
        pløyde gjennom havbunnen som isbrytere, drevet av tidevannskrefter og jordrotasjonens sentrifugalkraft –
        krefter fysikere raskt beviste var mange millioner ganger for svake.
      </p>
      <Callout title="Marie Tharp og kartleggingen av havbunnen (1950-tallet)">
        <p>
          Det store vendepunktet kom etter andre verdenskrig. Under den kalde krigen kartla den amerikanske
          geologen og oseanografen <strong>Marie Tharp</strong> sammen med Bruce Heezen havbunnen ved hjelp av
          millioner av ekkoloddprofiler. Tharp oppdaget en kontinuerlig, 65 000 km lang undersjøisk fjellkjede –{" "}
          <strong>Den midtatlantiske ryggen</strong> – og identifiserte en dyp innsynkningsdal (riftdal) midt
          langs ryggens akse. Dette var det fysiske beviset på at havbunnen holdt på å revne.
        </p>
      </Callout>
      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Harry Hess og havbunnsspredning (1962)
      </h3>
      <p>
        I 1962 koblet geologiprofessor og marineoffiser Harry Hess trådene sammen i en banebrytende artikkel:{" "}
        <em>«History of Ocean Basins»</em> (Hess, 1962). Hess foreslo at mantelen har langsomme konveksjonsstrømmer.
        Varm mantel stiger opp under midthavsryggene, der det kontinuerlig dannes ny havbunnsskorpe. Havbunnen
        beveger seg deretter som et gigantisk samlebånd vekk fra ryggen, før den til slutt avkjøles, blir tung og
        synker ned i dype havgroper (subduksjon). Kontinentene «pløyer» ikke gjennom havbunnen, men sitter fast i
        samme litosfæreplate og følger passivt med!
      </p>
      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Det ugjendrivelige beviset: Den magnetiske «båndopptakeren» (1963)
      </h3>
      <p>
        Året etter leverte Fred Vine og Drummond Matthews (1963) det endelige empiriske beviset med sin berømte
        hypotese (Vine & Matthews, 1963):
      </p>
      <p>
        Når basaltisk lava veller opp i midthavsryggen og størkner under <strong>Curie-temperaturen</strong> (ca. 580 °C
        for jernoksidet <em>magnetitt</em>), magnetiseres mineralene parallelt med jordens eksisterende magnetfelt.
        Jordens magnetfelt er ikke statisk; med ujevne mellomrom på noen hundre tusen til millioner av år bytter
        magnetpolene plass (geomagnetisk reversering).
      </p>
      <p>
        Når havbunnen sprer seg kontinuerlig til begge sider, fryser havbunnsskorpen inn et symmetrisk mønster av
        striper med normal magnetisering (feltet peker nordover som i dag) og reversert magnetisering (feltet pekte
        sørover). Da forskerne seilte over Atlanteren med magnetometre på slep, oppdaget de at det magnetiske mønsteret
        på østsiden av Den midtatlantiske ryggen var et nøyaktig speilbilde av mønsteret på vestsiden! Dette beviste
        at ny havbunn lages symmetrisk i aksen og skyves utover.
      </p>
      <SpreadingDiagram />
      <PhotoFigure
        src="/images/fig-spredring.jpg"
        alt="Sprekk i basalt og vulkansk rifting på Island der to plater glir fra hverandre"
        heading="Divergerende grense eksponert på tørt land: Þingvellir på Island"
        caption="Island er et av de få stedene på jorden der en midthavsrygg rager opp over havoverflaten. Her ved Þingvellir kan du fysisk gå i sprekken mellom Den eurasiske platen (til venstre) og Den nordamerikanske platen (til høyre). Sprekken vider seg ut med om lag 2–2,5 cm hvert eneste år."
        marks={[
          { x: 30, y: 48, n: "1", text: "Eurasiske plate", tone: "cold" },
          { x: 70, y: 45, n: "2", text: "Nordamerikanske plate", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Fast bergart på eurasisk side som beveger seg østover." },
          { n: "2", label: "Normalforkastningsvegg på nordamerikansk side som glir vestover." },
        ]}
      />
    </section>
  );
}
