// src/components/FilterBar.tsx
// Diretiva use client - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa React para criar componente
import React from "react";

// Interface para definir o formato das props recebidas
// ✅ TIPAGEM EXPLÍCITA PARA SEGURANÇA E AUTO-COMPLETE
interface FilterBarProps {
  filterType: string; // Filtro de tipo atual (receita/despesa/todas)
  filterCategory: string; // Filtro de categoria atual (salario/alimentacao/etc.)
  onFilterChange: (filterName: string, value: string) => void; // Função alterar filtros
  onSort: () => void; // Função ordenar transações
  isSorted: boolean; // Estado de ordenação (true/false)
}

// Componente FilterBar: barra de filtros e ordenação
// ✅ CLIENT COMPONENT por causa dos hooks (use client acima)
// Recebe props tipadas via FilterBarProps
const FilterBar = ({
  filterType, // Filtro de tipo atual
  filterCategory, // Filtro de categoria atual
  onFilterChange, // Função para alterar filtros
  onSort, // Função para ordenar
  isSorted, // Estado de ordenação
}: FilterBarProps) => {
  // Retorna JSX do componente
  // ✅ JSX COM PROPS CONTROLADAS E EVENT HANDLERS
  return (
    // Div com classe CSS 'filters' para estilização
    // ✅ CONTAINER FLEXÍVEL COM GAP E MARGEM ABAIXO
    <div className="filters">
      {/* Select para filtrar por tipo de transação */}

      <select
        value={filterType} // Valor controlado pelo estado do componente pai
        // Quando muda, chama onFilterChange com 'type' e novo valor
        onChange={(e) => onFilterChange("type", e.target.value)}
      >
        {/* Opções de filtro por tipo */}

        <option value="todas">Todas</option>
        <option value="receita">🟢 Receitas</option>
        <option value="despesa">🔴 Despesas</option>
      </select>
      {/* Select para filtrar por categoria */}

      <select
        value={filterCategory} // Valor controlado pelo estado do componente pai
        // Quando muda, chama onFilterChange com 'category' e novo valor
        onChange={(e) => onFilterChange("category", e.target.value)}
      >
        {/* Opções de filtro por categoria */}

        <option value="todas">Todas as categorias</option>
        <option value="salario">Salário</option>
        <option value="alimentacao">Alimentação</option>
        <option value="transporte">Transporte</option>
        <option value="lazer">Lazer</option>
        <option value="saude">Saúde</option>
        <option value="educacao">Educação</option>
        <option value="outros">Outros</option>
      </select>
      {/* Botão para ordenar transações por data */}

      <button
        type="button" // Tipo de botão explícito (boa prática)
        className={`btn-${isSorted ? "success" : "outline"}`} // Classe CSS dinâmica
        onClick={onSort} // Quando clicado, chama função do componente pai
      >
        {/* Texto dinâmico baseado no estado de ordenação */}

        {isSorted ? "📅 Ordenado por data" : "📅 Ordenar por data"}
      </button>
    </div>
  );
};

// Exporta o componente para ser usado em outros arquivos
// ✅ EXPORTAÇÃO PADRÃO PARA REUTILIZAÇÃO
export default FilterBar;
