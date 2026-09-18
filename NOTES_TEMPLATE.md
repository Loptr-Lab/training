# Candidate Notes

## Architecture

Describe how movement validation, move application, timed state, and reactions are separated.

## Dual API

Explain how the functional API and GameEngine adapter share one source of truth.

## Reaction framework

Describe the rule/data model, the additional reaction you added, and what would break first if reactions became a trigger graph.

## Tradeoffs and limitations

Document known limitations and decisions you would revisit with more time.

## Test or rules disagreements

Record any disagreement with a mandatory test without editing the test.

## Verification

Paste the final output of:

```text
npm run typecheck
npm test
```
