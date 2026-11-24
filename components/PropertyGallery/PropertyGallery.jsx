"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "../Icons/Icons";
import styles from "./PropertyGallery.module.css";

export default function PropertyGallery({ images, title }) {
  const [active, setActive] = useState(0);
  const total = images.length;

  if (total === 0) return null;

  const goTo = (index) => setActive((index + total) % total);

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <Image
          src={images[active]}
          alt={`${title} - صورة ${active + 1} من ${total}`}
          fill
          sizes="(max-width: 1024px) 100vw, 62vw"
          className={styles.mainImage}
          priority
        />

        {total > 1 ? (
          <>
            <button
              type="button"
              className={`${styles.nav} ${styles.prev}`}
              onClick={() => goTo(active - 1)}
              aria-label="الصورة السابقة"
            >
              <ChevronRightIcon size={20} />
            </button>
            <button
              type="button"
              className={`${styles.nav} ${styles.next}`}
              onClick={() => goTo(active + 1)}
              aria-label="الصورة التالية"
            >
              <ChevronLeftIcon size={20} />
            </button>
          </>
        ) : null}

        <span className={styles.counter}>
          {active + 1} / {total}
        </span>
      </div>

      {total > 1 ? (
        <div className={styles.thumbs} role="group" aria-label="صور العقار">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={[styles.thumb, index === active ? styles.thumbActive : ""].join(" ")}
              onClick={() => setActive(index)}
              aria-label={`عرض الصورة ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="110px"
                className={styles.thumbImage}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
