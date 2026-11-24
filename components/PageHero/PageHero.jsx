import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import shared from "@/styles/shared.module.css";
import styles from "./PageHero.module.css";

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.pattern} aria-hidden="true" />
      <div className={`${shared.container} ${styles.inner}`}>
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} tone="light" /> : null}
        {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
        <h1 className={styles.title}>{title}</h1>
        {description ? <p className={styles.description}>{description}</p> : null}
        {children ? <div className={styles.extra}>{children}</div> : null}
      </div>
    </section>
  );
}
