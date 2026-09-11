"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./scenes.module.css";

const controlStages = [
  ["Sense", "Collect aircraft and environmental state."],
  ["Understand", "Estimate where the aircraft is and what condition it is in."],
  ["Plan", "Determine the next valid action inside Vehicle and Skyway boundaries."],
  ["Control", "Translate that action into bounded flight-control and propulsion commands."],
  ["Monitor", "Compare expected and actual behavior, then feed the result back into the loop."],
];

const authorities = [
  ["Vehicle", "Capability and limits"],
  ["Skyway", "Authorized route and operating rules"],
  ["Observed state", "Aircraft and environment"],
];

export function PilotArchitectureScene() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
        root.dataset.motion = "true";
        const loopGuide = root.querySelector<SVGPathElement>("[data-control-loop-guide]");
        const loopPath = root.querySelector<SVGPathElement>("[data-control-loop-path]");
        const loopPulse = root.querySelector<SVGCircleElement>("[data-loop-pulse]");
        if (!loopGuide || !loopPath || !loopPulse) return;
        const loopLength = loopGuide.getTotalLength();
        const loopProgress = { value: 0 };
        const traceInset = Math.min(loopLength * 0.008, 14);
        const sampleCount = 300;
        const sampledPoints = Array.from({ length: sampleCount + 1 }, (_, index) =>
          loopGuide.getPointAtLength((index / sampleCount) * loopLength),
        );

        const renderLoopProgress = () => {
          const markerLength = loopLength * loopProgress.value;
          const point = loopGuide.getPointAtLength(markerLength);
          const visibleLength = Math.max(0, loopLength * loopProgress.value - traceInset);
          const lastSample = Math.floor((visibleLength / loopLength) * sampleCount);
          const visiblePoints = sampledPoints.slice(0, lastSample + 1);
          const exactEnd = loopGuide.getPointAtLength(visibleLength);
          const pathData = visiblePoints.length > 0
            ? `M ${visiblePoints[0].x} ${visiblePoints[0].y} ${visiblePoints
                .slice(1)
                .map((sample) => `L ${sample.x} ${sample.y}`)
                .join(" ")} L ${exactEnd.x} ${exactEnd.y}`
            : "";

          loopPath.setAttribute("d", pathData);
          loopPath.style.strokeDasharray = "none";
          loopPath.style.strokeDashoffset = "0";
          loopPulse.setAttribute("cx", String(point.x));
          loopPulse.setAttribute("cy", String(point.y));
        };

        gsap.set("[data-authority], [data-loop-focus]", { opacity: 0, y: 16 });
        gsap.set(loopPath, { opacity: 1 });
        gsap.set("[data-loop-node]", { opacity: 0.14, scale: 0.92 });
        gsap.set("[data-authority-line]", { scaleX: 0 });
        gsap.set(loopPulse, { opacity: 0 });
        renderLoopProgress();

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=235%",
            pin: stage,
            pinSpacing: true,
            scrub: 0.68,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to("[data-architecture-title]", { opacity: 0, y: -38, duration: 0.1 }, 0.04)
          .to("[data-authority-line]", { scaleX: 1, duration: 0.1 }, 0.12)
          .to("[data-authority]", { opacity: 1, y: 0, duration: 0.08, stagger: 0.025 }, 0.13)
          .to(loopPulse, { opacity: 1, duration: 0.04 }, 0.27)
          .to(loopProgress, {
            value: 1,
            duration: 0.69,
            onUpdate: renderLoopProgress,
          }, 0.27);

        controlStages.forEach((_, index) => {
          const start = 0.28 + index * 0.13;
          if (index > 0) {
            timeline
              .to(`[data-loop-node='${index - 1}']`, { opacity: 0.2, scale: 0.96, duration: 0.035 }, start - 0.025)
              .to(`[data-loop-focus='${index - 1}']`, { opacity: 0, y: -12, duration: 0.035 }, start - 0.025);
          }
          timeline
            .to(`[data-loop-node='${index}']`, { opacity: 1, scale: 1, duration: 0.045 }, start)
            .to(`[data-loop-focus='${index}']`, { opacity: 1, y: 0, duration: 0.05 }, start);
        });

        timeline
          .to("[data-loop-focus='4']", { opacity: 0, y: -12, duration: 0.04 }, 0.9)
          .to("[data-loop-node]", { opacity: 0.68, scale: 1, duration: 0.07 }, 0.9);
    }, root);

    return () => {
      delete root.dataset.motion;
      context.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className={`${styles.scene} ${styles.architectureScene}`} aria-labelledby="architecture-title">
      <div ref={stageRef} className={styles.pinnedStage}>
        <div className={styles.sceneBar}>
          <span>02 / The control loop</span>
          <small>Sense → monitor → repeat</small>
        </div>

        <header className={styles.architectureTitle} data-architecture-title>
          <p className={styles.eyebrow}>Continuous control</p>
          <h2 id="architecture-title">The Pilot never stops checking.</h2>
        </header>

        <div className={styles.authorityRail}>
          <i data-authority-line aria-hidden="true" />
          {authorities.map(([title, detail]) => (
            <div key={title} data-authority>
              <strong>{title}</strong><span>{detail}</span>
            </div>
          ))}
        </div>

        <div className={styles.controlLoop}>
          <svg viewBox="0 0 1200 650" aria-hidden="true">
            <path data-control-loop-guide className={styles.controlLoopGuide} d="M600 92 C820 92 982 198 982 326 C982 478 818 558 600 558 C382 558 218 478 218 326 C218 198 380 92 600 92Z" />
            <path data-control-loop-path className={styles.controlLoopActive} d="M600 92 C820 92 982 198 982 326 C982 478 818 558 600 558 C382 558 218 478 218 326 C218 198 380 92 600 92Z" />
            <circle data-loop-pulse className={styles.loopPulse} cx="600" cy="92" r="7" />
          </svg>

          <div className={styles.loopController} aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <rect className={styles.controllerChip} x="28" y="28" width="64" height="64" rx="8" />
              <path className={styles.controllerPins} d="M38 28V16M52 28V16M68 28V16M82 28V16M38 92V104M52 92V104M68 92V104M82 92V104M28 38H16M28 52H16M28 68H16M28 82H16M92 38H104M92 52H104M92 68H104M92 82H104" />
              <rect className={styles.controllerCore} x="41" y="42" width="38" height="36" rx="4" />
              <path className={styles.controllerCircuit} d="M46 60H34M74 60H86M60 46V34M60 74V86M51 51L43 43M69 51L77 43M51 69L43 77M69 69L77 77" />
            </svg>
          </div>
          <span className={styles.loopCoreLabel}>Autonomous Pilot</span>

          <ol className={styles.loopNodes}>
            {controlStages.map(([title], index) => (
              <li key={title} data-loop-node={index}><span>0{index + 1}</span><strong>{title}</strong></li>
            ))}
          </ol>

          <ol className={styles.loopFocus}>
            {controlStages.map(([title, detail], index) => (
              <li key={title} data-loop-focus={index}>
                <span>{title === "Understand" ? "State estimation" : `0${index + 1}`}</span>
                <strong>{title}</strong>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
