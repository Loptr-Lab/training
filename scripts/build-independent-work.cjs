// Render a small teaching reference at build time; no browser fetch or dependency.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'docs/independent-work-resources.json'), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const list = values => `<ul>${values.map(v => `<li>${escape(v)}</li>`).join('')}</ul>`;
const ids = new Set();
for (const r of data.resources) {
  for (const key of ['id','name','url','group','geographicScope','eligibility','offers','contactRoute','status','proposedPartnership','lastAttempted']) {
    if (typeof r[key] !== 'string' || !r[key].trim()) throw new Error(`Missing ${key}: ${r.id}`);
  }
  if (!/^[a-z0-9-]+$/.test(r.id) || ids.has(r.id)) throw new Error(`Invalid/duplicate ID: ${r.id}`);
  ids.add(r.id);
  if (!['primary','adjacent'].includes(r.group)) throw new Error('Invalid resource group');
  for (const key of ['sources','confirmedFacts','priorResearch','unknowns']) if (!Array.isArray(r[key]) || r[key].some(v => typeof v !== 'string' || !v)) throw new Error(`Invalid ${key}`);
  if (!r.sources.length || !r.unknowns.length) throw new Error('Sources and unknowns required');
  for (const url of [r.url,r.contactRoute,...r.sources]) if (new URL(url).protocol !== 'https:') throw new Error(`Non-HTTPS source: ${url}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.lastAttempted)) throw new Error('Attempt date required');
  if (r.status === 'official-source-read') {
    if (!r.lastChecked || !r.confirmedFacts.length) throw new Error('Confirmation requires facts and check date');
  } else if (r.status !== 'recheck-required' || r.lastChecked !== null || r.confirmedFacts.length) throw new Error('Unchecked sources cannot claim confirmation');
}
function render(r) {
  return `<article id="resource-${r.id}">\n<h3>${escape(r.name)}</h3>\n<p>${escape(r.offers)}</p>\n<p><strong>${r.lastChecked ? 'Contribution guide checked; availability unverified.' : 'Recheck required; current availability unverified.'}</strong> Proposed collaboration only; no agreed partnership.</p>\n<details class="answer-key"><summary>Sources, eligibility and verification — ${escape(r.name)}</summary>\n<p><a href="${escape(r.url)}">${escape(r.name)} — official website</a></p>\n<dl>\n` +
    [['Geographic scope',r.geographicScope],['Stated eligibility / limits',r.eligibility],['Offers / paid status',r.offers],['Verification',r.lastChecked ? `Contribution guide read ${r.lastChecked}; other listed pages and current availability are not confirmed.` : `Recheck required. Last checked: not confirmed. Retrieval attempted ${r.lastAttempted}.`]].map(([k,v]) => `<dt>${escape(k)}</dt><dd>${escape(v)}</dd>`).join('\n') +
    `\n<dt>Official contribution / application / contact route</dt><dd><a href="${escape(r.contactRoute)}">${escape(r.name)} — published route to check</a></dd>\n<dt>Confirmed facts</dt><dd>${r.confirmedFacts.length ? list(r.confirmedFacts) : 'No new official confirmation in this review.'}</dd>\n` +
    (r.priorResearch.length ? `<dt>Prior research — requires confirmation</dt><dd>${list(r.priorResearch)}</dd>\n` : '') +
    `<dt>Proposed partnership approach</dt><dd>${escape(r.proposedPartnership)}</dd>\n<dt>Unknowns requiring confirmation</dt><dd>${list(r.unknowns)}</dd>\n<dt>Official sources</dt><dd><ul>${r.sources.map((u,i) => `<li><a href="${escape(u)}">${escape(r.name)} — source ${i+1}</a></li>`).join('')}</ul></dd>\n</dl>\n</details>\n</article>`;
}
const file = path.join(root,'docs/independent-work.html');
let html = fs.readFileSync(file,'utf8');
for (const [marker,group] of [['RESOURCES','primary'],['ADJACENT','adjacent']]) {
  const re = new RegExp(`<!-- ${marker}:START -->[\\s\\S]*?<!-- ${marker}:END -->`);
  if (!re.test(html)) throw new Error(`Missing ${marker} marker`);
  html = html.replace(re,`<!-- ${marker}:START -->\n${data.resources.filter(r => r.group === group).map(render).join('\n')}\n<!-- ${marker}:END -->`);
}
if (process.argv.includes('--check')) {
  if (html !== fs.readFileSync(file,'utf8')) throw new Error('Resource HTML stale: run node scripts/build-independent-work.cjs');
  console.log(`PASS: ${ids.size} resource records, verification boundaries and static rendering.`);
} else { fs.writeFileSync(file,html); console.log('Rendered independent-work source notes.'); }
