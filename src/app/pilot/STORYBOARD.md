# Flight Autonomy — Scroll Narrative

## Experience goal

The Flight Autonomy page is the final layer in the Ascerex system story.

The three core pages should progress conceptually as:

**Vehicle → Skyway → Pilot**

**What can fly → Where it may travel → What actually flies it**

The Vehicle page owns aircraft capability and engineering development.

The Skyway page owns route/network structure, route eligibility, changing route conditions, and network-aware alternatives.

The Flight Autonomy page should not reteach either of those systems. It should show how the Pilot consumes them as authoritative inputs and turns them into safe, continuous aircraft operation.

The visitor should leave understanding three ideas:

1. Routine Orbiter travel is intended not to depend on every passenger manually flying the aircraft.
2. The Pilot continuously controls and supervises the aircraft throughout the complete mission.
3. Autonomous authority must be bounded by Vehicle capability, Skyway rules, observed state, and progressively stronger verification evidence.

The visual pacing should lean toward the restraint and clarity of Terafab, with selected cinematic choreography inspired by Joby's technology presentation.

Native scrolling must remain fast and freely reversible.

---

# Scene 00 — The Pilot

## Purpose

Establish why the Pilot exists before explaining how it works.

The visitor should immediately understand that the autonomy layer is what turns the Orbiter from an aircraft into transportation usable by ordinary travelers.

## Layout

Full-screen hero using the existing Flight Autonomy media treatment.

Continue using the existing global Header and SubHeader/navigation.

Do not recreate global navigation inside this route.

## Primary copy

**FLIGHT AUTONOMY**

# The Pilot

**You choose where.  
The Pilot handles how.**

Supporting copy should communicate briefly:

Ascerex is developing an autonomous flight system intended to operate the Orbiter from departure to arrival without making routine travel depend on passengers manually flying the aircraft.

Do not explain the internal autonomy architecture yet.

## Scroll behavior

Approximate scene length: **100–130vh**

At 0%:

Large hero composition dominates.

At ~20%:

The thesis becomes visually dominant.

At ~40%:

Supporting copy reaches full clarity.

At ~55%:

Large hero typography begins drifting upward or receding.

At ~70%:

The Orbiter / system visual language begins emerging.

At ~85%:

Most explanatory hero copy has receded.

At 100%:

The visual focus has shifted from the promise to the system that makes it possible.

Transition directly into Scene 01 rather than hard-cutting to a new section.

---

# Scene 01 — From Aircraft to Transportation

## Purpose

Replace the old “Destination to Mission” sequence.

Do not recreate Skyway route planning, candidate-path generation, route restrictions, alternate-route selection, or detailed network-state logic here.

This scene should answer:

**What is missing after the Vehicle and Skyway exist?**

The answer is the Pilot.

## Core concept

**VEHICLE**  
Defines what the aircraft can do.

**SKYWAY**  
Defines where and under what rules it may travel.

**PILOT**  
Turns both into autonomous aircraft operation.

The visual should communicate:

**Vehicle + Skyway → Pilot → Flight**

without becoming a literal corporate flowchart.

## Behavior

Approximate scroll length: **150–190vh**

Use one restrained pinned composition.

### 0–25% — Vehicle

The Orbiter is the dominant object.

Label briefly:

**VEHICLE**

Secondary line:

Physical capability.

Avoid re-explaining propulsion, airframe, or engineering development.

### 25–50% — Skyway

Skyway linework or corridor structure enters around the Orbiter.

Label:

**SKYWAY**

Secondary line:

Operating space and rules.

Do not show candidate-path comparison or network optimization.

### 50–75% — Pilot

A third system layer forms.

Label:

**PILOT**

Secondary line:

Continuous autonomous operation.

Vehicle and Skyway become visually subordinate inputs rather than separate topics.

### 75–100% — Flight begins

The Pilot takes ownership of the final composition.

The Orbiter begins moving under controlled flight.

Primary payoff:

**The final layer is the one that flies.**

Transition directly into Scene 02.

---

# Scene 02 — One Pilot. Complete Flight.

## Purpose

Make this one of the page's primary cinematic scenes.

Show that one continuous autonomous system remains responsible across the complete flight rather than making the passenger manually manage different regimes.

Do not present the phases as five simultaneous cards.

## Behavior

Approximate scroll length: **280–320vh**

Pinned, scroll-scrubbed sequence.

Use one Orbiter and one evolving trajectory.

### 0–18% — Takeoff

**01 TAKEOFF**

Supporting concept:

Establish controlled vertical flight.

The Orbiter rises vertically.

