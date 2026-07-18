import { ConverterCard } from "@/components/ConverterCard";
import { TrendChart } from "@/components/TrendChart";
import { CURRENCIES, getCurrencyData } from "@/lib/finmind";
import type { CurrencyCode, RatePoint } from "@/lib/finmind";

const FALLBACK_ERROR = "匯率資料暫時無法取得，請稍後再試一次。";

export default async function Home() {
  let data: Awaited<ReturnType<typeof getCurrencyData>> | null = null;

  try {
    data = await getCurrencyData();
  } catch (error) {
    console.error("[Home] 匯率資料取得失敗", error);
  }

  const rates = data?.filter((d) => d.latest !== null).map((d) => d.latest!) ?? [];
  const trends = Object.fromEntries(
    CURRENCIES.map((currency) => [
      currency,
      data?.find((d) => d.currency === currency)?.trend ?? [],
    ])
  ) as Record<CurrencyCode, RatePoint[]>;
  const hasNoData = rates.length === 0;

  return (
    <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-6 px-4 py-8 sm:px-0">
      <header className="flex flex-col gap-2">
        <h1 className="text-[32px] font-bold leading-tight text-[var(--color-text)]">
          披索・美元・日圓 換算台幣
        </h1>
        <p className="text-base text-[var(--color-text-muted)]">
          依台灣銀行牌告現金匯率，即時換算等值新台幣
        </p>
      </header>

      {hasNoData ? (
        <p className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-[var(--color-down)]">
          {FALLBACK_ERROR}
        </p>
      ) : (
        <>
          <ConverterCard rates={rates} />
          <TrendChart trends={trends} />
        </>
      )}

      <footer className="mt-4 text-[13px] text-[var(--color-text-muted)]">
        資料來源：台灣銀行牌告匯率（現金匯率），由 FinMind 提供，每日更新一次，非盤中即時報價。
      </footer>
    </main>
  );
}
