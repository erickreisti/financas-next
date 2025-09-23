// src/app/dashboard/page.tsx
// Server Component - roda no servidor
export default async function DashboardPage() {
  // TODO: Buscar dados do banco de dados

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">📊 Dashboard</h1>

      {/* Seção de saldo total */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Saldo Total</h2>
        <p className="text-3xl font-bold">R$ 0,00</p>
      </div>

      {/* Grid de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Receitas */}
        <div className="bg-green-100 dark:bg-green-900/30 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            Receitas
          </h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            R$ 0,00
          </p>
        </div>

        {/* Despesas */}
        <div className="bg-red-100 dark:bg-red-900/30 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Despesas
          </h3>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            R$ 0,00
          </p>
        </div>

        {/* Saldo */}
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Saldo
          </h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            R$ 0,00
          </p>
        </div>
      </div>

      {/* Últimas transações */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Nenhuma transação encontrada</p>
        </div>
      </div>
    </div>
  );
}
