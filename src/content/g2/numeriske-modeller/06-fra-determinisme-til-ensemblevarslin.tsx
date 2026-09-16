import { OrdBoks } from "@/components/term";

export function FraDeterminismeTilEnsemblevarslin() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Fra determinisme til ensemblevarsling (EPS)
      </h2>
      <p>
        Når atmosfæren er kaotisk, kan vi ikke stole på én enkelt modellkjøring. Løsningen på kaoset er{" "}
        <strong>ensemblevarsling (Ensemble Prediction System / EPS)</strong>.
      </p>
      <p>
        I stedet for å kjøre modellen én gang, kjører superdatamaskinen en hel sverm av nesten like
        simuleringer – typisk <strong>30 medlemmer i MEPS</strong> og <strong>51 medlemmer i ECMWF</strong>{" "}
        (MET, u.å.-b):
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Én kontrollkjøring:</strong> Kjøres med den antatt beste, uforstyrrede
          starttilstanden fra dataassimileringen.
        </li>
        <li>
          <strong>Mange perturberte medlemmer:</strong> Starttilstanden manipuleres med mikroskopiske,
          fysisk plausible forstyrrelser (perturbasjoner) som gjenspeiler usikkerheten i målingene. I
          tillegg legges det inn små stokastiske variasjoner i parametriseringsskjemaene.
        </li>
      </ul>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Hvordan tolker du et ensemblevarsel på Yr?
      </h3>
      <p>
        Når meteorologene ser på resultatene fra de 51 medlemmene, ser de etter{" "}
        <strong>spredningen (spread)</strong> i ensemblet:
      </p>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
          <h4 className="font-display text-base font-semibold text-emerald-300">
            🟢 Lav spredning = Høy varslingstillit
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Alle de 51 kurvene ligger tett samlet som en stram trådbunt. Uansett hvilke småfeil som
            fantes i starttilstanden, lander alle simuleringene på samme resultat (f.eks. et mektig
            blokkerende høytrykk med tørt klarvær). Varselet har svært høy pålitelighet!
          </p>
        </div>
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4">
          <h4 className="font-display text-base font-semibold text-red-300">
            🔴 Stor spredning = Lav varslingstillit
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Kurvene spriker som en åpen vifte («spagettikart»). 20 medlemmer sender lavtrykket inn over
            Trøndelag med storm og regn, mens 30 medlemmer sender det sør for Lindesnes og gir sol i
            Midt-Norge. Atmosfæren er i en ustabil bifurkasjonstilstand, og et enkelt deterministisk
            tall er meningsløst.
          </p>
        </div>
      </div>
      <p>
        Når du på Yr ser teksten <em>«40 % sjanse for mer enn 20 mm regn»</em>, betyr det at nøyaktig
        20 av de 50 ensemblemedlemmene har beregnet at det vil falle mer enn 20 mm i den aktuelle
        gridcellen. Ensemblet erstatter falsk skråsikkerhet med ekte naturvitenskapelig sannsynlighet.
      </p>

      <OrdBoks
        ord="Ensemblevarsling (EPS)"
        barn="En varslingsmetode der en numerisk modell kjøres parallelt mange ganger med mikroskopiske variasjoner i starttilstanden for å tallfeste varslingens usikkerhet og sannsynlighet."
      />
    </>
  );
}
