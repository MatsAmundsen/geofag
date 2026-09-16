import { Term, TermGrid } from "@/components/term";

export function Begreper() {
  return (
    <>
      <h2 className="font-display text-2xl font-medium tracking-tight">Sentralt fagvokabular</h2>
      <TermGrid>
        <Term name="litosfære" def="skorpe + stiv øvre mantel (0–100/250 km) som utgjør de tektoniske platene" />
        <Term name="astenosfære" def="varm, fast silikatmantel (100–350 km) som flyter duktilt over millioner av år" />
        <Term name="slab pull" def="den dominerende drivkraften: kald, tett eklogitt-slab synker under egen vekt i subduksjonssonen" />
        <Term name="ridge push" def="gravitasjonsglidning: litosfæren sklir nedover fra den 2–3 km høye midthavsryggen" />
        <Term name="eklogitt" def="ekstremt tung høytrykksmetamorf bergart (granat + omfasitt) omdannet fra basaltisk havbunnsskorpe i subduksjonssoner; drivmotoren i slab pull" />
        <Term name="dekompresjon" def="manteloppstigning gir trykkfall; solidus krysses uten ekstra varme (rygg/rift)" />
        <Term name="flukssmelting" def="vann fra synkende slab senker solidustemperaturen i mantelkilen over (subduksjon)" />
        <Term name="dehydrering" def="høyt trykk presser vann ut av serpentinitt og leirmineraler i den synkende havbunnen" />
        <Term name="akkresjonskile" def="havbunnssedimenter skrapet av den synkende platen og stablet opp foran dyphavsgropen" />
        <Term name="bakbuebasseng" def="ekstensjonsbasseng dannet bak en vulkanbue på grunn av slab rollback (f.eks. Japanhavet)" />
        <Term name="passiv margin" def="kontinentalmargin inne på en plate uten subduksjon eller jordskjelvaktivitet (f.eks. norskekysten); fungerer som en mektig sedimentfelle" />
        <Term name="bruddsone" def="inaktiv, aseismisk forlengelse av en transformforkastning utenfor spredningsryggene" />
        <Term name="Wadati-Benioff" def="skrått seismisk plan av jordskjelv (0–700 km dyp) som sporer den synkende platen" />
        <Term name="seismisk tomografi" def="3D-avbildning av jordens indre mantelstruktur ved hjelp av milliarder av seismiske bølgehastighetsmålinger" />
        <Term name="ofiolitt" def="komplett tverrsnitt av havbunnsskorpe og øvre mantel obdusert på land (f.eks. Leka)" />
        <Term name="obduksjon" def="overkjøring der tung havbunn unntaksvis skyves opp på lett kontinental skorpe i kollisjon" />
        <Term name="paleomagnetisme" def="symmetriske striper med magnetisk reversering i havbunnen (Vine-Matthews-Morley)" />
        <Term name="hotspot" def="mantelplym fra kjerne-mantel-grensen (D'') som brenner vulkankjeder (f.eks. Hawaii)" />
        <Term name="Wilsonsyklus" def="syklisk åpning og lukking av verdenshav over 400–600 mill. år (superkontinenter)" />
        <Term name="skyvedekke" def="store bergflak overskjøvet hundrevis av km under kontinentkollisjon (Kaledonidene)" />
        <Term name="graben" def="innsunket forkastningsblokk i en kontinental riftdal (f.eks. Øst-Afrika, Oslofeltet)" />
        <Term name="isostasi" def="litosfærens flytelikevekt på astenosfæren; landheving etter istidens istrykk" />
      </TermGrid>
    </>
  );
}
