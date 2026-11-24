import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import PropertyGallery from "@/components/PropertyGallery/PropertyGallery";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Button from "@/components/Button/Button";
import {
  AreaIcon,
  ArrowLeftIcon,
  BathIcon,
  BedIcon,
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  MailIcon,
  MapIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  TagIcon,
  WhatsAppIcon,
} from "@/components/Icons/Icons";
import { properties } from "@/data/properties";
import { site } from "@/data/site";
import {
  getPropertyById,
  getPurposeLabel,
  getSimilarProperties,
  getTypeLabel,
} from "@/lib/properties";
import { formatArea, formatDate, getPriceParts } from "@/lib/format";
import { buildMapUrl, buildPropertyWhatsAppUrl } from "@/lib/links";
import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";

// All properties come from generateStaticParams; unknown ids fall through to notFound().
export const instant = false;

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    return { title: "عقار غير موجود" };
  }

  return {
    title: property.title,
    description: property.description.slice(0, 155),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 155),
      images: [property.images[0]],
    },
  };
}

export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const { amount, currency, suffix } = getPriceParts(property);
  const similarProperties = getSimilarProperties(property, 3);
  const mapEmbedUrl = `https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&hl=ar&z=15&output=embed`;

  const specs = [
    { label: "نوع العقار", value: getTypeLabel(property.type) },
    { label: "الغرض", value: getPurposeLabel(property.purpose) },
    { label: "المساحة", value: formatArea(property.area) },
    property.bedrooms > 0
      ? { label: "غرف النوم", value: `${property.bedrooms} غرف` }
      : null,
    property.bathrooms > 0
      ? { label: "الحمامات", value: `${property.bathrooms} حمام` }
      : null,
    { label: "المحافظة", value: property.governorate },
    { label: "المدينة / المنطقة", value: `${property.city}، ${property.district}` },
    { label: "تاريخ الإضافة", value: formatDate(property.createdAt) },
    { label: "العنوان", value: property.address, wide: true },
  ].filter(Boolean);

  return (
    <>
      <div className={styles.topBar}>
        <div className={`${shared.container} ${styles.topBarInner}`}>
          <Breadcrumbs
            tone="dark"
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "العقارات", href: "/properties" },
              { label: property.title },
            ]}
          />
          <Link href="/properties" className={styles.backLink}>
            <ChevronRightIcon size={15} />
            العودة إلى العقارات
          </Link>
        </div>
      </div>

      <section className={styles.gallerySection}>
        <div className={shared.container}>
          <PropertyGallery images={property.images} title={property.title} />
        </div>
      </section>

      <section className={styles.headSection}>
        <div className={`${shared.container} ${styles.head}`}>
          <div className={styles.headMain}>
            <div className={styles.badges}>
              <span className={styles.badgePrimary}>
                {getPurposeLabel(property.purpose)}
              </span>
              <span className={styles.badge}>{getTypeLabel(property.type)}</span>
              {property.featured ? (
                <span className={styles.badgeFeatured}>
                  <StarIcon size={12} />
                  عقار مميز
                </span>
              ) : null}
            </div>

            <h1 className={styles.title}>{property.title}</h1>

            <p className={styles.location}>
              <MapPinIcon size={16} />
              {property.address}
            </p>

            <div className={styles.quickSpecs}>
              <span>
                <AreaIcon size={16} />
                {formatArea(property.area)}
              </span>
              {property.bedrooms > 0 ? (
                <span>
                  <BedIcon size={16} />
                  {property.bedrooms} غرف نوم
                </span>
              ) : null}
              {property.bathrooms > 0 ? (
                <span>
                  <BathIcon size={16} />
                  {property.bathrooms} حمام
                </span>
              ) : null}
              <span>
                <TagIcon size={16} />
                {property.reference}
              </span>
            </div>
          </div>

          <div className={styles.priceCard}>
            <span className={styles.priceLabel}>
              {property.purpose === "rent" ? "قيمة الإيجار" : "سعر البيع"}
            </span>
            <p className={styles.price}>
              <strong>{amount}</strong>
              <span>{currency}</span>
            </p>
            {suffix ? <span className={styles.priceSuffix}>{suffix}</span> : null}
          </div>
        </div>
      </section>

      <section className={styles.bodySection}>
        <div className={`${shared.container} ${styles.layout}`}>
          <div className={styles.main}>
            <article className={styles.panel}>
              <h2 className={styles.panelTitle}>وصف العقار</h2>
              <p className={styles.description}>{property.description}</p>
            </article>

            <article className={styles.panel}>
              <h2 className={styles.panelTitle}>المواصفات والمزايا</h2>
              <ul className={styles.features}>
                {property.features.map((feature) => (
                  <li key={feature}>
                    <span className={styles.check}>
                      <CheckIcon size={13} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>

            <article className={styles.panel}>
              <h2 className={styles.panelTitle}>بيانات العقار</h2>
              <dl className={styles.specsList}>
                {specs.map((item) => (
                  <div
                    key={item.label}
                    className={[styles.specRow, item.wide ? styles.specWide : ""]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <article className={styles.panel}>
              <h2 className={styles.panelTitle}>الموقع على الخريطة</h2>
              <div className={styles.mapWrap}>
                <iframe
                  src={mapEmbedUrl}
                  title={`موقع ${property.title} على الخريطة`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={buildMapUrl(property.coordinates)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                <MapIcon size={16} />
                فتح الموقع في خرائط جوجل
                <ArrowLeftIcon size={14} />
              </a>
            </article>
          </div>

          <aside className={styles.aside}>
            <div className={styles.contactCard}>
              <span className={styles.contactEyebrow}>تواصل معنا</span>
              <h2 className={styles.contactTitle}>هل أعجبك هذا العقار؟</h2>
              <p className={styles.contactText}>
                فريقنا جاهز للإجابة عن استفساراتك وترتيب موعد معاينة يناسبك.
              </p>

              <div className={styles.contactActions}>
                <Button href={`tel:${site.phone}`} variant="primary" fullWidth>
                  <PhoneIcon size={17} />
                  اتصل الآن
                </Button>
                <Button
                  href={buildPropertyWhatsAppUrl(property)}
                  variant="whatsapp"
                  fullWidth
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={17} />
                  استفسر عبر واتساب
                </Button>
              </div>

              <div className={styles.contactRows}>
                <a href={`mailto:${site.email}`} className={styles.contactRow}>
                  <span className={styles.contactIcon}>
                    <MailIcon size={16} />
                  </span>
                  <span className={styles.contactInfo}>
                    <small>البريد الإلكتروني</small>
                    <span>{site.email}</span>
                  </span>
                </a>
                <div className={styles.contactRow}>
                  <span className={styles.contactIcon}>
                    <MapPinIcon size={16} />
                  </span>
                  <span className={styles.contactInfo}>
                    <small>عنوان المكتب</small>
                    <span>{site.addressShort}</span>
                  </span>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactIcon}>
                    <ClockIcon size={16} />
                  </span>
                  <span className={styles.contactInfo}>
                    <small>ساعات العمل</small>
                    <span>{site.workingHours}</span>
                  </span>
                </div>
              </div>

              <div className={styles.reference}>
                <span>رقم المرجع</span>
                <strong>{property.reference}</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {similarProperties.length > 0 ? (
        <section className={`${shared.section} ${styles.similarSection}`}>
          <div className={shared.container}>
            <SectionHeading
              align="start"
              eyebrow="قد يناسبك أيضًا"
              title="عقارات مشابهة"
              description="اختيارات أخرى تحمل نفس الخصائص أو قريبة من الموقع الذي شاهدته."
              action={
                <Button href="/properties" variant="ghost">
                  عرض جميع العقارات
                  <ArrowLeftIcon size={16} />
                </Button>
              }
            />
            <div className={styles.similarGrid}>
              {similarProperties.map((similar) => (
                <PropertyCard key={similar.id} property={similar} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
