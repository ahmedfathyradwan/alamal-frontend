import { Suspense } from "react";
import PageHero from "@/components/PageHero/PageHero";
import ListingsBrowser from "@/components/ListingsBrowser/ListingsBrowser";
import ListingSkeleton from "@/components/ListingSkeleton/ListingSkeleton";
import ContactCta from "@/components/ContactCta/ContactCta";
import { getFeaturedProperties } from "@/lib/properties";
import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "عقارات مميزة",
  description:
    "مجموعة مختارة من أرقى العقارات المتاحة في مصر، تجمع بين الموقع المميز والتصميم الراقي والقيمة الاستثمارية.",
};

export default function FeaturedPage() {
  const featuredProperties = getFeaturedProperties();

  return (
    <>
      <PageHero
        eyebrow="اختيارات حصرية"
        title="عقارات مميزة"
        description="نخبة من العقارات التي اختارها خبراؤنا بعناية، لتقدم لك تجربة سكن أو استثمارًا استثنائيًا في أرقى مواقع مصر."
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "عقارات مميزة" },
        ]}
      />

      <section className={styles.listingArea}>
        <div className={shared.container}>
          <Suspense fallback={<ListingSkeleton cards={6} />}>
            <ListingsBrowser properties={featuredProperties} pageSize={6} />
          </Suspense>
        </div>
      </section>

      <ContactCta
        title="مهتم بعقار مميز؟"
        description="مواعيد المعاينة محدودة لهذه المجموعة. تواصل معنا الآن لحجز زيارتك الخاصة."
      />
    </>
  );
}
