import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer, Header } from "@/components";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact | Ascerex",
  description:
    "Contact Ascerex about investment, strategic partnerships, media, and general inquiries.",
};

const inquiryRoutes = [
  ["01", "General", "Company and program questions"],
  ["02", "Investor", "Capital strategy and company direction"],
  ["03", "Partnership", "Strategic and technical relationships"],
  ["04", "Media", "Press and public-information requests"],
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="contact-title">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={styles.kicker}>Contact Ascerex</p>
            <h1 id="contact-title">Start the right conversation.</h1>
            <p className={styles.heroCopy}>
              Reach Ascerex directly with questions about the company, its
              technical programs, investment, or strategic opportunities.
            </p>
          </div>

          <div className={styles.directContact}>
            <span>Direct email</span>
            <a href="mailto:contact@ascerex.com">contact@ascerex.com</a>
            <p>Messages are reviewed directly and routed by inquiry type.</p>
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
              {inquiryRoutes.map(([number, title, detail]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <small>{detail}</small>
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
