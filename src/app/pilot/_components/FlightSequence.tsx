"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbiterGlyph } from "./OrbiterGlyph";
import styles from "./scenes.module.css";

const phases = [
  ["01", "Takeoff", "Establish controlled vertical flight."],
  ["02", "Transition", "Manage changing lift and control demand."],
  ["03", "Route", "Follow the eligible Skyway path."],
  ["04", "Approach", "Exit the route and prepare to land."],
  ["05", "Landing", "Complete or safely terminate the mission."],
];

export function FlightSequence() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const media = gsap.matchMedia();

    media.add("(min-width: 769px)", () => {
      const context = gsap.context(() => {
        root.dataset.motion = "true";
        const path = root.querySelector<SVGPathElement>("[data-flight-path]");
        const orbiter = root.querySelector<HTMLElement>("[data-flight-orbiter]");
        const orbiterGlyph = root.querySelector<HTMLElement>("[data-flight-orbiter-glyph]");
        if (!path || !orbiter || !orbiterGlyph) return;
        const pathLength = path.getTotalLength();
        const tangentAngleAt = (progress: number) => {
          const center = pathLength * progress;
          const before = path.getPointAtLength(Math.max(0, center - 1));
          const after = path.getPointAtLength(Math.min(pathLength, center + 1));
          return Math.atan2(after.y - before.y, after.x - before.x) * (180 / Math.PI);
        };
        const departureCompensation = -tangentAngleAt(0.001);
        const arrivalCompensation = -tangentAngleAt(0.999);

        gsap.set("[data-phase]", { opacity: 0, y: 22 });
        gsap.set("[data-phase='0']", { opacity: 1, y: 0 });
        gsap.set(path, { opacity: 1, strokeDasharray: pathLength, strokeDashoffset: pathLength });
        gsap.set(orbiter, {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: 0,
            end: 0,
          },
        });
        gsap.set(orbiterGlyph, { rotation: departureCompensation, transformOrigin: "50% 50%" });
        gsap.set("[data-handoff-orbiter]", { opacity: 0, scale: 0.75 });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=300%",
            pin: stage,
            pinSpacing: true,
            scrub: 0.72,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(path, { strokeDashoffset: 0, duration: 1 }, 0)
          .to(orbiter, {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true },
            duration: 1,
          }, 0)
          .to(orbiterGlyph, { rotation: 0, duration: 0.15, ease: "sine.inOut" }, 0.09)
          .to(orbiterGlyph, { rotation: arrivalCompensation, duration: 0.16, ease: "sine.inOut" }, 0.82)
          .to("[data-flight-world]", { xPercent: -7, duration: 0.64 }, 0.34)
          .to("[data-phase='0']", { opacity: 0, y: -16, duration: 0.04 }, 0.15)
          .to("[data-phase='1']", { opacity: 1, y: 0, duration: 0.05 }, 0.17)
          .to("[data-phase='1']", { opacity: 0, y: -16, duration: 0.04 }, 0.32)
          .to("[data-phase='2']", { opacity: 1, y: 0, duration: 0.05 }, 0.35)
          .to("[data-phase='2']", { opacity: 0, y: -16, duration: 0.04 }, 0.63)
          .to("[data-phase='3']", { opacity: 1, y: 0, duration: 0.05 }, 0.66)
          .to("[data-phase='3']", { opacity: 0, y: -16, duration: 0.04 }, 0.79)
          .to("[data-phase='4']", { opacity: 1, y: 0, duration: 0.05 }, 0.82)
          .to("[data-flight-world]", { opacity: 0.08, duration: 0.06 }, 1.12)
          .to("[data-flight-endpoint]", { opacity: 0, duration: 0.06 }, 1.12)
          .to("[data-flight-path], [data-flight-orbiter]", { opacity: 0, duration: 0.05 }, 1.13)
          .to("[data-handoff-orbiter]", { opacity: 1, scale: 1, duration: 0.05 }, 1.17)
          .to("[data-phase='4']", { opacity: 0.22, duration: 0.05 }, 1.175);
      }, root);

      return () => {
        delete root.dataset.motion;
        context.revert();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={rootRef} className={`${styles.scene} ${styles.flightScene}`} aria-labelledby="flight-sequence-title">
      <div ref={stageRef} className={styles.pinnedStage}>
        <div className={styles.sceneBar}>
          <span>01 / One Pilot. Complete flight.</span>
          <small>Departure → arrival</small>
        </div>
        <h2 id="flight-sequence-title" className={styles.srOnly}>One autonomous Pilot across the complete flight</h2>

        <div className={styles.flightWorld} data-flight-world aria-hidden="true">
          <div className={styles.horizonImage} />
          <div className={styles.flightGround} />
        </div>

        <svg className={styles.flightTrajectory} viewBox="0 0 1200 700" aria-hidden="true">
          <path className={styles.flightTrajectoryGuide} d="M126 592 C126 470 154 356 276 270 C382 194 477 186 612 186 C764 186 858 214 936 314 C1008 406 1038 500 1080 592" />
          <path data-flight-path className={styles.flightTrajectoryActive} d="M126 592 C126 470 154 356 276 270 C382 194 477 186 612 186 C764 186 858 214 936 314 C1008 406 1038 500 1080 592" />
          <g className={styles.flightEndpoint} data-flight-endpoint transform="translate(126 662)">
            <circle cy="-70" r="5" />
            <path
              d="M-24 2L0-18L24 2L20 7L17 4V22H7V7H-7V22H-17V4L-20 7Z"
              style={{ fill: "#e9e9e5", stroke: "#f5f5f2" }}
            />
          </g>
          <g className={styles.flightEndpoint} data-flight-endpoint transform="translate(1080 662)">
            <circle cy="-70" r="5" />
            <path
              d="M-20 15V-9H-5V15M-5 15V-20H12V15M12 15V-3H22V15M-14-2H-10M1-12H6M1-5H6M17 4H19"
              style={{ fill: "#e9e9e5", stroke: "#f5f5f2" }}
            />
          </g>
        </svg>

        <div className={styles.flightOrbiter} data-flight-orbiter aria-hidden="true">
          <span className={styles.flightOrbiterGlyph} data-flight-orbiter-glyph><OrbiterGlyph /></span>
        </div>
        <div className={styles.handoffOrbiter} data-handoff-orbiter aria-hidden="true"><OrbiterGlyph /></div>

        <ol className={styles.phaseNarrative}>
          {phases.map(([number, title, description], index) => (
            <li key={number} data-phase={index}>
              <span>{number}</span><strong>{title}</strong><p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
