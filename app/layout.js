import { Cairo, Tajawal } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat/WhatsAppFloat";
import { site } from "@/data/site";
import "./globals.css";
import styles from "./layout.module.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://alamal-realestate.com"),
  title: {
    default: `${site.name} | عقارات فاخرة في مصر`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "عقارات مصر",
    "شقق للبيع",
    "فيلات للبيع",
    "شقق للإيجار",
    "التجمع الخامس",
    "عقارات فاخرة",
    "وسيط عقاري",
  ],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: site.name,
    title: `${site.name} | عقارات فاخرة في مصر`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | عقارات فاخرة في مصر`,
    description: site.description,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#11171C",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`}>
      <body className={styles.body}>
        <a href="#main-content" className={styles.skipLink}>
          تجاوز إلى المحتوى الرئيسي
        </a>
        <Header />
        <main id="main-content" className={styles.main}>
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
