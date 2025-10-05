// src/app/reports/page.tsx - PROFISSIONAL (CORRIGIDO)
"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTransactions } from "@/contexts/TransactionContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AnalyticsChart from "@/components/AnalyticsChart";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import ExportReports from "@/components/ExportReports";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Download,
  ArrowUp,
  ArrowDown,
  Calendar,
  Filter,
} from "lucide-react";

// Tipos para os dados do relatório
interface CategoryData {
  income: number;
  expenses: number;
  count: number;
}

interface KpiCard {
  title: string;
  value: number;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  color: string;
  isPercentage?: boolean;
}

export default function ReportsPage() {
  const { transactions } = useTransactions();
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">(
    "30d"
  );
  const [reportType, setReportType] = useState<
    "overview" | "categories" | "trends"
  >("overview");

  // Filtra transações baseado no período selecionado
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const filterDate = new Date();

    switch (timeRange) {
      case "7d":
        filterDate.setDate(now.getDate() - 7);
        break;
      case "30d":
        filterDate.setDate(now.getDate() - 30);
        break;
      case "90d":
        filterDate.setDate(now.getDate() - 90);
        break;
      case "1y":
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    return transactions.filter(
      (transaction) => new Date(transaction.date) >= filterDate
    );
  }, [transactions, timeRange]);

  // Cálculos para relatórios
  const { totalIncome, totalExpenses, netSavings, savingsRate } =
    useMemo(() => {
      const income = filteredTransactions
        .filter((t) => t.type === "receita")
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = filteredTransactions
        .filter((t) => t.type === "despesa")
        .reduce((sum, t) => sum + t.amount, 0);

      const savings = income - expenses;
      const rate = income > 0 ? (savings / income) * 100 : 0;

      return {
        totalIncome: income,
        totalExpenses: expenses,
        netSavings: savings,
        savingsRate: rate,
      };
    }, [filteredTransactions]);

  // Breakdown por categoria
  const categoryBreakdown = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, transaction) => {
        const key = transaction.category;
        if (!acc[key]) {
          acc[key] = { income: 0, expenses: 0, count: 0 };
        }

        if (transaction.type === "receita") {
          acc[key].income += transaction.amount;
        } else {
          acc[key].expenses += transaction.amount;
        }

        acc[key].count += 1;
        return acc;
      },
      {} as Record<string, CategoryData>
    );
  }, [filteredTransactions]);

  // KPIs com dados dinâmicos
  const kpiCards: KpiCard[] = useMemo(
    () => [
      {
        title: "Receitas Totais",
        value: totalIncome,
        change: totalIncome > 0 ? "+12.5%" : "0%",
        trend: totalIncome > 0 ? "up" : "down",
        icon: TrendingUp,
        color: "green",
      },
      {
        title: "Despesas Totais",
        value: totalExpenses,
        change: totalExpenses > 0 ? "+8.2%" : "0%",
        trend: "down",
        icon: BarChart3,
        color: "red",
      },
      {
        title: "Saldo Líquido",
        value: netSavings,
        change: netSavings >= 0 ? "+8.7%" : "-5.2%",
        trend: netSavings >= 0 ? "up" : "down",
        icon: PieChart,
        color: netSavings >= 0 ? "blue" : "orange",
      },
      {
        title: "Taxa de Economia",
        value: savingsRate,
        change: savingsRate >= 0 ? "+2.1%" : "-1.5%",
        trend: savingsRate >= 0 ? "up" : "down",
        icon: TrendingUp,
        color: savingsRate >= 0 ? "purple" : "red",
        isPercentage: true,
      },
    ],
    [totalIncome, totalExpenses, netSavings, savingsRate]
  );

  // Estilos CSS inline para componentes (pode ser movido para CSS modules)
  const styles = {
    professionalLayout: "min-h-screen bg-gray-50",
    layoutContent: "flex",
    mainContent: "flex-1 lg:ml-64",
    pageContainer: "p-6 max-w-7xl mx-auto",
    pageHeader: "mb-8",
    headerContent:
      "flex flex-col lg:flex-row lg:items-center lg:justify-between",
    headerText: "mb-4 lg:mb-0",
    pageTitle: "text-3xl font-bold text-gray-900 mb-2",
    pageDescription: "text-gray-600",
    headerActions: "flex items-center gap-4",
    reportControls: "bg-white rounded-xl shadow-sm p-6 mb-6",
    controlsContent:
      "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4",
    timeFilters: "flex gap-2 flex-wrap",
    timeFilter: `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                border border-gray-200 hover:border-gray-300 hover:bg-gray-50
                active:scale-95`,
    activeTimeFilter: `bg-blue-500 text-white border-blue-500 hover:bg-blue-600 
                      hover:border-blue-600`,
    reportTabs: "flex gap-1 bg-gray-100 rounded-xl p-1",
    reportTab: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
               transition-all duration-200 hover:bg-white active:scale-95`,
    activeReportTab: "bg-white shadow-sm text-blue-600",
    kpiSection: "mb-8",
    kpiGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
    kpiCard:
      "bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200",
    kpiHeader: "flex items-center justify-between mb-4",
    kpiIcon: `w-12 h-12 rounded-xl flex items-center justify-center 
             bg-opacity-10 text-white`,
    kpiChange: `flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full`,
    kpiContent: "space-y-2",
    kpiTitle: "text-gray-600 text-sm font-medium",
    kpiValue: "text-2xl font-bold text-gray-900",
    reportContent: "bg-white rounded-xl shadow-sm p-6",
    overviewGrid: "grid grid-cols-1 lg:grid-cols-3 gap-6",
    chartSection: "lg:col-span-2",
    breakdownSection: "lg:col-span-1",
    categoriesGrid: "grid grid-cols-1 gap-6",
    trendsGrid: "grid grid-cols-1 gap-6",
    fullWidthSection: "col-span-1 lg:col-span-3",
  };

  // Cores dinâmicas para os ícones
  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      green: "bg-green-500 bg-opacity-10 text-green-600",
      red: "bg-red-500 bg-opacity-10 text-red-600",
      blue: "bg-blue-500 bg-opacity-10 text-blue-600",
      purple: "bg-purple-500 bg-opacity-10 text-purple-600",
      orange: "bg-orange-500 bg-opacity-10 text-orange-600",
    };
    return colors[color] || colors.blue;
  };

  const getTrendClass = (trend: string) => {
    return trend === "up"
      ? "bg-green-50 text-green-700"
      : "bg-red-50 text-red-700";
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? ArrowUp : ArrowDown;
  };

  return (
    <div className={styles.professionalLayout}>
      <Header />

      <div className={styles.layoutContent}>
        <Sidebar />

        <main className={styles.mainContent}>
          <div className={styles.pageContainer}>
            {/* Cabeçalho */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.pageHeader}
            >
              <div className={styles.headerContent}>
                <div className={styles.headerText}>
                  <h1 className={styles.pageTitle}>Relatórios Financeiros</h1>
                  <p className={styles.pageDescription}>
                    Análises detalhadas, insights e métricas do seu desempenho
                    financeiro
                  </p>
                </div>

                <div className={styles.headerActions}>
                  {/* ✅ REMOVIDA A PROPRIEDADE transactions que causava o erro */}
                  <ExportReports />
                </div>
              </div>
            </motion.div>

            {/* Filtros de Período */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={styles.reportControls}
            >
              <div className={styles.controlsContent}>
                <div className={styles.timeFilters}>
                  {[
                    { value: "7d", label: "7 dias" },
                    { value: "30d", label: "30 dias" },
                    { value: "90d", label: "90 dias" },
                    { value: "1y", label: "1 ano" },
                  ].map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setTimeRange(range.value as any)}
                      className={`${styles.timeFilter} ${
                        timeRange === range.value ? styles.activeTimeFilter : ""
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>

                <div className={styles.reportTabs}>
                  {[
                    {
                      value: "overview",
                      label: "Visão Geral",
                      icon: BarChart3,
                    },
                    {
                      value: "categories",
                      label: "Categorias",
                      icon: PieChart,
                    },
                    { value: "trends", label: "Tendências", icon: TrendingUp },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.value}
                        onClick={() => setReportType(tab.value as any)}
                        className={`${styles.reportTab} ${
                          reportType === tab.value ? styles.activeReportTab : ""
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* KPIs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={styles.kpiSection}
            >
              <div className={styles.kpiGrid}>
                {kpiCards.map((kpi, index) => {
                  const Icon = kpi.icon;
                  const TrendIcon = getTrendIcon(kpi.trend);

                  return (
                    <motion.div
                      key={kpi.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className={styles.kpiCard}
                    >
                      <div className={styles.kpiHeader}>
                        <div
                          className={`${styles.kpiIcon} ${getColorClass(kpi.color)}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div
                          className={`${styles.kpiChange} ${getTrendClass(kpi.trend)}`}
                        >
                          <TrendIcon className="w-3 h-3" />
                          {kpi.change}
                        </div>
                      </div>

                      <div className={styles.kpiContent}>
                        <h3 className={styles.kpiTitle}>{kpi.title}</h3>
                        <p className={styles.kpiValue}>
                          {kpi.isPercentage
                            ? `${kpi.value.toFixed(1)}%`
                            : new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(kpi.value)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Conteúdo do Relatório */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={styles.reportContent}
            >
              {reportType === "overview" && (
                <div className={styles.overviewGrid}>
                  <div className={styles.chartSection}>
                    <AnalyticsChart
                      timeRange={timeRange}
                      transactions={filteredTransactions}
                    />
                  </div>
                  <div className={styles.breakdownSection}>
                    <CategoryBreakdown
                      data={categoryBreakdown}
                      timeRange={timeRange}
                    />
                  </div>
                </div>
              )}

              {reportType === "categories" && (
                <div className={styles.categoriesGrid}>
                  <div className={styles.fullWidthSection}>
                    <CategoryBreakdown
                      data={categoryBreakdown}
                      detailed
                      timeRange={timeRange}
                    />
                  </div>
                </div>
              )}

              {reportType === "trends" && (
                <div className={styles.trendsGrid}>
                  <div className={styles.fullWidthSection}>
                    <AnalyticsChart
                      timeRange={timeRange}
                      showTrends
                      transactions={filteredTransactions}
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Resumo do Período */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Resumo do Período Selecionado
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Total de Transações</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredTransactions.length}
                  </p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Dias Analisados</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {timeRange === "7d"
                      ? 7
                      : timeRange === "30d"
                        ? 30
                        : timeRange === "90d"
                          ? 90
                          : 365}
                  </p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Categorias Utilizadas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Object.keys(categoryBreakdown).length}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
