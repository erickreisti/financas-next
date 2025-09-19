// src/hooks/useAuth.ts
// Importa hooks do NextAuth
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

// Hook personalizado para verificar autenticação
export function useAuth() {
  // Hook para obter sessão atual
  const { data: session, status } = useSession();

  // Hook do router para navegação
  const router = useRouter();

  // Verifica se usuário está carregando
  const isLoading = status === "loading";

  // Verifica se usuário está autenticado
  const isAuthenticated = status === "authenticated";

  // Função para login com credenciais
  const login = async (email: string, password: string) => {
    try {
      // Tentar login com credenciais
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Não redirecionar automaticamente
      });

      // Se login falhou, lançar erro
      if (result?.error) {
        throw new Error(result.error);
      }

      // Se sucesso, redirecionar para dashboard
      router.push("/dashboard");
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  };

  // Função para login com provedor OAuth
  const loginWithProvider = async (provider: string) => {
    try {
      // Login com provedor (Google, GitHub, etc.)
      await signIn(provider, { callbackUrl: "/dashboard" });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  };

  // Função para logout
  const logout = async () => {
    try {
      // Fazer logout
      await signOut({ redirect: false });
      // Redirecionar para página inicial
      router.push("/");
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  };

  // Retornar hooks e funções
  return {
    session,
    isLoading,
    isAuthenticated,
    login,
    loginWithProvider,
    logout,
  };
}