### 18–35% — Transition

**02 TRANSITION**

Supporting concept:

Manage changing lift and control demand.

Vehicle orientation and trajectory evolve continuously.

### 35–65% — Route

**03 ROUTE**

Supporting concept:

Remain on the authorized Skyway path.

Keep Skyway treatment minimal. This is about aircraft operation, not route generation.

### 65–82% — Approach

**04 APPROACH**

Supporting concept:

Leave the route and prepare the aircraft for landing.

### 82–100% — Landing

**05 LANDING**

Supporting concept:

Complete or safely terminate the mission.

## Narrative emphasis

The point is not merely that flight has five phases.

The point is:

**One Pilot remains responsible through all of them.**

At the end, retain the Orbiter as the visual anchor for Scene 03.

---

# Scene 03 — The Control Loop

## Purpose

Replace the feel of a static “autonomy stack” diagram with a living closed-loop system.

Vehicle and Skyway should appear only as upstream authorities.

The focus is what the Pilot uniquely does continuously.

## Behavior

Approximate scroll length: **210–250vh**

Pinned sequence.

Begin with the Orbiter from Scene 02.

### 0–18% — Inputs

Introduce three restrained upstream inputs:

**VEHICLE**  
Capability and limits

**SKYWAY**  
Authorized route and operating rules

**ENVIRONMENT / AIRCRAFT STATE**  
Observed conditions and current vehicle state

Do not spend long re-explaining these domains.

### 18–36% — Sense

**SENSE**

Collect aircraft and environmental state.

### 36–52% — Understand

**UNDERSTAND**

Secondary engineering label:

State estimation

Determine where the aircraft is and what condition it is in.

### 52–68% — Plan

**PLAN**

Determine the next valid aircraft action within Vehicle and Skyway constraints.

### 68–84% — Control

**CONTROL**

Translate the plan into bounded flight-control and propulsion commands.

### 84–100% — Monitor

**MONITOR**

Compare expected and actual aircraft behavior.

Feed the observed result back into the loop.

The loop should visibly close.

## Main idea

The visitor should understand:

**The Pilot does not issue one command and hope it works. It continuously senses, estimates, plans, controls, monitors, and repeats.**

Do not depict the Pilot as an unconstrained AI black box.

---

# Scene 04 — Safety Is Continuous

## Purpose

Replace the old “When Reality Changes” rerouting sequence.

Do not demonstrate another Skyway closure with multiple alternate paths. The Skyway page already owns route availability and network-aware rerouting.

This scene should demonstrate continuous supervision of the aircraft itself.

## Core idea

A passenger may not notice anything has changed.

The Pilot should.

## Behavior

Approximate scroll length: **220–260vh**

Pinned sequence.

Begin with calm, nominal flight.

### 0–20% — Nominal

One Orbiter.

One clean trajectory.

Minimal instrumentation.

Label:

**NOMINAL**

### 20–35% — Deviation

A monitored aircraft-state value or expected-response indicator begins diverging.

Keep the fault conceptual unless the site has a specifically approved real scenario.

Reveal:

**DEVIATION DETECTED**

Do not invent a validated Ascerex failure mode.

### 35–52% — Detect

**DETECT**

The system recognizes that actual aircraft behavior no longer matches expected behavior.

### 52–70% — Contain

**CONTAIN**

The Pilot keeps commands bounded and prevents the response from becoming uncontrolled.

The visual should become calmer, not more chaotic.

### 70–86% — Reassess

**REASSESS**

The Pilot determines what safe control authority and mission options remain.

Skyway may appear only as an upstream constraint if needed.

Do not turn this into alternate-route visualization.

### 86–100% — Safe action

**SAFE ACTION**

The system transitions toward an appropriate bounded response.

Possible conceptual outcomes may include continuing under changed limits, slowing, holding, diverting, landing, or determining that continued flight is not justified.

Do not claim a specific response without a defined scenario.

## Primary payoff

**Safety isn't a reaction at the end.  
It's a loop running throughout the flight.**

Supporting copy may communicate:

The Pilot is being developed to reduce opportunities for human error by making continuous vehicle-state supervision and automated bounded response intrinsic to every flight.

Frame this as an engineering objective, not a proven safety result.

---

# Scene 05 — Authority Follows Evidence

## Purpose

After showing how much authority the Pilot could eventually hold, answer the obvious question:

**Why should the system be trusted with that authority?**

The pacing should deliberately become calmer and more engineering-oriented.

## Primary statement

**Authority follows evidence.**

## Design

Use one continuous development and verification rail rather than another grid.

