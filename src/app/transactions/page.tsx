// src/app/transactions/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTransactions } from "@/contexts/TransactionContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TransactionList from "@/components/TransactionList";
import TransactionFilters from "@/components/TransactionFilters";
import { Plus, Download, Upload } from "lucide-react";

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
                <button className="btn btn-secondary">
                  <Upload className="w-4 h-4" />
                  <span>Importar CSV</span>
                </button>
                <button className="btn btn-secondary">
                  <Download className="w-4 h-4" />
                  <span>Exportar Excel</span>
                </button>
                <button className="btn btn-primary">
                  <Plus className="w-4 h-4" />
                  <span>Nova Transação</span>
                </button>
              </div>
            </motion.div>

            {/* Filtros */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
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
            </motion.div>

            {/* Lista de Transações */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TransactionList
                transactions={filteredTransactions}
                onDeleteTransaction={deleteTransaction}
              />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
