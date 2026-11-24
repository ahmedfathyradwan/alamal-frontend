import Image from "next/image";
import PageHero from "@/components/PageHero/PageHero";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Stats from "@/components/Stats/Stats";
import Button from "@/components/Button/Button";
import ContactCta from "@/components/ContactCta/ContactCta";
import {
  CheckIcon,
  CompassIcon,
  EyeIcon,
  HandshakeIcon,
  Icon,
} from "@/components/Icons/Icons";
import {
  mission,
  processSteps,
  site,
  stats,
  values,
  vision,
  whyChoose,
} from "@/data/site";
import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "من نحن",
  description:
    "تعرف على علم الروم: خبرة تمتد لأكثر من 17 عامًا في السوق العقاري المصري، ورؤية قائمة على الثقة والشفافية والاحترافية.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="قصتنا"
        title="نصنع تجربة عقارية تستحق الثقة"
        description="منذ عام 2008، نرافق عملاءنا في رحلة العثور على العقار المناسب، بمعرفة عميقة بالسوق المصري واهتمام حقيقي بالتفاصيل."
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "من نحن" },
        ]}
      />

      <section className={shared.section}>
        <div className={`${shared.container} ${styles.story}`}>
          <div className={styles.storyMedia}>
            <Image
              src="/images/about-office.jpg"
              alt="فريق عمل علم الروم للعقارات داخل المكتب"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.storyImage}
            />
            <div className={styles.established}>
              <strong>{site.establishedYear}</strong>
              <span>عام التأسيس</span>
            </div>
          </div>

          <div className={styles.storyContent}>
            <SectionHeading
              align="start"
              eyebrow="من نحن"
              title="علم الروم للعقارات.. أكثر من وسيط عقاري"
              description="نؤمن أن اختيار العقار قرار مصيري، ولذلك نتعامل معه بعقلية المستشار لا الوسيط."
            />
            <p className={styles.paragraph}>
              تأسس مكتب علم الروم للعقارات برؤية بسيطة: أن يجد كل عميل عقارًا يناسب
              حياته واستثماره دون تعقيد أو مفاجآت. ومنذ ذلك الحين، نمت شبكة
              علاقاتنا مع المطورين والمالكين الموثوقين في أرقى مواقع مصر، لنقدم
              خيارات مدروسة وموثقة بعناية.
            </p>
            <p className={styles.paragraph}>
              اليوم يضم فريقنا مستشارين عقاريين متخصصين في القاهرة الجديدة
              والشيخ زايد والساحل الشمالي والعين السخنة، يعملون على مدار الأسبوع
              لخدمتك وتقديم مشورة حقيقية مبنية على بيانات السوق.
            </p>

            <ul className={styles.checkList}>
              {whyChoose.slice(0, 3).map((item) => (
                <li key={item} className={styles.checkItem}>
                  <span className={styles.checkIcon}>
                    <CheckIcon size={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Button href="/properties" variant="secondary">
              تصفح عقاراتنا
            </Button>
          </div>
        </div>
      </section>

      <Stats items={stats} />

      <section className={`${shared.section} ${styles.altSection}`}>
        <div className={shared.container}>
          <SectionHeading
            eyebrow="رؤيتنا ورسالتنا"
            title="نبني الثقة قبل أن نبني الصفقات"
            description="هدفنا أن نغير طريقة تعامل المصريين مع السوق العقاري، بتجربة أوضح وأكثر إنسانية."
          />
          <div className={styles.visionGrid}>
            <article className={`${styles.visionCard} ${styles.visionDark}`}>
              <span className={styles.visionIcon}>
                <EyeIcon size={26} />
              </span>
              <h3>رؤيتنا</h3>
              <p>{vision}</p>
            </article>
            <article className={styles.visionCard}>
              <span className={styles.visionIcon}>
                <CompassIcon size={26} />
              </span>
              <h3>رسالتنا</h3>
              <p>{mission}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={shared.section}>
        <div className={shared.container}>
          <SectionHeading
            eyebrow="قيمنا"
            title="مبادئ لا نساوم عليها"
            description="قيم واضحة توجه كل تعامل وكل قرار نتخذه مع عملائنا وشركائنا."
          />
          <div className={styles.valuesGrid}>
            {values.map((value) => (
              <article key={value.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>
                  <Icon name={value.icon} size={24} />
                </span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${shared.section} ${styles.altSection}`}>
        <div className={`${shared.container} ${styles.whyGrid}`}>
          <div className={styles.whyContent}>
            <SectionHeading
              align="start"
              eyebrow="لماذا نحن"
              title="لماذا يختارنا العملاء؟"
              description="لأننا نقدم أكثر من قائمة عقارات؛ نقدم خبرة ومتابعة حقيقية حتى تصل لقرارك بثقة."
            />
            <ul className={styles.whyList}>
              {whyChoose.map((item, index) => (
                <li key={item} className={styles.whyItem}>
                  <span className={styles.whyNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.whyMedia}>
            <Image
              src="/images/properties/villa-pool.jpg"
              alt="فيلا فاخرة من العقارات التي سوقها المكتب"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              className={styles.whyImage}
            />
            <div className={styles.whyBadge}>
              <HandshakeIcon size={22} />
              <span>
                <strong>320+</strong>
                صفقة ناجحة
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={shared.section}>
        <div className={shared.container}>
          <SectionHeading
            eyebrow="كيف نعمل"
            title="خطوات واضحة من أول لقاء حتى التسليم"
            description="منهجية عمل منظمة تجعل رحلتك العقارية أسهل وأكثر وضوحًا."
          />
          <ol className={styles.steps}>
            {processSteps.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContactCta
        title="جاهز لبدء رحلتك العقارية؟"
        description="تواصل مع فريق علم الروم اليوم، واحصل على استشارة مجانية تحدد لك أفضل خطوة تالية."
      />
    </>
  );
}
