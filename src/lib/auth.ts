// src/lib/auth.ts
// Importa NextAuth e tipos necessários
import NextAuth, { AuthOptions } from "next-auth"; // ✅ Core do NextAuth.js

// Importa adaptador Prisma para conectar ao banco de dados
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // ✅ Integração com Prisma

// Importa provedores OAuth
import GoogleProvider from "next-auth/providers/google"; // ✅ Google OAuth
import GitHubProvider from "next-auth/providers/github"; // ✅ GitHub OAuth
import CredentialsProvider from "next-auth/providers/credentials"; // ✅ Email/Senha

// Importa cliente Prisma
import { prisma } from "@/lib/prisma"; // ✅ Conexão com banco de dados

// Importa bcrypt para hash de senhas
import bcrypt from "bcryptjs"; // ✅ Segurança de senhas

// Exporta opções de configuração do NextAuth.js
export const authOptions: AuthOptions = {
  // ✅ Tipagem explícita para segurança

  // Adaptador para conectar ao banco de dados Prisma
  adapter: PrismaAdapter(prisma), // ✅ Salva usuários, sessões, etc. no banco

  // Provedores de autenticação disponíveis
  providers: [
    // Provedor de credenciais (email/senha)
    CredentialsProvider({
      // Nome exibido no formulário de login
      name: "Credentials", // ✅ Rótulo do provedor

      // Definição dos campos do formulário
      credentials: {
        email: {
          label: "Email", // ✅ Rótulo do campo
          type: "email", // ✅ Tipo de input HTML
        },
        password: {
          label: "Password", // ✅ Rótulo do campo
          type: "password", // ✅ Tipo de input HTML (oculta caracteres)
        },
      },

      // Função assíncrona para autorizar usuário
      async authorize(credentials) {
        // ✅ Validação server-side
        // Verificar se credenciais foram fornecidas
        if (!credentials?.email || !credentials?.password) {
          return null; // ✅ Falhar autenticação se faltar dados
        }

        // Buscar usuário no banco pelo email (server-side)
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email, // ✅ Busca segura no banco
          },
        });

        // Verificar se usuário existe e tem senha
        if (!user || !user.password) {
          return null; // ✅ Falhar se não existir ou não tiver senha
        }

        // Verificar se senha está correta usando bcrypt
        const isPasswordValid = await bcrypt.compare(
          credentials.password, // ✅ Senha digitada pelo usuário
          user.password // ✅ Senha hash salva no banco
        );

        // Se senha incorreta, falhar autenticação
        if (!isPasswordValid) {
          return null; // ✅ Segurança: não revela se email existe
        }

        // Retornar usuário autenticado (sem senha por segurança)
        return {
          id: user.id, // ✅ ID único do usuário
          email: user.email, // ✅ Email do usuário
          name: user.name, // ✅ Nome do usuário (pode ser null)
          image: user.image, // ✅ Imagem de perfil (pode ser null)
        };
      },
    }),

    // Provedor Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // ✅ ID do cliente Google
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // ✅ Secret do cliente Google
    }),

    // Provedor GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!, // ✅ ID do cliente GitHub
      clientSecret: process.env.GITHUB_CLIENT_SECRET!, // ✅ Secret do cliente GitHub
    }),
  ],

  // Configurações de sessão
  session: {
    strategy: "jwt", // ✅ Usar JWT (JSON Web Tokens) para sessões
    maxAge: 30 * 24 * 60 * 60, // ✅ 30 dias de duração da sessão
  },

  // Configurações do JWT
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // ✅ Segredo para assinar tokens
  },

  // Callbacks personalizados para customizar comportamento
  callbacks: {
    // Callback para sessão - adiciona dados extras à sessão
    async session({ session, token }) {
      // ✅ Personalizar dados da sessão
      if (token && session.user) {
        session.user.id = token.sub as string; // ✅ Adicionar ID do usuário
      }
      return session; // ✅ Retornar sessão personalizada
    },

    // Callback para JWT - personaliza token
    async jwt({ token, user }) {
      // ✅ Personalizar token JWT
      if (user) {
        token.sub = user.id; // ✅ Adicionar ID do usuário ao token
      }
      return token; // ✅ Retornar token personalizado
    },
  },

  // Páginas personalizadas de autenticação
  pages: {
    signIn: "/auth/signin", // ✅ Página de login personalizada
    signOut: "/auth/signout", // ✅ Página de logout personalizada
    error: "/auth/error", // ✅ Página de erro personalizada
  },

  // Segredo para criptografar sessões
  secret: process.env.NEXTAUTH_SECRET, // ✅ Segredo master da aplicação
};

// Exporta handler padrão do NextAuth.js
export default NextAuth(authOptions); // ✅ Cria handler HTTP para rotas de autenticação
