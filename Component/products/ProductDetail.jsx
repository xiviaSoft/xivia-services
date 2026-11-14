"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FlagMosaic from "./FlagMosaic";
import styles from "./ProductDetail.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const floatPositions = [
  { top: "8%", left: "6%" },
  { top: "18%", right: "4%" },
  { bottom: "28%", left: "2%" },
  { bottom: "18%", right: "8%" },
  { top: "42%", left: "0%" },
  { top: "48%", right: "0%" },
];

const MARQUEE_FLAGS = [
  "🇯🇵",
  "🇧🇷",
  "🇨🇦",
  "🇫🇷",
  "🇰🇪",
  "🇦🇺",
  "🇮🇳",
  "🇩🇪",
  "🇮🇹",
  "🇲🇽",
  "🇸🇪",
  "🇿🇦",
  "🇪🇸",
  "🇳🇴",
  "🇦🇷",
  "🇪🇬",
];

export default function ProductDetail({ product }) {
  const marquee = [...MARQUEE_FLAGS, ...MARQUEE_FLAGS];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <Link href="/#products" className={styles.back}>
            ← Back to products
          </Link>

          <div className={`glass ${styles.heroStage}`}>
            <div className={styles.heroGlow} aria-hidden />

            <motion.div
              className={styles.heroCopy}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.meta}>
                <span className={styles.chip}>{product.category}</span>
                <span className={styles.chip}>{product.platform}</span>
                <span className={styles.chip}>{product.ratingLabel}</span>
                <span className={styles.chip}>{product.developer}</span>
              </div>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.headline}>{product.headline}</p>
              <div className={styles.actions}>
                <a
                  href={product.storeUrl}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get on {product.storeName}
                </a>
                <a href="/#contactus" className="btn btn-ghost">
                  Build with us
                </a>
              </div>
            </motion.div>

            <motion.div
              className={styles.visual}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className={styles.orbit} aria-hidden />

              {product.floatingFlags?.map((flag, i) => (
                <motion.div
                  key={`${flag}-${i}`}
                  className={styles.flagFloat}
                  style={floatPositions[i]}
                  animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
                  transition={{
                    duration: 4 + i * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                  aria-hidden
                >
                  {flag}
                </motion.div>
              ))}

              <motion.div
                className={styles.phone}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className={styles.phoneNotch} />
                <div className={styles.phoneScreen}>
                  <img
                    className={styles.phoneIcon}
                    src={product.icon}
                    alt=""
                  />
                  <div className={styles.phoneAppName}>{product.name}</div>
                  <div className={styles.phoneQuiz}>
                    <div className={styles.phonePrompt}>Which country?</div>
                    <div className={styles.phoneFlag} aria-hidden>
                      🇯🇵
                    </div>
                    <div className={styles.phoneChoices}>
                      <div className={styles.phoneChoice}>South Korea</div>
                      <div
                        className={`${styles.phoneChoice} ${styles.phoneChoiceActive}`}
                      >
                        Japan
                      </div>
                      <div className={styles.phoneChoice}>China</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {product.bannerImage && (
            <motion.div
              className={styles.banner}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={product.bannerImage} alt="" />
              <div className={styles.bannerOverlay}>
                <div className={`glass-strong ${styles.bannerBadge}`}>
                  <img src={product.icon} alt="" />
                  Explore the world, one flag at a time
                </div>
              </div>
            </motion.div>
          )}

          <div className={styles.stats}>
            {product.stats?.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`glass-strong ${styles.stat}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className={styles.marquee} aria-hidden>
            <div className={styles.marqueeTrack}>
              {marquee.map((flag, i) => (
                <div key={`${flag}-${i}`} className={styles.marqueeItem}>
                  {flag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <motion.div
            className={`glass ${styles.overview}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
          >
            <div className={styles.overviewArt} aria-hidden>
              <div className={styles.mapRing}>
                <span className={styles.mapEmoji}>🌍</span>
              </div>
              {product.continents?.map((item) => (
                <span
                  key={item.label}
                  className={styles.continent}
                  style={item.style}
                >
                  {item.label}
                </span>
              ))}
            </div>
            <div>
              <p className={styles.label}>Overview</p>
              <h2 className={styles.heading}>{product.about.title}</h2>
              <p className={styles.body} style={{ marginTop: "1rem" }}>
                {product.about.body}
              </p>
            </div>
          </motion.div>

          <div className={styles.showcase}>
            {product.deviceImage && (
              <motion.div
                className={styles.showcaseArt}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <img
                  src={product.deviceImage}
                  alt={`${product.name} visual`}
                />
              </motion.div>
            )}
            {product.worldImage && (
              <motion.div
                className={styles.worldCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={1}
              >
                <img src={product.worldImage} alt="" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className={styles.label}>World library</p>
          <h2 className={styles.heading}>Flags from everywhere</h2>
          <div className={styles.mosaicWrap}>
            <FlagMosaic />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className={styles.label}>Inside the app</p>
          <h2 className={styles.heading}>Screens that spark play</h2>
          <div className={styles.gallery}>
            {product.gallery?.map((shot, i) => (
              <motion.article
                key={shot.title}
                className={styles.shot}
                style={{ background: shot.accent }}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                whileHover={{ y: -6 }}
              >
                <div className={styles.shotDecor} aria-hidden />
                <div
                  className={`${styles.shotDecor} ${styles.shotDecorAlt}`}
                  aria-hidden
                />
                <div className={styles.shotTop}>
                  <div className={styles.shotEmoji}>{shot.emoji}</div>
                </div>
                <div className={styles.shotUi} aria-hidden>
                  <div className={styles.shotBar} />
                  <div className={`${styles.shotBar} ${styles.shotBarShort}`} />
                  <div className={styles.shotPanel}>{shot.emoji}</div>
                </div>
                <div className={styles.shotMeta}>
                  <h3>{shot.title}</h3>
                  <p>{shot.caption}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className={styles.label}>Game modes</p>
          <h2 className={styles.heading}>Play your way</h2>
          <div className={styles.modeGrid}>
            {product.modes.map((mode, i) => (
              <motion.article
                key={mode.title}
                className={styles.modeCard}
                style={{ background: mode.gradient }}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
              >
                <div className={styles.modeIcon}>{mode.icon}</div>
                <div className={styles.modeContent}>
                  <h3>{mode.title}</h3>
                  <p>{mode.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className={styles.label}>Features</p>
          <h2 className={styles.heading}>Why players love it</h2>
          <div className={styles.featureGrid}>
            {product.features.map((feature, i) => (
              <motion.article
                key={feature.title}
                className={`glass ${styles.featureCard}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className={styles.label}>Roadmap</p>
          <h2 className={styles.heading}>Coming soon</h2>
          <div className={styles.timeline}>
            {product.comingSoon.map((item, i) => (
              <motion.div
                key={item}
                className={`glass ${styles.timelineItem}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className={styles.timelineDot}>{i + 1}</div>
                <p>{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className={styles.label}>Privacy</p>
          <h2 className={styles.heading}>Built with care</h2>
          <div className={styles.privacyGrid}>
            {product.privacy.map((item, i) => (
              <motion.div
                key={item.title}
                className={`glass ${styles.privacyCard}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className={styles.privacyIcon}>{item.icon}</div>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              </motion.div>
            ))}
            <motion.div
              className={`glass ${styles.privacyCard}`}
              style={{ gridColumn: "1 / -1" }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className={styles.privacyIcon}>🆕</div>
              <div>
                <strong>What’s new</strong>
                <p>{product.whatsNew}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={`glass ${styles.cta}`}>
            <div className={styles.ctaGlow} aria-hidden />
            {product.deviceImage && (
              <div className={styles.ctaArt} aria-hidden>
                <img src={product.deviceImage} alt="" />
              </div>
            )}
            <div className={styles.ctaContent}>
              <h2>Ready to play {product.name}?</h2>
              <p>
                Download the app on Google Play and see how many flags you truly
                know — or talk to us about building your next product.
              </p>
              <div className={styles.ctaActions}>
                <a
                  href={product.storeUrl}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open on Google Play
                </a>
                <a href="/#contactus" className="btn btn-ghost">
                  Contact XiviaSoft
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
