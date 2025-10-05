// src/components/BudgetOverview.tsx
"use client";

import React from "react";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const BudgetOverview = () => {
  const budgets = [
    {
      category: "Alimentação",
      spent: 850,
      limit: 1200,
      trend: "up",
    },
    {
      category: "Transporte",
      spent: 420,
      limit: 600,
      trend: "down",
    },
    {
      category: "Lazer",
      spent: 300,
      limit: 400,
      trend: "stable",
    },
    {
      category: "Saúde",
      spent: 180,
      limit: 300,
      trend: "stable",
    },
  ];

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-orange-500";
    return "bg-green-500";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const getStatus = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return "warning";
    if (percentage >= 75) return "attention";
    return "good";
  };

  return (
    <div className="budget-card">
      <div className="card-header">
        <h3 className="card-title">Visão do Orçamento</h3>
        <span className="budget-period">Mensal</span>
      </div>

      <div className="budgets-list">
        {budgets.map((budget, index) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const status = getStatus(budget.spent, budget.limit);

          return (
            <div key={budget.category} className="budget-item">
              <div className="budget-header">
                <span className="budget-category">{budget.category}</span>
                <div className="budget-trend">{getTrendIcon(budget.trend)}</div>
              </div>

              <div className="budget-amounts">
                <span className="budget-spent">
                  R$ {budget.spent.toFixed(2)}
                </span>
                <span className="budget-limit">
                  / R$ {budget.limit.toFixed(2)}
                </span>
              </div>

              <div className="budget-progress">
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${getProgressColor(percentage)}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                <span className="progress-percentage">
                  {percentage.toFixed(0)}%
                </span>
              </div>

              {status === "warning" && (
                <div className="budget-alert">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Próximo do limite</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="budget-footer">
        <div className="budget-summary">
          <div className="summary-item">
            <span className="summary-label">Total Gasto:</span>
            <span className="summary-value">R$ 1.750,00</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Limite Total:</span>
            <span className="summary-value">R$ 2.500,00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
