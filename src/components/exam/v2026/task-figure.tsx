import type { ReactNode } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { AnalyseChart } from "@/components/exam/v2026/generated/AnalyseChart";
import { BathyChart } from "@/components/exam/v2026/generated/BathyChart";
import { CtdChart } from "@/components/exam/v2026/generated/CtdChart";
import { DyeChart } from "@/components/exam/v2026/generated/DyeChart";
import { FoehnChart } from "@/components/exam/v2026/generated/FoehnChart";
import { GydaChart } from "@/components/exam/v2026/generated/GydaChart";
import { PermafrostChart } from "@/components/exam/v2026/generated/PermafrostChart";
import { TsChart } from "@/components/exam/v2026/generated/TsChart";

const linkClass =
  "text-primary underline decoration-1 underline-offset-2 hover:decoration-2 break-words";


function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={linkClass} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Credit({
  who,
  title,
  href,
  license,
  licenseHref,
  changed,
  children,
}: {
  who: string;
  title: string;
  href: string;
  license: string;
  licenseHref: string;
  changed?: string;
  children?: ReactNode;
}) {
  return (
    <span className="mt-2 block">
      {who}. <ExtLink href={href}>{title}</ExtLink>. Lisens: <ExtLink href={licenseHref}>{license}</ExtLink>
      {changed ? `. Endret: ${changed}` : "."}
      {children}
    </span>
  );
}

function ScrollImage({
  src,
  alt,
  minWidth,
}: {
  src: string;
  alt: string;
  minWidth: string;
}) {
  return <img src={src} alt={alt} className={`h-auto w-full max-w-none ${minWidth}`} />;
}

function AnalyseFigure() {
  return (
    <FigureFrame
      heading="Analysekart 31. januar 2024 kl. 18 UTC"
      scroll
      caption={
        <>
          Egen figur. Isobarene er middeltrykk ved havnivå fra NCEP/NCAR-reanalysen 31. januar 2024
          kl. 18 UTC, da ekstremværet Ingunn fortsatt lå i Norskehavet. Lavtrykket er 948 hPa.
          Høytrykket sørvest i kartet er 1035 hPa. Isobarer hver 4 hPa. Den okkluderte fronten følger
          trauet østover inn mot kysten av Nordland, der X står. Kystlinjen er Natural Earth i
          målestokk 1:10 millioner, i en Lambert konform konisk projeksjon. Figuren har ingen vindpil.
          Det udaterte analysekartet hos Meteorologisk institutt er ikke brukt som tallgrunnlag.
          <Credit
            who="NOAA Physical Sciences Laboratory"
            title="NCEP/NCAR Reanalysis, 6-hourly sea level pressure"
            href="https://psl.noaa.gov/data/gridded/data.ncep.reanalysis.surface.html"
            license="Offentlig eiendom (US government work)"
            licenseHref="https://www.psl.noaa.gov/data/gridded/disclaimer.html"
          />
          <Credit
            who="Natural Earth"
            title="1:10m land, offentlig eiendom"
            href="https://www.naturalearthdata.com/downloads/10m-physical-vectors/"
            license="Public domain"
            licenseHref="https://www.naturalearthdata.com/about/terms-of-use/"
          />
        </>
      }
    >
      <AnalyseChart />
    </FigureFrame>
  );
}

function CopernicusFigure() {
  return (
    <FigureFrame
      heading="Marin hetebølge i Middelhavet, august 2024"
      scroll
      caption={
        <>
          Originalfigur med daglig overflatetemperatur i Middelhavet og avviket fra 1991–2020.
          <Credit
            who="Copernicus Climate Change Service (C3S) / ECMWF / DMI"
            title="ESOTC 2024, European Ocean, Figure 11.2"
            href="https://climate.copernicus.eu/esotc/2024/european-ocean"
            license="Licence to Use Copernicus Products"
            licenseHref="https://cds.climate.copernicus.eu/licences/licence-to-use-copernicus-products"
          >
            {" "}
            Generated using Copernicus Climate Change Service information 2024. Neither the European
            Commission nor ECMWF is responsible for any use that may be made of the Copernicus
            information or data it contains.
          </Credit>
        </>
      }
    >
      <ScrollImage
        src="/eksamen/v2026/copernicus-esotc2024-fig11.2.png"
        minWidth="max-sm:min-w-[48rem]"
        alt="To paneler fra Copernicus. Til venstre daglig havoverflatetemperatur i Middelhavet sommeren 2024, med en topp på 28,67 grader 13. august. Til høyre kart over temperaturavvik i august 2024, der deler av havet er varmere enn normalen og andre deler er det ikke."
      />
    </FigureFrame>
  );
}

