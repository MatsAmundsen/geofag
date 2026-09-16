import { JetBlockingDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function AtmosfaeriskBlokkeringOmegaBlokk() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Atmosfærisk blokkering: Omega-blokk og Rex-blokk
      </h2>
      <p>
        Noen ganger forsterkes en høytrykksrygg i en Rossby-bølge så kraftig at den stanser opp og
        nekter å vike. Dette kalles <strong>atmosfærisk blokkering</strong> (blocking high).
      </p>
      <p>
        Det mest kjente blokkeringsmønsteret over Europa kalles en <strong>Omega-blokk</strong>, fordi
        jetstrømmen tvinges til å splitte seg og bøye seg rundt høytrykket i en bue som ligner på den
        greske bokstaven Omega (<strong>Ω</strong>):
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Sentralt høytrykk:</strong> En mektig, varm antisyklon etablerer seg over
          Skandinavia og Nordsjøen. Luften synker uavbrutt (subsidens), og skyene holdes unna.
        </li>
        <li>
          <strong>Splittet jetstrøm:</strong> Jetstrømmen deles i to adskilte grener: Én gren
          ledes langt nord over Svalbard og Barentshavet, mens den andre presses langt sør inn over
          Middelhavet.
        </li>
        <li>
          <strong>Avsnørte lavtrykk (Cut-off lows):</strong> På begge flanker av høytrykket blir
          lavtrykk avskåret fra hovedstrømmen. De blir liggende og spinne på samme sted i dagevis
          eller uker.
        </li>
      </ul>

      <p>
        Konsekvensene for norsk vær er enorme:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          <strong>Sommerblokkering (Hetebølger og tørke):</strong> Den skyfrie himmelen slipper
          solstrålene uhindret ned i 18–24 timer i døgnet. Sammen med subsidensvarmen gir dette
          ekstreme hetebølger, tørke og skogbrannfare. Rekordsomrene i Sør-Norge i 2018 og 2021 var
          klassiske eksempler på en ukelang Omega-blokk!
        </li>
        <li>
          <strong>Vinterblokkering (Sprengkulde og inversjon):</strong> Om vinteren er nettene lange.
          Den skyfrie himmelen gir katastrofalt stort varmetap ved langbølget stråling. Iskald luft
          fra Sibir og Arktis samler seg i dalbunnene som dype <strong>temperaturinversjoner</strong>{" "}
          (-25 °C til -40 °C på Røros, Tynset og Finnmarksvidda), mens vedrøyk og svevestøv stenges inne.
        </li>
        <li>
          <strong>Flomkatastrofer i Sør-Europa:</strong> Mens Norge bader i sol under blokka,
          fanges de avsnørte lavtrykkene over Middelhavet eller Sentral-Europa og dumper hundrevis av
          millimeter regn med katastrofale flommer som følge (som flomkatastrofene i Tyskland og Spania).
        </li>
      </ul>

      <OrdBoks
        ord="Omega-blokk (Ω)"
        barn="En kvasistasjonær blokkeringssituasjon der en høytrykksrygg deler jetstrømmen i to som bokstaven Ω. Låser været i ukesvis og gir tørke/hete om sommeren eller sprengkulde om vinteren."
      />

      <JetBlockingDiagram />
    </>
  );
}
