// src/app/layout.tsx - CORRIGIDO
import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TransactionProvider } from "@/contexts/TransactionContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Configura as fontes do Google
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados para SEO
export const metadata: Metadata = {
  title: "Minhas Finanças",
  description: "App de controle financeiro",
};

// Layout raiz que envolve toda a aplicação
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ CORREÇÃO: ThemeProvider deve envolver TransactionProvider */}
        <ThemeProvider>
          <TransactionProvider>{children}</TransactionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
