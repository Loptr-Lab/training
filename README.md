# Veiled Dominion — Candidate Exercise & Training Curriculum

## Repo Identity

**This is not the engine repo.** This repository (`Loptr-Lab/training`) contains a standalone, self-contained TypeScript coding exercise used for candidate evaluation and MN Vocational Rehabilitation Services (VRS) supported training. It does not require or use the C#/.NET codebase from the real game engine, which lives at **[github.com/Loptr-Lab/veiled-dominion-engine](https://github.com/Loptr-Lab/veiled-dominion-engine)**.

This exercise is a proxy for real engineering work on Veiled Dominion — completing it well maps directly onto Track A of the training curriculum below, not a disconnected test.

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
- **Two interfaces are required, not optional.** `engine.test.ts` tests a functional API (`getLegalMoves`, `applyMove`, `advanceTurn`). `edge-rules.test.ts` separately tests an object-oriented `GameEngine` class (`addPiece`, `setSquareStatus`, `movePiece`, `endTurn`, `getPieceAt`). Both must be implemented and both must pass — implementing only one is an incomplete submission.
- All mandatory test suites must pass for a submission to be eligible for a "Correctness" score above the minimum. Architecture, extensibility, and clarity are graded separately — see `REVIEWER_SCORECARD.md` for exactly how submissions are evaluated.

## Errata (read this before you start)

The original Gale rule ("cannot end on the same row/column it started on") was written for a single straight diagonal slide, which can **never** land back on its starting row or column — the rule was nonsensical as written. This exercise uses the corrected pivot variant: Gale may change diagonal direction once mid-move, which is what makes the row/column constraint meaningful and testable. Build to what the tests actually check, not the original ambiguous wording.

## Exact Contracts the Tests Assume

**Tide alternation:** a Tide piece's `lastMoveAxis` is undefined until it moves once. Its first move is unrestricted. Every move after that must be along a different axis (horizontal vs. vertical) from its immediately previous move.

**Ember midpoint / Steam:** an Ember jump is illegal if (a) the midpoint square is occupied by any piece, (b) the midpoint square is currently Steam, or (c) the landing square is currently Steam.

**Burning expiry:** if a piece becomes Burning as a result of a move made during turn T, it remains Burning during turns T, T+1, and T+2, and is no longer Burning from turn T+3 onward. Both `engine.test.ts` and `edge-rules.test.ts` test this exact timing — `advanceTurn()` / `endTurn()` semantics must implement it precisely, with no off-by-one drift between the two harnesses.

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

This exercise is the hands-on centerpiece of **Track A: Prototype Engineer** below. If you're working through this as part of a VRS training plan or self-directed learning path, the full curriculum gives you the surrounding context — what skills this exercise builds toward, and what comes next.

### Phase 0: Foundations (all tracks, ~1 week)

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
Turn-based expiry logic (Burning), square-status effects (Steam) — the reaction-framework requirement in `CANDIDATE.md` is explicitly testing whether you can build this as an extensible system rather than hardcoded conditionals.

**Module 4 — Systems Integration**
Putting it together into a coherent, testable engine implementing both required interfaces — this is what `REVIEWER_SCORECARD.md`'s "Reaction framework design" criterion (35% of the score) is actually evaluating.

**Completion checkpoint:** all mandatory tests pass in both harnesses, `NOTES.md` reflects honest design tradeoffs, and you've added at least one new reaction using your own framework without touching core movement logic.

### Track B: Systems Designer (~3 weeks)

Game economy modeling, quantitative balance analysis, structured playtesting methodology. Not exercised directly in this repo — see the engine repo's `docs/design/GDD.md` for the real economic systems (Leadership Points, Boon Tokens) this track applies to.

### Track C: Technical Artist (~2–3 weeks)

Shader programming for the engine's signature visual effects (Death's void material, Rebirth's glow), built against real accessibility constraints — see the engine repo's `docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md` before writing any rendering code for this track.

---

## Where This Leads

Finishing this exercise well is a real, gradable signal — see `REVIEWER_SCORECARD.md` for exactly what's being evaluated and how. From here, contributors typically move into Track B or C, or directly into the engine repo's open issues, depending on interest and role.

## Related Repos & Docs

- **Engine repo:** [github.com/Loptr-Lab/veiled-dominion-engine](https://github.com/Loptr-Lab/veiled-dominion-engine) — the real game
- **Full game design doc:** `docs/design/GDD.md` in the engine repo
- **Accessibility engineering specs:** `docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md` and `docs/ENGINE_ACCESSIBILITY_AUDIO_AURA.md` in the engine repo

## Contact

**Program sponsor:** Loptr Lab
**Questions:** questions@loptrlab.com
