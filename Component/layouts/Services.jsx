"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/app/firebase";
import styles from "./Services.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  const [service, setServices] = useState([]);

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const docs = await getDocs(query(collection(db, "services")));
        setServices(docs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    getDocuments();
  }, []);

  return (
    <section id="services" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Services</span>
          <h2 className="section-title">Clarity in every delivery</h2>
          <p className="section-lead">
            Choose the capability you need — we keep the process calm, sharp,
            and measurable.
          </p>
        </div>

        <div className={styles.grid}>
          {service.map((item, i) => (
            <motion.article
              key={item.id || item.text || i}
              className={`glass ${styles.item}`}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
            >
              <div
                className={styles.iconWrap}
                style={item.bgcolor ? { background: item.bgcolor } : undefined}
              >
                {item.icon ? (
                  <img
                    className={styles.icon}
                    src={item.icon}
                    alt=""
                  />
                ) : null}
              </div>
              <div>
                <h3 className={styles.title}>{item.text}</h3>
                <p className={styles.detail}>{item.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
