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
    <div className="transactions-card">
      <div className="card-header">
        <h3 className="card-title">Transações Recentes</h3>
        <button className="view-all-btn">Ver todas</button>
      </div>

      <div className="transactions-list">
        {recentTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💸</div>
            <p className="empty-text">Nenhuma transação encontrada</p>
            <p className="empty-description">
              Adicione sua primeira transação para começar
            </p>
          </div>
        ) : (
          recentTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-row">
              <div className="transaction-icon">
                {transaction.type === "receita" ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
              </div>

              <div className="transaction-info">
                <div className="transaction-main">
                  <span className="transaction-description">
                    {transaction.description}
                  </span>
                  <span
                    className={`transaction-amount ${transaction.type === "receita" ? "amount-income" : "amount-expense"}`}
                  >
                    {transaction.type === "receita" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>

                <div className="transaction-meta">
                  <span className="transaction-date">
                    {formatDate(transaction.date)}
                  </span>
                  <span
                    className={`transaction-category ${getCategoryColor(transaction.category)}`}
                  >
                    {categoryNames[transaction.category] ||
                      transaction.category}
                  </span>
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
