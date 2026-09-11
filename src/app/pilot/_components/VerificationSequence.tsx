"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./scenes.module.css";

const stages = [
  ["01", "Simulation", "Bounded scenarios and explicit assumptions."],
  ["02", "Software-in-the-loop", "Control logic evaluated against simulated systems."],
  ["03", "Hardware-in-the-loop", "Computing, sensors, and interfaces introduced."],
  ["04", "Integrated vehicle testing", "Subsystem behavior evaluated together."],
  ["05", "Flight testing", "Physical evidence within controlled envelopes."],
  ["06", "Operating evidence", "Evidence appropriate to approval and certification work."],
];

export function VerificationSequence() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
        root.dataset.motion = "true";
        gsap.set("[data-verification-line]", { "--verification-progress": 0 });
        gsap.set("[data-verification-stage]", { opacity: 0.16 });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        timeline.to("[data-verification-line]", { "--verification-progress": 1, duration: 1 }, 0);
        stages.forEach((_, index) => {
          timeline.to(`[data-verification-stage='${index}']`, { opacity: 1, duration: 0.1 }, 0.08 + index * 0.145);
        });
    }, root);

    return () => {
      delete root.dataset.motion;
      context.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className={`${styles.scene} ${styles.verificationScene}`} aria-labelledby="verification-title">
      <div className={styles.verificationStage}>
        <header className={styles.verificationHeader}>
          <p className={styles.eyebrow}>04 / Development and verification progression</p>
          <h2 id="verification-title">Authority follows evidence.</h2>
          <p>Increasingly consequential control authority requires increasingly strong verification evidence.</p>
        </header>

        <div className={styles.verificationRail}>
          <i data-verification-line aria-hidden="true" />
          <ol>
            {stages.map(([number, title, detail], index) => (
              <li key={number} data-verification-stage={index}>
                <span>{number}</span>
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
