import { ElasticReboundDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function JordskjelvfysikkHarryFieldingReid() {
  return (
    <>
      {/* SEKSJON 1: ELASTISK TILBAKEFJÆRING */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Jordskjelvfysikk: Harry Fielding Reids elastiske tilbakefjæring
        </h2>
        <p>
          Frem til begynnelsen av 1900-tallet trodde mange forskere at forkastninger i jordskorpen var et sekundært resultat
          av mystiske eksplosjoner dypt nede i jorden. Den sanne fysiske forklaringen ble først avdekket etter det store
          jordskjelvet i San Francisco 18. april 1906.
        </p>
        <p>
          Den amerikanske geofysikeren Harry Fielding Reid (1910) analyserte nitidige landmålinger av vei- og gjerdelinjer
          som krysset San Andreas-forkastningen før og etter skjelvet. Han la merke til at gjerder som opprinnelig var snorrette,
          hadde blitt gradvis bøyd til en svak S-kurve i tiårene forut for katastrofen, før de plutselig ble kuttet tvert av med
          en permanent forskyvning på opptil 6 meter under selve skjelvet.
        </p>

        <ElasticReboundDiagram />

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Den seismiske syklusen trinn for trinn
        </h3>
        <div className="space-y-2 text-muted-foreground">
          <p>
            Reids teori om <strong>elastisk tilbakefjæring (elastic rebound theory)</strong> danner i dag fundamentet for all
            moderne jordskjelvforskning og forklarer den periodiske <em>seismiske syklusen</em>:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-sm">
            <li>
              <strong className="text-foreground">Tektonisk spenningsoppbygging:</strong> Platetektoniske krefter driver to jordskorpeblokker
              i motsatte retninger med noen centimeter per år. Langs forkastningsflaten hindrer imidlertid
              enorm friksjon og rugositeter (asperiteter) blokkene i å gli jevnt forbi hverandre. Forkastningen er <em>låst</em>.
            </li>
            <li>
              <strong className="text-foreground">Elastisk deformasjon:</strong> Fordi bergartene ikke kan gli, begynner fjellmassene
              på hver side av forkastningen å bøyes og tøyes elastisk, akkurat som en stålfjær eller en spent pil og bue.
              Mekanisk potensiell energi akkumuleres over tiår, århundrer eller årtusener.
            </li>
            <li>
              <strong className="text-foreground">Spenningsbrudd:</strong> Når den oppbygde skjærspenningen (τ) til slutt overstiger
              bergartens skjærfasthet eller friksjonslåsens motstand, svikter asperitetene brått.
            </li>
            <li>
              <strong className="text-foreground">Tilbakefjæring og bølgeutstråling:</strong> I løpet av brøkdeler av et sekund spretter
              de elastisk deformerte bergartene tilbake til sin opprinnelige, ubelastede form. Den frigjorte elastiske energien omdannes
              til varme og <strong>seismiske sjokkbølger</strong> som stråler ut i alle retninger fra bruddstedet (hyposenteret).
            </li>
          </ol>
        </div>

        <OrdBoks
          ord="Elastisk tilbakefjæring"
          barn="Prinsippet der bergarter spennes opp som en fjær langs en låst forkastning. Når friksjonen ryker, spretter fjellet tilbake og utløser jordskjelv."
        />
        <OrdBoks
          ord="Hyposenter (fokus)"
          barn="Det nøyaktige punktet dypt nede i jordskorpen der forkastningsbruddet starter og den seismiske energien utløses."
        />
        <OrdBoks
          ord="Episenter"
          barn="Punktet på jordoverflaten som ligger loddrett over hyposenteret."
        />
      </section>

    </>
  );
}
