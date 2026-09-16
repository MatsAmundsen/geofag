import { Quiz } from "@/components/quiz";

export function TestDegSelvVaerkartOgVaerutvikli() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        11. Test deg selv: Værkart og værutvikling
      </h2>
      <Quiz
        questions={[
          {
            prompt:
              "På et synoptisk værkart over Nordsjøen ligger isobarene ekstremt tett sør for et lavtrykkssenter. Hva forteller dette om værforholdene?",
            options: [
              "Vindstille og tett strålingståke, fordi trykket er synkende.",
              "Meget sterk trykkgradientkraft som vil gi kraftig vind (kuling eller storm).",
              "At luften er helt fri for Corioliskraft.",
              "At lavtrykket har sluttet å utvikle seg og er stasjonært.",
            ],
            answer: 1,
            explain:
              "Trykkgradientkraften er omvendt proporsjonal med avstanden mellom isobarene. Tette isobarer betyr stor trykkforskjell over kort avstand, noe som akselererer luften kraftig og genererer sterk vind.",
          },
          {
            prompt:
              "På en WMO-stasjonsmodell viser det tresifrede trykktallet øverst til høyre «028». Hva er stasjonens faktiske havnivåtrykk?",
            options: [
              "28,0 hPa",
              "928,0 hPa",
              "1002,8 hPa",
              "1028,0 hPa",
            ],
            answer: 2,
            explain:
              "Dekodingsregelen sier at tall under 500 skal ha et 10-tall foran og komma før siste siffer: 028 blir 10 + 02,8 = 1002,8 hPa. (Dersom det hadde stått f.eks. 984, ville det vært 998,4 hPa).",
          },
          {
            prompt:
              "Du observerer følgende skysekvens over et døgn: Først tynne fjærskyer (cirrus), så et melkehvitt slør med ring rundt sola (halo/cirrostratus), etterfulgt av et grått lag der sola viskes ut (altostratus), og til slutt sammenhengende silregn (nimbostratus). Hvilket værsystem nærmer seg?",
            options: [
              "En klassisk varmfront på glid over kaldluft.",
              "En aggressiv kaldfront med cumulonimbus.",
              "En høytrykksrygg med subsidens.",
              "En lokal sjøbris.",
            ],
            answer: 0,
            explain:
              "Fordi varmfrontens glideflate er svært slak (1:150), ankommer de høyeste cirrusskyene 1000–1500 km foran selve bakkefronten. Sekvensen Ci → Cs (med halo) → As → Ns er det klassiske kjennetegnet på en ankommende varmfront.",
          },
          {
            prompt:
              "Hvorfor er et 500 hPa høydekart så avgjørende for å forutsi lavtrykkenes bane på bakkekartet?",
            options: [
              "Fordi vinden i 500 hPa blåser rett ned i havet og danner bølger.",
              "Fordi storskala-strømmen i 500 hPa fungerer som styrestrøm for overflatelavtrykkene, som typisk beveger seg parallelt med isohypsene i halv fart.",
              "Fordi 500 hPa representerer jordoverflaten ved polene.",
              "Fordi trykket ved bakken alltid er nøyaktig det dobbelte av 500 hPa.",
            ],
            answer: 1,
            explain:
              "500 hPa-nivået deler atmosfæren i to etter masse. Vinden her blåser parallelt med isohypsene og fungerer som en 'elv' som styrer de underliggende lavtrykkene, normalt i samme retning og med ca. 50 % av 500 hPa-vindens hastighet.",
          },
          {
            prompt:
              "Hvorfor blåser vinden nær bakken på skrå inn mot et lavtrykk (15–30° vinkel på isobarene) i stedet for å blåse helt parallelt med isobarene?",
            options: [
              "Corioliskraften er mye sterkere ved bakken enn i høyden.",
              "Friksjonen mot overflaten bremser vinden, noe som svekker Corioliskraften slik at trykkgradientkraften delvis trekker luften inn mot lavtrykket.",
              "Fordi gravitasjonskraften trekker luften sidelengs mot ekvator.",
              "Luftmolekylene blir lettere nær bakken på grunn av fuktighet.",
            ],
            answer: 1,
            explain:
              "I fri troposfære balanserer Corioliskraft og trykkgradientkraft (geostrofisk vind). Ved bakken bremser friksjonen vindhastigheten. Siden Corioliskraften er proporsjonal med hastigheten, svekkes den, og trykkgradientkraften trekker luften skrått inn mot lavtrykket.",
          },
          {
            prompt:
              "Et lavtrykk passerer like nord for Vestlandet. Hvilken vinddreining vil en observatør på bakken oppleve etter hvert som varmfront, varmsektor og til slutt kaldfront passerer?",
            options: [
              "Vinden blåser uforandret fra nordøst under hele passasjen.",
              "Vinden dreier mot urviseren (backing): fra nordvest via vest til sørøst.",
              "Vinden dreier med urviseren (veering): fra sørøst foran varmfronten, via sørvest i varmsektoren, til nordvest bak kaldfronten.",
              "Vinden stopper helt opp i varmsektoren og snur 180 grader momentant.",
            ],
            answer: 2,
            explain:
              "Når lavtrykkssenteret går nord for observatøren på nordlig halvkule, dreier vinden 'med klokka' (veering): Sørøstlig vind foran varmfronten, dreier til sørvest i varmsektoren, og snur kraftig til nordvest når kaldfronten raser inn.",
          },
        ]}
      />
    </section>
  );
}
