// src/components/QuickActions.tsx
"use client";

import React from "react";
import { Plus, Upload, Download, Target, Filter } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: "Nova Transação",
      description: "Adicionar receita ou despesa",
      color: "blue",
      onClick: () => console.log("Nova transação"),
    },
    {
      icon: Upload,
      label: "Importar",
      description: "Importar extrato bancário",
      color: "green",
      onClick: () => console.log("Importar"),
    },
    {
      icon: Download,
      label: "Exportar",
      description: "Exportar relatório PDF",
      color: "purple",
      onClick: () => console.log("Exportar"),
    },
    {
      icon: Target,
      label: "Nova Meta",
      description: "Definir objetivo financeiro",
      color: "orange",
      onClick: () => console.log("Nova meta"),
    },
    {
      icon: Filter,
      label: "Filtrar",
      description: "Filtrar transações",
      color: "gray",
      onClick: () => console.log("Filtrar"),
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      green:
        "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      purple:
        "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
      orange:
        "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
      gray: "bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="quick-actions-card">
      <h3 className="card-title">Ações Rápidas</h3>

      <div className="actions-grid">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={action.onClick}
              className="action-button"
            >
              <div className={`action-icon ${getColorClasses(action.color)}`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="action-content">
                <span className="action-label">{action.label}</span>
                <span className="action-description">{action.description}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
