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

Completed in the documented order:

- Training PR #58 merged November 10 at 08:23:56 UTC, implementation merge
  `2d26e5942bb314c2dfeb85173e6cde4dfadbe6b4`. GitHub Pages build completed at
  08:24:34 UTC from that commit. Stable reader returned HTTP 200 and contains
  the seven-book list, library-first guidance and comprehension questions.
- Actual public-browser check: Training home → Threshold link → seven book
  cards; the live timer starts and announces its state. The managed proxy's
  test certificate was accepted only in the test browser context, with no
  production TLS or application setting changes.
- Holdings PR #63 merged at 08:26:03 UTC, implementation merge
  `d547782e880a7752ad1f5d0ebcae104b79824769`. Its production Vercel deployment
  `dpl_EE3KYQpPEJycZpqR3Q4cRxs18qXs` is READY and identifies that exact main SHA.
  Protected fetches of `https://pixie-holdings.vercel.app/` and `/radar.html`
  returned 200, contain the direct stable reader link and no wrong reading
  fallback. `/pixie-guide.js` also returned 200.
- Holdings' actual custom domain is served by GitHub Pages, not attached to
  the Vercel project. The Pages API confirms `holdings.loptrlab.com` and the
  existing workflow uploads `./public`. Its release run `42782603382` completed
  successfully from `d547782e880a7752ad1f5d0ebcae104b79824769`:
  https://github.com/ibloud/pixie-holdings/actions/runs/42782603382
- The custom `holdings.loptrlab.com` origin response could not be directly checked:
  shell/web access is blocked here, and Vercel's access lookup returned 404 at
  the share-resolution stage rather than fetching the origin. That does not
  establish an origin 404 or a broken site. DNS/domain configuration was not
  changed. A browser outside this environment should confirm the custom domain.
- A final handoff refinement reconciles the now-verified existing PIXIE blog
  identity, supplies an executable local preview-staging command and records
  these actual release results. It changes no timer, notebook, engine or
  Holdings behavior. Its review/merge history is attached to this record.

## Next owners

Maintainers use `THRESHOLD_BOOK_CLUB.md` to operate and extend the reading circle.
Dominique/editor reviews the blog draft, byline and process note, uploads its
graphic to pckt and publishes only if desired. After publication, record the
actual permalink and check its stable reader CTA. No standing meeting or host
has been announced. All new story/art/rule work stays proposed until accepted
by its owning review process.

## Delivery correction — November 10, 2026

Owner clarified: the handbook must be a readable Vercel preview, and the PIXIE
article must be Markdown, without a substitute blog theme. The reader now links
to `threshold-book-club.html`, generated from the maintained handbook source.
Vercel preview `training-ny2363o0p-loptr-lab.vercel.app/threshold-book-club.html`
returned 200. Reader/handbook/back navigation, keyboard operation, full tables
and 390/768/1440px layouts passed. No blog HTML is uploaded to this preview.

The former blog HTML and its renderer have been removed from maintained source.
The draft remains `review-packet/threshold-blog/post.md`, alongside its PNG/SVG.
This correction does not publish anything to pckt or set its theme. Historical
preview entries above describe prior work, not the current delivery format.
