"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Aboutus.module.css";

const stats = [
  { number: "200+", label: "Team members" },
  { number: "900+", label: "Client reviews" },
  { number: "20+", label: "Projects shipped" },
];

export default function Aboutus() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="aboutus" className="section">
      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.media}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.frame}>
            <img
              className={styles.image}
              src="/images/pexels-photo-5256526.webp"
              alt="Team collaborating"
            />
          </div>
          <div className={`glass-strong ${styles.stats}`}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">About us</span>
          <h2 className="section-title">Why teams choose XiviaSoft</h2>
          <p className={styles.body}>
            Our team gives you personalized support within the hour — available
            around the clock. We stay committed to superior, professional
            delivery through live guidance, clear tutorials, and a living
            knowledge base.
            {expanded && (
              <>
                {" "}
                We also offer one-on-one consultation tailored to your business
                needs, so you stay ahead with the right tools and strategies.
              </>
            )}
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
