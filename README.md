# 匯率換算器

輸入菲律賓披索（PHP）、美元（USD）、日圓（JPY）金額，依台灣銀行牌告現金匯率即時換算等值新台幣，並提供近 30 天匯率趨勢圖。

## 技術棧

- Next.js 16（App Router）+ TypeScript
- Tailwind CSS v4（樣式規範見 [`DESIGN.md`](./DESIGN.md)）
- Recharts（趨勢圖）
- 匯率資料來源：[FinMind](https://finmind.github.io/v3/tutor/ExchangeRate/) `TaiwanExchangeRate` 資料集（來源為台灣銀行牌告匯率，每日更新一次，非盤中即時報價）

## 開發

```bash
npm install
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

> 本機開發環境若使用 Turbopack 執行 `next dev` 時因沙盒限制無法 spawn 子行程，可改用 `next dev --webpack`。

## 環境變數

| 變數 | 說明 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | 部署後的網站網址（例如 `https://your-app.up.railway.app`），用於 SEO 的 canonical、OG、sitemap、robots。未設定時預設為 `http://localhost:3000` |

## 部署（Railway）

```bash
npm run build
npm run start
```

部署前請在 Railway 專案設定中新增環境變數 `NEXT_PUBLIC_SITE_URL`，指向實際上線網址。

## 已知限制

- 匯率資料為台灣銀行「現金匯率」每日收盤價，非盤中即時報價，約有 1 個工作天延遲
- 菲律賓披索僅有現金匯率，無即期匯率，換算與趨勢圖統一採用現金匯率均價（現金買入 + 現金賣出）÷ 2
