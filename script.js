/* WAMA — script.js
   كل الأكواد بالترتيب نفسه اللي كانت عليه في الصفحة الواحدة.
   كل جزء داخل (function(){ ... })() فمفيش تعارض بينهم. */

/* ===== part 1 ===== */
(function(){
var w=document.getElementById('wave'),n=47,h='';
for(var i=0;i<n;i++){var x=(i-(n-1)/2)/((n-1)/2),v=Math.max(.12,Math.cos(x*Math.PI/2)*(.6+.4*Math.abs(Math.sin(i*1.7))));
h+='<i style="--h:'+v.toFixed(2)+';--d:'+(i*60)+'"></i>';}
w.innerHTML=h;
var bs=document.querySelectorAll('.chips button'),cs=document.querySelectorAll('#sg .s');
bs.forEach(function(b){b.addEventListener('click',function(){
bs.forEach(function(o){o.setAttribute('aria-pressed',o===b)});
cs.forEach(function(c){c.hidden=!(b.dataset.f==='all'||c.dataset.c===b.dataset.f)});});});
document.getElementById('ask').addEventListener('click',function(){document.getElementById('chat').classList.add('on')});
})();

/* ===== part 2 ===== */
(function(){
var $=function(i){return document.getElementById(i)},fault='ok',t=0,fr=0,zl='A',
N={ok:'سليم',brg:'بلي تالف',unb:'عدم اتزان',wnd:'عطل ملفات'},
Z={A:['سليم','لا يحتاج صيانة','#22c55e'],B:['مقبول','تابع القراءات','#facc15'],C:['تحذير','حدّد موعد صيانة قريب','#f97316'],D:['خطر','أوقف المحرك الآن','#ff2a1f']},
cw=$('mcw'),cs=$('mcs'),gw=cw.getContext('2d'),gs=cs.getContext('2d'),txt='';
function fit(c,g){var r=c.getBoundingClientRect(),d=window.devicePixelRatio||1;c.width=r.width*d;c.height=r.height*d;g.setTransform(d,0,0,d,0,0)}
function fitAll(){fit(cw,gw);fit(cs,gs)}
window.addEventListener('resize',fitAll);fitAll();
function S(){
var sv=$('msv').value/100,ld=$('mld').value/100,f=fault==='ok'?0:sv,sl=.01+.035*ld,rpm=1500*(1-sl),f1=rpm/60,I=2+4*ld,T=45+30*ld,
pk=[[f1,.5+.4*ld],[100,.12]],im=[1,1,1],li=[[0,'1X']];
if(fault==='unb'){pk[0][1]+=6*f;pk.push([2*f1,1.2*f]);T+=8*f}
if(fault==='brg'){var b=3.58*f1;li.push([pk.length,'BPFO']);pk.push([b,5*f+.05],[2*b,3*f],[b-f1,2*f],[b+f1,2*f]);T+=22*f}
if(fault==='wnd'){li.push([pk.length,'2×50Hz']);pk.push([100,4*f],[f1,.8*f]);im=[1,1+.35*f,1-.3*f];T+=30*f;I*=1+.1*f}
var q=.0025;pk.forEach(function(p){q+=p[1]*p[1]/2});
return{pk:pk,li:li,im:im,I:I,T:T,rpm:rpm,f1:f1,rms:Math.sqrt(q),f:f}}
function dw(s){var w=cw.clientWidth,h=cw.clientHeight;gw.clearRect(0,0,w,h);
gw.strokeStyle='#2a2a2a';gw.lineWidth=1;gw.beginPath();gw.moveTo(0,h/2);gw.lineTo(w,h/2);gw.stroke();
gw.strokeStyle='#ff2a1f';gw.lineWidth=1.6;gw.beginPath();
for(var x=0;x<w;x++){var tt=t+x/3000,y=(Math.random()-.5)*.3;
for(var k=0;k<s.pk.length;k++)y+=s.pk[k][1]*Math.sin(6.2832*s.pk[k][0]*tt);
var py=h/2-y*(h/2)/12;x?gw.lineTo(x,py):gw.moveTo(x,py)}gw.stroke()}
function dsp(s){var w=cs.clientWidth,h=cs.clientHeight,nb=Math.min(100,Math.floor(w/5)),bw=w/nb,hh=h-20,m=hh/2,st=400/nb;gs.clearRect(0,0,w,h);
for(var i=0;i<nb;i++){var fb=i*st,a=.03+Math.random()*.03;
s.pk.forEach(function(p){a+=p[1]*Math.exp(-Math.pow((fb-p[0])/(st*.8),2))});
a*=.94+Math.random()*.12;var bh=Math.max(1,Math.min(1,a/9)*m);
gs.fillStyle=a>1.8?'#ff2a1f':'#9c1a14';gs.fillRect(i*bw+bw*.2,m-bh,bw*.6,bh*2)}
gs.font='12px Cairo,sans-serif';gs.textAlign='center';gs.fillStyle='#fff';
s.li.forEach(function(l){var p=s.pk[l[0]];gs.fillText(l[1],Math.min(w-22,Math.max(22,p[0]/400*w)),Math.max(11,m-Math.min(1,p[1]/9)*m-5))});
gs.fillStyle='#a8a8a8';[0,100,200,300,400].forEach(function(v,i){gs.textAlign=i?(i==4?'right':'center'):'left';gs.fillText(v+' Hz',v/400*w,h-4)})}
function lg(m){var p=document.createElement('p');p.textContent=new Date().toLocaleTimeString('en-GB')+'  '+m;var l=$('mlg');l.insertBefore(p,l.firstChild);while(l.children.length>6)l.removeChild(l.lastChild)}
function zone(r){return r<.71?'A':r<1.8?'B':r<4.5?'C':'D'}
function ui(s){var z=zone(s.rms),zz=Z[z],hrs=Math.max(2,Math.round(1200*Math.pow((7-Math.min(6.9,s.rms))/7,3)));
$('mstt').textContent=zz[0]+' — منطقة '+z+' (ISO 10816)';$('mstt').style.color=zz[2];$('mstd').textContent=zz[1];$('mst').style.borderColor=zz[2];
$('mrms').textContent=s.rms.toFixed(2);$('mtmp').textContent=s.T.toFixed(0);$('mrpm').textContent=s.rpm.toFixed(0);
$('mrul').textContent=z=='A'?'—':(hrs>72?'~'+Math.round(hrs/24)+' يوم':'~'+hrs+' ساعة');
$('mmk').style.left=Math.min(98.5,s.rms/7*100)+'%';
var ph='',av=(s.im[0]+s.im[1]+s.im[2])/3*s.I;['L1','L2','L3'].forEach(function(n,i){var v=s.im[i]*s.I;ph+='<div><em>'+n+'</em><span style="width:'+Math.min(70,v/10*70)+'%"></span><b>'+v.toFixed(2)+' A</b></div>'});
var mx=Math.max.apply(0,s.im),mn=Math.min.apply(0,s.im);$('mph').innerHTML=ph+'<div style="direction:rtl;color:#a8a8a8">عدم اتزان التيار: '+((mx-mn)/((s.im[0]+s.im[1]+s.im[2])/3)*100).toFixed(1)+'%</div>';
if(z!==zl){lg('الحالة تغيّرت إلى '+zz[0]+' (منطقة '+z+'): '+zz[1]);zl=z}
txt=V(s,z,hrs)}
function V(s,z,h){var b='الاهتزاز '+s.rms.toFixed(1)+' ملم/ث في المنطقة '+z+'، وحرارة الكراسي '+s.T.toFixed(0)+' درجة. ',w=h>72?Math.round(h/24)+' يوم':h+' ساعة';
if(fault==='ok'||s.f<.08)return 'الموتور يعمل بكفاءة. '+b+'لا توجد أعطال.';
var r=fault==='brg'?'ظهرت ذبذبة عند تردد كرسي التحميل الخارجي حوالي '+(3.58*s.f1).toFixed(0)+' هرتز. افحص البلي واستبدله':fault==='unb'?'ارتفع اهتزاز 1X عند '+s.f1.toFixed(1)+' هرتز، وده يدل على عدم اتزان. افحص تثبيت المروحة والبكرة وأعد الموازنة':'تيار الأطوار غير متزن وظهرت مركبات جانبية في طيف التيار، وده يدل على عطل في الملفات. افحص العزل بالميجر';
return b+r+(z=='A'?'.':' خلال '+w+'.')+(z=='D'?' أنصح بإيقاف المحرك فوراً.':'')}
function draw(){var s=S();dw(s);dsp(s);return s}
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
function loop(){t+=.0008;var s=draw();if(fr++%6==0)ui(s);requestAnimationFrame(loop)}
function once(){ui(draw())}
if(rm)once();else loop();
['msv','mld'].forEach(function(i){$(i).addEventListener('input',function(){$('msvo').textContent=$('msv').value+'%';$('mldo').textContent=$('mld').value+'%';if(rm)once()})});
document.querySelectorAll('#mf button').forEach(function(b){b.addEventListener('click',function(){fault=b.dataset.k;document.querySelectorAll('#mf button').forEach(function(o){o.setAttribute('aria-pressed',o===b)});lg('تم حقن عطل: '+N[fault]);if(rm)once()})});
$('mask').addEventListener('click',function(){var s=S();ui(s);var r=$('mrep');r.textContent='WAMA: '+txt;r.hidden=false;$('mspk').hidden=false});
$('mspk').addEventListener('click',function(){if(!window.speechSynthesis)return;speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(txt);u.lang='ar-EG';speechSynthesis.speak(u)});
lg('بدأت المحاكاة: المحرك سليم');
})();

/* ===== part 3 ===== */

