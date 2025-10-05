// src/app/transactions/page.tsx
// Diretiva use client - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa React para criar componente
import React from "react";

// Importa hooks dos contextos criados
// ✅ useTransactions para acessar transações e funções
// ✅ useTheme para acessar tema e função toggle
import { useTransactions } from "@/contexts/TransactionContext";
import { useTheme } from "@/contexts/ThemeContext";

// Importa componentes criados
// ✅ FilterBar para filtros e ordenação
// ✅ TransactionList para mostrar transações
import FilterBar from "@/components/FilterBar";
import TransactionList from "@/components/TransactionList";

// Interface para definir o formato das props recebidas
// ✅ CONTRATO EXPLÍCITO DO QUE O COMPONENTE ESPERA RECEBER
interface TransactionsProps {
  filterType: string; // Filtro de tipo atual
  filterCategory: string; // Filtro de categoria atual
  handleFilterChange: (filterName: string, value: string) => void; // Função alterar filtros
  isSorted: boolean; // Estado de ordenação
  toggleSort: () => void; // Função ordenar
}

// Componente TransactionsPage: página com todas transações
// ✅ CLIENT COMPONENT por causa dos hooks (use client acima)
export default function TransactionsPage({
  filterType, // Filtro de tipo atual
  filterCategory, // Filtro de categoria atual
  handleFilterChange, // Função para alterar filtros
  isSorted, // Estado de ordenação
  toggleSort, // Função para alternar ordenação
}: TransactionsProps) {
  // Usa hooks dos contextos para acessar dados
  // ✅ DESTRUCTURING para acessar funções e dados do contexto de transações
  const { transactions, deleteTransaction } = useTransactions();

  // ✅ DESTRUCTURING para acessar funções e dados do contexto de tema
  const { darkMode, toggleDarkMode } = useTheme();

  // Filtra transações baseado nos filtros selecionados
  // ✅ FILTER PARA APLICAR FILTROS DE TIPO E CATEGORIA
  const filteredTransactions = transactions.filter((transaction) => {
    // Verifica se tipo corresponde ao filtro selecionado
    const typeMatch = filterType === "todas" || transaction.type === filterType;
    // Verifica se categoria corresponde ao filtro selecionado
    const categoryMatch =
      filterCategory === "todas" || transaction.category === filterCategory;
    // Retorna true apenas se ambos filtros corresponderem
    return typeMatch && categoryMatch;
  });

  // Ordena transações se isSorted for true
  // ✅ SORT PARA ORDENAÇÃO POR DATA (mais recentes primeiro)
  const sortedTransactions = isSorted
    ? [...filteredTransactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : filteredTransactions;

  // Retorna JSX do componente
  // ✅ JSX COM DADOS PROCESSADOS E HOOKS INTERNOS
  return (
    // Div principal com classes Tailwind para layout
    <div className="min-h-screen flex flex-col">
      {/* Header com contexto de tema - POSICIONADO CORRETAMENTE À DIREITA */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg sticky top-0 z-100 flex justify-between items-center">
        {/* Título da página */}
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📋 Transações
        </h1>

        {/* Botão para alternar modo claro/escuro - POSICIONADO À DIREITA */}
        <button
          type="button" // Tipo de botão explícito (boa prática)
          id="toggle-theme" // ID para estilização
          onClick={toggleDarkMode} // Quando clicado, chama função do contexto
          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 flex items-center justify-center"
          aria-label={
            darkMode ? "Alternar para modo claro" : "Alternar para modo escuro"
          }
        >
          {/* Operador ternário: mostra ícone diferente baseado no modo atual */}
          {darkMode ? "☀️" : "🌙"} {/* Sol se darkMode=true, lua se false */}
        </button>
      </header>

      {/* Navegação entre páginas */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="font-bold text-xl">💰</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {/* Link para Dashboard */}
                <a
                  href="/"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  🏠 Dashboard
                </a>

                {/* Link para Transações (ativo) */}
                <a
                  href="/transactions"
                  className="border-indigo-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  📋 Transações
                </a>

                {/* Link para Relatórios */}
                <a
                  href="/reports"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  📈 Relatórios
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="flex-1 container mx-auto py-8">
        {/* Título da página */}
        <h1 className="text-3xl font-bold mb-8">📋 Transações</h1>

        {/* Barra de filtros */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <FilterBar
            filterType={filterType} // Passa filtro de tipo atual
            filterCategory={filterCategory} // Passa filtro de categoria atual
            onFilterChange={handleFilterChange} // Passa função alterar filtros
            onSort={toggleSort} // Passa função ordenar
            isSorted={isSorted} // Passa estado de ordenação
          />

          {/* Contador de transações encontradas */}
          <div style={{ marginTop: "20px" }}>
            <p>
              <strong>{sortedTransactions.length}</strong> transações
              encontradas
            </p>
          </div>
        </div>

        {/* Lista de transações */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <TransactionList
            transactions={sortedTransactions} // Passa transações filtradas/ordenadas
            onDeleteTransaction={deleteTransaction} // Passa função deletar transação
          />
        </div>
      </main>
    </div>
  );
}
