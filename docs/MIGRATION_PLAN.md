# Static Website to Next.js Migration Plan

**Status:** Approved by owner

**Prepared:** 2026-09-01

**Working branch:** `migration/modertn-stack-nextjs`

**Public source reference:** `../website/` on local branch `feautre/local-changes`

**Replacement:** this `website-nextjs/` repository

## 1. Objective and boundaries

Migrate the approved public website experience from the static `website/`
repository into this Next.js application without silently changing approved
content, overstating technical progress, or treating experimental pages as
launch requirements. The replacement remains non-public until a separate
cutover decision is approved.

This plan follows:

- `../AGENTS.md` and this repository's `AGENTS.md`;
- `../docs/architecture/website.md` for roles and parity criteria;
- `../docs/website/content-architecture.md` for page responsibilities;
- `../docs/website/claims-and-evidence.md` for public claim language; and
- `../docs/program/status.md` for current program state.

Out of scope without separate approval: pushing or merging branches,
reconfiguring Git remotes, deployment setup, production cutover, publishing
private documentation, inventing technical results, and reviving `tinkersite/`.

## 2. Verified starting point

### Repository state

- `website-nextjs/` is a separate local Git repository with one committed
  scaffold commit and substantial uncommitted modernization work preserved on
  the working branch above.
- The requested branch did not exist locally in either repository, so it was
  created in `website-nextjs/` with the exact requested spelling.
- Contrary to `../docs/architecture/website.md`, this local repository currently
  has an `origin` pointing to the public `website.git` repository. No remote
  operation or configuration change is authorized by this plan.
- `website/` currently uses `feautre/local-changes`; its untracked mission tests
  and media are references or experiments, not automatically approved inputs.

### Implemented Next.js surface

- Next.js 16, React 19, TypeScript, Mantine 8, and ESLint are installed.
- `/` and shared `Header`, `HeroSection`, and `Footer` components exist.
- Linked detail routes do not exist yet.
- The README is still the generated Create Next App text.
- The current lint baseline fails in `Header.tsx` because state is synchronously
  updated inside an effect; `HeroSection.tsx` also has an unused import warning.
- `public/` is about 158 MB. Twenty-seven asset hashes match files in
  `website/assets/`, so asset ownership and migration need an explicit policy.

### Header defect

The current header stores `lastScrollY` in state and includes it in the effect
dependency list. Every small change in scroll direction can toggle visibility,
so momentum, touch bounce, or a one-pixel upward adjustment can slide the header
back in after a user has intentionally scrolled down. The effect also causes an
extra render cycle and violates the current React lint rule.

## 3. Route and behavior parity matrix

| Route | Static reference | Next.js status | Required review or behavior |
| --- | --- | --- | --- |
| `/` | `index.html` | In progress | Review four hero claims, responsive media, fallbacks, heading structure, and reduced motion. |
| `/mission` | `mission.html` | Implemented; browser review pending | Responsive system and policy diagrams are migrated with reviewed future-facing copy; complete browser and accessibility verification before cutover. |
| `/vehicle` | `vehicle.html` | Implemented; browser review pending | The approved vehicle presentation is now the primary route; carousel parity and final browser/accessibility review remain tracked in the carousel backlog. |
| `/skyway` | `skyway.html` | Missing; concept/design not ready | Defer until its public concept and design direction are approved; keep the network future-facing and dependent on vehicle capability. |
| `/pilot` | `pilot.html` | Missing; concept/design not ready | Defer until its public concept and design direction are approved; avoid implying implemented or validated autonomous flight. |
| `/investors` | `investors.html` | Missing | Migrate only approved organization and engagement information. |
| `/contact` | `contact.html` | Missing | Preserve public contact information and semantic interaction. |
| `/privacy-policy` | `privacy-policy.html` | Missing | Verify title, copy, links, and any analytics/privacy implications. |

The `mission-test*.html` files are excluded from parity until the owner selects
one as an approved replacement for `mission.html` and its claims are reviewed.

## 4. Migration sequence

### Phase 1 — Stabilize the shared shell

1. Replace the header's per-pixel state/effect loop with a scroll subscription
   that stores the last position in a ref and changes visibility only after a
   meaningful direction threshold.
2. Keep the header visible at the top of the page and while the mobile menu is
   open. Close the menu on navigation and Escape, expose its expanded/controlled
   state, and preserve keyboard focus behavior.
3. Respect `prefers-reduced-motion` for the header and homepage media/animation.
4. Move the shared shell into the root layout when route implementation makes
   that preferable, avoiding repeated client components on every page.
5. Remove current lint errors and warnings.

Acceptance:

- Continuous downward scrolling hides the header once and does not reveal it
  because of tiny scroll jitter or momentum.
- A deliberate upward scroll reveals it; returning near the top always reveals
  it; an open mobile menu cannot be hidden by scroll.
- Desktop and mobile navigation are keyboard operable and accurately announced.
- `npm run lint` passes.

### Phase 2 — Establish content and UI foundations

1. Create shared page-shell, section, media, status-label, and navigation
   components only where repeated use is verified.
2. Define central navigation and footer data to prevent route drift.
3. Add per-route metadata and a single semantic `h1` per page.
4. Define design tokens and responsive breakpoints in one documented location.
5. Establish media conventions for posters, alt text, decorative media,
   `next/image` use, video preload, and reduced-data/reduced-motion fallbacks.

Acceptance:

- Components preserve server/client boundaries and ship client JavaScript only
  for interaction.
- Shared primitives cover repeated patterns without forcing unlike pages into
  one abstraction.
- Focus, contrast, heading order, and responsive behavior have explicit checks.

### Phase 3 — Migrate the mission route

