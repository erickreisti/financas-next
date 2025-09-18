// src/lib/prisma.ts
// Importa o cliente Prisma gerado
import { PrismaClient } from "@prisma/client";

// Declaração global para evitar múltiplas instâncias em desenvolvimento
declare global {
  var prisma: PrismaClient | undefined;
}

// Cria instância do Prisma Client
// Em desenvolvimento: reutiliza a instância global
// Em produção: cria nova instância
const client = globalThis.prisma || new PrismaClient();

// Em desenvolvimento, salva a instância na global
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

// Exporta o cliente
export const prisma = client;
