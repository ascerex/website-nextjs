# Ascerex Skyway Source Brief

## Purpose

This document consolidates the Skyway's origins, intended role, engineering
development sequence, current implementation state, future plans, and evidence
boundaries. It is source material for deciding what the public Skyway page
should contain. It does not prescribe a page design, information hierarchy, or
specific marketing copy.

Current engineering documents take precedence over historical project notes.
Historical material is included to preserve the reasoning and ambitions that
produced the current concept, but it is not evidence that a proposed feature or
operating model has been implemented, validated, approved, or adopted as a
program requirement.

## Terminology

- **Skyway** is the current public and engineering name.
- **SkyWay** appears in some historical documents and refers to the same broad
  concept.
- **Project Omega** is a historical/internal project name. Public material
  should use **Ascerex**, **Skyway**, and **Orbiter** unless historical context
  is explicitly necessary.
- **Skyway infrastructure** means the network itself: topology, corridors,
  nodes, layers, transitions, rules, constraints, and versioned snapshots.
- **Skyway navigation** means determining an eligible route through a supplied
  network for a declared vehicle capability profile and scenario.
- **The Orbiter** is the vehicle-facing part of the Ascerex system. The Skyway
  is the operating-network and infrastructure-facing part.

## Origin of the concept

The Skyway originated from the idea that future aerial mobility cannot rely on
every vehicle independently selecting a path through an unrestricted volume of
airspace. As the number and variety of aircraft increase, coordination,
congestion, noise, route conflicts, community effects, operating permissions,
and contingency management become interconnected system problems.

The concept therefore begins with infrastructure rather than unrestricted
free flight. It proposes an explicit operating structure containing routes or
corridors, entry and exit interfaces, merges, branches, altitude layers,
transitions, restrictions, and rules for participating vehicles.

The Skyway was also conceived as broader than an air-taxi route map. Its role
is to connect four areas that cannot be developed responsibly in isolation:

1. the vehicle and its demonstrated capabilities;
2. the network and its operating constraints;
3. navigation and future autonomous operation; and
4. governance, authorization, safety, privacy, and accountability.

The original strategic idea was that a structured network could make movement
more predictable and operationally legible than unconstrained free flight.
Whether it can achieve that outcome in the real world remains an engineering,
operational, regulatory, and public-acceptance question.

## Intended Skyway system

The proposed Skyway is a structured, vehicle-aware aerial operating network.
Its intended logical components include:

- directed routes and corridors;
- nodes and waypoints;
- entry and exit interfaces;
- branches, merges, and route transitions;
- altitude layers and transitions between layers;
- primary, alternate, reserve, and diversion structures;
- route-access and operating rules;
- vehicle-capability eligibility rules;
- capacity and separation constraints;
- geographic, environmental, and operational restriction overlays;
- constraint-aware route computation;
- degraded-operation and contingency behavior;
- network and vehicle communication interfaces;
- governance, authorization, privacy, audit, and accountability interfaces.

The concept is a network and operational framework, not merely a map. A line
drawn between two points does not establish a usable route. A usable network
would also need directionality, eligibility, capacity, availability,
transitions, restrictions, source currency, operating rules, and contingency
behavior.

## Core dependency: the network is vehicle-aware

Vehicle performance and capability are inputs to network design and route
eligibility. The presence of a route does not imply that every vehicle or every
Orbiter configuration may use it.

A future eligibility decision may need information about:

- allowed operating or route classes;
- altitude and environmental envelope;
- speed, climb, descent, and turning capability;
- energy state and reserve policy;
- dimensions or mass classification where relevant;
- communications, navigation, surveillance, or equipment capability;
- current configuration and degradation state;
- provenance, version, and evidence status of the capability declaration.

Unknown or absent capability information must not be interpreted as
permission. If an access rule requires information that is unavailable, the
affected route element should remain ineligible or the result should remain
indeterminate.

This relationship is bidirectional. Vehicle capability constrains network
access, while Skyway structure and operating rules create requirements for the
vehicle, communications system, navigation system, autonomy system, and
verification program.

## Overall development sequence

The current engineering structure separates Skyway work into two main phases.
Historical page material described three stages—defining the framework,
researching network generation, and developing pathfinding—but current
engineering requirements group framework definition and network generation
under Phase 1 infrastructure.

### Phase 1: infrastructure

Phase 1 defines, constructs, validates, compares, and exports versioned Skyway
network snapshots. Its purpose is to give later navigation work a controlled
input without allowing navigation code to invent topology, rules, units, or
vehicle eligibility.

