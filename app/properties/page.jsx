import { Suspense } from "react";
import PageHero from "@/components/PageHero/PageHero";
import ListingsBrowser from "@/components/ListingsBrowser/ListingsBrowser";
import ListingSkeleton from "@/components/ListingSkeleton/ListingSkeleton";
import ContactCta from "@/components/ContactCta/ContactCta";
import { properties } from "@/data/properties";
import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "العقارات المتاحة",
  description:
    "تصفح جميع العقارات المتاحة للبيع والإيجار في مصر: شقق، فيلات، أراضٍ وعقارات تجارية في أفضل المواقع.",
};

export default function PropertiesPage() {
  return (
    <>
      <PageHero
        eyebrow="محفظة عقارية متنوعة"
        title="جميع العقارات"
        description="اكتشف مجموعتنا الكاملة من العقارات المختارة بعناية، واستخدم الفلاتر للوصول إلى ما يناسب احتياجك وميزانيتك."
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "العقارات" },
        ]}
      />

      <section className={styles.listingArea}>
        <div className={shared.container}>
          <Suspense fallback={<ListingSkeleton cards={6} />}>
            <ListingsBrowser properties={properties} />
          </Suspense>
        </div>
      </section>

      <ContactCta
        title="لم تجد ما تبحث عنه؟"
        description="أخبرنا باحتياجك بالتفصيل، وسيقوم فريقنا بالبحث عن العقار المناسب لك داخل محفظتنا وخارجها."
      />
    </>
  );
}
