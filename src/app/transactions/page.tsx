// src/app/transactions/page.tsx
// Server Component - roda no servidor
export default async function TransactionsPage() {
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
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Nenhuma transação encontrada</p>
        </div>
      </div>
    </div>
  );
}
