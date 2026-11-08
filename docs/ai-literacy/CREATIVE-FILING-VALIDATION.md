# Creative Filing implementation evidence

Review candidate, 2026-11-08 UTC. No merge or production approval.
Canonical contract: https://docs.google.com/document/d/1RvA2lALsCae5daIOIpaqOCgflIBxhtJMVZj7bnyL5mg/edit
Read the complete updated document, including SAVE-1..6, typed records, archive contract and RT-01..12 / NEG-01..11. Document revision inspected: `AHj4eMSeSAQECkIVjoAvZJNSRP8u0RR16fo19augCX-yYeeFOKmAOxKbHCdPJbz-vHFUWinB-SCs_BQo5oWTB8KKuFmJ9B0-AXLW7s-lZio`.

## Source and origin inventory

- Training default branch inspected: `0b633cde9b671975fae28a481fbfe311b026479b`. PR #53 is merged. Open PRs #52, #50, #47 and #38 cover other work; no filing implementation assignment was duplicated.
- Companion default branch inspected read-only: `4b403db201500e9d2c79b148aff16529f8b1ef3f`. Reused the transaction-completion and optimistic-revision patterns from `workspace-browser.mjs` / `workspace.mjs`, and inspected `checkpoint-pointer.mjs` / `task-contract.mjs`. No Companion schema, authentication, checkpoint, Railway or OAuth changes.
- Confirmed canonical learner URL: `https://loptr-lab.github.io/training/`; repository `docs/index.html` canonical link and GitHub Pages API agree on main `/docs`. Storage origin is **https://loptr-lab.github.io**, not the `/training` path. Scripts on that same origin share the trust boundary.
- Existing Vercel team `loptr-lab`, project `training` (`prj_p7K2hjDRoQWoiOaCi1g7AdZWHYzF`). Inspected current production deployment `dpl_CwRqJcpFciMZQuZSASvpgoGQ2Vkm`: source repo Training/main at the above SHA. Existing production aliases include `training-bay-eight.vercel.app`. Preserve existing `docs/` static output; no project, production routing or origin migration.
- Each Vercel preview hostname, Vercel production alias, GitHub Pages origin, Safari/Home Screen container and browser profile may have a different Library. The UI displays its actual origin. Reuse one hostname for a test sequence; transfer only through explicit ZIP import/export. Never promise cross-origin synchronization.

## Browser target and storage policy

Implementation target: Safari/iPadOS **17+**, based on WebKit's documented full Storage API support, plus a current desktop browser. Repository inspection found no existing minimum Safari version or installed/offline launch requirement. This is a candidate implementation baseline; owner sign-off and actual device compatibility remain release gates. No service worker or offline shell was added. Loaded exercises work locally; offline navigation/first launch is not promised.

Official sources checked 2026-11-08:

- https://webkit.org/blog/14403/updates-to-storage-policy/ — full Storage API from Safari/iPadOS 17; quotas are ceilings, not allocated capacity; best-effort storage can be evicted. Features are detected; a persistence request may be denied.
- https://webkit.org/tracking-prevention/ — private storage is ephemeral, non-use policies and Home Screen exceptions are not a backup guarantee.
- https://support.apple.com/en-us/102440 — canonical specification's Apple Downloads/Files guide. Re-fetch this session returned HTTP 429; do not infer actual Blob/provider success from it.

Physical iPad Safari, VoiceOver, Files/provider download, browser/process closure, Private Browsing retention and Home Screen isolation: **NOT RUN**. No device/OS/provider outcome is claimed.

## Implementation and boundaries

`rubrics.js` and `capstone.js` keep the existing grader, scenario generator, hints, study paths and Markdown downloads. Small snapshot/restore hooks feed an adapter in `filing/exercise.mjs`; no second grader or tool implementation. An untouched starter page creates no record. Actual writing, answering or explicit new practice creates a UUID and default title immediately, attempts initial persistence, then uses 500 ms inactivity / 2 s maximum debounce. Explicit completion and in-app navigation flush; visibility/pagehide are best effort.

`filing/store.mjs` uses a separate local `pixie-creative-filing` IndexedDB v1 store. Writes serialize and validate inside a transaction, and resolve only on completion. Per-artifact revisions reject stale saves; library revision rejects stale import/organization plans. Failure retains both the memory draft and prior committed snapshot. Retry, separate working copy, full draft export, and explicitly labeled plaintext salvage are provided. These are not permanent backups.

`filing/model.mjs` validates strict v1 fields, bounded UTF-8 byte sizes, labels, timestamps, references, signed results and capstone snapshot/answer-key consistency. It supports only the three declared v1 exercise adapters, rejecting unsupported versions. New work has null provenance; imports record source-byte hash/time/identity without inventing authorship. Imported grading is learner-produced; correctness against an included key is not external certification.

Unfinished rubric form inputs, wording hints and quiz responses are preserved as an explicitly marked `writer-state/v1` **ungraded revision note**, using the specified note string fields rather than a new schema extension. That note has additional strict validation and must agree with typed criterion records. Existing grading and task snapshots survive resume; criteria changes invalidate only the affected previous result. Legacy text is never converted automatically.

`library.html` and `filing/library.mjs` share Training typography/themes/reading settings. Library → Find → Recent → Labels supports rename Done/Escape, stable multiple label IDs/custom labels/label rename and confirmed deletion, NFC token search plus label intersection, deterministic order, duplicate display names, record actions and local-only recovery guidance. Export before delete is offered; there is no trash claim.

