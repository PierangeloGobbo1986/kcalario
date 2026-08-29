const {useState,useMemo,useRef,useEffect,useCallback}=React;

/* ---- // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7RkjgIt3aLnGvqYtFlhQIi4VCZ7U6WuQ",
  authDomain: "kcalario-67e66.firebaseapp.com",
  projectId: "kcalario-67e66",
  storageBucket: "kcalario-67e66.firebasestorage.app",
  messagingSenderId: "1023247429683",
  appId: "1:1023247429683:web:c236413ecb079e92ff3346"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const auth=firebase.auth();
const db=firebase.firestore();

/* ------------------------------------------------------------------ theme */
const C={paper:"#F4F1E9",ink:"#20261F",sub:"#6F756A",basil:"#2F6B49",basilSolidD:"#214F37",saffron:"#E0A32B",brick:"#B34A2C",card:"#FFFFFF",line:"#E6E1D5",chip:"#EAE4D6",soft:"#F0ECE1"};
const FONT='-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
const num={fontVariantNumeric:"tabular-nums"};

/* ----------------------------------------------------------------- icons */
const Svg=({size=24,color="currentColor",stroke=2,children})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">{children}</svg>);
const Plus=p=><Svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>;
const Search=p=><Svg {...p}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Svg>;
const X=p=><Svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>;
const Check=p=><Svg {...p}><polyline points="20 6 9 17 4 12"/></Svg>;
const Trash2=p=><Svg {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></Svg>;
const Pencil=p=><Svg {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></Svg>;
const RefreshCw=p=><Svg {...p}><path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/></Svg>;
const Upload=p=><Svg {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 9 12 4 17 9"/><line x1="12" y1="4" x2="12" y2="16"/></Svg>;
const Download=p=><Svg {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Svg>;
const LogOut=p=><Svg {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Svg>;
const BookOpen=p=><Svg {...p}><path d="M2 4h6a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H2z"/><path d="M22 4h-6a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H22z"/></Svg>;
const AppleIcon=p=><Svg {...p}><path d="M12 8c-2.6 0-4.5 2.1-4.5 5.2S9.4 21 12 21s4.5-4.7 4.5-7.8S14.6 8 12 8z"/><path d="M12 8c0-2 1.1-3.2 3.1-3.4"/></Svg>;
const SettingsI=p=><Svg {...p}><line x1="4" y1="7" x2="20" y2="7"/><circle cx="9" cy="7" r="2.1" fill="currentColor" stroke="none"/><line x1="4" y1="12" x2="20" y2="12"/><circle cx="15" cy="12" r="2.1" fill="currentColor" stroke="none"/><line x1="4" y1="17" x2="20" y2="17"/><circle cx="9" cy="17" r="2.1" fill="currentColor" stroke="none"/></Svg>;
function ScaleIcon({size=34}){const feet="#F4F1E9";return(<svg width={size} height={size} viewBox="0 0 40 40" aria-hidden><rect x="2" y="2" width="36" height="36" rx="9" fill={C.basilSolidD}/><path d="M13 12 A7 7 0 0 1 27 12 Z" fill={feet}/><line x1="20" y1="12" x2="23" y2="7.6" stroke={C.saffron} strokeWidth="1.6" strokeLinecap="round"/><circle cx="20" cy="12" r="1.4" fill={C.basilSolidD}/><g fill={feet}><ellipse cx="14" cy="23" rx="2.8" ry="4.2"/><ellipse cx="14.4" cy="29" rx="1.8" ry="2.2"/><circle cx="11.7" cy="18.2" r="0.85"/><circle cx="13.4" cy="17.3" r="0.95"/><circle cx="15.2" cy="17.5" r="0.85"/><circle cx="16.6" cy="18.4" r="0.75"/></g><g fill={feet}><ellipse cx="26" cy="23" rx="2.8" ry="4.2"/><ellipse cx="25.6" cy="29" rx="1.8" ry="2.2"/><circle cx="28.3" cy="18.2" r="0.85"/><circle cx="26.6" cy="17.3" r="0.95"/><circle cx="24.8" cy="17.5" r="0.85"/><circle cx="23.4" cy="18.4" r="0.75"/></g></svg>);}

/* --------------------------------------------------------------- seed data */
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
const SEED_FOODS=RAW_FOODS.map(r=>({nome:r[0],unit:r[1],kcal:r[2],fonte:r[3],note:r[4]}));
const MEAL_ORDER=["Colazione","Spuntino","Pranzo","Aperitivo","Cena","Dopo cena"];
const DEFAULT_SETTINGS={altezza:174,peso:73,eta:40,sesso:"M",fattore:1.2,deficit:400,mealHours:{colazione:[5,11],pranzo:[11,15],aperitivo:[15,19]}};

/* --------------------------------------------------------------- date utils */
const WD=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"];
function pad2(n){return String(n).padStart(2,"0");}
function todayStr(){const d=new Date();return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;}
const TODAY=todayStr();
function parseD(s){const[y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d);}
function fmtD(s){const d=parseD(s);return `${WD[d.getDay()]} ${d.getDate()}`;}
function fmtLong(s){const d=parseD(s);const M=["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"];return `${WD[d.getDay()]} ${d.getDate()} ${M[d.getMonth()]}`;}
function shift(s,n){const d=parseD(s);d.setDate(d.getDate()+n);return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;}
function rangeDays(end,count){const out=[];for(let i=count-1;i>=0;i--)out.push(shift(end,-i));return out;}
function kcalOf(food,qty){if(!food)return 0;return food.unit==="pezzo"?food.kcal*qty:(food.kcal*qty)/100;}
const roundK=x=>Math.round(x);

/* ------------------------------------------------------------ UI atoms */
function Toast({msg}){if(!msg)return null;return(<div className="absolute left-1/2 z-50" style={{bottom:96,transform:"translateX(-50%)"}}><div className="px-4 py-2 rounded-full text-sm shadow-lg" style={{background:C.ink,color:"#fff"}}>{msg}</div></div>);}
function Fab({onClick}){return(<button onClick={onClick} aria-label="Aggiungi" className="absolute z-30 flex items-center justify-center rounded-full shadow-xl active:scale-95 transition" style={{right:18,bottom:80,width:60,height:60,background:C.basil,color:"#fff"}}><Plus size={30} stroke={2.6} color="#fff"/></button>);}
const inputCls="w-full px-3 py-2 rounded-xl text-[15px] outline-none";
const inputStyle={background:C.card,border:`1px solid ${C.line}`,color:C.ink};
function Btn({children,onClick,kind="primary",small,style,...rest}){const base="rounded-xl font-semibold active:scale-[.98] transition inline-flex items-center justify-center gap-1";const sz=small?"px-3 py-1.5 text-sm":"px-4 py-2.5 text-[15px]";const st=kind==="primary"?{background:C.basil,color:"#fff"}:kind==="ghost"?{background:"transparent",color:C.sub}:kind==="danger"?{background:C.brick,color:"#fff"}:{background:C.chip,color:C.ink};return <button onClick={onClick} className={`${base} ${sz}`} style={{...st,...style}} {...rest}>{children}</button>;}
function Field({label,children,flex}){return(<div style={flex?{flex:1}:undefined}><label className="text-xs font-semibold" style={{color:C.sub}}>{label}</label><div className="mt-1">{children}</div></div>);}
function Confirm({open,message,onYes,onNo}){if(!open)return null;return(<div className="absolute inset-0 z-50 flex items-center justify-center p-6" style={{background:"rgba(20,24,20,.42)"}} onClick={onNo}><div onClick={e=>e.stopPropagation()} className="w-full rounded-2xl p-4" style={{maxWidth:320,background:C.paper,boxShadow:"0 10px 40px rgba(0,0,0,.3)"}}><div className="text-[15px] font-bold mb-1" style={{color:C.ink}}>Confermi l'eliminazione?</div><div className="text-sm mb-4" style={{color:C.sub}}>{message}</div><div className="flex gap-2 justify-end"><Btn kind="soft" small onClick={onNo}>Annulla</Btn><Btn kind="danger" small onClick={onYes}><Trash2 size={15} color="#fff"/>Elimina</Btn></div></div></div>);}
function Sheet({open,onClose,children,title}){if(!open)return null;return(<div className="absolute inset-0 z-40 flex items-end" style={{background:"rgba(20,24,20,.34)"}} onClick={onClose}><div onClick={e=>e.stopPropagation()} className="w-full rounded-t-3xl p-4 pb-6" style={{background:C.paper,maxHeight:"88%",overflowY:"auto",boxShadow:"0 -8px 30px rgba(0,0,0,.2)"}}><div className="flex items-center justify-between mb-3"><h3 className="text-base font-bold" style={{color:C.ink}}>{title}</h3><button onClick={onClose} className="p-1 rounded-full" style={{color:C.sub}}><X size={22} color={C.sub}/></button></div>{children}</div></div>);}

/* ----------------------------------------------------------- charts */
function KcalHistogram({days,target,selected,onSelect}){
  const scRef=useRef(null);const SLOT=46,PLOT=150,LBL=22,GUT=42;
  const [localMax,setLocalMax]=useState(Math.max(target*1.2,2000));
  const recompute=useCallback(()=>{const el=scRef.current;if(!el)return;const start=Math.floor(el.scrollLeft/SLOT);const end=Math.ceil((el.scrollLeft+el.clientWidth)/SLOT);const vis=days.slice(Math.max(0,start),end);const mx=Math.max(target,...vis.map(d=>d.total),1);setLocalMax(Math.ceil((mx*1.15)/100)*100);},[days,target]);
  useEffect(()=>{const el=scRef.current;if(!el)return;el.scrollLeft=el.scrollWidth;recompute();},[days.length]);
  const targetY=(target/localMax)*PLOT;
  const tick=(v,top,color,bold)=>(<div className="absolute right-1 text-[10px]" style={{top,color,fontWeight:bold?700:400,...num}}>{v}</div>);
  return(<div><div className="flex items-baseline justify-between mb-1 px-1"><span className="text-xs font-semibold" style={{color:C.sub,letterSpacing:".06em"}}>KCAL / GIORNO</span><span className="text-[11px]" style={{color:C.sub}}>tocca un giorno</span></div>
    <div className="relative" style={{height:PLOT+LBL}}>
      <div className="absolute top-0 left-0" style={{width:GUT,height:PLOT}}>{tick(localMax,-2,C.sub)}{tick(Math.round(localMax/2),PLOT/2-6,C.sub)}{tick(0,PLOT-10,C.sub)}{tick(target,PLOT-targetY-6,C.saffron,true)}</div>
      <div className="absolute" style={{left:GUT,right:0,bottom:LBL+targetY,height:0,borderTop:`2px dashed ${C.saffron}`,zIndex:5,pointerEvents:"none"}}/>
      <div ref={scRef} onScroll={recompute} className="absolute top-0 overflow-x-auto" style={{left:GUT,right:0,height:PLOT+LBL,scrollbarWidth:"none"}}>
        <div className="flex items-end" style={{height:PLOT+LBL}}>
          {days.map(d=>{const sel=d.date===selected;const h=Math.max(2,(Math.min(d.total,localMax)/localMax)*PLOT);const over=d.total>target;const baseH=over?(target/localMax)*PLOT:h;const overH=over?Math.min(h-baseH,PLOT-baseH):0;
            return(<button key={d.date} onClick={()=>onSelect(d.date)} className="flex flex-col items-center justify-end shrink-0" style={{width:SLOT,height:PLOT+LBL}}>
              <div className="relative flex flex-col justify-end" style={{width:34,height:PLOT,borderRadius:7,background:sel?"rgba(47,107,73,0.14)":"transparent",outline:sel?`2px solid ${C.basilSolidD}`:"none"}}>
                <div className="mx-auto flex flex-col justify-end" style={{width:24,height:PLOT}}>{overH>0&&<div style={{height:overH,background:C.brick,borderTopLeftRadius:5,borderTopRightRadius:5,opacity:sel?1:.9}}/>}<div style={{height:baseH,background:sel?C.basilSolidD:C.basil,borderTopLeftRadius:overH>0?0:5,borderTopRightRadius:overH>0?0:5,opacity:sel?1:.82}}/></div>
              </div>
              <span className="mt-1 text-[10px] leading-tight text-center" style={{color:sel?C.ink:C.sub,fontWeight:sel?700:500,...num}}>{fmtD(d.date)}</span>
            </button>);})}
        </div>
      </div>
    </div></div>);
}
function WeightChart({days,est,weights}){
  const GUT=42,PLOT=96;const realPts=days.map((d,i)=>weights[d.date]!=null?{i,w:weights[d.date]}:null).filter(Boolean);
  const allW=[...est.map(e=>e.w),...realPts.map(p=>p.w)];if(allW.length===0)return <div className="text-sm px-1" style={{color:C.sub}}>Nessun dato di peso.</div>;
  let mn=Math.min(...allW),mx=Math.max(...allW);const pd=Math.max(0.3,(mx-mn)*0.25);mn-=pd;mx+=pd;const span=Math.max(0.6,mx-mn);
  const n=days.length;const PW=n*46;const x=i=>(n<=1?PW/2:(i*(PW-24)/(n-1))+12);const y=w=>((1-(w-mn)/span)*(PLOT-8))+4;
  const estPath=est.map((e,i)=>`${i?"L":"M"}${x(i).toFixed(1)},${y(e.w).toFixed(1)}`).join(" ");
  const realPath=realPts.map((p,i)=>`${i?"L":"M"}${x(p.i).toFixed(1)},${y(p.w).toFixed(1)}`).join(" ");
  const last=realPts[realPts.length-1];const tick=(v,top)=>(<div className="absolute right-1 text-[10px]" style={{top,color:C.sub,...num}}>{v.toFixed(1)}</div>);
  return(<div><div className="flex items-center justify-between mb-1 px-1"><span className="text-xs font-semibold" style={{color:C.sub,letterSpacing:".06em"}}>PESO (kg)</span><span className="flex items-center gap-3 text-[10px]" style={{color:C.sub}}><span className="flex items-center gap-1"><span style={{width:14,borderTop:`3px solid ${C.basil}`,opacity:.3,display:"inline-block"}}/>stima da kcal</span><span className="flex items-center gap-1"><span style={{width:14,borderTop:`2px solid ${C.basil}`,display:"inline-block"}}/>reale</span></span></div>
    <div className="relative" style={{height:PLOT}}><div className="absolute top-0 left-0" style={{width:GUT,height:PLOT}}>{tick(mx,-2)}{tick((mn+mx)/2,PLOT/2-6)}{tick(mn,PLOT-12)}</div>
      <div className="absolute top-0 overflow-x-auto" style={{left:GUT,right:0,height:PLOT,scrollbarWidth:"none"}}><svg width={PW} height={PLOT} style={{display:"block"}}>
        <path d={estPath} fill="none" stroke={C.basil} strokeOpacity="0.3" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round"/>
        <path d={realPath} fill="none" stroke={C.basil} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
        {realPts.map((p,i)=>(<circle key={i} cx={x(p.i)} cy={y(p.w)} r={i===realPts.length-1?4:3} fill={i===realPts.length-1?C.basilSolidD:C.card} stroke={C.basil} strokeWidth="2"/>))}
        {last&&<text x={x(last.i)} y={y(last.w)-8} textAnchor="end" fontSize="11" fontWeight="700" fill={C.ink} style={num}>{last.w.toFixed(1)}</text>}
      </svg></div>
    </div></div>);
}

/* ------------------------------------------------------------ login */
function Login(){
  const [email,setEmail]=useState("");const [pw,setPw]=useState("");const [mode,setMode]=useState("login");const [err,setErr]=useState("");const [busy,setBusy]=useState(false);
  async function go(){setErr("");setBusy(true);try{if(mode==="login")await auth.signInWithEmailAndPassword(email.trim(),pw);else await auth.createUserWithEmailAndPassword(email.trim(),pw);}catch(e){setErr(traduci(e.code||e.message));}setBusy(false);}
  function traduci(c){if(c&&c.includes("invalid-credential"))return "Email o password non corretti.";if(c&&c.includes("email-already-in-use"))return "Questa email è già registrata.";if(c&&c.includes("weak-password"))return "La password deve avere almeno 6 caratteri.";if(c&&c.includes("invalid-email"))return "Email non valida.";return "Qualcosa è andato storto. Riprova.";}
  return(<div className="w-full flex items-center justify-center" style={{minHeight:"100dvh",background:C.paper,fontFamily:FONT}}>
    <div className="w-full px-6" style={{maxWidth:380}}>
      <div className="flex flex-col items-center mb-6"><ScaleIcon size={64}/><div className="text-2xl font-extrabold mt-2" style={{color:C.ink}}>Kcalario</div><div className="text-sm" style={{color:C.sub}}>Il diario delle calorie</div></div>
      <div className="space-y-3">
        <Field label="Email"><input value={email} onChange={e=>setEmail(e.target.value)} type="email" autoComplete="email" className={inputCls} style={inputStyle}/></Field>
        <Field label="Password"><input value={pw} onChange={e=>setPw(e.target.value)} type="password" autoComplete="current-password" className={inputCls} style={inputStyle}/></Field>
        {err&&<div className="text-sm" style={{color:C.brick}}>{err}</div>}
        <Btn onClick={go} style={{width:"100%"}}>{busy?"…":(mode==="login"?"Accedi":"Crea account")}</Btn>
        <button onClick={()=>{setMode(mode==="login"?"register":"login");setErr("");}} className="w-full text-sm pt-1" style={{color:C.basil}}>{mode==="login"?"Non hai un account? Registrati":"Hai già un account? Accedi"}</button>
      </div>
    </div>
  </div>);
}

/* ------------------------------------------------------------ main app */
function Main({user}){
  const uid=user.uid;
  const foodsCol=useMemo(()=>db.collection("foods"),[]);
  const entriesCol=useMemo(()=>db.collection("users").doc(uid).collection("entries"),[uid]);
  const weightsDoc=useMemo(()=>db.collection("users").doc(uid).collection("data").doc("weights"),[uid]);
  const settingsDoc=useMemo(()=>db.collection("users").doc(uid).collection("data").doc("settings"),[uid]);

  const [foods,setFoods]=useState([]);
  const [entries,setEntries]=useState([]);
  const [weights,setWeights]=useState({});
  const [settings,setSettings]=useState(DEFAULT_SETTINGS);
  const [ready,setReady]=useState(false);
  const seededRef=useRef(false);

  useEffect(()=>{const un=foodsCol.orderBy("nome").onSnapshot(s=>{
    if(s.empty&&!seededRef.current){seededRef.current=true;const b=db.batch();SEED_FOODS.forEach(f=>b.set(foodsCol.doc(),f));b.commit();return;}
    setFoods(s.docs.map(d=>({id:d.id,...d.data()})));setReady(true);
  });return un;},[foodsCol]);
  useEffect(()=>entriesCol.onSnapshot(s=>setEntries(s.docs.map(d=>({id:d.id,...d.data()})))),[entriesCol]);
  useEffect(()=>weightsDoc.onSnapshot(d=>setWeights((d.exists&&d.data().map)||{})),[weightsDoc]);
  useEffect(()=>settingsDoc.onSnapshot(d=>{if(d.exists)setSettings({...DEFAULT_SETTINGS,...d.data()});else settingsDoc.set(DEFAULT_SETTINGS);}),[settingsDoc]);

  const [page,setPage]=useState("diario");
  const [selDate,setSelDate]=useState(TODAY);
  const [toast,setToast]=useState("");const flash=m=>{setToast(m);setTimeout(()=>setToast(""),1800);};
  const [confirm,setConfirm]=useState(null);const askDelete=(message,onYes)=>setConfirm({message,onYes});
  const [lastFood,setLastFood]=useState({id:null,n:0});
  const listRef=useRef(null);

  const foodById=useMemo(()=>Object.fromEntries(foods.map(f=>[f.id,f])),[foods]);
  const headerImg=settings.headerImg||null;
  const mh=settings.mealHours||DEFAULT_SETTINGS.mealHours;
  const bmr=useMemo(()=>{const{peso,altezza,eta,sesso}=settings;return 10*(peso||0)+6.25*(altezza||0)-5*(eta||0)+(sesso==="M"?5:-161);},[settings]);
  const tdee=bmr*(settings.fattore||1.2);const target=Math.round(tdee-(settings.deficit||0));
  const days=useMemo(()=>rangeDays(TODAY,14).map(date=>{const tot=entries.filter(e=>e.date===date).reduce((s,e)=>s+kcalOf(foodById[e.foodId],e.qty),0);return{date,total:roundK(tot)};}),[entries,foodById]);
  const est=useMemo(()=>{const anchor=weights[days[0]?.date]??settings.peso??73;let run=0;const out=[];days.forEach(d=>{if(d.total>0)run+=(d.total-tdee);out.push({date:d.date,w:anchor+run/7700});});return out;},[days,weights,tdee,settings.peso]);
  const dayTotal=days.find(d=>d.date===selDate)?.total??0;
  const mealForNow=useCallback(()=>{const h=new Date().getHours();if(h>=mh.colazione[0]&&h<mh.colazione[1])return"Colazione";if(h>=mh.pranzo[0]&&h<mh.pranzo[1])return"Pranzo";if(h>=mh.aperitivo[0]&&h<mh.aperitivo[1])return"Aperitivo";return"Cena";},[mh]);

  useEffect(()=>{if(page==="diario"&&listRef.current)listRef.current.scrollIntoView({block:"start"});},[page]);

  const [picker,setPicker]=useState(false);const [entryEd,setEntryEd]=useState(null);const [foodEd,setFoodEd]=useState(null);
  const [selectMode,setSelectMode]=useState(false);const [checked,setChecked]=useState({});const [pesoInput,setPesoInput]=useState("");

  const recents=useMemo(()=>{const seen=[],out=[];[...entries].sort((a,b)=>(b.date+String(b.id)).localeCompare(a.date+String(a.id))).forEach(e=>{if(!seen.includes(e.foodId)){seen.push(e.foodId);if(foodById[e.foodId])out.push(foodById[e.foodId]);}});return out.slice(0,6);},[entries,foodById]);

  function openAdd(food){setPicker(false);setEntryEd({mode:"new",foodId:food.id,qty:food.unit==="pezzo"?1:100,meal:mealForNow()});}
  function saveEntry(){const q=parseFloat(String(entryEd.qty).replace(",","."));if(!q||q<=0){flash("Quantità non valida");return;}
    if(entryEd.mode==="new")entriesCol.add({date:selDate,meal:entryEd.meal,foodId:entryEd.foodId,qty:q}).then(()=>flash("Aggiunto al diario"));
    else entriesCol.doc(entryEd.id).update({qty:q,meal:entryEd.meal}).then(()=>flash("Modifiche salvate"));setEntryEd(null);}
  function reqDelEntry(id,nome){askDelete(`Eliminare "${nome}" dal diario?`,()=>{entriesCol.doc(id).delete();setEntryEd(null);flash("Eliminato");});}
  function reqDelChecked(){const ids=Object.keys(checked).filter(k=>checked[k]);if(!ids.length)return;askDelete(`Eliminare ${ids.length} voci dal diario?`,()=>{const b=db.batch();ids.forEach(id=>b.delete(entriesCol.doc(id)));b.commit();setChecked({});setSelectMode(false);flash(`${ids.length} voci eliminate`);});}

  function saveFood(){const f=foodEd;if(!f.nome.trim()){flash("Serve un nome");return;}const k=parseFloat(String(f.kcal).replace(",","."));if(isNaN(k)){flash("Serve un valore kcal");return;}
    const data={nome:f.nome.trim(),unit:f.unit,kcal:k,fonte:f.fonte,note:f.note||""};
    if(f.id){foodsCol.doc(f.id).update(data).then(()=>{setLastFood({id:f.id,n:Date.now()});flash("Alimento salvato");});setFoodEd(null);}
    else{foodsCol.add(data).then(ref=>{setLastFood({id:ref.id,n:Date.now()});flash("Alimento salvato");});setFoodEd(null);}}
  function reqDelFood(id,nome){askDelete(`Eliminare "${nome}" dagli alimenti?`,()=>{foodsCol.doc(id).delete();setFoodEd(null);flash("Alimento eliminato");});}
  function reqDelFoods(ids,done){if(!ids.length)return;askDelete(`Eliminare ${ids.length} alimenti?`,()=>{const b=db.batch();ids.forEach(id=>b.delete(foodsCol.doc(id)));b.commit();done&&done();flash(`${ids.length} alimenti eliminati`);});}

  function saveWeight(){const v=parseFloat(pesoInput.replace(",","."));if(!v){flash("Peso non valido");return;}weightsDoc.set({map:{[TODAY]:v}},{merge:true});setPesoInput("");flash("Peso registrato");}
  const setSetting=(k,v)=>settingsDoc.set({[k]:v},{merge:true});
  const setHour=(meal,idx,v)=>{const arr=[...mh[meal]];arr[idx]=parseInt(v)||0;settingsDoc.set({mealHours:{...mh,[meal]:arr}},{merge:true});};

  function onHeaderFile(file){const rd=new FileReader();rd.onload=()=>{const img=new Image();img.onload=()=>{const max=1000;const sc=Math.min(1,max/Math.max(img.width,img.height));const cw=Math.round(img.width*sc),ch=Math.round(img.height*sc);const cv=document.createElement("canvas");cv.width=cw;cv.height=ch;cv.getContext("2d").drawImage(img,0,0,cw,ch);const url=cv.toDataURL("image/jpeg",0.6);settingsDoc.set({headerImg:url},{merge:true});flash("Immagine header aggiornata");};img.src=rd.result;};rd.readAsDataURL(file);}

  function exportXlsx(){const XLSX=window.XLSX;if(!XLSX){flash("Export non pronto, riprova");return;}const wb=XLSX.utils.book_new();
    const dia=[["Data","Pasto","Alimento","Quantita","kcal"]];[...entries].sort((a,b)=>a.date.localeCompare(b.date)).forEach(e=>{const f=foodById[e.foodId];dia.push([e.date,e.meal,f?f.nome:"?",e.qty,roundK(kcalOf(f,e.qty))]);});XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(dia),"Diario");
    const ali=[["Alimento","Unita","kcal","Fonte","Note"]];[...foods].sort((a,b)=>a.nome.localeCompare(b.nome)).forEach(f=>ali.push([f.nome,f.unit,f.kcal,f.fonte,f.note]));XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(ali),"Alimenti");
    const imp=[["Campo","Valore"],["Altezza (cm)",settings.altezza],["Peso (kg)",settings.peso],["Eta",settings.eta],["Sesso",settings.sesso],["Fattore attivita",settings.fattore],["Deficit",settings.deficit],["BMR",roundK(bmr)],["TDEE",roundK(tdee)],["Obiettivo kcal",target]];XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(imp),"Impostazioni");
    const pes=[["Data","Peso (kg)"]];Object.entries(weights).sort((a,b)=>a[0].localeCompare(b[0])).forEach(([d,w])=>pes.push([d,w]));XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(pes),"Peso");
    XLSX.writeFile(wb,"kcalario.xlsx");flash("Esportato kcalario.xlsx");}

  async function updateApp(){try{if("serviceWorker" in navigator){const rs=await navigator.serviceWorker.getRegistrations();for(const r of rs)await r.update();}if(window.caches){const ks=await caches.keys();await Promise.all(ks.map(k=>caches.delete(k)));}}catch(e){}location.reload();}

  const dayEntries=entries.filter(e=>e.date===selDate);
  const grouped=MEAL_ORDER.map(m=>({meal:m,items:dayEntries.filter(e=>e.meal===m)})).filter(g=>g.items.length);
  const cardSh={background:C.card,boxShadow:"0 1px 3px rgba(0,0,0,.06)"};

  if(!ready)return(<div className="w-full flex items-center justify-center" style={{minHeight:"100dvh",background:C.paper}}><ScaleIcon size={54}/></div>);

  return(<div className="w-full flex justify-center" style={{background:"#DED8CA",fontFamily:FONT}}>
    <div className="relative w-full flex flex-col" style={{maxWidth:480,height:"100dvh",background:C.paper,overflow:"hidden"}}>
      <div className="flex-none px-4 pb-3" style={{paddingTop:"calc(env(safe-area-inset-top) + 14px)",background:headerImg?`linear-gradient(rgba(20,24,20,.35),rgba(20,24,20,.5)),url(${headerImg}) center/cover`:C.basilSolidD,color:"#fff"}}>
        <div className="flex items-center gap-2"><ScaleIcon size={34}/><div className="leading-none"><div className="text-[19px] font-extrabold tracking-tight">Kcalario</div><div className="text-[11px] opacity-80">{fmtLong(selDate)}</div></div></div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{minHeight:0}}>
        {page==="diario"&&(<div className="p-3 space-y-3" style={{paddingBottom:96}}>
          <div className="rounded-2xl p-4 flex items-end justify-between" style={cardSh}>
            <div><div className="text-xs font-semibold" style={{color:C.sub,letterSpacing:".05em"}}>{selDate===TODAY?"OGGI, FINORA":fmtLong(selDate).toUpperCase()}</div><div className="flex items-baseline gap-1 mt-1"><span className="text-4xl font-extrabold" style={{color:C.ink,...num}}>{dayTotal}</span><span className="text-sm font-medium" style={{color:C.sub}}>/ {target} kcal</span></div></div>
            <div className="text-right"><div className="text-xs" style={{color:C.sub}}>{dayTotal<=target?"sotto obiettivo":"oltre obiettivo"}</div><div className="text-lg font-bold" style={{color:dayTotal<=target?C.basil:C.brick,...num}}>{dayTotal<=target?"−":"+"}{Math.abs(target-dayTotal)}</div></div>
          </div>
          <div className="rounded-2xl p-3 space-y-3" style={cardSh}>
            <KcalHistogram days={days} target={target} selected={selDate} onSelect={setSelDate}/>
            <div style={{borderTop:`1px solid ${C.line}`}}/>
            <WeightChart days={days} est={est} weights={weights}/>
            <div className="flex items-center gap-2 pt-1"><input value={pesoInput} onChange={e=>setPesoInput(e.target.value)} inputMode="decimal" placeholder={`${(weights[TODAY]??settings.peso)} kg`} className={inputCls} style={{...inputStyle,flex:1}}/><Btn small onClick={saveWeight}>Registra peso di oggi</Btn></div>
          </div>
          <div ref={listRef} className="flex items-center justify-between px-1 pt-1" style={{scrollMarginTop:8}}>
            <span className="text-sm font-bold" style={{color:C.ink}}>Cibi del giorno</span>
            {dayEntries.length>0&&(selectMode?(<div className="flex gap-2"><Btn small kind="danger" onClick={reqDelChecked}><Trash2 size={15} color="#fff"/>Elimina ({Object.values(checked).filter(Boolean).length})</Btn><Btn small kind="soft" onClick={()=>{setSelectMode(false);setChecked({});}}>Fine</Btn></div>):(<button onClick={()=>setSelectMode(true)} className="flex items-center gap-1 text-sm" style={{color:C.sub}}><Trash2 size={15} color={C.sub}/> Seleziona</button>))}
          </div>
          {grouped.length===0&&<div className="rounded-2xl p-6 text-center text-sm" style={{background:C.soft,color:C.sub}}>Niente ancora. Tocca ＋ per aggiungere un cibo.</div>}
          {grouped.map(g=>{const gTot=g.items.reduce((s,e)=>s+kcalOf(foodById[e.foodId],e.qty),0);return(<div key={g.meal} className="rounded-2xl overflow-hidden" style={cardSh}>
            <div className="flex items-center justify-between px-3 py-1.5" style={{background:C.soft}}><span className="text-xs font-bold" style={{color:C.basilSolidD,letterSpacing:".05em"}}>{g.meal.toUpperCase()}</span><span className="text-xs font-semibold" style={{color:C.sub,...num}}>{roundK(gTot)} kcal</span></div>
            {g.items.map((e,idx)=>{const f=foodById[e.foodId];if(!f)return null;const unitLabel=f.unit==="pezzo"?(e.qty===1?"1 pz":`${e.qty} pz`):`${e.qty} ${f.unit}`;
              return(<div key={e.id} className="flex items-center gap-2 px-3 py-2.5" style={{borderTop:idx?`1px solid ${C.line}`:"none"}} onClick={()=>{if(!selectMode)setEntryEd({mode:"edit",id:e.id,foodId:e.foodId,qty:e.qty,meal:e.meal});}}>
                {selectMode&&<button onClick={ev=>{ev.stopPropagation();setChecked(c=>({...c,[e.id]:!c[e.id]}));}} className="flex items-center justify-center rounded-md shrink-0" style={{width:22,height:22,border:`2px solid ${checked[e.id]?C.basil:C.line}`,background:checked[e.id]?C.basil:"transparent"}}>{checked[e.id]&&<Check size={15} color="#fff"/>}</button>}
                <div className="flex-1 min-w-0"><div className="text-[15px] truncate" style={{color:C.ink}}>{f.nome}</div><div className="text-xs" style={{color:C.sub,...num}}>{unitLabel}</div></div>
                <div className="text-[15px] font-semibold shrink-0" style={{color:C.ink,...num}}>{roundK(kcalOf(f,e.qty))}</div>{!selectMode&&<Pencil size={15} color={C.line}/>}
              </div>);})}
          </div>);})}
        </div>)}

        {page==="alimenti"&&<AlimentiPage foods={foods} onEdit={f=>setFoodEd({...f})} onBulkDelete={reqDelFoods} lastFood={lastFood}/>}
        {page==="impostazioni"&&<ImpostazioniPage settings={settings} mh={mh} setSetting={setSetting} setHour={setHour} bmr={bmr} tdee={tdee} target={target} onUpdate={updateApp} onHeaderFile={onHeaderFile} onExport={exportXlsx} email={user.email}/>}
      </div>

      {page==="diario"&&<Fab onClick={()=>setPicker(true)}/>}
      {page==="alimenti"&&<Fab onClick={()=>setFoodEd({nome:"",unit:"g",kcal:"",fonte:"CREA-INRAN",note:""})}/>}

      <div className="flex-none flex" style={{background:C.card,borderTop:`1px solid ${C.line}`,paddingBottom:"env(safe-area-inset-bottom)"}}>
        {[["diario","Diario",BookOpen],["alimenti","Alimenti",AppleIcon],["impostazioni","Impostazioni",SettingsI]].map(([id,label,Icon])=>{const on=page===id;return(<button key={id} onClick={()=>setPage(id)} className="flex-1 flex flex-col items-center justify-center gap-0.5" style={{height:64}}><Icon size={22} color={on?C.basil:C.sub} stroke={on?2.6:2}/><span className="text-[11px]" style={{color:on?C.basil:C.sub,fontWeight:on?700:500}}>{label}</span></button>);})}
      </div>

      <FoodPicker open={picker} onClose={()=>setPicker(false)} foods={foods} recents={recents} onPick={openAdd}/>

      <Sheet open={!!entryEd} onClose={()=>setEntryEd(null)} title={entryEd?.mode==="new"?"Aggiungi al diario":"Modifica voce"}>
        {entryEd&&(()=>{const f=foodById[entryEd.foodId];if(!f)return null;const kc=roundK(kcalOf(f,parseFloat(String(entryEd.qty).replace(",","."))||0));
          return(<div className="space-y-3"><div className="rounded-xl px-3 py-2" style={{background:C.soft}}><div className="font-semibold" style={{color:C.ink}}>{f.nome}</div><div className="text-xs" style={{color:C.sub}}>{f.kcal} kcal / {f.unit==="pezzo"?"pezzo":`100 ${f.unit}`} · {f.fonte}</div></div>
            <div className="flex gap-2"><Field label={f.unit==="pezzo"?"Numero di pezzi":`Quantità (${f.unit})`} flex><input autoFocus value={entryEd.qty} inputMode="decimal" onChange={e=>setEntryEd({...entryEd,qty:e.target.value})} className={inputCls} style={inputStyle}/></Field><Field label="Pasto" flex><select value={entryEd.meal} onChange={e=>setEntryEd({...entryEd,meal:e.target.value})} className={inputCls} style={inputStyle}>{MEAL_ORDER.map(m=><option key={m}>{m}</option>)}</select></Field></div>
            <div className="text-center text-sm" style={{color:C.sub}}>= <span className="text-lg font-bold" style={{color:C.basil,...num}}>{kc}</span> kcal</div>
            <div className="flex items-center gap-2 pt-1"><Btn onClick={saveEntry} style={{flex:1}}><Check size={17} color="#fff"/>{entryEd.mode==="new"?"Inserisci":"Salva modifiche"}</Btn><Btn kind="soft" onClick={()=>setEntryEd(null)}>Annulla</Btn>{entryEd.mode==="edit"&&<Btn kind="ghost" onClick={()=>reqDelEntry(entryEd.id,f.nome)}><Trash2 size={18} color={C.brick}/></Btn>}</div>
          </div>);})()}
      </Sheet>

      <Sheet open={!!foodEd} onClose={()=>setFoodEd(null)} title={foodEd?.id?"Modifica alimento":"Nuovo alimento"}>
        {foodEd&&(<div className="space-y-3"><Field label="Nome"><input value={foodEd.nome} onChange={e=>setFoodEd({...foodEd,nome:e.target.value})} className={inputCls} style={inputStyle}/></Field>
          <div className="flex gap-2"><Field label="Unità" flex><select value={foodEd.unit} onChange={e=>setFoodEd({...foodEd,unit:e.target.value})} className={inputCls} style={inputStyle}><option value="g">per 100 g</option><option value="mL">per 100 mL</option><option value="pezzo">per pezzo</option></select></Field><Field label="kcal" flex><input value={foodEd.kcal} inputMode="decimal" onChange={e=>setFoodEd({...foodEd,kcal:e.target.value})} className={inputCls} style={inputStyle}/></Field></div>
          <Field label="Fonte"><div className="flex gap-2 flex-wrap">{["CREA-INRAN","Confezione","Internet"].map(s=>(<button key={s} onClick={()=>setFoodEd({...foodEd,fonte:s})} className="px-3 py-1.5 rounded-full text-sm" style={{background:foodEd.fonte===s?C.basil:C.chip,color:foodEd.fonte===s?"#fff":C.ink}}>{s}</button>))}</div></Field>
          <Field label="Note"><input value={foodEd.note} onChange={e=>setFoodEd({...foodEd,note:e.target.value})} className={inputCls} style={inputStyle}/></Field>
          <div className="flex items-center gap-2 pt-1"><Btn onClick={saveFood} style={{flex:1}}><Check size={17} color="#fff"/>{foodEd.id?"Salva modifiche":"Inserisci"}</Btn><Btn kind="soft" onClick={()=>setFoodEd(null)}>Annulla</Btn>{foodEd.id&&<Btn kind="ghost" onClick={()=>reqDelFood(foodEd.id,foodEd.nome)}><Trash2 size={18} color={C.brick}/></Btn>}</div>
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
    <div style={{maxHeight:340,overflowY:"auto"}}>{list.map(f=>(<button key={f.id} onClick={()=>onPick(f)} className="w-full flex items-center justify-between px-1 py-2.5 text-left" style={{borderTop:`1px solid ${C.line}`}}><div className="min-w-0"><div className="text-[15px] truncate" style={{color:C.ink}}>{f.nome}</div><div className="text-xs" style={{color:C.sub,...num}}>{f.kcal} kcal / {f.unit==="pezzo"?"pezzo":`100 ${f.unit}`}</div></div><Plus size={20} color={C.basil}/></button>))}{list.length===0&&<div className="text-sm text-center py-6" style={{color:C.sub}}>Nessun alimento.</div>}</div>
  </Sheet>);
}

function AlimentiPage({foods,onEdit,onBulkDelete,lastFood}){
  const [q,setQ]=useState("");const [selectMode,setSelectMode]=useState(false);const [checked,setChecked]=useState({});const itemRefs=useRef({});
  const sorted=useMemo(()=>{const s=q.trim().toLowerCase();const arr=[...foods].sort((a,b)=>a.nome.localeCompare(b.nome));return s?arr.filter(f=>f.nome.toLowerCase().includes(s)):arr;},[q,foods]);
  useEffect(()=>{if(lastFood&&lastFood.id&&itemRefs.current[lastFood.id])itemRefs.current[lastFood.id].scrollIntoView({block:"center",behavior:"smooth"});},[lastFood,foods]);
  const nChecked=Object.values(checked).filter(Boolean).length;let lastL="";
  return(<div className="p-3" style={{paddingBottom:96}}>
    <div className="flex items-center gap-2 mb-3">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1" style={{background:C.card,border:`1px solid ${C.line}`}}><Search size={18} color={C.sub}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cerca alimento…" className="flex-1 outline-none text-[15px]" style={{background:"transparent",color:C.ink}}/></div>
      {selectMode?(<><Btn small kind="danger" onClick={()=>onBulkDelete(Object.keys(checked).filter(k=>checked[k]),()=>{setSelectMode(false);setChecked({});})}><Trash2 size={15} color="#fff"/>{nChecked}</Btn><Btn small kind="soft" onClick={()=>{setSelectMode(false);setChecked({});}}>Fine</Btn></>):(<button onClick={()=>setSelectMode(true)} className="flex items-center gap-1 text-sm shrink-0 px-2" style={{color:C.sub}}><Trash2 size={16} color={C.sub}/> Seleziona</button>)}
    </div>
    <div className="rounded-2xl overflow-hidden" style={{background:C.card,boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
      {sorted.map((f,i)=>{const L=f.nome[0].toUpperCase();const head=L!==lastL;lastL=L;
        return(<div key={f.id} ref={el=>{itemRefs.current[f.id]=el;}}>{head&&<div className="px-3 py-1 text-xs font-bold" style={{background:C.soft,color:C.basilSolidD}}>{L}</div>}
          <div className="w-full flex items-center gap-2 px-3 py-2.5 text-left" style={{borderTop:i&&!head?`1px solid ${C.line}`:"none"}} onClick={()=>{if(selectMode)setChecked(c=>({...c,[f.id]:!c[f.id]}));else onEdit(f);}}>
            {selectMode&&<div className="flex items-center justify-center rounded-md shrink-0" style={{width:22,height:22,border:`2px solid ${checked[f.id]?C.basil:C.line}`,background:checked[f.id]?C.basil:"transparent"}}>{checked[f.id]&&<Check size={15} color="#fff"/>}</div>}
            <div className="min-w-0 flex-1 pr-2"><div className="text-[15px] truncate" style={{color:C.ink}}>{f.nome}</div><div className="text-xs" style={{color:C.sub}}>{f.unit==="pezzo"?"pezzo":`100 ${f.unit}`} · {f.fonte}</div>{f.note&&<div className="text-xs italic mt-0.5" style={{color:C.sub}}>{f.note}</div>}</div>
            <div className="text-[15px] font-semibold shrink-0" style={{color:C.ink,...num}}>{f.kcal}</div>
          </div>
        </div>);})}
    </div>
  </div>);
}

function ImpostazioniPage({settings,mh,setSetting,setHour,bmr,tdee,target,onUpdate,onHeaderFile,onExport,email}){
  const fileRef=useRef(null);
  const numField=(label,key)=>(<div><label className="text-xs font-semibold" style={{color:C.sub}}>{label}</label><input defaultValue={settings[key]} inputMode="decimal" onBlur={e=>setSetting(key,e.target.value===""?0:parseFloat(e.target.value))} className={inputCls} style={inputStyle}/></div>);
  const card={background:C.card,boxShadow:"0 1px 3px rgba(0,0,0,.06)"};
  return(<div className="p-3 space-y-3" style={{paddingBottom:24}}>
    <div className="rounded-2xl p-3 flex items-center justify-between" style={card}><div><div className="font-bold text-[15px]" style={{color:C.ink}}>Aggiornamento</div><div className="text-xs" style={{color:C.sub}}>Ricarica l'app all'ultima versione</div></div><Btn small onClick={onUpdate}><RefreshCw size={15} color="#fff"/>Aggiorna</Btn></div>
    <div className="rounded-2xl p-3 space-y-3" style={card}>
      <div className="font-bold text-[15px]" style={{color:C.ink}}>Dati personali</div>
      <div className="grid grid-cols-2 gap-2">{numField("Altezza (cm)","altezza")}{numField("Peso (kg)","peso")}{numField("Età","eta")}
        <div><label className="text-xs font-semibold" style={{color:C.sub}}>Sesso</label><select value={settings.sesso} onChange={e=>setSetting("sesso",e.target.value)} className={inputCls} style={inputStyle}><option value="M">M</option><option value="F">F</option></select></div>
        <div><label className="text-xs font-semibold" style={{color:C.sub}}>Fattore attività</label><select value={settings.fattore} onChange={e=>setSetting("fattore",parseFloat(e.target.value))} className={inputCls} style={inputStyle}><option value={1.2}>1.2 sedentario</option><option value={1.375}>1.375 leggero</option><option value={1.55}>1.55 moderato</option></select></div>
        {numField("Deficit (kcal)","deficit")}
      </div>
      <div className="grid grid-cols-3 gap-2 pt-1">{[["BMR",roundK(bmr)],["TDEE",roundK(tdee)],["Obiettivo",target]].map(([l,v],i)=>(<div key={l} className="rounded-xl px-2 py-2 text-center" style={{background:i===2?C.basilSolidD:C.soft}}><div className="text-[10px] font-semibold" style={{color:i===2?"rgba(255,255,255,.8)":C.sub}}>{l}</div><div className="text-lg font-extrabold" style={{color:i===2?"#fff":C.ink,...num}}>{v}</div></div>))}</div>
      <div className="text-[11px]" style={{color:C.sub}}>Non scendere sotto ~1500 kcal senza supervisione.</div>
    </div>
    <div className="rounded-2xl p-3 space-y-2" style={card}><div className="font-bold text-[15px]" style={{color:C.ink}}>Orari dei pasti</div><div className="text-xs" style={{color:C.sub}}>Definiscono il pasto automatico all'inserimento. La Cena copre le ore rimanenti.</div>
      {[["colazione","Colazione"],["pranzo","Pranzo"],["aperitivo","Aperitivo"]].map(([k,label])=>(<div key={k} className="flex items-center gap-2"><div className="w-24 text-sm" style={{color:C.ink}}>{label}</div><input defaultValue={mh[k][0]} onBlur={e=>setHour(k,0,e.target.value)} className="w-16 px-2 py-1.5 rounded-lg text-center text-sm" style={inputStyle}/><span style={{color:C.sub}}>–</span><input defaultValue={mh[k][1]} onBlur={e=>setHour(k,1,e.target.value)} className="w-16 px-2 py-1.5 rounded-lg text-center text-sm" style={inputStyle}/><span className="text-xs" style={{color:C.sub}}>h</span></div>))}
    </div>
    <div className="rounded-2xl p-3 space-y-2" style={card}><div className="font-bold text-[15px]" style={{color:C.ink}}>Personalizzazione</div><input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e=>{const file=e.target.files[0];if(file)onHeaderFile(file);}}/><Btn kind="soft" onClick={()=>fileRef.current&&fileRef.current.click()} style={{width:"100%"}}><Upload size={16} color={C.ink}/>Carica immagine header</Btn></div>
    <div className="rounded-2xl p-3 space-y-2" style={card}><div className="font-bold text-[15px]" style={{color:C.ink}}>Backup</div><div className="text-xs" style={{color:C.sub}}>Scarica tutto in un file Excel con i fogli Diario, Alimenti, Impostazioni e Peso.</div><Btn kind="soft" onClick={onExport} style={{width:"100%"}}><Download size={16} color={C.ink}/>Esporta tutto in Excel (.xlsx)</Btn></div>
    <div className="rounded-2xl p-3 flex items-center justify-between" style={card}><div className="min-w-0"><div className="font-bold text-[15px]" style={{color:C.ink}}>Account</div><div className="text-xs truncate" style={{color:C.sub}}>{email}</div></div><Btn small kind="soft" onClick={()=>auth.signOut()}><LogOut size={15} color={C.ink}/>Esci</Btn></div>
    <div className="text-center text-[11px] pt-1" style={{color:C.sub}}>Kcalario</div>
  </div>);
}

/* ------------------------------------------------------------ root */
function Root(){
  const [user,setUser]=useState(undefined);
  useEffect(()=>auth.onAuthStateChanged(u=>setUser(u)),[]);
  if(user===undefined)return(<div className="w-full flex items-center justify-center" style={{minHeight:"100dvh",background:C.paper}}><ScaleIcon size={54}/></div>);
  return user?<Main user={user}/>:<Login/>;
}
ReactDOM.createRoot(document.getElementById("root")).render(<Root/>);
