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
    positionClass: "architectureRequirements",
  },
  {
    id: "vehicle",
    number: "02",
    title: "Propulsion & Vehicle",
    subtitle: "Modeling, screening and integration",
    description:
      "Couples propulsion, aerodynamics, mass, energy, thermal behavior, controls, and packaging so an architecture is judged as an installed aircraft system.",
    positionClass: "architectureVehicle",
  },
  {
    id: "infrastructure",
    number: "03",
    title: "Skyway Infrastructure",
    subtitle: "Network structure and constraints",
    description:
      "Develops a structured network concept whose routes, capacity, access, and restrictions remain bounded by real vehicle capability and existing airspace.",
    positionClass: "architectureInfrastructure",
  },
  {
    id: "navigation",
    number: "04",
    title: "Skyway Navigation",
    subtitle: "Constraint-aware routing",
    description:
      "Turns the infrastructure model into route guidance that can account for restrictions, operating limits, alternates, and changing network conditions.",
    positionClass: "architectureNavigation",
  },
  {
    id: "autonomy",
    number: "05",
    title: "Autonomous Flight",
    subtitle: "Control, navigation and deconfliction",
    description:
      "Connects future vehicle control with Skyway navigation and cooperative traffic behavior. Its assurance case depends on the aircraft, network, and operating rules beneath it.",
    positionClass: "architectureAutonomy",
  },
  {
    id: "policy",
    number: "06",
    title: "Policy & Regulation",
    subtitle: "Safety, certification and approval context",
    description:
      "Introduces regulatory, safety, airspace, infrastructure, privacy, and operating-approval considerations at the requirements stage rather than after a system is designed.",
    positionClass: "architecturePolicy",
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
              <h2 id="architecture-title">One mission. Six dependent systems.</h2>
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
                      id="mission-flow-arrow"
                      markerWidth="8"
                      markerHeight="8"
                      refX="7"
                      refY="4"
                      orient="auto"
                    >
                      <path d="M0,0 L8,4 L0,8 Z" />
                    </marker>
                  </defs>
                  <path className={styles.feedbackLine} d="M350 52 C105 52 55 150 105 400" />
                  <path className={styles.feedbackLine} d="M450 52 C695 52 745 150 695 400" />
                  <path d="M180 418 L180 330" markerEnd="url(#mission-flow-arrow)" />
                  <path d="M238 275 L350 184" markerEnd="url(#mission-flow-arrow)" />
                  <path d="M620 418 L620 330" markerEnd="url(#mission-flow-arrow)" />
                  <path d="M562 275 L450 184" markerEnd="url(#mission-flow-arrow)" />
                  <path className={styles.crossLine} d="M245 438 C375 410 455 392 555 330" markerEnd="url(#mission-flow-arrow)" />
                  <path d="M400 127 L400 85" markerEnd="url(#mission-flow-arrow)" />
                </svg>

                <ol className={styles.architectureNodes}>
                  {architectureElements.map((element) => (
                    <li
                      key={element.id}
                      className={`${styles.architectureNode} ${styles[element.positionClass]}`}
                    >
                      <span>{element.number}</span>
                      <strong>{element.title}</strong>
                      <small>{element.subtitle}</small>
                    </li>
                  ))}
                </ol>
              </div>
              <figcaption>
                Development moves upward through the system and loops back when
                evidence changes a requirement, model, or operating assumption.
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
          <div className={styles.closingMark} aria-hidden="true">
            Ω
          </div>
          <div className={styles.closingContent}>
            <p className={styles.eyebrow}>Next: The Orbiter</p>
            <h2 id="closing-title">The mission begins with the vehicle.</h2>
            <p>
              Orbiter is the physical foundation of the Ascerex system: a
              compact aerial vehicle being developed around the requirements
              that personal flight places on payload, packaging, propulsion,
              energy, control, and safe operation.
            </p>
            <Link href="/vehicle" className={styles.vehicleLink}>
              Explore the vehicle
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
