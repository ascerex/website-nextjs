import type { Metadata } from "next";
import Image from "next/image";
import { Footer, Header, SkywayNetworkExplorer } from "@/components";
import styles from "./skyway.module.css";

export const metadata: Metadata = {
  title: "Skyway | Ascerex",
  description:
    "How Ascerex is researching a structured, vehicle-aware aerial operating network through synthetic infrastructure and navigation models.",
};

const developmentGroups = [
  {
    state: "Foundation implemented",
    title: "A network the software can trust",
    body: "Versioned network records, strict validation, synthetic fixtures, restriction layers, deterministic generation, and paired visual artifacts now establish the Phase 1 software foundation.",
    marker: "01",
  },
  {
    state: "Current research",
    title: "Which network structures hold up",
    body: "Bounded studies compare backbone structures, altitude policies, merge behavior, alternates, corridor failures, declared loads, and algorithmic approaches without selecting a production design.",
    marker: "02",
  },
  {
    state: "Future development",
    title: "From synthetic networks to operational evidence",
    body: "Later work must qualify geography, vehicle capabilities, traffic, weather, separation, capacity, communications, autonomy, governance, and physical operating constraints before real-world conclusions are possible.",
    marker: "03",
  },
];

const mappingStages = [
  {
    number: "01",
    title: "Define the operating problem",
    body: "Origins, destinations, travel distance, expected demand, and vehicle envelopes establish what the network must connect and support.",
  },
  {
    number: "02",
    title: "Build the constraint picture",
    body: "Existing routes and airspace, terrain, obstacles, facilities, environmental considerations, and exclusions bound where candidate structures may be studied.",
  },
  {
    number: "03",
    title: "Generate candidate structures",
    body: "Algorithms assemble corridors, direction, branches, merges, alternates, and altitude transitions without treating any generated layout as a selected design.",
  },
  {
    number: "04",
    title: "Compare operating hypotheses",
    body: "Distance-based altitude, fixed layers, speed relationships, merge policies, resilience, and declared loads are tested as explicit alternatives.",
  },
];

const navigationInputs = [
  {
    label: "Journey",
    value: "Current location + destination",
  },
  {
    label: "Aircraft",
    value: "Range, energy, altitude, speed, climb + equipment capability",
  },
  {
    label: "Network now",
    value: "Available routes, closures, traffic conditions + restrictions",
  },
  {
    label: "Environment",
    value: "Applicable weather, terrain + operating conditions",
  },
];

