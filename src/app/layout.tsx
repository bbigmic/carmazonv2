import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "BP Logistic - Samochody Dostawcze | Vany, Busy, Dostawczaki",
  description: "BP Logistic – sprzedaż samochodów dostawczych: vany, busy i dostawczaki. Kupno, sprzedaż, wycena. Mechanika, detailing i laweta.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} ${dmSans.variable} ${inter.className} font-sans antialiased`}>
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
