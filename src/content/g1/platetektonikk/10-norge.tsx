import { Link } from "@tanstack/react-router";
import { GeoMap } from "@/components/geo-map";
import {
  NorwayTectonicsHistoryDiagram,
} from "@/components/diagrams";
import { lenke } from "./lenke";

export function Norge() {
  return (
    <>
      {/* 9. NORGES PLATETEKTONISKE REISE */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Norge i et platetektonisk lys: Kaledonidene, Oslofeltet og isostasi
        </h2>
      <p>
        Norge ligger i dag midt inne på <strong>Den eurasiske kontinentalplaten</strong>, tusenvis av kilometer fra
        aktive subduksjonssoner og plategrenser. Grensen i vest er Den midtatlantiske ryggen ute i Norskehavet.
        Likevel er hele det norske landskapet formet av fortidens dramatiske platetektoniske hendelser (Ramberg et al.,
        2008):
      </p>

      <NorwayTectonicsHistoryDiagram />

      <div className="my-6 space-y-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="font-display text-base font-bold text-primary">
            1. Den kaledonske fjellkjedefoldingen (430–400 millioner år siden)
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            I silur og devon lukket det opprinnelige Atlanterhavet – <strong>Iapetushavet</strong> – seg i henhold til
            Wilsonsyklusen. Vårt urgamle kontinent <strong>Baltika</strong> kolliderte frontalt med Nord-Amerika og
            Grønland (<strong>Laurentia</strong>). Kollisjonen skapte en Himalaya-lignende fjellkjede med tinder på over
            9000 meter. Enorme flak av havbunn og kontinentalrand ble høvlet av og skjøvet hundrevis av kilometer inn
            over Norge som <strong>skyvedekker (nappes)</strong>. De karakteristiske toppene i Jotunheimen (som
            Galdhøpiggen og Glittertind), Rondane og Trollheimen er eroderte rester av disse kaledonske skyvedekkene!
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="font-display text-base font-bold text-amber-500">
            2. Oslofeltets dramatiske riftdal i perm (300–250 millioner år siden)
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            I karbon og perm holdt superkontinentet Pangea på å sprekke opp. En gren av denne oppsprekkingen skar rett inn
            gjennom Østlandet fra Langesund til Mjøsa. Jordskorpen sank inn som en dyp graben (Oslo-graben), ledsaget av
            voldsom vulkanisme. Det oppsto enorme sprekkevulkaner som spydde ut den verdenskjente lavaen{" "}
            <strong>rombeporfyr</strong> (som kun finnes i Oslofeltet, på Mount Erebus i Antarktis og i Øst-Afrika!). I
            dypet størknet gigantiske magmakamre og ble til prydsteinen <strong>larvikitt</strong> (Norges nasjonalbergart).
            Riften stoppet opp og ble en «fossil rift», men forkastningslinjene preger fortsatt Oslofjordens geografi.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="font-display text-base font-bold text-sky-500">
            3. Åpningen av Norskehavet og Jan Mayen (55 millioner år siden til i dag)
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            I tidlig tertiær (eocen) sprakk litosfæren mellom Norge og Grønland fullstendig opp. Nord-Atlanteren åpnet
            seg, og Norge fikk en <strong>passiv kontinentalmargin</strong>. Elver og isbreer fra fastlandet eroderte
            fjellene og avsatte kilometertykke lag med sand og leire på kontinentalsokkelen – bergartslag som i dag er
            kilde- og reservoarbergarter for Norges olje- og gassrikdom. Lenger ute i havet, på spredningsryggen, ligger
            vulkanøya <strong>Jan Mayen</strong> med Beerenberg (2277 moh.) – Norges eneste aktive vulkan over havnivå
            (Norsk Polarinstitutt, u.å.).
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="font-display text-base font-bold text-emerald-500">
            4. Glasial isostasi: Landet som reiser seg etter isen
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            Under siste istid hvilte en opptil 3 kilometer tykk iskappe over Skandinavia. Den kolossale vekten trykket
            den faste litosfæren ned i astenosfæren med opptil 800 meter! Da isen smeltet bort for ca. 10 000 år siden,
            begynte litosfæren å sprette opp igjen i henhold til <strong>isostasi</strong> (Archimedes&apos; lov for
            jordskorpen). Havet flommet først inn over det nedtrykte landet og avsatte saltvannsleire. Da landet hevet
            seg opptil 220 meter (<strong>marin grense</strong>, NGU, u.å.-b), ble denne marine leiren tørt land – og ga
            opphav til Norges fruktbare jordbruksbygder på Romerike, i Trøndelag og i Vestfold, men også faren for{" "}
            <Link to="/geofag-1/skred" className={lenke}>
              kvikkleireskred
            </Link>
            . Oslo hever seg fortsatt med ca. 4 mm per år, og spenningene etter landhevingen utløser jevnlig{" "}
            <strong>intraplate-jordskjelv</strong> i Rana, på Vestlandet og i Oslofjorden (NORSAR, u.å.).
          </p>
        </div>
      </div>

      <GeoMap
        center={[65, -3]}
        zoom={4}
        markers={[
          {
            lat: 64.2558,
            lng: -21.131,
            label: "Þingvellir (Island) – Synlig spredningsrift i Den midtatlantiske ryggen",
          },
          {
            lat: 71.0,
            lng: -8.5,
            label: "Jan Mayen (Beerenberg) – Norges eneste aktive vulkan på ryggsystemet",
          },
          {
            lat: 59.91,
            lng: 10.75,
            label: "Oslofeltet – Permisk innsunket riftdal med rombeporfyr og larvikitt",
          },
          {
            lat: 61.63,
            lng: 8.31,
            label: "Jotunheimen – Kaledonsk skyvedekke (nappe) overskjøvet under Iapetus-lukkingen",
          },
        ]}
        heading="Geodynamiske nøkkelsteder i Norges nærområde"
        caption="Kartet viser sentrale geologiske lokaliteter: Den aktive spredningsaksen på Island og Jan Mayen, den kaledonske fjellkjederoten i Jotunheimen, og den permiske riftdalen i Oslofeltet."
      />
      </section>

    </>
  );
}
