import { KatabaticWindDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function KatabatiskVindKaldluftsdrenasjeOg() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Katabatisk vind: Kaldluftsdrenasje og dannelse av temperaturinversjon
      </h2>
      <p>
        Både fønvind og katabatisk vind kalles ofte «fallvind» i dagligtale, men fysikken bak dem er
        fundamentalt motsatt. Ordet <em>katabatisk</em> kommer fra det greske ordet{" "}
        <em>katabatikos</em>, som betyr «gående nedover».
      </p>
      <p>
        En katabatisk vind oppstår når et stort snø- eller isdekke (som en platåbre eller et
        innlandsisdekke) utsettes for sterk langbølget strålingsavkjøling under en stjerneklar
        nattehimmel. Snøflaten taper varme til verdensrommet, og luftlaget like over fryses ned til
        ekstreme temperaturer.
      </p>
      <p>
        Når luft blir iskald, trekker den seg kraftig sammen og får{" "}
        <strong>svært høy tetthet</strong>. Denne tunge, kompakte luftmassen oppfører seg omtrent
        som rennende vann: <strong>Tyngdekraften trekker den nedover</strong>
        brearmer, gjel og dalsider mot lavlandet.
      </p>

      <OrdBoks
        ord="Katabatisk vind"
        barn="Kald og tung luft som dreneres nedover skråninger og dalsider av tyngdekraften fra snø- og isflater. Dannes uten orografisk nedbør."
      />

      <p>
        Også katabatisk luft varmes litt adiabatisk når den synker (1,0 °C per 100 m). Men fordi den
        aldri har fått tilført latent varme fra kondensasjon, og fordi den startet med en så
        ekstremt lav temperatur over isen, er den
        <strong> fremdeles iskald når den treffer dalbunnen</strong>.
      </p>
      <p>
        Nede i dalbunnen eller innerst i fjorden samler denne tunge kaldluften seg i et dypt{" "}
        <strong>kaldluftsbasseng (kaldluftssjø)</strong>. Dette skaper en markert{" "}
        <strong>temperaturinversjon</strong>: Det er bitende kaldt nede i dalbunnen (-20 °C), mens
        det kan være adskillig mildere oppe i dalsiden (-4 °C). Røyk, eksos og forurensning fra
        bebyggelsen stenges inne under inversjonslokket.
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>Folgefonna og Svartisen:</strong> På stille sommerkvelder kan man tydelig merke et
          iskaldt gufs, et såkalt «bresnøft», som raser nedover mot fjorden fra bretungen.
        </li>
        <li>
          <strong>Grønland og Antarktis:</strong> Her er de katabatiske vindene beryktede. Enorme
          masser med -50 °C kald luft raser ned fra innlandsisen mot kysten og kan nå orkan styrke
          (over 70 m/s / 250 km/t).
        </li>
      </ul>

      <KatabaticWindDiagram />
    </section>
  );
}
