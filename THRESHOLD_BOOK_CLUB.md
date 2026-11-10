# The Threshold reading circle: rollout and handoff

Owner direction: Dominique, November 10, 2026. This handbook establishes the
self-paced reading practice and its contribution route. It does not schedule
meetings, appoint facilitators, create membership or change story/game canon.

## Start here

1. Open `https://loptr-lab.github.io/training/threshold.html`. Training home also
   links to **The Threshold · read 15 minutes a day**. Holdings discovery and
   its desktop Projects window link to this same reader, rather than Mayhem.
2. Choose one accessible book. Ask your local public library about print,
   ebook, audiobook and interlibrary loans. Search Open Library; a catalogue
   result is not a promise of a loan. Check resale bookshops, library sales
   and book exchanges before buying new. Independent bookshops can help;
   Amazon is an optional last resort. No purchase is required to participate.
3. Read for 15 minutes a day, at your own pace. The timer is optional. Reading
   takes the fifteen minutes; reflection afterward is optional, not a quota.
4. Write a question or a few thoughts in your own words if useful. Name the
   book and use your edition's chapter/page/audio locator. Different editions
   and reading speeds are welcome. Missing a day never locks anyone out.
5. Keep notes private or choose an excerpt to discuss. The existing community
   entrance is https://made-sick.org/join.html. Introduce your book and one
   question there using its normal flow. No notes, identity or consent flags
   are carried in the link. This reader has no group feed or submission API.
6. Explore https://loptr-lab.github.io/training/pixie-contributors.html when
   ready for a bounded contribution. Reading alone is a valid place to begin.

## Comprehension practice, without grading people

Choose one or two questions; do not turn the whole list into homework.

| Practice | Sample question | A useful response contains |
| --- | --- | --- |
| Recall | What happened, or what claim did the author make? | Two sentences in the reader's own words. |
| Evidence | Which action, detail or example supports that interpretation? | An edition locator and a distinction between observation and inference. |
| Clarification | What word, motive or reasoning step is unclear? | A question and the surrounding context; uncertainty is acceptable. |
| Perspective | Whose viewpoint is available? What other explanation could fit? | An alternative reading and what evidence could change the reader's mind. |
| Application | Which project thread does this illuminate? Where does the comparison fail? | A specific connection with limits, rather than declaring two stories identical. |
| Reflection | Did writing or another reader's question change your understanding? | A revision or an explanation of why the initial reading still fits. |

Example scaffold: “I think ___ because the detail at ___ shows ___. Could ___
also explain it?” For craft writing: “The author claims ___. Would it still
hold in this playtest situation?” These are scaffolds, not model answers.
Accept a spoken contribution, private audio note or sketch as alternatives.
Do not diagnose a reader, demand personal disclosures, or require programming
or advanced mathematics to enter the circle.

## Where people can contribute

| Role someone wants to try | Small first contribution | Review destination |
| --- | --- | --- |
| Reader | One question, observation or alternate interpretation | Optional existing community discussion. |
| Writer | A short original scene exploring one book-card prompt | Owning story source; Dominique accepts story canon. |
| Artist | An original study from documented visual observations | Owning design bible and approved assets; name influences. |
| Designer | One existing decision mapped to rule, feedback and consequence | Owning game design/rule source; label any change proposed. |
| Tester/developer | A reproducible question, accessibility observation or bounded test | Existing contributor task and owning repository's review process. |
| Facilitator | A short discussion summary with unanswered questions | Shared only with participants' permission through existing channels. |

These are participation choices, not appointments, ranks or automatic task
assignments. Check current issues and coordinate through the existing
contributor route before taking a task; avoid duplicate or overlapping work.

## Facilitation format another person can pick up

Self-paced participation is available without a host. A volunteer who wants to
host a discussion must first agree a time, channel, accessibility arrangements
and spoiler boundary with participants through existing community channels.
No standing meeting or named host is announced by this release.

For a small optional discussion, use this adaptable 25-minute format:

1. 3 minutes: name the book/edition and spoiler boundary; offer the right to pass.
2. 7 minutes: invite one recall or clarification question, then locate evidence.
3. 7 minutes: compare interpretations without scoring or forcing agreement.
4. 5 minutes: choose one possible story, art or design connection; state its limits.
5. 3 minutes: ask whether anyone wants a bounded original task. Record unresolved
   questions and consent to share a summary. Passing is a complete response.

