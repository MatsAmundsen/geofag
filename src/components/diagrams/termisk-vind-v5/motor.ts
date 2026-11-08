/**
 * Motor for modellen «Termisk vind» (godkjent frittstående v5, SHA256 ccb6e7db…c61c31).
 * Logikken er flyttet uendret fra v5. Eneste endringer: elementer hentes med data-tv innenfor roten,
 * stegknapper, forklaringer og nøkler rendres av React, og lyttere/observatør/animasjonsramme ryddes ved avmontering.
 */
import { STEG, NOKKEL, SW } from "./data";

void NOKKEL;
void SW;

export function monterTermiskVind(root: HTMLElement): { api: any; rydd: () => void } {
  const matchMedia = (q: string) => window.matchMedia(q);
  const NS="http://www.w3.org/2000/svg", G=470, XC=480;

  const $=(id: string): any=>root.querySelector(`[data-tv="${id}"]`);
  const el=(tag: any,a: any,parent: any)=>{const e=document.createElementNS(NS,tag);for(const k in a)e.setAttribute(k,a[k]);if(parent)parent.append(e);return e;};
  const r1=(v: any)=>Math.round(v*10)/10;
  const sm=(t: any)=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
  const RM=matchMedia("(prefers-reduced-motion: reduce)");

  /* Geometri: lagtykkelse k(x) større i varm luft (hydrostatisk), overgang rundt XC */
  const skille=(x: any)=>-Math.tanh((x-XC)/120);       // +1 i sør, -1 i nord
  const k=(x: any,d: any)=>1+0.2*d*skille(x);
  const LAG=80;                                   // skjematisk lagtykkelse
  const flateY=(i: any,x: any,d: any)=>G-LAG*i*k(x,d);
  const tropZ=(x: any,d: any)=>325+55*d*skille(x);
  const XS: number[]=[];for(let x=60;x<=900;x+=20)XS.push(x);
  const linjeD=(f: any)=>XS.map((x: any,i: any)=>(i?"L":"M")+x+" "+r1(f(x))).join(" ");

  /* Elementer lages én gang */
  const flater=[1,2,3].map(()=>el("path",{},$("flater")));
  const vindPunkt=[{z:60},{z:140},{z:220},{z:290},{z:365}];
  const vind=vindPunkt.map(()=>{const g=el("g",{},$("vind"));const o=el("circle",{fill:"#fff",stroke:"#1f2a33","stroke-width":3},g);const p=el("circle",{fill:"#1f2a33"},g);return {g,o,p};});
  const etik=$("etiketter"), merk=$("merker");
  const LAB: Record<string, any>={};
  function lab(id: any,txt: any,fill: any,anchor?: any){const g=el("g",{},etik);const l=el("line",{stroke:fill,"stroke-width":1.4},g);const t=el("text",{fill,"text-anchor":anchor||"start"},g);t.textContent=txt;LAB[id]={g,l,t};}
  lab("varm","Varmere luft","#8a3214","middle");
  lab("kald","Kaldere luft","#15547d","middle");
  lab("flate","Trykkflate","#1f2a33","start");
  lab("trop","Tropopause","#3d4a54","end");
  lab("bakke","Samme trykk ved bakken","#4a5a66","middle");
  lab("hoy","Høyere trykk","#8a3214","start");
  lab("lav","Lavere trykk","#15547d","end");
  lab("jet","Jetkjerne","#1f2a33","end");
  lab("over","Svakere over maksimumet","#3d4a54","start");
  lab("f4","Forenklet over tropopausen","#3d4a54","end");
  const MERK: Record<string, any>={};
  function badge(id: any,n: any){const g=el("g",{},merk);el("circle",{r:28,fill:"#1f2a33"},g);const t=el("text",{"text-anchor":"middle",y:14,fill:"#fff","font-size":40,"font-weight":700},g);t.textContent=n;MERK[id]=g;}
  ["A","B","C","D","E"].forEach((n: any,i: any)=>badge("b"+i,n));

  const FS=18;
  function boks(t: any,x: any,y: any,anchor: any){const w=t.length*FS*0.62;const x0=anchor==="end"?x-w:anchor==="middle"?x-w/2:x;return {x0,x1:x0+w,y0:y-FS*0.95,y1:y+FS*0.3};}
  function settLab(id: any,vis: any,x: any,y: any,ax?: any,ay?: any){const L=LAB[id];L.g.setAttribute("opacity",r1(vis));if(vis<=0)return;
   L.t.setAttribute("x",r1(x));L.t.setAttribute("y",r1(y));
   if(ax==null){L.l.setAttribute("opacity",0);return;}
   const B=boks(L.t.textContent,x,y,L.t.getAttribute("text-anchor"));const GAP=15;
   const sx=Math.max(B.x0-GAP,Math.min(ax,B.x1+GAP)),sy=Math.max(B.y0-GAP,Math.min(ay,B.y1+GAP));
   L.l.setAttribute("opacity",1);L.l.setAttribute("x1",r1(sx));L.l.setAttribute("y1",r1(sy));L.l.setAttribute("x2",r1(ax));L.l.setAttribute("y2",r1(ay));}
  function settBadge(i: any,vis: any,x: any,y: any){MERK["b"+i].setAttribute("opacity",r1(vis));MERK["b"+i].setAttribute("transform",`translate(${r1(x)} ${r1(y)})`);}

  function tegn(s: any){
   const d=s.d;
   $("temp").setAttribute("opacity",r1(d));
   const trop=(x: any)=>G-tropZ(x,d);
   $("trop").setAttribute("d",linjeD(trop));
   $("tropoClip").setAttribute("d",linjeD(trop)+" L900 470 L60 470Z");
   $("stratoClip").setAttribute("d",linjeD(trop)+" L900 20 L60 20Z");
   $("stratoTemp").setAttribute("opacity",r1(d*0.8));
   $("flate4").setAttribute("d",linjeD((x: any)=>G-(410+25*d*skille(x))));
   flater.forEach((p: any,i: any)=>p.setAttribute("d",linjeD((x: any)=>flateY(i+1,x,d))));
   // samme høyde: z = 2*LAG (der flate 2 er ved lik temperatur)
   const yH=G-2*LAG;
   $("hLinje").setAttribute("y1",yH);$("hLinje").setAttribute("y2",yH);
   $("hoyde").setAttribute("opacity",r1(s.h));
   $("krefter").setAttribute("opacity",r1(s.f));
   $("pgf").setAttribute("x1",XC+24);$("pgf").setAttribute("y1",yH);$("pgf").setAttribute("x2",XC+130);$("pgf").setAttribute("y2",yH);
   $("cor").setAttribute("x1",XC-24);$("cor").setAttribute("y1",yH);$("cor").setAttribute("x2",XC-130);$("cor").setAttribute("y2",yH);
   $("cor").setAttribute("opacity",r1(s.c));
   // vindsymboler: ett i kraftbalansen (steg 4), profil i steg 5
   vindPunkt.forEach((v: any,i: any)=>{
     const z=v.z, y=G-z;
     let st;
     if(i<4) st=z/290;                 // øker opp mot jetkjernen
     else st=0.55;                     // svakere over tropopausen
     const r=10+22*st;
     let vis=s.j;
     if(i===2) vis=Math.max(s.j,s.c); // punktet på samme høyde, brukt i steg 4
     const r160=10+22*160/290;
     const yy=i===2?yH+(y-yH)*s.j:y;
     const rr=i===2?r160+(r-r160)*s.j:r;
     vind[i].g.setAttribute("transform",`translate(${XC} ${r1(yy)})`);
     vind[i].g.setAttribute("opacity",r1(vis));
     vind[i].o.setAttribute("r",r1(rr));
     vind[i].p.setAttribute("r",r1(rr*0.3));
   });
   // etiketter (desktop)
   settLab("varm",1,200,G-30);
   settLab("kald",1,760,G-30);
   settLab("flate",1,90,flateY(3,90,d)+52,150,flateY(3,150,d));
   settLab("trop",1,880,trop(880)+34);
   settLab("bakke",1-Math.max(s.h,s.j),XC,G-33);
   const yH2=yH;
    settLab("hoy",s.h,90,yH2+6);
   settLab("lav",s.h,880,yH2+6);
      settLab("jet",s.j,XC-52,G-308);
   settLab("over",s.j,XC+44,G-349);
   settLab("f4",d,880,G-310);
   // A–E (mobil)
   settBadge(0,1,200,G-120);            // A varm
   settBadge(1,1,760,G-120);            // B kald
   settBadge(2,s.h,XC+190,yH-48);       // C trykkraft
   settBadge(3,s.c,XC-190,yH-48);       // D coriolis
   settBadge(4,s.j,XC+110,G-300);       // E jetkjerne
   // stratosfæren mellom: ikke merk
  }


  /* Tilstand */
  const varighet=1400;
  let steg=0, fra=STEG[0].m, til=STEG[0].m, spiller=false, raf=0, synlig=true;
  /* Logisk klokke: tid går bare mens rammer kjøres. Pause og skjult figur fryser både bevegelse og ventetid. */
  let tid=1400, hold=0, auto=false, sist=0;
  const HOLD=4200;
  function mix(a: any,b: any,t: any): any{const o: any={};for(const key in a)o[key]=a[key]+(b[key]-a[key])*t;return o;}
  let naa={...STEG[0].m};
  function andel(){return RM.matches?1:sm(tid/varighet);}
  function tick(now: any){
   raf=0;
   const dt=sist?Math.min(100,Math.max(0,now-sist)):0; sist=now;
   const aktiv=spiller||!auto;          // manuell overgang fullføres, automatisk overgang fryses ved pause
   if(!aktiv)return;
   tid+=dt;
   const t=andel();
   naa=mix(fra,til,t);
   tegn(naa);
   if(t<1){kjorVidere();return;}
   if(!spiller)return;
   hold+=dt;
   if(hold>=HOLD){ if(steg<STEG.length-1){gaaTil(steg+1,true);} else {stopp();} return; }
   kjorVidere();
  }
  function kjorVidere(){if(synlig&&!raf)raf=requestAnimationFrame(tick);}
  function kjor(){if(!raf&&synlig){sist=0;raf=requestAnimationFrame(tick);}}
  function avbryt(){if(raf){cancelAnimationFrame(raf);raf=0;}}
  function gaaTil(i: any,a: any){
   i=Math.max(0,Math.min(STEG.length-1,i));
   const ny=i!==steg; fra={...naa}; til=STEG[i].m; tid=0; hold=0; auto=a; steg=i;
   if(!a&&spiller)stopp();
   oppdaterTekst(ny);
   if(RM.matches){naa={...til};tegn(naa);}
   kjor();
  }
  const forkl=[...$("forklaring").children];
  const nokler=[...$("nokkelstabel").children];
  function oppdaterTekst(annonser: any){
   const S=STEG[steg];
   forkl.forEach((e: any,i: any)=>e.classList.toggle("aktiv",i===steg));
   nokler.forEach((e: any,i: any)=>e.classList.toggle("aktiv",i===steg));
   $("svgD").textContent=`Steg ${steg+1}: ${S.t}. ${S.x}`;
   if(annonser)$("live").textContent=`Steg ${steg+1} av ${STEG.length}: ${S.t}.`;
   stegKnapper.forEach((b: any,i: any)=>{if(i===steg)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");});
   if(!spiller)$("spill").textContent=steg===STEG.length-1?"Spill av på nytt":"Spill av";
   $("forrige").disabled=steg===0;$("neste").disabled=steg===STEG.length-1;
  }
  function start(){
   spiller=true; $("spill").textContent="Pause";
   if(steg===STEG.length-1&&andel()>=1){gaaTil(0,true);return;}
   kjor();
  }
  function stopp(){spiller=false; if(auto)avbryt(); $("spill").textContent=steg===STEG.length-1?"Spill av på nytt":"Spill av";}
  const stegKnapper=[...$("stegliste").querySelectorAll("button")];
  const lyttere: (() => void)[]=[];
  const lytt=(e: any,t: any,f: any)=>{e.addEventListener(t,f);lyttere.push(()=>e.removeEventListener(t,f));};
  stegKnapper.forEach((b: any,i: any)=>lytt(b,"click",()=>gaaTil(i,false)));
  lytt($("spill"),"click",()=>spiller?stopp():start());
  lytt($("forrige"),"click",()=>gaaTil(steg-1,false));
  lytt($("neste"),"click",()=>gaaTil(steg+1,false));
  lytt($("nullstill"),"click",()=>{stopp();avbryt();naa={...STEG[0].m};fra=naa;til=naa;steg=0;tid=varighet;hold=0;auto=false;oppdaterTekst(true);tegn(naa);});
  const io=typeof IntersectionObserver==="function"?new IntersectionObserver((e: any)=>{synlig=e[0].isIntersecting;if(synlig)kjor();else avbryt();}):null;
  if(io)io.observe($("svg"));
  lytt(document,"visibilitychange",()=>{if(document.hidden&&spiller)stopp();});
  oppdaterTekst(false);tegn(naa);
  const api={get steg(){return steg;},get spiller(){return spiller;},get naa(){return naa;},tegn:(s: any)=>{naa=s;tegn(s);}};
  return {api,rydd(){spiller=false;avbryt();if(io)io.disconnect();lyttere.forEach((f: any)=>f());}};

}
