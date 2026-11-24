import { Icon } from "../Icons/Icons";
import styles from "./EmptyState.module.css";

export default function EmptyState({
  icon = "search",
  title = "لا توجد نتائج",
  description = "جرّب تعديل معايير البحث أو إعادة تعيين الفلاتر لعرض المزيد من العقارات.",
  action,
}) {
  return (
    <div className={styles.wrap} role="status">
      <span className={styles.icon}>
        <Icon name={icon} size={32} />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
