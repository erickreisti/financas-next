// src/components/Saldo.tsx - ATUALIZADO
"use client";

import React from "react";

interface SaldoProps {
  total: number;
}

const Saldo = ({ total }: SaldoProps) => {
  const getSaldoColor = (): string => {
    if (total > 0) return "saldo-positive";
    if (total < 0) return "saldo-negative";
    return "text-gradient";
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getTrend = () => {
    if (total > 0) return { text: "Positivo", class: "trend-positive" };
    if (total < 0) return { text: "Negativo", class: "trend-negative" };
    return { text: "Neutro", class: "" };
  };

  const trend = getTrend();

  return (
    <div className="saldo-section">
      <h2 className="saldo-title">Saldo Total</h2>
      <div className={`saldo-value ${getSaldoColor()}`}>
        {formatCurrency(total)}
      </div>
      <div className={`saldo-trend ${trend.class}`}>
        <span>•</span>
        <span>{trend.text}</span>
      </div>
    </div>
  );
};

export default Saldo;
