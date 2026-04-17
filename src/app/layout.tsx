import type { Metadata, Viewport } from "next";
import { Providers } from "@/app/providers";
import { PwaRegister } from "@/components/pwa-register";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "WWT",
    template: "%s | WWT"
  },
  description: "대덕소프트웨어마이스터고 학생 전용 중고거래 서비스 WWT",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WWT"
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-maskable.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/icon.svg" }]
  }
};

export const viewport: Viewport = {
  themeColor: "#1273ea"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <PwaRegister />
          {children}
        </Providers>
      </body>
    </html>
  );
}
