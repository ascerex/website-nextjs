import styles from "./scenes.module.css";

const responsibilities = [
  ["Passenger", "Choose the destination without carrying the continuous workload of manual aircraft control."],
  ["Pilot", "Control and supervise takeoff, transition, route flight, approach, and landing as one continuous operation."],
  ["Operating boundaries", "Act only within the Orbiter's physical limits, Skyway authority, and the aircraft state the system can justify."],
];

export function AutonomyPurpose() {
  return (
    <section className={`${styles.scene} ${styles.purposeScene}`} aria-labelledby="purpose-title">
      <div className={styles.purposeFrame}>
        <header>
          <p className={styles.eyebrow}>Why autonomy is essential</p>
          <h2 id="purpose-title">Complete flight should not become passenger workload.</h2>
        </header>
        <div className={styles.purposeCopy}>
          <p>
            Manually flying an aircraft requires continuous attention to vehicle state, control demand, energy, navigation, and changing conditions. The Pilot is intended to take responsibility for that workload throughout the journey.
          </p>
          <p>
            That makes autonomy more than a convenience feature. It is the integration layer that turns an aircraft and an operating network into transportation designed for routine travelers.
          </p>
        </div>

        <dl className={styles.responsibilityList}>
          {responsibilities.map(([term, description], index) => (
            <div key={term}>
              <span>0{index + 1}</span>
              <dt>{term}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
