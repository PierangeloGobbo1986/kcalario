import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Plus, Search, X, Check, Trash2, Pencil, RefreshCw, Upload, Download,
  BookOpen, Apple, Settings as SettingsIcon,
} from "lucide-react";

const C = {
  paper:"#F4F1E9",ink:"#20261F",sub:"#6F756A",basil:"#2F6B49",basilSolidD:"#214F37",
  saffron:"#E0A32B",brick:"#B34A2C",card:"#FFFFFF",line:"#E6E1D5",chip:"#EAE4D6",soft:"#F0ECE1",
};
const FONT='-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
const num={fontVariantNumeric:"tabular-nums"};

function ScaleIcon({size=34}){
  const feet="#F4F1E9";
  return(
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <rect x="2" y="2" width="36" height="36" rx="9" fill={C.basilSolidD}/>
      <path d="M13 12 A7 7 0 0 1 27 12 Z" fill={feet}/>
      <line x1="20" y1="12" x2="23" y2="7.6" stroke={C.saffron} strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="20" cy="12" r="1.4" fill={C.basilSolidD}/>
      <g fill={feet}>
        <ellipse cx="14" cy="23" rx="2.8" ry="4.2"/><ellipse cx="14.4" cy="29" rx="1.8" ry="2.2"/>
        <circle cx="11.7" cy="18.2" r="0.85"/><circle cx="13.4" cy="17.3" r="0.95"/><circle cx="15.2" cy="17.5" r="0.85"/><circle cx="16.6" cy="18.4" r="0.75"/>
      </g>
      <g fill={feet}>
        <ellipse cx="26" cy="23" rx="2.8" ry="4.2"/><ellipse cx="25.6" cy="29" rx="1.8" ry="2.2"/>
        <circle cx="28.3" cy="18.2" r="0.85"/><circle cx="26.6" cy="17.3" r="0.95"/><circle cx="24.8" cy="17.5" r="0.85"/><circle cx="23.4" cy="18.4" r="0.75"/>
      </g>
    </svg>);
}

const RAW_FOODS=[
  ["Banana","g",65,"CREA-INRAN",""],["Birra bionda chiara","mL",34,"CREA-INRAN",""],["Caffe espresso","mL",2,"CREA-INRAN",""],
  ["Caprese","pezzo",430,"Stima porzione","~125 g mozzarella + olio"],["Feta","g",260,"CREA-INRAN",""],
  ["Filetto al bbq con patatine","pezzo",850,"Stima porzione","~200 g filetto + fritte"],["Grana Padano","g",384,"CREA-INRAN",""],
  ["Hamburger con patatine (pub)","pezzo",1550,"Stima porzione","singolo, bacon+gorgonzola+cipolla+maio, fritte+salse"],
  ["Insalatona (insalata, pomodoro, tonno, avocado)","pezzo",1050,"Stima porzione","~500 kcal solo dai 5 cucchiai d'olio"],
  ["Latte intero","mL",64,"CREA-INRAN",""],["Latte parz. scremato","mL",46,"CREA-INRAN",""],["Lattuga","g",19,"CREA-INRAN",""],
  ["Magnum Mini cioccolato bianco mandorle","pezzo",150,"Confezione","etichetta e pesata"],["Maionese","g",656,"CREA-INRAN",""],
  ["Mela","g",45,"CREA-INRAN",""],["Olio di oliva","g",899,"CREA-INRAN",""],["Orsetto gommoso","g",351,"Confezione","etichetta e pesata"],
  ["Pancarre rustico","g",288,"Confezione","111 kcal / 38,5 g"],["Pane comune","g",271,"CREA-INRAN",""],["Pane integrale","g",224,"CREA-INRAN",""],
  ["Parmigiano Reggiano","g",387,"CREA-INRAN",""],["Pasta al ragu","g",160,"Stima porzione","cotta"],["Pasta secca","g",353,"CREA-INRAN",""],
  ["Peperoni","g",22,"CREA-INRAN",""],["Petto di pollo","g",100,"CREA-INRAN",""],["Piadina","g",300,"CREA-INRAN",""],
  ["Pizza Estate","pezzo",1000,"Stima porzione","pizza intera"],["Pizza Norma con salamino","pezzo",1200,"Stima porzione","pizza intera"],
  ["Pizza Vienne con patatine","pezzo",1300,"Stima porzione","pizza intera"],["Pomodori","g",17,"CREA-INRAN",""],
  ["Prosciutto crudo","g",224,"CREA-INRAN",""],["Riso","g",332,"CREA-INRAN",""],["Salsa BBQ","g",150,"Confezione",""],
  ["Tacchino petto arrosto","g",105,"CREA-INRAN",""],["Tonno al naturale (sgocc.)","g",103,"CREA-INRAN",""],
  ["Tonno sott'olio (sgocc.)","g",190,"Confezione","tipo Rio Mare"],["TUC","pezzo",144,"Confezione",""],
  ["Uovo intero","pezzo",78,"CREA-INRAN",""],["Yogurt bianco intero","g",66,"CREA-INRAN",""],["Zucchero","g",392,"CREA-INRAN",""],["Zucchine","g",11,"CREA-INRAN",""],
];
const SEED_FOODS=RAW_FOODS.map((r,i)=>({id:"f"+(i+1),nome:r[0],unit:r[1],kcal:r[2],fonte:r[3],note:r[4]}));
const MEAL_ORDER=["Colazione","Spuntino","Pranzo","Aperitivo","Cena","Dopo cena"];

const TODAY="2026-08-29";
const WD=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"];
function parseD(s){const[y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d);}
function fmtD(s){const d=parseD(s);return `${WD[d.getDay()]} ${d.getDate()}`;}
function fmtLong(s){const d=parseD(s);const M=["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"];return `${WD[d.getDay()]} ${d.getDate()} ${M[d.getMonth()]}`;}
function shift(s,n){const d=parseD(s);d.setDate(d.getDate()+n);return d.toISOString().slice(0,10);}
function rangeDays(end,count){const out=[];for(let i=count-1;i>=0;i--)out.push(shift(end,-i));return out;}