(function(){
var $=function(i){return document.getElementById(i)},PI2=6.283185307,
g=function(){return Math.random()+Math.random()+Math.random()-1.5},
cl=function(x,a,b){return Math.max(a,Math.min(b,x))},q=function(x,s){return Math.round(x/s)*s};
function fft(re,im){var n=re.length,i,j=0,k,t,b;
for(i=1;i<n;i++){b=n>>1;for(;j&b;b>>=1)j^=b;j^=b;if(i<j){t=re[i];re[i]=re[j];re[j]=t;t=im[i];im[i]=im[j];im[j]=t}}
for(var l=2;l<=n;l<<=1){var a=-PI2/l,wr=Math.cos(a),wi=Math.sin(a),h=l>>1;
for(i=0;i<n;i+=l){var cr=1,ci=0;for(k=0;k<h;k++){var u=i+k,v=u+h,xr=re[v]*cr-im[v]*ci,xi=re[v]*ci+im[v]*cr;re[v]=re[u]-xr;im[v]=im[u]-xi;re[u]+=xr;im[u]+=xi;var nr=cr*wr-ci*wi;ci=cr*wi+ci*wr;cr=nr}}}}
var N1=2048,N2=4096,W1=new Float64Array(N1),W2=new Float64Array(N2),i;
for(i=0;i<N1;i++)W1[i]=.5-.5*Math.cos(PI2*i/N1);
for(i=0;i<N2;i++){var x=PI2*i/N2;W2[i]=.35875-.48829*Math.cos(x)+.14128*Math.cos(2*x)-.01168*Math.cos(3*x)}
function Mo(n,kw,In,sn){return{n:n,kw:kw,In:In,sn:sn,t:0,load:.6,f:'ok',sev:.4,auto:false,on:true,rpm:1470,T:[52,40,39,42],hh:[],hs:[],cool:0,trip:'',cnt:0,al:[],zl:'A',d:{}}}
var ms=[Mo('M1',1.5,3.5,.045),Mo('M2',.75,1.9,.05)],cur=0,ts=120,NM={ok:'سليم',brg:'بلي تالف',unb:'عدم اتزان',wnd:'عطل ملفات',mis:'عدم محاذاة'};
var Z={A:['سليم','#22c55e'],B:['مقبول','#facc15'],C:['تحذير','#f97316'],D:['خطر','#ff2a1f']};
function clk(t){var h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=Math.floor(t%60),p=function(n){return(n<10?'0':'')+n};return'T+'+p(h)+':'+p(m)+':'+p(s)}
function al(m,s){m.al.unshift(clk(m.t)+'  '+m.n+': '+s);if(m.al.length>8)m.al.pop()}
function an(m){
var dt=.125*ts,ld=m.on?m.load:0,sev=m.f=='ok'?0:m.sev,k,T=m.T;
m.t+=dt;
if(m.auto&&m.f!='ok'&&m.on)m.sev=Math.min(1,m.sev+dt/14400);
var s=.003+m.sn*ld;if(m.on)m.rpm=1500*(1-s);else m.rpm*=.96;
var fr=m.rpm/60,I=m.on?m.In*(.35+.65*ld):0,sc=m.on?1:cl(m.rpm/1470,.04,1);
var Pw=m.on?m.kw*150*(.2+.8*ld*ld)*(1+(m.f=='wnd'?1.2*sev:0)):0,
Pb=(m.on?7:.5)*(1+(m.f=='brg'?3*sev:0)+(m.f=='unb'?sev:0)+(m.f=='mis'?1.6*sev:0)),rem=dt;
while(rem>0){var h=Math.min(rem,40),kk=m.cool?.75:1;rem-=h;
T[0]+=h*(Pw-(T[0]-28)/(.24*kk))/5000;
T[1]+=h*(Pb-(T[1]-28-.25*(T[0]-28))/3)/900;
T[2]+=h*(.8*Pb-(T[2]-28-.25*(T[0]-28))/3)/900;
T[3]+=h*(28+.55*(T[0]-28)-T[3])/600}
if(!m.cool&&T[0]>85){m.cool=1;al(m,'BMS: تشغيل تبريد اللوحة (حرارة الملفات '+T[0].toFixed(0)+'°C)')}
else if(m.cool&&T[0]<75){m.cool=0;al(m,'BMS: إيقاف التبريد')}
/* vibration: velocity components (mm/s peak) -> acceleration samples -> real FFT -> velocity spectrum */
var cm=[[fr,(.25+.2*ld)*sc],[2*fr,.08*sc]],b=3.587*fr;
if(m.on)cm.push([100,.12+.1*ld]);
if(m.f=='unb'){cm[0][1]+=8*sev*sc;cm[1][1]+=sev*sc}
if(m.f=='mis'){cm[0][1]+=2.5*sev*sc;cm[1][1]+=7.5*sev*sc}
if(m.f=='brg')cm.push([b,7*sev*sc],[2*b,3.5*sev*sc],[b-fr,2.2*sev*sc],[b+fr,2.2*sev*sc]);
if(m.f=='wnd'&&m.on)cm.push([100,3.5*sev],[fr,.6*sev]);
var re=new Float64Array(N1),im=new Float64Array(N1),nz=.03*(1+(m.f=='brg'?8*sev:0)),c,tt,a;
for(i=0;i<N1;i++){tt=m.t+i/2048;a=nz*g();for(k=0;k<cm.length;k++){c=cm[k];a+=c[1]/1000*PI2*c[0]*Math.sin(PI2*c[0]*tt+k*1.3)}re[i]=a*W1[i]}
fft(re,im);
var V=new Float32Array(N1/2),ss=0,A;
for(k=1;k<N1/2;k++){A=4*Math.hypot(re[k],im[k])/N1;V[k]=k<10?0:A*1000/(PI2*k);ss+=V[k]*V[k]}
var vr=Math.sqrt(ss/3);
function pk(f0,w){var mx=0;for(var j=Math.round(f0-w);j<=Math.round(f0+w);j++)if(V[j]>mx)mx=V[j];return mx}
var nf=0;for(k=250;k<400;k++)nf+=V[k];nf=nf/150+1e-4;
var v1=pk(fr,2),vb=pk(b,2.5),v2=pk(2*fr,2);
/* currents */
var im3=m.f=='wnd'&&m.on?[1,1+.12*sev,1-.1*sev]:[1,1,1],Ip=[],Ir=[],sc3=[],p,n;
for(p=0;p<3;p++)Ip[p]=Math.SQRT2*I*im3[p]*(1+.002*g());
var sm=cl(1-m.rpm/1500,.002,.2),sbdB=(m.f=='wnd'?-60+30*sev:-62)+1.2*g(),sbA=Math.pow(10,sbdB/20)*Ip[0],f1=50*(1-2*sm),f2=50*(1+2*sm);
var x1=new Float64Array(N2);
for(i=0;i<N2;i++){tt=m.t+i/1024;var w=PI2*50*tt;x1[i]=Ip[0]*(Math.sin(w)+.012*Math.sin(5*w+.5)+.008*Math.sin(7*w))+sbA*(Math.sin(PI2*f1*tt)+Math.sin(PI2*f2*tt))+.002*Ip[0]*g()}
for(p=0;p<3;p++){var arr=new Float32Array(1024),sq=0;
for(i=0;i<1024;i++){tt=m.t+i/1024;arr[i]=p?Ip[p]*Math.sin(PI2*50*tt-p*2.0944)+.002*Ip[p]*g():x1[i]-0;if(!p)arr[i]=x1[i];sq+=arr[i]*arr[i]}
Ir[p]=Math.sqrt(sq/1024);sc3[p]=arr}
var Ia=(Ir[0]+Ir[1]+Ir[2])/3,imb=Ia>.05?Math.max(Math.abs(Ir[0]-Ia),Math.abs(Ir[1]-Ia),Math.abs(Ir[2]-Ia))/Ia*100:0;
var mc=new Float32Array(81).fill(-100),sb=-100,ok=false;
if(m.on&&Ia>.05){var r2=new Float64Array(N2),i2=new Float64Array(N2);
for(i=0;i<N2;i++)r2[i]=x1[i]*W2[i];fft(r2,i2);
var AM=new Float64Array(N2/2);for(k=0;k<N2/2;k++)AM[k]=Math.hypot(r2[k],i2[k]);
var a50=0;for(k=196;k<=204;k++)a50=Math.max(a50,AM[k]);
for(k=160;k<=240;k++)mc[k-160]=20*Math.log10(AM[k]/a50+1e-6);
if(100*sm>=1.5){ok=true;var m1=-200,m2=-200;for(k=-2;k<=2;k++){m1=Math.max(m1,20*Math.log10(AM[Math.round(f1*4)+k]/a50+1e-6));m2=Math.max(m2,20*Math.log10(AM[Math.round(f2*4)+k]/a50+1e-6))}sb=Math.max(m1,m2)}}
/* diagnosis from spectral peaks */
var dg=[];
if(vb>.9&&vb>6*nf)dg.push('بلي تالف: ظهور تردد كرسي التحميل الخارجي BPFO عند '+b.toFixed(0)+' هرتز ('+vb.toFixed(1)+' mm/s)');
if(v2>1.5&&v2>1.4*v1)dg.push('عدم محاذاة: اهتزاز 2X أعلى من 1X عند '+(2*fr).toFixed(1)+' هرتز ('+v2.toFixed(1)+' mm/s)');
if(v1>1.4&&v1>2.5*vb&&v1>1.2*v2)dg.push('عدم اتزان: اهتزاز 1X عالي عند '+fr.toFixed(1)+' هرتز ('+v1.toFixed(1)+' mm/s)');
if(ok&&sb>-50||imb>3)dg.push('عطل ملفات/روتور: جوانب MCSA '+(ok?sb.toFixed(0)+' dB':'')+' وعدم اتزان تيار '+imb.toFixed(1)+'%');
var z=vr<.71?'A':vr<1.8?'B':vr<4.5?'C':'D';
if(z!=m.zl){al(m,'ISO 10816 '+m.zl+' ← '+z+' ('+Z[z][0]+') RMS '+vr.toFixed(2));m.zl=z}
var hv=cl((vr-.6)/3.9,0,1),hs=ok?cl((sb+55)/25,0,1):0,hi=cl((imb-1)/9,0,1),ht=cl((T[0]-85)/30,0,1),H=100-100*(.45*hv+.25*hs+.15*hi+.15*ht);
m.hh.push(H);m.hs.push(m.t);if(m.hh.length>160){m.hh.shift();m.hs.shift()}
var rul='مستقر',L=Math.min(40,m.hh.length);
if(!m.on)rul='المحرك متوقف';else if(H<=40)rul='تجاوز حد الصحة';
else if(L>=15){var sx=0,sy=0,sxy=0,sxx=0;for(k=m.hh.length-L;k<m.hh.length;k++){var X=m.hs[k]-m.hs[m.hh.length-L],Y=m.hh[k];sx+=X;sy+=Y;sxy+=X*Y;sxx+=X*X}
var sl=(L*sxy-sx*sy)/(L*sxx-sx*sx+1e-9);if(sl*3600<-.5){var e=(H-40)/(-sl);rul='~'+(e>172800?Math.round(e/86400)+' يوم':e>5400?(e/3600).toFixed(1)+' ساعة':Math.round(e/60)+' دقيقة')}}
if(m.on){if(vr>5.5)m.cnt++;else m.cnt=0;
if(m.cnt>=8){m.on=false;m.trip='اهتزاز عالي جداً';al(m,'فصل تلقائي للكونتاكتور: اهتزاز '+vr.toFixed(1)+' mm/s')}
else if(T[0]>110){m.on=false;m.trip='أوفر لود حراري';al(m,'فصل تلقائي للكونتاكتور: ملفات '+T[0].toFixed(0)+'°C')}}
var pf=.55+.3*ld,kw=Math.sqrt(3)*.4*Ia*pf;
m.d={V:V,vr:vr,mc:mc,sc:sc3,Ir:Ir,imb:imb,sb:sb,ok:ok,dg:dg,z:z,H:H,rul:rul,fr:fr,b:b,kw:kw,pf:pf,I:I,ld:ld,
nd:58+16*ld*(m.on?1:0)+(m.f=='brg'?16*sev:0)+(m.f=='unb'?5*sev:0)+.4*g()-(m.on?0:18),
hl:[.9*I/m.In+(m.f=='wnd'?1.4*sev:0)+.03*g(),.88*I/m.In+(m.f=='wnd'?1.3*sev:0)+.03*g()]}}
/* ---------- UI ---------- */
var cv=[],cd=$('dcards');
['dc1','dc2','dc3','dc4'].forEach(function(id){cv.push({c:$(id),g:$(id).getContext('2d'),w:0,h:0})});
function fit(){cv.forEach(function(o){var r=o.c.getBoundingClientRect(),d=window.devicePixelRatio||1;o.c.width=r.width*d;o.c.height=r.height*d;o.g.setTransform(d,0,0,d,0,0);o.w=r.width;o.h=r.height})}
window.addEventListener('resize',fit);
ms.forEach(function(m,j){var b=document.createElement('button');b.className='dcard';b.innerHTML='<b></b><span></span>';b.setAttribute('aria-pressed',j==0);b.onclick=function(){cur=j;sync()};cd.appendChild(b)});
function sync(){var m=ms[cur];[].forEach.call(cd.children,function(b,j){b.setAttribute('aria-pressed',j==cur)});
[].forEach.call($('df').children,function(b){b.setAttribute('aria-pressed',b.dataset.k==m.f)});
$('dsv').value=Math.round(m.sev*100);$('dld').value=Math.round(m.load*100);$('dau').checked=m.auto;$('dsvo').textContent=$('dsv').value+'%';$('dldo').textContent=$('dld').value+'%';draw()}
function bars(o,fn,n,col){}
function d1(m){var o=cv[0],g=o.g,w=o.w,h=o.h,V=m.d.V,nb=Math.min(100,w/5|0),bw=w/nb,mid=(h-18)/2;g.clearRect(0,0,w,h);
for(var i=0;i<nb;i++){var mx=0;for(var j=Math.floor(i*400/nb);j<Math.floor((i+1)*400/nb);j++)if(V[j]>mx)mx=V[j];var bh=Math.max(1,Math.min(1,mx/8)*mid);g.fillStyle=mx>1.8?'#ff2a1f':'#8f1a14';g.fillRect(i*bw+bw*.2,mid-bh,bw*.6,bh*2)}
g.font='12px Cairo,sans-serif';g.textAlign='center';g.setLineDash([3,3]);g.strokeStyle='#666';
[[m.d.fr,'1X'],[m.d.b,'BPFO'],[100,'2×50']].forEach(function(p){var x=p[0]/400*w;g.beginPath();g.moveTo(x,12);g.lineTo(x,h-18);g.stroke();g.fillStyle='#fff';g.fillText(p[1],Math.min(w-18,Math.max(18,x)),10)});
g.setLineDash([]);g.fillStyle='#a8a8a8';g.textAlign='left';g.fillText('0 Hz',0,h-4);g.textAlign='right';g.fillText('400 Hz  |  max 8 mm/s',w,h-4)}
function d2(m){var o=cv[1],g=o.g,w=o.w,h=o.h,mc=m.d.mc,bw=w/81,hh=h-18;g.clearRect(0,0,w,h);
for(var i=0;i<81;i++){var v=cl((mc[i]+100)/100,0,1)*hh;g.fillStyle=mc[i]>-50&&Math.abs(i-40)>4?'#ff2a1f':'#8f1a14';g.fillRect(i*bw,hh-v,Math.max(1,bw-1),v)}
g.strokeStyle='#666';g.setLineDash([3,3]);var y=hh-(-50+100)/100*hh;g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();g.setLineDash([]);
g.font='12px Cairo,sans-serif';g.fillStyle='#fff';g.textAlign='left';g.fillText('حد الإنذار −50 dB',4,y-4);
g.fillStyle='#a8a8a8';g.fillText('40 Hz',0,h-4);g.textAlign='center';g.fillText('50 Hz',w/2,h-4);g.textAlign='right';g.fillText(m.d.ok?'60 Hz':'60 Hz  (MCSA يحتاج حمل ≥ 30%)',w,h-4)}
function d3(m){var o=cv[2],g=o.g,w=o.w,h=o.h,sc=m.d.sc,mx=m.In*1.6*1.4;g.clearRect(0,0,w,h);g.strokeStyle='#2a2a2a';g.beginPath();g.moveTo(0,h/2);g.lineTo(w,h/2);g.stroke();
['#ff2a1f','#fff','#8a8a8a'].forEach(function(c,p){g.strokeStyle=c;g.lineWidth=1.6;g.beginPath();for(var x=0;x<w;x++){var s=sc[p][Math.min(1023,Math.floor(x*160/w))],y=h/2-s/mx*(h/2);x?g.lineTo(x,y):g.moveTo(x,y)}g.stroke()});g.lineWidth=1}
function d4(m){var o=cv[3],g=o.g,w=o.w,h=o.h,a=m.hh,hh=h-6;g.clearRect(0,0,w,h);
[[70,'#facc15'],[40,'#ff2a1f']].forEach(function(l){var y=hh-l[0]/100*hh+3;g.strokeStyle=l[1];g.setLineDash([4,4]);g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();g.setLineDash([])});
g.strokeStyle='#ff2a1f';g.lineWidth=2;g.beginPath();a.forEach(function(v,i){var x=i/159*w,y=hh-v/100*hh+3;i?g.lineTo(x,y):g.moveTo(x,y)});g.stroke();g.lineWidth=1;
g.font='13px Cairo,sans-serif';g.fillStyle='#fff';g.textAlign='right';g.fillText('Health '+m.d.H.toFixed(0)+'%',w-6,16)}
function draw(){var m=ms[cur];if(!m.d.V||!cv[0].w)return;d1(m);d2(m);d3(m);d4(m)}
function ui(){var m=ms[cur],d=m.d;
ms.forEach(function(x,j){var b=cd.children[j],zz=x.on?Z[x.d.z]:['متوقف','#666'];b.style.setProperty('--c',zz[1]);b.firstChild.textContent=x.n+' — '+zz[0]+(x.trip?' ('+x.trip+')':'');b.lastChild.textContent='صحة '+x.d.H.toFixed(0)+'% | '+x.d.kw.toFixed(2)+' kW | '+x.rpm.toFixed(0)+' RPM'});
var zz=m.on?Z[d.z]:['متوقف','#ff2a1f'];
$('dstat').style.borderColor=zz[1];
$('dstat').innerHTML='<b style="color:'+zz[1]+'">'+m.n+': '+zz[0]+(m.on?' — منطقة '+d.z+' (ISO 10816) — RMS '+d.vr.toFixed(2)+' mm/s':' — '+m.trip)+'</b><span>التشخيص من الطيف: '+(d.dg.length?d.dg.join(' | '):'لا توجد قمم غير طبيعية')+'</span><span>العمر المتبقي حتى صحة 40% (انحدار على الاتجاه): '+d.rul+'</span><span>الكونتاكتور: '+(m.on?'مغلق':'مفتوح')+' | تبريد BMS: '+(m.cool?'يعمل':'متوقف')+'</span>';
var T=m.T,Ia=d.Ir,t=function(i){return q(T[i]+.05*g(),.0625).toFixed(2)};
var S=[['ADXL345 — سرعة اهتزاز',d.vr.toFixed(2),'mm/s'],['INMP441 — مستوى الصوت',d.nd.toFixed(1),'dB'],['SCT-013 L1',Ia[0].toFixed(2),'A'],['SCT-013 L2',Ia[1].toFixed(2),'A'],['SCT-013 L3',Ia[2].toFixed(2),'A'],['جهد L1/L2/L3',(230+g()).toFixed(0)+'/'+(230+g()).toFixed(0)+'/'+(230+g()).toFixed(0),'V'],
['DS18B20 — ملفات',t(0),'°C'],['DS18B20 — كرسي DE',t(1),'°C'],['DS18B20 — كرسي NDE',t(2),'°C'],['DS18B20 — هيكل',t(3),'°C'],
['Hall 1',Math.max(0,d.hl[0]).toFixed(2),'mT'],['Hall 2',Math.max(0,d.hl[1]).toFixed(2),'mT'],['حساس السرعة الحثي',(m.rpm+.5*g()).toFixed(0),'RPM'],['DHT22',q(30+.04*(T[0]-30)+.05*g(),.1).toFixed(1)+' / '+q(46-.1*(T[0]-30)+.2*g(),.1).toFixed(1),'°C / %RH'],
['Load Cell 5kg',(d.ld*4.5+.01*g()).toFixed(2),'kg'],['4 DOF ميل',(.3+(m.f=='unb'?2*m.sev:0)+.05*g()).toFixed(2),'°'],['Proximity 30mm',(m.on?d.fr:0).toFixed(1),'نبضة/ث'],['الطاقة / PF',d.kw.toFixed(2)+' / '+d.pf.toFixed(2),'kW']];
$('dsn').innerHTML=S.map(function(s){return'<div><small>'+s[0]+'</small><b>'+s[1]+'</b> <u>'+s[2]+'</u></div>'}).join('');
$('dlg').innerHTML=m.al.map(function(x){return'<p>'+x+'</p>'}).join('');
draw()}
var tm=null;
function tick(){dmo();ms.forEach(an);ui()}
document.querySelectorAll('#df button').forEach(function(b){b.addEventListener('click',function(){var m=ms[cur];m.f=b.dataset.k;m.cnt=0;al(m,'حقن عطل: '+NM[m.f]+(m.f=='ok'?'':' بشدة '+Math.round(m.sev*100)+'%'));sync()})});
$('dsv').addEventListener('input',function(){ms[cur].sev=this.value/100;$('dsvo').textContent=this.value+'%'});
$('dld').addEventListener('input',function(){ms[cur].load=this.value/100;$('dldo').textContent=this.value+'%'});
$('dts').addEventListener('input',function(){ts=+this.value;$('dtso').textContent='×'+ts});
$('dau').addEventListener('change',function(){ms[cur].auto=this.checked});
$('drs').addEventListener('click',function(){var m=ms[cur];if(!m.on){m.on=true;m.trip='';m.cnt=0;al(m,'إعادة تشغيل الكونتاكتور')}});
$('drp').addEventListener('click',function(){var m=ms[cur];m.f='ok';m.on=true;m.trip='';m.cnt=0;m.sev=0;m.hh=[];m.hs=[];al(m,'تم الإصلاح: المحرك رجع سليم');sync()});
$('dask').addEventListener('click',function(){var m=ms[cur],d=m.d,T=m.T,tx=m.n+': '+(m.on?(d.dg.length?d.dg[0].split(':')[0]+'. ':'الموتور يعمل بكفاءة. ')+'الاهتزاز '+d.vr.toFixed(1)+' ملم/ث في المنطقة '+d.z+'، وحرارة الملفات '+T[0].toFixed(0)+' درجة. ':'المحرك متوقف بسبب '+m.trip+'. ')+(d.rul.charAt(0)=='~'?'الوقت المتوقع للوصول لحد الصيانة '+d.rul.slice(1)+'.':'')+(d.z=='D'||!m.on?' يرجى فحص المحرك قبل إعادة التشغيل.':'');
window._dtx=tx;$('drep').textContent='WAMA — '+tx;$('drep').hidden=false;$('dspk').hidden=false});
$('dspk').addEventListener('click',function(){if(!window.speechSynthesis)return;speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(window._dtx);u.lang='ar-EG';speechSynthesis.speak(u)});
var DD={on:true,ph:0,c:0,self:0};
function ddOff(){if(DD.self||!DD.on)return;DD.on=false;$('ddemo').checked=false}
function dmo(){if(!DD.on)return;var m=ms[0];DD.c++;
if(DD.ph==0){if(DD.c>=120){DD.ph=1;DD.c=0;m.f='brg';m.sev=.05;m.auto=true;m.cnt=0;al(m,'عرض تلقائي: بدأ تلف في بلي M1');sync()}}
else if(DD.ph==1){m.sev=Math.min(1,m.sev+.0015);if(m.sev>=.99||!m.on){DD.ph=2;DD.c=0}}
else if(DD.c>=100){var k=cur;cur=0;DD.self=1;$('drp').click();DD.self=0;cur=k;sync();DD.ph=0;DD.c=0}}
document.querySelectorAll('#df button').forEach(function(b){b.addEventListener('click',ddOff)});
['dsv','dld'].forEach(function(id){$(id).addEventListener('input',ddOff)});
$('dau').addEventListener('change',ddOff);$('drs').addEventListener('click',ddOff);$('drp').addEventListener('click',ddOff);
$('ddemo').addEventListener('change',function(){DD.on=this.checked;DD.ph=0;DD.c=0;if(DD.on){var m=ms[0];m.f='ok';m.auto=false;m.on=true;m.trip='';m.cnt=0;m.sev=0;m.hh=[];m.hs=[];al(m,'عرض تلقائي: بدأ السيناريو');sync()}});
ms.forEach(function(m){al(m,'بدء التشغيل: الحالة سليم')});
for(var wu=0;wu<40;wu++)ms.forEach(an);
tick();
var vis={},io=new IntersectionObserver(function(es){es.forEach(function(e){vis[e.target.id]=e.isIntersecting});if(vis.dash||vis.twin){fit();if(!tm)tm=setInterval(tick,125)}else{clearInterval(tm);tm=null}});
io.observe($('dash'));io.observe($('twin'));window.WAMA={ms:ms,cur:function(){return ms[cur]},idx:function(){return cur}};
})();

