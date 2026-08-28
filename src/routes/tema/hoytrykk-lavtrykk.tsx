import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { FigurePlaceholder, PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";

export const Route = createFileRoute("/tema/hoytrykk-lavtrykk")({
  component: TrykkPage,
});

function TrykkPage() {
  return (
    <TopicLayout
      kicker="Atmosfæren"
      title="Høytrykk og lavtrykk"
      lead="Luft har vekt. Trykket i et punkt er vekten av luftsøylen over. Derfor faller trykket med høyden. Et lavtrykk er et område med lavere trykk enn omgivelsene. Et høytrykk er et område med høyere trykk enn omgivelsene. Tallene er alltid relative. Samme hPa-verdi kan være lavtrykk i ett kart og høytrykk i et annet, avhengig av naboen."
      banner="/images/banner-trykk.jpg"
      bannerAlt="Kyst i to slags vær: storm til venstre, klar himmel til høyre"
      videoTopic="høytrykk og lavtrykk"
      next={{ to: "/tema/vindsystemet", label: "Neste: Vindsystemet" }}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">Lufttrykk</h2>
      <p>
        Luft har vekt. Trykket i et punkt er vekten av luftsøylen over. Derfor faller trykket med
        høyden.
      </p>
      <OrdBoks ord="Lufttrykk" barn="Vekten av luftsøylen over. Faller med høyden." />
      <p>
        Et lavtrykk er et område med lavere trykk enn omgivelsene. Et høytrykk er et område med
        høyere trykk enn omgivelsene. Tallene er alltid relative. Samme hPa-verdi kan være lavtrykk
        i ett kart og høytrykk i et annet, avhengig av naboen.
      </p>

      <PhotoFigure
        src="/images/fig-luftsoyle.jpg"
        alt="Glødende luftsøyle over et landskap, tett nede og tynn mot verdensrommet"
        heading="Luftsøylen"
        caption="Trykket i et punkt er vekten av luftsøylen over. Derfor faller trykket med høyden."
        arrows={[{ d: "M 50 12 L 50 46", tone: "warm", width: 1.4 }]}
        marks={[
          { x: 54, y: 10, n: "1", text: "Tynn luft mot rommet", tone: "cold" },
          { x: 54, y: 48, n: "2", text: "Tyngst ved bakken", tone: "warm" },
        ]}
        points={[
          { n: "1", label: "Jo høyere, desto mindre luft over deg — lavere trykk." },
          { n: "2", label: "Ved bakken er søylen lengst. Trykket er størst." },
        ]}
      />

      <PhotoFigure
        src="/images/fig-trykk-splitt.jpg"
        alt="Samme type kyst i to slags vær: storm og klar himmel"
        heading="Trykk er relativt"
        caption="Et lavtrykk er lavere trykk enn omgivelsene. Et høytrykk er høyere trykk enn omgivelsene. Samme hPa-verdi kan være lavtrykk i ett kart og høytrykk i et annet, avhengig av naboen."
        marks={[
          { x: 4, y: 14, n: "L", text: "Lavere enn naboen", tone: "low" },
          { x: 58, y: 14, n: "H", text: "Høyere enn naboen", tone: "warm", align: "left" },
        ]}
        points={[
          { n: "L", label: "Lavtrykk: lavere trykk enn omgivelsene." },
          { n: "H", label: "Høytrykk: høyere trykk enn omgivelsene." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Lavtrykk: luft varmes, stiger og stopper i tropopausen
      </h2>
      <p>
        Sola varmer bakken. Bakken varmer luften. Varm luft er lettere enn kald luft ved samme
        trykk. Den stiger.
      </p>
      <p>
        Der luften stiger, blir det underskudd av luft nær bakken. Trykket faller. Det er et termisk
        lavtrykk.
      </p>
      <OrdBoks ord="Lavtrykk" barn="Et område med lavere trykk enn omgivelsene." />
      <p>
        På vei opp avkjøles luften. Når den når kondensasjonsnivået, dannes skyer. Vanndamp blir til
        vanndråper. Latent varme frigjøres. I tropene er denne kondensasjonen motoren i
        Hadleycellen.
      </p>
      <p>
        Nesten alt vær skjer i troposfæren. Der avtar temperaturen med høyden, typisk om lag 6,5 °C
        per km. Tropopausen ligger om lag 8 km over polene og 16–18 km over tropene.
      </p>
      <p>
        Over tropopausen ligger stratosfæren. Der øker temperaturen med høyden, fordi ozon
        absorberer ultrafiolett stråling. Luften er stabilt lagdelt. Den stigende luften har da
        blitt kaldere enn luften over. Stigningen stopper. Vertikal blanding i stratosfæren er treg.
      </p>
      <OrdBoks
        ord="Tropopause"
        barn="Skillet mot stratosfæren, der temperaturen begynner å øke med høyden og stigningen stopper."
      />

      <PhotoFigure
        src="/images/fig-lavtrykk-snitt.jpg"
        alt="Tverrsnitt av et lavtrykk: luft inn langs havet, tårnhøy byge, regn"
        heading="Lavtrykk sett fra sida"
        caption="Der luften stiger, blir det underskudd av luft nær bakken. Trykket faller. På vei opp avkjøles luften, og det dannes skyer."
        arrows={[
          { d: "M 12 46 L 38 42", tone: "low", width: 1.25 },
          { d: "M 88 46 L 62 42", tone: "low", width: 1.25 },
          { d: "M 50 40 L 50 14", tone: "low", width: 1.4 },
        ]}
        marks={[
          { x: 6, y: 52, n: "1", text: "Inn nede", tone: "low" },
          { x: 42, y: 12, n: "2", text: "Opp og til skyer", tone: "low" },
        ]}
        points={[
          { n: "1", label: "Underskudd nær bakken. Luft strømmer inn." },
          { n: "2", label: "Luften stiger, avkjøles og danner skyer." },
        ]}
      />

      <PhotoFigure
        src="/images/fig-stigende.jpg"
        alt="Tårnhøye skyer der luften stiger og avkjøles"
        heading="Stigningen stopper i tropopausen"
        caption="Nesten alt vær skjer i troposfæren. Over tropopausen øker temperaturen med høyden. Den stigende luften har da blitt kaldere enn luften over. Stigningen stopper."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Høytrykk: luften synker
      </h2>
      <p>
        Luften som har steget, strømmer unna i høyden. Der avkjøles den. Kald, tørr luft er tettere
        og synker.
      </p>
      <p>
        Der luften synker, samles det et overskudd av luft nær bakken. Trykket stiger. Det er et
        høytrykk.
      </p>
      <OrdBoks ord="Høytrykk" barn="Et område med høyere trykk enn omgivelsene." />
      <p>
        På vei ned varmes luften tørradiabatisk, og relativ fukt faller. Skyer løses opp. Poenget er
        nedsynkingen, ikke «godvær i seg selv». Sahara ligger under Hadleycellens nedsynking.
        Vedvarende høytrykk over Sør-Norge om sommeren virker på samme måte: nedsynking, få skyer,
        mer innstråling ved bakken.
      </p>

      <PhotoFigure
        src="/images/fig-hoytrykk-snitt.jpg"
        alt="Tverrsnitt av høytrykk: luft synker fra klar himmel og sprer seg ut over stille hav"
        heading="Høytrykk sett fra sida"
        caption="Der luften synker, samles det et overskudd av luft nær bakken. Trykket stiger. På vei ned varmes luften tørradiabatisk, og relativ fukt faller. Skyer løses opp."
        arrows={[
          { d: "M 50 10 L 50 32", tone: "warm", width: 1.4 },
          { d: "M 48 36 L 18 44", tone: "warm", width: 1.2 },
          { d: "M 52 36 L 82 44", tone: "warm", width: 1.2 },
        ]}
        marks={[
          { x: 42, y: 12, n: "H", text: "Synker", tone: "warm" },
          { x: 6, y: 48, n: "1", text: "Ut nede", tone: "warm" },
        ]}
        points={[
          { n: "H", label: "Synkende luft gir overskudd ved bakken. Skyer løses opp." },
          { n: "1", label: "Luft strømmer ut fra høytrykket langs bakken." },
        ]}
      />

      <PhotoFigure
        src="/images/fig-synker.jpg"
        alt="Klar, kald luft over åpent hav der skyene er få"
        heading="Nedsynking"
        caption="Poenget er nedsynkingen, ikke «godvær i seg selv». På vei ned varmes luften tørradiabatisk, og relativ fukt faller. Skyer løses opp."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Vind som resultat</h2>
      <p>
        Luft beveger seg fordi trykket ikke er det samme overalt. Trykkgradienten peker fra høyt mot
        lavt trykk og setter luften i gang. Tette isobarer betyr sterk vind.
      </p>
      <p>
        Nær bakken bremser friksjon. Da krysser vinden isobarene inn mot lavtrykk og ut fra
        høytrykk. Innstrømming i lavtrykk tvinger luft opp: skyer og nedbør. Utstrømming i høytrykk
        tvinger luft ned: oppløsning av skyer.
      </p>
      <p>
        På nordlig halvkule går luften mot klokka inn mot lavtrykk og med klokka ut fra høytrykk.
        Det er trykkgradient, coriolis og friksjon, ikke en huskeregel.
      </p>

      <PhotoFigure
        src="/images/fig-vind-mot-lavtrykk.jpg"
        alt="Solbelyst gress i forgrunnen, mørk storm over havet i det fjerne"
        heading="Fra høyt mot lavt trykk"
        caption="Luft beveger seg fordi trykket ikke er det samme overalt. Trykkgradienten peker fra høyt mot lavt trykk og setter luften i gang."
        arrows={[
          { d: "M 18 42 L 48 32", tone: "teal", width: 1.35 },
          { d: "M 38 48 L 62 36", tone: "teal", width: 1.2 },
        ]}
        marks={[
          { x: 4, y: 58, n: "H", text: "Høytrykk", tone: "warm" },
          { x: 58, y: 18, n: "L", text: "Lavtrykk", tone: "low" },
        ]}
        points={[
          { n: "H", label: "Utstrømming i høytrykk tvinger luft ned: oppløsning av skyer." },
          { n: "L", label: "Innstrømming i lavtrykk tvinger luft opp: skyer og nedbør." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Pålandsvind og fralandsvind
      </h2>
      <p>
        Pålandsvind og fralandsvind er lokale kretsløp. De drives av at land og hav varmes ulikt.
        Samme logikk som høytrykk og lavtrykk, i liten skala langs kysten.
      </p>
      <p>
        Om dagen varmes land fortere enn hav. Luften over land blir lettere og stiger: termisk
        lavtrykk. Luft fra sjøen strømmer inn. Det er pålandsvind, eller sjøbris. Returstrømmen går
        ovenfor. På Sørlandet en svak høytrykksdag i juni: sol, 25 °C innerst i skjærgården, 18 °C
        og pålandsvind på odden.
      </p>
      <p>
        Om natten avkjøles land fortere. Da synker luften over land, og vinden går ut mot sjøen:
        fralandsvind, eller landbris. Den er svakere.
      </p>
      <p>
        Norskekysten om sommeren: sjøbris er vanlig når storskalavinden er svak. Den kan utløse
        byger et stykke inn i landet der brisen konvergerer, og holde kysten kjøligere.
      </p>

      <FigurePlaceholder
        heading="Pålandsvind og fralandsvind"
        caption="Om dagen varmes land fortere enn hav: sjøbris inn mot land. Om natten avkjøles land fortere: landbris ut mot sjøen."
        label="Plassholder for figur av pålandsvind om dagen og fralandsvind om natten"
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Fønvind</h2>
      <p>
        Føn er ikke katabatisk fallvind. Fuktig luft tvinges over fjell. På losiden stiger den,
        avkjøles, kondenserer og gir orografisk nedbør. Fuktigheten tapes. På lesiden synker luften
        og varmes tørradiabatisk, ca. 9,8 °C per km. Resultatet er varm, tørr, kastevill vind.
      </p>
      <OrdBoks
        ord="Føn"
        barn="Varm, tørr lesidevind etter orografisk nedbør i lo. Ikke katabatisk."
      />
      <p>
        Vestavind inn mot Vestlandet treffer losiden av Langfjella. Vestlandet får orografisk
        nedbør. Fønen ligger i le: østlandsbygdene og dalene øst for fjellet, Østerdalen og
        Gudbrandsdalen. Indre Østlandet kan være 10 °C varmere enn kysten. Østavind kan gi føn på
        Vestlandet.
      </p>

      <FigurePlaceholder
        heading="Føn"
        caption="Loside: orografisk nedbør. Leside: tørradiabatisk nedsynking. Vestavind mot Vestlandet, føn øst for Langfjella."
        label="Plassholder for figur av føn med nedbør i lo og tørr nedsynking i le"
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Katabatisk vind</h2>
      <p>
        Katabatisk vind er kald, tett luft som renner ned is eller fjell på grunn av tyngdekraft.
        Luften avkjøles ved utstråling over snø og is. Den er kald ved foten. På vei ned kan luften
        varmes noen grader, men den starter så kald at den fortsatt er kald ved foten. Den trenger
        ikke kondensasjon. Nedsynking senker relativ fukt, og skyer løses opp, ikke dannes.
      </p>
      <OrdBoks
        ord="Katabatisk"
        barn="Kald, tett luft som renner ned is eller fjell av tyngdekraft."
      />
      <p>
        Skill de to. Føn: luft løftes, nedbør i lo, varm i le. Katabatisk: kald luft renner. Begge
        kalles fallvind i dagligtale. I geofag 2 er fallvind uten orografisk nedbør katabatisk.
      </p>
      <p>
        Norske eksempler: kaldluft fra høyfjellet ned daler, og utstrømning fra platåbreene
        Svartisen og Folgefonna. Samme fysikk på lesiden av isdekker på Grønland og i Antarktis.
        Katabatisk kaldluft samles i dalbunnen og kan bygge inversjon. Føn bryter inversjoner.
        Katabatisk bygger dem.
      </p>

      <FigurePlaceholder
        heading="Katabatisk vind"
        caption="Kald luft renner ned is eller fjell. Norske platåbreer og dal."
        label="Plassholder for figur av katabatisk vind ned is eller fjell"
      />

      <Callout title="Vanlige misforståelser">
        <p>
          Samme hPa-verdi kan være lavtrykk i ett kart og høytrykk i et annet, avhengig av naboen.
        </p>
        <p>
          Føn er ikke katabatisk fallvind. Vestavind inn mot Vestlandet treffer losiden. Fønen
          ligger i le, øst for Langfjella.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term name="Lufttrykk" def="Vekten av luftsøylen over. Faller med høyden." />
        <Term name="Lavtrykk" def="Et område med lavere trykk enn omgivelsene." />
        <Term name="Høytrykk" def="Et område med høyere trykk enn omgivelsene." />
        <Term
          name="Tropopause"
          def="Skillet mot stratosfæren, der temperaturen begynner å øke med høyden og stigningen stopper."
        />
        <Term
          name="Føn"
          def="Varm, tørr lesidevind etter orografisk nedbør i lo. Ikke katabatisk."
        />
        <Term
          name="Katabatisk"
          def="Kald, tett luft som renner ned is eller fjell av tyngdekraft."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva betyr det at tallene på værkartet er relative?",
            options: [
              "1013 hPa er alltid høytrykk.",
              "Samme hPa-verdi kan være lavtrykk i ett kart og høytrykk i et annet, avhengig av naboen.",
              "Lavtrykk betyr alltid under 1000 hPa.",
              "Høytrykk er den høyeste verdien som finnes i atmosfæren.",
            ],
            answer: 1,
            explain:
              "Tallene er alltid relative. Samme hPa-verdi kan være lavtrykk i ett kart og høytrykk i et annet, avhengig av naboen.",
          },
          {
            prompt: "Hva skjer når vestavind treffer Vestlandet og Langfjella?",
            options: [
              "Vestlandet ligger i le og får føn.",
              "Vestlandet treffer losiden og får orografisk nedbør. Fønen ligger øst for fjellet.",
              "Hele Sør-Norge får katabatisk fallvind.",
              "Østlandet får all nedbøren, Vestlandet ligger i le.",
            ],
            answer: 1,
            explain:
              "Vestavind inn mot Vestlandet treffer losiden av Langfjella. Vestlandet får orografisk nedbør. Fønen ligger i le: Østerdalen og Gudbrandsdalen. Østavind kan gi føn på Vestlandet.",
          },
          {
            prompt: "Hva er forskjellen på føn og katabatisk vind i geofag 2?",
            options: [
              "Begge er det samme: varm fallvind.",
              "Føn: luft løftes, nedbør i lo, varm i le. Katabatisk: kald luft renner. Fallvind uten orografisk nedbør er katabatisk.",
              "Katabatisk er alltid varm. Føn er alltid kald.",
              "Føn dannes bare over is, katabatisk bare over hav.",
            ],
            answer: 1,
            explain:
              "Skill de to. Føn: luft løftes, nedbør i lo, varm i le. Katabatisk: kald luft renner. I geofag 2 er fallvind uten orografisk nedbør katabatisk.",
          },
        ]}
      />
    </TopicLayout>
  );
}
