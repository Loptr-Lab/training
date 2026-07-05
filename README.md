# Loptr Lab — Training & Exercises

**Repository:** [`Loptr-Lab/training`](https://github.com/Loptr-Lab/training)

This repository is the home for Loptr Lab's take-home exercises, milestone-based practice tracks, and candidate evaluation materials.

> **This is not the engine repo.**
> The real Veiled Dominion game engine lives at
> [`Loptr-Lab/veiled-dominion-engine`](https://github.com/Loptr-Lab/veiled-dominion-engine).
> Nothing in this repo touches that codebase.

---

## What this repo contains

| File / Directory | Purpose |
|---|---|
| `veiled-dominion-engine-exercise-v2-hard.md` | The take-home exercise prompt (Hard / v2) |
| `CANDIDATE.md` | Instructions for candidates completing the exercise |
| `engine.ts` | **Candidate implements this file** |
| `types.ts` | Core data model (candidates may adjust internals, not the exported shape) |
| `engine.test.ts` | Mandatory test harness — **do not edit** |
| `edge-rules.test.ts` | Anti-cheat edge-rule tests — **do not edit** |
| `PR_BODY.md` | Template for the candidate's submission PR description |
| `REVIEWER_SCORECARD.md` | Evaluation rubric for reviewers |
| `package.json` / `tsconfig.json` | TypeScript + Jest harness config |

---

## Quick start (candidates)

```bash
npm install
npm test
```

All tests will fail with `"Not implemented"` until you implement `engine.ts`.
Read [`CANDIDATE.md`](./CANDIDATE.md) before starting.

---

## Repo identity

- **Canonical path:** `Loptr-Lab/training` (lowercase)
- **Default branch:** `main`
- **Purpose:** exercises, training tracks, candidate evaluation
- **Not for:** engine source code, Unity/C# game project, engine architecture docs

Those belong in [`Loptr-Lab/veiled-dominion-engine`](https://github.com/Loptr-Lab/veiled-dominion-engine).
