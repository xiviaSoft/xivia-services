import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/Component/layouts/Navbar";
import Footer from "@/Component/common/Footer";
import {
  getAllProjectSlugs,
  getProject,
  getRelatedProjects,
} from "@/data/projects";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project · XiviaSoft" };
  return {
    title: `${project.title} · XiviaSoft`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug);

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className="container">
          <Link href="/#projects" className={styles.back}>
            ← Back to bookshelf
          </Link>

          <div className={styles.heroGrid}>
            <div>
              <div className={styles.kicker}>
                <span className={styles.chip}>{project.client}</span>
                <span className={styles.chip}>{project.type}</span>
                <span className={styles.chip}>{project.year}</span>
              </div>
              <h1 className={styles.title}>{project.title}</h1>
              <p className={styles.headline}>{project.headline}</p>
              <div className={styles.actions}>
                <a href="/#contactus" className="btn btn-primary">
                  Start a similar project
                </a>
                {project.appStoreLink && (
                  <a
                    href={project.appStoreLink}
                    className="btn btn-ghost"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    App Store
                  </a>
                )}
                {project.playStoreLink && (
                  <a
                    href={project.playStoreLink}
                    className="btn btn-ghost"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Play
                  </a>
                )}
                {!project.appStoreLink &&
                  !project.playStoreLink &&
                  project.siteUrl &&
                  project.siteUrl !== "#" && (
                    <a
                      href={project.siteUrl}
                      className="btn btn-ghost"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit live site
                    </a>
                  )}
              </div>
            </div>

            <div className={styles.heroVisual}>
              <img src={project.heroImage} alt={project.title} />
            </div>
          </div>
        </div>
      </section>

      {(() => {
        const visuals = (project.gallery || []).filter(
          (src) => src !== project.coverImage && src !== project.heroImage
        );
        if (!visuals.length) return null;
        return (
          <section className={styles.section}>
            <div className="container">
              <p className={styles.label}>Gallery</p>
              <h2 className={styles.heading} style={{ marginBottom: "1.25rem" }}>
                Product visuals
              </h2>
              <div className={styles.gallery}>
                {visuals.map((src) => (
                  <div key={src} className={styles.galleryItem}>
                    <img src={src} alt={`${project.title} screenshot`} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      <section className={styles.section}>
        <div className={`container glass ${styles.panel}`}>
          <div className={styles.sectionInner}>
            <div>
              <p className={styles.label}>Introduction</p>
              <h2 className={styles.heading}>{project.introduction.title}</h2>
            </div>
            <p className={styles.body}>{project.introduction.body}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionInner}>
            <div>
              <p className={styles.label}>Challenge</p>
              <h2 className={styles.heading}>{project.challenge.title}</h2>
            </div>
            <p className={styles.body}>{project.challenge.body}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container glass ${styles.panel}`}>
          <div className={styles.sectionInner}>
            <div>
              <p className={styles.label}>Partnership</p>
              <h2 className={styles.heading}>{project.collaboration.title}</h2>
            </div>
            <p className={styles.body}>{project.collaboration.body}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionInnerWide}>
            <div>
              <p className={styles.label}>Solution</p>
              <h2 className={styles.heading}>{project.solutionTitle}</h2>
              <p className={styles.body} style={{ marginTop: "0.85rem" }}>
                {project.summary}
              </p>
            </div>
            <div className={styles.featureGrid}>
              {project.features.map((feature) => (
                <article
                  key={feature.title}
                  className={`glass ${styles.feature}`}
                >
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className={styles.label}>Impact</p>
          <h2 className={styles.heading} style={{ marginBottom: "1.25rem" }}>
            Results that mattered
          </h2>
          <div className={styles.results}>
            {project.results.map((result) => (
              <div key={result.label} className={`glass ${styles.result}`}>
                <div className={styles.resultValue}>{result.value}</div>
                <div className={styles.resultLabel}>{result.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <blockquote className={`glass ${styles.quote}`}>
            <p className={styles.quoteText}>“{project.quote.text}”</p>
            <footer className={styles.quoteMeta}>
              <strong>{project.quote.author}</strong>
              {project.quote.role}
            </footer>
          </blockquote>

          <div className={styles.tech} aria-label="Technologies">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className={styles.label}>More stories</p>
          <h2 className={styles.heading} style={{ marginBottom: "1.25rem" }}>
            Related projects
          </h2>
          <div className={styles.related}>
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}/`}
                className={`glass ${styles.relatedCard}`}
              >
                <img src={item.coverImage} alt="" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={`glass ${styles.cta}`}>
            <h2>Ready for your own success story?</h2>
            <p>
              Tell us about the product you want to ship. We’ll explore scope,
              craft, and a calm path to launch.
            </p>
            <a href="/#contactus" className="btn btn-primary">
              Start a project
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
