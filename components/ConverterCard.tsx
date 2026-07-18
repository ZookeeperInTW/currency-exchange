"use client";

import { useState } from "react";
import type { RateSnapshot } from "@/lib/finmind";
import { CURRENCY_LABEL, rateFormatter, twdFormatter } from "@/lib/currency";

export function ConverterCard({ rates }: { rates: RateSnapshot[] }) {
  const [amounts, setAmounts] = useState<Record<string, string>>({});

  const rows = rates.map((rate) => {
    const amountText = amounts[rate.currency] ?? "";
    const amountValue = Number(amountText);
    const isEmpty = amountText.trim() === "";
    const hasValidAmount = !isEmpty && Number.isFinite(amountValue) && amountValue >= 0;
    const isInvalid = !isEmpty && !hasValidAmount;
    const twd = hasValidAmount ? amountValue * rate.rate : 0;

    return { rate, amountText, isInvalid, twd };
  });

  const total = rows.reduce((sum, row) => sum + row.twd, 0);

  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
      <div>
        <span className="text-sm text-[var(--color-text-muted)]">等值台幣</span>
        <div className="text-[40px] font-extrabold leading-tight text-[var(--color-primary)] sm:text-[56px]">
          {twdFormatter.format(total)}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 border-t border-[var(--color-border)] pt-4">
        {rows.map(({ rate, amountText, isInvalid }) => (
          <label
            key={rate.currency}
            className="flex flex-col gap-1"
            htmlFor={`amount-${rate.currency}`}
          >
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
            {isInvalid ? (
              <span className="text-[13px] text-[var(--color-down)]">請輸入有效的金額</span>
            ) : (
              <span className="text-[13px] text-[var(--color-text-muted)]">
                現金匯率均價 1 {rate.currency} = {rateFormatter.format(rate.rate)} TWD（{rate.date}）
              </span>
            )}
          </label>
        ))}
      </div>
    </section>
  );
}
