// src/app/page.tsx
// Importa React para criar componente
import React from "react";

// Importa componentes da aplicação
import Header from "@/components/Header"; // Header (usa contexto internamente)
import Navigation from "@/components/Navigation"; // Navigation (usa contexto internamente)

// Componente da página inicial
// SERVER COMPONENT (roda no servidor por padrão)
export default function Home() {
  // Retorna JSX da página
  // JSX COM DADOS PROCESSADOS NO SERVIDOR
  return (
    // Div principal com classes Tailwind para layout responsivo
    // LAYOUT FLEXÍVEL COM ALTURA MÍNIMA DE 100vh
    <div className="min-h-screen flex flex-col">
      {/* Header da aplicação - AGORA USA CONTEXTO INTERNAMENTE */}
      <Header />

      {/* Navegação - AGORA USA CONTEXTO INTERNAMENTE */}
      <Navigation />

      {/* Conteúdo principal da página */}
      <main className="flex-1 container mx-auto py-8">
        {/* Container centralizado com texto alinhado */}
        <div className="text-center">
          {/* Título principal com emoji de dinheiro */}
          <h1 className="text-4xl font-bold mb-8">💰 Minhas Finanças</h1>

          {/* Subtítulo de boas-vindas */}
          <p className="text-xl mb-8">
            Bem-vindo ao seu app de controle financeiro
          </p>

          {/* Links para páginas do app em grid responsivo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Link para Dashboard */}
            <a
              href="/dashboard"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow group"
            >
              {/* Título do card com emoji */}
              <h2 className="text-2xl font-semibold mb-2">📊 Dashboard</h2>

              {/* Descrição do card */}
              <p className="text-gray-600 dark:text-gray-300">
                Visão geral das suas finanças
              </p>

              {/* Setinha que se move no hover */}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </a>

            {/* Link para Transações */}
            <a
              href="/transactions"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow group"
            >
              {/* Título do card com emoji */}
              <h2 className="text-2xl font-semibold mb-2">📋 Transações</h2>

              {/* Descrição do card */}
              <p className="text-gray-600 dark:text-gray-300">
                Gerencie todas as suas transações
              </p>

              {/* Setinha que se move no hover */}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </a>

            {/* Link para Relatórios */}
            <a
              href="/reports"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow group"
            >
              {/* Título do card com emoji */}
              <h2 className="text-2xl font-semibold mb-2">📈 Relatórios</h2>

              {/* Descrição do card */}
              <p className="text-gray-600 dark:text-gray-300">
                Análises e insights financeiros
              </p>

              {/* Setinha que se move no hover */}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
