const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const base=(process.env.BASE_URL || 'http://127.0.0.1:8765').replace(/\/$/,'')+'/';
const out=process.env.ARTIFACT_DIR || '/tmp/independent-work-review';
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({acceptDownloads:true,reducedMotion:'reduce'});
 const page=await context.newPage();const errors=[],external=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith(base))external.push(r.url())});
 await page.goto(base);
 await page.getByRole('link',{name:'Build your independent-work pathway',exact:true}).click();
 for(const [name,id] of [['A. Contribute to a real project','contribute'],['B. Find and deliver paid client work','clients'],['C. Build a sustainable freelance business','business']]){
   await page.getByRole('link',{name,exact:true}).click();assert.equal(new URL(page.url()).hash,'#'+id);assert(await page.locator('#'+id).isVisible());
 }
 await page.goto(base+'pixie-contributors.html');await page.getByRole('link',{name:'Build your independent-work pathway',exact:true}).click();
 // Check every actual local link and fragment from the pathway, handoff and evidence page.
 const routes=['independent-work.html','independent-work-handoff.html','templates/training-plan.html'];
 const axe=fs.readFileSync(process.env.AXE_PATH || require.resolve('axe-core/axe.min.js'),'utf8');
 for(const route of routes){
   await page.goto(base+route);
   assert.equal(await page.locator('h1').count(),1);
   for(const href of await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')))){
     if(/^(https?:|mailto:)/.test(href))continue;
     const u=new URL(href,page.url());const res=await context.request.get(u.href);assert.equal(res.status(),200,href);
     if(u.hash && u.pathname.endsWith('.html'))assert((await res.text()).includes('id="'+u.hash.slice(1)+'"'),href);
   }
   await page.reload();await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').textContent(),'Skip to main content');
   assert(await page.locator(':focus').evaluate(e=>{const s=getComputedStyle(e);return s.outlineStyle!=='none' && parseFloat(s.outlineWidth)>0}));
   await page.keyboard.press('Enter');
   if(route==='independent-work.html'){
     const disclosure=page.locator('#resource-mirlo summary');await disclosure.focus();await page.keyboard.press('Enter');assert(await page.locator('#resource-mirlo details').evaluate(e=>e.open));
     await page.keyboard.press('Enter');assert.equal(await page.locator('#resource-mirlo details').evaluate(e=>e.open),false);
   }
   for(const theme of ['dark','light']){
     await page.evaluate(t=>{document.documentElement.dataset.theme=t;document.querySelectorAll('main details').forEach(e=>e.open=true);document.documentElement.style.fontSize='200%';},theme);
     for(const width of [320,390,768,1024,1440]){
       await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route} ${theme} ${width} doubled-text reflow`);
     }
     await page.setViewportSize({width:768,height:900});await page.addScriptTag({content:axe});
     const results=await page.evaluate(async()=>await axe.run({runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
     fs.writeFileSync(path.join(out,route.replaceAll('/','-')+'-'+theme+'-axe.json'),JSON.stringify(results.violations,null,2));
     assert.equal(results.violations.length,0,JSON.stringify(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))));
   }
   await page.evaluate(()=>{document.documentElement.style.fontSize='';document.querySelectorAll('main details').forEach(e=>e.open=false)});
   await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(out,route.replaceAll('/','-')+'.png'),fullPage:true});
 }
 await page.goto(base+'templates/training-plan.html');const downloadPromise=page.waitForEvent('download');await page.getByRole('link',{name:'Download the editable training plan and evidence fields'}).click();const download=await downloadPromise;const file=path.join(out,'training-plan.md');await download.saveAs(file);assert.equal(fs.readFileSync(file,'utf8'),fs.readFileSync(path.resolve(__dirname,'../docs/templates/training-plan.md'),'utf8'));
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:900}});const p=await nojs.newPage();await p.goto(base+'independent-work.html');assert(await p.locator('#clients').isVisible());await p.locator('#resource-mirlo summary').click();assert(await p.locator('#resource-mirlo details').evaluate(e=>e.open));assert(await p.getByRole('link',{name:'Read the pathway handoff'}).isVisible());
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 await browser.close();console.log('PASS: training/contributor navigation, three routes, local links/anchors, keyboard/focus/disclosure, exact evidence download, no-JS, reduced motion, 30 doubled-text viewport/theme cases, axe A/AA (zero violations), no external requests or page errors. Physical Safari/VoiceOver NOT RUN.');
})().catch(e=>{console.error(e);process.exit(1)});
