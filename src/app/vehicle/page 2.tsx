import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components";
import { VehiclePropulsionGallery } from "@/components/VehiclePropulsionGallery";
import styles from "./vehicle.module.css";

export const metadata: Metadata = {
  title: "Vehicle | Ascerex",
  description:
    "How Ascerex defines requirements, screens propulsion architectures, and evaluates an atmospheric Orbiter Mk1 concept.",
};

const programRequirements = [
  {
    value: "1,000+",
    unit: "LB",
    label: "Payload requirement",
    detail: "The working requirement is sized around five nominal 200 lb occupants.",
  },
  {
    value: "8",
    unit: "FT",
    label: "Road-width envelope",
    detail: "The vehicle must fit within an eight-foot stowed width.",
  },
  {
    value: "VTOL",
    unit: "",
    label: "Operating requirement",
    detail: "Vertical takeoff and landing shape every downstream architecture trade.",
  },
  {
    value: "0",
    unit: "EXPOSED",
    label: "Propellers or rotors",
    detail: "The current requirement keeps thrust-producing hardware contained.",
  },
];

const decisionSequence = [
  {
    number: "01",
    title: "Define requirements",
    status: "Established foundation",
    body: "Establish mission, payload, geometry, containment, safety, and operating constraints.",
  },
  {
    number: "02",
    title: "Model mission demand",
    status: "Analytical framework",
    body: "Translate each flight phase into force, lift, power, energy, thermal, and control demands under explicit assumptions.",
  },
  {
    number: "03",
    title: "Screen architectures",
    status: "Current active stage",
    body: "Qualify evidence and compare propulsion and energy approaches using applicable models and traceable gates.",
  },
  {
    number: "04",
    title: "Integrate the vehicle",
    status: "Coupled evaluation",
    body: "Couple geometry, propulsion, aerodynamics, structure, mass, energy, thermal behavior, controls, packaging, and landing systems.",
  },
  {
    number: "05",
    title: "Advance viable configurations",
    status: "Progressive fidelity",
    body: "Move surviving configurations into higher-fidelity simulation, integration studies, subsystem testing, and controlled physical testing.",
  },
];

const integrationLeft = [
  "Parametric geometry",
  "Wing and body aerodynamics",
  "Occupant and payload packaging",
  "Structural load paths",
  "Landing systems",
];

const integrationRight = [
  "Propulsion placement",
  "Center of mass and distribution",
  "Energy storage and power",
  "Thermal management",
  "Controls and operating envelope",
];

const engineeringRules = [
  "Requirements, assumptions, evidence, models, results, and decisions remain traceable.",
  "Configured studies can be reproduced from versioned inputs and declared model boundaries.",
  "Propulsion families route only to physics models that apply to their mechanisms.",
  "Missing information remains unknown, and hard constraints are evaluated before comparison.",
];

const evaluationRecord = [
  ["Study input", "Versioned requirements + fixed mission case"],
  ["Evidence", "Linked, qualified, or explicitly unknown"],
  ["Model dispatch", "Applicable family model or capability required"],
  ["Evaluation", "Coupled demand, mass, power, energy, and packaging"],
  ["Decision output", "Constraint vector before comparison"],
  ["Provenance", "Configuration, model, environment, and assumptions"],
];

