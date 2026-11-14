"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase";
import styles from "./ContactForm.module.css";

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  service: "Web App",
  message: "",
};

const SERVICES = [
  "Web App",
  "Mobile App",
  "UI/UX Design",
  "AI / ML",
  "Product Strategy",
  "Other",
];

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Tell us a bit more (at least 10 characters).";
  }
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("loading");
    setStatusMessage("");

    try {
      await addDoc(collection(db, "inquiries"), {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || null,
        service: values.service,
        message: values.message.trim(),
        source: "website-contact-form",
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setStatusMessage("Thanks — we’ll get back to you soon.");
      setValues(INITIAL);
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
      setStatusMessage(
        "Something went wrong. Please try again or email us directly."
      );
    }
  };

  return (
    <section id="contactus" className={styles.section}>
      <div className="container">
        <motion.div
          className={`glass ${styles.shell}`}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.glow} aria-hidden />

          <div className={styles.copy}>
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let’s build something calm and clear</h2>
            <p className={styles.lead}>
              Share a little about your product idea, timeline, or challenge.
              We’ll reply with thoughtful next steps.
            </p>

            <div className={styles.points}>
              <div className={`glass-strong ${styles.point}`}>
                <div className={styles.pointIcon}>💬</div>
                <div>
                  <strong>Fast response</strong>
                  <p>We usually reply within one business day.</p>
                </div>
              </div>
              <div className={`glass-strong ${styles.point}`}>
                <div className={styles.pointIcon}>🧭</div>
                <div>
                  <strong>Clear scoping</strong>
                  <p>Goals, timeline, and a practical path forward.</p>
                </div>
              </div>
              <div className={`glass-strong ${styles.point}`}>
                <div className={styles.pointIcon}>✨</div>
                <div>
                  <strong>Soft glass craft</strong>
                  <p>Design and engineering that feel effortless.</p>
                </div>
              </div>
            </div>
          </div>

          <form
            className={`glass-strong ${styles.form}`}
            onSubmit={onSubmit}
            noValidate
          >
            <div className={`${styles.row} ${styles.rowTwo}`}>
              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={values.name}
                  onChange={onChange}
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={values.email}
                  onChange={onChange}
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>
            </div>

            <div className={`${styles.row} ${styles.rowTwo}`}>
              <div className={styles.field}>
                <label htmlFor="phone">Phone (optional)</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 555 000 0000"
                  value={values.phone}
                  onChange={onChange}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="service">I’m interested in</label>
                <select
                  id="service"
                  name="service"
                  value={values.service}
                  onChange={onChange}
                >
                  {SERVICES.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Project details</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your goals, timeline, and anything else we should know…"
                value={values.message}
                onChange={onChange}
              />
              {errors.message && (
                <span className={styles.error}>{errors.message}</span>
              )}
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                className={`btn btn-primary ${styles.button}`}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending…" : "Send message"}
              </button>
              {statusMessage && (
                <span
                  className={`${styles.status} ${
                    status === "success"
                      ? styles.statusOk
                      : status === "error"
                        ? styles.statusErr
                        : ""
                  }`}
                  role="status"
                >
                  {statusMessage}
                </span>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
