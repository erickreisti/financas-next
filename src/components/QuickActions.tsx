// src/components/QuickActions.tsx - CORRIGIDO
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, Upload, Download, Target, Filter } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: "Nova Transação",
      description: "Adicionar receita ou despesa",
      color: "primary",
      onClick: () => console.log("Nova transação"),
    },
    {
      icon: Upload,
      label: "Importar",
      description: "Importar extrato bancário",
      color: "success",
      onClick: () => console.log("Importar"),
    },
    {
      icon: Download,
      label: "Exportar",
      description: "Exportar relatório PDF",
      color: "info",
      onClick: () => console.log("Exportar"),
    },
    {
      icon: Target,
      label: "Nova Meta",
      description: "Definir objetivo financeiro",
      color: "warning",
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

  return (
    <div className="card">
      <h3 className="card-title">⚡ Ações Rápidas</h3>

      <div className="actions-grid">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              onClick={action.onClick}
              className="action-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="action-icon">
                <Icon className="w-5 h-5" />
              </div>

              <div className="action-content">
                <span className="action-label">{action.label}</span>
                <span className="action-description">{action.description}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
