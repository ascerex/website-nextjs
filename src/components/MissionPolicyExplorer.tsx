"use client";

import { useState } from "react";
import styles from "@/app/mission/mission.module.css";

type PolicyCategory = {
  id: string;
  shortLabel: string;
  title: string;
  description: string;
  positionClass: string;
};

const policyCategories: PolicyCategory[] = [
  {
    id: "airspace",
    shortLabel: "Airspace access",
    title: "Airspace Access",
    description:
      "Defines how future vehicles could enter, traverse, and exit existing airspace. The work must account for airspace classes, low-altitude integration, structured corridors, and interfaces with conventional aviation.",
    positionClass: "policyPositionOne",
  },
  {
    id: "autonomy",
    shortLabel: "Autonomy assurance",
    title: "Autonomy Certification",
    description:
      "Addresses the evidence and assurance pathway eventually required for flight automation without an onboard pilot. The applicable process will depend on the vehicle's future safety classification and certification basis.",
    positionClass: "policyPositionTwo",
  },
  {
    id: "vehicle",
    shortLabel: "Vehicle approval",
    title: "Vehicle Certification",
    description:
      "Covers the future airworthiness and operating approvals for a new vehicle class. Certification assumptions remain requirements inputs; no certification basis or approval pathway has been selected.",
    positionClass: "policyPositionThree",
  },
  {
    id: "operations",
    shortLabel: "Operations & traffic",
    title: "Operations & Traffic",
    description:
      "Frames predictable routing, right-of-way, access, and density-management rules. These operating concepts must be tested against vehicle capability, existing traffic, and the limits of any proposed Skyway network.",
    positionClass: "policyPositionFour",
  },
  {
    id: "infrastructure",
    shortLabel: "Infrastructure & zoning",
    title: "Infrastructure & Zoning",
    description:
      "Considers where takeoff, landing, staging, charging or fueling, and maintenance could occur. Local land use, emergency access, noise, and existing transportation infrastructure all shape viable deployment.",
    positionClass: "policyPositionFive",
  },
  {
    id: "safety",
    shortLabel: "Safety & liability",
    title: "Safety & Liability",
    description:
      "Examines accountability, operational responsibility, incident response, and the evidence needed to support public trust. These questions must mature alongside the vehicle and operating system.",
    positionClass: "policyPositionSix",
  },
  {
    id: "security",
    shortLabel: "Security & environment",
    title: "Security & Environment",
    description:
      "Brings cybersecurity, system resilience, privacy, noise, energy use, and environmental effects into the requirements process before a deployment concept is advanced.",
    positionClass: "policyPositionSeven",
  },
];

export function MissionPolicyExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = policyCategories[activeIndex];

  function selectPrevious() {
    setActiveIndex((current) =>
      current === 0 ? policyCategories.length - 1 : current - 1,
    );
  }

  function selectNext() {
    setActiveIndex((current) =>
      current === policyCategories.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <div className={styles.policyExplorer}>
      <div className={styles.policyNetwork}>
        <svg
          className={styles.policyConnectors}
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <line x1="200" y1="200" x2="200" y2="46" />
          <line x1="200" y1="200" x2="318" y2="94" />
          <line x1="200" y1="200" x2="350" y2="200" />
          <line x1="200" y1="200" x2="318" y2="306" />
          <line x1="200" y1="200" x2="200" y2="354" />
          <line x1="200" y1="200" x2="82" y2="306" />
          <line x1="200" y1="200" x2="50" y2="200" />
        </svg>

        <div className={styles.policyCenter} aria-hidden="true">
          Policy
          <span>framework</span>
        </div>

        <div className={styles.policyBubbles}>
          {policyCategories.map((category, index) => (
            <button
              key={category.id}
              type="button"
              className={`${styles.policyBubble} ${styles[category.positionClass]}`}
              data-active={index === activeIndex ? "true" : undefined}
              aria-pressed={index === activeIndex}
              aria-controls="active-policy-category"
              onClick={() => setActiveIndex(index)}
            >
              {category.shortLabel}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.policyDetail} id="active-policy-category">
        <div className={styles.policyDetailMeta}>
          <span>
            {String(activeIndex + 1).padStart(2, "0")} / {policyCategories.length}
          </span>
          <span>Policy dependency</span>
        </div>
        <h3>{activeCategory.title}</h3>
        <p>{activeCategory.description}</p>

        <div className={styles.policyNavigation}>
          <button type="button" onClick={selectPrevious} aria-label="Previous policy category">
            <span aria-hidden="true">←</span>
            Previous
          </button>
          <button type="button" onClick={selectNext} aria-label="Next policy category">
            Next
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
