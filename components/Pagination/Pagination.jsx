import { ChevronLeftIcon, ChevronRightIcon } from "../Icons/Icons";
import styles from "./Pagination.module.css";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const visiblePages = [];
  for (let index = 1; index <= totalPages; index += 1) {
    if (
      index === 1 ||
      index === totalPages ||
      Math.abs(index - page) <= 1
    ) {
      visiblePages.push(index);
    }
  }

  const items = [];
  visiblePages.forEach((value, index) => {
    if (index > 0 && value - visiblePages[index - 1] > 1) {
      items.push(`gap-${value}`);
    }
    items.push(value);
  });

  return (
    <nav className={styles.nav} aria-label="التنقل بين صفحات النتائج">
      <button
        type="button"
        className={styles.arrow}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="الصفحة السابقة"
      >
        <ChevronRightIcon size={18} />
      </button>

      {items.map((item) =>
        typeof item === "number" ? (
          <button
            key={item}
            type="button"
            className={[styles.page, item === page ? styles.active : ""].join(" ")}
            onClick={() => onChange(item)}
            aria-label={`الصفحة ${item}`}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </button>
        ) : (
          <span key={item} className={styles.gap} aria-hidden="true">
            …
          </span>
        ),
      )}

      <button
        type="button"
        className={styles.arrow}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="الصفحة التالية"
      >
        <ChevronLeftIcon size={18} />
      </button>
    </nav>
  );
}