function GabrielleFigure() {
  return (
    <FigureFrame
      heading="Banen til orkanen Gabrielle, september 2025"
      scroll
      caption={
        <>
          Originalt banekart. Fargene følger Saffir–Simpson-skalaen i tegnforklaringen på bildet.
          <Credit
            who="OreoStar-fait, med bakgrunn fra NASA og banedata fra National Hurricane Center"
            title="Gabrielle 2025 path"
            href="https://commons.wikimedia.org/wiki/File:Gabrielle_2025_path.png"
            license="Offentlig eiendom (public domain)"
            licenseHref="https://commons.wikimedia.org/wiki/File:Gabrielle_2025_path.png"
          />
        </>
      }
    >
      <ScrollImage
        src="/eksamen/v2026/gabrielle-2025-path.png"
        minWidth="max-sm:min-w-[48rem]"
        alt="Banekart for orkanen Gabrielle i 2025. Banen går fra Vest-Afrika mot nordvest, når kategori 4, og svinger deretter nordøstover mot Asorene og Europa mens fargen viser lavere vindstyrke."
      />
    </FigureFrame>
  );
}

function GydaFigures() {
  return (
    <>
      <FigureFrame
        heading="Vanndamp og lufttrykk 12. januar 2022"
        scroll
        caption={
          <>
            Egen figur. Fargene er nedbørbart vann i millimeter, og de mørke linjene er lufttrykk
            ved havnivå for hver 4 hPa. Lavtrykket lengst nord er om lag 965 hPa, og høytrykket
            lenger sør er om lag 1040 hPa. Tallene er døgnmiddel fra NCEP/NCAR for 12. januar 2022,
            ikke NRKs prognosekart. NRK-kartet er ikke brukt. Kystlinjen er Natural Earth.
            <Credit
              who="NOAA Physical Sciences Laboratory, NCEP/NCAR Reanalysis"
              title="Daglige middelverdier av nedbørbart vann og lufttrykk, 12. januar 2022"
              href="https://psl.noaa.gov/data/gridded/data.ncep.reanalysis.html"
              license="Offentlig eiendom (US government work)"
              licenseHref="https://www.weather.gov/disclaimer"
            />
          </>
        }
      >
        <GydaChart />
      </FigureFrame>
      <FigureFrame
        heading="Farevarsel for regn under ekstremværet Gyda"
        scroll
        caption={
          <>
            Originalfigur fra Meteorologisk institutt. Nyhetssaken beskriver oransje farevarsel for
            kraftig regn i sørlige deler av Trøndelag, Møre og Romsdal, Sogn og Fjordane og
            Innlandet, og lokalt 80–120 mm på 24 timer.
            <Credit
              who="Meteorologisk institutt"
              title="Oransje farevarsel for regn i Trøndelag, Møre og Romsdal, Sogn og Fjordane og Innlandet"
              href="https://www.met.no/nyhetsarkiv/oransje-farevarsel-regn-i-trondelag-more-og-romsdal-sogn-og-fjordane-og-innlandet"
              license="Norsk lisens for offentlige data (NLOD) og Creative Commons Attribution 4.0"
              licenseHref="https://www.met.no/frie-meteorologiske-data/lisensiering-og-kreditering"
            />
          </>
        }
      >
        <ScrollImage
          src="/eksamen/v2026/met-farevarsel-gyda.png"
          minWidth="max-sm:min-w-[40rem]"
          alt="Farevarselkart fra Meteorologisk institutt over Sør-Norge. Trekantvarsler ligger langs Vestlandet og i Trøndelag."
        />
      </FigureFrame>
    </>
  );
}

