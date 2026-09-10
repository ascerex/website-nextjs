import Image from "next/image";

import styles from "./scenes.module.css";

export function PilotHero() {
  return (
    <section className={`${styles.scene} ${styles.heroScene}`} aria-labelledby="pilot-title">
      <div className={styles.heroFrame}>
        <Image
          className={styles.heroImage}
          src="/images/pilotHero.png"
          alt="Concept visualization of an autonomous aircraft flight deck"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} aria-hidden="true" />

        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Flight autonomy</p>
          <h1 id="pilot-title">The Pilot</h1>
          <p className={styles.heroThesis}>
            You choose where.<br />The Pilot handles how.
          </p>
          <p className={styles.heroSummary}>
            Ascerex is developing an autonomous flight system intended to operate the Orbiter from departure to arrival without making routine travel depend on passengers manually flying the aircraft.
          </p>
        </div>
      </div>
    </section>
  );
}
