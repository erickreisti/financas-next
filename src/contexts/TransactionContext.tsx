// src/contexts/TransactionContext.tsx
// ✅ DIRETIVA USE CLIENT - marca arquivo como Client Component
// Isso é OBRIGATÓRIO para arquivos que usam React Hooks no App Router
"use client";

// Importa React e hooks necessários para criar contexto
import React, { createContext, useContext, useState, useEffect } from "react";

// Importa cliente Prisma para operações de banco de dados
import { prisma } from "@/lib/prisma";

// Interface para definir a estrutura de uma transação financeira
interface Transaction {
  id: number;
  type: "receita" | "despesa";
  description: string;
  category: string;
  amount: number;
  date: string;
  userId: string;
}

// Interface para definir o que o contexto de transações vai fornecer
interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: number) => void;
  calculateTotal: () => number;
}

// Cria o contexto com valor inicial undefined
const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

// Componente Provider: fornece os dados do contexto para toda árvore de componentes
export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado local para armazenar todas as transações
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // useEffect: carrega transações do localStorage quando componente monta
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // useEffect: salva transações no localStorage quando elas mudam
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Função para adicionar nova transação ao estado
  const addTransaction = (transaction: Transaction): void => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  // Função para deletar transação pelo ID
  const deleteTransaction = (id: number): void => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  // Função para calcular saldo total (receitas - despesas)
  const calculateTotal = (): number => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === "receita"
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0);
  };

  // Objeto com todos os valores que o contexto de transações vai fornecer
  const contextValue: TransactionContextType = {
    transactions,
    addTransaction,
    deleteTransaction,
    calculateTotal,
  };

  // Retorna JSX do componente Provider
  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};

// Hook customizado para usar o contexto de transações
export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);

  // Verifica se o hook está sendo usado dentro de um Provider
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }

  // Retorna o contexto se estiver tudo certo
  return context;
};
