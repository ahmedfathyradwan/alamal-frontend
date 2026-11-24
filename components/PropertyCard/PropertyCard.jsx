import Image from "next/image";
import Link from "next/link";
import {
  AreaIcon,
  ArrowLeftIcon,
  BathIcon,
  BedIcon,
  MapPinIcon,
  StarIcon,
} from "../Icons/Icons";
import { formatArea, getPriceParts } from "@/lib/format";
import { getPurposeLabel, getTypeLabel } from "@/lib/properties";
import styles from "./PropertyCard.module.css";

export default function PropertyCard({ property, priority = false }) {
  const { amount, currency, suffix } = getPriceParts(property);
  const detailHref = `/properties/${property.id}`;

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Link
          href={detailHref}
          className={styles.imageLink}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={property.images[0]}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
            priority={priority}
          />
        </Link>

        <div className={styles.badges}>
          <span className={styles.purpose}>{getPurposeLabel(property.purpose)}</span>
          <span className={styles.type}>{getTypeLabel(property.type)}</span>
        </div>

        {property.featured ? (
          <span className={styles.featured}>
            <StarIcon size={12} />
            مميز
          </span>
        ) : null}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link href={detailHref}>{property.title}</Link>
        </h3>

        <p className={styles.location}>
          <MapPinIcon size={15} />
          <span>
            {property.city}، {property.governorate}
          </span>
        </p>

        <div className={styles.specs}>
          <span className={styles.spec}>
            <AreaIcon size={16} />
            {formatArea(property.area)}
          </span>
          {property.bedrooms > 0 ? (
            <span className={styles.spec}>
              <BedIcon size={16} />
              {property.bedrooms} غرف
            </span>
          ) : null}
          {property.bathrooms > 0 ? (
            <span className={styles.spec}>
              <BathIcon size={16} />
              {property.bathrooms} حمام
            </span>
          ) : null}
        </div>

        <p className={styles.description}>{property.description}</p>

        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.amount}>{amount}</span>
            <span className={styles.currency}>
              {currency}
              {suffix ? ` / ${suffix}` : ""}
            </span>
          </div>
          <Link href={detailHref} className={styles.details}>
            التفاصيل
            <ArrowLeftIcon size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
