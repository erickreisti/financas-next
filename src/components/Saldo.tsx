// src/components/Saldo.tsx
// ✅ DIRETIVA USE CLIENT - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa React para criar componente
import React from "react";

// Interface para definir o formato das props recebidas
// ✅ INTERFACE PARA TIPAGEM EXPLÍCITA E SEGURANÇA
interface SaldoProps {
  total: number; // Valor do saldo total (número)
}

// Componente Saldo: mostra o saldo total das transações
// ✅ CLIENT COMPONENT (use client acima)
// Recebe uma prop tipada: total (número com o valor do saldo)
const Saldo = ({ total }: SaldoProps) => {
  // Função que determina a cor do saldo baseado no valor
  // ✅ FUNÇÃO PURA PARA CÁLCULO DE COR
  const getSaldoColor = (): string => {
    if (total > 0) return "var(--success)"; // Verde para saldo positivo
    if (total < 0) return "var(--danger)"; // Vermelho para saldo negativo
    return "white"; // Branco para saldo zero
  };

  // Função que formata números para moeda brasileira
  // ✅ FUNÇÃO PURA PARA FORMATAÇÃO DE MOEDA
  const formatCurrency = (value: number): string => {
    // toFixed(2): converte para 2 casas decimais
    // replace('.', ','): substitui ponto por vírgula
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  // Retorna JSX do componente
  // ✅ JSX COM DADOS PROCESSADOS E FUNÇÕES
  return (
    // Seção que contém o saldo com classe CSS 'saldo-section'
    // ✅ SECTION SEMÂNTICA PARA CONTEÚDO RELACIONADO
    <section className="saldo-section">
      {/* Título da seção */}
      // ✅ H2 SEMÂNTICO PARA TÍTULO SECUNDÁRIO
      <h2>Saldo Total</h2>
      {/* Div que mostra o valor do saldo */}
      // ✅ DIV COM STYLE INLINE PARA COR DINÂMICA
      <div
        className="saldo"
        // style inline: aplica cor dinâmica baseada no saldo
        style={{ color: getSaldoColor() }}
      >
        {/* Mostra o saldo formatado como moeda */}
        // ✅ FORMATAR VALOR COMO MOEDA BRASILEIRA
        {formatCurrency(total)}
      </div>
    </section>
  );
};

// Exporta o componente para ser usado em outros arquivos
// ✅ EXPORTAÇÃO PADRÃO PARA REUTILIZAÇÃO
export default Saldo;
