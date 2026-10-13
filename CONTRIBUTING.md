# Contribute to Loptr Lab Training

**Build in public. Improve the work. Show the fix.**

Loptr Lab welcomes first-time developers, experienced engineers, accessibility reviewers, technical writers, and systems architects. You do **not** need an invitation, a personal email address, or access to production systems to participate in this public repository. A GitHub account is sufficient to propose changes.

We value direct, technically rigorous feedback. Criticism of code and architecture is welcome **when it is actionable and respectful**. Personal put-downs, dismissive speculation, and repetitive negative comments without evidence or a path forward do not help the project. You do not have to implement every fix yourself: a reproducible issue, failing test, minimal example, or specific patch proposal is valuable.

## Your first contribution — junior developers

1. Read the [README](README.md), [contributor safety and governance](CONTRIBUTOR_SAFETY_AND_GOVERNANCE.md), and the [training guide](docs/index.html).
2. Browse [open issues](https://github.com/Loptr-Lab/training/issues). Look for `good first issue`, `documentation`, or `accessibility` labels **if available**. If none exist, open an issue with one clearly scoped improvement.
3. Select a small change: fix a broken link, improve a confusing instruction, correct mobile reflow, add a missing label, or repair a reproducible defect.
4. Fork this repository on GitHub; create a descriptive branch in your fork.
5. Edit the source. For HTML pages in `docs/`, check page titles, shared CSS, relative links, mobile widths, keyboard navigation, and visible focus. Keep source Markdown and styled HTML consistent when both are present.
6. Preview the changed HTML using a local static server or a trusted preview of your own fork. GitHub's source viewer is **not** a rendered-site preview. The public site is [Loptr Lab Training](https://loptr-lab.github.io/training/); it reflects the published branch, not your unmerged changes.
7. Open a pull request against `Loptr-Lab/training:main`. Explain what changed, why, how you tested it, and any limitations. Screenshots are optional; never include private data.
8. Respond to review notes. A maintainer decides whether and when a change merges.

**No computer?** You can open an issue, inspect files, and propose documentation edits through GitHub's mobile web interface. You do not need an elaborate local toolchain for your first docs improvement.

## Senior engineers and architects

Skip the introductory steps if you know the workflow. Please contribute **verifiable engineering work**, not drive-by verdicts.

- State the defect or design risk, affected files/routes, reproduction steps, expected versus actual behavior, and impact.
- Propose the smallest safe correction, a testable alternative, or a scoped design issue. For significant architecture changes, discuss interfaces, failure modes, migration and rollback paths before replacing working systems.
- Preserve the work-led, accessibility-first information architecture. Do not substitute a favorite framework, hardware vendor, or stack without demonstrating a need.
- Avoid unrequested rewrites, dependency churn, speculative claims about deployment, or hidden changes to governance.
- Demonstrate outcomes with tests, source links, screenshots when useful, and a clear distinction between validated, proposed, and unverified work.

**Good review:** “At 320px, the comparison table overflows and hides the second column. Reproduce in Safari; I propose a scrollable table wrapper and a focus-visible cue, with the viewport test attached.”

**Not useful:** “This site is terrible. Rewrite everything.”

## The contribution contract

- **Privacy by default.** Use public GitHub issues and pull requests; don't collect personal email, health details, case files, benefits identifiers, passwords, private correspondence, or credentials. Never paste secrets into issues or logs.
- **Accessibility is a requirement.** Check semantic headings, text reflow, focus order, keyboard operation, assistive-technology labeling, contrast, and reduced-motion needs when relevant. Say explicitly what you did and did not test.
- **Be constructive, not unquestioning.** You may disagree strongly with a proposal or report a safety problem without providing code. Include evidence, impact, and an actionable next step when possible. Safety, harassment, privacy, and security concerns may be reported without publishing sensitive details or a public proof of concept.
- **Consent and scope.** Contributions are public proposals, not invitations to production access, paid employment, ownership, or official representation. Current open review work is voluntary and unpaid. Agree in writing before any scoped collaboration on time, boundaries, public disclosure, attribution, and exit arrangements. Paid work requires a separate agreement.
- **Maintainer review is final for this repository.** A PR is not a guarantee of acceptance, deployment, affiliation, or publication. Keep disagreements about the implementation rather than the person.
- **Respect licenses and rights.** Submit only work you have permission to contribute. Do not add third-party assets, recordings, branding, or private case evidence without documented authorization.

## PIXIE — optional contributor guidance and maintenance

[Visit PIXIE at Break This Build](https://break.loptrlab.com/) for an optional guided introduction to projects and contribution ideas. PIXIE is **not required** for participation: contributors may use this repository's issues and pull requests directly, without providing an email address or creating another account.

If PIXIE's guidance is confusing, inaccessible, outdated, broken, or links to the wrong project, please [open a public issue](https://github.com/Loptr-Lab/training/issues/new/choose) describing the affected page, steps to reproduce, expected behavior, and a proposed improvement. Mark it as a **PIXIE integration or documentation report** in the issue description so maintainers can triage it to the responsible project. This repository can track training-to-PIXIE link defects, but PIXIE's own maintainers and source repository remain responsible for changes to her application; a training issue does not authorize changing PIXIE's production deployment.

PIXIE may recommend public GitHub tasks, but does not grant repository access, assign maintainers, approve pull requests, or represent automatic synchronization with GitHub. Preserve human review, least-privilege access, accessibility, and privacy by default.

## What makes a useful issue?

Use the issue templates. Summarize the problem, link to the page or file, describe observed versus expected results, give reproduction steps where possible, and propose a measurable fix. Choose a concise issue title. For accessibility issues, identify the affected task rather than assuming a diagnosis.

## Pull request checklist

- [ ] My change has one clear purpose and links to an issue where appropriate.
- [ ] I checked affected internal links and relative paths.
- [ ] I reviewed readability, keyboard navigation, and mobile reflow where relevant.
- [ ] I reported actual testing and unverified claims separately.
- [ ] I included no private information, secrets, or unlicensed content.
- [ ] I understand that maintainer approval controls merging and publishing.

For detailed authorization and contributor safety expectations, read [Contributor Safety and Governance](CONTRIBUTOR_SAFETY_AND_GOVERNANCE.md).
