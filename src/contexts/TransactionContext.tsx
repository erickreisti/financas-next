// src/contexts/TransactionContext.tsx
// ✅ DIRETIVA USE CLIENT - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa React e hooks necessários para criar contexto
// createContext: cria contexto para compartilhar dados globalmente
// useContext: hook para consumir dados de um contexto
// useState: hook para gerenciar estado local
// useEffect: hook para efeitos colaterais (carregar/salvar dados)
import React, { createContext, useContext, useState, useEffect } from "react";

// Importa cliente Prisma para operações de banco de dados
// prisma: instância do Prisma Client para interagir com o banco
import { prisma } from "@/lib/prisma";

// Interface para definir a estrutura de uma transação financeira
// ✅ TIPAGEM EXPLÍCITA PARA SEGURANÇA E AUTO-COMPLETE
interface Transaction {
  id: string; // ID único da transação (string CUID do Prisma)
  type: "receita" | "despesa"; // Tipo restrito a essas duas opções apenas
  description: string; // Descrição obrigatória (texto)
  category: string; // Categoria obrigatória (texto)
  amount: number; // Valor numérico (decimal)
  date: Date; // Data como objeto Date (não string)
  userId: string; // ID do usuário proprietário (chave estrangeira)
  createdAt: Date; // Data de criação como objeto Date
  updatedAt: Date; // Data de atualização como objeto Date
}

// Interface para definir o que o contexto de transações vai fornecer
// ✅ CONTRATO EXPLÍCITO DO QUE O CONTEXTO OFERECE PARA COMPONENTES
interface TransactionContextType {
  transactions: Transaction[]; // Array de todas transações
  addTransaction: (transaction: Transaction) => Promise<void>; // Função adicionar transação
  deleteTransaction: (id: string) => Promise<void>; // Função deletar transação pelo ID
  calculateTotal: () => number; // Função calcular saldo total
}

// Cria o contexto com valor inicial undefined
// ✅ CRIAÇÃO DO CONTEXTO COM TIPAGEM SEGURA
const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

