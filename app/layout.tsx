import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "披索美元日圓換算台幣 · 匯率換算器",
    template: "%s · 匯率換算器",
  },
  description:
    "這是一個免費的線上匯率換算工具，讓你快速輸入菲律賓披索、美元、日圓等外幣金額，依台灣銀行牌告現金匯率即時換算出等值新台幣金額。同時提供近 30 天各幣別現金買入匯率的趨勢走勢圖，方便查詢近期匯率變化，適合出國換匯、收款換算、日常參考等情境使用，資料每日更新一次。",
  openGraph: {
    title: "披索美元日圓換算台幣 · 匯率換算器",
    description:
      "這是一個免費的線上匯率換算工具，讓你快速輸入菲律賓披索、美元、日圓等外幣金額，依台灣銀行牌告現金匯率即時換算出等值新台幣金額。同時提供近 30 天各幣別現金買入匯率的趨勢走勢圖，方便查詢近期匯率變化，適合出國換匯、收款換算、日常參考等情境使用，資料每日更新一次。",
    type: "website",
    locale: "zh_TW",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] font-sans">
        {children}
      </body>
    </html>
  );
}
