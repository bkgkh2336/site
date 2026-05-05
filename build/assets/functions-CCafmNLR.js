const t=async t=>{try{const r=await fetch(`/backend/api.php/api/${t}`);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return await r.json()}catch(r){return[]}};export{t as G};
