// src/components/Auth/LoginForm.tsx
// Diretiva use client - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa React e hooks necessários para criar componente interativo
// useState: hook para gerenciar estado local
// useEffect: hook para efeitos colaterais (carregar/salvar dados)
import { useState } from "react";

// Importa hook de autenticação personalizado
// useAuth: hook customizado para lógica de autenticação
import { useAuth } from "@/hooks/useAuth";

// Componente de formulário de login
// CLIENT COMPONENT por causa dos hooks (use client acima)
export function LoginForm() {
  // Estados locais para gerenciar o formulário de login
  // useState COM TIPAGEM EXPLÍCITA
  const [email, setEmail] = useState<string>(""); // Estado para email
  const [password, setPassword] = useState<string>(""); // Estado para senha
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para loading
  const [error, setError] = useState<string>(""); // Estado para erros

  // Hook de autenticação personalizado
  // useAuth PARA ACESSAR FUNÇÕES DE AUTENTICAÇÃO
  const { login } = useAuth();

  // Função assíncrona para lidar com submit do formulário
  // FUNÇÃO ASSÍNCRONA PARA OPERAÇÕES DE BANCO DE DADOS
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    // Previne comportamento padrão (recarregar página)
    // PREVENT DEFAULT PARA EVITAR RELOAD
    e.preventDefault();

    // Limpar erro anterior antes de tentar novo login
    // LIMPEZA DE ESTADO ANTERIOR
    setError("");
    setIsLoading(true); // Iniciar estado de loading

    try {
      // Tentar login com credenciais fornecidas
      // CHAMADA ASSÍNCRONA PARA AUTENTICAÇÃO
      const result = await login(email, password);

      // Se login falhou, mostrar erro amigável
      // TRATAMENTO DE ERRO DE AUTENTICAÇÃO
      if (!result.success) {
        setError(result.error || "Erro ao fazer login");
      }
    } catch (err) {
      // Tratar erros inesperados
      // TRATAMENTO DE ERROS INESPERADOS
      setError("Erro inesperado. Tente novamente.");
    } finally {
      // Finalizar estado de loading independentemente do resultado
      // FINALIZAÇÃO OTIMISTA DE ESTADO
      setIsLoading(false);
    }
  };

  // Retorna JSX do componente de formulário
  return (
    // Div container com classes Tailwind para layout do formulário
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Título do formulário de login */}
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {/* Formulário de login com onSubmit chamando handleSubmit */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo de email */}
        <div>
          {/* Label para campo de email */}
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          {/* Input para email controlado pelo estado */}
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seu@email.com"
          />
        </div>
        {/* Campo de senha */}
        <div>
          {/* Label para campo de senha */}
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Senha
          </label>
          {/* Input para senha controlado pelo estado */}
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Sua senha"
          />
        </div>
        {/* Mensagem de erro se existir */}
        {error && (
          // ✅ MENSAGEM DE ERRO COM CORES VERMELHAS
          <div className="text-red-500 text-sm">{error}</div>
        )}
        {/* Botão de submit com estado de loading */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Texto dinâmico baseado no estado de loading */}
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      {/* Links para login social */}
      <div className="mt-6">
        {/* Divisor com texto "Ou continue com" */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou continue com</span>
          </div>
        </div>
        {/* Grid com botões de login social */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {/* Botão Google */}
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Login com Google</span>
            {/* Ícone SVG do Google */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
            </svg>
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Login com GitHub</span>
            {/* Ícone SVG do GitHub */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
