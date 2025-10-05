// src/app/layout.tsx - PROFISSIONAL
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/App.css";
import { TransactionProvider } from "@/contexts/TransactionContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Fonte moderna e profissional
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Finanças Pro | Controle Financeiro Inteligente",
    template: "%s | Finanças Pro",
  },
  description:
    "Sistema profissional de controle financeiro com analytics em tempo real",
  keywords: ["finanças", "controle", "orçamento", "investimentos", "economia"],
  authors: [{ name: "Finanças Pro" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <TransactionProvider>
            <div className="app-container">{children}</div>
          </TransactionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
