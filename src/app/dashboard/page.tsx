// src/app/dashboard/page.tsx - Atualizado
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTransactions } from "@/contexts/TransactionContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Saldo from "@/components/Saldo";
import TransactionList from "@/components/TransactionList";
import TransactionForm from "@/components/TransactionForm";
import {
  AnimatedCard,
  SlideIn,
  StaggerList,
  StaggerItem,
} from "@/components/AnimatedCard";

export default function DashboardPage() {
  const { transactions, addTransaction, deleteTransaction, calculateTotal } =
    useTransactions();

  const recentTransactions = transactions.slice(-5);

  const handleAddTransaction = async (formData: any): Promise<void> => {
    try {
      await addTransaction(formData);
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col"
    >
      <Header />
      <Navigation />

      <main className="flex-1 container mx-auto py-8">
        <SlideIn direction="down">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        </SlideIn>

        {/* Saldo com animação */}
        <AnimatedCard delay={0.1}>
          <Saldo total={calculateTotal()} />
        </AnimatedCard>

        {/* Últimas transações com animação em lista */}
        <AnimatedCard
          delay={0.2}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
          <AnimatePresence>
            {recentTransactions.length > 0 ? (
              <StaggerList>
                <TransactionList
                  transactions={recentTransactions}
                  onDeleteTransaction={deleteTransaction}
                />
              </StaggerList>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 text-center py-8"
              >
                Nenhuma transação encontrada
              </motion.p>
            )}
          </AnimatePresence>
        </AnimatedCard>

        {/* Formulário com animação */}
        <AnimatedCard
          delay={0.3}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <motion.h2
            className="text-xl font-semibold mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Adicionar Nova Transação
          </motion.h2>
          <TransactionForm
            userId="user-test-id"
            onAddTransaction={handleAddTransaction}
          />
        </AnimatedCard>
      </main>
    </motion.div>
  );
}
