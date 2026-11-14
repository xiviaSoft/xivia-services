"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram } from "@mui/icons-material";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/app/firebase";
import styles from "./Team.module.css";

export default function TeamSection() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const getTeam = async () => {
      try {
        const data = await getDocs(query(collection(db, "team-member")));
        setTeam(
          data.docs.map((member) => ({ id: member.id, ...member.data() }))
        );
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    getTeam();
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Creative team</span>
          <h2 className="section-title">People behind the polish</h2>
          <p className="section-lead">
            Experienced professionals who care about craft, clarity, and calm
            delivery.
          </p>
        </div>

        <div className={styles.grid}>
          {team.map((member, i) => (
            <motion.article
              key={member.id}
              className={`glass ${styles.card}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: (i % 3) * 0.08,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                className={styles.photo}
                src={
                  member.image ||
                  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&h=500&fit=crop&crop=faces"
                }
                alt={member.name}
              />
              <div className={styles.body}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                {member.description && (
                  <p className={styles.desc}>{member.description}</p>
                )}
                <div className={styles.socials}>
                  {member.socialLinks?.facebook && (
                    <a
                      className={styles.social}
                      href={member.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on Facebook`}
                    >
                      <Facebook fontSize="small" />
                    </a>
                  )}
                  {member.socialLinks?.linkedin && (
                    <a
                      className={styles.social}
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on Instagram`}
                    >
                      <Instagram fontSize="small" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
