import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components";
import { MissionPolicyExplorer } from "@/components/MissionPolicyExplorer";
import styles from "./mission.module.css";

export const metadata: Metadata = {
  title: "Mission | Ascerex",
  description:
    "Ascerex is developing the vehicle, infrastructure, autonomy, and policy framework required to make personal aerial mobility practical.",
};

const architectureElements = [
  {
    id: "requirements",
    number: "01",
    title: "Requirements & Constraints",
    subtitle: "Mission definition and operating envelope",
    description:
      "Defines the payload, geometry, safety, operating, energy, noise, and environmental boundaries against which every proposed system must be evaluated.",
    x: 180,
    y: 440,
  },
  {
    id: "vehicle",
    number: "02",
    title: "Propulsion & Vehicle",
    subtitle: "Modeling, screening and integration",
    description:
      "Couples propulsion, aerodynamics, mass, energy, thermal behavior, controls, and packaging so an architecture is judged as an installed aircraft system.",
    x: 180,
    y: 285,
  },
  {
    id: "infrastructure",
    number: "03",
    title: "Skyway Infrastructure",
    subtitle: "Network structure and constraints",
    description:
      "Develops a structured network concept whose routes, capacity, access, and restrictions remain bounded by real vehicle capability and existing airspace.",
    x: 620,
    y: 440,
  },
  {
    id: "navigation",
    number: "04",
    title: "Skyway Navigation",
    subtitle: "Constraint-aware routing",
    description:
      "Turns the infrastructure model into route guidance that can account for restrictions, operating limits, alternates, and changing network conditions.",
    x: 620,
    y: 285,
  },
  {
    id: "autonomy",
    number: "05",
    title: "Autonomous Flight",
    subtitle: "Control, navigation and deconfliction",
    description:
      "Connects future vehicle control with Skyway navigation and cooperative traffic behavior. Its assurance case depends on the aircraft, network, and operating rules beneath it.",
    x: 400,
    y: 155,
  },
  {
    id: "policy",
    number: "06",
    title: "Policy & Regulation",
    subtitle: "Safety, certification and approval context",
    description:
      "Introduces regulatory, safety, airspace, infrastructure, privacy, and operating-approval considerations at the requirements stage rather than after a system is designed.",
    x: 400,
    y: 43,
  },
];