Phase 1 work includes:

- defining a logical network schema;
- researching existing-aviation interfaces and limitations;
- creating hand-authored synthetic fixtures;
- representing directed corridors, nodes, layers, and transitions;
- representing rules and constraint references;
- preserving evidence status and provenance;
- applying restrictions without mutating the base network;
- generating bounded synthetic candidate networks;
- comparing network hypotheses under supplied objectives;
- testing redundancy, failures, capacity, directionality, and merge policies;
- producing deterministic plan and altitude/layer visualizations; and
- exporting immutable network snapshots for navigation research.

Phase 1 does not choose real corridors, publish operating altitudes, control
traffic, guide aircraft, or establish regulatory approval.

### Phase 2: navigation

Phase 2 consumes a supplied, validated Phase 1 network and computes an eligible
route for a declared vehicle capability profile and scenario.

The intended offline navigation workflow is:

1. load and validate a versioned network snapshot;
2. load and validate a versioned vehicle capability profile;
3. apply access and operating rules;
4. exclude ineligible nodes, edges, layers, and transitions;
5. apply versioned closures or restriction overlays;
6. calculate a least-cost path over eligible directed elements;
7. return the route and its cost composition; and
8. preserve an explanation trace containing inputs, versions, exclusions, and
   reason codes.

The intended result states are:

- `ROUTE_FOUND`: a path exists for the supplied synthetic/test inputs;
- `NO_ROUTE`: the inputs are valid but no eligible connected path exists;
- `INVALID_INPUT`: required network or request data is invalid or incomplete;
- `UNSUPPORTED_VERSION`: an input cannot be safely interpreted; and
- `INDETERMINATE`: missing data or unsupported behavior prevents a justified
  result.

A computed route would be a software result for the stated inputs. It would not
by itself establish safe separation, authorized airspace access, validated
navigation, or vehicle feasibility.

### Later integration and validation

Work beyond the two offline prototype phases would require separate approved
requirements and evidence. Potential later work includes:

- qualified geographic and airspace-data ingestion;
- vehicle capability integration;
- traffic demand and capacity modeling;
- separation and merge-policy research;
- weather and temporary-restriction handling;
- conventional-aircraft awareness;
- communications and operational-intent exchange;
- contingency and degraded-operation logic;
- simulation with representative vehicle models and traffic scenarios;
- autonomy integration;
- subsystem and integrated physical testing;
- regulatory, safety, privacy, security, and operating-approval work.

None of those later capabilities should be described as currently implemented
unless a newer approved source establishes otherwise.

## Phase 1 network contract

A Phase 1 network snapshot is intended to contain stable, versioned records for:

- network identity, schema, creation method, provenance, and input versions;
- coordinate and vertical reference systems with units;
- nodes with explicit roles;
- directed edges with explicit origins and destinations;
- route or corridor membership;
- altitude layers;
- transitions between routes or layers;
- referenced access and operating rules;
- capacity values or an explicit `UNKNOWN` state;
- separately versioned restriction overlays; and
- a derivation trace identifying sources, inputs, generator version,
  parameters, exclusions, validation results, and warnings.

Important contract principles include:

- physical quantities carry units;
- connections are explicit rather than inferred from visual proximity;
- missing capacity is unknown rather than unlimited;
- unsupported constraints do not get silently ignored;
- infeasible cases return explicit reasons rather than relaxing hard
  constraints;
- overlays do not mutate the versioned base snapshot;
- identical inputs and versions produce deterministic or canonically
  equivalent outputs; and
- hand-authored and generated networks conform to the same contract.

## Network architecture research topics

The Phase 1 research program is intended to compare architectures and policies
rather than assume a single network form from the beginning.

Topics identified for comparison include:

- stable redundant backbones versus fully on-demand networks;
- hybrid systems with stable structure and dynamically activated segments;
- distance-based altitude organization versus fixed-layer alternatives;
- predetermined versus dynamically enabled merge zones;
- one-way flow, separated opposing flow, and supported time-dependent flow;
- primary, alternate, reserve, and diversion structures;
- network behavior under corridor failures;
- static load assignment and declared capacity;
- terminal-dependent versus terminal-neutral network design; and
- exact bounded solvers as references for comparing scalable heuristics.

No production topology, generation algorithm, altitude policy, merge policy,
capacity rule, or separation model has been selected.

## Current implementation state

The private computational workspace contains an experimental Phase 1 prototype.
The implementation currently includes:

- an experimental versioned network schema;
- immutable network, layer, node, edge, rule, capacity, provenance, and
  derivation records;
