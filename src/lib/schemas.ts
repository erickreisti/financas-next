// src/lib/schemas.ts
// Importa Zod para criar esquemas de validação
import { z } from "zod";

// ✅ CORREÇÃO: Usar z.string().email() com novo método
export const transactionSchema = z.object({
  // Campo type: só pode ser "receita" ou "despesa"
  type: z.enum(["receita", "despesa"], {
    message: "Tipo deve ser 'receita' ou 'despesa'",
  }),

  // Campo description: string não vazia
  description: z
    .string({
      error: "Descrição deve ser um texto",
    })
    .min(1, "Descrição é obrigatória")
    .max(100, "Descrição muito longa (máx. 100 caracteres)"),

  // Campo category: string com valores permitidos
  category: z.enum(
    [
      "salario",
      "alimentacao",
      "transporte",
      "lazer",
      "saude",
      "educacao",
      "outros",
    ],
    {
      message: "Categoria inválida",
    }
  ),

  // Campo amount: número positivo
  amount: z
    .number({
      error: "Valor deve ser um número",
    })
    .positive("Valor deve ser positivo")
    .multipleOf(0.01, "Valor deve ter no máximo 2 casas decimais"),

  // Campo date: data válida
  date: z
    .string({
      error: "Data deve ser uma string",
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Data inválida",
    }),

  // Campo userId: string não vazia
  userId: z
    .string({
      error: "ID do usuário deve ser uma string",
    })
    .min(1, "ID do usuário é obrigatório"),
});

// Inferir tipo TypeScript automaticamente do esquema
export type TransactionFormData = z.infer<typeof transactionSchema>;

// ✅ CORREÇÃO: Schema para validar dados de usuário com email atualizado
export const userSchema = z.object({
  // Campo email: string válida e única
  email: z
    .string({
      error: "Email deve ser uma string",
    })
    // ✅ MÉTODO ATUALIZADO: usar refine em vez de .email() preterido
    .refine(
      (email) => {
        // Validar formato de email com regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      {
        message: "Email inválido",
      }
    )
    .toLowerCase(),

  // Campo name: string opcional
  name: z
    .string({
      error: "Nome deve ser uma string",
    })
    .optional(),

  // Campo password: string com requisitos de segurança
  password: z
    .string({
      error: "Senha deve ser uma string",
    })
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha muito longa")
    .refine(
      (password) => {
        // Regex para força de senha: letras maiúsculas, minúsculas e números
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
        return passwordRegex.test(password);
      },
      {
        message: "Senha deve conter letras maiúsculas, minúsculas e números",
      }
    ),
});

// Inferir tipo TypeScript para usuário
export type UserFormData = z.infer<typeof userSchema>;

// ✅ CORREÇÃO: Schema para login com email atualizado
export const loginSchema = z.object({
  // Campo email: string válida
  email: z
    .string({
      error: "Email deve ser uma string",
    })
    // ✅ MÉTODO ATUALIZADO: usar refine em vez de .email() preterido
    .refine(
      (email) => {
        // Validar formato de email com regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      {
        message: "Email inválido",
      }
    ),

  // Campo password: string obrigatória
  password: z
    .string({
      error: "Senha deve ser uma string",
    })
    .min(1, "Senha não pode estar vazia"),
});

// Inferir tipo TypeScript para login
export type LoginFormData = z.infer<typeof loginSchema>;
