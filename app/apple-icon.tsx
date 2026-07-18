import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS 會自行套用圓角遮罩，圖片本身需保持方形滿版，不能預先加圓角
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#5B7C8D",
          color: "#FFFFFF",
          fontSize: 108,
          fontWeight: 800,
        }}
      >
        $
      </div>
    ),
    { ...size }
  );
}
