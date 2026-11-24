import shared from "@/styles/shared.module.css";
import styles from "./ListingSkeleton.module.css";

export default function ListingSkeleton({ cards = 6 }) {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className={shared.srOnly}>جارٍ تحميل العقارات...</span>
      <div className={styles.grid} aria-hidden="true">
        {Array.from({ length: cards }).map((_, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.media} />
            <div className={styles.body}>
              <span className={styles.lineWide} />
              <span className={styles.lineShort} />
              <span className={styles.line} />
              <span className={styles.line} />
              <div className={styles.footer}>
                <span className={styles.price} />
                <span className={styles.link} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
