// src/contexts/TransactionContext.tsx
// Diretiva use client - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa React e hooks necessários para criar contexto
import React, { createContext, useContext, useState, useEffect } from "react";

// Interface para definir a estrutura de uma transação COMPLETA
export interface Transaction {
  id: string; // ID único da transação (gerado com Date.now())
  type: "receita" | "despesa"; // Tipo restrito apenas a essas duas opções
  description: string; // Descrição da transação (ex: "Salário", "Aluguel")
  category: string; // Categoria (ex: "salario", "alimentacao")
  amount: number; // Valor numérico da transação
  date: Date; // Data como objeto Date (para manipulação fácil)
  userId: string; // ID do usuário proprietário (para multi-usuário)
  createdAt: Date; // Data de criação (automática)
  updatedAt: Date; // Data da última atualização
}

// Interface para dados de ATUALIZAÇÃO de transação (campos opcionais)
interface TransactionUpdateData {
  type?: "receita" | "despesa"; // Tipo opcional
  description?: string; // Descrição opcional
  category?: string; // Categoria opcional
  amount?: number; // Valor opcional
  date?: string; // Data como string (vem do formulário)
  userId?: string; // ID do usuário opcional
}

// Interface para dados de CRIAÇÃO de transação (todos obrigatórios)
interface TransactionData {
  type: "receita" | "despesa"; // Tipo obrigatório
  description: string; // Descrição obrigatória
  category: string; // Categoria obrigatória
  amount: number; // Valor obrigatório
  date: string; // Data como string (vem do input HTML)
  userId: string; // ID do usuário obrigatório
}

// Interface que define O QUE o contexto vai fornecer
interface TransactionContextType {
  transactions: Transaction[]; // Array com todas as transações
  addTransaction: (transactionData: TransactionData) => Promise<void>;
  updateTransaction: (
    id: string,
    transactionData: TransactionUpdateData
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  calculateTotal: () => number; // Função para calcular saldo total
  loading: boolean; // Estado de carregamento
  error: string | null; // Mensagens de erro
}

// Cria o contexto com valor inicial undefined
const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

// COMPONENTE PROVIDER - Fornece os dados do contexto para a árvore de componentes
export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado das transações - Array vazio inicial
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Estado de loading - Controla spinners/feedback visual
  const [loading, setLoading] = useState<boolean>(false);

  // Estado de erro - Armazena mensagens de erro
  const [error, setError] = useState<string | null>(null);

  // useEffect #1: CARREGA TRANSAÇÕES DO LOCALSTORAGE NA MONTAGEM
  useEffect(() => {
    // Tenta buscar transações salvas no localStorage do navegador
    const savedTransactions = localStorage.getItem("transactions");

    if (savedTransactions) {
      try {
        // Converte string JSON para objeto JavaScript
        const parsedTransactions = JSON.parse(savedTransactions);

        // Converte strings de data para objetos Date
        const transactionsWithDates = parsedTransactions.map((t: any) => ({
          ...t, // Spread operator - copia todas propriedades existentes
          date: new Date(t.date),
          createdAt: new Date(t.createdAt),
          updatedAt: new Date(t.updatedAt),
        }));

        // Atualiza o estado com as transações convertidas
        setTransactions(transactionsWithDates);
      } catch (err) {
        // Se der erro ao parsear, limpa o localStorage corrompido
        console.error("Erro ao parsear transações do localStorage:", err);
        localStorage.removeItem("transactions");
      }
    }
  }, []); // Array vazio = executa apenas na montagem

  // useEffect #2: SALVA TRANSAÇÕES NO LOCALSTORAGE QUANDO ELAS MUDAM
  useEffect(() => {
    if (transactions.length > 0) {
      // Converte objetos Date para strings ISO antes de salvar
      const transactionsToSave = transactions.map((transaction) => ({
        ...transaction,
        date: transaction.date.toISOString(),
        createdAt: transaction.createdAt.toISOString(),
        updatedAt: transaction.updatedAt.toISOString(),
      }));

      // Salva no localStorage como string JSON
      localStorage.setItem("transactions", JSON.stringify(transactionsToSave));
    }
  }, [transactions]); // Executa quando 'transactions' mudar

  // FUNÇÃO PARA ADICIONAR NOVA TRANSAÇÃO
  const addTransaction = async (
    transactionData: TransactionData
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // VALIDAÇÃO: Verifica se campos obrigatórios estão preenchidos
      if (
        !transactionData.type ||
        !transactionData.description ||
        !transactionData.category ||
        !transactionData.amount
      ) {
        throw new Error("Todos os campos são obrigatórios");
      }

      // CRIA NOVA TRANSAÇÃO com dados do formulário + metadados
      const newTransaction: Transaction = {
        id: Date.now().toString(), // ID único baseado no timestamp atual
        type: transactionData.type,
        description: transactionData.description,
        category: transactionData.category,
        amount: parseFloat(transactionData.amount.toString()), // Garante que é número
        date: new Date(transactionData.date), // Converte string para Date
        userId: transactionData.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // UI OTIMISTA: Atualiza estado IMEDIATAMENTE
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
    } catch (err) {
      // TRATAMENTO DE ERRO: Captura e mostra erro para o usuário
      setError(
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao criar transação"
      );
      throw err;
    } finally {
      // SEMPRE executa - finaliza loading
      setLoading(false);
    }
  };

  // FUNÇÃO PARA ATUALIZAR TRANSAÇÃO EXISTENTE
  const updateTransaction = async (
    id: string,
    transactionData: TransactionUpdateData
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // ATUALIZA ESTADO: Percorre array e atualiza apenas a transação com ID correspondente
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === id
            ? {
                ...transaction,
                ...transactionData,
                updatedAt: new Date(),
                date: transactionData.date
                  ? new Date(transactionData.date)
                  : transaction.date,
                amount: transactionData.amount
                  ? parseFloat(transactionData.amount.toString())
                  : transaction.amount,
                type: (transactionData.type || transaction.type) as
                  | "receita"
                  | "despesa",
              }
            : transaction
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // FUNÇÃO PARA DELETAR TRANSAÇÃO
  const deleteTransaction = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // FILTRA ARRAY: Remove a transação com ID correspondente
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // FUNÇÃO PARA CALCULAR SALDO TOTAL
  const calculateTotal = (): number => {
    // Reduce percorre todas transações e acumula o total
    return transactions.reduce((total, transaction) => {
      return transaction.type === "receita"
        ? total + transaction.amount // Soma se for receita
        : total - transaction.amount; // Subtrai se for despesa
    }, 0); // Valor inicial 0
  };

  // VALOR DO CONTEXTO - tudo que será disponibilizado para os componentes
  const contextValue: TransactionContextType = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    calculateTotal,
    loading,
    error,
  };

  // Retorna o Provider com o valor do contexto envolvendo os children
  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};

// HOOK PERSONALIZADO para usar o contexto
export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);

  // Verifica se o hook está sendo usado dentro de um Provider
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }

  return context;
};
