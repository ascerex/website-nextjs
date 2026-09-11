import type { Metadata } from "next";
import { Footer, Header } from "@/components";
import styles from "../privacy-policy/privacy-policy.module.css";

export const metadata: Metadata = {
  title: "Terms of Use | Ascerex",
  description:
    "Terms governing access to and use of the Ascerex public website.",
};

const sections = [
  {
    number: "01",
    title: "Website Purpose",
    content: (
      <p>
        This website provides general information about Ascerex, its mission,
        research direction, proposed systems, and development activities. Its
        content is provided for informational purposes only and should not be
        treated as engineering, operational, legal, financial, or investment
        advice.
      </p>
    ),
  },
  {
    number: "02",
    title: "Acceptance of These Terms",
    content: (
      <p>
        By accessing or using ascerex.com, you agree to these Terms of Service.
        If you do not agree, do not use the website. These Terms apply only to
        the public website and do not replace any separate written agreement
        entered into with Ascerex.
      </p>
    ),
  },
  {
    number: "03",
    title: "Acceptable Use",
    content: (
      <>
        <p>You may use the website only for lawful purposes. You may not:</p>
        <ul>
          <li>Interfere with, damage, overload, or disrupt the website or its infrastructure.</li>
          <li>Attempt to bypass access controls or probe the website for vulnerabilities without authorization.</li>
          <li>Use automated systems in a manner that unreasonably burdens the website or circumvents technical restrictions.</li>
          <li>Submit unlawful, deceptive, malicious, infringing, or harmful material.</li>
          <li>Misrepresent your identity, affiliation, or the origin of a communication.</li>
        </ul>
      </>
    ),
  },
  {
    number: "04",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          Unless otherwise indicated, website text, graphics, branding,
          interfaces, software, and other materials made available by Ascerex
          are owned by or licensed to Ascerex and are protected by applicable
          intellectual-property laws.
        </p>
        <p>
          You may view the website and make limited copies for personal,
          noncommercial reference. No other license is granted. You may not
          reproduce, distribute, modify, publish, commercially exploit, or
          falsely attribute website materials without permission or another
          valid legal basis.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Technical & Forward-Looking Information",
    content: (
      <>
        <p>
          The website may discuss concepts, research plans, development goals,
          illustrative interfaces, simulations, and future capabilities. Such
          material is preliminary, may depend on assumptions, and may change as
          evidence and requirements develop.
        </p>
        <p>
          Renderings, diagrams, models, or analytical results do not by
          themselves establish physical validation, operational approval,
          certification, safety, performance, availability, or suitability for
          a particular use. Do not rely on website content to design, build,
          operate, or evaluate an aircraft or aviation system.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Investor Information",
    content: (
      <p>
        Nothing on this website constitutes an offer to sell, or a solicitation
        of an offer to purchase, any security. Information presented about
        Ascerex, its strategy, or future plans is provided for general
        informational purposes and does not constitute investment advice.
      </p>
    ),
  },
  {
    number: "07",
    title: "Submissions & Communications",
    content: (
      <>
        <p>
          If you send an inquiry, you represent that you have the right to
          provide its contents. Ascerex may use the submitted information to
          review, route, and respond to the communication as described in the
          Privacy Policy.
        </p>
        <p>
          Do not submit confidential, proprietary, export-controlled,
          security-sensitive, or highly sensitive personal information through
          the public contact form. Unless Ascerex has agreed otherwise in
          writing, sending a message does not create a confidential, fiduciary, advisory,
          employment, partnership, or investment relationship.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Third-Party Links",
    content: (
      <p>
        The website may link to third-party websites, resources, or services for
        convenience or reference. Ascerex does not control and is not responsible
        for their availability, content, security, terms, or privacy practices.
        A link does not necessarily imply endorsement.
      </p>
    ),
  },
  {
    number: "09",
    title: "Website Availability",
    content: (
      <p>
        Ascerex may update, suspend, restrict, or discontinue any part of the
        website without notice. Ascerex does not guarantee that the website will
        always be available, uninterrupted, current, complete, or free from
        errors or harmful components.
      </p>
    ),
  },
  {
    number: "10",
    title: "Disclaimers",
    content: (
      <p>
        To the fullest extent permitted by applicable law, the website and its
        content are provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of
        any kind, whether express, implied, or statutory. This includes implied
        warranties of merchantability, fitness for a particular purpose,
        accuracy, title, and non-infringement, to the extent those warranties may
        lawfully be disclaimed.
      </p>
    ),
  },
  {
    number: "11",
    title: "Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by applicable law, Ascerex and those
        involved in operating the website will not be liable for indirect,
        incidental, special, consequential, exemplary, or punitive damages, or
        for loss of data, opportunity, revenue, or profits arising from or related
        to website access, use, inability to use, or reliance on its content.
        Some jurisdictions do not allow certain limitations, so these limitations
        may not apply to you in full.
      </p>
    ),
  },
  {
    number: "12",
    title: "Changes to These Terms",
    content: (
      <p>
        These Terms may be updated as the website, Ascerex&apos;s activities, or legal
        requirements change. Revisions become effective when posted and will be
        reflected by the &ldquo;Last updated&rdquo; date at the top of this page.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <header className={styles.intro}>
          <div className={styles.introInner}>
            <p className={styles.eyebrow}>Terms</p>
            <h1>Terms of Use</h1>
            <p className={styles.updated}>Last updated: September 11, 2026</p>
            <p className={styles.summary}>
              These Terms govern access to and use of ascerex.com. They establish
              the boundaries for using the public website and its informational,
              technical, and company materials.
            </p>
          </div>
        </header>

        <article className={styles.document}>
          {sections.map((section) => (
            <section
              key={section.number}
              className={styles.policySection}
              aria-labelledby={`terms-section-${section.number}`}
            >
              <span className={styles.sectionNumber} aria-hidden="true">
                {section.number}
              </span>
              <div className={styles.sectionContent}>
                <h2 id={`terms-section-${section.number}`}>{section.title}</h2>
                <div className={styles.sectionBody}>{section.content}</div>
              </div>
            </section>
          ))}

          <section className={styles.contactSection} aria-labelledby="terms-contact-title">
            <span className={styles.sectionNumber} aria-hidden="true">13</span>
            <div className={styles.sectionContent}>
              <h2 id="terms-contact-title">Contact</h2>
              <div className={styles.sectionBody}>
                <p>Questions regarding these Terms may be sent to:</p>
                <address>
                  <a href="mailto:contact@ascerex.com">contact@ascerex.com</a>
                </address>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
