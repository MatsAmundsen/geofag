import { Quiz } from "@/components/quiz";

export function Seksjon2() {
  return (
    <>
      <div className="pt-4">
        <Quiz
          questions={[
            {
              prompt: "Hva var Richard Dixon Oldhams (1906) avgjørende bevis for at jordens ytre kjerne er flytende?",
              options: [
                "P-bølger reflekteres ikke fra jordens overflate.",
                "S-bølger mangler fullstendig på målestasjoner mellom 103° og 180° fra episenteret.",
                "Borehull i Russland nådde flytende magma på 12 kilometers dyp.",
                "Rayleigh-bølger forplanter seg raskere gjennom havet enn gjennom kontinenter.",
              ],
              answer: 1,
              explain: "Riktig! S-bølger har Vs = √(μ/ρ). Væsker har μ = 0. Oldhams S-skyggesone mellom 103° og 180° beviste at den ytre kjernen er flytende.",
            },
            {
              prompt: "Dersom et jordskjelv øker fra magnitude 5,0 til 7,0 på Mw, hvor mange ganger mer seismisk energi frigjøres?",
              options: [
                "2 ganger mer energi.",
                "20 ganger mer energi.",
                "Omtrent 100 ganger mer energi.",
                "Nøyaktig 1000 ganger mer energi (31,6² ≈ 1000).",
              ],
              answer: 3,
              explain: "Riktig! Én enhet = ca. 31,6 ganger mer energi. To enheter = 10^(1,5 × 2) = 1000 ganger mer energi.",
            },
            {
              prompt: "Hva skjer fysisk med en tsunami når den går fra dyphavet (4000 m) inn mot kysten (10 m dyp)?",
              options: [
                "Hastigheten øker, mens bølgehøyden avtar til null.",
                "Hastigheten synker fra ~700 km/t til ~36 km/t, bølgelengden komprimeres, og høyden presses opp etter Greens lov (shoaling).",
                "Bølgen forvandles fra tverrbølge til lengdebølge.",
                "Ingenting endrer seg.",
              ],
              answer: 1,
              explain: "Riktig! v = √(g·d). Grunnere vann bremser fronten. Energifluks bevares ved at bølgelengden krymper og vannsøylen heves (shoaling).",
            },
            {
              prompt: "Hva er de to viktigste drivkreftene bak jordskjelv i Norge?",
              options: [
                "Subduksjon av Nordsjøen og vulkanisme i Oslofeltet.",
                "Ryggtrykk fra Den midtatlantiske ryggen og postglasial landheving (isostasi).",
                "Tidevannskrefter og sentrifugalkraft.",
                "Oljeboring og smelting av permafrost.",
              ],
              answer: 1,
              explain: "Riktig! Ridge push øst-sørøst pluss differensiell heving etter iskappen reaktiverer gamle forkastninger.",
            },
            {
              prompt: "Forskjellen på opprinnelsen til tsunamier i Stillehavet og i Norge?",
              options: [
                "Stillehavet: megathrust ved subduksjon. Norge: skred i fjorder eller på sokkelen (Tafjord, Storegga).",
                "Norske tsunamier skapes av tropiske orkaner i Nordsjøen.",
                "Stillehavet er tidevann; Norge er Beerenberg.",
                "Ingen forskjell.",
              ],
              answer: 0,
              explain: "Riktig! Norge har ingen aktive subduksjonssoner. Tsunamier kommer fra fjellskred og undervannsskred.",
            },
            {
              prompt: "Hva er seismisk baseisolering (Eurokode 8)?",
              options: [
                "Bygningen boltes fast til fjellet.",
                "Bygningen står på fleksible elastomere gummilagre slik at bakken kan ryste under mens strukturen forblir tilnærmet i ro.",
                "Bygningen kles med blyplater.",
                "Fundamentet fylles med vann.",
              ],
              answer: 1,
              explain: "Riktig! Baseisolering frikopler overbygningen og kan redusere horisontale skjærkrefter med 70–80 %.",
            },
            {
              prompt: "Hva er forskjellen på seismisk fare og seismisk risiko?",
              options: [
                "Samme begrep.",
                "Fare er fysisk sannsynlighet for skjelv; risiko kombinerer fare med sårbarhet og eksponering.",
                "Risiko gjelder bare tsunamier.",
                "Fare måles i magnitude, risiko i intensitet.",
              ],
              answer: 1,
              explain: "Riktig! Kraftig skjelv i ødemark = høy fare, lav risiko. Svakt skjelv under by = lav fare, høy risiko.",
            },
            {
              prompt: "Hvorfor er Wadati-Benioff-sonen bevis på subduksjon av kald havbunn?",
              options: [
                "Fordi magmaen smelter og eksploderer.",
                "Fordi den kalde, stive platen er sprø ned til 700 km og skjelvfokusene sporer plategeometrien.",
                "Fordi bølger reflekteres av plategrensen.",
                "Fordi varme får bergartene til å kollapse.",
              ],
              answer: 1,
              explain: "Riktig! Det skrå planet av skjelv følger den kalde platen. Under 700 km er bergartene plastiske — ingen skjelv.",
            },
          ]}
        />
      </div>
    </>
  );
}
