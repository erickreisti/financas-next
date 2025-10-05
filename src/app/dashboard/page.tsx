// src/app/dashboard/page.tsx
"use client";

import React from "react";
import { useTransactions } from "@/contexts/TransactionContext";
import { useTheme } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Saldo from "@/components/Saldo";
import TransactionList from "@/components/TransactionList";
import TransactionForm from "@/components/TransactionForm";

// Interface para dados do formulário (date como string)
interface TransactionFormData {
  type: "receita" | "despesa";
  description: string;
  category: string;
  amount: number;
  date: string; //  String do input HTML
  userId: string;
}

// Interface para transação completa (date como Date)
interface Transaction {
  id: string;
  type: "receita" | "despesa";
  description: string;
  category: string;
  amount: number;
  date: Date; // Date do banco de dados
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function DashboardPage() {
  const { transactions, addTransaction, deleteTransaction, calculateTotal } =
    useTransactions();
  const { darkMode, toggleDarkMode } = useTheme();

  const recentTransactions = transactions.slice(-5);

  // Função que converte TransactionFormData → Transaction
  const handleAddTransaction = async (
    formData: TransactionFormData // Recebe dados do formulário
  ): Promise<void> => {
    try {
      // Converte string para Date antes de criar a transação completa
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        ...formData,
        date: new Date(formData.date), // CONVERSÃO string → Date
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addTransaction(newTransaction);
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />

      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">📊 Dashboard</h1>

        <Saldo total={calculateTotal()} />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
          <TransactionList
            transactions={recentTransactions}
            onDeleteTransaction={deleteTransaction}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Adicionar Nova Transação
          </h2>

          {/* TransactionForm envia TransactionFormData (date como string) */}
          <TransactionForm
            userId="user-test-id"
            onAddTransaction={handleAddTransaction} // Recebe TransactionFormData
          />
        </div>
      </main>
    </div>
  );
}
