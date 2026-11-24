import { Suspense } from "react";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero/PageHero";
import ListingsBrowser from "@/components/ListingsBrowser/ListingsBrowser";
import ListingSkeleton from "@/components/ListingSkeleton/ListingSkeleton";
import ContactCta from "@/components/ContactCta/ContactCta";
import { categories, properties } from "@/data/properties";
import {
  getCategoryBySlug,
  getCategoryCount,
  getTypeLabel,
} from "@/lib/properties";
import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";

const countLabel = (count) => (count >= 11 ? `${count} عقارًا` : `${count} عقارات`);

// All categories come from generateStaticParams; unknown slugs fall through to notFound().
export const instant = false;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "فئة غير موجودة" };
  }

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="فئة عقارية"
        title={category.title}
        description={category.description}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الفئات", href: "/categories" },
          { label: category.title },
        ]}
      >
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            {countLabel(getCategoryCount(category))}
          </span>
          {category.types.map((type) => (
            <span key={type} className={styles.metaItem}>
              {getTypeLabel(type)}
            </span>
          ))}
        </div>
      </PageHero>

      <section className={styles.listingArea}>
        <div className={shared.container}>
          <Suspense fallback={<ListingSkeleton cards={6} />}>
            <ListingsBrowser
              properties={properties}
              lockedTypes={category.types}
              pageSize={6}
            />
          </Suspense>
        </div>
      </section>

      <ContactCta
        title={`مهتم بـ${category.title}؟`}
        description="تواصل معنا للحصول على قائمة محدثة بالعقارات المتاحة ومواعيد المعاينة."
      />
    </>
  );
}
