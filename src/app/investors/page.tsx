import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components";
import styles from "./investors.module.css";

export const metadata: Metadata = {
  title: "Investors | Ascerex",
  description:
    "An investor overview of Ascerex, its personal-flight thesis, current technical execution, and development strategy.",
};

const companyThesis = [
  {
    number: "01",
    label: "Product wedge",
    title: "A personal aircraft shaped by practical constraints",
    description:
      "Orbiter starts with meaningful payload, road-width storage, VTOL access, and contained propulsion as linked vehicle requirements.",
    href: "/vehicle",
    linkLabel: "Vehicle program",
  },
  {
    number: "02",
    label: "Development engine",
    title: "A computational system for narrowing uncertainty",
    description:
      "Source evidence, applicable physics, configuration studies, and hard constraints are organized into reproducible engineering decisions.",
    href: "/vehicle#propulsion-title",
    linkLabel: "Engineering approach",
  },
  {
    number: "03",
    label: "Operating infrastructure",
    title: "A structured network developed with the vehicle",
    description:
      "The Skyway extends the product from an aircraft concept toward a coordinated transportation system with vehicle-aware routes and operating constraints.",
    href: "/skyway",
    linkLabel: "Skyway program",
  },
];

const autonomyDependencies = [
  "Defined vehicle dynamics and limits",
  "Flight-control, sensing, and health interfaces",
  "Skyway route and operating constraints",
];

const executionSignals = [
  {
    value: "652",
    label: "Public candidate records processed",
    description:
      "A completed evidence-ingestion catalogue routes architecture records by propulsion family and modeling need without treating source claims as validation.",
  },
  {
    value: "11",
    label: "Family-level research decisions",
    description:
      "The catalogue has been reduced into an evidence-aware research sequence that identifies which model, evidence, or adaptation question comes next.",
  },
  {
    value: "V0.2",
    label: "Synthetic Skyway reference",
    description:
      "The private Phase 1 prototype generates and validates deterministic network structures while keeping changing restrictions separate from the network itself.",
  },
];

const valuePath = [
  {
    phase: "Foundation",
    title: "Reduce the unknowns",
    description:
      "Turn mission intent into requirements, qualified evidence, applicable models, and explicit decisions that expose the controlling technical risks.",
  },
  {
    phase: "Convergence",
    title: "Define a buildable test article",
    description:
      "Advance surviving vehicle and subsystem configurations into higher-fidelity integration and a tightly scoped physical prototype program.",
  },
  {
    phase: "Evidence",
    title: "Demonstrate what analysis cannot",
    description:
      "Use instrumented subsystem and integrated testing to measure real behavior, revise the models, and support the next program gate.",
  },
  {
    phase: "Company scale",
    title: "Build around demonstrated capability",
    description:
      "Grow the engineering, assurance, manufacturing, and operating organization around evidence instead of unsupported configuration promises.",
  },
];

const capitalPriorities = [
  {
    title: "Prototype hardware",
    detail: "Fabrication, components, fixtures, and tightly bounded test articles.",
  },
  {
    title: "Test infrastructure",
    detail: "Instrumentation, facilities, data acquisition, and repeatable verification.",
  },
  {
    title: "Engineering fidelity",
    detail: "Specialized aerodynamic, structural, thermal, controls, and integration work.",
  },
  {
    title: "Company foundation",
    detail: "Focused technical capacity and the legal, IP, safety, and regulatory structure needed for the next phase.",
  },
];

