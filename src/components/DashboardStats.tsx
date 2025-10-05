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
      color: "blue",
    },
    {
      title: "Receitas",
      value: totalIncome,
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: "Despesas",
      value: totalExpenses,
      change: "-3.1%",
      trend: "down",
      icon: TrendingDown,
      color: "red",
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

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      green:
        "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      red: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
      purple:
        "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={stat.title} className="stat-card">
            <div className="stat-header">
              <div className={`stat-icon ${getColorClasses(stat.color)}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div
                className={`change-badge ${stat.trend === "up" ? "change-positive" : "change-negative"}`}
              >
                {stat.change}
              </div>
            </div>

            <div className="stat-content">
              <h3 className="stat-title">{stat.title}</h3>
              <p className="stat-value">
                {stat.isPercentage
                  ? formatPercentage(stat.value)
                  : formatCurrency(stat.value)}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="stat-progress">
              <div
                className={`progress-bar ${stat.trend === "up" ? "progress-positive" : "progress-negative"}`}
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
