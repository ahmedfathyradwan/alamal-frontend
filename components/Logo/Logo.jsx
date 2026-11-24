import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo({ variant = "dark", className = "" }) {
  return (
    <Link
      href="/"
      className={[styles.logo, styles[variant], className].filter(Boolean).join(" ")}
      aria-label="الأمل للعقارات - الصفحة الرئيسية"
    >
      <span className={styles.mark} aria-hidden="true">
        <svg viewBox="0 0 44 44" width="30" height="30" fill="none">
          <path
            d="M8 34V18a14 14 0 0 1 28 0v16"
            stroke="#AB874B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M15 34V19a7 7 0 0 1 14 0v15"
            stroke="#AB874B"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path d="M6 34h32" stroke="#AB874B" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 11v23" stroke="#AB874B" strokeWidth="1" opacity="0.5" />
        </svg>
      </span>
      <span className={styles.text}>
        <span className={styles.name}>الأمل</span>
        <span className={styles.sub}>للعقارات</span>
      </span>
    </Link>
  );
}
