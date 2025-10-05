// src/types/next-auth.d.ts
// Importa tipos do NextAuth.js para extensão
// NextAuth: tipo principal do NextAuth.js
// DefaultSession: tipo padrão da sessão do NextAuth.js
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

// Extende tipagem do NextAuth.js para adicionar campos personalizados
// declare module: permite estender módulos existentes do TypeScript
declare module "next-auth" {
  // Interface para usuário autenticado - EXTENDE USUÁRIO PADRÃO
  interface User {
    id: string; // ID único do usuário (número/string)
    name?: string | null; // Nome opcional (pode ser null)
    email?: string | null; // Email opcional (pode ser null)
    image?: string | null; // Imagem de perfil opcional (pode ser null)
    password?: string | null; // Senha hash opcional (para credenciais)
  }

  // Interface para sessão - EXTENDE SESSÃO PADRÃO
  interface Session {
    user: {
      id: string; // ID do usuário (adicionado)
      name?: string | null; // Nome do usuário (opcional)
      email?: string | null; // Email do usuário (opcional)
      image?: string | null; // Imagem do usuário (opcional)
    } & DefaultSession["user"]; // Extende sessão padrão do NextAuth.js
    expires: string; // Data de expiração da sessão (string ISO)
  }
}

// Extende tipagem para callbacks JWT - ADICIONA CAMPOS AO TOKEN
declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // ID do usuário no token JWT (opcional)
    sub?: string; // Subject (ID do usuário no token JWT)
  }
}
