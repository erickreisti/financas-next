// src/lib/prisma.ts
// Importa cliente Prisma gerado automaticamente
import { PrismaClient } from "@prisma/client";

// Declaração global para evitar múltiplas instâncias em desenvolvimento
// Isso previne erros de conexão quando Next.js faz hot reloading
declare global {
  var prisma: PrismaClient | undefined;
}

// Cria instância do Prisma Client
// Em desenvolvimento: reutiliza instância global
// Em produção: cria nova instância
const client = globalThis.prisma || new PrismaClient();

// Em desenvolvimento, salva instância na variável global
// Isso evita criar múltiplas conexões com o banco
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

// Exporta cliente para uso em toda aplicação
export const prisma = client;
