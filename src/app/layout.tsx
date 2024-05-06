import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/config/env";
import { getUser } from "@/actions/auth";
import { redirect, usePathname } from "next/navigation";
import { headers } from "next/headers";

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
  const user = await getUser();

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
