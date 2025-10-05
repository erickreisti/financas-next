// src/app/layout.tsx
// Importa React para criar componente
import React from "react";

// Importa tipos do Next.js para metadados da página
import type { Metadata } from "next";

// Importa fontes do Google Fonts (Next.js 15 usa Geist)
import { Geist, Geist_Mono } from "next/font/google";

// Importa estilos globais do Next.js (TAILWIND)
import "./globals.css";

// Importa seus estilos personalizados
import "@/styles/App.css";

// Importa providers dos contextos criados
// PROVIDERS PARA CONTEXTO GLOBAL
import { TransactionProvider } from "@/contexts/TransactionContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Configura a fonte Geist Sans (fonte principal)
const geistSans = Geist({
  variable: "--font-geist-sans", // Variável CSS para usar a fonte
  subsets: ["latin"], // Subconjunto de caracteres (latim)
});

// Configura a fonte Geist Mono (para código/monospace)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // Variável CSS para usar a fonte
  subsets: ["latin"], // Subconjunto de caracteres (latim)
});

// Metadados da página (SEO)
export const metadata: Metadata = {
  title: "Minhas Finanças", // Título da página
  description: "App de controle financeiro", // Descrição para SEO
};

// Componente de layout principal - envolve toda a aplicação
// LAYOUT GLOBAL COM PROVIDERS DE CONTEXTO
export default function RootLayout({
  children, // Conteúdo das páginas filhas
}: Readonly<{
  children: React.ReactNode; // Pode ser qualquer elemento React
}>) {
  // Retorna JSX do layout
  return (
    // Elemento HTML raiz
    <html lang="pt-BR">
      {/* Corpo da página com fontes configuradas */}
      <body
        // Aplica as variáveis CSS das fontes + classe antialiased
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Providers para contexto global - devem envolver toda a árvore de componentes */}
        {/* THEME PROVIDER DEVE VIR POR FORA PARA QUE TRANSACTION PROVIDER POSSA USÁ-LO */}
        <ThemeProvider>
          {/* TRANSACTION PROVIDER ENVOLVE TODA ÁRVORE DE COMPONENTES QUE PRECISAM DE TRANSAÇÕES */}
          <TransactionProvider>
            {/* Conteúdo das páginas filhas será injetado aqui */}
            {children}
          </TransactionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
