# Threshold reading-circle release record — November 10, 2026

Owner authorized release of Training's Threshold reader and Holdings after the
book-club rollout and handoff were documented and checked. This record preserves
the boundary between that release and the separate, unpublished PIXIE article.

## Prepared and verified

- Reader: `docs/threshold.html`, generated from the existing `THE_THRESHOLD.md`
  catalogue and `docs/threshold-reading-plan.json`. Seven existing books,
  fifteen-minute daily practice, library-first access, per-title Open Library
  edition searches, sample comprehension questions and proposed story tasks.
- Handbook: `THRESHOLD_BOOK_CLUB.md`, linked from the reader. Includes first
  actions, contribution roles, asynchronous participation, optional facilitation,
  spoilers, accessibility, consent to share, source ownership and maintenance.
- Notebook: optional local-only timer, separate per-book notes, unchecked opt-in
  persistence, Markdown export, opt-out and clear. No new account, tracking,
  network submission, automatic membership or publication.
- Holdings discovery and desktop Projects link directly to the stable reader.
  The wrong Mayhem reading fallback is removed, while its separate card stays.
- Blog: `review-packet/threshold-blog/post.md`, graphic PNG/SVG, plot source,
  preview renderer and `EDITORIAL_HANDOFF.md`. Draft is not published to pckt.

## Preview and test evidence

Vercel Training review deployment: `dpl_82vGtNHUpvKa515SwmPKVKDHoU88`,
`https://training-glm812s76-loptr-lab.vercel.app/threshold.html` and
`/threshold-field-notes.html`. Deployment READY; protected fetch returned 200
for the article. Preview access uses a temporary share link supplied in chat;
no share token is stored here. Only nine requested reader/editorial/display
files were uploaded to the existing Training project. An earlier broad upload
was rejected by automatic approval review; narrowing the payload resolved it.

- Three Node source/contract tests passed; generated reader check and JS syntax
  passed. Training TypeScript check and existing AI-literacy validator passed.
- Training's 24 engine exercise tests fail at unchanged `Not implemented`
  starter methods. Engine and exercise-test sources are unchanged; the existing
  CI starter policy explicitly permits this state. These are not reported as
  passing engine tests.
- Holdings: 56 tests passed, including privacy and persistent-guide contracts.
- Browser checks: Training home → reader; seven books; task disclosure and
  keyboard selection; comprehension questions; default no-storage behavior;
  per-book notes; opt-in/reload; export; opt-out; clear; timer start, pause,
  resume, completion and reset. Blog preview image and reader CTA passed.
- Layouts: 320, 390, 768, 1024 and 1440px; light/dark, largest reading text,
  reduced motion, no horizontal overflow. No-JS books/questions/routes passed.
- Actual local integration clicks: Holdings discovery → canonical Training
  origin with reviewed local response; embedded desktop Projects → top-level
  reader. One unobscured persistent PIXIE control; parent duplicate hidden.
- Evidence: `threshold-evidence/checks.json` and screenshots. Reproduction:
  `THRESHOLD_PLAYWRIGHT_MODULE=/path/to/playwright node scripts/test-threshold-browser.cjs`
  with reviewed local servers at 4203 and 4197 (or set the documented env vars).
- Physical Safari/iPad/VoiceOver checks NOT RUN. Chromium layout/keyboard checks
  do not establish physical-device or screen-reader conformance.

## Release journal

Prepared for ordered release: Training main/Pages first, verify stable reader,
then Holdings main/Vercel. Exact PRs, commits and public checks will be appended
after the release operations, not guessed here.

## Next owners

Maintainers use `THRESHOLD_BOOK_CLUB.md` to operate and extend the reading circle.
Dominique/editor reviews the blog draft, byline and process note, uploads its
graphic to pckt and publishes only if desired. After publication, record the
actual permalink and check its stable reader CTA. No standing meeting or host
has been announced. All new story/art/rule work stays proposed until accepted
by its owning review process.
