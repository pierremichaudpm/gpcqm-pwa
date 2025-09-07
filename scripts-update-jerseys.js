const https = require('https');
function fetchJson(url){
  return new Promise((resolve,reject)=>{
    https.get(url,(res)=>{
      let data='';
      res.on('data',c=>data+=c);
      res.on('end',()=>{ try{ resolve(JSON.parse(data)); } catch(e){ reject(e);} });
    }).on('error',reject);
  });
}
function mapJersey(name){
  const n = String(name||'').toLowerCase();
  if (n.includes('uae')) return 'emirates.png';
  if (n.includes('lotto')) return 'lotto.png';
  if (n.includes('visma')) return 'visma.png';
  if (n.includes('ineos')) return 'ineos.png';
  if (n.includes('soudal')) return 'soudal.png';
  if (n.includes('lidl') || n.includes('trek')) return 'lidltrek.png';
  if (n.includes('decathlon') || n.includes('ag2r')) return 'decathlon.png';
  if (n.includes('bora')) return 'redbullbora.png';
  if (n.includes('alpecin')) return 'alpecin.png';
  if (n.includes('groupama')) return 'groupama.png';
  if (n.includes('ef')) return 'ef.png';
  if (n.includes('bahrain')) return 'bahrain.png';
  if (n.includes('movistar')) return 'movistar.png';
  if (n.includes('jayco')) return 'jayco.png';
  if (n.includes('arkéa') || n.includes('arkea')) return 'arkea.png';
  if (n.includes('postnl') || n.includes('dsm') || n.includes('picnic')) return 'picnic.png';
  if (n.includes('intermarch') || n.includes('wanty')) return 'intermarchewanty.png';
  if (n.includes('cofidis')) return 'cofidis.png';
  if (n.includes('astana')) return 'astana.png';
  if (n.includes('uno')) return 'uno.png';
  if (n.includes('tudor')) return 'tudor.png';
  if (n.includes('canada')) return 'canada.png';
  if (n.includes('israel')) return 'jersey-placeholder.svg';
  return 'jersey-placeholder.svg';
}
(async ()=>{
  const base = 'https://gpcm-pwa-production.up.railway.app';
  const teams = await fetchJson(base+'/api/teams');
  const out = teams.map(t=>({
    ...t,
    jerseyPath: '/listeengages-package/listeengages/images/jerseys/' + mapJersey(t.name)
  }));
  process.stdout.write(JSON.stringify(out,null,2));
})();
