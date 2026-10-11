/* Module « Réviser » : quiz par chapitre, examen blanc, questions à revoir, exercices corrigés. */
window.REV=(function(){
var D=REV_DATA,KEY='microeco.rev';
var S={screen:'home',ch:null,exam:false,titre:'',qs:[],i:0,sel:null,ans:[]};
var HUB={producteur:'prod',marche:'march',elasticites:'elast'};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function chap(id){for(var i=0;i<D.CH.length;i++)if(D.CH[i].id===id)return D.CH[i]}
function load(){try{var o=JSON.parse(localStorage.getItem(KEY));if(o&&typeof o==='object')return o}catch(e){}return {}}
function save(o){try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}}
function prog(){var p=load();p.best=p.best||{};p.wrong=p.wrong||{};p.done=p.done||0;p.ok=p.ok||0;p.exam=p.exam||[];return p}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function prep(ch,i){var it=D.QUIZ[ch][i];return {id:ch+'-'+i,ch:ch,q:it.q,x:it.x,b:it.b,o:shuffle([it.b].concat(it.m))}}
function nQ(ch){return D.QUIZ[ch].length}
function all(){var r=[];D.CH.forEach(function(c){for(var i=0;i<nQ(c.id);i++)r.push(prep(c.id,i))});return r}
function view(){return document.getElementById('view')}
function bar(v,m){return '<div class="pbar"><i style="width:'+Math.round(100*v/Math.max(m,1))+'%"></i></div>'}
function pct(a,b){return b?Math.round(100*a/b):0}

/* ---------- Accueil ---------- */
function home(v){
  var p=prog(),nw=Object.keys(p.wrong).length,last=p.exam[0];
  var h='<section class="card"><h2>Réviser</h2><p class="muted">Quiz par chapitre, examen blanc et exercices corrigés pour préparer vos contrôles.</p>';
  h+='<div class="tuiles"><div class="tuile"><span>Questions traitées</span><b>'+p.done+'</b></div><div class="tuile"><span>Réussite</span><b>'+(p.done?pct(p.ok,p.done)+' %':'—')+'</b></div><div class="tuile"><span>À revoir</span><b>'+nw+'</b></div></div></section>';
  h+='<section class="card"><h3>Par chapitre</h3>';
  D.CH.forEach(function(c){
    var b=p.best[c.id],n=nQ(c.id),ne=D.EXO[c.id].length;
    h+='<div class="chap"><div class="chap-t"><b>'+esc(c.titre)+'</b><span class="muted">'+n+' questions · '+ne+' exercices corrigés'+(b?' · meilleur score '+b.s+'/'+b.n:'')+'</span>'+(b?bar(b.s,b.n):'')+'</div><div class="row"><button class="btn" data-rv="quiz" data-ch="'+c.id+'">Quiz</button><button class="btn sec" data-rv="exos" data-ch="'+c.id+'">Exercices</button><button class="btn ghost" data-anc-go="'+c.cle+'">Théorie</button></div></div>';
  });
  h+='</section><section class="card"><h3>Entraînement</h3><div class="row"><button class="btn" data-rv="exam">Examen blanc (20 questions)</button><button class="btn sec" data-rv="revoir"'+(nw?'':' disabled')+'>À revoir ('+nw+')</button></div>';
  h+='<p class="aide">L\'examen blanc tire 4 questions par chapitre, sans correction avant la fin, et donne une note sur 20.</p>';
  if(last){h+='<h4>Derniers examens blancs</h4><div class="hist">'+p.exam.slice(0,5).map(function(e){return '<div class="hitem"><b>'+e.s+'/20</b> '+esc(e.d)+'</div>'}).join('')+'</div>'}
  h+='</section>';
  var lock=false;try{lock=!!localStorage.getItem('me_key')}catch(e){}
  h+='<section class="card"><h3>Options</h3><div class="row"><button class="btn ghost" data-rv="reset">Effacer ma progression</button>'+(lock?'<button class="btn ghost" data-rv="lock">Verrouiller l\'application</button>':'')+'</div></section>';
  v.innerHTML=h;
}

/* ---------- Quiz ---------- */
function start(titre,qs,exam,ch){S.screen='q';S.titre=titre;S.qs=qs;S.i=0;S.sel=null;S.ans=[];S.exam=!!exam;S.ch=ch||null;draw()}
function question(v){
  var q=S.qs[S.i],n=S.qs.length,answered=S.sel!==null,fb=answered&&!S.exam;
  var h='<section class="card"><div class="qtop"><span class="badge">'+esc(S.titre)+'</span><span class="muted">Question '+(S.i+1)+' / '+n+'</span></div>'+bar(S.i+(answered?1:0),n);
  h+='<h3 class="qq">'+esc(q.q)+'</h3>';
  q.o.forEach(function(o,k){
    var c='opt';
    if(fb){if(o===q.b)c+=' ok';else if(k===S.sel)c+=' ko'}
    else if(answered&&k===S.sel)c+=' sel';
    h+='<button class="'+c+'" data-rv="opt" data-k="'+k+'"'+(answered&&!S.exam?' disabled':'')+'>'+esc(o)+'</button>';
  });
  if(fb){
    var good=q.o[S.sel]===q.b;
    h+='<div class="expl '+(good?'good':'bad')+'"><b>'+(good?'Bonne réponse.':'Mauvaise réponse.')+'</b> '+(good?'':'La bonne réponse est : « '+esc(q.b)+' ». ')+esc(q.x)+'</div>';
  }
  h+='<div class="row">';
  if(answered)h+='<button class="btn" data-rv="next">'+(S.i+1<n?'Question suivante':'Voir le résultat')+'</button>';
  h+='<button class="btn ghost" data-rv="quit">Quitter</button></div></section>';
  v.innerHTML=h;
}
function answer(k){
  if(S.screen!=='q')return;
  if(S.sel!==null&&!S.exam)return;
  var q=S.qs[S.i];S.sel=k;S.ans[S.i]=q.o[k];draw();
}
function next(){
  if(S.sel===null)return;
  if(S.i+1<S.qs.length){S.i++;S.sel=null;draw();window.scrollTo(0,0)}else finish();
}
function finish(){
  var p=prog(),sc=0,n=S.qs.length;
  S.qs.forEach(function(q,i){
    var ok=S.ans[i]===q.b;p.done++;if(ok){p.ok++;sc++;delete p.wrong[q.id]}else p.wrong[q.id]=1;
  });
  if(S.exam){var d=new Date();p.exam.unshift({s:sc,d:d.toLocaleDateString('fr-FR')+' '+d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})});p.exam=p.exam.slice(0,10)}
  else if(S.ch){var b=p.best[S.ch];if(!b||sc/n>=b.s/b.n)p.best[S.ch]={s:sc,n:n}}
  save(p);S.screen='r';S.score=sc;draw();window.scrollTo(0,0);
}
function result(v){
  var n=S.qs.length,sc=S.score,r=sc/n;
  var msg=r>=0.8?'Très bien : les notions sont acquises.':r>=0.5?'Assez bien : revoyez les points ci-dessous.':'À retravailler : relisez la théorie du chapitre puis recommencez.';
  var note=S.exam?'<b class="big">'+sc+' / '+n+'</b>':'<b class="big">'+sc+' / '+n+'</b> <span class="muted">('+pct(sc,n)+' %)</span>';
  var h='<section class="card"><h2>Résultat</h2><p class="score">'+note+'</p><p>'+msg+'</p>'+bar(sc,n);
  var wrong=[];S.qs.forEach(function(q,i){if(S.ans[i]!==q.b)wrong.push(i)});
  h+='<div class="row">';
  if(wrong.length)h+='<button class="btn" data-rv="retry">Refaire les '+wrong.length+' erreur'+(wrong.length>1?'s':'')+'</button>';
  h+='<button class="btn sec" data-rv="again">Recommencer</button><button class="btn ghost" data-rv="home">Accueil</button></div>';
  if(S.ch&&r<0.8)h+='<div class="row"><button class="btn ghost" data-anc-go="'+chap(S.ch).cle+'">Revoir la théorie</button></div>';
  h+='</section>';
  if(wrong.length){
    h+='<section class="card"><h3>Corrections</h3>';
    wrong.forEach(function(i){var q=S.qs[i];
      h+='<div class="corr"><p><b>'+esc(q.q)+'</b></p><p class="ko-t">Votre réponse : '+esc(S.ans[i]||'—')+'</p><p class="ok-t">Bonne réponse : '+esc(q.b)+'</p><p class="muted">'+esc(q.x)+'</p></div>';
    });
    h+='</section>';
  }
  v.innerHTML=h;
}