/* ===== part 4 ===== */

(function(){
var $=function(i){return document.getElementById(i)},NS='http://www.w3.org/2000/svg',q=function(x,s){return(Math.round(x/s)*s).toFixed(2)},g=function(){return Math.random()+Math.random()+Math.random()-1.5},
ZC={A:'#22c55e',B:'#facc15',C:'#f97316',D:'#ff2a1f'},sel=0,on=false,vis=false;
var SN=[
[323,298,'ADXL345','حساس اهتزاز ثلاثي المحاور','مثبت على غطاء كرسي التحميل DE','يقيس الاهتزاز للتحليل الطيفي وحساب RMS طبقاً لـ ISO 10816.',function(m,d){return[d.vr.toFixed(2)+' mm/s','ESP32 #1']}],
[80,430,'INMP441','ميكروفون MEMS رقمي','أمام المحرك على الشاسيه','يلتقط البصمة الصوتية للمحرك، وبيرتفع صوته مع تلف البلي.',function(m,d){return[d.nd.toFixed(1)+' dB','ESP32 #1']}],
[225,205,'SCT-013 ×3','محولات تيار غير تداخلية','معلّقة على كابلات الأطوار الثلاثة','بتقيس تيار كل طور (عبر ADS1115) لتحليل MCSA.',function(m,d){return[d.Ir.map(function(x){return x.toFixed(2)}).join(' / ')+' A','ESP32 #2']}],
[150,128,'جهد AC ×3','محول جهد ثلاثي الأطوار','داخل لوحة MCC','يتابع ثبات جهد التغذية على الأطوار.',function(){return[(230+g()).toFixed(0)+' / '+(230+g()).toFixed(0)+' / '+(230+g()).toFixed(0)+' V','ESP32 #2']}],
[200,325,'DS18B20 ملفات','مسبار حرارة ستانلس','ملاصق لملفات الستاتور','يراقب سخونة الملفات (دقة 0.0625°C) وبيحمي من الأوفر لود.',function(m){return[q(m.T[0]+.05*g(),.0625)+' °C','ESP32 #2']}],
[323,345,'DS18B20 كرسي DE','مسبار حرارة ستانلس','على كرسي التحميل الأمامي','حرارة الكرسي بتعلى قبل ما يتكسر.',function(m){return[q(m.T[1]+.05*g(),.0625)+' °C','ESP32 #2']}],
[70,345,'DS18B20 كرسي NDE','مسبار حرارة ستانلس','على كرسي التحميل الخلفي','حرارة الكرسي الخلفي (جهة المروحة).',function(m){return[q(m.T[2]+.05*g(),.0625)+' °C','ESP32 #2']}],
[120,290,'DS18B20 هيكل','مسبار حرارة ستانلس','على جسم المحرك','حرارة الغلاف الخارجي للمقارنة.',function(m){return[q(m.T[3]+.05*g(),.0625)+' °C','ESP32 #2']}],
[140,380,'Hall 1','حساس تدفق مغناطيسي','جنب جسم المحرك','يقيس تشتت المجال المغناطيسي.',function(m,d){return[Math.max(0,d.hl[0]).toFixed(2)+' mT','ESP32 #2']}],
[260,380,'Hall 2','حساس تدفق مغناطيسي','الناحية التانية من الجسم','قياس تاني للمقارنة والتأكد.',function(m,d){return[Math.max(0,d.hl[1]).toFixed(2)+' mT','ESP32 #2']}],
[372,305,'حساس السرعة الحثي','Inductive Proximity','قدام عمود الإدارة','بيقيس سرعة الدوران والانزلاق.',function(m){return[(m.rpm+.5*g()).toFixed(0)+' RPM','ESP32 #1']}],
[300,128,'DHT22','حرارة ورطوبة','داخل لوحة التحكم','يراقب البيئة الداخلية للوحة.',function(m){return[(30+.04*(m.T[0]-30)).toFixed(1)+' °C / '+(46-.1*(m.T[0]-30)).toFixed(0)+' %RH','ESP32 #2']}],
[455,262,'Proximity 30mm','حساس معادن تقاربي','فوق قرص الحمل','يرصد الحركة الميكانيكية ويؤمّن خط السير.',function(m,d){return[(m.on?d.fr:0).toFixed(1)+' نبضة/ث','ESP32 #1']}],
[455,412,'Load Cell 5kg','حساس وزن','تحت إطار الحمل','لاختبار الأحمال على خط السير.',function(m,d){return[(d.ld*4.5+.01*g()).toFixed(2)+' kg','ESP32 #1']}],
[505,385,'4 DOF','حساس زاوية وميل','على إطار الحمل','يقيس ميل الإطار واهتزازه.',function(m){return[(.3+(m.f=='unb'?2*m.sev:0)+.05*g()).toFixed(2)+' °','ESP32 #1']}]];
var mk=$('tmk'),tn=$('tn'),i,sp=$('tsp'),fi=$('tfins');
for(i=0;i<14;i++){var l=document.createElementNS(NS,'line');l.setAttribute('x1',100+i*14);l.setAttribute('x2',100+i*14);l.setAttribute('y1',276);l.setAttribute('y2',374);fi.appendChild(l)}
for(i=0;i<6;i++){var a=i*Math.PI/3,s=document.createElementNS(NS,'line');s.setAttribute('x1',455);s.setAttribute('y1',325);s.setAttribute('x2',455+40*Math.cos(a));s.setAttribute('y2',325+40*Math.sin(a));sp.appendChild(s)}
SN.forEach(function(s,j){var e=document.createElementNS(NS,'g');e.setAttribute('class','mk');e.setAttribute('tabindex','0');e.setAttribute('role','button');e.setAttribute('aria-label',s[2]);
e.innerHTML='<circle cx="'+s[0]+'" cy="'+s[1]+'" r="11"/><text x="'+s[0]+'" y="'+(s[1]+4)+'">'+(j+1)+'</text>';
e.addEventListener('click',function(){pick(j)});e.addEventListener('keydown',function(ev){if(ev.key=='Enter'||ev.key==' '){ev.preventDefault();pick(j)}});mk.appendChild(e);
var b=document.createElement('button');b.textContent=(j+1)+' '+s[2];b.setAttribute('aria-pressed',j==0);b.addEventListener('click',function(){pick(j)});tn.appendChild(b)});
function pick(j){sel=j;[].forEach.call(mk.children,function(e,k){e.setAttribute('class','mk'+(k==j?' on':''))});[].forEach.call(tn.children,function(b,k){b.setAttribute('aria-pressed',k==j)});
var s=SN[j];$('ttl').textContent=(j+1)+'. '+s[2];$('tmd').textContent=s[3];$('twh').textContent='مكانه: '+s[4];$('tws2').textContent=s[5];upd()}
function upd(){var W=window.WAMA;if(!W)return;var m=W.cur(),d=m.d;if(!d.V)return;var S=SN[sel],r=S[6](m,d);
$('tvl').textContent=r[0];$('tmd').textContent=S[3]+' — بيبعت لـ '+r[1];
$('tglow').setAttribute('opacity',Math.max(0,Math.min(.5,(m.T[0]-55)/70)));
$('tcont').setAttribute('fill',m.on?'#22c55e':'#ff2a1f');
['tp1','tp2','tp3'].forEach(function(id){$(id).setAttribute('class','fl'+(m.on?'':' off'))});
var zc=m.on?ZC[d.z]:'#ff2a1f';
$('th1').textContent=m.n+' — '+(m.on?d.z:'متوقف');$('th1').style.fill=zc;$('th2').textContent=m.rpm.toFixed(0)+' RPM';$('th3').textContent=m.T[0].toFixed(0)+' °C';$('th4').textContent=d.Ir[0].toFixed(2)+' A';
W.ms.forEach(function(x,j){var xd=x.d;$('tb'+(j+1)).textContent=x.n+' — صحة '+xd.H.toFixed(0)+'% — '+(x.on?'RMS '+xd.vr.toFixed(2):'متوقف');$('tbd'+(j+1)).setAttribute('fill',x.on?ZC[xd.z]:'#ff2a1f')});
$('tb3').textContent=m.al[0]||'';
var p=[],V=d.V,k,j2,mx;for(k=0;k<100;k++){mx=0;for(j2=k*4;j2<k*4+4;j2++)if(V[j2]>mx)mx=V[j2];p.push((800+k*1.65).toFixed(0)+','+(578-Math.min(1,mx/8)*40).toFixed(0))}
$('tspec').setAttribute('points',p.join(' '));
[].forEach.call($('tm').children,function(b){if(b.dataset.m!==undefined)b.setAttribute('aria-pressed',b.dataset.m==W.idx());else b.setAttribute('aria-pressed',b.dataset.k==m.f)})}
var ang=0,last=0;
function loop(t){if(!on)return;var W=window.WAMA;if(W){var m=W.cur(),dt=Math.min(.1,(t-last)/1000);ang=(ang+m.rpm*6*.04*dt)%360;$('trot').setAttribute('transform','rotate('+ang.toFixed(1)+' 455 325)');
var a=m.d.vr?Math.min(2.2,m.d.vr*.45):0;$('tmot').setAttribute('transform','translate('+(a*g()).toFixed(2)+' '+(a*g()).toFixed(2)+')')}last=t;requestAnimationFrame(loop)}
var tmr=null;
new IntersectionObserver(function(e){on=e[0].isIntersecting;if(on){last=performance.now();requestAnimationFrame(loop);if(!tmr)tmr=setInterval(upd,125)}else{clearInterval(tmr);tmr=null}}).observe($('twin'));
$('tm').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var W=window.WAMA;
if(b.dataset.m!==undefined){document.querySelectorAll('#dcards .dcard')[+b.dataset.m].click()}else{var t=document.querySelector('#df button[data-k="'+b.dataset.k+'"]');if(t)t.click()}upd()});

