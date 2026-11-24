import { Suspense } from "react";
import PageHero from "@/components/PageHero/PageHero";
import ListingsBrowser from "@/components/ListingsBrowser/ListingsBrowser";
import ListingSkeleton from "@/components/ListingSkeleton/ListingSkeleton";
import ContactCta from "@/components/ContactCta/ContactCta";
import { getPropertiesByPurpose } from "@/lib/properties";
import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "عقارات للإيجار",
  description:
    "تصفح شققًا وفيلات ومكاتب ومحالًا للإيجار بمواقع مميزة في القاهرة الجديدة والمعادي والساحل الشمالي والعين السخنة.",
};

export default function RentPage() {
  const rentProperties = getPropertiesByPurpose("rent");

  return (
    <>
      <PageHero
        eyebrow="وحدات جاهزة للانتقال"
        title="عقارات للإيجار"
        description="خيارات إيجار مرنة للسكن أو العمل، بوحدات جاهزة ومواقع حيوية، مع دعم كامل في التفاوض وصياغة التعاقد."
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "العقارات", href: "/properties" },
          { label: "عقارات للإيجار" },
        ]}
      />

      <section className={styles.listingArea}>
        <div className={shared.container}>
          <Suspense fallback={<ListingSkeleton cards={6} />}>
            <ListingsBrowser
              properties={rentProperties}
              lockedPurpose="rent"
              pageSize={6}
            />
          </Suspense>
        </div>
      </section>

      <ContactCta
        title="تبحث عن وحدة للإيجار؟"
        description="تواصل معنا لترتيب زيارات معاينة في المواعيد التي تناسبك، وسنساعدك في اختيار الوحدة الأنسب."
      />
    </>
  );
}
