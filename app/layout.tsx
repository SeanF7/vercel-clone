import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Popup } from "@/components/Popup";

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
    <html lang="en">
      <body className={inter.className}>
        <Popup />
        {children}
      </body>
    </html>
  );
}
