import { ConverterCard } from "@/components/ConverterCard";
import { TrendChart } from "@/components/TrendChart";
import { getLatestRates, getTrends } from "@/lib/finmind";

export default async function Home() {
  let rates;
  let trends;
  let loadError: string | null = null;

  try {
    [rates, trends] = await Promise.all([getLatestRates(), getTrends(30)]);
  } catch {
    loadError = "匯率資料暫時無法取得，請稍後再試一次。";
  }

  return (
    <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-6 px-4 py-10 sm:px-0">
      <header className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold leading-tight text-[var(--color-text)] sm:text-[32px]">
          披索・美元・日圓 換算台幣
        </h1>
        <p className="text-base text-[var(--color-text-muted)]">
          依台灣銀行牌告現金匯率，即時換算等值新台幣
        </p>
      </header>

      {loadError || !rates || !trends ? (
        <p className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-[var(--color-down)]">
          {loadError}
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
