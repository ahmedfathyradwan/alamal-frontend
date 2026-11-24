import { site } from "@/data/site";
import { formatPropertyPrice } from "@/lib/format";

export function buildWhatsAppUrl(message = site.whatsappMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildPropertyWhatsAppUrl(property) {
  const message = [
    "مرحبًا، أنا مهتم بالعقار التالي:",
    property.title,
    `رقم المرجع: ${property.reference}`,
    `السعر: ${formatPropertyPrice(property)}`,
  ].join("\n");

  return buildWhatsAppUrl(message);
}

export function buildMapUrl(coordinates) {
  return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
}
