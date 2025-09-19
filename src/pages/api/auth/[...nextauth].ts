// src/pages/api/auth/[...nextauth].ts
// Importa handler do NextAuth configurado
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Exporta handler padrão para todas requisições HTTP (GET, POST, etc.)
export default NextAuth(authOptions);
