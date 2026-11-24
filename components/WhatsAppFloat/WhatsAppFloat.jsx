import { buildWhatsAppUrl } from "@/lib/links";
import { WhatsAppIcon } from "../Icons/Icons";
import styles from "./WhatsAppFloat.module.css";

export default function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.float}
      aria-label="تواصل معنا عبر واتساب"
    >
      <WhatsAppIcon size={27} />
      <span className={styles.tooltip}>تحدث معنا</span>
    </a>
  );
}
