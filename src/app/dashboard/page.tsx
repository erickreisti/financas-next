// src/app/dashboard/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTransactions } from "@/contexts/TransactionContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import DashboardStats from "@/components/DashboardStats";
import RecentTransactions from "@/components/RecentTransactions";
import FinancialChart from "@/components/FinancialChart";
import QuickActions from "@/components/QuickActions";
import BudgetOverview from "@/components/BudgetOverview";

export default function DashboardPage() {
  const { transactions, calculateTotal } = useTransactions();

  return (
    <div className="professional-layout">
      <Header />

      <div className="layout-content">
        <Sidebar />

        <main className="main-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="dashboard-container"
          >
            {/* Cabeçalho do Dashboard */}
            <div className="dashboard-header">
              <div className="welcome-section">
                <h1 className="welcome-title">Bem-vindo de volta! 👋</h1>
                <p className="welcome-subtitle">
                  Aqui está o resumo das suas finanças hoje
                </p>
              </div>
              <div className="date-section">
                <span className="current-date">
                  {new Date().toLocaleDateString("pt-BR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Grid de Conteúdo */}
            <div className="dashboard-grid">
              {/* Coluna Esquerda */}
              <div className="dashboard-column">
                {/* Estatísticas Rápidas */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <DashboardStats />
                </motion.div>

                {/* Gráfico Financeiro */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FinancialChart />
                </motion.div>

                {/* Transações Recentes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <RecentTransactions />
                </motion.div>
              </div>

              {/* Coluna Direita */}
              <div className="sidebar-column">
                {/* Ações Rápidas */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <QuickActions />
                </motion.div>

                {/* Visão Geral do Orçamento */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <BudgetOverview />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
