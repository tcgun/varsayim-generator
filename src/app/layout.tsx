import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "VARSAYIM | Maç Yorumu Oluşturucu",
  description: "Marka kimliğine uygun hızlı maç yorumu görselleri üretin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${outfit.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
