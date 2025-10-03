// src/app/page.tsx
// Importa React para criar componente
import React from "react";

// Importa componentes da aplicação
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

// Componente da página inicial
export default function Home() {
  // Retorna JSX da página
  return (
    // Div principal com classes Tailwind para layout
    <div className="min-h-screen flex flex-col">
      {/* Header da aplicação */}
      <Header />

      {/* Navegação */}
      <Navigation />

      {/* Conteúdo principal */}
      <main className="flex-1 container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">💰 Minhas Finanças</h1>
          <p className="text-xl mb-8">
            Bem-vindo ao seu app de controle financeiro
          </p>

          {/* Links para páginas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a
              href="/dashboard"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2">📊 Dashboard</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Visão geral das suas finanças
              </p>
            </a>

            <a
              href="/transactions"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2">📋 Transações</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Gerencie todas transações
              </p>
            </a>

            <a
              href="/reports"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2">📈 Relatórios</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Análises e insights
              </p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
