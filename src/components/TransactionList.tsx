// src/components/TransactionList.tsx
// Diretiva use client - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa React para criar componente
import React from "react";

// Interface para definir a estrutura de uma transação
// ✅ TIPAGEM EXPLÍCITA PARA SEGURANÇA E AUTO-COMPLETE
interface Transaction {
  id: string; // ✅ AGORA É STRING (CUID do Prisma)
  type: "receita" | "despesa"; // Tipo restrito a essas duas opções apenas
  description: string; // Descrição obrigatória (texto)
  category: string; // Categoria obrigatória (texto)
  amount: number; // Valor numérico (decimal)
  date: Date; // ✅ AGORA É Date (não string)
  userId: string; // ID do usuário proprietário (chave estrangeira)
  createdAt: Date; // ✅ AGORA É Date (não string)
  updatedAt: Date; // ✅ AGORA É Date (não string)
}

// Interface para definir o formato das props recebidas
// ✅ CONTRATO EXPLÍCITO DO QUE O COMPONENTE ESPERA RECEBER
interface TransactionListProps {
  transactions: Transaction[]; // Array de transações COM ID
  onDeleteTransaction: (id: string) => void; // ✅ AGORA RECEBE STRING (CUID)
}

// Componente TransactionList: lista de transações
// Recebe props tipadas
const TransactionList = ({
  transactions,
  onDeleteTransaction,
}: TransactionListProps) => {
  // Objeto para mapear chaves de categoria para nomes amigáveis
  // ✅ MAPEAMENTO DE CATEGORIAS PARA NOMES LEGÍVEIS
  const categoryNames: { [key: string]: string } = {
    salario: "Salário",
    alimentacao: "Alimentação",
    transporte: "Transporte",
    lazer: "Lazer",
    saude: "Saúde",
    educacao: "Educação",
    outros: "Outros",
  };

  // Função para formatar data Date para formato brasileiro
  // ✅ FUNÇÃO PURA PARA FORMATAÇÃO DE DATA
  const formatDate = (date: Date): string => {
    // Converte objeto Date para string no formato DD/MM/AAAA
    return date.toLocaleDateString("pt-BR");
  };

  // Função para formatar valor como moeda brasileira
  // ✅ FUNÇÃO PURA PARA FORMATAÇÃO DE MOEDA
  const formatCurrency = (value: number): string => {
    // Converte número para string com 2 casas decimais e substitui . por ,
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  // Retorna JSX do componente
  // ✅ JSX COM DADOS PROCESSADOS E HOOKS
  return (
    // Lista não ordenada para transações
    <ul className="transaction-list">
      {/* Verifica se há transações para mostrar */}
      {transactions.length === 0 ? (
        // Mensagem quando não há transações
        <li style={{ padding: "20px", textAlign: "center", color: "#6c757d" }}>
          Nenhuma transação encontrada
        </li>
      ) : (
        // Mapeia array de transações para elementos JSX
        transactions.map((transaction) => (
          // Cada item da lista com key única (importante para React)
          <li
            key={transaction.id}
            className={`transaction-item ${transaction.type}`}
          >
            {/* Informações da transação */}
            <div className="transaction-info">
              {/* Descrição em negrito */}
              <strong>{transaction.description}</strong>
              {/* Metadados da transação */}
              <div className="transaction-meta">
                {/* Data formatada */}
                <div>{formatDate(transaction.date)}</div>
                {/* Tag de categoria */}
                <span className="category-tag">
                  {/* Usa categoryNames para nome amigável ou categoria original */}
                  {categoryNames[transaction.category] || transaction.category}
                </span>
              </div>
            </div>

            {/* Valor e botão de deletar */}
            <div className="transaction-amount">
              {/* Valor com sinal + ou - baseado no tipo */}
              <span
                className={`value ${transaction.type === "receita" ? "positive" : "negative"}`}
              >
                {transaction.type === "receita" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </span>
              {/* Botão para deletar transação - AGORA RECEBE STRING */}
              <button
                type="button"
                className="delete-btn"
                // Quando clicado, chama onDeleteTransaction com ID STRING da transação
                onClick={() => onDeleteTransaction(transaction.id)} // ✅ ID como STRING
              >
                🗑️
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

// Exporta o componente para ser usado em outros arquivos
// ✅ EXPORTAÇÃO PADRÃO PARA REUTILIZAÇÃO
export default TransactionList;
