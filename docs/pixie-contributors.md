# PIXIE: join, contribute and resume

Updated 27 October 2026. One workflow across the existing ecosystem; GitHub holds shared contribution records.

[Open PIXIE](https://pixie-project-companion.ibloud-ivxx.chatgpt.site) · [Ecosystem](https://ecosystem.loptrlab.com) · [Training](https://loptr-lab.github.io/training/)

## Why we are testing PIXIE

Loptr Lab’s ecosystem is the testing ground for an open-source multimedia training studio. PIXIE is its contributor companion, helping people join, learn, coordinate work and return with context intact. Contributor testing is the immediate goal; a finished commercial app is not required before testing begins. Pilot evidence should inform a concrete project pitch and a sustainable revenue model consistent with the existing mission, open participation and project licenses.

Read the [owner-confirmed studio direction](https://github.com/ibloud/ibloud.github.io/blob/main/docs/ECOSYSTEM_ARCHITECTURE.md#studio-viability-pilot--owner-confirmed-direction-18-october-2026). This workflow is a pilot of contributor coordination, not evidence that public plugin distribution, studio viability or commercial readiness is complete. Record concrete contributions, learning outcomes, handoffs, repeated explanations and defects. Build the pitch from those findings, with business-model assumptions labeled as hypotheses.

## Current focus and assigned work

**One Companion. Specialized projects. No duplicate workflows.** Stabilize the
existing Companion before expanding functionality. The authoritative source is
[`Loptr-Lab/pixie-ecosystem-guide`, `apps/companion`, PR #5](https://github.com/Loptr-Lab/pixie-ecosystem-guide/pull/5).
Use its [current status](https://github.com/Loptr-Lab/pixie-ecosystem-guide/blob/main/COMPANION-HOSTING-STATUS.md)
for project responsibilities, verified checks and release blockers; training owns
onboarding, not a second application or deployment checklist. Creator OS overlap
must be reviewed before integration. The iCloud adapter remains separate. The older
Device Stewardship repository must not be archived without dependency/history
verification and approval.

[Holdings issue #18](https://github.com/ibloud/pixie-holdings/issues/18) is assigned
to **sweetytweety2406-wq**. Follow the
[maintainer's agreement](https://github.com/ibloud/pixie-holdings/issues/18#issuecomment-6436714216):
a historical Drive archive-mapper schema and workflow with synthetic examples only.
Do not duplicate the schema work, access private Drive data, or expand the task.
The contributor's small draft PR belongs in Holdings and should link issue #18;
maintainers review it against that agreement with concrete, file-specific feedback.
No corresponding draft was open at this update. Scope changes require maintainer
agreement, not another task or inferred permission.

## Contributor steps

1. **Start.** Open the existing PIXIE companion, choose a project and read its repository’s contribution instructions. Training is the default starting point.
2. **Choose a task.** Check existing assignments first; keep an agreed task in its existing issue. For unassigned work, use “How can I help?” for a bounded suggestion. Then choose “Join & coordinate” and describe the proposed task, progress, blocker and next action.
3. **Review and submit.** For an assigned issue, add progress there rather than opening a duplicate. For a new task, review the checkpoint draft and its public visibility. “Review & submit on GitHub” opens a prefilled issue in that project. You submit it using GitHub; PIXIE does not post automatically or enroll you.
4. **Agree scope.** Record maintainer agreement, time, credit and exit arrangements in the issue. A suggestion or issue does not itself assign a task or grant access.
5. **Keep coordinated.** Add progress comments with evidence, blockers and the next action. Keep the issue URL. GitHub holds the shared history.
6. **Resume.** In a later session, choose the same project, select “Resume my checkpoint” and paste the issue URL. PIXIE reads the current public issue and latest comment page. Open the full GitHub discussion for older comments.

## Remember your place on this device

Optionally choose “Remember this checkpoint on this device” in PIXIE. It stores only the public issue URL and project in this browser. “Forget saved link” removes that pointer; the GitHub issue remains. This does not synchronize across devices or sites.

## What persists

For the public checkpoint workflow, submitted GitHub issues and comments persist across sessions; its drafts require submission. PR #5 also implements a separate private project workspace with documented local/server persistence; that is not cross-device synchronization or a replacement for the assigned GitHub issue. PIXIE does not read private chat history, automatically remember your issue URL, create formal membership, grant repository access or collect email addresses. Keep private material out of public issues. Current open contribution is voluntary and unpaid.

## Source review and release boundary

Follow [CONTRIBUTING.md](../CONTRIBUTING.md) for the existing PR process. Companion
changes belong in its authoritative source, not training or Holdings. Inspect the
existing implementation, issue and instructions; state the verified problem,
reuse the implementation, make the smallest necessary change, run relevant checks
and report actual results and unverified claims. A passing check is not deployment
or merge authorization.

PR #5 remains unmerged. The existing Railway deployment blocker is authenticated
service access and verification of its identity, volume and runtime URL. The
[canonical release status](https://github.com/Loptr-Lab/pixie-ecosystem-guide/blob/main/COMPANION-HOSTING-STATUS.md)
links the already prepared configuration, acceptance checks and rollback; do not
copy or improvise those instructions here. Local restart tests and a static preview
do not establish Railway persistence, hosted MCP acceptance or physical iPad support.

Preserve the guide, ChatGPT Site, installed plugin, domains and existing source.
No new deployments, merges, Tangled synchronization, repository deletion/archival,
domain changes or plugin replacement are authorized by this update. Public plugin
release work in [training issue #42](https://github.com/Loptr-Lab/training/issues/42)
is historical follow-through, not the immediate contributor task or an instruction
to publish now.

## Current boundary

The companion website is public. ChatGPT plugin distribution remains private until the public release process completes. GitHub/AT Protocol membership signup and private participant storage are not implemented by this checkpoint workflow. This is shared project coordination using GitHub, not a claim of an integrated AetherOS system. Reported issue text is not accepted story canon or verified completion.

## Hosting and domain

Keep the existing repositories and domain. ecosystem.loptrlab.com remains the hub; training remains the contributor manual; the existing companion serves the workflow. A subdomain under an owned domain normally requires DNS configuration rather than another registration, subject to the DNS provider’s plan. Custom-domain setup does not publish the ChatGPT plugin. Do not repoint the existing ecosystem hostname or migrate MCP/OAuth addresses without testing their supported configuration.

## Source and maintenance

The [Companion README on its existing review branch](https://github.com/Loptr-Lab/pixie-ecosystem-guide/blob/creator-workspace/apps/companion/README.md) carries implementation commands and release details. Before editing, reconcile the actual deployed source and that GitHub source; do not assume automatic synchronization. Follow the [canonical ecosystem architecture](https://github.com/ibloud/ibloud.github.io/blob/main/docs/ECOSYSTEM_ARCHITECTURE.md) and [PIXIE interface track](PIXIE_ANNOUNCER_TRACK.md). Existing work is reused; failed retrieval is not proof of loss.
