# Project: MCP Build Spec: Training Repo — Directory Scaffold

# Intent Reference: Directory Architecture

**Purpose:** Reference document for the MCP implementation agent. This describes the desired directory structure and the purpose of each section. The MCP should adapt names, nesting, and paths to the repo's existing conventions. Do not create empty directories or placeholder files if the repo's tooling doesn't require them.

---

## Design intent

The directory structure follows the user journey, not a documentation taxonomy. Each top-level section corresponds to a step in the process: identify your track → identify accessibility needs → build a technology plan → find funding → research with MCP prompts → prepare your request → see a worked example.

## Sections and their purposes

### Tracks
Career-track modules. Each track covers: employment tasks, software/workflow requirements, compute requirements, accessibility considerations, minimum vs. preferred specs, and questions requiring individual assessment. Initial tracks: Software Development, Game Development, Video, Audio, Design, Hybrid/Creative Technology. Start with work tasks, not equipment brands.

### Accessibility
Reusable accessibility guidance organized by category: visual, screen reader, magnification, input/motor, cognitive/learning. Focuses on functional barriers and workplace tasks. Referenced from track pages rather than duplicated in each one. Does not request unnecessary medical information.

### Technology planning
The work-task-to-technology-plan method: vocational goal → work tasks → functional barriers → required capabilities → minimum configuration → preferred configuration → alternatives → cost/quotes. Distinguishes essential vs. preferred vs. optional.

### Funding
Jurisdiction-aware. Does not hard-code Minnesota into the architecture. Structure:
- A root README explaining the section
- A `jurisdictions/` tree (united-states/federal/, united-states/state/minnesota/ as the first worked implementation)
- A `program-research-template.md` that works for any jurisdiction
- Minnesota is the first populated jurisdiction because the worked example provides depth there
- Other jurisdictions are added later by following the template

Does not embed specific dollar amounts, device models, or program deadlines into the architecture itself. Those belong in dated, source-attributed documents.

### Prompts (MCP research library)
Dedicated prompt subsystem. Prompts for: safe research practices, finding programs, verifying eligibility, researching technology, comparing costs, building requests, auditing existing information, jurisdiction adaptation. Every prompt instructs the research agent to use current authoritative sources, provide source links and verification dates, distinguish confirmed facts from uncertainty, and say "unverified" rather than guessing. Framing line: "designed to make AI research more reliable, not to replace the agency that makes the decision."

### Templates
Reusable preparation templates: needs statement, equipment justification, training plan, quotes, counselor questions, approval packet, source-verification record. Usable independently of the worked example.

### Case study
Anonymized, real-world worked example titled "Worked Example: Accessible Creative-Technology Retraining." Broken into sequential documents (vocational goal → work tasks → accessibility requirements → technology assessment → funding research → approval packet → lessons learned). Based on an actual case with identifying details removed. Explicitly states it demonstrates a process, not a guarantee of eligibility or funding. Should have its own directory so someone can inspect the process one stage at a time. Must not be written as a named individual's case.

## Architecture rules

- Do not embed volatile data (prices, deadlines, device models, program rules) into the directory structure or navigation. Those go in dated, source-attributed content files.
- Do not duplicate content across sections. Reference it.
- Accessibility guidance is centralized and referenced from tracks, not copied into each track.
- The funding architecture must survive a jurisdiction change. Minnesota is the first implementation, not the architecture.
- Prompt files are self-contained and individually linkable.
- The case study directory mirrors the user journey so each stage can be inspected independently.
