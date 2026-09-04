# Candidate Instructions

## Objective

Implement the standalone TypeScript systems exercise in this repository. The exercise is a training proxy for architectural skills used by Loptr Lab; it is not the canonical Veiled Dominion game engine.

## Files you may edit

- `engine.ts`
- Internal implementation details in `types.ts`, provided its exported shapes remain compatible
- Your own `NOTES.md`
- Additional candidate-authored tests, provided the mandatory tests remain unchanged

## Files you must not edit

- `engine.test.ts`
- `edge-rules.test.ts`

These two suites are the scoring contracts. If you believe a contract is wrong, explain why in `NOTES.md` rather than changing a mandatory test.

## Required API contracts

Both interfaces are required and must represent the same rules.

### Functional API

- `getLegalMoves(board, piece)`
- `applyMove(board, pieceId, destination)`
- `advanceTurn(board)`

The functional API must return new board values without mutating its input.

### Object-oriented adapter

Export a `GameEngine` class exposing:

- `addPiece(piece)`
- `setSquareStatus(position, status)`
- `movePiece(from, to)`
- `endTurn()`
- `getPieceAt(position)`

The class may delegate to the functional core. Do not create a second, behaviorally different rules engine.

## Exact timing contract

If Burning is applied during turn T, it is active during T, T+1, and T+2. It is removed when advancing to T+3. Both mandatory suites use this contract.

## Behavior expectations

- Correct movement for Ember, Tide, Root, and Gale
- Per-piece Tide axis alternation
- Gale pivot and endpoint constraints
- Ember midpoint and Steam blocking
- Burning and Steam expiry
- An extensible, data- or rule-driven reaction system
- At least one additional reaction added through the framework without embedding a new special-case branch in core movement logic

## Required deliverables

- Completed `engine.ts`
- Compatible `types.ts`
- `NOTES.md` covering:
  - movement-versus-reaction boundaries
  - design tradeoffs and limitations
  - the first likely failure point if reactions became a trigger graph
  - any test or rules disagreement
  - final typecheck and test summary

## Verification

```bash
npm ci
npm run typecheck
npm test
```

## Submission checklist

- [ ] Typecheck passes
- [ ] Both mandatory suites pass without modification
- [ ] Functional and class APIs share one rules model
- [ ] Additional reaction uses the extension framework
- [ ] `NOTES.md` contains honest design analysis and test output
