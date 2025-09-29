// src/components/TransactionForm.tsx
// Diretiva use client - marca componente como Client Component (interativo)
"use client";

// Importa React e hooks necessários
import { useState } from "react"; // ✅ Hook para gerenciar estado local
import { createTransaction } from "@/actions/transactionActions"; // ✅ Server Action para criar transação

// Interface para definir props recebidas pelo componente
interface TransactionFormProps {
  userId: string; // ID do usuário logado (necessário para associar transação)
}

// Componente funcional TransactionForm - recebe userId como prop
export function TransactionForm({ userId }: TransactionFormProps) {
  // Estados locais para gerenciar o formulário
  const [isPending, setIsPending] = useState(false); // ✅ Estado para loading/spinner
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null); // ✅ Estado para mensagens de feedback

  // Função assíncrona para lidar com o submit do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previne comportamento padrão (reload da página)

    // Inicia estado de loading
    setIsPending(true);
    setMessage(null); // Limpa mensagens anteriores

    try {
      // Obtém dados do formulário usando FormData API
      const formData = new FormData(e.currentTarget);

      // Cria objeto com dados da transação
      const data = {
        type: formData.get("type") as string, // Tipo da transação
        description: formData.get("description") as string, // Descrição
        category: formData.get("category") as string, // Categoria
        amount: parseFloat(formData.get("amount") as string), // Valor (convertido para número)
        date: formData.get("date") as string, // Data
        userId: userId, // ID do usuário (da prop)
      };

      // Chama Server Action para criar transação no servidor
      const result = await createTransaction(data);

      // Verifica resultado da operação
      if (result.success) {
        // Se sucesso, mostra mensagem positiva
        setMessage({ type: "success", text: "Transação criada com sucesso!" });
        e.currentTarget.reset(); // Limpa formulário
      } else {
        // Se erro, mostra mensagem negativa
        setMessage({
          type: "error",
          text: result.error || "Erro ao criar transação",
        });
      }
    } catch (error) {
      // Trata erros inesperados
      setMessage({ type: "error", text: "Erro ao processar formulário" });
    } finally {
      // Finaliza estado de loading independentemente do resultado
      setIsPending(false);
    }
  };

  // Retorna JSX (HTML-like syntax) do componente
  return (
    // Div container com estilos do Tailwind CSS
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      {/* Título do formulário */}
      <h2 className="text-xl font-semibold mb-4">➕ Nova Transação</h2>

      {/* Formulário com onSubmit chamando handleSubmit */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo de seleção para tipo de transação */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo
          </label>
          <select
            name="type"
            required // Campo obrigatório
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Selecione o tipo</option>
            <option value="receita">🟢 Receita</option>
            <option value="despesa">🔴 Despesa</option>
          </select>
        </div>

        {/* Campo de texto para descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descrição
          </label>
          <input
            type="text"
            name="description"
            placeholder="Descrição da transação"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Campo de seleção para categoria */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoria
          </label>
          <select
            name="category"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Selecione a categoria</option>
            <option value="salario">Salário</option>
            <option value="alimentacao">Alimentação</option>
            <option value="transporte">Transporte</option>
            <option value="lazer">Lazer</option>
            <option value="saude">Saúde</option>
            <option value="educacao">Educação</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        {/* Campo de número para valor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Valor (R$)
          </label>
          <input
            type="number"
            name="amount"
            step="0.01" // Permite casas decimais
            placeholder="0,00"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Campo de data */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data
          </label>
          <input
            type="date"
            name="date"
            defaultValue={new Date().toISOString().split("T")[0]} // Data atual por padrão
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Mensagem de feedback (sucesso ou erro) */}
        {message && (
          <div
            className={`p-3 rounded-md ${
              message.type === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Botão de submit com estado de loading */}
        <button
          type="submit"
          disabled={isPending} // Desabilita durante loading
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Processando..." : "➕ Adicionar Transação"}
        </button>
      </form>
    </div>
  );
}
