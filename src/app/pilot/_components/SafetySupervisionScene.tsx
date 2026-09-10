"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./scenes.module.css";

const responseStages = [
  ["Nominal", "Observed behavior follows the expected aircraft response."],
  ["Deviation detected", "Measured behavior no longer matches what the Pilot expected."],
  ["Detect", "The mismatch is recognized through continuous aircraft-state monitoring."],
  ["Contain", "Control commands remain bounded while the response is stabilized."],
  ["Reassess", "The Pilot determines what authority and mission options remain."],
  ["Safe action", "The next action must be supported by the aircraft state and operating boundaries."],
];

function findClosestLength(path: SVGPathElement, targetX: number, targetY: number) {
  const totalLength = path.getTotalLength();
  let closestLength = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  for (let index = 0; index <= 240; index += 1) {
    const length = (index / 240) * totalLength;
    const point = path.getPointAtLength(length);
    const distance = Math.hypot(point.x - targetX, point.y - targetY);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestLength = length;
    }
  }

  return closestLength;
}

export function SafetySupervisionScene() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(min-width: 769px)", () => {
      const context = gsap.context(() => {
        root.dataset.motion = "true";
        const expectedTrace = root.querySelector<SVGPathElement>("[data-expected-trace]");
        const observedTrace = root.querySelector<SVGPathElement>("[data-observed-trace]");
        if (!expectedTrace || !observedTrace) return;
        const expectedLength = expectedTrace.getTotalLength();
        const observedLength = observedTrace.getTotalLength();
        const nominalLength = findClosestLength(observedTrace, 560, 206);
        const deviationLength = findClosestLength(observedTrace, 716, 112);
        const detectedLength = findClosestLength(observedTrace, 806, 238);
        const containedLength = findClosestLength(observedTrace, 880, 240);
        const reassessedLength = findClosestLength(observedTrace, 1010, 210);

        gsap.set("[data-response-stage], [data-state-comparison]", { opacity: 0, y: 18 });
        gsap.set("[data-response-stage='0']", { opacity: 1, y: 0 });
        gsap.set(expectedTrace, { strokeDasharray: expectedLength, strokeDashoffset: expectedLength });
        gsap.set(observedTrace, { strokeDasharray: observedLength, strokeDashoffset: observedLength });
        gsap.set("[data-deviation-marker], [data-command-boundary], [data-trace-labels], [data-safety-payoff]", { opacity: 0 });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=245%",
            pin: stage,
            pinSpacing: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to("[data-state-comparison]", { opacity: 1, y: 0, duration: 0.08 }, 0.08)
          .to(expectedTrace, { strokeDashoffset: 0, duration: 0.22 }, 0.1)
          .to(observedTrace, { strokeDashoffset: observedLength - nominalLength, duration: 0.1 }, 0.1)
          .to("[data-response-stage='0']", { opacity: 0, y: -12, duration: 0.04 }, 0.19)
          .to("[data-response-stage='1']", { opacity: 1, y: 0, duration: 0.04 }, 0.22)
          .to(observedTrace, { strokeDashoffset: observedLength - deviationLength, duration: 0.14 }, 0.2)
          .to("[data-deviation-marker]", { opacity: 1, duration: 0.02 }, 0.32)
          .to("[data-trace-labels]", { opacity: 1, duration: 0.04 }, 0.32)
          .to("[data-response-stage='1']", { opacity: 0, y: -12, duration: 0.04 }, 0.37)
          .to("[data-response-stage='2']", { opacity: 1, y: 0, duration: 0.04 }, 0.39)
          .to(observedTrace, { strokeDashoffset: observedLength - detectedLength, duration: 0.14 }, 0.34)
          .to("[data-response-stage='2']", { opacity: 0, y: -12, duration: 0.04 }, 0.49)
          .to("[data-response-stage='3']", { opacity: 1, y: 0, duration: 0.04 }, 0.51)
          .to("[data-command-boundary]", { opacity: 1, duration: 0.07 }, 0.51)
          .to(observedTrace, { strokeDashoffset: observedLength - containedLength, duration: 0.15 }, 0.48)
          .to("[data-response-stage='3']", { opacity: 0, y: -12, duration: 0.04 }, 0.62)
          .to("[data-response-stage='4']", { opacity: 1, y: 0, duration: 0.04 }, 0.64)
          .to(observedTrace, { strokeDashoffset: observedLength - reassessedLength, duration: 0.14 }, 0.63)
          .to("[data-response-stage='4']", { opacity: 0, y: -12, duration: 0.04 }, 0.75)
          .to("[data-response-stage='5']", { opacity: 1, y: 0, duration: 0.04 }, 0.77)
          .to(observedTrace, { strokeDashoffset: 0, duration: 0.11 }, 0.77)
          .to("[data-response-stage='5']", { opacity: 0, y: -12, duration: 0.04 }, 0.88)
          .to("[data-axis-labels], [data-flight-state-label]", { opacity: 0, duration: 0.06 }, 0.88)
          .to("[data-deviation-marker]", { opacity: 0.3, duration: 0.06 }, 0.88)
          .to("[data-safety-payoff]", { opacity: 1, y: 0, duration: 0.12 }, 0.91);
      }, root);

      return () => {
        delete root.dataset.motion;
        context.revert();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={rootRef} className={`${styles.scene} ${styles.safetyScene}`} aria-labelledby="safety-title">
      <div ref={stageRef} className={styles.pinnedStage}>
        <div className={styles.sceneBar}>
          <span>03 / Safety is continuous</span>
          <small>Expected response // Observed state</small>
        </div>
        <h2 id="safety-title" className={styles.srOnly}>The Pilot continuously compares expected and observed aircraft behavior</h2>

        <div className={styles.safetyStage}>
          <div className={styles.flightStateLabel} data-flight-state-label><span>Aircraft state</span><strong>Continuously supervised</strong></div>

          <figure className={styles.stateComparison} data-state-comparison>
            <svg viewBox="0 0 1200 420" role="img" aria-labelledby="state-trace-title state-trace-desc">
              <title id="state-trace-title">Expected and observed flight-state response</title>
              <desc id="state-trace-desc">The observed response initially follows the expected response, deviates, and then returns toward a bounded operating region as the proposed Pilot detects, contains, reassesses, and selects a safe action.</desc>
              <g className={styles.stateAxes} aria-hidden="true">
                <path d="M90 340H1130" /><path d="M90 70V340" />
              </g>
              <g className={styles.axisLabels} data-axis-labels aria-hidden="true">
                <text x="610" y="392" textAnchor="middle" style={{ fill: "#bdbdb7" }}>MISSION TIME</text>
                <text x="46" y="320" textAnchor="start" transform="rotate(-90 46 320)" style={{ fill: "#bdbdb7" }}>FLIGHT STATE</text>
              </g>
              <rect data-command-boundary className={styles.commandBoundary} x="604" y="164" width="492" height="92" />
              <path data-expected-trace className={styles.expectedTrace} d="M90 254 C280 235 398 202 560 206 S850 208 1130 190" />
              <path data-observed-trace className={styles.observedTrace} d="M90 254 C280 235 398 202 560 206 C630 204 648 116 716 112 S806 258 880 240 S1010 210 1130 198" />
              <g data-deviation-marker className={styles.deviationMarker}>
                <circle cx="716" cy="112" r="7" /><path d="M716 112V54" /><text x="730" y="48">OBSERVED ≠ EXPECTED</text>
              </g>
              <g className={styles.traceLabels} data-trace-labels aria-hidden="true">
                <text x="936" y="176">EXPECTED RESPONSE</text><text x="936" y="228">OBSERVED RESPONSE</text>
              </g>
            </svg>
            <figcaption className={styles.srOnly}>The Pilot continuously compares commanded response with the aircraft&apos;s measured behavior.</figcaption>
          </figure>

          <ol className={styles.responseStages}>
            {responseStages.map(([stageName, detail], index) => (
              <li key={stageName} data-response-stage={index}>
                <span>0{index + 1}</span><strong>{stageName}</strong><p>{detail}</p>
              </li>
            ))}
          </ol>

          <div className={styles.safetyPayoff} data-safety-payoff>
            <h3>Safety isn&apos;t a reaction at the end.<br />It&apos;s a loop running throughout the flight.</h3>
            <p>The Pilot is being developed to reduce exposure to avoidable human error through continuous aircraft-state supervision and bounded automated response.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
