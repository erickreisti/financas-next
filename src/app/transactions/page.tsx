// src/app/transactions/page.tsx - LAYOUT REFACTORADO
"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTransactions } from "@/contexts/TransactionContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TransactionList from "@/components/TransactionList";
import TransactionFilters from "@/components/TransactionFilters";
import { Plus, Download, Upload, Filter, FileText } from "lucide-react";

export default function TransactionsPage() {
  const { transactions, deleteTransaction } = useTransactions();
  const [filterType, setFilterType] = useState<string>("todas");
  const [filterCategory, setFilterCategory] = useState<string>("todas");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "description">(
    "date"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filtros e ordenação
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter((transaction) => {
      const typeMatch =
        filterType === "todas" || transaction.type === filterType;
      const categoryMatch =
        filterCategory === "todas" || transaction.category === filterCategory;
      const searchMatch =
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

      return typeMatch && categoryMatch && searchMatch;
    });

    // Ordenação
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case "date":
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "description":
          aValue = a.description.toLowerCase();
          bValue = b.description.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [transactions, filterType, filterCategory, searchTerm, sortBy, sortOrder]);

  const handleExport = () => {
    console.log("Exportando transações...");
  };

  const handleImport = () => {
    console.log("Importando transações...");
  };

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "receita")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === "despesa")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="professional-layout">
      <Header />
      <div className="layout-content">
        <Sidebar />
        <main className="main-content">
          <div className="transactions-container">
            {/* Cabeçalho da Página */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="page-header"
            >
              <div>
                <h1 className="page-title">Transações</h1>
                <p className="page-subtitle">
                  Gerencie todas as suas transações financeiras
                </p>
              </div>

              <div className="action-buttons">
                <button onClick={handleImport} className="btn btn-secondary">
                  <Upload className="w-4 h-4" />
                  <span>Importar CSV</span>
                </button>
                <button onClick={handleExport} className="btn btn-secondary">
                  <Download className="w-4 h-4" />
                  <span>Exportar Excel</span>
                </button>
                <button className="btn btn-primary">
                  <Plus className="w-4 h-4" />
                  <span>Nova Transação</span>
                </button>
              </div>
            </motion.div>

            {/* Resumo Financeiro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="financial-summary"
            >
              <div className="summary-card summary-income">
                <h3>Total de Receitas</h3>
                <p className="amount">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalIncome)}
                </p>
                <div className="change">+12.5%</div>
              </div>

              <div className="summary-card summary-expense">
                <h3>Total de Despesas</h3>
                <p className="amount">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalExpenses)}
                </p>
                <div className="change">-3.2%</div>
              </div>

              <div
                className={`summary-card ${netBalance >= 0 ? "summary-balance" : "summary-expense"}`}
              >
                <h3>Saldo Líquido</h3>
                <p className="amount">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(netBalance)}
                </p>
                <div className="change">
                  {netBalance >= 0 ? "+" : ""}
                  {totalIncome > 0
                    ? ((netBalance / totalIncome) * 100).toFixed(1)
                    : "0"}
                  %
                </div>
              </div>
            </motion.div>

            {/* Filtros */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="card">
                <TransactionFilters
                  filterType={filterType}
                  filterCategory={filterCategory}
                  searchTerm={searchTerm}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onFilterTypeChange={setFilterType}
                  onFilterCategoryChange={setFilterCategory}
                  onSearchChange={setSearchTerm}
                  onSortChange={setSortBy}
                  onSortOrderChange={setSortOrder}
                />
              </div>
            </motion.div>

            {/* Lista de Transações */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="card">
                <TransactionList
                  transactions={filteredTransactions}
                  onDeleteTransaction={deleteTransaction}
                />
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
