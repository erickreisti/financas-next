// types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

// Extender tipagem do NextAuth
declare module "next-auth" {
  // Interface para usuário autenticado
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }

  // Interface para sessão
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
    expires: string;
  }
}

// Extender tipagem para callbacks JWT
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    sub?: string;
  }
}
