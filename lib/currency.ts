import type { CurrencyCode } from "./finmind";

export const CURRENCY_LABEL: Record<CurrencyCode, string> = {
  PHP: "菲律賓披索",
  USD: "美元",
  JPY: "日圓",
};

export const twdFormatter = new Intl.NumberFormat("zh-TW", {
  style: "currency",
  currency: "TWD",
  maximumFractionDigits: 2,
});

export const rateFormatter = new Intl.NumberFormat("zh-TW", {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});
