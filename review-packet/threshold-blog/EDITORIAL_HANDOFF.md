# PIXIE blog draft: editorial handoff

Status: ready for Dominique's editorial review, not published to pixie.pckt.blog.
Prepared November 10, 2026. Intended publication: PIXIE / Urban Alien Adventures.

## Deliverables and next action

- `post.md`: full article, **Fifteen Minutes at the Threshold**. Review wording,
  byline and AI process note; paste into pckt using its existing editor.
- `threshold-nonlinearity.png`: original 1800×1170 mathematical figure; attach
  where the Markdown image sits. The SVG is the editable vector alternative.
- Alt text is supplied in `post.md`. Keep the adjacent text explanation and
  OpenStax link so the concept does not depend on seeing the graph.
- `plot.py` reproduces the figure using matplotlib/numpy. No comic panels,
  book covers, approved sigils or other third-party artwork were recreated.
- `build-preview.py` renders the authored Markdown for a Vercel review copy.
  It is a narrow editorial renderer, not a general Markdown library or runtime.

Before publication, open the stable reader URL in the article and confirm it
loads the released page. The preview substitutes its same-deployment reader;
never paste a temporary `_vercel_share` URL into the published article.
Replace the relative image Markdown with the image attached in pckt. Check
the published post's image, alt text, sources and reader CTA. Save its actual
permalink in the release record; no article URL should be guessed in advance.

The current user asked for a blog draft and separately authorized release of
Holdings and the reader after documentation/checks. No pckt article has been
submitted, scheduled or published. No publishing integration was added.

## Archive scan and source evidence

The public blog frontend and feed could not be fetched from this environment.
Instead, read-only AT Protocol discovery resolved `ibloud.xyz` to
`did:plc:b5uem672ci23lqrcz6j6bs2c`, whose DID service points to
`https://morel.us-east.host.bsky.network`.

The public `site.standard.publication/3m5orwxvvm2tq` record identifies
`https://pixie.pckt.blog` as **Urban Alien Adventures**. Scanned both pages of
`site.standard.document` records to the end cursor and selected matching
publication records. Read the full `textContent` of the following six articles
to assess actual editorial context; this is a text-record scan, not a visual
audit of the blog UI, comments, images or unpublished material.

| Published title | Date reported by record | Record key | Use |
| --- | --- | --- | --- |
| Designing Restraint : How We Build Games to Process Loss | 2026-07-01 | `3mplmonse4qi7` | Historical story/mechanics context; do not repeat its old stack/implementation claims as current capability. |
| PIXIE · Reversing the Feed | 2026-10-21 | `3myez55plcw5n` | Creative process, uncertainty and existing Department of Truth #16 reference. Creator account, not evidence of another artist's intent. |
| What Can an Artist Leave Behind? | 2026-10-20 | `3myclyqy33thb` | Keeping the maker's practical life visible; no new legal/historical claims imported. |
| Should We Build It or Bridge It? The MATO Problem and What Germ Network Changes | 2026-08-24 | `3mttykoxizhw6` | Established bridge between narrative and infrastructure; historical proposals are not treated as current integrations. |
| Reference Point: The Weaver's Year | 2026-07-26 | `3mrke33nz44ey` | Editorial preference for checking evidence; unrelated third-party biography excluded. |
| 1,000 Words | 2026-03-28 | `3mi4p7da46mxy` | Concise collective invitation; no direct quotation used. |

Original permalinks for the three articles used directly are embedded in
`post.md`; the record identity is
`at://did:plc:b5uem672ci23lqrcz6j6bs2c/site.standard.document/{record-key}`.
Read metadata with `com.atproto.repo.getRecord` on the DID's current PDS if
resuming later. Server-returned records were not cryptographically verified.
Published dates are source metadata, not independently authenticated authorship.

## New work, interpretation and boundaries

- Dominique supplied the fifteen-minute rhythm, book-club intention, art
  influence, programming/Zen theme and library-first access direction.
- The existing `THE_THRESHOLD.md` supplies the seven books and connections.
- AI drafted this article and the proposed story/design tasks under that
  direction. The first-person voice is an editorial draft for review, not an
  independently sourced account of Dominique's religious practice.
- “Zen of programming” is used as a personal practice metaphor, not Buddhist
  instruction, a claimed credential or a guaranteed educational/health outcome.
- The nonlinear-function discussion is an analogy. Ordinary 1+1 remains 2;
  Boolean OR uses a different operation; squaring does not preserve addition.
  f(x)=x² has derivative 2x. The plot does not measure learning or community growth.
- OpenStax's current differentiation-rules page and Open Library's borrowing
  FAQ were opened November 10. No availability promise is made for the seven
  books, and no purchase, affiliate scheme or membership requirement is added.
- No characters, plot events or game rules are accepted through this draft.

Publication is complete only when Dominique chooses to publish through pckt,
the actual post permalink is recorded, and the public reader CTA works.
