/* Module « Producteur » : production et minimisation du coût, coûts et profit, exercices générés. */
window.PROD=(function(){
var TH={bg:'#0a1530',grid:'#2b3d73',txt:'#d9bf62',main:'#ffd84d',acc:'#ffb347',ok:'#7fe0a8',wh:'#ffffff'};
var S={tab:'prod',prod:{A:'1',a:'0,5',b:'0,5',w:'4',r:'1',Q:'20',Kf:''},cout:{a:'1',b:'-6',c:'20',F:'32',P:'56'},exo:{type:'tous',ex:null,corr:false},res:null,last:null};

/* ---------- Utilitaires ---------- */
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function num(s){var v=parseFloat(String(s).trim().replace(',','.'));return v}
function fmt(x,d){
  if(d===undefined)d=2;
  if(!isFinite(x))return '—';
  var s=(Math.abs(x)<1e-9?0:x).toFixed(d);
  if(s.indexOf('.')>=0)s=s.replace(/0+$/,'').replace(/\.$/,'');
  return s.replace('.',',').replace(/^-/,'−');
}
function par(x){return x<0?'('+fmt(x)+')':fmt(x)}
function rng(seed){var t=seed>>>0;return function(){t+=0x6D2B79F5;var r=Math.imul(t^t>>>15,1|t);r^=r+Math.imul(r^r>>>7,61|r);return((r^r>>>14)>>>0)/4294967296}}
function pick(R,arr){return arr[Math.floor(R()*arr.length)]}
function toast(t){var e=document.getElementById('toast');if(!e){e=document.createElement('div');e.id='toast';document.body.appendChild(e)}e.textContent=t;e.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(function(){e.classList.remove('on')},2600)}
function bis(f,lo,hi){for(var i=0;i<200;i++){var m=(lo+hi)/2;if(f(m)<0)lo=m;else hi=m}return(lo+hi)/2}

/* ---------- Calculs : production ---------- */
function minCost(p){
  var g=p.a*p.w/(p.b*p.r),s=p.a+p.b;
  var L=Math.pow(p.Q/(p.A*Math.pow(g,p.a)),1/s),K=g*L,C=p.w*L+p.r*K;
  var kappa=(p.w+p.r*g)*Math.pow(p.A*Math.pow(g,p.a),-1/s);
  return {g:g,s:s,L:L,K:K,C:C,kappa:kappa};
}
function prodQ(p,K,L){return p.A*Math.pow(K,p.a)*Math.pow(L,p.b)}
function nature(s){return Math.abs(s-1)<1e-9?'constants':s>1?'croissants':'décroissants'}

/* ---------- Calculs : coûts et profit (CT = aQ³ + bQ² + cQ + F) ---------- */
function coutAnalyse(p){
  var a=p.a,b=p.b,c=p.c,F=p.F,P=p.P;
  var CT=function(Q){return a*Q*Q*Q+b*Q*Q+c*Q+F},Cm=function(Q){return 3*a*Q*Q+2*b*Q+c},CVM=function(Q){return a*Q*Q+b*Q+c},CM=function(Q){return CT(Q)/Q};
  var Qf=b<0?-b/(2*a):0,CVMmin=CVM(Qf),Qr,CMmin;
  if(F<=0){Qr=Qf;CMmin=CVMmin}
  else{
    var h=function(Q){return 2*a*Q*Q*Q+b*Q*Q-F},lo=Math.max(0,-b/(3*a)),hi=lo+1;
    while(h(hi)<0)hi*=2;
    Qr=bis(h,lo,hi);CMmin=CM(Qr);
  }
  var disc=4*b*b-12*a*(c-P),Q=0;
  if(disc>=0){Q=(-2*b+Math.sqrt(disc))/(6*a);if(Q<0)Q=0}
  var Pi=P*Q-CT(Q),produit=Q>0&&P*Q-(CT(Q)-F)>=0;
  if(!produit){Q=0;Pi=-F}
  return {CT:CT,Cm:Cm,CVM:CVM,CM:CM,Qf:Qf,CVMmin:CVMmin,Qr:Qr,CMmin:CMmin,Q:Q,Pi:Pi,produit:produit,disc:disc};
}

/* ---------- Graphiques ---------- */
function nice(max){var e=Math.pow(10,Math.floor(Math.log(max)/Math.LN10)),f=max/e,n=f<=1?1:f<=2?2:f<=5?5:10;return n*e}
function plot(cv,cfg){
  var dpr=window.devicePixelRatio||1,w=cv.clientWidth||320,h=290;
  cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);cv.style.height=h+'px';
  var g=cv.getContext('2d');g.scale(dpr,dpr);g.fillStyle=TH.bg;g.fillRect(0,0,w,h);
  var m={l:46,r:12,t:26,b:34},W=w-m.l-m.r,H=h-m.t-m.b;
  var X=function(x){return m.l+W*x/cfg.xmax},Y=function(y){return m.t+H*(1-y/cfg.ymax)};
  g.font='11px system-ui,sans-serif';g.lineWidth=1;
  var sx=nice(cfg.xmax/5),sy=nice(cfg.ymax/5),v;
  g.strokeStyle=TH.grid;g.fillStyle=TH.txt;g.textAlign='center';
  for(v=0;v<=cfg.xmax+1e-9;v+=sx){g.beginPath();g.moveTo(X(v),m.t);g.lineTo(X(v),m.t+H);g.stroke();g.fillText(fmt(v,v<1?2:0),X(v),m.t+H+14)}
  g.textAlign='right';
  for(v=0;v<=cfg.ymax+1e-9;v+=sy){g.beginPath();g.moveTo(m.l,Y(v));g.lineTo(m.l+W,Y(v));g.stroke();g.fillText(fmt(v,v<1?2:0),m.l-5,Y(v)+4)}
  g.fillStyle=TH.txt;g.textAlign='center';g.fillText(cfg.xl,m.l+W/2,h-6);
  g.save();g.translate(11,m.t+H/2);g.rotate(-Math.PI/2);g.fillText(cfg.yl,0,0);g.restore();
  g.save();g.beginPath();g.rect(m.l,m.t,W,H);g.clip();
  cfg.curves.forEach(function(c){
    g.strokeStyle=c.color;g.lineWidth=c.lw||2;g.setLineDash(c.dash||[]);g.beginPath();
    var first=true;
    c.pts.forEach(function(p){
      if(!isFinite(p[1])||p[1]>cfg.ymax*3||p[1]<-cfg.ymax){first=true;return}
      if(first){g.moveTo(X(p[0]),Y(p[1]));first=false}else g.lineTo(X(p[0]),Y(p[1]));
    });
    g.stroke();
  });
  g.restore();g.setLineDash([]);
  (cfg.points||[]).forEach(function(p){
    if(p.guides){g.strokeStyle=p.color;g.lineWidth=1;g.setLineDash([4,4]);g.beginPath();g.moveTo(X(p.x),Y(p.y));g.lineTo(X(p.x),Y(0));g.moveTo(X(p.x),Y(p.y));g.lineTo(X(0),Y(p.y));g.stroke();g.setLineDash([])}
    g.fillStyle=p.color;g.beginPath();g.arc(X(p.x),Y(p.y),5,0,6.2832);g.fill();
    if(p.label){g.fillStyle=p.color;g.textAlign='left';g.font='bold 12px system-ui,sans-serif';g.fillText(p.label,Math.min(X(p.x)+8,w-90),Y(p.y)-8);g.font='11px system-ui,sans-serif'}
  });
  var lx=m.l+6;g.textAlign='left';g.font='bold 12px system-ui,sans-serif';
  (cfg.curves.filter(function(c){return c.name})).forEach(function(c){g.fillStyle=c.color;g.fillText(c.name,lx,m.t-9);lx+=g.measureText(c.name).width+16});
}
function redraw(){if(S.last&&document.body.contains(S.last.cv))S.last.fn(S.last.cv)}
window.addEventListener('resize',function(){clearTimeout(window.__pdrz);window.__pdrz=setTimeout(redraw,150)});

/* ---------- Onglet 1 : Production ---------- */
function field(id,label,val,mode,aide){return '<label class="f"><span>'+label+'</span><input id="'+id+'" inputmode="'+(mode||'decimal')+'" autocomplete="off" value="'+esc(val)+'">'+(aide?'<small class="aide">'+aide+'</small>':'')+'</label>'}
function tabProd(){
  var p=S.prod;
  return '<section class="card"><h3>Minimisation du coût</h3><p class="muted">Fonction de production Cobb-Douglas Q = A · K<sup>a</sup> · L<sup>b</sup>. Entrez les paramètres, les prix des facteurs et la production visée.</p>'
  +'<div class="grille3">'+field('pd-A','A',p.A)+field('pd-a','a (capital)',p.a)+field('pd-b','b (travail)',p.b)+'</div>'
  +'<div class="grille3">'+field('pd-w','w (prix du travail)',p.w)+field('pd-r','r (prix du capital)',p.r)+field('pd-Q','Q visée',p.Q)+'</div>'
  +'<div class="row"><button class="btn" data-pd="calc-prod">Calculer</button><button class="btn sec" data-pd="ex-prod">Exemple</button></div></section><div id="pd-out"></div>';
}
function calcProd(){
  var p=S.prod;
  ['A','a','b','w','r','Q'].forEach(function(k){p[k]=document.getElementById('pd-'+k).value});
  var v={A:num(p.A),a:num(p.a),b:num(p.b),w:num(p.w),r:num(p.r),Q:num(p.Q)},out=document.getElementById('pd-out');
  var bad=Object.keys(v).some(function(k){return !isFinite(v[k])||v[k]<=0});
  if(bad){out.innerHTML='<section class="card err"><p>Toutes les valeurs doivent être des nombres strictement positifs.</p></section>';return}
  var R=minCost(v),s=R.s;
  var Qopt=prodQ(v,R.K,R.L);
  var h='<section class="card"><h3>Résultat</h3><div class="tuiles"><div class="tuile"><span>L*</span><b>'+fmt(R.L)+'</b></div><div class="tuile"><span>K*</span><b>'+fmt(R.K)+'</b></div><div class="tuile"><span>Coût minimal</span><b>'+fmt(R.C)+'</b></div><div class="tuile"><span>TMST</span><b>'+fmt(v.w/v.r)+'</b></div></div>'
  +'<p><span class="badge">Rendements d\'échelle '+nature(s)+'</span> <span class="muted">a + b = '+fmt(s)+'</span></p>'
  +'<canvas class="chart" id="pd-cv"></canvas><p class="aide">Courbe : isoquante Q = '+fmt(v.Q)+'. Droite : isocoût C = '+fmt(R.C)+'. L\'optimum est le point de tangence.</p></section>';
  h+='<section class="card"><h3>Solution détaillée</h3>'+stepsHtml(stepsMin(v,R))+'<p class="rep"><b>Réponse :</b> L* = '+fmt(R.L)+', K* = '+fmt(R.K)+', coût minimal = '+fmt(R.C)+'. Fonction de coût : CT(Q) = '+fmt(R.kappa,4)+' · Q'+(Math.abs(s-1)<1e-9?'':'<sup>'+fmt(1/s,3)+'</sup>')+'.</p></section>';
  var Kf=num(p.Kf);if(!isFinite(Kf)||Kf<=0){Kf=R.K}
  h+='<section class="card"><h3>Court terme (capital fixe)</h3><label class="f"><span>Capital fixe K̄</span><input id="pd-Kf" inputmode="decimal" value="'+esc(fmt(Kf))+'"></label><button class="btn sec" data-pd="calc-prod">Actualiser le tableau</button><div id="pd-ct">'+tableCT(v,Kf)+'</div></section>';
  out.innerHTML=h;
  var Kf2=document.getElementById('pd-Kf');if(Kf2)Kf2.oninput=function(){var k=num(this.value);S.prod.Kf=this.value;if(isFinite(k)&&k>0)document.getElementById('pd-ct').innerHTML=tableCT(v,k)};
  var cv=document.getElementById('pd-cv');
  var fn=function(c){
    var Lm=Math.max(R.L*2,1),Km=Math.max(R.K*2,1),pts=[],pts2=[],i,l;
    for(i=1;i<=200;i++){l=Lm*i/200;pts.push([l,Math.pow(v.Q/(v.A*Math.pow(l,v.b)),1/v.a)]);pts2.push([l,(R.C-v.w*l)/v.r])}
    plot(c,{xmax:Lm,ymax:Km,xl:'Travail L',yl:'Capital K',curves:[{pts:pts,color:TH.main,name:'Isoquante'},{pts:pts2,color:TH.ok,name:'Isocoût',dash:[6,4]}],points:[{x:R.L,y:R.K,color:TH.acc,label:'Optimum',guides:true}]});
  };
  S.last={cv:cv,fn:fn};fn(cv);
}
function tableCT(v,Kf){
  var h='<table class="tbl"><thead><tr><th>L</th><th>Q</th><th>PM<sub>L</sub></th><th>Pm<sub>L</sub></th></tr></thead><tbody>',L;
  for(L=1;L<=10;L++){var Q=prodQ(v,Kf,L);h+='<tr><td>'+L+'</td><td>'+fmt(Q)+'</td><td>'+fmt(Q/L)+'</td><td>'+fmt(v.b*Q/L)+'</td></tr>'}
  return h+'</tbody></table><p class="aide">Pm<sub>L</sub> = b · Q/L : '+(v.b<1?'la productivité marginale décroît (rendements marginaux décroissants).':'la productivité marginale ne décroît pas pour b ≥ 1.')+'</p>';
}
function stepsMin(v,R){
  var g=R.g,s=R.s;
  var L1=['Pm_L = b·Q/L et Pm_K = a·Q/K, donc TMST = Pm_L/Pm_K = (b/a)·(K/L).','TMST = w/r ⇒ (b/a)·(K/L) = '+fmt(v.w)+'/'+fmt(v.r)+' ⇒ K = '+fmt(g,4)+' · L.'];
  return [
   {titre:'1. Condition d\'optimum',lignes:L1},
   {titre:'2. Contrainte de production',lignes:['Q = A·K^a·L^b ⇒ '+fmt(v.Q)+' = '+fmt(v.A)+' × ('+fmt(g,4)+'·L)^'+fmt(v.a)+' × L^'+fmt(v.b),'⇒ L^'+fmt(s,3)+' = '+fmt(v.Q/(v.A*Math.pow(g,v.a)),4)+' ⇒ L* = '+fmt(R.L,4)+'.','K* = '+fmt(g,4)+' × '+fmt(R.L,4)+' = '+fmt(R.K,4)+'.']},
   {titre:'3. Coût minimal',lignes:['C = w·L* + r·K* = '+fmt(v.w)+' × '+fmt(R.L,4)+' + '+fmt(v.r)+' × '+fmt(R.K,4)+' = '+fmt(R.C,4)+'.']},
   {titre:'4. Rendements d\'échelle',lignes:['a + b = '+fmt(v.a)+' + '+fmt(v.b)+' = '+fmt(s)+' : rendements d\'échelle '+nature(s)+'.','Fonction de coût : CT(Q) = '+fmt(R.kappa,4)+' · Q^'+fmt(1/s,3)+(Math.abs(s-1)<1e-9?' (coût moyen constant égal au coût marginal).':(s>1?' : le coût moyen diminue avec Q (économies d\'échelle).':' : le coût moyen augmente avec Q (déséconomies d\'échelle).'))]}
  ];
}
function stepsHtml(L){return L.map(function(s){return '<div class="step"><h4>'+esc(s.titre)+'</h4>'+s.lignes.map(function(l){return '<div class="ligne">'+esc(l)+'</div>'}).join('')+'</div>'}).join('')}

/* ---------- Onglet 2 : Coûts et profit ---------- */
function tabCout(){
  var c=S.cout;
  return '<section class="card"><h3>Coûts et maximisation du profit</h3><p class="muted">Concurrence parfaite. Coût total CT(Q) = a·Q³ + b·Q² + c·Q + CF, avec a &gt; 0 et CF ≥ 0.</p>'
  +'<div class="grille2">'+field('pc-a','a',c.a)+field('pc-b','b (peut être négatif)',c.b,'text')+'</div><div class="grille3">'+field('pc-c','c',c.c)+field('pc-F','CF (coût fixe)',c.F)+field('pc-P','Prix P',c.P)+'</div>'
  +'<div class="row"><button class="btn" data-pd="calc-cout">Calculer</button><button class="btn sec" data-pd="ex-cout">Exemple</button></div></section><div id="pd-out"></div>';
}
function calcCout(){
  var c=S.cout;['a','b','c','F','P'].forEach(function(k){c[k]=document.getElementById('pc-'+k).value});
  var v={a:num(c.a),b:num(c.b),c:num(c.c),F:num(c.F),P:num(c.P)},out=document.getElementById('pd-out');
  if(Object.keys(v).some(function(k){return !isFinite(v[k])})||v.a<=0||v.F<0||v.P<=0||v.c<=0){out.innerHTML='<section class="card err"><p>Vérifiez les valeurs : a &gt; 0, CF ≥ 0, c &gt; 0 et P &gt; 0.</p></section>';return}
  var R=coutAnalyse(v);
  var warn=(v.c-v.b*v.b/(3*v.a)<=0&&v.b<0)?'<p class="badge warn">Attention : le coût marginal devient négatif pour certaines quantités (paramètres peu réalistes).</p>':'';
  var Q=R.Q;
  var h='<section class="card"><h3>Résultat</h3>'+warn+'<div class="tuiles"><div class="tuile"><span>Production Q*</span><b>'+fmt(Q)+'</b></div><div class="tuile"><span>Profit Π</span><b>'+fmt(R.Pi)+'</b></div><div class="tuile"><span>Seuil de fermeture</span><b>'+fmt(R.CVMmin)+'</b></div><div class="tuile"><span>Seuil de rentabilité</span><b>'+fmt(R.CMmin)+'</b></div></div>'
  +'<p>'+decision(v,R)+'</p><canvas class="chart" id="pd-cv"></canvas><p class="aide">Cm coupe CVM et CM en leur minimum. La courbe d\'offre de l\'entreprise est la partie de Cm située au-dessus du minimum de CVM.</p></section>';
  h+='<section class="card"><h3>Solution détaillée</h3>'+stepsHtml(stepsCout(v,R))+'</section>';
  out.innerHTML=h;
  var cv=document.getElementById('pd-cv');
  var fn=function(cc){
    var Qm=Math.max(R.Qr*1.9,Q*1.4,R.Qf*2.2,1),pts1=[],pts2=[],pts3=[],i,q;
    for(i=1;i<=240;i++){q=Qm*i/240;pts1.push([q,R.Cm(q)]);pts2.push([q,R.CM(q)]);pts3.push([q,R.CVM(q)])}
    var ym=Math.max(v.P*1.35,R.Cm(Qm)*0.6,R.CMmin*1.8);
    plot(cc,{xmax:Qm,ymax:ym,xl:'Quantité Q',yl:'Coûts, prix',curves:[{pts:pts1,color:TH.acc,name:'Cm'},{pts:pts2,color:TH.main,name:'CM'},{pts:pts3,color:TH.ok,name:'CVM'},{pts:[[0,v.P],[Qm,v.P]],color:TH.wh,dash:[5,4],lw:1.5,name:'P'}],points:Q>0?[{x:Q,y:v.P,color:TH.wh,label:'Q*',guides:true}]:[]});
  };
  S.last={cv:cv,fn:fn};fn(cv);
}
function decision(v,R){
  if(!R.produit)return 'Le prix est inférieur au seuil de fermeture (minimum du CVM = '+fmt(R.CVMmin)+') : l\'entreprise <b>arrête de produire</b> et perd uniquement son coût fixe ('+fmt(v.F)+').';
  if(R.Pi>=0)return 'Le prix couvre le coût moyen : l\'entreprise produit <b>'+fmt(R.Q)+'</b> unités et réalise un profit de <b>'+fmt(R.Pi)+'</b>.';
  return 'Le prix est compris entre le seuil de fermeture et le seuil de rentabilité : l\'entreprise <b>produit '+fmt(R.Q)+' unités à perte</b> ('+fmt(R.Pi)+'), perte inférieure à son coût fixe ('+fmt(v.F)+').';
}
function stepsCout(v,R){
  var poly=function(a,b,c,d){return fmt(a)+'Q³ '+(b<0?'− ':'+ ')+fmt(Math.abs(b))+'Q² '+(c<0?'− ':'+ ')+fmt(Math.abs(c))+'Q'+(d?' + '+fmt(d):'')};
  var L=[];
  L.push({titre:'1. Fonctions de coût',lignes:['CF = '+fmt(v.F)+' ; CV = '+poly(v.a,v.b,v.c,0)+'.','CVM = '+fmt(v.a)+'Q² '+(v.b<0?'− ':'+ ')+fmt(Math.abs(v.b))+'Q + '+fmt(v.c)+' ; CM = CVM + '+fmt(v.F)+'/Q.','Cm = dCT/dQ = '+fmt(3*v.a)+'Q² '+(v.b<0?'− ':'+ ')+fmt(Math.abs(2*v.b))+'Q + '+fmt(v.c)+'.']});
  L.push({titre:'2. Seuil de fermeture',lignes:[v.b<0?'Minimum du CVM : d(CVM)/dQ = 2aQ + b = 0 ⇒ Q = '+fmt(R.Qf,4)+' ; CVM = '+fmt(R.CVMmin,4)+' (= Cm en ce point).':'Pour b ≥ 0, le CVM est croissant : son minimum est c = '+fmt(R.CVMmin)+' (en Q = 0).','Seuil de fermeture : P = '+fmt(R.CVMmin,4)+'.']});
  L.push({titre:'3. Seuil de rentabilité',lignes:[v.F>0?'Minimum du CM : 2aQ³ + bQ² − CF = 0 (résolue numériquement) ⇒ Q = '+fmt(R.Qr,4)+' ; CM = '+fmt(R.CMmin,4)+' (= Cm).':'Sans coût fixe, CM = CVM.','Seuil de rentabilité : P = '+fmt(R.CMmin,4)+'.']});
  var l4=['Condition : P = Cm avec Cm croissant ⇒ '+fmt(3*v.a)+'Q² '+(v.b<0?'− ':'+ ')+fmt(Math.abs(2*v.b))+'Q + '+fmt(v.c)+' = '+fmt(v.P)+'.'];
  if(R.disc>=0){var q1=(-2*v.b+Math.sqrt(R.disc))/(6*v.a);l4.push('Racine retenue (Cm croissant : Cm\' = 6aQ + 2b > 0) : Q = '+fmt(q1,4)+'.');}
  else l4.push('Cm reste supérieur à P pour tout Q : aucune solution, donc Q = 0.');
  if(R.produit){l4.push('RT = '+fmt(v.P)+' × '+fmt(R.Q,4)+' = '+fmt(v.P*R.Q,4)+' ; CT = '+fmt(R.CT(R.Q),4)+'.','Profit Π = RT − CT = '+fmt(R.Pi,4)+'.')}
  else l4.push('P < CVM(Q) : l\'entreprise ne couvre pas ses coûts variables ⇒ Q = 0 et Π = −CF = '+fmt(-v.F)+'.');
  L.push({titre:'4. Production optimale pour P = '+fmt(v.P),lignes:l4});
  L.push({titre:'5. Courbe d\'offre',lignes:['Pour P ≥ '+fmt(R.CVMmin,4)+' : Q(P) = [−b + √(b² − 3a(c − P))] / (3a).','Pour P < '+fmt(R.CVMmin,4)+' : Q = 0.']});
  return L;
}

/* ---------- Onglet 3 : Exercices générés ---------- */
var TYPES={cm:'Minimisation du coût',pf:'Coûts et profit',re:'Rendements et TMST'};
function genCM(R){
  var combos=[[0.5,0.5],[0.4,0.6],[0.3,0.7],[0.25,0.75],[0.3,0.5],[0.6,0.6]];
  var ab=pick(R,combos),A=pick(R,[1,1,2]),w=pick(R,[2,3,4,5,6,8]),r=pick(R,[1,2,3,4]),Q=pick(R,[20,30,40,50,60,100]);
  var v={A:A,a:ab[0],b:ab[1],w:w,r:r,Q:Q},M=minCost(v),s=M.s;
  var v2={A:A,a:ab[0],b:ab[1],w:2*w,r:r,Q:Q},M2=minCost(v2);
  var steps=stepsMin(v,M);
  steps.push({titre:'5. Le prix du travail double (w = '+fmt(2*w)+')',lignes:['K/L = (a/b)·(w/r) passe à '+fmt(M2.g,4)+' (au lieu de '+fmt(M.g,4)+').','Nouveau optimum : L = '+fmt(M2.L,4)+' ; K = '+fmt(M2.K,4)+' ; C = '+fmt(M2.C,4)+'.','Le travail devient relativement plus cher : l\'entreprise substitue du capital au travail (L baisse de '+fmt(100*(1-M2.L/M.L),1)+' %, K augmente de '+fmt(100*(M2.K/M.K-1),1)+' %). Le coût augmente de '+fmt(100*(M2.C/M.C-1),1)+' %, moins que 100 % grâce à la substitution.']});
  return {titre:'Minimisation du coût (Cobb-Douglas)',niveau:'Moyen',
    enonce:['Une entreprise a pour fonction de production Q = '+(A===1?'':fmt(A)+' · ')+'K^'+fmt(v.a)+' · L^'+fmt(v.b)+'. Le prix du travail est w = '+w+' et celui du capital est r = '+r+'. Elle veut produire Q = '+Q+' au moindre coût.'],
    questions:['Déterminer la nature des rendements d\'échelle.','Écrire la condition d\'optimum (TMST = w/r) et en déduire K en fonction de L.','Calculer les quantités optimales L* et K* ainsi que le coût minimal.','Déterminer la fonction de coût CT(Q).','Le prix du travail double (w = '+(2*w)+'). Calculer la nouvelle combinaison optimale et commenter.'],
    steps:steps,resume:'L* = '+fmt(M.L)+', K* = '+fmt(M.K)+', coût minimal = '+fmt(M.C)+' ; rendements d\'échelle '+nature(s)+'. Après le doublement de w : L = '+fmt(M2.L)+', K = '+fmt(M2.K)+', C = '+fmt(M2.C)+'.'};
}
function genPF(R){
  var n=pick(R,[2,3,4,5]),e=pick(R,[4,6,8,10,12]),F=pick(R,[16,24,32,48,54,64]),Q0=n+pick(R,[2,3,4,5]);
  var a=1,b=-2*n,c=2*n*n+e,P=3*Q0*Q0+2*b*Q0+c,v={a:a,b:b,c:c,F:F,P:P},A=coutAnalyse(v);
  var P2=Math.round(A.CVMmin)-2,v2={a:a,b:b,c:c,F:F,P:P2},A2=coutAnalyse(v2);
  var steps=stepsCout(v,A);
  steps.push({titre:'6. Cas P = '+P2,lignes:['P = '+P2+' < '+fmt(A.CVMmin,4)+' (minimum du CVM) : la recette ne couvre pas les coûts variables.','L\'entreprise arrête de produire (Q = 0) et perd uniquement son coût fixe : Π = −'+F+'.']});
  return {titre:'Coûts, profit et courbe d\'offre',niveau:'Difficile',
    enonce:['Une entreprise en concurrence parfaite a pour coût total CT(Q) = Q³ '+(b<0?'− ':'+ ')+Math.abs(b)+'Q² + '+c+'Q + '+F+'.'],
    questions:['Déterminer CF, CV, CVM, CM et Cm.','Calculer le seuil de fermeture et le seuil de rentabilité (à 0,01 près).','Le prix du marché est P = '+P+'. Calculer la production optimale et le profit.','Que fait l\'entreprise si le prix tombe à P = '+P2+' ?'],
    steps:steps,resume:'Fermeture : P = '+fmt(A.CVMmin)+' (Q = '+fmt(A.Qf)+'). Rentabilité : P = '+fmt(A.CMmin)+' (Q = '+fmt(A.Qr)+'). Pour P = '+P+' : Q* = '+fmt(A.Q)+' et Π = '+fmt(A.Pi)+'. Pour P = '+P2+' : arrêt de la production (Π = −'+F+').'};
}
function genRE(R){
  var ab=pick(R,[[0.5,0.5],[0.4,0.6],[0.3,0.7],[0.3,0.5],[0.6,0.6],[0.5,0.8],[0.25,0.75]]),A=pick(R,[1,2,3]),K0=pick(R,[4,8,9,16,25]),L0=pick(R,[4,9,16,25,36]);
  var a=ab[0],b=ab[1],s=a+b,Q0=A*Math.pow(K0,a)*Math.pow(L0,b),PmL=b*Q0/L0,PmK=a*Q0/K0,Q1=A*Math.pow(2*K0,a)*Math.pow(2*L0,b),ratio=Math.pow(2,s);
  var steps=[
   {titre:'1. Production initiale',lignes:['Q = '+fmt(A)+' × '+K0+'^'+fmt(a)+' × '+L0+'^'+fmt(b)+' = '+fmt(Q0,4)+'.']},
   {titre:'2. Productivités marginales',lignes:['Pm_L = ∂Q/∂L = b·Q/L = '+fmt(b)+' × '+fmt(Q0,4)+' / '+L0+' = '+fmt(PmL,4)+'.','Pm_K = ∂Q/∂K = a·Q/K = '+fmt(a)+' × '+fmt(Q0,4)+' / '+K0+' = '+fmt(PmK,4)+'.','Les deux sont décroissantes (a < 1 et b < 1) : loi des rendements marginaux décroissants.']},
   {titre:'3. TMST',lignes:['TMST = Pm_L / Pm_K = '+fmt(PmL,4)+' / '+fmt(PmK,4)+' = '+fmt(PmL/PmK,4)+'.','Vérification : (b/a)·(K/L) = ('+fmt(b)+'/'+fmt(a)+') × ('+K0+'/'+L0+') = '+fmt(b/a*K0/L0,4)+'.','Interprétation : pour garder Q constant, 1 unité de travail en plus permet de renoncer à '+fmt(PmL/PmK,3)+' unité(s) de capital.']},
   {titre:'4. Rendements d\'échelle',lignes:['f(2K ; 2L) = 2^(a+b) · f(K ; L) avec a + b = '+fmt(s)+'.','2^'+fmt(s)+' = '+fmt(ratio,4)+' ⇒ Q passe de '+fmt(Q0,4)+' à '+fmt(Q1,4)+'.','Rendements d\'échelle '+nature(s)+' : en doublant les facteurs, la production est multipliée par '+fmt(ratio,3)+(Math.abs(s-1)<1e-9?' (exactement 2).':(s>1?' (plus de 2).':' (moins de 2).'))]}
  ];
  return {titre:'Productivités, TMST et rendements d\'échelle',niveau:'Moyen',
    enonce:['Une entreprise a pour fonction de production Q = '+(A===1?'':A+' · ')+'K^'+fmt(a)+' · L^'+fmt(b)+'. On se place au point K = '+K0+' ; L = '+L0+'.'],
    questions:['Calculer la production Q.','Calculer les productivités marginales Pm_L et Pm_K. Que dire de leur évolution ?','Calculer le TMST et l\'interpréter.','On double K et L. Que devient la production ? Quelle est la nature des rendements d\'échelle ?'],
    steps:steps,resume:'Q = '+fmt(Q0)+' ; Pm_L = '+fmt(PmL)+' ; Pm_K = '+fmt(PmK)+' ; TMST = '+fmt(PmL/PmK)+' ; en doublant K et L, Q est multipliée par '+fmt(ratio,3)+' : rendements d\'échelle '+nature(s)+'.'};
}
function genExo(seed,type){
  var R=rng(seed),ex=type==='cm'?genCM(R):type==='pf'?genPF(R):genRE(R);
  ex.code=seed+'-'+type;ex.type=type;return ex;
}
function newExo(seed,type){
  var t=type||(S.exo.type==='tous'?pick(Math.random,['cm','pf','re']):S.exo.type);
  S.exo.ex=genExo(seed||Math.floor(Math.random()*900000)+100000,t);S.exo.corr=false;
}
function tabExo(){
  var e=S.exo;
  var h='<section class="card"><h3>Générateur d\'exercices</h3><p class="muted">Chaque exercice est généré avec un code : notez-le pour retrouver le même énoncé plus tard.</p>'
  +'<label class="f"><span>Type d\'exercice</span><select id="pd-type"><option value="tous"'+(e.type==='tous'?' selected':'')+'>Tous les types</option>'+Object.keys(TYPES).map(function(k){return '<option value="'+k+'"'+(e.type===k?' selected':'')+'>'+TYPES[k]+'</option>'}).join('')+'</select></label>'
  +'<div class="row"><button class="btn" data-pd="new">Nouvel exercice</button></div>'
  +'<div class="grille-code"><label class="f"><span>Retrouver un exercice par son code</span><input id="pd-code" placeholder="ex. 482910-cm" autocapitalize="off"></label><button class="btn sec" data-pd="load">Charger</button></div></section><div id="pd-ex"></div>';
  return h;
}
function showExo(){
  var e=S.exo.ex,z=document.getElementById('pd-ex');if(!z)return;
  if(!e){z.innerHTML='';return}
  var h='<section class="card"><span class="badge">'+esc(e.niveau)+'</span> <span class="muted">Code : <b>'+e.code+'</b></span><h3>'+esc(e.titre)+'</h3>'+e.enonce.map(function(t){return '<p>'+esc(t)+'</p>'}).join('')+'<h4>Questions</h4><ol class="qs">'+e.questions.map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ol><div class="row"><button class="btn" data-pd="corr">'+(S.exo.corr?'Masquer le corrigé':'Afficher le corrigé')+'</button></div>';
  if(S.exo.corr)h+='<div class="corrige"><h3>Corrigé détaillé</h3>'+stepsHtml(e.steps)+'<p class="rep"><b>Réponse :</b> '+esc(e.resume)+'</p></div>';
  z.innerHTML=h+'</section>';
}

/* ---------- Rendu principal ---------- */
var TABS=[['prod','Production'],['cout','Coûts et profit'],['exo','Exercices']];
function render(v){
  S.last=null;
  var h='<div id="pd-root"><div class="seg">'+TABS.map(function(t){return '<button data-pd="tab" data-t="'+t[0]+'" class="'+(S.tab===t[0]?'on':'')+'">'+t[1]+'</button>'}).join('')+'</div>';
  h+=S.tab==='prod'?tabProd():S.tab==='cout'?tabCout():tabExo();
  h+='<section class="card"><h3>Réviser ce chapitre</h3><div class="row"><button class="btn sec" data-rv="quiz" data-ch="prod">Quiz du chapitre</button><button class="btn sec" data-rv="exos" data-ch="prod">Exercices corrigés</button><button class="btn ghost" data-anc-go="prod">Théorie</button></div></section></div>';
  v.innerHTML=h;
  if(S.tab==='prod')calcProd();else if(S.tab==='cout')calcCout();else{if(!S.exo.ex)newExo();showExo()}
}
document.addEventListener('click',function(ev){
  var b=ev.target.closest('[data-pd]');if(!b||!document.getElementById('pd-root'))return;
  var a=b.dataset.pd,v=document.getElementById('view');
  if(a==='tab'){S.tab=b.dataset.t;render(v);window.scrollTo(0,0)}
  else if(a==='calc-prod')calcProd();
  else if(a==='calc-cout')calcCout();
  else if(a==='ex-prod'){S.prod={A:'1',a:'0,5',b:'0,5',w:'4',r:'1',Q:'20',Kf:''};render(v)}
  else if(a==='ex-cout'){S.cout={a:'1',b:'-6',c:'20',F:'32',P:'56'};render(v)}
  else if(a==='new'){newExo();showExo()}
  else if(a==='load'){
    var m=document.getElementById('pd-code').value.trim().match(/^(\d+)-(cm|pf|re)$/);
    if(!m){toast('Code invalide (exemple : 482910-cm).');return}
    S.exo.type=m[2];newExo(parseInt(m[1],10),m[2]);render(v);
  }
  else if(a==='corr'){S.exo.corr=!S.exo.corr;showExo()}
});
document.addEventListener('change',function(ev){var t=ev.target;if(t&&t.id==='pd-type')S.exo.type=t.value});
document.addEventListener('keydown',function(ev){
  if(ev.key!=='Enter'||!document.getElementById('pd-root')||!ev.target.matches('input'))return;
  if(/^pd-[A-Za-z]+$/.test(ev.target.id)&&ev.target.id!=='pd-Kf'&&ev.target.id!=='pd-code')calcProd();
  else if(/^pc-/.test(ev.target.id))calcCout();
});
return {render:render,_m:{minCost:minCost,coutAnalyse:coutAnalyse,genExo:genExo,prodQ:prodQ,fmt:fmt}};
})();
