import { SUPPORTED_CURRENCIES } from "../constants/currencies";

export function formatCurrency(
  amountInUSD: number,
  targetCurrencyCode: string = "USD"
): string {
  const currency = SUPPORTED_CURRENCIES[targetCurrencyCode] || SUPPORTED_CURRENCIES.USD;
  const converted = amountInUSD * currency.exchangeRateFromUSD;

  // Format with standard localization
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.code,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: currency.code === "JPY" ? 0 : 2,
    maximumFractionDigits: currency.code === "JPY" ? 0 : 2,
  }).format(converted);
}

export function formatDate(dateStringOrObj: string | Date): string {
  const date = typeof dateStringOrObj === "string" ? new Date(dateStringOrObj) : dateStringOrObj;
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatDateTime(dateStringOrObj: string | Date): string {
  const date = typeof dateStringOrObj === "string" ? new Date(dateStringOrObj) : dateStringOrObj;
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `NUB-${year}-${random}`;
}

export function generateTrackingNumber(carrier: string = "DHL"): string {
  const random = Math.floor(1000000000 + Math.random() * 9000000000);
  return `${carrier.toUpperCase()}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}