export default function SkywayPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="skyway-title">
          <Image
            className={styles.heroImage}
            src="/images/skywayHero.png"
            alt="Illustrative aerial network connecting cities across multiple altitude layers"
            fill
            priority
            sizes="100vw"
          />
          <div className={styles.heroShade} aria-hidden="true" />

          <div className={styles.heroContent}>
            <p className={styles.kicker}>COORDINATED AIRSPACE NETWORK</p>
            <h1 id="skyway-title">The Skyway</h1>
            <p className={styles.heroThesis}>
              Flight needs structure between departure and destination.
            </p>
            <p className={styles.heroSummary}>
              Ascerex is researching a vehicle-aware network of directed routes,
              altitude layers, transitions, and operating rules designed to make
              aerial movement computationally legible.
            </p>
            <a className={styles.primaryLink} href="#network-model">
              Enter the network <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className={styles.heroStatus}>
            <span className={styles.statusPulse} aria-hidden="true" />
            <div>
              <span>CURRENT DEVELOPMENT FOCUS</span>
              <strong>Synthetic infrastructure research & Route Mapping</strong>
            </div>
          </div>
        </section>

        <section className={styles.proposition} aria-labelledby="proposition-title">
          <div className={styles.propositionFrame}>
            <header>
              <p className={styles.kicker}>What the Skyway provides</p>
              <h2 id="proposition-title">A shared operating structure.</h2>
              <p>
                The Skyway is the operating logic between a requested journey
                and the aircraft that will perform it. As many vehicles with
                different capabilities share the same environment, it organizes
                their movement before autonomy has to solve every interaction
                alone.
              </p>
            </header>

            <div className={styles.propositionStatement}>
              <p>
                A destination does not produce a straight line through open
                air. It produces a journey through a network whose corridors,
                layers, transitions, and rules reflect the distance being
                traveled, the vehicle&apos;s demonstrated capabilities, and the
                conditions that exist at that moment.
              </p>
            </div>

            <dl className={styles.propositionOutcomes}>
              <div>
                <dt>Predictable movement</dt>
                <dd>Shared routes, direction, entries, exits, merges, and transitions give vehicles a common operating structure.</dd>
              </div>
              <div>
                <dt>Vehicle-aware access</dt>
                <dd>The network can distinguish between a path that exists and a path a particular aircraft can actually use.</dd>
              </div>
              <div>
                <dt>Alternatives under change</dt>
                <dd>Closures, restrictions, degraded capability, or changing conditions can alter the journey without erasing the underlying network.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.mapping} aria-labelledby="mapping-title">
          <div className={styles.sectionFrame}>
            <header className={styles.mappingHeader}>
              <p className={styles.kicker}>Mapping & simulation</p>
              <h2 id="mapping-title">From destinations to a network that can be tested.</h2>
              <p>
                Skyway research starts with the travel problem, adds the
                constraints already present in the world, generates candidate
                network structures, and compares how those structures behave.
              </p>
            </header>

            <div className={styles.mappingWorkbench}>
              <div className={styles.mappingVisual}>
                <svg
                  className={styles.mappingDiagram}
                  viewBox="0 0 760 520"
                  preserveAspectRatio="xMidYMid meet"
                  role="img"
                  aria-labelledby="mapping-svg-title mapping-svg-desc"
                >
                  <title id="mapping-svg-title">Layers used to construct a synthetic Skyway study</title>
                  <desc id="mapping-svg-desc">Existing aviation and geographic constraints shape candidate corridors connecting origins and destinations across operating layers.</desc>
                  <g className={styles.existingNetwork}>
                    <path d="M70 390C190 330 260 350 345 280S520 220 690 250" />
                    <path d="M110 150C230 205 310 185 420 125S585 85 690 115" />
                    <path d="M180 460L250 70M540 470L610 60" />
                  </g>
                  <g className={styles.mappingExclusions}>
                    <path d="M295 180L390 155L430 245L335 270Z" />
                    <circle cx="575" cy="330" r="48" />
                  </g>
                  <g className={styles.candidateNetwork}>
                    <path d="M95 420C205 405 255 305 330 300S470 350 535 270S625 170 680 92" />
                    <path d="M95 420C190 245 330 100 505 105S625 115 680 92" />
                    <path d="M436 313C465 245 510 175 505 105" />
                  </g>
                  <g className={styles.mappingPoints}>
                    <g transform="translate(95 420)"><circle r="11" /><text x="0" y="30" textAnchor="middle">ORIGIN</text></g>
                    <g transform="translate(680 92)"><circle r="11" /><text x="0" y="30" textAnchor="middle">DESTINATION</text></g>
                    <circle cx="436" cy="313" r="5" /><circle cx="505" cy="105" r="5" />
                  </g>
                  <g className={styles.mappingLayerLabels}>
                    <text x="40" y="55">DISTANCE / ALTITUDE / SPEED POLICY HYPOTHESES</text>
                    <text x="40" y="495">EXISTING ROUTES + GEOGRAPHY + EXCLUSIONS</text>
                  </g>
                </svg>

                <div className={styles.mappingLegend} aria-label="Candidate network line types">
                  <span><i className={styles.mappingLegendPrimary} />Candidate corridor A</span>
                  <span><i className={styles.mappingLegendAlternate} />Candidate corridor B</span>
                  <span><i className={styles.mappingLegendConnector} />Cross-network connector</span>
                </div>
                <p className={styles.mappingLegendNote}>
                  These are network links, not simultaneous directions for one vehicle.
                </p>
              </div>

              <ol className={styles.mappingStages}>
                {mappingStages.map((stage) => (
                  <li key={stage.title}>
                    <span>{stage.number}</span>
                    <div><h3>{stage.title}</h3><p>{stage.body}</p></div>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.simulationBoundary}>
              <strong>What can be tested now</strong>
              <p>Topology, explicit connections, exclusions, redundancy, corridor failures, declared loads, reproducibility, and bounded algorithm comparisons.</p>
              <strong>What comes later</strong>
              <p>Automatic traffic assignment, time-based vehicle movement, representative density, live conditions, separation behavior, and integrated autonomy simulation.</p>
            </div>

            <aside className={styles.coexistenceNote} aria-labelledby="coexistence-note-title">
              <div>
                <p className={styles.kicker}>Existing aviation enters the map</p>
                <h3 id="coexistence-note-title">The Skyway must fit the sky that already exists.</h3>
              </div>
              <div>
                <p>
                  Future geographic studies must place candidate Skyway
                  structures alongside controlled airspace, conventional routes
                  and traffic, terrain, weather, temporary restrictions,
                  facilities, and community requirements. These are mapping
                  constraints—not a separate consideration after the network is
                  drawn.
                </p>
                <span>Candidate sources catalogued // External data not yet ingested</span>
              </div>
            </aside>
          </div>
        </section>

        <section
          className={styles.networkModel}
          id="network-model"
          aria-labelledby="network-title"
        >
          <div className={styles.sectionFrame}>
            <header className={styles.networkHeader}>
              <p className={styles.kicker}>One trip // Changing conditions</p>
              <h2 id="network-title">See the Skyway respond.</h2>
              <p>
                Follow a single synthetic journey as a route becomes
                unavailable and the vehicle&apos;s own limitations determine which
                alternative can still be considered.
              </p>
            </header>
            <SkywayNetworkExplorer />
          </div>
        </section>

        <section className={styles.infrastructure} aria-labelledby="phase-one-title">
          <div className={styles.sectionFrame}>
            <header className={styles.programHeader}>
              <p className={styles.kicker}>Where development stands</p>
              <h2 id="phase-one-title">A working foundation. An unfinished system.</h2>
              <p>
                Phase 1 is functioning as a synthetic software research
                environment, but the wider engineering and operational problem
                remains open. The program is organized by what exists now, what
                is being investigated, and what must come later.
              </p>
            </header>

            <ol className={styles.phaseList}>
              {developmentGroups.map((group) => (
                <li key={group.title}>
                  <span className={styles.phaseNumber}>{group.marker}</span>
                  <div>
                    <span className={styles.phaseState}>{group.state}</span>
                    <h3>{group.title}</h3>
                    <p>{group.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.reference} aria-labelledby="reference-title">
          <div className={styles.referenceFrame}>
            <div className={styles.referenceCopy}>
              <p className={styles.kicker}>Current research artifact</p>
              <h2 id="reference-title">The model stays consistent as conditions change.</h2>
              <p>
                The current prototype can create a versioned synthetic network,
                preserve its underlying structure while restrictions change,
                and produce consistent software and visual representations from
                the same data.
              </p>
              <p>
                The terminal-neutral reference also demonstrates that the upper
                network can be studied without prematurely assuming where
                landing sites or access points must exist.
              </p>
              <div className={styles.verdict}>
                <span>Result</span>
                <strong>Software contract pass</strong>
                <small>Engineering suitability unknown</small>
              </div>
            </div>

            <div className={styles.referenceArtifact} aria-label="Synthetic reference summary">
              <div className={styles.artifactHeader}>
                <span>terminal-neutral-reference</span>
                <span>v0.2</span>
              </div>
              <dl>
                <div><dt>Layers</dt><dd>03</dd></div>
                <div><dt>Nodes</dt><dd>09</dd></div>
                <div><dt>Directed edges</dt><dd>10</dd></div>
                <div><dt>Access nodes</dt><dd>00</dd></div>
              </dl>
              <svg viewBox="0 0 600 270" role="img" aria-labelledby="artifact-svg-title artifact-svg-desc">
                <title id="artifact-svg-title">Terminal-neutral synthetic network</title>
                <desc id="artifact-svg-desc">Three connected layers with primary, alternate, reserve, climb, and descent paths.</desc>
                <g className={styles.artifactLayers}>
                  <path d="M35 54H565" /><path d="M35 135H565" /><path d="M35 216H565" />
                </g>
                <g className={styles.artifactPaths}>
                  <path d="M70 216L180 216L285 135L410 135L525 54" />
                  <path className={styles.alternatePath} d="M70 216L205 135L330 54L525 54" />
                  <path className={styles.reservePath} d="M180 216L410 135" />
                </g>
                <g className={styles.artifactNodes}>
                  {["70,216", "180,216", "205,135", "285,135", "330,54", "410,135", "525,54"].map((point) => {
                    const [cx, cy] = point.split(",");
                    return <circle key={point} cx={cx} cy={cy} r="5" />;
                  })}
                </g>
                <g className={styles.artifactLabels}>
                  <text x="18" y="45">LONG DISTANCE</text>
                  <text x="18" y="126">INTERMEDIATE</text>
                  <text x="18" y="207">LOCAL</text>
                </g>
              </svg>
              <div className={styles.artifactLegend} aria-label="Synthetic network path roles">
                <span><i className={styles.artifactLegendPrimary} />Primary path</span>
                <span><i className={styles.artifactLegendAlternate} />Alternate path</span>
                <span><i className={styles.artifactLegendReserve} />Reserve connector</span>
              </div>
              <p>
                Colored paths show alternative directed connections through the
                same synthetic network. The geometry and layers are arbitrary
                fixtures—not proposed routes or operating altitudes.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.navigation} aria-labelledby="navigation-title">
          <div className={styles.sectionFrame}>
            <header className={styles.programHeader}>
              <p className={styles.kicker}>Future navigation</p>
              <h2 id="navigation-title">Find a route the aircraft can actually use.</h2>
              <p>
                Future research will combine the Skyway, current restrictions,
                and an aircraft&apos;s demonstrated capabilities to determine an
                eligible journey—and explain when no justified route can be
                produced.
              </p>
            </header>

            <div className={styles.navigationFlow}>
              <dl className={styles.navigationInputs}>
                {navigationInputs.map((input, index) => (
                  <div key={input.label}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <dt>{input.label}</dt>
                    <dd>{input.value}</dd>
                  </div>
                ))}
              </dl>

              <div className={styles.navigationDecision}>
                <div aria-hidden="true">
                  <span>Requested journey</span>
                  <i>→</i>
                  <span>Usable network</span>
                  <i>→</i>
                  <span>Justified result</span>
                </div>
                <p>
                  The navigation process first removes paths that do not fit
                  the aircraft or current conditions. It then compares the
                  remaining alternatives and returns the usable journey with an
                  explanation—or an explicit no-route result when none can be
                  justified.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.systemLink} aria-labelledby="system-link-title">
          <div className={styles.systemCopy}>
            <div className={styles.systemRoute} aria-hidden="true">
              <span />
              <i />
              <span />
            </div>
            <div className={styles.systemHeading}>
              <p className={styles.kicker}>Next: Flight autonomy</p>
              <h2 id="system-link-title">The Skyway defines the routes. Autonomy handles the flight.</h2>
            </div>
            <div className={styles.systemNext}>
              <p>
                Within the Skyway&apos;s operating boundaries, the Pilot continuously
                controls and supervises the aircraft from departure through landing.
              </p>
              <a href="/pilot" className={styles.primaryLink}>
                Explore flight autonomy <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
