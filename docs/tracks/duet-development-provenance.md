# Veiled Dominion / Duet development provenance

This is the development-training reference for the current Duet architecture. The purpose is to teach a clean separation between a production artifact, a hackathon artifact, an architecture laboratory, and a permanent reusable engine.

## The source-of-truth flow

```text
CURRENT DUET PRODUCTION
        │
        │ preserve exactly
        ▼
DUET HACKATHON / DEMO
        │
        │ preserve as its own historical/prototype layer
        ▼
DUET ARCHITECTURE LAB
ibloud/duet_engine_architecture
        │
        │ validate and extract reusable architecture/code
        ▼
LOPTR LAB PERMANENT ENGINE
Loptr-Lab/veiled-dominion-engine
        │
        ▼
FUTURE DUET / OTHER BUILDS
```

### Development rule

**Do not fork the current production Duet directly into the permanent Loptr Lab engine.**

Production Duet is a reference artifact. The Duet Hackathon is a separate preserved prototype/history layer. The architecture repository is the laboratory where mechanics, accessibility patterns, content contracts, tests, and build/distribution practices can be isolated, demonstrated, and validated. Only validated reusable pieces should graduate into the permanent engine.

## Repository roles

| Layer | Repository / artifact | Development role |
| --- | --- | --- |
| Production Duet | Existing production build / itch artifact | Read-only reference; do not modify for architecture work |
| Duet Hackathon | Preserved hackathon/demo work | Historical and prototype reference; preserve provenance |
| Architecture Lab | [ibloud/duet_engine_architecture](https://github.com/ibloud/duet_engine_architecture) | Experiment, isolate, test, document, and demonstrate architecture |
| Permanent Engine | [Loptr-Lab/veiled-dominion-engine](https://github.com/Loptr-Lab/veiled-dominion-engine) | Long-lived reusable engine; receive validated architecture/code |
| Playable reference | [Veiled Dominion: Duet on itch.io](https://ibloud.itch.io/veiled-dominion-duet) | Canonical playable reference; do not replace or rewrite as part of training work |

## What belongs in the architecture lab

The lab may contain:

- Rebirth / Death mechanics and their extracted rule contracts
- Radius of Ruin and Sanctuary state behavior
- Veiled-state behavior
- screen-reader-first command paths
- keyboard and visual-board parity
- audio cues
- content and actor contracts
- runtime smoke tests
- reproducible browser and itch builds
- architecture notes explaining what was learned from the prototype

The lab should make the boundary visible: a demo implementation can prove a concept without becoming the permanent engine.

## What graduates to the permanent engine

A piece is ready to move toward the permanent engine when it has:

1. a documented contract;
2. tests that describe its behavior;
3. an explicit accessibility requirement where applicable;
4. clear ownership/provenance;
5. no accidental dependency on the demo's page, fixture, or presentation layer;
6. a reason to be reusable beyond one Duet prototype.

Graduation is therefore **extraction and validation**, not a blind fork.

## Training exercise

When extending Duet, record each proposed change as one of:

- **reference** — observed in production or the preserved hackathon artifact;
- **experiment** — implemented in the architecture lab to test an idea;
- **validated** — supported by tests and suitable for extraction;
- **engine** — accepted into the permanent engine;
- **future build** — consumes the permanent engine rather than recreating the prototype.

This classification prevents the development history from collapsing into a single code lineage.

## Related source

- [Duet architecture lab](https://github.com/ibloud/duet_engine_architecture)
- [Permanent Veiled Dominion engine](https://github.com/Loptr-Lab/veiled-dominion-engine)
- [Veiled Dominion: Duet playable reference](https://ibloud.itch.io/veiled-dominion-duet)
