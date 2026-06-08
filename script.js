// 信業法律事務所 共用腳本
const toggle=document.getElementById('navToggle'),links=document.getElementById('navlinks');
if(toggle){toggle.onclick=()=>links.classList.toggle('open');
links.querySelectorAll('a').forEach(a=>a.onclick=()=>links.classList.remove('open'));}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const form=document.getElementById('form');
if(form){document.getElementById('submit').onclick=()=>{
  const n=document.getElementById('f-name').value.trim(),p=document.getElementById('f-phone').value.trim();
  if(!n||!p){alert('請至少填寫姓名與聯絡電話');return;}
  document.getElementById('toast').style.display='block';
  form.reset();
};}

// hero stat count-up
(function(){
  const el=document.querySelector('.hero-stat .num .count');
  if(!el)return;
  const target=parseInt(el.dataset.target||'30',10);
  let started=false;
  function run(){
    if(started)return;started=true;
    const dur=1400, t0=performance.now();
    function tick(now){
      const p=Math.min((now-t0)/dur,1);
      const eased=1-Math.pow(1-p,3);
      el.textContent=Math.round(eased*target);
      if(p<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  // run shortly after load (hero is above the fold)
  setTimeout(run,400);
})();

// safety net: ensure reveals are visible even if observer misses them
window.addEventListener('load',()=>{setTimeout(()=>{
  document.querySelectorAll('.reveal:not(.in)').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.top<window.innerHeight*1.3) el.classList.add('in');
  });
},400);});
// absolute fallback: after 2.5s reveal anything still hidden anywhere
window.addEventListener('load',()=>{setTimeout(()=>{
  document.querySelectorAll('.reveal:not(.in)').forEach(el=>el.classList.add('in'));
},2500);});
