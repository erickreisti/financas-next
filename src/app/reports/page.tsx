// src/app/reports/page.tsx
// Importa cliente Prisma
import { prisma } from "@/lib/prisma";

// Server Component - roda no servidor
export default async function ReportsPage() {
  // Buscar dados para relatórios
  const totalReceitas = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      type: "receita",
    },
  });

  const totalDespesas = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      type: "despesa",
    },
  });

  const saldoFinal =
    (totalReceitas._sum.amount || 0) - (totalDespesas._sum.amount || 0);

  // Buscar transações por categoria
  const transactionsByCategory = await prisma.transaction.groupBy({
    by: ["category", "type"],
    _sum: {
      amount: true,
    },
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">📈 Relatórios</h1>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total de Receitas</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            R$ {(totalReceitas._sum.amount || 0).toFixed(2).replace(".", ",")}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total de Despesas</h3>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            R$ {(totalDespesas._sum.amount || 0).toFixed(2).replace(".", ",")}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Saldo Final</h3>
          <p
            className={`text-2xl font-bold ${
              saldoFinal >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            R$ {saldoFinal.toFixed(2).replace(".", ",")}
          </p>
        </div>
      </div>

      {/* Análise por categoria */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Análise por Categoria</h2>
        {transactionsByCategory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transactionsByCategory.map((group, index) => (
              <div
                key={`${group.category}-${group.type}-${index}`}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{group.category}</span>
                  <span
                    className={`font-bold ${
                      group.type === "receita"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {group.type === "receita" ? "+" : "-"}
                    R$ {(group._sum.amount || 0).toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {group.type === "receita" ? "Receita" : "Despesa"}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>Nenhuma transação encontrada para análise</p>
          </div>
        )}
      </div>
    </div>
  );
}