export default function InvestorsPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="investors-title">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Ascerex // Investor overview</p>
            <h1 id="investors-title">Personal flight is a systems problem.</h1>
            <p className={styles.heroSummary}>
              Ascerex is building the analytical and software foundation for a
              personal aerial-mobility platform: the Orbiter vehicle, the
              Skyway operating network, and the flight intelligence that will
              eventually connect them.
            </p>
            <div className={styles.heroActions}>
              <a href="#company-thesis" className={styles.primaryAction}>
                Explore the company <span aria-hidden="true">↓</span>
              </a>
              <a
                href="mailto:contact@ascerex.com?subject=Investor%20inquiry"
                className={styles.secondaryAction}
              >
                Investor inquiry <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <Image
              src="/images/investorHero.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 48vw"
            />
            <div className={styles.heroSystemIndex}>
              <span>01 / Vehicle</span>
              <span>02 / Network</span>
              <span>03 / Autonomy</span>
            </div>
            <p>One system // Three coupled development programs</p>
          </div>
        </section>

        <section
          className={styles.thesis}
          id="company-thesis"
          aria-labelledby="thesis-title"
        >
          <div className={styles.sectionFrame}>
            <header className={styles.sectionIntro}>
              <p className={styles.kicker}>Company thesis</p>
              <h2 id="thesis-title">Integration is the product strategy.</h2>
              <div>
                <p>
                  Most of the difficult questions in personal flight do not end
                  at the aircraft. The vehicle changes which routes are usable;
                  the network changes what autonomy must handle; and operating
                  constraints change the vehicle itself.
                </p>
                <p>
                  Ascerex is designed around that dependency. Each program
                  produces versioned inputs for the next while preserving the
                  ability to revise an earlier assumption when evidence changes.
                </p>
              </div>
            </header>

            <ol className={styles.thesisList}>
              {companyThesis.map((item) => (
                <li key={item.number}>
                  <span className={styles.thesisNumber}>{item.number}</span>
                  <div>
                    <span className={styles.thesisLabel}>{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <Link href={item.href}>
                    {item.linkLabel} <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.autonomy} aria-labelledby="autonomy-title">
          <div className={styles.sectionFrame}>
            <div className={styles.autonomyCopy}>
              <p className={styles.kicker}>The accessibility layer</p>
              <h2 id="autonomy-title">
                Personal flight cannot depend on every traveler becoming a pilot.
              </h2>
              <p>
                Flight autonomy is central to the product direction, not an
                optional software feature. Its purpose is to reduce dependence
                on individual piloting skill by operating a defined aircraft
                within evidenced limits and a structured Skyway journey.
              </p>
              <Link href="/pilot">
                Explore flight autonomy <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div
              className={styles.autonomyArchitecture}
              role="group"
              aria-label="Systems required by the future autonomous flight pilot"
            >
              <p>Required system inputs</p>
              <ul>
                {autonomyDependencies.map((dependency, index) => (
                  <li key={dependency}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {dependency}
                  </li>
                ))}
              </ul>
              <div className={styles.autonomyJoin} aria-hidden="true">
                <i />
                <span>Verified interfaces</span>
                <i />
              </div>
              <div className={styles.autonomyCore}>
                <span>Future integrated system</span>
                <strong>Autonomous flight pilot</strong>
                <small>
                  Vehicle-specific, route-aware, and bounded by demonstrated capability
                </small>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.execution} aria-labelledby="execution-title">
          <div className={styles.sectionFrame}>
            <header className={styles.executionHeader}>
              <div>
                <p className={styles.kicker}>Current execution</p>
                <h2 id="execution-title">The foundation is becoming measurable.</h2>
              </div>
              <p>
                These are research and software outputs—not aircraft
                performance claims. Together, they show a program moving from
                open-ended exploration toward repeatable engineering work.
              </p>
            </header>

            <dl className={styles.signalGrid}>
              {executionSignals.map((signal) => (
                <div key={signal.value}>
                  <dt>
                    <strong>{signal.value}</strong>
                    <span>{signal.label}</span>
                  </dt>
                  <dd>{signal.description}</dd>
                </div>
              ))}
            </dl>

            <p className={styles.evidenceBoundary}>
              Ascerex remains in concept development and analytical screening.
              No aircraft configuration, propulsion architecture, operational
              Skyway, or autonomous flight system has been validated or selected.
            </p>
          </div>
        </section>

        <section className={styles.value} aria-labelledby="value-title">
          <div className={styles.sectionFrame}>
            <header className={styles.sectionIntro}>
              <p className={styles.kicker}>Value-creation path</p>
              <h2 id="value-title">Build certainty before scale.</h2>
              <div>
                <p>
                  Aerospace capital is consumed quickly when foundational
                  questions remain hidden. The Ascerex sequence uses software
                  and bounded studies to make those questions explicit before
                  committing to a physical configuration.
                </p>
              </div>
            </header>

            <ol className={styles.valuePath}>
              {valuePath.map((stage, index) => (
                <li key={stage.phase}>
                  <div className={styles.valueMarker}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <i aria-hidden="true" />
                  </div>
                  <div>
                    <p>{stage.phase}</p>
                    <h3>{stage.title}</h3>
                    <span>{stage.description}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.capital} aria-labelledby="capital-title">
          <div className={styles.capitalField} aria-hidden="true" />
          <div className={styles.sectionFrame}>
            <div className={styles.capitalLead}>
              <p className={styles.kicker}>What capital unlocks</p>
              <h2 id="capital-title">From computational evidence to prototype evidence.</h2>
              <p>
                Future capital would accelerate the specific capabilities
                required to turn surviving analytical configurations into
                disciplined physical development.
              </p>
            </div>

            <ol className={styles.capitalList}>
              {capitalPriorities.map((priority, index) => (
                <li key={priority.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{priority.title}</h3>
                    <p>{priority.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.founder} aria-labelledby="founder-title">
          <div className={styles.sectionFrame}>
            <div className={styles.founderPortrait}>
              <Image
                src="/favicon/logo.svg"
                alt="Ascerex mark"
                width={280}
                height={280}
              />
              <div>
                <span>Founder-led</span>
                <small>Ascerex</small>
              </div>
            </div>

            <div className={styles.founderCopy}>
              <p className={styles.kicker}>Founder-led execution</p>
              <h2 id="founder-title">One technical vision across the system.</h2>
              <p>
                Ascerex is presently founder-led. Its vehicle studies, evidence
                infrastructure, computational workflows, Skyway software, and
                public technical interfaces are being developed as parts of one
                coherent program.
              </p>
              <p>
                That continuity keeps requirements, code, studies, and public
                claims aligned while the technical foundation advances toward
                focused prototype development and a purpose-built aerospace
                organization.
              </p>
              <div className={styles.founderRole}>
                <span>Current role</span>
                <strong>Founder // Systems architecture, software & research</strong>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contact} aria-labelledby="contact-title">
          <div className={styles.sectionFrame}>
            <div className={styles.contactHeading}>
              <p className={styles.kicker}>Investor inquiries</p>
              <h2 id="contact-title">Request a company overview.</h2>
            </div>
            <div className={styles.contactText}>
              <p className={styles.contactCopy}>
                For a direct conversation about Ascerex, its development strategy,
                and the milestones ahead.
              </p>
              <small>
                This website provides general company information. Ascerex is not
                conducting a public securities offering through this page.
              </small>
            </div>
            <a href="mailto:contact@ascerex.com?subject=Investor%20inquiry">
              Contact Ascerex <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
