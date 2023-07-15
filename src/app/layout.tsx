import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { IBM_Plex_Sans as IBMPlexSans } from "next/font/google";

const IBMSans = IBMPlexSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm",
});

export const metadata: Metadata = {
  title: "Multi Step Form",
  description: "Multi Step Form.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${IBMSans.variable}`}>{children}</body>
    </html>
  );
}
