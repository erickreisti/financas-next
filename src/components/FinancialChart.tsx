// src/components/FinancialChart.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const FinancialChart = () => {
  // Dados mockados para o gráfico
  const chartData = [
    { month: "Jan", income: 4500, expenses: 3200 },
    { month: "Fev", income: 5200, expenses: 3800 },
    { month: "Mar", income: 4800, expenses: 3500 },
    { month: "Abr", income: 6100, expenses: 4200 },
    { month: "Mai", income: 5800, expenses: 3900 },
    { month: "Jun", income: 5300, expenses: 3600 },
  ];

  const maxValue = Math.max(
    ...chartData.map((d) => Math.max(d.income, d.expenses))
  );
  const chartHeight = 200;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📈 Fluxo Financeiro Mensal</h3>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color income-color"></div>
            <span>Receitas</span>
          </div>
          <div className="legend-item">
            <div className="legend-color expense-color"></div>
            <span>Despesas</span>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-bars">
          {chartData.map((data, index) => (
            <div key={data.month} className="chart-column">
              <div className="bars-container">
                {/* Barra de Receitas */}
                <motion.div
                  className="bar income-bar"
                  initial={{ height: 0 }}
                  animate={{
                    height: (data.income / maxValue) * chartHeight,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.8,
                    type: "spring",
                  }}
                />

                {/* Barra de Despesas */}
                <motion.div
                  className="bar expense-bar"
                  initial={{ height: 0 }}
                  animate={{
                    height: (data.expenses / maxValue) * chartHeight,
                  }}
                  transition={{
                    delay: index * 0.1 + 0.2,
                    duration: 0.8,
                    type: "spring",
                  }}
                />
              </div>
              <span className="chart-label">{data.month}</span>
            </div>
          ))}
        </div>

        {/* Eixo Y */}
        <div className="chart-y-axis">
          {[0, 2500, 5000, 7500].map((value) => (
            <div key={value} className="y-tick">
              <span className="tick-label">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 0,
                }).format(value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-footer">
        <div className="chart-summary">
          <div className="summary-item">
            <span className="summary-label">Maior Receita:</span>
            <span className="summary-value">R$ 6.100</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Menor Despesa:</span>
            <span className="summary-value">R$ 3.200</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialChart;
