/* WAMA — وضع الزائر: إخفاء بيانات الفريق + جولة صوتية + شات ذكي */
(function(){
'use strict';
var H=document.documentElement,$=function(i){return document.getElementById(i)},started=false,TTS=window.speechSynthesis,sndOn=true;
function isGuest(){return H.getAttribute('data-mode')==='guest'}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function norm(s){return String(s).toLowerCase().replace(/[\u064B-\u065F\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه')}

/* ---------- صوت (مشترك بين الجولة والشات) ---------- */
function pickVoice(){var v=((TTS&&TTS.getVoices())||[]).filter(function(x){return/^ar/i.test(x.lang)});return v.filter(function(x){return/EG/i.test(x.lang)})[0]||v[0]||null}
if(TTS&&TTS.addEventListener)TTS.addEventListener('voiceschanged',function(){});
function speak(text,done){
  var t=String(text).replace(/[*_`#>•]/g,' ').replace(/\s+/g,' ').trim(),fin=false,t0=Date.now(),minMs=Math.max(2500,t.length*55),tm;
  function f(){if(fin)return;fin=true;clearTimeout(tm);var w=Math.max(0,minMs-(Date.now()-t0));if(done)setTimeout(done,w)}
  if(!TTS||!window.SpeechSynthesisUtterance||!sndOn){setTimeout(f,0);return}
  try{TTS.cancel();var u=new SpeechSynthesisUtterance(t);u.lang='ar-EG';var v=pickVoice();if(v)u.voice=v;u.onend=u.onerror=f;tm=setTimeout(f,Math.max(6000,t.length*130));TTS.speak(u)}catch(e){f()}
}
function stopSpeak(){try{TTS&&TTS.cancel()}catch(e){}}

/* ---------- إخفاء بيانات الفريق ---------- */
function hideTeam(){
  var tm=$('team');if(tm){tm.hidden=true;tm.classList.add('team-only')}
  function strip(){document.querySelectorAll('#nvb button,#pn button,.hq button').forEach(function(b){if(/الفريق/.test(b.textContent)&&!b.closest('.uc'))b.remove()})}
  strip();var pn=$('pn');if(pn)new MutationObserver(strip).observe(pn,{childList:true,subtree:true});
  if(location.hash==='#team'&&window.WAMAGO)window.WAMAGO('home');
}
function chip(){
  var d=el('div','uc');d.appendChild(el('span',null,'وضع الزائر'));
  var b=el('button',null,'دخول الفريق');b.addEventListener('click',function(){try{sessionStorage.removeItem('wama_guest')}catch(e){}location.reload()});
  d.appendChild(b);var nv=$('nvb');if(nv)nv.appendChild(d);
}

/* ---------- ردود جاهزة (لو الـ API مش متاح) ---------- */
var KB=[
[/ايه هو|يعني ايه|عن المشروع|فكره المشروع|wama|وما/,'WAMA منظومة صيانة تنبؤية للمحركات الحثية ثلاثية الأوجه. بتحس بالعطل قبل ما يحصل (بلي، عدم اتزان، ملفات) وبتنبّه الفني، ومعاها مساعد صوتي بيرشده خطوة بخطوة، ومتربطة بأنظمة إدارة المباني BMS.'],
[/اكتشف|تكتشف|بتحس|كشف|تشخيص|fft|طيف/,'بنقرأ الاهتزاز والتيار والحرارة والصوت، وبنحلل الاهتزاز بـ FFT بـ 2048 نقطة ونقارنه بمعيار ISO 10816. التشخيص بيتاخد من القمم في الطيف، وبنحلل طيف التيار MCSA كمان لكشف أعطال الملفات والروتور.'],
[/حساس|حساسات|adxl|sct|ds18|sensor/,'الحساسات: ADXL345 للاهتزاز، INMP441 للصوت، 3 حساسات تيار SCT-013، محولات جهد، 4 حساسات حرارة DS18B20، حساسين Hall للمجال المغناطيسي، وحساس سرعة حثي، وDHT22 للحرارة والرطوبة.'],
[/صوت|صوتي|مساعد|whisper|piper|كلام/,'المساعد الصوتي بيشتغل محلياً بدون إنترنت: Whisper بيفهم الكلام، وموديل لغوي محلي بيستدل، وPiper بيرد بالصوت. بيقول للفني حالة الموتور ويرشده للصيانة.'],
[/طبقه|طبقات|معماريه|ازاي بيشتغل|شغال/,'أربع طبقات: الاستشعار، المعالجة الطرفية بكروت ESP32، العقل المركزي Raspberry Pi 5 (FFT والذكاء الاصطناعي والـ BMS)، وواجهات العرض (شاشة لمس 7 بوصة وشاشة BMS 24 بوصة ومساعد صوتي).'],
[/عطل|اعطال|بلي|اتزان|ملفات|محاذاه/,'بنكشف: بلي تالف، عدم اتزان، عطل ملفات، وعدم محاذاة. جرب صفحة المحاكاة أو الداشبورد وغيّر نوع العطل وشوف الطيف والتشخيص بيتغيروا قدامك.'],
[/iso|منطقه|معيار/,'معيار ISO 10816 بيقسم حالة الاهتزاز لـ 4 مناطق: A سليم، B مقبول، C تحذير، D خطر. المشروع بيصنف المحرك حسبه في الداشبورد.'],
[/ليد|لون|الوان/,'شريط LED RGB (WS2812B) بيوضح حالة المحرك بالألوان. تفاصيل كل لون في صفحة شيت الألوان.'],
[/موتور|محرك|محركات|كيلو/,'بيئة الاختبار فيها محركين حثيين: M1 قدرة 1.5 كيلووات وM2 قدرة 0.75 كيلووات، بلوحة قوى فيها كونتاكتورات وأوفرلود وقواطع حماية.'],
[/فريق|اسماء|اسم|طلبه|مين عمل|مشرف|id|تكلفه|ميزانيه|سعر|جامعه/,'بيانات الفريق والتكلفة متاحة للفريق ولجنة التحكيم بس. تقدر تبعت لنا رسالة من نموذج التواصل في آخر الصفحة.']
];
function fallback(q){var n=norm(q);for(var i=0;i<KB.length;i++)if(KB[i][0].test(n))return KB[i][1];return 'أنا دلوقتي بجاوب من الردود الجاهزة. اسألني عن فكرة المشروع، الحساسات، التشخيص بالـ FFT، المساعد الصوتي، أو الأعطال اللي بنكتشفها.'}

/* ---------- الشات الذكي ---------- */
var hist=[],busy=false,cp,body,inp,SR=window.SpeechRecognition||window.webkitSpeechRecognition,rec=null;
var FN={ok:'سليم',brg:'بلي تالف',unb:'عدم اتزان',wnd:'عطل ملفات',mis:'عدم محاذاة'};
function liveCtx(){try{var m=window.WAMA&&window.WAMA.cur&&window.WAMA.cur();if(!m)return'';return m.n+': '+(m.on?'شغال':'متوقف')+'، العطل المحاكى: '+(FN[m.f]||m.f)+'، السرعة '+Math.round(m.rpm)+' لفة/دقيقة، حرارة الملفات '+Math.round(m.T[0])+' درجة'}catch(e){return''}}
function addMsg(role,text){var m=el('div','gvm '+(role==='user'?'u':'a'),text);body.appendChild(m);body.scrollTop=body.scrollHeight;return m}
function send(q){
  q=(q||'').trim();if(!q||busy)return;busy=true;inp.value='';stopSpeak();
  addMsg('user',q);hist.push({role:'user',content:q});
  var w=addMsg('bot','…');w.classList.add('wait');
  var ctl=new AbortController(),to=setTimeout(function(){ctl.abort()},25000);
  fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:hist.slice(-8),context:liveCtx()}),signal:ctl.signal})
  .then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){if(!d||!d.reply)throw 0;return d.reply})
  .catch(function(){return fallback(q)})
  .then(function(a){clearTimeout(to);w.classList.remove('wait');w.className='gvm a';w.textContent=a;hist.push({role:'assistant',content:a});body.scrollTop=body.scrollHeight;busy=false;speak(a)});
}
function toggleChat(open){
  var show=open==null?cp.hidden:open;cp.hidden=!show;
  if(show){if(!body.children.length)addMsg('a','أهلاً بيك! أنا مساعد WAMA الذكي. اسألني عن فكرة المشروع، الحساسات، التشخيص بالـ FFT، أو الأعطال اللي بنكتشفها.');setTimeout(function(){inp.focus()},150)}else{stopSpeak();if(rec){try{rec.stop()}catch(e){}}}
}
function buildChat(){
  cp=el('div','gvc');cp.id='gvc';cp.hidden=true;cp.setAttribute('role','dialog');cp.setAttribute('aria-label','مساعد WAMA الذكي');
  var hd=el('div','gvc-h');hd.appendChild(el('b',null,'مساعد WAMA الذكي'));hd.appendChild(el('span','gvc-sp'));
  var sb=el('button',null,'🔊');sb.setAttribute('aria-label','تشغيل أو إيقاف الصوت');sb.addEventListener('click',function(){sndOn=!sndOn;sb.textContent=sndOn?'🔊':'🔇';if(!sndOn)stopSpeak()});
  var xb=el('button',null,'✕');xb.setAttribute('aria-label','إغلاق');xb.addEventListener('click',function(){toggleChat(false)});
  hd.appendChild(sb);hd.appendChild(xb);cp.appendChild(hd);
  body=el('div','gvc-b');body.setAttribute('aria-live','polite');cp.appendChild(body);
  var qs=el('div','gvc-q');['إيه هو WAMA؟','بتكتشفوا العطل إزاي؟','إيه الحساسات المستخدمة؟','المساعد الصوتي بيشتغل إزاي؟'].forEach(function(s){var b=el('button',null,s);b.addEventListener('click',function(){send(s)});qs.appendChild(b)});cp.appendChild(qs);
  var f=el('div','gvc-f');
  var mic=el('button','gvc-mic','🎤');mic.setAttribute('aria-label','اتكلم');
  mic.addEventListener('click',function(){
    if(!SR){addMsg('a','المتصفح ده مش بيدعم التعرف على الصوت. جرّب Chrome أو اكتب سؤالك.');return}
    if(rec){try{rec.stop()}catch(e){}return}
    stopSpeak();rec=new SR();rec.lang='ar-EG';rec.interimResults=false;
    rec.onstart=function(){mic.classList.add('on')};
    rec.onresult=function(e){send(e.results[0][0].transcript)};
    rec.onerror=function(e){if(e.error==='not-allowed'||e.error==='service-not-allowed')addMsg('a','المايك مش مسموح. اسمح بالميكروفون للصفحة من إعدادات المتصفح، أو اكتب سؤالك.')};
    rec.onend=function(){mic.classList.remove('on');rec=null};
    try{rec.start()}catch(e){rec=null}});
  inp=el('input');inp.type='text';inp.maxLength=300;inp.placeholder='اسأل عن المشروع…';inp.setAttribute('aria-label','سؤالك');
  inp.addEventListener('keydown',function(e){if(e.key==='Enter')send(inp.value)});
  var sd=el('button','go','إرسال');sd.addEventListener('click',function(){send(inp.value)});
  f.appendChild(mic);f.appendChild(inp);f.appendChild(sd);cp.appendChild(f);document.body.appendChild(cp);
}

/* ---------- الجولة الصوتية ---------- */
function sec(p,i){var l=document.querySelectorAll('section[data-p="'+p+'"]');return l[i||0]||null}
var STEPS=[
{p:'home',t:function(){return sec('home',0)},say:'أهلاً بيك في WAMA. المحركات الحثية ثلاثية الأوجه هي عصب خطوط الإنتاج. ولما محرك يعطل فجأة، الخط كله بيقف. فكرة WAMA إنها تحس بالعطل قبل ما يحصل بأسابيع، وتنبّه الفني بدري.'},
{p:'home',t:function(){return sec('home',1)},say:'المشروع شغال في أربع طبقات. حساسات على المحرك، وكروت ESP32 بتنضف الإشارة، وراسبيري باي فايف هو العقل المركزي بتاع التحليل والذكاء الاصطناعي، وبعدين شاشات ومساعد صوتي بيعرضوا الحالة.'},
{p:'parts',t:function(){return sec('parts',0)},say:'دي الحساسات. اهتزاز، وتيار الأطوار الثلاثة، وحرارة، وصوت، ومجال مغناطيسي. كل نوع بيكشف عطل مختلف، وعشان كده بنقرأهم كلهم مع بعض.'},
{p:'sim',t:function(){return $('sim')},act:function(){var b=document.querySelector('#mf [data-k="brg"]');if(b)b.click()},say:'دلوقتي اخترت لك عطل بلي تالف. شوف الاهتزاز زاد وطيف الـ FFT اتغير، والنظام بيحدد العطل من القمم اللي ظهرت في الطيف.'},
{p:'dash',t:function(){return $('dash')},say:'ده الداشبورد. موتورين شغالين، والـ FFT بيتحسب فعلاً على الإشارة. وفيه تحليل تيار MCSA، وتنبؤ بالعمر المتبقي، والحماية بتفصل الكونتاكتور لما الحالة توصل للخطر. جرب تغير العطل بنفسك.'},
{p:'twin',t:function(){return $('twin')},say:'وده مشهد المشروع كامل: المحرك والحساسات وكروت ESP32 والراسبيري باي والشاشات. اضغط على أي رقم حساس تشوف قراءته الحية، وتقدر تسأل المساعد الصوتي هنا بصوتك.'},
{p:'colors',t:function(){return $('colors')},say:'وده شيت الألوان. كل لون على الشاشة وشريط الـ LED ليه معنى ثابت، من الأخضر السليم لحد الأحمر الخطر.'},
{p:'home',t:function(){return document.querySelector('.hero')},say:'كده الجولة خلصت. تقدر دلوقتي تسأل مساعد WAMA الذكي أي سؤال عن المشروع، بالكتابة أو بصوتك.',end:true}
];
var tb,tcap,tcnt,tpp,ti=-1,tact=false,tpaused=false,ttm=null;
function tourStop(){tact=false;tpaused=false;clearTimeout(ttm);stopSpeak();if(tb)tb.hidden=true;document.querySelectorAll('.gv-hl').forEach(function(e){e.classList.remove('gv-hl')})}
function runStep(i){
  if(!tact)return;if(i>=STEPS.length){tourStop();return}
  ti=i;var s=STEPS[i];tcnt.textContent=(i+1)+' / '+STEPS.length;tcap.textContent=s.say;
  if(window.WAMAGO)window.WAMAGO(s.p);
  document.querySelectorAll('.gv-hl').forEach(function(e){e.classList.remove('gv-hl')});
  ttm=setTimeout(function(){
    if(!tact)return;var e=s.t();if(e){e.classList.add('gv-hl');var top=e.getBoundingClientRect().top+window.scrollY-70;window.scrollTo({top:Math.max(0,top),behavior:'smooth'})}
    if(s.act)try{s.act()}catch(x){}
    speak(s.say,function(){if(!tact||tpaused)return;ttm=setTimeout(function(){if(s.end){tourStop();toggleChat(true)}else runStep(i+1)},900)});
  },600);
}
function tourStart(){tact=true;tpaused=false;tb.hidden=false;tpp.textContent='⏸';toggleChat(false);runStep(0)}
function buildTour(){
  tb=el('div','gvt');tb.hidden=true;tb.setAttribute('role','region');tb.setAttribute('aria-label','الجولة الصوتية');
  tcap=el('p','gvt-c');tcap.setAttribute('aria-live','polite');
  var r=el('div','gvt-r');tcnt=el('span','gvt-n');
  tpp=el('button',null,'⏸');tpp.setAttribute('aria-label','إيقاف مؤقت');
  tpp.addEventListener('click',function(){if(tpaused){tpaused=false;tpp.textContent='⏸';runStep(ti)}else{tpaused=true;tpp.textContent='▶';clearTimeout(ttm);stopSpeak()}});
  var nx=el('button',null,'التالي ›');nx.addEventListener('click',function(){clearTimeout(ttm);stopSpeak();tpaused=false;tpp.textContent='⏸';runStep(ti+1)});
  var st=el('button',null,'إنهاء');st.addEventListener('click',tourStop);
  r.appendChild(tcnt);r.appendChild(tpp);r.appendChild(nx);r.appendChild(st);tb.appendChild(tcap);tb.appendChild(r);document.body.appendChild(tb);
}

/* ---------- الواجهة ---------- */
function banner(){
  var hero=document.querySelector('.hero');if(!hero)return;
  var w=el('div','wrap'),b=el('div','gv-ban'),x=el('div');x.appendChild(el('b',null,'أهلاً بيك في WAMA 👋'));x.appendChild(el('span',null,'أنت داخل كزائر. تحب نعرّفك بالمشروع بالصوت، ولا تسأل المساعد الذكي؟'));
  var a=el('div','gv-act'),t=el('button','go','🎬 ابدأ الجولة الصوتية'),c=el('button','go ghost','💬 اسأل WAMA');
  t.addEventListener('click',tourStart);c.addEventListener('click',function(){toggleChat(true)});a.appendChild(t);a.appendChild(c);b.appendChild(x);b.appendChild(a);w.appendChild(b);hero.insertAdjacentElement('afterend',w);
}
function fab(){var b=el('button','gv-fab','💬');b.setAttribute('aria-label','اسأل مساعد WAMA');b.addEventListener('click',function(){toggleChat()});document.body.appendChild(b)}
function init(){if(started||!isGuest())return;started=true;hideTeam();chip();banner();fab();buildChat();buildTour()}
window.addEventListener('wama-guest',init);
if(isGuest())init();
})();
