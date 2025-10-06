// src/components/RecentTransactions.tsx
"use client";

import React from "react";
import { useTransactions } from "@/contexts/TransactionContext";
import { TrendingUp, TrendingDown, MoreVertical } from "lucide-react";

const RecentTransactions = () => {
  const { transactions } = useTransactions();

  const recentTransactions = transactions
    .slice(-6)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      salario:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      alimentacao:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      transporte:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      lazer:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      saude: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      educacao:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      outros:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    };
    return colors[category] || colors.outros;
  };

  const categoryNames: { [key: string]: string } = {
    salario: "Salário",
    alimentacao: "Alimentação",
    transporte: "Transporte",
    lazer: "Lazer",
    saude: "Saúde",
    educacao: "Educação",
    outros: "Outros",
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📊 Transações Recentes</h3>
        <button className="btn btn-secondary">Ver todas</button>
      </div>

      <div className="transactions-grid">
        {recentTransactions.length === 0 ? (
          <div className="empty-state text-center py-12">
            <div className="text-4xl mb-4">💸</div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Nenhuma transação encontrada
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Adicione sua primeira transação para começar
            </p>
          </div>
        ) : (
          recentTransactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`transaction-card ${transaction.type === "receita" ? "transaction-income" : "transaction-expense"}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="transaction-main">
                <div className="transaction-icon">
                  {transaction.type === "receita" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                </div>

                <div className="transaction-content">
                  <div className="transaction-header">
                    <span className="transaction-description">
                      {transaction.description}
                    </span>
                    <span
                      className={`transaction-amount ${
                        transaction.type === "receita"
                          ? "amount-income"
                          : "amount-expense"
                      }`}
                    >
                      {transaction.type === "receita" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>

                  <div className="transaction-details">
                    <div className="transaction-meta">
                      <span className="meta-item">
                        {formatDate(transaction.date)}
                      </span>
                      <span
                        className={`category-tag ${getCategoryColor(transaction.category)}`}
                      >
                        {categoryNames[transaction.category] ||
                          transaction.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="transaction-menu">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
