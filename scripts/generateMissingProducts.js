const fs=require('fs');
const s=fs.readFileSync('src/data/products.ts','utf8');
const arrText = s.split('export const products: Product[] = [')[1].split('];')[0];
const items = arrText.split(/\},\s*\{/).map(x=>x.replace(/^\{?/,'{').replace(/\}?$/,'}'));
const existing=[];
for(const it of items){
  const mId=it.match(/id:\s*"([^"]+)"/);
  const mCat=it.match(/category:\s*"([^"]+)"/);
  const mSub=it.match(/subcategory:\s*"([^"]+)"/);
  existing.push({id:mId?mId[1]:null,category:mCat?mCat[1]:null,subcategory:mSub?mSub[1]:null});
}
let maxId=0;existing.forEach(e=>{const n=parseInt(e.id,10);if(!isNaN(n)&&n>maxId)maxId=n});
const pairs=[
  {cat:'kadin-giyim',subs:['elbise','tisort','gomlek','pantolon','jean','etek','kazak','sweatshirt']},
  {cat:'erkek-giyim',subs:['tisort','gomlek','pantolon','jean','kazak','sweatshirt','mont','ceket']}
];
const need=[];
for(const p of pairs){
  for(const sub of p.subs){
    const have=existing.filter(e=>e.category===p.cat && e.subcategory===sub).length;
    const missing=Math.max(0,5-have);
    if(missing>0) need.push({category:p.cat,subcategory:sub,missing});
  }
}
let nextId=maxId+1;
function slugify(text){return text.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}
const entries=[];
for(const n of need){
  for(let i=0;i<n.missing;i++){
    const name=`${n.category==='kadin-giyim'?'Kadın':'Erkek'} ${n.subcategory} Ürün ${i+1}`;
    const slug=slugify(name+" "+nextId);
    const obj={
      id: String(nextId++),
      name,
      slug,
      price: Math.floor(200+Math.random()*1400),
      category: n.category,
      subcategory: n.subcategory,
      image: "https://images.unsplash.com/photo-1520975912812-2b4c4d8d0c3d?auto=format&fit=crop&w=900&q=80",
      description: "Otomatik eklenen örnek ürün.",
      material: "Pamuk karışımı",
      colors: ["Siyah","Beyaz"],
      sizes: ["S","M","L"],
      stock: 20,
      rating: 4.2
    };
    entries.push(obj);
  }
}
fs.writeFileSync('scripts/newProducts.json', JSON.stringify(entries, null, 2), 'utf8');
// generate TypeScript object text
const tsText = entries.map(e=>{
  const parts = [];
  parts.push('{');
  parts.push(`  id: "${e.id}",`);
  parts.push(`  name: "${e.name}",`);
  parts.push(`  slug: "${e.slug}",`);
  parts.push(`  price: ${e.price},`);
  parts.push(`  category: "${e.category}",`);
  parts.push(`  subcategory: "${e.subcategory}",`);
  parts.push(`  image: "${e.image}",`);
  parts.push(`  description: "${e.description}",`);
  parts.push(`  material: "${e.material}",`);
  parts.push(`  colors: [${e.colors.map(c=>`"${c}"`).join(', ')}],`);
  parts.push(`  sizes: [${e.sizes.map(c=>`"${c}"`).join(', ')}],`);
  parts.push(`  stock: ${e.stock},`);
  parts.push(`  rating: ${e.rating},`);
  parts.push('}');
  return parts.join('\n');
}).join(',\n\n');
fs.writeFileSync('scripts/newProducts.ts', tsText, 'utf8');
console.log('wrote', entries.length, 'entries to scripts/newProducts.ts');