// Componente Provider: fornece os dados do contexto para toda árvore de componentes
// ✅ PROVIDER É UM COMPONENTE QUE ENVOLVE OUTROS COMPONENTES
export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children, // ✅ children são os componentes filhos que vão usar o contexto
}) => {
  // Estado local para armazenar todas as transações COM TIPAGEM EXPLÍCITA
  // ✅ useState COM TIPAGEM EXPLÍCITA Transaction[]
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // useEffect: carrega transações do localStorage quando componente monta
  // ✅ useEffect PARA EFEITOS COLATERAIS (carregar dados salvos)
  useEffect(() => {
    // Tenta carregar transações salvas no navegador do usuário
    // ✅ PERSISTÊNCIA LOCAL COM localStorage
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      // Converte string JSON de volta para array de objetos
      // ✅ JSON.parse PARA CONVERTER STRING → OBJETO
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []); // Array vazio = executa só uma vez na montagem

  // useEffect: salva transações no localStorage quando elas mudam
  // ✅ useEffect PARA SINCRONIZAR ESTADO COM PERSISTÊNCIA
  useEffect(() => {
    // Converte array para string JSON e salva no navegador
    // ✅ JSON.stringify PARA CONVERTER OBJETO → STRING
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]); // Executa sempre que transactions mudar

  // Função assíncrona para adicionar nova transação ao estado
  // ✅ FUNÇÃO ASSÍNCRONA PARA OPERAÇÕES DE BANCO DE DADOS
  const addTransaction = async (transaction: Transaction): Promise<void> => {
    try {
      // Adiciona transação ao estado local primeiro (otimização UI)
      // ✅ OTIMISTA UI - atualiza interface imediatamente
      setTransactions((prevTransactions) => [...prevTransactions, transaction]);

      // Salva transação no banco de dados usando Prisma Client
      // ✅ PERSISTÊNCIA NO SERVIDOR COM PRISMA
      await prisma.transaction.create({
        data: {
          // ✅ CORREÇÃO: Objeto direto (sem aninhamento desnecessário)
          type: transaction.type as "receita" | "despesa", // Type assertion para tipagem segura
          description: transaction.description, // Descrição da transação
          category: transaction.category, // Categoria
          amount: parseFloat(transaction.amount.toString()), // Valor convertido para número
          date: transaction.date, // Data como objeto Date
          userId: transaction.userId, // ID do usuário
        },
      });
    } catch (error) {
      // Em caso de erro, remove transação do estado local
      // ✅ ROLLBACK EM CASO DE ERRO
      setTransactions((prevTransactions) =>
        prevTransactions.filter((t) => t.id !== transaction.id)
      );
      console.error("Erro ao adicionar transação:", error);
    }
  };

  // Função assíncrona para deletar transação pelo ID
  // ✅ FUNÇÃO ASSÍNCRONA PARA OPERAÇÕES DE BANCO DE DADOS
  const deleteTransaction = async (id: string): Promise<void> => {
    try {
      // Remove transação do estado local primeiro (otimização UI)
      // ✅ OTIMISTA UI - atualiza interface imediatamente
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );

      // Deleta transação do banco de dados usando Prisma Client
      // ✅ REMOÇÃO NO SERVIDOR COM PRISMA
      await prisma.transaction.delete({
        where: { id }, // Condição: deleta transação com este ID
      });
    } catch (error) {
      // Em caso de erro, recarrega transações do banco
      // ✅ RECUPERAÇÃO EM CASO DE ERRO
      const updatedTransactions = await prisma.transaction.findMany();
      setTransactions(updatedTransactions as Transaction[]);
      console.error("Erro ao deletar transação:", error);
    }
  };

  // Função para calcular saldo total (receitas - despesas)
  // ✅ FUNÇÃO PURA PARA CÁLCULO MATEMÁTICO
  const calculateTotal = (): number => {
    // Usa reduce para somar/subtrair todas as transações
    // ✅ REDUCE PARA AGREGAÇÃO DE DADOS
    return transactions.reduce((total, transaction) => {
      // Se for receita, soma o valor; se for despesa, subtrai
      // ✅ LÓGICA DE NEGÓCIO PARA CÁLCULO DE SALDO
      return transaction.type === "receita"
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0); // Começa com total = 0
  };

  // Objeto com todos os valores que o contexto de transações vai fornecer
  // ✅ VALOR DO CONTEXTO COM TODAS FUNÇÕES E DADOS
  const contextValue: TransactionContextType = {
    transactions, // Array de transações atual
    addTransaction, // Função para adicionar transação
    deleteTransaction, // Função para deletar transação
    calculateTotal, // Função para calcular saldo total
  };

  // Retorna JSX do componente Provider
  // ✅ PROVIDER ENVOLVE COMPONENTES FILHOS E FORNECE VALOR DO CONTEXTO
  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};

// Hook customizado para usar o contexto de transações
// ✅ HOOK CUSTOMIZADO PARA FACILITAR USO DO CONTEXTO EM COMPONENTES
export const useTransactions = (): TransactionContextType => {
  // Usa hook useContext para acessar o contexto de transações
  // ✅ useContext PARA CONSUMIR DADOS DO CONTEXTO GLOBAL
  const context = useContext(TransactionContext);

  // Verifica se o hook está sendo usado dentro de um TransactionProvider
  // ✅ VERIFICAÇÃO DE ERRO PARA USO CORRETO DO CONTEXTO
  if (context === undefined) {
    // Lança erro se não estiver dentro do Provider
    // ✅ MENSAGEM CLARA PARA DESENVOLVEDOR SOBRE USO INCORRETO
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }

  // Retorna o contexto se estiver tudo certo
  // ✅ RETORNO SEGuro DO CONTEXTO COM TIPAGEM CORRETA
  return context;
};
