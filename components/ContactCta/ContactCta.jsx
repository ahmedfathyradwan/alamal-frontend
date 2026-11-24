import Button from "../Button/Button";
import { PhoneIcon, WhatsAppIcon } from "../Icons/Icons";
import { site } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/links";
import shared from "@/styles/shared.module.css";
import styles from "./ContactCta.module.css";

export default function ContactCta({
  title = "هل تبحث عن عقارك المثالي؟",
  description = "فريقنا جاهز لمساعدتك في بيع أو شراء أو استئجار عقارك، بخطوات واضحة وبأفضل الشروط. تواصل معنا اليوم.",
}) {
  return (
    <section className={shared.section}>
      <div className={shared.container}>
        <div className={styles.banner}>
          <div className={styles.content}>
            <span className={styles.eyebrow}>استشارة مجانية</span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.actions}>
            <Button href={`tel:${site.phone}`} variant="light" size="lg">
              <PhoneIcon size={18} />
              اتصل الآن
            </Button>
            <Button
              href={buildWhatsAppUrl()}
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={18} />
              واتساب
            </Button>
            <span className={styles.phoneNote}>
              أو على <span dir="ltr">{site.phoneDisplay}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