function DyeFigure() {
  return (
    <FigureFrame
      heading="To glass med farget smeltevann"
      scroll
      caption={
        <>
          Egen illustrasjon av forsøket i oppgaven: gjennomsiktige glass, tesil og isbit med rødlig
          fargestoff. I glasset til venstre synker smeltevannet og legger seg langs bunnen. I glasset
          til høyre sprer fargestoffet seg nær overflaten. Figuren sier ikke hvilket glass som er
          ferskvann og hvilket som er saltvann. Fotoet fra Universitetet i Bergen er ikke brukt.
        </>
      }
    >
      <DyeChart />
    </FigureFrame>
  );
}


function TsFigure() {
  return (
    <FigureFrame
      heading="Vannmasse A og B i et T–S-diagram"
      scroll
      caption={
        <>
          Egen figur. Tabellen er tallene fra oppgaven. Isopyknalene er regnet med UNESCO EOS-80 og
          viser tetthet i kg/dm³, med et jevnt intervall på 0,0005 i hoveddiagrammet og 0,0001 i
          utsnittet. Etikettene følger isopyknalene. Utsnittet under er det samme området rundt A og
          B, med akser og isopyknaler. Frysepunktlinjen er regnet med UNESCOs formel. Diagrammet sier
          ikke hvilken vannmasse som er tyngst.
        </>
      }
    >
      <div className="max-sm:min-w-[44rem]">
        <table className="mb-4 w-full max-w-md border-collapse text-left text-sm">
          <caption className="mb-2 text-left font-medium text-foreground">Vannmasse A og B</caption>
          <thead>
            <tr className="border-b border-border">
              <th className="py-1 pr-4 font-medium">Vannmasse</th>
              <th className="py-1 pr-4 font-medium">Temperatur (°C)</th>
              <th className="py-1 font-medium">Salinitet (PSU)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/70">
              <td className="py-1 pr-4">A</td>
              <td className="py-1 pr-4">1</td>
              <td className="py-1">29,7</td>
            </tr>
            <tr>
              <td className="py-1 pr-4">B</td>
              <td className="py-1 pr-4">−0,8</td>
              <td className="py-1">29,4</td>
            </tr>
          </tbody>
        </table>
        <TsChart />
      </div>
    </FigureFrame>
  );
}

function CtdFigure({ officialUrl }: { officialUrl: string }) {
  return (
    <FigureFrame
      heading="Temperatur- og salinitetsprofiler fra Grønlandshavet"
      scroll
      caption={
        <>
          Egen figur av målte Argo-profiler, 0–175 m. Kastene er WMO 6903551 den 14. april 2020
          (75,18° N, 6,00° V) og WMO 6903546 den 8. august 2020 (75,24° N, 4,29° V). Panelene sier
          ikke hvilket kast som er april og hvilket som er august. OMG-CTD hos PO.DAAC krever
          innlogging og er ikke brukt.{" "}
          <ExtLink href={officialUrl}>Udirs figur åpnes her</ExtLink>.
          <Credit
            who="Argo og Ifremer GDAC"
            title="Argo float data and metadata from the Global Data Assembly Centre (Argo GDAC)"
            href="https://doi.org/10.17882/42182"
            license="Creative Commons Attribution 4.0"
            licenseHref="https://creativecommons.org/licenses/by/4.0/"
          />
        </>
      }
    >
      <CtdChart />
    </FigureFrame>
  );
}

