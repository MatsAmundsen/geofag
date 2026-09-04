/** Alle reserverte læringsfigurer Gemini Flash skal fylle.
 *  Bruk: <GeminiFigure {...GEMINI.klimaStraling} />
 */
export const GEMINI = {
  vaerkartSynoptisk: {
    id: "vaerkart-synoptisk",
    heading: "Annotert synoptisk værkart",
    caption:
      "Isobarer, L og H, kaldfront, varmfront og okklusjon. Leserekkefølge: L/H, tette isobarer, fronter, flytt 24 t.",
    prompt:
      "Pedagogisk synoptisk værkart over Nord-Atlanteren og Norge. Mørk geofag-stil. Isobarer rundt et L vest for Norge (976 hPa) og et H over Sentral-Europa (1032). Kaldfront, varmfront og okklusjon merket. Vindpiler mot klokka inn mot L. Ingen teksttett infografikk. Liggende format.",
  },
  vaerkart24t: {
    id: "vaerkart-24t",
    heading: "Værutvikling +24 t",
    caption: "Utvikling er adveksjon av hele systemet, ikke at været står stille over bakken.",
    prompt:
      "To-panel pedagogisk figur, mørk geofag-stil. Venstre: L vest for Stad. Høyre: samme L forskjøvet mot Nordland. Vestavinds-pil merket omtrent 1000 km per døgn. Liggende format.",
  },
  polarfrontStadier: {
    id: "lokalt-bjerknes",
    heading: "Polarfrontsyklon i fem stadier",
    caption: "Uforstyrret front → bølge → varm sektor → okklusjon → utfylling.",
    prompt:
      "Fem-panel pedagogisk figur i mørk geofag-stil. 1 Rett polarfront. 2 Bølge med lite L. 3 Utviklet L med varmfront, kaldfront og varm sektor. 4 Okklusjon. 5 Svakt utflytende L. Minimal tekst. Liggende format.",
  },
  klimaStraling: {
    id: "klima-stralingstall",
    heading: "Strålingsbalanse med tall",
    caption:
      "Inn ~340 W/m² i toppen av atmosfæren. Omtrent 30 % albedo. Resten tas opp. Ut går som langbølge. Drivhusgasser bremser ut. Tallene er globale middel, avrundet (IPCC AR6).",
    prompt:
      "Pedagogisk energibudsjett for jorda i mørk geofag-stil. Kortbølge inn ≈ 340 W/m². Albedo ~100 W/m² reflektert. Absorbert ~240. Langbølge ut. Drivhuslag som holder igjen. Ingen foto av jordklode. Tall lesbare. Liggende format.",
  },
  modellerGrid: {
    id: "modeller-grid",
    heading: "Grid",
    caption: "Atmosfære og hav delt i celler. Det som er mindre enn et par celler, løses ikke eksplisitt.",
    prompt:
      "3D-rutenett over Skandinavia og Nordsjøet i mørk geofag-stil. Synlige celler i luft og hav. Én celle fremhevet. Ingen superdatamaskin-klisjé. Liggende format.",
  },
  modellerParam: {
    id: "modeller-parametrisering",
    heading: "Parametrisering",
    caption: "Skyer, konveksjon og turbulens er ofte mindre enn gridet. De beskrives forenklet fra det cellen faktisk løser.",
    prompt:
      "Én stor gridcelle i mørk geofag-stil. Inni: små konveksjonsskyer og turbulens som ikke får egne celler. Pil til en forenklet formel/boks merket parametrisering. Lite tekst. Liggende format.",
  },
  modellerEnsemble: {
    id: "modeller-ensemble",
    heading: "Ensemble",
    caption: "Tett bunt = høy tillit. Sprik etter dag 5–8 = lav tillit. Andelen over en terskel er sannsynligheten.",
    prompt:
      "Ensemble-bånd i mørk geofag-stil. Mange tynne baner som starter samlet og spriker mot høyre (dag 0 til dag 8). Én tykk median. Ingen logo. Liggende format.",
  },
  kryoMassebalanse: {
    id: "kryo-massebalanse",
    heading: "Massebalanse på en bre",
    caption: "Akkumulasjon øverst, ablasjon nederst. Likevektslinjen (ELA) er skillet.",
    prompt:
      "Tverrsnitt av en norsk dalbre i mørk geofag-stil. Øvre del akkumulasjon. Nedre del ablasjon. Stiplet ELA/likevektslinje. Liggende format.",
  },
  kryoFlakskred: {
    id: "kryo-flakskred",
    heading: "Flakskred: flak, svakt lag, utløsning",
    caption: "Et sammenhengende flak glir på et svakt lag. Utløser: nysnø, sol, føn eller en skiløper.",
    prompt:
      "Snøskred-tverrsnitt i mørk geofag-stil. Helning, lagdelt snø, tydelig svakt lag, flak som begynner å gli, liten utløser oppe. Norsk fjell. Liggende format.",
  },
  energiOversikt: {
    id: "energi-kilder",
    heading: "Energi fra hav og luft",
    caption: "Vindrose / sokkel / tidevann. Fire kilder, samme fysikk unntatt tidevann (gravitasjon).",
    prompt:
      "Oversiktsfigur i mørk geofag-stil: vindrose på kysthei, flytende havvind på dyp sokkel, bølgebøye, tidevannsstrøm i norsk sund. Ingen reklame. Liggende format.",
  },
  bergartssyklus: {
    id: "g1-bergartssyklus",
    heading: "Bergartssyklusen som lukket krets",
    caption:
      "Magmatisk, sedimentær, metamorf. Piler i flere retninger. Ingen fast start. Diagenese lukker sediment til bergart.",
    prompt:
      "Lukket bergartssyklus i mørk geofag-stil. Tre felt: magmatisk, sedimentær, metamorf, pluss magma og sediment som stasjoner. Piler begge veier. Norske eksempler som små etiketter (larvikitt, kambrosilur, gneis) uten å tette figuren. Liggende format.",
  },
  relativDatering: {
    id: "g1-relativ-alder",
    heading: "Relativ datering: tre prinsipper",
    caption:
      "Superposisjon: nederst er eldst. Krysskjæring: det som skjærer er yngre. Inklusjon: fragmentet er eldre enn bergarten det sitter i.",
    prompt:
      "Geologisk tverrsnitt i mørk geofag-stil. Lagrekke A–C (nederst eldst). En gang/pluton som skjærer lagene. Et inklusjonsfragment i et yngre lag. Tre små merkelapper: superposisjon, krysskjæring, inklusjon. Liggende format.",
  },
  kornfordeling: {
    id: "g1-kornfordeling",
    heading: "Kornfordeling og jordartsnøkkel",
    caption:
      "Leir, silt, sand, grus. Sortering og kornstørrelse peker på agent: is, elv, vind, hav.",
    prompt:
      "Pedagogisk jordartsnøkkel i mørk geofag-stil. Fire kornklasser ved siden av hverandre med skala (leir < silt < sand < grus). Kort pil til typisk norsk avsetning: morene usortert, elvegrus sortert. Ikke et foto av jordhaug. Liggende format.",
  },
  hydrogramTo: {
    id: "g1-hydrogram-to",
    heading: "To hydrogram: regnflom og snøsmelteflom",
    caption:
      "Venstre: bratt, spiss topp etter intens nedbør. Høyre: bred, sen topp når snøen smelter over uker. Samme kretsløp, to kurver.",
    prompt:
      "To-panel hydrogram i mørk geofag-stil. Venstre: spiss topp timer etter regn. Høyre: bred topp over uker om våren. Samme y-akse vannføring. Minimal tekst. Liggende format.",
  },
  feltbokUtfylt: {
    id: "g1-feltbok-utfylt",
    heading: "Feltbok, utfylt eksempel",
    caption:
      "Punkt-ID, tid, koordinat, vær, måling, usikkerhet, skisse. Tomt skjema lærer lite. Dette er slikt en side bør se ut etter en time i felt.",
    prompt:
      "Håndskrevet feltboks-oppslag i mørk geofag-stil, lesbart. Kolonner: ID, klokke, 61,002 N 8,511 Ø, skyet, kornstørrelse sand/grus, usikkerhet ± 0,5 phi, liten skisse av ra mot ravine. Norsk, ikke engelsk labskjema. Liggende format.",
  },
  feltBanner: {
    id: "g1-felt-banner",
    heading: "Eget banner for feltarbeid",
    caption:
      "Siden bruker i dag samme foto som bergarter. Gemini skal lage et eget feltbilde: elev/lærer med feltbok og GPS ved norsk løsmasse eller bergblotning — ikke stock-smil.",
    prompt:
      "Foto-likt banner, mørk geofag-stil. Norsk felt: person i feltklær med notatbok og hånd-GPS ved en løsmasseskråning eller bergblotning. Overcast, ingen stock-pose. Liggende 16:9.",
  },
  naoRossby: {
    id: "nao-rossby",
    heading: "Rossby-bølger over Nord-Atlanteren",
    caption:
      "Rygger = høytrykk. Daler = lavtrykk. Sterke bølger gir meandrerende jet og åpner for kuldeutbrudd. Svake bølger gir rettere vestavind.",
    prompt:
      "Pedagogisk kart over Nord-Atlanteren i mørk geofag-stil. Polarjet som en bølget elv vest–øst. Tydelig rygg (H) og dal (L). Piler: kald luft sør i dalen, varm luft nord i ryggen. Minimal tekst. Liggende format.",
  },
  naoEnsoTele: {
    id: "nao-enso-tele",
    heading: "Fra ENSO til NAO: Rossby-broen",
    caption:
      "El Niño kan forsterke Rossby-bølger og forstyrre polarvirvelen. La Niña gir oftere mer stabil virvel og større sjanse for positiv NAO.",
    prompt:
      "To-panel pedagogisk figur, mørk geofag-stil. Venstre: El Niño i tropisk Stillehav, bølgete piler mot Nord-Atlanteren, svekket Azor-H. Høyre: La Niña, rettere polarjet inn mot Europa. Lite tekst. Liggende format.",
  },
  naoIndeks: {
    id: "nao-indeks",
    heading: "NAO-indeksen: to stasjoner",
    caption:
      "Indeksen er normalisert lufttrykk i sør (Azorene/Lisboa) minus lufttrykk i nord (Island). Stor positiv differanse = NAO+.",
    prompt:
      "Pedagogisk kart Nord-Atlanteren i mørk geofag-stil. To stasjoner merket: Ponta Delgada/Lisboa i sør og Reykjavík i nord. En trykkakse mellom dem. Høyre: enkel stolpe NAO+ versus NAO−. Liggende format.",
  },
  iodNoytral: {
    id: "iod-noytral",
    heading: "Nøytral IOD",
    caption:
      "I nøytral tilstand er havet gjerne varmest i øst. Vestavind langs ekvator. Regnet over Indonesia, ikke over Øst-Afrika.",
    prompt:
      "Pedagogisk kart over tropisk Indiahav i mørk geofag-stil. Nøytral IOD: varmere øst ved Indonesia, vestavind langs ekvator, konveksjon over Indonesia, tørrere Øst-Afrika. Termoklin svakt hellende. Lite tekst. Liggende format.",
  },
  iodWalkerSkift: {
    id: "iod-walker-skift",
    heading: "Walker-sirkulasjonen flyttes av IOD",
    caption:
      "Positiv IOD skyver cellen vestover. Negativ IOD skyver den østover. Der luften stiger, kommer regnet.",
    prompt:
      "To-panel øst–vest-snitt av tropisk Indiahav i mørk geofag-stil. Venstre: positiv IOD, stigende luft i vest, synkende i øst. Høyre: negativ IOD, speilvendt. Termoklin med. Minimal tekst. Liggende format.",
  },
  iodJetMote: {
    id: "iod-jet-mote",
    heading: "Når subtropisk jet møter polarjeten",
    caption:
      "Under positiv IOD blir den sørlige subtropiske jeten mer bølget og kan møte polarjeten. Der blir det nedbør. På baksiden kan kald, tørr luft trekkes inn over Australia.",
    prompt:
      "Kart over Indiahavet og Australia i mørk geofag-stil. Subtropisk jet og polarjet som to bånd som møtes sør for Australia. Merke nedbør i møtet og kald/tørr luft på baksiden. Liggende format.",
  },
  iodAnomaliVsTemp: {
    id: "iod-anomali-vs-temp",
    heading: "Temperaturkart mot anomalikart",
    caption:
      "Venstre: grader. Tropisk vest er alltid varmt. Høyre: avvik fra normalen. Bare høyre viser dipolen.",
    prompt:
      "To-panel Indiahav i mørk geofag-stil. Venstre: SST i grader, jevnt varm tropisk. Høyre: SST-anomali, varm vest og kald øst (positiv IOD). Tydelig merkelapp på hvert panel. Liggende format.",
  },
} as const;
