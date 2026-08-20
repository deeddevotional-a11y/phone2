import { shopConfig } from "@/config/shopConfig";
import type { DayHours } from "@/config/shopConfig";

export { cn } from "@/utils/cn";

/** ₹1,34,900 — Indian grouping (swap formatter for other locales). */
export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

/** Compact variant for badges: ₹1.35L */
export const inrShort = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(2).replace(/\.00$/, "")}L` : inr(n);

/** "10:30" -> "10:30 AM" */
export const to12h = (t?: string) => {
  if (!t) return "";
  const [hRaw, m] = t.split(":");
  const h = Number(hRaw);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m} ${suffix}`;
};

/** tel: link */
export const telHref = (raw = shopConfig.contact.phoneRaw) => `tel:+${raw.replace(/\D/g, "")}`;

/** wa.me deep link with a pre-filled message (works on mobile + desktop). */
export const waHref = (message: string, number = shopConfig.contact.whatsapp) =>
  `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

/** Pre-built WhatsApp intents used across the template. */
export const waMessages = {
  product: (name: string, price: number) =>
    `Hi ${shopConfig.shortName}! Is the ${name} (${inr(price)}) available right now? Please hold one for me.`,
  notify: (name: string) =>
    `Hi ${shopConfig.shortName}, please notify me when the ${name} is back in stock.`,
  repair: (service: string) =>
    `Hi ${shopConfig.shortName}, I'd like to book a repair — ${service}.`,
  tradeIn: (model: string) =>
    `Hi ${shopConfig.shortName}, I'd like an exchange quote for my ${model}.`,
  generic: () => `Hi ${shopConfig.shortName}! I have a question about your products/services.`,
};

/* -------------------------------------------------------------------------- */
/*  Opening hours logic — drives the live "Open now / Closed" pill             */
/* -------------------------------------------------------------------------- */

const INDIA_TZ_OFFSET_MIN = 5.5 * 60; // store timezone (IST) offset from UTC

const storeNow = () => {
  const now = new Date();
  return new Date(now.getTime() + (INDIA_TZ_OFFSET_MIN + now.getTimezoneOffset()) * 60000);
};

export const dayNameNow = () =>
  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][storeNow().getDay()];

export const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export const isOpenNow = (hours: DayHours[]) => {
  const now = storeNow();
  const today = hours.find((d) => d.day === dayNameNow());
  if (!today || today.closed || !today.open || !today.close) return false;
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= toMinutes(today.open) && mins < toMinutes(today.close);
};

/** Human string for the next opening, used when the shop is closed. */
export const nextOpening = (hours: DayHours[]) => {
  const today = dayNameNow();
  const idx = hours.findIndex((d) => d.day === today);
  for (let i = 1; i <= 7; i++) {
    const day = hours[(idx + i) % hours.length];
    if (!day.closed && day.open) {
      const label = i === 1 ? "tomorrow" : day.day;
      return `Opens ${label} at ${to12h(day.open)}`;
    }
  }
  return "Call for an appointment";
};
