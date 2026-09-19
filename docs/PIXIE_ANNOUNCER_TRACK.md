# Track D — Narrative Interface / Announcer Systems

## Purpose

Track D teaches how to develop a recurring narrative interface that can move between creator tools, accessibility experiments, and a game without quietly becoming a second rules engine.

The working case is **PIXIE** as an announcer/interface intelligence: a voice that observes authoritative state, frames what matters, and communicates consequences without owning the underlying game rules.

This track is a training and prototyping path. It does **not** make PIXIE, Duet behavior, or any proposed Keeper variant Veiled Dominion canon.

## Core boundary

```text
AUTHORITATIVE GAME / EXPERIENCE STATE
              ↓
       PRESENTATION CONTRACT
              ↓
       PIXIE ANNOUNCER LAYER
          ↙           ↘
       DUET        PARAGON-REBORN
```

PIXIE may interpret and present a contracted event. PIXIE must not invent gameplay state, resolve rules, alter canonical mechanics, or infer hidden state from presentation.

## The development loop

**OBSERVE → CONTRACT → VOICE → PRESENT → ACCESS → TEST → INTEGRATE → REVIEW**

### 1. OBSERVE

Identify the events the host is allowed to see.

Examples:

- match/round begins;
- meaningful state transition;
- new actor or threat becomes known;
- player decision resolves;
- failure/success condition resolves;
- accessibility-relevant information becomes available.

Record whether each signal is authoritative, derived, private, or presentation-only.

### 2. CONTRACT

Define a small event schema before writing dialogue or animation.

Minimum fields:

- event name;
- source of truth;
- audience;
- visibility/privacy;
- timing;
- allowed presentation;
- accessibility equivalent;
- unresolved questions.

### 3. VOICE

Develop PIXIE as a communication system before treating her as a conventional character.

The initial design question is:

> What does PIXIE know, what is she permitted to say, and what does she deliberately leave unsaid?

Voice should remain stable across contexts while allowing different presentation skins.

For the Paragon/Veiled Dominion experiment, the proposed **corrupted Keeper** is a *variant presentation/persona*, not yet a canon character. The corruption should be expressed through contradictions, damaged ritual language, missing context, or unstable framing—not by giving the announcer unauthorized control over rules.

### 4. PRESENT

Choose the channel appropriate to the context:

- spoken line;
- text/subtitle;
- screen-reader announcement;
- UI state;
- visual/audio cue;
- silence.

The same event should have an accessible non-audio representation when the information is important to play.

### 5. ACCESS

Test:

- screen-reader discoverability;
- captions/transcripts;
- reduced motion;
- non-color-only state communication;
- cognitive load;
- timing windows;
- interruption/replay behavior.

Duet is the primary accessibility laboratory for this track.

### 6. TEST

Separate tests for:

1. event contract;
2. announcer eligibility;
3. message selection;
4. presentation;
5. accessibility fallback;
6. privacy/visibility;
7. regression against the authoritative state.

A presentation test must never become the rule test.

### 7. INTEGRATE

**Duet:** prototype the announcer interaction in the screen-reader-first environment. Treat the result as Duet-specific unless explicitly promoted elsewhere.

**Paragon-Reborn:** use the same documented event/presentation contract as a production-facing prototype. Keep gameplay authority in the future canonical/runtime systems and use the announcer only downstream.

### 8. REVIEW

Every cross-repository handoff records:

- source repository;
- exact event contract;
- presentation variant;
- accessibility behavior;
- asset/provenance status;
- canon status;
- open questions;
- next decision owner.

## Portfolio-sized exercises

### Exercise D1 — Event contract

Write five event contracts and produce a text-only announcement set.

**Evidence:** Markdown specification + fixtures/examples.

### Exercise D2 — PIXIE voice bible

Define:

- role;
- knowledge boundary;
- vocabulary;
- sentence rhythm;
- humor/restraint boundary;
- what she never claims to know;
- escalation behavior;
- silence behavior.

**Evidence:** voice bible + 10–20 example lines.

### Exercise D3 — Corrupted Keeper study

Create a noncanonical Veiled Dominion presentation study in which PIXIE's announcer layer is rendered as a corrupted Keeper.

Constraints:

- no new canonical rules;
- no gameplay authority;
- no implication that training abstractions are canon;
- corruption is a presentation/narrative treatment;
- all important gameplay information remains available through accessible channels.

**Evidence:** character/voice brief, state-to-line matrix, visual/audio treatment notes, accessibility notes.

### Exercise D4 — Duet prototype

Implement one announcer event in Duet and expose it through the accessible interaction model.

**Evidence:** focused branch/PR, tests, accessibility notes, and a short before/after explanation.

### Exercise D5 — Paragon-Reborn handoff

Translate the same contract into a Paragon-Reborn presentation brief.

**Evidence:** production-facing integration note identifying:

- authoritative input;
- presentation contract;
- PIXIE variant;
- asset/provenance requirements;
- accessibility behavior;
- unresolved canon questions.

## Governance

This track does not create a partnership, production assignment, employment promise, or canon promotion.

Training work remains noncanonical. Duet remains an experimental accessibility artifact. Paragon-Reborn remains the coordination hub for its own roadmap and future production implementation. Veiled Dominion's canonical rules authority remains the engine repository.

A proposed character, voice, visual treatment, or mechanic moves into canon only through the receiving project's documented governance process.

## Success condition

The contributor should be able to demonstrate:

> **I can make a narrative interface feel alive without letting it become the authority for what is true.**

That is the core skill this track is intended to teach.
