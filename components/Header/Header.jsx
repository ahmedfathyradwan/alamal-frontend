"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import {
  Icon,
  MailIcon,
  PhoneIcon,
  ClockIcon,
  ChevronDownIcon,
  WhatsAppIcon,
} from "../Icons/Icons";
import { navLinks, site } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/links";
import shared from "@/styles/shared.module.css";
import styles from "./Header.module.css";

function isActiveLink(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href === "/properties") {
    return (
      pathname.startsWith("/properties") ||
      pathname.startsWith("/sale") ||
      pathname.startsWith("/rent") ||
      pathname.startsWith("/categories")
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closeMenus = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const propertiesLink = navLinks.find((link) => link.children);
  const generalLinks = propertiesLink?.children.slice(0, 3) ?? [];
  const categoryLinks = propertiesLink?.children.slice(3) ?? [];

  return (
    <>
      <div className={styles.topbar}>
        <div className={`${shared.container} ${styles.topbarInner}`}>
          <div className={styles.topbarInfo}>
            <a href={`tel:${site.phone}`} className={styles.topbarItem}>
              <PhoneIcon size={14} />
              <span dir="ltr">{site.phoneDisplay}</span>
            </a>
            <a href={`mailto:${site.email}`} className={styles.topbarItem}>
              <MailIcon size={14} />
              <span>{site.email}</span>
            </a>
            <span className={`${styles.topbarItem} ${styles.topbarHours}`}>
              <ClockIcon size={14} />
              <span>{site.workingHours}</span>
            </span>
          </div>
          <div className={styles.topbarSocial}>
            {site.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className={styles.socialLink}
              >
                <Icon name={item.name} size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <header className={[styles.header, scrolled ? styles.scrolled : ""].join(" ")}>
        <div className={`${shared.container} ${styles.inner}`}>
          <Logo />

          <nav className={styles.nav} aria-label="التنقل الرئيسي">
            <ul className={styles.navList}>
              {navLinks.map((link) => {
                if (link.children) {
                  return (
                    <li
                      key={link.href}
                      className={styles.navItem}
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                      onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                          setDropdownOpen(false);
                        }
                      }}
                    >
                      <button
                        type="button"
                        className={[
                          styles.navLink,
                          styles.navTrigger,
                          isActiveLink(pathname, link.href) ? styles.active : "",
                        ].join(" ")}
                        aria-expanded={dropdownOpen}
                        aria-haspopup="true"
                        onFocus={() => setDropdownOpen(true)}
                      >
                        {link.label}
                        <ChevronDownIcon
                          size={14}
                          className={[styles.chevron, dropdownOpen ? styles.chevronOpen : ""].join(" ")}
                        />
                      </button>

                      <div
                        className={[styles.dropdown, dropdownOpen ? styles.dropdownOpen : ""].join(" ")}
                      >
                        <div className={styles.dropdownColumns}>
                          <div className={styles.dropdownColumn}>
                            <span className={styles.dropdownLabel}>تصفح العقارات</span>
                            {generalLinks.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={styles.dropdownLink}
                                onClick={closeMenus}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                          <div className={styles.dropdownColumn}>
                            <span className={styles.dropdownLabel}>حسب النوع</span>
                            {categoryLinks.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={styles.dropdownLink}
                                onClick={closeMenus}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <Link href="/featured" className={styles.dropdownCta} onClick={closeMenus}>
                          <span>عقارات مميزة مختارة بعناية</span>
                          <Icon name="arrowLeft" size={16} />
                        </Link>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={link.href} className={styles.navItem}>
                    <Link
                      href={link.href}
                      className={[
                        styles.navLink,
                        isActiveLink(pathname, link.href) ? styles.active : "",
                      ].join(" ")}
                      aria-current={isActiveLink(pathname, link.href) ? "page" : undefined}
                      onClick={closeMenus}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a
              href={`tel:${site.phone}`}
              className={styles.callIcon}
              aria-label={`اتصل بنا على ${site.phoneDisplay}`}
            >
              <PhoneIcon size={19} />
            </a>
            <div className={styles.desktopCta}>
              <Button href={`tel:${site.phone}`} variant="outline" size="sm">
                <PhoneIcon size={16} />
                اتصل الآن
              </Button>
              <Button
                href={buildWhatsAppUrl()}
                variant="primary"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={16} />
                واتساب
              </Button>
            </div>
            <button
              type="button"
              className={styles.mobileToggle}
              aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <Icon name={mobileOpen ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className={styles.mobileLayer}>
          <button
            type="button"
            className={styles.overlay}
            aria-label="إغلاق القائمة"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={styles.mobilePanel}
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقل"
          >
            <div className={styles.mobileHead}>
              <Logo />
              <button
                type="button"
                className={styles.mobileClose}
                aria-label="إغلاق القائمة"
                onClick={() => setMobileOpen(false)}
              >
                <Icon name="close" size={22} />
              </button>
            </div>

            <nav aria-label="التنقل في الجوال" className={styles.mobileNav}>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={[
                        styles.mobileLink,
                        isActiveLink(pathname, link.href) ? styles.mobileActive : "",
                      ].join(" ")}
                      onClick={closeMenus}
                    >
                      {link.label}
                    </Link>
                    {link.children ? (
                      <ul className={styles.mobileSub}>
                        {link.children.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={styles.mobileSubLink}
                              onClick={closeMenus}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.mobileActions}>
              <Button href={`tel:${site.phone}`} variant="secondary" fullWidth>
                <PhoneIcon size={17} />
                <span dir="ltr">{site.phoneDisplay}</span>
              </Button>
              <Button
                href={buildWhatsAppUrl()}
                variant="whatsapp"
                fullWidth
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={17} />
                تواصل عبر واتساب
              </Button>
            </div>

            <div className={styles.mobileContact}>
              <a href={`mailto:${site.email}`}>
                <MailIcon size={15} />
                {site.email}
              </a>
              <p>
                <Icon name="mapPin" size={15} />
                {site.addressShort}
              </p>
              <p>
                <ClockIcon size={15} />
                {site.workingHours}
              </p>
            </div>

            <div className={styles.mobileSocial}>
              {site.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={styles.socialLink}
                >
                  <Icon name={item.name} size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
