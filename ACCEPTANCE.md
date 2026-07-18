# 驗收條件（GIVEN-WHEN-THEN）

## AC1 — 三種幣別預設可輸入
GIVEN 使用者開啟首頁
WHEN 頁面載入完成
THEN 畫面上顯示三個輸入框，分別對應菲律賓披索（PHP）、美元（USD）、日圓（JPY）

## AC2 — 輸入金額即時換算等值台幣
GIVEN 使用者在任一幣別輸入框輸入數字
WHEN 輸入內容改變
THEN 對應的等值台幣金額立即依「現金匯率（銀行買入價）」重新計算並顯示，不需按任何按鈕、不需重新整理頁面

## AC3 — 換算結果數字正確
GIVEN 美元現金匯率為 31.8950
WHEN 使用者在美元輸入框輸入 100
THEN 顯示等值台幣為 $3,189.50（= 100 × 31.8950）

## AC4 — 空白或未輸入時顯示 0
GIVEN 使用者尚未輸入或清空輸入框
WHEN 輸入框為空
THEN 對應等值台幣顯示為 $0.00，不出現 NaN 或錯誤畫面

## AC5 — 顯示匯率資料日期
GIVEN 頁面已載入匯率資料
WHEN 檢視任一幣別的換算結果區塊
THEN 顯示該筆匯率的資料日期（YYYY-MM-DD），並標註「非盤中即時報價」於頁尾

## AC6 — 匯率趨勢圖可切換三種幣別
GIVEN 使用者位於趨勢圖卡片
WHEN 點選「菲律賓披索」「美元」「日圓」其中一個 tab
THEN 圖表切換為該幣別近 30 天現金買入匯率折線圖，被選取的 tab 呈現主色底線

## AC7 — 資料來源失敗時的降級畫面
GIVEN FinMind API 呼叫失敗或逾時
WHEN 伺服器端資料抓取拋出錯誤
THEN 頁面不會白屏或整頁 500，改為顯示「匯率資料暫時無法取得，請稍後再試一次。」的錯誤提示卡片

## AC8 — SEO 基本需求
GIVEN 任何造訪首頁的使用者或搜尋引擎爬蟲
WHEN 檢視頁面原始碼
THEN `<html lang="zh-TW">`、`<title>` 唯一且不超過 60 字、`<meta name="description">` 100–160 字、具備 `og:title`／`og:description`／`og:type`／`og:locale`、具備 canonical 連結，且 `<h1>` 全頁唯一

## AC9 — Sitemap 與 Robots
GIVEN 網站已部署
WHEN 造訪 `/sitemap.xml` 與 `/robots.txt`
THEN sitemap 含首頁網址，robots 允許首頁被索引（因無私人頁面，不需 noindex）

## AC10 — 響應式版面
GIVEN 使用者以手機（< 640px）瀏覽
WHEN 檢視換算卡片與趨勢圖
THEN 卡片內距縮小為 16px、換算結果字級縮小為 32px，版面不出現橫向捲動