pick(0);
})();

/* ===== part 5 ===== */

(function(){
var $=function(i){return document.getElementById(i)},NS='http://www.w3.org/2000/svg',i,
LS={
ok:{n:'سليم',cn:'أخضر',c:'#22c55e',b:'ثابت',w:'منطقة A: RMS أقل من 0.71 mm/s وبدون قمم غير طبيعية',a:'تشغيل عادي، لا يحتاج إجراء'},
mon:{n:'مقبول — مراقبة',cn:'أصفر',c:'#facc15',b:'ثابت',w:'منطقة B: RMS من 0.71 إلى 1.8 mm/s',a:'تابع القراءات في الدورة القادمة'},
pred:{n:'تنبؤ بعطل قادم',cn:'بنفسجي',c:'#c084fc',b:'تنفّس بطيء',w:'ظهور قمم عطل مبكرة أو اتجاه صحة نازل والمحرك لسه في منطقة A أو B',a:'جدول صيانة وقائية قبل ما الحالة توصل للتحذير'},
warn:{n:'تحذير',cn:'برتقالي',c:'#f97316',b:'وميض بطيء',w:'منطقة C: RMS من 1.8 إلى 4.5 mm/s',a:'حدد موعد صيانة قريب وافحص السبب المشخّص'},
crit:{n:'خطر',cn:'أحمر',c:'#ff2a1f',b:'وميض سريع',w:'منطقة D: RMS أعلى من 4.5 mm/s',a:'أوقف المحرك وافحصه فوراً'},
trip:{n:'فصل بالحماية',cn:'أحمر',c:'#ff2a1f',b:'ثابت بدون وميض',w:'الكونتاكتور اتفتح بسبب اهتزاز عالي جداً أو أوفر لود حراري',a:'اعرف السبب وأصلحه قبل إعادة التشغيل'},
cool:{n:'تبريد BMS شغال',cn:'فيروزي',c:'#14b8a6',b:'ثابت على الثلث الأخير من الشريط',w:'حرارة الملفات عدّت 85°C فـ BMS شغّل التبريد',a:'راقب الحرارة لحد ما ترجع تحت 75°C'},
maint:{n:'وضع الصيانة',cn:'أزرق',c:'#3b82f6',b:'ثابت 6 ثواني',w:'بعد "تم الإصلاح" أو إعادة تشغيل الكونتاكتور',a:'راقب أول دقايق تشغيل'},
listen:{n:'المساعد بيسمعك',cn:'أبيض',c:'#ffffff',b:'نقطة بتجري على الشريط',w:'الميكروفون شغال',a:'اتكلم بوضوح'},
speak:{n:'المساعد بيرد',cn:'سماوي',c:'#7dd3fc',b:'موجة',w:'المساعد الصوتي بينطق الرد',a:'—'}},
KO=['ok','mon','pred','warn','crit','trip','cool','maint','listen','speak'],N=36,px=[],rgb={},vs=null,mt=0,cur='',cf=0,on=false,tk='',
RM=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
KO.forEach(function(k){var h=LS[k].c;rgb[k]=[parseInt(h.substr(1,2),16),parseInt(h.substr(3,2),16),parseInt(h.substr(5,2),16)]});
var tl=$('tled');
for(i=0;i<N;i++){var r=document.createElementNS(NS,'rect');r.setAttribute('x',46+i*13.7);r.setAttribute('y',500);r.setAttribute('width',10.5);r.setAttribute('height',16);r.setAttribute('rx',3);r.setAttribute('fill','#111');tl.appendChild(r);px.push(r)}
$('tlt').innerHTML=KO.map(function(k){var s=LS[k];return'<tr data-k="'+k+'"><td><span class="sw" style="background:'+s.c+'"></span>'+s.cn+'</td><td><b>'+s.n+'</b></td><td>'+s.b+'</td><td>'+s.w+'</td><td>'+s.a+'</td></tr>'}).join('');
function st(m){var d=m.d;if(vs)return vs;if(mt>performance.now())return'maint';if(!m.on)return'trip';
if(d.z=='D')return'crit';if(d.z=='C')return'warn';if(d.dg.length||d.rul.charAt(0)=='~')return'pred';return d.z=='B'?'mon':'ok'}
function show(k,cool){var s=LS[k];$('tsw').style.background=s.c;$('tln').textContent=s.cn+' — '+s.n;$('tlb').textContent=s.b;$('tlw').textContent='المعنى: '+s.w;
$('tla').textContent='الإجراء: '+s.a+(cool?' | الثلث الأخير فيروزي = تبريد BMS شغال':'');
$('tlt2').textContent='LED: '+s.cn+' — '+s.n;$('tlt2').style.fill=s.c;$('tlt3').textContent=s.b;
[].forEach.call($('tlt').children,function(tr){tr.className=tr.dataset.k==k?'cur':''})}
function frame(t){if(!on)return;var W=window.WAMA,k='ok',m=null,cc=null;
if(W&&W.cur().d.V){m=W.cur();k=st(m);if(m.on&&m.cool&&!vs)cc=rgb.cool}
if(k!==cur||(cc?1:0)!==cf){cur=k;cf=cc?1:0;show(k,cf)}
var tv=$('tvoice');if(tv){var tc=vs=='speak'?'talk':'';if(tv.getAttribute('class')!==tc)tv.setAttribute('class',tc)}
var c=rgb[k];
for(var j=0;j<N;j++){var I=1,col=c;
if(!RM){if(k=='pred')I=.3+.7*(.5+.5*Math.sin(t/600-j*.18));else if(k=='warn')I=(Math.floor(t/700)%2)?1:.1;else if(k=='crit')I=(Math.floor(t/130)%2)?1:.05;
else if(k=='listen'){var dd=((Math.floor(t/45)%N)-j+N)%N;I=Math.max(.08,1-dd*.14)}else if(k=='speak')I=.35+.65*(.5+.5*Math.sin(t/140-j*.6))}
if(cc&&j>=N-11){col=cc;I=1}
px[j].setAttribute('fill','rgb('+(col[0]*I|0)+','+(col[1]*I|0)+','+(col[2]*I|0)+')')}
requestAnimationFrame(frame)}
new IntersectionObserver(function(e){on=e[0].isIntersecting;if(on)requestAnimationFrame(frame)}).observe($('twin'));
['drp','drs'].forEach(function(id){$(id).addEventListener('click',function(){mt=performance.now()+6000})});
/* ---------- voice assistant ---------- */
function nz(s){return s.toLowerCase().replace(/[\u0660-\u0669]/g,function(c){return c.charCodeAt(0)-1632}).replace(/[\u064B-\u0652\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/[؟?!.,،]/g,' ')}
function f1(x){return x.toFixed(1)}
function ST(m){return LS[st(m)]}
function sumM(m){var d=m.d;return m.n+': '+(m.on?LS[st(m)].n:'متوقف بسبب '+m.trip)+'، الاهتزاز '+f1(d.vr)+' ملم/ث، وحرارة الملفات '+f1(m.T[0])+' درجة، والصحة '+d.H.toFixed(0)+' في المية'}
function steps(m){var d=m.d,g=d.dg.join(' ');if(!m.on)return'اعرف سبب الفصل ('+m.trip+') وصلّحه، وبعدين اضغط إعادة تشغيل الكونتاكتور.';
if(/بلي/.test(g))return'افحص حالة البلي وتشحيمه، وبدّله لو الضجيج والاهتزاز مستمرين.';
if(/اتزان/.test(g))return'افحص تثبيت المروحة والبكرة وأعد الموازنة.';
if(/ملفات/.test(g))return'افحص عزل الملفات بالميجر وقارن مقاومة الأطوار.';return'لا يحتاج أي إجراء دلوقتي.'}
function A(q){var W=window.WAMA;if(!W||!W.cur().d.V)return'المحاكاة لسه بتبدأ، جرب تاني بعد ثانية.';
var t=nz(q),R=function(re){return re.test(t)},ix=-1,$$=function(s){return document.querySelector(s)};
if(R(/(موتور|محرك|ماتور|موتر|m|ام)\s*(رقم\s*)?(2|التاني|الثاني|اتنين)/)||R(/(التاني|الثاني)/)&&R(/موتور|محرك|ماتور/))ix=1;
else if(R(/(موتور|محرك|ماتور|موتر|m|ام)\s*(رقم\s*)?(1|الاول|واحد)/))ix=0;
if(ix>=0&&ix!==W.idx())document.querySelectorAll('#dcards .dcard')[ix].click();
var m=W.cur(),d=m.d,both=R(/(الكل|الاتنين|المواتير|المحركات|كل الموتور)/);
if(!R(/اعمل ايه/)&&R(/حاك|جرب|اعمل|ركب|حقن|ولد|رجع|ارجع/)&&R(/عطل|مشكل|سليم|بلي|اتزان|ملفات|عادي/)){var k=R(/بلي|كرسي/)?'brg':R(/اتزان|ميزان|موازنه/)?'unb':R(/ملف|عزل/)?'wnd':R(/سليم|عادي|رجع|ارجع/)?'ok':'brg',b=$$('#df button[data-k="'+k+'"]');if(b)b.click();
return k=='ok'?'رجّعت '+m.n+' سليم. الليد هيرجع أخضر.':'حقنت عطل '+({brg:'بلي تالف',unb:'عدم اتزان',wnd:'في الملفات'})[k]+' في '+m.n+'. لو عايز تشوف التنبؤ قبل ما العطل يكبر قول لي: ابدأ التدهور التلقائي.'}
if(R(/تدهور|تدريجي|تلقائي/)){if(m.f=='ok'){var bb=$$('#df button[data-k="brg"]');if(bb)bb.click()}var sv=$('dsv');sv.value=5;sv.dispatchEvent(new Event('input'));var au=$('dau');au.checked=true;au.dispatchEvent(new Event('change'));
return'بدأت تدهور تدريجي في '+W.cur().n+'. راقب الليد: أخضر، بعدين بنفسجي للتنبؤ، بعدين برتقالي للتحذير، وبعدين أحمر للخطر.'}
if(R(/تم الاصلاح|اصلحت|صلحت|خلصت الصيانه/)){$('drp').click();return'تمام، سجلت إصلاح '+m.n+'. الليد أزرق ست ثواني وضع الصيانة.'}
if(R(/اعاده تشغيل|اعد تشغيل|ريست|reset|شغل الموتور|شغل المحرك|اقفل الكونتاكتور/)){if(m.on)return m.n+' شغال أصلاً.';$('drs').click();return'أعدت تشغيل الكونتاكتور لـ '+m.n+'. لو العطل لسه موجود الحماية هتفصل تاني.'}
if(R(/ليد|لون|الوان|ضوء|اضاءه|شريط/)){var cm=[[/اخضر/,['ok']],[/اصفر/,['mon']],[/بنفسجي|موف/,['pred']],[/برتقالي/,['warn']],[/احمر/,['crit','trip']],[/فيروزي|تركواز/,['cool']],[/ازرق/,['maint']],[/ابيض/,['listen']],[/سماوي/,['speak']]];
for(var j=0;j<cm.length;j++)if(R(cm[j][0]))return cm[j][1].map(function(x){var s=LS[x];return'اللون '+s.cn+' ('+s.n+', '+s.b+') معناه: '+s.w+'. المطلوب: '+s.a}).join('. وكمان ');
var s=ST(m);return'الليد دلوقتي '+s.cn+' يعني '+s.n+'. '+s.w+'. المطلوب: '+s.a}
if(R(/تقدر|مساعده|تعمل ايه|ساعدني|اسالك/))return'اسألني عن الحالة، الحرارة، الاهتزاز، التيار، السرعة، التشخيص، التنبؤ بالعطل، أو معنى لون الليد. وتقدر تقول لي: حاكي عطل بلي، أو ابدأ التدهور التلقائي، أو تم الإصلاح.';
if(R(/هيعطل|امتي|متي|تنبو|عمر|باقي|هيقف|قريب|مستقبل/)){if(!m.on)return m.n+' متوقف دلوقتي بسبب '+m.trip+'.';return d.rul.charAt(0)=='~'?'اتجاه صحة '+m.n+' نازل، ومتوقع يوصل لحد الصيانة خلال '+d.rul.slice(1)+'. الصحة الحالية '+d.H.toFixed(0)+' في المية.':'مفيش تدهور ملحوظ في '+m.n+'، الصحة '+d.H.toFixed(0)+' في المية والاتجاه مستقر.'}
if(R(/اعمل ايه|اتصرف|حل|اصلح|خطوات|اجراء|انصح|توصي/))return m.n+': '+steps(m);
if(R(/حرار|سخن|درجه|سخونه/))return'حرارة الملفات '+f1(m.T[0])+'، وكرسي الأمام '+f1(m.T[1])+'، وكرسي الخلف '+f1(m.T[2])+'، والهيكل '+f1(m.T[3])+' درجة. '+(m.cool?'تبريد BMS شغال.':m.T[0]>85?'الحرارة عالية.':'الحرارة في الحدود الطبيعية.');
if(R(/اهتزاز|رعشه|iso|اتزاز|فايبريشن|vibration/))return'سرعة الاهتزاز '+d.vr.toFixed(2)+' ملم/ث في المنطقة '+d.z+' حسب ISO 10816، يعني '+({A:'سليم',B:'مقبول',C:'تحذير',D:'خطر'})[d.z]+'.';
if(R(/تيار|امبير|كهرب|جهد|فولت|اطوار/))return'تيار الأطوار '+d.Ir.map(f1).join(' و')+' أمبير، وعدم اتزان التيار '+f1(d.imb)+' في المية. '+(d.imb>3?'ده أعلى من الطبيعي.':'ده طبيعي.');
if(R(/قدره|كيلو|باور|طاقه|استهلاك|وات/))return'القدرة المسحوبة '+d.kw.toFixed(2)+' كيلووات ومعامل القدرة '+d.pf.toFixed(2)+'.';
if(R(/سرع|rpm|دوران|انزلاق/)||R(/(^| )لفات|لفه/))return'السرعة '+m.rpm.toFixed(0)+' لفة في الدقيقة، والانزلاق '+f1((1500-m.rpm)/15)+' في المية.';
if(R(/عطل|مشكله|تشخيص|غلط|فيه ايه|بلي|ملفات|اتزان/))return d.dg.length?m.n+': '+d.dg.join('. و'):'مفيش أعطال ظاهرة في '+m.n+' من الطيف والتيار.';
if(both)return sumM(W.ms[0])+'. '+sumM(W.ms[1])+'.';
if(R(/حاله|عامل|ازاي|كفاءه|اخبار|تقرير|سليم|شغال|كويس|موتور|محرك|ماتور/))return sumM(m)+'. التشخيص: '+(d.dg.length?d.dg[0].split(':')[0]:'سليم')+'. لون الليد '+ST(m).cn+'.';
return'مفهمتش السؤال. جرب تسأل عن الحالة أو الحرارة أو الاهتزاز أو التيار أو التنبؤ أو لون الليد.'}
function say(c,t){var p=document.createElement('p');p.className=c;p.textContent=t;var l=$('tch');l.appendChild(p);while(l.children.length>12)l.removeChild(l.firstChild);l.scrollTop=l.scrollHeight}
function speak(t){var S=window.speechSynthesis,tm=function(n){setTimeout(function(){if(vs=='speak')vs=null},n)};
if(!S||!window.SpeechSynthesisUtterance){vs='speak';tm(Math.min(7000,t.length*70));return}
S.cancel();var u=new SpeechSynthesisUtterance(t);u.lang='ar-EG';var v=(S.getVoices()||[]).filter(function(x){return/^ar/i.test(x.lang)});if(v.length)u.voice=v.filter(function(x){return/EG/i.test(x.lang)})[0]||v[0];
u.onend=u.onerror=function(){if(vs=='speak')vs=null};vs='speak';tm(25000);S.speak(u)}
function ask(q){q=(q||'').trim();if(!q)return;say('u',q);var a=A(q);say('a',a);speak(a)}
$('tsd').addEventListener('click',function(){ask($('ttx').value);$('ttx').value=''});
$('ttx').addEventListener('keydown',function(e){if(e.key=='Enter'){ask(this.value);this.value=''}});
['إيه حالة الموتور؟','الحرارة كام؟','هل في عطل؟','هيعطل إمتى؟','الليد لونه إيه دلوقتي؟','اللون البنفسجي معناه إيه؟','حاكي عطل بلي','ابدأ التدهور التلقائي','تم الإصلاح'].forEach(function(s){var b=document.createElement('button');b.textContent=s;b.addEventListener('click',function(){ask(s)});$('tex').appendChild(b)});
var SR=window.SpeechRecognition||window.webkitSpeechRecognition,rec=null,mic=$('tmic');
mic.addEventListener('click',function(){
if(!SR){$('tvs').textContent='المتصفح ده مش بيدعم التعرف على الصوت. جرّب Chrome أو Safari، أو اكتب سؤالك.';return}
if(rec){try{rec.stop()}catch(e){}return}
rec=new SR();rec.lang='ar-EG';rec.interimResults=false;rec.maxAlternatives=1;
rec.onstart=function(){vs='listen';mic.textContent='جاري الاستماع... اضغط للإيقاف';$('tvs').textContent='اتكلم دلوقتي...'};
rec.onresult=function(e){var s=e.results[0][0].transcript;$('tvs').textContent='سمعتك: '+s;ask(s)};
rec.onerror=function(e){$('tvs').textContent=(e.error=='not-allowed'||e.error=='service-not-allowed')?'المايك مش مسموح هنا. اسمح بالميكروفون للصفحة من إعدادات المتصفح، أو اكتب سؤالك.':e.error=='no-speech'?'مسمعتش حاجة، جرب تاني.':'حصل خطأ في الاستماع ('+e.error+').'};
rec.onend=function(){if(vs=='listen')vs=null;rec=null;mic.textContent='🎤 تكلّم'};
try{rec.start()}catch(e){rec=null}});
})();

/* ===== part 6 ===== */
(function(){
var P=[['home','الرئيسية','فكرة المشروع وطبقاته الأربعة'],['parts','المكونات','الحساسات والمعالجة والشاشات والمنظومة الكهربائية'],['sim','محاكاة','سيموليشن سريع للأعطال'],['dash','الداشبورد','موتورين وFFT وMCSA وحماية وتنبؤ'],['twin','شاشة العرض','المحرك والحساسات والـ LED والمساعد الصوتي'],['colors','شيت الألوان','معنى كل لون في الشاشة'],['calc','الحاسبة','اختيار المحرك والقاطع والكابل'],['log','السجل والمقارنة','أحداث الأنظمة ومقارنة المحركين'],['team','الفريق','دور كل عضو في المشروع']],
nv=document.getElementById('nvb'),secs=[].slice.call(document.querySelectorAll('section[data-p]')),hero=document.querySelector('.hero'),pn=document.getElementById('pn'),cur='',bs=[];
var logo=hero.querySelector('img');if(logo){var im=document.createElement('img');im.src=logo.src;im.alt='WAMA';nv.appendChild(im)}
P.forEach(function(p){var b=document.createElement('button');b.textContent=p[1];b.addEventListener('click',function(){go(p[0])});nv.appendChild(b);bs.push(b)});
var hq=document.createElement('div');hq.className='hq';
P.slice(1).forEach(function(p){var b=document.createElement('button');b.innerHTML='<b>'+p[1]+'</b><span>'+p[2]+'</span>';b.addEventListener('click',function(){go(p[0])});hq.appendChild(b)});
hero.appendChild(hq);
function go(k,keep){var i=-1;P.forEach(function(p,j){if(p[0]==k)i=j});if(i<0){k='home';i=0}
if(k==cur)return;cur=k;
secs.forEach(function(s){s.hidden=s.dataset.p!==k});hero.hidden=k!='home';
bs.forEach(function(b,j){if(j==i)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
pn.innerHTML='';
if(i>0){var a=document.createElement('button');a.textContent='→ '+P[i-1][1];a.addEventListener('click',function(){go(P[i-1][0])});pn.appendChild(a)}else pn.appendChild(document.createElement('span'));
if(i<P.length-1){var c=document.createElement('button');c.textContent=P[i+1][1]+' ←';c.addEventListener('click',function(){go(P[i+1][0])});pn.appendChild(c)}
try{history.replaceState(null,'','#'+k)}catch(e){}
if(!keep)window.scrollTo(0,0);
bs[i].scrollIntoView&&bs[i].scrollIntoView({block:'nearest',inline:'nearest'});
requestAnimationFrame(function(){window.dispatchEvent(new Event('resize'))})}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-goto]');if(b)go(b.dataset.goto)});window.WAMAGO=go;window.addEventListener('hashchange',function(){go(location.hash.slice(1))});
go(location.hash.slice(1)||'home',true);
})();

/* ===== part 7 ===== */
(function(){
var $=function(i){return document.getElementById(i)},I=$('intro'),B=document.body,H=document.documentElement,RM=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches,done=0,seen=0,stage=0,fails=0,who=null,
T=[['d82001a3b45e4653','Mahmoud Ali','Classic Control Circuit Design & Wiring','Part 1 · Installation'],['89d2efce9fe33d4','Mostafa Haitham','Power Circuit & Distribution Panel','Part 1 · Installation'],['1843761167e1a8a8','Mostafa Ramadan','Conveyor System & Mechanical Mounting','Part 1 · Installation'],['4f2c88a6a771f003','Mostafa Mohamed Ahmed','Circuit Breakers, Contactors & Safety Testing','Part 1 · Installation'],['52faa06fd4e6ffb9','Abdelrahman El-Sayed','Field Cabling & Motor Cable Management','Part 1 · Installation'],['70aae941f857df01','Mostafa Mohamed Mansour','ESP32 Firmware Development & Protocols','Part 2 · Sensors'],['9c5745d34f9067e6','Youssef Hatem','MCSA Current & Voltage Sensors Calibration','Part 2 · Sensors'],['8f94843b1374605','Youssef Osama','Vibration & Temperature Sensors Setup','Part 2 · Sensors'],['b4138a404c12ca54','Youssef Ahmed','Signal Conditioning & Hardware Testing','Part 2 · Sensors'],['85c31f4847cef844','Mehrael Gamal','Raspberry Pi OS Setup & Local MQTT Server','Part 3 · Dashboard'],['f7767807eddce886','Mariam Mostafa','Frontend Dashboard UI/UX Design','Part 3 · Dashboard'],['d72f1d8ba81a72dd','Manal Emad El-Din','Backend Integration & Data Pipeline','Part 3 · Dashboard'],['9443bd91251b1ced','Shahd Osama','Real-time Alerts & User Management','Part 3 · Dashboard'],['e7553230246523ff','Mohamed Badr','Bill of Materials & Cost Comparison','Part 4 · Research'],['7e27e0213c1dbd36','Youssef Ayman','Technical Documentation & Implementation Report','Part 4 · Research']];
function hs(t){var a=0x811c9dc5,b=0x1b873593;for(var i=0;i<t.length;i++){var c=t.charCodeAt(i);a^=c;a=Math.imul(a,16777619);b=Math.imul(b^c,2246822519)^(b>>>13)}return(a>>>0).toString(16)+(b>>>0).toString(16)}
function norm(v){return String(v).toUpperCase().replace(/[^A-Z0-9]/g,'')}
function find(v){var h=hs('wama26|'+norm(v));for(var i=0;i<T.length;i++)if(T[i][0]===h)return T[i];return null}
var saved=null;try{var sc=localStorage.getItem('wama_uid');if(sc)saved=find(sc)}catch(e){}
try{seen=sessionStorage.getItem('wama_intro')}catch(e){}
var hl=document.querySelector('.hero img');if(hl)$('iimg').src=hl.src;
var h='';for(var i=0;i<41;i++){var x=(i-20)/20,v=Math.max(.12,Math.cos(x*Math.PI/2)*(.6+.4*Math.abs(Math.sin(i*1.7))));h+='<i style="--h:'+v.toFixed(2)+';--d:'+(i*55)+'"></i>'}$('iw').innerHTML=h;
function count(){var b=document.querySelector('.stat b');if(!b||RM)return;var t0=performance.now();(function f(t){var p=Math.min(1,(t-t0)/1300),e=1-Math.pow(1-p,3);b.textContent='+'+Math.round(40*e)+'%';if(p<1)requestAnimationFrame(f)})(t0)}
function chip(u){var d=document.createElement('div');d.className='uc';var s=document.createElement('span');s.textContent='Welcome, ';var b=document.createElement('b');b.textContent=u[1];s.appendChild(b);var o=document.createElement('button');o.textContent='خروج';o.addEventListener('click',function(){try{localStorage.removeItem('wama_uid')}catch(e){}location.reload()});d.appendChild(s);
d.appendChild(o);$('nvb').appendChild(d)}
function fin(){if(done)return;done=1;I.classList.add('out');H.style.overflow='';B.classList.add('ready');try{sessionStorage.setItem('wama_intro','1')}catch(e){}if(who)chip(who);setTimeout(function(){I.remove()},900);count()}
function showLogin(){if(stage)return;stage=1;$('ibt').hidden=true;$('iskip').hidden=true;I.querySelector('.ip').hidden=true;$('lg').hidden=false;if(!RM)setTimeout(function(){$('lid').focus()},300)}
function tryLogin(){var u=find($('lid').value);
if(fails>=5){$('lerr').textContent='محاولات كتير. استنى شوية.';return}
if(!u){fails++;$('lerr').textContent='الـ ID غلط. راجع الكود وجرّب تاني.';var k=$('lid');k.classList.remove('shake');void k.offsetWidth;k.classList.add('shake');if(fails>=5)setTimeout(function(){fails=0},15000);return}
ok(u,norm($('lid').value))}
/* Telegram notification: fill token + chat (or a relay URL) to enable */
var TG={token:'',chat:'',relay:''};
function notify(u){var tx='✅ '+u[1]+' دخل موقع WAMA\n'+u[2]+'\n'+new Date().toLocaleString('ar-EG');
try{if(TG.relay)fetch(TG.relay,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify({text:tx})});
else if(TG.token&&TG.chat)new Image().src='https://api.telegram.org/bot'+TG.token+'/sendMessage?chat_id='+encodeURIComponent(TG.chat)+'&text='+encodeURIComponent(tx)}catch(e){}}
function welcome(u){notify(u);$('wn').textContent=u[1];$('wr').textContent=u[2]+' · '+u[3];var ix=T.indexOf(u),fm=ix>9&&ix<13;$('wq').innerHTML='<p>'+(fm?'كنتِ':'كنت')+' إضافة قوية جداً لفريق WAMA، وبصمتك واضحة في المشروع.</p><p class="wk">«'+WS[pick()]+'»</p>';$('wl').hidden=false;try{sessionStorage.setItem('wama_w','1')}catch(e){}setTimeout(fin,RM?3000:9000)}
function ok(u,code){if(who)return;try{localStorage.setItem('wama_uid',code);sessionStorage.removeItem('wama_guest')}catch(e){}H.removeAttribute('data-mode');
who=u;$('lg').hidden=true;welcome(u)}
$('lgo').addEventListener('click',tryLogin);
var lgb=$('lguest');if(lgb)lgb.addEventListener('click',function(){if(who||done)return;try{sessionStorage.setItem('wama_guest','1')}catch(e){}H.setAttribute('data-mode','guest');$('lg').hidden=true;window.dispatchEvent(new Event('wama-guest'));fin()});$('lid').addEventListener('keydown',function(e){if(e.key=='Enter')tryLogin()});
var WS=['من جدّ وجد، ومن زرع حصد.','على قدر أهل العزم تأتي العزائم. (المتنبي)','وما نيل المطالب بالتمني، ولكن تؤخذ الدنيا غلابا. (أحمد شوقي)','الوقت كالسيف، إن لم تقطعه قطعك.','اليد الواحدة لا تصفّق.','الطريق الطويل يبدأ بخطوة.','الصبر مفتاح الفرج.','من سار على الدرب وصل.','الإتقان في العمل عبادة.','قليل دائم خير من كثير منقطع.','العلم نور، والجهل ظلام.','إذا أردت أن تُطاع فاطلب المستطاع.','ما كل ما يتمنّى المرء يدركه، لكن من اجتهد أدرك ما تمنّى.','من تعلّم شيئاً فقد ملك مفتاحه.','العمل الجماعي يصنع ما لا يصنعه الأفراد.','الفرصة لا تأتي إلا لمن أعدّ لها.','من لا يعرف الصبر لا يعرف النصر.','الاستمرار أهم من البداية.','الخطأ الأول درس، والتكرار اختيار.','الجودة تبدأ من التفاصيل الصغيرة.','من أتقن عمله ارتقى به.','الأفكار الكبيرة تبدأ بتجربة صغيرة.','الثقة تُبنى بالإتقان لا بالكلام.','لا نجاح بلا تعب، ولا تعب بلا أمل.','الفريق القوي يجعل الصعب سهلاً.','من طلب العُلا سهر الليالي.','لا تؤجّل عمل اليوم إلى الغد.'];
function pick(){var l=-1,r;try{l=+localStorage.getItem('wama_ws')}catch(e){}do{r=Math.floor(Math.random()*WS.length)}while(r==l&&WS.length>1);try{localStorage.setItem('wama_ws',r)}catch(e){}return r}$('wgo').addEventListener('click',fin);
var gs0=0;try{gs0=sessionStorage.getItem('wama_guest')}catch(e){}
var S=['تهيئة الحساسات: ADXL345 · INMP441 · SCT-013','ربط عقد ESP32 الثلاثة','تشغيل تحليل FFT ومعيار ISO 10816','تحميل المساعد الصوتي المحلي','WAMA جاهز'],k=0;
if(saved){who=saved;var sw=0;try{sw=sessionStorage.getItem('wama_w')}catch(e){}
if(sw){done=1;I.remove();B.classList.add('ready');chip(saved);var t=document.createElement('div');t.id='wt';t.textContent='Welcome back, '+saved[1];t.setAttribute('role','status');document.body.appendChild(t);setTimeout(function(){t.remove()},4200);count()}
else{H.style.overflow='hidden';stage=1;$('ibt').hidden=true;$('iskip').hidden=true;I.querySelector('.ip').hidden=true;welcome(saved)}}
else if(gs0){H.setAttribute('data-mode','guest');done=1;I.remove();B.classList.add('ready');count()}
else{H.style.overflow='hidden';
if(seen)showLogin();else{(function nx(){if(done||stage)return;$('ibt').textContent=S[k];$('ipb').style.width=((k+1)/S.length*100)+'%';k++;if(k<S.length)setTimeout(nx,RM?250:700);else setTimeout(showLogin,RM?400:1100)})();$('iskip').addEventListener('click',showLogin)}}
setTimeout(function(){B.classList.add('ready')},9000);
var sp=$('sp'),up=$('up');addEventListener('scroll',function(){var m=H.scrollHeight-innerHeight;sp.style.width=(m>0?scrollY/m*100:0)+'%';up.classList.toggle('on',scrollY>700)},{passive:true});
up.addEventListener('click',function(){scrollTo({top:0,behavior:RM?'auto':'smooth'})});
})();

/* ===== part 8 ===== */
(function(){
var $=function(i){return document.getElementById(i)},L=function(k,d){try{return localStorage.getItem(k)||d}catch(e){return d}},SV=function(k,v){try{localStorage.setItem(k,v)}catch(e){}},H=document.documentElement,
W=function(){return window.WAMA},en=L('wama_lang','ar')=='en',snd=L('wama_snd','1')=='1',pt=null,chipP=null,AC=null,
esc=function(x){return String(x==null?'':x).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
function toast(m){var o=$('wt');if(o)o.remove();var t=document.createElement('div');t.id='wt';t.textContent=m;t.setAttribute('role','status');document.body.appendChild(t);setTimeout(function(){t.remove()},4200)}
function theme(v){if(v=='light')H.setAttribute('data-theme','light');else H.removeAttribute('data-theme');SV('wama_theme',v)}theme(L('wama_theme','dark'));
var tb=document.createElement('div');tb.className='tb';
function mk(t,ti,fn){var b=document.createElement('button');b.textContent=t;b.title=ti;b.setAttribute('aria-label',ti);b.addEventListener('click',fn);tb.appendChild(b);return b}
var bT=mk('◐','Theme',function(){theme(H.getAttribute('data-theme')=='light'?'dark':'light')}),
bL=mk(en?'ع':'EN','Language',function(){en=!en;SV('wama_lang',en?'en':'ar');bL.textContent=en?'ع':'EN';applyLang()}),
bP=mk('▶','Presentation',function(){pres()}),
bS=mk(snd?'🔔':'🔕','Sound alerts',function(){snd=!snd;SV('wama_snd',snd?'1':'0');bS.textContent=snd?'🔔':'🔕';if(snd){ac();beep(1)}});
$('nvb').appendChild(tb);
var D={'الرئيسية':'Home','المكونات':'Parts','محاكاة':'Simulation','الداشبورد':'Dashboard','شاشة العرض':'Display','شيت الألوان':'Colors','الحاسبة':'Calculator','السجل والمقارنة':'Log & Compare','الفريق':'Team','فكرة المشروع وطبقاته الأربعة':'Project idea and its four layers','الحساسات والمعالجة والشاشات والمنظومة الكهربائية':'Sensors, processing, screens and electrical system','سيموليشن سريع للأعطال':'Quick fault simulation','موتورين وFFT وMCSA وحماية وتنبؤ':'Two motors, FFT, MCSA, protection, prediction','المحرك والحساسات والـ LED والمساعد الصوتي':'Motor, sensors, LED and voice assistant','معنى كل لون في الشاشة':'What each screen color means','اختيار المحرك والقاطع والكابل':'Motor, breaker and cable sizing','أحداث الأنظمة ومقارنة المحركين':'Event log and motor comparison','دور كل عضو في المشروع':'Each member’s role in the project','تقرير PDF':'PDF report','تصدير CSV':'Export CSV','مسح':'Clear','خروج':'Logout'},orig=new WeakMap();
function applyLang(){H.lang=en?'en':'ar';document.querySelectorAll('nav .in,.hq,#pn,#drpt,#evcsv,#evclr,#rpt2').forEach(function(r){var w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){if(!orig.has(n))orig.set(n,n.nodeValue);var o=orig.get(n),k=o.trim().replace(/^→\s*/,'').replace(/\s*←$/,'');n.nodeValue=en&&D[k]?o.replace(k,D[k]):o}})}
new MutationObserver(applyLang).observe($('pn'),{childList:true});new MutationObserver(applyLang).observe($('nvb'),{childList:true});applyLang();
var steps=[['home',7],['parts',8],['sim',10],['dash',26],['twin',12],['calc',8],['log',12],['team',8]],si=0;
function pres(){if(pt){stopP();return}chipP=document.createElement('div');chipP.id='pres';chipP.textContent=en?'Presentation mode — press Esc to exit':'وضع العرض شغال — اضغط Esc للخروج';document.body.appendChild(chipP);bP.textContent='■';si=0;
(function nx(){var s=steps[si%steps.length];si++;window.WAMAGO(s[0]);if(s[0]=='dash'){var c=$('ddemo');if(c&&!c.checked){c.checked=true;c.dispatchEvent(new Event('change'))}}pt=setTimeout(nx,s[1]*1000)})()}
function stopP(){clearTimeout(pt);pt=null;bP.textContent='▶';if(chipP){chipP.remove();chipP=null}}
document.addEventListener('keydown',function(e){if(e.key=='Escape'&&pt)stopP()});
function ac(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state=='suspended')AC.resume()}catch(e){}}
function beep(n){return;if(!window.WAMA_DROP)return;for(var i=0;i<n;i++)(function(i){setTimeout(function(){window.WAMA_DROP(n>1?[1250,1000,800][i%3]:1000)},i*170)})(i)}
var last={},lastA=0,prd={};
function watch(){var w=W();if(!w||!snd)return;w.ms.forEach(function(m){var pd=!!(m.on&&(m.d.dg.length>0||String(m.d.rul).charAt(0)=='~')),pp=prd[m.n];prd[m.n]=pd;if(pp===false&&pd)beep(1);var st=m.on?m.d.z:'off',p=last[m.n];last[m.n]=st;if(p===undefined||p==st||(st!='D'&&st!='off'))return;var now=Date.now();if(now-lastA<4000)return;lastA=now;ac();beep(3);
if(window.speechSynthesis){var u=new SpeechSynthesisUtterance(en?('Warning. Motor '+m.n+(st=='off'?' has tripped.':' entered the danger zone.')):('تحذير. المحرك '+m.n+(st=='off'?' فصل تلقائياً.':' دخل منطقة الخطر.')));u.lang=en?'en-US':'ar-EG';speechSynthesis.speak(u)}})}
var EV=[],seen={};
function collect(){var w=W();if(!w)return;w.ms.forEach(function(m){for(var i=m.al.length-1;i>=0;i--){var x=m.al[i];if(!seen[x]){seen[x]=1;var k=x.indexOf('  ');EV.unshift({t:x.slice(0,k),m:m.n,e:x.slice(k+2).replace(/^M\d: /,''),w:Date.now()})}}});if(EV.length>400)EV.length=400}
function rLog(){$('evb').innerHTML=EV.slice(0,150).map(function(x){return'<tr><td>'+esc(x.t)+'</td><td>'+x.m+'</td><td>'+esc(x.e)+'</td></tr>'}).join('')||'<tr><td colspan="3">—</td></tr>'}
$('evcsv').addEventListener('click',function(){var r=['"wall_time","sim_time","motor","event"'].concat(EV.slice().reverse().map(function(x){return[new Date(x.w).toISOString(),x.t,x.m,x.e].map(function(c){return'"'+String(c).replace(/"/g,'""')+'"'}).join(',')})).join('\r\n');
try{var a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+r],{type:'text/csv;charset=utf-8'}));a.download='wama_events.csv';document.body.appendChild(a);a.click();a.remove()}catch(e){}
try{navigator.clipboard.writeText(r).then(function(){toast('اتنزّل ملف CSV واتنسخ كمان للحافظة.')},function(){toast('تم إنشاء ملف CSV.')})}catch(e){toast('تم إنشاء ملف CSV.')}});
$('evclr').addEventListener('click',function(){EV.length=0;rLog()});
function rCmp(){var c=$('cmpc'),w=W();if(!w)return;var r=c.getBoundingClientRect(),d=window.devicePixelRatio||1;if(!r.width)return;c.width=r.width*d;c.height=r.height*d;var g=c.getContext('2d'),X=r.width,h=r.height-6;g.setTransform(d,0,0,d,0,0);
[[70,'#facc15'],[40,'#ff2a1f']].forEach(function(l){var y=h-l[0]/100*h+3;g.strokeStyle=l[1];g.setLineDash([4,4]);g.beginPath();g.moveTo(0,y);g.lineTo(X,y);g.stroke();g.setLineDash([])});
w.ms.forEach(function(m,j){g.strokeStyle=j?'#ffffff':'#ff2a1f';g.lineWidth=2;g.beginPath();m.hh.forEach(function(v,i){var x=i/159*X,y=h-v/100*h+3;i?g.lineTo(x,y):g.moveTo(x,y)});g.stroke();g.fillStyle=g.strokeStyle;g.font='13px Cairo,sans-serif';g.fillText(m.n+' '+m.d.H.toFixed(0)+'%',8+j*90,16)});g.lineWidth=1;
$('cmpt').innerHTML=w.ms.map(function(m){var l=m.d.rul,t=l.charAt(0)=='~'?'الصيانة المقترحة خلال '+l.slice(1)+' (زمن المحاكاة)':l=='مستقر'?'حالة مستقرة، صيانة دورية كل 30 يوم':l=='تجاوز حد الصحة'?'صيانة عاجلة الآن':l;return'<p><b>'+m.n+'</b>: '+esc(t)+'</p>'}).join('')}
var BR=[6,10,16,20,25,32,40,50,63,80,100,125],CB=[[14,1.5],[19,2.5],[26,4],[35,6],[48,10],[64,16],[85,25],[104,35]];
function calc(){var p=+$('ckw').value,v=+$('cv').value,pf=+$('cpf').value,e=+$('ceta').value;if(!(p>0&&v>0&&pf>0&&e>0)){$('cout').innerHTML='';return}
var I=p*1000/(Math.sqrt(3)*v*pf*e),b=BR.filter(function(x){return x>=1.25*I})[0],c=CB.filter(function(x){return x[0]>=1.25*I})[0],
R=[['تيار التشغيل',I.toFixed(2)+' A'],['تيار البدء المتوقع (DOL)','≈ '+(I*6).toFixed(1)+' A'],['قاطع الحماية (125%)',b?b+' A':'أكبر من 125 A'],['ضبط الأوفرلود الحراري',(I*.95).toFixed(1)+' – '+(I*1.05).toFixed(1)+' A'],['الكونتاكتور (AC-3)','≥ '+Math.ceil(I)+' A'],['مقطع الكابل (نحاس)',c?c[1]+' mm²':'أكبر من 35 mm²']];
$('cout').innerHTML=R.map(function(r){return'<tr><td>'+r[0]+'</td><td><b>'+r[1]+'</b></td></tr>'}).join('')}
['ckw','cv','cpf','ceta'].forEach(function(i){$(i).addEventListener('input',calc)});
$('cm1').addEventListener('click',function(){$('ckw').value=1.5;calc()});$('cm2').addEventListener('click',function(){$('ckw').value=.75;calc()});calc();
var TM=[['محمود علي عبد الواحد','Mahmoud Ali','Classic Control Circuit Design & Wiring',1],['مصطفى هيثم عبد الحليم','Mostafa Haitham','Power Circuit & Distribution Panel',1],['مصطفى رمضان عيد','Mostafa Ramadan','Conveyor System & Mechanical Mounting',1],['مصطفى محمد أحمد','Mostafa Mohamed Ahmed','Circuit Breakers, Contactors & Safety Testing',1],['عبد الرحمن السيد أحمد','Abdelrahman El-Sayed','Field Cabling & Motor Cable Management',1],['مصطفى محمد منصور','Mostafa Mohamed Mansour','ESP32 Firmware Development & Protocols',2],['يوسف حاتم علي','Youssef Hatem','MCSA Current & Voltage Sensors Calibration',2],['يوسف أسامة ذكي','Youssef Osama','Vibration & Temperature Sensors Setup',2],['يوسف أحمد يوسف','Youssef Ahmed','Signal Conditioning & Hardware Testing',2],['مهرائيل جمال شوقي','Mehrael Gamal','Raspberry Pi OS Setup & Local MQTT Server',3],['مريم مصطفى عبد الحميد','Mariam Mostafa','Frontend Dashboard UI/UX Design',3],['منال عماد الدين حسين','Manal Emad El-Din','Backend Integration & Data Pipeline',3],['شهد أسامة نبيل','Shahd Osama','Real-time Alerts & User Management',3],['محمد بدر محمد','Mohamed Badr','Bill of Materials & Cost Comparison',4],['يوسف أيمن رجب','Youssef Ayman','Technical Documentation & Implementation Report',4]],PN=['','التركيب والكهرباء','الحساسات','الداشبورد والبرمجة','البحث والتوثيق'],tdone=0;
function rTeam(){var me=document.querySelector('.uc b');me=me&&me.textContent;$('tmg').innerHTML=TM.map(function(t){return'<div class="tmc'+(t[1]==me?' me':'')+'"><em>'+PN[t[3]]+'</em><b>'+esc(t[0])+'</b><small>'+esc(t[1])+'</small><small>'+esc(t[2])+'</small></div>'}).join('')}
function report(){var w=W();if(!w)return;var h='<h1>WAMA — '+(en?'Condition Monitoring Report':'تقرير حالة المحركات')+'</h1><p>'+new Date().toLocaleString(en?'en-GB':'ar-EG')+'</p>';
w.ms.forEach(function(m){var x=m.d,T=m.T;h+='<h2>'+m.n+' — '+m.kw+' kW</h2><table><tr><td>الحالة</td><td>'+(m.on?'تعمل — منطقة '+x.z:'متوقف: '+esc(m.trip))+'</td></tr><tr><td>اهتزاز RMS</td><td>'+x.vr.toFixed(2)+' mm/s</td></tr><tr><td>مؤشر الصحة</td><td>'+x.H.toFixed(0)+'%</td></tr><tr><td>العمر المتبقي</td><td>'+esc(x.rul)+'</td></tr><tr><td>الحرارة (ملفات / DE / NDE / هيكل)</td><td>'+T.map(function(v){return v.toFixed(0)}).join(' / ')+' °C</td></tr><tr><td>التيار L1/L2/L3</td><td>'+x.Ir.map(function(v){return v.toFixed(2)}).join(' / ')+' A (عدم اتزان '+x.imb.toFixed(1)+'%)</td></tr><tr><td>القدرة / السرعة</td><td>'+x.kw.toFixed(2)+' kW / '+m.rpm.toFixed(0)+' RPM</td></tr><tr><td>التشخيص</td><td>'+(x.dg.length?x.dg.map(esc).join('<br>'):'لا توجد قمم غير طبيعية')+'</td></tr></table>'});
h+='<h2>آخر الأحداث</h2><ul>'+EV.slice(0,15).map(function(e){return'<li>'+esc(e.t+' — '+e.m+': '+e.e)+'</li>'}).join('')+'</ul>';$('rpt').innerHTML=h;try{window.print()}catch(e){toast('الطباعة مش متاحة هنا. افتح الموقع في كروم مباشرة.')}}
$('drpt').addEventListener('click',report);$('rpt2').addEventListener('click',report);
setInterval(function(){collect();watch();if(!$('log').hidden){rLog();rCmp()}if(!$('team').hidden){if(!tdone){rTeam();tdone=1}}else tdone=0},500);
})();

/* ===== part 9 ===== */
(function(){var nv=document.getElementById('nvb'),im=nv&&nv.querySelector('img');if(!im)return;
var w=document.createElement('div'),N=32,h='';w.className='nl';w.setAttribute('role','img');w.setAttribute('aria-label','WAMA');w.style.setProperty('--lg','url("'+im.src+'")');
for(var i=0;i<N;i++)h+='<i style="--i:'+i+';background-position:'+(i/(N-1)*100).toFixed(2)+'% 0"></i>';
w.innerHTML=h;nv.replaceChild(w,im)})();

/* ===== part 10 ===== */
(function(){var on=true,AC=null;try{on=localStorage.getItem('wama_ui')!=='0'}catch(e){}
function ctx(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state=='suspended')AC.resume()}catch(e){}return AC}
var RV=null;
function rev(){if(RV)return RV;var n=Math.floor(AC.sampleRate*.35),bf=AC.createBuffer(1,n,AC.sampleRate),d=bf.getChannelData(0);for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,3);RV=AC.createConvolver();RV.buffer=bf;RV.connect(AC.destination);return RV}
function tone(t,f0,f1,dur,peak,att,tc,out){var o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dur);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+att);g.gain.setTargetAtTime(0,t+att+.008,tc);o.connect(g);g.connect(out);o.start(t);o.stop(t+.3)}
/* water drop: rising "bloop" + soft body thump + small wet tail */
function pop(hi,base,force){if(!(on||force)||!ctx())return;var t=AC.currentTime,f=(base||(hi?1000:820))*(.88+Math.random()*.28),m=AC.createGain(),w=AC.createGain();
m.gain.value=.9;m.connect(AC.destination);w.gain.value=.2;m.connect(w);w.connect(rev());
tone(t,f*.62,f*1.55,.075,.26,.003,.032,m);
tone(t,f*1.24,f*3.1,.075,.06,.003,.014,m);
tone(t,190,80,.05,.12,.002,.016,m)}
window.WAMA_DROP=function(base){pop(1,base,1)};
})();

