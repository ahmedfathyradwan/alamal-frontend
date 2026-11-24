import Button from "../Button/Button";
import { ChevronDownIcon, FilterIcon, ResetIcon } from "../Icons/Icons";
import { governorates, propertyTypes, purposes } from "@/data/properties";
import { getCities } from "@/lib/properties";
import styles from "./PropertyFilters.module.css";

export default function PropertyFilters({
  draft,
  onChange,
  onApply,
  onReset,
  lockedPurpose = null,
  lockedTypes = null,
}) {
  const cities = getCities(draft.governorate);
  const cityDisabled = draft.governorate === "all";
  const isRent = draft.purpose === "rent";

  return (
    <form className={styles.form} onSubmit={onApply}>
      <div className={styles.head}>
        <span className={styles.headTitle}>
          <FilterIcon size={17} />
          تصفية النتائج
        </span>
      </div>

      {!lockedPurpose ? (
        <div className={styles.group}>
          <span className={styles.label}>الغرض</span>
          <div className={styles.segmented} role="group" aria-label="الغرض">
            {[{ value: "all", label: "الكل" }, ...purposes].map((item) => (
              <button
                key={item.value}
                type="button"
                className={[
                  styles.segment,
                  draft.purpose === item.value ? styles.segmentActive : "",
                ].join(" ")}
                aria-pressed={draft.purpose === item.value}
                onClick={() => onChange("purpose", item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {!lockedTypes ? (
        <div className={styles.group}>
          <label className={styles.label} htmlFor="filter-type">
            نوع العقار
          </label>
          <div className={styles.control}>
            <select
              id="filter-type"
              className={styles.select}
              value={draft.type}
              onChange={(event) => onChange("type", event.target.value)}
            >
              <option value="all">كل الأنواع</option>
              {propertyTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon size={15} className={styles.chevron} />
          </div>
        </div>
      ) : null}

      <div className={styles.group}>
        <label className={styles.label} htmlFor="filter-governorate">
          المحافظة
        </label>
        <div className={styles.control}>
          <select
            id="filter-governorate"
            className={styles.select}
            value={draft.governorate}
            onChange={(event) => onChange("governorate", event.target.value)}
          >
            <option value="all">كل المحافظات</option>
            {governorates.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <ChevronDownIcon size={15} className={styles.chevron} />
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="filter-city">
          المدينة / المنطقة
        </label>
        <div className={styles.control}>
          <select
            id="filter-city"
            className={styles.select}
            value={draft.city}
            onChange={(event) => onChange("city", event.target.value)}
            disabled={cityDisabled}
          >
            <option value="all">
              {cityDisabled ? "اختر المحافظة أولًا" : "كل المدن"}
            </option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <ChevronDownIcon size={15} className={styles.chevron} />
        </div>
      </div>

      <div className={styles.group}>
        <span className={styles.label}>
          نطاق السعر {isRent ? "(شهريًا)" : "(ج.م)"}
        </span>
        <div className={styles.range}>
          <label className={styles.rangeField}>
            <span>من</span>
            <input
              type="number"
              inputMode="numeric"
              min="0"
              step="1000"
              placeholder="أقل سعر"
              value={draft.minPrice}
              onChange={(event) => onChange("minPrice", event.target.value)}
            />
          </label>
          <label className={styles.rangeField}>
            <span>إلى</span>
            <input
              type="number"
              inputMode="numeric"
              min="0"
              step="1000"
              placeholder="أعلى سعر"
              value={draft.maxPrice}
              onChange={(event) => onChange("maxPrice", event.target.value)}
            />
          </label>
        </div>
      </div>

      <div className={styles.group}>
        <span className={styles.label}>المساحة (م²)</span>
        <div className={styles.range}>
          <label className={styles.rangeField}>
            <span>من</span>
            <input
              type="number"
              inputMode="numeric"
              min="0"
              step="10"
              placeholder="أقل مساحة"
              value={draft.minArea}
              onChange={(event) => onChange("minArea", event.target.value)}
            />
          </label>
          <label className={styles.rangeField}>
            <span>إلى</span>
            <input
              type="number"
              inputMode="numeric"
              min="0"
              step="10"
              placeholder="أكبر مساحة"
              value={draft.maxArea}
              onChange={(event) => onChange("maxArea", event.target.value)}
            />
          </label>
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="submit" variant="primary" fullWidth>
          تطبيق الفلاتر
        </Button>
        <button type="button" className={styles.reset} onClick={onReset}>
          <ResetIcon size={14} />
          إعادة تعيين
        </button>
      </div>
    </form>
  );
}
