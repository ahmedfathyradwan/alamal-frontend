import { Suspense } from "react";
import PageHero from "@/components/PageHero/PageHero";
import ListingsBrowser from "@/components/ListingsBrowser/ListingsBrowser";
import ListingSkeleton from "@/components/ListingSkeleton/ListingSkeleton";
import ContactCta from "@/components/ContactCta/ContactCta";
import { getPropertiesByPurpose } from "@/lib/properties";
import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "عقارات للبيع",
  description:
    "تصفح عقارات للبيع في القاهرة الجديدة والشيخ زايد والعلمين والساحل الشمالي مع تفاصيل كاملة وأسعار تنافسية.",
};

export default function SalePage() {
  const saleProperties = getPropertiesByPurpose("sale");

  return (
    <>
      <PageHero
        eyebrow="فرص استثمارية مميزة"
        title="عقارات للبيع"
        description="اختر من بين مساكن ووحدات وفيلات وأراضٍ للبيع بمواقع مميزة وأسعار مدروسة، مع فريق متخصص يرافقك حتى إتمام التعاقد."
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "العقارات", href: "/properties" },
          { label: "عقارات للبيع" },
        ]}
      />

      <section className={styles.listingArea}>
        <div className={shared.container}>
          <Suspense fallback={<ListingSkeleton cards={6} />}>
            <ListingsBrowser
              properties={saleProperties}
              lockedPurpose="sale"
              pageSize={6}
            />
          </Suspense>
        </div>
      </section>

      <ContactCta
        title="هل تفكر في الشراء؟"
        description="احجز جلسة استشارية مجانية لتحديد أفضل الخيارات المتاحة وفق أهدافك الاستثمارية وميزانيتك."
      />
    </>
  );
}
