// src/app/reports/page.tsx
// Server Component - roda no servidor
export default async function ReportsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">📈 Relatórios</h1>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total de Receitas</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            R$ 0,00
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total de Despesas</h3>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            R$ 0,00
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Saldo Final</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            R$ 0,00
          </p>
        </div>
      </div>

      {/* Gráficos (placeholder) */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Análise por Categoria</h2>
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>Gráficos e análises aparecerão aqui</p>
        </div>
      </div>
    </div>
  );
}
