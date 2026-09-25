# Game development track

## Work tasks

Implement and test game systems, use an engine and source control, create or integrate assets, profile performance, run playtests, and document production handoffs.

## Required capabilities

- Compute and graphics appropriate to the chosen engine and target platform
- Storage for engine versions, source assets, builds, and backups
- Accessible editor, viewport, debugging, and collaboration workflows
- Input and output options that support testing without making one physical interaction method mandatory

## Plan

Separate requirements for programming, art, audio, design, testing, and target-platform builds. A minimum configuration must run the real learning tasks reliably; preferred capabilities must be tied to a documented barrier or workflow gain. Review [accessibility needs](../accessibility/index.md) before comparing systems.

## Duet architecture provenance

For the Veiled Dominion / Duet development path, use the [Duet development provenance guide](./duet-development-provenance.md). The current Duet Hackathon is the production/playtest build. The architecture lab is the extraction/validation layer, and the permanent Loptr Lab engine receives only validated reusable systems.

Do not model this as a direct production-to-engine fork. Preserve provenance and test the boundary between presentation-specific Duet code and reusable engine architecture.
