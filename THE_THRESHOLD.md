# The Threshold
### A Newcomer's Primer — Loptr Lab / Veiled Dominion

`README.md` and `CANDIDATE.md` in this repo describe a standalone
systems exercise. This document is Phase 0's other half — the context that makes the
4-player build (and everything else in this world) make sense before you
touch a single test file.

If you're preparing for the training exercise, read this first. The canonical
four-player rules remain authoritative in the engine repository; [Duet](https://duet.loptrlab.com/)
is a separate accessibility experiment.

---

## What This World Is About

Two ideas run under everything Loptr Lab makes:

1. **Restraint, not conquest.** Rebirth is the most powerful piece on the
   board, and her mastery is expressed through restraint rather than conquest.
   The game's design axiom is inverted from "more power wins."
2. **Myth is just science nobody's finished decoding.** Nothing in this
   world is magic. It's unexplained mechanism, told the way people always
   tell unexplained mechanism — as legend.

If a design decision, a piece of lore, or a line of dialogue doesn't serve
one of those two ideas, it's probably not load-bearing to the world.

---

## Recommended Reading

**World & Philosophy**
- *Altered Carbon* — Richard K. Morgan. The direct reference point for
  IVXX: what a person becomes when their signal home is compromised.
- *Ancillary Justice* — Ann Leckie. Distributed identity and restraint
  exercised by an entity built to be a weapon.
- *Annihilation* — Jeff VanderMeer. What "Veiled" actually feels like
  from the inside — a boundary that changes what can be known past it.
- *The Left Hand of Darkness* — Ursula K. Le Guin. Myth functioning as
  working social technology, not decoration.
- *Children of Time* — Adrian Tchaikovsky. Asymmetric intelligence and
  power that doesn't resemble the power it replaced.

**Craft & Systems**
- *Rules of Play* — Katie Salen & Eric Zimmerman. The vocabulary for
  talking about win conditions, feedback loops, and asymmetric balance.
- *The Art of Game Design* — Jesse Schell. General systems-design
  grounding, useful before touching the Martyr's Boon economy curve.

---

## The Ecosystem Playlist

Not a soundtrack — a mood reference. What's actually playing in the
studio while this gets built:

- **Ren** — the throughline across this ecosystem already (see
  `living-room-poetry`, `ren-rhapsody`, `kujo-beatdown-beatsaber-map`).
  Raw, theatrical, unresolved tension — closest thing to a house sound.
- **Chelsea Wolfe** — doom-folk weight without spectacle. Rebirth's
  restraint, scored.
- **Emma Ruth Rundle** — slow-building, controlled intensity that never
  quite releases. The Radius of Ruin, audibly.
- **Zola Jesus** — cold, high-contrast, voice-as-instrument. Death's
  register.
- **Author & Punisher** — industrial machine-noise, one person operating
  built hardware. The solo-build-it-yourself spirit of this whole studio.
- **Hozier** — myth treated as lived, physical experience rather than
  metaphor. The "myth is science" thesis, in song form.

---

## Films We Think In

- **Alien (1979)** — the direct Ripley reference point for IVXX: a
  survivor running on training that was never built to let her rest.
- **Arrival** — communication as the actual plot mechanism, not a device.
  Relevant to anyone touching IVXX's damaged-array backstory.
- **Annihilation** — same DNA as the book above; visually, this is closer
  to how "Veiled" should read on screen than anything else on this list.
- **The Fountain** — cyclical rebirth treated as a real structural idea,
  not just a title.
- **Children of Men** — quiet, exhausted hope inside a collapsing system.
  The tone this world is aiming for over spectacle.
- **Ex Machina** — restraint and control from the position of the
  entity being contained, not the one containing it.

---

## Art reference

- **The Department of Truth #16** — informs the project’s art.
  Dominique reaffirmed this art reference on November 10, 2026. It already
  appears in the October 21, 2026 post [PIXIE · Reversing the Feed](https://pixie.pckt.blog/pixie-reversing-the-feed-hbqst4e).
  Keep it alongside the reading circle as visual research, rather than adding
  it to the seven-book sequence or treating its story as project canon.
- **Proposed application:** after viewing the issue in a lawful edition,
  record specific visual observations with page or panel locators. Discuss
  which observations could inform an original project art study, then review
  that study against the owning design bible and established brand assets.
  This is a proposed exercise, not a claim about particular panels or an
  instruction to reproduce the issue’s artwork.

## Design & Color Language

Full spec lives in the engine repo's `docs/design/DESIGN_BIBLE.md` — this is the
short version.

**Digital (web, Duet, sigils):**
```
--void: #050505
--text-primary: #e0e0e0
--text-muted: #666666
--the-light: #d4a853   /* the one accent color */
```

**Physical (tabletop, per `GAME_CRAFTER_SPEC.md`):**
```
Deep Obsidian Black:        #0D0C0E
Brutalist Concrete Charcoal: #1A191C
Blood Crimson:                #9E1B1B
Sterile Gold:                 #D4AF37
Industrial White:             #F5F5F7
```

Worth flagging: the digital accent (`--the-light`, `#d4a853`) and the
physical accent (`Sterile Gold`, `#D4AF37`) are close but not identical.
If both are meant to be "the same gold," one of them should probably be
corrected to match — that's a decision for `DESIGN_BIBLE.md`, not this
doc.

---

## Where This Leads

Once you've got the two ideas above (restraint over conquest, myth as
undecoded science) and the reading/watching/listening context here,
go to `README.md` in this repo for the actual graded exercise, or
straight to `Loptr-Lab/veiled-dominion-engine` if you're joining the
4-player build directly.

## Read for 15 minutes a day

Owner-confirmed direction, 10 November 2026: The Threshold is a daily reading
practice connecting books to our project, not simply a link back to Mayhem.
Read your chosen book for 15 minutes a day, at your own pace. Use a library,
a copy you own or an accessible edition; no purchase, subscription or project
membership is required. Audiobooks and text-to-speech are welcome. Pausing or
missing a day does not lock you out or erase your place.

After reading, keep your chapter/page/audio position and one observation. Ask
how it relates to an existing character, theme, story question or rule. Turn
that connection into a small original scene, storyboard, playtest question or
design note. Read first; the optional reflection can happen afterward.

The reader-facing page at `docs/threshold.html` projects the seven-book list
above and the proposed editorial tasks in `docs/threshold-reading-plan.json`.
The book list and established connections above remain the reading authority.
The supplemental tasks are proposals for original work, not accepted story
canon, summaries of specific chapters or permission to adapt protected text.

### From reading to original story work

1. **Read:** continue one book for 15 minutes; there is no assigned page quota.
2. **Notice:** record a chapter/page/audio position and an idea in your own words.
3. **Connect:** name the existing project element it illuminates. The reader page
   maps every book to its current project connection and a concrete proposed task.
4. **Draft:** prepare one original scene, storyboard or design note. Label new
   events, motives and relationships as proposals.
5. **Review:** check the owning story/rules source, source attribution and rights.
   Dominique decides what enters canon. Test any proposed mechanical change
   separately; a reading reflection never updates game state automatically.

Work through one selected book in daily sessions; switching books is optional.
There is no requirement to finish a novel in a week. At a convenient discussion
point, compare reflections and select a small draft to review. Keep a record of
what was accepted, revised or declined and why. This is the reading-circle
editorial loop, not an automatic publishing workflow. Public AT Protocol records
checked November 10 identify the existing [PIXIE / Urban Alien Adventures blog](https://pixie.pckt.blog/).
Reading-circle articles remain editorial proposals for that existing publication;
no article or automatic integration is published by this reader. Training owns
the reading programme; Mayhem supplies project
and participation context; Holdings links people to the reader.

## The reading circle

Start with your local public library and ask about interlibrary loans and
accessible editions. Search [Open Library](https://openlibrary.org/) for editions;
its catalogue does not guarantee a borrowable copy, and borrowing may require
an external account. Try resale bookstores, library sales or book exchanges
before buying new. Amazon is optional, after these routes, never required.

After reading, write a few sentences about what happened or what claim was
made, the detail supporting your interpretation, and a question you still have.
Use the reader’s sample comprehension questions to separate recall, evidence,
inference and application. Writing is optional and need not be shared.

[THRESHOLD_BOOK_CLUB.md](THRESHOLD_BOOK_CLUB.md) contains the asynchronous
rollout, facilitator format, contribution roles, review boundaries, maintenance
commands and release checks. It supplements this primer rather than replacing
the seven-book catalogue or the engine’s story and rule authority.
