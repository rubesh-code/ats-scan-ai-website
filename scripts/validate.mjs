import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, dirname, extname } from "node:path";

const root = resolve(import.meta.dirname, "..");
const site = resolve(root, "site");
const required = [
  "index.html","404.html","ats-resume-checker.html","how-it-works.html","pricing.html","faq.html","about.html","contact.html","privacy-policy.html","terms.html","styles.css","script.js","robots.txt","sitemap.xml","assets/logo.svg","assets/favicon.svg","assets/og-image.png","blog/index.html"
];
const errors = [];
for (const item of required) {
  try { await stat(resolve(site,item)); } catch { errors.push(`Missing required file: ${item}`); }
}
async function walk(dir) {
  const out=[];
  for (const entry of await readdir(dir,{withFileTypes:true})) {
    const p=resolve(dir,entry.name);
    if (entry.isDirectory()) out.push(...await walk(p)); else out.push(p);
  }
  return out;
}
const htmlFiles=(await walk(site)).filter((f)=>f.endsWith('.html'));
const routeToFile=(href,currentFile)=>{
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:') || href.startsWith('data:')) return null;
  try {
    const u=new URL(href,'https://learn.atsscanai.com'+('/'+currentFile.replaceAll('\\','/')));
    if (u.hostname!=='learn.atsscanai.com') return null;
    let pathname=decodeURIComponent(u.pathname);
    if (pathname==='/') return resolve(site,'index.html');
    if (pathname.endsWith('/')) return resolve(site,pathname.slice(1),'index.html');
    const clean=pathname.slice(1);
    if (extname(clean)) return resolve(site,clean);
    return resolve(site,clean+'.html');
  } catch { return null; }
};
for (const file of htmlFiles) {
  const rel=file.slice(site.length+1);
  const text=await readFile(file,'utf8');
  for (const pattern of [/<title>[^<]+<\/title>/i,/name="description"/i,/rel="canonical"/i,/<h1[\s>]/i,/G-6XS1R06BYN/,/xwln8z1vyk/]) {
    if (!pattern.test(text)) errors.push(`${rel}: missing ${pattern}`);
  }
  const refs=[...text.matchAll(/(?:href|src)="([^"]+)"/g)].map((m)=>m[1]);
  for (const ref of refs) {
    const target=routeToFile(ref,rel);
    if (!target) continue;
    try { await stat(target); } catch { errors.push(`${rel}: missing local target ${ref}`); }
  }
}
const sitemap=await readFile(resolve(site,'sitemap.xml'),'utf8');
for (const file of htmlFiles.filter((f)=>!f.endsWith('404.html'))) {
  const rel=file.slice(site.length+1).replaceAll('\\','/');
  let url;
  if (rel==='index.html') url='https://learn.atsscanai.com/';
  else if (rel.endsWith('/index.html')) url='https://learn.atsscanai.com/'+rel.replace(/index\.html$/,'');
  else url='https://learn.atsscanai.com/'+rel.replace(/\.html$/,'');
  if (!sitemap.includes(`<loc>${url}</loc>`)) errors.push(`sitemap.xml missing ${url}`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validation passed for ${htmlFiles.length} HTML pages.`);
