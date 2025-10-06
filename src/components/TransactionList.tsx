// src/components/TransactionList.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Tag,
  MoreVertical,
  Trash2,
  Edit3,
} from "lucide-react";

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
  onEditTransaction?: (id: string) => void;
}

const TransactionList = ({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}: TransactionListProps) => {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

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
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
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

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h3 className="transactions-title">Todas as Transações</h3>
        <div className="transactions-summary">
          <span className="summary-text">
            {transactions.length} transações encontradas
          </span>
        </div>
      </div>

      <AnimatePresence>
        {transactions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="empty-transactions text-center py-16"
          >
            <div className="text-6xl mb-4">💸</div>
            <div className="empty-content">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Nenhuma transação
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Adicione sua primeira transação para começar a controlar suas
                finanças
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="transactions-grid">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`transaction-card ${
                  transaction.type === "receita"
                    ? "transaction-income"
                    : "transaction-expense"
                }`}
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
                      <h4 className="transaction-description">
                        {transaction.description}
                      </h4>
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
                        <div className="meta-item">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(transaction.date)}</span>
                        </div>
                        <div className="meta-item">
                          <Tag className="w-3 h-3" />
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
                </div>

                <div className="transaction-actions">
                  <div className="actions-menu">
                    <button
                      onClick={() => toggleMenu(transaction.id)}
                      className="menu-trigger"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {activeMenu === transaction.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="menu-dropdown"
                        >
                          <button
                            onClick={() => {
                              onEditTransaction?.(transaction.id);
                              setActiveMenu(null);
                            }}
                            className="menu-item edit-item"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={() => {
                              onDeleteTransaction(transaction.id);
                              setActiveMenu(null);
                            }}
                            className="menu-item delete-item"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Excluir</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionList;
