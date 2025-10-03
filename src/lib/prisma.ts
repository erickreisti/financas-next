// src/lib/prisma.ts
// Importa o cliente Prisma gerado automaticamente
import { PrismaClient } from "@prisma/client";

// Declaração global para evitar múltiplas instâncias em desenvolvimento
// ✅ EVITA ERROS DE CONEXÃO NO HOT RELOADING DO NEXT.JS
declare global {
  var prisma: PrismaClient | undefined; // Variável global para compartilhar instância
}

// Cria instância do Prisma Client
// ✅ SINGLETON PATTERN PARA GERENCIAR CONEXÃO COM BANCO
const client = globalThis.prisma || new PrismaClient();

// Em desenvolvimento, salva a instância na global para reutilização
// ✅ EVITA MÚLTIPLAS CONEXÕES EM DESENVOLVIMENTO
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

// Exporta o cliente para ser usado em outros arquivos
// ✅ EXPORTAÇÃO ÚNICA PARA USO EM TODO PROJETO
export const prisma = client;
