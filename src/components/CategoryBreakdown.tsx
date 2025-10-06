// src/components/CategoryBreakdown.tsx
"use client";

import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { PieChart as PieIcon, BarChart3, List } from "lucide-react";

interface CategoryData {
  income: number;
  expenses: number;
  count: number;
}

interface CategoryBreakdownProps {
  data: Record<string, CategoryData>;
  detailed?: boolean;
  timeRange?: string;
}

// Interface compatível com Recharts
interface ChartData {
  name: string;
  value: number;
  count: number;
  percentage: number;
  [key: string]: string | number; // Para compatibilidade com Recharts
}

type ViewMode = "pie" | "bar" | "list";

export default function CategoryBreakdown({
  data,
  detailed = false,
  timeRange = "30d",
}: CategoryBreakdownProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("pie");
  const [dataType, setDataType] = useState<"income" | "expenses">("expenses");

  // Processa dados para gráfico de receitas
  const incomeData = useMemo((): ChartData[] => {
    const totalIncome = Object.values(data).reduce(
      (sum, cd) => sum + cd.income,
      0
    );

    return Object.entries(data)
      .filter(([_, categoryData]) => categoryData.income > 0)
      .map(([category, categoryData]) => ({
        name: category,
        value: categoryData.income,
        count: categoryData.count,
        percentage:
          totalIncome > 0 ? (categoryData.income / totalIncome) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  // Processa dados para gráfico de despesas
  const expensesData = useMemo((): ChartData[] => {
    const totalExpenses = Object.values(data).reduce(
      (sum, cd) => sum + cd.expenses,
      0
    );

    return Object.entries(data)
      .filter(([_, categoryData]) => categoryData.expenses > 0)
      .map(([category, categoryData]) => ({
        name: category,
        value: categoryData.expenses,
        count: categoryData.count,
        percentage:
          totalExpenses > 0 ? (categoryData.expenses / totalExpenses) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  const currentData = dataType === "income" ? incomeData : expensesData;
  const totalValue = currentData.reduce((sum, item) => sum + item.value, 0);

  // Cores para o gráfico
  const COLORS = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#6366f1",
  ];

  // Tooltip customizado simplificado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">
            {data.name}
          </p>
          <p className="text-sm">
            Valor:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(data.value)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.percentage.toFixed(1)}% do total
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.count} transação{data.count !== 1 ? "es" : ""}
          </p>
        </div>
      );
    }
    return null;
  };

  // Função para formatar valores do eixo Y - CORRIGIDA
  const formatYAxis = (value: any) => {
    // Usando 'any' para evitar problemas de tipagem do Recharts
    const numericValue = typeof value === "number" ? value : Number(value);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      notation: "compact",
    }).format(numericValue);
  };

  // Renderização simplificada do gráfico de pizza SEM LABELS
  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={currentData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={detailed ? 100 : 80}
          fill="#8884d8"
          dataKey="value"
          // Removido label para evitar problemas de tipagem
        >
          {currentData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        {detailed && <Legend />}
      </PieChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={currentData}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={80}
          fontSize={12}
        />
        <YAxis fontSize={12} tickFormatter={formatYAxis} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {currentData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  const renderListView = () => (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {currentData.map((category, index) => (
        <div
          key={category.name}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-800"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {category.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.count} transação{category.count !== 1 ? "es" : ""}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900 dark:text-white">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(category.value)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {category.percentage.toFixed(1)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="card-title">
            <PieIcon className="w-5 h-5" /> Análise por Categoria
          </h3>
          <p className="text-gray-600 text-sm dark:text-gray-400">
            {dataType === "income" ? "Receitas" : "Despesas"} • {timeRange}
          </p>
        </div>

        <div className="flex gap-2">
          {/* Toggle Income/Expenses */}
          <div className="flex bg-gray-100 rounded-lg p-1 dark:bg-gray-700">
            <button
              onClick={() => setDataType("income")}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                dataType === "income"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              Receitas
            </button>
            <button
              onClick={() => setDataType("expenses")}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                dataType === "expenses"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              Despesas
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 dark:bg-gray-700">
            <button
              onClick={() => setViewMode("pie")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "pie"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <PieIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("bar")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "bar"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Total Summary */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-blue-900 font-semibold dark:text-blue-300">
              Total de {dataType === "income" ? "Receitas" : "Despesas"}
            </p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalValue)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-blue-900 text-sm dark:text-blue-300">
              {currentData.length} categoria
              {currentData.length !== 1 ? "s" : ""}
            </p>
            <p className="text-blue-900 text-sm dark:text-blue-300">
              {currentData.reduce((sum, item) => sum + item.count, 0)}{" "}
              transações
            </p>
          </div>
        </div>
      </div>

      {/* Chart/List View */}
      {currentData.length > 0 ? (
        <>
          {viewMode === "pie" && renderPieChart()}
          {viewMode === "bar" && renderBarChart()}
          {viewMode === "list" && renderListView()}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          <PieIcon className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">Nenhum dado disponível</p>
          <p className="text-sm">
            Não há {dataType === "income" ? "receitas" : "despesas"} nas
            categorias
          </p>
        </div>
      )}
    </div>
  );
}
