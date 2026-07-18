"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CurrencyCode, RatePoint } from "@/lib/finmind";
import { CURRENCIES } from "@/lib/finmind";
import { CURRENCY_LABEL, rateFormatter } from "@/lib/currency";

export function TrendChart({
  trends,
}: {
  trends: Record<CurrencyCode, RatePoint[]>;
}) {
  const [active, setActive] = useState<CurrencyCode>("USD");
  const points = trends[active];

  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          近 30 天現金匯率均價趨勢
        </h2>
      </div>
      <div className="mt-3 flex gap-6 border-b border-[var(--color-border)]">
        {CURRENCIES.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setActive(code)}
            className={`-mb-px border-b-2 pb-2 text-sm font-medium transition-colors ${
              active === code
                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                : "border-transparent text-[var(--color-text-muted)]"
            }`}
          >
            {CURRENCY_LABEL[code]}
          </button>
        ))}
      </div>
      <div className="mt-4 h-64">
        {points.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={points} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.08} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
                tickFormatter={(value: string) => value.slice(5)}
                axisLine={{ stroke: "var(--color-border)" }}
                tickLine={false}
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
                tickFormatter={(value: number) => rateFormatter.format(value)}
                axisLine={false}
                tickLine={false}
                width={64}
              />
              <Tooltip
                formatter={(value) => [rateFormatter.format(Number(value)), "現金匯率均價"]}
                labelFormatter={(label) => String(label)}
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "var(--color-border)",
                  fontSize: 13,
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="var(--color-primary)"
                strokeWidth={2}
                fill="url(#trendFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-[var(--color-text-muted)]">目前沒有可顯示的歷史資料</p>
        )}
      </div>
    </section>
  );
}
