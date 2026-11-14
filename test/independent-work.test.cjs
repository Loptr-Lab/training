const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname,'..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const html = read('docs/independent-work.html');
test('source records render reproducibly with honest confirmation boundaries',()=>{
  execFileSync(process.execPath,['scripts/build-independent-work.cjs','--check'],{cwd:root});
  const data = JSON.parse(read('docs/independent-work-resources.json'));
  assert.equal(data.resources.filter(r=>r.group==='primary').length,7);
  for(const r of data.resources){
    assert(html.includes(`id="resource-${r.id}"`));
    assert(r.proposedPartnership.includes('No organization has agreed'));
    assert(r.unknowns.length);
    if(r.status==='recheck-required'){
      assert.equal(r.lastChecked,null,'Failed retrieval must not become a check date');
      assert.deepEqual(r.confirmedFacts,[],'Prior research is not current confirmation');
    }
  }
  for(const id of ['resonate','ampled','unfound','making-space','fau-accesstech','bit','melwood','kevuru','subvert','guilded','catchafire']){
    assert.equal(data.resources.find(r=>r.id===id).group,'adjacent');
  }
});
test('all affected local page links, assets and fragments resolve',()=>{
  const pages=['docs/index.html','docs/pixie-contributors.html','docs/tracks/index.html','docs/templates/README.html','docs/templates/training-plan.html','docs/independent-work.html','docs/independent-work-handoff.html'];
  for(const page of pages){
    const text = read(page);
    const ids=[...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(ids).size,ids.length,`Duplicate ID in ${page}`);
    for(const match of text.matchAll(/(?:href|src)="([^"]+)"/g)){
      const href=match[1].replaceAll('&amp;','&');
      if(/^(https?:|mailto:)/.test(href))continue;
      const u=new URL(href,'https://local.test/'+page);
      let destination=u.pathname.slice(1);
      if(destination.endsWith('/'))destination+='index.html';
      assert(fs.existsSync(path.join(root,destination)),`${page}: ${href}`);
      if(u.hash && destination.endsWith('.html')) assert(read(destination).includes(`id="${decodeURIComponent(u.hash.slice(1))}"`),`${page}: unresolved ${href}`);
    }
  }
});
test('existing orientation and portfolio routes remain usable',()=>{
  for(const p of ['docs/index.html','docs/pixie-contributors.html','docs/pixie-contributors.md','CONTRIBUTING.md','README.md'])assert(read(p).includes('independent-work.html'));
  for(const anchor of ['contribute','clients','business','resources','adjacent'])assert(html.includes(`id="${anchor}"`));
  assert(read('docs/index.html').includes('AI is a research tool you learn to evaluate, not an authority you learn to obey.'));
  assert(read('docs/index.html').includes('./threshold.html'));
  assert(read('docs/templates/training-plan.md').includes('proposed, submitted, accepted and deployed'));
  for(const p of ['docs/independent-work.html','docs/independent-work-handoff.html']){
    assert(read(p).includes('./training.css?v=20261105-brand'));
    assert(!/<form\b|<iframe\b/.test(read(p)));
  }
});
