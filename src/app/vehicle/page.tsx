import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components";
import { VehiclePropulsionGallery } from "@/components/VehiclePropulsionGallery";
import styles from "./vehicle.module.css";

export const metadata: Metadata = {
  title: "Vehicle | Ascerex",
  description:
    "How Ascerex defines requirements, screens propulsion architectures, and evaluates an atmospheric Orbiter Mk1 concept.",
};

const developmentStages = [
  "Performance requirements and operational envelope definition",
  "Propulsion architecture screening and evaluation",
  "Integrated vehicle modeling and simulation",
  "System-level feasibility assessment",
  "Configuration selection or continued iteration",
];

const requirementGroups = [
  {
    title: "Propulsion requirements",
    items: [
      "Support vertical takeoff and landing — not yet verified",
      "No exposed propellers or rotors — architecture dependent",
      "Fine thrust control for hover, transition, maneuvering, and landing — threshold unresolved",
      "Treat source and manufacturer claims as evidence inputs, not proof of feasibility",
    ],
  },
  {
    title: "Vehicle requirements",
    items: [
      "Atmospheric Mk1 scope; orbital and lunar operation remain outside the baseline",
      "At least 1,000 lb payload, nominally five 200 lb occupants — no configuration to verify",
      "Eight-foot stowed and road-width envelope — no configuration to verify",
      "Eight-foot fixed flight span is the current baseline hypothesis under analytical study",
    ],
  },
  {
    title: "Shared system constraints",
    items: [
      "Close the full mass budget across unresolved vehicle systems",
      "Define mission phases, diversion, and usable-energy reserves",
      "Evaluate geometry, propulsion, structure, aerodynamics, thermal systems, and controls together",
      "Define quantitative safety, noise, downwash, thermal, debris, and failure-case limits",
    ],
  },
];

const simulationGroups = [
  {
    title: "Mission energy and mass closure",
    body: "Couple phase demand, usable energy, reserves, propulsion mass, structure, thermal systems, controls, landing systems, payload, and remaining mass. A complete Mk1 mission and full-system closure are still unresolved.",
  },
  {
    title: "Lift, thrust, and transition",
    body: "Evaluate wing-borne lift and the powered-lift assistance required during VTOL, transition, low-speed flight, and any other insufficient-lift condition. Control thresholds and transition criteria remain to be defined.",
  },
  {
    title: "Aerodynamics and integration",
    body: "Study drag, achievable lift, propulsion placement, body and wing interaction, center of mass, structure, and packaging. Current low-order evidence does not establish an integrated aircraft configuration.",
  },
  {
    title: "Thermal, acoustic, and operational limits",
    body: "Define thermal endurance, noise, downwash, heat, debris, bystander, weather, and contingency limits before a system can advance through named operational gates.",
  },
];

export default function VehiclePage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="vehicle-title">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Atmospheric vehicle concept</p>
              <h1 id="vehicle-title">The Orbiter</h1>
              <p className={styles.lede}>
                Orbiter is the provisional name for a vehicle class under
                development—not a finalized aircraft. Candidate configurations
                emerge from approved requirements, propulsion evidence,
                integrated modeling, and explicit feasibility gates.
              </p>
              <p className={styles.statusLine}>
                Current status: early concept development and analytical
                screening. No aircraft or propulsion architecture has been
                validated or selected.
              </p>
            </div>

            <ol className={styles.stageList} aria-label="Vehicle development sequence">
              {developmentStages.map((stage, index) => (
                <li key={stage}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{stage}</strong>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="requirements-title">
          <div className={styles.sectionInner}>
            <p className={styles.eyebrow}>Constraint-first development</p>
            <h2 id="requirements-title">Requirements &amp; operational envelope</h2>
            <p className={styles.sectionIntro}>
              Requirements define the boundary for every downstream decision.
              Approval records design intent; it does not show that a vehicle
              configuration satisfies the requirement.
            </p>

            <div className={styles.requirementsGrid}>
              {requirementGroups.map((group) => (
                <article key={group.title} className={styles.requirementGroup}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.alternate}`} aria-labelledby="propulsion-title">
          <div className={styles.sectionInner}>
            <p className={styles.eyebrow}>Research and screening</p>
            <h2 id="propulsion-title">Propulsion architecture development</h2>
            <div className={styles.splitIntro}>
              <p className={styles.sectionIntro}>
                Candidate families are routed to applicable models and tested
                against declared gates before vehicle-integration effort. A
                source listing, rendering, or manufacturer statement does not
                establish compatibility or feasibility for Orbiter Mk1.
              </p>
              <p className={styles.supportingCopy}>
                The current priority is an evidence-aware, constraint-first
                comparison of enclosed propulsion approaches. The preferred
                common-propulsor vectored-thrust direction remains a hypothesis,
                not a selected architecture.
              </p>
            </div>

            <VehiclePropulsionGallery />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="simulation-title">
          <div className={styles.sectionInner}>
            <p className={styles.eyebrow}>Conditional evidence</p>
            <h2 id="simulation-title">Simulation &amp; testing framework</h2>
            <p className={styles.sectionIntro}>
              Models and simulations evaluate defined cases under explicit
              assumptions. They support screening and model verification; they
              are not physical validation or proof of a complete vehicle.
            </p>

            <div className={styles.disclosureList}>
              {simulationGroups.map((group, index) => (
                <details key={group.title} open={index === 0}>
                  <summary>{group.title}</summary>
                  <p>{group.body}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.alternate}`} aria-labelledby="chassis-title">
          <div className={styles.sectionInner}>
            <p className={styles.eyebrow}>Integrated vehicle synthesis</p>
            <h2 id="chassis-title">Chassis development &amp; co-design</h2>
            <p className={styles.sectionIntro}>
              Chassis work is not a shell placed around a preferred propulsion
              system. Propulsion, geometry, aerodynamics, structure, energy,
              thermal management, control authority, landing systems, and human
              accommodation must close together.
            </p>

            <div className={styles.chassisGrid}>
              <article>
                <span className={styles.cardNumber}>01</span>
                <h3>Design methods</h3>
                <p>
                  Parametric geometry, requirements traceability, aerodynamic
                  studies, structural reasoning, packaging trades, and explicit
                  iteration when a coupled constraint fails.
                </p>
              </article>
              <article>
                <span className={styles.cardNumber}>02</span>
                <h3>Verification path</h3>
                <p>
                  Versioned models, independent comparisons within their valid
                  domains, sensitivity analysis, named gates, decision records,
                  and eventually controlled physical testing.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="compliance-title">
          <div className={styles.sectionInner}>
            <p className={styles.eyebrow}>Evidence-led progression</p>
            <h2 id="compliance-title">Compliance &amp; policy integration</h2>
            <div className={styles.complianceGrid}>
              <p>
                Regulatory, safety, airspace, road-use, noise, and software or
                control-assurance questions are design inputs from the start.
                The certification basis and applicable standards remain
                unresolved; this page does not claim compliance or approval.
              </p>
              <Link href="/mission" className={styles.textLink}>
                Explore the broader mission and policy framework
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
