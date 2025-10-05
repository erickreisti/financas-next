// src/app/dashboard/page.tsx - PROFISSIONAL
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="professional-layout">
      <Header />

      <div className="layout-content">
        <Sidebar />

        <main className="main-content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
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
                <DashboardStats />

                {/* Gráfico Financeiro */}
                <FinancialChart />

                {/* Transações Recentes */}
                <RecentTransactions />
              </div>

              {/* Coluna Direita */}
              <div className="sidebar-column">
                {/* Ações Rápidas */}
                <QuickActions />

                {/* Visão Geral do Orçamento */}
                <BudgetOverview />

                {/* Metas */}
                <div className="goals-card">
                  <h3 className="card-title">Metas Financeiras</h3>
                  <div className="goals-list">
                    <div className="goal-item">
                      <div className="goal-info">
                        <span className="goal-name">Reserva de Emergência</span>
                        <span className="goal-progress">
                          R$ 8.500 / R$ 15.000
                        </span>
                      </div>
                      <div className="goal-bar">
                        <div
                          className="goal-progress-bar"
                          style={{ width: "56%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="goal-item">
                      <div className="goal-info">
                        <span className="goal-name">Viagem Internacional</span>
                        <span className="goal-progress">
                          R$ 3.200 / R$ 10.000
                        </span>
                      </div>
                      <div className="goal-bar">
                        <div
                          className="goal-progress-bar"
                          style={{ width: "32%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
