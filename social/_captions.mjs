// social/_captions.mjs — writes captions.html from captions.md. node social/_captions.mjs
import fs from 'node:fs';
const md=fs.readFileSync(new URL('./captions.md',import.meta.url),'utf8');
let intro=[],items=[];
for(const l of md.split('\n')){const m=l.match(/^\*\*(\d+(?:–\d+)?) · (.+?)\.\*\* (.*)$/);if(m)items.push({n:m[1],t:m[2],c:m[3]});else if(!items.length&&l.trim()&&!l.startsWith('#')&&l!=='---')intro.push(l);}
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`(.+?)`/g,'<code>$1</code>').replace(/\[(.+?)\]/g,'<mark>[$1]</mark>');
const old=fs.readFileSync(new URL('./captions.html',import.meta.url),'utf8');
const head=old.slice(0,old.indexOf('<div class="intro">'));
const html=head+`<div class="intro">${intro.map(l=>`<p>${esc(l)}</p>`).join('')}</div>
${items.map(i=>`<article class="cap"><div class="n">${i.n}</div><div><h2>${esc(i.t)}</h2><p>${esc(i.c)}</p></div><button type="button" data-copy="${i.c.replace(/\*/g,'').replace(/"/g,'&quot;')}">Copy</button></article>`).join('\n')}
<p class="tags">Add the core set to every post: #99names #AsmaUlHusna #NamesOfAllah #دعاء #الأسماء_الحسنى</p>
</div>
<script>document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function(){b.textContent='Copied';b.classList.add('done');setTimeout(function(){b.textContent='Copy';b.classList.remove('done')},1400)})})})</script>
<script src="/hub/back.js" defer></script>
</body></html>`;
fs.writeFileSync(new URL('./captions.html',import.meta.url),html);console.log('captions',items.length);