Suggested progression:

**Simulation**

→

**Software-in-the-loop**

→

**Hardware-in-the-loop**

→

**Integrated Vehicle Testing**

→

**Flight Testing**

→

**Operational / Certification Evidence**

## Claim boundary

This represents a proposed development and verification progression.

Do not imply that Ascerex has completed stages that have not occurred.

Current program status and future stages must remain distinguishable.

## Animation

Approximate scene length: **160–200vh**

This scene does not need to remain fully pinned.

The rail may progressively build as the user scrolls.

Animations should support comprehension rather than spectacle.

## Main idea

**Increasingly consequential control authority requires increasingly strong verification evidence.**

---

# Scene 06 — The Passenger Experience

## Purpose

Return to the reason the Pilot exists.

The visitor has now seen the system complexity underneath autonomous flight.

The final scene removes that complexity from the passenger's perspective.

## Behavior

Approximate scroll length: **120–150vh**

Technical layers briefly coexist and then simplify away.

Remove, in a deliberate sequence:

aircraft-state instrumentation  
internal control-loop labels  
Vehicle-limit overlays  
Skyway operational detail  
engineering telemetry

Do not literally replay every prior animation backward.

This is a conceptual simplification.

The passenger-facing destination experience remains.

## Final copy

**The destination belongs to the traveler.  
The workload belongs to the system.**

Supporting concept:

The Vehicle defines what is physically possible.

The Skyway defines where travel is eligible.

The Pilot turns both into autonomous movement.

Then release naturally into the existing global Footer/navigation experience.

---

# Core autonomy objectives

These ideas may be communicated across the page, but do not present them as generic SaaS feature cards.

## Accessibility

Routine Orbiter travel is intended not to depend on every traveler becoming a manually trained pilot.

Do not state as a current legal fact that passengers will not require pilot licenses.

## Consistency

The Pilot is intended to execute within defined Vehicle and Skyway operating boundaries continuously and consistently.

## Safety

The Pilot is being developed to reduce exposure to avoidable human error through continuous aircraft-state monitoring and bounded automated response.

Do not claim demonstrated accident reduction or superior safety without supporting evidence.

---

# Motion rhythm

The page should not remain at maximum animation intensity.

Desired pacing:

**Scene 00** — promise  
**Scene 01** — integration  
**Scene 02** — motion  
**Scene 03** — technical revelation  
**Scene 04** — supervision / controlled tension  
**Scene 05** — calm engineering credibility  
**Scene 06** — simplification / resolution

Do not make every section equally animated.

---

# Interaction requirements

Major scroll-driven animation must follow native document scroll.

Fast downward scrolling must remain possible.

Fast upward scrolling must remain possible.

Do not intercept wheel events to control page position.

Do not require timelines to finish before scrolling continues.

Avoid mandatory scene snapping.

Use modest ScrollTrigger scrub smoothing rather than heavy lag.

Initial tuning range:

`0.5–0.9`

Adjust based on actual feel.

At each scroll position, show only the information relevant to that narrative beat.

A storyboard is a sequence of states over time, not a checklist of elements that should all remain visible simultaneously.

---

# Visual hierarchy

Remove decorative elements that do not communicate real meaning.

Do not add arbitrary:

reticles  
radar circles  
technical lines  
floating labels  
random route branches  
HUD marks

unless they correspond to an actual relationship, measurement, state, constraint, or control action being explained.

Prefer fewer elements with stronger causal relationships.

---

# Component direction

Keep global shared infrastructure global:

Header  
SubHeader / global navigation  
Footer  
generic reusable UI

Do not recreate these under this route.

Use:

`pilot/_components/`

for Flight-Autonomy-specific scene components.

Likely ownership may include:

`PilotHero`

`SystemIntegrationScene` or a replacement for the old `MissionPlanningScene`

`FlightSequence`

`PilotArchitectureScene`

`SafetySupervisionScene` or a replacement for the old `ContingencyScene`

`VerificationSequence`

`PassengerResolution`

Names may change if cleaner boundaries emerge.

Do not create dozens of tiny components merely to match individual storyboard beats.

A major cinematic scene should generally have one owner component and one coordinated GSAP timeline.

---

# Success condition

The page should feel like the final Ascerex system layer revealing itself.

The Vehicle page explains the machine.

The Skyway page explains the infrastructure.

The Pilot page explains what makes the two function as autonomous transportation.

A visitor should understand the core Flight Autonomy proposition by watching what happens even if they skim most supporting copy.

The result should not feel like a second Skyway page, a generic futuristic HUD, or technical documentation that happens to move.
