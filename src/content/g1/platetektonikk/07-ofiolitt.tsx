import { PhotoFigure } from "@/components/photo-figure";

export function Ofiolitt() {
  return (
    <section className="pt-6 space-y-4">
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Ofiolittkomplekset: Havbunnens anatomi og Leka i Trøndelag
      </h2>
      <p>
        Husk tilbake til tverrsnittet og analysen av midthavsryggen tidligere i kapittelet: Der så vi putelava på toppen,
        en sverm av sprekker med loddrette basaltganger, og et magmakammer med gabbro som hvilte på mantelen.
        Hvordan kan vi vite alt dette med sikkerhet når havbunnen befinner seg under flere tusen meter med stummende mørkt vann?
      </p>
      <p>
        Svaret ligger i <strong>ofiolitter</strong>: sjeldne geologiske hendelser der biter av havbunnsskorpe
        og øvre mantel ikke har blitt subdusert og ødelagt, men derimot skjøvet opp på tørt land under en fjellkjedekollisjon
        (et fenomen kalt <strong>obduksjon</strong>, Furnes et al., 1988). En ofiolitt er med andre ord et komplett,
        fossilt stykke havbunn som er hevet på land og veltet over ende, slik at geologer i dag kan spasere tvers gjennom
        hele lagdelingen — fra dyphavssedimenter ned til selve mantelen — til fots!
      </p>
      <p>
        Ved den berømte Penrose-konferansen i 1972 definerte geologene den klassiske <strong>ofiolitt-stratigrafien</strong>,
        som representerer et komplett vertikalt tverrsnitt gjennom oseanisk litosfære:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Pelagiske sedimenter (øverst):</strong> Tynne lag av dyphavsleire, kalkslam og kiselholdig radiolaritt
          (dannet av mikroskopiske kiselalger).
        </li>
        <li>
          <strong>Putelava (pillow basalt):</strong> 0,5–1,5 km tykt lag med glassaktige lavaputer som vitner om
          vulkanske utbrudd direkte under vann.
        </li>
        <li>
          <strong>Plateformede basaltganger (sheeted dykes):</strong> Et unikt 1–2 km tykt kompleks av loddrette,
          parallelle basaltganger («gang-i-gang») som viser hvordan midthavsryggen kontinuerlig sprekker opp og fylles med ny magma.
        </li>
        <li>
          <strong>Gabbro (isotrop og lagdelt):</strong> 2–4 km tykt lag av grovkornet dypbergart dannet i det aksiale
          magmakammeret under midthavsryggen. Nederst danner tunge krystaller rytmiske lag (lagdelt gabbro).
        </li>
        <li>
          <strong>Petrologisk Moho:</strong> Selve grenseflaten mellom skorpen (gabbro) og den underliggende mantelen (peridotitt).
        </li>
        <li>
          <strong>Mantel-litosfære (nederst):</strong> Rester av øvre mantel bestående av <strong>peridotitt</strong> (dunitt
          og harzburgitt) som er utsmeltet for basaltkomponenter. Ved kontakt med sjøvann omdannes peridotitt til den vakre,
          grønne eller gyllenbrune bergarten <strong>serpentinitt</strong>.
        </li>
      </ol>
      <PhotoFigure
        src="/images/geo-ofiolitt-leka.jpg"
        alt="Leka ofiolittkompleks med karakteristisk gulbrun dunitt og peridotitt fra jordens mantel"
        heading="Norges geologiske nasjonalmonument: Leka ofiolittkompleks"
        caption="På øya Leka i Trøndelag ligger et av verdens best bevarte ofiolittkomplekser (Furnes et al., 1988; NGU). Da Iapetushavet lukket seg for 420 millioner år siden under Den kaledonske fjellkjedefoldingen, ble et helt stykke havbunn vippet 90 grader på høykant og skjøvet opp på land. Her på Leka kan man gå tørrskodd fra jordens mantel (karakteristisk gulbrun dunitt og harzburgitt), krysse Moho-grensen til fots, og fortsette opp gjennom lagdelt gabbro, basaltganger og putelava!"
        marks={[
          { x: 22, y: 72, n: "1", text: "Mantelperidotitt", tone: "warm" },
          { x: 42, y: 55, n: "2", text: "Moho-grensen", tone: "cold" },
          { x: 62, y: 42, n: "3", text: "Lagdelt gabbro", tone: "warm" },
          { x: 80, y: 24, n: "4", text: "Putelava", tone: "cold" },
        ]}
        points={[
          { n: "1", label: "Gulbrun forvitret dunitt og harzburgitt: Dette er selve jordens øvre mantel eksponert i dagslys!" },
          { n: "2", label: "Petrologisk Moho: Overgangen mellom ultramafisk mantel og mafisk gabbroid jordskorpe." },
          { n: "3", label: "Lagdelt gabbro: Krystallisasjonsprodukter fra havbunnens aksiale magmakammer for 497 millioner år siden." },
          { n: "4", label: "Plateformede ganger og putelava som en gang utgjorde havbunnen i Iapetushavet." },
        ]}
      />
    </section>
  );
}
