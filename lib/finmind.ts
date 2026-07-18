export type CurrencyCode = "USD" | "JPY" | "PHP";

export interface RateSnapshot {
  currency: CurrencyCode;
  date: string;
  cashBuy: number;
}

export interface RatePoint {
  date: string;
  cashBuy: number;
}

const FINMIND_URL = "https://api.finmindtrade.com/api/v4/data";
export const CURRENCIES: CurrencyCode[] = ["PHP", "USD", "JPY"];

interface FinMindRow {
  date: string;
  currency: string;
  cash_buy: number;
  cash_sell: number;
  spot_buy: number;
  spot_sell: number;
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

async function fetchCurrencyRange(
  currency: CurrencyCode,
  startDate: string
): Promise<RatePoint[]> {
  const url = `${FINMIND_URL}?dataset=TaiwanExchangeRate&data_id=${currency}&start_date=${startDate}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`FinMind 匯率資料取得失敗：${currency}（狀態碼 ${res.status}）`);
  }
  const json = (await res.json()) as { data?: FinMindRow[] };
  const rows = json.data ?? [];
  // 台銀非營業日或缺報價時，cash_buy 會是 0 或 -99，需濾除
  return rows
    .filter((r) => r.cash_buy > 0)
    .map((r) => ({ date: r.date, cashBuy: r.cash_buy }));
}

export async function getLatestRates(): Promise<RateSnapshot[]> {
  const start = isoDate(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000));
  return Promise.all(
    CURRENCIES.map(async (currency) => {
      const rows = await fetchCurrencyRange(currency, start);
      const latest = rows[rows.length - 1];
      if (!latest) {
        throw new Error(`找不到 ${currency} 的最新匯率資料`);
      }
      return { currency, date: latest.date, cashBuy: latest.cashBuy };
    })
  );
}

export async function getTrends(
  days = 30
): Promise<Record<CurrencyCode, RatePoint[]>> {
  const start = isoDate(new Date(Date.now() - (days + 10) * 24 * 60 * 60 * 1000));
  const entries = await Promise.all(
    CURRENCIES.map(async (currency) => {
      const rows = await fetchCurrencyRange(currency, start);
      return [currency, rows.slice(-days)] as const;
    })
  );
  return Object.fromEntries(entries) as Record<CurrencyCode, RatePoint[]>;
}
