// src/components/TransactionForm.tsx
// Diretiva use client - componente interativo
"use client";

// Importa React e hooks
import React, { useState } from "react";

// Interface para dados de transação SEM ID (para criação)
// ✅ TransactionData = dados que usuário digita (sem ID ainda)
interface TransactionData {
  type: "receita" | "despesa"; // Tipo restrito a essas duas opções
  description: string; // Descrição obrigatória
  category: string; // Categoria obrigatória
  amount: number; // Valor numérico
  date: Date; // Data como objeto Date
  userId: string; // ID do usuário proprietário
}

// Interface para definir o formato das props recebidas
interface TransactionFormProps {
  userId: string; // ID do usuário logado (necessário para associar transação)
  onAddTransaction: (transactionData: TransactionData) => Promise<void>; // ✅ AGORA RECEBE TransactionData (sem ID)
}

// Componente TransactionForm: formulário para adicionar transações
// Recebe props tipadas
const TransactionForm = ({
  userId,
  onAddTransaction,
}: TransactionFormProps) => {
  // Estados locais para loading e mensagens
  const [isPending, setIsPending] = useState(false); // ✅ Estado para loading/spinner
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null); // ✅ Estado para mensagens de feedback

  // Função para lidar com submit do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previne comportamento padrão (reload da página)

    // Inicia estado de loading
    setIsPending(true);
    setMessage(null); // Limpa mensagens anteriores

    try {
      // Obtém dados do formulário usando FormData API
      const formData = new FormData(e.currentTarget);

      // Cria objeto TransactionData (sem ID) para envio ao contexto
      const transactionData: TransactionData = {
        type: formData.get("type") as "receita" | "despesa", // Type assertion
        description: formData.get("description") as string, // Descrição
        category: formData.get("category") as string, // Categoria
        amount: parseFloat(formData.get("amount") as string), // Valor convertido
        date: new Date(formData.get("date") as string), // ✅ Date convertida
        userId: userId, // ID do usuário
      };

      // Chama Server Action com dados validados - CORREÇÃO 11
      await onAddTransaction(transactionData); // ✅ AGORA RECEBE TransactionData (sem ID)

      // Se sucesso, mostra mensagem positiva e limpa formulário
      setMessage({ type: "success", text: "Transação criada com sucesso!" });
      e.currentTarget.reset(); // Limpa formulário
    } catch (error) {
      // Trata erros inesperados
      setMessage({ type: "error", text: "Erro ao processar formulário" });
    } finally {
      // Finaliza estado de loading independentemente do resultado
      setIsPending(false);
    }
  };

  // Retorna JSX do componente
  return (
    // Formulário com onSubmit chamando handleSubmit
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Select para tipo de transação */}
      <div>
        <select
          name="type"
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Selecione o tipo</option>
          <option value="receita">🟢 Receita</option>
          <option value="despesa">🔴 Despesa</option>
        </select>
      </div>

      {/* Input para descrição */}
      <div>
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Select para categoria */}
      <div>
        <select
          name="category"
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-50500 dark:bg-gray-700 dark:text-white"
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

      {/* Input para valor */}
      <div>
        <input
          type="number"
          name="amount"
          placeholder="Valor (R$)"
          step="0.01"
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Input para data */}
      <div>
        <input
          type="date"
          name="date"
          defaultValue={new Date().toISOString().split("T")[0]}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Mensagens de feedback */}
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

      {/* Botão de submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Processando..." : "➕ Adicionar"}
      </button>
    </form>
  );
};

export default TransactionForm;
