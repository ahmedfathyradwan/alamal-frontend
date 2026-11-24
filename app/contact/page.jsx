import PageHero from "@/components/PageHero/PageHero";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Button from "@/components/Button/Button";
import {
  ClockIcon,
  FacebookIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/Icons/Icons";
import { site } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/links";
import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "اتصل بنا",
  description:
    "تواصل مع علم الروم: هاتف، واتساب، بريد إلكتروني، أو زيارة مكتبنا في مرسى مطروح.",
};

const socialIcons = {
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
};

const infoRows = [
  {
    icon: MailIcon,
    label: "البريد الإلكتروني",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPinIcon,
    label: "عنوان المكتب",
    value: site.address,
  },
  {
    icon: ClockIcon,
    label: "ساعات العمل",
    value: site.workingHours,
    note: site.workingHoursFriday,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="تواصل معنا"
        title="نحن هنا لمساعدتك"
        description="سواء كان لديك سؤال عن عقار أو ترغب في استشارة عقارية، فريقنا جاهز للرد عليك ومساعدتك في اختيار الخطوة التالية."
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "اتصل بنا" },
        ]}
      />

      <section className={styles.contactArea}>
        <div className={`${shared.container} ${styles.layout}`}>
          <aside className={styles.infoPanel}>
            <span className={styles.eyebrow}>معلومات التواصل</span>
            <h2 className={styles.infoTitle}>طرق مباشرة للوصول إلينا</h2>
            <p className={styles.infoText}>
              اختر الوسيلة الأنسب لك، وسنعود إليك في أقرب وقت خلال ساعات العمل.
            </p>

            <div className={styles.actions}>
              <Button href={`tel:${site.phone}`} variant="light" fullWidth>
                <PhoneIcon size={17} />
                <span dir="ltr">{site.phoneDisplay}</span>
              </Button>
              <Button
                href={buildWhatsAppUrl()}
                variant="whatsapp"
                fullWidth
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={17} />
                محادثة واتساب
              </Button>
            </div>

            <div className={styles.rows}>
              {infoRows.map((row) => {
                const RowIcon = row.icon;
                const content = (
                  <>
                    <span className={styles.rowIcon}>
                      <RowIcon size={17} />
                    </span>
                    <span className={styles.rowText}>
                      <small>{row.label}</small>
                      <span dir={row.ltr ? "ltr" : undefined}>{row.value}</span>
                      {row.note ? (
                        <span className={styles.rowNote}>{row.note}</span>
                      ) : null}
                    </span>
                  </>
                );

                return row.href ? (
                  <a key={row.label} href={row.href} className={styles.row}>
                    {content}
                  </a>
                ) : (
                  <div key={row.label} className={styles.row}>
                    {content}
                  </div>
                );
              })}
            </div>

            <div className={styles.socials}>
              <span className={styles.socialsLabel}>تابعنا على</span>
              <div className={styles.socialLinks}>
                {site.social.map((social) => {
                  const SocialIcon = socialIcons[social.name] ?? MapPinIcon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={social.label}
                    >
                      <SocialIcon size={17} />
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className={shared.container}>
          <SectionHeading
            align="start"
            eyebrow="موقع المكتب"
            title="زورنا في مرسى مطروح"
            description={site.address}
            action={
              <Button
                href={site.mapLink}
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPinIcon size={16} />
                افتح في خرائط جوجل
              </Button>
            }
          />
          <div className={styles.mapWrap}>
            <iframe
              src={site.mapEmbed}
              title="موقع مكتب علم الروم على الخريطة"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
