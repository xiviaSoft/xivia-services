"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import styles from "./HeroSection.module.css";

const HeroScene = dynamic(() => import("@/Component/three/HeroScene"), {
  ssr: false,
  loading: () => <div className={styles.stageGlow} aria-hidden />,
});

const FALLBACK = {
  headline: "Digital products with quiet clarity",
  support:
    "We design and build web, mobile, and AI experiences that feel effortless.",
};

export default function HeroSection() {
  const [copy, setCopy] = useState(FALLBACK);

  useEffect(() => {
    const load = async () => {
      try {
        const snapshot = await getDocs(collection(db, "title"));
        if (snapshot.empty) return;
        const data = snapshot.docs[0].data();
        setCopy({
          headline:
            data["1stLargePara"] || data.headerTitle || FALLBACK.headline,
          support: data["1stSmallPara"] || FALLBACK.support,
        });
      } catch {
        /* keep fallback */
      }
    };
    load();
  }, []);

  return (
    <section id="herosection" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className={styles.brandMark}>XiviaSoft</h1>
          <p className={styles.headline}>{copy.headline}</p>
          <p className={styles.support}>{copy.support}</p>
          <div className={styles.actions}>
            <a href="#contactus" className="btn btn-primary">
              Start a project
            </a>
            <a href="#projects" className="btn btn-ghost">
              Explore work
            </a>
          </div>
        </motion.div>

        <motion.div
          className={`glass ${styles.stage}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.stageGlow} />
          <div className={styles.canvasWrap}>
            <HeroScene />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
