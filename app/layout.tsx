import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Luís Trindade — Engenharia de Software & Soluções Digitais",
  description: "Dashboards, CRMs e automação de processos para pequenas e médias empresas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${inter.variable} ${manrope.variable}`}>{children}</body></html>;
}
