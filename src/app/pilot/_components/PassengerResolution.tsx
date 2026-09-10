import Link from "next/link";
import styles from "./scenes.module.css";

export function PassengerResolution() {
  return (
    <section className={`${styles.scene} ${styles.resolutionScene}`} aria-labelledby="resolution-title">
      <div className={styles.resolutionFrame}>
        <p className={styles.eyebrow}>05 / The passenger experience</p>
        <h2 id="resolution-title">
          The destination belongs to the traveler.<br />
          The workload belongs to the system.
        </h2>
        <p className={styles.resolutionSummary}>
          Routine Orbiter travel is intended to require a destination—not the continuous workload of manually flying an aircraft. The Vehicle defines what is physically possible, the Skyway defines where travel is eligible, and the Pilot turns both into autonomous movement.
        </p>

        <dl className={styles.resolutionDivision}>
          <div>
            <dt>Passenger input</dt>
            <dd>Choose the destination.</dd>
          </div>
          <div>
            <dt>Pilot responsibility</dt>
            <dd>Control and supervise the complete flight.</dd>
          </div>
        </dl>

        <div className={styles.resolutionActions}>
          <Link href="/vehicle">Explore the Orbiter <span aria-hidden="true">↗</span></Link>
          <Link href="/skyway">Explore the Skyway <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
