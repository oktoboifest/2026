const dishes=[
  ['APARADOR PRINCIPAL','Acompanhamentos','Salada, pão, vinagrete e farofa.'],
  ['ESTAÇÃO 01','Picanha Angus','Picanha Angus e legumes na brasa.'],
  ['ESTAÇÃO 02','Short Rib Angus','Short rib Angus e creme de mandioca rústico na manteiga e alho frito.'],
  ['ESTAÇÃO 03','Ancho Angus','Ancho Angus e creme de cabotiá com queijo e especiarias.'],
  ['ESTAÇÃO 04','Frango Lemon Pepper','Coxa e sobrecoxa desossada no lemon pepper e gremolata.'],
  ['ESTAÇÃO 05','Copa-lombo','Copa-lombo no mel e amora, acompanhado de vinagrete de abacaxi.']
];
const beers=[
  ['Torneira 01','premium','Pilsen premium'],['Torneira 02','premium','Lager premium'],['Torneira 03','premium','Puro malte'],
  ['Torneira 04','artesanal','IPA artesanal'],['Torneira 05','artesanal','APA artesanal'],['Torneira 06','artesanal','Weiss artesanal'],
  ['Torneira 07','artesanal','Red Ale artesanal'],['Torneira 08','artesanal','Session IPA'],['Torneira 09','premium','Estilo a confirmar'],
  ['Torneira 10','sem-alcool','Chopp sem álcool — novidade']
];
const partnerGroups=[['MASTER',2,'master'],['OURO',4,'ouro'],['PRATA',6,'prata'],['BRONZE',6,'bronze'],['APOIO',6,'apoio'],['EXPOSITORES',6,'expositores']];
const beerGrid=document.querySelector('#beer-grid');
function renderBeers(filter='all'){beerGrid.innerHTML=beers.filter(b=>filter==='all'||b[1]===filter).map(b=>`<article class="beer-card"><span>${b[1].replace('-',' ')}</span><b>${b[0]}</b><p>${b[2]}</p></article>`).join('')}
renderBeers();
document.querySelectorAll('[data-beer]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-beer]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderBeers(btn.dataset.beer)}));
document.querySelectorAll('.station-tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.station-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const d=dishes[+btn.dataset.station];document.querySelector('#dish-kicker').textContent=d[0];document.querySelector('#dish-title').textContent=d[1];document.querySelector('#dish-desc').textContent=d[2]}));
const groups=document.querySelector('#partner-groups');
groups.innerHTML=partnerGroups.map(([name,count,cls])=>`<section class="partner-group ${cls}"><h3>${name}</h3><div class="logo-grid">${Array.from({length:count},(_,i)=>`<div class="logo-slot">LOGO ${name}<br>${String(i+1).padStart(2,'0')}</div>`).join('')}</div></section>`).join('');
document.querySelectorAll('[data-map]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-map]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.pin').forEach(p=>{p.classList.toggle('dim',btn.dataset.map!=='all'&&!p.classList.contains(btn.dataset.map));p.classList.toggle('focus',btn.dataset.map!=='all'&&p.classList.contains(btn.dataset.map))})}));
document.querySelector('.map-link').addEventListener('click',()=>{location.hash='mapa';setTimeout(()=>document.querySelector('[data-map="alimentacao"]').click(),300)});
const target=new Date('2026-10-17T18:00:00-03:00');function tick(){const diff=Math.max(0,target-new Date());document.querySelector('[data-days]').textContent=String(Math.floor(diff/864e5)).padStart(2,'0');document.querySelector('[data-hours]').textContent=String(Math.floor(diff/36e5)%24).padStart(2,'0');document.querySelector('[data-minutes]').textContent=String(Math.floor(diff/6e4)%60).padStart(2,'0')}tick();setInterval(tick,60000);
const searchable=[...dishes.map((d,i)=>({t:d.join(' '),label:`Cardápio — ${d[1]}`,href:'#cardapio',action:()=>document.querySelector(`[data-station="${i}"]`).click()})),...beers.map(b=>({t:b.join(' '),label:`Chopp — ${b[0]}: ${b[2]}`,href:'#chopes'})),{t:'banheiro wc toalete',label:'Mapa — Banheiros',href:'#mapa',action:()=>document.querySelector('[data-map="banheiro"]').click()},{t:'palco banda música sertanejo pop rock pagode untold renato rodrigo barulhinho bom',label:'Programação — Bandas confirmadas',href:'#programacao'},{t:'mesa mesas número numerada 1 139',label:'Mapa — Mesas numeradas de 1 a 139',href:'#mapa'},{t:'cozinha aparador alimentação estação gourmet comida',label:'Mapa — Alimentação',href:'#mapa',action:()=>document.querySelector('[data-map="alimentacao"]').click()},{t:'patrocinador apoiador expositor master ouro prata bronze',label:'Parceiros — todas as categorias',href:'#parceiros'}];
const input=document.querySelector('#site-search'),results=document.querySelector('#search-results');input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();if(q.length<2){results.hidden=true;return}const found=searchable.filter(x=>x.t.toLowerCase().includes(q)).slice(0,6);results.innerHTML=found.length?found.map((x,i)=>`<a href="${x.href}" data-result="${searchable.indexOf(x)}">${x.label}</a>`).join(''):'<span>Nenhum item encontrado.</span>';results.hidden=false});results.addEventListener('click',e=>{const a=e.target.closest('[data-result]');if(!a)return;searchable[+a.dataset.result].action?.();results.hidden=true;input.value=''});
const topbar=document.querySelector('.topbar');addEventListener('scroll',()=>topbar.classList.toggle('scrolled',scrollY>30));document.querySelector('.menu-btn').addEventListener('click',e=>{topbar.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',topbar.classList.contains('open'))});document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>topbar.classList.remove('open')));
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
