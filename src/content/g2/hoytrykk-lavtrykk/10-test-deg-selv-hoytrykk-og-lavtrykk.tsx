import { Quiz } from "@/components/quiz";

export function TestDegSelvHoytrykkOgLavtrykk() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Test deg selv: Høytrykk og lavtrykk
      </h2>
      <Quiz
        questions={[
          {
            prompt: "Hva er den fysiske definisjonen på lufttrykk?",
            options: [
              "Vindhastigheten målt i knop på bakken.",
              "Vekten av all overliggende luft i luftsøylen per arealenhet.",
              "Temperaturen til gassmolekylene i troposfæren.",
              "Friksjonskraften mellom jordoverflaten og luften.",
            ],
            answer: 1,
            explain:
              "Lufttrykk er definert som tyngden (vekten) av den luftsøylen som hviler over et bestemt areal. Ved havnivå er vekten om lag 10 tonn per kvadratmeter, noe som gir et standardtrykk på 1013,25 hPa.",
          },
          {
            prompt:
              "Hvorfor kan en verdi på 1015 hPa være et lavtrykk på ett kart og et høytrykk på et annet?",
            options: [
              "Fordi barometeret måler feil ved høy luftfuktighet.",
              "Fordi høytrykk og lavtrykk er relative begreper bestemt av trykket i de omkringliggende luftmassene.",
              "Fordi 1015 hPa bare gjelder over åpent hav, ikke over land.",
              "Fordi Corioliskraften endrer tallverdiene med årstidene.",
            ],
            answer: 1,
            explain:
              "Det finnes ingen absolutt tallgrense. Et lavtrykk har lavere trykk enn omgivelsene, mens et høytrykk har høyere trykk enn omgivelsene. 1015 hPa er et lavtrykk dersom omgivelsene har 1025 hPa, og et høytrykk dersom omgivelsene har 1005 hPa.",
          },
          {
            prompt: "Hva er den egentlige årsaken til at himmelen blir klar i et høytrykk?",
            options: [
              "Vinden blåser alle skyene bort over horisonten.",
              "Luften synker (subsidens), komprimeres og varmes adiabatisk. Dermed faller relativ fuktighet, og skydråpene fordamper.",
              "Solstrålene brenner bort skydråpene fra oversiden.",
              "Det finnes ingen vanndampmolekyler i et høytrykk.",
            ],
            answer: 1,
            explain:
              "I et høytrykk synker luften langsomt (subsidens). På vei ned øker trykket, og luften varmes tørradiabatisk med 1,0 °C per 100 m. Varm luft har høyere metningstrykk, relativ luftfuktighet faller drastisk, og skydråpene fordamper til usynlig vanndamp.",
          },
          {
            prompt:
              "Hvorfor blåser bakkevinden på skrå over isobarene (inn i lavtrykk og ut av høytrykk) i stedet for parallelt med dem?",
            options: [
              "Fordi bakkenivået mangler tyngdekraft.",
              "Fordi bakkefriksjon bremser farten, noe som svekker Corioliskraften slik at trykkgradientkraften trekker luften på skrå mot lavere trykk.",
              "Fordi luftmolekylene kolliderer med vanndråper i skyene.",
              "Fordi solen bare varmer opp den ene siden av isobarene.",
            ],
            answer: 1,
            explain:
              "I fri atmosfære balanserer Corioliskraften og trykkgradientkraften hverandre, og vinden blåser parallelt med isobarene (geostrofisk vind). Nær bakken bremser friksjonen vindhastigheten. Dette svekker Corioliskraften, slik at trykkgradientkraften dominerer og trekker vinden på skrå inn mot lavtrykk og ut av høytrykk.",
          },
          {
            prompt:
              "Hvorfor kommer luften ned på lesiden under fønvind mye varmere enn den var på samme høyde på losiden?",
            options: [
              "Fordi solen skinner mye sterkere på lesiden av fjellet.",
              "Fordi vannet forlot luften som orografisk regn på losiden, mens den frigjorte latente varmen ble værende i luften og beholdes under tørradiabatisk nedsynking.",
              "Fordi fjellet avgir geotermisk varme fra jordens indre til luften.",
              "Fordi friksjonen mot fjellets leside skaper varme.",
            ],
            answer: 1,
            explain:
              "På losiden kondenserte vanndamp til regn og frigjorde latent varme, slik at luften bare avkjølte seg fuktadiabatisk (0,6 °C/100 m). På lesiden synker den tørre luften og varmes tørradiabatisk (1,0 °C/100 m) hele veien ned. Regnet tok vannet, men varmen ble igjen!",
          },
          {
            prompt:
              "Hva er den fundamentale forskjellen mellom fønvind og katabatisk vind i pensum for Geofag 2?",
            options: [
              "Fønvind forekommer bare om sommeren, mens katabatisk vind bare forekommer om vinteren.",
              "Fønvind er varm og tørr (skyldes orografisk nedbør og latent varme), mens katabatisk vind er kald og tung (skyldes overflatekjøling over snø/is og tyngdekraftsdrenasje).",
              "Katabatisk vind er en havstrøm, mens fønvind er en luftstrøm.",
              "Begge er varme fallvinder, men katabatisk vind har høyere fuktighet.",
            ],
            answer: 1,
            explain:
              "Fønvind er varm og tørr og bryter opp temperaturinversjoner. Katabatisk vind oppstår når ekstremt nedkjølt, tung luft over breer eller snøplatåer trekkes nedover skråninger av tyngdekraften, og danner dype temperaturinversjoner i dalbunnene.",
          },
        ]}
      />
    </section>
  );
}