- strict serialization and validation;
- sparse directed adjacency;
- checks for duplicate identifiers and dangling references;
- checks for directionality, units, rule references, and supported versions;
- synthetic multi-level network fixtures;
- immutable restriction overlays;
- a deterministic bounded backbone generator;
- supplied distance-band and fixed-layer policy comparisons;
- merge-policy variants;
- explicit primary, alternate, reserve, diversion, and transition roles;
- bounded exact and greedy comparison methods for small synthetic cases;
- static failure and load stress checks; and
- deterministic SVG plan and altitude/layer views generated from the same
  versioned snapshot.

The current implementation does not include:

- real geographic topology;
- production-scale network generation;
- Phase 2 pathfinding as an operational capability;
- live airspace, traffic, weather, or restriction feeds;
- traffic simulation or real-time deconfliction;
- approved capacity, separation, noise, or safety thresholds;
- vehicle guidance or autonomous maneuver execution;
- certification or operational authorization.

## Terminal-neutral reference result

One current research artifact asks whether the Phase 1 contract can represent
and visualize a layered backbone without assuming an entry, exit, terminal, or
landing location.

The synthetic reference contains:

- three provisional altitude layers;
- nine non-access nodes;
- ten directed edges;
- climb and descent transitions;
- a branch and a merge;
- primary and alternate paths; and
- one reserve cross-link.

The snapshot validates and round-trips with zero entry, exit, or terminal
interface nodes. Its SVG is derived from the exact same snapshot and preserves
network, layer, node, edge, role, unit, version, and evidence metadata.

The result is:

> SOFTWARE CONTRACT PASS / ENGINEERING SUITABILITY UNKNOWN.

This demonstrates that the upper-network representation can remain independent
of a later decision between fixed terminals, candidate sites, or distributed
access. It does not establish that the displayed network, paths, or altitude
values are suitable for real operations. The displayed altitude values are
arbitrary fixture values used only to make transitions visible.

## Existing-aviation research

The current source catalogue asks what existing United States aviation
structures, data products, interoperability limits, and review processes a
future Skyway study would need to represent as an addition to—not a replacement
for—the National Airspace System.

Candidate source areas identified through FAA material include:

- controlled airspace, charted routes, fixes, and procedures;
- airports, heliports, and possible future terminal interfaces;
- special-use airspace;
- NOTAMs and temporary flight restrictions;
- known obstacle data;
- surveillance and ADS-B coverage limitations;
- SWIM and other information-exchange interfaces;
- aviation weather products;
- infrastructure and facility review processes;
- environmental review and community engagement; and
- controlled FAA orders and effective-date management.

The research establishes several important principles:

1. A future Skyway must study coexistence with existing aviation structures.
2. Static, periodically updated, and dynamic information require separate
   contracts and freshness handling.
3. Missing, stale, inaccessible, or out-of-coverage information remains
   unknown; it does not mean an area is clear.
4. Surveillance awareness is limited by equipment, terrain, coverage, latency,
   availability, and failure.
5. Public data interfaces are research candidates until their suitability,
   licensing, availability, and assurance requirements are qualified.
6. Terminal review and route review affect each other, even though the
   upper-network contract can remain terminal-neutral.

No external source in the catalogue is currently ingested into the Phase 1
prototype. No location or operating region has been selected.

## Relationship to autonomy

The Skyway and the future autonomous pilot are separate but dependent systems.
The Skyway supplies topology, route rules, restrictions, and eligibility
conditions. A future autonomous pilot would use those inputs while operating a
specific vehicle within a specific, evidenced operating envelope.

Skyway navigation is not vehicle guidance or flight control. Finding a route
through a graph does not command the vehicle, manage its actuators, avoid
traffic in real time, or establish that the autonomous system can fly it.

Historical planning also proposes that Skyway design should reduce or prevent
conflicts structurally before relying on real-time collision avoidance. That
remains a design objective, not a demonstrated result.

## Historical operating-tier concept

Historical project work explored a stratified operating model with distinct
risk and control profiles:

- public or shared Skyway lanes for general passenger, civilian, cargo, or
  transit activity;
- permissioned performance or pilot lanes for qualified operators and
  compatible vehicle configurations; and
- segregated experimental, sport, development, training, or racing areas.

The intended principle is that higher-performance or experimental activity
should not impose its risk profile on general public traffic. Historical work
also proposed that access could depend on the operator's authorization, the
vehicle's configuration and capability envelope, and the applicable onboard
safety or autonomy capability.

