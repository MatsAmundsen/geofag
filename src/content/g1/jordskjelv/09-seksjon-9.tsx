import { Quiz } from "@/components/quiz";

export function Seksjon2() {
  return (
    <>
      <div className="pt-4">
        <Quiz
          questions={[
            {
              prompt:
                "Hva var Richard Dixon Oldhams (1906) avgjørende bevis for at jordens ytre kjerne er flytende?",
              options: [
                "P-bølger reflekteres ikke fra jordens overflate.",
                "S-bølger (transversale skjærbølger) mangler fullstendig på seismiske målestasjoner i vinkelavstanden mellom 103° og 180° fra episenteret.",
                "Borehull i Russland nådde flytende magma på 12 kilometers dyp.",
                "Rayleigh-bølger forplanter seg raskere gjennom havet enn gjennom kontinenter.",
              ],
              answer: 1,
              explain:
                "Riktig! S-bølger er transversale skjærbølger med hastighet Vs = √(μ/ρ). Fordi væsker mangler skjærstivhet (μ = 0), kan ikke S-bølger eksistere eller forplante seg i en væske. Oldhams påvisning av S-bølgenes skyggesone mellom 103° og 180° beviste ugjendrivelig at jordens kjerne har et flytende ytre lag.",
            },
            {
              prompt:
                "Dersom et jordskjelv øker fra magnitude 5,0 til magnitude 7,0 på momentmagnitudeskalaen (Mw), hvor mange ganger mer seismisk energi frigjøres?",
              options: [
                "2 ganger mer energi.",
                "20 ganger mer energi.",
                "Omtrent 100 ganger mer energi.",
                "Nøyaktig 1000 ganger mer energi (31,6² ≈ 1000).",
              ],
              answer: 3,
              explain:
                "Riktig! Magnitudeskalaen er logaritmisk med grunntall 10^(1,5) for energi. Én enhet opp tilsvarer ca. 31,6 ganger mer frigjort seismisk energi. To enheter opp tilsvarer 10^(1,5 × 2) = 10³ = 1000 ganger mer energi!",
            },
            {
              prompt:
                "Hva skjer fysisk med en tsunami når den forplanter seg fra dyphavet (4000 m) og inn mot kysten (10 m dyp)?",
              options: [
                "Bølgens hastighet øker kraftig, mens bølgehøyden avtar til null.",
                "Bølgehastigheten synker dramatisk fra ~700 km/t til ~36 km/t, bølgelengden komprimeres, og bølgehøyden presses opp etter Greens lov (shoaling).",
                "Bølgen forvandles fra en tverrbølge til en lengdebølge.",
                "Ingenting endrer seg; tsunamier har konstant hastighet og høyde overalt.",
              ],
              answer: 1,
              explain:
                "Riktig! Fordi v = √(g·d), fører det grunnere vannet til at bølgefronten bremses kraftig opp. For at den totale energifluksen skal bevares, må bølgelengden krympe og vannsøylen heve seg oppover i en massiv vannvegg (shoaling).",
            },
            {
              prompt:
                "Hva er de to viktigste geofysiske drivkreftene bak jordskjelv i Norge, til tross for at landet er et intraplate-område?",
              options: [
                "Subduksjon av Nordsjøen under Vestlandet og vulkanisme i Oslofeltet.",
                "Ryggtrykk («ridge push») fra Den midtatlantiske ryggen i vest og postglasial landheving (isostasi) etter istiden.",
                "Tidevannskrefter fra månen og sentrifugalkraft fra jordrotasjonen.",
                "Oljeboring i Nordsjøen og smelting av permafrost i Finnmark.",
              ],
              answer: 1,
              explain:
                "Riktig! Norge utsettes for kompresjonsspenninger rettet mot øst-sørøst på grunn av ryggtrykk fra den ekspanderende Midtatlantiske ryggen, kombinert med differensiell heving (opptil 8–9 mm/år) etter at den 3 km tykke iskappen smeltet. Dette reaktiverer gamle forkastningssoner.",
            },
            {
              prompt:
                "Hva er den fundamentale forskjellen på opprinnelsen til tsunamier i Stillehavet sammenlignet med historiske tsunamier i Norge?",
              options: [
                "I Stillehavet skyldes tsunamier store megathrust-jordskjelv ved subduksjonssoner; i Norge skyldes de nesten utelukkende skred i fjorder eller på sokkelskråningen (f.eks. Tafjord og Storegga).",
                "Norske tsunamier skapes av tropiske orkaner i Nordsjøen.",
                "Stillehavstsunamier er forårsaket av tidevann, mens norske tsunamier er forårsaket av Beerenberg på Jan Mayen.",
                "Det er ingen forskjell; begge typer dannes ved at litosfæreplater kolliderer langs kystlinjen.",
              ],
              answer: 0,
              explain:
                "Riktig! Norge har ingen aktive subduksjonssoner som kan heve havbunnen over store områder. Norske tsunamier oppstår når store stein- og sedimentvolumer raser ned i vannmassene — enten som fjellskred i trange vestlandsfjorder (Tafjord 1934, Loen, Åknes) eller som massive undervannsskred på kontinentalskråningen (Storeggaskredet for 8150 år siden).",
            },
            {
              prompt:
                "Hva er seismisk baseisolering, og hva er prinsippet bak (Eurokode 8)?",
              options: [
                "Bygningen boltes fast til fjellet med gigantiske stålstag for å hindre all bevegelse.",
                "Bygningen monteres på fleksible elastomere gummilagre eller glidependler, slik at bakken kan ryste under bygget mens selve strukturen forblir tilnærmet i ro.",
                "Bygningen kles med blyplater for å stoppe seismisk stråling.",
                "Fundamentet fylles med vann for å absorbere P-bølger.",
              ],
              answer: 1,
              explain:
                "Riktig! Baseisolering frikopler bygningens overbygning fra bakkeakselerasjonene ved hjelp av fleksible bly-gummi-lagre. Dette reduserer horisontale skjærkrefter på bygningskroppen med opptil 70–80 %.",
            },
            {
              prompt:
                "Hva er forskjellen på seismisk fare og seismisk risiko?",
              options: [
                "Det er det samme begrepet; bare ulikt norsk og engelsk uttrykk.",
                "Seismisk fare er den fysiske sannsynligheten for jordskjelv i et område, mens seismisk risiko kombinerer fare med sårbarhet og eksponering av befolkning og bebyggelse.",
                "Seismisk risiko gjelder bare tsunamier, mens seismisk fare gjelder jordskjelv på land.",
                "Seismisk fare måles i magnitude, mens seismisk risiko måles i intensitet.",
              ],
              answer: 1,
              explain:
                "Riktig! Et kraftig skjelv i øde fjellandskap er høy fare, men lav risiko fordi ingen er eksponert. Et svakt skjelv under en tett befolket by med gammel bygningsstock er lav fare, men potensielt høy risiko på grunn av sårbar infrastruktur og stor eksponering.",
            },
            {
              prompt:
                "Hvorfor er den seismiske Wadati-Benioff-sonen et bevis på at en kald havbunnsplate subdueres nedover i mantelen?",
              options: [
                "Fordi jordskjelv i sonen oppstår fordi magmaen smelter og eksploderer.",
                "Fordi den kalde, stive havbunnsplaten er sprø ned til 700 km dyp og kan lagre og frigjøre elastisk spenning langs et skrått plan av fokuspunkter som sporer nøyaktig plategeometrien.",
                "Fordi seismiske bølger reflekteres av plategrenseflaten og danner tydelige signaler.",
                "Fordi subduksjon produserer varme som får bergartene til å kollapse og utløse skjelv.",
              ],
              answer: 1,
              explain:
                "Riktig! Det skrå planet av jordskjelv (0–700 km dyp) i subduksjonssoner følger nøyaktig den kalde, sprø platen som tvinges ned i den varme, plastiske astenosfæren. Under 700 km er trykk og temperatur så høyt at bergartene deformeres plastisk — og ingen jordskjelv oppstår.",
            },
          ]}
        />
      </div>
    </>
  );
}
