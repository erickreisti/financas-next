// prisma.config.ts
// Importa dotenv para carregar variáveis de ambiente do arquivo .env
import "dotenv/config";

// Importa função para definir configuração do Prisma
import { defineConfig } from "prisma/config";

// Importa path para manipular caminhos de arquivos
import path from "node:path";

// Exporta configuração do Prisma
export default defineConfig({
  // Caminho para o arquivo schema.prisma
  schema: path.join(__dirname, "prisma", "schema.prisma"),

  // Configurações experimentais (ativadas para funcionalidades avançadas)
  experimental: {
    // Habilita adapter para uso com driver adapters
    adapter: true,
    // Habilita suporte para tabelas externas
    externalTables: true,
    // Habilita Prisma Studio experimental
    studio: true,
  },

  // Configurações de migrações
  migrations: {
    // Caminho para pasta de migrações
    path: path.join(__dirname, "prisma", "migrations"),
  },
});