function BathyFigure() {
  return (
    <FigureFrame
      heading="Batymetri i de nordiske hav"
      scroll
      caption={
        <>
          Egen figur, regnet ut fra ETOPO 2022. Konturene ligger ved 200, 500, 1000, 2000 og 3000
          meters dyp, og kystlinjen er vektor fra{" "}
          <ExtLink href="https://www.naturalearthdata.com/downloads/10m-physical-vectors/">
            Natural Earth 1:10m
          </ExtLink>{" "}
          (
          <ExtLink href="https://www.naturalearthdata.com/about/terms-of-use/">public domain</ExtLink>
          ). Udirs kart er ikke brukt.
          Plasseringen av et punkt er ikke avgjørende i oppgaven.
          <Credit
            who="NOAA National Centers for Environmental Information"
            title="ETOPO 2022 Global Relief Model"
            href="https://www.ncei.noaa.gov/products/etopo-global-relief-model"
            license="Offentlig eiendom (US government work)"
            licenseHref="https://www.ncei.noaa.gov/about/data-disclaimer"
          />
        </>
      }
    >
      <BathyChart />
    </FigureFrame>
  );
}

function GjelstrupFigure() {
  return (
    <FigureFrame
      heading="Temperatur og salinitet på Nordøst-Grønlandssokkelen, 1980–2020"
      scroll
      caption={
        <>
          Original figur 6. Panel a og b er 0–20 m, c og d er kjernen av polart vann (T &lt; 0 °C og
          S &lt; 34,4), e og f er kjernen av atlantisk vann (T &gt; 0 °C og S &gt; 34,4).           Grå
          sirkler er gjennomsnitt for juli–september, oransje linje er fem års glidende
          middel, og svarte linjer er observasjoner gjengitt fra Gjelstrup mfl. 2022. Panel g og h
          hører med i originalen og viser dypet til vannmassene. Oppgaven bruker panel a–f.
          <Credit
            who="Gjelstrup, C. V. B. og Stedmon, C. A."
            title="A switch in thermal and haline contributions to stratification in the Greenland Sea during the last four decades. Progress in Oceanography 225, 103283"
            href="https://doi.org/10.1016/j.pocean.2024.103283"
            license="Creative Commons Attribution 4.0"
            licenseHref="https://creativecommons.org/licenses/by/4.0/"
          />
        </>
      }
    >
      <ScrollImage
        src="/eksamen/v2026/gjelstrup-2024-fig6.png"
        minWidth="max-sm:min-w-[64rem]"
        alt="Åtte paneler, a til h, med temperatur og salinitet fra 1980 til 2020. Øverst 0 til 20 meter, så polart vann, så atlantisk vann, og nederst dypet til polarvannskjernen og 0-gradersisotermen. Grå sirkler, oransje glidende middel og svarte observasjoner."
      />
    </FigureFrame>
  );
}

function ChandlerFigure() {
  return (
    <FigureFrame
      heading="Antarktis de siste 800 000 år"
      scroll
      caption={
        <>
          Original figur 1, med temperatur, havpådriv, globalt havnivå og isvolum i kjøringen som
          artikkelen kaller Run C.
          <Credit
            who="Chandler, D. M., Langebroek, P. M., Reese, R. med flere"
            title="Antarctic Ice Sheet tipping in the last 800,000 years warns of future ice loss. Communications Earth & Environment 6, 420"
            href="https://www.nature.com/articles/s43247-025-02366-2"
            license="Creative Commons Attribution 4.0"
            licenseHref="https://creativecommons.org/licenses/by/4.0/"
          />
        </>
      }
    >
      <ScrollImage
        src="/eksamen/v2026/chandler-2025-fig1.png"
        minWidth="max-sm:min-w-[48rem]"
        alt="Fire tidsserier fra 800 000 år siden til i dag: temperaturavvik i lufta, temperaturpådriv fra havet, globalt havnivå og volumet av innlandsisen i Antarktis. Istider og mellomistider er markert."
      />
    </FigureFrame>
  );
}

