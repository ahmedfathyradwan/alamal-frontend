"use client";

import { useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PropertyCard from "../PropertyCard/PropertyCard";
import PropertyFilters from "../PropertyFilters/PropertyFilters";
import Pagination from "../Pagination/Pagination";
import EmptyState from "../EmptyState/EmptyState";
import Button from "../Button/Button";
import {
  ChevronDownIcon,
  CloseIcon,
  FilterIcon,
  ResetIcon,
} from "../Icons/Icons";
import { sortOptions } from "@/data/properties";
import { filterProperties, sortProperties } from "@/lib/properties";
import styles from "./ListingsBrowser.module.css";

const PAGE_SIZE = 6;

function buildCountLabel(total) {
  if (total === 0) return "لا توجد عقارات مطابقة";
  if (total === 1) return "عقار واحد متاح";
  if (total === 2) return "عقاران متاحان";
  if (total <= 10) return `${total} عقارات متاحة`;
  return `${total} عقارًا متاحًا`;
}

export default function ListingsBrowser({
  properties,
  lockedPurpose = null,
  lockedTypes = null,
  pageSize = PAGE_SIZE,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [initial] = useState(() => ({
    purpose: lockedPurpose ?? (searchParams.get("purpose") || "all"),
    type: lockedTypes ? "all" : searchParams.get("type") || "all",
    governorate: searchParams.get("gov") || "all",
    city: searchParams.get("city") || "all",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minArea: searchParams.get("minArea") || "",
    maxArea: searchParams.get("maxArea") || "",
  }));

  const [draft, setDraft] = useState(initial);
  const [applied, setApplied] = useState(initial);
  const [sort, setSort] = useState(() => searchParams.get("sort") || "latest");
  const [page, setPage] = useState(() => {
    const parsed = Number.parseInt(searchParams.get("page") ?? "1", 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const resultsRef = useRef(null);
  const sidebarRef = useRef(null);

  const filtered = useMemo(
    () =>
      sortProperties(
        filterProperties(properties, { ...applied, types: lockedTypes ?? undefined }),
        sort,
      ),
    [properties, applied, sort, lockedTypes],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const activeFilterCount = [
    !lockedPurpose && applied.purpose !== "all",
    !lockedTypes && applied.type !== "all",
    applied.governorate !== "all",
    applied.city !== "all",
    applied.minPrice !== "" || applied.maxPrice !== "",
    applied.minArea !== "" || applied.maxArea !== "",
  ].filter(Boolean).length;

  const scrollToResults = () => {
    window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const syncUrl = (filters, nextSort, nextPage) => {
    const params = new URLSearchParams();

    if (!lockedPurpose && filters.purpose !== "all") {
      params.set("purpose", filters.purpose);
    }
    if (!lockedTypes && filters.type !== "all") {
      params.set("type", filters.type);
    }
    if (filters.governorate !== "all") params.set("gov", filters.governorate);
    if (filters.city !== "all") params.set("city", filters.city);
    if (filters.minPrice !== "") params.set("minPrice", filters.minPrice);
    if (filters.maxPrice !== "") params.set("maxPrice", filters.maxPrice);
    if (filters.minArea !== "") params.set("minArea", filters.minArea);
    if (filters.maxArea !== "") params.set("maxArea", filters.maxArea);
    if (nextSort !== "latest") params.set("sort", nextSort);
    if (nextPage > 1) params.set("page", String(nextPage));

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleDraftChange = (field, value) => {
    setDraft((previous) => {
      const next = { ...previous, [field]: value };
      if (field === "governorate") next.city = "all";
      return next;
    });
  };

  const handleApply = (event) => {
    event?.preventDefault();
    setApplied(draft);
    setPage(1);
    setFiltersOpen(false);
    syncUrl(draft, sort, 1);
    scrollToResults();
  };

  const handleReset = () => {
    const defaults = {
      purpose: lockedPurpose ?? "all",
      type: "all",
      governorate: "all",
      city: "all",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
    };

    setDraft(defaults);
    setApplied(defaults);
    setSort("latest");
    setPage(1);
    setFiltersOpen(false);
    router.replace(pathname, { scroll: false });
    scrollToResults();
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSort(value);
    setPage(1);
    syncUrl(applied, value, 1);
  };

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
    syncUrl(applied, sort, nextPage);
    scrollToResults();
  };

  const toggleFilters = () => {
    const next = !filtersOpen;
    setFiltersOpen(next);
    if (next) {
      window.requestAnimationFrame(() => {
        sidebarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  return (
    <div className={styles.layout} ref={resultsRef}>
      <aside
        id="listing-filters"
        ref={sidebarRef}
        className={[styles.sidebar, filtersOpen ? styles.sidebarOpen : ""].join(" ")}
      >
        <div className={styles.sidebarMobileHead}>
          <span>الفلاتر</span>
          <button
            type="button"
            className={styles.sidebarClose}
            aria-label="إغلاق الفلاتر"
            onClick={() => setFiltersOpen(false)}
          >
            <CloseIcon size={18} />
          </button>
        </div>
        <PropertyFilters
          draft={draft}
          onChange={handleDraftChange}
          onApply={handleApply}
          onReset={handleReset}
          lockedPurpose={lockedPurpose}
          lockedTypes={lockedTypes}
        />
      </aside>

      <div className={styles.results}>
        <div className={styles.toolbar}>
          <p className={styles.resultsCount} aria-live="polite">
            {buildCountLabel(filtered.length)}
          </p>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.filterToggle}
              onClick={toggleFilters}
              aria-expanded={filtersOpen}
              aria-controls="listing-filters"
            >
              <FilterIcon size={16} />
              الفلاتر
              {activeFilterCount > 0 ? (
                <span className={styles.badge}>{activeFilterCount}</span>
              ) : null}
            </button>

            <div className={styles.sortControl}>
              <label htmlFor="listing-sort" className={styles.sortLabel}>
                ترتيب
              </label>
              <div className={styles.selectWrap}>
                <select
                  id="listing-sort"
                  className={styles.select}
                  value={sort}
                  onChange={handleSortChange}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon size={15} className={styles.chevron} />
              </div>
            </div>
          </div>
        </div>

        {pageItems.length > 0 ? (
          <div className={styles.grid}>
            {pageItems.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                priority={index < 3}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="لم نعثر على عقارات مطابقة"
            description="لا توجد عقارات تطابق المعايير المحددة حاليًا. جرّب توسيع نطاق السعر أو تغيير المحافظة."
            action={
              <Button variant="outline" onClick={handleReset}>
                <ResetIcon size={16} />
                إعادة تعيين الفلاتر
              </Button>
            }
          />
        )}

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onChange={handlePageChange}
        />

        {filtered.length > 0 && totalPages > 1 ? (
          <p className={styles.pageNote}>
            عرض {pageItems.length} من أصل {filtered.length} عقار
          </p>
        ) : null}
      </div>
    </div>
  );
}
