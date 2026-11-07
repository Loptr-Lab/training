# Hybrid creative-technology track

## Work tasks

Combine code, interactive media, audio, video, design, automation, documentation, and production coordination into an integrated workflow.

## Required capabilities

- Interoperability across the selected tools and file formats
- Enough compute, memory, storage, and ports for the most demanding concurrent workflow
- A consistent accessibility layer across capture, creation, review, and delivery
- Versioning and provenance that distinguish source, generated, edited, approved, and published material

## Plan

Map the workflow stage by stage. Do not simply combine the preferred specifications from every other track. Identify the real concurrency, bottlenecks, handoffs, and accessible fallback paths, then test a representative end-to-end project.

## Optional resource: AT Toolbox — Learn AT Protocol with Apple Shortcuts

**Category:** AT Protocol / Apple Shortcuts / No-Code Automation. **Level:** Beginner to intermediate. Recommended for learners interested in open networks, digital identity, account portability, and no-code automation.

Explore AT Protocol identity, public records, and automation through Apple's Shortcuts app. AT Toolbox offers tools for experimenting with the technology behind Bluesky without needing to write code.

The [ATStore listing](https://atmosphereaccount.com/apps/at-toolbox) names `@attoolbox.baileytownsend.dev`. It advertises handle-to-DID lookup, record and profile changes, Bluesky posting, exports of account records and media, and custom Shortcuts workflows. These are provider claims, not independently tested capabilities or security guarantees.

[Developer overview and privacy information](https://attoolbox.baileytownsend.dev/) · [Apple App Store listing (U.S.)](https://apps.apple.com/us/app/at-toolbox/id6747999688).

**Apple devices and cost:** The U.S. App Store page reviewed 7 November 2026 lists US$2.99 with in-app purchases, iOS/iPadOS 18.5+, macOS 15.5+ on M1 or later, and visionOS 2.5+. It also marks macOS compatibility as not verified. Availability, price and requirements may vary by region or change; confirm on your device before purchasing. The app's accessibility features are not declared in that listing.

**Privacy:** The developer says no personal data is collected, describes on-device Keychain credential storage, and notes that AT Protocol actions make network requests and can publish public records. Apple's privacy label is developer-reported and not verified by Apple. These disclosures are not an independent security audit. Do not enter credentials or personal records for this exercise.

**Installation and Shortcut instructions: pending verification.** An account-free, read-only lookup in the current app has not been confirmed. Use the static exercise below; installing or buying AT Toolbox is optional and unnecessary.

**Third-party resource. Not developed, operated, or endorsed by Loptr Lab or PIXIE. Review permissions and privacy information before use.**

### Understanding Your AT Protocol Identity

**Goal:** explain the difference between a handle and a decentralized identifier (DID). No programming, account, installation or live network lookup is needed.

1. **Handle:** a readable, domain-shaped account name. Interfaces often display it with an `@`; the underlying handle has no `@`. A handle can change.
2. **DID:** a persistent account identifier beginning with `did:`. It identifies an account, not a verified real-world person.
3. **Read the fictional lookup:** input handle `example.test` → output DID `did:plc:example123`. Think of this as reading a prepared lookup result, not executing a Shortcut. Both values are instructional placeholders, not resolvable accounts; the DID is not a valid production identifier.
4. **Name the two values:** which is the handle, and which is the fictional DID? Explain what you learned from the mapping.
5. **Check the limit:** successful resolution does not independently verify someone's real-world identity. In real protocol validation, the current DID document must also link back to the handle; this static example does not perform that check.

For the underlying rules, see the official [handle specification](https://atproto.com/specs/handle) and [DID specification](https://atproto.com/specs/did). A stable DID can help separate account identity from a changeable handle or hosting location; portability depends on the DID method and supported migration procedure. No account is moved or backed up by this lesson.

### Check your understanding

In the fictional result above, identify the handle and DID. Does the lookup alone establish the account holder's real-world identity?

**Answer and explanation:** Handle: `example.test`. Fictional DID: `did:plc:example123`. No: the mapping links account identifiers; it does not prove a person's real-world identity.

**Self-check:** you can name each identifier and explain this limitation. If you reversed them, remember that the DID begins with `did:`. Re-read and try again at your own pace.

### Keep optional learning evidence with PIXIE

AT Toolbox helps people explore AT Protocol operations and build shortcuts. PIXIE helps contributors learn, document project work, and retain context across sessions. AT Toolbox is a complementary educational resource; no PIXIE integration is implemented here.

Write a short fictional practice artifact: the placeholder handle and DID, how they differ, your synthetic lookup result, one account-portability observation, and one limitation or uncertainty. Public records may be copied by others, so keep real personal records and credentials out of the artifact.

Use your existing [PIXIE contributor checkpoint and portfolio-evidence workflow](../pixie-contributors.html#work-to-evidence) if you choose to share it. Review public visibility and attribution before adding it to your existing GitHub issue. There is no new learner profile, progress store or automatic posting.
