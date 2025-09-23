// src/app/transactions/page.tsx
// Importa cliente Prisma
import { prisma } from "@/lib/prisma";

// Server Component - roda no servidor
export default async function TransactionsPage() {
  // Buscar transações do banco de dados
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📋 Transações</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
          + Nova Transação
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white">
            <option>Todas</option>
            <option>Receitas</option>
            <option>Despesas</option>
          </select>

          <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white">
            <option>Todas as categorias</option>
            <option>Salário</option>
            <option>Alimentação</option>
            <option>Transporte</option>
          </select>

          <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg font-semibold transition-colors">
            📅 Ordenar por data
          </button>
        </div>
      </div>

      {/* Lista de transações */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {transactions.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{transaction.description}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.category} •{" "}
                      {new Date(transaction.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      transaction.type === "receita"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {transaction.type === "receita" ? "+" : "-"}
                    R$ {transaction.amount.toFixed(2).replace(".", ",")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Nenhuma transação encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}
