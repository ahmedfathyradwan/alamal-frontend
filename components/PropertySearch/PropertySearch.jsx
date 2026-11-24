"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDownIcon,
  SearchIcon,
} from "../Icons/Icons";
import {
  citiesByGovernorate,
  governorates,
  propertyTypes,
  purposes,
} from "@/data/properties";
import styles from "./PropertySearch.module.css";

const budgetOptions = {
  sale: [
    { label: "أي سعر", min: "", max: "" },
    { label: "حتى 3 مليون", min: "", max: "3000000" },
    { label: "3 – 6 مليون", min: "3000000", max: "6000000" },
    { label: "6 – 10 مليون", min: "6000000", max: "10000000" },
    { label: "أكثر من 10 مليون", min: "10000000", max: "" },
  ],
  rent: [
    { label: "أي سعر", min: "", max: "" },
    { label: "حتى 10 آلاف", min: "", max: "10000" },
    { label: "10 – 25 ألف", min: "10000", max: "25000" },
    { label: "25 – 50 ألف", min: "25000", max: "50000" },
    { label: "أكثر من 50 ألف", min: "50000", max: "" },
  ],
};

export default function PropertySearch() {
  const router = useRouter();
  const [purpose, setPurpose] = useState("sale");
  const [type, setType] = useState("all");
  const [governorate, setGovernorate] = useState("all");
  const [city, setCity] = useState("all");
  const [budget, setBudget] = useState("0");

  const cities = useMemo(
    () => (governorate === "all" ? [] : citiesByGovernorate[governorate] ?? []),
    [governorate],
  );

  const handlePurposeChange = (value) => {
    setPurpose(value);
    setBudget("0");
  };

  const handleGovernorateChange = (value) => {
    setGovernorate(value);
    setCity("all");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    params.set("purpose", purpose);
    if (type !== "all") params.set("type", type);
    if (governorate !== "all") params.set("gov", governorate);
    if (city !== "all") params.set("city", city);

    const selectedBudget = budgetOptions[purpose][Number(budget)] ?? budgetOptions[purpose][0];
    if (selectedBudget.min) params.set("minPrice", selectedBudget.min);
    if (selectedBudget.max) params.set("maxPrice", selectedBudget.max);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.tabs}
        role="group"
        aria-label="الغرض من البحث"
      >
        {purposes.map((item) => (
          <button
            key={item.value}
            type="button"
            className={[styles.tab, purpose === item.value ? styles.tabActive : ""].join(" ")}
            aria-pressed={purpose === item.value}
            onClick={() => handlePurposeChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="hero-type">
            نوع العقار
          </label>
          <div className={styles.control}>
            <select
              id="hero-type"
              value={type}
              onChange={(event) => setType(event.target.value)}
              className={styles.select}
            >
              <option value="all">كل الأنواع</option>
              {propertyTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon size={16} className={styles.chevron} />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="hero-governorate">
            المحافظة
          </label>
          <div className={styles.control}>
            <select
              id="hero-governorate"
              value={governorate}
              onChange={(event) => handleGovernorateChange(event.target.value)}
              className={styles.select}
            >
              <option value="all">كل المحافظات</option>
              {governorates.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDownIcon size={16} className={styles.chevron} />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="hero-city">
            المدينة / المنطقة
          </label>
          <div className={styles.control}>
            <select
              id="hero-city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className={styles.select}
              disabled={governorate === "all"}
            >
              <option value="all">
                {governorate === "all" ? "اختر المحافظة أولًا" : "كل المدن"}
              </option>
              {cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDownIcon size={16} className={styles.chevron} />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="hero-budget">
            {purpose === "rent" ? "الميزانية الشهرية" : "الميزانية"}
          </label>
          <div className={styles.control}>
            <select
              id="hero-budget"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              className={styles.select}
            >
              {budgetOptions[purpose].map((item, index) => (
                <option key={item.label} value={String(index)}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon size={16} className={styles.chevron} />
          </div>
        </div>

        <button type="submit" className={styles.submit}>
          <SearchIcon size={18} />
          ابحث الآن
        </button>
      </form>
    </div>
  );
}
