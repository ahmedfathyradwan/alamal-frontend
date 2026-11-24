import {
  categories,
  citiesByGovernorate,
  properties,
  propertyTypes,
} from "@/data/properties";

export function getPropertyById(id) {
  return properties.find((property) => property.id === id) ?? null;
}

export function getTypeLabel(type) {
  return propertyTypes.find((item) => item.value === type)?.label ?? type;
}

export function getPurposeLabel(purpose) {
  return purpose === "rent" ? "للإيجار" : "للبيع";
}

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug) ?? null;
}

export function getCategoryCount(category) {
  return properties.filter((property) => category.types.includes(property.type))
    .length;
}

export function getCities(governorate) {
  if (!governorate || governorate === "all") {
    return Object.values(citiesByGovernorate).flat();
  }

  return citiesByGovernorate[governorate] ?? [];
}

export function getFeaturedProperties() {
  return properties
    .filter((property) => property.featured)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getPropertiesByPurpose(purpose) {
  return properties
    .filter((property) => property.purpose === purpose)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function inRange(value, min, max) {
  if (min !== "" && min !== null && min !== undefined) {
    if (!Number.isFinite(Number(min)) || value < Number(min)) return false;
  }

  if (max !== "" && max !== null && max !== undefined) {
    if (!Number.isFinite(Number(max)) || value > Number(max)) return false;
  }

  return true;
}

export function filterProperties(list, filters = {}) {
  const {
    purpose = "all",
    type = "all",
    types,
    governorate = "all",
    city = "all",
    minPrice = "",
    maxPrice = "",
    minArea = "",
    maxArea = "",
  } = filters;

  return list.filter((property) => {
    if (purpose !== "all" && property.purpose !== purpose) return false;

    if (Array.isArray(types) && types.length > 0) {
      if (!types.includes(property.type)) return false;
    } else if (type !== "all" && property.type !== type) {
      return false;
    }

    if (governorate !== "all" && property.governorate !== governorate) {
      return false;
    }

    if (city !== "all" && property.city !== city) return false;

    if (!inRange(property.price, minPrice, maxPrice)) return false;
    if (!inRange(property.area, minArea, maxArea)) return false;

    return true;
  });
}

export function sortProperties(list, sort = "latest") {
  const sorted = [...list];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "area-desc":
      return sorted.sort((a, b) => b.area - a.area);
    case "latest":
    default:
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

export function getSimilarProperties(property, count = 3) {
  if (!property) return [];

  return properties
    .filter((item) => item.id !== property.id)
    .map((item) => {
      let score = 0;
      if (item.type === property.type) score += 3;
      if (item.city === property.city) score += 2;
      if (item.governorate === property.governorate) score += 1;
      if (item.purpose === property.purpose) score += 1;
      return { item, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.item.createdAt) - new Date(a.item.createdAt),
    )
    .slice(0, count)
    .map(({ item }) => item);
}
