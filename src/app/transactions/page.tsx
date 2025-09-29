// src/app/transactions/page.tsx
// Importa cliente Prisma e componentes
import { prisma } from "@/lib/prisma";
import { TransactionForm } from "@/components/TransactionForm";

// Server Component - roda no servidor (assíncrono)
export default async function TransactionsPage() {
  // Busca transações do banco de dados usando Prisma Client
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: "desc", // Ordena por data descendente (mais recentes primeiro)
    },
    include: {
      user: true, // Inclui dados do usuário relacionado
    },
  });

  // Buscar usuário fictício para teste (em produção virá da autenticação)
  const user = await prisma.user.findFirst();
  const userId = user?.id || "user-test-id"; // Usa ID do usuário ou ID de teste

  return (
    <div className="container mx-auto py-8">
      {/* Cabeçalho da página */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📋 Transações</h1>
      </div>

      {/* Formulário de nova transação */}
      <div className="mb-8">
        {/* Componente de formulário recebendo userId */}
        <TransactionForm userId={userId} />
      </div>

      {/* Lista de transações */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {transactions.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* Mapeia array de transações para elementos JSX */}
            {transactions.map((transaction) => (
              // Cada item da lista com key única (importante para React)
              <div
                key={transaction.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                {/* Layout flexível para conteúdo da transação */}
                <div className="flex justify-between items-center">
                  {/* Informações da transação */}
                  <div>
                    <p className="font-semibold">{transaction.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.category} •{" "}
                      {new Date(transaction.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  {/* Valor da transação com cor condicional */}
                  <div
                    className={`text-lg font-bold ${
                      transaction.type === "receita"
                        ? "text-green-600 dark:text-green-400" // Verde para receitas
                        : "text-red-600 dark:text-red-400" // Vermelho para despesas
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
