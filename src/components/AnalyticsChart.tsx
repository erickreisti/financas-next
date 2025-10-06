// src/components/AnalyticsChart.tsx
"use client";

import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Transaction } from "@/contexts/TransactionContext";
import { TrendingUp, BarChart3, Calendar } from "lucide-react";

interface AnalyticsChartProps {
  timeRange: "7d" | "30d" | "90d" | "1y";
  transactions: Transaction[];
  showTrends?: boolean;
}

export default function AnalyticsChart({
  timeRange,
  transactions,
  showTrends = false,
}: AnalyticsChartProps) {
  // Processa os dados para o gráfico
  const chartData = useMemo(() => {
    const now = new Date();
    const data: any[] = [];

    // Define o número de pontos baseado no timeRange
    let points = 7;
    if (timeRange === "30d") points = 30;
    if (timeRange === "90d") points = 12; // Semanas
    if (timeRange === "1y") points = 12; // Meses

    for (let i = points - 1; i >= 0; i--) {
      const date = new Date();

      if (timeRange === "7d" || timeRange === "30d") {
        date.setDate(now.getDate() - i);
        const dateKey = date.toISOString().split("T")[0];

        const dayTransactions = transactions.filter(
          (t) => t.date.toISOString().split("T")[0] === dateKey
        );

        const income = dayTransactions
          .filter((t) => t.type === "receita")
          .reduce((sum, t) => sum + t.amount, 0);

        const expenses = dayTransactions
          .filter((t) => t.type === "despesa")
          .reduce((sum, t) => sum + t.amount, 0);

        data.push({
          name: date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
          }),
          date: dateKey,
          Receitas: income,
          Despesas: expenses,
          Saldo: income - expenses,
        });
      } else {
        // Para períodos maiores, agrupa por semana/mês
        if (timeRange === "90d") {
          date.setDate(now.getDate() - i * 7);
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - 6);

          const weekTransactions = transactions.filter((t) => {
            const transDate = new Date(t.date);
            return transDate >= weekStart && transDate <= date;
          });

          const income = weekTransactions
            .filter((t) => t.type === "receita")
            .reduce((sum, t) => sum + t.amount, 0);

          const expenses = weekTransactions
            .filter((t) => t.type === "despesa")
            .reduce((sum, t) => sum + t.amount, 0);

          data.push({
            name: `Sem ${i + 1}`,
            Receitas: income,
            Despesas: expenses,
            Saldo: income - expenses,
          });
        } else if (timeRange === "1y") {
          date.setMonth(now.getMonth() - i);
          const month = date.toLocaleDateString("pt-BR", { month: "short" });

          const monthTransactions = transactions.filter((t) => {
            const transDate = new Date(t.date);
            return (
              transDate.getMonth() === date.getMonth() &&
              transDate.getFullYear() === date.getFullYear()
            );
          });

          const income = monthTransactions
            .filter((t) => t.type === "receita")
            .reduce((sum, t) => sum + t.amount, 0);

          const expenses = monthTransactions
            .filter((t) => t.type === "despesa")
            .reduce((sum, t) => sum + t.amount, 0);

          data.push({
            name: month,
            Receitas: income,
            Despesas: expenses,
            Saldo: income - expenses,
          });
        }
      }
    }

    return data;
  }, [transactions, timeRange]);

  const totalIncome = transactions
    .filter((t) => t.type === "receita")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "despesa")
    .reduce((sum, t) => sum + t.amount, 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="card-title">
            {showTrends ? (
              <>
                <TrendingUp className="w-5 h-5" /> Tendências Financeiras
              </>
            ) : (
              <>
                <BarChart3 className="w-5 h-5" /> Visão Geral
              </>
            )}
          </h3>
          <p className="text-gray-600 text-sm">
            Período:{" "}
            {timeRange === "7d"
              ? "7 dias"
              : timeRange === "30d"
                ? "30 dias"
                : timeRange === "90d"
                  ? "90 dias"
                  : "1 ano"}
          </p>
        </div>

        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <p className="text-gray-600">Receitas</p>
            <p className="text-green-600 font-semibold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalIncome)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Despesas</p>
            <p className="text-red-600 font-semibold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalExpenses)}
            </p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {showTrends ? (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  notation: "compact",
                }).format(value)
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="Receitas"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="Despesas"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="Saldo"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </AreaChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  notation: "compact",
                }).format(value)
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="Receitas"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="Despesas"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        )}
      </ResponsiveContainer>

      {chartData.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <Calendar className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">Nenhum dado disponível</p>
          <p className="text-sm">Não há transações no período selecionado</p>
        </div>
      )}
    </div>
  );
}
