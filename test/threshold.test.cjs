const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {readBooks,build}=require('../scripts/build-threshold.cjs');
const root=path.resolve(__dirname,'..');
const plan=JSON.parse(fs.readFileSync(path.join(root,'docs/threshold-reading-plan.json'),'utf8'));
test('reader preserves the original catalogue and supplies a distinct proposed task per book',()=>{
 const books=readBooks();
 assert.deepEqual(books.map(b=>b.title),['Altered Carbon','Ancillary Justice','Annihilation','The Left Hand of Darkness','Children of Time','Rules of Play','The Art of Game Design']);
 assert.equal(new Set(plan.books.map(b=>b.id)).size,books.length);
 assert.deepEqual(plan.books.map(b=>b.title),books.map(b=>b.title));
 for(const b of plan.books){assert.match(b.id,/^[a-z][a-z-]+$/);for(const k of ['focus','question','task','review'])assert.ok(b[k].length>25,`${b.title}: ${k}`);}
 assert.match(plan.status,/Proposed/);
});
test('static reader offers borrowing, comprehension and contribution routes without JavaScript',()=>{
 const html=build();
 assert.equal((html.match(/class="panel threshold-book"/g)||[]).length,7);
 assert.equal((html.match(/https:\/\/openlibrary.org\/search\?/g)||[]).length,7);
 for(const term of ['local public library','resale bookstore','Evidence:','Clarify:','Consider another reading:','made-sick.org/join.html','./threshold-book-club.html','Reversing the Feed'])assert.ok(html.includes(term),term);
 assert.equal((html.match(/rel="stylesheet"/g)||[]).length,1);
 assert.doesNotMatch(html,/<style\b|\sstyle=|amazon\.com|<iframe\b/);
 assert.match(html,/id="threshold-save-local" type="checkbox">/);
 assert.match(html,/id="threshold-timer" role="timer" aria-live="off">15:00/);
 for(const b of readBooks())assert.ok(html.includes(b.title)&&html.includes(b.author.replaceAll('&','&amp;')));
});
test('generated reader remains current with its owning sources',()=>{
 assert.equal(fs.readFileSync(path.join(root,'docs/threshold.html'),'utf8'),build());
});