export default function MissionPage() {
  return (
    <>
      <Header />
      <main className={styles.missionPage}>
        <section className={styles.hero} aria-labelledby="mission-title">
          <div className={styles.heroMedia} aria-hidden="true">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/nightstatic.png"
              disablePictureInPicture
            >
              <source src="/images/night.mp4" type="video/mp4" />
            </video>
          </div>
          <div className={styles.heroOverlay} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Mission</p>
            <h1 id="mission-title">ASCEREX</h1>
            <p>Ascend Earth — Revolutionize Exploration</p>
          </div>
        </section>

        <section className={styles.statement} aria-labelledby="statement-title">
          <div className={styles.statementFrame}>
            <header className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Mission statement</p>
              <h2 id="statement-title">Move flight from a system people use to a capability people possess.</h2>
            </header>

            <div className={styles.statementBody}>
              <p>
                History shows that many of the most consequential advances in
                transportation occur when mobility moves from centralized
                systems toward affordable, widespread individual access.
              </p>
              <p>
                On the ground, the transition from rail-based travel to the
                automobile enabled personal mobility at scale. Manufacturing,
                infrastructure, and operating rules evolved together until the
                vehicle became practical for everyday life.
              </p>
              <p>
                Aviation has not completed the same transition. It remains
                centered on large aircraft, fixed routes, specialized pilots,
                and infrastructure that keeps personal flight beyond ordinary
                daily use.
              </p>
              <p className={styles.statementConclusion}>
                Ascerex exists to pursue that next evolution: a compact aerial
                vehicle developed together with dedicated Skyway infrastructure,
                autonomous flight systems, and the policy framework required to
                make personal flight practical for families and individuals.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.architecture} aria-labelledby="architecture-title">
          <div className={styles.sectionFrame}>
            <header className={styles.centeredHeader}>
              <p className={styles.eyebrow}>Integrated system architecture</p>
              <h2 id="architecture-title">The mission requires an integrated system.</h2>
              <p>
                Ascerex develops the vehicle, Skyway, autonomy, and policy
                context as a coupled program. Computational studies test
                assumptions, expose incompatibilities, and define the evidence
                required before a configuration advances.
              </p>
            </header>

            <figure className={styles.architectureFigure}>
              <div className={styles.architectureCanvas}>
                <svg
                  className={styles.architectureConnectors}
                  viewBox="0 0 800 520"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <defs>
                    <marker
                      id="mission-flow-dot"
                      markerWidth="10"
                      markerHeight="10"
                      refX="5"
                      refY="5"
                      markerUnits="userSpaceOnUse"
                    >
                      <circle className={styles.flowDot} cx="5" cy="5" r="4" />
                    </marker>
                    <marker
                      id="mission-flow-dot-accent"
                      markerWidth="10"
                      markerHeight="10"
                      refX="5"
                      refY="5"
                      markerUnits="userSpaceOnUse"
                    >
                      <circle className={styles.flowDotAccent} cx="5" cy="5" r="4" />
                    </marker>
                  </defs>
                  {architectureElements.map((element) => (
                    <g
                      key={element.id}
                      className={styles.architectureNode}
                      transform={`translate(${element.x} ${element.y})`}
                    >
                      <rect x="-120" y="-42" width="240" height="84" />
                      <text className={styles.architectureNumber} x="-105" y="-24">
                        {element.number}
                      </text>
                      <text className={styles.architectureNodeTitle} x="0" y="-3">
                        {element.title}
                      </text>
                      <text className={styles.architectureNodeSubtitle} x="0" y="21">
                        {element.subtitle}
                      </text>
                    </g>
                  ))}

                  <g className={styles.architectureFlow}>
                    <path d="M180 398 L180 327" markerEnd="url(#mission-flow-dot)" />
                    <path d="M251 243 L329 197" markerEnd="url(#mission-flow-dot)" />
                    <path d="M620 398 L620 327" markerEnd="url(#mission-flow-dot)" />
                    <path d="M549 243 L471 197" markerEnd="url(#mission-flow-dot)" />
                    <path
                      className={styles.crossLine}
                      d="M300 440 L500 440"
                      markerEnd="url(#mission-flow-dot-accent)"
                    />
                    <path
                      className={styles.crossLine}
                      d="M300 285 L500 285"
                      markerEnd="url(#mission-flow-dot-accent)"
                    />
                    <path d="M400 113 L400 85" markerEnd="url(#mission-flow-dot)" />
                  </g>
                </svg>
              </div>
              <figcaption>
                Development moves upward through the system. New evidence can
                return any requirement, model, or operating assumption to review.
              </figcaption>
            </figure>

            <ol className={styles.architectureDetails}>
              {architectureElements.map((element) => (
                <li key={element.id}>
                  <span>{element.number}</span>
                  <div>
                    <h3>{element.title}</h3>
                    <p>{element.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className={styles.policy}
          id="policy-and-compliance"
          aria-labelledby="policy-title"
        >
          <div className={styles.sectionFrame}>
            <header className={styles.policyHeader}>
              <p className={styles.eyebrow}>Policy and regulatory alignment</p>
              <h2 id="policy-title">Approval constraints enter at the beginning.</h2>
              <div>
                <p>
                  Personal aerial mobility at scale would require coordinated
                  progress across airspace access, certification, operations,
                  infrastructure, safety governance, and public acceptance.
                </p>
                <p>
                  Ascerex treats those considerations as system requirements.
                  They shape what the vehicle, Skyway, and autonomy program must
                  eventually demonstrate; they are not claims of approval or
                  certification today.
                </p>
              </div>
            </header>

            <MissionPolicyExplorer />
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.closingContent}>
            <div className={styles.closingHeading}>
              <p className={styles.eyebrow}>Next: The Orbiter</p>
              <h2 id="closing-title">The mission begins with the vehicle.</h2>
            </div>
            <div className={styles.closingNext}>
              <p>
                The Orbiter is the vehicle at the center of Ascerex—built around
                the demands of personal flight.
              </p>
              <Link href="/vehicle" className={styles.vehicleLink}>
                Explore the vehicle
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