Implement `/mission` as the first content route because its static design is
already established. Review the copy against current claims guidance, then
translate the page structure and interactions into responsive React components.
The current SVG-based system diagram does not compress reliably; treat its
viewBox, labels, connector geometry, overflow, and mobile layout as a migration
defect to solve rather than behavior to preserve. Rebuild the policy carousel
with buttons, visible focus, deterministic state, and reduced-motion behavior.

Acceptance:

- `/mission` renders directly and through shared navigation with reviewed copy.
- The system diagram remains readable without clipping, overlap, or horizontal
  page overflow at narrow, medium, and wide widths; if the desktop geometry
  cannot remain legible on mobile, an accessible stacked representation is used.
- Carousel and diagram content are understandable with keyboard, pointer,
  touch, and screen-reader navigation, including reduced-motion behavior.

### Phase 4 — Migrate the vehicle route

The `/vehicle` route has been promoted from the approved preview presentation.
Its requirements-led development story and evidence-grounded propulsion gallery
remain subject to final browser review. Until approved public screening records
exist, gallery states must remain visibly scoped as screening summaries rather
than vehicle selections or family-wide findings.

Acceptance:

- No fictional or placeholder result can be mistaken for an Ascerex finding.
- Source-reported statements, Ascerex calculations, and unresolved questions
  are visually and semantically distinguishable when present.
- Carousel, expandable groups, and completed responsive layouts meet the shared
  accessibility checks; unfinished sections remain explicitly tracked.

### Phase 5 — Migrate supporting informational routes

Implement `/contact`, `/investors`, and `/privacy-policy`. Review the static
copy against each page role before migration; do not copy placeholder or
incorrect metadata merely for byte-for-byte parity.

Acceptance:

- All three routes render directly and through shared navigation.
- Page metadata, links, mobile layout, and keyboard navigation are verified.
- Privacy copy is reconciled with any actual analytics or tracking behavior.

### Phase 6 — Design and migrate deferred concept routes

Do not begin `/skyway` or `/pilot` implementation until their public concepts
and design direction are approved. Once ready, migrate them as future-facing
concept pages, retain dependency language, and revise statements that imply
validation, certification, safety, or completed implementation without evidence.

Acceptance:

- Approved design references and content outlines exist before implementation.
- Each public claim uses approved status language or links to an approved claim
  record before publication.
- Interactive content and media work with keyboard, pointer, and touch input at
  narrow, medium, and wide viewports.

### Phase 7 — Reconcile the homepage and assets

1. Review homepage copy after detail pages establish approved language.
2. Inventory each retained asset by route, purpose, source, license/ownership,
   fallback, and approximate size.
3. Keep one copy per required asset inside this application; do not import
   untracked experiments or unused media.
4. Optimize formats and loading based on measured visual/performance impact.
5. Document whether production will use repository assets or an approved asset
   host. Do not configure a host under this plan.

Acceptance:

- Every shipped asset has a consumer and documented fallback.
- No private or unapproved media is published.
- Homepage language is no stronger than the reviewed detail routes.

### Phase 8 — Documentation and verification gate

Replace the scaffold README and maintain:

- setup, scripts, stack, repository role, and source-of-truth rules;
- route/parity checklist with content-review status;
- component and design-token conventions;
- accessibility and responsive QA checklist;
- claims-review workflow linking canonical private owners without copying
  private content into the public repository;
- asset inventory/strategy; and
- deployment, rollback, and domain notes only after explicit approval.

For each phase, run `npm run lint`. Before describing a milestone as deployable,
also run `npm run build` and verify direct loading of every route. The final
parity review must cover desktop/mobile navigation, keyboard and focus behavior,
reduced motion, media fallbacks, interactive widgets, privacy behavior, and
content/claim status.

Acceptance:

- README and migration records describe the implementation that actually exists.
- The parity matrix has no unexplained omissions.
- Lint and build pass, required routes load directly, and no cutover is implied.

## 5. Documentation ownership

| Information | Canonical owner | Public-repository record |
| --- | --- | --- |
| Program status and blockers | `../docs/program/status.md` | Link and summarize only approved public wording. |
| Website roles and cutover criteria | `../docs/architecture/website.md` | This plan and README implementation notes. |
| Public claim rules | `../docs/website/claims-and-evidence.md` | Route-level review status; no private evidence copied. |
| Public page responsibilities | `../docs/website/content-architecture.md` | Parity matrix and route documentation. |
| Runtime/component behavior | Current code and checks | README, component comments only where behavior is non-obvious, and tests. |
| Asset usage | Application files and route consumers | Asset inventory with provenance and fallback. |

## 6. Owner approval gates and unresolved decisions

1. Confirm whether the exact branch spelling `modertn` should remain or be
   corrected to `modern` before any push is considered.
2. Decide which static branch/commit is the approved migration baseline; the
   current local `website/` branch includes work not merged to `main`.
3. Decide whether any `mission-test*.html` concept replaces `mission.html`.
4. Approve revised public wording for homepage autonomy and any mission,
   Skyway, or vehicle statements flagged by the claims review.
5. Decide whether demonstrative vehicle cards remain, are redesigned with an
   explicit demonstration label, or are omitted until evidence-backed records
   are approved.
6. Reconcile the unexpected `website.git` remote in this repository with the
   intended long-term source-control structure.
7. Approve deployment, rollback, domain, analytics, and production asset
   strategy separately before cutover work.

## 7. Immediate implementation slice after approval

The first bounded slice is Phase 1 only: fix and document header behavior,
remove the existing lint warning, add focused behavior coverage if the current
test stack supports it without premature infrastructure, run lint, and report
any remaining verification gap. Content migration is complete for `/mission`
and `/vehicle`; the next slice is the remaining supporting informational routes.
