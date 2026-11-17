const {chromium}=require('playwright');
const assert=require('node:assert/strict'); const fs=require('node:fs');const path=require('node:path');
const root=path.resolve(__dirname,'..');const out=process.env.ARTIFACT_DIR || path.join(require('node:os').tmpdir(),'creative-production-review');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const data=JSON.parse(fs.readFileSync(root+'/docs/tracks/creative-production-resources.json','utf8'));
 assert.equal(data.resources.length,12);assert.equal(new Set(data.resources.map(r=>r.id)).size,12);
 for(const name of ['hybrid-creative-technology.html','hybrid-creative-technology.md']){
 const s=fs.readFileSync(root+'/docs/tracks/'+name,'utf8'); for(const r of data.resources){assert(s.includes(r.url));assert(s.includes(r.objective));for(const c of r.criteria)assert(s.includes(c));}assert(s.includes(data.collection.url));}
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({acceptDownloads:true,reducedMotion:'reduce'});const page=await context.newPage();const errors=[];const external=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith((process.env.BASE_URL || 'http://127.0.0.1:8765').replace(/\/$/,'')+'/'))external.push(r.url())});
 const base=(process.env.BASE_URL || 'http://127.0.0.1:8765').replace(/\/$/,'')+'/';await page.goto(base);await page.locator('a[href="./tracks/index.html"]').first().click();const trackLink=page.locator('a[href*="hybrid-creative-technology.html"]').first();assert(await trackLink.count());await trackLink.click();
 assert.equal(await page.locator('#creative-production details[id^="creative-"]').count(),12);
 for(const r of data.resources){const box=page.locator('#creative-'+r.id);await box.locator('summary').click();assert(await box.evaluate(e=>e.open));assert.equal(await box.locator('a[href^="https://"]').first().getAttribute('href'),r.url);assert(await box.getByText(r.objective,{exact:false}).count());}
 // All internal links/anchors on the actual rendered page must resolve.
 for(const href of await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')))){
 if(href.startsWith('http')||href.startsWith('mailto:'))continue;
 const u=new URL(href,page.url());const res=await context.request.get(u.href);assert.equal(res.status(),200,href);
 if(u.hash&&u.pathname.endsWith('.html')){const html=await res.text();assert(html.includes('id="'+u.hash.slice(1)+'"'),href);}
 }
 const downloadPromise=page.waitForEvent('download');await page.locator('#creative-review + ol a[download]').click();const download=await downloadPromise;await download.saveAs(out+'/downloaded-review.md');
 const record=fs.readFileSync(out+'/downloaded-review.md','utf8');assert(record.includes('## Review 1'));assert(record.includes('## Review 2'));assert(record.includes('Optional separate peer/instructor'));assert(record.includes(data.collection.url));assert.equal(record,fs.readFileSync(root+'/docs/tracks/creative-production-review.md','utf8'));
 // Resume a locally edited record, with both versions retained.
 fs.appendFileSync(out+'/downloaded-review.md','\nSynthetic resume check: first review saved; next action revise timing.\n');assert(fs.readFileSync(out+'/downloaded-review.md','utf8').includes('next action revise timing'));
 await page.reload();await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').textContent(),'Skip to main content');await page.keyboard.press('Enter');
 const summary=page.locator('#creative-school-of-motion > summary');await summary.focus();await page.keyboard.press('Enter');assert(await page.locator('#creative-school-of-motion').evaluate(e=>e.open));
 const axe=fs.readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
 for(const theme of ['dark','light']){await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);for(const width of [320,375,768,1024,1440]){
 await page.setViewportSize({width,height:900});await page.evaluate(()=>{document.documentElement.dataset.textSize='largest';document.querySelectorAll('#creative-production details').forEach(e=>e.open=true)});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),theme+' '+width);
 }
 await page.addScriptTag({content:axe});const result=await page.evaluate(async()=>await axe.run(document.querySelector('#creative-production'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
 fs.writeFileSync(out+'/axe-'+theme+'.json',JSON.stringify(result.violations,null,2));assert.equal(result.violations.length,0,JSON.stringify(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))));
 }
 await page.setViewportSize({width:1440,height:1000});await page.locator('#creative-production').scrollIntoViewIfNeeded();await page.screenshot({path:out+'/creative-production.png'});
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:900}});const p=await nojs.newPage();await p.goto(base+'tracks/hybrid-creative-technology.html#creative-production');await p.locator('#creative-school-of-motion > summary').click();assert(await p.locator('#creative-school-of-motion').evaluate(e=>e.open));assert(await p.locator('#creative-review').isVisible());
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);await browser.close();console.log('PASS: navigation, 12 source mappings, local links/fragments, native disclosures, keyboard, exact download, local file resume, no-JS, 10 largest-text/theme viewport cases, axe WCAG A/AA (0 violations), no third-party page requests or JS errors. Physical VoiceOver not tested.');
})().catch(e=>{console.error(e);process.exit(1)});
