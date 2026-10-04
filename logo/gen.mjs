import * as opentype from '../../site/node_modules/opentype.js/dist/opentype.mjs';
import fs from 'fs';
const INK='#2A2622', SAND='#F4EEE4';
const out='./';
const fr=opentype.parse(fs.readFileSync('src/fraunces.ttf').buffer.slice(0));
const ar=opentype.parse(fs.readFileSync('src/arefruqaa.ttf').buffer.slice(0));

function rays(cx,cy,r1,r2,w,c){let s='';for(let i=0;i<99;i++){const a=i/99*Math.PI*2-Math.PI/2;s+=`<line x1="${(cx+Math.cos(a)*r1).toFixed(2)}" y1="${(cy+Math.sin(a)*r1).toFixed(2)}" x2="${(cx+Math.cos(a)*r2).toFixed(2)}" y2="${(cy+Math.sin(a)*r2).toFixed(2)}"/>`;}return `<g stroke="${c}" stroke-width="${w}" stroke-linecap="round">${s}</g>`;}
// The mark: a ring of ninety-nine rays and nothing at its centre. The light is the empty middle.
function mark(c,size=100){const s=size/100;return rays(50*s,50*s,26*s,48*s,1.6*s,c);}
function svg(w,h,body,bg){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${bg?`<rect width="${w}" height="${h}" fill="${bg}"/>`:''}${body}</svg>`;}
const DAWN=`<defs><linearGradient id="dawn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F6DCCF"/><stop offset=".35" stop-color="#EFD9B8"/><stop offset=".7" stop-color="#CFD9C4"/><stop offset="1" stop-color="#C9DBE6"/></linearGradient></defs>`;

// 1. Mark
fs.writeFileSync(out+'mark-ink.svg',svg(100,100,mark(INK)));
fs.writeFileSync(out+'mark-sand.svg',svg(100,100,mark(SAND)));
fs.writeFileSync(out+'mark-on-dawn.svg',svg(100,100,DAWN+`<rect width="100" height="100" fill="url(#dawn)"/>`+mark(INK)));

// 2. Wordmark "99names" — outlines
function textPath(font,text,size,x,y,c,opts={}){const p=font.getPath(text,x,y,size,{kerning:true,features:{liga:true,rlig:true,calt:true,init:true,medi:true,fina:true,isol:true}});return `<path fill="${c}" d="${p.toPathData(2)}"/>`;}
function textWidth(font,text,size){return font.getAdvanceWidth(text,size,{kerning:true});}
const WM_SIZE=64; const wmW=textWidth(fr,'99names',WM_SIZE);
function lockup(c){const mh=56, gap=18, W=Math.ceil(mh+gap+wmW)+4, H=64;return svg(W,H,`<g transform="translate(2,4)">${mark(c,mh)}</g>`+textPath(fr,'99names',WM_SIZE,mh+gap+2,50,c));}
fs.writeFileSync(out+'lockup-horizontal-ink.svg',lockup(INK));
fs.writeFileSync(out+'lockup-horizontal-sand.svg',lockup(SAND));
function wordmark(c){const W=Math.ceil(wmW)+8;return svg(W,64,textPath(fr,'99names',WM_SIZE,4,50,c));}
fs.writeFileSync(out+'wordmark-ink.svg',wordmark(INK));
fs.writeFileSync(out+'wordmark-sand.svg',wordmark(SAND));
function stacked(c){const W=Math.max(120,Math.ceil(wmW));return svg(W+16,200,`<g transform="translate(${(W+16)/2-60},0)">${mark(c,120)}</g>`+textPath(fr,'99names',WM_SIZE,(W+16-wmW)/2,185,c));}
fs.writeFileSync(out+'lockup-stacked-ink.svg',stacked(INK));
fs.writeFileSync(out+'lockup-stacked-sand.svg',stacked(SAND));
// tagline lockup
const tg='Light, by name.';const tgW=textWidth(fr,tg,22);
fs.writeFileSync(out+'lockup-tagline-ink.svg',svg(Math.ceil(Math.max(wmW,tgW))+8,100,textPath(fr,'99names',WM_SIZE,4,50,INK)+textPath(fr,tg,22,4,84,INK)));

// 3. Arabic-Indic numeral ٩٩
const num='٩٩';const nW=textWidth(ar,num,120);
function numeral(c,bg){return svg(Math.ceil(nW)+24,140,(bg?`<rect width="100%" height="100%" fill="${bg}"/>`:'')+textPath(ar,num,120,12,108,c));}
fs.writeFileSync(out+'numeral-ink.svg',numeral(INK));
fs.writeFileSync(out+'numeral-sand.svg',numeral(SAND));
// Arabic signature الأسماء الحسنى
const sig='الأسماء الحسنى';const sW=textWidth(ar,sig,80);
fs.writeFileSync(out+'signature-arabic-ink.svg',svg(Math.ceil(sW)+24,120,textPath(ar,sig,80,12,88,INK)));

// 4. App icon 1024 (dawn + rays) and icon with night variant
function icon(size,dark){const body=dark?`<rect width="${size}" height="${size}" fill="#171A26"/>`+mark(SAND,size*0.78).replace(/<g /,`<g transform="translate(${size*0.11},${size*0.11})" `):DAWN+`<rect width="${size}" height="${size}" fill="url(#dawn)"/>`+`<g transform="translate(${size*0.11},${size*0.11})">${mark(INK,size*0.78)}</g>`;return svg(size,size,body);}
fs.writeFileSync(out+'app-icon.svg',icon(1024,false));
fs.writeFileSync(out+'app-icon-night.svg',icon(1024,true));
// favicon: numeral on dawn
fs.writeFileSync(out+'favicon.svg',svg(64,64,DAWN+`<rect width="64" height="64" rx="14" fill="url(#dawn)"/>`+textPath(ar,num,40,(64-textWidth(ar,num,40))/2,48,INK)));
// social avatar (circle)
fs.writeFileSync(out+'avatar.svg',svg(1024,1024,DAWN+`<circle cx="512" cy="512" r="512" fill="url(#dawn)"/>`+`<g transform="translate(152,152)">${mark(INK,720)}</g>`));
// OG image 1200x630
fs.writeFileSync(out+'og-image.svg',svg(1200,630,DAWN+`<rect width="1200" height="630" fill="url(#dawn)"/>`+`<g transform="translate(760,-70)" opacity=".35">${rays(400,400,230,420,2,INK)}</g>`+textPath(fr,'99names',140,80,330,INK)+textPath(fr,'Light, by name.',44,84,410,INK)+textPath(ar,sig,64,80,530,INK)));
console.log('ok', fs.readdirSync(out).filter(f=>f.endsWith('.svg')).length,'svgs');

// --- Arabic via embedded font (proper shaping in browsers) ---
const b64=fs.readFileSync('src/arefruqaa.ttf').toString('base64');
const FF=`<style>@font-face{font-family:'AR';src:url(data:font/ttf;base64,${b64}) format('truetype')}</style>`;
function artext(text,size,x,y,c,anchor='middle'){return `<text x="${x}" y="${y}" font-family="AR" font-size="${size}" fill="${c}" text-anchor="${anchor}" direction="rtl">${text}</text>`;}
fs.writeFileSync(out+'signature-arabic-ink.svg',svg(520,130,FF+artext('الأسماء الحسنى',76,260,96,INK)));
fs.writeFileSync(out+'signature-arabic-sand.svg',svg(520,130,FF+artext('الأسماء الحسنى',76,260,96,SAND)));
fs.writeFileSync(out+'og-image.svg',svg(1200,630,FF+DAWN+`<rect width="1200" height="630" fill="url(#dawn)"/>`+`<g transform="translate(760,-70)" opacity=".35">${rays(400,400,230,420,2,INK)}</g>`+textPath(fr,'99names',140,80,330,INK)+textPath(fr,'Light, by name.',44,84,410,INK)+artext('الأسماء الحسنى',64,80,530,INK,'start').replace('direction="rtl"','direction="rtl" style="direction:rtl;unicode-bidi:bidi-override"').replace('text-anchor="start"','text-anchor="end"').replace('x="80"','x="420"')));
console.log('arabic ok');
