const fs = require('fs');
const content = fs.readFileSync('C:/Users/ayuda/Downloads/AI-Free-Tools web/AI-Free-Tools-main/aitoollist.ts', 'utf8');
const enriched = fs.readFileSync('C:/Users/ayuda/Downloads/AI-Free-Tools web/AI-Free-Tools-main/src/data/enrichedTools.ts', 'utf8');

const researched = new Set([...enriched.matchAll(/'([a-z0-9-]+)':\s*\{/g)].map(m => m[1]));

const toolBlocks = content.split(/\n  \{/).slice(1);
const missing = [];
for (const block of toolBlocks) {
  const name = block.match(/name:\s*"([^"]+)"/);
  const handle = block.match(/handle:\s*"([^"]+)"/);
  const website = block.match(/website:\s*"([^"]+)"/);
  const category = block.match(/category:\s*"([^"]+)"/);
  const desc = block.match(/description:\s*"([^"]+)"/);
  if (handle && researched.has(handle[1]) === false) {
    missing.push({name: name?.[1], handle: handle[1], website: website?.[1], category: category?.[1], desc: desc?.[1]});
  }
}
console.log('Total missing:', missing.length);
missing.forEach(t => console.log(t.handle + ' | ' + t.name + ' | ' + t.category + ' | ' + t.website));
