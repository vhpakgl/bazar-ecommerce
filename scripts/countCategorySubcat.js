const fs=require('fs');const s=fs.readFileSync('src/data/products.ts','utf8');
const pairs=[
  {cat:'kadin-giyim',subs:['elbise','tisort','gomlek','pantolon','jean','etek','kazak','sweatshirt']},
  {cat:'erkek-giyim',subs:['tisort','gomlek','pantolon','jean','kazak','sweatshirt','mont','ceket']}
];
const results={};
for(const p of pairs){
  for(const sub of p.subs){
    const re=new RegExp("category:\\s*\""+p.cat+"\"[\s\S]*?subcategory:\\s*\""+sub+"\"","g");
    const m=(s.match(re)||[]).length;
    results[`${p.cat} -> ${sub}`]=m;
  }
}
console.log(JSON.stringify(results,null,2));
