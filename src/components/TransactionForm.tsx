// src/components/TransactionForm.tsx
// Diretiva use client - marca componente como Client Component para interatividade
"use client";

// Importa React e hooks do React
import { useState } from "react"; // ✅ Hook para gerenciar estado local

// Importa React Hook Form e resolvers Zod para validação de formulários
import { useForm } from "react-hook-form"; // ✅ Gerenciamento avançado de formulários
import { zodResolver } from "@hookform/resolvers/zod"; // ✅ Integração Zod + React Hook Form

// Importa esquemas Zod e tipos para validação type-safe
import { transactionSchema, type TransactionFormData } from "@/lib/schemas"; // ✅ Validação e tipagem

// Importa Server Action para criar transação no servidor
import { createTransaction } from "@/actions/transactionActions"; // ✅ Server Action

// Componente funcional TransactionForm - recebe userId como prop
export function TransactionForm({ userId }: { userId: string }) {
  // ✅ Tipagem explícita da prop

  // Estados locais para gerenciar loading e mensagens de feedback
  const [isPending, setIsPending] = useState(false); // ✅ Estado para spinner/loading
  const [message, setMessage] = useState<{
    // ✅ Estado para mensagens de sucesso/erro
    type: "success" | "error"; // ✅ Tipo restrito a success ou error
    text: string; // ✅ Texto da mensagem
  } | null>(null); // ✅ Pode ser null (nenhuma mensagem)

  // Configura React Hook Form com resolver Zod para validação automática
  const {
    register, // ✅ Função para registrar campos do formulário
    handleSubmit, // ✅ Função para lidar com submit do formulário
    formState: { errors }, // ✅ Estado com erros de validação
    reset, // ✅ Função para resetar formulário
  } = useForm<TransactionFormData>({
    // ✅ Tipagem type-safe do formulário
    resolver: zodResolver(transactionSchema), // ✅ Resolver Zod para validação
    defaultValues: {
      // ✅ Valores padrão para campos do formulário
      type: "receita", // ✅ Tipo padrão: receita
      date: new Date().toISOString().split("T")[0], // ✅ Data atual (formato YYYY-MM-DD)
      userId: userId, // ✅ ID do usuário logado
    },
  });

  // Função assíncrona para lidar com submit do formulário
  const onSubmit = async (data: TransactionFormData) => {
    // ✅ Dados type-safe validados
    setIsPending(true); // ✅ Iniciar estado de loading
    setMessage(null); // ✅ Limpar mensagens anteriores

    try {
      // Chamar Server Action com dados validados do formulário
      const result = await createTransaction(data); // ✅ Dados já validados pelo Zod!

      // Verificar resultado da operação
      if (result.success) {
        // Se sucesso, mostrar mensagem positiva e resetar formulário
        setMessage({ type: "success", text: "Transação criada com sucesso!" });
        reset(); // ✅ Limpar todos campos do formulário
      } else {
        // Se erro, mostrar mensagem negativa
        setMessage({
          type: "error",
          text: result.error || "Erro ao criar transação",
        });
      }
    } catch (error) {
      // Tratar erros inesperados
      setMessage({ type: "error", text: "Erro ao processar formulário" });
    } finally {
      // Finalizar estado de loading independentemente do resultado
      setIsPending(false); // ✅ Sempre finaliza loading
    }
  };

  // Retornar JSX (interface do componente)
  return (
    // Formulário com onSubmit chamando handleSubmit(onSubmit)
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Select para tipo de transação */}
      <div>
        <select
          {...register("type")} // ✅ Registrar campo com Zod (validação automática)
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {/* Opções de tipo com emojis para melhor UX */}
          <option value="receita">🟢 Receita</option>
          <option value="despesa">🔴 Despesa</option>
        </select>

        {/* Mensagem de erro automática do Zod */}
        {errors.type && (
          <p className="text-red-500 text-sm dark:text-red-400">
            {errors.type.message}{" "}
            {/* ✅ Mensagem de erro personalizada do Zod */}
          </p>
        )}
      </div>

      {/* Input para descrição da transação */}
      <div>
        <input
          {...register("description")} // ✅ Registrar campo com Zod
          placeholder="Descrição" // ✅ Placeholder para orientação
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        {/* Mensagem de erro automática do Zod */}
        {errors.description && (
          <p className="text-red-500 text-sm dark:text-red-400">
            {errors.description.message}{" "}
            {/* ✅ Mensagem de erro personalizada */}
          </p>
        )}
      </div>

      {/* Select para categoria da transação */}
      <div>
        <select
          {...register("category")} // ✅ Registrar campo com Zod
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {/* Opções de categoria */}
          <option value="salario">Salário</option>
          <option value="alimentacao">Alimentação</option>
          <option value="transporte">Transporte</option>
          <option value="lazer">Lazer</option>
          <option value="saude">Saúde</option>
          <option value="educacao">Educação</option>
          <option value="outros">Outros</option>
        </select>

        {/* Mensagem de erro automática do Zod */}
        {errors.category && (
          <p className="text-red-500 text-sm dark:text-red-400">
            {errors.category.message} {/* ✅ Mensagem de erro personalizada */}
          </p>
        )}
      </div>

      {/* Input para valor da transação */}
      <div>
        <input
          {...register("amount", { valueAsNumber: true })} // ✅ Converter string → número
          type="number" // ✅ Tipo number para teclado numérico mobile
          step="0.01" // ✅ Permitir casas decimais
          placeholder="Valor (R$)" // ✅ Placeholder para orientação
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        {/* Mensagem de erro automática do Zod */}
        {errors.amount && (
          <p className="text-red-500 text-sm dark:text-red-400">
            {errors.amount.message} {/* ✅ Mensagem de erro personalizada */}
          </p>
        )}
      </div>

      {/* Input para data da transação */}
      <div>
        <input
          {...register("date")} // ✅ Registrar campo com Zod
          type="date" // ✅ Tipo date para calendário nativo
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        {/* Mensagem de erro automática do Zod */}
        {errors.date && (
          <p className="text-red-500 text-sm dark:text-red-400">
            {errors.date.message} {/* ✅ Mensagem de erro personalizada */}
          </p>
        )}
      </div>

      {/* Mensagens de feedback (sucesso ou erro) */}
      {message && (
        <div
          className={`p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
          }`}
        >
          {message.text} {/* ✅ Texto da mensagem */}
        </div>
      )}

      {/* Botão de submit com estado de loading */}
      <button
        type="submit" // ✅ Tipo submit para enviar formulário
        disabled={isPending} // ✅ Desabilitar durante loading
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        {/* Texto dinâmico baseado no estado de loading */}
        {isPending ? "Processando..." : "➕ Adicionar"}
      </button>
    </form>
  );
}
