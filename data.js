/* Données : chapitres, quiz (QCM) et exercices corrigés. */
var REV_DATA=(function(){
var CH=[
 {id:'fond',titre:'Notions fondamentales',court:'Fondamentaux',cle:'fond'},
 {id:'cons',titre:'Théorie du consommateur',court:'Consommateur',cle:'cons'},
 {id:'prod',titre:'Théorie du producteur',court:'Producteur',cle:'prod'},
 {id:'march',titre:'Marchés et équilibre',court:'Marchés',cle:'march'},
 {id:'elast',titre:'Élasticités',court:'Élasticités',cle:'elast'}
];
/* q(énoncé, bonne réponse, [3 mauvaises], explication) */
function q(e,b,m,x){return {q:e,b:b,m:m,x:x}}
var QUIZ={
fond:[
q("Que signifie la « rareté » en économie ?","Les ressources sont limitées alors que les besoins sont illimités",["Un bien est temporairement indisponible en magasin","Les prix sont élevés","Seuls les pays pauvres manquent de ressources"],"La rareté est relative : elle concerne tous les agents et oblige à faire des choix, même dans une économie riche."),
q("Le coût d'opportunité d'un choix est :","La valeur de la meilleure alternative abandonnée",["La somme d'argent dépensée","Le coût de production du bien choisi","La somme de toutes les alternatives abandonnées"],"On ne retient que la meilleure option sacrifiée, pas toutes les options. Il peut être non monétaire (temps, plaisir)."),
q("L'expression « ceteris paribus » signifie :","Toutes choses égales par ailleurs",["Au même prix","À long terme","En moyenne"],"On étudie l'effet d'une variable en maintenant toutes les autres constantes."),
q("La microéconomie étudie principalement :","Les décisions des agents individuels (ménages, entreprises) et leurs interactions sur les marchés",["L'inflation et le chômage au niveau national","Le commerce international uniquement","Les finances publiques de l'État"],"La macroéconomie traite des agrégats (PIB, inflation, chômage) ; la microéconomie part des comportements individuels."),
q("Une variable exogène est une variable :","Déterminée en dehors du modèle et donnée pour l'analyse",["Calculée à l'intérieur du modèle","Toujours égale à zéro","Qui ne varie jamais dans la réalité"],"Exemple : le revenu dans un modèle de marché. Les variables endogènes (prix, quantité) sont expliquées par le modèle."),
q("Parmi ces énoncés, lequel est un jugement normatif ?","« Le salaire minimum devrait être relevé »",["« Une hausse du prix réduit en général la quantité demandée »","« Le chômage a augmenté de 2 points »","« L'élasticité-prix de ce bien vaut −0,5 »"],"Un énoncé normatif exprime un jugement de valeur (« devrait »). Un énoncé positif décrit ce qui est et peut être testé."),
q("Dans le Lagrangien L = f(x ; y) + λ·(c − g(x ; y)), le multiplicateur λ à l'optimum mesure :","La variation de la valeur optimale de f quand c augmente d'une unité",["La valeur de f à l'optimum","La pente de la contrainte","Le nombre de variables du problème"],"λ* = df*/dc : c'est la valeur marginale de la contrainte (prix implicite)."),
q("Un agent est dit « rationnel » lorsqu'il :","Choisit l'option qui lui paraît la meilleure compte tenu de ses objectifs, de ses contraintes et de son information",["Ne se trompe jamais","Ne pense qu'à l'argent","Imite le comportement des autres agents"],"La rationalité est une cohérence entre objectifs et choix, pas une omniscience."),
q("L'analyse en équilibre partiel consiste à :","Étudier un marché isolé en supposant les autres marchés inchangés",["Étudier tous les marchés simultanément","Étudier seulement la moitié des consommateurs","Étudier uniquement le court terme"],"L'équilibre général prend en compte les interdépendances entre tous les marchés."),
q("La statique comparative consiste à :","Comparer deux positions d'équilibre avant et après un changement d'un paramètre exogène",["Décrire pas à pas le chemin d'ajustement dans le temps","Comparer deux pays","Étudier un marché sans offre"],"Elle ignore la dynamique d'ajustement et compare seulement les équilibres initial et final."),
q("Une économie peut produire soit 40 t de blé, soit 100 t de maïs (frontière linéaire). Le coût d'opportunité d'une tonne de blé est :","2,5 t de maïs",["0,4 t de maïs","60 t de maïs","40 t de maïs"],"100 / 40 = 2,5 t de maïs sacrifiées pour 1 t de blé supplémentaire (et inversement 0,4 t de blé par tonne de maïs)."),
q("On maximise f(x, y) = x·y sous la contrainte x + y = 20. La solution est :","x = 10 ; y = 10",["x = 20 ; y = 0","x = 5 ; y = 15","x = 4 ; y = 16"],"Les conditions du premier ordre donnent y = λ et x = λ, donc x = y = 10 et f = 100 (λ = 10).")
],
cons:[
q("Le taux marginal de substitution (TMS) entre x et y est égal à :","Um_x / Um_y (en valeur absolue, la pente de la courbe d'indifférence)",["Um_y / Um_x","px / py","U / R"],"TMS = −dy/dx à U constante = Um_x / Um_y."),
q("Pour un optimum intérieur du consommateur, il faut que :","TMS = px / py",["TMS = 1","px = py","TMS = R"],"L'optimum correspond à la tangence entre la courbe d'indifférence et la droite de budget."),
q("La loi de l'utilité marginale décroissante signifie que :","L'utilité marginale diminue quand on consomme davantage d'un bien (∂²U/∂x² < 0)",["L'utilité totale diminue toujours","Le prix baisse avec la quantité","Le consommateur préfère toujours moins de biens"],"L'utilité totale continue de croître tant que Um > 0 ; seul son rythme de croissance baisse."),
q("À l'optimum, le multiplicateur de Lagrange λ s'interprète comme :","L'utilité marginale du revenu (dU*/dR)",["Le prix du bien x","L'utilité totale","Le taux d'intérêt"],"Si le revenu augmente d'une unité, l'utilité maximale augmente d'environ λ."),
q("Deux courbes d'indifférence d'un même consommateur ne peuvent pas se croiser, car :","Cela contredirait la transitivité et la non-satiété des préférences",["Elles ont toujours la même pente","Le revenu est fixe","Les prix sont fixes"],"Un point d'intersection serait à la fois sur deux niveaux d'utilité différents, ce qui est contradictoire."),
q("U = x·y, px = 2, py = 4, R = 80. La demande optimale en bien x est :","x* = 20",["x* = 10","x* = 40","x* = 16"],"Pour U = xy, on dépense la moitié du revenu en x : x* = R/(2·px) = 80/4 = 20 (et y* = 80/8 = 10)."),
q("Pour des substituts parfaits U = a·x + b·y, la solution est généralement :","Une solution en coin : on n'achète que le bien au meilleur rapport Um/prix",["Toujours x = y","Une solution intérieure unique","Impossible à déterminer"],"Les courbes d'indifférence sont des droites : sauf cas d'égalité, la tangence ne donne pas un maximum."),
q("Pour des compléments parfaits U = min(x ; y), le consommateur :","Consomme les biens en proportion fixe (x = y)",["Achète un seul des deux biens","Substitue x à y selon les prix","N'a pas de contrainte budgétaire"],"Les courbes d'indifférence sont en forme de L : consommer plus d'un seul bien n'augmente pas l'utilité."),
q("Un bien de Giffen est un bien dont :","La quantité demandée augmente quand son prix augmente",["Le prix est toujours très élevé","L'élasticité-revenu est supérieure à 1","La demande est parfaitement inélastique"],"C'est un bien inférieur dont l'effet de revenu (négatif) l'emporte sur l'effet de substitution."),
q("Selon l'équation de Slutsky, l'effet total d'une variation de prix se décompose en :","Un effet de substitution et un effet de revenu",["Un effet de prix et un effet de quantité","Un effet d'offre et un effet de demande","Un effet à court terme et un effet à long terme"],"∂x/∂px = ∂x^h/∂px − x·∂x/∂R : l'effet de substitution est toujours négatif, l'effet de revenu dépend de la nature du bien."),
q("Un bien normal est un bien dont :","La demande augmente quand le revenu augmente (élasticité-revenu positive)",["La demande diminue quand le revenu augmente","Le prix ne change jamais","La demande ne dépend pas du revenu"],"Pour un bien inférieur, l'élasticité-revenu est négative."),
q("La droite de budget px·x + py·y = R a pour pente :","−px / py",["px / py","−py / px","−R / px"],"En écrivant y = R/py − (px/py)·x. Si R augmente, la droite se déplace parallèlement vers l'extérieur.")
],
prod:[
q("La productivité marginale du travail Pm_L est :","La variation de la production due à une unité supplémentaire de travail, K constant",["La production divisée par le travail","Le coût d'un travailleur supplémentaire","La production totale"],"Pm_L = ∂Q/∂L. La productivité moyenne est PM_L = Q/L."),
q("La productivité moyenne du travail se calcule par :","PM_L = Q / L",["PM_L = ∂Q/∂L","PM_L = Q × L","PM_L = L / Q"],"Quand Pm_L = PM_L, la productivité moyenne est à son maximum."),
q("La loi des rendements marginaux décroissants stipule que :","À partir d'un certain niveau, ajouter un facteur variable à un facteur fixe fait baisser sa productivité marginale",["La production diminue toujours","Les coûts sont toujours croissants","Les rendements d'échelle sont décroissants"],"Elle concerne le court terme (un facteur fixe), à ne pas confondre avec les rendements d'échelle."),
q("Une isoquante représente :","Les combinaisons de facteurs qui donnent le même niveau de production",["Les combinaisons de biens qui donnent la même utilité","Les combinaisons de facteurs qui coûtent la même somme","Le coût moyen minimal"],"L'isocoût, lui, regroupe les combinaisons de même coût."),
q("Le TMST est égal à :","Pm_L / Pm_K",["Pm_K / Pm_L","w / L","Q / K"],"TMST = −dK/dL à Q constante : le nombre d'unités de capital abandonnées pour une unité de travail supplémentaire."),
q("L'entreprise minimise le coût d'une production donnée lorsque :","Pm_L / w = Pm_K / r (TMST = w/r)",["Pm_L = Pm_K","w = r","L = K"],"C'est la tangence entre l'isoquante et l'isocoût : la dernière unité monétaire rapporte autant dans chaque facteur."),
q("Pour Q = K^0,5 · L^0,5, les rendements d'échelle sont :","Constants",["Croissants","Décroissants","Nuls"],"0,5 + 0,5 = 1 : si on double K et L, la production double exactement."),
q("Pour Q = K^0,6 · L^0,6, les rendements d'échelle sont :","Croissants",["Constants","Décroissants","Impossibles à déterminer"],"0,6 + 0,6 = 1,2 > 1 : doubler les facteurs multiplie la production par 2^1,2 ≈ 2,3."),
q("Le coût marginal Cm est :","La dérivée du coût total par rapport à la quantité (Cm = dCT/dQ)",["Le coût total divisé par la quantité","Le coût fixe","Le coût de la dernière entreprise"],"Cm coupe la courbe de coût moyen et celle de coût variable moyen en leur minimum."),
q("En concurrence parfaite, le profit est maximal lorsque :","P = Cm, avec Cm croissant",["P = CM","P = CF","Cm = 0"],"La condition générale est Rm = Cm ; en concurrence parfaite Rm = P. La condition du second ordre exige un Cm croissant."),
q("À court terme, l'entreprise cesse de produire si le prix est inférieur :","Au minimum du coût variable moyen (seuil de fermeture)",["Au minimum du coût moyen total","Au coût fixe","Au coût marginal minimal"],"Sous le CVM minimum, la vente ne couvre même pas les coûts variables : mieux vaut arrêter et ne perdre que le coût fixe."),
q("Si CT = Q² + 10Q + 100, le coût marginal pour Q = 5 est :","20",["35","45","100"],"Cm = dCT/dQ = 2Q + 10 ; pour Q = 5, Cm = 20 (CT = 175 et CM = 35 ne sont pas le coût marginal).")
],
march:[
q("À l'équilibre d'un marché, on a :","Qd(P*) = Qo(P*)",["P = 0","Qd = 0","Le prix est égal au coût fixe"],"Au prix d'équilibre, les quantités offertes et demandées sont égales : il n'y a ni excédent ni pénurie."),
q("Avec Qd = 120 − 2P et Qo = −30 + 3P, le prix d'équilibre est :","P* = 30",["P* = 24","P* = 36","P* = 20"],"120 − 2P = −30 + 3P ⇒ 150 = 5P ⇒ P* = 30, d'où Q* = 60."),
q("Une hausse du revenu des consommateurs (bien normal) provoque :","Un déplacement de la demande vers la droite : hausse du prix et de la quantité d'équilibre",["Un déplacement de l'offre vers la gauche","Une baisse du prix et de la quantité","Aucun effet sur l'équilibre"],"L'offre étant croissante, la demande plus élevée augmente à la fois P* et Q*."),
q("Si le prix est supérieur au prix d'équilibre :","Il y a un excédent d'offre, qui tend à faire baisser le prix",["Il y a un excédent de demande","Le marché est en équilibre","Il y a pénurie"],"À P > P*, Qo > Qd : les vendeurs ne vendent pas tout et baissent leur prix."),
q("Un prix plafond fixé en dessous du prix d'équilibre provoque :","Une pénurie (excédent de demande)",["Un excédent d'offre","Une hausse du prix d'équilibre","Aucun effet"],"À prix bas, la demande dépasse l'offre ; la quantité échangée est limitée par l'offre."),
q("Un prix plancher (ex. salaire minimum) fixé au-dessus du prix d'équilibre provoque :","Un excédent d'offre (chômage dans le cas du travail)",["Une pénurie","Une baisse de l'offre à zéro","Une hausse de la demande"],"À prix élevé, Qo > Qd : des offreurs ne trouvent pas preneur."),
q("L'incidence d'une taxe, c'est-à-dire sa répartition réelle entre acheteurs et vendeurs, dépend :","Des élasticités de la demande et de l'offre : le côté le moins élastique supporte la plus grande part",["De la personne qui paie légalement la taxe","Uniquement du montant de la taxe","Du nombre de vendeurs"],"Le côté du marché qui s'adapte le moins (le moins élastique) supporte la plus grande part du fardeau."),
q("La perte sèche (perte de poids mort) est :","La perte de surplus total due à une distorsion (taxe, monopole, plafond…)",["Le montant de la taxe collectée","Le profit du monopole","Le surplus du consommateur"],"C'est la partie du surplus perdue par les agents et qui n'est récupérée par personne (ni État, ni producteur)."),
q("Parmi ces conditions, laquelle ne fait PAS partie de la concurrence pure et parfaite ?","Une entreprise unique sur le marché",["Atomicité des offreurs et des demandeurs","Homogénéité du produit","Libre entrée et libre sortie"],"Le monopole est précisément l'opposé : un seul vendeur."),
q("Le monopole maximise son profit lorsque :","Rm = Cm, et le prix est supérieur au coût marginal",["P = Cm","P = Rm","Q est maximale"],"Pour une demande décroissante, Rm < P : le monopole fixe un prix supérieur à Cm et produit moins qu'en concurrence."),
q("L'indice de Lerner (P − Cm)/P est égal, pour un monopole qui maximise son profit, à :","1 / |ε| (l'inverse de l'élasticité-prix en valeur absolue)",["|ε|","P / Cm","1 − P"],"À l'optimum Cm = P·(1 + 1/ε), donc (P − Cm)/P = −1/ε = 1/|ε|. Plus la demande est inélastique, plus le pouvoir de marché est grand."),
q("Une externalité négative de production implique que :","Le coût social est supérieur au coût privé : le marché produit trop",["Le coût social est inférieur au coût privé","Le marché produit trop peu","Le marché est efficient"],"L'entreprise ne supporte pas tout le coût de son activité : sans intervention, la quantité produite dépasse l'optimum social.")
],
elast:[
q("L'élasticité d'une quantité Q par rapport à une variable X mesure :","Le rapport entre la variation relative de Q et la variation relative de X",["La pente de la courbe Q(X)","La variation absolue de Q","La valeur de Q"],"ε = (ΔQ/Q)/(ΔX/X) = (dQ/dX)·(X/Q) : un nombre sans unité, indépendant des unités de mesure."),
q("Une demande est dite élastique si :","|εp| > 1",["|εp| < 1","|εp| = 0","εp > 0"],"Une variation de prix de 1 % entraîne alors une variation de la quantité de plus de 1 %."),
q("Pour Q = 100 − 2P, l'élasticité-prix au point P = 20 vaut :","εp ≈ −0,67 (demande inélastique)",["εp = −2","εp = −1,5","εp = −0,5"],"Q = 60 ; ε = (dQ/dP)·(P/Q) = −2 × 20/60 = −0,67."),
q("Si la demande est élastique, une hausse du prix :","Fait baisser la recette totale",["Fait augmenter la recette totale","Laisse la recette inchangée","Fait augmenter la quantité"],"La quantité baisse proportionnellement plus que le prix n'augmente : la recette P·Q diminue."),
q("La recette marginale est Rm = P·(1 + 1/εp). Elle est positive si :","|εp| > 1",["|εp| < 1","εp = 0","P < 0"],"Pour |ε| > 1, 1 + 1/ε > 0. Un monopole ne produit donc jamais dans la zone inélastique."),
q("Un bien dont l'élasticité-revenu est négative est :","Un bien inférieur",["Un bien de luxe","Un bien normal de nécessité","Un bien de Giffen obligatoirement"],"εR < 0 : la demande baisse quand le revenu augmente. Si εR > 1, c'est un bien de luxe ; si 0 < εR < 1, un bien de nécessité."),
q("Une élasticité croisée positive (εAB > 0) indique que A et B sont :","Substituts",["Compléments","Indépendants","Inférieurs"],"Si le prix de B augmente, on consomme davantage de A : les deux biens sont substituables (ex. thé et café)."),
q("La demande passe de 60 à 40 quand le prix passe de 20 à 30. L'élasticité d'arc vaut :","−1 (élasticité unitaire)",["−0,5","−2","−1,5"],"εarc = (ΔQ/ΔP) × (P1 + P2)/(Q1 + Q2) = (−20/10) × (50/100) = −1."),
q("Parmi ces facteurs, lequel rend la demande d'un bien plus élastique ?","L'existence de nombreux substituts proches",["Le fait que le bien soit une nécessité vitale","Une période d'observation très courte","Une très faible part dans le budget"],"Plus il est facile de remplacer un bien, plus les consommateurs réagissent au prix. L'élasticité est aussi plus forte à long terme."),
q("La fonction de demande Q = A·P^(−2) a une élasticité-prix :","Constante et égale à −2",["Égale à −2 seulement quand P = 1","Variable le long de la courbe","Égale à −1/2"],"Pour Q = A·P^k, ε = k·A·P^(k−1)·P/(A·P^k) = k, quel que soit P."),
q("Une demande parfaitement inélastique (ε = 0) est représentée par :","Une droite verticale",["Une droite horizontale","Une droite de pente −1","Une hyperbole"],"La quantité demandée ne dépend pas du prix. La demande parfaitement élastique est, elle, horizontale."),
q("L'offre est Qo = −10 + 2P. L'élasticité-prix de l'offre au point P = 10 vaut :","εo = 2",["εo = 0,5","εo = 1","εo = 10"],"Qo = 10 ; εo = (dQo/dP)·(P/Qo) = 2 × 10/10 = 2.")
]
};
/* Exercices corrigés : titre, enonce[], questions[], corrige[{titre,lignes[]}], rep */
var EXO={
fond:[
{titre:"Coût d'opportunité et frontière des possibilités de production",niveau:"Facile",
 enonce:["Un agriculteur dispose de ses terres et de sa main-d'œuvre. S'il consacre tout à ses cultures, il peut produire soit 40 tonnes de blé, soit 100 tonnes de maïs. La frontière des possibilités de production est une droite."],
 questions:["Calculer le coût d'opportunité d'une tonne de blé, puis d'une tonne de maïs.","Il produit 10 t de blé. Quelle quantité maximale de maïs peut-il produire ?","Peut-il produire 25 t de blé et 70 t de maïs ? Interpréter."],
 corrige:[
  {titre:"1. Coûts d'opportunité",lignes:["Pour 1 t de blé en plus, on sacrifie 100 / 40 = 2,5 t de maïs.","Pour 1 t de maïs en plus, on sacrifie 40 / 100 = 0,4 t de blé.","Les deux coûts sont inverses l'un de l'autre (2,5 × 0,4 = 1)."]},
  {titre:"2. Équation de la frontière",lignes:["Maïs = 100 − 2,5 × Blé","Pour Blé = 10 : Maïs = 100 − 25 = 75 t."]},
  {titre:"3. Point (25 ; 70)",lignes:["Pour Blé = 25 : Maïs max = 100 − 2,5 × 25 = 37,5 t.","70 > 37,5 : le point est situé au-dessus de la frontière, il n'est pas réalisable avec les ressources actuelles."]}],
 rep:"1) 2,5 t de maïs par t de blé ; 0,4 t de blé par t de maïs. 2) 75 t de maïs. 3) Non, le maximum de maïs est 37,5 t."},
{titre:"Optimisation sous contrainte : méthode de Lagrange",niveau:"Moyen",
 enonce:["On veut maximiser f(x ; y) = x·y sous la contrainte x + y = 20."],
 questions:["Écrire le Lagrangien et les conditions du premier ordre.","Déterminer la solution et la valeur de f.","Interpréter le multiplicateur λ en calculant la nouvelle valeur optimale si la contrainte devient x + y = 21."],
 corrige:[
  {titre:"1. Lagrangien",lignes:["L(x, y, λ) = x·y + λ·(20 − x − y)","∂L/∂x = y − λ = 0   ⇒   y = λ","∂L/∂y = x − λ = 0   ⇒   x = λ","∂L/∂λ = 20 − x − y = 0"]},
  {titre:"2. Solution",lignes:["x = y = λ, et x + y = 20 ⇒ 2λ = 20 ⇒ λ = 10.","x* = 10 ; y* = 10 ; f* = 10 × 10 = 100."]},
  {titre:"3. Interprétation de λ",lignes:["Avec la contrainte x + y = 21 : x = y = 10,5 et f* = 110,25.","Variation exacte : 110,25 − 100 = 10,25 ≈ λ × 1 = 10.","λ est donc la variation de la valeur optimale pour une unité de contrainte en plus (prix implicite)."]}],
 rep:"x* = y* = 10, f* = 100, λ = 10. Une unité de contrainte supplémentaire augmente f* d'environ 10 (exactement 10,25)."},
{titre:"Statique comparative : effet d'une hausse du revenu",niveau:"Moyen",
 enonce:["Sur un marché, la demande est Qd = 100 − 2P + 0,3R et l'offre est Qo = −20 + 4P, où R désigne le revenu des consommateurs."],
 questions:["Distinguer variables endogènes et exogènes.","Calculer l'équilibre pour R = 40.","Calculer le nouvel équilibre pour R = 60 et en déduire l'effet de la hausse du revenu (statique comparative)."],
 corrige:[
  {titre:"1. Variables",lignes:["Endogènes (déterminées par le modèle) : P et Q.","Exogène (donnée) : R, le revenu."]},
  {titre:"2. Équilibre pour R = 40",lignes:["Qd = 100 − 2P + 12 = 112 − 2P","112 − 2P = −20 + 4P ⇒ 132 = 6P","P* = 22 ; Q* = −20 + 4 × 22 = 68."]},
  {titre:"3. Équilibre pour R = 60",lignes:["Qd = 100 − 2P + 18 = 118 − 2P","118 − 2P = −20 + 4P ⇒ 138 = 6P","P* = 23 ; Q* = −20 + 4 × 23 = 72.","Variations pour ΔR = +20 : ΔP* = +1 et ΔQ* = +4.","Vérification par dérivées : dP*/dR = 0,3/6 = 0,05 (× 20 = 1) ; dQ*/dR = 4 × 0,05 = 0,2 (× 20 = 4)."]}],
 rep:"R = 40 : P* = 22, Q* = 68. R = 60 : P* = 23, Q* = 72. La hausse du revenu déplace la demande vers la droite : le prix et la quantité augmentent."}
],
cons:[
{titre:"Optimum du consommateur : fonction Cobb-Douglas",niveau:"Moyen",
 enonce:["Un consommateur a pour fonction d'utilité U(x ; y) = x·y. Les prix sont px = 2 et py = 4 et son revenu est R = 80."],
 questions:["Écrire la contrainte budgétaire et calculer le TMS.","Déterminer le panier optimal (x*, y*) et l'utilité maximale.","Calculer λ et vérifier Um_x/px = Um_y/py.","Que devient le panier optimal si px passe à 4 ?"],
 corrige:[
  {titre:"1. Contrainte et TMS",lignes:["Contrainte : 2x + 4y = 80.","Um_x = y ; Um_y = x ⇒ TMS = Um_x/Um_y = y/x."]},
  {titre:"2. Optimum",lignes:["Condition de tangence : y/x = px/py = 2/4 = 0,5 ⇒ y = 0,5x.","Dans la contrainte : 2x + 4 × 0,5x = 80 ⇒ 4x = 80 ⇒ x* = 20.","y* = 0,5 × 20 = 10.","U* = 20 × 10 = 200."]},
  {titre:"3. Multiplicateur λ",lignes:["λ = Um_x/px = y*/px = 10/2 = 5.","Um_y/py = x*/py = 20/4 = 5 ✓ (égalité vérifiée).","Interprétation : un dirham de revenu en plus augmente l'utilité d'environ 5 (si R = 81 : U* ≈ 205,03)."]},
  {titre:"4. Hausse de px à 4",lignes:["x* = R/(2·px) = 80/8 = 10 ; y* = R/(2·py) = 80/8 = 10.","U* = 100 : l'utilité est divisée par 2.","La demande de y n'a pas changé (10) : pour une Cobb-Douglas, la dépense en y reste égale à la moitié du revenu."]}],
 rep:"Panier optimal (20 ; 10), U* = 200, λ = 5. Après la hausse de px à 4 : panier (10 ; 10), U* = 100."},
{titre:"Cobb-Douglas non symétrique et parts de budget",niveau:"Moyen",
 enonce:["Un consommateur maximise U(x ; y) = x^0,6 · y^0,4 avec px = 3, py = 2 et R = 120."],
 questions:["Déterminer les fonctions de demande marshalliennes x*(px, R) et y*(py, R).","Calculer le panier optimal et l'utilité.","Le prix px passe à 6. Calculer le nouveau panier et la nouvelle utilité. Que constate-t-on pour y ?"],
 corrige:[
  {titre:"1. Fonctions de demande",lignes:["Pour U = x^a · y^b avec a + b = 1, la dépense en x vaut a·R et la dépense en y vaut b·R.","x* = 0,6·R / px ; y* = 0,4·R / py.","La demande de x ne dépend ni de py ni de la dépense en y : pas d'effet croisé."]},
  {titre:"2. Panier optimal",lignes:["x* = 0,6 × 120 / 3 = 24 ; y* = 0,4 × 120 / 2 = 24.","U* = 24^0,6 × 24^0,4 = 24."]},
  {titre:"3. Hausse de px à 6",lignes:["x* = 0,6 × 120 / 6 = 12 ; y* = 24 (inchangé).","U* = 12^0,6 × 24^0,4 ≈ 15,83.","L'utilité baisse de 24 à 15,83 (environ −34 %).","y est inchangé : l'élasticité croisée est nulle et l'élasticité-prix propre de x vaut −1."]}],
 rep:"x* = 0,6R/px et y* = 0,4R/py ; panier (24 ; 24), U* = 24. Après la hausse : (12 ; 24), U* ≈ 15,83 ; la demande de y n'a pas bougé."},
{titre:"Effet de substitution et effet de revenu (Slutsky)",niveau:"Difficile",
 enonce:["On reprend U = x·y, py = 4 et R = 80. Le prix de x passe de 2 à 4. Le panier initial est (20 ; 10) avec U = 200."],
 questions:["Calculer le nouveau panier optimal.","Déterminer le panier compensé (maintien de l'utilité initiale 200) aux nouveaux prix.","En déduire l'effet de substitution et l'effet de revenu sur x."],
 corrige:[
  {titre:"1. Nouveau panier optimal",lignes:["Avec px = 4 et py = 4 : x = R/(2·px) = 10 et y = 10 (U = 100).","Effet total sur x : 10 − 20 = −10."]},
  {titre:"2. Panier compensé",lignes:["On cherche le panier qui donne U = 200 aux prix (4 ; 4).","Tangence : y/x = 4/4 = 1 ⇒ y = x, et x·y = 200 ⇒ x² = 200.","x^h = y^h = √200 ≈ 14,14.","Revenu compensé : R^h = 4 × 14,14 + 4 × 14,14 ≈ 113,14 (supérieur à 80 : il faut compenser la perte de pouvoir d'achat)."]},
  {titre:"3. Décomposition",lignes:["Effet de substitution : x^h − x initial = 14,14 − 20 ≈ −5,86.","Effet de revenu : x final − x^h = 10 − 14,14 ≈ −4,14.","Somme : −5,86 − 4,14 = −10 ✓ (égal à l'effet total).","x est un bien normal : l'effet de revenu va dans le même sens que l'effet de substitution."]}],
 rep:"Nouveau panier (10 ; 10). Effet de substitution ≈ −5,86 ; effet de revenu ≈ −4,14 ; effet total = −10."},
{titre:"Substituts parfaits et solution en coin",niveau:"Moyen",
 enonce:["Un consommateur a pour utilité U(x ; y) = x + 2y. Son revenu est R = 60, et px = 3."],
 questions:["Pour py = 4, déterminer le panier optimal.","Pour py = 8, déterminer le panier optimal.","Pour quelle valeur de py le consommateur est-il indifférent entre acheter x ou y ?"],
 corrige:[
  {titre:"Principe",lignes:["Um_x = 1 et Um_y = 2, donc TMS = 1/2 en tout point.","On compare les utilités marginales par dirham dépensé : Um_x/px et Um_y/py. Le consommateur n'achète que le bien dont ce rapport est le plus élevé."]},
  {titre:"1. py = 4",lignes:["Um_x/px = 1/3 ≈ 0,333 ; Um_y/py = 2/4 = 0,5.","Le bien y est plus avantageux : solution en coin x* = 0 ; y* = 60/4 = 15 ; U* = 30.","Contrôle : TMS = 0,5 < px/py = 0,75."]},
  {titre:"2. py = 8",lignes:["Um_y/py = 2/8 = 0,25 < Um_x/px = 0,333.","Solution en coin : y* = 0 ; x* = 60/3 = 20 ; U* = 20.","Contrôle : TMS = 0,5 > px/py = 3/8 = 0,375."]},
  {titre:"3. Indifférence",lignes:["Um_x/px = Um_y/py ⇔ 1/3 = 2/py ⇔ py = 6.","Pour py = 6, toute combinaison sur la droite de budget donne U = 20 : les solutions sont multiples."]}],
 rep:"py = 4 : (0 ; 15), U* = 30. py = 8 : (20 ; 0), U* = 20. Pour py = 6, le consommateur est indifférent (solutions multiples sur la droite de budget)."}
],
prod:[
{titre:"Minimisation du coût pour une production donnée",niveau:"Moyen",
 enonce:["Une entreprise a pour fonction de production Q = √(K·L), avec w = 4 le prix du travail et r = 1 le prix du capital. Elle veut produire Q = 20."],
 questions:["Déterminer le TMST.","Trouver la combinaison K, L qui minimise le coût et calculer ce coût.","Donner la fonction de coût CT(Q) et en déduire la nature des rendements d'échelle."],
 corrige:[
  {titre:"1. TMST",lignes:["Pm_L = ∂Q/∂L = 0,5·√(K/L) ; Pm_K = ∂Q/∂K = 0,5·√(L/K).","TMST = Pm_L/Pm_K = K/L."]},
  {titre:"2. Combinaison optimale",lignes:["TMST = w/r ⇒ K/L = 4/1 ⇒ K = 4L.","Contrainte de production : √(4L × L) = 2L = 20 ⇒ L* = 10 ; K* = 40.","Coût minimal : C = 4 × 10 + 1 × 40 = 80."]},
  {titre:"3. Fonction de coût",lignes:["Pour un Q quelconque : 2L = Q ⇒ L = Q/2 et K = 2Q.","CT(Q) = 4 × (Q/2) + 1 × 2Q = 4Q.","CM = Cm = 4 (constants) : rendements d'échelle constants (cohérent avec 0,5 + 0,5 = 1)."]}],
 rep:"TMST = K/L ; L* = 10, K* = 40, coût minimal 80 ; CT(Q) = 4Q (rendements d'échelle constants)."},
{titre:"Coûts et maximisation du profit",niveau:"Difficile",
 enonce:["Le coût total d'une entreprise en concurrence parfaite est CT(Q) = Q³ − 6Q² + 20Q + 32."],
 questions:["Déterminer CF, CV, CVM, CM et Cm.","Calculer le seuil de fermeture et le seuil de rentabilité.","Le prix du marché est P = 56. Calculer la production optimale et le profit.","Que fait l'entreprise si P = 10 ?"],
 corrige:[
  {titre:"1. Fonctions de coût",lignes:["CF = 32 ; CV = Q³ − 6Q² + 20Q.","CVM = Q² − 6Q + 20 ; CM = Q² − 6Q + 20 + 32/Q.","Cm = dCT/dQ = 3Q² − 12Q + 20."]},
  {titre:"2. Seuils",lignes:["Seuil de fermeture : minimum du CVM. d(CVM)/dQ = 2Q − 6 = 0 ⇒ Q = 3 ; CVM = 9 − 18 + 20 = 11 (= Cm(3) = 27 − 36 + 20 = 11 ✓). Seuil de fermeture : P = 11.","Seuil de rentabilité : minimum du CM, où Cm = CM. 3Q² − 12Q + 20 = Q² − 6Q + 20 + 32/Q ⇒ 2Q³ − 6Q² − 32 = 0 ⇒ Q³ − 3Q² − 16 = 0 ⇒ Q = 4 (64 − 48 − 16 = 0 ✓). CM(4) = 16 − 24 + 20 + 8 = 20. Seuil de rentabilité : P = 20."]},
  {titre:"3. Optimum pour P = 56",lignes:["P = Cm ⇒ 3Q² − 12Q + 20 = 56 ⇒ Q² − 4Q − 12 = 0 ⇒ Q = 6 (ou Q = −2, à rejeter).","Condition du second ordre : dCm/dQ = 6Q − 12 = 24 > 0 ✓.","RT = 56 × 6 = 336 ; CT(6) = 216 − 216 + 120 + 32 = 152.","Profit Π = 336 − 152 = 184."]},
  {titre:"4. Cas P = 10",lignes:["P = 10 < 11 (minimum du CVM) : la recette ne couvre pas les coûts variables.","L'entreprise arrête de produire (Q = 0) et perd uniquement son coût fixe, soit 32."]}],
 rep:"Fermeture : P = 11 (Q = 3). Rentabilité : P = 20 (Q = 4). Pour P = 56 : Q* = 6 et Π = 184. Pour P = 10 : arrêt de la production."},
{titre:"Les trois phases de la production à court terme et rendements d'échelle",niveau:"Moyen",
 enonce:["À court terme (capital fixe), la production en fonction du travail est Q(L) = 12L² − L³ pour L ≥ 0."],
 questions:["Déterminer PM_L et Pm_L.","Trouver la valeur de L pour laquelle PM_L est maximale, et celle pour laquelle Pm_L est maximale.","À quel niveau de L la production est-elle maximale ?","Étudier les rendements d'échelle de Q = K^0,4 · L^0,7."],
 corrige:[
  {titre:"1. Productivités",lignes:["PM_L = Q/L = 12L − L².","Pm_L = dQ/dL = 24L − 3L²."]},
  {titre:"2. Maxima des productivités",lignes:["Pm_L est maximale quand sa dérivée s'annule : 24 − 6L = 0 ⇒ L = 4 ; Pm_L(4) = 96 − 48 = 48.","PM_L est maximale quand 12 − 2L = 0 ⇒ L = 6 ; PM_L(6) = 72 − 36 = 36.","À L = 6, Pm_L = 144 − 108 = 36 = PM_L : la productivité marginale coupe la productivité moyenne en son maximum."]},
  {titre:"3. Production maximale",lignes:["Q est maximale quand Pm_L = 0 : 24L − 3L² = 0 ⇒ L = 8.","Q(8) = 12 × 64 − 512 = 768 − 512 = 256.","Phases : de 0 à 6, Pm_L > PM_L ; de 6 à 8, Pm_L < PM_L mais positive (zone économique) ; au-delà de 8, Pm_L < 0."]},
  {titre:"4. Rendements d'échelle de Q = K^0,4 · L^0,7",lignes:["f(λK, λL) = λ^(0,4 + 0,7) · f(K, L) = λ^1,1 · f(K, L).","Somme des exposants = 1,1 > 1 : rendements d'échelle croissants.","Si on double K et L, la production est multipliée par 2^1,1 ≈ 2,14."]}],
 rep:"Pm_L maximale en L = 4 ; PM_L maximale en L = 6 (valeur 36) ; Q maximale en L = 8 (Q = 256). Q = K^0,4·L^0,7 : rendements d'échelle croissants."}
],
march:[
{titre:"Équilibre, surplus et déséquilibres",niveau:"Moyen",
 enonce:["La demande est Qd = 120 − 2P et l'offre est Qo = −30 + 3P."],
 questions:["Calculer le prix et la quantité d'équilibre.","Calculer le surplus du consommateur, celui du producteur et le surplus total.","Que se passe-t-il pour P = 40 ? pour P = 20 ?","Un prix plafond de 20 est imposé : quelle quantité est échangée ?"],
 corrige:[
  {titre:"1. Équilibre",lignes:["120 − 2P = −30 + 3P ⇒ 150 = 5P.","P* = 30 ; Q* = 120 − 60 = 60."]},
  {titre:"2. Surplus",lignes:["Demande inverse : P = 60 − Q/2 ; prix maximum (Q = 0) = 60.","SC = ½ × (60 − 30) × 60 = 900.","Offre inverse : P = (Q + 30)/3 ; prix minimum (Q = 0) = 10.","SP = ½ × (30 − 10) × 60 = 600.","ST = 900 + 600 = 1 500."]},
  {titre:"3. Déséquilibres",lignes:["P = 40 : Qd = 40 et Qo = 90 ⇒ excédent d'offre de 50 : le prix tend à baisser.","P = 20 : Qd = 80 et Qo = 30 ⇒ excédent de demande de 50 : le prix tend à monter."]},
  {titre:"4. Prix plafond de 20",lignes:["À P = 20, Qo = 30 et Qd = 80.","La quantité échangée est limitée par l'offre : 30 unités, avec une pénurie de 50."]}],
 rep:"P* = 30, Q* = 60 ; SC = 900, SP = 600, ST = 1 500. Prix plafond à 20 : 30 unités échangées, pénurie de 50."},
{titre:"Incidence d'une taxe et perte sèche",niveau:"Difficile",
 enonce:["Même marché : Qd = 120 − 2P et Qo = −30 + 3P. L'État institue une taxe de t = 10 DH par unité vendue, payée par les vendeurs."],
 questions:["Déterminer le nouvel équilibre : prix payé par les acheteurs Pa, prix reçu par les vendeurs Pv et quantité.","Calculer les recettes fiscales et l'incidence de la taxe sur les acheteurs et les vendeurs.","Calculer la perte sèche et vérifier par les surplus."],
 corrige:[
  {titre:"1. Nouvel équilibre",lignes:["On a Pa − Pv = 10, donc Pv = Pa − 10.","Qd = 120 − 2Pa ; Qo = −30 + 3(Pa − 10) = 3Pa − 60.","120 − 2Pa = 3Pa − 60 ⇒ 180 = 5Pa ⇒ Pa = 36 ; Pv = 26 ; Q = 48."]},
  {titre:"2. Recettes et incidence",lignes:["Recettes fiscales : 10 × 48 = 480.","Les acheteurs paient 36 − 30 = 6 de plus ; les vendeurs reçoivent 30 − 26 = 4 de moins.","Parts : 6/10 = 60 % pour les acheteurs, 40 % pour les vendeurs.","Formule : part des acheteurs = pente de l'offre / (pente de l'offre + pente de la demande) = 3/(3 + 2) = 60 %."]},
  {titre:"3. Perte sèche",lignes:["Perte sèche = ½ × t × (Q initial − Q taxé) = ½ × 10 × (60 − 48) = 60.","Vérification : SC' = ½ × (60 − 36) × 48 = 576 ; SP' = ½ × (26 − 10) × 48 = 384 ; recettes = 480.","SC' + SP' + recettes = 1 440, contre ST = 1 500 avant la taxe ⇒ perte de 60 ✓."]}],
 rep:"Pa = 36, Pv = 26, Q = 48 ; recettes fiscales 480 ; les acheteurs supportent 60 % de la taxe et les vendeurs 40 % ; perte sèche = 60."},
{titre:"Monopole et perte sèche",niveau:"Difficile",
 enonce:["Un monopole fait face à la demande P = 100 − Q. Son coût total est CT = 20Q + 200."],
 questions:["Calculer la production, le prix et le profit du monopole.","Calculer l'élasticité-prix au point d'équilibre et l'indice de Lerner.","Comparer avec la concurrence parfaite (P = Cm) et calculer la perte sèche due au monopole."],
 corrige:[
  {titre:"1. Optimum du monopole",lignes:["RT = P·Q = 100Q − Q² ⇒ Rm = 100 − 2Q ; Cm = 20.","Rm = Cm ⇒ 100 − 2Q = 20 ⇒ Q = 40 ; P = 100 − 40 = 60.","Profit Π = 60 × 40 − (20 × 40 + 200) = 2 400 − 1 000 = 1 400."]},
  {titre:"2. Élasticité et Lerner",lignes:["ε = (dQ/dP)·(P/Q) = −1 × 60/40 = −1,5 (|ε| > 1 : zone élastique ✓).","Indice de Lerner = (P − Cm)/P = (60 − 20)/60 = 0,667 = 1/|ε| ✓."]},
  {titre:"3. Comparaison avec la concurrence",lignes:["Concurrence : P = Cm = 20 ⇒ Q = 80.","Le monopole produit moitié moins (40 au lieu de 80) et vend 3 fois plus cher (60 au lieu de 20).","Perte sèche = ½ × (60 − 20) × (80 − 40) = 800.","Surplus du consommateur : 800 en monopole (½ × 40 × 40) contre 3 200 en concurrence (½ × 80 × 80)."]}],
 rep:"Monopole : Q = 40, P = 60, profit 1 400 ; |ε| = 1,5 ; indice de Lerner 0,667 ; en concurrence Q = 80 et P = 20 ; perte sèche du monopole = 800."}
],
elast:[
{titre:"Élasticité-prix de la demande et recette totale",niveau:"Moyen",
 enonce:["La demande d'un bien est Q = 100 − 2P."],
 questions:["Calculer l'élasticité-prix aux points P = 20 et P = 30 et conclure sur la nature de la demande.","Pour quel prix l'élasticité est-elle unitaire ? Quelle est la recette à ce prix ?","Calculer l'élasticité d'arc entre P = 20 et P = 30."],
 corrige:[
  {titre:"1. Élasticité aux points",lignes:["dQ/dP = −2.","P = 20 : Q = 60 ⇒ ε = −2 × 20/60 = −0,67 : demande inélastique (|ε| < 1).","P = 30 : Q = 40 ⇒ ε = −2 × 30/40 = −1,5 : demande élastique (|ε| > 1)."]},
  {titre:"2. Élasticité unitaire",lignes:["|ε| = 2P/(100 − 2P) = 1 ⇒ 2P = 100 − 2P ⇒ P = 25 ; Q = 50.","RT(P) = P(100 − 2P), maximale en P = 25 : RT = 25 × 50 = 1 250.","La recette est maximale lorsque l'élasticité est unitaire : Rm = P(1 + 1/ε) = 0."]},
  {titre:"3. Élasticité d'arc",lignes:["ΔQ = 40 − 60 = −20 ; ΔP = 30 − 20 = 10.","εarc = (ΔQ/ΔP) × (P1 + P2)/(Q1 + Q2) = (−20/10) × (50/100) = −1.","En moyenne sur cet intervalle, la demande est d'élasticité unitaire."]}],
 rep:"ε(20) = −0,67 (inélastique) ; ε(30) = −1,5 (élastique) ; élasticité unitaire en P = 25 (recette maximale de 1 250) ; élasticité d'arc = −1."},
{titre:"Élasticité-revenu et élasticité croisée",niveau:"Moyen",
 enonce:["La demande d'un bien X est Qx = 50 − 2Px + 0,5Py + 0,1R, où Py est le prix d'un autre bien et R le revenu. On se place au point Px = 10, Py = 20 et R = 200."],
 questions:["Calculer la quantité demandée.","Calculer l'élasticité-prix, l'élasticité croisée et l'élasticité-revenu.","Interpréter chaque résultat."],
 corrige:[
  {titre:"1. Quantité",lignes:["Qx = 50 − 20 + 10 + 20 = 60."]},
  {titre:"2. Élasticités",lignes:["Élasticité-prix : εp = (∂Qx/∂Px)·(Px/Qx) = −2 × 10/60 = −0,33.","Élasticité croisée : εxy = (∂Qx/∂Py)·(Py/Qx) = 0,5 × 20/60 = +0,17.","Élasticité-revenu : εR = (∂Qx/∂R)·(R/Qx) = 0,1 × 200/60 = +0,33."]},
  {titre:"3. Interprétation",lignes:["|εp| = 0,33 < 1 : demande inélastique ; une hausse de 10 % du prix réduit la quantité d'environ 3,3 %.","εxy > 0 : X et Y sont des biens substituts.","0 < εR < 1 : X est un bien normal de nécessité (la demande croît moins vite que le revenu)."]}],
 rep:"Q = 60 ; εp = −0,33 (inélastique) ; εxy = +0,17 (substituts) ; εR = +0,33 (bien normal de nécessité)."},
{titre:"Fonctions à élasticité constante et élasticité de l'offre",niveau:"Moyen",
 enonce:["Une demande a pour équation Q = A·P^(−2), où A est une constante positive. Par ailleurs, l'offre d'un bien est Qo = −10 + 2P."],
 questions:["Montrer que l'élasticité-prix de la demande est constante et la calculer.","Le prix augmente de 10 %. Calculer la variation exacte de la quantité et de la recette totale.","Calculer l'élasticité-prix de l'offre aux points P = 10 et P = 20."],
 corrige:[
  {titre:"1. Élasticité constante",lignes:["dQ/dP = −2·A·P^(−3).","ε = (dQ/dP)·(P/Q) = −2·A·P^(−3) × P/(A·P^(−2)) = −2, quel que soit P."]},
  {titre:"2. Hausse de prix de 10 %",lignes:["P' = 1,1 P ⇒ Q' = A(1,1P)^(−2) = Q × 1,1^(−2) ≈ 0,8264 Q : baisse de 17,4 % (l'approximation linéaire −2 × 10 % = −20 % n'est valable que pour de petites variations).","RT' = P' × Q' = 1,1 × 0,8264 × RT ≈ 0,909 RT : baisse de la recette d'environ 9,1 %.","Approximation : ΔRT/RT ≈ (1 + ε) × 10 % = −10 %. La demande étant élastique, la recette diminue."]},
  {titre:"3. Élasticité de l'offre",lignes:["dQo/dP = 2.","P = 10 : Qo = 10 ⇒ εo = 2 × 10/10 = 2.","P = 20 : Qo = 30 ⇒ εo = 2 × 20/30 = 1,33.","L'offre est élastique (εo > 1) aux deux points, avec une élasticité qui diminue quand P augmente."]}],
 rep:"ε = −2 (constante) ; quantité −17,4 % et recette −9,1 % ; εo(10) = 2 et εo(20) = 1,33."}
]
};
return {CH:CH,QUIZ:QUIZ,EXO:EXO};
})();
