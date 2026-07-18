import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_TITLE = "披索美元日圓換算台幣 · 匯率換算器";
const SITE_DESCRIPTION =
  "這是一個免費的線上匯率換算工具，讓你快速輸入菲律賓披索、美元、日圓等外幣金額，依台灣銀行牌告現金匯率均價（買入賣出平均）即時換算出等值新台幣金額。同時提供近 30 天各幣別現金匯率均價的趨勢走勢圖，方便查詢近期匯率變化，適合出國換匯、收款換算、日常參考等情境使用，資料每日更新一次。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · 匯率換算器",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "zh_TW",
  },
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    title: "匯率換算器",
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
