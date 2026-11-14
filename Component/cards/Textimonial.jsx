"use client";

import { motion } from "framer-motion";
import { Rating } from "@mui/material";
import { testimonials } from "@/data/testimonials";
import styles from "./Textimonial.module.css";

export default function TestimonialCarousel() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Client voices</span>
          <h2 className="section-title">What our clients say</h2>
        </div>

        <div className={styles.track}>
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name || index}
              className={`glass ${styles.card}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: (index % 3) * 0.08,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className={styles.person}>
                <img
                  className={styles.avatar}
                  src={item.image}
                  alt=""
                />
                <div>
                  <div className={styles.name}>{item.name}</div>
                  {item.role && (
                    <div className={styles.role}>{item.role}</div>
                  )}
                  <Rating
                    value={Number(item.rating) || 5}
                    readOnly
                    size="small"
                  />
                </div>
              </div>
              <p className={styles.quote}>{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