/* ---------- Exercices ---------- */
function exos(v,ch){
  var c=chap(ch),L=D.EXO[ch];
  var h='<section class="card"><h2>Exercices corrigés</h2><p class="muted">'+esc(c.titre)+' · '+L.length+' exercices. Cherchez d\'abord, puis ouvrez le corrigé détaillé.</p><div class="row"><button class="btn sec" data-rv="quiz" data-ch="'+ch+'">Quiz du chapitre</button><button class="btn ghost" data-anc-go="'+c.cle+'">Théorie</button><button class="btn ghost" data-rv="home">Accueil</button></div></section>';
  L.forEach(function(e,k){
    h+='<details class="sec exo"'+(k===0?' open':'')+'><summary><span>Exercice '+(k+1)+' — '+esc(e.titre)+'</span><b class="n">'+esc(e.niveau)+'</b></summary><div class="exo-b">';
    h+=e.enonce.map(function(t){return '<p>'+esc(t)+'</p>'}).join('');
    h+='<h4>Questions</h4><ol class="qs">'+e.questions.map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ol>';
    h+='<details class="demo"><summary>Afficher le corrigé détaillé</summary><div class="corrige">'+e.corrige.map(function(s){return '<div class="step"><h4>'+esc(s.titre)+'</h4>'+s.lignes.map(function(l){return '<div class="ligne">'+esc(l)+'</div>'}).join('')+'</div>'}).join('')+'<p class="rep"><b>Réponse :</b> '+esc(e.rep)+'</p></div></details>';
    h+='</div></details>';
  });
  v.innerHTML=h;
}

