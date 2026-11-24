import Button from "@/components/Button/Button";
import { HomeIcon, SearchIcon } from "@/components/Icons/Icons";
import styles from "./not-found.module.css";

export const metadata = {
  title: "الصفحة غير موجودة",
};

export default function NotFound() {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>الصفحة التي تبحث عنها غير موجودة</h1>
        <p className={styles.text}>
          ربما تم نقل الصفحة أو تغيير رابطها. يمكنك العودة إلى الرئيسية أو تصفح
          العقارات المتاحة للعثور على ما تحتاجه.
        </p>
        <div className={styles.actions}>
          <Button href="/" variant="primary" size="lg">
            <HomeIcon size={18} />
            العودة للرئيسية
          </Button>
          <Button href="/properties" variant="outline" size="lg">
            <SearchIcon size={18} />
            تصفح العقارات
          </Button>
        </div>
      </div>
    </section>
  );
}
