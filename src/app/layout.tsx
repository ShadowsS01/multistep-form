import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Inter } from "next/font/google";

const IBMSans = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multi Step Form",
  description: "Multi Step Form.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${IBMSans.className} flex h-screen w-full flex-col items-center justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
