import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero/PageHero";
import ContactCta from "@/components/ContactCta/ContactCta";
import { ArrowLeftIcon } from "@/components/Icons/Icons";
import { categories } from "@/data/properties";
import { getCategoryCount } from "@/lib/properties";
import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "فئات العقارات",
  description:
    "تصفح الفئات العقارية: عقارات سكنية وتجارية، شقق، فيلات وأراضٍ في أفضل مواقع مصر.",
};

const countLabel = (count) => (count >= 11 ? `${count} عقارًا` : `${count} عقارات`);

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="تصفح حسب النوع"
        title="فئات العقارات"
        description="اختر الفئة التي تناسب هدفك، سواء كنت تبحث عن مسكن عائلي أو فرصة استثمارية تجارية أو أرض للبناء."
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الفئات" },
        ]}
      />

      <section className={styles.categoriesArea}>
        <div className={shared.container}>
          <div className={styles.grid}>
            {categories.map((category) => (
              <article key={category.slug} className={styles.card}>
                <Link
                  href={`/categories/${category.slug}`}
                  className={styles.media}
                  aria-label={`تصفح ${category.title}`}
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.image}
                  />
                  <span className={styles.count}>
                    {countLabel(getCategoryCount(category))}
                  </span>
                </Link>
                <div className={styles.body}>
                  <h2 className={styles.title}>
                    <Link href={`/categories/${category.slug}`}>{category.title}</Link>
                  </h2>
                  <p className={styles.description}>{category.description}</p>
                  <Link
                    href={`/categories/${category.slug}`}
                    className={styles.link}
                  >
                    تصفح الفئة
                    <ArrowLeftIcon size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCta
        title="غير متأكد من الفئة المناسبة؟"
        description="أخبرنا بما تبحث عنه وسيرشدك فريقنا إلى الفئة والخيارات الأقرب لاحتياجك."
      />
    </>
  );
}
