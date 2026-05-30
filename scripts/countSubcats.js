const fs = require('fs');
const s = fs.readFileSync('src/data/products.ts', 'utf8');
const cats = ['elbise','tisort','gomlek','pantolon','jean','etek','kazak','sweatshirt','mont','ceket'];
const counts = {};
for (const c of cats) {
  const re = new RegExp('subcategory:\\s*"' + c + '"', 'g');
  counts[c] = (s.match(re) || []).length;
}
console.log(JSON.stringify(counts, null, 2));
