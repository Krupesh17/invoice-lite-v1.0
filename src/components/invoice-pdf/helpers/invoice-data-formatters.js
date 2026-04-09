import { currencyMap } from "@/constants";

export function formatAmount(amount = 0, currency = "USD") {
  return `${currencyMap[currency]}${Number(amount).toFixed(2)}`;
}

export function formatDate(str) {
  const d = new Date(str);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}
