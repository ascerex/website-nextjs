import type { Metadata } from "next";
import { Footer, Header } from "@/components";
import styles from "./privacy-policy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Ascerex",
  description:
    "How Ascerex handles information submitted through ascerex.com and technical information processed when visitors use the website.",
};

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    content: (
      <>
        <p>
          You may voluntarily provide information when you submit a contact or
          inquiry form, including your name, email address, company or
          organization, inquiry type, subject, message content, and any other
          information you choose to include.
        </p>
        <p>
          When you access the website, Ascerex&apos;s hosting provider may process
          basic technical information needed to deliver and protect the site.
          Depending on the request and hosting configuration, this may include
          an IP address, browser or device information, requested pages,
          timestamps, referring pages, and server or network logs. This does not
          mean that every category is separately collected or retained by
          Ascerex.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "How We Use Information",
    content: (
      <>
        <p>Information may be used to:</p>
        <ul>
          <li>Respond to inquiries and communicate about submitted requests.</li>
          <li>Route general, investor, partnership, technical, or media inquiries.</li>
          <li>Operate, maintain, troubleshoot, and secure the website.</li>
          <li>Diagnose technical problems, misuse, or security concerns.</li>
          <li>Understand website usage where a hosting-level analytics service is enabled.</li>
          <li>Comply with applicable legal obligations.</li>
        </ul>
      </>
    ),
  },
  {
    number: "03",
    title: "Hosting, Cookies & Analytics",
    content: (
      <>
        <p>
          This website is hosted on Netlify. Netlify provides hosting and
          infrastructure services and may process technical request information
          as reasonably necessary to deliver, operate, maintain, and secure the
          website.
        </p>
        <p>
          The contact form uses Netlify Forms. Information submitted through the
          form is transmitted through Netlify&apos;s infrastructure so the submission
          can be delivered and managed. The form includes a hidden honeypot field,
          and Netlify may apply its own spam filtering. No CAPTCHA is currently
          configured in the website code.
        </p>
        <p>
          The Ascerex application does not currently include advertising trackers,
          third-party analytics scripts, or code that sets non-essential cookies.
          Its interface framework may access browser local storage for a color-scheme
          preference. That local preference is not used for advertising and is not
          submitted with an inquiry. Hosting-level logs or analytics may operate
          outside the application code and cannot be determined from the public
          repository alone.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Sharing & Service Providers",
    content: (
      <>
        <p>
          Ascerex does not sell personal information. Information may be processed
          by or shared with service providers only as reasonably necessary to host
          and secure the website, manage form submissions and communications, or
          maintain supporting infrastructure. Netlify serves as the website&apos;s
          hosting, infrastructure, and form-processing provider.
        </p>
        <p>
          Information may also be disclosed when required by law or when reasonably
          necessary to protect the website, Ascerex, its users, or others from harm,
          fraud, misuse, or security threats.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Data Retention",
    content: (
      <p>
        Submitted information may be retained only for as long as reasonably
        necessary to respond to an inquiry, maintain appropriate business records,
        protect website security, resolve disputes, or meet applicable legal
        obligations. Retention may vary according to the nature of the information
        and the purpose for which it is held.
      </p>
    ),
  },
  {
    number: "06",
    title: "Security",
    content: (
      <p>
        Ascerex uses reasonable measures intended to protect information handled
        through the website. However, no internet transmission, website, or storage
        system can be guaranteed to be completely secure. Please do not submit
        confidential, proprietary, export-controlled, or highly sensitive material
        through the contact form.
      </p>
    ),
  },
  {
    number: "07",
    title: "Your Choices",
    content: (
      <p>
        You may contact Ascerex to request access to, correction of, or deletion of
        personal information you voluntarily submitted. Requests may be subject to
        applicable legal, security, identity-verification, or legitimate
        record-retention requirements. Send requests to{" "}
        <a href="mailto:contact@ascerex.com">contact@ascerex.com</a>.
      </p>
    ),
  },
  {
    number: "08",
    title: "Children's Privacy",
    content: (
      <p>
        The Ascerex website is not directed toward children under 13, and Ascerex
        does not knowingly collect personal information from children under 13
        through the website. If you believe a child has submitted personal
        information, contact Ascerex to request its deletion.
      </p>
    ),
  },
  {
    number: "09",
    title: "Third-Party Links",
    content: (
      <p>
        The website may link to third-party websites or services. Ascerex does not
        control and is not responsible for the content, security, or privacy
        practices of those external services. Review their policies before
        providing information to them.
      </p>
    ),
  },
  {
    number: "10",
    title: "Changes to This Policy",
    content: (
      <p>
        This Privacy Policy may be updated as the website, its services, or
        applicable legal requirements change. Revisions will be reflected by the
        &ldquo;Last updated&rdquo; date at the top of this page.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <header className={styles.intro}>
          <div className={styles.introInner}>
            <p className={styles.eyebrow}>Privacy</p>
            <h1>Privacy Policy</h1>
            <p className={styles.updated}>Last updated: September 11, 2026</p>
            <p className={styles.summary}>
              This policy describes what information may be collected through
              ascerex.com, how that information may be used, and the choices
              available to visitors.
            </p>
          </div>
        </header>

        <article className={styles.document}>
          {sections.map((section) => (
            <section
              key={section.number}
              className={styles.policySection}
              aria-labelledby={`privacy-section-${section.number}`}
            >
              <span className={styles.sectionNumber} aria-hidden="true">
                {section.number}
              </span>
              <div className={styles.sectionContent}>
                <h2 id={`privacy-section-${section.number}`}>{section.title}</h2>
                <div className={styles.sectionBody}>{section.content}</div>
              </div>
            </section>
          ))}

          <section className={styles.contactSection} aria-labelledby="privacy-contact-title">
            <span className={styles.sectionNumber} aria-hidden="true">11</span>
            <div className={styles.sectionContent}>
              <h2 id="privacy-contact-title">Contact</h2>
              <div className={styles.sectionBody}>
                <p>Questions regarding this Privacy Policy may be sent to:</p>
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
