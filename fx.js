/* PurinFX: タップした場所のまわりに、小さな飾りをランダムに出す */
(function(){
var PAW='paw.png';
var PINK=['#FF6FA0','#FF8FB8','#FFB3D2','#FF4F8B','#FFD1E3'];
var GLOW=['#FFFFFF','#FFD36B','#FFB3D2','#FF9CC4','#D9C2FF'];
var SVG={
 spark:'<svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z" fill="COLOR"/></svg>',
 heart:'<svg viewBox="0 0 24 24"><path d="M12 21C5 15.5 2 12 2 8.2 2 5.4 4.2 3.5 6.7 3.5c2 0 3.7 1.1 5.3 3.2 1.6-2.1 3.3-3.2 5.3-3.2 2.5 0 4.7 1.9 4.7 4.7 0 3.8-3 7.3-10 12.8Z" fill="COLOR"/></svg>',
 star:'<svg viewBox="0 0 24 24"><path d="M12 1.5l3 6.9 7.5.7-5.7 5 1.7 7.4L12 17.5 5.5 21.5l1.7-7.4-5.7-5 7.5-.7z" fill="COLOR"/></svg>',
 bubble:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10.5" fill="rgba(255,255,255,.35)" stroke="COLOR" stroke-width="1.5"/><ellipse cx="8" cy="8" rx="2.6" ry="1.5" transform="rotate(-35 8 8)" fill="#fff"/></svg>'
};
function rnd(a,b){return a+Math.random()*(b-a)}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
var layer;
function ensure(){
 if(layer)return layer;
 layer=document.createElement('div');
 layer.style.cssText='position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:2147483000';
 layer.setAttribute('aria-hidden','true');
 document.body.appendChild(layer);return layer;
}
function make(kind,o){o=o||{};
 var el=document.createElement('div');
 el.style.cssText='position:absolute;left:0;top:0;line-height:1;will-change:transform,opacity;pointer-events:none';
 var size;
 if(kind==='paw'){size=o.min?rnd(o.min,o.max):rnd(9,20);el.innerHTML='<img src="'+PAW+'" alt="" style="width:100%;height:100%;display:block">'}
 else if(kind==='spark'){size=rnd(9,20);el.innerHTML=SVG.spark.replace('COLOR',pick(GLOW.concat(['#FFFFFF','#FFD6E6'])));el.style.filter='drop-shadow(0 0 1.5px #E8509A) drop-shadow(0 0 4px #FF8FB8)'}
 else if(kind==='heart'){size=rnd(9,17);el.innerHTML=SVG.heart.replace('COLOR',pick(PINK))}
 else if(kind==='star'){size=rnd(9,16);el.innerHTML=SVG.star.replace('COLOR',pick(['#FFE27A','#FFF3B8','#FFB3D2','#FFFFFF']));el.style.filter='drop-shadow(0 0 3px #FFB347)'}
 else if(kind==='bubble'){size=rnd(12,26);el.innerHTML=SVG.bubble.replace('COLOR',pick(['#FF8FB8','#B9A4FF','#8FD3FF']))}
 else if(kind==='dust'){size=rnd(.9,2);var dc=pick(['#FFFFFF','#FFFFFF','#FFE9A8','#FFC2DA','#FF9CC4','#E4D2FF']);
   el.style.background=dc;el.style.borderRadius='50%';el.style.boxShadow='0 0 0 .4px rgba(232,80,154,.35),0 0 2px '+dc+',0 0 4px '+dc}
 else if(kind==='lame'){size=rnd(2.5,5.5);var c=pick(['#FFFFFF','#FFD36B','#FFA9CB','#FF8FB8','#C9B0FF','#FFC24D']);
   el.style.background='linear-gradient(135deg,#fff,'+c+')';el.style.boxShadow='0 0 0 .6px rgba(232,80,154,.45),0 0 4px '+c+',0 0 8px '+c;
   el.style.borderRadius=Math.random()<.5?'1px':'50%'}
 else if(kind==='cross'){size=rnd(14,20);el.textContent='✞';el.style.fontSize=size+'px';el.style.color=pick(['#7A1F45','#B3123F','#FFFFFF']);el.style.textShadow='0 0 4px #FF6FA0,0 0 8px #FF8FB8';el.style.fontWeight='700';
   el.style.width=el.style.height='auto';return {el:el,size:size,text:true}}
 else{var map={pudding:'🍮',berry:'🍓',ribbon:'🎀',note:'♪',cherry:'🍒'};
   size=rnd(12,19);el.textContent=map[kind];el.style.fontSize=size+'px';if(kind==='note'){el.style.color=pick(PINK);el.style.fontWeight='900'}
   return {el:el,size:size,text:true}}
 el.style.width=el.style.height=size+'px';
 return {el:el,size:size,text:false};
}
var MOTION={
 pop:function(o){var a=rnd(0,6.283),r=rnd(10,52);return {dx:Math.cos(a)*r,dy:Math.sin(a)*r-rnd(0,10),rise:-rnd(6,22),dur:rnd(650,1000),spin:rnd(-50,50),scale:[0,1.15,1,.9]}},
 sprinkle:function(o){var a=rnd(0,6.283),r=rnd(6,60);return {dx:Math.cos(a)*r,dy:Math.sin(a)*r,rise:rnd(8,26),dur:rnd(700,1300),spin:0,twinkle:true,scale:[.2,1,1,.3]}},
 dust:function(o){return {dx:rnd(-7,7),dy:rnd(-7,7),rise:rnd(-6,4),dur:rnd(900,1700),spin:0,dust:true,scale:[1,1,1,1]}},
 float:function(o){return {dx:rnd(-34,34),dy:rnd(-16,16),rise:-rnd(40,90),dur:rnd(1100,1700),spin:rnd(-25,25),scale:[.2,1,1,.9]}},
 shoot:function(o){var a=rnd(-2.6,-.5),r=rnd(50,100);return {dx:Math.cos(a)*r,dy:Math.sin(a)*r,rise:0,dur:rnd(600,900),spin:rnd(180,360),scale:[.4,1.1,.8,.2]}}
};
var KINDS={dust:'dust',paw:'pop',spark:'sprinkle',lame:'sprinkle',heart:'float',star:'shoot',bubble:'float',cross:'float',pudding:'pop',berry:'pop',ribbon:'pop',note:'float',cherry:'pop'};
function spawn(x,y,kind,o){
 var m=make(kind,o),el=m.el,mo=MOTION[KINDS[kind]](m),box=m.size;
 layer.appendChild(el);
 var rot=rnd(-60,60),x0=x-box/2+rnd(-4,4),y0=y-box/2+rnd(-4,4);
 if(kind==='dust'){var da=rnd(0,6.283),dr=96*Math.sqrt(Math.random());x0=x+Math.cos(da)*dr-box/2;y0=y+Math.sin(da)*dr-box/2}
 var sc=mo.scale,tw=mo.twinkle;
 var f=[
  {transform:'translate('+x0+'px,'+y0+'px) rotate('+rot+'deg) scale('+sc[0]+')',opacity:0},
  {transform:'translate('+(x0+mo.dx*.45)+'px,'+(y0+mo.dy*.45+mo.rise*.4)+'px) rotate('+(rot+mo.spin*.4)+'deg) scale('+sc[1]+')',opacity:1,offset:.25},
  {transform:'translate('+(x0+mo.dx*.8)+'px,'+(y0+mo.dy*.8+mo.rise*.8)+'px) rotate('+(rot+mo.spin*.8)+'deg) scale('+sc[2]+')',opacity:tw?.35:.9,offset:.6},
  {transform:'translate('+(x0+mo.dx)+'px,'+(y0+mo.dy+mo.rise)+'px) rotate('+(rot+mo.spin)+'deg) scale('+sc[3]+')',opacity:0}
 ];
 var delay=rnd(0,90);
 if(mo.dust){var n=7,fr=[];for(var q=0;q<=n;q++){var t=q/n;fr.push({transform:'translate('+(x0+mo.dx*t)+'px,'+(y0+mo.dy*t+mo.rise*t)+'px) scale('+(q%2?1.5:.5)+')',opacity:q===0||q===n?0:(Math.random()<.55?1:.15),offset:t})}f=fr;delay=rnd(0,520)}
 var an=el.animate(f,{duration:mo.dur,easing:mo.dust?'linear':'cubic-bezier(.2,.7,.3,1)',delay:delay,fill:'both'});
 an.onfinish=function(){el.remove()};
}
var PRESETS=[
 {name:'✞レア・ラメ少なめ',desc:'肉球2〜4個(大きさバラバラ)＋ごく小さなラメ数粒。まれに✞(約1/6)',mix:[['paw',2,4,6,26],['spark',2,3],['dust',5,8]],rare:[['cross',.17]]},
 {name:'✞レア・ラメふつう',desc:'ごく小さなラメが、あちこちでキラキラとまたたきます',mix:[['paw',2,4,6,26],['spark',2,3],['dust',10,14]],rare:[['cross',.17]]},
 {name:'✞レア・ラメたっぷり',desc:'ホコリのようなラメが、広くちりばめられます',mix:[['paw',2,4,6,26],['spark',2,4],['dust',18,24]],rare:[['cross',.17]]}
];
var cur=2,enabled=true;
function burst(x,y,i){
 var p=PRESETS[i==null?cur:i];ensure();
 p.mix.forEach(function(m){var n=Math.round(rnd(m[1],m[2]+.49));for(var k=0;k<n;k++)spawn(x,y,m[0],m[3]?{min:m[3],max:m[4]}:null)});
 (p.rare||[]).forEach(function(r){if(Math.random()<r[1])spawn(x,y,r[0])});
}
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
document.addEventListener('pointerdown',function(e){
 if(!enabled||reduce)return;
 if(e.pointerType==='mouse'&&e.button!==0)return;
 burst(e.clientX,e.clientY);
},{passive:true});
window.PurinFX={presets:PRESETS,set:function(i){cur=i},get:function(){return cur},burst:burst,enable:function(v){enabled=v}};
})();
