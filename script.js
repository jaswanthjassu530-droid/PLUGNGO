const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver' in window){document.body.classList.add('js-motion');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
document.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{detail.querySelector('summary b').textContent=detail.open?'−':'+'}));
function progress(){const available=document.documentElement.scrollHeight-innerHeight;document.querySelector('.progress').style.width=(available>0?scrollY/available*100:0)+'%'}addEventListener('scroll',progress,{passive:true});progress();
document.getElementById('year').textContent=new Date().getFullYear();

if(!reduced&&matchMedia('(hover: hover) and (pointer: fine)').matches){
 const scene=document.querySelector('.orb-scene');const hero=document.querySelector('.hero');
 let frame=0;
 hero.addEventListener('pointermove',event=>{if(frame)return;frame=requestAnimationFrame(()=>{const rect=hero.getBoundingClientRect();scene.style.setProperty('--orb-x',((event.clientX-rect.left)/rect.width-.5)*22+'px');scene.style.setProperty('--orb-y',((event.clientY-rect.top)/rect.height-.5)*18+'px');frame=0;});});
 hero.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);frame=0;scene.style.setProperty('--orb-x','0px');scene.style.setProperty('--orb-y','0px');});
 document.querySelectorAll('.skill, .degree-card').forEach(card=>card.addEventListener('pointermove',event=>{const rect=card.getBoundingClientRect();card.style.setProperty('--spot-x',event.clientX-rect.left+'px');card.style.setProperty('--spot-y',event.clientY-rect.top+'px');}));
}

// Decorative desktop cursor. Native pointer remains available on touch and reduced motion.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const desktopPointer=matchMedia('(hover: hover) and (pointer: fine)');
if(!motionPreference.matches&&desktopPointer.matches){
 const halo=document.createElement('div');halo.className='cursor-halo';halo.setAttribute('aria-hidden','true');
 const dot=document.createElement('div');dot.className='cursor-dot';dot.setAttribute('aria-hidden','true');
 document.body.append(halo,dot);
 const trails=Array.from({length:7},(_,index)=>{const el=document.createElement('div');el.className='cursor-trail';el.setAttribute('aria-hidden','true');el.style.setProperty('--trail-alpha',String((1-index/8)*.45));document.body.append(el);return {el,x:0,y:0};});
 let x=0,y=0,hx=0,hy=0,active=false,frame=0,until=0,lastSpark=0;
 const hide=()=>{active=false;document.body.classList.remove('cursor-active');cancelAnimationFrame(frame);frame=0;};
 function render(now){frame=0;if(!active)return;hx+=(x-hx)*.18;hy+=(y-hy)*.18;halo.style.transform=`translate3d(${hx}px,${hy}px,0)`;dot.style.transform=`translate3d(${x}px,${y}px,0)`;let px=hx,py=hy;trails.forEach((p,index)=>{p.x+=(px-p.x)*.28;p.y+=(py-p.y)*.28;p.el.style.transform=`translate3d(${p.x}px,${p.y}px,0) scale(${1-index*.09})`;px=p.x;py=p.y;});if(now<until)frame=requestAnimationFrame(render);}
 document.addEventListener('pointermove',event=>{if(event.pointerType==='touch'||motionPreference.matches)return;x=event.clientX;y=event.clientY;if(!active){hx=x;hy=y;trails.forEach(p=>{p.x=x;p.y=y;});active=true;document.body.classList.add('cursor-active');}until=performance.now()+900;if(!frame)frame=requestAnimationFrame(render);document.body.classList.toggle('cursor-hover',!!event.target.closest('a,summary,button'));},{passive:true});
 document.addEventListener('pointerdown',event=>{if(!active||event.button!==0)return;const now=performance.now();if(now-lastSpark<180)return;lastSpark=now;const pulse=document.createElement('div');pulse.className='cursor-pulse';pulse.setAttribute('aria-hidden','true');pulse.style.left=event.clientX+'px';pulse.style.top=event.clientY+'px';document.body.append(pulse);pulse.addEventListener('animationend',()=>pulse.remove(),{once:true});});
 document.documentElement.addEventListener('pointerleave',hide);window.addEventListener('blur',hide);document.addEventListener('visibilitychange',()=>{if(document.hidden)hide();});motionPreference.addEventListener('change',hide);
 document.querySelectorAll('.skill,.degree-card').forEach(card=>{card.addEventListener('pointermove',event=>{if(motionPreference.matches)return;const rect=card.getBoundingClientRect();card.style.setProperty('--tilt-x',((event.clientY-rect.top)/rect.height-.5)*-5+'deg');card.style.setProperty('--tilt-y',((event.clientX-rect.left)/rect.width-.5)*5+'deg');});card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');});});
}
