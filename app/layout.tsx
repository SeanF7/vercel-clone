import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Popup } from "@/components/Popup";
import { GeistSans, GeistMono } from "geist/font";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vercel",
  description: "A copy of vercel.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${inter.className}`}>
        <div className="font-sans">
          {/* <Popup /> */}
          {children}
        </div>
      </body>
    </html>
  );
}
