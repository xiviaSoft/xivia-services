"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Close } from "@mui/icons-material";
import Logo from "@/Component/brand/Logo";
import styles from "./Navbar.module.css";

const navItems = [
  { name: "Home", path: "/#herosection" },
  { name: "Services", path: "/#services" },
  { name: "Projects", path: "/#projects" },
  { name: "Products", path: "/#products" },
  { name: "About", path: "/#aboutus" },
  { name: "Contact", path: "/#contactus", cta: true },
];

const backdropMotion = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelMotion = {
  hidden: { x: "100%", opacity: 0.6 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 280, damping: 32, mass: 0.9 },
  },
  exit: {
    x: "100%",
    opacity: 0.6,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const linkMotion = {
  hidden: { opacity: 0, x: 24 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.08 + i * 0.05,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const brandHref = pathname === "/" ? "#herosection" : "/";

  return (
    <header className={styles.header}>
      <div className="container">
        <div
          className={`glass-strong ${styles.bar}`}
          style={{
            boxShadow: scrolled
              ? "0 16px 40px rgba(21, 36, 51, 0.12)"
              : undefined,
          }}
        >
          <a href={brandHref} className={styles.brand} aria-label="XiviaSoft home">
            <Logo size={36} />
          </a>

          <nav className={styles.nav} aria-label="Primary">
            {navItems.map((item) =>
              item.cta ? (
                <a key={item.name} href={item.path} className="btn btn-primary">
                  {item.name}
                </a>
              ) : (
                <a key={item.name} href={item.path} className={styles.link}>
                  {item.name}
                </a>
              )
            )}
          </nav>

          <button
            type="button"
            className={styles.menuBtn}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <motion.span
              key={open ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -40, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              style={{ display: "grid", placeItems: "center" }}
            >
              {open ? <Close /> : <Menu />}
            </motion.span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.drawer}
            variants={backdropMotion}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className={`glass-strong ${styles.drawerPanel}`}
              variants={panelMotion}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.drawerTop}>
                <Logo size={34} />
                <button
                  type="button"
                  className={styles.menuBtn}
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <Close />
                </button>
              </div>

              <nav className={styles.drawerNav} aria-label="Mobile">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.path}
                    custom={i}
                    variants={linkMotion}
                    initial="hidden"
                    animate="visible"
                    className={item.cta ? `btn btn-primary ${styles.drawerCta}` : styles.drawerLink}
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
