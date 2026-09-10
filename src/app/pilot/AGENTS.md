# Flight Autonomy Route Instructions

This directory contains the Ascerex Flight Autonomy / Autonomous Pilot page.

Before changing this route, read `STORYBOARD.md` completely.

## Source of truth

`STORYBOARD.md` defines the intended narrative, scene order, content hierarchy, and major interactions.

Do not preserve the existing page structure simply because it already exists. Reuse useful copy, assets, styles, and components only where they support the storyboard.

## Page responsibility

Flight Autonomy is the final operating and integration layer of the Vehicle + Skyway + Pilot system.

- Vehicle defines what the aircraft can physically do.
- Skyway defines where and under what operating rules it may travel.
- Pilot is the system that actually flies the aircraft.

Do not duplicate detailed Vehicle engineering or Skyway network research already presented on their respective pages.

Treat Vehicle capability and Skyway authority as upstream inputs to the Pilot.

The Pilot page should focus on autonomous aircraft operation: passenger accessibility, continuous flight control, state estimation, guidance, control, monitoring, bounded contingency response, reduction of human-error exposure, and the evidence required to justify autonomous authority.

## Site infrastructure

Continue using the existing global Ascerex Header, SubHeader/navigation, and Footer components.

Do not recreate, duplicate, or move global navigation into `pilot/_components`.

Keep global site chrome outside the page's cinematic GSAP timelines.

Use `pilot/_components` only for Flight-Autonomy-specific scene components.

## Scroll and animation

Use native browser scrolling.

Do not hijack wheel or touch input.
Do not block scrolling until animations complete.
Do not force full-screen scroll snapping.
Users must be able to move rapidly forward or backward.

Use GSAP + ScrollTrigger for major scroll-linked scenes.

Use scrubbed timelines when visual state should continuously correspond to scroll progress.

Do not store continuous scroll progress in React state. Use DOM/SVG refs and GSAP for frame-by-frame animation.

Use the existing generic `ScrollReveal` only for simple entrance effects where a cinematic timeline is unnecessary.

Prefer transform, opacity, SVG path progression, masks, and other lightweight composited effects.

Clean up GSAP contexts and ScrollTrigger instances on unmount.

## Design

This page is a continuous visual story, not a sequence of independent marketing sections.

Avoid repeating:

headline → paragraph → cards → next section

Avoid unnecessary card grids, walls of copy, decorative HUD clutter, meaningless reticles, and unexplained technical linework.

At every scroll position there should be one clear dominant idea.

Motion must communicate causality, system behavior, navigation, control, monitoring, or progression.

Preserve the established Ascerex dark visual language, restrained orange accent, technical linework, large typography, and spacious composition.

Avoid generic SaaS aesthetics, gratuitous glassmorphism, and excessive rounded cards.

## Engineering claims

Do not invent Ascerex capabilities, test results, validation milestones, specifications, certification progress, or implemented autonomy functionality.

Clearly distinguish proposed architecture and future development methodology from completed work.

Do not claim that autonomous operation is already safer than human piloting.

Frame accident reduction, reduced human-error exposure, and passenger accessibility as design objectives.

Vehicle limits and Skyway rules must remain authoritative constraints on autonomous behavior.

Do not portray the Pilot as unconstrained generative AI directly improvising flight controls.

## Responsive and accessibility

Desktop may use the full cinematic implementation.

Simplify choreography on smaller screens where necessary for layout and usability, but preserve the same narrative and visual identity.

Do not create a separate reduced-motion experience for this route. The Flight Autonomy page must use the same layout, content, assets, scroll choreography, and animation behavior regardless of the user's `prefers-reduced-motion` setting. Do not use `@media (prefers-reduced-motion: reduce)` or JavaScript media queries to disable, simplify, substitute, hide, or otherwise alter this page's animations or visual states. Remove any existing Pilot-page-specific reduced-motion overrides that conflict with this requirement.

## Completion

Before finishing, verify:

- native scrolling remains unrestricted
- reversing scroll direction feels natural
- pinned scenes release cleanly
- timelines do not compete or snap
- mobile remains usable
- reduced-motion remains understandable
- no dense content dumps were introduced
- Vehicle/Skyway concepts are not unnecessarily duplicated
- the implementation follows `STORYBOARD.md`
- applicable lint, tests, type checks, and build checks pass
