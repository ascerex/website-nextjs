"use client";

import { useState } from "react";
import styles from "@/app/skyway/skyway.module.css";

type JourneyStep = "available" | "changed" | "vehicleAware";

const journeySteps: Array<{
  id: JourneyStep;
  label: string;
  title: string;
  body: string;
  status: string;
}> = [
  {
    id: "available",
    label: "Journey available",
    title: "The vehicle receives an available path.",
    body: "The network connects departure to destination through a path available under the initial synthetic conditions.",
    status: "Initial path available",
  },
  {
    id: "changed",
    label: "Conditions change",
    title: "Part of the journey becomes unavailable.",
    body: "A new restriction affects the original path. The network preserves that route in its underlying model while removing it from the current journey.",
    status: "Original path unavailable",
  },
  {
    id: "vehicleAware",
    label: "Alternative evaluated",
    title: "The aircraft determines which alternative remains usable.",
    body: "One alternative conflicts with the declared vehicle capability. Another remains eligible, giving the journey a justified route under the changed conditions.",
    status: "Compatible alternative identified",
  },
];

export function SkywayNetworkExplorer() {
  const [activeStep, setActiveStep] = useState<JourneyStep>("available");
  const active = journeySteps.find((step) => step.id === activeStep) ?? journeySteps[0];

  return (
    <div className={styles.explorer} data-view={activeStep}>
      <div className={styles.explorerToolbar} role="group" aria-label="Synthetic journey stages">
        {journeySteps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            aria-pressed={activeStep === step.id}
            onClick={() => setActiveStep(step.id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {step.label}
          </button>
        ))}
      </div>

      <div className={styles.explorerStage}>
        <div className={styles.explorerMeta}>
          <span>ILLUSTRATIVE SYNTHETIC JOURNEY</span>
          <span>{active.status}</span>
        </div>
        <svg
          viewBox="0 0 900 500"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-labelledby="journey-title journey-description"
        >
          <title id="journey-title">A Skyway journey responding to changing conditions</title>
          <desc id="journey-description">
            A trip between departure and destination first follows an available path, then encounters a restriction, and finally uses an alternative compatible with the vehicle.
          </desc>
          <defs>
            <pattern id="journey-restriction" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="9" />
            </pattern>
          </defs>

          <g className={styles.journeyTerrain}>
            <path d="M70 390C180 350 240 370 330 330S490 280 590 310S735 360 830 300" />
            <path d="M70 420H830" />
          </g>

          <g className={styles.journeyNetwork}>
            <path className={styles.routeOriginal} d="M125 340C250 295 300 195 445 205S650 250 775 155" />
            <path className={styles.routeAlternativeHigh} d="M125 340C250 160 420 100 590 125S705 150 775 155" />
            <path className={styles.routeAlternativeLow} d="M125 340C260 370 400 360 535 315S675 225 775 155" />
          </g>

          <g className={styles.journeyPoints}>
            <g transform="translate(125 340)">
              <circle r="13" /><text x="0" y="35" textAnchor="middle">DEPARTURE</text>
            </g>
            <g transform="translate(775 155)">
              <circle r="13" /><text x="0" y="35" textAnchor="middle">DESTINATION</text>
            </g>
          </g>

          <g className={styles.journeyVehicle} transform="translate(315 198)">
            <path d="M-15 5L0-6L15 5L4 2L0 8L-4 2Z" />
            <circle r="24" />
          </g>

          <g className={styles.journeyRestriction}>
            <rect x="395" y="165" width="112" height="86" rx="4" />
            <text x="451" y="158" textAnchor="middle">ROUTE UNAVAILABLE</text>
          </g>

          <g className={styles.journeyCapabilityLimit}>
            <path d="M315 113L355 153M355 113L315 153" />
            <text x="335" y="92" textAnchor="middle">OUTSIDE VEHICLE LIMIT</text>
          </g>

          <g className={styles.journeyCallouts}>
            <text className={styles.originalLabel} x="350" y="232">INITIAL PATH</text>
            <text className={styles.highLabel} x="500" y="104">ALTERNATIVE A</text>
            <text className={styles.lowLabel} x="510" y="346">ALTERNATIVE B</text>
          </g>
        </svg>

        <div className={styles.journeyLegend} aria-hidden="true">
          <span><i className={styles.legendAvailable} />Available</span>
          <span><i className={styles.legendUnavailable} />Unavailable</span>
          <span><i className={styles.legendIncompatible} />Outside vehicle limit</span>
        </div>
      </div>

      <div className={styles.explorerDescription} aria-live="polite">
        <span>{active.label}</span>
        <h3>{active.title}</h3>
        <p>{active.body}</p>
        <small>Illustrative Concept</small>
      </div>
    </div>
  );
}
