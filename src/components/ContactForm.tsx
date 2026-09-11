"use client";

import { FormEvent, useState } from "react";
import styles from "./ContactForm.module.css";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const encodedData = new URLSearchParams();

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        encodedData.append(key, value);
      }
    });

    setSubmissionState("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedData.toString(),
      });

      if (!response.ok) {
        throw new Error("Contact form submission failed");
      }

      form.reset();
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  }

  return (
    <form
      className={styles.form}
      name="ascerex-contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="ascerex-contact" />
      <p className={styles.honeypot} aria-hidden="true">
        <label htmlFor="bot-field">Do not fill out this field</label>
        <input id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
      </p>

      <div className={styles.formHeader}>
        <span>Direct inquiry form</span>
        <span>Required fields marked *</span>
      </div>

      <div className={styles.fieldGrid}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Full name *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email">Email address *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-organization">Organization</label>
          <input
            id="contact-organization"
            name="organization"
            type="text"
            autoComplete="organization"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-type">Inquiry type *</label>
          <select
            id="contact-type"
            name="inquiry-type"
            defaultValue=""
            required
            aria-required="true"
          >
            <option value="" disabled>
              Select an inquiry
            </option>
            <option value="general">General inquiry</option>
            <option value="investor">Investor inquiry</option>
            <option value="partnership">Strategic partnership</option>
            <option value="media">Media or press</option>
            <option value="technical">Technical inquiry</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-subject">Subject *</label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          aria-required="true"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Message *</label>
        <textarea
          id="contact-message"
          name="message"
          rows={7}
          required
          aria-required="true"
          aria-describedby="message-guidance"
        />
        <span id="message-guidance" className={styles.fieldGuidance}>
          Include relevant context, but do not submit confidential or proprietary material.
        </span>
      </div>

      <div className={styles.formFooter}>
        <p>Your information is used to review and respond to this inquiry.</p>
        <button type="submit" disabled={submissionState === "submitting"}>
          <span>{submissionState === "submitting" ? "Sending" : "Send inquiry"}</span>
          <i aria-hidden="true">↗</i>
        </button>
      </div>

      <div className={styles.status} aria-live="polite" aria-atomic="true">
        {submissionState === "success" && (
          <p className={styles.success}>Your inquiry was received. Thank you.</p>
        )}
        {submissionState === "error" && (
          <p className={styles.error} role="alert">
            The form could not be sent. Email us directly at{" "}
            <a href="mailto:contact@ascerex.com">contact@ascerex.com</a>.
          </p>
        )}
      </div>
    </form>
  );
}
