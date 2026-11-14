"use client";

import { useEffect, useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  LocationOn,
  Phone,
  Email,
} from "@mui/icons-material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import Logo from "@/Component/brand/Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const snapshot = await getDocs(collection(db, "contact"));
        const contactData = snapshot.docs.map((doc) => doc.data());
        if (contactData.length) setContact(contactData[0]);
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContact();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={`glass ${styles.panel}`}>
          <div className={styles.brandBlock}>
            <Logo size={42} className={styles.logo} />
            <p className={styles.para}>
              {contact.footerPara ||
                "Soft-spoken engineering and design for products that feel effortless."}
            </p>
          </div>

          <div>
            <h3 className={styles.colTitle}>Quick links</h3>
            <div className={styles.links}>
              <a href="/#herosection">Home</a>
              <a href="/#services">Services</a>
              <a href="/#projects">Projects</a>
              <a href="/#products">Products</a>
              <a href="/#aboutus">About</a>
              <a href="/#contactus">Contact</a>
            </div>
          </div>

          <div>
            <h3 className={styles.colTitle}>Get in touch</h3>
            <div className={styles.touch}>
              <a
                className={styles.touchRow}
                href={`https://www.google.com/maps?q=${encodeURIComponent(
                  contact.address || "Tahsil Matta Swat"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LocationOn fontSize="small" className={styles.icon} />
                <span>{contact.address || "Tahsil Matta Swat"}</span>
              </a>
              {contact.phone && (
                <a className={styles.touchRow} href={`tel:${contact.phone}`}>
                  <Phone fontSize="small" className={styles.icon} />
                  <span>{contact.phone}</span>
                </a>
              )}
              {contact.email && (
                <a
                  className={styles.touchRow}
                  href={`mailto:${contact.email}`}
                >
                  <Email fontSize="small" className={styles.icon} />
                  <span>{contact.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© XiviaSoft {new Date().getFullYear()} · All rights reserved</p>
          <div className={styles.socials}>
            <a className={styles.social} href="#" aria-label="Facebook">
              <Facebook fontSize="small" />
            </a>
            <a className={styles.social} href="#" aria-label="Twitter">
              <Twitter fontSize="small" />
            </a>
            <a className={styles.social} href="#" aria-label="Instagram">
              <Instagram fontSize="small" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
