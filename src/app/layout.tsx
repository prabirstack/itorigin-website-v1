import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased", inter.variable, satoshi.variable)}>
        <div className="relative flex min-h-dvh flex-col bg-background font-sans">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
