const dishes=[
  ['APARADOR PRINCIPAL','Acompanhamentos','Salada, pão, vinagrete e farofa.'],
  ['ESTAÇÃO 01','Picanha Angus','Picanha Angus e legumes na brasa.'],
  ['ESTAÇÃO 02','Short Rib Angus','Short rib Angus e creme de mandioca rústico na manteiga e alho frito.'],
  ['ESTAÇÃO 03','Ancho Angus','Ancho Angus e creme de cabotiá com queijo e especiarias.'],
  ['ESTAÇÃO 04','Frango Lemon Pepper','Coxa e sobrecoxa desossada no lemon pepper e gremolata.'],
  ['ESTAÇÃO 05','Copa-lombo','Copa-lombo no mel e amora, acompanhado de vinagrete de abacaxi.']
];
const beers=[
  ['Torneira 01','artesanal','American Lager','Schornstein','assets/chopes/01-american-lager.webp'],
  ['Torneira 02','premium','Amstel Draft Beer','Amstel','assets/chopes/02-amstel.webp'],
  ['Torneira 03','premium','Amstel Dark','Strong Bock • puro malte','assets/chopes/03-amstel-dark.webp'],
  ['Torneira 04','artesanal','Blotts Black','Chopp escuro','assets/chopes/04-blotts-black.webp'],
  ['Torneira 05','artesanal','Blotts Pilsen','Chopp Pilsen','assets/chopes/05-blotts-pilsen.webp'],
  ['Torneira 06','premium','Blue Moon','Belgian-style wheat ale','assets/chopes/06-blue-moon.webp'],
  ['Torneira 07','artesanal','Brotas Black IPA','Lado Negro • puro malte','assets/chopes/07-brotas-black-ipa.webp'],
  ['Torneira 08','artesanal','Brotas Pilsen','Puro malte','assets/chopes/08-brotas-pilsen.webp'],
  ['Torneira 09','artesanal','Ecobier Escuro','Chopp escuro','assets/chopes/09-ecobier-escuro.webp'],
  ['Torneira 10','sem-alcool','Gunnen Zero','0,0% álcool','assets/chopes/10-gunnen-zero.webp'],
  ['Torneira 11','artesanal','Haller Chopp de Vinho','Especial de vinho','assets/chopes/11-haller-vinho.webp'],
  ['Torneira 12','premium','Heineken','Chopp puro malte','assets/chopes/12-heineken.webp'],
  ['Torneira 13','artesanal','Hop Lager','Dama Bier • puro malte','assets/chopes/13-hop-lager.webp'],
  ['Torneira 14','artesanal','QI APA','Dama Bier • puro malte','assets/chopes/14-qi-apa.webp'],
  ['Torneira 15','artesanal','Brotas Red Ale','Puro malte','assets/chopes/15-red-ale.webp'],
  ['Torneira 16','artesanal','Unicorn Session IPA','Chopp Session IPA','assets/chopes/16-unicorn.webp']
];
const beerGrid=document.querySelector('#beer-grid');
function renderBeers(filter='all'){beerGrid.innerHTML=beers.filter(b=>filter==='all'||b[1]===filter).map(b=>`<article class="beer-card"><div class="beer-sticker"><img src="${b[4]}" alt="Adesivo ${b[2]}" loading="lazy"></div><div class="beer-info"><span>${b[1].replace('-',' ')}</span><small>${b[0]}</small><b>${b[2]}</b><p>${b[3]}</p></div></article>`).join('')}
renderBeers();
document.querySelectorAll('[data-beer]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-beer]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderBeers(btn.dataset.beer)}));
document.querySelectorAll('.station-tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.station-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const d=dishes[+btn.dataset.station];document.querySelector('#dish-kicker').textContent=d[0];document.querySelector('#dish-title').textContent=d[1];document.querySelector('#dish-desc').textContent=d[2]}));
document.querySelectorAll('[data-map]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-map]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.pin').forEach(p=>{p.classList.toggle('dim',btn.dataset.map!=='all'&&!p.classList.contains(btn.dataset.map));p.classList.toggle('focus',btn.dataset.map!=='all'&&p.classList.contains(btn.dataset.map))})}));
document.querySelector('.map-link').addEventListener('click',()=>{location.hash='mapa';setTimeout(()=>document.querySelector('[data-map="alimentacao"]').click(),300)});
const target=new Date('2026-10-17T18:00:00-03:00');function tick(){const diff=Math.max(0,target-new Date());document.querySelector('[data-days]').textContent=String(Math.floor(diff/864e5)).padStart(2,'0');document.querySelector('[data-hours]').textContent=String(Math.floor(diff/36e5)%24).padStart(2,'0');document.querySelector('[data-minutes]').textContent=String(Math.floor(diff/6e4)%60).padStart(2,'0')}tick();setInterval(tick,60000);
const searchable=[...dishes.map((d,i)=>({t:d.join(' '),label:`Cardápio — ${d[1]}`,href:'#cardapio',action:()=>document.querySelector(`[data-station="${i}"]`).click()})),...beers.map(b=>({t:b.join(' '),label:`Chopp — ${b[0]}: ${b[2]}`,href:'#chopes'})),{t:'lince tribo botts chopeira carrinho chopp cerveja',label:'Mapa — Pontos de chopp',href:'#mapa',action:()=>document.querySelector('[data-map="chopp"]').click()},{t:'banheiro feminino masculino wc toalete',label:'Mapa — Banheiros',href:'#mapa',action:()=>document.querySelector('[data-map="banheiro"]').click()},{t:'palco banda música sertanejo pop rock pagode untold renato rodrigo barulhinho bom',label:'Programação — Bandas confirmadas',href:'#programacao'},{t:'mesa mesas número numerada',label:'Mapa — Mesas numeradas',href:'#mapa'},{t:'aparador alimentação estação 1 2 3 4 5 comida',label:'Mapa — Estações de alimentação',href:'#mapa',action:()=>document.querySelector('[data-map="alimentacao"]').click()},{t:'patrocinador master atalla francana gufe js fundição mazza fregolente metalarq',label:'Patrocinadores Master',href:'#parceiros'}];
const input=document.querySelector('#site-search'),results=document.querySelector('#search-results');input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();if(q.length<2){results.hidden=true;return}const found=searchable.filter(x=>x.t.toLowerCase().includes(q)).slice(0,6);results.innerHTML=found.length?found.map((x,i)=>`<a href="${x.href}" data-result="${searchable.indexOf(x)}">${x.label}</a>`).join(''):'<span>Nenhum item encontrado.</span>';results.hidden=false});results.addEventListener('click',e=>{const a=e.target.closest('[data-result]');if(!a)return;searchable[+a.dataset.result].action?.();results.hidden=true;input.value=''});
const topbar=document.querySelector('.topbar');addEventListener('scroll',()=>topbar.classList.toggle('scrolled',scrollY>30));document.querySelector('.menu-btn').addEventListener('click',e=>{topbar.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',topbar.classList.contains('open'))});document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>topbar.classList.remove('open')));
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
