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

## Xbox development workstation path

For a Windows and Xbox game track, use a **Windows x64 PC** for editing, builds, debugging, and local PC playtests. An iPad can remain the planning and remote-access device, but the GDK Visual Studio extensions require x64 Windows; ARM Windows devices are unsupported for those extensions. Microsoft lists Windows 10/11 64-bit for Xbox builds, at least 30 GB free for the GDK installation, the Windows SDK, Visual Studio, and the GDK. [Microsoft PC requirements](https://learn.microsoft.com/en-us/gaming/gdk/docs/gdk-dev/get-started/overviews/set-up-dev-pc) · [Microsoft tool requirements](https://learn.microsoft.com/en-us/gaming/gdk/docs/gdk-dev/get-started/overviews/sdk-and-tools)

| Phase | Capability and equipment | Decision point |
| --- | --- | --- |
| PC prototype | Windows x64 desktop, suitable CPU/GPU for the chosen engine, accessible display/input, NVMe storage, backups, and wired networking | Test representative Duet or other game builds before committing to a model. |
| Comfortable local development | Planning target: 8-core-class CPU, 32 GB RAM, 1–2 TB NVMe SSD, and a discrete GPU appropriate to the engine. These are **planning targets**, not Microsoft minimums. | Compare the real engine workload, warranty, upgrade path, and accessibility setup. |
| Xbox console build | GDK with Xbox Extensions, approved program access, and an Xbox development kit; connect workstation and kit by Ethernet on the same switch/subnet. | Pursue [ID@Xbox registration and concept review](https://learn.microsoft.com/en-us/gaming/gdk/docs/gdk-dev/pc-dev/tutorials/pc-e2e-guide/e2e-register-id-at-xbox) before budgeting for restricted console hardware. |

Microsoft recommends an NVMe SSD, Cat 6a cabling and a shared Ethernet switch for console deployments; 10 GbE is an optimization for supported dev kits, **not a baseline purchase**. A retail Xbox in Developer Mode serves a narrower UWP test path and does not substitute for the full GDK console workflow. [Microsoft workstation guidance](https://learn.microsoft.com/en-us/gaming/gdk/docs/gdk-dev/get-started/overviews/set-up-dev-pc) · [GDK setup](https://learn.microsoft.com/en-us/gaming/gdk/docs/gdk-dev/get-started/get-started-home) · [UWP FAQ](https://learn.microsoft.com/en-us/windows/uwp/xbox-apps/frequently-asked-questions)

See the [dated Xbox workstation purchasing example](../technology-planning/xbox-workstation-example.md) for an indicative price range, reputable purchasing channels, and quote checks. Keep the final funding request tied to documented work tasks and current quotes.


## Polyfork asset resources — reviewed 31 October 2026

Use this shortlist for a bounded asset-evaluation exercise. These are existing
third-party resources, not assets created or already integrated by Loptr Lab.
The reviewed catalogue lists free low-poly GLB editions; paid HD editions and
subscription features are separate. Recheck the selected asset's live terms
and file access before using it. No purchase is required or authorized here.

| Asset page | Asset ID | Proposed exercise |
| --- | --- | --- |
| [Flagstone Floor Tile](https://polyfork.dev/asset/flagstone-floor-tile-2a04ea) | `flagstone-floor-tile-2a04ea` | Duet optional board-surface study; 138 triangles |
| [Condition Ring](https://polyfork.dev/asset/condition-ring-df5a73) | `condition-ring-df5a73` | Duet optional selection/veil marker; 308 triangles; pair with text |
| [Glowing Rune Stone](https://polyfork.dev/asset/glowing-rune-stone-5a5558) | `glowing-rune-stone-5a5558` | Duet optional scenery; 476 triangles; no new rules meaning |
| [Meeting Chair](https://polyfork.dev/asset/meeting-chair-731ce0) | `meeting-chair-731ce0` | Rhapsody issue #11 chair/figure blocking; 464 triangles |
| [Field Console](https://polyfork.dev/asset/field-console-a92adc) | `field-console-a92adc` | Rhapsody issue #11 console blocking; 396 triangles |
| [Meeting Room Display](https://polyfork.dev/asset/meeting-room-display-fddfc3) | `meeting-room-display-fddfc3` | Rhapsody issue #11 abstract displays; 656 triangles |

Read [Polyfork licensing](https://polyfork.dev/licensing), the
[platform distinction](https://polyfork.dev/platform) and
[agent documentation](https://polyfork.dev/llms.txt). Standard terms permit
project use and modification, while standalone asset redistribution and some
platform/self-hosting uses have separate restrictions. Keep vendor assets
outside the repository's MIT claim. A catalogue link is not a local download,
a tested import, a perpetual CDN guarantee, or proof of device performance.
Record asset ID, source, access date, file/version/hash when retrieved,
license terms, actual cost and any edits. No celebrity likeness, recording
or project-canon rights are provided by a prop model.

### One small learning task

Choose one approved candidate; import or compose it in an isolated study using
permitted access. Check scale, material appearance, keyboard access, failure
behavior and target-device performance. Export/reopen it where supported.
Provide an artifact, text description and reproducible findings. Mark the result
usable, needs more testing or unsuitable; do not infer acceptance from a preview.

For Rhapsody, reuse [existing issue #11](https://github.com/ibloud/ren-rhapsody/issues/11)
and its three-shot study; preserve original audio and the Halloween First
Movement freeze. For Duet, any 3D board is still an optional visual proposal,
separate from the existing multiplayer and accessibility acceptance work.
Keep [Break This Build](https://break.loptrlab.com/) as the shared test entry,
the project repositories as implementation authority, and the
[canonical ecosystem map](https://github.com/ibloud/ibloud.github.io/blob/main/docs/ECOSYSTEM_ARCHITECTURE.md)
as relationship authority. Made-Sick remains the general resource directory;
this section is a specific training exercise, not a replacement catalogue.

