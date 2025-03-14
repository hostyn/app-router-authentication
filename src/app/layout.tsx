import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/config/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hostyn's Authentication Demo",
  description: "Authentication in Next.js App Router",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