Both single and all backups use the exact `pixie.creative-filing` v1 ZIP manifest/member/hash layout, input/member/total limits and safe filename contract. All includes unused label definitions. The bounded ZIP dependency review is in [filing/vendor/README.md](filing/vendor/README.md). Import validates bytes/hashes/schema before staging; preview supports Skip/default, separate-copy conflicts and explicit missing/conflicting-label mappings. A revision-checked transaction commits all or zero. Unchanged UUID/logical record and legacy source hashes skip; conflict-copy retry is idempotent. Download feedback only claims archive prepared/download started, not a Files write.

No artifact uploads, telemetry, filesystem scan, remote models, account creation, hidden sync or automatic GitHub publication. Artifact content/names/labels never enter request URLs; resume URLs contain only a local random UUID. Imports use textContent, never arbitrary HTML. Local storage is not encryption against same-origin scripts, extensions or the device user.

## Automated evidence

Commands from repository root:

```
npm run typecheck
node scripts/validate-ai-literacy.cjs
npm run test:filing
npm run test:filing:browser
node scripts/test-ai-literacy-browser.cjs
```

Browser runner needs Playwright and Chromium (existing review environment); `BROWSER_EXECUTABLE` and `BASE_URL` are overridable. To include axe, set `AXE_PATH` to an installed axe-core browser bundle. No browser-tool dependency is loaded by the product. Core contract checks run in existing CI with Node 20; existing CI behavior for starter tests is unchanged.

Observed local results: typecheck PASS; source/link/signed-arithmetic validation PASS; 1,024 existing scenario variants PASS; 23 identified contract groups PASS; real Chromium filing flow PASS; existing lesson browser suite PASS. Axe-core 4.11.1 on the populated Library in both themes: zero WCAG A/AA violations. Doubled base text at widths 320/768/1024 reflows without page overflow. Screenshots and local browser evidence generated from synthetic fixtures under `/tmp/creative-filing-review`; no learner data.

Historical baseline reproduced: `npm test -- --runInBand` has **24/24 starter engine failures**, all intentional `Not implemented`, in two suites. These engine files are unchanged. Do not report the entire repository suite as green.

| ID | Automated portion | Physical portion |
| --- | --- | --- |
| RT-01 | No untouched-page artifact; actual edit creates/stores UUID; commit-only status | NOT RUN |
| RT-02 | Edit/reload input restoration; signed +4/-6 = -2 semantic ZIP round trip | NOT RUN |
| RT-03 | Actual one-action rename, Enter save, Escape cancel and focus return | NOT RUN |
| RT-04 | Multiple stable memberships and word-rename search; real checkboxes | NOT RUN |
| RT-05 | NFC/case/tokens, label intersection, empty results/Clear, deterministic model ordering | NOT RUN |
| RT-06 | Download event; member inventory/length/hash validation; STORE and independent DEFLATE writer compatibility | Apple Files NOT RUN |
| RT-07 | Identical import skips; cancel unchanged; isolated browser-profile import commits | Safari closure/device NOT RUN |
| RT-08 | Deep criteria/results/labels comparison after isolated restore; real exercise resume | Physical reopen NOT RUN |
| RT-09 | All export retains unused custom label; isolated restore retains it | NOT RUN |
| RT-10 | Legacy UTF-8 BOM/CRLF exact bytes; changed filename duplicate skip; script markup inert | Existing real-device Markdown Files selection NOT RUN |
| RT-11 | Browser request capture: no unexpected method/origin; no content API in core | Physical network capture NOT RUN |
| RT-12 | Keyboard rename/focus, checked controls, native modal, axe, light/dark, doubled-text reflow | VoiceOver/touch/reduced-motion/device recording NOT RUN |
| NEG-01 | Actual quota fault preserves durable revision and memory input; draft download and Retry succeeds | Actual device quota exhaustion NOT RUN |
| NEG-02 | Uncommitted draft explicitly marked; transaction abort leaves previous snapshot | Actual process termination before commit NOT RUN |
| NEG-03 | Same ID/changed content requires Skip or new copy; original preserved | NOT RUN |
| NEG-04 | Truncation, hash change, duplicate ZIP path, unsupported schema rejected | NOT RUN |
| NEG-05 | Same display name/two UUIDs retained | Files collision dialogs NOT RUN |
| NEG-06 | Missing label repair / conflicting word mapping required; validation before commit | VoiceOver repair flow NOT RUN |
| NEG-07 | Real IDB write abort unchanged; staging/cancel no mutation; retry deduplicates | Actual process interruption NOT RUN |
| NEG-08 | Empty-store restoration from ZIP; destructive UI requires explicit confirmation | Actual device reset/eviction NOT RUN |
| NEG-09 | Real stale revision commit rejected; failed working draft preserved | Physical two-tab timeline NOT RUN |
| NEG-10 | Traversal, invalid/nonfinite weights, mismatched result, oversized/bomb metadata, invalid UTF-8/binary rejected; inert markup | NOT RUN |
| NEG-11 | Feature detection, explicit persistence request, no retention guarantee | Private/Home Screen mode acceptance NOT RUN |

These automated portions do not replace the full 23 physical acceptance cases in the canonical document.

## Remaining production gates

1. Review this implementation and vendored dependency, especially archive framing/limits, transaction/conflict behavior and the explicit resume-note adapter.
2. Owner acceptance of canonical Training origin and Safari/iPadOS 17+ baseline; no migration or cross-origin sharing implied.
3. Execute the canonical physical iPad Safari / VoiceOver / Files/provider, persistence/closure, conflict, private-mode and Home Screen checklist; record exact device, OS, browser, origin, clock/timezone, test IDs and evidence.
4. Review verified preview and explicitly approve merge/production. No approval is inferred from this implementation request.

Preview HTTP/asset verification is recorded in the review PR after deployment; READY alone is not acceptance.