Readers need not be at the same chapter. Separate groups or use passage-level
spoiler labels when positions differ. Avoid unsolicited plot reveals, long
copyrighted extracts, book scans or copied comic panels. Refer to editions and
locations; summarize in your own words. A facilitator does not accept canon.

## Source authority and influence

- `THE_THRESHOLD.md` owns the existing seven-title catalogue and established
  project connections. Preserve its authors, wording and source history.
- `docs/threshold-reading-plan.json` supplies supplemental questions and
  proposed original work. It does not contain accepted scenes or rules.
- `scripts/build-threshold.cjs` generates the static `docs/threshold.html` from
  those sources. Edit sources, regenerate, and commit the generated result.
- The owning engine's design bible and canonical four-player rules remain
  authoritative. Duet is a separate two-player accessibility experiment.
- *The Department of Truth* #16 informs art by Dominique's direction. The
  October 21 post **PIXIE · Reversing the Feed** already records the encounter;
  November 10 reaffirms the influence. Do not invent panel analysis, imply
  endorsement, import its story as canon or recreate approved PIXIE symbols.
- New scenes, visual studies and mechanics must remain proposed until accepted
  through the owning review process. Record accepted/revised/declined and the
  source/decision link; reading-circle agreement alone cannot change canon.

## Notes and privacy

The optional timer and notebook operate in the browser, without accounts,
network requests, analytics, publication, membership or cross-site transfer.
The notebook keeps each book's notes separate. Saving to browser storage is
unchecked by default and requires an explicit choice. This is local storage,
not encryption or an account backup; avoid private information on shared devices.
Download notes before clearing browser data or changing devices. Clearing the
notebook cannot remove downloaded files. Share a chosen copy yourself through
existing channels. There is no automatic submission or facilitator access.

## Rollout and release responsibilities

1. **Maintainer:** verify reader and Holdings previews, source checks, library
   links, comprehension prompts, mobile layouts, keyboard controls and notes.
2. **Release maintainer:** release Training first; verify the public reader and
   assets. Then release Holdings and test its discovery and desktop links.
   Preserve PR #60 security protections and the single persistent PIXIE control.
3. **Maintainer:** keep the stable reader URL in the blog copy. Never substitute
   a temporary protected preview link in a published article. Record release
   commits, URLs and actual checks in `review-packet/THRESHOLD_RELEASE.md`.
4. **Dominique/editor:** review the PIXIE blog draft, byline and AI disclosure,
   attach its original graph with alt text, and publish through the existing
   pckt workflow if desired. Writing a draft does not publish it. Link its
   final permalink from appropriate existing discovery surfaces afterward.
5. **Future facilitators:** read this handbook, invite opt-in discussion through
   the existing community, and agree logistics before announcing a session.

The published practice is asynchronous. Future live sessions, automatic feeds,
notifications, reading analytics and publication integrations are proposals,
not release capabilities. No one is assigned to an unconfirmed event.

## Maintainer checks and rollback

Run `node scripts/build-threshold.cjs` after source changes, then
`node scripts/build-threshold.cjs --check`, `node --test test/threshold.test.cjs`,
`node --check docs/threshold.js`, `npm run typecheck` and
`node scripts/validate-ai-literacy.cjs`. The existing engine starter deliberately
contains `Not implemented` methods; preserve its documented CI starter policy.
Run Holdings' `npm test` separately.

In a browser, verify seven books, edition searches, book-specific prompts,
timer start/pause/reset/completion, per-book notes, default no-storage behavior,
opt-in persistence, export, opt-out and clear. Check keyboard focus, no-JS
reading content, reduced motion and 320/390/768/1024/1440px layouts. Record
physical-device Safari/VoiceOver separately; Chromium emulation is not proof.

Rollback by reverting the release commits through each owning repository's
normal review/release process; do not force-push or alter historical sources.
Keep an accessible reader destination while repairing a discovery link rather
than routing reading back to Mayhem. Preserve reader exports; reverting the
site does not erase browser notebooks or previously downloaded files.

Finished state: stable Training and Holdings entry links work, this handbook
is reachable from the reader, source and browser checks are recorded, and a
new reader can choose a book, ask a question and find a contribution route
without this chat. Blog publication is separately marked ready or completed.
