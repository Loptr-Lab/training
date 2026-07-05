# Veiled Dominion Engine — Candidate Instructions

**Repository:** [`Loptr-Lab/training`](https://github.com/Loptr-Lab/training)

## Objective
Build a TypeScript game engine implementation for the Veiled Dominion exercise prompt and ensure your submission is both correct and extensible.

Read the full exercise prompt in [`veiled-dominion-engine-exercise-v2-hard.md`](./veiled-dominion-engine-exercise-v2-hard.md) before starting.

## Mandatory correctness gate
This repository contains a mandatory anti-cheat test harness:
- `engine.test.ts`
- `edge-rules.test.ts`

You **must not modify either of these files**.

Your submission must satisfy all assertions in these files. If you believe any test contradicts the exercise rules, explain your reasoning in `NOTES.md` rather than editing the test.

## Required deliverables
- Engine implementation (TypeScript, Node, no framework)
- `NOTES.md` with:
  - movement-logic vs reaction-logic boundary decisions
  - design tradeoffs and known limitations
  - what would break first if reactions became a trigger graph
  - any test/ruleset disagreements (if applicable)
- Test output summary (copy/paste from local run)

## Expected engine surface (minimum)
Your engine should expose behavior compatible with the mandatory tests:
- `getLegalMoves(board, piece)` → `Position[]`
- `applyMove(board, pieceId, destination)` → `Board`
- `advanceTurn(board)` → `Board`

The `edge-rules.test.ts` harness additionally expects a `GameEngine` class with:
- `addPiece(piece)`
- `setSquareStatus(pos, status)`
- `movePiece(from, to)`
- `endTurn()`
- `getPieceAt(pos)`

## Behavior expectations (high level)
- Correct movement rules for Ember, Tide, Root, Gale
- Burning status with correct turn-based expiry semantics
- Reaction system implemented as an extensible framework (data/rule driven), not hardcoded conditionals embedded in movement resolution
- At least one additional reaction added using your framework (without editing core movement logic)

## Running tests
```bash
npm install
npm test
```

Include the final pass/fail summary in your submission notes.

## Submission checklist
- [ ] Mandatory tests pass without modifying `engine.test.ts` or `edge-rules.test.ts`
- [ ] Task requirements implemented (see exercise prompt)
- [ ] `NOTES.md` included with honest design analysis
- [ ] Test output summary included
- [ ] PR opened against `main` using `PR_BODY.md` as a template
