const numberFormatter = new Intl.NumberFormat("en-US");

const dateFormatter = new Intl.DateTimeFormat("ar-EG", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatNumber(value) {
  return numberFormatter.format(Number(value) || 0);
}

export function formatArea(area) {
  return `${formatNumber(area)} م²`;
}

export function getPriceParts(property) {
  return {
    amount: formatNumber(property.price),
    currency: "ج.م",
    suffix: property.purpose === "rent" ? "شهريًا" : null,
  };
}

export function formatPropertyPrice(property) {
  const suffix = property.purpose === "rent" ? " / شهريًا" : "";
  return `${formatNumber(property.price)} ج.م${suffix}`;
}

export function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : dateFormatter.format(date);
}
