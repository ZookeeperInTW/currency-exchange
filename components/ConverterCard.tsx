"use client";

import { useState } from "react";
import type { RateSnapshot } from "@/lib/finmind";
import { CURRENCY_LABEL, rateFormatter, twdFormatter } from "@/lib/currency";

export function ConverterCard({ rates }: { rates: RateSnapshot[] }) {
  const [amounts, setAmounts] = useState<Record<string, string>>({});

  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">
        輸入外幣金額，換算等值台幣
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        {rates.map((rate) => {
          const amountText = amounts[rate.currency] ?? "";
          const amountValue = Number(amountText);
          const isEmpty = amountText.trim() === "";
          const hasValidAmount = !isEmpty && Number.isFinite(amountValue) && amountValue >= 0;
          const isInvalid = !isEmpty && !hasValidAmount;
          const twd = hasValidAmount ? amountValue * rate.cashBuy : 0;

          return (
            <div key={rate.currency} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <label className="flex w-full flex-col gap-1 sm:w-2/5" htmlFor={`amount-${rate.currency}`}>
                <span className="text-sm text-[var(--color-text-muted)]">
                  {CURRENCY_LABEL[rate.currency]}（{rate.currency}）
                </span>
                <input
                  id={`amount-${rate.currency}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  placeholder="0"
                  value={amountText}
                  onChange={(e) =>
                    setAmounts((prev) => ({ ...prev, [rate.currency]: e.target.value }))
                  }
                  className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-base text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />
              </label>
              <div className="flex flex-1 flex-col">
                <span className="text-[32px] font-bold leading-tight text-[var(--color-text)] sm:text-[40px]">
                  {twdFormatter.format(twd)}
                </span>
                {isInvalid ? (
                  <span className="text-[13px] text-[var(--color-down)]">請輸入有效的金額</span>
                ) : (
                  <span className="text-[13px] text-[var(--color-text-muted)]">
                    現金匯率 1 {rate.currency} = {rateFormatter.format(rate.cashBuy)} TWD（{rate.date}）
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