These tiers, names, permissions, boundaries, control-authority rules, licensing
models, and safety requirements are conceptual. They are not approved airspace
classes or current Ascerex operating capabilities.

## Governance and policy topics

A real Skyway would require technical development and governance development to
converge. Topics identified for future work include:

- airspace and operating authorization;
- vehicle and operator eligibility;
- accountability and audit records;
- data-sharing and interoperability;
- privacy and data minimization;
- cybersecurity and identity;
- configuration signing and revocation;
- community and environmental review;
- liability and insurance;
- degraded-operation and emergency authority;
- certification and software assurance; and
- applicable local, state, federal, and international responsibilities.

The historical material does not establish answers to these questions. Policy
should not be presented as a substitute for engineering feasibility, and
engineering prototypes should not be presented as regulatory acceptance.

## Intended benefits and strategic significance

The concept is intended to investigate whether structured aerial operations
could provide:

- more predictable movement than unconstrained free flight;
- explicit compatibility between vehicles and routes;
- reduced coordination complexity through defined topology;
- clearer handling of entries, exits, merges, transitions, and diversions;
- a configuration-controlled interface between infrastructure and navigation;
- traceable rule and data provenance;
- a framework for comparing network architectures before deployment;
- a basis for integrating vehicles, navigation, autonomy, and governance; and
- separation between public transportation and higher-risk performance or
  experimental activity.

These are intended benefits and research goals. They have not been
demonstrated as operational outcomes.

## Major unresolved questions

The following remain open:

- canonical route, node, corridor, layer, transition, and overlay terminology;
- the geographic and three-dimensional representation;
- the vehicle capability fields and evidence needed for route access;
- production network-generation objectives and algorithms;
- routing cost components and priority rules;
- altitude, speed, direction, merge, and transition policies;
- separation, density, capacity, reservation, and deconfliction models;
- weather, traffic, obstacle, and restriction inputs;
- communications and network/vehicle interface protocols;
- failure, diversion, degraded-operation, and emergency behavior;
- terminal and distributed-access architecture;
- representative scale and performance targets;
- data licensing, currency, integrity, coverage, and retention requirements;
- security, privacy, identity, audit, and revocation mechanisms;
- community, environmental, regulatory, and approval paths;
- the relationship between public, performance, and experimental operating
  environments; and
- the evidence and assurance levels required before physical testing or
  operational claims.

## Public evidence boundaries

Public material may accurately say that Ascerex is developing or researching:

- a proposed structured aerial operating-network concept;
- a vehicle-aware network architecture;
- versioned synthetic infrastructure contracts;
- deterministic synthetic network generation;
- structural validation and restriction overlays;
- static failure and load research;
- deterministic visualization derived from versioned snapshots;
- candidate existing-aviation interfaces; and
- draft offline navigation requirements.

Public material must not imply that Ascerex currently has:

- approved or controlled airspace;
- real or designated Skyway routes;
- selected operating altitudes or separation minima;
- an operational traffic-management service;
- live traffic, weather, airspace, or restriction integration;
- production network generation or routing;
- demonstrated real-world capacity, safety, noise, or scalability outcomes;
- a certified vehicle-to-network capability model;
- operational autonomous flight control;
- regulatory approval, certification, or public deployment.

Avoid unqualified terms such as `validated`, `safe`, `certified`, `proven`,
`approved`, `operational`, or `flight-ready`. When presenting the existing
prototype, identify it as synthetic, offline, bounded, and experimental. Keep
software-contract results separate from engineering-suitability or operational
claims.

## Source hierarchy

The consolidated brief is based on the following source order:

### Current sources

- `docs/engineering/skyway/concept.md`
- `docs/engineering/skyway/phase-1-infrastructure-requirements.md`
- `docs/engineering/skyway/phase-2-navigation-requirements.md`
- `docs/engineering/skyway/existing-aviation-source-catalogue-v0.1.md`
- `docs/architecture/system-overview.md`
- `docs/program/status.md`
- `docs/website/claims-and-evidence.md`
- private Phase 1 source code, contracts, tests, and result artifacts under
  `dev-workspace/`

### Historical context

- `docs/project-history/ASCEREX_SKYWAY_FRAMEWORK.md`
- `docs/project-history/orbiter_human_piloting_tuning_and_skyway_framework.md`
- `docs/project-history/Project Omega — Vehicle, Skyway & Autonomous Pilot
  Development Framework.md`
- the current static `website/skyway.html`

Historical sources preserve intent and provenance. The current engineering and
claims documents control present status and acceptable public wording.
