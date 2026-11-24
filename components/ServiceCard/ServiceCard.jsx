import Link from "next/link";
import { ArrowLeftIcon, Icon } from "../Icons/Icons";
import styles from "./ServiceCard.module.css";

export default function ServiceCard({ service, href }) {
  return (
    <article className={styles.card}>
      <span className={styles.icon}>
        <Icon name={service.icon} size={28} />
      </span>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.description}>{service.description}</p>
      {href ? (
        <Link href={href} className={styles.link}>
          اعرف المزيد
          <ArrowLeftIcon size={15} />
        </Link>
      ) : null}
    </article>
  );
}
