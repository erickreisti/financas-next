// src/app/transactions/page.tsx
// Diretiva use client - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa React para criar componente
import React, { useState } from "react";

// Importa hooks customizados dos contextos criados
// useTransactions: hook para acessar contexto de transações
import { useTransactions } from "@/contexts/TransactionContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

// Importa componentes da aplicação
// FilterBar: barra de filtros e ordenação
// TransactionList: lista de transações
import FilterBar from "@/components/FilterBar";
import TransactionList from "@/components/TransactionList";

// Interface para dados de transação PARA CRIAÇÃO (sem ID)
// TransactionData = dados que usuário digita (sem ID ainda)
interface TransactionData {
  type: "receita" | "despesa"; // Tipo restrito a essas duas opções apenas
  description: string; // Descrição obrigatória (texto)
  category: string; // Categoria obrigatória (texto)
  amount: number; // Valor numérico (decimal)
  date: string; // Data em formato ISO string
  userId: string; // ID do usuário proprietário (chave estrangeira)
}

// Interface para transação COMPLETA (com ID - do banco)
// Transaction = dados completos (com ID gerado pelo banco)
interface Transaction extends TransactionData {
  id: string; // ID único da transação (CUID do Prisma)
  createdAt: string; // Data de criação (string ISO)
  updatedAt: string; // Data de atualização (string ISO)
}

// Componente TransactionsPage: página com todas transações
// CLIENT COMPONENT por causa dos hooks (use client acima)
export default function TransactionsPage() {
  // Usa hooks dos contextos para acessar dados
  // DESTRUCTURING para acessar funções e dados do contexto de transações
  const { transactions, deleteTransaction } = useTransactions();

  // Estados locais para filtros e ordenação (não precisam estar no contexto)
  // useState COM TIPAGEM EXPLÍCITA
  const [filterType, setFilterType] = useState<string>("todas"); // Filtro por tipo
  const [filterCategory, setFilterCategory] = useState<string>("todas"); // Filtro por categoria
  const [isSorted, setIsSorted] = useState<boolean>(false); // Controle de ordenação

  // Função para alternar ordenação das transações
  // FUNÇÃO PURA PARA ALTERAR ESTADO
  const toggleSort = (): void => {
    // Inverte o valor atual do estado isSorted
    setIsSorted(!isSorted);
  };

  // Função para alterar filtros (tipo ou categoria)
  // FUNÇÃO PURA PARA ALTERAR ESTADOS DE FILTRO
  const handleFilterChange = (filterName: string, value: string): void => {
    // Verifica qual filtro está sendo alterado e atualiza o estado correspondente
    if (filterName === "type") {
      setFilterType(value); // Atualiza filtro de tipo
    } else if (filterName === "category") {
      setFilterCategory(value); // Atualiza filtro de categoria
    }
  };

  // Filtra transações baseado nos filtros selecionados
  // FILTRAGEM DE DADOS COM LÓGICA DE NEGÓCIO
  const filteredTransactions = transactions.filter((transaction) => {
    const typeMatch = filterType === "todas" || transaction.type === filterType;
    const categoryMatch =
      filterCategory === "todas" || transaction.category === filterCategory;
    return typeMatch && categoryMatch;
  });

  // Ordena transações se isSorted for true
  // ORDENAÇÃO DE DADOS COM LÓGICA DE NEGÓCIO
  const sortedTransactions = isSorted
    ? [...filteredTransactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : filteredTransactions;

  // Retorna JSX do componente
  // JSX COM DADOS PROCESSADOS E HOOKS
  return (
    // Div principal com classes Tailwind para layout
    <div className="min-h-screen flex flex-col">
      {/* Header da aplicação - AGORA USA CONTEXTO INTERNAMENTE */}
      <Header />

      {/* Navegação entre páginas */}
      <Navigation />

      {/* Conteúdo principal da página */}
      <main className="flex-1 container mx-auto py-8">
        {/* Título da página */}
        <h1 className="text-3xl font-bold mb-8">📋 Transações</h1>

        {/* Barra de filtros usando componente reutilizável */}
        {/* PASSA TODOS FILTROS E FUNÇÕES DO CONTEXTO */}
        <FilterBar
          filterType={filterType}
          filterCategory={filterCategory}
          onFilterChange={handleFilterChange}
          onSort={toggleSort}
          isSorted={isSorted}
        />

        {/* Contador de transações encontradas */}
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>{sortedTransactions.length}</strong> transações encontradas
          </p>
        </div>

        {/* Lista de transações usando componente reutilizável */}
        {/* PASSA TRANSAÇÕES FILTRADAS/ORDENADAS E FUNÇÃO DELETE DO CONTEXTO */}
        <TransactionList
          transactions={sortedTransactions}
          onDeleteTransaction={deleteTransaction}
        />
      </main>
    </div>
  );
}
