import Image from "next/image";
import Link from "next/link";
import PropertySearch from "@/components/PropertySearch/PropertySearch";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Stats from "@/components/Stats/Stats";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import ContactCta from "@/components/ContactCta/ContactCta";
import Button from "@/components/Button/Button";
import {
  ArrowLeftIcon,
  CheckIcon,
  PhoneIcon,
  QuoteIcon,
  StarIcon,
} from "@/components/Icons/Icons";
import { services, site, stats, testimonials, whyChoose } from "@/data/site";
import { categories } from "@/data/properties";
import {
  getCategoryCount,
  getFeaturedProperties,
  getPropertiesByPurpose,
} from "@/lib/properties";
import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";

const countLabel = (count) => (count >= 11 ? `${count} عقارًا` : `${count} عقارات`);

export default function HomePage() {
  const featuredProperties = getFeaturedProperties();
  const saleProperties = getPropertiesByPurpose("sale");
  const rentProperties = getPropertiesByPurpose("rent");

  return (
    <>
      <section className={styles.hero}>
        <Image
          src="/images/hero.jpg"
          alt="فيلا فاخرة بتصميم عصري في القاهرة الجديدة"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={shared.container}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>وسيطك العقاري الموثوق في مصر</span>
            <h1 className={styles.heroTitle}>
              اعثر على العقار الذي
              <span className={styles.highlight}> يليق بطموحك</span>
            </h1>
            <p className={styles.heroText}>
              من قلب القاهرة الجديدة إلى أرقى شواطئ مصر، نقدم لك عقارات فاخرة
              مختارة بعناية واستشارات موثوقة من خبراء يعرفون السوق المصري حق
              المعرفة.
            </p>
            <div className={styles.heroActions}>
              <Button href="/properties" variant="primary" size="lg">
                تصفح العقارات
                <ArrowLeftIcon size={18} />
              </Button>
              <Button href="/contact" variant="outlineLight" size="lg">
                احجز استشارة مجانية
              </Button>
            </div>
            <ul className={styles.heroMeta}>
              <li>
                <CheckIcon size={15} />
                عقارات موثقة
              </li>
              <li>
                <CheckIcon size={15} />
                استشارة مجانية
              </li>
              <li>
                <CheckIcon size={15} />
                خدمة عملاء 7 أيام
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className={styles.searchArea}>
        <div className={shared.container}>
          <PropertySearch />
        </div>
      </div>

      <Stats items={stats} />

      <section className={shared.section}>
        <div className={`${shared.container} ${styles.aboutGrid}`}>
          <div className={styles.aboutMedia}>
            <Image
              src="/images/about-office.jpg"
              alt="مكتب الأمل للعقارات في القاهرة الجديدة"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.aboutImage}
            />
            <div className={styles.experienceCard}>
              <strong>17+</strong>
              <span>عامًا من الخبرة في السوق المصري</span>
            </div>
          </div>

          <div className={styles.aboutContent}>
            <SectionHeading
              align="start"
              eyebrow="من نحن"
              title="خبرة محلية.. ورؤية تصنع الفرق"
              description="في الأمل للعقارات، نؤمن أن العقار ليس مجرد صفقة، بل خطوة مهمة في حياتك. لذلك نجمع بين معرفة دقيقة بالسوق المصري وخدمة شخصية تراعي تفاصيل احتياجك."
            />
            <ul className={styles.checkList}>
              {whyChoose.slice(0, 4).map((item) => (
                <li key={item} className={styles.checkItem}>
                  <span className={styles.checkIcon}>
                    <CheckIcon size={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className={styles.aboutActions}>
              <Button href="/about" variant="secondary">
                تعرف على قصتنا
              </Button>
              <a href={`tel:${site.phone}`} className={styles.phoneLink}>
                <PhoneIcon size={17} />
                <span dir="ltr">{site.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={`${shared.section} ${styles.categoriesSection}`}>
        <div className={shared.container}>
          <SectionHeading
            eyebrow="تصفح حسب النوع"
            title="فئات عقارية تناسب احتياجاتك"
            description="سواء كنت تبحث عن منزل عائلي أو استثمار تجاري، ستجد خيارك المناسب بين فئاتنا المختارة."
          />
          <div className={styles.categoriesGrid}>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className={styles.categoryCard}
              >
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className={styles.categoryImage}
                />
                <span className={styles.categoryOverlay} aria-hidden="true" />
                <span className={styles.categoryArrow}>
                  <ArrowLeftIcon size={16} />
                </span>
                <span className={styles.categoryContent}>
                  <span className={styles.categoryCount}>
                    {countLabel(getCategoryCount(category))}
                  </span>
                  <span className={styles.categoryTitle}>{category.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={shared.section}>
        <div className={shared.container}>
          <SectionHeading
            align="start"
            eyebrow="اختيارات حصرية"
            title="عقارات مميزة"
            description="نخبة من أفضل العقارات المتاحة حاليًا، اختارها فريقنا بعناية لتجمع بين الموقع والتشطيب والقيمة."
            action={
              <Button href="/featured" variant="ghost">
                عرض جميع المميزة
                <ArrowLeftIcon size={16} />
              </Button>
            }
          />
          <div className={styles.cardsGrid}>
            {featuredProperties.slice(0, 6).map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                priority={index < 3}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={`${shared.section} ${styles.altSection}`}>
        <div className={shared.container}>
          <SectionHeading
            align="start"
            eyebrow="للبيع"
            title="أحدث العقارات المعروضة للبيع"
            description="فرص استثمارية ومساكن مميزة بأسعار تنافسية في أفضل مواقع مصر."
            action={
              <Button href="/sale" variant="ghost">
                تصفح عقارات البيع
                <ArrowLeftIcon size={16} />
              </Button>
            }
          />
          <div className={styles.cardsGrid}>
            {saleProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className={shared.section}>
        <div className={shared.container}>
          <SectionHeading
            align="start"
            eyebrow="للإيجار"
            title="عقارات متاحة للإيجار"
            description="وحدات جاهزة للسكن أو العمل بمواقع مميزة ومرونة في التعاقد."
            action={
              <Button href="/rent" variant="ghost">
                تصفح عقارات الإيجار
                <ArrowLeftIcon size={16} />
              </Button>
            }
          />
          <div className={styles.cardsGrid}>
            {rentProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${shared.section} ${styles.servicesSection}`}>
        <div className={shared.container}>
          <SectionHeading
            tone="light"
            className={styles.servicesHeading}
            eyebrow="خدماتنا"
            title="خدمات عقارية متكاملة"
            description="نرافقك في كل خطوة، من البحث والتقييم وحتى التعاقد وإدارة العقار بعد التسليم."
          />
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} href="/services" />
            ))}
          </div>
        </div>
      </section>

      <section className={`${shared.section} ${styles.altSection}`}>
        <div className={shared.container}>
          <SectionHeading
            eyebrow="آراء عملائنا"
            title="ثقة نبنيها صفقة بعد صفقة"
            description="رضا عملائنا هو أفضل شهادة على التزامنا بالشفافية والاحترافية."
          />
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className={styles.testimonial}>
                <QuoteIcon size={30} className={styles.quoteIcon} />
                <blockquote className={styles.quote}>
                  {testimonial.quote}
                </blockquote>
                <figcaption className={styles.person}>
                  <span className={styles.avatar} aria-hidden="true">
                    {testimonial.name.charAt(0)}
                  </span>
                  <span className={styles.personInfo}>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </span>
                  <span className={styles.stars} aria-label="تقييم 5 من 5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon key={index} size={13} />
                    ))}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
