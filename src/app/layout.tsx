import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "400", "600", "900"],
});

export const metadata: Metadata = {
  title: "Fossil Townsman ME3269 - Weightless Precision",
  description: "Suspend Time. Defy Gravity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} antialiased font-[family-name:var(--font-inter)]`}>
        {children}
      </body>
    </html>
  );
}
