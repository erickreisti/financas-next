// src/components/TransactionFilters.tsx
"use client";

import React from "react";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";

interface TransactionFiltersProps {
  filterType: string;
  filterCategory: string;
  searchTerm: string;
  sortBy: "date" | "amount" | "description";
  sortOrder: "asc" | "desc";
  onFilterTypeChange: (type: string) => void;
  onFilterCategoryChange: (category: string) => void;
  onSearchChange: (term: string) => void;
  onSortChange: (sort: "date" | "amount" | "description") => void;
  onSortOrderChange: (order: "asc" | "desc") => void;
}

const TransactionFilters = ({
  filterType,
  filterCategory,
  searchTerm,
  sortBy,
  sortOrder,
  onFilterTypeChange,
  onFilterCategoryChange,
  onSearchChange,
  onSortChange,
  onSortOrderChange,
}: TransactionFiltersProps) => {
  const toggleSortOrder = () => {
    onSortOrderChange(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="filters-card">
      <div className="filters-header">
        <div className="filters-title">
          <Filter className="w-4 h-4" />
          <span>Filtros e Ordenação</span>
        </div>
      </div>

      <div className="filters-content">
        {/* Barra de Pesquisa */}
        <div className="search-filter">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar transações..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Filtros */}
        <div className="filter-grid">
          <div className="filter-group">
            <label className="filter-label">Tipo</label>
            <select
              value={filterType}
              onChange={(e) => onFilterTypeChange(e.target.value)}
              className="filter-select"
            >
              <option value="todas">Todos os tipos</option>
              <option value="receita">Receitas</option>
              <option value="despesa">Despesas</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Categoria</label>
            <select
              value={filterCategory}
              onChange={(e) => onFilterCategoryChange(e.target.value)}
              className="filter-select"
            >
              <option value="todas">Todas as categorias</option>
              <option value="salario">Salário</option>
              <option value="alimentacao">Alimentação</option>
              <option value="transporte">Transporte</option>
              <option value="lazer">Lazer</option>
              <option value="saude">Saúde</option>
              <option value="educacao">Educação</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Ordenar por</label>
            <select
              value={sortBy}
              onChange={(e) =>
                onSortChange(
                  e.target.value as "date" | "amount" | "description"
                )
              }
              className="filter-select"
            >
              <option value="date">Data</option>
              <option value="amount">Valor</option>
              <option value="description">Descrição</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Ordem</label>
            <button onClick={toggleSortOrder} className="sort-order-btn">
              {sortOrder === "asc" ? (
                <SortAsc className="w-4 h-4" />
              ) : (
                <SortDesc className="w-4 h-4" />
              )}
              <span>{sortOrder === "asc" ? "Crescente" : "Decrescente"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
