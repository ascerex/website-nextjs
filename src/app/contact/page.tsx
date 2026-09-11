import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer, Header } from "@/components";
import { inquiryRoutes } from "@/data/inquiryRoutes";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact | Ascerex",
  description:
    "Contact Ascerex about investment, strategic partnerships, media, and general inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="contact-title">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroFrame}>
            <div className={styles.heroContent}>
              <p className={styles.kicker}>Contact Ascerex</p>
              <h1 id="contact-title">Start the right conversation.</h1>
              <p className={styles.heroCopy}>
                Reach Ascerex directly with questions about the company, its
                technical programs, investment, or strategic opportunities.
              </p>
            </div>

            <div className={styles.directContact}>
              <span>Direct inquiry routing</span>
              <p>Messages are reviewed directly and routed by inquiry type.</p>
            </div>
          </div>
        </section>

        <section className={styles.contactSection} aria-labelledby="inquiry-title">
          <div className={styles.contextPanel}>
            <div>
              <p className={styles.kicker}>Inquiry routing</p>
              <h2 id="inquiry-title">Tell us what brings you here.</h2>
              <p className={styles.sectionCopy}>
                Select the closest inquiry type and provide enough context for
                a useful response. No account or registration is required.
              </p>
            </div>

            <ol className={styles.routeList}>
              {inquiryRoutes.map((route) => (
                <li key={route.value}>
                  <span>{route.number}</span>
                  <div>
                    <strong>{route.title}</strong>
                    <small>{route.detail}</small>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
