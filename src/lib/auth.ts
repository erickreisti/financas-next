// src/lib/auth.ts
// Diretiva use client - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa NextAuth e tipos necessários para autenticação
import NextAuth, { AuthOptions } from "next-auth";

// Importa adaptador Prisma para conectar autenticação ao banco de dados
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Importa provedores de autenticação OAuth
import GoogleProvider from "next-auth/providers/google"; // Autenticação com Google
import GitHubProvider from "next-auth/providers/github"; // Autenticação com GitHub
import CredentialsProvider from "next-auth/providers/credentials"; // Autenticação por credenciais

// Importa bcrypt para hash de senhas
import bcrypt from "bcryptjs";

// Importa cliente Prisma
import { prisma } from "@/lib/prisma";

// Exporta opções de configuração do NextAuth.js
export const authOptions: AuthOptions = {
  // Adaptador Prisma para armazenar sessões, usuários, etc. no banco
  adapter: PrismaAdapter(prisma),

  // Provedores de autenticação disponíveis
  providers: [
    // Provedor de credenciais (email/senha)
    CredentialsProvider({
      name: "Credentials", // Nome exibido no formulário de login
      credentials: {
        email: { label: "Email", type: "email" }, // Campo email
        password: { label: "Password", type: "password" }, // Campo senha
      },
      async authorize(credentials) {
        // Verificar se credenciais foram fornecidas
        if (!credentials?.email || !credentials?.password) {
          return null; // Falhar autenticação se faltar dados
        }

        // Buscar usuário no banco pelo email (server-side)
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email, // Condição: email igual ao fornecido
          },
        });

        // Verificar se usuário existe e tem senha
        if (!user || !user.password) {
          return null; // Falhar se não existir ou não tiver senha
        }

        // Verificar se senha está correta usando bcrypt
        const isPasswordValid = await bcrypt.compare(
          credentials.password, // Senha digitada pelo usuário
          user.password // Senha hash salva no banco
        );

        // Se senha incorreta, falhar autenticação
        if (!isPasswordValid) {
          return null; // Segurança: não revela se email existe
        }

        // Retornar usuário autenticado (sem senha hash por segurança)
        return {
          id: user.id, // ID único do usuário
          email: user.email, // Email do usuário
          name: user.name, // Nome do usuário (pode ser null)
          image: user.image, // Imagem de perfil (pode ser null)
        };
      },
    }),

    // Provedor Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // ID do cliente Google
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Secret do cliente Google
    }),

    // Provedor GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!, // ID do cliente GitHub
      clientSecret: process.env.GITHUB_CLIENT_SECRET!, // Secret do cliente GitHub
    }),
  ],

  // Configurações de sessão
  session: {
    strategy: "jwt", // Usar JWT (JSON Web Tokens) para sessões
    maxAge: 30 * 24 * 60 * 60, // 30 dias de duração da sessão
  },

  // Configurações do JWT
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Segredo para assinar tokens
  },

  // Callbacks personalizados
  callbacks: {
    // Callback para sessão - adiciona dados extras à sessão
    async session({ session, token }) {
      // Se token e usuário da sessão existirem
      if (token && session.user) {
        session.user.id = token.sub as string; // Adicionar ID do usuário
      }
      return session; // Retornar sessão personalizada
    },

    // Callback para JWT - personaliza token
    async jwt({ token, user }) {
      // Se usuário existir (primeiro login)
      if (user) {
        token.sub = user.id; // Adicionar ID do usuário ao token
      }
      return token; // Retornar token personalizado
    },
  },

  // Páginas personalizadas de autenticação
  pages: {
    signIn: "/auth/signin", // Página de login personalizada
    signOut: "/auth/signout", // Página de logout personalizada
    error: "/auth/error", // Página de erro personalizada
  },

  // Segredo para criptografar sessões
  secret: process.env.NEXTAUTH_SECRET,
};

// Exporta handler padrão do NextAuth.js
export default NextAuth(authOptions);
