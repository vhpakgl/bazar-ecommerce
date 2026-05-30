const fs=require('fs');
const s=fs.readFileSync('src/data/products.ts','utf8');
const arrText = s.split('export const products: Product[] = [')[1].split('];')[0];
const items = arrText.split(/\},\s*\{/).map(x=>x.replace(/^\{?/,'{').replace(/\}?$/,'}'));
const counts={};
for(const it of items){
  const mCat = it.match(/category:\s*"([^"]+)"/);
  const mSub = it.match(/subcategory:\s*"([^"]+)"/);
  const cat = mCat ? mCat[1] : null;
  const sub = mSub ? mSub[1] : null;
  if(cat && sub){
    const key=`${cat} -> ${sub}`;
    counts[key]=(counts[key]||0)+1;
  }
}
console.log(JSON.stringify(counts,null,2));