/* ---------- Pages d'accueil de chapitre (Producteur, Marché, Élasticités) ---------- */
function hub(r,v){
  var ch=HUB[r],c=chap(ch);
  v.innerHTML='<section class="card"><h2>'+esc(c.titre)+'</h2><p class="muted">Révisez ce chapitre : '+nQ(ch)+' questions de quiz et '+D.EXO[ch].length+' exercices corrigés. Le module de calcul interactif de ce chapitre sera ajouté ultérieurement.</p><div class="row"><button class="btn" data-rv="quiz" data-ch="'+ch+'">Quiz du chapitre</button><button class="btn sec" data-rv="exos" data-ch="'+ch+'">Exercices corrigés</button><button class="btn ghost" data-anc-go="'+c.cle+'">Théorie</button></div></section>';
}

/* ---------- Dessin ---------- */
function draw(){
  var v=view();if(!v)return;
  v.innerHTML='';
  if(S.screen==='q')question(v);else if(S.screen==='r')result(v);else if(S.screen==='x')exos(v,S.ch);else home(v);
}
function render(v){S.screen='home';home(v);window.scrollTo(0,0)}

function top(){window.scrollTo(0,0)}
function pool(ch){return shuffle(Array.apply(null,Array(nQ(ch))).map(function(_,i){return prep(ch,i)}))}
function startQuiz(ch){start('Quiz · '+chap(ch).court,pool(ch),false,ch);top()}
function startExam(){var q=[];D.CH.forEach(function(c){q=q.concat(pool(c.id).slice(0,4))});start('Examen blanc',shuffle(q),true,null);top()}
function startRevoir(){var w=prog().wrong,L=all().filter(function(q){return w[q.id]});if(!L.length)return;start('À revoir',shuffle(L),false,null);top()}

document.addEventListener('click',function(ev){
  var b=ev.target.closest('[data-rv]');if(!b||b.disabled||!view())return;
  var a=b.dataset.rv,ch=b.dataset.ch;
  if(a==='quiz')startQuiz(ch);
  else if(a==='exos'){S.screen='x';S.ch=ch;draw();top()}
  else if(a==='exam')startExam();
  else if(a==='revoir')startRevoir();
  else if(a==='opt')answer(+b.dataset.k);
  else if(a==='next')next();
  else if(a==='quit'||a==='home'){S.screen='home';draw();top()}
  else if(a==='again'){if(S.exam)startExam();else if(S.ch)startQuiz(S.ch);else startRevoir()}
  else if(a==='retry'){var ws=S.qs.filter(function(q,i){return S.ans[i]!==q.b}).map(function(q){return prep(q.ch,+q.id.split('-')[1])});start(S.exam?'Examen blanc · erreurs':S.titre,shuffle(ws),false,S.exam?null:S.ch);top()}
  else if(a==='reset'){if(confirm('Effacer toute votre progression (scores, questions à revoir) ?')){try{localStorage.removeItem(KEY)}catch(e){}draw()}}
  else if(a==='lock'){try{localStorage.removeItem('me_key')}catch(e){}location.reload()}
});

return {render:render,hub:hub,draw:draw};
})();
