"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import styles from "./Products.module.css";

export default function Products() {
  return (
    <section id="products" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Our Products</span>
          <h2 className="section-title">Apps we ship to the world</h2>
          <p className="section-lead">
            Live products from XiviaSoft — available on the store, built with the
            same calm craft as our client work.
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: index * 0.08,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/products/${product.slug}/`}
                className={`glass ${styles.card}`}
              >
                <div className={styles.preview} aria-hidden>
                  <div className={styles.previewGlow} />
                  <motion.span
                    className={styles.floatFlag}
                    style={{ top: "18%", left: "12%" }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                  >
                    🇧🇷
                  </motion.span>
                  <motion.span
                    className={styles.floatFlag}
                    style={{ top: "22%", right: "14%" }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, delay: 0.4 }}
                  >
                    🇯🇵
                  </motion.span>
                  <motion.span
                    className={styles.floatFlag}
                    style={{ bottom: "18%", left: "18%" }}
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 3.8, repeat: Infinity, delay: 0.2 }}
                  >
                    🇨🇦
                  </motion.span>
                  <div className={styles.miniPhone}>
                    <div className={styles.miniScreen}>
                      <img
                        className={styles.miniIcon}
                        src={product.icon}
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className={styles.meta}>
                    <span className={styles.chip}>{product.category}</span>
                    <span className={styles.chip}>{product.platform}</span>
                    <span className={styles.chip}>{product.storeName}</span>
                  </div>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.short}>{product.short}</p>
                  <div className={styles.ctaRow}>
                    <span className="btn btn-primary">View product</span>
                    <span className={styles.linkHint}>Open details →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
