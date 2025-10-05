// src/components/TransactionForm.tsx
// Diretiva use client - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa React e hooks para criar componente interativo
import React, { useState } from "react";

// Interface para definir a estrutura de dados de transação PARA CRIAÇÃO (sem ID)
// ✅ TransactionData = dados que usuário digita (sem ID ainda)
interface TransactionData {
  type: "receita" | "despesa"; // Tipo restrito a essas duas opções apenas
  description: string; // Descrição obrigatória (texto)
  category: string; // Categoria obrigatória (texto)
  amount: number; // Valor numérico (decimal)
  date: string; // Data em formato ISO string
  userId: string; // ID do usuário proprietário (chave estrangeira)
}

// Interface para definir a estrutura de uma transação COMPLETA (com ID - do banco)
// ✅ Transaction = dados completos (com ID gerado pelo banco)
interface Transaction extends TransactionData {
  id: string; // ID único (gerado pelo banco)
  createdAt: string; // Data de criação (gerada pelo banco)
  updatedAt: string; // Data de atualização (gerada pelo banco)
}

// Interface para definir o formato das props recebidas pelo componente
// ✅ CONTRATO EXPLÍCITO DO QUE O COMPONENTE ESPERA RECEBER
interface TransactionFormProps {
  userId: string; // ID do usuário logado (necessário para associar transação)
  onAddTransaction: (transactionData: TransactionData) => Promise<void>; // ✅ AGORA RECEBE TransactionData (sem ID)
}

// Componente TransactionForm: formulário para adicionar transações
// Recebe props tipadas via TransactionFormProps
const TransactionForm = ({
  userId,
  onAddTransaction,
}: TransactionFormProps) => {
  // Estados locais para loading e mensagens de feedback
  // ✅ useState COM TIPAGEM EXPLÍCITA
  const [isPending, setIsPending] = useState(false); // Estado para loading/spinner
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null); // Estado para mensagens

  // Função assíncrona para lidar com submit do formulário
  // ✅ FUNÇÃO ASSÍNCRONA PARA OPERAÇÕES DE BANCO DE DADOS
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previne comportamento padrão (reload da página)
    setIsPending(true); // Inicia estado de loading
    setMessage(null); // Limpa mensagens anteriores

    try {
      // Obtém dados do formulário usando FormData API
      // ✅ FormData API PARA EXTRAÇÃO DE DADOS DO FORMULÁRIO
      const formData = new FormData(e.currentTarget);

      // Cria objeto TransactionData (sem ID) para envio ao contexto
      // ✅ CRIA TransactionData (sem ID) PARA ENVIO AO CONTEXTO
      const transactionData: TransactionData = {
        type: formData.get("type") as "receita" | "despesa", // Type assertion para tipagem segura
        description: formData.get("description") as string, // Descrição
        category: formData.get("category") as string, // Categoria
        amount: parseFloat(formData.get("amount") as string), // Valor convertido para número
        date: formData.get("date") as string, // Data
        userId: userId, // ID do usuário (da prop)
      };

      // ✅ CHAMAR onAddTransaction COM TransactionData (sem ID)
      // Isso resolve o erro de incompatibilidade de tipos!
      await onAddTransaction(transactionData);

      // Se sucesso, mostra mensagem positiva e limpa formulário
      // ✅ FEEDBACK POSITIVO AO USUÁRIO
      setMessage({ type: "success", text: "Transação criada com sucesso!" });
      e.currentTarget.reset(); // Limpa formulário
    } catch (error) {
      // Em caso de erro, mostra mensagem negativa
      // ✅ TRATAMENTO DE ERROS COM FEEDBACK AO USUÁRIO
      setMessage({ type: "error", text: "Erro ao adicionar transação" });
    } finally {
      // Finaliza estado de loading independentemente do resultado
      // ✅ FINALIZAÇÃO OTIMISTA DE ESTADO
      setIsPending(false);
    }
  };

  // Retorna JSX do componente
  // ✅ JSX COM ESTADOS CONTROLADOS E EVENT HANDLERS
  return (
    // Formulário com onSubmit chamando handleSubmit
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Select para tipo de transação */}
      <div>
        <select
          name="type" // Name para FormData API
          required // Campo obrigatório
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
          type="text" // Tipo de input texto
          name="description" // Name para FormData API
          placeholder="Descrição" // Texto de ajuda quando vazio
          required // Campo obrigatório
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Select para categoria */}
      <div>
        <select
          name="category" // Name para FormData API
          required // Campo obrigatório
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

      {/* Input para valor */}
      <div>
        <input
          type="number" // Tipo de input número
          name="amount" // Name para FormData API
          placeholder="Valor (R$)" // Texto de ajuda quando vazio
          step="0.01" // Permite casas decimais
          required // Campo obrigatório
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Input para data */}
      <div>
        <input
          type="date" // Tipo de input data
          name="date" // Name para FormData API
          defaultValue={new Date().toISOString().split("T")[0]} // Data atual por padrão
          required // Campo obrigatório
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
        type="submit" // Tipo de botão submit
        disabled={isPending} // Desabilita durante loading
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Processando..." : "➕ Adicionar"}
      </button>
    </form>
  );
};

// Exporta o componente para ser usado em outros arquivos
// ✅ EXPORTAÇÃO PADRÃO PARA REUTILIZAÇÃO
export default TransactionForm;
