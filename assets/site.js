(function(){
  var root=document.documentElement;
  function tok(n){return getComputedStyle(root).getPropertyValue(n).trim();}
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
  function $(id){return document.getElementById(id);}
  function rub(v){return Math.round(v).toLocaleString('ru-RU').replace(/,/g,' ');}
  function mln(v){if(v>=1e9)return (v/1e9).toFixed(2).replace('.',',')+' млрд ₽';var m=v/1e6;return (m>=100?Math.round(m):m>=10?m.toFixed(1):m.toFixed(2)).toString().replace('.',',')+' млн ₽';}
  function D(s){var p=s.split('.');return Date.UTC(+p[2],+p[1]-1,+p[0]);}
  function legend(id,items){var ul=$(id);if(!ul)return;ul.textContent='';items.forEach(function(it){var li=el('li'),i=el('i');i.style.background=it[1];li.appendChild(i);li.appendChild(document.createTextNode(it[0]));ul.appendChild(li);});}
  var narrow=function(){return window.innerWidth<640;};

  /* стрелки клавиатуры листают подстраницы */
  document.addEventListener('keydown',function(e){
    if(e.altKey||e.ctrlKey||e.metaKey)return;var t=e.target.tagName;if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT'||e.target.getAttribute('role')==='tab')return;
    var a=document.querySelector(e.key==='ArrowRight'?'.pager .next':e.key==='ArrowLeft'?'.pager .prev':null);if(a)location.href=a.href;
  });
  var cur=document.querySelector('.steps [aria-current]');if(cur&&cur.scrollIntoView)cur.scrollIntoView({block:'nearest',inline:'center'});

  /* таблицы-карточки на телефоне */
  document.querySelectorAll('table.cards').forEach(function(t){var h=[].map.call(t.querySelectorAll('thead th'),function(x){return x.textContent;});t.querySelectorAll('tbody tr').forEach(function(r){[].forEach.call(r.cells,function(td,i){if(h[i])td.setAttribute('data-l',h[i]);});});});

  /* вкладки ролей */
  var tabs=document.querySelectorAll('.role-list [role=tab]');
  tabs.forEach(function(t,i){
    t.tabIndex=i===0?0:-1;
    t.onclick=function(){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on?'true':'false');x.tabIndex=on?0:-1;$(x.getAttribute('aria-controls')).hidden=!on;});};
    t.onkeydown=function(e){var n=null;if(e.key==='ArrowDown'||e.key==='ArrowRight')n=tabs[(i+1)%tabs.length];if(e.key==='ArrowUp'||e.key==='ArrowLeft')n=tabs[(i-1+tabs.length)%tabs.length];if(n){e.preventDefault();n.click();n.focus();}};
  });

  /* матрица идей */
  var CRIT=['Есть деньги у заказчика','Заставляет закон','Мало конкурентов','Быстро запустить'];
  var HYP=[
    {n:'Кнопка вызова с журналом',s:[3,4,4,5],win:1,w:[
      ['Отдельные закупки кнопок мелкие, до 1 млн ₽. Крупные деньги в закупках дирекции вокзалов на оснащение залов, до 34 млн ₽, где кнопка одна из строк.','https://rostender.info/tender/94115199','rostender'],
      ['В аэропортах закон прямой: кнопка исправна, сотрудник приходит за 20 минут. На вокзалах мягче. Давит прокуратура.','http://publication.pravo.gov.ru/file/pdf?eoNumber=0001202601150014','приказ № 368'],
      ['Кнопки продают десятки компаний, но кнопку, которая сама сообщает об исправности и ведёт журнал, не нашли ни у кого.','https://tiflocentre.ru/knopki-vyzova-pomoshhi-sistema-do-999-tochek.php','Тифлоцентр'],
      ['Всё оборудование продаётся в России готовым, российская кнопка для сети стоит 7 980 ₽. Пилот можно провести без большого конкурса.','https://iotvega.com/product','Вега']]},
    {n:'Туалет под контролем датчиков',s:[4,2,4,3],win:1,w:[
      ['Уборка самая большая регулярная трата: у Шереметьево 2,07 млрд ₽ на три года, у вокзалов 15–75 млн ₽ за лот. Датчики придётся оплачивать из этих денег.','https://rostender.info/tender/88692692','rostender'],
      ['Закон требует следить за курением (штраф организации до 90 тыс. ₽) и держать график уборки. Ставить датчики не требует нигде.','https://www.zakonrf.info/koap/6.25/','КоАП'],
      ['В туалетах вокзалов и аэропортов России датчиков не нашли. Ближайшее похожее решение сделано для офисов.','https://www.thingularity.ru/building/smart-wc','Thingularity'],
      ['Датчики продаются, но почти всё под заказ. Требование о датчиках можно вписать только в следующий контракт на уборку.','https://aladis.ru/milesight-iot/datchiki-dlya-ofisa','Аладис']]},
    {n:'Учёт инвалидных колясок',s:[1,1,3,3],w:[
      ['Ни одной российской закупки не нашли.',null,null],
      ['Закон требует выдать коляску, а не знать, где она.','http://publication.pravo.gov.ru/file/pdf?eoNumber=0001202601150014','приказ № 368'],
      ['Конкурентов нет, потому что за это никто не платит.',null,null],
      ['Метки дешёвые, но на аэропорт их нужно несколько десятков.',null,null]]},
    {n:'Датчики в здании вокзала',s:[2,1,1,2],w:[
      ['Деньги идут через инвестпрограмму РЖД, вокзалам достаётся мало.','https://gudok.ru/content/economy/1692575/','Гудок'],
      ['Обязанности не нашли.',null,null],
      ['У РЖД своя система «Умный вокзал» на 35 комплексов.','https://www.comnews.ru/digital-economy/content/111389/news/2018-01-23/umnyy-vokzal-dlya-bolelshchikov','ComNews'],
      ['Пришлось бы встраиваться в чужую систему.',null,null]]},
    {n:'Очереди без камер',s:[2,1,1,2],w:[
      ['Лидары дорогие: в Гонолулу $6 млн на два терминала.','https://hidot.hawaii.gov/?p=16269','HDOT'],
      ['За очередь не наказывают, наказывают за плохой досмотр.',null,null],
      ['В Пулково уже стоит российская видеоаналитика.','https://www.fontanka.ru/2025/06/02/75536015/','Фонтанка'],
      ['Конкурировать с камерами, которые уже висят.',null,null]]},
    {n:'Парковка по местам',s:[1,1,2,1],w:[
      ['Большие траты в годы убытков: у аэропорта Воронежа минус 639 млн ₽ за 2025.','https://www.kommersant.ru/doc/8738652','Коммерсантъ'],
      ['Обязанности не нашли.',null,null],
      ['Это рынок парковочных компаний.',null,null],
      ['Тысячи датчиков: в Стамбуле 3 300.',null,null]]}];
  var hm=$('hm'),why=$('why');
  function showWhy(hi,ci){var h=HYP[hi],w=h.w[ci];why.textContent='';why.appendChild(el('b',null,h.n+'. '+CRIT[ci]+': '+h.s[ci]+' из 5.'));why.appendChild(document.createTextNode(' '+w[0]+' '));if(w[1]){var a=el('a','src',w[2]);a.href=w[1];why.appendChild(a);}hm.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',(b.dataset.h==hi&&b.dataset.c==ci)?'true':'false');});}
  if(hm){
    var th=el('thead'),tr=el('tr');tr.appendChild(el('th',null,'Идея'));CRIT.forEach(function(c){tr.appendChild(el('th',null,c));});tr.appendChild(el('th',null,'Итого'));th.appendChild(tr);hm.appendChild(th);
    var tb=el('tbody');HYP.forEach(function(h,hi){var r=el('tr',h.win?'win':'');r.appendChild(el('td',null,h.n));h.s.forEach(function(v,ci){var td=el('td','sc s'+v),b=el('button',null,String(v));b.type='button';b.dataset.h=hi;b.dataset.c=ci;b.setAttribute('aria-label',h.n+', '+CRIT[ci]+': '+v+' из 5. Показать почему');b.onclick=function(){showWhy(hi,ci);};td.appendChild(b);r.appendChild(td);});r.appendChild(el('td','sum',String(h.s.reduce(function(a,b){return a+b;},0))));tb.appendChild(r);});hm.appendChild(tb);showWhy(0,1);
  }

  /* ---------- графики ---------- */
  if(!window.Chart||!document.querySelector('canvas')){if(!window.Chart)document.querySelectorAll('.chartbox').forEach(function(b){b.hidden=true;});return;}
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  Chart.defaults.animation=(reduce||navigator.webdriver)?false:{duration:450};
  Chart.defaults.maintainAspectRatio=false;
  Chart.defaults.font.family='"IBM Plex Sans", system-ui, sans-serif';Chart.defaults.font.size=13;
  Chart.defaults.plugins.legend.display=false;
  Chart.register({id:'endLabel',afterDatasetsDraw:function(ch,a,o){if(!o||!o.fmt)return;var m=ch.getDatasetMeta(o.ds==null?ch.data.datasets.length-1:o.ds),c=ch.ctx;c.save();c.font='600 13px "IBM Plex Sans", sans-serif';c.fillStyle=tok('--ink');c.textBaseline='middle';m.data.forEach(function(e,i){var t=o.fmt(i);if(t!=null)c.fillText(t,e.x+6,e.y);});c.restore();}},
    {id:'valueTop',afterDatasetsDraw:function(ch,a,o){if(!o||!o.fmt)return;var m=ch.getDatasetMeta(0),c=ch.ctx;c.save();c.font='700 18px "PT Sans Narrow", sans-serif';c.fillStyle=tok('--ink');c.textAlign='center';m.data.forEach(function(e,i){c.fillText(o.fmt(i),e.x,e.y-7);});c.restore();}});
  var charts={};
  function base(){var c={ink:tok('--ink'),mute:tok('--mute'),line:tok('--line'),card:tok('--card'),signal:tok('--signal')};Chart.defaults.color=c.mute;Chart.defaults.borderColor=c.line;var t=Chart.defaults.plugins.tooltip;t.backgroundColor=tok('--board');t.titleColor='#fff';t.bodyColor='#e9eef0';t.footerColor='#a9b8bd';t.padding=10;t.cornerRadius=8;t.titleFont={family:'"PT Sans Narrow", sans-serif',size:16,weight:'700'};t.boxWidth=12;t.boxHeight=3;return c;}
  function grid(c){return {color:c.line,drawTicks:false};}
  function logGrid(c,v){return {color:function(x){return x.tick&&v.indexOf(x.tick.value)>=0?c.line:'transparent';},drawTicks:false};}
  function mk(id,cfg){if(charts[id])charts[id].destroy();var cv=$(id);if(cv)charts[id]=new Chart(cv,cfg);}
  function wrap(s,n){var w=s.split(' '),o=[],cur='';w.forEach(function(x){if((cur+' '+x).trim().length>n){if(cur)o.push(cur);cur=x;}else cur=(cur+' '+x).trim();});if(cur)o.push(cur);return o;}

  var LOTS={
    mgn:[['Оснащение 5 вокзалов: Пенза, Петербург, Ульяновск, Улан-Удэ, Тюмень',28454903,'11.08.2026','https://rostender.info/tender/94115199',1],['Оснащение залов, Московская дирекция',21345288,'04.03.2026','https://rostender.info/tender/30589913376',1],['Оснащение вокзалов, Ставропольский край',17983199,'29.05.2026','https://rostender.info/tender/92654085',1],['Оснащение, вокзал Курск',9313121,'24.02.2026','https://rostender.info/tender/30591689450',1],['Ремонт и оснащение залов',33683715,'31.12.2025','https://rostender.info/tender/30591658842',1],['Ремонт и оснащение зала, Кировская область',33683716,'30.12.2025','https://rostender.info/tender/30589426300',1],['Подъёмная платформа, Москва',695126,'07.05.2026','https://rostender.info/tender/92150293',0],['Сопровождение пассажиров, Астрахань, Волгоград, Саратов',1988180,'05.11.2024','https://rostender.info/tender/79437095',0],['Дизайн залов, Северо-Западная дирекция',791928,'12.03.2025','https://rostender.info/tender/82319437',0],['Тактильные указатели, Свердловская область',441699,'31.03.2025','https://rostender.info/tender/82825698',0],['Кнопки вызова персонала, Ярославль',362805,'24.10.2024','https://rostender.info/tender/79171252',2],['Ремонт под зал, Нижегородская область',325341,'18.07.2024','https://rostender.info/tender/77199847',0],['Система для слуховых аппаратов, Петербург',320944,'27.05.2024','https://rostender.info/tender/76103706',0],['Мебель для зала, Псков',283111,'23.10.2024','https://rostender.info/tender/79122005',0],['Дизайн залов, Северо-Кавказская дирекция',266918,'10.07.2025','https://rostender.info/tender/85126424',0],['Дизайн залов, Астрахань и Волгоград',252880,'26.02.2025','https://rostender.info/tender/81957273',0],['Петля для слуховых аппаратов, Красноярск',99600,'22.05.2025','https://rostender.info/tender/84053515',0]],
    vok:[['Западно-Сибирская дирекция, пять регионов',74452746,'25.03.2026','https://rostender.info/tender/91039165'],['Западно-Сибирская дирекция, Алейск, Бийск',74335366,'05.02.2026','https://rostender.info/tender/89747609'],['Горьковская дирекция, Дзержинск, Йошкар-Ола',59876144,'03.04.2026','https://rostender.info/tender/91314564'],['Восточно-Сибирская дирекция, Братск',48187919,'27.03.2026','https://rostender.info/tender/91101428'],['Приволжская дирекция, 13 малых вокзалов',42407421,'08.10.2026','https://rostender.info/tender/95542364'],['Приволжская дирекция, Астраханская область',38850526,'30.09.2025','https://rostender.info/tender/86789874'],['Северная дирекция, шесть регионов',33663210,'23.03.2026','https://rostender.info/tender/90957557'],['Куйбышевская дирекция, вокзал Уфа',21955061,'16.06.2026','https://rostender.info/tender/93093686'],['Дальневосточная дирекция',19087109,'02.12.2025','https://rostender.info/tender/88406297'],['Куйбышевская дирекция, Мордовия',16919474,'05.09.2025','https://rostender.info/tender/86270438'],['Северо-Кавказская дирекция, генуборка',15718160,'21.04.2026','https://rostender.info/tender/91752048'],['Восточно-Сибирская дирекция, Бурятия',12730850,'22.12.2025','https://rostender.info/tender/89020826'],['Генуборка вокзала Нижний Новгород',6318610,'04.05.2026','https://rostender.info/tender/92053910'],['Генуборка вокзала Екатеринбург',3520508,'12.08.2026','https://rostender.info/tender/94303493']],
    air:[['Шереметьево, терминалы B и C, три года',2071463604,'10.12.2025','https://rostender.info/tender/88692692'],['Шереметьево, терминал D',441588626,'15.01.2025','https://expertcentre.org/purchase/6771d4d4a6023b43b3e612ae'],['Приморский край, аэровокзал',253334952,'13.02.2026','https://rostender.info/tender/30592311836'],['Красноярск, терминалы 1 и 2',168789600,'23.04.2026','https://rostender.info/tender/91824967'],['Омск, пассажирское здание',31030594,'11.09.2025','https://rostender.info/tender/86371727'],['Сургут, аэровокзал',17500000,'22.06.2026','https://rostender.info/tender/93224354'],['Киров, Победилово',10254000,'09.07.2026','https://rostender.info/tender/93640031'],['Архангельск, служебные помещения',2914998,'04.12.2025','https://rostender.info/tender/88502671']]};

  var B=[];
  if($('c-lots'))B.push(function(){
    var c=base(),d=LOTS.mgn,cols=[c.mute,c.ink,c.signal],names=['Отдельные работы','Оснащение вокзалов целиком','Кнопки вызова отдельно'];
    legend('lg-lots',[[names[1],cols[1]],[names[0],cols[0]],[names[2],cols[2]]]);
    mk('c-lots',{type:'scatter',data:{datasets:[0,1,2].map(function(k){return {label:names[k],data:d.filter(function(x){return x[4]===k;}).map(function(x){return {x:D(x[2]),y:x[1],r:x};}),backgroundColor:cols[k],borderColor:c.card,borderWidth:2,pointRadius:k===1?8:6,pointHoverRadius:10,pointHitRadius:12};})},
      options:{layout:{padding:{top:6,right:10}},scales:{x:{type:'linear',min:Date.UTC(2024,3,1),max:Date.UTC(2026,9,31),grid:grid(c),border:{display:false},ticks:{maxRotation:0,maxTicksLimit:narrow()?4:7,callback:function(v){var t=new Date(v);return ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'][t.getUTCMonth()]+' '+String(t.getUTCFullYear()).slice(2);}}},y:{type:'logarithmic',min:50000,max:60000000,grid:logGrid(c,[100000,1000000,10000000,50000000]),border:{display:false},ticks:{callback:function(v){return {100000:'0,1 млн',1000000:'1 млн',10000000:'10 млн',50000000:'50 млн'}[v]||'';}}}},
        plugins:{tooltip:{callbacks:{title:function(it){return mln(it[0].raw.r[1]);},label:function(it){return wrap(it.raw.r[0],44);},footer:function(it){return it[0].raw.r[2]+', открыть по клику';}}}},
        onClick:function(e,els){if(els.length){var r=charts['c-lots'].data.datasets[els[0].datasetIndex].data[els[0].index].r;window.open(r[3],'_blank','noopener');}}}});
  });
  var money='air';
  if($('c-clean'))B.push(function(){
    var c=base(),d=LOTS[money],air=money==='air',box=$('box-clean');box.style.height=(d.length*(narrow()?32:28)+70)+'px';
    $('clean-note').textContent=air?'Шкала логарифмическая: Шереметьево тратит около 690 млн ₽ в год, это в сотни раз больше Архангельска.':'Почти все лоты уборки вокзалов только для малого бизнеса. Средний лот около 20 млн ₽.';
    mk('c-clean',{type:'bar',data:{labels:d.map(function(x){return wrap(x[0],narrow()?18:40);}),datasets:[{data:d.map(function(x){return x[1];}),backgroundColor:d.map(function(x,i){return i===0?c.signal:c.ink;}),borderRadius:{topRight:4,bottomRight:4},borderSkipped:false,maxBarThickness:16}]},
      options:{indexAxis:'y',layout:{padding:{right:74}},scales:{x:air?{type:'logarithmic',min:1e6,max:3e9,grid:logGrid(c,[1e6,1e7,1e8,1e9]),border:{display:false},ticks:{maxRotation:0,autoSkip:false,callback:function(v){return {1e6:'1 млн',1e7:'10 млн',1e8:'100 млн',1e9:'1 млрд'}[v]||'';}}}:{min:0,grid:grid(c),border:{display:false},ticks:{maxRotation:0,maxTicksLimit:5,callback:function(v){return v/1e6+' млн';}}},y:{grid:{display:false},border:{display:false},ticks:{color:c.ink,autoSkip:false,font:{size:narrow()?11:12.5}}}},
        plugins:{endLabel:{fmt:function(i){return mln(d[i][1]);}},tooltip:{callbacks:{title:function(it){return d[it[0].dataIndex][0];},label:function(it){return ' '+rub(d[it.dataIndex][1])+' ₽, '+d[it.dataIndex][2];},footer:function(){return 'Открыть по клику';}}}},
        onClick:function(e,els){if(els.length)window.open(d[els[0].index][3],'_blank','noopener');}}});
  });
  document.querySelectorAll('[data-money]').forEach(function(b,i,bs){b.onclick=function(){bs.forEach(function(x){x.setAttribute('aria-selected',x===b?'true':'false');});money=b.getAttribute('data-money');B.forEach(function(f){if(f.clean)f();});};});
  if($('c-clean'))B[B.length-1].clean=1;
  if($('c-share'))B.push(function(){
    var c=base();
    mk('c-share',{type:'bar',data:{labels:['2022','2023','2024'],datasets:[{data:[27.5,29.5,30.5],backgroundColor:c.ink,borderRadius:{topLeft:4,topRight:4},borderSkipped:false,maxBarThickness:48}]},options:{layout:{padding:{top:24}},scales:{y:{min:0,max:100,grid:grid(c),border:{display:false},ticks:{stepSize:25,callback:function(v){return v+'%';}}},x:{grid:{display:false},border:{display:false},ticks:{color:c.ink}}},plugins:{valueTop:{fmt:function(i){return ['27,5%','29,5%','30,5%'][i];}},tooltip:{callbacks:{label:function(it){return ' '+String(it.raw).replace('.',',')+'% вокзалов соответствуют';}}}}}});
    mk('c-halls',{type:'bar',data:{labels:['2022','2023','2024','сен 2026'],datasets:[{data:[4,22,52,70],backgroundColor:[c.ink,c.ink,c.ink,c.signal],borderRadius:{topLeft:4,topRight:4},borderSkipped:false,maxBarThickness:48}]},options:{layout:{padding:{top:24}},scales:{y:{min:0,max:80,grid:grid(c),border:{display:false},ticks:{stepSize:20}},x:{grid:{display:false},border:{display:false},ticks:{color:c.ink}}},plugins:{valueTop:{fmt:function(i){return String([4,22,52,70][i]);}},tooltip:{callbacks:{label:function(it){return ' '+it.raw+' залов';}}}}}});
  });
  if($('c-funnel'))B.push(function(){
    var c=base(),L=[['62 примера','внедрения в аэропортах и на вокзалах мира, 2022–2026'],['20 решений','из больниц, школ, стадионов, домов престарелых'],['6 идей','прошли первый отбор'],['2 гипотезы','остались после проверки на провал']];
    mk('c-funnel',{type:'bar',data:{labels:L.map(function(x){return x[0];}),datasets:[{data:[62,20,6,2],backgroundColor:[c.ink,c.ink,c.ink,c.signal],borderRadius:{topRight:4,bottomRight:4},borderSkipped:false,maxBarThickness:24}]},options:{indexAxis:'y',scales:{x:{display:false,max:66},y:{grid:{display:false},border:{display:false},ticks:{color:c.ink,font:{family:'"PT Sans Narrow", sans-serif',size:18,weight:'700'}}}},plugins:{tooltip:{callbacks:{title:function(it){return L[it[0].dataIndex][0];},label:function(it){return ' '+L[it.dataIndex][1];}}}}}});
  });
  function renderAll(){B.forEach(function(f){try{f();}catch(e){console.error(e);}});}
  renderAll();
  if(document.fonts&&document.fonts.load)Promise.all([document.fonts.load('700 18px "PT Sans Narrow"'),document.fonts.load('600 13px "IBM Plex Sans"')]).then(renderAll,function(){});
  if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',renderAll);
  var lw=window.innerWidth,rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){if((window.innerWidth<640)!==(lw<640)){lw=window.innerWidth;renderAll();}},200);});
})();
