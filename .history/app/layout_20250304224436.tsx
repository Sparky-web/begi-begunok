import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import type { Metadata } from "next";
import MouseMoveEffect from "@/components/MouseMoveEffect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Бегунок - Курьерская доставка по Москве",
  description:
    "Быстрая и надежная курьерская доставка по Москве и области. Доставка документов, посылок и грузов.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        {children}
        <Toaster />
        <div className="fixed inset-0">
          <MouseMoveEffect />
        </div>
      </body>
    </html>
  );
}

import "./globals.css";
import { Toaster } from "sonner";
