// src/components/TransactionList.tsx - Com ícones melhores
"use client";

import React from "react";
import { Trash2, TrendingUp, TrendingDown, Calendar, Tag } from "lucide-react";

interface Transaction {
  id: string;
  type: "receita" | "despesa";
  description: string;
  category: string;
  amount: number;
  date: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionList = ({
  transactions,
  onDeleteTransaction,
}: TransactionListProps) => {
  const categoryNames: { [key: string]: string } = {
    salario: "Salário",
    alimentacao: "Alimentação",
    transporte: "Transporte",
    lazer: "Lazer",
    saude: "Saúde",
    educacao: "Educação",
    outros: "Outros",
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <ul className="space-y-3">
      {transactions.length === 0 ? (
        <li className="text-center py-8 text-gray-500 dark:text-gray-400">
          Nenhuma transação encontrada
        </li>
      ) : (
        transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-4 p-4 transition-all hover:shadow-md ${
              transaction.type === "receita"
                ? "border-green-500"
                : "border-red-500"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {transaction.type === "receita" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <strong className="text-gray-900 dark:text-white">
                    {transaction.description}
                  </strong>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(transaction.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                      {categoryNames[transaction.category] ||
                        transaction.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-lg font-bold ${
                    transaction.type === "receita"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {transaction.type === "receita" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </span>

                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  aria-label="Deletar transação"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default TransactionList;
