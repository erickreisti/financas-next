// src/components/DashboardStats.tsx
"use client";

import React from "react";
import { useTransactions } from "@/contexts/TransactionContext";
import { TrendingUp, TrendingDown, Wallet, Target } from "lucide-react";

const DashboardStats = () => {
  const { transactions, calculateTotal } = useTransactions();

  const totalIncome = transactions
    .filter((t) => t.type === "receita")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "despesa")
    .reduce((sum, t) => sum + t.amount, 0);

  const netCashFlow = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (netCashFlow / totalIncome) * 100 : 0;

  const stats = [
    {
      title: "Saldo Total",
      value: calculateTotal(),
      change: "+12.5%",
      trend: "up",
      icon: Wallet,
      color: "primary",
    },
    {
      title: "Receitas",
      value: totalIncome,
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
      color: "success",
    },
    {
      title: "Despesas",
      value: totalExpenses,
      change: "-3.1%",
      trend: "down",
      icon: TrendingDown,
      color: "error",
    },
    {
      title: "Taxa de Economia",
      value: savingsRate,
      change: "+5.3%",
      trend: "up",
      icon: Target,
      color: "purple",
      isPercentage: true,
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={stat.title} className="stat-card fade-in-up">
            <div className="stat-header">
              <div className="stat-icon">
                <Icon className="w-5 h-5" />
              </div>
              <div
                className={`change-badge ${
                  stat.trend === "up" ? "change-positive" : "change-negative"
                }`}
              >
                {stat.change}
              </div>
            </div>

            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p className="stat-value">
                {stat.isPercentage
                  ? formatPercentage(stat.value)
                  : formatCurrency(stat.value)}
              </p>
            </div>

            <div className="stat-progress">
              <div
                className={`progress-bar ${
                  stat.trend === "up"
                    ? "progress-positive"
                    : "progress-negative"
                }`}
                style={{
                  width: `${Math.min((Math.abs(stat.value) / 10000) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