export default function VehiclePreviewPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="preview-title">
          <Image
            className={styles.heroImage}
            src="/images/vehicle.PNG"
            alt="Concept visualization of the Orbiter vehicle"
            fill
            priority
            sizes="100vw"
          />
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroGrid} aria-hidden="true" />

          <div className={styles.heroContent}>
            <p className={styles.kicker}>Orbiter // Atmospheric vehicle program</p>
            <h1 id="preview-title">The Orbiter</h1>
            <p className={styles.heroThesis}>A vehicle shaped by the mission.</p>
            <p className={styles.heroSummary}>
              Ascerex is developing a compact VTOL aircraft around a demanding
              premise: meaningful payload, road-width packaging, and contained
              propulsion in one integrated system.
            </p>
            <a className={styles.heroLink} href="#vehicle-brief">
              Explore the vehicle
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className={styles.heroStatus}>
            <span className={styles.statusPulse} aria-hidden="true" />
            <div>
              <span>Current development focus</span>
              <strong>
                Computational evaluation — fixed-span flight + enclosed
                vectored thrust
              </strong>
            </div>
          </div>

        </section>

        <section className={styles.brief} id="vehicle-brief" aria-labelledby="brief-title">
          <div className={styles.sectionFrame}>
            <div className={styles.briefIntro}>
              <p className={styles.kicker}>The vehicle brief</p>
              <h2 id="brief-title">What the vehicle must do</h2>
              <p>
                Orbiter begins with a narrow set of non-negotiable design
                inputs. Those inputs force propulsion, airframe, energy, and
                control decisions to converge around the same vehicle.
              </p>
              <p className={styles.programStatus}>
                Computational engineering and analytical screening are active.
                Configuration selection follows integrated feasibility gates.
              </p>
              <p className={styles.scopeNote}>
                These are program requirements for engineering evaluation, not
                demonstrated aircraft performance.
              </p>
            </div>

            <dl className={styles.requirementList}>
              {programRequirements.map((requirement) => (
                <div key={requirement.label} className={styles.requirement}>
                  <dt>
                    <span className={styles.requirementValue}>{requirement.value}</span>
                    {requirement.unit && (
                      <span className={styles.requirementUnit}>{requirement.unit}</span>
                    )}
                  </dt>
                  <dd>
                    <strong>{requirement.label}</strong>
                    <span>{requirement.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className={styles.program} aria-labelledby="program-title">
          <div className={styles.sectionFrame}>
            <div className={styles.programHeader}>
              <p className={styles.kicker}>Orbiter architecture</p>
              <h2 id="program-title">How Orbiter is developed</h2>
              <p>
                Orbiter is developed as one coupled system: vehicle envelope,
                wing and body lift, contained propulsion, energy, structure,
                thermal behavior, stability, and control must resolve the same
                mission. The program advances through traceable gates, and new
                evidence can return a configuration to an earlier stage.
              </p>
            </div>

            <ol className={styles.decisionList}>
              {decisionSequence.map((step, index) => (
                <li key={step.title} className={index === 2 ? styles.currentStep : undefined}>
                  <span className={styles.decisionNumber}>{step.number}</span>
                  <div>
                    <span className={styles.decisionStatus}>{step.status}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className={styles.iterationNote}>
              <span aria-hidden="true">↺</span>
              The sequence is iterative. A result can revise an assumption,
              requirement, model, or configuration before the program advances.
            </p>
          </div>
        </section>

        <section className={styles.propulsion} aria-labelledby="propulsion-title">
          <div className={styles.sectionFrame}>
            <div className={styles.propulsionLead}>
              <p className={styles.kicker}>Propulsion research & development</p>
              <h2 id="propulsion-title">From evidence to engineering decisions</h2>
              <p>
                Ascerex is building a computational workflow that turns propulsion
                research into vehicle-level decisions. The records below track
                the families under investigation, the studies carried out, and
                the constraints shaping the next step.
              </p>
            </div>

            <ol className={styles.researchFlow} aria-label="From research to a study record">
              <li>
                <details>
                  <summary>
                    <svg viewBox="0 0 260 120" aria-hidden="true">
                      <g className={styles.sourceSheets}>
                        <path d="M20 72V18h84v54M30 82V28h84v54" />
                        <rect x="40" y="38" width="84" height="54" rx="2" />
                        <path d="M52 53h48M52 65h35M52 77h22" />
                      </g>
                      <path className={styles.flowTrace} d="M124 65h28m-6-5 6 5-6 5" />
                      <g className={styles.flowArtifact}>
                        <text x="168" y="38">SOURCE</text>
                        <text x="168" y="60">FAMILY</text>
                        <text x="168" y="82">INPUTS</text>
                        <path d="M158 25v66h83" />
                      </g>
                    </svg>
                    <span className={styles.flowHeading}><b>01</b> Evidence organized <i aria-hidden="true">+</i></span>
                    <span className={styles.flowSubtitle}>Sources → structured records</span>
                  </summary>
                  <p>Source claims are traced to their origin, classified by propulsion family, and checked for the inputs a model requires. Missing evidence stays visible.</p>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <svg viewBox="0 0 260 120" aria-hidden="true">
                      <g className={styles.flowArtifact}>
                        <text x="14" y="31">DEMAND</text><text x="14" y="91">INPUTS</text>
                        <path d="M66 27h22v30h20M66 87h22V63h20" />
                        <rect x="108" y="38" width="70" height="44" rx="2" />
                        <text x="143" y="64" textAnchor="middle">MODEL</text>
                        <path d="M178 60h20V24h46M198 60h46M198 60v36h46" />
                      </g>
                      <g className={styles.flowOutputs}>
                        <circle cx="244" cy="24" r="3" /><circle cx="244" cy="60" r="3" /><circle cx="244" cy="96" r="3" />
                      </g>
                    </svg>
                    <span className={styles.flowHeading}><b>02</b> Models applied <i aria-hidden="true">+</i></span>
                    <span className={styles.flowSubtitle}>Physics → power, energy & mass</span>
                  </summary>
                  <p>Applicable physics models connect flight demand to installed capability. Bounded studies vary assumptions to expose the constraints that dominate a case.</p>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <svg viewBox="0 0 260 120" aria-hidden="true">
                      <g className={styles.flowArtifact}>
                        <path d="M20 60h42m0 0V24h36M62 60h36M62 60v36h36" />
                        <text x="114" y="28">EVIDENCE GAP</text>
                        <text x="114" y="64">MODEL LIMIT</text>
                        <text x="114" y="100">CONSTRAINT</text>
                      </g>
                      <g className={styles.flowOutputs}>
                        <circle cx="98" cy="24" r="3" /><circle cx="98" cy="60" r="3" /><circle cx="98" cy="96" r="3" />
                      </g>
                    </svg>
                    <span className={styles.flowHeading}><b>03</b> Decisions recorded <i aria-hidden="true">+</i></span>
                    <span className={styles.flowSubtitle}>Finding → status & next step</span>
                  </summary>
                  <p>Each record explains what the evidence supports, what limits the result, and why a study proceeds, pauses, or stops under its tested assumptions.</p>
                </details>
              </li>
            </ol>

            <div className={styles.galleryRegion}>
              <div className={styles.galleryCaption}>
                <p>Research families & architecture studies</p>
                <span>
                  Select a record to explore the evidence and takeaway.
                </span>
              </div>
              <VehiclePropulsionGallery />
              <p className={styles.researchScope}>Study outcomes apply to the configurations and assumptions evaluated. No propulsion architecture has been selected.</p>
            </div>
          </div>
        </section>

        <section className={styles.airframe} aria-labelledby="airframe-title">
          <div className={styles.sectionFrame}>
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>Coupled aircraft architecture</p>
              <h2 id="airframe-title">Airframe and vehicle integration</h2>
              <p>
                No subsystem can be selected independently of the complete
                vehicle. Packaging, loads, power, heat, control, and aerodynamic
                behavior must close around one configuration.
              </p>
            </div>

            <div
              className={styles.systemMap}
              role="group"
              aria-label="Orbiter system relationship map"
            >
              <ul className={styles.systemRail} aria-label="Airframe inputs">
                {integrationLeft.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className={styles.integrationCore}>
                <span>Coupled vehicle model</span>
                <h3>Orbiter configuration</h3>
                <p>
                  Mission fit, road-width storage, installed performance, mass
                  closure, and operating limits are resolved as one system.
                </p>
                <strong>8 FT STOWED ENVELOPE</strong>
              </div>

              <ul className={styles.systemRail} aria-label="Vehicle-system inputs">
                {integrationRight.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <p className={styles.baselineNote}>
              The fixed-span vehicle is the current baseline. A deployable wing
              remains a fallback if the integrated fixed-span system does not
              satisfy feasibility gates now being defined.
            </p>
          </div>
        </section>

        <section
          className={styles.engineeringArtifacts}
          aria-label="Engineering workflow artifacts"
        >
          <div className={styles.sectionFrame}>
            <div className={styles.artifactGrid}>
              <div>
                <p className={styles.detailLabel}>
                  Engineering rules encoded in the workflow
                </p>
                <ul className={styles.principleList}>
                  {engineeringRules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>

              <aside className={styles.runArtifact} aria-labelledby="artifact-title">
                <div className={styles.artifactHeader}>
                  <div>
                    <span>PUBLIC-SAFE CONTRACT</span>
                    <h3 id="artifact-title">Evaluation record anatomy</h3>
                  </div>
                  <span>SCHEMA</span>
                </div>
                <dl>
                  {evaluationRecord.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <p>
                  Sanitized structure only. No private candidate inputs,
                  rankings, or engineering results are published here.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.assurance} aria-labelledby="assurance-title">
          <div className={styles.sectionFrame}>
            <p className={styles.kicker}>Program discipline</p>
            <h2 id="assurance-title">Assurance begins with the requirements</h2>

            <div className={styles.assuranceGrid}>
              <article>
                <span>Software assurance</span>
                <p>
                  Future airborne software will follow an assurance process
                  appropriate to the vehicle&apos;s eventual system-safety
                  classification and certification basis.
                </p>
              </article>
              <article>
                <span>Policy and compliance</span>
                <p>
                  Regulatory, safety, airspace, software-assurance, and
                  operating-approval considerations enter the requirements and
                  verification process from the beginning.
                </p>
                <Link href="/mission#policy-and-compliance">
                  Explore the mission framework
                  <b aria-hidden="true">↗</b>
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.closingMark} aria-hidden="true">Ω</div>
          <div className={styles.closingContent}>
            <p className={styles.kicker}>Next: The Skyway</p>
            <h2 id="closing-title">The vehicle is one part of the system</h2>
            <p>
              The Skyway is the digital operating network intended to connect
              vehicles, routes, infrastructure, access rules, and coordinated
              flight operations. See how the Orbiter fits into that larger
              transportation system.
            </p>
            <Link href="/skyway" className={styles.missionLink}>
              Explore the Skyway
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
