"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { projects } from "@/data/projects";
import styles from "./Bookshelf.module.css";

export default function Bookshelf() {
  const railRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  };

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollByBooks = (direction) => {
    const el = railRef.current;
    if (!el) return;
    const amount = Math.max(220, Math.round(el.clientWidth * 0.55)) * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Projects</span>
          <h2 className="section-title">A shelf of shipped stories</h2>
          <p className="section-lead">
            Each book is a product we helped bring to life. Pull one to open the
            full case study.
          </p>
        </div>

        <div className={`glass ${styles.shelfWrap}`}>
          <div className={styles.topRow}>
            <p className={styles.hint}>Hover to peek · Click to open</p>
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.arrow}
                aria-label="Scroll projects left"
                onClick={() => scrollByBooks(-1)}
                disabled={!canPrev}
              >
                <ChevronLeftIcon fontSize="small" />
              </button>
              <button
                type="button"
                className={styles.arrow}
                aria-label="Scroll projects right"
                onClick={() => scrollByBooks(1)}
                disabled={!canNext}
              >
                <ChevronRightIcon fontSize="small" />
              </button>
            </div>
          </div>

          <div className={styles.rail} ref={railRef}>
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                className={styles.bookWrap}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: Math.min(index * 0.04, 0.4),
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  whileHover={{
                    y: -18,
                    rotate: index % 2 === 0 ? -4 : 4,
                    scale: 1.04,
                  }}
                  whileTap={{ scale: 0.98, y: -8 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  <Link
                    href={`/projects/${project.slug}/`}
                    className={styles.book}
                    style={{ background: project.spineColor }}
                    aria-label={`Open project ${project.title}`}
                  >
                    <span
                      className={styles.spine}
                      style={{ color: project.spineText }}
                    >
                      {project.spineTitle}
                    </span>
                    <span className={styles.band} />
                    <span className={`${styles.band} ${styles.bandAlt}`} />
                    <span className={styles.pages} aria-hidden />

                    <span className={`glass-strong ${styles.tooltip}`}>
                      <span className={styles.tipClient}>{project.client}</span>
                      <span className={styles.tipTitle}>{project.title}</span>
                      <span className={styles.tipMeta}>
                        {project.type} · {project.year}
                      </span>
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className={styles.shelf} aria-hidden />
        </div>
      </div>
    </section>
  );
}
