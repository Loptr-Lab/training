# The Threshold
### A Newcomer's Primer — Loptr Lab / Veiled Dominion

`README.md` and `CANDIDATE.md` in this repo test whether you can build the
engine. This document is Phase 0's other half — the context that makes the
4-player build (and everything else in this world) make sense before you
touch a single test file.

If you're here because you're helping build the 4-player variant: read this
first. Then go cross the threshold.

---

## What This World Is About

Two ideas run under everything Loptr Lab makes:

1. **Restraint, not conquest.** Rebirth is the most powerful piece on the
   board and wins only by suppressing her own power. The game's whole
   design axiom is inverted from "more power wins."
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

## Design & Color Language

Full spec lives in the engine repo's `DESIGN_BIBLE.md` — this is the
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