function PermafrostFigure() {
  return (
    <FigureFrame
      heading="Permafrost i Eurasia og Nord-Amerika"
      scroll
      caption={
        <>
          Kurvene er vektorlinjene i figur 10 hos Willeit og Ganopolski (2015), tegnet på nytt med
          akser i millioner kvadratkilometer og millioner kubikkilometer. Heltrukne linjer er
          overflateporøsitet 0,25, 0,50 og 0,75. Stiplet linje er kjøringen med geotermisk varmefluks
          fra Davies (2013). Artikkelens figur dekker 120 000 år. Figuren hos Opel mfl. (2024) er
          utgitt av Elsevier og er ikke brukt.
          <Credit
            who="Willeit, M. og Ganopolski, A."
            title="Coupled Northern Hemisphere permafrost–ice-sheet evolution over the last glacial cycle. Climate of the Past 11, 1165–1180"
            href="https://doi.org/10.5194/cp-11-1165-2015"
            license="Creative Commons Attribution 3.0"
            licenseHref="https://creativecommons.org/licenses/by/3.0/"
          />
        </>
      }
    >
      <PermafrostChart />
    </FigureFrame>
  );
}

function NveFigure() {
  return (
    <FigureFrame
      heading="Massebalanse for Ålfotbreen og Hellstugubreen"
      caption={
        <>
          Originalfigurene fra NVE. Blått er vinterbalanse, rødt er sommerbalanse og grått er
          årsbalanse, i meter vannekvivalent. Diagrammene på glacier.nve.no går nå lenger enn
          årstallene som er nevnt i oppgaven. Bruk årene oppgaven ber om.
          <Credit
            who="Norges vassdrags- og energidirektorat (NVE)"
            title="Klimaindikator for Ålfotbreen (2078) og Hellstugubreen (2768)"
            href="https://glacier.nve.no/Glacier/viewer/CI/no/nve/ClimateIndicatorInfo/2078?name=%C3%85lfotbreen"
            license="Bruk med «Kilde: NVE». Åpne data: Norsk lisens for offentlige data (NLOD) 2.0"
            licenseHref="https://www.nve.no/vann-og-vassdrag/vannets-kretsloep/bre/bredata/"
          />
        </>
      }
    >
      <div className="grid gap-6">
        <img
          src="/eksamen/v2026/nve-alfotbreen.png"
          alt="Stolpediagram for Ålfotbreen. Blå stolper oppover er vinterbalanse, røde stolper nedover er sommerbalanse, og grå stolper er årsbalanse, fra 1963 og framover."
          className="mx-auto h-auto w-full max-w-3xl bg-white"
        />
        <img
          src="/eksamen/v2026/nve-hellstugubreen.png"
          alt="Stolpediagram for Hellstugubreen. Blå stolper oppover er vinterbalanse, røde stolper nedover er sommerbalanse, og grå stolper er årsbalanse, fra 1962 og framover."
          className="mx-auto h-auto w-full max-w-3xl bg-white"
        />
      </div>
    </FigureFrame>
  );
}

function FoehnFigure() {
  return (
    <FigureFrame
      heading="Fønvind over et fjell på 2000 meter"
      scroll
      caption={
        <>
          Egen figur av situasjonen i oppgaven. Lufta kommer inn fra losiden. Pilen er blå på vei opp,
          der lufta avkjøles, og oransje på vei ned, der den varmes opp. Skybasen på losiden er 800 m,
          og temperaturen ved havnivå der er 14 °C. Tørradiabatisk gradient er 1 °C per 100 m, og
          våtadiabatisk gradient er 0,5 °C per 100 m. Temperaturen på toppen og på lesiden er ikke
          regnet ut i figuren.
        </>
      }
    >
      <FoehnChart />
    </FigureFrame>
  );
}

export function V2026TaskFigure({ number, officialUrl }: { number: number; officialUrl: string }) {
  switch (number) {
    case 1:
      return <AnalyseFigure />;
    case 2:
      return <CopernicusFigure />;
    case 4:
      return <GabrielleFigure />;
    case 6:
      return <GydaFigures />;
    case 7:
      return <DyeFigure />;
    case 8:
      return <TsFigure />;
    case 9:
      return <CtdFigure officialUrl={officialUrl} />;
    case 11:
      return <BathyFigure />;
    case 12:
      return <GjelstrupFigure />;
    case 16:
      return <ChandlerFigure />;
    case 17:
      return <PermafrostFigure />;
    case 19:
      return <NveFigure />;
    case 22:
      return <FoehnFigure />;
    default:
      return null;
  }
}
