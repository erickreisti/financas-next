// src/types/transaction.ts
// Tipos unificados para transações - USADOS EM TODO PROJETO

// Interface para dados de transação PARA CRIAÇÃO (sem ID)
// ✅ TransactionData = dados que usuário digita (sem ID ainda)
interface TransactionData {
  type: "receita" | "despesa"; // Tipo restrito a essas duas opções
  description: string; // Descrição obrigatória (texto)
  category: string; // Categoria obrigatória (texto)
  amount: number; // Valor numérico (decimal)
  date: string; // Data em formato ISO string
  userId: string; // ID do usuário proprietário (chave estrangeira)
}

// Interface para transação COMPLETA (com ID - já criada no banco)
// ✅ Transaction = dados completos (com ID gerado pelo banco)
interface Transaction extends TransactionData {
  id: number; // ID único da transação (gerado pelo banco)
  createdAt: string; // Data de criação (string ISO)
  updatedAt: string; // Data de atualização (string ISO)
}

// Interface para transação do Prisma (tipagem automática)
// ✅ PrismaTransaction = tipagem exata do Prisma Client
interface PrismaTransaction {
  id: number; // ID numérico
  type: "receita" | "despesa"; // Tipo restrito
  description: string; // Descrição
  category: string; // Categoria
  amount: number; // Valor decimal
  date: Date; // Data como objeto Date (Prisma usa Date)
  userId: string; // ID do usuário
  createdAt: Date; // Data criação como Date
  updatedAt: Date; // Data atualização como Date
}

// Exporta tipos para serem usados em outros arquivos
// ✅ EXPORTAÇÃO EXPLÍCITA PARA REUTILIZAÇÃO
export type { TransactionData, Transaction, PrismaTransaction };
