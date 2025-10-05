// src/components/TransactionForm.tsx - Loading animado corrigido
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Plus, Loader2 } from "lucide-react";

interface TransactionData {
  type: "receita" | "despesa";
  description: string;
  category: string;
  amount: number;
  date: string;
  userId: string;
}

interface TransactionFormProps {
  userId: string;
  onAddTransaction: (transactionData: TransactionData) => Promise<void>;
}

const TransactionForm = ({
  userId,
  onAddTransaction,
}: TransactionFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      const transactionData: TransactionData = {
        type: formData.get("type") as "receita" | "despesa",
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        amount: parseFloat(formData.get("amount") as string),
        date: formData.get("date") as string,
        userId: userId,
      };

      await onAddTransaction(transactionData);

      setMessage({ type: "success", text: "Transação criada com sucesso!" });
      e.currentTarget.reset();
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao adicionar transação" });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      {/* Select para tipo de transação */}
      <div>
        <select
          name="type"
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Selecione o tipo</option>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
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

      {/* Mensagem animada */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-3 rounded-md flex items-center gap-2 ${
              message.type === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão animado */}
      <motion.button
        type="submit"
        disabled={isPending}
        whileHover={{ scale: isPending ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-5 h-5" />
          </motion.div>
        ) : (
          <Plus className="w-5 h-5" />
        )}
        {isPending ? "Processando..." : "Adicionar Transação"}
      </motion.button>
    </motion.form>
  );
};

export default TransactionForm;
