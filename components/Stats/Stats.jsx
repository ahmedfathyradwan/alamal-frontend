import { Icon } from "../Icons/Icons";
import shared from "@/styles/shared.module.css";
import styles from "./Stats.module.css";

export default function Stats({ items, className = "" }) {
  return (
    <section className={[styles.band, className].join(" ")}>
      <div className={shared.container}>
        <div className={styles.grid}>
          {items.map((item) => (
            <div className={styles.item} key={item.label}>
              <span className={styles.icon}>
                <Icon name={item.icon} size={26} />
              </span>
              <span className={styles.value}>{item.value}</span>
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
