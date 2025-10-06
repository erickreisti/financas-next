// src/app/reports/page.tsx - CORRIGIDA
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
  ArrowUp,
  ArrowDown,
  Calendar,
  Download,
  Filter,
  ChevronDown,
} from "lucide-react";

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
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

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

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? ArrowUp : ArrowDown;
  };

  return (
    <div className="professional-layout">
      <Header />
      <div className="layout-content">
        <Sidebar />
        <main className="main-content">
          <div className="reports-container">
            {/* Cabeçalho */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="page-header"
            >
              <div className="header-content">
                <div className="header-text">
                  <h1 className="page-title">Relatórios Financeiros</h1>
                  <p className="page-subtitle">
                    Análises detalhadas, insights e métricas do seu desempenho
                    financeiro
                  </p>
                </div>
                <div className="action-buttons">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filtros Avançados</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`}
                    />
                  </button>
                  <button className="btn btn-secondary">
                    <Download className="w-4 h-4" />
                    <span>Exportar PDF</span>
                  </button>
                  <ExportReports />
                </div>
              </div>
            </motion.div>

            {/* Filtros Avançados */}
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="advanced-filters-card"
              >
                <div className="advanced-filters-grid">
                  <div className="filter-field">
                    <label className="filter-label">Categoria</label>
                    <select className="filter-select">
                      <option value="">Todas as categorias</option>
                      <option value="alimentacao">Alimentação</option>
                      <option value="transporte">Transporte</option>
                      <option value="lazer">Lazer</option>
                      <option value="saude">Saúde</option>
                    </select>
                  </div>
                  <div className="filter-field">
                    <label className="filter-label">Tipo</label>
                    <select className="filter-select">
                      <option value="">Todos os tipos</option>
                      <option value="receita">Receita</option>
                      <option value="despesa">Despesa</option>
                    </select>
                  </div>
                  <div className="filter-field">
                    <label className="filter-label">Valor Mínimo</label>
                    <input
                      type="number"
                      className="filter-input"
                      placeholder="R$ 0,00"
                    />
                  </div>
                  <div className="filter-field">
                    <label className="filter-label">Valor Máximo</label>
                    <input
                      type="number"
                      className="filter-input"
                      placeholder="R$ 10.000,00"
                    />
                  </div>
                </div>
                <div className="filter-actions">
                  <button className="btn btn-secondary">Limpar Filtros</button>
                  <button className="btn btn-primary">Aplicar Filtros</button>
                </div>
              </motion.div>
            )}

            {/* Filtros de Período */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="filters-card"
            >
              <div className="filters-content">
                <div className="period-filters-section">
                  <h3 className="filters-section-title">
                    Período do Relatório
                  </h3>
                  <div className="period-filters-grid">
                    {[
                      { value: "7d", label: "7 dias", icon: Calendar },
                      { value: "30d", label: "30 dias", icon: Calendar },
                      { value: "90d", label: "90 dias", icon: Calendar },
                      { value: "1y", label: "1 ano", icon: Calendar },
                    ].map((range) => {
                      const Icon = range.icon;
                      return (
                        <button
                          key={range.value}
                          onClick={() => setTimeRange(range.value as any)}
                          className={`period-filter-btn ${timeRange === range.value ? "active" : ""}`}
                        >
                          <div className="period-btn-content">
                            <Icon className="period-btn-icon" />
                            <span className="period-btn-label">
                              {range.label}
                            </span>
                          </div>
                          {timeRange === range.value && (
                            <div className="period-btn-indicator" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="report-type-section">
                  <h3 className="filters-section-title">Tipo de Relatório</h3>
                  <div className="report-tabs">
                    {[
                      {
                        value: "overview",
                        label: "Visão Geral",
                        icon: BarChart3,
                        description: "Visão completa",
                      },
                      {
                        value: "categories",
                        label: "Categorias",
                        icon: PieChart,
                        description: "Análise por categoria",
                      },
                      {
                        value: "trends",
                        label: "Tendências",
                        icon: TrendingUp,
                        description: "Evolução temporal",
                      },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.value}
                          onClick={() => setReportType(tab.value as any)}
                          className={`report-tab-btn ${reportType === tab.value ? "active" : ""}`}
                        >
                          <div className="report-tab-icon">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="report-tab-content">
                            <span className="report-tab-label">
                              {tab.label}
                            </span>
                            <span className="report-tab-description">
                              {tab.description}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* KPIs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="kpi-section"
            >
              <div className="section-header">
                <h2 className="section-title">Métricas Principais</h2>
                <p className="section-subtitle">
                  Desempenho financeiro no período selecionado
                </p>
              </div>
              <div className="kpi-grid">
                {kpiCards.map((kpi, index) => {
                  const Icon = kpi.icon;
                  const TrendIcon = getTrendIcon(kpi.trend);

                  return (
                    <motion.div
                      key={kpi.title}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="kpi-card"
                    >
                      <div className="kpi-header">
                        <div
                          className={`kpi-icon-container kpi-icon-${kpi.color}`}
                        >
                          <Icon className="kpi-icon" />
                        </div>
                        <div
                          className={`kpi-trend ${kpi.trend === "up" ? "trend-up" : "trend-down"}`}
                        >
                          <TrendIcon className="trend-icon" />
                          <span className="trend-value">{kpi.change}</span>
                        </div>
                      </div>

                      <div className="kpi-content">
                        <h3 className="kpi-title">{kpi.title}</h3>
                        <p className="kpi-value">
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
              className="report-content-section"
            >
              <div className="section-header">
                <h2 className="section-title">
                  {reportType === "overview" && "Visão Geral do Período"}
                  {reportType === "categories" && "Análise por Categorias"}
                  {reportType === "trends" && "Tendências e Evolução"}
                </h2>
              </div>

              <div className="report-content-card">
                {reportType === "overview" && (
                  <div className="overview-grid">
                    <div className="overview-chart">
                      <AnalyticsChart
                        timeRange={timeRange}
                        transactions={filteredTransactions}
                      />
                    </div>
                    <div className="overview-breakdown">
                      <CategoryBreakdown
                        data={categoryBreakdown}
                        timeRange={timeRange}
                      />
                    </div>
                  </div>
                )}

                {reportType === "categories" && (
                  <div className="categories-content">
                    <CategoryBreakdown
                      data={categoryBreakdown}
                      detailed
                      timeRange={timeRange}
                    />
                  </div>
                )}

                {reportType === "trends" && (
                  <div className="trends-content">
                    <AnalyticsChart
                      timeRange={timeRange}
                      showTrends
                      transactions={filteredTransactions}
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Resumo do Período */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="period-summary-section"
            >
              <div className="card">
                <div className="summary-header">
                  <div className="summary-title-section">
                    <Calendar className="summary-icon" />
                    <h3 className="card-title">
                      Resumo do Período Selecionado
                    </h3>
                  </div>
                  <div className="period-badge">
                    {timeRange === "7d" && "7 Dias"}
                    {timeRange === "30d" && "30 Dias"}
                    {timeRange === "90d" && "90 Dias"}
                    {timeRange === "1y" && "1 Ano"}
                  </div>
                </div>

                <div className="summary-grid">
                  <div className="summary-item">
                    <div className="summary-item-content">
                      <p className="summary-label">Total de Transações</p>
                      <p className="summary-value">
                        {filteredTransactions.length}
                      </p>
                    </div>
                  </div>

                  <div className="summary-item">
                    <div className="summary-item-content">
                      <p className="summary-label">Dias Analisados</p>
                      <p className="summary-value">
                        {timeRange === "7d"
                          ? 7
                          : timeRange === "30d"
                            ? 30
                            : timeRange === "90d"
                              ? 90
                              : 365}
                      </p>
                    </div>
                  </div>

                  <div className="summary-item">
                    <div className="summary-item-content">
                      <p className="summary-label">Categorias Utilizadas</p>
                      <p className="summary-value">
                        {Object.keys(categoryBreakdown).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
