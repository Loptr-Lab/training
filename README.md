# Veiled Dominion — Candidate Exercise & Training Curriculum

## Repo Identity

**This is not the canonical game engine.** This repository (`Loptr-Lab/training`) contains a standalone TypeScript systems exercise used for candidate evaluation and workforce-training pathways. Ember, Tide, Root, Gale, Burning, and Steam are training abstractions, not Veiled Dominion canon.

Veiled Dominion's four-player rules authority remains [`Loptr-Lab/veiled-dominion-engine`](https://github.com/Loptr-Lab/veiled-dominion-engine). Duet remains a separate accessibility artifact and experimental mechanics lab. See [`RESEARCH_AND_CANON_BOUNDARY.md`](./RESEARCH_AND_CANON_BOUNDARY.md).

This repository is also the contributor on-ramp within the wider Loptr Lab
ecosystem. Read [`ROLE_IN_ECOSYSTEM.md`](./ROLE_IN_ECOSYSTEM.md) before describing
how training work relates to narrative, research, or production evidence.

## 📍 State Workforce & Vocational Rehabilitation Intake

State workforce agencies (VR offices, local Workforce Development Boards) operate under different application workflows and funding eligibility rules.

### Pilot State Agency and Training-Resource Finder
Use our [pilot State Agency & Voc-Rehab Lookup Tool](https://loptr-lab.github.io/training/state-resources.html) to view state-specific intake links and funding availability.

#### Quick Jump by State

| State | Primary Agency Intake | VR Tech Training Covered? | Local WIOA Training Finder |
| :--- | :--- | :---: | :--- |
| **Texas (TX)** | [Texas Workforce Commission (TWC)](https://www.twc.texas.gov/) | Determined individually | [TWC Approved Training Search](https://www.careeronestop.org/LocalHelp/EmploymentAndTraining/find-WIOA-training-programs.aspx?location=TX) |
| **Minnesota (MN)** | [DEED CareerForce Minnesota](https://www.careerforcemn.com/) | Determined individually | [MN WIOA Provider Search](https://www.careeronestop.org/LocalHelp/EmploymentAndTraining/find-WIOA-training-programs.aspx?location=MN) |
| **California (CA)** | [CA EDD Workforce Services](https://edd.ca.gov/) | Determined individually | [CalJOBS Training Provider Search](https://www.careeronestop.org/LocalHelp/EmploymentAndTraining/find-WIOA-training-programs.aspx?location=CA) |
| **New York (NY)** | [NY Dept. of Labor Workforce](https://dol.ny.gov/) | Determined individually | [NY Training Finder](https://www.careeronestop.org/LocalHelp/EmploymentAndTraining/find-WIOA-training-programs.aspx?location=NY) |

---

> **Eligibility note:** The linked agencies determine services and funding individually. Listing a resource does not guarantee eligibility, approval, or payment. Confirm current requirements directly with the relevant VR or workforce office.

This exercise is a proxy for real engineering work on Veiled Dominion — completing it well maps directly onto Track A of the training curriculum below, not a disconnected test.

---

## 🛠️ New to Git or GitHub?

If you are new to GitHub or need a refresher on git workflows (branches, commits, pull requests) before tackling this exercise, complete this official 10-minute sandbox first:

* **[GitHub Skills: Introduction to GitHub](https://learn.github.com/skills)** — Hands-on, interactive course directly inside a test repository.
* **[GitHub Skills Catalog](https://skills.github.com)** — Additional free, self-paced modules for Markdown and Git basics.

---

## Quick Start

```bash
npm install
npm test
```

All tests in `engine.test.ts` and `edge-rules.test.ts` will fail with "Not implemented" until you implement `engine.ts`.

## Rules

- **You may edit:** `types.ts` (internals only — keep the exported shape stable) and `engine.ts`.
- **You may NOT edit:** `engine.test.ts` or `edge-rules.test.ts`. These are the scoring contracts. If you think a test is wrong, say so in `NOTES.md` — don't change the test.
- **Two interfaces are required, not optional.** `engine.test.ts` tests a functional API (`getLegalMoves`, `applyMove`, `advanceTurn`). `edge-rules.test.ts` separately tests an object-oriented `GameEngine` class with matching behavior.
- All mandatory test suites must pass for a submission to be eligible for a "Correctness" score above the minimum. Architecture, extensibility, and clarity are graded separately — see `REVIEWER_SCORECARD.md`.

## Errata (read this before you start)

The original Gale rule ("cannot end on the same row/column it started on") was written for a single straight diagonal slide, which can **never** land back on its starting row or column. The scoring contract therefore uses a one-pivot diagonal variant; a legal endpoint must differ from both the starting row and starting column.

## Exact Contracts the Tests Assume

**Tide alternation:** a Tide piece's `lastMoveAxis` is undefined until it moves once. Its first move is unrestricted. Every move after that must be along a different axis (horizontal vs. vertical) than the previous Tide move by that same piece.

**Ember midpoint / Steam:** an Ember jump is illegal if (a) the midpoint square is occupied by any piece, (b) the midpoint square is currently Steam, or (c) the landing square is currently Steam.

**Burning expiry:** if a piece becomes Burning as a result of a move made during turn T, it remains Burning during turns T, T+1, and T+2, and is no longer Burning from turn T+3 onward. Both `engine.test.ts` and `edge-rules.test.ts` assert this same window.

These contracts are spelled out in full so that "my interpretation of the rule was reasonable" isn't a valid defense for a failing test — the test files already encode the one interpretation used for grading.

## Required Deliverables

- Engine implementation (TypeScript, Node, no framework) satisfying **both** the functional API and the `GameEngine` class
- `NOTES.md` with:
  - movement-logic vs. reaction-logic boundary decisions
  - design tradeoffs and known limitations
  - what would break first if reactions became a trigger graph
  - any test/ruleset disagreements (if applicable)
- Test output summary (copy/paste from your local run)

## Submission Checklist

- [ ] Mandatory tests pass in both `engine.test.ts` and `edge-rules.test.ts` without modifying either file
- [ ] Both the functional API and `GameEngine` class are implemented
- [ ] Task requirements implemented
- [ ] `NOTES.md` included with honest design analysis
- [ ] Test output summary included

---

## Training Curriculum

This exercise is the hands-on centerpiece of **Track A: Prototype Engineer** below. If you're working through this as part of a VRS training plan or self-directed learning path, the full curriculum progression is:

### Phase 0: Foundations (all tracks, ~1 week)

- Read **[`THE_THRESHOLD.md`](./THE_THRESHOLD.md)** first — the world, its philosophy, and why "restraint over conquest" and "myth is undecoded science" are the two ideas everything else here has to serve
- **GitHub & Git Prerequisite:** If you are new to GitHub workflows, complete the official **[GitHub Skills Tutorial](https://learn.github.com/skills)** to practice branching, commits, and pull requests in a sandbox environment.
- Study the core game rules (see the engine repo's `RULEBOOK_v0.1`) well enough to explain them without notes
- Understand the turn/phase loop architecture at a conceptual level
- If working in a team: playtest the tabletop version with 3–4 people before writing code

**Checkpoint:** you can explain the core rules and diagram the turn loop from memory.

### Track A: Prototype Engineer (this repo, ~4 weeks)

**Module 1 — Programming Fundamentals**
TypeScript/OOP fundamentals, finite state machines, test-driven development — this exercise is scored entirely via Jest, so get comfortable reading test output as spec, not just pass/fail.

**Module 2 — Spatial & Coordinate Systems**
Grid movement validation, midpoint/jump logic (Ember), axis-alternation constraints (Tide) — all directly exercised by this repo's test suite.

**Module 3 — Status-Effect & Timed State Systems**
Turn-based expiry logic (Burning), square-status effects (Steam) — the reaction-framework requirement in `CANDIDATE.md` is explicitly testing whether you can build this as an extensible system rather than hardcode one-off rules.

**Module 4 — Systems Integration**
Putting it together into a coherent, testable engine implementing both required interfaces — this is what `REVIEWER_SCORECARD.md`'s "Reaction framework design" criterion (35% of the score) is actually measuring.

**Completion checkpoint:** all mandatory tests pass in both harnesses, `NOTES.md` reflects honest design tradeoffs, and you've added at least one new reaction using your own framework without touching tests.

### Track B: Systems Designer (~3 weeks)

Game economy modeling, quantitative balance analysis, structured playtesting methodology. Not exercised directly in this repo — see the engine repo's `docs/design/GDD.md` for the real economic systems.

### Track C: Technical Artist (~2–3 weeks)

Shader programming for the engine's signature visual effects (Death's void material, Rebirth's glow), built against real accessibility constraints — see the engine repo's `docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md` and `docs/ENGINE_ACCESSIBILITY_AUDIO_AURA.md`.

---

## Where This Leads

Finishing this exercise well is a real, gradable signal — see `REVIEWER_SCORECARD.md` for exactly what's being evaluated and how. From here, contributors typically move into Track B or C, or directly into scoped engine-repo tasks.

| Course / Resource | Tracks | Why |
| :--- | :--- | :--- |
| [GitHub Skills](https://learn.github.com/skills) | Prerequisites | Interactive sandbox for Git basics, branching, and pull requests |
| [Epic Web](https://epicweb.dev) | A, B | Full-stack patterns — auth, routing, server/client separation |
| [Epic AI](https://epicai.pro) | A | Building AI-powered apps; relevant to the engine's agent layer |
| [Testing JavaScript](https://testingjavascript.com) | A | Kent's "test behavior, not implementation" philosophy is exactly the mindset this exercise rewards |
| [Epic React](https://epicreact.dev) | A, C | UI layer — relevant when moving beyond vanilla JS |
| [Epic Product Engineer](https://epicproduct.engineer) | B | Judgment and constraints; aligns with the studio's "People over Profits" design philosophy |

## Related Repos & Docs

- **World & culture primer:** [`THE_THRESHOLD.md`](./THE_THRESHOLD.md) in this repo — read before Track A if you haven't already
- **Engine repo:** [github.com/Loptr-Lab/veiled-dominion-engine](https://github.com/Loptr-Lab/veiled-dominion-engine) — the real game
- **Full game design doc:** `docs/design/GDD.md` in the engine repo
- **Accessibility engineering specs:** `docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md` and `docs/ENGINE_ACCESSIBILITY_AUDIO_AURA.md` in the engine repo

## Contact

**Program sponsor:** Loptr Lab
**Questions:** questions@loptrlab.com

Wider pathways: [ibloud.github.io/collaborate](https://ibloud.github.io/collaborate/)


---

## License and fan forks

Exercise software is MIT-licensed. Original curriculum, instructions, narrative,
and scoring materials are CC BY-NC-SA 4.0. Forks must use distinct branding and
must not imply official evaluation, employment consideration, academic credit,
funding, or Loptr Lab endorsement.

See [LICENSE.md](./LICENSE.md) and [FAN_FORK_GUIDE.md](./FAN_FORK_GUIDE.md).
