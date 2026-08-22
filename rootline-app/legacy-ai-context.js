(()=>{
'use strict';
const nativeFetch=window.fetch.bind(window);
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const unique=a=>[...new Set((a||[]).filter(Boolean))];
let loaded=false, loading=null;
const byName=new Map();

async function load(){
  if(loaded)return byName;
  if(loading)return loading;
  loading=(async()=>{
    const urls=[1,2,3,4,5,6].map(i=>`data/legacy-evidence-${i}.json`);
    const groups=await Promise.all(urls.map(async u=>{try{const r=await nativeFetch(u,{cache:'no-store'});return r.ok?await r.json():[]}catch{return[]}}));
    for(const p of groups.flat()) if(p?.name) byName.set(norm(p.name),p);
    loaded=true;
    window.RootlineLegacyEvidence={byName,count:byName.size,get:name=>byName.get(norm(name))||null};
    return byName;
  })();
  return loading;
}

function enrichPerson(person,legacy){
  if(!legacy)return person;
  const current=person||{};
  const legacyRelations=(legacy.relations||[]).map(r=>typeof r==='string'?r:r?.text).filter(Boolean);
  return {
    ...current,
    name:current.name||legacy.name,
    meta:legacy.meta||current.meta,
    confidence:legacy.confidence||current.confidence||'Unverified',
    relations:unique([...(current.relations||[]),...legacyRelations]),
    events:unique([...(current.events||[]),...(legacy.events||[])]),
    gaps:unique([...(current.gaps||[]),...(legacy.gaps||[])]),
    sources:unique([...(current.sources||[]),...(legacy.sources||[])]),
    legacyEvidencePreserved:true
  };
}

window.fetch=async function(input,init={}){
  const url=typeof input==='string'?input:(input?.url||'');
  if(url==='/api/rootline-ai' && String(init.method||'GET').toUpperCase()==='POST'){
    try{
      await load();
      const body=JSON.parse(init.body||'{}');
      const legacy=byName.get(norm(body?.person?.name));
      if(legacy){
        body.person=enrichPerson(body.person,legacy);
        body.legacyContext=true;
        init={...init,body:JSON.stringify(body)};
      }
    }catch(e){console.warn('Rootline legacy evidence overlay unavailable',e)}
  }
  return nativeFetch(input,init);
};

load().catch(()=>{});
})();
