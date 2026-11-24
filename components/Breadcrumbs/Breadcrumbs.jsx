import Link from "next/link";
import { ChevronLeftIcon } from "../Icons/Icons";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ items = [], tone = "dark" }) {
  return (
    <nav
      aria-label="مسار التصفح"
      className={[styles.nav, styles[tone]].join(" ")}
    >
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {index > 0 ? (
                <ChevronLeftIcon size={14} className={styles.separator} />
              ) : null}
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={styles.current}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
