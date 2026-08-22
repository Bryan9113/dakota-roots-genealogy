(()=>{
'use strict';
async function check(){
  const el=document.getElementById('modelStatus');
  if(!el)return;
  try{
    const r=await fetch('/api/rootline-ai',{cache:'no-store'});
    const d=await r.json();
    if(!r.ok||!d.ok)throw new Error();
    if(d.gatewayAuthDetected){
      el.textContent='AI engine online • Gateway authenticated';
      el.style.color='#71d6a2';
    }else{
      el.textContent='AI engine online • model authorization check needed';
      el.style.color='#e8ce82';
    }
  }catch{
    el.textContent='AI endpoint unavailable';
    el.style.color='#ff8e99';
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',check);else check();
})();
