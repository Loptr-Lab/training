# Project: MCP Build Spec: Training Repo — README.md

# Intent Reference: README.md

**Purpose:** Reference document for the MCP implementation agent. This describes the desired outcome for README.md, not a literal file to copy. The MCP should adapt paths, link targets, and structure to match whatever it finds in the actual repository.

---

## Design intent

README.md should be a concise routing table. It answers "what is this and where do I go?" and nothing else. It should not reproduce training material, funding tables, device comparisons, prompt libraries, or the case study.

## Target content (adapt to actual repo structure)

- **Title and one-line description:** what the project is and who it's for.
- **Quick-start links:** one link per major section (homepage/orientation, tracks, accessibility, technology planning, funding, MCP prompts, templates, worked example). Use whatever paths the MCP determines are correct after inspecting the repo.
- **Scope disclaimer:** educational information and preparation tools only. Does not determine eligibility, guarantee funding, or replace qualified professional advice. Rules, prices, and eligibility can change.
- **Privacy warning:** share functional needs and vocational tasks, not credentials, government IDs, case numbers, or confidential documents.
- **Contributing link:** if a CONTRIBUTING.md exists or is created.

## What does NOT belong in README

- Full training lessons or curriculum content
- Agency rules, eligibility details, or program-specific information
- Device comparisons, prices, or specifications
- Detailed prompts or prompt instructions
- The case study narrative
- Duplicate navigation that competes with the homepage

## Predecessor files

The repo may contain `START-HERE.md` and/or `INDEPENDENT-CREATOR-GUIDE.md`. These are predecessors to the new architecture. The MCP should inspect their content, migrate anything substantive into the appropriate new location, and remove or redirect the originals so there are no competing entry points.
