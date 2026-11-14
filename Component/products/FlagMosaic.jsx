"use client";

import { motion } from "framer-motion";
import styles from "./ProductDetail.module.css";

const TILES = [
  { emoji: "🇯🇵", color: "#fff5f5" },
  { emoji: "🇧🇷", color: "#f0fff4" },
  { emoji: "🇨🇦", color: "#fff1f0" },
  { emoji: "🇫🇷", color: "#f0f5ff" },
  { emoji: "🇰🇪", color: "#fffbeb" },
  { emoji: "🇦🇺", color: "#eff6ff" },
  { emoji: "🇮🇳", color: "#fff7ed" },
  { emoji: "🇩🇪", color: "#f8fafc" },
  { emoji: "🇮🇹", color: "#f0fdf4" },
  { emoji: "🇲🇽", color: "#ecfdf5" },
  { emoji: "🇸🇪", color: "#eff6ff" },
  { emoji: "🇿🇦", color: "#fefce8" },
];

export default function FlagMosaic() {
  return (
    <div className={styles.mosaic} aria-hidden>
      {TILES.map((tile, i) => (
        <motion.div
          key={`${tile.emoji}-${i}`}
          className={styles.mosaicTile}
          style={{ background: tile.color }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.4 }}
          whileHover={{ y: -6, scale: 1.05 }}
        >
          <span>{tile.emoji}</span>
        </motion.div>
      ))}
    </div>
  );
}
