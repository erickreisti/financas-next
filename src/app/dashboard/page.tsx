// src/app/dashboard/page.tsx
// Importa cliente Prisma
import { prisma } from "@/lib/prisma";

// Server Component - roda no servidor
export default async function DashboardPage() {
  // Buscar dados reais do banco de dados
  try {
    // Buscar todas transações (limitar para teste)
    const transactions = await prisma.transaction.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
      include: {
        user: true, // Incluir dados do usuário
      },
    });

    // Calcular totais
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

    // Calcular saldo total
    const saldoTotal =
      (totalReceitas._sum.amount || 0) - (totalDespesas._sum.amount || 0);

    // Retornar JSX com dados reais
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">📊 Dashboard</h1>

        {/* Seção de saldo total */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Saldo Total</h2>
          <p className="text-3xl font-bold">
            R$ {saldoTotal.toFixed(2).replace(".", ",")}
          </p>
        </div>

        {/* Grid de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Receitas */}
          <div className="bg-green-100 dark:bg-green-900/30 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              Receitas
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              R$ {(totalReceitas._sum.amount || 0).toFixed(2).replace(".", ",")}
            </p>
          </div>

          {/* Despesas */}
          <div className="bg-red-100 dark:bg-red-900/30 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Despesas
            </h3>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              R$ {(totalDespesas._sum.amount || 0).toFixed(2).replace(".", ",")}
            </p>
          </div>

          {/* Saldo */}
          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Saldo
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              R$ {saldoTotal.toFixed(2).replace(".", ",")}
            </p>
          </div>
        </div>

        {/* Últimas transações */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
          {transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700"
                >
                  <div>
                    <p className="font-semibold">{transaction.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.category} •{" "}
                      {new Date(transaction.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div
                    className={`font-bold ${
                      transaction.type === "receita"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {transaction.type === "receita" ? "+" : "-"}
                    R$ {transaction.amount.toFixed(2).replace(".", ",")}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Nenhuma transação encontrada</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    // Em caso de erro, mostrar mensagem amigável
    console.error("Erro ao buscar dados do dashboard:", error);
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">📊 Dashboard</h1>
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
            Erro ao carregar dados
          </h2>
          <p className="text-red-600 dark:text-red-400">
            Não foi possível carregar as informações do dashboard. Tente
            novamente mais tarde.
          </p>
        </div>
      </div>
    );
  }
}
