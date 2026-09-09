# Finish Vehicle Propulsion Carousel Interaction and Visual Parity

**Status:** Integrated into the alternate Vehicle route; final interaction and
visual parity remain deferred until the page direction is approved.

## Context

The static reference is `../website/vehicle.html`, with behavior in
`../website/assets/js/main.js` and presentation in
`../website/assets/css/style.css`. The Next.js implementation is
`src/components/VehiclePropulsionGallery.tsx`, currently rendered by
`src/app/vehicle-preview/page.tsx`.

All cards must remain visibly classified as demonstrative UI examples, not
engineering candidates or results.

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
