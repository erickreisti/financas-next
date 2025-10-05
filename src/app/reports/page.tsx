// src/app/reports/page.tsx
// Diretiva use client - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa React para criar componente
import React from "react";

// Importa hooks dos contextos criados
// useTransactions para acessar transações e funções
import { useTransactions } from "@/contexts/TransactionContext";

// Importa componentes reutilizáveis
// Header: cabeçalho da aplicação (usa contexto internamente)
// Navigation: navegação entre páginas (usa contexto internamente)
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

// Componente ReportsPage: página com relatórios e análises financeiras
// CLIENT COMPONENT por causa dos hooks (use client acima)
export default function ReportsPage() {
  // Usa hooks dos contextos para acessar dados
  // DESTRUCTURING para acessar funções e dados do contexto de transações
  const { transactions } = useTransactions();

  // Objeto para mapear chaves de categoria para nomes amigáveis
  // MAPEAMENTO DE CATEGORIAS PARA NOMES LEGÍVEIS
  const categoryNames: { [key: string]: string } = {
    salario: "Salário",
    alimentacao: "Alimentação",
    transporte: "Transporte",
    lazer: "Lazer",
    saude: "Saúde",
    educacao: "Educação",
    outros: "Outros",
  };

  // Calcula totais por categoria usando reduce
  // REDUCE PARA AGREGAÇÃO DE DADOS POR CATEGORIA
  const categoryTotals: { [key: string]: number } = {};
  transactions.forEach((transaction) => {
    // Inicializa categoria se não existir
    // INICIALIZAÇÃO DE CATEGORIA NO OBJETO
    if (!categoryTotals[transaction.category]) {
      categoryTotals[transaction.category] = 0;
    }

    // Soma ou subtrai valor baseado no tipo
    // LÓGICA DE NEGÓCIO PARA CÁLCULO DE SALDO POR CATEGORIA
    if (transaction.type === "receita") {
      categoryTotals[transaction.category] += transaction.amount;
    } else {
      categoryTotals[transaction.category] -= transaction.amount;
    }
  });

  // Calcula totais de receitas (soma de todas receitas)
  // FILTER + REDUCE PARA CÁLCULO DE TOTAL DE RECEITAS
  const totalReceitas = transactions
    .filter((t) => t.type === "receita") // Filtra só receitas
    .reduce((sum, t) => sum + t.amount, 0); // Soma valores

  // Calcula totais de despesas (soma de todas despesas)
  // FILTER + REDUCE PARA CÁLCULO DE TOTAL DE DESPESAS
  const totalDespesas = transactions
    .filter((t) => t.type === "despesa") // Filtra só despesas
    .reduce((sum, t) => sum + t.amount, 0); // Soma valores

  // Calcula saldo final (receitas - despesas)
  // CÁLCULO DE SALDO FINAL COM TRATAMENTO DE NULL
  const saldoFinal = (totalReceitas || 0) - (totalDespesas || 0);

  // Retorna JSX do componente
  // JSX COM DADOS PROCESSADOS E HOOKS INTERNOS
  return (
    // Div principal com classes Tailwind para layout
    <div className="min-h-screen flex flex-col">
      {/* Usa componente Header reutilizável */}
      <Header />

      {/* Usa componente Navigation reutilizável */}
      <Navigation />

      {/* Conteúdo principal */}
      <main className="flex-1 container mx-auto py-8">
        {/* Título da página */}
        <h1 className="text-3xl font-bold mb-8">📈 Relatórios</h1>

        {/* Grid com cards de resumo financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card de receitas totais */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Receitas Totais</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              R$ {(totalReceitas || 0).toFixed(2).replace(".", ",")}
            </p>
          </div>

          {/* Card de despesas totais */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Despesas Totais</h3>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              R$ {(totalDespesas || 0).toFixed(2).replace(".", ",")}
            </p>
          </div>

          {/* Card de saldo final */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Saldo Final</h3>
            <p
              className={`text-2xl font-bold ${
                saldoFinal >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              R$ {saldoFinal.toFixed(2).replace(".", ",")}
            </p>
          </div>
        </div>

        {/* Seção de análise por categoria */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Por Categoria</h2>

          {/* Grid com cards de cada categoria */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Mapeia objeto de totais por categoria para elementos JSX */}
            {Object.entries(categoryTotals).map(([category, total]) => (
              // Cada card de categoria
              <div
                key={category}
                className={`p-4 rounded-lg border-l-4 ${
                  total >= 0
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-red-500 bg-red-50 dark:bg-red-900/20"
                }`}
              >
                {/* Nome amigável da categoria */}
                <h4 className="font-semibold mb-2">
                  {categoryNames[category] || category}
                </h4>

                {/* Valor total da categoria com cor dinâmica */}
                <div
                  className={`text-lg font-bold ${
                    total >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  R$ {total.toFixed(2).replace(".", ",")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
