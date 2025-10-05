// src/app/dashboard/page.tsx
// Diretiva use client - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa React para criar componente
import React from "react";

// Importa hooks customizados dos contextos criados
// ✅ useTransactions para acessar transações e funções
// ✅ useTheme para acessar tema e função toggle
import { useTransactions } from "@/contexts/TransactionContext";
import { useTheme } from "@/contexts/ThemeContext";

// Importa componentes da aplicação
// ✅ Header sem props (usa contexto internamente)
// ✅ Navigation sem props (usa contexto internamente)
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Saldo from "@/components/Saldo";
import TransactionList from "@/components/TransactionList";
import TransactionForm from "@/components/TransactionForm";

// Componente DashboardPage: página principal com visão geral
// ✅ CLIENT COMPONENT por causa dos hooks (use client acima)
export default function DashboardPage() {
  // Usa hooks dos contextos para acessar dados
  // ✅ DESTRUCTURING para acessar funções e dados do contexto de transações
  const { transactions, addTransaction, deleteTransaction, calculateTotal } =
    useTransactions();

  // ✅ DESTRUCTURING para acessar funções e dados do contexto de tema
  const { darkMode, toggleDarkMode } = useTheme();

  // Filtra apenas as últimas 5 transações (slice(-5) pega os últimos 5 itens)
  // ✅ FILTRAGEM DE DADOS COM LÓGICA DE NEGÓCIO
  const recentTransactions = transactions.slice(-5);

  // Retorna JSX do componente
  // ✅ JSX COM DADOS PROCESSADOS E HOOKS
  return (
    // Div principal com classes Tailwind para layout
    <div className="min-h-screen flex flex-col">
      {/* Header da aplicação - AGORA USA CONTEXTO INTERNAMENTE */}
      {/* ✅ REMOVIDO PROPS: Header usa useTheme diretamente */}
      <Header />

      {/* Navegação entre páginas */}
      <Navigation />

      {/* Conteúdo principal da página */}
      <main className="flex-1 container mx-auto py-8">
        {/* Título da página */}
        <h1 className="text-3xl font-bold mb-8">📊 Dashboard</h1>

        {/* Componente Saldo usando função do contexto para calcular total */}
        {/* ✅ PASSA TOTAL CALCULADO PELO CONTEXTO */}
        <Saldo total={calculateTotal()} />

        {/* Seção de últimas transações */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          {/* Subtítulo da seção */}
          <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>

          {/* Lista de transações recentes usando componente reutilizável */}
          {/* ✅ PASSA TRANSAÇÕES FILTRADAS E FUNÇÃO DELETE DO CONTEXTO */}
          {/* AGORA DELETE TRANSACTION RECEBE STRING (CUID) */}
          <TransactionList
            transactions={recentTransactions}
            onDeleteTransaction={deleteTransaction} // ✅ AGORA RECEBE STRING
          />
        </div>

        {/* Seção para adicionar nova transação */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {/* Subtítulo da seção */}
          <h2 className="text-xl font-semibold mb-4">
            Adicionar Nova Transação
          </h2>

          {/* Formulário para adicionar transação usando componente reutilizável */}
          {/* ✅ CORREÇÃO: PASSA FUNÇÃO addTransaction DO CONTEXTO */}
          {/* TransactionForm espera TransactionData (sem ID) */}
          <TransactionForm
            userId="user-test-id" // ✅ ID de teste (em produção virá da autenticação)
            onAddTransaction={addTransaction} // ✅ FUNÇÃO DO CONTEXTO (recebe TransactionData)
          />
        </div>
      </main>
    </div>
  );
}