/* ===== part 11: glass nav (liquid indicator + bubble) and supervisors ID cards ===== */
(function(){
var $=function(i){return document.getElementById(i)},NS='http://www.w3.org/2000/svg',
RM=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
/* ---- glass navigation: a glowing glass pill slides to the pressed tab ---- */
var nv=$('nvb');
if(nv){
var ind=document.createElement('span');ind.className='gi';ind.setAttribute('aria-hidden','true');nv.insertBefore(ind,nv.firstChild);
var first=true,lx=-1;
var place=function(){var b=nv.querySelector('button[aria-current="page"]');if(!b){ind.style.opacity=0;return}
ind.style.opacity=1;var x=b.offsetLeft,w=b.offsetWidth;
if(!first&&!RM&&x!==lx){ind.classList.remove('mv');void ind.offsetWidth;ind.classList.add('mv')}
lx=x;ind.style.left=x+'px';ind.style.width=w+'px';
if(first){first=false;requestAnimationFrame(function(){ind.classList.add('rdy')})}};
new MutationObserver(place).observe(nv,{subtree:true,attributes:true,attributeFilter:['aria-current']});
new MutationObserver(function(){requestAnimationFrame(place)}).observe(nv,{childList:true});
window.addEventListener('resize',place);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(place);
place();setTimeout(place,300);
nv.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||RM)return;
var r=b.getBoundingClientRect(),nr=nv.parentNode.getBoundingClientRect(),el=document.createElement('span');
el.className='gb';el.innerHTML='<i></i><i></i><i></i>';el.style.left=(r.left+r.width/2)+'px';el.style.top=nr.bottom+'px';document.body.appendChild(el);
setTimeout(function(){el.remove()},520)})}
/* ---- ID cards ---- */
var SUP=[{ar:'د. مصطفى عبده',en:'Dr. Mostafa Abdou',role:'المشرف على المشروع',roleEn:'Project Supervisor',id:'WAMA-2026-SUP-01',ini:'م'},
{ar:'م. سيد طه',en:'Eng. Sayed Taha',role:'فريق الإشراف على المشروع',roleEn:'Supervision Team',id:'WAMA-2026-SUP-02',ini:'س'}];
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function ph(i){try{return localStorage.getItem('wama_idp'+i)||''}catch(e){return''}}
function bars(seed){var h=0,s='';for(var i=0;i<seed.length;i++)h=(h*31+seed.charCodeAt(i))>>>0;
for(var k=0;k<34;k++){h=(h*1103515245+12345)>>>0;s+='<i style="height:'+(30+(h>>>8)%70)+'%"></i>'}return s}
function bc(seed){var h=0,s='';for(var i=0;i<seed.length;i++)h=(h*131+seed.charCodeAt(i))>>>0;
for(var k=0;k<42;k++){h=(h*1664525+1013904223)>>>0;s+='<i style="width:'+(1+(h>>>10)%3)+'px"></i>'}return s}
var box=$('ids');
function render(){if(!box)return;box.innerHTML=SUP.map(function(p,i){var im=ph(i);
return'<article class="idc" aria-label="'+esc(p.en)+'"><div class="wv" aria-hidden="true">'+bars(p.id)+'</div>'
+'<header><b>WAMA</b><span>Graduation Project 2026</span></header>'
+'<div class="idm"><button type="button" class="phb" data-i="'+i+'" aria-label="تغيير صورة '+esc(p.ar)+'"'+(im?' style="background-image:url('+im+')"':'')+'>'+(im?'':esc(p.ini))+'</button>'
+'<div><div class="nm">'+esc(p.ar)+'</div><div class="en">'+esc(p.en)+'</div><div class="rl">'+esc(p.role)+'</div><div class="en">'+esc(p.roleEn)+'</div></div></div>'
+'<footer><span class="no">'+esc(p.id)+'</span><span class="bc" aria-hidden="true">'+bc(p.id)+'</span></footer>'
+'<input type="file" accept="image/*" hidden data-i="'+i+'"></article>'}).join('')}
render();
if(box){
box.addEventListener('click',function(e){var b=e.target.closest('.phb');if(b)b.parentNode.parentNode.querySelector('input[type=file]').click()});
box.addEventListener('change',function(e){var f=e.target.files&&e.target.files[0],i=e.target.dataset.i;if(!f||!/^image\//.test(f.type))return;
var rd=new FileReader();rd.onload=function(){var im=new Image();im.onload=function(){var c=document.createElement('canvas');c.width=c.height=240;var g=c.getContext('2d'),m=Math.min(im.width,im.height);
g.drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,240,240);try{localStorage.setItem('wama_idp'+i,c.toDataURL('image/jpeg',.82))}catch(x){}render()};im.src=rd.result};rd.readAsDataURL(f)})}
var pb=$('idp');
if(pb)pb.addEventListener('click',function(){document.body.classList.add('pid');window.print()});
window.addEventListener('afterprint',function(){document.body.classList.remove('pid')});
})();

