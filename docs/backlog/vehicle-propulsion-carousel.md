# Finish Vehicle Propulsion Carousel Interaction and Visual Parity

**Status:** Integrated into the primary `/vehicle` route; final interaction and
visual parity remain deferred until the page direction is approved.

## Context

The static reference is `../website/vehicle.html`, with behavior in
`../website/assets/js/main.js` and presentation in
`../website/assets/css/style.css`. The Next.js implementation is
`src/components/VehiclePropulsionGallery.tsx`, currently rendered by
`src/app/vehicle/page.tsx`.

The current records distinguish research families from bounded computational
studies. Their statuses and findings remain scoped to the evidence described;
they do not establish propulsion selection or physical validation.

## Research presentation

- The page introduces the records through three expandable illustrations:
  evidence organization, model application, and decision recording.
- Native disclosures keep supporting explanations available to keyboard and
  touch users without expanding the default reading length.
- Each card carries an explicit family/study kind. The two carousel shortcuts
  derive their counts and destinations from that same data; they retain the
  complete carousel and its status ordering.
- The original gate strip and its responsive CSS have been removed.
- Verify disclosure text fit, shortcut navigation, and card label placement at
  320 px, 768 px, and 1440 px. Browser verification remains pending.

## Required parity

- Preserve the original square-card proportions, centered card position, and
  partial edge-card previews.
- Match the original neutral black-and-white palette and status-corner
  treatment without decorative gradients or detached button chrome.
- Match card hover scaling, title displacement, reveal opacity and translation,
  and animated corner offsets.
- Reproduce the original character-scramble reveal, including its character
  set, progressive reveal, type/status timing, and delayed status start.
- Preserve navigation-field click behavior, delayed hover advancement,
  cooldown behavior, manual-scroll snapping, and responsive card widths.
- Preserve edge-card click-to-center before opening details.
- Close details when the active card is selected again.
- Keep the connector line aligned with the selected card while scrolling, and
  close details once the selected card leaves the visible region.
- Match the original expanding-details timing and quick fade when selections
  change.

## Quality requirements

- Keyboard focus and activation remain equivalent to pointer activation.
- Touch scrolling does not trigger desktop hover behavior.
- No page-level horizontal overflow at narrow, medium, or wide widths.
- Demonstrative labels cannot be mistaken for evidence-backed status.
- Focused regression coverage protects timing constants and interaction state.
- Compare static and Next.js versions visually at 375 px, 768 px, and 1440 px
  before closing.

## Completion gate

Address this after the other public routes have approved content structures and
initial frontend implementations, so carousel polish is evaluated within the
final site-wide visual system.
