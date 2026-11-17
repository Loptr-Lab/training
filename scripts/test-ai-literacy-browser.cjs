const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const artifacts = process.env.ARTIFACT_DIR || path.join(require('node:os').tmpdir(),'ai-literacy-review');
fs.mkdirSync(artifacts,{recursive:true});
const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:8765';
(async () => {
 const browser = await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE || '/usr/bin/chromium',args:['--no-sandbox']});
 const page = await browser.newPage();
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto(baseUrl+'/ai-literacy/rubrics.html');
 const answers=[1,2,0,1,0,1,2];
 for (let i=1;i<=7;i++) {
  const f=page.locator(`[data-step="${i}"]`); const wrong=(answers[i-1]+1)%3;
  await f.locator(`[value="${wrong}"]`).check(); await f.locator('[type=submit]').click();
  assert.match(await f.locator('.feedback').innerText(),/Try once more/);
  await f.locator('[type=submit]').click(); assert.match(await f.locator('.feedback').innerText(),/After your retry.*Takeaway/s);
  assert(await f.locator('[type=submit]').isDisabled());
  await f.locator('.question-reset').click(); assert.equal(await f.locator('.feedback').innerText(),'');
  await f.locator(`[value="${answers[i-1]}"]`).check(); await f.locator('[type=submit]').click();
  assert.match(await f.locator('.feedback').innerText(),/^PASS/);
 }
 const score=page.locator('#score-practice');
 await page.locator('#score-answer').fill('24'); await score.locator('[type=submit]').click();
 assert.match(await page.locator('#score-feedback').innerText(),/Try once more/);
 await score.locator('[type=submit]').click(); assert.match(await page.locator('#score-feedback').innerText(),/12 points/);
 await score.locator('[type=reset]').click(); await page.locator('#score-answer').fill('12'); await score.locator('[type=submit]').click();
 assert.match(await page.locator('#score-feedback').innerText(),/^PASS/);
 await page.locator('#criterion-text').fill('The trip is good and the total matches the file.');
 await page.locator('#criterion-reason').fill('A combined check for practice.');
 await page.locator('#criterion-weight').fill('0'); await page.locator('#review-criterion').click();
 assert.equal(await page.locator('#keep-criterion').isVisible(),false);
 await page.locator('#criterion-weight').fill('-6'); await page.locator('#review-criterion').click();
 assert.match(await page.locator('#writer-feedback').innerText(),/Atomic.*Objective.*Verifiable.*Negative weight/s);
 await page.locator('#review-criterion').click(); assert.match(await page.locator('#writer-feedback').innerText(),/Worked reference/);
 await page.locator('#keep-criterion').click();
 for(let i=2;i<=3;i++) {
  await page.locator('#criterion-text').fill('States the party total as 100 credits including the shared 20-credit shuttle.');
  await page.locator('#criterion-reason').fill('The prompt requires party costs.');
  await page.locator('#review-criterion').click(); await page.locator('#keep-criterion').click();
 }
 assert.equal(await page.locator('#writer').isVisible(),false);
 assert.equal(await page.locator('#written-criteria p').count(),4);
 const downloadPromise=page.waitForEvent('download'); await page.locator('#download-drafts').click();
 const download=await downloadPromise; const downloaded=await download.path();
 assert.match(fs.readFileSync(downloaded,'utf8'),/Draft|The trip is good/);
 await page.getByRole('button',{name:'Reset my drafts',exact:true}).click();
 assert.equal(await page.locator('#written-criteria p').count(),0);
 assert.equal(await page.locator('#criterion-text').inputValue(),'');
 // Keyboard route from page entry to the visible skip link and main landmark.
 await page.goto(baseUrl+'/ai-literacy/index.html'); await page.keyboard.press('Tab');
 assert.equal(await page.locator(':focus').innerText(),'Skip to main content'); await page.keyboard.press('Enter');
 assert.equal(await page.evaluate(()=>location.hash),'#main');
 for(const route of ['index.html','rubrics.html']) {
  for(const theme of ['dark','light']) {
   for(const width of [320,375,768,1024,1440]) {
    await page.setViewportSize({width,height:1000});
    await page.goto(baseUrl+'/ai-literacy/'+route);
    await page.evaluate(theme=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.textSize='largest'},theme);
    const dims=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth}));
    assert(dims.scroll<=dims.w,JSON.stringify({route,theme,width,...dims}));
   }
  }
 }
 await page.setViewportSize({width:1440,height:1000});
 await page.goto(baseUrl+'/ai-literacy/index.html');
 await page.screenshot({path:path.join(artifacts,'ai-literacy-desktop.png'),fullPage:true});
 await page.setViewportSize({width:320,height:900});
 await page.screenshot({path:path.join(artifacts,'ai-literacy-mobile.png'),fullPage:true});
 // Simulated age: text identifies stale data without requesting a refresh.
 await page.clock.install({time:new Date('2027-11-08T12:00:00Z')}); await page.reload();
 assert.match(await page.locator('#snapshot-age').innerText(),/over 180 days old/);
 assert.deepEqual(errors,[]);
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:900}});
 const fallback=await nojs.newPage(); await fallback.goto(baseUrl+'/ai-literacy/rubrics.html');
 assert.equal(await fallback.locator('section[id],section[aria-labelledby]').count()>=8,true);
 await fallback.locator('.answer-key').first().locator('summary').click();
 assert.match(await fallback.locator('.answer-key').first().innerText(),/input file/);
 // Two assessment attempts with scenario-specific study and evidence-based alternatives.
 const {scenario}=require('../docs/ai-literacy/capstone.js');
 async function openAssessment() {
  const context=await browser.newContext();
  await context.addInitScript(() => { let seed=42; window.crypto.getRandomValues = buffer => {buffer[0]=seed++;return buffer;}; });
  const assessment=await context.newPage();
  await assessment.goto(baseUrl+'/ai-literacy/rubrics.html');
  return {context,assessment};
 }
 async function answerAttempt(p,round,correctSteps) {
  const ex=scenario(42,round-1);
  for(let step=1;step<=4;step++) {
   let answer=step<=3?(ex.criteria[step-1].pass?'PASS':'FAIL'):String(ex.score);
   if(!correctSteps.includes(step)) answer=step<=3?(answer==='PASS'?'FAIL':'PASS'):String(ex.score+1);
   if(step<=3) await p.locator('#capstone-controls input[value="'+answer+'"]').check();
   else await p.locator('#capstone-total').fill(answer);
   await p.locator('#capstone-submit').click();
   assert.match(await p.locator('#capstone-feedback').innerText(),/Answer recorded/);
   await p.locator('#capstone-next').click();
  }
 }
 // First-attempt target, then first fail/second success, then two fails with measured strengths.
 for(const sequence of [[[1,2,3,4]],[[1],[1,2,3,4]],[[1],[]],[[],[]],[[],[3]],[[],[4]]]) {
  const {context,assessment:p}=await openAssessment();
  assert.match(await p.locator('#capstone-id').innerText(),/F2-0000002a-A1/);
  await answerAttempt(p,1,sequence[0]);
  assert.equal(await p.locator('#capstone-new').isDisabled(),true);
  if(sequence[0].length===4) {
   assert.match(await p.locator('#capstone-progress').innerText(),/4\/4 correct; practice target met/);
   assert.equal(await p.locator('#capstone-retry').isVisible(),false);
  } else {
   assert.match(await p.locator('#capstone-results').innerText(),/Study guide for F2-0000002a-A1/);
   assert.equal(await p.locator('#capstone-results a[href*="teaching.cornell.edu"]').count(),1);
   await p.locator('#capstone-retry').click();
   assert.match(await p.locator('#capstone-id').innerText(),/A2/);
   await answerAttempt(p,2,sequence[1]);
   if(sequence[1].length===4) assert.match(await p.locator('#capstone-progress').innerText(),/practice target met/);
   else {
    assert.match(await p.locator('#capstone-results').innerText(),/Choose a next learning path/);
    assert.equal(await p.locator('#capstone-retry').isVisible(),false);
    const link=sequence[0].includes(1)?'compare-costs':sequence[1].includes(3)?'audit-information':sequence[1].includes(4)?'technology-planning':'tracks';
    assert.equal(await p.locator('#capstone-results a[href*="'+link+'"]').count(),1);
   }
  }
  const pending=p.waitForEvent('download');await p.locator('#capstone-download').click();
  const d=await pending;const md=fs.readFileSync(await d.path(),'utf8');
  assert.match(md,/Input facts:[\s\S]*Fictional response:[\s\S]*Answers:/);
  if(sequence.length===2) assert.match(md,/Attempt 1[\s\S]*Attempt 2/);
  await context.close();
 }
 await browser.close(); console.log('PASS: seven quiz retries/corrections/resets; score direction/retry/reset; writing hints/zero-weight rejection/three drafts/download/reset; skip link; 20 theme/viewport/largest-text reflow cases; stale age; no-JS fallback; no browser errors; varied capstone first success/first fail plus study/second success/two failures and all alternative paths, two-round exports.');
})().catch(e=>{console.error(e);process.exit(1)});
