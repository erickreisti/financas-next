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
  TooltipProps,
} from "recharts";
import { TrendingUp, PieChart as PieIcon, BarChart3, List } from "lucide-react";

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

// Interface para os dados do gráfico compatível com Recharts
interface ChartDataItem {
  name: string;
  value: number;
  count: number;
  percentage: number;
  [key: string]: string | number; // Assinatura de índice para compatibilidade com Recharts
}

// Interface para o payload do tooltip
interface TooltipPayloadItem {
  payload: ChartDataItem;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

type ViewMode = "pie" | "bar" | "list";

// Solução robusta com verificação de tipo em tempo de execução
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;

    // Verifica se os dados necessários existem e têm os tipos corretos
    const name = typeof data.name === "string" ? data.name : "Categoria";
    const value = typeof data.value === "number" ? data.value : 0;
    const count = typeof data.count === "number" ? data.count : 0;
    const percentage =
      typeof data.percentage === "number" ? data.percentage : 0;

    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm">
          Valor:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value)}
        </p>
        <p className="text-sm text-gray-600">
          {percentage.toFixed(1)}% do total
        </p>
        <p className="text-sm text-gray-600">
          {count} transação{count !== 1 ? "es" : ""}
        </p>
      </div>
    );
  }
  return null;
};

// Função personalizada para renderizar labels no gráfico de pizza
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) => {
  if (percent < 0.05) return null; // Não mostra label para porcentagens menores que 5%

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function CategoryBreakdown({
  data,
  detailed = false,
  timeRange = "30d",
}: CategoryBreakdownProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("pie");
  const [dataType, setDataType] = useState<"income" | "expenses">("expenses");

  // Processa dados para gráfico de receitas
  const incomeData = useMemo((): ChartDataItem[] => {
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
  const expensesData = useMemo((): ChartDataItem[] => {
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

  // Cores para o gráfico de pizza
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
    "#14b8a6",
    "#f43f5e",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
  ];

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={currentData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={detailed ? 100 : 80}
          fill="#8884d8"
          dataKey="value"
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
          tickLine={false}
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          tickFormatter={(value: number) =>
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              notation: "compact",
            }).format(value)
          }
        />
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
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div>
              <p className="font-medium text-gray-900">{category.name}</p>
              <p className="text-sm text-gray-600">
                {category.count} transação{category.count !== 1 ? "es" : ""}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(category.value)}
            </p>
            <p className="text-sm text-gray-600">
              {category.percentage.toFixed(1)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <PieIcon className="w-5 h-5" />
            Análise por Categoria
          </h3>
          <p className="text-gray-600 text-sm">
            {dataType === "income" ? "Receitas" : "Despesas"} • {timeRange}
          </p>
        </div>

        <div className="flex gap-2">
          {/* Toggle Income/Expenses */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setDataType("income")}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                dataType === "income"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Receitas
            </button>
            <button
              onClick={() => setDataType("expenses")}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                dataType === "expenses"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Despesas
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("pie")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "pie"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <PieIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("bar")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "bar"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Total Summary */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-blue-900 font-semibold">
              Total de {dataType === "income" ? "Receitas" : "Despesas"}
            </p>
            <p className="text-2xl font-bold text-blue-900">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalValue)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-blue-900 text-sm">
              {currentData.length} categoria
              {currentData.length !== 1 ? "s" : ""}
            </p>
            <p className="text-blue-900 text-sm">
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
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
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
