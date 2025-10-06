// src/components/FilterBar.tsx - ATUALIZADO
"use client";

import React from "react";

interface FilterBarProps {
  filterType: string;
  filterCategory: string;
  onFilterChange: (filterName: string, value: string) => void;
  onSort: () => void;
  isSorted: boolean;
}

const FilterBar = ({
  filterType,
  filterCategory,
  onFilterChange,
  onSort,
  isSorted,
}: FilterBarProps) => {
  return (
    <div className="filters-container">
      <div className="filters-grid">
        <div className="filter-group">
          <label className="filter-label">Tipo</label>
          <select
            value={filterType}
            onChange={(e) => onFilterChange("type", e.target.value)}
            className="filter-select"
          >
            <option value="todas">Todas</option>
            <option value="receita">🟢 Receitas</option>
            <option value="despesa">🔴 Despesas</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Categoria</label>
          <select
            value={filterCategory}
            onChange={(e) => onFilterChange("category", e.target.value)}
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
          <button
            type="button"
            className={`filter-btn ${isSorted ? "filter-btn-success" : "filter-btn-outline"}`}
            onClick={onSort}
          >
            📅 {isSorted ? "Ordenado por data" : "Ordenar por data"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
