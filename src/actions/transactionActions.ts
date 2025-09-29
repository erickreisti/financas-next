// src/actions/transactionActions.ts
// Diretiva use server - marca arquivo como Server Actions
"use server";

// Importa cliente Prisma e funções auxiliares do Next.js
import { prisma } from "@/lib/prisma"; // ✅ Cliente Prisma para banco de dados
import { revalidatePath } from "next/cache"; // ✅ Função para revalidar cache de páginas

// Interface para definir a estrutura dos dados de transação
// Isso garante type safety - o TypeScript sabe exatamente quais campos esperar
interface TransactionData {
  type: string; // Tipo: "receita" ou "despesa"
  description: string; // Descrição da transação
  category: string; // Categoria (ex: alimentação, transporte)
  amount: number; // Valor numérico da transação
  date: string; // Data em formato string
  userId: string; // ID do usuário proprietário
}

// Server Action para CRIAR uma nova transação
// Função assíncrona que recebe dados tipados de TransactionData
export async function createTransaction(data: TransactionData) {
  try {
    // Validação de dados de entrada - verifica se campos obrigatórios existem
    if (
      !data.type ||
      !data.description ||
      !data.category ||
      !data.amount ||
      !data.userId
    ) {
      return { success: false, error: "Todos os campos são obrigatórios" };
    }

    // Cria transação no banco de dados usando Prisma Client
    const transaction = await prisma.transaction.create({
      data: {
        // Dados a serem inseridos no banco
        type: data.type as "receita" | "despesa", // Type assertion para tipagem segura
        description: data.description, // Descrição da transação
        category: data.category, // Categoria
        amount: parseFloat(data.amount.toString()), // Converte para número float
        date: new Date(data.date), // Converte string para objeto Date
        userId: data.userId, // ID do usuário
      },
    });

    // Revalida (atualiza) o cache das páginas afetadas
    // Isso garante que usuários vejam dados atualizados imediatamente
    revalidatePath("/dashboard"); // Atualiza dashboard
    revalidatePath("/transactions"); // Atualiza página de transações
    revalidatePath("/reports"); // Atualiza página de relatórios

    // Retorna objeto de sucesso com a transação criada
    return { success: true, transaction };
  } catch (error) {
    // Em caso de erro, loga no console e retorna mensagem amigável
    console.error("Erro ao criar transação:", error);
    return { success: false, error: "Erro ao criar transação" };
  }
}

// Server Action para ATUALIZAR uma transação existente
// Recebe ID da transação e dados parciais (nem todos campos são obrigatórios)
export async function updateTransaction(
  id: string,
  data: Partial<TransactionData>
) {
  try {
    // Atualiza transação no banco usando Prisma
    const transaction = await prisma.transaction.update({
      where: { id }, // Condição: encontre transação com este ID
      data: {
        // Dados a serem atualizados
        ...data, // Espalha (spread) todos dados recebidos
        amount: data.amount ? parseFloat(data.amount.toString()) : undefined,
        date: data.date ? new Date(data.date) : undefined,
      },
    });

    // Revalida cache das páginas afetadas pela atualização
    revalidatePath("/dashboard");
    revalidatePath("/transactions");
    revalidatePath("/reports");

    // Retorna sucesso com transação atualizada
    return { success: true, transaction };
  } catch (error) {
    // Trata erro de atualização
    console.error("Erro ao atualizar transação:", error);
    return { success: false, error: "Erro ao atualizar transação" };
  }
}

// Server Action para DELETAR uma transação
// Recebe apenas o ID da transação a ser deletada
export async function deleteTransaction(id: string) {
  try {
    // Deleta transação do banco usando Prisma
    await prisma.transaction.delete({
      where: { id }, // Condição: delete transação com este ID
    });

    // Revalida cache das páginas afetadas pela deleção
    revalidatePath("/dashboard");
    revalidatePath("/transactions");
    revalidatePath("/reports");

    // Retorna sucesso (não precisa retornar transação deletada)
    return { success: true };
  } catch (error) {
    // Trata erro de deleção
    console.error("Erro ao deletar transação:", error);
    return { success: false, error: "Erro ao deletar transação" };
  }
}

// Server Action para BUSCAR transações com filtros
// Recebe objeto opcional com filtros de busca
export async function getTransactions(filters?: {
  type?: string; // Filtro por tipo (receita/despesa)
  category?: string; // Filtro por categoria
  startDate?: string; // Data inicial
  endDate?: string; // Data final
}) {
  try {
    // Constrói objeto where dinamicamente baseado nos filtros
    const where: any = {}; // any para permitir construção dinâmica

    // Aplica filtro por tipo se fornecido e não for "todas"
    if (filters?.type && filters.type !== "todas") {
      where.type = filters.type;
    }

    // Aplica filtro por categoria se fornecido e não for "todas"
    if (filters?.category && filters.category !== "todas") {
      where.category = filters.category;
    }

    // Aplica filtros de data se fornecidos
    if (filters?.startDate || filters?.endDate) {
      where.date = {}; // Inicializa objeto de data
      if (filters.startDate) {
        where.date.gte = new Date(filters.startDate); // Maior ou igual à data inicial
      }
      if (filters.endDate) {
        where.date.lte = new Date(filters.endDate); // Menor ou igual à data final
      }
    }

    // Busca transações no banco com filtros aplicados
    const transactions = await prisma.transaction.findMany({
      where, // Condições de busca
      orderBy: {
        date: "desc", // Ordena por data descendente (mais recentes primeiro)
      },
      include: {
        user: true, // Inclui dados do usuário relacionado
      },
    });

    // Retorna sucesso com array de transações encontradas
    return { success: true, transactions };
  } catch (error) {
    // Trata erro de busca
    console.error("Erro ao buscar transações:", error);
    return { success: false, error: "Erro ao buscar transações" };
  }
}