function mulberry32(a){return function(){a|=0;a=(a+0x6d2b79f5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
function buildSeedDiary(foods){
  const byName=Object.fromEntries(foods.map(f=>[f.nome,f]));const rnd=mulberry32(42);const pick=a=>a[Math.floor(rnd()*a.length)];
  const days=rangeDays(TODAY,14);
  const bk=[[["Latte parz. scremato",250,"Colazione"],["Caffe espresso",30,"Colazione"],["Zucchero",5,"Colazione"]],[["Latte parz. scremato",250,"Colazione"],["Pancarre rustico",77,"Colazione"],["Zucchero",5,"Colazione"]],[["Yogurt bianco intero",150,"Colazione"],["Banana",120,"Colazione"],["Caffe espresso",30,"Colazione"]]];
  const lunch=[[["Pasta al ragu",250,"Pranzo"],["Pane comune",50,"Pranzo"]],[["Piadina",120,"Pranzo"],["Tacchino petto arrosto",50,"Pranzo"],["Grana Padano",30,"Pranzo"],["Maionese",15,"Pranzo"]],[["Insalatona (insalata, pomodoro, tonno, avocado)",1,"Pranzo"]],[["Riso",90,"Pranzo"],["Petto di pollo",150,"Pranzo"],["Zucchine",200,"Pranzo"]]];
  const aper=[null,null,[["Birra bionda chiara",330,"Aperitivo"],["TUC",3,"Aperitivo"]]];
  const dinner=[[["Pane integrale",100,"Cena"],["Feta",30,"Cena"],["Pomodori",150,"Cena"],["Peperoni",200,"Cena"]],[["Pizza Estate",1,"Cena"]],[["Caprese",1,"Cena"],["Pancarre rustico",77,"Cena"]],[["Petto di pollo",150,"Cena"],["Zucchine",200,"Cena"],["Olio di oliva",8,"Cena"]],[["Filetto al bbq con patatine",1,"Cena"]]];
  const post=[null,[["Magnum Mini cioccolato bianco mandorle",1,"Dopo cena"]],[["Orsetto gommoso",17,"Dopo cena"]]];
  const entries=[];let idc=1;
  days.forEach(date=>{const isToday=date===TODAY;const add=grp=>grp&&grp.forEach(([n,q,meal])=>{const f=byName[n];if(f)entries.push({id:"e"+idc++,date,meal,foodId:f.id,qty:q});});add(pick(bk));add(pick(lunch));if(!isToday){add(pick(aper));add(pick(dinner));add(pick(post));}});
  return entries;
}
function kcalOf(food,qty){if(!food)return 0;return food.unit==="pezzo"?food.kcal*qty:(food.kcal*qty)/100;}
const roundK=x=>Math.round(x);

function Toast({msg}){if(!msg)return null;return(<div className="absolute left-1/2 z-50" style={{bottom:96,transform:"translateX(-50%)"}}><div className="px-4 py-2 rounded-full text-sm shadow-lg" style={{background:C.ink,color:"#fff"}}>{msg}</div></div>);}
function Fab({onClick}){return(<button onClick={onClick} aria-label="Aggiungi" className="absolute z-30 flex items-center justify-center rounded-full shadow-xl active:scale-95 transition" style={{right:18,bottom:80,width:60,height:60,background:C.basil,color:"#fff"}}><Plus size={30} strokeWidth={2.6}/></button>);}
const inputCls="w-full px-3 py-2 rounded-xl text-[15px] outline-none";
const inputStyle={background:C.card,border:`1px solid ${C.line}`,color:C.ink};
function Btn({children,onClick,kind="primary",small,style,...rest}){
  const base="rounded-xl font-semibold active:scale-[.98] transition inline-flex items-center justify-center gap-1";
  const sz=small?"px-3 py-1.5 text-sm":"px-4 py-2.5 text-[15px]";
  const st=kind==="primary"?{background:C.basil,color:"#fff"}:kind==="ghost"?{background:"transparent",color:C.sub}:kind==="danger"?{background:C.brick,color:"#fff"}:{background:C.chip,color:C.ink};
  return <button onClick={onClick} className={`${base} ${sz}`} style={{...st,...style}} {...rest}>{children}</button>;
}
function Field({label,children,flex}){return(<div style={flex?{flex:1}:undefined}><label className="text-xs font-semibold" style={{color:C.sub}}>{label}</label><div className="mt-1">{children}</div></div>);}

function Confirm({open,message,onYes,onNo}){
  if(!open)return null;
  return(
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6" style={{background:"rgba(20,24,20,.42)"}} onClick={onNo}>
      <div onClick={e=>e.stopPropagation()} className="w-full rounded-2xl p-4" style={{maxWidth:320,background:C.paper,boxShadow:"0 10px 40px rgba(0,0,0,.3)"}}>
        <div className="text-[15px] font-bold mb-1" style={{color:C.ink}}>Confermi l'eliminazione?</div>
        <div className="text-sm mb-4" style={{color:C.sub}}>{message}</div>
        <div className="flex gap-2 justify-end">
          <Btn kind="soft" small onClick={onNo}>Annulla</Btn>
          <Btn kind="danger" small onClick={onYes}><Trash2 size={15}/>Elimina</Btn>
        </div>
      </div>
    </div>);
}

function KcalHistogram({days,target,selected,onSelect}){
  const scRef=useRef(null);const SLOT=46,PLOT=150,LBL=22,GUT=42;
  const [localMax,setLocalMax]=useState(Math.max(target*1.2,2000));
  const recompute=useCallback(()=>{const el=scRef.current;if(!el)return;const start=Math.floor(el.scrollLeft/SLOT);const end=Math.ceil((el.scrollLeft+el.clientWidth)/SLOT);const vis=days.slice(Math.max(0,start),end);const mx=Math.max(target,...vis.map(d=>d.total),1);setLocalMax(Math.ceil((mx*1.15)/100)*100);},[days,target]);
  useEffect(()=>{const el=scRef.current;if(!el)return;el.scrollLeft=el.scrollWidth;recompute();/*eslint-disable-next-line*/},[days.length]);
  const targetY=(target/localMax)*PLOT;
  const tick=(v,top,color,bold)=>(<div className="absolute right-1 text-[10px]" style={{top,color,fontWeight:bold?700:400,...num}}>{v}</div>);
  return(
    <div>
      <div className="flex items-baseline justify-between mb-1 px-1"><span className="text-xs font-semibold" style={{color:C.sub,letterSpacing:".06em"}}>KCAL / GIORNO</span><span className="text-[11px]" style={{color:C.sub}}>tocca un giorno</span></div>
      <div className="relative" style={{height:PLOT+LBL}}>
        <div className="absolute top-0 left-0" style={{width:GUT,height:PLOT}}>{tick(localMax,-2,C.sub)}{tick(Math.round(localMax/2),PLOT/2-6,C.sub)}{tick(0,PLOT-10,C.sub)}{tick(target,PLOT-targetY-6,C.saffron,true)}</div>
        <div className="absolute" style={{left:GUT,right:0,bottom:LBL+targetY,height:0,borderTop:`2px dashed ${C.saffron}`,zIndex:5,pointerEvents:"none"}}/>
        <div ref={scRef} onScroll={recompute} className="absolute top-0 overflow-x-auto" style={{left:GUT,right:0,height:PLOT+LBL,scrollbarWidth:"none"}}>
          <div className="flex items-end" style={{height:PLOT+LBL}}>
            {days.map(d=>{const sel=d.date===selected;const h=Math.max(2,(Math.min(d.total,localMax)/localMax)*PLOT);const over=d.total>target;const baseH=over?(target/localMax)*PLOT:h;const overH=over?Math.min(h-baseH,PLOT-baseH):0;
              return(<button key={d.date} onClick={()=>onSelect(d.date)} className="flex flex-col items-center justify-end shrink-0" style={{width:SLOT,height:PLOT+LBL}}>
                <div className="relative flex flex-col justify-end" style={{width:34,height:PLOT,borderRadius:7,background:sel?"rgba(47,107,73,0.14)":"transparent",outline:sel?`2px solid ${C.basilSolidD}`:"none"}}>
                  <div className="mx-auto flex flex-col justify-end" style={{width:24,height:PLOT}}>
                    {overH>0&&<div style={{height:overH,background:C.brick,borderTopLeftRadius:5,borderTopRightRadius:5,opacity:sel?1:.9}}/>}
                    <div style={{height:baseH,background:sel?C.basilSolidD:C.basil,borderTopLeftRadius:overH>0?0:5,borderTopRightRadius:overH>0?0:5,opacity:sel?1:.82}}/>
                  </div>
                </div>
                <span className="mt-1 text-[10px] leading-tight text-center" style={{color:sel?C.ink:C.sub,fontWeight:sel?700:500,...num}}>{fmtD(d.date)}</span>
              </button>);})}
          </div>
        </div>
      </div>
    </div>);
}

function WeightChart({days,est,weights}){
  const GUT=42,PLOT=96;const realPts=days.map((d,i)=>weights[d.date]!=null?{i,w:weights[d.date]}:null).filter(Boolean);
  const allW=[...est.map(e=>e.w),...realPts.map(p=>p.w)];
  if(allW.length===0)return <div className="text-sm px-1" style={{color:C.sub}}>Nessun dato di peso.</div>;
  let mn=Math.min(...allW),mx=Math.max(...allW);const pad=Math.max(0.3,(mx-mn)*0.25);mn-=pad;mx+=pad;const span=Math.max(0.6,mx-mn);
  const n=days.length;const PW=n*46;const x=i=>(n<=1?PW/2:(i*(PW-24)/(n-1))+12);const y=w=>((1-(w-mn)/span)*(PLOT-8))+4;
  const estPath=est.map((e,i)=>`${i?"L":"M"}${x(i).toFixed(1)},${y(e.w).toFixed(1)}`).join(" ");
  const realPath=realPts.map((p,i)=>`${i?"L":"M"}${x(p.i).toFixed(1)},${y(p.w).toFixed(1)}`).join(" ");
  const last=realPts[realPts.length-1];
  const tick=(v,top)=>(<div className="absolute right-1 text-[10px]" style={{top,color:C.sub,...num}}>{v.toFixed(1)}</div>);
  return(
    <div>
      <div className="flex items-center justify-between mb-1 px-1"><span className="text-xs font-semibold" style={{color:C.sub,letterSpacing:".06em"}}>PESO (kg)</span>
        <span className="flex items-center gap-3 text-[10px]" style={{color:C.sub}}>
          <span className="flex items-center gap-1"><span style={{width:14,borderTop:`3px solid ${C.basil}`,opacity:.3,display:"inline-block"}}/>stima da kcal</span>
          <span className="flex items-center gap-1"><span style={{width:14,borderTop:`2px solid ${C.basil}`,display:"inline-block"}}/>reale</span>
        </span>
      </div>
      <div className="relative" style={{height:PLOT}}>
        <div className="absolute top-0 left-0" style={{width:GUT,height:PLOT}}>{tick(mx,-2)}{tick((mn+mx)/2,PLOT/2-6)}{tick(mn,PLOT-12)}</div>
        <div className="absolute top-0 overflow-x-auto" style={{left:GUT,right:0,height:PLOT,scrollbarWidth:"none"}}>
          <svg width={PW} height={PLOT} style={{display:"block"}}>
            <path d={estPath} fill="none" stroke={C.basil} strokeOpacity="0.3" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round"/>
            <path d={realPath} fill="none" stroke={C.basil} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
            {realPts.map((p,i)=>(<circle key={i} cx={x(p.i)} cy={y(p.w)} r={i===realPts.length-1?4:3} fill={i===realPts.length-1?C.basilSolidD:C.card} stroke={C.basil} strokeWidth="2"/>))}
            {last&&<text x={x(last.i)} y={y(last.w)-8} textAnchor="end" fontSize="11" fontWeight="700" fill={C.ink} style={num}>{last.w.toFixed(1)}</text>}
          </svg>
        </div>
      </div>
    </div>);
}

function Sheet({open,onClose,children,title}){
  if(!open)return null;
  return(<div className="absolute inset-0 z-40 flex items-end" style={{background:"rgba(20,24,20,.34)"}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} className="w-full rounded-t-3xl p-4 pb-6" style={{background:C.paper,maxHeight:"88%",overflowY:"auto",boxShadow:"0 -8px 30px rgba(0,0,0,.2)"}}>
      <div className="flex items-center justify-between mb-3"><h3 className="text-base font-bold" style={{color:C.ink}}>{title}</h3><button onClick={onClose} className="p-1 rounded-full" style={{color:C.sub}}><X size={22}/></button></div>
      {children}
    </div></div>);
}

export default function App(){
  const [foods,setFoods]=useState(SEED_FOODS);
  const [entries,setEntries]=useState(()=>buildSeedDiary(SEED_FOODS));
  const [weights,setWeights]=useState({[shift(TODAY,-13)]:73.0,[shift(TODAY,-10)]:72.9,[shift(TODAY,-7)]:72.7,[shift(TODAY,-4)]:72.6,[shift(TODAY,-1)]:72.4});
  const [settings,setSettings]=useState({altezza:174,peso:73,eta:40,sesso:"M",fattore:1.2,deficit:400,mealHours:{colazione:[5,11],pranzo:[11,15],aperitivo:[15,19]}});
  const [headerImg,setHeaderImg]=useState(null);
  const [page,setPage]=useState("diario");
  const [selDate,setSelDate]=useState(TODAY);
  const [toast,setToast]=useState("");const flash=m=>{setToast(m);setTimeout(()=>setToast(""),1800);};
  const [confirm,setConfirm]=useState(null);const askDelete=(message,onYes)=>setConfirm({message,onYes});
  const [lastFood,setLastFood]=useState({id:null,n:0});
  const listRef=useRef(null);

  const foodById=useMemo(()=>Object.fromEntries(foods.map(f=>[f.id,f])),[foods]);
  const bmr=useMemo(()=>{const{peso,altezza,eta,sesso}=settings;return 10*peso+6.25*altezza-5*eta+(sesso==="M"?5:-161);},[settings]);
  const tdee=bmr*settings.fattore;const target=Math.round(tdee-settings.deficit);
  const days=useMemo(()=>rangeDays(TODAY,14).map(date=>{const tot=entries.filter(e=>e.date===date).reduce((s,e)=>s+kcalOf(foodById[e.foodId],e.qty),0);return{date,total:roundK(tot)};}),[entries,foodById]);
  const est=useMemo(()=>{const anchorDate=days[0]?.date;const anchor=weights[anchorDate]??settings.peso;let run=0;const out=[];days.forEach(d=>{if(d.total>0)run+=(d.total-tdee);out.push({date:d.date,w:anchor+run/7700});});return out;},[days,weights,tdee,settings.peso]);
  const dayTotal=days.find(d=>d.date===selDate)?.total??0;
  const mealForNow=useCallback(()=>{const h=new Date().getHours();const{colazione,pranzo,aperitivo}=settings.mealHours;if(h>=colazione[0]&&h<colazione[1])return"Colazione";if(h>=pranzo[0]&&h<pranzo[1])return"Pranzo";if(h>=aperitivo[0]&&h<aperitivo[1])return"Aperitivo";return"Cena";},[settings]);

  // diario opens on the day's food list
  useEffect(()=>{if(page==="diario"&&listRef.current){listRef.current.scrollIntoView({block:"start"});}},[page]);

  const [picker,setPicker]=useState(false);
  const [entryEd,setEntryEd]=useState(null);
  const [foodEd,setFoodEd]=useState(null);
  const [selectMode,setSelectMode]=useState(false);
  const [checked,setChecked]=useState({});
  const [pesoInput,setPesoInput]=useState("");

  const recents=useMemo(()=>{const seen=[],out=[];[...entries].reverse().forEach(e=>{if(!seen.includes(e.foodId)){seen.push(e.foodId);if(foodById[e.foodId])out.push(foodById[e.foodId]);}});return out.slice(0,6);},[entries,foodById]);

  function openAdd(food){setPicker(false);setEntryEd({mode:"new",foodId:food.id,qty:food.unit==="pezzo"?1:100,meal:mealForNow()});}
  function saveEntry(){const q=parseFloat(String(entryEd.qty).replace(",","."));if(!q||q<=0){flash("Quantità non valida");return;}
    if(entryEd.mode==="new"){setEntries(a=>[...a,{id:"e"+Date.now(),date:selDate,meal:entryEd.meal,foodId:entryEd.foodId,qty:q}]);flash("Aggiunto al diario");}
    else{setEntries(a=>a.map(e=>e.id===entryEd.id?{...e,qty:q,meal:entryEd.meal}:e));flash("Modifiche salvate");}setEntryEd(null);}
  function reqDelEntry(id,nome){askDelete(`Eliminare "${nome}" dal diario?`,()=>{setEntries(a=>a.filter(e=>e.id!==id));setEntryEd(null);flash("Eliminato");});}
  function reqDelChecked(){const ids=Object.keys(checked).filter(k=>checked[k]);if(!ids.length)return;askDelete(`Eliminare ${ids.length} voci dal diario?`,()=>{setEntries(a=>a.filter(e=>!ids.includes(e.id)));setChecked({});setSelectMode(false);flash(`${ids.length} voci eliminate`);});}

  function saveFood(){const f=foodEd;if(!f.nome.trim()){flash("Serve un nome");return;}const k=parseFloat(String(f.kcal).replace(",","."));if(isNaN(k)){flash("Serve un valore kcal");return;}
    let id=f.id;if(id)setFoods(a=>a.map(x=>x.id===id?{...f,kcal:k}:x));else{id="f"+Date.now();setFoods(a=>[...a,{...f,id,kcal:k}]);}
    setFoodEd(null);setLastFood({id,n:Date.now()});flash("Alimento salvato");}
  function reqDelFood(id,nome){askDelete(`Eliminare "${nome}" dagli alimenti?`,()=>{setFoods(a=>a.filter(x=>x.id!==id));setFoodEd(null);flash("Alimento eliminato");});}
  function reqDelFoods(ids,done){if(!ids.length)return;askDelete(`Eliminare ${ids.length} alimenti?`,()=>{setFoods(a=>a.filter(x=>!ids.includes(x.id)));done&&done();flash(`${ids.length} alimenti eliminati`);});}

  function exportXlsx(){const XLSX=window.XLSX;if(!XLSX){flash("Export non ancora pronto, riprova");return;}
    const wb=XLSX.utils.book_new();
    const dia=[["Data","Pasto","Alimento","Quantita","kcal"]];[...entries].sort((a,b)=>a.date.localeCompare(b.date)).forEach(e=>{const f=foodById[e.foodId];dia.push([e.date,e.meal,f?f.nome:"?",e.qty,roundK(kcalOf(f,e.qty))]);});XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(dia),"Diario");
    const ali=[["Alimento","Unita","kcal","Fonte","Note"]];[...foods].sort((a,b)=>a.nome.localeCompare(b.nome)).forEach(f=>ali.push([f.nome,f.unit,f.kcal,f.fonte,f.note]));XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(ali),"Alimenti");
    const imp=[["Campo","Valore"],["Altezza (cm)",settings.altezza],["Peso (kg)",settings.peso],["Eta",settings.eta],["Sesso",settings.sesso],["Fattore attivita",settings.fattore],["Deficit",settings.deficit],["BMR",roundK(bmr)],["TDEE",roundK(tdee)],["Obiettivo kcal",target]];XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(imp),"Impostazioni");
    const pes=[["Data","Peso (kg)"]];Object.entries(weights).sort((a,b)=>a[0].localeCompare(b[0])).forEach(([d,w])=>pes.push([d,w]));XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(pes),"Peso");
    XLSX.writeFile(wb,"kcalario.xlsx");flash("Esportato kcalario.xlsx");}
  useEffect(()=>{if(window.XLSX)return;const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";document.body.appendChild(s);},[]);

  const dayEntries=entries.filter(e=>e.date===selDate);
  const grouped=MEAL_ORDER.map(m=>({meal:m,items:dayEntries.filter(e=>e.meal===m)})).filter(g=>g.items.length);
  const cardSh={background:C.card,boxShadow:"0 1px 3px rgba(0,0,0,.06)"};

  return(
    <div className="w-full flex justify-center" style={{background:"#DED8CA",minHeight:780,fontFamily:FONT}}>
      <div className="relative w-full flex flex-col" style={{maxWidth:430,height:800,background:C.paper,overflow:"hidden"}}>
        <div className="flex-none px-4 pt-4 pb-3" style={{background:headerImg?`linear-gradient(rgba(20,24,20,.35),rgba(20,24,20,.5)),url(${headerImg}) center/cover`:C.basilSolidD,color:"#fff"}}>
          <div className="flex items-center gap-2"><ScaleIcon size={34}/><div className="leading-none"><div className="text-[19px] font-extrabold tracking-tight">Kcalario</div><div className="text-[11px] opacity-80">{fmtLong(selDate)}</div></div></div>
        </div>

        <div className="flex-1 overflow-y-auto" style={{minHeight:0}}>
          {page==="diario"&&(
            <div className="p-3 space-y-3" style={{paddingBottom:96}}>
              <div className="rounded-2xl p-4 flex items-end justify-between" style={cardSh}>
                <div><div className="text-xs font-semibold" style={{color:C.sub,letterSpacing:".05em"}}>{selDate===TODAY?"OGGI, FINORA":fmtLong(selDate).toUpperCase()}</div>
                  <div className="flex items-baseline gap-1 mt-1"><span className="text-4xl font-extrabold" style={{color:C.ink,...num}}>{dayTotal}</span><span className="text-sm font-medium" style={{color:C.sub}}>/ {target} kcal</span></div></div>
                <div className="text-right"><div className="text-xs" style={{color:C.sub}}>{dayTotal<=target?"sotto obiettivo":"oltre obiettivo"}</div><div className="text-lg font-bold" style={{color:dayTotal<=target?C.basil:C.brick,...num}}>{dayTotal<=target?"−":"+"}{Math.abs(target-dayTotal)}</div></div>
              </div>

              <div className="rounded-2xl p-3 space-y-3" style={cardSh}>
                <KcalHistogram days={days} target={target} selected={selDate} onSelect={setSelDate}/>
                <div style={{borderTop:`1px solid ${C.line}`}}/>
                <WeightChart days={days} est={est} weights={weights}/>
                <div className="flex items-center gap-2 pt-1">
                  <input value={pesoInput} onChange={e=>setPesoInput(e.target.value)} inputMode="decimal" placeholder={`${(weights[TODAY]??settings.peso)} kg`} className={inputCls} style={{...inputStyle,flex:1}}/>
                  <Btn small onClick={()=>{const v=parseFloat(pesoInput.replace(",","."));if(!v){flash("Peso non valido");return;}setWeights(w=>({...w,[TODAY]:v}));setPesoInput("");flash("Peso registrato");}}>Registra peso di oggi</Btn>
                </div>
              </div>

              <div ref={listRef} className="flex items-center justify-between px-1 pt-1" style={{scrollMarginTop:8}}>
                <span className="text-sm font-bold" style={{color:C.ink}}>Cibi del giorno</span>
                {dayEntries.length>0&&(selectMode?(
                  <div className="flex gap-2"><Btn small kind="danger" onClick={reqDelChecked}><Trash2 size={15}/>Elimina ({Object.values(checked).filter(Boolean).length})</Btn><Btn small kind="soft" onClick={()=>{setSelectMode(false);setChecked({});}}>Fine</Btn></div>
                ):(<button onClick={()=>setSelectMode(true)} className="flex items-center gap-1 text-sm" style={{color:C.sub}}><Trash2 size={15}/> Seleziona</button>))}
              </div>

              {grouped.length===0&&<div className="rounded-2xl p-6 text-center text-sm" style={{background:C.soft,color:C.sub}}>Niente ancora. Tocca <span style={{color:C.basil,fontWeight:700}}>＋</span> per aggiungere un cibo.</div>}

              {grouped.map(g=>{const gTot=g.items.reduce((s,e)=>s+kcalOf(foodById[e.foodId],e.qty),0);
                return(<div key={g.meal} className="rounded-2xl overflow-hidden" style={cardSh}>
                  <div className="flex items-center justify-between px-3 py-1.5" style={{background:C.soft}}><span className="text-xs font-bold" style={{color:C.basilSolidD,letterSpacing:".05em"}}>{g.meal.toUpperCase()}</span><span className="text-xs font-semibold" style={{color:C.sub,...num}}>{roundK(gTot)} kcal</span></div>
                  {g.items.map((e,idx)=>{const f=foodById[e.foodId];const unitLabel=f.unit==="pezzo"?(e.qty===1?"1 pz":`${e.qty} pz`):`${e.qty} ${f.unit}`;
                    return(<div key={e.id} className="flex items-center gap-2 px-3 py-2.5" style={{borderTop:idx?`1px solid ${C.line}`:"none"}} onClick={()=>{if(!selectMode)setEntryEd({mode:"edit",id:e.id,foodId:e.foodId,qty:e.qty,meal:e.meal});}}>
                      {selectMode&&<button onClick={ev=>{ev.stopPropagation();setChecked(c=>({...c,[e.id]:!c[e.id]}));}} className="flex items-center justify-center rounded-md shrink-0" style={{width:22,height:22,border:`2px solid ${checked[e.id]?C.basil:C.line}`,background:checked[e.id]?C.basil:"transparent"}}>{checked[e.id]&&<Check size={15} color="#fff"/>}</button>}
                      <div className="flex-1 min-w-0"><div className="text-[15px] truncate" style={{color:C.ink}}>{f.nome}</div><div className="text-xs" style={{color:C.sub,...num}}>{unitLabel}</div></div>
                      <div className="text-[15px] font-semibold shrink-0" style={{color:C.ink,...num}}>{roundK(kcalOf(f,e.qty))}</div>
                      {!selectMode&&<Pencil size={15} color={C.line}/>}
                    </div>);})}
                </div>);})}
            </div>)}

          {page==="alimenti"&&<AlimentiPage foods={foods} onEdit={f=>setFoodEd({...f})} onBulkDelete={reqDelFoods} lastFood={lastFood}/>}
          {page==="impostazioni"&&<ImpostazioniPage settings={settings} setSettings={setSettings} bmr={bmr} tdee={tdee} target={target} onUpdate={()=>flash("Sei già all'ultima versione (anteprima)")} onHeader={setHeaderImg} onExport={exportXlsx} flash={flash}/>}
        </div>

        {page==="diario"&&<Fab onClick={()=>setPicker(true)}/>}
        {page==="alimenti"&&<Fab onClick={()=>setFoodEd({nome:"",unit:"g",kcal:"",fonte:"CREA-INRAN",note:""})}/>}

        <div className="flex-none flex" style={{background:C.card,borderTop:`1px solid ${C.line}`,height:64}}>
          {[["diario","Diario",BookOpen],["alimenti","Alimenti",Apple],["impostazioni","Impostazioni",SettingsIcon]].map(([id,label,Icon])=>{const on=page===id;return(<button key={id} onClick={()=>setPage(id)} className="flex-1 flex flex-col items-center justify-center gap-0.5"><Icon size={22} color={on?C.basil:C.sub} strokeWidth={on?2.6:2}/><span className="text-[11px]" style={{color:on?C.basil:C.sub,fontWeight:on?700:500}}>{label}</span></button>);})}
        </div>

        <FoodPicker open={picker} onClose={()=>setPicker(false)} foods={foods} recents={recents} onPick={openAdd}/>

        <Sheet open={!!entryEd} onClose={()=>setEntryEd(null)} title={entryEd?.mode==="new"?"Aggiungi al diario":"Modifica voce"}>
          {entryEd&&(()=>{const f=foodById[entryEd.foodId];const kc=roundK(kcalOf(f,parseFloat(String(entryEd.qty).replace(",","."))||0));
            return(<div className="space-y-3">
              <div className="rounded-xl px-3 py-2" style={{background:C.soft}}><div className="font-semibold" style={{color:C.ink}}>{f.nome}</div><div className="text-xs" style={{color:C.sub}}>{f.kcal} kcal / {f.unit==="pezzo"?"pezzo":`100 ${f.unit}`} · {f.fonte}</div></div>
              <div className="flex gap-2">
                <Field label={f.unit==="pezzo"?"Numero di pezzi":`Quantità (${f.unit})`} flex><input autoFocus value={entryEd.qty} inputMode="decimal" onChange={e=>setEntryEd({...entryEd,qty:e.target.value})} className={inputCls} style={inputStyle}/></Field>
                <Field label="Pasto" flex><select value={entryEd.meal} onChange={e=>setEntryEd({...entryEd,meal:e.target.value})} className={inputCls} style={inputStyle}>{MEAL_ORDER.map(m=><option key={m}>{m}</option>)}</select></Field>
              </div>
              <div className="text-center text-sm" style={{color:C.sub}}>= <span className="text-lg font-bold" style={{color:C.basil,...num}}>{kc}</span> kcal</div>
              <div className="flex items-center gap-2 pt-1">
                <Btn onClick={saveEntry} style={{flex:1}}><Check size={17}/>{entryEd.mode==="new"?"Inserisci":"Salva modifiche"}</Btn>
                <Btn kind="soft" onClick={()=>setEntryEd(null)}>Annulla</Btn>
                {entryEd.mode==="edit"&&<Btn kind="ghost" onClick={()=>reqDelEntry(entryEd.id,f.nome)}><Trash2 size={18} color={C.brick}/></Btn>}
              </div>
            </div>);})()}
        </Sheet>

        <Sheet open={!!foodEd} onClose={()=>setFoodEd(null)} title={foodEd?.id?"Modifica alimento":"Nuovo alimento"}>
          {foodEd&&(<div className="space-y-3">
            <Field label="Nome"><input value={foodEd.nome} onChange={e=>setFoodEd({...foodEd,nome:e.target.value})} className={inputCls} style={inputStyle}/></Field>
            <div className="flex gap-2">
              <Field label="Unità" flex><select value={foodEd.unit} onChange={e=>setFoodEd({...foodEd,unit:e.target.value})} className={inputCls} style={inputStyle}><option value="g">per 100 g</option><option value="mL">per 100 mL</option><option value="pezzo">per pezzo</option></select></Field>
              <Field label="kcal" flex><input value={foodEd.kcal} inputMode="decimal" onChange={e=>setFoodEd({...foodEd,kcal:e.target.value})} className={inputCls} style={inputStyle}/></Field>
            </div>
            <Field label="Fonte"><div className="flex gap-2 flex-wrap">{["CREA-INRAN","Confezione","Internet"].map(s=>(<button key={s} onClick={()=>setFoodEd({...foodEd,fonte:s})} className="px-3 py-1.5 rounded-full text-sm" style={{background:foodEd.fonte===s?C.basil:C.chip,color:foodEd.fonte===s?"#fff":C.ink}}>{s}</button>))}</div></Field>
            <Field label="Note"><input value={foodEd.note} onChange={e=>setFoodEd({...foodEd,note:e.target.value})} className={inputCls} style={inputStyle}/></Field>
            <div className="flex items-center gap-2 pt-1"><Btn onClick={saveFood} style={{flex:1}}><Check size={17}/>{foodEd.id?"Salva modifiche":"Inserisci"}</Btn><Btn kind="soft" onClick={()=>setFoodEd(null)}>Annulla</Btn>{foodEd.id&&<Btn kind="ghost" onClick={()=>reqDelFood(foodEd.id,foodEd.nome)}><Trash2 size={18} color={C.brick}/></Btn>}</div>
          </div>)}
        </Sheet>

        <Confirm open={!!confirm} message={confirm?.message} onNo={()=>setConfirm(null)} onYes={()=>{const a=confirm.onYes;setConfirm(null);a&&a();}}/>
        <Toast msg={toast}/>
      </div>
    </div>);
}

function FoodPicker({open,onClose,foods,recents,onPick}){
  const [q,setQ]=useState("");useEffect(()=>{if(!open)setQ("");},[open]);
  const list=useMemo(()=>{const s=q.trim().toLowerCase();const arr=[...foods].sort((a,b)=>a.nome.localeCompare(b.nome));return s?arr.filter(f=>f.nome.toLowerCase().includes(s)):arr;},[q,foods]);
  return(<Sheet open={open} onClose={onClose} title="Aggiungi un cibo">
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-3" style={{background:C.card,border:`1px solid ${C.line}`}}><Search size={18} color={C.sub}/><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Cerca…" className="flex-1 outline-none text-[15px]" style={{background:"transparent",color:C.ink}}/>{q&&<button onClick={()=>setQ("")}><X size={16} color={C.sub}/></button>}</div>
    {!q&&recents.length>0&&(<div className="mb-3"><div className="text-xs font-semibold mb-1" style={{color:C.sub}}>RECENTI</div><div className="flex flex-wrap gap-2">{recents.map(f=>(<button key={f.id} onClick={()=>onPick(f)} className="px-3 py-1.5 rounded-full text-sm" style={{background:C.chip,color:C.ink}}>{f.nome.length>24?f.nome.slice(0,22)+"…":f.nome}</button>))}</div></div>)}
    <div style={{maxHeight:340,overflowY:"auto"}}>{list.map(f=>(<button key={f.id} onClick={()=>onPick(f)} className="w-full flex items-center justify-between px-1 py-2.5 text-left" style={{borderTop:`1px solid ${C.line}`}}><div className="min-w-0"><div className="text-[15px] truncate" style={{color:C.ink}}>{f.nome}</div><div className="text-xs" style={{color:C.sub,...num}}>{f.kcal} kcal / {f.unit==="pezzo"?"pezzo":`100 ${f.unit}`}</div></div><Plus size={20} color={C.basil}/></button>))}{list.length===0&&<div className="text-sm text-center py-6" style={{color:C.sub}}>Nessun alimento. Aggiungilo dalla pagina Alimenti.</div>}</div>
  </Sheet>);
}

function AlimentiPage({foods,onEdit,onBulkDelete,lastFood}){
  const [q,setQ]=useState("");const [selectMode,setSelectMode]=useState(false);const [checked,setChecked]=useState({});
  const itemRefs=useRef({});
  const sorted=useMemo(()=>{const s=q.trim().toLowerCase();const arr=[...foods].sort((a,b)=>a.nome.localeCompare(b.nome));return s?arr.filter(f=>f.nome.toLowerCase().includes(s)):arr;},[q,foods]);
  useEffect(()=>{if(lastFood&&lastFood.id&&itemRefs.current[lastFood.id]){itemRefs.current[lastFood.id].scrollIntoView({block:"center",behavior:"smooth"});}},[lastFood]);
  const nChecked=Object.values(checked).filter(Boolean).length;
  let lastL="";
  return(
    <div className="p-3" style={{paddingBottom:96}}>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1" style={{background:C.card,border:`1px solid ${C.line}`}}><Search size={18} color={C.sub}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cerca alimento…" className="flex-1 outline-none text-[15px]" style={{background:"transparent",color:C.ink}}/></div>
        {selectMode?(
          <>
            <Btn small kind="danger" onClick={()=>onBulkDelete(Object.keys(checked).filter(k=>checked[k]),()=>{setSelectMode(false);setChecked({});})}><Trash2 size={15}/>{nChecked}</Btn>
            <Btn small kind="soft" onClick={()=>{setSelectMode(false);setChecked({});}}>Fine</Btn>
          </>
        ):(<button onClick={()=>setSelectMode(true)} className="flex items-center gap-1 text-sm shrink-0 px-2" style={{color:C.sub}}><Trash2 size={16}/> Seleziona</button>)}
      </div>
      <div className="rounded-2xl overflow-hidden" style={{background:C.card,boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
        {sorted.map((f,i)=>{const L=f.nome[0].toUpperCase();const head=L!==lastL;lastL=L;
          return(<div key={f.id} ref={el=>{itemRefs.current[f.id]=el;}}>
            {head&&<div className="px-3 py-1 text-xs font-bold" style={{background:C.soft,color:C.basilSolidD}}>{L}</div>}
            <div className="w-full flex items-center gap-2 px-3 py-2.5 text-left" style={{borderTop:i&&!head?`1px solid ${C.line}`:"none"}}
              onClick={()=>{if(selectMode)setChecked(c=>({...c,[f.id]:!c[f.id]}));else onEdit(f);}}>
              {selectMode&&<div className="flex items-center justify-center rounded-md shrink-0" style={{width:22,height:22,border:`2px solid ${checked[f.id]?C.basil:C.line}`,background:checked[f.id]?C.basil:"transparent"}}>{checked[f.id]&&<Check size={15} color="#fff"/>}</div>}
              <div className="min-w-0 flex-1 pr-2"><div className="text-[15px] truncate" style={{color:C.ink}}>{f.nome}</div><div className="text-xs" style={{color:C.sub}}>{f.unit==="pezzo"?"pezzo":`100 ${f.unit}`} · {f.fonte}</div>{f.note&&<div className="text-xs italic mt-0.5" style={{color:C.sub}}>{f.note}</div>}</div>
              <div className="text-[15px] font-semibold shrink-0" style={{color:C.ink,...num}}>{f.kcal}</div>
            </div>
          </div>);})}
      </div>
    </div>);
}

function ImpostazioniPage({settings,setSettings,bmr,tdee,target,onUpdate,onHeader,onExport,flash}){
  const fileRef=useRef(null);
  const set=(k,v)=>setSettings(s=>({...s,[k]:v}));
  const setHour=(meal,idx,v)=>setSettings(s=>{const mh={...s.mealHours,[meal]:[...s.mealHours[meal]]};mh[meal][idx]=parseInt(v)||0;return{...s,mealHours:mh};});
  const numField=(label,key)=>(<div><label className="text-xs font-semibold" style={{color:C.sub}}>{label}</label><input value={settings[key]} inputMode="decimal" onChange={e=>set(key,e.target.value===""?"":parseFloat(e.target.value))} className={inputCls} style={inputStyle}/></div>);
  const card={background:C.card,boxShadow:"0 1px 3px rgba(0,0,0,.06)"};
  return(<div className="p-3 space-y-3" style={{paddingBottom:24}}>
    <div className="rounded-2xl p-3 flex items-center justify-between" style={card}><div><div className="font-bold text-[15px]" style={{color:C.ink}}>Versione anteprima</div><div className="text-xs" style={{color:C.sub}}>Ricarica l'app all'ultima versione</div></div><Btn small onClick={onUpdate}><RefreshCw size={15}/>Aggiorna</Btn></div>
    <div className="rounded-2xl p-3 space-y-3" style={card}>
      <div className="font-bold text-[15px]" style={{color:C.ink}}>Dati personali</div>
      <div className="grid grid-cols-2 gap-2">{numField("Altezza (cm)","altezza")}{numField("Peso (kg)","peso")}{numField("Età","eta")}
        <div><label className="text-xs font-semibold" style={{color:C.sub}}>Sesso</label><select value={settings.sesso} onChange={e=>set("sesso",e.target.value)} className={inputCls} style={inputStyle}><option value="M">M</option><option value="F">F</option></select></div>
        <div><label className="text-xs font-semibold" style={{color:C.sub}}>Fattore attività</label><select value={settings.fattore} onChange={e=>set("fattore",parseFloat(e.target.value))} className={inputCls} style={inputStyle}><option value={1.2}>1.2 sedentario</option><option value={1.375}>1.375 leggero</option><option value={1.55}>1.55 moderato</option></select></div>
        {numField("Deficit (kcal)","deficit")}
      </div>
      <div className="grid grid-cols-3 gap-2 pt-1">{[["BMR",roundK(bmr)],["TDEE",roundK(tdee)],["Obiettivo",target]].map(([l,v],i)=>(<div key={l} className="rounded-xl px-2 py-2 text-center" style={{background:i===2?C.basilSolidD:C.soft}}><div className="text-[10px] font-semibold" style={{color:i===2?"rgba(255,255,255,.8)":C.sub}}>{l}</div><div className="text-lg font-extrabold" style={{color:i===2?"#fff":C.ink,...num}}>{v}</div></div>))}</div>
      <div className="text-[11px]" style={{color:C.sub}}>Non scendere sotto ~1500 kcal senza supervisione.</div>
    </div>
    <div className="rounded-2xl p-3 space-y-2" style={card}>
      <div className="font-bold text-[15px]" style={{color:C.ink}}>Orari dei pasti</div><div className="text-xs" style={{color:C.sub}}>Definiscono il pasto automatico all'inserimento. La Cena copre le ore rimanenti.</div>
      {[["colazione","Colazione"],["pranzo","Pranzo"],["aperitivo","Aperitivo"]].map(([k,label])=>(<div key={k} className="flex items-center gap-2"><div className="w-24 text-sm" style={{color:C.ink}}>{label}</div><input value={settings.mealHours[k][0]} onChange={e=>setHour(k,0,e.target.value)} className="w-16 px-2 py-1.5 rounded-lg text-center text-sm" style={inputStyle}/><span style={{color:C.sub}}>–</span><input value={settings.mealHours[k][1]} onChange={e=>setHour(k,1,e.target.value)} className="w-16 px-2 py-1.5 rounded-lg text-center text-sm" style={inputStyle}/><span className="text-xs" style={{color:C.sub}}>h</span></div>))}
    </div>
    <div className="rounded-2xl p-3 space-y-2" style={card}><div className="font-bold text-[15px]" style={{color:C.ink}}>Personalizzazione</div><input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{onHeader(r.result);flash("Immagine header aggiornata");};r.readAsDataURL(file);}}/><Btn kind="soft" onClick={()=>fileRef.current&&fileRef.current.click()} style={{width:"100%"}}><Upload size={16}/>Carica immagine header</Btn></div>
    <div className="rounded-2xl p-3 space-y-2" style={card}><div className="font-bold text-[15px]" style={{color:C.ink}}>Backup</div><div className="text-xs" style={{color:C.sub}}>Scarica tutto in un file Excel con i fogli Diario, Alimenti, Impostazioni e Peso.</div><Btn kind="soft" onClick={onExport} style={{width:"100%"}}><Download size={16}/>Esporta tutto in Excel (.xlsx)</Btn></div>
    <div className="text-center text-[11px] pt-1" style={{color:C.sub}}>Kcalario · anteprima con dati dimostrativi</div>
  </div>);
}
