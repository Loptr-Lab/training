# Contributor orientation and code-discovery audit

7 November 2026 · Codex-assisted, agent-executed walkthroughs, not participant interviews or independent industry evaluation. Scope: Training, portfolio, Violet, Veiled Dominion and Battle the Beast only. No merge, deployment, issue assignment or external invitation is authorized by this report.

## Conclusion and independent evaluation

Existing rights, participation and review rules are substantial and should be kept. The main gaps are routing to actual code, explaining intentionally failing starters, distinguishing prototype lanes, and checking that labeled starter issues still match the implementation.

**Independent evaluation is required from an industry professional with a documented track record on profitable shipped projects and verifiable credits.** Verify credited role and relevant experience, and substantiate project profitability separately. A credit, revenue figure, download count or award alone is not proof of profit. Record independence, conflicts, evidence method and limitations; agree scope and compensation or explicit voluntary status before work. Use credible publisher/financial evidence or confidential confirmation from an authorized representative without publishing private financial records. The [portfolio collaboration requirements](https://ibloud.github.io/collaborate/#independent-evaluation) hold the detailed brief. No evaluator has been appointed or qualifying external evaluation verified here. This requirement applies to evaluation of the production case, not eligibility to contribute. Maintainer PR review and AI-assisted checks do not replace it.

## Reviewed snapshots and method

| Repository | Main SHA inspected | Existing sources inspected |
| --- | --- | --- |
| Loptr-Lab/training | `877c4bfe4ce6ca677667be735df747a6e7e63369` | README, CONTRIBUTING, CANDIDATE, legacy exercise specification, governance, reviewer scorecard, docs/index, PIXIE Markdown/HTML, package/CI/devcontainer, engine/types/tests |
| ibloud/ibloud.github.io | `0f8fee7482fae8756c6085000796f34a069dab8d` | README, COLLABORATE, MISSION, collaborate page, Violet dossier, canonical ECOSYSTEM_ARCHITECTURE, static checker |
| ibloud/violets-revenge | `2564a53716e78dca8062ec03a078739552b3e822` | README, CONTRIBUTING, onboarding, architecture/stack/ADR, story and character bibles, sensitive-content and playtest guidance, root, archive, demo/engine/tests, Python/Node checks and issue template |
| Loptr-Lab/veiled-dominion-engine | `ff3d29f97eeaa64792b0e3daa5b1ab132d0febbf` | README, CONTRIBUTING, development environment, architecture, canonical GDD/rulebook and continuity policy, licenses, devcontainer/package, types/engine/Jest suites |
| ibloud/battle-the-beast | `5c42d6fa22ed0ab2261246e80f9ff537cdc84a8a` | README, rights notice, authorial intent, Veiled lineage, Ink source/compiler, browser runtime, package/build configuration |

Five fresh clones were used. Current open issue bodies and PR bodies/assignments were fetched through GitHub REST before edits. These are dated observations, not reserved tasks. The four requested Kent C. Dodds articles were retrieved: [codebase learning](https://kentcdodds.com/blog/how-i-learn-an-open-source-codebase), [problem-led programming](https://kentcdodds.com/blog/how-to-get-started-with-programming), [teaching](https://kentcdodds.com/blog/how-i-teach), and [choosing contributions](https://kentcdodds.com/blog/what-open-source-project-should-i-contribute-to). Applied principles: inspect rules, start from an actual behavior, run a baseline, trace code, explain findings, and seek scoped feedback. No article text, curriculum or branding was copied.

## A. Navigation inventory

“Verified” below means source inspection and the named executed checks, not human acceptance.

| Need | Existing location | Verified working? | Gap | Action |
| --- | --- | --- | --- | --- |
| Initial orientation | Training README → docs/index.html | Source and local browser checked | Work/equipment routes dominate; no direct code-discovery action | LINK: existing contributor guide from homepage |
| Contributor terms and exit | Training CONTRIBUTING/governance; each project's mission/rights | Source inspected | No need for a new curriculum | KEEP |
| Junior issue/PR process | Training CONTRIBUTING | Existing GitHub fork/PR path | Project-code route not explicit | LINK: same guide's project table and behavior procedure |
| Experienced review | Training CONTRIBUTING senior section | Source inspected | Fast architecture/test route needed, exercise must be optional | LINK: direct project authorities, no prerequisite lessons |
| Training exercise setup | CANDIDATE/package/devcontainer/CI | Install and typecheck pass; 24 tests fail | README guidance does not surface intentional starter baseline | CORRECT: optional exercise and exact baseline documented |
| Training runnable implementation | engine.ts/types.ts/test suites | Mandatory tests execute and expose placeholders | Not a finished game | KEEP starter; no implementation changes |
| Violet root | index.html | Browser follows redirect to `/pitch/#money` when served at host root | Older docs describe Canvas gameplay at root; fallback markup only selects cards and displays notice | CORRECT: point to actual demo/archive; absolute host-base behavior needs review |
| Violet code/test trace | demo/index.html → demo/engine/rules.js → demo/test | Concede/confirm/restart verified; 22 tests pass | Root instructions omit this lane | LINK/CORRECT: existing onboarding and architecture |
| Violet canon and production | bibles, sensitive-content guide, ADR | Source inspected | Prototype content must stay proposed | KEEP |
| Violet first-task template | good_first_issue.md, issue #27 | Source inspected; example draft below | Files, reproduction, verification, access, reviewer and handoff prompts absent | CORRECT template; no automatic assignment |
| Veiled setup | docs/DEVELOPMENT_ENVIRONMENT.md | Install/typecheck pass; full Jest fails | 6×6 exercise confused with canonical four-player architecture | CORRECT baseline and authority links |
| Veiled movement pipeline | engine.ts, canonical architecture, partial C# | Source + failing tests | getLegalMoves unimplemented; class export absent; canonical casing/runtime decision unresolved | REQUIRES MAINTAINER DECISION; do not invent rules |
| Veiled state helper | types.ts isSteam | Isolated executable probe passes | Helper is exercise state, not canonical Veiled behavior | LINK concise trace in existing setup guide |
| Veiled license summary | CONTRIBUTING vs LICENSE.md/LICENSE-CODE/CONTENT | Source conflict verified | Old summary incorrectly applies noncommercial content terms to all code | CORRECT summary to existing map; license files unchanged |
| Battle setup/build | README, package.json, compiler | Install/dev/build pass after cache workaround | Initial environment failure was not a source defect | KEEP build code and commands |
| Battle contribution discovery | README project map/rights/lineage | Browser branch and compile verified | No CONTRIBUTING file or direct scoped issue/reviewer instruction | LINK/SIMPLIFY in README; no new portal/file |
| Portfolio contribution entry | collaborate/index.html, COLLABORATE.md | Static checker + local browser | Markdown still sends ordinary public work to email | CORRECT public issue route; retain private commission email |
| Independent commercial review | Existing production/collaboration guidance | No qualified evaluator verified | Required professional credentials/profitable-project evidence not explicit | MISSING → document required evaluation in existing portfolio/training guidance |
| PIXIE continuity | Existing checkpoint guidance and training issue #42 | Owner-host discovery, suggestion, draft and resume calls passed in this session | Separate-personal-account access not verified; no new feature authorized | KEEP optional GitHub handoff; record access gap |
| Device accessibility | Existing shared CSS, browser-first guidance | Training/portfolio at five widths; gameplay interaction smoke checks | Physical iPad/Safari/VoiceOver and actual newcomer experience not tested | REQUIRES MAINTAINER DECISION for human acceptance |

## B. Minimal correction set

Training: extend CONTRIBUTING with direct project/code/test paths, baseline and independent-evaluation link; one homepage link; this single audit record is new because no existing audit home covers these deliverables. Portfolio: add evaluator criteria in existing collaboration Markdown/HTML, route public contributions to GitHub, correct the existing Violet dossier's historical-game URL. Violet: correct entry-point descriptions in README/architecture/onboarding; add one exact code trace; fill the existing first-task template fields. Veiled: document observed setup state, distinguish scaffolds/exercise/canonical design, link authority and correct license summary. Battle: add a small branch/verification and contribution section in the existing README.

No gameplay, mandatory tests, licenses, canon, dependency manifests, theme CSS, PIXIE runtime, account flow, deployments or historical source were changed. KEEP material remains intact apart from links/context adjacent to it.

## C. Two example journeys — same Violet codebase

These are executed agent simulations, not feedback attributed to a junior or professional. No elapsed newcomer-completion time or reduced-onboarding claim was measured.

**Junior developer:** Training homepage → contributor guide → Violet onboarding → local server → `/demo/`. Choose Concede, then Confirm: the outcome becomes conceded. Restart clears it. Read `setPending` and `execute` in `demo/index.html`, then `act`'s `concede` case in `demo/engine/rules.js`. It sets terminal state, appends the event and returns success; `render` displays it. Run `node --test demo/test/*.test.js`; inspect `concede and restart terminal states` in rules.test.js. A small reversible documentation correction in this draft names that actual path without changing rules. Explain the observed behavior and test in your own words in a draft PR. Ask the maintainer in the relevant issue whether that lane is intended before proposing gameplay edits. No deployment or canon change follows from a passing check.

**Experienced developer/professional:** Follow the same Training link directly to Violet's architecture, ADR, demo rules and tests; no exercise completion. Reproduce the same concede/restart behavior and inspect the mutation/event/render boundary. Read the existing scope labels and compare root redirect, archived Canvas and precinct implementation before proposing a production plan. A bounded useful review is to reconcile the intended gameplay entry and the stale smoke-test issue with the actual code. That is a proposed review question, not a new assigned issue or completed external evaluation. Agree time, deliverable, compensation status, rights and reviewer before substantive work. Leave the SHA, reproduction, tests, unresolved question and next action on the same issue when handing off.

## Code discovery across all five repositories

| Repository | Input → code → state/processing → output → verification |
| --- | --- |
| Training | Test constructs a board → engine.test.ts calls engine.ts/getLegalMoves → placeholder throws, no move state implemented → Jest reports Not implemented → full mandatory suite baseline recorded below; types.ts owns the shape. Do not call the exercise playable. |
| Portfolio | Activate contributor-path link → collaborate/index.html static anchor → browser navigation, no account state → Training guidance → static checker validates local links; rendered page/reflow checked locally. |
| Violet | Concede → demo/index.html/setPending → execute → rules.js/act(concede) sets terminal and appends event → render shows conceded → rules.test.js and real browser controls; Restart calls createGame via start. |
| Veiled | isSteam(board,{row:0,col:0}) → types.ts/squareKey → Map lookup of steamUntilTurn and comparison with board.turn → true at turn 2/expiry 2, false at turn 3 → isolated probe using compiled existing types.ts. The intended getLegalMoves path stops at Not implemented; full tests expose it. |
| Battle | Follow the music → threshold branch in .ink increments memory and diverts to luna → compile-story.js produces JSON → src/main.js start/Story, choice handler ChooseChoiceIndex and render → LUNA passage/new choices → compile/build, browser choice and async Restart verified. Historical references are not exported into other projects' canon. |

The Veiled helper probe transpiled existing `types.ts` outside the checkout with `./node_modules/.bin/tsc types.ts --target ES2020 --module commonjs --skipLibCheck --outDir /workspace/work/audit/helper-probe`, then Node assertions checked the two inputs without mutation. This is bounded helper evidence, not a canonical engine suite.

## D. First-contribution readiness

No issue is certified ready solely by its label. Reviewer availability still needs human confirmation; no work is automatically assigned.

| Existing issue | Readiness assessment and concrete blocker |
| --- | --- |
| [Violet #27](https://github.com/ibloud/violets-revenge/issues/27) | Reproducible template gap, exact files and expected prompts exist; unassigned with no matching open PR before this audit. This audit's Violet draft now covers the template, so do not duplicate it. Maintainer review still required. |
| [Violet #24](https://github.com/ibloud/violets-revenge/issues/24) | Clear keyboard/landmark question, but root implementation/route is stale and PR #51 changes root styling. Confirm actual target and reviewer before a new patch. |
| [Violet #26](https://github.com/ibloud/violets-revenge/issues/26) | Root no longer has the described win/lose gameplay. Choose demo versus archived Canvas, specify build and reviewer, and reconcile PR #50 before accepting a 15-minute checklist. |
| [Violet #25](https://github.com/ibloud/violets-revenge/issues/25) | Requested valid/invalid invite input behavior predates retired HTTP 410 endpoint. Maintainer must decide whether retirement tests are the useful scope; no live invite/Discord access needed. |
| [Violet #23](https://github.com/ibloud/violets-revenge/issues/23) | Can inspect variable references, but legacy bot retirement and open PR #47 change dependencies. Narrow historical/local-only purpose and reviewer first. |
| Violet #13–#19 | Discord/intake/server tasks conflict with current retirement/Roomy guidance and may need private access. Not starter tasks; maintainer triage needed. |
| [Veiled #11](https://github.com/Loptr-Lab/veiled-dominion-engine/issues/11) | Label says good first issue, but canonical implementation/serializer target is unconfirmed, C# casing unresolved and immunity/loss rules disputed. Do not add canonical regression tests to exercise engine.ts. |
| [Veiled #5](https://github.com/Loptr-Lab/veiled-dominion-engine/issues/5), #7, #8, #10 | Assigned to ibloud; #5 already has PR #6. Do not duplicate. #8 also involves permission-dependent historical material and unresolved rule choices. |
| Veiled #12–#15, #52 | Architecture, rendering/accessibility or transferred-project reviews; not bounded beginner code fixes. #52 is already covered by PR #53. Confirm accepted target/runtime and reviewer. |
| [Training #42](https://github.com/Loptr-Lab/training/issues/42) | Existing release/access coordination, not a first code assignment. Its old version-11 text is dated; current Site v18/plugin v1.0.4 were separately read back. Personal tester OAuth registration remains blocked. |
| Training #45 | Optional visual-production work in another project, not a code-discovery starter for the three initial repositories. Do not expand this audit to implement it. |
| Battle / portfolio | No open non-PR issues at audit time. Use the existing issue path to ask for scoped review; do not invent a ready task or reviewer. |

Relevant open work inspected: Training PRs #38/#47/#50; portfolio #10/#21; Violet #44/#45/#47/#48/#50/#51; Veiled #4/#6/#29/#36/#37/#44/#53; Battle none. This change leaves their features, architecture and assignments alone. Veiled #29 already adds some Training cross-links; the correction here documents executed failures and authority boundaries rather than creating a competing training path.

Example draft for the revised Violet template (not submitted): problem = a contributor follows root-Canvas instructions and reaches the pitch; build = reviewed main SHA above; files = README, onboarding, architecture; expected = instructions identify current routes without changing runtime; verify = inspect root redirect, serve at host root and follow `/demo/` concede/restart; dependencies = Python/browser, Node for rules checks; non-goals = game/canon/deployment; reviewer = maintainer confirmation on existing issue; handoff = findings/build/next action in issue. This uses no private context or credentials.

## E. Exact validation and limitations

Environment: Linux; Node v24.19.0, npm 11.9.0, Python 3.12.14; system Chromium driven by installed Playwright. Node 20 devcontainers exist in Training and Veiled but were not launched; no Codespaces or physical iPad acceptance is claimed.

| Location | Commands actually executed | Outcome |
| --- | --- | --- |
| Training clean clone | `npm ci`; `npm run typecheck`; `npm test -- --runInBand` | Initial install blocked by inaccessible default npm cache, subsequent tsc/jest unavailable. Reran install with `--cache /workspace/work/audit/npm-cache-training`: succeeded. Typecheck passed; 2 suites / 24 tests failed on intentional Not implemented. CI permits the starter explicitly; not a product pass. |
| Veiled clean clone | Same commands; retry cache `/workspace/work/audit/npm-cache-engine` | Install and typecheck passed after same environment workaround. Jest: 1 suite / 24 tests passed (rpgActorAcceptance); 2 suites / 24 failed (unimplemented functions, missing GameEngine export). No false overall pass. |
| Battle clean clone | `npm install`; `npm run build`; `npm run dev -- --host 127.0.0.1 --port 8011` | Initial partial installation/cache failure caused missing compiler module. Retried install with `--cache /workspace/work/audit/npm-cache-beast`, then build passed: 6 lineage mappings, Ink compilation, Vite output. No compiler code change. Browser branch and restart passed after waiting for the asynchronous fetch. |
| Violet clean clone | `python -m venv .venv`; `.venv/bin/python -m pip install -r requirements.txt`; `.venv/bin/python -m pytest -q`; `node --test demo/test/*.test.js` | Python 15 passed, one dependency deprecation warning; precinct 22 passed. Scripted simulations are not human balance evidence. |
| Violet legacy Node | `npm ci --cache /workspace/work/audit/npm-cache-violet`; `npm test` in js-bot | Syntax checks and 3 tests passed; retained offline behavior only, no service login. |
| Portfolio | `python tools/check_portfolio.py` | 25 pages passed before and after corrections: stylesheet/navigation, landmarks, IDs, local links and fragments. |
| Browser | Python static server at 8010 (audit tree), 8013 (Violet host root); Battle Vite at 8011; `python work/audit/browser_audit.py` | Root redirect, precinct concede/confirm/restart, Ink branch/restart; Training and portfolio reflow at 320/390/768/1024/1366. Test-harness corrections: initial wrong host-base path and missing wait for async restart were fixed; neither was treated as a product defect. |

Changed Markdown/HTML link targets and anchors are checked before PR handoff; existing unrelated broken references remain a separate baseline, not silently repaired. No screen-reader compliance, human onboarding outcome, profitability, paid role, tester installation or acceptance is inferred from these checks.

### Separate personal-account PIXIE test blocker

The user encountered OAuth setup requiring a user-defined client; DCR was unavailable without a registration endpoint and CIMD was not advertised. No authorized client ID/secret or callback registration for that connector was supplied or verified. Default/base scopes and token auth method must follow a real authorized registration, not guessed settings. Do not reuse the Site's internal client, weaken authentication, share owner credentials or count public website access as plugin installation. Existing owner-side tool calls worked; separate-user login and full packaged guidance remain unverified. This is an access finding, not authority to build another PIXIE feature.

## F. Review and acceptance still needed

Separate focused draft PRs contain the corrections in their owning repositories. Merge/deploy are not authorized. Maintainers must confirm route ownership, starter issue scopes, reviewer availability and unresolved canonical implementation decisions. A real junior contributor and an experienced professional still need to follow the routes, provide consented observations and attempt an actual small PR. The independent evaluator must separately meet the verified-credit/profitability requirements and deliver the scoped assessment. Until then this remains an executed technical orientation audit with explicit human acceptance gaps.

Cross-repository links to new sections refer to the proposed changes until their owning PRs merge. They are not claimed live. No current production URL was changed.
