import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const font = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Routewatch - Interlogic",
  description:
    "A web-based tool for tracking fleet positions, calculating ETAs, and sending automated email reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
