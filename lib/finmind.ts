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

export interface CurrencyData {
  currency: CurrencyCode;
  latest: RateSnapshot | null;
  trend: RatePoint[];
}

const FINMIND_URL = "https://api.finmindtrade.com/api/v4/data";
export const CURRENCIES: CurrencyCode[] = ["PHP", "USD", "JPY"];
const TREND_DAYS = 30;
// 涵蓋台灣銀行非營業日缺報價的緩衝天數，需大於連假（如農曆春節）長度
const LOOKBACK_BUFFER_DAYS = 14;

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
  const json = (await res.json()) as { data?: unknown };
  if (!Array.isArray(json.data)) {
    throw new Error(`FinMind 匯率資料格式異常：${currency}`);
  }
  // 台銀非營業日或缺報價時，cash_buy 會是 0 或 -99，需濾除
  return (json.data as FinMindRow[])
    .filter((r) => typeof r.cash_buy === "number" && r.cash_buy > 0)
    .map((r) => ({ date: r.date, cashBuy: r.cash_buy }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

// 單一幣別的資料獨立成敗：一種幣別暫時取不到資料時，其他幣別仍正常顯示
export async function getCurrencyData(
  days = TREND_DAYS
): Promise<CurrencyData[]> {
  const start = isoDate(
    new Date(Date.now() - (days + LOOKBACK_BUFFER_DAYS) * 24 * 60 * 60 * 1000)
  );
  return Promise.all(
    CURRENCIES.map(async (currency) => {
      try {
        const rows = await fetchCurrencyRange(currency, start);
        const trend = rows.slice(-days);
        const latestRow = rows[rows.length - 1];
        const latest = latestRow
          ? { currency, date: latestRow.date, cashBuy: latestRow.cashBuy }
          : null;
        return { currency, latest, trend };
      } catch {
        return { currency, latest: null, trend: [] };
      }
    })
  );
}