/* ===== part 12: عدادات تتحرك عند الظهور + theme-color + نموذج التواصل ===== */
(function(){
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;

/* 1) عدادات الأرقام: تبدأ فقط لما العنصر يظهر على الشاشة */
var cs=document.querySelectorAll('.counter');
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(es,ob){es.forEach(function(en){
if(!en.isIntersecting)return;
var el=en.target,t=+el.getAttribute('data-target');ob.unobserve(el);
if(RM){el.textContent=t;return}
var c=0,inc=Math.max(1,Math.ceil(t/60));
(function up(){c=Math.min(t,c+inc);el.textContent=c;if(c<t)setTimeout(up,30)})()})},{threshold:.5});
cs.forEach(function(c){c.textContent='0';io.observe(c)})}

/* 2) لون شريط المتصفح يتبع الوضع الفاتح/الداكن */
var mt=document.querySelector('meta[name=theme-color]'),H=document.documentElement;
function sync(){if(mt)mt.setAttribute('content',H.getAttribute('data-theme')==='light'?'#ffffff':'#000000')}
sync();new MutationObserver(sync).observe(H,{attributes:true,attributeFilter:['data-theme']});

/* 3) نموذج التواصل (Formspree) */
var f=document.getElementById('cf'),st=document.getElementById('cfs');
if(f)f.addEventListener('submit',function(e){e.preventDefault();
if(/YOUR_FORM_ID/.test(f.action)){st.textContent='النموذج مش مفعّل لسه: حط الـ Form ID بتاع Formspree في index.html.';return}
var b=f.querySelector('button[type=submit]');b.disabled=true;st.textContent='جاري الإرسال…';
fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}})
.then(function(r){if(!r.ok)throw 0;f.reset();st.textContent='وصلت رسالتك. شكراً ليك!'})
.catch(function(){st.textContent='الإرسال فشل. جرّب تاني بعد شوية.'})
.then(function(){b.disabled=false})});
})();
