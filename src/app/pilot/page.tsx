import type { Metadata } from "next";
import { Footer, Header } from "@/components";
import { AutonomyPurpose } from "./_components/AutonomyPurpose";
import { FlightSequence } from "./_components/FlightSequence";
import { PassengerResolution } from "./_components/PassengerResolution";
import { PilotArchitectureScene } from "./_components/PilotArchitectureScene";
import { PilotHero } from "./_components/PilotHero";
import { SafetySupervisionScene } from "./_components/SafetySupervisionScene";
import { VerificationSequence } from "./_components/VerificationSequence";
import styles from "./pilot.module.css";

export const metadata: Metadata = {
  title: "Flight Autonomy | Ascerex",
  description:
    "The Ascerex concept for a future autonomous Pilot bounded by the Orbiter, Skyway, and observed operating environment.",
};

export default function FlightAutonomyPage() {
  return (
    <>
      <Header />
      <main className={styles.experience}>
        <PilotHero />
        <FlightSequence />
        <AutonomyPurpose />
        <PilotArchitectureScene />
        <SafetySupervisionScene />
        <VerificationSequence />
        <PassengerResolution />
      </main>
      <Footer />
    </>
  );
}
