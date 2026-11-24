import PageHero from "@/components/PageHero/PageHero";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import Button from "@/components/Button/Button";
import ContactCta from "@/components/ContactCta/ContactCta";
import {
  CheckIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/Icons/Icons";
import { services, site, whyChoose } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/links";
import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "خدماتنا",
  description:
    "خدمات عقارية متكاملة: بيع وشراء وتأجير العقارات، استشارات عقارية، تسويق، إدارة أملاك وتقييم عقاري في مصر.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="ما نقدمه"
        title="خدمات عقارية متكاملة"
        description="من البحث عن العقار المناسب وحتى إدارة أملاكك بعد التسليم، نقدم منظومة خدمات تغطي كل احتياجاتك العقارية."
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الخدمات" },
        ]}
      />

      <section className={styles.servicesArea}>
        <div className={shared.container}>
          <SectionHeading
            eyebrow="حلولنا"
            title="خبرة تخدم كل احتياجاتك"
            description="كل خدمة يقدمها فريق متخصص، بمعايير واضحة ومتابعة دقيقة حتى تحقق هدفك."
          />
          <div className={styles.grid}>
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                service={service}
                href="/contact"
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.assuranceSection}>
        <div className={shared.container}>
          <div className={styles.assurance}>
            <div className={styles.assuranceContent}>
              <span className={styles.eyebrow}>التزامنا معك</span>
              <h2 className={styles.assuranceTitle}>
                خدمة تبدأ بالاستماع.. وتنتهي بثقة
              </h2>
              <p className={styles.assuranceText}>
                لا نقدم قوائم عقارات فقط؛ بل نرافقك في كل خطوة بمشورة واضحة
                ومتابعة شخصية، لأن هدفنا أن تخرج من تجربتك العقارية راضيًا
                ومطمئنًا.
              </p>
              <ul className={styles.assuranceList}>
                {whyChoose.slice(0, 4).map((item) => (
                  <li key={item}>
                    <span className={styles.check}>
                      <CheckIcon size={13} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.assuranceActions}>
              <Button href={`tel:${site.phone}`} variant="light" size="lg">
                <PhoneIcon size={18} />
                تحدث مع مستشار
              </Button>
              <Button
                href={buildWhatsAppUrl()}
                variant="whatsapp"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={18} />
                راسلنا عبر واتساب
              </Button>
              <span className={styles.actionsNote}>
                متاحون من السبت إلى الخميس، ٩ صباحًا – ٨ مساءً
              </span>
            </div>
          </div>
        </div>
      </section>

      <ContactCta
        title="تحتاج خدمة محددة؟"
        description="أخبرنا بما تحتاجه وسنقترح عليك الخدمة الأنسب والخطوات التالية بوضوح."
      />
    </>
  );
}
