"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { db } from "@/app/firebase";
import styles from "./Gallery.module.css";

export default function Gallery() {
  const [projects, setProjects] = useState([]);
  const [galleryText, setGalleryText] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [gallerySnap, textSnap] = await Promise.all([
          getDocs(collection(db, "gallery")),
          getDocs(collection(db, "gallery-text")),
        ]);
        setProjects(gallerySnap.docs.map((doc) => doc.data()));
        if (!textSnap.empty) {
          setGalleryText(textSnap.docs[0].data());
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };
    fetchAll();
  }, []);

  const handleNext = () =>
    setCurrentIndex((prev) =>
      projects.length ? (prev === projects.length - 1 ? 0 : prev + 1) : 0
    );
  const handlePrev = () =>
    setCurrentIndex((prev) =>
      projects.length ? (prev === 0 ? projects.length - 1 : prev - 1) : 0
    );

  useEffect(() => {
    if (!projects.length) return;
    const timer = setTimeout(handleNext, 9000);
    return () => clearTimeout(timer);
  }, [currentIndex, projects]);

  const project = projects[currentIndex];

  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        <div className={`glass ${styles.panel}`}>
          <div className={styles.copy}>
            <span className="section-label">Selected work</span>
            <h2 className="section-title">
              {galleryText?.title || "Spaces shaped with intention"}
            </h2>
            <p className="section-lead">
              {galleryText?.description ||
                "A calm look at products and platforms we have helped bring to life."}
            </p>
            {projects.length > 1 && (
              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.control}
                  onClick={handlePrev}
                  aria-label="Previous project"
                >
                  <ChevronLeftIcon fontSize="small" />
                </button>
                <button
                  type="button"
                  className={styles.control}
                  onClick={handleNext}
                  aria-label="Next project"
                >
                  <ChevronRightIcon fontSize="small" />
                </button>
              </div>
            )}
          </div>

          <div className={styles.stage}>
            {project ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.title || currentIndex}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={styles.imageWrap}>
                    <img
                      className={styles.image}
                      src={project.Image}
                      alt={project.title || "Project"}
                    />
                  </div>
                  <div className={`glass-strong ${styles.meta}`}>
                    {project.client && (
                      <p className={styles.client}>{project.client}</p>
                    )}
                    <h3 className={styles.title}>{project.title}</h3>
                    {project.description && (
                      <p className={styles.desc}>{project.description}</p>
                    )}
                    {project.link && (
                      <a
                        className={styles.link}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View site →
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className={`glass ${styles.imageWrap}`} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
