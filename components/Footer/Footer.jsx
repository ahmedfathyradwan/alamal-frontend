import Link from "next/link";
import Logo from "../Logo/Logo";
import {
  ClockIcon,
  Icon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "../Icons/Icons";
import { site } from "@/data/site";
import { categories } from "@/data/properties";
import { buildWhatsAppUrl } from "@/lib/links";
import shared from "@/styles/shared.module.css";
import styles from "./Footer.module.css";

const quickLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "جميع العقارات", href: "/properties" },
  { label: "عقارات للبيع", href: "/sale" },
  { label: "عقارات للإيجار", href: "/rent" },
  { label: "العقارات المميزة", href: "/featured" },
  { label: "خدماتنا", href: "/services" },
  { label: "من نحن", href: "/about" },
  { label: "اتصل بنا", href: "/contact" },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={shared.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo variant="light" />
            <p className={styles.brandText}>
              وكالة عقارية مصرية متخصصة في العقارات الفاخرة، نساعدك في اتخاذ قرار
              عقاري واثق منذ عام {site.establishedYear}.
            </p>
            <div className={styles.socials}>
              {site.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={styles.socialLink}
                >
                  <Icon name={item.name} size={16} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="روابط سريعة">
            <h2 className={styles.heading}>روابط سريعة</h2>
            <ul className={styles.links}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="أنواع العقارات">
            <h2 className={styles.heading}>أنواع العقارات</h2>
            <ul className={styles.links}>
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className={styles.link}
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.heading}>معلومات التواصل</h2>
            <ul className={styles.contactList}>
              <li>
                <a href={`tel:${site.phone}`} className={styles.contactLink}>
                  <PhoneIcon size={16} />
                  <span dir="ltr">{site.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <WhatsAppIcon size={16} />
                  تواصل عبر واتساب
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={styles.contactLink}>
                  <MailIcon size={16} />
                  {site.email}
                </a>
              </li>
              <li className={styles.contactText}>
                <MapPinIcon size={16} />
                <span>{site.address}</span>
              </li>
              <li className={styles.contactText}>
                <ClockIcon size={16} />
                <span>{site.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {currentYear} {site.name}. جميع الحقوق محفوظة.
          </p>
          <p className={styles.note}>وكالة عقارية مرخصة – مرسى مطروح</p>
        </div>
      </div>
    </footer>
  );
}
