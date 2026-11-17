/* Dependency-free publication checks for the reviewed snapshot and lesson links. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const dir = path.resolve(__dirname, '../docs/ai-literacy');
const data = JSON.parse(fs.readFileSync(path.join(dir,'data/labor-market.json'),'utf8'));
for (const key of ['metric','geography','population','observationPeriod','units','retrievedOn','lastVerified','version']) assert(data[key], `Missing ${key}`);
assert.equal(data.schemaVersion,1);
assert.equal(data.units,'percent');
assert.equal(data.records.length,4);
const intro=fs.readFileSync(path.join(dir,'index.html'),'utf8');
for (const record of data.records) {
 assert(Number.isFinite(record.value) && record.value >= -100 && record.value <= 1000);
 assert.match(record.sourceUrl,/^https:\/\/www\.bls\.gov\//);
 assert.match(record.publicationDate,/^\d{4}-\d{2}(-\d{2})?$/);
 assert(record.sourceLocation && record.code && record.occupation);
 assert(intro.includes(`<th scope="row">${record.occupation}</th><td>${record.value}%</td>`), 'HTML diverges from reviewed data');
}
assert(intro.includes(`datetime="${data.lastVerified}"`));
for(const name of ['index.html','rubrics.html']) {
 const source=fs.readFileSync(path.join(dir,name),'utf8');
 assert(source.includes('../training.css') && source.includes('../training-display.js'));
 for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const url=match[1].replaceAll('&amp;','&');
  if (/^https?:/.test(url)) continue;
  const [file, fragment]=url.split('#');
  const target=file ? path.resolve(dir,file.split('?')[0]) : path.join(dir,name);
  assert(fs.existsSync(target), `Broken local link: ${url}`);
  if(fragment) {
   const text=fs.readFileSync(target,'utf8');
   assert(text.includes(`id="${fragment}"`), `Missing fragment: ${url}`);
  }
 }
}
const lesson=fs.readFileSync(path.join(dir,'rubrics.html'),'utf8');
for(let i=1;i<=8;i++) assert(lesson.includes(`id="step-${i}"`));
// Independent arithmetic assertions: all amounts are fictional credits.
const perPerson = 10+15+0+3*5+20/2;
assert.equal(perPerson,50); assert.equal(perPerson*2,100);
assert.equal(3+3,6);
const maximum = [3,3,3,2,2,4,1].reduce((a,b)=>a+b,0);
assert.equal(maximum,18); assert.equal(maximum-6,12); assert.equal(maximum-3-3,12);
assert(lesson.includes('18 − 6 = <strong>12 points</strong>'));
assert(lesson.includes('18 − 3 − 3 = 12'));
console.log('PASS: snapshot schema/provenance, published values, internal links/fragments, eight steps, synthetic arithmetic, signed penalty and split totals.');

// Property checks across varied fictional facts and both response variants.
const {scenario} = require('../docs/ai-literacy/capstone.js');
const signatures = new Set(), scores = new Set();
for(let seed=0;seed<512;seed++) {
 const original=scenario(seed);
 for(const variant of [0,1]) {
  const ex=scenario(seed,variant);
  assert.deepEqual(ex.facts, original.facts, 'Second attempt must keep study facts');
  const prices=ex.facts.slice(0,3).map(f=>Number(f.match(/: (\d+)/)[1]));
  const lunch=Number(ex.facts[3].match(/lunch, (\d+)/)[1]);
  const shuttle=Number(ex.facts[4].match(/shuttle: (\d+)/)[1]);
  const expected=prices.reduce((a,b)=>a+b,0)+3*lunch+shuttle/2;
  assert.equal(ex.perPerson,expected);assert.equal(ex.partyTotal,2*expected);
  const ari=Number(ex.response[3].match(/: (\d+)/)[1]);
  const party=Number(ex.response[5].match(/: (\d+)/)[1]);
  const closedVendor=ex.facts[0].split(':')[0];
  const mistake=ex.response[0].includes(closedVendor);
  const passes=[ari===expected,party===2*expected,mistake];
  assert.deepEqual(ex.criteria.map(c=>c.pass),passes);
  assert.equal(ex.score,(passes[0]?2:0)+(passes[1]?4:0)-(passes[2]?6:0));
  assert(ex.criteria.every(c=>c.origin==='explicit'));
  scores.add(ex.score);
 }
 assert(original.criteria.every((c,i)=>c.pass!==scenario(seed,1).criteria[i].pass), 'Retry changes response outcomes');
 signatures.add(original.facts.join(' '));
}
assert(signatures.size>100,'Scenarios should vary in more than their ID');
assert(scores.has(-6)&&scores.has(6)&&scores.has(0),'Exercise must cover penalty, positive and zero totals');
console.log('PASS: 1,024 seeded scenario variants, unchanged study facts, independently calculated costs/scoring, varied facts and changed retry outcomes.');
